# Checklist SEO/AEO — 4unik Landing

**Canónica:** `https://plataforma.4unik.com.br/landing`  
**Repo:** `landing` (Next.js static export)

Use após cada deploy relevante ou sprint SEO. Automatize o máximo com os scripts npm; o resto é smoke manual.

---

## Fase 0 — Pré-requisitos

| # | Item | OK |
|---|------|:--:|
| 0.1 | Secrets GitHub: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_INDEX_GROWTH_PAGES=true`, `NEXT_PUBLIC_LEADS_INGEST_URL`, Sanity | ☐ |
| 0.2 | Merge em `main` com CI/deploy verde (ou fallback `npm run deploy:gh-pages`) | ☐ |

---

## Fase 1 — Build local (paridade CI)

```bash
export NEXT_PUBLIC_SITE_URL=https://plataforma.4unik.com.br/landing/
export NEXT_PUBLIC_SANITY_DATASET=production
export NEXT_PUBLIC_SANITY_PROJECT_ID=placeholder   # ou ID real
export NEXT_PUBLIC_INDEX_GROWTH_PAGES=true
export NEXT_PUBLIC_LEADS_INGEST_URL=https://leads-ingest-api.vercel.app/api/ingest

npm run build
npm run validate:landing-routes
npm run validate:blog-ctas
npm run verify:growth-index-build
npm run verify:leads-ingest-build
npm run verify:canonical-urls-build
npx tsc --noEmit
```

| # | Resultado esperado | OK |
|---|-------------------|:--:|
| 1.1 | Build exit 0, pasta `out/` | ☐ |
| 1.2 | `validate:landing-routes` → OK (19 route pairs) | ☐ |
| 1.3 | `verify:canonical-urls-build` → sem localhost/127.0.0.1 | ☐ |
| 1.4 | `og:image` em `out/para-plataformas/index.html` → URL `plataforma.4unik.com.br` | ☐ |

---

## Fase 2 — Artefactos em produção

Base: `https://plataforma.4unik.com.br/landing`

| # | URL | Verificar | OK |
|---|-----|-----------|:--:|
| 2.1 | `/robots.txt` | `Sitemap:` absoluto canónico | ☐ |
| 2.2 | `/sitemap.xml` | pricing, seguranca, 5 ICP, blog | ☐ |
| 2.3 | `/llms.txt` | ICP + growth URLs quando indexados | ☐ |
| 2.4 | `/pricing/` | `robots: index, follow` | ☐ |
| 2.5 | `/seguranca/` | idem | ☐ |

```bash
npm run validate:landing-routes -- --smoke https://plataforma.4unik.com.br/landing
```

---

## Fase 3 — Metadata & OG (amostragem)

| # | Página | `og:image` PNG dedicado | sem localhost | OK |
|---|--------|-------------------------|---------------|:--:|
| 3.1 | `/` | `4unik-home.png` | ☐ | ☐ |
| 3.2 | `/pricing/` | sim | ☐ | ☐ |
| 3.3 | `/para-plataformas/` | `4unik-para-plataformas.png` | ☐ | ☐ |
| 3.4 | `/educacao/` | `4unik-educacao.png` | ☐ | ☐ |
| 3.5 | `/api-integracoes/` | `4unik-api.png` | ☐ | ☐ |

---

## Fase 4 — JSON-LD

| # | Página | Schemas | Ferramenta | OK |
|---|--------|---------|------------|:--:|
| 4.1 | `/` | Organization, WebSite, SoftwareApplication | [Rich Results](https://search.google.com/test/rich-results) | ☐ |
| 4.2 | `/plataforma/` | SoftwareApplication | schema.org | ☐ |
| 4.3 | `/plataforma/campanhas-gamificacao/` | FAQPage + BreadcrumbList | | ☐ |
| 4.4 | `/api-integracoes/workvivo/` | FAQPage + BreadcrumbList | | ☐ |
| 4.5 | 1 post blog | BlogPosting | | ☐ |

---

## Fase 5 — Leads

| # | Teste | OK |
|---|-------|:--:|
| 5.1 | `npm run verify:leads-ingest-build` após build | ☐ |
| 5.2 | Submit teste em form ICP → HTTP 2xx no ingest | ☐ |
| 5.3 | `npm run smoke:leads-ingest` (opcional) | ☐ |

Ver [`leads-ingest.md`](leads-ingest.md).

---

## Fase 6 — Instrumentação contínua

| # | Acção | OK |
|---|-------|:--:|
| 6.1 | Google Search Console: propriedade + sitemap `…/landing/sitemap.xml` | ☐ |
| 6.2 | GA4: `NEXT_PUBLIC_GA_ID` no deploy ou Sanity | ☐ |
| 6.3 | Baseline GSC (indexadas, impressões 28d) registada | ☐ |

Ver [`proxy-redirects-4unik.md`](proxy-redirects-4unik.md).

---

## Fase 7 — AEO qualitativo (baseline)

Repetir antes/depois de deploys grandes; anotar se citam 4unik.

| Prompt | Cita 4unik? |
|--------|:-----------:|
| "O que é reward infrastructure?" | ☐ |
| "Plataforma de gamificação B2B Brasil" | ☐ |

---

## One-liner (automação pós-build)

```bash
npm run build && \
npm run validate:landing-routes && \
npm run validate:blog-ctas && \
npm run verify:growth-index-build && \
npm run verify:leads-ingest-build && \
npm run verify:canonical-urls-build && \
npm run validate:landing-routes -- --smoke https://plataforma.4unik.com.br/landing
```

---

## Referências

- [`aeo-ai-visibility.md`](aeo-ai-visibility.md)
- [`landing-improvement-backlog.md`](landing-improvement-backlog.md)
- [`content-approval-queue.md`](content-approval-queue.md)
