# Landing Yoobe / 4unik — Claude Context

## Projeto

Site de marketing estático da Yoobe / plataforma 4unik. Next.js com export estático, Sanity CMS, GA4. Deploy: `plataforma.4unik.com.br/landing` e `yoobe.co` via Vercel.

Repo: `Yoooobe/landing`

## Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Estilo**: Tailwind CSS v4, Framer Motion, Base UI
- **CMS**: Sanity (`hin8ivz0`)
- **Analytics**: GA4 (`G-SMJDYCENBC`, property `327916606`)
- **Build**: static export (`output: "export"`)
- **Package manager**: npm

## Comandos

```bash
npm run dev             # dev server (requer env Sanity)
npm run build           # build estático → out/
npm run lint
npm run deploy:production
npm run generate:blog-posts   # AI → Sanity (requer OPENAI_API_KEY)
npm run generate:og           # gera OG images PNG
npm run validate:landing-routes
npm run env:check
npm run fetch:ga4-snapshot
```

## Variáveis de ambiente

```
NEXT_PUBLIC_SANITY_PROJECT_ID=hin8ivz0
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION
SANITY_API_WRITE_TOKEN
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_SITE_URL        # define basePath dinamicamente
NEXT_PUBLIC_INDEX_GROWTH_PAGES
```

## Estrutura

```
src/
├── app/          # pages (App Router) — static export
├── components/   # UI + marketing components
│   └── icp/      # páginas por perfil de cliente
├── config/       # manifests de ícones, ICP visuals
├── lib/          # site.ts, seo/, publicSite.ts
└── sanity/       # schemas + queries GROQ
skills/           # skills de marketing para agentes
mcps/
└── 4unik-marketing/   # MCP local: GA4 + knowledge base
docs/             # documentação do projeto
```

## MCPs disponíveis

- **Local** `4unik-marketing`: tools `get_ga4_metrics`, `get_notebooklm_briefing`, `search_product_knowledge`, `suggest_growth_opportunities`
- **Global** `Sanity` (project `hin8ivz0`), `ga4-analytics`, `github`, `vercel`, `context7`

## Skills de marketing (`skills/`)

`4unik-ai-discovery`, `marketing-growth-hacker`, `marketing-content-creator`, `marketing-ai-citation-strategist`, `landing-page-builder`, `notebooklm-knowledge-curator`, `marketing-page-ideator`, `marketing-strategy-orchestrator`

## Gotchas

- É static export — sem API routes em produção, sem SSR
- `basePath` deriva de `NEXT_PUBLIC_SITE_URL` — rotas locais mudam com isso
- Lint tem erros pré-existentes (exit 1) — esperado
- `npm run dev` sem env Sanity → crash na rota `/studio`; use `placeholder` como PROJECT_ID
- Turbopack pode falhar CSS HMR com basePath — apagar `.next` e reiniciar resolve
- OG images (`public/og/*.png`) são geradas no build — não editar manualmente
