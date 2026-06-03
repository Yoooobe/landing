---
name: marketing-page-ideator
description: Sugere novas páginas, funis e melhorias de aquisição para a landing 4unik — cruza KB NotebookLM, rotas reais, pilares enterprise e backlog sem implementar código salvo pedido.
triggers:
  - nova página
  - sugerir página
  - estratégia de aquisição
  - o que falta no site
  - growth ideation
  - trazer mais clientes
disable-model-invocation: true
---

# Marketing Page Ideator (4unik)

Gera propostas de rotas, funis e conteúdo para [`docs/landing-improvement-backlog.md`](../../docs/landing-improvement-backlog.md). **Readonly em `src/`** salvo pedido explícito de implementação.

## MCP (ordem)

1. `get_knowledge_freshness` — se `missing_sync` ou `stale`, avisar e usar fallback (`4unik-ai-discovery`, enterprise strategy).
2. `suggest_growth_opportunities` — `focus` opcional (ex. "segurança", "ROI").
3. `search_product_knowledge` — validar termos do pedido.
4. `get_content_sync_registry` — mapa de ficheiros se a proposta virar implementação.

## Leitura obrigatória

- [`docs/enterprise-content-strategy.md`](../../docs/enterprise-content-strategy.md)
- Rotas PT: `src/app/(pt)/` — EN: `src/app/(en)/en/`
- Backlog: [`docs/landing-improvement-backlog.md`](../../docs/landing-improvement-backlog.md)

## Composição

- **`4unik-ai-discovery`**: posicionamento Reward Infrastructure / 4unik V3.
- **`marketing-growth-hacker`**: priorização por funil e experimentos.
- **`marketing-content-creator`**: copy e calendário blog.

## Entregável (tabela)

| rota PT | rota EN | intenção | ICP | prova necessária | esforço | prioridade P0–P3 |

Incluir:

- 3–8 oportunidades ranqueadas
- Bloco **Next Up** em markdown pronto para colar no backlog
- Nota PT/EN parity e tema de batch (`seo` | `content` | `navigation`)

## ICPs verticais (eixo API-first / camada de execução)

Cruzar com os 5 ICPs refinados em [`icp-personas.md`](../../docs/knowledge-base/notebooklm/icp-personas.md):

- `/para-plataformas/` — plataformas/B2B SaaS embedded (API como camada de execução).
- `/educacao/` — e-learning/infoprodutores (recompensa por conclusão; caso Boticário, flag aprovação).
- `/vendas/` — incentivo integrado ao CRM, premiação instantânea.
- `/comunidades/` — criadores/fãs, loja VIP com fulfillment 4unik.
- `/eventos/` — checkout no celular, retirada no estande/entrega rastreada.

## Exemplos no backlog atual

- `/seguranca/`, calculadora ROI, pilar “gamificação para RH”, comparativos educativos AEO.

## Não fazer

- Criar rotas em `src/app/` sem item **Ready** aprovado
- Publicar no Sanity sem revisão humana (`docs/cms.md`)
