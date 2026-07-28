# Gemini Context — Landing Yoobe / 4unik

Site de marketing estático para Yoobe e plataforma 4unik. Next.js 16 com static export, Sanity CMS, GA4.

## Stack

Next.js 16 · React 19 · Tailwind CSS v4 · Sanity (`hin8ivz0`) · GA4 · npm

## Dev

```bash
npm run dev       # requer NEXT_PUBLIC_SANITY_PROJECT_ID e DATASET
npm run build     # export estático → out/
npm run lint
```

## Foco atual

- Marketing de crescimento para 4unik (gamificação corporativa / swag)
- SEO + AEO (citação em assistentes de AI)
- Blog com geração via AI → Sanity
- Páginas por perfil ICP (`/para-plataformas`, `/educacao`, etc.)

## Regras

- Static export: sem SSR, sem API routes em produção
- CMS é Sanity — usar ferramentas Sanity MCP para conteúdo
- GA4 property `327916606` para métricas
- Skills de marketing em `skills/` — referenciar antes de criar estratégias
