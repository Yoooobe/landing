# Cursor Automations — crescimento 4unik (opcional)

Configurar no Cursor (**Automations**) após a primeira sync do NotebookLM em `docs/knowledge-base/notebooklm/briefing.md`.

Requer MCP **`4unik-marketing`** habilitado no ambiente da automation (dashboard MCP).

## 1. Weekly growth audit

| Campo | Valor sugerido |
|-------|----------------|
| **Nome** | 4unik — weekly growth audit |
| **Trigger** | Cron — segunda-feira 09:00 (timezone da equipa) |
| **Modo** | Readonly no repositório |
| **Instruções** | Chamar `get_knowledge_freshness`, `suggest_growth_opportunities`, comparar com `docs/landing-improvement-backlog.md`. Produzir resumo: 3 oportunidades P1–P2, estado da KB, rotas a rever. **Não** editar `src/` nem Sanity. Propor linhas para secção **Next Up** do backlog em markdown para revisão humana. |
| **Tools** | MCP `4unik-marketing`, Read, Grep |

## 2. KB stale reminder

| Campo | Valor sugerido |
|-------|----------------|
| **Nome** | 4unik — NotebookLM sync reminder |
| **Trigger** | Cron — dia 1 de cada mês |
| **Instruções** | `get_knowledge_freshness`. Se `freshness` é `missing_sync` ou `stale`, lembrar passos em `docs/agent-knowledge-notebooklm.md` e link do notebook. Caso contrário, confirmar OK em uma linha. |
| **Tools** | MCP `4unik-marketing` |

## 3. Pre-PR content check (manual ou PR trigger)

| Campo | Valor sugerido |
|-------|----------------|
| **Nome** | 4unik — pre-PR positioning check |
| **Trigger** | Manual ou PR que altere `src/messages/**` ou `src/app/(pt)/**` |
| **Instruções** | `get_content_sync_registry` + `search_product_knowledge` com termos das headlines/FAQs alteradas. Reportar contradições vs `docs/knowledge-base/` e `4unik-ai-discovery`. |
| **Tools** | MCP `4unik-marketing`, Read |

## Notas

- Automations **não** disparam deploy GitHub Pages; ver [`sanity-github-webhook.md`](sanity-github-webhook.md).
- Para criar automations pela UI, use a skill Cursor `automate` no Agents Window.
- Dados GA/SEO no MCP podem ser simulados até credenciais reais.
