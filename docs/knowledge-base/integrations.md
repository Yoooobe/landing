# Integrações externas (agentes)

Registo canónico de IDs e serviços usados pela landing 4unik. **Não colocar credenciais secretas aqui** — apenas IDs públicos ou referências a secrets/env.

## Google Analytics 4

| Campo | Valor |
|-------|-------|
| **Conta (Account ID)** | `66932658` |
| **Nome da conta** | 4unik |
| **Propriedade (Property ID)** | `327916606` |
| **Measurement ID (web stream)** | `G-SMJDYCENBC` |
| **Admin GA** | [analytics.google.com — conta 4unik](https://analytics.google.com/analytics/web/#/a66932658p327916606/admin/account/settings) |

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
- Evento de conversão: `generate_lead` disparado em [`src/components/LeadCaptureForm.tsx`](../../src/components/LeadCaptureForm.tsx) após submissão bem-sucedida. Marcar como **key event** no GA4 Admin quando aparecer nos dados.

### Deploy produção (sem GitHub Actions)

```bash
npm run deploy:production
```

Carrega `.env.local`, força `NEXT_PUBLIC_SITE_URL=https://plataforma.4unik.com.br/landing`, corre `verify-ga-build` e publica `out/` → branch `gh-pages`. Ver [`docs/github-actions-billing-recovery.md`](../github-actions-billing-recovery.md) se CI estiver bloqueado.

### Verificação pós-deploy

1. GA4 → **Relatórios → Tempo real** — visitar `https://plataforma.4unik.com.br/landing/`.
2. Admin → **Cobertura da tag** — `plataforma.4unik.com.br/landing` (sem barra) deve estar **Tagged** ou redirecionar 301 a `/landing/` (nginx `location = /landing` em [`infra/plataforma-4unik-nginx-redirects.conf`](../../infra/plataforma-4unik-nginx-redirects.conf)); interim: `out/404.html` inclui gtag no build com `NEXT_PUBLIC_GA_ID`.
3. Admin → **Coleta e modificação de dados → Fluxos de dados** — confirmar **Enhanced Measurement** ativo (page views em navegação SPA).
4. DevTools → Network — pedidos a `google-analytics.com/g/collect` com `tid=G-SMJDYCENBC`.
5. Build: `npm run verify:ga-build` e `npm run verify:ga-404-fallback` após `npm run build`.
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
- **GA Data API real no MCP** — requer service account GCP com acesso à propriedade `327916606`; ver [`GCP_SERVICE_ACCOUNT_SETUP.md`](../GCP_SERVICE_ACCOUNT_SETUP.md).

## Agentes Paperclip

Agentes Paperclip (e Cursor) que operam neste repositório devem:

1. Ler este ficheiro antes de alterar tracking ou interpretar métricas GA4.
2. Usar MCP `search_product_knowledge` com termos `GA4`, `integrations`, `G-SMJDYCENBC`.
3. **Não** reintroduzir `process.env[key]` dinâmico em `src/lib/site.ts`.
4. Após mudanças que afetem analytics, correr `npm run verify:ga-build` e `npm run deploy:production` (Actions pode estar bloqueado por billing).

**Estado (2026-06-10):** GA4 activo em produção — hits `g/collect` com `tid=G-SMJDYCENBC` confirmados em `https://plataforma.4unik.com.br/landing/`. Sanity fallback: `siteSettings.gaMeasurementId = G-SMJDYCENBC`.

Não há registo separado no Paperclip — a KB versionada no repo é a fonte de verdade; sincronizar skills Paperclip a partir deste repo após push para `main`.
