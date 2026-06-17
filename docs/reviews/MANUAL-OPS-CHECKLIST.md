# Checklist operacional — GA4, proxy e KB

Itens que **não** são automatizáveis no repo. Marque quando concluídos.

## GA4 Admin — key events

1. Abrir [Admin → Events](https://analytics.google.com/analytics/web/#/a66932658p327916606/admin/events) → aba **Key events**.
2. **New key event** (um de cada vez), nome exato:
   - `generate_lead`
   - `schedule_demo`
   - `contact_whatsapp`
3. Validar: clicar num CTA Calendly/WhatsApp em produção + submeter formulário de teste; confirmar em **Realtime** ou **Recent events**.

Referência: [`docs/knowledge-base/integrations.md`](../knowledge-base/integrations.md).

## Proxy 301 — paths sem `/landing`

1. Obter acesso SSH: `PLATAFORMA_PROXY_SSH=user@host` (porta 22 bloqueada em `177.136.235.130` em jun/2026).
2. Aplicar snippet: [`infra/plataforma-4unik-nginx-redirects.conf`](../../infra/plataforma-4unik-nginx-redirects.conf).
3. Comando: `PLATAFORMA_PROXY_SSH=user@host npm run infra:apply-proxy-redirects`
4. Validar: `curl -sI https://plataforma.4unik.com.br/pricing/` → `301` para `/landing/pricing/`.

## NotebookLM — sync KB

1. Exportar briefing atualizado do NotebookLM.
2. Colar em `docs/knowledge-base/notebooklm/briefing.md`.
3. Atualizar `last_synced` em `docs/knowledge-base/notebooklm/meta.yaml`.

## Cursor Automations (opcional)

Ativar no dashboard Cursor conforme [`docs/cursor-automations-growth.md`](../cursor-automations-growth.md):

- Weekly growth audit (segundas)
- Monthly GA4 snapshot (dia 15)
