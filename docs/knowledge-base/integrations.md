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
- Evento de conversão: `generate_lead` disparado em [`src/components/LeadCaptureForm.tsx`](../../src/components/LeadCaptureForm.tsx) após submissão bem-sucedida. Marcar como **key event** no GA4 Admin quando aparecer nos dados.

### Verificação pós-deploy

1. GA4 → **Relatórios → Tempo real** — visitar `https://plataforma.4unik.com.br/landing/`.
2. Admin → **Coleta e modificação de dados → Fluxos de dados** — confirmar **Enhanced Measurement** ativo (page views em navegação SPA).
3. DevTools → Network — pedidos a `google-analytics.com/g/collect` com `tid=G-SMJDYCENBC`.

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

Agentes que operam neste repositório devem consultar este ficheiro (via `search_product_knowledge` ou leitura directa) antes de alterar tracking ou interpretar métricas. Não há registo separado no Paperclip — a KB versionada no repo é a fonte de verdade.
