# Backend setup

## Admin access and Python Lead Finder

Configure the existing admin credentials and MongoDB connection in the backend environment:

```text
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=use-a-strong-unique-password
MONGODB_URI=your-mongodb-connection-string
```

The finder delegates business discovery to `lead_discovery_agent.py`. It queries Overture Maps' openly licensed Places GeoParquet through DuckDB and Python. It first resolves the selected Indian state and district against geoBoundaries' open ADM1/ADM2 GeoJSON, then applies that district's bounding box before reading Places rows. This keeps searches geographically scoped instead of scanning the global dataset. The dataset covers many business categories and may include names, address, phone, email, and website. It does not provide ratings or review counts. Those fields remain unavailable; requesting a rating or review threshold returns a clear limitation rather than unverified results. Other data quality limitations are documented by Overture, including incomplete attributes and duplicates.

The Places theme is published under CDLA Permissive 2.0 and Apache 2.0, depending on source. It contains no OpenStreetMap data. Review [Overture's Places guide](https://docs.overturemaps.org/guides/places/) and [attribution and licensing](https://docs.overturemaps.org/attribution/) before redistribution. The worker uses no browser automation, search engine scraping, paid lead API, or AI API. `PYTHON_EXECUTABLE` can be set if Python is not available as `python` on the backend host.

From `backend/`, create the worker environment and install its dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-lead-finder.txt
```

The backend automatically uses `.venv` when present; `PYTHON_EXECUTABLE` can override it. On Linux/macOS, install with `./.venv/bin/python -m pip install -r requirements-lead-finder.txt`. DuckDB's `httpfs` extension is loaded when the worker queries the public cloud dataset, so outbound HTTPS must be available on the backend host. District names come from India's Local Government Directory; geographic query bounds come from [geoBoundaries](https://www.geoboundaries.org/api.html), which provides open CC-BY 4.0 boundary data with attribution. Website checks and search results are saved in the existing MongoDB collection.

## Lead Finder jobs and saved leads

Search jobs are polled by the admin UI. Jobs are held in memory and disappear after a backend restart; saved records remain in MongoDB. Only one search can run per backend process at a time. Website checks use bounded concurrency, redirect revalidation, timeouts, and limited retries. Private and local destination addresses are rejected. Timeouts and access restrictions are kept separate from confirmed HTTP errors. Website checks are diagnostic and do not assess visual quality.

Authenticated routes are available below `/api/admin/lead-discovery`: `POST /jobs`, `GET /jobs`, `GET /jobs/:jobId`, `POST /jobs/:jobId/cancel`, paginated `GET /leads`, `PATCH /leads/:id`, `DELETE /leads/:id`, `POST /leads/:id/check-website`, `POST /leads/bulk-update`, and `GET /export`. They use the existing admin bearer session.

Run the backend with `npm run dev` from `backend/`; run the built-in Node tests with `npm test`. Python worker tests can be run with `python -m unittest discover -s tests` from `backend/`.
### Billdesk admin connection

The Admin Dashboard's Billdesk SaaS tab calls `/api/admin/billdesk/overview` on this backend. Configure `BILLDESK_API_URL` and `BILLDESK_AK_ADMIN_KEY` in the backend environment. Set `AK_ADMIN_SERVICE_KEY` to the same high-entropy key in the Billdesk API environment. The browser's existing admin bearer session is checked by this backend; the Billdesk key is only sent from server to server. The overview returns tenant names/status, member/customer/invoice counts, and platform aggregate totals. Do not put either key in `VITE_*` variables.
