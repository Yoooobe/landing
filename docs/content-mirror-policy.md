# Política: `contentMirror` (espelho editorial)

## O que é

Documentos `contentMirror` no Sanity espelham ficheiros ou blocos de copy do repositório para **revisão editorial**, alinhamento com o código e eventual **preview** no Studio. Não são a fonte de verdade consumida pelo export estático na implementação atual.

## O que o site faz hoje

- As queries GROQ em `src/sanity/queries/*Mirror.ts` **não são importadas** por `src/app/` nem por `src/components/` que renderizam páginas públicas.
- O HTML em `out/` deriva de: `marketingPage`, documentos de showcase (`homeShowcaseMedia`, `platformShowcaseMedia`, etc.), `siteSettings`, `blogPost`, hero legado opcional (`page` + `getHomeHeroFromCms`), e fallbacks em TypeScript onde aplicável.

## Recomendações para editores

1. **Não contar com o espelho para SEO ou copy em produção** até existir uma integração explícita no build.
2. Usar o checklist em [`sanity-consumed-checklist.md`](sanity-consumed-checklist.md) para saber o que **realmente** alimenta cada rota.
3. Para alterar metadata/OG das landing pages: grupo **SEO** em `marketingPage` (incluindo **Descrição Open Graph / Twitter** quando disponível no schema).

## Se quiserem que o espelho alimente o site

É necessário trabalho de produto/código: carregar o documento no `fetch` da página, definir regras de merge com o fallback em TypeScript, testes e atualização desta documentação.
