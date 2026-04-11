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

## Next Up
| Priority | Theme | Change | Impact | Risk | Key files |
| --- | --- | --- | --- | --- | --- |
| P2 | CMS | Add stronger guardrails for incomplete `marketingPage` documents in Studio | Medium | Medium | `src/sanity/schemaTypes/marketingPageType.ts`, `docs/cms.md` |

## Blocked Or Larger Scope
| Priority | Theme | Change | Reason blocked |
| --- | --- | --- | --- |
| P3 | Rendering | Server-correct initial `<html lang>` per locale without any client bootstrap | Needs route-tree refactor to multi-root or locale-segment architecture |
| P3 | Images | Full responsive image strategy across all Sanity-powered components | Touches many marketing sections and should be done in measured batches |
