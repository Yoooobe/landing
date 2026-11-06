# Hermes Registry — Projeto Landing (Yoobe / 4unik)

**Status no Hermes**: `organizado`  
**Projeto Hermes**: `landing-4unik` (`hermes project use landing-4unik`)  
**Perfil**: [`profiles/growth.md`](profiles/growth.md)  
**Caminho Local**: `/Users/genautech/landing`  
**Stack**: Next.js 16 (Static Export), React 19, Tailwind CSS v4, Sanity CMS, Framer Motion  
**URL Canônica**: `https://plataforma.4unik.com.br/landing/`

---

## Diretórios de conhecimento (neste repo)

| Pasta | Uso |
|---|---|
| `hermes/knowledge/inbox/` | Pautas brutas e feedbacks (antes do calendário) |
| `hermes/knowledge/insights/` | Insights destilados (trend→bridge, SEO/AEO, CRO, pricing) |
| `hermes/knowledge/playbooks/` | Templates editoriais operacionais |
| `hermes/knowledge/calendario-editorial.md` | 12 pautas trend→bridge + status |
| `hermes/profiles/growth.md` | Guardrails da sessão growth |

Convenção: **Obsidian / Vaults = estudo e execuções**; **`hermes/knowledge` no repo = destilado operacional versionado**.

---

## Obsidian / Vaults sync

* **Cofre de execuções**: `~/Vaults/notes/Conhecimento/Execucoes/landing/`
* **Nota de projeto (estudo)**: `My Drive/Obsidian/notes/Projetos/Growth Landing 4unik — trend-bridge.md`
* **Script**: `scripts/obsidian-sync-landing.mjs` (quando usado pelo AgentClaw/Hermes)

---

## Motor de geração de blog

* CLI: `npm run generate:blog-posts` → `scripts/generate-blog-posts.ts`
* Providers: `openai` | `gemini` | `kimi` (preferir `kimi` nos crons)
* Flag útil: `--money-page pricing` (cluster orçamento → CTA `/pricing`)
* **Sem `--publish`** até revisão humana (`docs/cms.md`)

---

## Crons Hermes (ativos)

| Job | Schedule | Pin | Entrega |
|---|---|---|---|
| Blog trend-bridge: rascunhos semanais | `0 9 * * 3` (qua) | `openrouter` / `moonshotai/kimi-k3` | telegram |
| Landing 4unik: relatório GA4/GSC semanal | `0 9 * * 1` (seg) | `openrouter` / `moonshotai/kimi-k3` | telegram |

Se falharem por drift de provider: `hermes cron edit <id> --provider openrouter --model moonshotai/kimi-k3` e `hermes cron resume <id>`.

---

## Guardrails de produto

* Fila de claims: `docs/content-approval-queue.md`
* Proposta calculadora de kits (não implementada): `docs/proposals/calculadora-orcamento-kits.md`
* `/calculadora-roi/` existe no app — **não tratar insights de SEO como aprovação financeira**; ROI garantido continua gated.
* Não alterar `next.config.ts`, env de deploy ou schema Sanity sem pedido explícito.
