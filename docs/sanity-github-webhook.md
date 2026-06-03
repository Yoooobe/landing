# Webhook Sanity → GitHub Actions (deploy automático)

O workflow [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) já corre em:

- **push** na branch `main`
- **workflow_dispatch** (botão *Run workflow* nas Actions)
- **`repository_dispatch`** com `event_type` **`sanity-publish`**

Para **publicar no Sanity** e **disparar um novo build/deploy** sem abrir o GitHub, configura um webhook no projeto Sanity que chama a API `repository_dispatch` do GitHub com um corpo JSON no formato que o GitHub exige.

## 1. Token do GitHub (PAT)

1. GitHub → **Settings → Developer settings → Personal access tokens** (ou *Fine-grained tokens*).
2. Cria um token com permissão para o repositório da landing:
   - **Classic:** scope **`repo`** (acesso ao repositório privado/público conforme o caso), **ou**
   - **Fine-grained:** recurso = este repo; **Contents: Read and write** (e **Metadata: Read** se pedido).
3. Copia o token — **não** o commits no repositório; cola-o só no cabeçalho do webhook no Sanity (passo 3).

## 2. URL do webhook

Substitui `OWNER` e `REPO`:

```text
https://api.github.com/repos/OWNER/REPO/dispatches
```

Exemplo: `https://api.github.com/repos/yoooobe/landing/dispatches`

## 3. Criar o webhook no Sanity

1. [sanity.io/manage](https://www.sanity.io/manage) → projeto → **API** → **Webhooks** → **Create webhook**.
2. **URL:** a do passo 2.
3. **HTTP method:** `POST`.
4. **HTTP Headers** (nomes exatos):

   | Name | Value |
   | --- | --- |
   | `Accept` | `application/vnd.github+json` |
   | `Authorization` | `Bearer ghp_xxxxxxxx` (o teu PAT) |
   | `X-GitHub-Api-Version` | `2022-11-28` |

5. **Trigger on:** por exemplo *Create*, *Update*, *Delete* (ou o conjunto que quiseres).
6. **Filter** (opcional): limita a tipos que afetam o site, para não fazer build a cada mudança irrelevante, por exemplo:

   ```groq
   _type in ["marketingPage", "blogPost", "siteSettings", "apiIntegracoesShowcaseMedia", "homeShowcaseMedia", "platformShowcaseMedia", "gamificacaoShowcaseMedia", "workvivoShowcaseMedia"]
   ```

7. **Projection** (obrigatório para o GitHub aceitar o pedido): o corpo tem de incluir **`event_type`**. O workflow escuta **`sanity-publish`**. Exemplo mínimo:

   ```groq
   {
     "event_type": "sanity-publish",
     "client_payload": {
       "projectId": sanity::projectId(),
       "dataset": sanity::dataset()
     }
   }
   ```

   O GitHub **rejeita** o payload por defeito do Sanity (campos `_id`, `_type`, etc.) se não usares uma projeção que devolva **só** o formato acima — ver [GROQ-powered webhooks](https://www.sanity.io/docs/developer-guides/projections-in-groq-powered-webhooks).

8. Grava o webhook e testa com **Test** no painel do Sanity; no GitHub → **Actions** deve aparecer uma execução do workflow *Deploy to GitHub Pages*.

## 4. Segurança

- Rota o PAT quando suspeitares de fuga; usa fine-grained só neste repo.
- O PAT no Sanity tem poder de **disparar** workflows; não dá acesso ao dataset Sanity. Quem tem o PAT pode pedir `repository_dispatch` — mantém o token secreto.

## 5. Troubleshooting

| Sintoma | Causa provável |
| --- | --- |
| Sanity mostra **422** no webhook | Corpo não tem `event_type` ou inclui chaves que o GitHub não aceita — usa a **projection** acima. |
| **401** no webhook | PAT inválido, expirado, ou header `Authorization` mal formatado (`Bearer ` + token). |
| **404** na URL | `OWNER`/`REPO` errados ou token sem acesso ao repo. |
| Workflow não corre | Em **Settings → Pages**, a origem tem de ser **GitHub Actions** (ver [DEPLOY.md](../DEPLOY.md)). |
| Site sem CSS após deploy | O workflow passa a criar `out/.nojekyll` antes do artefacto; se deployares à mão, usa `touch out/.nojekyll` como em `scripts/deploy-gh-pages.sh`. |

## 6. Secrets do build (GitHub)

O webhook **não** substitui estes secrets — só **inicia** o workflow. Configura em **Settings → Secrets and variables → Actions** (nome do secret = nome da variável):

| Secret | Obrigatório | Notas |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Recomendado | ID real do projeto; o CI rejeita `your-project-id` e `xxx` |
| `NEXT_PUBLIC_SANITY_DATASET` | Recomendado | Normalmente `production` |
| `NEXT_PUBLIC_SITE_URL` | Recomendado | Ex.: `https://yoooobe.github.io/landing` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Opcional | |
| `NEXT_PUBLIC_GA_ID` | Opcional | |
| `SANITY_STUDIO_NANO_BANANA_URL` | Opcional | Nano Banana no Studio (embutido no build) |

Lista completa e troubleshooting: [cms.md §6](cms.md#6-deploy-e-quando-fazer-rebuild).
