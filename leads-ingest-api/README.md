# Leads Ingest API

Endpoint HTTPS para formulários de contacto da landing ([`../`](../)) em **export estático** (GitHub Pages).

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

Templates Postmark: [`docs/postmark/`](../docs/postmark/README.md). DNS do domínio: [`docs/postmark/dns-4unik-com-br.md`](../docs/postmark/dns-4unik-com-br.md).

## 3. Ligar à landing

`NEXT_PUBLIC_LEADS_INGEST_URL=https://leads-ingest-api.vercel.app/api/ingest` no build (GitHub secret ou export local antes de `npm run deploy:gh-pages`).

## 4. Studio

Painel **Leads e audiência** em `/landing/studio/` — lista submissões e métricas por origem/idioma. Ver [`docs/cms.md`](../docs/cms.md).

## 5. Teste

```bash
curl -sS -X POST 'https://leads-ingest-api.vercel.app/api/ingest' \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://plataforma.4unik.com.br' \
  -d '{"name":"Teste","email":"test@example.com","company":"Acme","consent":true,"source":"smoke","locale":"pt"}'
```

Esperado: `{"ok":true,"sanityId":"..."}` com HTTP 200 (requer DNS Postmark + remetente verificados).
