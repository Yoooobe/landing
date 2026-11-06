# Redesign yoobe.co — Plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar o `main` de `~/landing` no site yoobe.co (EN na raiz, marca Yoobe Inc.), com todo o conteúdo do 4unik, e congelar o 4unik num branch próprio que só recebe a tag canonical.

**Architecture:** `main` vira o yoobe.co (Vercel projeto `landing`, sem `basePath`, rotas EN em slugs ingleses). O 4unik fica em `4unik-legacy` publicado pelo GitHub Pages como hoje. Conteúdo Yoobe num dataset Sanity novo e privado (`yoobe`); leads por um segundo deploy do `leads-ingest-api`.

**Tech Stack:** Next.js 16 (static export), React 19, Tailwind 4, shadcn, framer-motion, Sanity (`hin8ivz0`), Postmark, Vercel, GitHub Pages, `tsx` + `node:test` para testes.

**Spec:** `docs/superpowers/specs/2026-11-06-yoobe-co-redesign-design.md`

## Global Constraints

- Zero ocorrência de `4unik` (case-insensitive) em qualquer arquivo de `out/` do yoobe.co — texto, meta, JSON-LD, alt, URL, nome de arquivo.
- Site em inglês na raiz de `https://www.yoobe.co` (apex `yoobe.co` redireciona para `www`). Sem `basePath`. Sem rotas PT publicadas.
- Organização: `Yoobe Inc.`, Delaware, USA. JSON-LD `Organization` sem `address`.
- Contatos: Calendly `https://calendly.com/yoobeco/demo`; e-mail público `vendas@yoobe.co`; WhatsApp `5541987607512` (`https://wa.me/5541987607512`, exibido `+55 41 98760-7512`).
- Notificação de leads do yoobe.co: `genau@yoobe.co`. Leads do 4unik continuam em `comercial@4unik.com.br`, deploy atual intocado.
- Catálogo/swag: `https://catalogo.yoobe.co` (produto `https://catalogo.yoobe.co/product`, kits `https://catalogo.yoobe.co/kits`). `sameAs` do JSON-LD: `["https://catalogo.yoobe.co/"]`.
- Conteúdo: pricing, cases, logos de clientes e LGPD mantidos como no 4unik, só traduzidos e com marca trocada.
- Sanity Yoobe: projeto `hin8ivz0`, dataset `yoobe`, `aclMode: private`. Dataset `production` não recebe escrita.
- 4unik: única mudança permitida é `<link rel="canonical">` nas páginas `/en/...` apontando para o yoobe.co. Páginas PT do 4unik não mudam.
- LLM para tradução: Moonshot `kimi-k2.6` (`https://api.moonshot.ai/v1`), fallback conforme `~/.claude/CLAUDE.md`.
- Push, deploy de produção e mudanças em contas externas (Vercel envs, Sanity dataset, Postmark, GA4, DNS) pedem confirmação do usuário no momento de executar.

## Review Focus

1. **Link interno antigo sobrevivendo** (`/en/plataforma/...`, `/plataforma/...`, `/landing/...`) em componente, mensagem, post do blog ou CTA do Sanity → 404 no yoobe.co. Teste: `scripts/check-internal-links.mjs` (Task 3) varre todo `out/**/*.html` e falha em qualquer `href` interno sem arquivo correspondente.
2. **Marca 4unik dentro de conteúdo vindo do Sanity ou de imagem** (body de post, `alt`, nome de asset, OG gerado) → passa despercebida no código. Teste: `scripts/brand-guard.mjs` (Task 5) roda sobre `out/` inteiro, incluindo nomes de arquivo, e entra no `build`.
3. **Push no `main` publicando conteúdo Yoobe no domínio 4unik** via GitHub Pages. Teste: Task 1, passo de verificação do workflow (`deploy.yml` no `main` não tem trigger `push`).
4. **Formulário enviando para o ingest do 4unik** porque `NEXT_PUBLIC_LEADS_INGEST_URL` não foi definida no build. Teste: Task 8 troca o default de `config/leads-ingest.json` e o smoke verifica a URL embutida no bundle.
5. **Build sem token lendo dataset privado** → páginas vazias silenciosas (os helpers caem no fallback). Teste: Task 2, `scripts/check-sanity-yoobe.mjs` falha o build se o dataset `yoobe` não retornar `siteSettings` e ≥ 1 `blogPost`.

---

### Task 1: Preservar o 4unik e isolar o deploy

**Files:**
- Modify: `.github/workflows/deploy.yml` (nos dois branches)
- Create: `archive/yoobe-co-2026-08/` (cópia de `sites/yoobe-co/`)
- Modify: crontab do usuário (linhas `SEO_IMPROVER_LOOP` e `LANDING_BLOG_AGENT`)

**Interfaces:**
- Produces: branch `4unik-legacy` (base `683d227c`) publicado pelo GitHub Pages; `main` sem deploy automático para Pages.

- [ ] **Step 1:** Comentar as duas linhas do crontab (`# PAUSADO yoobe-migration:` como prefixo). Verificar: `crontab -l | grep -E 'run-(seo|blog)'` só mostra linhas comentadas.
- [ ] **Step 2:** No `main`, commitar o trabalho pendente em dois commits: `chore: blog/seo agents pending work` (src, scripts, public/llms.txt, hermes, docs) e `chore: archive previous yoobe.co static page` (mover `sites/yoobe-co/` → `archive/yoobe-co-2026-08/`). Não commitar `logs/`.
- [ ] **Step 3:** `git branch 4unik-legacy 683d227c`. No `4unik-legacy`, trocar `on.push.branches` de `main` para `4unik-legacy` no `deploy.yml`.
- [ ] **Step 4:** Verificar que o legado reproduz o que está no ar: em worktree do `4unik-legacy`, `npm ci && npm run build` com as mesmas envs do CI; comparar a lista de arquivos de `out/` com `curl https://plataforma.4unik.com.br/landing/sitemap.xml` e o `<title>`/`<h1>` de 5 páginas EN e 5 PT com o ar. Se divergir, escolher o commit entre `683d227c` e o pendente que reproduz o ar e documentar na mensagem do commit.
- [ ] **Step 5:** No `main`, remover os triggers `push` e `repository_dispatch` do `deploy.yml` (fica só `workflow_dispatch`, com `if: github.ref == 'refs/heads/4unik-legacy'` no job). Verificar: `grep -A3 '^on:' .github/workflows/deploy.yml` não contém `push`.
- [ ] **Step 6:** Pedir confirmação ao usuário e então `git push origin main 4unik-legacy`. Em GitHub → Settings → Environments → `github-pages`, permitir o branch `4unik-legacy`. Verificar: `curl -sI https://plataforma.4unik.com.br/landing/` continua `200` com o mesmo `etag` (nenhum deploy disparado).

### Task 2: Dataset Sanity `yoobe` (privado) e leitura com token

**Files:**
- Create: `scripts/sanity-clone-to-yoobe.mjs`
- Create: `scripts/check-sanity-yoobe.mjs`
- Modify: `src/sanity/lib/client.ts:7-10`, `.env.local`, `package.json` (`build`)

**Interfaces:**
- Produces: dataset `yoobe` com `siteSettings`, `*ShowcaseMedia`, `logoCollection`, `menu`, `page`, `marketingPage` e assets copiados do `production` (sem `leadSubmission`, `emailTrackingEvent`, `blogPost` — blog é a Task 7). Env `SANITY_READ_TOKEN` (Viewer) usada no build.

- [ ] **Step 1:** Com confirmação, criar o dataset: `npx sanity dataset create yoobe --visibility private`.
- [ ] **Step 2:** `sanity-clone-to-yoobe.mjs`: exporta `production` (`npx sanity dataset export production --types <lista acima>`) e importa em `yoobe` (`--replace`). Só lê de `production`.
- [ ] **Step 3:** `check-sanity-yoobe.mjs`: com `SANITY_READ_TOKEN`, consulta `count(*[_type=="siteSettings"])` e `count(*[_type=="blogPost" && locale=="en"])` no dataset `yoobe`; sai com código 1 se qualquer um for 0 ou se `NEXT_PUBLIC_SANITY_DATASET !== "yoobe"`. Também confirma que uma consulta **sem** token retorna erro/vazio (dataset privado). Adicionar no início do script `build` (rodar só a partir da Task 7; até lá, permitir `blogPost` 0 via flag `--allow-empty-blog`).
- [ ] **Step 4:** `client.ts`: priorizar `SANITY_READ_TOKEN` para leitura; o write token só em scripts. `.env.local`: `NEXT_PUBLIC_SANITY_DATASET=yoobe`.
- [ ] **Step 5:** Verificar: `node scripts/check-sanity-yoobe.mjs --allow-empty-blog` → exit 0. Commit `feat(cms): yoobe private dataset`.

### Task 3: Rotas EN na raiz com slugs em inglês

**Files:**
- Create: `src/lib/routes.ts`, `src/lib/routes.test.ts`, `scripts/check-internal-links.mjs`
- Move: `src/app/(en)/en/**` → `src/app/(site)/**` (renomeando pastas conforme o mapa)
- Delete: `src/app/(pt)/**` (preservado no `4unik-legacy` e no histórico)
- Modify: `src/lib/locale.ts`, `src/app/sitemap.ts`, `scripts/validate-landing-routes.mjs`, todos os arquivos com `"/en/..."` hardcoded (61 arquivos — `grep -rlI '"/en/' src`)

**Interfaces:**
- Produces:
  - `ROUTES: Record<RouteKey, string>` e `type RouteKey` em `src/lib/routes.ts`.
  - `LEGACY_4UNIK_EN_TO_YOOBE: Record<string, string>` (path 4unik `/en/...` → path yoobe.co), usado na Task 9.
  - `localeFromPathname()` passa a retornar `"en"` por padrão; `localizedPath(path, "en")` devolve o path sem prefixo.

Mapa (chave → path yoobe.co ← path 4unik EN):

| RouteKey | yoobe.co | 4unik EN |
|---|---|---|
| home | `/` | `/en/` |
| platform | `/platform/` | `/en/plataforma/` |
| gamificationEngine | `/platform/gamification-engine/` | `/en/plataforma/motor-gamificacao/` |
| campaigns | `/platform/campaigns/` | `/en/plataforma/campanhas-gamificacao/` |
| wallets | `/platform/wallets/` | `/en/plataforma/controle-carteiras/` |
| rewardsStore | `/platform/rewards-store/` | `/en/plataforma/loja-resgate/` |
| logistics | `/platform/logistics/` | `/en/plataforma/logistica-integrada/` |
| managerDashboard | `/platform/manager-dashboard/` | `/en/plataforma/painel-gestor/` |
| integrations | `/integrations/` | `/en/api-integracoes/` |
| integrationsWorkvivo | `/integrations/workvivo/` | `/en/api-integracoes/workvivo/` |
| workvivo | `/workvivo/` | `/en/workvivo/` |
| intelligence | `/intelligence/` | `/en/inteligencia/` |
| rewardInfrastructure | `/reward-infrastructure/` | `/en/reward-infrastructure/` |
| useCases | `/use-cases/` | `/en/casos-de-uso/` |
| forPlatforms | `/for-platforms/` | `/en/para-plataformas/` |
| education | `/solutions/education/` | `/en/educacao/` |
| sales | `/solutions/sales/` | `/en/vendas/` |
| communities | `/solutions/communities/` | `/en/comunidades/` |
| events | `/solutions/events/` | `/en/eventos/` |
| gamification | `/gamification/` | `/en/gamificacao/` |
| gamificationForHr | `/gamification-for-hr/` | `/en/gamificacao-para-rh/` |
| roiCalculator | `/roi-calculator/` | `/en/calculadora-roi/` |
| pricing | `/pricing/` | `/en/pricing/` |
| security | `/security/` | `/en/seguranca/` |
| blog | `/blog/` | `/en/blog/` |
| blogPost | `/blog/[slug]/` | `/en/blog/[slug]/` |

- [ ] **Step 1: Teste** em `src/lib/routes.test.ts` (`node:test`, rodar com `npx tsx --test`):
  - `ROUTES.rewardsStore === "/platform/rewards-store/"`
  - todo valor de `ROUTES` começa e termina com `/` e não contém `/en/`
  - `LEGACY_4UNIK_EN_TO_YOOBE["/en/plataforma/loja-resgate/"] === "/platform/rewards-store/"` e o mapa cobre as 26 linhas da tabela
  - `localeFromPathname("/platform/") === "en"`; `localizedPath("/pricing/", "en") === "/pricing/"`
- [ ] **Step 2:** `npx tsx --test src/lib/routes.test.ts` → FAIL (módulo inexistente).
- [ ] **Step 3:** Implementar `routes.ts` e ajustar `locale.ts`. Adicionar `"test": "tsx --test src/**/*.test.ts"` ao `package.json`.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Mover as páginas para `src/app/(site)/` com os slugs da tabela; o `layout.tsx` de `(en)/en` vira `src/app/(site)/layout.tsx` (import `../globals.css`). Atualizar `PAGE_PATH`, `canonicalPath` e remover `languages["pt-BR"]` de cada `generateMetadata` (só `en` + `x-default`).
- [ ] **Step 6:** Substituir todos os paths hardcoded por `ROUTES.<key>`; `sitemap.ts` passa a gerar só EN a partir de `ROUTES` + slugs do blog; `validate-landing-routes.mjs` lê o mesmo mapa.
- [ ] **Step 7:** `check-internal-links.mjs`: para cada `out/**/*.html`, extrai `href`/`src` internos (começando com `/`), resolve para arquivo (`x/` → `x/index.html`) e falha listando os quebrados. Também falha em qualquer `href` começando com `/en/` ou `/landing/`.
- [ ] **Step 8:** Verificar (após Task 4 configurar o site sem basePath): `npm run build && node scripts/check-internal-links.mjs` → exit 0; `npx tsc --noEmit` sem erros novos. Commit `feat(routes): english routes at root`.

### Task 4: Configuração do site yoobe.co e deploy no Vercel `landing`

**Files:**
- Modify: `config/public-site.json` (`defaultSiteUrl: "https://www.yoobe.co"`), `vercel.json`, `package.json` (`build`), `scripts/deploy-yoobe-co.sh`
- Delete: `scripts/stage-vercel-out.mjs`, `scripts/generate-root-redirect-stubs.mjs` e `scripts/patch-legacy-html-redirects.mjs` se só servem ao `/landing`
- Link: `.vercel/project.json` → projeto `landing` (time `yoobe-devs-s-team`)

**Interfaces:**
- Consumes: Task 3.
- Produces: `npm run build` gera `out/` servível na raiz; `scripts/deploy-yoobe-co.sh [--prod]` publica `out/` no projeto `landing`.

- [ ] **Step 1:** `vercel.json`: `{"outputDirectory":"out","framework":null,"trailingSlash":true,"buildCommand":"npm run build"}` e redirect apex → `https://www.yoobe.co/:path*` (permanent). Remover o redirect `/ → /landing/`.
- [ ] **Step 2:** `vercel link --project landing --scope yoobe-devs-s-team --yes` (substitui o link `4unik-landing`). Envs no Vercel (Production/Preview), com confirmação: `NEXT_PUBLIC_SITE_URL=https://www.yoobe.co`, `NEXT_PUBLIC_SANITY_PROJECT_ID=hin8ivz0`, `NEXT_PUBLIC_SANITY_DATASET=yoobe`, `SANITY_READ_TOKEN`, `NEXT_PUBLIC_LEADS_INGEST_URL` (Task 8), `NEXT_PUBLIC_GA_ID` (Task 9).
- [ ] **Step 3:** `deploy-yoobe-co.sh`: sem flag faz `vercel deploy` (preview); com `--prod` faz `vercel deploy --prod`. Ambos a partir da raiz do repo.
- [ ] **Step 4:** Verificar: `NEXT_PUBLIC_SITE_URL=https://www.yoobe.co npm run build` → `out/index.html` existe; `grep -c 'plataforma.4unik\|/landing/' out/index.html` = 0; `node scripts/verify-canonical-urls-build.mjs` passa com canonical `https://www.yoobe.co/`. Commit `chore(deploy): serve yoobe.co from root`.

### Task 5: Marca Yoobe (código, assets, contatos, catálogo) + brand guard

**Files:**
- Create: `scripts/brand-guard.mjs`, `scripts/brand-guard.test.mjs`, `public/brand/yoobe-*` (logo, mark, wordmark a partir de `archive/yoobe-co-2026-08/logo.png`; favicon)
- Delete: `public/brand/4unik-*`
- Modify: `src/lib/site.ts` (`SITE_NAME = "Yoobe"`), `src/lib/jsonLd.ts`, `src/lib/calendly.ts`, `src/lib/whatsapp.ts`, `src/lib/rewardsCatalog.ts`, `src/components/Footer.tsx`, `src/components/FourUnikComplementStrip.tsx` (→ `CatalogComplementStrip.tsx`), `src/messages/segments/en-*.ts`, `src/content/*.ts`, `public/llms.txt` gerador (`scripts/generate-llms-txt.ts`), `scripts/generate-og-images.mjs`, Studio (`src/sanity/studioConfig.ts` título)
- Delete: `src/messages/segments/pt-*.ts` só se nada mais importar (senão manter — infra de i18n fica)

**Interfaces:**
- Produces: `brand-guard.mjs <dir>` → exit 1 listando `arquivo:linha` (ou nome de arquivo) com `/4unik/i`; entra no fim do script `build`.

- [ ] **Step 1: Teste** `brand-guard.test.mjs` (`node:test`): cria dir temporário com `a.html` contendo `Powered by 4Unik` → exit 1 e saída contém `a.html`; dir com `4unik-mark.webp` (conteúdo neutro) → exit 1; dir limpo → exit 0.
- [ ] **Step 2:** Rodar → FAIL. Implementar `brand-guard.mjs` (varre conteúdo de arquivos texto e nomes de todos os arquivos). Rodar → PASS.
- [ ] **Step 3:** Aplicar a marca: `SITE_NAME`, `Organization` (`name: "Yoobe Inc."`, `legalName: "Yoobe Inc."`, `foundingLocation: "Delaware, USA"`, `email: "vendas@yoobe.co"`, `sameAs: ["https://catalogo.yoobe.co/"]`, logo `/brand/yoobe-mark.webp`, sem `address`), `DEFAULT_CALENDLY_URL = "https://calendly.com/yoobeco/demo"`, `DEFAULT_WHATSAPP_NUMBER = "5541987607512"`, catálogo `https://catalogo.yoobe.co/product`. Rodapé: `© <ano> Yoobe Inc. · Delaware, USA` e `vendas@yoobe.co`, `+55 41 98760-7512`.
- [ ] **Step 4:** Textos: substituir 4unik/4Unik por Yoobe em `en-*` e `src/content/*`, revisando frase a frase (não sed cego — ex.: "4unik by Yoobe" vira "Yoobe"). Cases, pricing e LGPD ficam.
- [ ] **Step 5:** `siteSettings` do dataset `yoobe`: atualizar campos de Calendly, WhatsApp, `companySiteUrl` (`https://catalogo.yoobe.co`), título e scripts de marketing (limpar IDs 4unik — Task 9 coloca os novos).
- [ ] **Step 6:** Verificar: `npm run build` (já com `brand-guard out` no fim) → exit 0. Commit `feat(brand): yoobe inc branding`.

### Task 6: Identidade visual Yoobe derivada da 4unik

**Files:**
- Create: `docs/superpowers/specs/2026-11-06-yoobe-visual-options/` (mockups HTML usados na escolha)
- Modify: `src/app/globals.css` (tokens `@theme` e `:root`), `src/components/site-settings/LocaleRootLayout.tsx` (fonte), componentes que usam hex fixo (`grep -rlE '#f98f16|#ea580c|orange-[0-9]{3}' src` — 19 ocorrências)

**Interfaces:**
- Produces: tokens `--color-brand-primary`, `--color-brand-primary-dark`, `--color-brand-primary-light`, `--color-brand-ink`, `--color-brand-ink-dark`, `--color-brand-charcoal`, `--color-brand-surface`; classes antigas `brand-orange*`/`brand-navy*`/`brand-cream` renomeadas nos ~550 usos.

- [ ] **Step 1:** Montar 3 variações sobre a home e uma página de módulo renderizadas com os componentes reais (trocando só tokens/fonte/raio/sombra): mesma família visual da 4unik, outra marca. Mostrar ao usuário no navegador (visual companion) e **esperar a escolha**.
- [ ] **Step 2:** Aplicar a variação escolhida: renomear tokens (`brand-orange` → `brand-primary`, `brand-navy` → `brand-ink`, `brand-cream` → `brand-surface`) com substituição mecânica verificada por `grep -rc 'brand-orange\|brand-navy\|brand-cream' src` = 0; trocar hex fixos pelos tokens; trocar fonte via `next/font`.
- [ ] **Step 3:** Verificar: `npm run build` passa; screenshots (Chrome) de `/`, `/platform/`, `/pricing/`, `/blog/` em 1440px e 390px enviados ao usuário. Commit `feat(ui): yoobe visual identity`.

### Task 7: Blog no dataset `yoobe`

**Files:**
- Create: `scripts/blog-migrate-to-yoobe.ts`, `scripts/blog-migrate-to-yoobe.test.ts`, `scripts/blog-pairs.json` (gerado e revisado)
- Modify: `src/lib/blogFallback.ts` (só posts EN, marca Yoobe, links novos), `src/sanity/queries/blog.ts` se filtrar locale PT

**Interfaces:**
- Consumes: `ROUTES`, `LEGACY_4UNIK_EN_TO_YOOBE` (Task 3); `brand-guard` (Task 5).
- Produces: no dataset `yoobe`, 1 `blogPost` `locale: "en"` para cada post publicado do `production` (17 EN + PT sem par traduzidos; ~28 PT no total), mesmos `slug` EN, imagens copiadas.

- [ ] **Step 1:** Gerar `blog-pairs.json`: para cada post PT publicado, o post EN equivalente (mesmo `coverImage.asset._ref` ou mesmo `publishedAt` ±1 dia; o resto marcado `null`). Mostrar a lista ao usuário só se houver par ambíguo.
- [ ] **Step 2: Teste** `blog-migrate-to-yoobe.test.ts` para as funções puras:
  - `rewriteBody(blocks)` troca `href` `/en/plataforma/loja-resgate/` por `/platform/rewards-store/`, `/landing/en/blog/x/` por `/blog/x/`, e `https://plataforma.4unik.com.br/landing/en/...` pelo path novo
  - `rewriteBrand("4unik platform")` → `"Yoobe platform"`; `rewriteBrand("4Unik by Yoobe")` → `"Yoobe"`
  - post resultante passa no `brand-guard` (serializado em texto)
- [ ] **Step 3:** Rodar → FAIL; implementar; rodar → PASS.
- [ ] **Step 4:** Para PT sem par: traduzir título, excerpt, body (blocos de texto, preservando marks/links), `seo` e `alt` com `kimi-k2.6`; slug EN gerado do título traduzido. Gravar em `yoobe` como `draft` primeiro.
- [ ] **Step 5:** Mostrar ao usuário 2 posts traduzidos (lado a lado com o original) antes de publicar todos.
- [ ] **Step 6:** Publicar; `blogFallback.ts` fica só com EN rebrandado. Verificar: `node scripts/check-sanity-yoobe.mjs` (sem `--allow-empty-blog`) → exit 0; `npm run build` → `ls out/blog | wc -l` ≥ 46 (índice + posts); `check-internal-links` e `brand-guard` passam. Commit `feat(blog): migrate posts to yoobe`.

### Task 8: Leads do yoobe.co → genau@yoobe.co

**Files:**
- Modify: `config/leads-ingest.json` (`defaultIngestUrl` → URL do novo deploy), `leads-ingest-api/README.md` (seção "Deploy Yoobe")
- Create: novo projeto Vercel `yoobe-leads-ingest` com root `leads-ingest-api/`

**Interfaces:**
- Produces: `https://yoobe-leads-ingest.vercel.app/api/ingest` (ou domínio `leads.yoobe.co`, se o usuário quiser).

- [ ] **Step 1:** Com confirmação, criar o projeto Vercel a partir de `leads-ingest-api/` e definir envs: `LEADS_NOTIFY_EMAIL=genau@yoobe.co`, `LEADS_FROM_EMAIL=leads@yoobe.co`, `LEADS_SITE_URL=https://www.yoobe.co`, `LEADS_DEMO_URL=https://calendly.com/yoobeco/demo`, `ALLOWED_ORIGINS=https://www.yoobe.co,https://yoobe.co`, `NEXT_PUBLIC_SANITY_PROJECT_ID=hin8ivz0`, `NEXT_PUBLIC_SANITY_DATASET=yoobe`, `SANITY_API_WRITE_TOKEN` (token com escrita em `yoobe`), `POSTMARK_SERVER_TOKEN`, `POSTMARK_TEMPLATE_ID` (novo template Yoobe), `TRACKING_SECRET` novo. Não alterar o projeto `leads-ingest-api` do 4unik.
- [ ] **Step 2:** No Postmark, duplicar o template `45224995` como template Yoobe (sem 4unik, assinatura Yoobe Inc., Calendly Yoobe).
- [ ] **Step 3:** Verificar com `node scripts/smoke-leads-ingest.mjs <url-nova>`: resposta 2xx, documento `leadSubmission` no dataset `yoobe`, e-mail recebido em genau@yoobe.co (usuário confirma) e auto-reply Yoobe. Verificar no build: `grep -rl 'yoobe-leads-ingest' out/_next | head -1` não vazio e `grep -rl 'leads-ingest-api.vercel.app' out/` vazio. Commit `feat(leads): yoobe ingest endpoint`.

### Task 9: SEO, analytics e canonical no 4unik

**Files:**
- Modify (main): `src/app/robots.ts`, `scripts/generate-llms-txt.ts`, `scripts/generate-og-images.mjs`, `siteSettings` no dataset `yoobe` (GA4)
- Create (main): `config/yoobe-canonical-map.json` (gerado de `LEGACY_4UNIK_EN_TO_YOOBE` + slugs do blog: path 4unik EN → URL absoluta yoobe.co)
- Modify (`4unik-legacy`): `src/lib/seo/routeMetadata.ts` e `src/app/(en)/en/blog/[slug]/page.tsx` para usar o mapa como `canonical` nas páginas EN; copiar `config/yoobe-canonical-map.json`

**Interfaces:**
- Consumes: `LEGACY_4UNIK_EN_TO_YOOBE` (Task 3), slugs finais do blog (Task 7).

- [ ] **Step 1:** Com confirmação, criar propriedade GA4 "Yoobe — yoobe.co" e stream web `https://www.yoobe.co`; gravar o ID em `siteSettings` (dataset `yoobe`) e em `NEXT_PUBLIC_GA_ID` no Vercel. Google Ads, Meta e LinkedIn vazios.
- [ ] **Step 2:** `robots.ts` (allow tudo, disallow `/studio/`, sitemap `https://www.yoobe.co/sitemap.xml`), `llms.txt` e OG regenerados com marca Yoobe. Verificar: `npm run build`; `out/sitemap.xml` só contém URLs `https://www.yoobe.co/...` sem `/en/`; `brand-guard out` passa.
- [ ] **Step 3:** Gerar `config/yoobe-canonical-map.json` (script `scripts/build-canonical-map.ts`). Teste em `src/lib/routes.test.ts`: o mapa tem uma entrada para cada uma das 26 rotas EN do 4unik e para cada post EN do `production`, e todo valor começa com `https://www.yoobe.co/`.
- [ ] **Step 4:** No `4unik-legacy`: canonical das páginas `/en/...` e posts EN = valor do mapa; páginas PT inalteradas. Verificar no build do legado: `grep -o '<link rel="canonical"[^>]*>' out/en/plataforma/loja-resgate/index.html` → `https://www.yoobe.co/platform/rewards-store/`; `out/plataforma/loja-resgate/index.html` mantém canonical 4unik; `diff` dos demais bytes do HTML EN só na tag canonical/`hreflang`.
- [ ] **Step 5:** Com confirmação, push do `4unik-legacy` (dispara o Pages). Verificar no ar: `curl -s https://plataforma.4unik.com.br/landing/en/pricing/ | grep canonical`.
- [ ] **Step 6:** Search Console: adicionar a propriedade de domínio `yoobe.co` (registro TXT na zona do domínio — hoje nameservers `ns-cloud-d*.googledomains.com`), enviar o sitemap. Commit `feat(seo): yoobe.co seo + 4unik en canonical`.

### Task 10: Publicação e smoke em produção

- [ ] **Step 1:** `scripts/deploy-yoobe-co.sh` (preview). Enviar a URL ao usuário para revisão completa.
- [ ] **Step 2:** Após aprovação, `scripts/deploy-yoobe-co.sh --prod`.
- [ ] **Step 3:** Verificar no ar: `curl -sI https://yoobe.co/` → 308 para `https://www.yoobe.co/`; `node scripts/validate-landing-routes.mjs --smoke https://www.yoobe.co` → todas 200; `curl -s https://www.yoobe.co/ | grep -ci 4unik` = 0; formulário real enviado da home chega em genau@yoobe.co; GA4 Realtime mostra a visita.
- [ ] **Step 4:** Decidir com o usuário se os crons (pausados na Task 1) voltam apontando para o yoobe.co.

### Task 11: Estudo de ferramentas e recursos

**Files:**
- Create: `docs/superpowers/specs/2026-11-06-yoobe-tools-study.md`

- [ ] **Step 1:** Tabela com cada recurso — Sanity (+Studio, webhook), `leads-ingest-api`, Postmark, `nano-banana-api`, GA4, Google Ads, LinkedIn, Meta, Calendly, GitHub Pages/Actions, Vercel (`landing`, `4unik-landing`, `leads-ingest-api`), MCP `4unik-marketing`, Hermes (`hermes/`), `skills/`, `agent-os/`, crons de SEO/blog, scripts GA4/GSC, sync Obsidian: o que faz, onde está configurado, custo/conta, se segue no yoobe.co, o que muda (conta/chave Yoobe nova, rebrand), e o que pode ser descartado na simplificação futura do 4unik.
- [ ] **Step 2:** Entregar ao usuário o resumo em chat. Commit `docs: yoobe tools study`.

---

**Fora deste plano (pedido à parte, com confirmação):** fechar a leitura pública de `leadSubmission`/`emailTrackingEvent` no dataset `production`.
