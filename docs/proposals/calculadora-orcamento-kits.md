# Proposta — Calculadora de orçamento de kits (link magnet)

> Status: **proposta, sem implementação**. Entra na fila de `docs/content-approval-queue.md`.
> Origem: estratégia trend→bridge (`hermes/knowledge/insights/2026-07-24-organic-trend-interweave-presell.md`).

## O que é

Ferramenta interativa gratuita em `/recursos/calculadora-kits/` (+ `/en/`): o visitante informa
número de colaboradores, faixa de orçamento por pessoa (R$50/100/200+) e ocasião
(onboarding, fim de ano, evento), e recebe uma estimativa de composição de kit e custo
total, com CTA "monte este kit na plataforma" (demo/lead).

**Não é a calculadora ROI** que está bloqueada pelo Financeiro: esta ferramenta trabalha
apenas com **faixas de custo de mercado** (as mesmas publicadas nos posts do cluster
orçamento), sem nenhuma promessa de retorno, economia ou ROI — nem na UI nem em JSON-LD.

## Por que (justificativa SEO/growth)

- Ferramenta gratuita é o link magnet mais forte que existe: rankeia para keywords
  transacionais ("calculadora brindes corporativos", "orçamento kit onboarding"),
  atrai backlinks naturais (sites linkam ferramentas, não artigos) e é o que LLMs
  citam quando perguntam "como calcular orçamento de brindes".
- Fecha o loop do cluster de conteúdo: posts de orçamento/ocasião linkam a calculadora;
  a calculadora linka 2–3 posts e a plataforma. Busca curiosa → artigo → ferramenta →
  cadastro.
- O site hoje não tem nenhuma ferramenta — é o maior gap frente à estratégia trend→bridge.

## Escopo técnico (compatível com static export)

- Página estática + componente client-side (React, sem API route — cálculo 100% no
  browser, compatível com `output: "export"`).
- Bloco de conteúdo indexável abaixo da ferramenta (~500 palavras + FAQ com
  `FAQPage` JSON-LD via `buildFaqPageJsonLd` — sem claims de ROI).
- Gate de indexação igual às growth pages: `robots: noindex` até aprovação e
  `NEXT_PUBLIC_INDEX_GROWTH_PAGES` (ou flag própria), links internos desde o footer.
- Evento GA4 de uso da calculadora + CTA rastreado (padrão `src/lib/analyticsEvents.ts`).

## O que precisa de aprovação

| Área | O que aprovar |
| --- | --- |
| Financeiro | Faixas de custo exibidas (podem ser as faixas de mercado dos posts, sem preços 4unik) |
| Comercial | CTA e destino (demo vs cadastro direto) |
| Marca | Tom e visual da ferramenta |
| Jurídico | Disclaimer "estimativa de mercado, não proposta comercial" |

## Fora de escopo

- Qualquer cálculo ou menção de ROI/economia garantida.
- Preços dos planos 4unik dentro da ferramenta.
- Backend/API (incompatível com static export).
