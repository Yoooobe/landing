# Visibilidade em assistentes de IA (AEO) — o que o repositório faz

## Agentes Cursor vs. ChatGPT / Claude / Gemini

- **Agentes no Cursor** (tarefas no IDE, CI, refactors) **não** fazem com que o ChatGPT, Claude ou Gemini “recomendem” a marca. São fluxos de desenvolvimento locais ou na nuvem ligados ao código.
- **Recomendações em chats** dependem de: treino dos modelos, **pesquisa na web** quando o produto tem browsing, **índices** (Google, Bing), menções em fontes citáveis, e **conteúdo claro** no site.

## O que já está alinhado a AEO neste projeto

| Mecanismo | Onde |
| --- | --- |
| `Organization` + `WebSite` + `SoftwareApplication` (home) JSON-LD | `src/lib/jsonLd.ts`, `LocaleRootLayout`, `HomePage` |
| `FAQPage` onde há FAQ | `MarketingPageWithFaq`, páginas API |
| `BreadcrumbList` | Blog, marketing com FAQ, API |
| `BlogPosting` | Posts do blog |
| Meta e descrições enterprise | `pt-home` / `en-home` |
| **llms.txt** | Gerado em `npm run build` (`scripts/generate-llms-txt.ts`) com a mesma regra que `robots`/`sitemap` (`parsePublicSiteUrl` + `NEXT_PUBLIC_SITE_URL` ou [`config/public-site.json`](../config/public-site.json)) |
| **robots.txt** | `src/app/robots.ts` — `allow` amplo + `sitemap` absoluto |
| Conteúdo citável | Blog, FAQs, faixa enterprise na home |

## Boas práticas contínuas (editorial)

1. Manter definições estáveis (“o que é reward infrastructure”) em página pilar ou blog.
2. Publicar respostas claras a perguntas frequentes (formato pergunta/resposta corrido, não só acordeão, quando possível no corpo da página).
3. Evitar bloquear crawlers de IA **se** o objetivo é aparecer em ferramentas que respeitam `robots.txt` (avaliar risco de scraping vs. visibilidade).

## Verificação manual

Checklist completo pós-deploy: [`seo-validation-checklist.md`](seo-validation-checklist.md).

- Após deploy: abrir `{SITE_URL}/llms.txt` e `{SITE_URL}/robots.txt` (canónica: `https://plataforma.4unik.com.br/landing/`).
- Rich Results / schema: validar amostras no [Schema.org validator](https://validator.schema.org/) com URL de produção.
- OG social: confirmar `og:image` aponta para PNG em `public/og/` (gerados por `npm run generate:og`) — **nunca** `localhost` no export (`npm run verify:canonical-urls-build`).

## Backlog estratégico (requer dados / decisão de produto)

Itens **não** implementados automaticamente — dependem de conteúdo real ou priorização comercial:

| Área | Ação sugerida |
|------|----------------|
| **EEAT** | Testemunhos e casos com clientes reais, logos com permissão, bios de autor no blog — **infra implementada** (`authorProfile` no blog, selos ilustrativo/verificado em depoimentos); conteúdo real depende de Marca/Jurídico |
| **Métricas** | Substituir stats de marketing (ex. 500+ empresas, 98% satisfação) por números auditáveis ou marcar como ilustrativo |
| **Topic clusters** | Páginas pilar + comparativos (“gamificação para RH”, “4unik vs …”) |
| **Conversão** | Reativar calculadora de ROI (`ROICalculator` removido como código morto) com i18n |
| **Leads** | Definir `NEXT_PUBLIC_LEADS_INGEST_URL` em produção (forms falham sem endpoint no export estático) |
| **Logística** | Publicar `/plataforma/logistica-integrada/` ou remover de CTAs/nav até haver conteúdo |
| **CMS** | Ligar slugs `home` / `plataforma` / `api-integracoes` / `gamificacao` ao `MarketingPageRenderer` (ver [`sanity-consumed-checklist.md`](sanity-consumed-checklist.md)) |
