---
title: "Playbook: página trend→bridge para o blog 4unik"
type: playbook
date: 2026-07-24
projects: [landing]
derives_from: "insights/2026-07-24-organic-trend-interweave-presell.md"
tags: [seo, blog, template, aeo]
---

# Playbook — post trend→bridge no blog da 4unik

Um template, N posts. Cada pauta do calendário preenche os slots e segue o outline
abaixo. O post é gerado por `npm run generate:blog-posts -- --topic "<título da pauta>"
--category "<categoria>"` (sem `--publish`) e revisado no Sanity Studio antes de publicar.

## Slots

| Slot | Opções |
|---|---|
| Entidade | Ocasião (onboarding, fim de ano, Dia do Cliente), cargo/persona (dev, vendas, diretoria), empresa-referência (Google, Nubank), orçamento (R$50/100/200) |
| Atributo | Custo por colaborador, conteúdo do kit, prazo de entrega, taxa de resgate, época do ano |
| Oferta | CTAs automáticos por categoria (`aiBlogCtaInject`) → páginas de plataforma + demo |

## Outline obrigatório

1. **Hook** (H1 + primeiro parágrafo): a curiosidade em uma frase, com **resposta direta
   e número concreto** logo no início — é o que vira featured snippet e citação em LLM.
   Ex.: "Empresas brasileiras gastam em média R$X a R$Y por colaborador em kits…"
2. **Contexto com dados** (H2): tabela ou lista com os números (faixas de preço,
   percentuais, comparativos). Citar fontes quando houver.
3. **Ponte para a dor** (H2): por que isso importa para RH/marketing — o problema real
   (kit genérico encalhado, logística manual, prazo estourado, zero mensuração).
4. **Como a 4unik resolve** (H2 no padrão "Como a 4unik ajuda…" exigido pelo checklist
   de `docs/cms.md`): colaborador escolhe a recompensa, plataforma cuida de logística
   e mensuração.
5. **CTA**: injetado automaticamente (3 blocos `blogCta` por categoria). Não escrever
   CTA manual duplicado.
6. **FAQ** (H2 + 3–5 perguntas): perguntas reais de busca ("quanto custa…", "qual o
   prazo…", "vale a pena…"), cada resposta com 2–4 frases e um dado concreto.
7. **Links internos**: além dos CTAs, 1–2 links contextuais para outros posts do
   cluster (quando existirem) — cria o mesh interno do cluster.

## Regras de qualidade (gate de publicação)

- Excerpt ≤ 220 caracteres, com o número principal dentro.
- Sem claim de ROI garantido (regra do repo — `docs/content-approval-queue.md`).
- Dados inventados = reprovado na revisão. Se não há fonte, usar faixas conservadoras
  e sinalizar como estimativa.
- Paridade PT/EN: gerar EN do mesmo tópico só depois que o PT for aprovado.
- Categoria deve existir em `TOPIC_SEEDS` (`scripts/generate-blog-posts.ts`) para a
  capa e os CTAs certos: `Engajamento`, `Gamificação de Times`, `4unik na Prática`,
  `Eventos & Brindes`, …

## Ciclo por pauta

```
calendario-editorial.md → generate:blog-posts (rascunho) → validate:blog-ctas
  → revisão humana no Studio (checklist docs/cms.md) → publicar
  → webhook rebuild (sitemap + llms.txt atualizam sozinhos)
  → medir em 2–4 semanas (GA4/GSC) → atualizar status no calendário
```
