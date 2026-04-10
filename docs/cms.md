# Sanity CMS — passos operacionais

Site em export estático (`output: "export"`), `basePath`: `/landing` (ver `src/lib/basePath.ts`). Em desenvolvimento, **`http://localhost:3000/`** redireciona para **`/landing/`**; a landing em produção é **`https://yoooobe.github.io/landing/`**.

**yoobe.co:** o domínio institucional **yoobe.co** e os HTML estáticos na raiz do repositório que o referenciam (canonical, OG, etc.) são um contexto à parte. Este fluxo de build e deploy **não** os altera; o export Next continua a ser servido em **GitHub Pages** na URL acima.

## 1. Acesso ao admin

- **URL local:** `http://localhost:3000/landing/studio/`
- **URL produção:** `https://yoooobe.github.io/landing/studio/`
- **Autenticação:** o admin é o `Sanity Studio`. O acesso é feito com utilizadores convidados no projeto Sanity.

Importante:

- GitHub Pages não suporta um login/senha próprios do app com proteção real de rota.
- O controlo de acesso do admin fica do lado do Sanity.
- Para dar acesso a alguém, convida o utilizador no projeto Sanity com a role adequada.

## 2. Estrutura editorial no Studio

O painel esquerdo do Studio está organizado em:

- **Configurações do site**
- **Blog — Engaja, time!** (com subseções — ver abaixo)
- **Landing pages**
- **Estratégias de marketing**
- **Espelho editorial do codigo**
- **Páginas estruturais**
- **Menus**
- **Mídia de showcase da home**
- **Mídia de showcase da plataforma**
- **Mídia de showcase — Gamificação**
- **Mídia de showcase — API e Integrações**

### Configurações do site

Documento singleton com `_id` fixo `siteSettings`.

| Campo | Uso |
| --- | --- |
| GA4 Measurement ID | `G-XXXXXXXXXX` — usado só se `NEXT_PUBLIC_GA_ID` não estiver definido |
| GTM Container ID | `GTM-XXXXXXX` — injetado no cliente quando preenchido |
| Meta Pixel ID | só dígitos |
| LinkedIn Partner ID | alfanumérico / `-` / `_` |
| Calendly / WhatsApp / email / OG image | URLs e metadados de contacto |
| Login / catálogo / site institucional / privacidade / termos | links globais do shell público |
| Wordmark do header / footer | substituem opcionalmente os PNGs estáticos atuais |
| Header menu PT/EN / Footer menu PT/EN | referências para os documentos `menu` consumidos por `Header` e `Footer` |
| Coleção trust bar / Coleção grid de clientes | referências para as coleções de logos usadas como prova social na home |

Guarda e **publica** no Sanity.

Uso atual no frontend:

- `Header` lê daqui o login, o CTA de demo, o catálogo, o wordmark e o menu por idioma
- `Footer` lê daqui o catálogo, o site institucional, demo, WhatsApp, links legais, wordmark e o menu por idioma
- o seed padrão já publica o wordmark global no `siteSettings`, então o shell nasce ligado ao asset do CMS
- se algum campo ou referência estiver vazio, o frontend mantém o fallback atual no código

### Blog — Engaja, time!

**Título do blog:** Engaja, time! — um blog 4unik para os heróis do RH

O Blog tem subseções no Sanity Studio para facilitar o gerenciamento editorial:

| Subseção no Studio | Descrição |
|---|---|
| 📋 Todos os Posts | Lista completa ordenada por data de publicação |
| 🤖 Rascunhos IA | Posts gerados por IA (`aiGenerated = true`) sem `publishedAt` — aguardando revisão |
| ⭐ Destaques | Posts marcados como `featured = true` |
| Por Categoria | 7 listas filtradas por categoria (ver abaixo) |

**7 categorias do blog:**

- 🏆 Engajamento
- 🎮 Gamificação de Times
- 💡 4unik na Prática
- 🎁 Eventos & Brindes
- 📈 Crescimento
- 🧠 Gestão de Pessoas
- 🎯 Motivação & Reconhecimento

**Campos do tipo `blogPost`:**

| Campo | Tipo | Obrigatório | Notas |
|---|---|---|---|
| title | string | ✅ | Título do post |
| slug | slug | ✅ | Gerado a partir do título |
| locale | radio (`pt`/`en`) | ✅ | Idioma do post |
| excerpt | text (máx 220) | ✅ | Resumo para cards e SEO |
| category | string | ✅ | Uma das 7 categorias acima |
| publishedAt | datetime | ✅ | Deixar vazio para manter como rascunho |
| readTimeMinutes | number | ✅ | Estimativa em minutos |
| featured | boolean | — | Destaca o post no topo da listagem |
| coverImage | image | — | Com campo `alt` obrigatório para acessibilidade |
| seo | object | — | `metaTitle`, `metaDescription`, `openGraphImage` |
| body | Portable Text | — | Estilos: normal, h2, h3, blockquote, bullet |
| relatedKeywords | string[] | — | Palavras-chave para SEO e conteúdo relacionado |
| author | string | — | Nome do editor ou redator responsável |
| tags | string[] (tags) | — | Labels finos: "OKRs", "NPS", "Recompensas", "Eventos"... |
| aiGenerated | boolean | — | `true` quando gerado pelo agente de IA |
| contentBrief | text | — | Brief ou prompt usado — apenas referência interna |

**Fluxo de publicação de rascunho IA:**

1. Agente gera o post → salvo com `aiGenerated: true`, sem `publishedAt`
2. Editor acessa **Rascunhos IA** no Studio
3. Revisa o conteúdo, ajusta título/excerpt/corpo
4. Preenche `publishedAt` e clica em **Publicar**
5. GitHub Actions detecta a publicação via webhook `sanity-publish` e reconstrói o site

O frontend usa conteúdo do Sanity quando disponível e mantém fallback local (`src/lib/blogFallback.ts`) para o build continuar funcionando sem configuração do CMS.

**Fallback local:** 5 posts PT + 4 posts EN com temas de engajamento, eventos e gamificação definidos em `src/lib/blogFallback.ts`.

---

### Agente de IA para criação de conteúdo

O blog conta com dois mecanismos de geração automática de conteúdo:

#### Script CLI

```bash
# Gerar 5 rascunhos em português
node scripts/generate-blog-posts.mjs --count 5 --locale pt

# Gerar sobre um tópico específico
node scripts/generate-blog-posts.mjs --topic "Como gamificar eventos com QR Codes" --category "Eventos & Brindes"

# Testar sem publicar
node scripts/generate-blog-posts.mjs --count 3 --dry-run

# Gerar e publicar diretamente
node scripts/generate-blog-posts.mjs --count 2 --publish
```

**Variáveis de ambiente necessárias:**

```env
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=...          # token com permissão de escrita
```

#### MCP Tool (para uso em agentes de IA)

O servidor MCP `4unik-marketing` expõe duas novas tools:

- `generate_blog_post` — Gera um post completo via OpenAI e opcionalmente publica no Sanity
- `get_blog_topic_seeds` — Lista todos os tópicos pré-definidos por categoria

Exemplo de uso via MCP:
```json
{
  "tool": "generate_blog_post",
  "args": {
    "topic": "Como gamificar eventos de RH com QR Codes",
    "category": "Eventos & Brindes",
    "locale": "pt",
    "publish_to_sanity": true
  }
}
```

### Landing pages

Tipo editorial: **Landing Pages de Marketing**

Blocos reutilizáveis atualmente disponíveis:

- `heroBlock`
- `legacySectionBlock`
- `richTextSection`
- `ctaBlock` (opcional: formulário de lead — `showLeadForm`, `leadFormVariant`)
- `faqBlock`
- `statsBlock`
- `testimonialBlock`

Cada bloco agora também pode receber **imagem opcional com upload nativo do Sanity**, hotspot e texto alternativo. Isto permite substituir mockups, artes de apoio e visuais de secção diretamente no Studio.

Fonte atual de verdade para as landing pages publicas:

- `marketingPage` e o campo `content[]`
- um documento por rota e idioma, por exemplo `home`, `api-integracoes`, `gamificacao`, `plataforma`, `inteligencia`, `casos-de-uso`
- o frontend tenta ler `marketingPage` primeiro e cai em fallback local apenas quando o documento ainda nao existe ou esta incompleto

Sobre o bloco `legacySectionBlock`:

- ele permite montar no Studio as secoes atuais da landing sem reescrever tudo de uma vez
- serve como ponte de migracao
- ao longo do tempo, cada secao deve migrar para blocos nativos como `heroBlock`, `faqBlock`, `statsBlock`, etc.

### Estratégias de marketing

Tipo editorial: **Estratégias de Marketing**

Serve para organizar conteúdos estratégicos como:

- pilares e campanhas
- FAQs
- CTAs
- estatísticas
- conteúdo rico de apoio

### Menus

Tipo editorial: **Menu de Navegação**

Cada documento `menu` agora suporta:

- `title` interno
- `menuKey`: `header` ou `footer`
- `locale`: `pt` ou `en`
- `sections[]`
- `sections[].items[]`

Cada item pode definir:

- `label`
- `description`
- `href`
- `badge`
- `icon`
- `openInNewTab`

Recomendação operacional:

- cria 4 documentos base: `header-pt`, `header-en`, `footer-pt`, `footer-en`
- liga esses documentos no singleton `siteSettings`
- usa rotas internas como `/plataforma`, `/api-integracoes`, `/casos-de-uso`
- usa URL completa apenas para links externos

Fallback atual:

- se o menu não existir no Sanity, `Header` e `Footer` continuam a usar a estrutura atual baseada em `src/messages/segments/*`

### Coleções de logos

Tipo editorial: **Coleção de logos**

Uso atual:

- `trustBar` para a faixa compacta de prova social na home
- `clientsGrid` para a grade ampliada de clientes

Cada documento aceita:

- `title`
- `collectionKey`
- `items[]`

Cada item aceita:

- `name`
- `href`
- `logo`
- `logo.alt`

Recomendação operacional:

- usa upload nativo do Sanity para os logos institucionais
- prefere SVG ou PNG com fundo transparente
- mantém o texto alternativo preenchido para acessibilidade
- liga as coleções no singleton `siteSettings` quando elas forem usadas no shell global
- usa referências para `logoCollection` dentro de `logoStripBlock` quando a página precisar reutilizar a mesma base editorial de logos

Fallback atual:

- se a coleção não existir ou não tiver items válidos, os blocos nativos da `home` continuam a usar os assets estáticos atuais em `public/clients/`

### Espelho editorial do codigo

Tipo editorial: **Espelho Editorial do Codigo**

Este grupo existe para colocar no Studio o conteudo que ainda vive no codigo e ainda nao foi migrado para schemas mais semanticos.

Hoje ele espelha automaticamente:

- todos os ficheiros em `src/messages/segments/`
- `src/content/workvivo.ts`
- `src/components/ApiIntegracoesPageSections.tsx`
- metadata hardcoded de `src/app/(pt)/api-integracoes/page.tsx`
- metadata hardcoded de `src/app/(en)/en/api-integracoes/page.tsx`

## 2.1 Editor visual das landing pages

As `marketingPage` agora funcionam como um editor visual por blocos dentro do Studio.
Isto substitui a necessidade de um campo HTML solto para a maioria dos casos.

Blocos nativos disponíveis no Studio:

- `heroBlock`
- `featureGridBlock`
- `splitContentBlock`
- `logoStripBlock`
- `richTextSection`
- `ctaBlock` (opcional: **Mostrar formulário de lead** `showLeadForm`, **Variante visual do formulário** `leadFormVariant` — alinha o cartão ao tom da página)
- `faqBlock`
- `statsBlock`
- `testimonialBlock`

Experiência editorial atual:

- rich text com títulos, listas, links, bold, italic e underline
- reordenação de blocos por drag and drop
- mistura de blocos novos com `legacySectionBlock` enquanto a migração visual continua
- separação por idioma em `Landing pages -> Português` e `Landing pages -> English`

Recomendação operacional:

- use `marketingPage` para edição visual de landing pages
- use `blogPost` para posts do blog
- use `contentMirror` apenas como ponte/fallback durante migração ou para conteúdo ainda preso ao código

Para a `home`, o frontend publico usa `marketingPage.home` como fonte principal da composição e cai no fallback local apenas se o documento estiver ausente ou incompleto.
O copy base ainda parte dos segmentos locais `src/messages/segments/pt-home.ts`, `src/messages/segments/en-home.ts`, `src/messages/segments/*stats-bento-tabs-why.ts`, `src/messages/segments/*landing-more.ts` e `src/messages/segments/*rest.ts`.
As superfícies visuais compartilhadas da home continuam vindo do documento nativo `homeShowcaseMedia`, agora reaproveitado pelos blocos nativos do `marketingPage.home`.
Hoje esse documento alimenta principalmente:

- hero principal e overview editorial da home
- screenshots das áreas `PlatformTabs`
- mockups dos cases enterprise (`Hapvida` e `Prio`)
- previews editoriais das integrações `Workvivo` e `Beehome`
- mockup técnico da seção `HowItWorks`

- mockup principal da seção Bento
- screenshots das tabs `Dashboard do Gestor`, `Loja do Membro` e `Gestão de Campanhas`
- mockups dos cases enterprise (`Hapvida` e `Prio`)
- previews centrais das integrações `Workvivo` e `Beehome`
- mockup técnico da seção `HowItWorks`

Fluxo recomendado:

- atualize o documento `Mídia de showcase da home` para trocar mockups e screenshots
- trate `homeShowcaseMedia.home-default` como a fonte nativa dessas superfícies compartilhadas
- use o `marketingPage.home` para ordenar, editar e testar a narrativa principal da home em blocos nativos
- use `logoStripBlock` com referência a `logoCollection.trustBar` e `logoCollection.clientsGrid` para a prova social da home, sem voltar a `legacySectionBlock`

Se o documento de showcase estiver ausente ou incompleto, o frontend cai automaticamente no fallback atual vindo dos segmentos locais.

Para `plataforma`, existe agora um documento nativo `platformShowcaseMedia` por idioma.
Neste primeiro passo ele controla:

- a imagem principal do mockup grande do `AdminDashboardHighlight`
- o mockup principal da seção `PlataformaStore`
- um painel visual editorial da seção `LogisticsFulfillment`
- um painel visual editorial da seção `SecurityEnterprise`
- arrays de até 4 cards por seção de funcionalidades (`gestaoFeatureCards`, `gamificacaoFeatureCards`, `lojaFeatureCards`, `apiFeatureCards`) — cada card aceita emoji de fallback e imagem substituta

Fluxo recomendado:

- atualize `Mídia de showcase da plataforma` quando quiser trocar o mockup editorial do painel do gestor, da loja ou os painéis visuais de logística e segurança
- mantenha um documento por idioma (`pt` e `en`) caso a arte contenha labels ou textos localizados
- se a imagem nao estiver preenchida, o frontend continua renderizando o mockup JSX legado automaticamente

### Mídia de showcase — Gamificação

Tipo editorial: **gamificacaoShowcaseMedia**

Documento que centraliza todos os uploads de imagens e emojis para a página de gamificação. Cada campo tem descrição explicando exatamente onde aparece na tela.

| Seção | Campos disponíveis |
| --- | --- |
| Hero | `hero.showcaseImage` — screenshot exibido no card flutuante do hero |
| Mecânicas | `mechanics.items[]` — até 6 cards; cada card aceita emoji de fallback + imagem |
| Cases | `cases.items[]` — cada item tem `company`, `logoImage` e `featuredImage` |
| Tendências | `trends.items[]` — até 6 cards com imageWithEmoji |
| KPIs | `kpis.items[]` — até 6 cards com imageWithEmoji |
| Casos de uso | `deepUsecases.items[]` — até 6 cards com imageWithEmoji |

Fluxo recomendado:

1. Crie um documento com `mediaKey = gamificacao-default`
2. Faça upload das imagens de telas do sistema nas seções desejadas
3. A página `/gamificacao/` busca automaticamente este documento pelo `mediaKey`
4. Se uma imagem não estiver preenchida, o card mantém o ícone/emoji atual como fallback
5. Após publicar, faz rebuild para o export estático incorporar o novo documento

### Mídia de showcase — API e Integrações

Tipo editorial: **apiIntegracoesShowcaseMedia**

Documento que centraliza todos os uploads de imagens para a página de API e Integrações.

| Seção | Campos disponíveis |
| --- | --- |
| Hero | `hero.showcaseImage` — screenshot/diagrama exibido no hero (substitui o carousel) |
| Integrações | `integrations.platforms[]` — até 3 plataformas; cada uma tem `platformName`, `logoImage` e `previewImage` |
| Features | `features.items[]` — até 6 cards da grade de features com imageWithEmoji |
| Módulos | `modules.items[]` — até 6 cards de módulos com imageWithEmoji |

Fluxo recomendado:

1. Crie um documento com `mediaKey = api-integracoes-default`
2. Para as integrações, preencha `platformName` com exatamente o nome da plataforma (`Workvivo`, `Beehome`, `Humand`) para o matching automático
3. Faça upload dos logos e previews em `integrations.platforms[]`
4. A página `/api-integracoes/` busca automaticamente este documento pelo `mediaKey`
5. Se uma imagem não estiver preenchida, o card mantém o ícone/letra atual como fallback

Além disso, a landing `plataforma` agora aceita imagens nativas diretamente dentro do próprio `marketingPage`, sem depender apenas do documento de showcase paralelo.
Os blocos editoriais da página podem carregar uploads para:

- hero principal
- split de `Admin Dashboard`
- split de `Gamification Engine`
- split de `Store`
- grade de `Logistics`
- split de `Security`
- CTA final

Preferência operacional:

- para a composição principal da rota `/plataforma/`, edite primeiro o documento `Landing pages -> plataforma`
- use `Mídia de showcase da plataforma` como camada de compatibilidade enquanto ainda existirem componentes legados consumindo esse documento

Para `inteligencia`, o documento `marketingPage` já concentra a composicao principal da rota.
Hoje os uploads nativos mais importantes ficam diretamente nos blocos de:

- hero principal
- grade `core-capabilities`
- grade `workvivo-ai`
- CTA final

Para `gamificacao`, a migracao para blocos nativos do `marketingPage` passa a usar os segmentos editoriais ja carregados pelo seed, reduzindo a dependencia do conjunto legado renderizado por `contentMirror`.
Os uploads editoriais principais da pagina ficam nos blocos de:

- hero principal
- grade `problem`
- grade `mechanics`
- split `flow`
- grade `trends`
- bloco `stats`
- CTA final

Preferencia operacional para ambas:

- edite primeiro `Landing pages -> inteligencia` e `Landing pages -> gamificacao`
- mantenha `contentMirror` apenas como compatibilidade enquanto a revisao final dos blocos nativos nao estiver encerrada

Para `api-integracoes`, os documentos `marketingPage.pt.api-integracoes` e `marketingPage.en.api-integracoes` agora sao promovidos para blocos nativos durante o seed.
Esses blocos alimentam diretamente:

- hero da pagina
- grade de features
- secoes de integracoes nativas
- modulos da plataforma
- CTA final
- metadata/SEO PT e EN

Se o documento ainda nao existir ou estiver incompleto, o frontend cai automaticamente no fallback local definido em `src/sanity/lib/apiIntegracoes.ts`.

Para `gamificacao`, o frontend publico agora usa blocos nativos do `marketingPage` como fonte principal e fallback local em `src/sanity/lib/gamificacao.ts`.
Esse fallback alimenta diretamente:

- hero
- bloco de problema
- mecanicas
- fluxo
- cases
- tendencias
- stats
- KPIs
- casos de uso
- FAQ
- CTA final
- metadata/SEO PT e EN

Os documentos de `contentMirror` passam a ter papel residual de auditoria e espelhamento tecnico dentro do Studio.
Eles nao sao mais a fonte principal das rotas publicas cobertas por `marketingPage`, `blogPost` e `homeShowcaseMedia`.

Hoje esta ponte cobre:

- `pt-blog-page` e `en-blog-page`
- `pt-landing-more` e `en-landing-more`

O `routePayloadJson` e usado para:

- auditoria do copy historico e referencia de migracao no Studio
- compatibilidade temporaria para revisoes editoriais e comparacao historica, sem ser a fonte principal das rotas publicas

Cada documento guarda:

- titulo amigavel
- caminho de origem
- idioma
- area
- conteudo espelhado em texto

Objetivo:

- permitir edicao e auditoria de todo o conteudo atual dentro do Studio
- servir de ponte enquanto a migracao do frontend para consumo total do CMS acontece por etapas

## 3. Conteúdo runtime vs build-time

### Runtime

Conteúdo lido no browser e aplicado sem novo deploy, quando publicado no Sanity:

- GTM
- Meta Pixel
- LinkedIn Insight
- labels leves de ambiente

### Build-time

Conteúdo que entra no export estático e exige rebuild/redeploy:

- hero da home
- pagina `api-integracoes`
- pagina `gamificacao`
- listagem do blog
- páginas individuais do blog
- SEO das páginas do blog
- `sitemap.xml`
- `robots.txt`
- landing pages e páginas estratégicas ligadas ao build

Regra prática: se o conteúdo é usado para gerar HTML/metadata estáticos, publica no Sanity e depois faz rebuild.

## 3.1 SEO técnico

Fonte central:

- `src/lib/site.ts` define a origem pública, `SITE_URL` com `basePath` e os helpers de URL absoluta
- `src/lib/seo/routeMetadata.ts` é o builder principal de `canonical`, `hreflang`, Open Graph e Twitter
- `src/lib/jsonLd.ts` concentra `Organization`, `WebSite`, `FAQPage` e `BlogPosting`
- `src/app/sitemap.ts` e `src/app/robots.ts` geram os artefatos de crawling no export estático

Regras práticas:

- usa sempre caminhos com trailing slash no metadata builder, ex.: `/plataforma/`
- para páginas PT/EN espelhadas, mantém `canonical` no idioma atual e `alternates.languages` entre PT e EN
- a home deve continuar com alternância entre `/` e `/en/`
- posts do blog só publicam `hreflang` cruzado quando o mesmo `slug` existe no outro idioma; se não existir contraparte real, evita forçar alternates errados
- rotas de redirect legado ou páginas stub devem ficar com `robots: noindex`

## 4. Home e landing pages no frontend

A home e as principais paginas de marketing agora procuram primeiro um documento `marketingPage` com o `slug` certo e o `locale` certo.

Hoje os slugs editoriais esperados sao:

- `home`
- `api-integracoes`
- `gamificacao`
- `plataforma`
- `inteligencia`
- `casos-de-uso`

Se o documento nao existir, o frontend usa o fallback local atual para manter compatibilidade com o export estatico.

### Home principal

A `home` agora deve ser tratada como uma página editorial nativa no `marketingPage.home`.

Hoje o fallback local já sobe uma sequência de blocos nativos para:

- hero
- faixa contextual `4Unik`
- overview/bento
- visão de plataforma, loja e campanhas
- métricas, proposta de valor e resumo de gamificação
- dualidade da oferta, enterprise cases e integrações nativas
- store use cases, API, roadmap de IA, gestão, how-it-works, pricing e testimonials
- CTA final

Passos:

1. Abra **Landing pages**.
2. Edite o documento com slug `home`.
3. Reordene ou substitua blocos nativos em **Conteúdo**.
4. Use `Mídia de showcase da home` quando precisar trocar mockups, screenshots e previews compartilhados.

Sem este documento, a home mantém o fallback atual já alinhado à mesma composição nativa.

### Preview visual

O Studio agora inclui o `Presentation Tool` para abrir as rotas publicas correspondentes aos documentos `marketingPage`.

Notas importantes:

- em **desenvolvimento local**, o preview visual usa `stega` para click-to-edit
- se existir `SANITY_API_READ_TOKEN`, o preview local consegue ler drafts
- em **producao GitHub Pages**, o site continua estatico; por isso o preview visual completo fica focado no ambiente de desenvolvimento
- metadados e HTML final continuam a depender de rebuild quando o conteudo muda

## 5. Blog no frontend

Rotas ativas:

- `src/app/(pt)/blog/page.tsx`
- `src/app/(pt)/blog/[slug]/page.tsx`
- `src/app/(en)/en/blog/page.tsx`
- `src/app/(en)/en/blog/[slug]/page.tsx`

Com Sanity configurado:

- a listagem usa os documentos `blogPost`
- as páginas individuais são geradas por `slug`
- PT e EN são tratados como documentos separados via campo `locale`
- o chrome editorial da listagem e dos posts vem diretamente dos segmentos locais carregados por `LocaleMessagesProvider`

Sem Sanity configurado:

- o site usa fallback local em `src/lib/blogFallback.ts`
- o build continua compatível com GitHub Pages

## 5.1 API Integracoes no frontend

Rotas ativas:

- `src/app/(pt)/api-integracoes/page.tsx`
- `src/app/(en)/en/api-integracoes/page.tsx`

Com Sanity configurado:

- PT le `marketingPage.pt.api-integracoes`
- EN le `marketingPage.en.api-integracoes`
- o documento `marketingPage` vira a fonte principal da pagina e da metadata
- o espelho legado de `apiIntegracoesPayload` fica apenas como auditoria tecnica no Studio

Sem Sanity configurado:

- o site usa fallback local em `src/sanity/lib/apiIntegracoes.ts`
- o build continua compativel com GitHub Pages

## 5.2 Gamificacao no frontend

Rotas ativas:

- `src/app/(pt)/gamificacao/page.tsx`
- `src/app/(en)/en/gamificacao/page.tsx`

Com Sanity configurado:

- PT le `marketingPage.pt.gamificacao`
- EN le `marketingPage.en.gamificacao`
- o documento `marketingPage` vira a fonte principal da pagina e da metadata

Sem Sanity configurado:

- o site usa fallback local em `src/sanity/lib/gamificacao.ts`
- o build continua compativel com GitHub Pages

## 5.3 Rotas auxiliares sem mirror runtime

Rotas ativas:

- `src/app/(pt)/plataforma/logistica-integrada/page.tsx`
- `src/app/(pt)/plataforma/loja-resgate/page.tsx`
- `src/app/(pt)/plataforma/motor-gamificacao/page.tsx`
- `src/app/(en)/en/plataforma/logistica-integrada/page.tsx`
- `src/app/(en)/en/plataforma/loja-resgate/page.tsx`
- `src/app/(en)/en/plataforma/motor-gamificacao/page.tsx`

Com ou sem Sanity configurado:

- as subpaginas stub de `plataforma` usam fallback local centralizado em `src/lib/publicRouteFallbacks.ts`
- o copy visual continua vindo de `src/messages/segments/pt-landing-more.ts` e `src/messages/segments/en-landing-more.ts`
- o build continua compativel com GitHub Pages

## 6. Deploy e quando fazer rebuild

O workflow `.github/workflows/deploy.yml` corre em cada push a `main` e também pode ser disparado sem commit.

### Manual

1. Repositório → **Actions**
2. **Deploy to GitHub Pages**
3. **Run workflow**
4. Opcionalmente preenche a nota
5. **Run workflow**

### Via API

Envia `repository_dispatch` com `event_type` `sanity-publish`:

```bash
curl -L -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_GITHUB_PAT" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/Yoooobe/landing/dispatches \
  -d '{"event_type":"sanity-publish","client_payload":{"reason":"Sanity publish"}}'
```

O PAT precisa de scope `repo` ou permissão equivalente.

Secrets recomendados em **Settings → Secrets and variables → Actions**:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` — **obrigatório** o ID real do projeto (ex. `hin8ivz0`). Não uses o texto literal `your-project-id` nem placeholders do `.env.example`.
- `NEXT_PUBLIC_SANITY_DATASET` — normalmente `production`
- opcional: `NEXT_PUBLIC_SANITY_API_VERSION`
- opcional: `NEXT_PUBLIC_GA_ID`

Sem `NEXT_PUBLIC_SANITY_PROJECT_ID` / dataset no CI, o export estático **não** embute o projeto Sanity no bundle do Studio em produção — podes ver erros de rede ou URLs com `your-project-id` / falha a abrir o Studio em `https://yoooobe.github.io/landing/studio/`.

**CORS em produção:** no Sanity → API → CORS origins, adiciona `https://yoooobe.github.io` (origem sem path). Sem isto, o Studio no GitHub Pages pode falhar após login.

Depois de criar ou alterar secrets, faz **re-run** do workflow *Deploy to GitHub Pages* (ou push para `main`).

### Checklist pós-deploy (export em GitHub Pages)

Após um push a `main` ou um *Run workflow* bem-sucedido:

1. **Actions:** o job *Deploy to GitHub Pages* terminou sem erro.
2. **Smoke HTTP:** abre `https://yoooobe.github.io/landing/` e `https://yoooobe.github.io/landing/en/` (respostas 200).
3. **Assets:** confirma que `/landing/favicon.ico` e `/landing/brand/` respondem (favicon e marca).
4. **Studio (opcional):** se o Sanity estiver configurado no CI, testa `https://yoooobe.github.io/landing/studio/` e login.
5. **OG (opcional):** usa a ferramenta de debug de partilha (ex. Facebook Sharing Debugger) numa URL de marketing se precisares de validar o card — a imagem por defeito da app vem de `public/og/4unik-default.svg` via metadata.

## 7. Contrato de sincronização para agentes

A regra permanente dos agentes está em `.cursor/rules/cms-governance.mdc`.

Qualquer alteração em `src/sanity/schemaTypes/` deve rever no mesmo trabalho:

- `src/sanity/queries/`
- `src/sanity/lib/types.ts`
- `src/app/` e `src/components/`
- `docs/cms.md`
- fluxo de rebuild se a mudança afetar conteúdo build-time

Nenhum novo tipo editorial deve ser criado apenas no schema. O caminho completo precisa de existir:

- schema
- query
- tipo TS
- renderização ou fallback
- documentação

## 8. Validação rápida

1. **GA4:** se `NEXT_PUBLIC_GA_ID` existir, ele tem prioridade; caso contrário usa `gaMeasurementId` do Sanity.
2. **GTM:** com container preenchido, verifica `gtm.js` e o iframe `noscript`.
3. **Meta Pixel:** verifica `fbevents.js` / extensão de apoio.
4. **LinkedIn:** verifica pedidos a `snap.licdn.com`.
5. **Blog:** confirma que `/blog/` e `/en/blog/` listam posts e que pelo menos um `slug` abre em cada idioma.
6. **SEO técnico:** confirma em produção `canonical`, `hreflang`, `og:url`, `sitemap.xml` e `robots.txt`.
7. **Home hero:** depois de publicar alterações, confirma o rebuild antes de validar em produção.

## 9. Seed inicial do Sanity

O repositório agora inclui um seed idempotente para criar os primeiros documentos:

- `blogPost`
- `marketingPage`
- `marketingStrategy`
- `contentMirror`

Arquivos envolvidos:

- `scripts/sanity-seed-data.mjs`
- `scripts/seed-sanity-content.mjs`

### Pré-requisitos

- `NEXT_PUBLIC_SANITY_PROJECT_ID` com valor real
- `NEXT_PUBLIC_SANITY_DATASET`
- autenticação no Sanity por uma destas vias:
  - `npx sanity login`
  - `SANITY_API_WRITE_TOKEN`

### Execução

```bash
npm run seed:sanity
```

O script:

- faz upload das imagens de capa do blog para o dataset
- cria ou substitui os documentos por `_id` fixo
- pode ser reexecutado sem gerar duplicados

Se o login/token ou o `projectId` real não estiverem disponíveis, o script falha com mensagem orientativa em vez de criar dados incompletos.
