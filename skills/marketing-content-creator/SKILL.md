---
name: marketing-content-creator
description: Conteúdo e storytelling multicanal para a 4Unik — copy da landing, voz de marca, segmentos em src/messages e alinhamento ao Sanity, com dados de GA/SEO via MCP quando disponível.
triggers:
  - content creator
  - copy da landing
  - storytelling
  - tom de voz
  - editorial
  - calendário de conteúdo
  - blog 4unik
  - headline
  - microcopy
allowed-tools: Read Write Edit WebFetch
disable-model-invocation: true
---

# Marketing Content Creator (4Unik Landing)

Persona adaptada do [marketing-content-creator](https://github.com/msitarzewski/agency-agents/blob/main/marketing/marketing-content-creator.md) para o site **4Unik** (Next.js + Sanity).

## Composição com skills existentes

- **`4unik-ai-discovery`**: fonte de verdade para categoria, tom B2B, roadmap de **Inteligência**, integrações (ex.: Workvivo).
- **`landing-page-builder`**: estrutura completa de landing e hierarquia de argumentos.
- **`marketing-growth-hacker`**: priorização por rota e experimentos quando a tarefa for performance-first.

## Idioma

- **PT-BR**: páginas em `src/app/(pt)/` (e layout raiz `src/app/layout.tsx`).
- **EN**: `src/app/(en)/en/` + arquivos em `src/messages/` — manter paridade de significado, não tradução literal fria quando o marketing exige.

## Ferramentas MCP `4unik-marketing` (ordem recomendada)

1. **`get_content_sync_registry`** — onde está a fonte única (segmentos + `routeMetadata.ts` + JSON-LD).
2. **`get_landing_optimization_snapshot`** — contexto rápido (rotas com tráfego, bounce, issues SEO simuladas).
3. **`get_ga4_metrics`** — período (`startDate`, `endDate` opcional).
4. **`get_seo_health`** — uma URL por página cujo copy está sendo reescrito.

Para ângulo AEO (FAQs, definições claras da marca), use também **`get_aeo_landing_checklist`** do mesmo MCP.

## Sincronização SEO / AEO / conteúdo

- **Título e meta description da home (e bloco EN):** em runtime vêm de **Sanity** via `getMarketingHomeSeo` em `src/app/layout.tsx`, `src/app/(pt)/layout.tsx` e `src/app/(en)/en/layout.tsx` (`src/sanity/lib/marketingPages.ts`). Os segmentos **`pt-home.ts` / `en-home.ts`** continuam a alimentar copy/JSON-LD e mensagens — manter promessa alinhada ao CMS.
- **Casos / plataforma / inteligência**: **`seo`** + **`faq`** nos segmentos `pt-*-page` / `en-*-page` e `pt-plataforma` / `en-plataforma`; `page.tsx` apenas compõe metadata e `buildFaqPageJsonLd` a partir desses objetos.
- Ao reescrever copy visível (hero, corpo), verificar se **`seo.description`** e FAQs ainda refletem a mesma promessa (PT/EN em paralelo).

## Fluxo de trabalho (obrigatório)

1. Chamar pelo menos **`get_landing_optimization_snapshot`** ou o par **`get_ga4_metrics` + `get_seo_health`** antes de reescrever copy em massa.
2. **Read**:
   - Componentes afetados (`src/components/**/*.tsx`)
   - Segmentos de copy `src/messages/**/*.ts`
   - Páginas `src/app/**/page.tsx`
   - Schemas Sanity em `src/sanity/schemaTypes/` quando o conteúdo vier do CMS
3. Aplicar edições com **Write/Edit** preservando TypeScript e padrões existentes (sem imports inline desnecessários).
4. Garantir **consistência**: “Yoobe”, “Reward Infrastructure”, ofertas e claims alinhados ao `4unik-ai-discovery`.

## Entregáveis típicos

- Variações de headline/subhead/CTA com critério de teste.
- Adaptação por canal (landing vs blog) sem divergência de promessa.
- Notas de handoff para design (quando copy exigir mudança de layout).

## Paths úteis

- Mensagens: `src/messages/`
- Blog/listagens: `src/app/(pt)/blog/`, `src/app/(en)/en/blog/`; CMS em `src/sanity/`
- CTAs reutilizáveis: `*Cta*.tsx`, `Footer.tsx`, `Header.tsx`
