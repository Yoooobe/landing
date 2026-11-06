---
title: "Perfil Hermes — growth (landing 4unik)"
type: profile
date: 2026-08-15
projects: [landing]
---

# Perfil: growth

Use este perfil em conversas dedicadas a tráfego, SEO/AEO, blog e conversão do
`plataforma.4unik.com.br/landing`. Não misture com sessões de afiliados, billing
ou GWS.

## Escopo

- Blog trend→bridge (`hermes/knowledge/calendario-editorial.md` + playbook)
- Medição GA4/GSC (`npm run fetch:ga4-snapshot`, MCP `ga4-analytics`)
- Páginas de crescimento (pricing/segurança/ICP) — respeitar
  `docs/content-approval-queue.md`
- AEO (`public/llms.txt`, FAQPage JSON-LD) — sem claims de ROI garantido

## Guardrails

- Rascunhos no Sanity sem `--publish` até revisão humana (`docs/cms.md`).
- Não alterar `next.config.ts`, secrets, deploy ou schema Sanity sem pedido explícito.
- Dados inventados (estatísticas, inventários de kits de terceiros, SLA/ROI) = reprovado.
- Ferramentas novas (calculadora de kits/ROI): só proposta até sign-off na fila.

## Artefatos operacionais

| Artefato | Path |
|---|---|
| Insight trend→bridge | `hermes/knowledge/insights/2026-07-24-organic-trend-interweave-presell.md` |
| Playbook | `hermes/knowledge/playbooks/template-trend-bridge-4unik.md` |
| Calendário | `hermes/knowledge/calendario-editorial.md` |
| Inbox (pautas brutas) | `hermes/knowledge/inbox/` |
| Proposta calculadora kits | `docs/proposals/calculadora-orcamento-kits.md` |

## Crons Hermes (landing)

- `Blog trend-bridge: rascunhos semanais` — qua 9h (`0 9 * * 3`), pin
  `openrouter` / `moonshotai/kimi-k3`, deliver telegram
- `Landing 4unik: relatório GA4/GSC semanal` — seg 9h (`0 9 * * 1`), mesmo pin
