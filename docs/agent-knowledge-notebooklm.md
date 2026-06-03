# Conhecimento NotebookLM para agentes

Sincroniza o notebook privado [1251466e-39f5-4a02-966b-3631d0082d11](https://notebooklm.google.com/notebook/1251466e-39f5-4a02-966b-3631d0082d11) com o repositório para skills Cursor e o MCP `4unik-marketing`.

## Por que não há API direta

O NotebookLM não expõe API pública estável para leitura automática. O fluxo suportado é **export manual → Git → MCP**.

## Ritual de sync (5–15 min)

1. Abrir o notebook no Google NotebookLM.
2. Copiar o **Briefing** (e notas que quiser preservar).
3. Colar em [`docs/knowledge-base/notebooklm/briefing.md`](../knowledge-base/notebooklm/briefing.md) (substituir o placeholder).
4. Resumos factuais de sources novas → `product-facts.md` ou `editorial-themes.md`.
5. Em [`meta.yaml`](../knowledge-base/notebooklm/meta.yaml): `last_synced: YYYY-MM-DD`.
6. Linha em [`changelog.md`](../knowledge-base/notebooklm/changelog.md).
7. (Opcional) Agente com skill `notebooklm-knowledge-curator` fatia o briefing nos outros `.md` **sem inventar factos**.

Frequência recomendada: **mensal** (`sync_frequency_recommended` em `meta.yaml`). Alerta MCP: `get_knowledge_freshness` após 30 dias.

## O que vai para cada camada

| Camada | Onde | Quem edita |
|--------|------|------------|
| Estratégia / notebook | `docs/knowledge-base/` | Marketing + curadoria agente |
| Copy publicável | Sanity `marketingPage`, `blogPost` | Editores no Studio |
| Fallback build | `src/messages/segments/*.ts` | Dev + agente com revisão |
| Rotas novas | `src/app/` | Dev após backlog **Ready** |

**Não** copiar o briefing inteiro para segmentos ou Sanity sem adaptar ao formato da página e revisão humana.

## MCP e skills

Servidor: [`mcps/4unik-marketing`](../mcps/4unik-marketing/index.js) (ativar em [`.cursor/mcp.json`](../.cursor/mcp.json)).

| Tool | Uso |
|------|-----|
| `get_notebooklm_briefing` | Ler briefing + meta |
| `search_product_knowledge` | Busca na KB |
| `suggest_growth_opportunities` | Gaps de páginas e CTAs |
| `get_knowledge_freshness` | Sync em falta ou antigo |

Skills: `notebooklm-knowledge-curator`, `marketing-page-ideator`, `marketing-strategy-orchestrator` (ver [`skills/`](../skills/)).

## Copy por ICP

Antes de reescrever copy da landing (hero, sub, FAQ, CTA, SEO) ou gerar blog, ler [`icp-messaging-guide.md`](../knowledge-base/notebooklm/icp-messaging-guide.md):

- Princípios de linguagem (frases curtas, "você", "colaboradores", sem jargão).
- Matriz por ICP: RH, Vendas, Marketing/Eventos, CTO/Produto (dor → promessa → prova → CTA).
- "O que NÃO dizer" sem aprovação: % concorrência, tração (R$ 1,34M etc.), logos, recursos de roadmap como prontos.

## Blog e IA

- `generate_blog_post` (MCP) ou `npm run generate:blog-posts` exigem **checklist editorial** em [`cms.md`](cms.md) antes de `--publish`.
- Cruzar tópicos com `editorial-themes.md` e `get_blog_topic_seeds`.

## 4unik vs Yoobe

O notebook pode referir **Yoobe** (reward infrastructure). Na landing pública use **4unik** como marca principal e documente equivalências em [`positioning.md`](../knowledge-base/notebooklm/positioning.md).

## Automations Cursor (opcional)

Modelos em [`cursor-automations-growth.md`](cursor-automations-growth.md).
