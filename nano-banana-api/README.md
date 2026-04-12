# Nano Banana API

Endpoint HTTPS compatível com o Sanity Studio da landing [`../`](../): **POST** JSON `{ "prompt": string }` → JSON `{ imageBase64, mimeType }` (OpenAI **DALL·E 3**).

## 1. Requisitos

- Conta [OpenAI](https://platform.openai.com/) com API key e créditos para Images.
- [Vercel CLI](https://vercel.com/docs/cli) recente (`npm i -g vercel@latest`).

## 2. Projeto Vercel **separado** do site Next.js

Esta pasta é **só** `api/generate.ts`. Não uses **Link to existing project → landing** (esse projeto é o Next.js da raiz do repo). Senão o deploy tenta compilar o app errado e falha ou ignora a API.

Na pasta `nano-banana-api/`:

```bash
rm -rf .vercel
vercel login
vercel
```

Responde **N**o a “link to existing” e cria um projeto novo, por exemplo **`nano-banana-api`** (nome à tua escolha).

## 3. Variável `OPENAI_API_KEY` (CLI 50+)

A CLI exige o **ambiente** no comando:

```bash
vercel env add OPENAI_API_KEY production
```

Quando pedir o valor, cola a chave (`sk-...`) e confirma.  
(Alternativa: [Vercel Dashboard](https://vercel.com/) → o projeto **nano-banana-api** → **Settings → Environment Variables** → `OPENAI_API_KEY` → Production.)

Opcional:

```bash
vercel env add ALLOWED_ORIGINS production
# valor exemplo: https://yoooobe.github.io,http://localhost:3000
```

## 4. Deploy

```bash
vercel --prod
```

No fim, copia a URL de produção, por exemplo `https://nano-banana-api-xxxxx.vercel.app`.

O endpoint do Nano Banana na landing deve ser **exactamente**:

```text
https://<teu-projeto>.vercel.app/api/generate
```

## 5. Ligar à landing

1. **GitHub** → **Settings → Secrets → Actions** → `SANITY_STUDIO_NANO_BANANA_URL` = URL acima (com `/api/generate`).
2. Push / workflow para rebuild da landing.
3. CORS já está permitido para `https://yoooobe.github.io` no código da API.

## 6. Teste rápido

```bash
curl -sS -X POST 'https://<teu-projeto>.vercel.app/api/generate' \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://yoooobe.github.io' \
  -d '{"prompt":"A minimal orange icon on dark blue"}' | head -c 200
```

Deves ver JSON com `imageBase64`.

## 7. Desenvolvimento local (`vercel dev`)

```bash
cp .env.example .env.local
# edita OPENAI_API_KEY em .env.local
vercel dev
```

## 8. Se quiseres **um** repositório Git + Vercel

No Dashboard do projeto → **Settings → General → Root Directory** = `nano-banana-api` (e liga o repo `Yoooobe/landing`). Assim o deploy Git usa só esta pasta; não mistures com o preset do Next na raiz sem essa definição.

## Custos e limites

- Faturação OpenAI: [preços Images](https://openai.com/pricing).
- Conteúdo sujeito às políticas da API; prompts rejeitados devolvem erro 502 com detalhe da OpenAI.
