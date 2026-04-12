# Bibliotecas de ícones (curadoria)

Objetivo: ícones **outline** coerentes com a landing (navy, stroke ~2, escala 24×24), licenças claras e bundle controlado.

## Famílias aprovadas (referência)

| Família | Repositório | Licença típica | Nota |
|--------|----------------|-----------------|------|
| **Lucide** | [lucide-icons/lucide](https://github.com/lucide-icons/lucide) | ISC | **Em uso** — manifest em [`src/config/marketing-icon-manifest.ts`](../src/config/marketing-icon-manifest.ts) + registry em [`src/lib/marketing-icon-registry.tsx`](../src/lib/marketing-icon-registry.tsx). |
| Heroicons (outline) | [tailwindlabs/heroicons](https://github.com/tailwindlabs/heroicons) | MIT | Segunda família possível; exige pacote + mapa paralelo e alteração de schema. |
| Phosphor | [phosphor-icons/core](https://github.com/phosphor-icons/core) | MIT | Escolher um peso (regular/light) e documentar no guia visual. |
| Tabler | [tabler/tabler-icons](https://github.com/tabler/tabler-icons) | MIT | Outline consistente; whitelist no bundle. |

**Simple Icons** / marcas: tratar à parte (licença por marca); não misturar com ícones de UI nas mesmas grades sem critério editorial.

## Fluxo no repositório

1. Manifest (`marketing-icon-manifest.ts`): `id` (kebab-case), `title`, `lucideExport` (PascalCase, existente em `lucide-react`).
2. Registry: import explícito + entrada em `LUCIDE_BY_EXPORT`.
3. Schema `featureGridBlock`: validação `isMarketingIconId`; input visual [`IconPickerInput`](../src/sanity/components/IconPickerInput.tsx).
4. **SVG personalizado:** exceção; sanitização em [`src/lib/sanitize-svg.ts`](../src/lib/sanitize-svg.ts) + fetch em [`src/lib/fetch-sanitized-svg.ts`](../src/lib/fetch-sanitized-svg.ts). Preferir manifest.

Ver também [`AGENTS.md`](../AGENTS.md) (curadoria com agentes) e [`docs/cms.md`](cms.md).
