# Nano Banana API

Endpoint HTTPS compatível com o Sanity Studio da landing [`../`](../): **POST** JSON `{ "prompt": string, "aspectRatio"?: string, "style"?: string }` → JSON `{ imageBase64, mimeType }` via **Gemini API** (modelo [`gemini-2.5-flash-image`](https://ai.google.dev/gemini-api/docs/image-generation)), usando o SDK oficial [`@google/genai`](https://github.com/googleapis/js-genai). `aspectRatio` deve ser um dos valores expostos por **GET** `/api/generate` (`aspectRatios`). `style` é concatenado ao prompt no servidor. **Rate limit:** 60 pedidos/minuto por IP (por instância serverless).

**URL no Studio:** o ideal é `https://<projeto>.vercel.app/api/generate`. O `vercel.json` inclui *rewrites* de `/` e `/api` para `/api/generate`, para evitar **404 NOT_FOUND** se o secret tiver só o domínio (sem path).

## 1. Requisitos

- Chave **Gemini API** em [Google AI Studio](https://aistudio.google.com/apikey) (ou a variável `GOOGLE_API_KEY` com o mesmo valor, [suportada pelo SDK](https://github.com/googleapis/js-genai/blob/main/codegen_instructions.md)).
- [Vercel CLI](https://vercel.com/docs/cli) recente (`npm i -g vercel@latest`).

Documentação relevante:

- [Image generation (Gemini API)](https://ai.google.dev/gemini-api/docs/image-generation)
- [JavaScript/TypeScript — `@google/genai`](https://github.com/googleapis/js-genai/blob/main/codegen_instructions.md)

## 2. Projeto Vercel **separado** do site Next.js

Esta pasta é **só** `api/generate.ts`. Não uses **Link to existing project → landing** (esse projeto é o Next.js da raiz do repo). Senão o deploy tenta compilar o app errado e falha ou ignora a API.

Na pasta `nano-banana-api/`:

```bash
rm -rf .vercel
vercel login
vercel
```

Responde **N**o a “link to existing” e cria um projeto novo, por exemplo **`nano-banana-api`** (nome à tua escolha).

## 3. Variável `GEMINI_API_KEY` (CLI 50+)

A CLI exige o **ambiente** no comando:

```bash
vercel env add GEMINI_API_KEY production
```

Quando pedir o valor, cola a chave da Google AI Studio e confirma.  
(Alternativa: [Vercel Dashboard](https://vercel.com/) → o projeto **nano-banana-api** → **Settings → Environment Variables** → `GEMINI_API_KEY` → Production.)

Podes usar em alternativa **`GOOGLE_API_KEY`** com o mesmo valor (o código aceita qualquer uma das duas).

**Migração a partir de OpenAI:** remove ou deixa de usar `OPENAI_API_KEY` neste serviço; o handler já não a lê.

Opcional:

```bash
vercel env add ALLOWED_ORIGINS production
# valor exemplo: https://yoooobe.github.io,http://localhost:3000
```

## 4. Deploy

```bash
vercel --prod
```

No fim, o CLI mostra um URL de *deployment*; no dashboard vês também **aliases** de produção.

**URL a usar no Sanity / GitHub (público, sem login Vercel):** confirma no Dashboard → *Domains* ou com `vercel inspect <url-do-último-deploy>` a linha **Aliases**. Para o projeto `nano-banana-api` na equipa `yoobe-devs-s-team`, o alias **`https://nano-banana-api-pi.vercel.app`** costuma ser o acessível a partir do browser público (outros aliases `*-yoobe-devs-s-team.vercel.app` podem ter **Deployment Protection** / SSO e bloquear o `fetch` desde o GitHub Pages).

Endpoint completo:

```text
https://nano-banana-api-pi.vercel.app/api/generate
```

(Substitui se o teu alias for outro.)

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

Copia **só** as linhas do bloco acima: se colares texto explicativo na mesma linha depois de `head`, o terminal parte o comando (`head: … No such file`). O resultado deve começar por `{"mimeType":` e `imageBase64`. Com `| head -c …` o `curl` pode mostrar aviso `(56)` ao fechar o pipe cedo — é normal.

Para ver só o código HTTP: `curl -sS -o /dev/null -w '%{http_code}\n' -X POST '…' -H 'Content-Type: application/json' -d '{"prompt":"…"}'`.

## 7. Desenvolvimento local (`vercel dev`)

```bash
cp .env.example .env.local
# edita GEMINI_API_KEY em .env.local
vercel dev
```

## 8. Se quiseres **um** repositório Git + Vercel

No Dashboard do projeto → **Settings → General → Root Directory** = `nano-banana-api` (e liga o repo `Yoooobe/landing`). Assim o deploy Git usa só esta pasta; não mistures com o preset do Next na raiz sem essa definição.

## Custos e limites

- Faturação e quotas: [Gemini API pricing](https://ai.google.dev/pricing) e documentação do produto.
- Conteúdo sujeito às políticas de segurança do modelo; prompts bloqueados devolvem `400` com `Prompt blocked`.
