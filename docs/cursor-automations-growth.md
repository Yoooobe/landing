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

## 4. Monthly GA4 snapshot (tráfego landing)

| Campo | Valor sugerido |
|-------|----------------|
| **Nome** | 4unik — monthly GA4 landing snapshot |
| **Trigger** | Cron — dia **15** de cada mês (primeira reavaliação: **15/jul/2026**) |
| **Modo** | Pode escrever só em `docs/reviews/` |
| **Instruções** | Correr `npm run fetch:ga4-snapshot` (requer `GOOGLE_APPLICATION_CREDENTIALS` local). Comparar JSON em `docs/reviews/ga4-snapshots/` com o mês anterior. Se for julho/2026, seguir checklist em `docs/reviews/REAVALIACAO-2026-07.md` e produzir resumo em `docs/reviews/agent-seo-traffic-2026-07.md`. Chamar MCP `get_ga4_metrics` para período 12/jun–hoje como validação cruzada. |
| **Tools** | Shell (`npm run fetch:ga4-snapshot`), MCP `4unik-marketing`, Read, Write (só `docs/reviews/**`) |

## Notas

- Automations **não** disparam deploy GitHub Pages; ver [`sanity-github-webhook.md`](sanity-github-webhook.md).
- Para criar automations pela UI, use a skill Cursor `automate` no Agents Window.
- GA4 no MCP usa **GA Data API real** quando `GOOGLE_APPLICATION_CREDENTIALS` aponta para `landing-ga4-reader.json` e a SA tem Viewer na propriedade `327916606`; caso contrário `mock_fallback`.
