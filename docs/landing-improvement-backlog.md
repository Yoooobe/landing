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
| Done | P1 | Content | Rotas `/para-plataformas/` + `/en/para-plataformas/` — ICP plataformas/B2B SaaS embedded: API como camada de execução, fluxo Product/Inventory/Checkout, SDK Node/Python, sandbox, webhooks. Copy sem claims sensíveis | High | Medium | `src/app/(pt)/para-plataformas/`, `src/app/(en)/en/para-plataformas/`, `src/messages/segments/*-para-plataformas-page.ts`, `src/sanity/lib/marketingPages.ts` |
| Done | P2 | Content | Rotas `/educacao/` + `/en/educacao/` — ICP e-learning: recompensa tangível por conclusão (sem citar o número Boticário na copy pública) | Medium | Medium | `src/app/(pt)/educacao/`, `src/app/(en)/en/educacao/`, `src/messages/segments/*-educacao-page.ts` |
| Done | P2 | Content | Rotas `/vendas/` + `/en/vendas/` — ICP VP de Vendas: incentivo integrado ao CRM com premiação instantânea | Medium | Medium | `src/app/(pt)/vendas/`, `src/app/(en)/en/vendas/`, `src/messages/segments/*-vendas-page.ts` |
| Done | P3 | Content | Rotas `/comunidades/` + `/en/comunidades/` — ICP criadores/comunidades: loja VIP de fãs com fulfillment 4unik | Medium | Medium | `src/app/(pt)/comunidades/`, `src/app/(en)/en/comunidades/`, `src/messages/segments/*-comunidades-page.ts` |
| Done | P3 | Content | Rotas `/eventos/` + `/en/eventos/` — ICP produtores de eventos: pontos no evento + checkout no celular, retirada/entrega rastreada | Medium | Medium | `src/app/(pt)/eventos/`, `src/app/(en)/en/eventos/`, `src/messages/segments/*-eventos-page.ts` |
| Done | P1 | Content | UI dedicada ICP (`IcpProfilePage`, hero temático, showcases `public/screens/icp/`, bloco `icpProfilePage`) — PR [#3](https://github.com/Yoooobe/landing/pull/3) | High | Medium | `src/components/icp/`, `src/config/icp-profile-visuals.ts`, `src/lib/icpVerticalPages.ts` |
| Done | P2 | CMS | Guardrails Studio: `marketingPage` exige ≥1 bloco + meta title/description | Medium | Low | `src/sanity/schemaTypes/marketingPageType.ts`, `docs/cms.md` |
| Draft | P1 | Content | `/pricing/` PT+EN — 4 planos (Scale sob consulta); **noindex** até `NEXT_PUBLIC_INDEX_GROWTH_PAGES=true` | High | Medium | `src/app/(pt)/pricing/`, `docs/content-approval-queue.md` |
| Draft | P2 | Content | `/seguranca/` PT+EN — governança sem SLA %; **noindex** até aprovação | Medium | Medium | `src/app/(pt)/seguranca/`, `docs/content-approval-queue.md` |

## Next Up
| Priority | Theme | Change | Impact | Risk | Key files |
| --- | --- | --- | --- | --- | --- |
| P1 | GTM | Publicar pricing/segurança: aprovar fila em `content-approval-queue.md`, indexar (`INDEX_GROWTH_PAGES`), sitemap + menu | High | Medium | `docs/content-approval-queue.md`, `src/app/sitemap.ts` |
| P2 | Content | Landing pages por ICP transversal (RH, Marketing) usando a matriz de `icp-messaging-guide.md` | Medium | Medium | `src/messages/segments/`, `docs/knowledge-base/notebooklm/icp-messaging-guide.md` |
| P2 | Content | Calculadora de ROI + `/recursos/sla/` — prova verificável; sem ROI garantido em JSON-LD | Medium | High | `docs/enterprise-content-strategy.md` |
| P2 | Content | Revisar prova social/tração (R$ 1,34M, logos, Boticário +308%) e expor na landing só após aprovação de marca/jurídico | Medium | Medium | `src/messages/segments/`, `docs/content-approval-queue.md` |

## Blocked Or Larger Scope
| Priority | Theme | Change | Reason blocked |
| --- | --- | --- | --- |
| P3 | Rendering | Server-correct initial `<html lang>` per locale without any client bootstrap | Needs route-tree refactor to multi-root or locale-segment architecture |
| P3 | Images | Full responsive image strategy across all Sanity-powered components | Touches many marketing sections and should be done in measured batches |
