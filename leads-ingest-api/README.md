# Leads Ingest API

Endpoint HTTPS para formulários de contacto da landing ([`../`](../)) em **export estático** (GitHub Pages). O browser faz `POST` JSON com o mesmo contrato de [`src/lib/leadPayload.ts`](../src/lib/leadPayload.ts).

## 1. Deploy (projeto Vercel separado)

Na pasta `leads-ingest-api/`:

```bash
rm -rf .vercel
vercel login
vercel
```

Cria um projeto novo (ex.: **`leads-ingest-api`**), **não** ligues ao projeto Next.js da raiz.

## 2. Variáveis (Production)

**Postmark (recomendado):**

```bash
vercel env add POSTMARK_SERVER_TOKEN production
vercel env add LEADS_NOTIFY_EMAIL production
vercel env add LEADS_FROM_EMAIL production   # remetente verificado no Postmark
```

**Opcional — webhook** (Zapier, Make, n8n):

```bash
vercel env add LEADS_WEBHOOK_URL production
```

**CORS:**

```bash
vercel env add ALLOWED_ORIGINS production
# https://plataforma.4unik.com.br,https://yoooobe.github.io,http://localhost:3000
```

## 3. Publicar

```bash
vercel --prod
```

URL típico do endpoint:

```text
https://<projeto>.vercel.app/api/ingest
```

## 4. Ligar à landing

1. GitHub → **Settings → Secrets → Actions** → `NEXT_PUBLIC_LEADS_INGEST_URL` = URL acima.
2. Build local / deploy manual: exporta a mesma variável antes de `npm run build`.
3. Redeploy da landing (`npm run deploy:gh-pages` ou workflow).

## 5. Teste

```bash
curl -sS -X POST 'https://<projeto>.vercel.app/api/ingest' \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://plataforma.4unik.com.br' \
  -d '{"name":"Teste","email":"test@example.com","company":"Acme","consent":true,"source":"smoke","locale":"pt"}'
```

Esperado: `{"ok":true}` com HTTP 200.

Ver também [`docs/leads-ingest.md`](../docs/leads-ingest.md).
