---
name: marketing-strategy-orchestrator
description: Orquestra skills de marketing 4unik para planos trimestrais, mais clientes e melhorias holísticas — uma sessão por tema (seo, content, navigation).
triggers:
  - plano trimestral
  - trazer mais clientes
  - estratégia de marketing
  - growth plan
  - orquestrar marketing
disable-model-invocation: true
---

# Marketing Strategy Orchestrator

Meta-skill para tarefas amplas. **Uma sessão = um tema** — não misturar schema Sanity com polish visual.

## Temas e ordem

### `content`

1. `notebooklm-knowledge-curator` (se KB stale)
2. `marketing-content-creator`
3. `marketing-ai-citation-strategist`
4. Lane `growth-ideation` em [`docs/landing-background-agents.md`](../../docs/landing-background-agents.md)

### `seo`

1. `marketing-page-ideator`
2. `marketing-growth-hacker`
3. `marketing-ai-citation-strategist`
4. MCP: `get_aeo_landing_checklist`, `get_landing_optimization_snapshot`

### `navigation`

1. `marketing-page-ideator`
2. `landing-page-builder`
3. `web-design-specialist` (só se pedido visual)

## MCP inicial (qualquer tema)

1. `get_knowledge_freshness`
2. `suggest_growth_opportunities`
3. `get_content_sync_registry`

## Saída da sessão

1. Resumo executivo (5 bullets)
2. Backlog atualizado ou diff proposto para `docs/landing-improvement-backlog.md`
3. Próximo passo humano (ex. colar NotebookLM, aprovar P0, configurar leads URL)
4. Qual lane executar: `audit` → `implementation` → `verification`

## ICPs e diferenciação (eixo API-first)

Planos por ICP usando os 5 perfis refinados em [`icp-personas.md`](../../docs/knowledge-base/notebooklm/icp-personas.md): plataformas/embedded, e-learning, vendas, comunidades, eventos. RH/People segue como comprador primário na home; os verticais ampliam o alcance via posicionamento **camada de execução / comportamento programável** (não "empresa de brindes").

## Política de três camadas

1. Estratégia → `docs/knowledge-base/`
2. Copy → Sanity + `src/messages/segments/`
3. Código → `src/app/` após **Ready**

## Verificação pós-merge (referência)

`npm run validate:landing-routes` e smoke em `https://plataforma.4unik.com.br/landing/` (ver `AGENTS.md`).
