# yoobe.co — Claude Context

## Projeto

Site corporativo da **Yoobe Inc.** (Delaware) em **inglês**, publicado em `https://corporate.yoobe.co` (projeto Vercel `yoobe-corporate`). Next.js 16 static export, Sanity CMS, Tailwind 4, tema coral (`brand-primary #ff6b57`) sobre navy (`brand-ink #0a1f5c`), fonte Outfit.

Repo: `Yoooobe/landing` · branch `main` = yoobe.co · branch `4unik-legacy` = plataforma.4unik.com.br congelado (publicado via branch `gh-pages`, nunca a partir do `main`).

## Deploy

- **corporate.yoobe.co** (este site Next): projeto Vercel `yoobe-corporate`. Preview: `vercel deploy`; produção: `bash scripts/deploy-yoobe-co.sh --prod` (usa o link em `.vercel/project.json` → `yoobe-corporate`). DNS: registro A `corporate.yoobe.co → 76.76.21.21` na zona Cloud DNS `yoobe-co` (projeto GCP `crypto-quasar-327717`).
- **yoobe.co / www.yoobe.co**: projeto Vercel `landing`, serve a página estática `sites/yoobe-co-en/` (antiga, em inglês). Publicar: `cd sites/yoobe-co-en && vercel deploy --prod --scope yoobe-devs-s-team`. Não publicar o site Next no `landing` sem ok explícito do usuário.
- Leads: projeto Vercel `yoobe-leads-ingest` (código em `leads-ingest-api/`), notifica `genau@yoobe.co`; `ALLOWED_ORIGINS` inclui corporate.yoobe.co e www.yoobe.co.

## Variáveis de ambiente

```
NEXT_PUBLIC_SITE_URL=https://corporate.yoobe.co   # sem basePath
NEXT_PUBLIC_SANITY_PROJECT_ID=hin8ivz0
NEXT_PUBLIC_SANITY_DATASET=yoobe            # nunca production (é do 4unik)
SANITY_READ_TOKEN                            # posts têm _id com ponto → leitura exige token
NEXT_PUBLIC_LEADS_INGEST_URL
NEXT_PUBLIC_GA_ID                            # GA4 da Yoobe (não usar G-SMJDYCENBC, é 4unik)
```

## Regras

- Zero "4unik" no site publicado: `scripts/brand-guard.mjs` roda no `build` e falha se aparecer.
- Rotas em inglês definidas em `src/lib/routes.ts` (`ROUTES`, `toYoobePath`); links internos checados por `scripts/check-internal-links.mjs` no `build`.
- Não usar o domínio yoobe.me. Catálogo/swag: `catalogo.yoobe.co`. Contato: `vendas@yoobe.co`, WhatsApp +55 41 98760-7512, Calendly `yoobeco/demo`.
- Leads no Sanity sempre com `_id` `leads.<uuid>` (o plano não permite dataset privado).

## Gotchas

- Mudou conteúdo no Sanity e o build não refletiu → `rm -rf .next/cache/fetch-cache`.
- `vercel.json` usa `routes` explícitas (filesystem → barra final → 404); `trailingSlash` servia index.html para qualquer URL.
- `.vercelignore` precisa de `/` no início (senão ignora `public/brand`, `public/clients`).
- Lint tem erros pré-existentes (exit 1) — esperado.
- `npm test` roda testes de `src/`, `scripts/` e `leads-ingest-api/tests`.
