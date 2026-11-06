# Redesign yoobe.co — trazer a plataforma 4unik para a marca Yoobe

Data: 2026-11-06 · Autor: genau@yoobe.co (com Claude)

## Intenção

A Yoobe agora é a **Yoobe Inc. (Delaware)**. O yoobe.co hoje é uma página única em PT sobre
"operação de swags" (`sites/yoobe-co/index.html`, HTML estático). Todo o conteúdo rico do
produto — plataforma de gamificação e recompensas, módulos, soluções por público, API,
pricing, blog — está publicado sob a marca 4unik em `plataforma.4unik.com.br/landing`.

O objetivo é que o visitante do yoobe.co veja **somente a Yoobe**: o site completo do
produto, em inglês, com a marca Yoobe e sem nenhuma referência à 4unik.

## Decisões do usuário

- yoobe.co passa a conter **todo o conteúdo** de plataforma.4unik.com.br (páginas + blog),
  rebrandado para Yoobe. Zero menção a 4unik no yoobe.co.
- **Inglês é o padrão** do site.
- **Visual baseado no site 4unik** (mesmos componentes/layout/animações), com uma
  **variação de cores e estilos semelhante, mas não igual**. A página atual do yoobe.co
  NÃO é referência visual.
- **Usar os mesmos recursos** do projeto 4unik (stack, CMS, ferramentas).
- **Todos os formulários** passam a notificar **genau@yoobe.co**.
- **SEO** faz parte do escopo do yoobe.co.
- **plataforma.4unik.com.br continua no ar**: não limpar, não redirecionar. Será
  simplificado depois, em outro projeto. Os textos PT/EN do 4unik serão mudados pelo
  usuário posteriormente.
- **Permitido** adicionar no 4unik, nas páginas em inglês (`/en/...`), um
  `<link rel="canonical">` apontando para a página equivalente do yoobe.co. É a única
  mudança autorizada no 4unik nesta fase.

## Objetivos

1. yoobe.co publicado com todas as 26 páginas de produto e os posts do blog, em inglês,
   marca Yoobe.
2. Identidade visual Yoobe derivada da 4unik, aprovada pelo usuário antes da implementação.
3. Formulários funcionando e chegando em genau@yoobe.co.
4. SEO completo no novo domínio: metadados, canonical, sitemap, robots, JSON-LD,
   `llms.txt`, OG images, GA4, Search Console.
5. 4unik intacto para o visitante, apenas com canonical nas páginas EN.

## Não-objetivos

- Versão em português no yoobe.co (pode vir depois em `/pt/`; a estrutura i18n existente
  deve continuar permitindo isso).
- Simplificar, limpar ou redirecionar o 4unik.
- Reescrever a stack ou trocar de CMS.
- Criar conteúdo novo além da adaptação necessária para marca/mercado.

## Anti-objetivos (falha mesmo que "funcione")

- Qualquer "4unik" visível no yoobe.co (texto, logo, alt, meta, OG, JSON-LD, e-mails,
  URLs, `llms.txt`, nome de arquivo de imagem servido).
- Quebrar ou alterar visualmente o plataforma.4unik.com.br.
- yoobe.co parecer um clone 1:1 do 4unik.
- Leads indo para `comercial@4unik.com.br` ou se perdendo.
- Expor dados de leads publicamente (ver Riscos — já acontece hoje).

## Estado atual (levantado em 2026-11-06)

- **Repo** `~/landing` → `github.com/Yoooobe/landing`, branch `main` com alterações não
  commitadas (blog agent, seo loop, `blogFallback.ts`).
- **App**: Next.js 16 + React 19, Tailwind 4, shadcn, framer-motion, static export
  (`output: "export"`), `basePath` derivado de `NEXT_PUBLIC_SITE_URL`.
- **i18n**: PT padrão na raiz (`src/app/(pt)`), EN em `/en` (`src/app/(en)/en`),
  strings em `src/messages/{pt,en}.ts`, conteúdo de módulos em `src/content/`.
- **Páginas (26 por idioma)**: home, plataforma + 6 módulos (motor-gamificacao,
  campanhas-gamificacao, controle-carteiras, loja-resgate, logistica-integrada,
  painel-gestor), api-integracoes (+workvivo), inteligencia, infraestrutura-de-recompensas
  (`/en/reward-infrastructure`), casos-de-uso, para-plataformas, educacao, vendas,
  comunidades, eventos, gamificacao, gamificacao-para-rh, calculadora-roi, pricing,
  seguranca, workvivo, blog.
- **Blog**: sitemap tem 30 posts PT e 20 EN. O Sanity de produção **não tem nenhum
  `blogPost`** — os posts vêm de `src/lib/blogFallback.ts` (código).
- **CMS**: Sanity projeto `hin8ivz0`, dataset `production`, Studio em `/studio`. Tipos
  presentes no dataset: `siteSettings`, `leadSubmission`, `emailTrackingEvent`, imagens.
- **Deploy 4unik**: GitHub Actions `.github/workflows/deploy.yml` → GitHub Pages a cada
  push em `main` (e via `repository_dispatch` do Sanity). Também existe projeto Vercel
  `4unik-landing` ligado à raiz do repo.
- **Deploy yoobe.co**: projeto Vercel `landing` (time `yoobe-devs-s-team`), domínios
  `yoobe.co`, `www.yoobe.co`, `landing.yoobe.co`; hoje recebe `sites/yoobe-co/` via
  `scripts/deploy-yoobe-co.sh`. `sites/` não está no git.
- **Leads**: `leads-ingest-api/` (Vercel separado) → grava `leadSubmission` no Sanity +
  Postmark para `comercial@4unik.com.br` + auto-reply (template `45224995`).
- **Ferramentas**: GA4, Google Ads, LinkedIn Insight, Meta Pixel, Calendly (45 refs),
  Postmark, Sanity, `nano-banana-api` (geração de imagem no Studio), MCP local
  `4unik-marketing`, perfis Hermes (`hermes/`), skills em `skills/`, scripts de SEO/GA4/GSC,
  sync Obsidian.
- **Automações em cron** que escrevem neste repo:
  - `0 9 * * 1 scripts/run-seo-improver-loop.sh`
  - `0 8 * * 2,4 scripts/run-blog-agent.sh` (falhando com "Permission denied")
- **Marca 4unik no código**: ~545 ocorrências em 86 arquivos de `src/`.

## Arquitetura (decisão do Claude — vetável)

**`main` vira o yoobe.co; o 4unik é congelado num branch próprio.**

- Criar branch `4unik-legacy` a partir do `main` atual (depois de commitar/guardar o
  trabalho pendente). O workflow de GitHub Pages passa a disparar **só** nesse branch.
  O 4unik continua sendo servido exatamente como está; a canonical EN é aplicada nesse
  branch e é o único deploy que ele recebe nesta fase.
- `main` é transformado no site Yoobe e publicado no projeto Vercel `landing`
  (yoobe.co). O projeto Vercel `4unik-landing` deixa de receber deploy de `main`.
- Motivo: reaproveita 100% dos componentes, CMS e scripts (pedido do usuário), não exige
  um sistema multi-marca que só existiria até o 4unik ser simplificado, e mantém o 4unik
  isolado de mudanças.
- `sites/yoobe-co/` (página atual) é commitada como arquivo histórico antes de ser
  substituída.

### Idioma e rotas

- EN na raiz do yoobe.co, sem prefixo `/en`. Slugs em inglês, ex.:
  `/platform`, `/platform/gamification-engine`, `/platform/campaigns`,
  `/platform/wallets`, `/platform/rewards-store`, `/platform/logistics`,
  `/platform/manager-dashboard`, `/integrations`, `/integrations/workvivo`,
  `/intelligence`, `/reward-infrastructure`, `/use-cases`, `/for-platforms`,
  `/solutions/education`, `/solutions/sales`, `/solutions/communities`,
  `/solutions/events`, `/gamification`, `/gamification-for-hr`, `/roi-calculator`,
  `/pricing`, `/security`, `/workvivo`, `/blog`, `/blog/[slug]`.
  Nomes finais ficam a critério do builder, desde que sejam inglês, curtos e estáveis.
- Sem `basePath` (site na raiz do domínio). Remover o redirect `/ → /landing/` do
  `vercel.json`.
- Manter a infraestrutura i18n para permitir `/pt/` no futuro, mas não publicar PT.

### Marca e conteúdo

- Trocar toda a marca 4unik por Yoobe: textos, logo, favicon, OG, JSON-LD
  (`Organization` = Yoobe Inc., Delaware, USA), e-mails, `llms.txt`, Studio.
- Rodapé com "Yoobe Inc." e Delaware.
- Base do texto: versões EN existentes (`src/messages/en.ts`, conteúdos EN). Páginas sem
  EN completo são traduzidas do PT.
- Conteúdo específico do Brasil (pricing, LGPD, cases brasileiros) é mantido como está,
  só traduzido e com a marca trocada — ver "Respostas do usuário".

### Blog

- Migrar os posts **EN** existentes (20) para o yoobe.co. Os posts só em PT (≈10) são
  traduzidos para EN.
- Posts passam a viver no **Sanity** (dataset da Yoobe), não mais em `blogFallback.ts`,
  para o yoobe.co ter CMS de verdade.
- Imagens dos posts: garantir que nenhuma contenha marca 4unik.

### Visual

- Partir do design system do 4unik (`docs/color-reference.md`, tokens Tailwind,
  componentes). Criar **2–3 variações** de paleta + tipografia + detalhes (raio, sombras,
  tratamento de gradientes) e mostrar ao usuário em mockup no navegador antes de
  implementar. A escolhida vira os tokens do tema Yoobe.
- Critério: claramente da mesma família do 4unik, claramente outra marca.

### Formulários e leads

- `leads-ingest-api`: destinatário da notificação → **genau@yoobe.co**; remetente e
  auto-reply com marca Yoobe (novo template Postmark ou template alterado, sem 4unik).
- Calendly: links com marca Yoobe (o builder confirma se a conta/evento atual serve).
- WhatsApp/telefone BR: remover ou substituir (ver Perguntas abertas).

### SEO

- Canonical, sitemap, robots, hreflang (só `en` agora), JSON-LD, OG images e `llms.txt`
  gerados para `https://www.yoobe.co` (ou apex — o builder escolhe um e redireciona o outro).
- GA4: propriedade/stream para yoobe.co; Google Ads/LinkedIn/Meta conforme as contas da
  Yoobe.
- Google Search Console: verificar yoobe.co e enviar sitemap.
- No 4unik (branch `4unik-legacy`): `<link rel="canonical">` em cada página `/en/...` e
  em cada post EN apontando para a URL equivalente do yoobe.co. Páginas PT do 4unik não
  são tocadas.
- O builder deve gerar um mapa URL 4unik EN → URL yoobe.co (usado pela canonical e
  futuramente pelos redirects quando o 4unik for simplificado).

### Ferramentas e automações

- O estudo de ferramentas pedido pelo usuário é um entregável: tabela de cada ferramenta
  (o que faz, onde está configurada, se continua no yoobe.co, se precisa de conta/chave
  Yoobe nova).
- Crons `run-seo-improver-loop.sh` e `run-blog-agent.sh`: **pausar** durante a migração
  (eles escrevem em `main`) e decidir depois se passam a trabalhar para o yoobe.co.
- Rebrand do MCP `4unik-marketing`, perfis Hermes e skills: fora do escopo da primeira
  entrega, entra no estudo de ferramentas como recomendação.

## Riscos

- **Leads expostos (urgente, independente do redesign):** o dataset `production` do
  Sanity aceita consulta anônima e os 11 `leadSubmission` (nome, e-mail, telefone,
  empresa) são legíveis publicamente. Corrigir antes: tornar o dataset privado (e
  ajustar o build para usar token de leitura) ou mover leads para dataset privado.
- Push acidental em `main` disparando deploy do GitHub Pages com conteúdo Yoobe no
  domínio 4unik — mitigado alterando o workflow antes de qualquer mudança no `main`.
- Conteúdo duplicado entre domínios — mitigado pela canonical EN.
- Trabalho pendente não commitado em `main` (blog agent) — salvar antes de criar o
  branch legado.

## Deixado para o builder

- Nomes finais dos slugs em inglês.
- Apex vs www como canônico.
- Como estruturar o tema (tokens CSS/Tailwind).
- Ordem de migração das páginas.
- Detalhes de JSON-LD e OG.

## Decisões do Claude após a revisão (vetáveis)

- **Leads separados por site.** "Todos os formulários → genau@yoobe.co" vale para o
  yoobe.co. O 4unik continua notificando `comercial@4unik.com.br` com e-mails 4unik.
  Implementação: um **segundo deploy** do `leads-ingest-api` (projeto Vercel próprio, ex.
  `yoobe-leads-ingest`) com envs Yoobe (`LEADS_NOTIFY_EMAIL=genau@yoobe.co`, `from`,
  template e `siteUrl` Yoobe). O deploy atual do 4unik não é alterado.
- **Sanity:** novo dataset **`yoobe`** (privado) no mesmo projeto `hin8ivz0`. O yoobe.co
  lê e escreve só nele (leitura no build com token). O dataset `production` fica
  intocado e servindo o 4unik congelado. O webhook do dataset `yoobe` dispara um deploy
  hook do Vercel `landing`, não o `repository_dispatch` do GitHub Pages. Os leads da
  Yoobe ficam gravados no dataset `yoobe`.
- **Correção da exposição de leads no `production`:** como o 4unik lê sem token, não dá
  para tornar o `production` privado sem mexer no build do 4unik. O caminho é restringir
  a leitura pública de `leadSubmission`/`emailTrackingEvent`, mantendo o resto público
  (por papel/permissão de documento no Sanity), ou mover esses documentos para um dataset
  privado e ajustar o `leads-ingest-api` do 4unik. Isso é feito à parte, com confirmação
  do usuário.
- **Versão "intacta" do 4unik:** o branch `4unik-legacy` sai do último commit do `main`
  (`683d227c`), **sem** o trabalho não commitado. Antes do primeiro deploy do legado, o
  builder compara o build desse commit com o que está no ar (build de 17/08) e, se
  houver diferença, ajusta o commit base para reproduzir o que está no ar. O trabalho
  pendente (blog agent, `blogFallback.ts`) é commitado no `main`/Yoobe.
- **Rastreamento:** criar uma propriedade GA4 nova para o yoobe.co, na conta Google do
  usuário. Google Ads, LinkedIn e Meta ficam desligados no yoobe.co até o usuário
  informar IDs da Yoobe, para não misturar dados com a 4unik. Para o Search Console, a
  verificação é feita por registro DNS (Vercel DNS ou Google Domains, onde estiver a
  zona).

## Respostas do usuário (2026-11-06)

- **Mercado e preços:** repetir tudo no yoobe.co como está no 4unik — pricing (mesma
  estrutura e valores, traduzidos), cases e logos brasileiros e menções a LGPD
  continuam. Só a marca muda.
- **Swag:** continua como produto da Yoobe. Todos os links para `4unik.com.br` e
  `catalogo.4unik.com.br` passam a apontar para **`https://catalogo.yoobe.co`**
  (incluindo `rewardsCatalog.ts`, Footer, faixa complementar e `sameAs` do JSON-LD).
- **Contatos** (os mesmos da página atual do yoobe.co):
  - Calendly: `https://calendly.com/yoobeco/demo`
  - E-mail público: `vendas@yoobe.co` (os formulários continuam notificando
    `genau@yoobe.co`)
  - Telefone/WhatsApp: **+55 41 98760-7512** (`https://wa.me/5541987607512`), substitui
    o `+55 11 2684-4724` da 4unik e o `+55 41 8758-2060` da página antiga.
- **Postmark:** o domínio yoobe.co já está verificado; remetente e auto-reply saem como
  Yoobe.
- **Endereço da Yoobe Inc.:** fica vazio por enquanto. O rodapé mostra só
  "Yoobe Inc." e Delaware, e o JSON-LD `Organization` vai sem `address`.
