# Nano Banana API

Endpoint HTTPS compatível com o Sanity Studio da landing [`../`](../): **POST** JSON `{ "prompt": string }` → JSON `{ imageBase64, mimeType }` (OpenAI **DALL·E 3**).

## 1. Requisitos

- Conta [OpenAI](https://platform.openai.com/) com API key e créditos para Images.
- [Vercel CLI](https://vercel.com/docs/cli) (`npm i -g vercel`) ou deploy pelo site.

## 2. Deploy na Vercel (recomendado)

Na raiz desta pasta (`nano-banana-api/`):

```bash
npm install
vercel login
vercel link   # cria projeto; escolhe scope e nome, ex. nano-banana-api
vercel env add OPENAI_API_KEY   # cola sk-... (produção)
# opcional: vercel env add ALLOWED_ORIGINS
vercel --prod
```

No fim, o CLI mostra a URL de produção, por exemplo `https://nano-banana-api-xxx.vercel.app`.

O endpoint a usar no Studio é:

```text
https://<teu-projeto>.vercel.app/api/generate
```

## 3. Ligar à landing

1. **GitHub** (site em GitHub Pages): em **Settings → Secrets → Actions**, define  
   `SANITY_STUDIO_NANO_BANANA_URL` = URL completa acima (com `/api/generate`).
2. Faz deploy da landing (push ou workflow) para o bundle incluir a variável.
3. **Sanity → API → CORS origins**: já deves ter `https://yoooobe.github.io`. A chamada vai para `*.vercel.app`, não para o Sanity — não precisas de CORS no OpenAI.

## 4. Teste rápido

```bash
curl -sS -X POST 'https://<teu-projeto>.vercel.app/api/generate' \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://yoooobe.github.io' \
  -d '{"prompt":"A minimal orange icon on dark blue"}' | head -c 200
```

Deves ver JSON com `imageBase64`.

## 5. Desenvolvimento local (`vercel dev`)

```bash
cp .env.example .env.local
# edita OPENAI_API_KEY
vercel dev
```

Testa em `http://localhost:3000/api/generate` (porta que o Vercel indicar) e aponta temporariamente `SANITY_STUDIO_NANO_BANANA_URL` no `.env.local` da landing para essa URL.

## Custos e limites

- Faturação OpenAI conforme [preços Images](https://openai.com/pricing).
- Conteúdo sujeito às políticas da API; prompts rejeitados devolvem erro 502 com mensagem da OpenAI.
