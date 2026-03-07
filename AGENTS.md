## Cursor Cloud specific instructions

This is a **static HTML landing page** (Yoobe.co) with no build system, no package manager, and no runtime dependencies. The entire product is a single `index.html` file with inline CSS/JS, plus image assets in `clients/`.

### Running locally

Serve the repository root with any static file server:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080` in a browser. There is no build step, no linting, and no automated test suite.

### Deployment

- **Production:** GitHub Actions deploys `index.html` and `logo.png` to a GCP Cloud Storage bucket on push to `main` (see `.github/workflows/deploy.yml`).
- **Alternative:** Vercel config exists (`vercel.json`) with alias `yoobe.co`.

### Key files

| File | Purpose |
|---|---|
| `index.html` | The entire landing page (HTML + inline CSS + inline JS) |
| `logo.png` | Site logo/favicon |
| `clients/` | Client logo images (PNG/SVG) referenced by the page |
| `app.yaml` | Legacy GCP App Engine config (static serving) |
| `vercel.json` | Vercel deployment alias |
| `.github/workflows/deploy.yml` | CI/CD to GCP Cloud Storage |
