# Checklist: documentos Sanity consumidos pelo site (build)

Referência para saber **o que preencher no Studio** com impacto direto na landing exportada. Rotas assumem `basePath` `/landing` em dev padrão.

## Como o `marketingPage` entra na página

- O frontend faz fetch por **`locale` + `slug.current`** (`marketingPageBySlugQuery`).
- Só se o documento tiver **`content` com pelo menos um bloco** é que o corpo da página vem **só do CMS**. Caso contrário usa-se o **fallback em código** (`buildFallbackMarketingPage` em `src/sanity/lib/marketingPages.ts`), mas **SEO do CMS** (`metaTitle` / `metaDescription`) ainda pode sobrepor o fallback quando preenchido.
- **`openGraphDescription`** (OG/Twitter): campo opcional no grupo SEO do `marketingPage` (`seoType`). Em `pageSeo()`, o CMS **substitui** o texto de OG do fallback quando preenchido; caso contrário usa-se o fallback de cada slug (ex.: `getResolvedGamificacaoContent`, `getResolvedApiIntegracoesContent`, segmentos em `src/messages/segments/*`).

**Espelho editorial (`contentMirror`):** não alimenta o export — ver [`content-mirror-policy.md`](content-mirror-policy.md).

---

## Secções do Studio a cobrir (por impacto)

| Secção no Studio (`structure.ts`) | Consome no site? | Notas |
|-----------------------------------|------------------|--------|
| **Configurações do site** (`siteSettings`) | Sim | Menus cabeçalho/rodapé, logos confiança/clientes, IDs analytics, links globais, OG default. |
| **Blog — Engaja, time!** (`blogPost`) | Sim | Listagem e posts por slug PT/EN. |
| **Landing pages** (`marketingPage`) | Sim | Uma entrada por **slug** e **idioma** para as rotas abaixo. |
| **Menus** (`menu`) | Sim (via `siteSettings`) | Referenciados em `siteSettings`, não editados isoladamente na maioria dos fluxos. |
| **Coleções de logos** (`logoCollection`) | Sim | Via `siteSettings` e/ou blocos `logoStripBlock` em `marketingPage`. |
| **Mídia de showcase da home** (`homeShowcaseMedia`) | Sim | Chave típica `home-default` (+ locale). |
| **Mídia de showcase da plataforma** (`platformShowcaseMedia`) | Sim | `pageKey` típico `plataforma` (+ locale). |
| **Mídia de showcase — gamificação** (`gamificacaoShowcaseMedia`) | Sim | Chave típica `gamificacao-default` (+ locale). |
| **Mídia de showcase — API e integrações** (`apiIntegracoesShowcaseMedia`) | Sim | Chave típica `api-integracoes-default` (+ locale). |
| **Mídia de showcase — Workvivo** (`workvivoShowcaseMedia`) | Sim | Chave típica `workvivo-default` (+ locale). |
| **Páginas estruturais (legado)** (`page`, slug `home`) | Sim (opcional) | Só o **primeiro `heroBlock`** é lido (`getHomeHeroFromCms`) para sobrepor hero da home se `headline` não vazio. |
| **Estratégias de marketing** (`marketingStrategy`) | Não no site público | Query existe; **nenhuma** rota `src/app` usa. |
| **Espelho editorial do código** (`contentMirror`) | Não no site público | Ver [`content-mirror-policy.md`](content-mirror-policy.md). |

---

## Checklist por rota (slug / chave)

Cada linha: **rota** → **documentos / chaves** consumidos hoje.

### Home

| Rota | `marketingPage` | Outros Sanity |
|------|-----------------|---------------|
| `/` (PT), `/en/` (EN) | `slug`: **`home`**, `locale`: `pt` / `en` | `homeShowcaseMedia` **`mediaKey` `home-default`**; opcional `page` slug **`home`** (hero legado) |

- Metadata: `getMarketingHomeSeo` → merge CMS + fallback home (`src/sanity/lib/home.ts`).

### Plataforma (overview)

| Rota | `marketingPage` | Outros Sanity |
|------|-----------------|---------------|
| `/plataforma/`, `/en/plataforma/` | `slug`: **`plataforma`** | `platformShowcaseMedia` **`pageKey` `plataforma`**; `homeShowcaseMedia` **`home-default`** (conteúdo de apoio na página) |

### Inteligência

| Rota | `marketingPage` |
|------|-----------------|
| `/inteligencia/`, `/en/inteligencia/` | `slug`: **`inteligencia`** |

### Casos de uso

| Rota | `marketingPage` |
|------|-----------------|
| `/casos-de-uso/`, `/en/casos-de-uso/` | `slug`: **`casos-de-uso`** |

### API e integrações

| Rota | `marketingPage` | Outros Sanity |
|------|-----------------|---------------|
| `/api-integracoes/`, `/en/api-integracoes/` | `slug`: **`api-integracoes`** (SEO + FAQ JSON-LD se bloco `faqBlock`; corpo costuma ser fallback se `content` vazio) | `apiIntegracoesShowcaseMedia` **`mediaKey` `api-integracoes-default`** |

### Motor de gamificação (Plataforma)

| Rota | `marketingPage` | Outros Sanity |
|------|-----------------|---------------|
| `/plataforma/motor-gamificacao/`, `/en/plataforma/motor-gamificacao/` | `slug`: **`gamificacao`**, `locale`: `pt` / `en` — usado por `buildMarketingPageMetadata` (título, descrição, OG) com merge sobre o fallback em `getResolvedGamificacaoContent` | `gamificacaoShowcaseMedia` **`mediaKey` `gamificacao-default`** |

- O **corpo** da página continua a vir de `getResolvedGamificacaoContent` + componentes (não de blocos `marketingPage`), salvo evolução futura do modelo.

### Workvivo (hub)

| Rota | `marketingPage` | Outros Sanity |
|------|-----------------|---------------|
| `/api-integracoes/workvivo/`, `/en/api-integracoes/workvivo/` | — | `workvivoShowcaseMedia` **`mediaKey` `workvivo-default`**; texto e meta vêm de `src/content/workvivo.ts` |

### Blog

| Rota | Documento |
|------|-----------|
| `/blog/`, `/en/blog/` | `blogPost` (lista por `locale`) |
| `/blog/[slug]/`, `/en/blog/[slug]/` | `blogPost` por slug + locale |

#### CTAs no corpo (`blogPost` → blocos `blogCta`)

- **Fallback em código** (slug `1`–`7`): CTAs e copy em `src/lib/blogFallback.ts`; URLs derivadas de `blogLandingHref` em `src/lib/blogLandingLinks.ts` (`basePath` + `/en` quando `locale` é inglês). Para **espelhar no dataset** após editar o fallback: `npm run sync:blog-fallback`.
- **Outros slugs / posts manuais ou IA:** nos campos `ctaHref` dos blocos `blogCta`, usar **paths internos** da mesma família que a tabela em `BLOG_CTA_PATHS_BY_SLUG` (ex.: `/plataforma/motor-gamificacao`, `/plataforma/loja-resgate`, `/casos-de-uso`) — o site prefixa com `basePath` e `/en` no idioma certo ao renderizar. Demo externa: manter o Calendly (`BLOG_DEMO_HREF` em `blogLandingLinks.ts`).
- **Geração IA** (`npm run generate:blog-posts`): injeta automaticamente o triplet alinhado à categoria (`BLOG_CATEGORY_TO_FALLBACK_SLUG`).

### Global (todas as páginas)

- **`siteSettings`** (singleton `siteSettings`): navegação, logos, pixels, URLs de contacto, imagem OG por defeito — carregado no cliente (`SiteSettingsContext`).

---

## Resumo mínimo por prioridade editorial

1. **`siteSettings`** — menus, links e analytics.
2. **`marketingPage`** — para cada slug ativo em PT e EN: `home`, `plataforma`, `inteligencia`, `casos-de-uso`, `api-integracoes`, **`gamificacao`** (motor de gamificação — SEO; blocos opcionais nos outros slugs).
3. **Showcases** — documentos com as chaves acima (`home-default`, `plataforma`, `gamificacao-default`, `api-integracoes-default`, `workvivo-default`) e locale alinhado.
4. **`blogPost`** — posts publicados por idioma.
5. **`logoCollection`** — se usarem strips no `marketingPage` ou trust/clients em `siteSettings`.

---

## Referências de código

- Fetch `marketingPage`: `src/sanity/queries/marketing.ts`, `resolveMarketingPage` em `src/sanity/lib/marketingPages.ts`.
- Encadeamento de páginas: `src/components/MarketingPageScreen.tsx`.
- Showcases: `src/sanity/lib/home.ts`, `platformShowcase.ts`, `gamificacaoShowcase.ts`, `apiIntegracoesShowcase.ts`, `workvivoShowcase.ts`.
- Hero legado: `src/sanity/lib/getHomeHeroFromCms.ts`.

---

## Operacional: leads e testes (fora do CMS)

- **Leads:** em produção estática, configurar **`NEXT_PUBLIC_LEADS_INGEST_URL`** para um endpoint HTTPS que aceite o payload dos formulários; sem isso o submit mostra erro de configuração após export. Ver [`AGENTS.md`](../AGENTS.md).
- **Testes E2E:** o repo não inclui suite Playwright completa; há `npm run test:svg` e smoke opcionais documentados noutros ficheiros. Priorizar conforme negócio (ex.: smoke do formulário de contacto após definir ingest).
