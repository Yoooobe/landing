---
title: "Calendário editorial trend→bridge — blog 4unik"
type: calendar
date: 2026-07-24
projects: [landing]
playbook: "playbooks/template-trend-bridge-4unik.md"
tags: [seo, blog, pautas]
---

# Calendário editorial — clusters trend→bridge

Status: `pendente` → `rascunho` (gerado, aguardando revisão) → `publicado` → `medido`.
O cron semanal do Hermes pega as próximas 2 pautas `pendente` na ordem da tabela,
gera rascunhos e muda o status para `rascunho`.

## Cluster 1 — Curiosidade evergreen (prioridade: maior potencial de backlink/citação)

| # | Pauta (`--topic`) | Categoria (`--category`) | Status |
|---|---|---|---|
| 1 | Quanto as empresas gastam com brindes por colaborador no Brasil em 2026 | Eventos & Brindes | publicado (`/blog/brindes-corporativos-em-2026-quanto-investir-por-colaborador-no-brasil/`) — revisão 2026-07-24: removido R$180–450 inventado; faixas R$50/100/200 como planejamento; sem ROI/D+1 |
| 2 | O que empresas como Google e Nubank colocam no kit de boas-vindas dos colaboradores | Eventos & Brindes | publicado (`/blog/kit-de-boas-vindas-inspire-se-no-google-e-nubank-para-engajar-novatos/`) — revisão 2026-07-24: kits Google/Nubank como padrões ilustrativos, não inventário auditado |
| 3 | Onboarding remoto: o que mudou nos kits de boas-vindas desde 2020 | Engajamento | publicado (`/blog/onboarding-remoto-kits-de-boas-vindas-pos-2020-e-o-novo-engajamento/`) — revisão 2026-07-24: removidos ROI garantido e SLA D+1 |

## Cluster 2 — Ocasião

| # | Pauta | Categoria | Status |
|---|---|---|---|
| 4 | Kit de onboarding para novos colaboradores em 2026: o que incluir e quanto custa | Eventos & Brindes | pendente |
| 5 | Presente de fim de ano para equipe remota: guia prático com faixas de preço | Eventos & Brindes | pendente |
| 6 | Datas corporativas que valem campanha de reconhecimento (Dia do Cliente, aniversário de empresa) | Engajamento | pendente |

## Cluster 3 — Orçamento (intenção de compra alta)

Intenção de orçamento/custo = fundo de funil. Gerar estas 3 pautas com
`--money-page pricing` (troca o CTA "platform" para `/pricing` em vez de
`/plataforma` — ver `insights/2026-07-24-pricing-page-conversion-design.md`).

| # | Pauta | Categoria | Status |
|---|---|---|---|
| 7 | Kits corporativos até R$50 por colaborador: o que dá para montar | Eventos & Brindes | pendente — gerar com `--money-page pricing` |
| 8 | Kits corporativos até R$100 por colaborador: opções que os times realmente usam | Eventos & Brindes | pendente — gerar com `--money-page pricing` |
| 9 | Kits corporativos até R$200 por colaborador: quando vale investir mais | Eventos & Brindes | pendente — gerar com `--money-page pricing` |

## Cluster 4 — Persona

| # | Pauta | Categoria | Status |
|---|---|---|---|
| 10 | O que dar de presente corporativo para desenvolvedores (sem cair no clichê) | Gamificação de Times | pendente |
| 11 | Premiação para time de vendas: ideias que motivam além do dinheiro | Gamificação de Times | pendente |
| 12 | Presente corporativo para diretoria e C-level: o que é adequado | Eventos & Brindes | pendente |

## Regras de operação

- Gerar PT primeiro; EN do mesmo tópico só após aprovação do PT.
- Nunca usar `--publish` — rascunho + revisão humana (`docs/cms.md`).
- Após publicar, anotar a URL final na linha e mudar status.
- Revisão de performance (GA4/GSC) a cada segunda-feira alimenta reordenação
  das pautas pendentes.
