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

- Após deploy: abrir `{SITE_URL}/llms.txt` e `{SITE_URL}/robots.txt` (fallback atual: `https://yoooobe.github.io/landing/`).
- Rich Results / schema: validar amostras no [Schema.org validator](https://validator.schema.org/) com URL de produção.
