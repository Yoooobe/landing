# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Yoobe / 4unik marketing landing page — a statically exported Next.js 16 site (React 19, Tailwind CSS v4, Sanity CMS, Framer Motion). Default public URL (fallback): `https://plataforma.4unik.com.br/landing/`. Override with **`NEXT_PUBLIC_SITE_URL`** at build time for alternate hosts — see [`docs/site-url-migration.md`](docs/site-url-migration.md). Repo: `https://github.com/Yoooobe/landing`.

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
| Deploy (GH Pages) | `npm run deploy:gh-pages` / `npm run deploy:production` (sem Actions; ver `docs/github-actions-billing-recovery.md` se CI bloqueado) |
| Sync blog fallback → Sanity | `npm run sync:blog-fallback` — cria/atualiza só `blogPost.landing.*` (não sobrescreve outros posts); ver `docs/cms.md` |
| Generate blog posts (IA → Sanity) | `npm run generate:blog-posts` (needs `OPENAI_API_KEY` + Sanity write token unless `--dry-run`; see `docs/cms.md`). **Revisão humana obrigatória** antes de `--publish` — checklist em `docs/cms.md` → *Checklist de revisão editorial*. |
| Validate blog CTA landing paths | `npm run validate:blog-ctas` (no network; checks `BLOG_CTA_PATHS_BY_SLUG` vs `src/app/(pt)/…/page.tsx`) |
| Validate landing routes | `npm run validate:landing-routes` — valida rotas internas (sitemap, fallbacks de menu, blog CTAs); `--smoke [baseUrl]` faz smoke HTTP opcional (`scripts/validate-landing-routes.mjs`) |
| Generate OG images | `npm run generate:og` — rasteriza os templates SVG em PNG 1200×630 para `public/og/*.png` via `sharp` (roda automaticamente no `build`; `scripts/generate-og-images.mjs`) |
| Generate ICP showcase images | `npm run generate:icp-screens` — compõe screenshots de `public/screens/` em mockups enquadrados por vertical (`public/screens/icp/{slug}-{hero,how,benefits}.webp`) via `sharp`; consumidos pelos componentes `src/components/icp/` (`scripts/generate-icp-showcase-images.mjs`). Revisão humana após gerar |
| Patch legacy HTML (raiz) | `npm run patch:legacy-html` — atualiza canonical + links para `plataforma.4unik.com.br/landing` nos HTML estáticos da raiz, sem injetar meta refresh (`scripts/patch-legacy-html-redirects.mjs`) |
| Blog image presets | `npm run blog:image-presets` (`scripts/blog-image-presets.ts`) |
| Smoke do gerador de imagens | `npm run smoke:nano-banana` (`scripts/smoke-nano-banana.mjs`) |
| Seed de conteúdo Sanity | `npm run seed:sanity` (`scripts/seed-sanity-content.mjs`) |
| Env local | `npm run env:init` / `npm run env:check` (`scripts/init-env-local.mjs`, `scripts/check-local-env.mjs`) |
| Sanity CORS | `npm run sanity:cors` (adiciona origens localhost + `plataforma.4unik.com.br`) |
| Deploy rápido (GH Pages) | `npm run deploy:gh-pages:quick` (`npm run build && gh-pages -d out`) |
| Verificar GA4 no build | `npm run verify:ga-build`, `verify:ga-404-fallback`, `verify:ga-pages` (após `npm run build`) |

Configuração do Pages no GitHub (fonte branch vs Actions, Desktop, CLI, billing): [`docs/github-pages-setup.md`](docs/github-pages-setup.md).

Docs relacionados:
- Proxy / redirects no host canónico `plataforma.4unik.com.br/landing`: [`docs/proxy-redirects-4unik.md`](docs/proxy-redirects-4unik.md).
- Webhook do Sanity → rebuild no GitHub: [`docs/sanity-github-webhook.md`](docs/sanity-github-webhook.md).
- Loops de agentes em background (lanes, prioridades de rota, verificação): [`docs/landing-background-agents.md`](docs/landing-background-agents.md).
- Base de conhecimento NotebookLM + sync: [`docs/agent-knowledge-notebooklm.md`](docs/agent-knowledge-notebooklm.md), [`docs/knowledge-base/README.md`](docs/knowledge-base/README.md).
- Copy por ICP / linguagem acessível (ler antes de mudar copy ou SEO): [`docs/knowledge-base/notebooklm/icp-messaging-guide.md`](docs/knowledge-base/notebooklm/icp-messaging-guide.md). Inclui a secção **"Frases canónicas"** (logística, API, GTM dual) e a regra de densidade: uma promessa central por página; cada estatística aparece uma única vez no site. A home foi enxugada (sem `PricingSection`, só 1 `SectionLeadCta` — `afterPlatform`); o `homeBlocks()` em `src/sanity/lib/marketingPages.ts` espelha essa composição e não deve voltar a divergir.

### Skills & MCP (marketing / crescimento)

Skills versionadas em [`skills/`](skills/) (use pelo nome no chat ou `@skill`):

| Skill | Uso |
|-------|-----|
| `4unik-ai-discovery` | Posicionamento Reward Infrastructure / 4unik |
| `marketing-growth-hacker` | Funil, experimentos, priorização por rota |
| `marketing-content-creator` | Copy, blog, segmentos + Sanity |
| `marketing-ai-citation-strategist` | AEO e citação em assistentes |
| `landing-page-builder` | Estrutura CRO de landing |
| `notebooklm-knowledge-curator` | Sync e curadoria da KB NotebookLM |
| `marketing-page-ideator` | Novas páginas e gaps (readonly no backlog) |
| `marketing-strategy-orchestrator` | Planos amplos (um tema por sessão) |
| `hr-gamification-specialist`, `web-design-specialist` | RH/gamificação e UI premium |

MCP local **`4unik-marketing`**: [`mcps/4unik-marketing/`](mcps/4unik-marketing/), ativar em [`.cursor/mcp.json`](.cursor/mcp.json). Tools de conhecimento: `get_notebooklm_briefing`, `search_product_knowledge`, `suggest_growth_opportunities`, `get_knowledge_freshness` (+ GA/SEO simulado, blog, registry). **GA4:** conta `66932658` (4unik), propriedade `327916606`, stream `G-SMJDYCENBC` — ver [`docs/knowledge-base/integrations.md`](docs/knowledge-base/integrations.md). **Primeiro sync:** colar Briefing em `docs/knowledge-base/notebooklm/briefing.md` e `last_synced` em `meta.yaml`. Automations opcionais: [`docs/cursor-automations-growth.md`](docs/cursor-automations-growth.md).

**CI:** `.github/workflows/ci-validate.yml` corre `tsc` e `validate:blog-ctas` em PR/push para `main`. **CI (`.github/workflows/deploy.yml`):** o primeiro passo útil após `npm ci` imprime avisos se **faturação / minutos de Actions** bloquearem o GitHub (mensagem típica: *account locked due to a billing issue*). O passo **Verify Sanity secrets** falha só com `your-project-id` ou `xxx`; `placeholder` gera aviso e permite o build. Detalhes em `docs/cms.md`.

### Gotchas

- **Sanity env vars required**: `NEXT_PUBLIC_SANITY_DATASET` and `NEXT_PUBLIC_SANITY_PROJECT_ID` must be set for both `npm run dev` and `npm run build`. Without them, the `/studio` route crashes. Use `production` and `placeholder` as dummy values for local dev if real credentials aren't available.
- **Dev CSS / Turbopack**: com `basePath` `/landing`, o Turbopack pode lançar `No link element found for chunk …globals….css` ao recarregar estilos (HMR). Em dev, `assetPrefix` fica desligado em `next.config.ts` para mitigar; se ainda falhar, pare todos os `next dev`, apague `.next` e reinicie. Evite `npm run dev:webpack` — quebra `isomorphic-dompurify` no RSC.
- **Páginas de crescimento (pricing, segurança)**: gate em [`docs/content-approval-queue.md`](docs/content-approval-queue.md). Links no footer sempre; sitemap + `robots: index` quando `NEXT_PUBLIC_INDEX_GROWTH_PAGES=true` (secret no deploy). RH/Marketing/ROI calculadora: só backlog.
- **basePath**: Derived from `NEXT_PUBLIC_SITE_URL` (default `/landing` at `https://plataforma.4unik.com.br/landing/`). All app routes are prefixed accordingly. See [`src/lib/publicSite.ts`](src/lib/publicSite.ts).
- **Static export**: `next.config.ts` sets `output: "export"` — no SSR, no API routes. The build produces static HTML in `out/`.
- **Lead capture forms**: set `NEXT_PUBLIC_LEADS_INGEST_URL` to a public HTTPS endpoint that accepts POST JSON matching `leadPayload` (`name`, `email`, `company`, `consent`, `source`, `locale`, etc.). Without it, submit shows a configuration error in the browser after export. Local `npm run dev` can use the Route Handler at `/api/leads` via same-origin fallback.
- **GA4 / analytics env**: `NEXT_PUBLIC_GA_ID` must use **static** `process.env.NEXT_PUBLIC_GA_ID` in [`src/lib/site.ts`](src/lib/site.ts) — dynamic `process.env[key]` is not inlined in client bundles (Realtime vazio). Run `npm run verify:ga-build` after build. Production deploy: `npm run deploy:production`. IDs and troubleshooting: [`docs/knowledge-base/integrations.md`](docs/knowledge-base/integrations.md).
- **Optional chat widget**: set `NEXT_PUBLIC_CHAT_SCRIPT_URL` to a third-party script URL (e.g. Intercom/Crisp). Loaded lazily after paint; no server required for static export.
- **AEO / assistentes**: `npm run build` runs `generate:llms` — regenerates `public/llms.txt` via `scripts/generate-llms-txt.ts` using `src/lib/parsePublicSiteUrl.ts` (same URLs as `robots.txt` / `sitemap.xml`). Override with **`NEXT_PUBLIC_SITE_URL`** at build time, or edit **`config/public-site.json`** for the repo fallback. See `docs/aeo-ai-visibility.md`. `pageAbsoluteUrl` in `src/lib/site.ts` resolves absolute URLs from the same canonical base.
- **OG images**: `npm run build` also runs `generate:og` — rasteriza templates SVG em PNG 1200×630 para `public/og/*.png` (via `sharp`), consumidos pela metadata em [`src/lib/seo/ogImages.ts`](src/lib/seo/ogImages.ts). Regenere com `npm run generate:og` ao mudar título/subtítulo das variantes.
- **ICP showcase images**: as páginas "Soluções por perfil" (`/para-plataformas`, `/educacao`, `/vendas`, `/comunidades`, `/eventos`) usam mockups enquadrados em `public/screens/icp/`. São gerados a partir de screenshots de `public/screens/` por [`scripts/generate-icp-showcase-images.mjs`](scripts/generate-icp-showcase-images.mjs) (`npm run generate:icp-screens`), não pelo `build`. Os visuais/acentos/fontes ficam em [`src/config/icp-profile-visuals.ts`](src/config/icp-profile-visuals.ts) e os componentes em [`src/components/icp/`](src/components/icp/). Ao trocar a fonte de um vertical, atualize o script e rode `npm run generate:icp-screens` (commit dos `.webp`).
- **robots.txt**: gerado pela rota [`src/app/robots.ts`](src/app/robots.ts) (não há mais `public/robots.txt` estático); o export estático continua a servir `robots.txt` a partir da mesma base canónica.
- **Lint has pre-existing errors**: `npm run lint` exits with code 1 due to pre-existing lint errors in the codebase (unescaped entities, unused vars, etc.). This is expected.
- **Tests:** `npm run test:svg` — sanitização mínima de SVG (`scripts/run-svg-sanitize-tests.ts`). Não há suite completa de testes E2E no repo.
- **`.npmrc` config**: Uses `legacy-peer-deps=true` and a custom cache dir `/tmp/landing-cache`.
- **`next-app/` directory**: Empty placeholder package at root — not used; ignore it.

### Curadoria de ícones (marketing / `featureGridBlock`)

Novos ícones para a grade de features **não** se adicionam só no Studio: a lista visível vem do manifest em [`src/config/marketing-icon-manifest.ts`](src/config/marketing-icon-manifest.ts) e cada entrada precisa de um import correspondente em [`src/lib/marketing-icon-registry.tsx`](src/lib/marketing-icon-registry.tsx) (Lucide, ISC — [repositório oficial](https://github.com/lucide-icons/lucide)).

Referência de famílias candidatas, licenças e limitações: [`docs/icon-libraries.md`](docs/icon-libraries.md).

**Fluxo recomendado com agentes (Cursor, etc.):**

1. Pesquisar apenas **repositórios oficiais** ou com licença explícita (MIT/ISC); nunca copiar SVG de URLs aleatórias sem licença.
2. Escolher o nome do export Lucide (PascalCase) e confirmar que existe na versão `lucide-react` do projeto (`npm ls lucide-react`).
3. Acrescentar uma linha ao manifest (`id` em kebab-case estável, `title` legível).
4. Importar o componente em `marketing-icon-registry.tsx` e mapeá-lo em `LUCIDE_BY_EXPORT`.
5. Correr `npx tsc --noEmit`, `npm run test:svg` e `npm run build` (com env Sanity de placeholder se necessário).
6. **Revisão humana** obrigatória antes de merge: contraste, peso do traço alinhado à landing, e coerência com o resto da secção.

**SVG personalizado:** preferir o manifest; upload de `.svg` no CMS é para exceções e passa por sanitização no site (`npm run test:svg`) — não introduzir SVG não confiável sem revisão.

**Outras bibliotecas** (Heroicons, Phosphor, etc.): exigem decisão de produto (bundle, estilo) e um segundo mapa de família; não misturar silenciosamente com Lucide sem alterar o schema e o renderer.
