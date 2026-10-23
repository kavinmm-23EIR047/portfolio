import unittest
import sys
from unittest.mock import Mock, patch

import lead_discovery_agent as agent


class OvertureLeadDiscoveryTests(unittest.TestCase):
    def test_rating_and_review_thresholds_report_source_limit_without_query(self):
        with patch.object(agent, "fetch_records") as fetch:
            result = agent.discover({"keyword": "bakery", "state": "Tamil Nadu", "district": "Coimbatore", "minRating": 4, "minReviewCount": 10})

        self.assertTrue(result["success"])
        self.assertEqual(result["businesses"], [])
        self.assertIn("no business ratings or review counts", result["limitation"])
        fetch.assert_not_called()

    def test_search_validation_rejects_out_of_range_rating(self):
        result = agent.discover({"keyword": "restaurant", "state": "Tamil Nadu", "district": "Coimbatore", "minRating": 5.1})
        self.assertFalse(result["success"])
        self.assertIn("Rating must be from 0 to 5", result["message"])

    def test_maps_public_fields_and_keeps_unavailable_ratings_null(self):
        row = {
            "id": "place-123",
            "name": "Central Bakery",
            "category": "bakery",
            "phone": "+91 98765 43210",
            "email": "hello@example.org",
            "website": "https://example.org",
            "address": "12 Main Road",
            "city": "Coimbatore",
            "postal_code": "641001",
            "region": "Tamil Nadu",
        }
        business = agent.to_business(row, "Tamil Nadu", "Coimbatore", "bakery")

        self.assertEqual(business["sourceType"], "overture_places")
        self.assertEqual(business["sourceId"], "place-123")
        self.assertEqual(business["name"], "Central Bakery")
        self.assertEqual(business["normalizedPhone"], "+919876543210")
        self.assertEqual(business["rating"], None)
        self.assertEqual(business["reviewCount"], None)
        self.assertFalse(business["ratingVerified"])
        self.assertEqual(business["websiteStatus"], "not_checked")

    def test_missing_contact_and_website_fields_stay_empty(self):
        business = agent.to_business({"id": "place-456", "name": "No Site Shop"}, "Tamil Nadu", "Coimbatore", "shop")
        self.assertEqual(business["phone"], "")
        self.assertEqual(business["email"], "")
        self.assertEqual(business["websiteUrl"], "")
        self.assertEqual(business["websiteStatus"], "no_website_listed")

    def test_duplicate_source_ids_are_returned_once(self):
        row = {"id": "place-123", "name": "Central Bakery"}
        with patch.object(agent, "fetch_records", return_value=[row, row]):
            result = agent.discover({"keyword": "bakery", "state": "Tamil Nadu", "district": "Coimbatore", "maxLeads": 10})
        self.assertEqual(len(result["businesses"]), 1)

    def test_latest_release_rejects_invalid_catalog_identifier(self):
        response = Mock()
        response.json.return_value = {"latest": "latest;drop table"}
        response.raise_for_status.return_value = None
        session = Mock()
        session.get.return_value = response
        with self.assertRaisesRegex(RuntimeError, "invalid release identifier"):
            agent.latest_release(session)

    def test_overture_query_is_scoped_to_country_state_district_and_category(self):
        connection = Mock()
        connection.execute.return_value = connection
        connection.fetchall.return_value = []
        connection.description = []
        duckdb = Mock()
        duckdb.connect.return_value = connection
        with patch.dict(sys.modules, {"duckdb": duckdb}), patch.object(agent, "latest_release", return_value="2026-09-23.1"), patch.object(agent, "district_bbox", return_value=(76.5, 10.0, 77.5, 11.0)):
            self.assertEqual(agent.fetch_records("Tamil Nadu", "Coimbatore", "bakery", 20), [])

        query, parameters = connection.execute.call_args.args
        self.assertIn("addresses[1].country = 'IN'", query)
        self.assertIn("bbox.xmin BETWEEN ? AND ?", query)
        self.assertIn("addresses[1].region", query)
        self.assertIn("addresses[1].locality", query)
        self.assertIn("s3://overturemaps-us-west-2/release/2026-09-23.1", parameters[0])
        self.assertEqual(parameters[1:5], [76.5, 77.5, 10.0, 11.0])
        self.assertIn("%coimbatore%", parameters)
        self.assertIn("%bakery%", parameters)

    def test_cake_shop_expands_to_known_public_place_taxonomy_terms(self):
        self.assertEqual(agent.category_terms("cake shop"), ["cake shop", "cake", "bakery", "dessert"])

    def test_district_bbox_uses_state_to_disambiguate_repeated_district_names(self):
        def feature(name, bbox):
            west, south, east, north = bbox
            return {"properties": {"shapeName": name}, "geometry": {"type": "Polygon", "coordinates": [[[west, south], [east, south], [east, north], [west, north], [west, south]]]}}

        def boundary(level, session=None):
            if level == "ADM1":
                return {"features": [feature("Tamil Nadu", (76, 8, 80, 13))]}
            return {"features": [feature("Coimbatore", (76.5, 10, 77.5, 11)), feature("Coimbatore", (82, 20, 83, 21))]}

        with patch.object(agent, "_boundary_geojson", side_effect=boundary):
            self.assertEqual(agent.district_bbox("Tamil Nadu", "Coimbatore"), (76.5, 10.0, 77.5, 11.0))


if __name__ == "__main__":
    unittest.main()
