# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Yoobe / 4unik marketing landing page — a statically exported Next.js 16 site (React 19, Tailwind CSS v4, Sanity CMS, Framer Motion). Default public URL (fallback): `https://yoooobe.github.io/landing/`. Override with **`NEXT_PUBLIC_SITE_URL`** at build time for Vercel, GCP, or a definitive domain — see [`docs/site-url-migration.md`](docs/site-url-migration.md). Repo: `https://github.com/Yoooobe/landing`.

### Dev Server

```bash
NEXT_PUBLIC_SANITY_DATASET=production NEXT_PUBLIC_SANITY_PROJECT_ID=placeholder npm run dev
```

The site is served at `http://localhost:3000/landing/` when using the default canonical URL (path `/landing`). If you set `NEXT_PUBLIC_SITE_URL` to a root-only host (no path), `basePath` becomes empty and local URLs change accordingly.

### Key Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (requires Sanity env vars, see above) |
| Lint | `npm run lint` |
| Build (static export) | `npm run build` (requires Sanity env vars) |
| Deploy (GH Pages) | `npm run deploy:gh-pages` |

### Gotchas

- **Sanity env vars required**: `NEXT_PUBLIC_SANITY_DATASET` and `NEXT_PUBLIC_SANITY_PROJECT_ID` must be set for both `npm run dev` and `npm run build`. Without them, the `/studio` route crashes. Use `production` and `placeholder` as dummy values for local dev if real credentials aren't available.
- **basePath**: Derived from `NEXT_PUBLIC_SITE_URL` (default includes `/landing` on GitHub Pages). All app routes are prefixed accordingly. See [`src/lib/publicSite.ts`](src/lib/publicSite.ts).
- **Static export**: `next.config.ts` sets `output: "export"` — no SSR, no API routes. The build produces static HTML in `out/`.
- **Lead capture forms**: set `NEXT_PUBLIC_LEADS_INGEST_URL` to a public HTTPS endpoint that accepts POST JSON matching `leadPayload` (`name`, `email`, `company`, `consent`, `source`, `locale`, etc.). Without it, submit shows a configuration error in the browser after export. Local `npm run dev` can use the Route Handler at `/api/leads` via same-origin fallback.
- **Optional chat widget**: set `NEXT_PUBLIC_CHAT_SCRIPT_URL` to a third-party script URL (e.g. Intercom/Crisp). Loaded lazily after paint; no server required for static export.
- **AEO / assistentes**: `npm run build` runs `generate:llms` — regenerates `public/llms.txt` via `scripts/generate-llms-txt.ts` using `src/lib/parsePublicSiteUrl.ts` (same URLs as `robots.txt` / `sitemap.xml`). Override with **`NEXT_PUBLIC_SITE_URL`** at build time, or edit **`config/public-site.json`** for the repo fallback. See `docs/aeo-ai-visibility.md`. `pageAbsoluteUrl` in `src/lib/site.ts` resolves absolute URLs from the same canonical base.
- **Lint has pre-existing errors**: `npm run lint` exits with code 1 due to pre-existing lint errors in the codebase (unescaped entities, unused vars, etc.). This is expected.
- **No automated tests**: The project has no test framework or test files.
- **`.npmrc` config**: Uses `legacy-peer-deps=true` and a custom cache dir `/tmp/landing-cache`.
- **`next-app/` directory**: Empty placeholder package at root — not used; ignore it.
