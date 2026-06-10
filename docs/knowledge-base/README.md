# Base de conhecimento (agentes + MCP)

Conhecimento estratégico versionado no repositório para skills Cursor e o MCP `4unik-marketing`. **Não substitui** copy publicável em Sanity ou `src/messages/segments/` — é a camada de estratégia e factos aprovados antes de ir para o site.

## Estado atual

**2026-06-02:** briefing **NotebookLM + complemento repositório** (`4unik-ai-discovery`, rotas, API Yoobe, roadmap Inteligência) fundidos em `briefing.md` e fatiados em `notebooklm/*.md`. Claims comerciais (% concorrência, tração, logos) exigem validação antes da landing ou Sanity.

## NotebookLM → repositório

O notebook privado no Google **não** tem API pública para agentes. O fluxo suportado é export manual:

1. Abrir [NotebookLM](https://notebooklm.google.com/) → notebook `1251466e-39f5-4a02-966b-3631d0082d11`.
2. Copiar o **Briefing** e notas relevantes → [`notebooklm/briefing.md`](notebooklm/briefing.md).
3. Resumos factuais de sources novas → [`notebooklm/product-facts.md`](notebooklm/product-facts.md) ou [`notebooklm/editorial-themes.md`](notebooklm/editorial-themes.md).
4. Atualizar [`notebooklm/meta.yaml`](notebooklm/meta.yaml) (`last_synced: YYYY-MM-DD`).
5. Uma linha em [`notebooklm/changelog.md`](notebooklm/changelog.md).
6. (Opcional) Pedir ao agente com skill `notebooklm-knowledge-curator` para fatiar o briefing nos outros ficheiros **sem inventar factos**.

Ritual completo: [`docs/agent-knowledge-notebooklm.md`](../agent-knowledge-notebooklm.md).

## O que vai em cada ficheiro

| Ficheiro | Conteúdo |
|----------|----------|
| `notebooklm/briefing.md` | Síntese principal do NotebookLM (colar aqui) |
| `notebooklm/positioning.md` | 4unik vs Yoobe, categoria, mensagens a evitar |
| `notebooklm/icp-personas.md` | Compradores, dores, objeções |
| `notebooklm/competitors.md` | Landscape e ângulos educativos (sem claims não verificados) |
| `notebooklm/product-facts.md` | API, integrações, limites factuais |
| `notebooklm/editorial-themes.md` | Clusters blog, FAQs, ideias de página |
| `notebooklm/changelog.md` | Histórico de syncs (uma linha por data) |
| `notebooklm/meta.yaml` | `notebook_id`, `last_synced`, `stale_after_days` |
| [`integrations.md`](integrations.md) | IDs de serviços externos (GA4, GTM, pixels) para agentes |

## Ferramentas MCP

Com o servidor `4unik-marketing` ativo no Cursor:

- `get_notebooklm_briefing` — briefing + metadata
- `search_product_knowledge` — busca por palavra-chave na KB
- `suggest_growth_opportunities` — gaps de rotas + pilares + backlog
- `get_knowledge_freshness` — alerta se o sync estiver antigo

## Três camadas (evitar drift)

1. **Estratégia** → `docs/knowledge-base/` (este diretório)
2. **Copy publicável** → Sanity + segmentos TypeScript
3. **Rotas** → `src/app/` após item **Ready** em [`landing-improvement-backlog.md`](../landing-improvement-backlog.md)
