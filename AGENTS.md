## Cursor Cloud specific instructions

This is the **Yoobe.co Landing Page** with an integrated **admin editor/manager** built on Node.js/Express, served on **port 3000**.

### Running locally

```
npm install
npm run dev
```

The server starts at `http://localhost:3000`. The landing page is served at `/` and the admin panel at `/admin`.

### Admin credentials

- **URL:** `http://localhost:3000/admin`
- **User:** `admin`
- **Password:** `yoobe2025`
- Override with env vars `ADMIN_USER` and `ADMIN_PASS`.

### Architecture

| Component | Description |
|---|---|
| `server.js` | Express server (port 3000) with auth, API routes, static serving |
| `index.html` | The landing page (HTML + inline CSS/JS) |
| `admin/login.html` | Admin login page |
| `admin/editor.html` | Admin panel with dashboard, content editor, HTML editor, preview, backups, logo upload |
| `clients/` | Client logo images (PNG/SVG) |
| `backups/` | Auto-generated backups of `index.html` on each edit |

### API routes (all require auth)

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/landing` | Read raw HTML of `index.html` |
| POST | `/api/landing` | Save full HTML (creates backup first) |
| GET | `/api/content` | Read structured content fields |
| POST | `/api/content` | Update a single content field |
| GET | `/api/backups` | List recent backups |
| POST | `/api/backups/restore` | Restore a backup |
| POST | `/api/upload-logo` | Upload a client logo image |
| GET | `/api/clients` | List client logo files on disk |
| DELETE | `/api/clients/:filename` | Remove a client logo file |

### Deployment

- **Production:** GitHub Actions deploys to GCP Cloud Storage on push to `main` (see `.github/workflows/deploy.yml`).
- **Alternative:** Vercel config exists (`vercel.json`) with alias `yoobe.co`.

### Caveats

- There is no build step, no linting, and no automated test suite.
- The `backups/` directory is gitignored and created automatically on first edit.
- Session secret should be set via `SESSION_SECRET` env var in production.
