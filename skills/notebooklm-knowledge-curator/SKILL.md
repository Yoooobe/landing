---
name: notebooklm-knowledge-curator
description: Sincroniza e cura a base de conhecimento NotebookLM em docs/knowledge-base/ — fatiar briefing, changelog e alinhamento com posicionamento 4unik sem inventar factos.
triggers:
  - notebooklm
  - sync briefing
  - base de conhecimento
  - knowledge base
  - atualizar conhecimento
disable-model-invocation: true
---

# NotebookLM Knowledge Curator

Mantém `docs/knowledge-base/notebooklm/` alinhada ao notebook Google e ao posicionamento da landing.

## Regras

1. **Nunca inventar** métricas, clientes, integrações ou claims legais — só reorganizar texto já colado pelo humano ou presente no briefing.
2. **Não editar** `src/`, Sanity nem segmentos nesta skill — só ficheiros em `docs/knowledge-base/`.
3. Após cada alteração: `meta.yaml` (`last_synced`) + linha em `changelog.md`.
4. Alinhar tom com `skills/4unik-ai-discovery/SKILL.md` e equivalências em `positioning.md`.

## MCP (ordem)

1. `get_knowledge_freshness`
2. `get_notebooklm_briefing`
3. `search_product_knowledge` — validar termos novos antes de fatiar

## Fluxo de sync

1. Confirmar que o humano colou o Briefing em `briefing.md` (ou colar você só se o utilizador forneceu o texto na conversa).
2. Fatir secções para `positioning.md`, `icp-personas.md`, `competitors.md`, `product-facts.md`, `editorial-themes.md` **sem adicionar factos**.
3. Remover placeholders “vazio até primeiro sync” onde houver conteúdo real.
4. Atualizar `last_synced` e `changelog.md`.

## Checklist de qualidade

- [ ] 4unik vs Yoobe explícito onde o notebook misturar marcas
- [ ] Sem comparativos “vs concorrente” não aprovados
- [ ] Claims sensíveis (%, tração, logos) marcados como "requer aprovação" ou alinhados ao que já está publicado (`/educacao/`, blog slug `"8"`) — ver [`icp-messaging-guide.md`](../../docs/knowledge-base/notebooklm/icp-messaging-guide.md)
- [ ] `get_knowledge_freshness` → `freshness: ok` após sync

## Referências

- [`docs/agent-knowledge-notebooklm.md`](../../docs/agent-knowledge-notebooklm.md)
- [`docs/knowledge-base/README.md`](../../docs/knowledge-base/README.md)
