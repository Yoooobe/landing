# Leads Ingest API

Endpoint HTTPS para formulários de contacto da landing ([`../`](../)) e para o
rastreamento das campanhas do dashboard.

## Fluxo

1. Browser → `POST /api/ingest` (JSON, ver [`src/lib/leadPayload.ts`](../src/lib/leadPayload.ts))
2. API → documento `leadSubmission` no Sanity
3. API → Postmark: notificação plain para `comercial@4unik.com.br`
4. API → Postmark: auto-reply ao visitante (template `45224995`)

## 1. Deploy (projeto Vercel separado)

```bash
cd leads-ingest-api
vercel login
vercel link --yes
vercel --prod --yes
```

URL de produção: `https://leads-ingest-api.vercel.app/api/ingest`

## 2. Variáveis (Production)

| Variável | Descrição |
| --- | --- |
| `POSTMARK_SERVER_TOKEN` | Token do server [19497979](https://account.postmarkapp.com/servers/19497979/api-tokens) |
| `POSTMARK_TEMPLATE_ID` | `45224995` (auto-reply) |
| `LEADS_FROM_EMAIL` | Remetente verificado @4unik.com.br |
| `LEADS_NOTIFY_EMAIL` | `comercial@4unik.com.br` |
| `LEADS_DEMO_URL` | URL Calendly (opcional) |
| `LEADS_SITE_URL` | `https://plataforma.4unik.com.br/landing/` |
| `SANITY_API_WRITE_TOKEN` | Token Editor (criar `leadSubmission`) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID do projeto |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `TRACKING_SECRET` | HMAC compartilhado com o dashboard (32+ bytes) |
| `TRACKING_SYNC_KEY` | Chave exclusiva do pull de eventos pelo dashboard |
| `GA4_MEASUREMENT_ID` | Stream GA4, por exemplo `G-SMJDYCENBC` |
| `GA4_MP_API_SECRET` | Secret do Measurement Protocol do mesmo stream |

## Rastreamento de campanhas

Rotas serverless:

- `GET /api/email/open?token=...`: registra a abertura e devolve GIF 1×1.
- `GET /api/email/click?token=...`: registra e redireciona para o destino assinado.
- `GET /api/email/unsubscribe?token=...`: mostra a confirmação.
- `POST /api/email/unsubscribe?token=...`: efetiva o descadastro, inclusive one-click.
- `GET /api/email/events?cursor=...`: sincroniza eventos com `X-Sync-Key`.

Os eventos ficam em documentos `emailTrackingEvent` no Sanity. Cliques para o
WhatsApp `+55 11 2684-4724` e para `comercial@4unik.com.br` também geram,
respectivamente, `contact_whatsapp` e `contact_email` no GA4. Nenhum nome,
e-mail ou telefone é enviado ao GA4.

A URL canônica usada nos e-mails é:

```text
https://plataforma.4unik.com.br/api/email
```

O servidor de `plataforma.4unik.com.br` deve aplicar o proxy documentado em
[`../infra/plataforma-4unik-nginx-server.example.conf`](../infra/plataforma-4unik-nginx-server.example.conf).

Templates Postmark: [`docs/postmark/`](../docs/postmark/README.md). DNS do domínio: [`docs/postmark/dns-4unik-com-br.md`](../docs/postmark/dns-4unik-com-br.md).

## 3. Ligar à landing

`NEXT_PUBLIC_LEADS_INGEST_URL=https://leads-ingest-api.vercel.app/api/ingest` no build (GitHub secret ou export local antes de `npm run deploy:gh-pages`).

## 4. Studio

Painel **Leads e audiência** em `/landing/studio/` — lista submissões e métricas por origem/idioma. Ver [`docs/cms.md`](../docs/cms.md).

## 5. Testes locais

```bash
npm run typecheck
npm run test:tracking
```

Teste do formulário:

```bash
curl -sS -X POST 'https://leads-ingest-api.vercel.app/api/ingest' \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://plataforma.4unik.com.br' \
  -d '{"name":"Teste","email":"test@example.com","company":"Acme","consent":true,"source":"smoke","locale":"pt"}'
```

Esperado: `{"ok":true,"sanityId":"..."}` com HTTP 200 (requer DNS Postmark + remetente verificados).
