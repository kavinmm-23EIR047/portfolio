"""Python-only discovery worker for Overture's openly licensed Places dataset.

Input and output use one JSON object each on stdin/stdout. This worker queries
public GeoParquet through DuckDB; it does not scrape search engines or websites.
"""

from __future__ import annotations

import hashlib
import json
import re
import sys
from typing import Any

import requests


CATALOG_URL = "https://stac.overturemaps.org/catalog.json"
DATASET_URL = "https://docs.overturemaps.org/guides/places/"
BOUNDARIES_API = "https://www.geoboundaries.org/api/current/gbOpen/IND/"
BOUNDARIES_URL = "https://www.geoboundaries.org/api.html"
S3_PREFIX = "s3://overturemaps-us-west-2/release/"
USER_AGENT = "AKWebFlairLeadFinder/1.0 (public Overture dataset query)"
MISSING = {"", "0", "na", "n/a", "not available", "null", "none"}
CATEGORY_ALIASES = {
    "cake shop": ("cake", "bakery", "dessert"),
    "cake shops": ("cake", "bakery", "dessert"),
    "dentist": ("dentist", "dental"),
    "dentists": ("dentist", "dental"),
    "salon": ("salon", "beauty"),
    "salons": ("salon", "beauty"),
}


def clean(value: Any) -> str:
    if value is None:
        return ""
    text = re.sub(r"\s+", " ", str(value)).strip()
    return "" if text.lower() in MISSING else text


def normalized(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()


def latest_release(session: requests.Session | None = None) -> str:
    client = session or requests.Session()
    try:
        response = client.get(CATALOG_URL, headers={"User-Agent": USER_AGENT}, timeout=(5, 20))
        response.raise_for_status()
        release = clean(response.json().get("latest"))
    except (requests.RequestException, ValueError, AttributeError):
        raise RuntimeError("Could not read the latest Overture public-data release.") from None
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}\.\d+", release):
        raise RuntimeError("Overture returned an invalid release identifier.")
    return release


def category_terms(category: str) -> list[str]:
    key = normalized(category)
    aliases = CATEGORY_ALIASES.get(key, ())
    terms = list(dict.fromkeys([key, *aliases]))
    return [term for term in terms if term]


def _coordinates(value: Any):
    if isinstance(value, (list, tuple)):
        if len(value) >= 2 and all(isinstance(item, (int, float)) for item in value[:2]):
            yield float(value[0]), float(value[1])
        else:
            for child in value:
                yield from _coordinates(child)


def _feature_bbox(feature: dict[str, Any]) -> tuple[float, float, float, float] | None:
    geometry = feature.get("geometry") or {}
    points = list(_coordinates(geometry.get("coordinates")))
    if not points:
        return None
    longitudes, latitudes = zip(*points)
    return min(longitudes), min(latitudes), max(longitudes), max(latitudes)


def _boundary_geojson(level: str, session: requests.Session | None = None) -> dict[str, Any]:
    client = session or requests.Session()
    try:
        metadata_response = client.get(f"{BOUNDARIES_API}{level}/", headers={"User-Agent": USER_AGENT}, timeout=(5, 30))
        metadata_response.raise_for_status()
        metadata = metadata_response.json()
        geojson_url = metadata.get("simplifiedGeometryGeoJSON") or metadata.get("gjDownloadURL")
        if not geojson_url:
            raise ValueError("missing boundary download link")
        data_response = client.get(geojson_url, headers={"User-Agent": USER_AGENT}, timeout=(5, 60))
        data_response.raise_for_status()
        return data_response.json()
    except (requests.RequestException, ValueError, AttributeError):
        raise RuntimeError("Could not load India's public district boundaries to scope this search.") from None


def district_bbox(state: str, district: str, session: requests.Session | None = None) -> tuple[float, float, float, float]:
    """Resolve a district to a tight public boundary bbox before querying global Places files."""
    state_data = _boundary_geojson("ADM1", session)
    district_data = _boundary_geojson("ADM2", session)

    def names(feature: dict[str, Any]) -> set[str]:
        props = feature.get("properties") or {}
        values = [props.get("shapeName"), props.get("shapeNameAlt")]
        return {normalized(part) for value in values for part in (str(value).split("|") if value else []) if normalized(part)}

    state_key, district_key = normalized(state), normalized(district)
    state_features = [f for f in state_data.get("features", []) if state_key in names(f)]
    if not state_features:
        raise RuntimeError(f"Could not match state '{state}' to India's public boundary dataset.")
    state_bounds = [_feature_bbox(feature) for feature in state_features]
    state_bounds = [bounds for bounds in state_bounds if bounds]
    if not state_bounds:
        raise RuntimeError("The public boundary dataset has no usable geometry for that state.")
    west = min(bounds[0] for bounds in state_bounds)
    south = min(bounds[1] for bounds in state_bounds)
    east = max(bounds[2] for bounds in state_bounds)
    north = max(bounds[3] for bounds in state_bounds)

    candidates = []
    for feature in district_data.get("features", []):
        if district_key not in names(feature):
            continue
        bounds = _feature_bbox(feature)
        if not bounds or bounds[2] < west or bounds[0] > east or bounds[3] < south or bounds[1] > north:
            continue
        overlap = max(0.0, min(bounds[2], east) - max(bounds[0], west)) * max(0.0, min(bounds[3], north) - max(bounds[1], south))
        candidates.append((overlap, bounds))
    if not candidates:
        raise RuntimeError(f"Could not match district '{district}' within state '{state}' in the public boundary dataset.")
    # If district names repeat across states, the matching state bbox selects the strongest overlap.
    return max(candidates, key=lambda candidate: candidate[0])[1]


def fetch_records(state: str, district: str, category: str, max_results: int) -> list[dict[str, Any]]:
    try:
        import duckdb
    except ImportError:
        raise RuntimeError("DuckDB is not installed. Run python -m pip install -r requirements-lead-finder.txt in backend/.") from None

    release = latest_release()
    west, south, east, north = district_bbox(state, district)
    parquet_glob = f"{S3_PREFIX}{release}/theme=places/type=place/*"
    terms = category_terms(category)
    category_match = " OR ".join(
        ["lower(coalesce(basic_category, '')) LIKE ?", "lower(coalesce(taxonomy.primary, '')) LIKE ?"] * len(terms)
    )
    category_params = [pattern for term in terms for pattern in (f"%{term}%", f"%{term.replace(' ', '_')}%")]
    sql = f"""
        SELECT
            id,
            names.primary AS name,
            coalesce(basic_category, taxonomy.primary) AS category,
            confidence,
            websites[1] AS website,
            emails[1] AS email,
            phones[1] AS phone,
            addresses[1].freeform AS address,
            addresses[1].locality AS city,
            addresses[1].postcode AS postal_code,
            addresses[1].region AS region,
            addresses[1].country AS country
        FROM read_parquet(?, hive_partitioning=1)
        WHERE addresses[1].country = 'IN'
          AND bbox.xmin BETWEEN ? AND ?
          AND bbox.ymin BETWEEN ? AND ?
          AND lower(coalesce(addresses[1].region, '')) LIKE ?
          AND (
            lower(coalesce(addresses[1].locality, '')) LIKE ?
            OR lower(coalesce(addresses[1].freeform, '')) LIKE ?
          )
          AND ({category_match})
          AND (confidence IS NULL OR confidence >= 0.5)
          AND coalesce(operating_status, '') != 'permanently_closed'
        LIMIT ?
    """
    state_pattern = f"%{normalized(state)}%"
    district_pattern = f"%{normalized(district)}%"
    params = [parquet_glob, west, east, south, north, state_pattern, district_pattern, district_pattern, *category_params, max_results]
    try:
        connection = duckdb.connect(database=":memory:")
        connection.execute("SET threads=2")
        connection.execute("SET memory_limit='1GB'")
        connection.execute("INSTALL httpfs")
        connection.execute("LOAD httpfs")
        rows = connection.execute(sql, params).fetchall()
        columns = [description[0] for description in connection.description]
        connection.close()
        return [dict(zip(columns, row)) for row in rows]
    except Exception as exc:
        message = str(exc).lower()
        if "httpfs" in message or "network" in message or "connection" in message:
            raise RuntimeError("Could not access Overture's public data files. Check outbound HTTPS and DuckDB's httpfs extension.") from None
        raise RuntimeError("Overture data query failed. Check the worker logs for details.") from None


def to_business(row: dict[str, Any], state: str, district: str, requested_category: str) -> dict[str, Any]:
    name = clean(row.get("name"))
    actual_state = clean(row.get("region")) or state
    actual_district = district
    parts = [clean(row.get("address")), clean(row.get("city")), clean(row.get("postal_code")), actual_district, actual_state]
    address = ", ".join(dict.fromkeys(part for part in parts if part))
    source_id = clean(row.get("id"))
    if not source_id:
        identity = "|".join((normalized(name), normalized(actual_district), normalized(actual_state), address))
        source_id = hashlib.sha256(identity.encode("utf-8")).hexdigest()
    phone = clean(row.get("phone"))
    return {
        "osmType": "overture",
        "osmId": source_id,
        "sourceType": "overture_places",
        "sourceId": source_id,
        "name": name,
        "category": clean(row.get("category")) or requested_category,
        "phone": phone,
        "normalizedPhone": re.sub(r"[^+\d]", "", phone),
        "email": clean(row.get("email")),
        "address": address,
        "city": clean(row.get("city")),
        "postalCode": clean(row.get("postal_code")),
        "district": actual_district,
        "state": actual_state,
        "websiteUrl": clean(row.get("website")),
        "websiteStatus": "not_checked" if clean(row.get("website")) else "no_website_listed",
        "rating": None,
        "reviewCount": None,
        "ratingVerified": False,
        "latitude": None,
        "longitude": None,
        "source": "Overture Maps Places",
        "sourceUrl": DATASET_URL,
    }


def discover(request: dict[str, Any]) -> dict[str, Any]:
    category = clean(request.get("keyword"))
    state = clean(request.get("state"))
    district = clean(request.get("district"))
    try:
        max_results = max(1, min(100, int(request.get("maxLeads", 100))))
        min_rating = float(request.get("minRating", 0) or 0)
        min_reviews = int(request.get("minReviewCount", 0) or 0)
    except (TypeError, ValueError):
        return {"success": False, "message": "Search limits and rating filters must be valid numbers."}
    if len(category) < 2 or not state or not district:
        return {"success": False, "message": "Enter a category, state, and district."}
    if not 0 <= min_rating <= 5 or min_reviews < 0:
        return {"success": False, "message": "Rating must be from 0 to 5 and review count must be non-negative."}
    if min_rating > 0 or min_reviews > 0:
        return {
            "success": True,
            "businesses": [],
            "source": "Overture Maps Places",
            "limitation": "Overture publishes place details but no business ratings or review counts, so the requested rating/review threshold cannot be verified.",
        }
    try:
        rows = fetch_records(state, district, category, max_results)
    except RuntimeError as exc:
        return {"success": False, "message": str(exc)}

    businesses: list[dict[str, Any]] = []
    seen: set[str] = set()
    for row in rows:
        business = to_business(row, state, district, category)
        if not business["name"] or business["sourceId"] in seen:
            continue
        seen.add(business["sourceId"])
        businesses.append(business)
        if len(businesses) >= max_results:
            break
    limitation = "Overture does not provide ratings or review counts; those fields remain unavailable." if businesses else (
        "Overture returned no matching public place records for this category and district. This does not establish that no businesses exist there."
    )
    return {"success": True, "businesses": businesses, "source": "Overture Maps Places", "sourceUrl": DATASET_URL, "boundarySourceUrl": BOUNDARIES_URL, "limitation": limitation}


def main() -> None:
    try:
        request = json.load(sys.stdin)
        result = discover(request if isinstance(request, dict) else {})
    except Exception:
        result = {"success": False, "message": "Python discovery worker failed. Check backend logs for the job ID."}
    print(json.dumps(result, ensure_ascii=False))


if __name__ == "__main__":
    main()
