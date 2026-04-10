# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Yoobe / 4unik marketing landing page — a statically exported Next.js 16 site (React 19, Tailwind CSS v4, Sanity CMS, Framer Motion). Deployed to GitHub Pages at `https://yoooobe.github.io/landing/`. Repo: `https://github.com/Yoooobe/landing`.

### Dev Server

```bash
NEXT_PUBLIC_SANITY_DATASET=production NEXT_PUBLIC_SANITY_PROJECT_ID=placeholder npm run dev
```

The site is served at `http://localhost:3000/landing/` (note the `/landing` basePath).

### Key Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (requires Sanity env vars, see above) |
| Lint | `npm run lint` |
| Build (static export) | `npm run build` (requires Sanity env vars) |
| Deploy (GH Pages) | `npm run deploy:gh-pages` |

### Gotchas

- **Sanity env vars required**: `NEXT_PUBLIC_SANITY_DATASET` and `NEXT_PUBLIC_SANITY_PROJECT_ID` must be set for both `npm run dev` and `npm run build`. Without them, the `/studio` route crashes. Use `production` and `placeholder` as dummy values for local dev if real credentials aren't available.
- **basePath is `/landing`**: All routes are prefixed with `/landing/`. The homepage is at `http://localhost:3000/landing/`, not `http://localhost:3000/`.
- **Static export**: `next.config.ts` sets `output: "export"` — no SSR, no API routes. The build produces static HTML in `out/`.
- **Lint has pre-existing errors**: `npm run lint` exits with code 1 due to pre-existing lint errors in the codebase (unescaped entities, unused vars, etc.). This is expected.
- **No automated tests**: The project has no test framework or test files.
- **`.npmrc` config**: Uses `legacy-peer-deps=true` and a custom cache dir `/tmp/landing-cache`.
- **`next-app/` directory**: Empty placeholder package at root — not used; ignore it.
