# Landing Improvement Backlog

## Ready Now
| Priority | Theme | Change | Impact | Risk | Key files |
| --- | --- | --- | --- | --- | --- |
| P0 | SEO | Add a consistent default Open Graph image for marketing routes | High | Low | `src/lib/seo/routeMetadata.ts`, `public/og/4unik-default.svg` |
| P0 | Content safety | Prevent blank marketing pages when Sanity has an empty `content[]` payload | High | Medium | `src/sanity/lib/marketingPages.ts`, `src/components/MarketingPageRenderer.tsx` |
| P0 | Performance | Prioritize the main hero image and request better-sized Sanity assets | High | Low | `src/components/HomeHero.tsx`, `src/sanity/lib/image.ts` |
| P1 | SEO | Keep sitemap parity explicit for published routes while excluding noindex pages on purpose | Medium | Low | `src/app/sitemap.ts` |
| P1 | Performance | Load marketing trackers from env immediately when available instead of waiting on the site settings fetch | Medium | Low | `src/lib/site.ts`, `src/components/site-settings/MarketingScripts.tsx` |

## Next Up
| Priority | Theme | Change | Impact | Risk | Key files |
| --- | --- | --- | --- | --- | --- |
| P2 | i18n | Remove reliance on post-hydration locale correction for `document.documentElement.lang` | Medium | Medium | `src/app/layout.tsx`, `src/components/AppShell.tsx`, `src/lib/locale.ts` |
| P2 | Performance | Audit `framer-motion` usage above the fold on the home funnel | Medium | Medium | `src/components/HomeHero.tsx`, `src/components/ManagementSection.tsx`, related landing sections |
| P2 | CMS | Add stronger guardrails for incomplete `marketingPage` documents in Studio | Medium | Medium | `src/sanity/schemaTypes/marketingPageType.ts`, `docs/cms.md` |

## Blocked Or Larger Scope
| Priority | Theme | Change | Reason blocked |
| --- | --- | --- | --- |
| P3 | Rendering | Server-correct initial `<html lang>` per locale without any client bootstrap | Needs route-tree refactor to multi-root or locale-segment architecture |
| P3 | Images | Full responsive image strategy across all Sanity-powered components | Touches many marketing sections and should be done in measured batches |
