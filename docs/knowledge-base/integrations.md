# Integrações externas (agentes)

Registo canónico de IDs e serviços usados pela landing 4unik. **Não colocar credenciais secretas aqui** — apenas IDs públicos ou referências a secrets/env.

## Google Analytics 4

| Campo | Valor |
|-------|-------|
| **Conta (Account ID)** | `66932658` |
| **Nome da conta** | 4unik |
| **Propriedade (Property ID)** | `327916606` (nome: "4Unik – GA4") |
| **Admin GA** | [analytics.google.com — conta 4unik](https://analytics.google.com/analytics/web/#/a66932658p327916606/admin/account/settings) |

A propriedade tem **dois streams web** — não confundir os Measurement IDs:

| Stream | Measurement ID | Stream ID | URL | Uso |
|--------|----------------|-----------|-----|-----|
| **Plataforma Landing** | `G-SMJDYCENBC` | `15052677461` | `https://plataforma.4unik.com.br` | **Esta landing** (`NEXT_PUBLIC_GA_ID`) |
| 4Unik – GA4 | `G-HK5YVFW9R7` | `3992362135` | `https://4unik.com.br` | Site principal — **não usar na landing** |

Ambos os streams reportam à mesma propriedade `327916606`; para isolar a landing nos relatórios, filtrar por stream `Plataforma Landing`.

### Onde cada ID é usado

| ID | Camada | Variável / campo |
|----|--------|------------------|
| `G-SMJDYCENBC` | Browser (site) | `NEXT_PUBLIC_GA_ID` (prioridade) ou `siteSettings.gaMeasurementId` no Sanity |
| `G-SMJDYCENBC` | Deploy CI | GitHub secret `NEXT_PUBLIC_GA_ID` (`.github/workflows/deploy.yml`) |
| `327916606` | MCP `4unik-marketing` | `GA_PROPERTY_ID` em `.cursor/mcp.json` — tool `get_ga4_metrics` (dados simulados até credenciais GCP) |
| `66932658` | Documentação | Referência admin; sem hook de código |

### Implementação no site

- Componente: [`src/components/site-settings/SiteAnalytics.tsx`](../../src/components/site-settings/SiteAnalytics.tsx) (`@next/third-parties/google`).
- Resolução do ID: [`src/contexts/SiteSettingsContext.tsx`](../../src/contexts/SiteSettingsContext.tsx) — env tem prioridade sobre Sanity.
- **Env no browser:** getters em [`src/lib/site.ts`](../../src/lib/site.ts) usam `process.env.NEXT_PUBLIC_GA_ID` (acesso **estático**). Nunca `process.env[key]` dinâmico — o bundler não inline e o Realtime fica vazio apesar do preload no HTML.
- Eventos de conversão (funil):
  - `generate_lead` — formulário de lead ([`LeadCaptureForm.tsx`](../../src/components/LeadCaptureForm.tsx)) após POST bem-sucedido; params: `source`, `locale`.
  - `schedule_demo` — cliques em links Calendly ([`TrackedOutboundLink.tsx`](../../src/components/analytics/TrackedOutboundLink.tsx)); params: `source`, `link_url`.
  - `contact_whatsapp` — cliques em `wa.me` / WhatsApp ([`TrackedOutboundLink.tsx`](../../src/components/analytics/TrackedOutboundLink.tsx)); params: `source`, `link_url`.
- Constantes e deteção de URL: [`src/lib/analyticsEvents.ts`](../../src/lib/analyticsEvents.ts).

### Key events no Admin GA4 (manual)

Marcar os três eventos como **key events** após o deploy e um clique/submit de teste:

| Evento | Origem |
|--------|--------|
| `generate_lead` | Submit do formulário de lead |
| `schedule_demo` | CTA “Agendar demo” (Calendly) |
| `contact_whatsapp` | CTA WhatsApp (`wa.me`) |

| Passo | Estado |
|-------|--------|
| Eventos disparam em produção | Implementado no código |
| Marcar como key events no Admin | **Feito** (17/jun/2026) — `generate_lead`, `schedule_demo`, `contact_whatsapp` |

**Caminho no Admin (interface em inglês):**

1. Abre [GA4 Admin](https://analytics.google.com/analytics/web/#/a66932658p327916606/admin) (ícone engrenagem, canto inferior esquerdo).
2. Coluna **Property** → secção **Data display** → **Events** (não confundir com “Data streams”).
3. Aba **Recent events** — quando cada evento aparecer, clica na **estrela** (“Mark as key event”), ou usa **Key events → New key event** com o nome exato (`generate_lead`, `schedule_demo`, `contact_whatsapp`).

**Se um evento não aparecer na lista** (normal até haver um hit real em produção):

1. Na mesma página **Admin → Data display → Events**, ou diretamente **Key events → New key event**.
2. **Event name:** `generate_lead`, `schedule_demo` ou `contact_whatsapp` (um de cada vez).
3. Guarda; o evento passa a key event assim que o primeiro hit chegar ao stream.

Link direto (após login): [Admin → Events](https://analytics.google.com/analytics/web/#/a66932658p327916606/admin/events)

Checklist completo: [`GCP_SERVICE_ACCOUNT_SETUP.md`](../../GCP_SERVICE_ACCOUNT_SETUP.md) § GA4 Data API → Key event.

### Deploy produção (sem GitHub Actions)

```bash
npm run deploy:production
```

Carrega `.env.local`, força `NEXT_PUBLIC_SITE_URL=https://plataforma.4unik.com.br/landing`, corre `verify-ga-build`, `verify-ga-404-fallback`, `verify-ga-pages` e publica `out/` → branch `gh-pages`. Ver [`docs/github-actions-billing-recovery.md`](../github-actions-billing-recovery.md) se CI estiver bloqueado.

### Verificação pós-deploy

1. GA4 → **Relatórios → Tempo real** — visitar `https://plataforma.4unik.com.br/landing/`.
2. Admin → **Cobertura da tag** — `plataforma.4unik.com.br/landing` (sem barra) deve estar **Tagged** ou redirecionar 301 a `/landing/` (nginx `location = /landing` em [`infra/plataforma-4unik-nginx-redirects.conf`](../../infra/plataforma-4unik-nginx-redirects.conf)); interim: `out/404.html` inclui gtag no build com `NEXT_PUBLIC_GA_ID`.
3. Admin → **Coleta e modificação de dados → Fluxos de dados** — confirmar **Enhanced Measurement** ativo (page views em navegação SPA).
4. DevTools → Network — pedidos a `google-analytics.com/g/collect` com `tid=G-SMJDYCENBC`.
5. Build: `npm run verify:ga-build`, `npm run verify:ga-404-fallback` e `npm run verify:ga-pages` após `npm run build`.
6. Smoke: `npm run validate:landing-routes -- --smoke https://plataforma.4unik.com.br/landing` (inclui check de `/landing` sem trailing slash).

## Outros pixels (opcionais)

Implementados em [`src/lib/site.ts`](../../src/lib/site.ts) e [`src/components/site-settings/`](../../src/components/site-settings/). Env tem prioridade; fallback Sanity `siteSettings`.

| Serviço | Env | Campo Sanity |
|---------|-----|--------------|
| Google Tag Manager | `NEXT_PUBLIC_GTM_ID` | `gtmContainerId` |
| Meta Pixel | `NEXT_PUBLIC_META_PIXEL_ID` | `metaPixelId` |
| LinkedIn Insight | `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | `linkedinPartnerId` |

## Pendências conhecidas

- **Banner de consentimento LGPD** — tracking carrega sem gate de consentimento (fora de escopo da integração inicial).
- **GA Data API — acesso à propriedade** — SA `landing-ga4-reader@institucional-480905.iam.gserviceaccount.com` criada; falta **Viewer** na propriedade `327916606` no Admin GA4 (ver [`GCP_SERVICE_ACCOUNT_SETUP.md`](../../GCP_SERVICE_ACCOUNT_SETUP.md) § GA4 Data API).
- **Key events** (`generate_lead`, `schedule_demo`, `contact_whatsapp`) — marcar manualmente no Admin GA4 (checklist no mesmo guia).

### GA Data API (MCP + CLI)

| Env | Uso |
|-----|-----|
| `GOOGLE_APPLICATION_CREDENTIALS` | Caminho absoluto ao JSON da SA (local; não commitar) |
| `GA_PROPERTY_ID` | `327916606` |
| `GA4_STREAM_ID` | `15052677461` (Plataforma Landing) |
| `GA4_HOSTNAME` | `plataforma.4unik.com.br` (fallback de filtro) |

- MCP: [`mcps/4unik-marketing/lib/ga4.js`](../../mcps/4unik-marketing/lib/ga4.js) — `get_ga4_metrics` usa API real ou `mock_fallback`.
- Snapshot períodos A/B/C: `npm run fetch:ga4-snapshot` → `docs/reviews/ga4-snapshots/`.


## Agentes Paperclip

Agentes Paperclip (e Cursor) que operam neste repositório devem:

1. Ler este ficheiro antes de alterar tracking ou interpretar métricas GA4.
2. Usar MCP `search_product_knowledge` com termos `GA4`, `integrations`, `G-SMJDYCENBC`.
3. **Não** reintroduzir `process.env[key]` dinâmico em `src/lib/site.ts`.
4. Após mudanças que afetem analytics, correr `npm run verify:ga-build`, `npm run verify:ga-pages` e `npm run deploy:production` (Actions pode estar bloqueado por billing).

**Auditoria (2026-06-10):** GA4 verificado end-to-end — sem falhas críticas.

| Check | Resultado |
|-------|-----------|
| `.env.local` + GitHub secret `NEXT_PUBLIC_GA_ID` | `G-SMJDYCENBC` |
| Sanity `siteSettings.gaMeasurementId` | `G-SMJDYCENBC` |
| `verify:ga-build` (chunk inlined) | OK |
| `verify:ga-404-fallback` | OK |
| `verify:ga-pages` | 63 páginas marketing com GA; 3 Studio sem GA; `404.html` com gtag |
| Smoke produção (`validate:landing-routes --smoke`) | OK (incl. `/landing` sem barra → 404 com gtag) |
| GET amostra PT/EN + Studio | GA em marketing; Studio sem tag |
| Runtime Playwright | `gtag` activo; hit `analytics.google.com/g/collect` com `tid=G-SMJDYCENBC`, `en=page_view` |
| Console (gtag / `_next-ga`) | Sem erros |
| GTM / Pixel / LinkedIn em env | Não configurados (sem duplicação) |

Produção actual (`gh-pages`) já servia GA correctamente — redeploy não necessário nesta auditoria.

## Catálogo 4unik (`catalogo.4unik.com.br`)

Repositório: `genautech/yoobe-catalogo-refactor` (branch `preview/4unik`).  
Paperclip: ler [`catalogo/docs/catalog-background-agents.md`](../../catalogo/docs/catalog-background-agents.md) antes de alterar o funil catálogo → plataforma.

| Item | Valor |
|------|-------|
| **Produção actual (Cloud Run)** | `https://catalog-app-lhofqqf2ra-uc.a.run.app` |
| **Domínio canónico (pós-DNS)** | `https://catalogo.4unik.com.br` |
| **GA4 property** | `327916606` (mesma da landing) |
| **Measurement ID** | `G-SMJDYCENBC` (`NEXT_PUBLIC_GA_ID_4UNIK` no catálogo) |
| **Segmentação** | Parâmetro custom `tenant=4unik` em eventos (`platform_promo_click`, `kit_cta_click`, etc.) |
| **UTM catálogo → plataforma** | `utm_source=catalogo`, `utm_medium=cta`, `utm_campaign=platform-discovery` |

**GA4 Admin (DevOps):** criar data stream **"Catálogo 4unik"** na propriedade `327916606` com URL `https://catalogo.4unik.com.br` (pode partilhar o mesmo Measurement ID ou stream dedicado).

**Verificação catálogo:**

```bash
node scripts/gcp/verify-production-tenant.mjs https://catalog-app-lhofqqf2ra-uc.a.run.app
# pós-cutover DNS:
node scripts/gcp/verify-production-tenant.mjs https://catalogo.4unik.com.br
```

Cutover DNS: [`catalogo/docs/4UNIK-DNS-CUTOVER.md`](../../catalogo/docs/4UNIK-DNS-CUTOVER.md).

**Nota sobre "Data collection isn't active" (2026-06-10):** o stream `Plataforma Landing` foi criado no mesmo dia do primeiro tráfego real; os indicadores do GA4 ("isn't active", "No data received in past 48 hours") têm atraso de até 24-48h após os primeiros hits. Tag, stream e propriedade confirmados corretos por screenshot do Admin. Se após 48h continuar sem dados: testar com [Tag Assistant](https://tagassistant.google.com) ligado a `https://plataforma.4unik.com.br/landing/` e verificar Admin → Filtros de dados.

Não há registo separado no Paperclip — a KB versionada no repo é a fonte de verdade; sincronizar skills Paperclip a partir deste repo após push para `main`.
