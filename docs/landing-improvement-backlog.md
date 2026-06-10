# Landing Improvement Backlog

## Ready Now
| Status | Priority | Theme | Change | Impact | Risk | Key files |
| --- | --- | --- | --- | --- | --- | --- |
| Done | P0 | SEO | Default Open Graph for blog posts sem capa (`/og/4unik-default.svg`) | High | Low | `src/app/(pt)/blog/[slug]/page.tsx`, `src/app/(en)/en/blog/[slug]/page.tsx` |
| Done | P0 | Content safety | `resolveMarketingPage` não devolve doc vazio; empty state no renderer | High | Medium | `src/sanity/lib/marketingPages.ts`, `MarketingPageRenderer.tsx`, `MarketingPageEmptyState.tsx` |
| Done | P0 | Performance | Hero home: larguras Sanity ~1120px main + constantes partilhadas | High | Low | `src/components/HomeHero.tsx`, `src/sanity/lib/image.ts` |
| Done | P1 | SEO | Sitemap: URL canónica gamificação = motor; removido par `/gamificacao/`; dead code | Medium | Low | `src/app/sitemap.ts` |
| Done | P1 | Performance | `EnvMarketingScripts` (só env) fora do fetch Sanity; CMS só se env ausente | Medium | Low | `EnvMarketingScripts.tsx`, `MarketingScripts.tsx`, `AppProviders.tsx` |
| Done | P2 | i18n | `<html lang>` só no servidor via `htmlLangForLocale()`; sem correção pós-hidratação no cliente | Medium | Low | `src/lib/locale.ts`, `src/app/(pt)/layout.tsx`, `src/app/(en)/en/layout.tsx`, `src/app/(studio)/layout.tsx` |
| Done | P2 | Performance | Motion no funil home: mantido acima da dobra no `HomeHero`; entradas `whileInView` extra em secções sem motion | Medium | Low | `FourUnikComplementStrip.tsx`, `EnterpriseTrustStrip.tsx`, `HomeFinalCta.tsx`, `TrustBar.tsx`, `SectionLeadCta.tsx` |
| Done | P1 | Content | Rotas ICP verticais (5× PT+EN) + UI dedicada `IcpProfilePage` | High | Medium | `src/components/icp/`, PR [#3](https://github.com/Yoooobe/landing/pull/3) |
| Done | P2 | CMS | Guardrails Studio: `marketingPage` exige ≥1 bloco + meta title/description | Medium | Low | `src/sanity/schemaTypes/marketingPageType.ts` |
| Done | P1 | GTM | `/pricing/` + `/seguranca/` PT+EN; gate em `content-approval-queue.md`; footer; sitemap condicional | High | Medium | `src/lib/growthPagePublish.ts`, `docs/content-approval-queue.md` |
| Done | P1 | Content | Post blog case Boticário (slug `"8"`, PT+EN) — treinamento gamificado segurança de dados | High | Low | `src/lib/blogFallback.ts`, `src/lib/blogLandingLinks.ts` |
| Done | P1 | Content | Case Boticário na página `/educacao/` (`IcpProfileCaseSection`) | High | Low | `src/messages/segments/*-educacao-page.ts`, `src/components/icp/` |

## Next Up
| Priority | Theme | Change | Impact | Risk | Key files |
| --- | --- | --- | --- | --- | --- |
| P1 | Ops | GitHub secret `NEXT_PUBLIC_INDEX_GROWTH_PAGES=true` no deploy após assinatura formal na fila | High | Low | `.github/workflows/deploy.yml`, `docs/content-approval-queue.md` |
| P1 | Content | Publicar valores Scale/Enterprise e comparativos na `/pricing/` após Financeiro + Jurídico | High | Medium | `src/messages/segments/*-pricing-page.ts` |
| P2 | Content | ICP transversal **RH** (`/rh/`) — matriz `icp-messaging-guide.md` | Medium | Medium | `src/messages/segments/`, `src/app/(pt)/` |
| P2 | Content | ICP transversal **Marketing** (`/marketing/`) | Medium | Medium | Idem |
| P2 | Product | Calculadora ROI (`/recursos/roi/`) — fórmula aprovada por Financeiro; sem garantia em JSON-LD | Medium | High | backlog + `docs/enterprise-content-strategy.md` |
| P2 | Content | Prova social/tração na home (R$ 1,34M, logos restantes) após Marca + Jurídico | Medium | Medium | `docs/content-approval-queue.md` |
| P3 | Content | Bloco embed YouTube no blog (schema + renderer) — backlog futuro | Low | Medium | `src/sanity/schemaTypes/blogPostType.ts`, `PortableTextContent` |
| P2 | Content | `/seguranca/` — citar SLA % e certificações só com contrato documentado | Medium | Medium | `src/messages/segments/*-seguranca-page.ts` |

## Blocked Or Larger Scope
| Priority | Theme | Change | Reason blocked |
| --- | --- | --- | --- |
| P3 | Rendering | Server-correct initial `<html lang>` per locale without any client bootstrap | Needs route-tree refactor to multi-root or locale-segment architecture |
| P3 | Images | Full responsive image strategy across all Sanity-powered components | Touches many marketing sections and should be done in measured batches |
