# Landing Background Agents

## Goal
Keep landing improvements moving in small, low-conflict background loops while preserving static export, PT/EN parity, and Sanity fallbacks.

## Lanes
1. `audit`: readonly lane that maps hotspots, regressions, and new opportunities without editing files.
2. `visual-check`: validation lane that compares PT and EN routes, key funnels, and static-export output.
3. `implementation`: delivery lane that only works on the highest-priority item currently approved in the backlog.
4. `verification`: safety lane that runs lint, static build, and route-level checks after each implementation batch.

## Batch Rules
- Keep each batch scoped to one theme: `seo`, `performance`, `content-safety`, or `navigation`.
- Prefer single-file or tightly related multi-file edits to reduce merge conflicts.
- Do not mix schema modeling with frontend polish in the same batch.
- When changing files under `src/sanity/schemaTypes/`, also review queries, types, rendering, and `docs/cms.md`.
- Preserve fallbacks when Sanity is missing or partially configured.

## Route Priorities
1. `/` and `/en/`
2. `/plataforma/` and `/en/plataforma/`
3. `/api-integracoes/` and `/en/api-integracoes/`
4. `/gamificacao/` and `/en/gamificacao/`
5. `/inteligencia/` and `/en/inteligencia/`
6. `/casos-de-uso/` and `/en/casos-de-uso/`

## Recommended Loop
1. `audit` writes or refreshes the prioritized backlog.
2. `implementation` picks only the top `ready` item.
3. `verification` runs targeted lint plus a full static build.
4. `visual-check` validates the affected PT/EN routes.
5. After a merge to `main`, confirm the **Deploy to GitHub Pages** workflow succeeded on GitHub Actions, then smoke-test `https://yoooobe.github.io/landing/` and `/landing/en/`, `/landing/blog/`, `robots.txt`, and `llms.txt` (and `/landing/studio/` if Sanity is configured). HTML estático na raiz do repo (ex.: `index.html`) não é publicado por este workflow; links para o blog nesses ficheiros devem usar a URL do export Next (ver [site-url-migration.md](site-url-migration.md#ficheiros-html-legacy-na-raiz-do-repo)).
6. Move to the next backlog item only after the previous one is verified.

## Verification Commands
Full-project lint (same as CI-style local check):

```bash
npm run lint
npm run build
```

Targeted paths (optional, faster while iterating on marketing shell and SEO):

```bash
npx eslint src/app/sitemap.ts \
  "src/app/(pt)/layout.tsx" "src/app/(en)/en/layout.tsx" \
  src/components/AppShell.tsx src/components/HomeHero.tsx \
  src/components/site-settings/MarketingScripts.tsx src/components/MarketingPageRenderer.tsx \
  src/lib/locale.ts src/lib/seo/routeMetadata.ts src/lib/site.ts \
  src/sanity/lib/image.ts src/sanity/lib/marketingPages.ts
```

## Output Expectations
- `audit`: updated hotspot summary with impact, risk, and owning files.
- `visual-check`: route checklist with PT/EN parity notes.
- `implementation`: small patch set and rationale.
- `verification`: lint/build result plus any follow-up regressions.
- `deploy` (after merge to `main`): link to successful workflow run or note if Pages deploy failed.
