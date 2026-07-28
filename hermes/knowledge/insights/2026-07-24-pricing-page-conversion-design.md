---
title: "Redesign da página de Planos: sistema visual claro + CTA de orçamento"
type: insight
date: 2026-07-24
projects: [landing]
source: "Google AI Studio — protótipo '4UNIK — Plataforma de Reconhecimento e Engajamento Corporativo' (referência só de estilo, não de conteúdo)"
tags: [design, pricing, conversao, cta]
---

# Insight: sistema visual claro para páginas de vendas/conversão

## O que mudou

`/pricing/` e `/en/pricing/` (componente `PricingLandingPage.tsx`) e o teaser
de planos da Home (`PricingSection.tsx`, bloco Sanity `homePricingSection`)
deixaram de ser 100% escuros e passaram a usar um sistema claro ("sky"),
inspirado num protótipo do Google AI Studio usado só como referência de
estilo — **nenhum preço, plano ou bullet de custo do protótipo foi copiado**.

## Tokens novos (`src/app/globals.css`)

| Token | Hex | Uso |
|---|---|---|
| `--color-sky-mist` | `#F3F9FD` | fundo das seções claras |
| `--color-sky-border` | `#E1EFF8` | bordas/dividers no tema claro |
| `--color-ink-deep` | `#16283A` | títulos sobre fundo claro |
| `--color-ink-muted` | `#5A6B7B` | texto secundário sobre fundo claro |
| `--color-accent-sky` | `#3E8FD8` | accent secundário (badges, ícones, preço) |
| `--color-accent-sky-hover` / `--color-accent-sky-border-hover` | `#327BBF` / `#8FC6EC` | estados hover |
| `--color-check-mint` / `--color-check-mint-bg` | `#4FB58F` / `#C7E4D8` | ícone de check nas listas de features |

Botões primários continuam `brand-orange` (identidade real 4unik) — o
`accent-sky` é só para detalhe, nunca substitui o CTA laranja.

## Regra de estrutura (mantida em todas as páginas de vendas claras)

1. Hero compacto **escuro** (`bg-brand-navy-dark`) — necessário porque o
   `Header` é fixo/transparente até o scroll e assume contraste com fundo
   escuro no topo.
2. A partir da seção de planos/oferta para baixo: claro (`sky-mist`/`white`).
3. Preços, planos e claims continuam vindo só de
   `src/messages/segments/pt-rest.ts` (`m.pricing`) e `pt-pricing-page.ts` —
   qualquer texto novo passa antes por `docs/content-approval-queue.md`.

## ⚠️ Atualização 2026-07-24 (mesmo dia, decisão revertida pelo fundador)

A regra abaixo ("sem custos operacionais nem detalhamento de API") **foi
revertida ainda no mesmo dia**, por decisão direta do fundador, depois que
ele enviou o export completo do protótipo (zip com `src/data/content.ts`) e
pediu para usar o conteúdo real como está. A página dedicada `/pricing/`
agora publica:

- Estrutura de planos **Essentials / Scale / Enterprise** (não mais
  Starter/Pro/Enterprise — essa estrutura antiga continua só na Home, ver
  `docs/content-approval-queue.md` para o detalhe da divergência)
- Toggle mensal/anual com preços reais dos dois ciclos
- Cobrança de API por usuário ativo: **R$ 4,90/usuário/mês** (bullet do
  plano Enterprise + seção dedicada de custos + FAQ)
- Seção "Custos operacionais e logísticos variáveis" (setup R$4.900,
  fulfillment R$4,50+frete, armazenagem R$0,65/un/mês, colaborador extra
  R$1,90/un/mês)

Isso está registrado em `docs/content-approval-queue.md` como decisão fora
do fluxo formal de sign-off Comercial/Financeiro/Jurídico/Marca — **não
reverter silenciosamente** achando que é resíduo do protótipo; foi
intencional. Se precisar mudar de novo, confirmar com o fundador antes.

### Regra de conteúdo original (histórico, não vale mais para `/pricing`)

~~O protótipo de referência tinha uma seção de "custos operacionais e
logísticos variáveis" ... isso não entra em nenhuma página pública da
4unik~~ — superada pela atualização acima. Continua valendo só como
princípio geral para *outras* páginas que não tenham decisão explícita do
fundador em contrário.

## ⚠️ Atualização 2026-07-24 (2ª reversão, mesmo dia): preço de API retirado

Depois de publicar o R$ 4,90/usuário/mês (atualização acima), o fundador
pediu para **ocultar esse valor de toda a página** — a cobrança de API deve
ser combinada diretamente com o time comercial, não exibida publicamente.
Removido de:

- Bullet do plano Enterprise (`"Uso de API 4unik: R$ 4,90/usuário/mês"` →
  `"Uso de API 4unik: cobrança sob consulta"`)
- Item de `variableCosts` ("Uso de API / Gamificação": valor virou
  `"Sob consulta"`)
- As 2 perguntas do FAQ que citavam o valor diretamente (uma foi reescrita
  sem o número, a outra — que só existia para reforçar o mesmo número — foi
  removida) e as outras 2 perguntas que mencionavam o valor de passagem

Também nesse momento a `PricingApiSection` (cards de arquitetura + code
window + FAQ técnico) foi **removida da página de planos** e o conteúdo
(code window, FAQ de webhooks/SDK/sandbox/rate-limit) foi movido para
`/api-integracoes` (`ApiCodeAndFaqSection.tsx`, `apiIntegracoes.ts` ganhou
campo `faq`) — a referência antiga a `m.pricingPage.api.faq` neste insight
não existe mais.

Além disso, o card de cada plano trocou a screenshot real do produto (dark
letterbox) por um painel decorativo mais leve — ícone do plano animado +
2 badges glass flutuantes — porque a imagem escura destoava do fundo claro
da página.

**Regra daqui pra frente:** nenhum valor de cobrança de API aparece em
`/pricing`. Se precisar mudar de novo, confirmar com o fundador antes —
esse tema já mudou de direção duas vezes no mesmo dia.

## CTA de blog → pricing (fundo de funil)

Posts de blog gerados sobre **orçamento/custo** (ex.: "Kits corporativos até
R$X por colaborador") agora podem apontar direto para `/pricing` em vez de
`/plataforma`, via:

```
npm run generate:blog-posts -- --topic "..." --category "Eventos & Brindes" --money-page pricing
```

Implementado em `src/lib/blogLandingLinks.ts` (`PRICING_CTA_COPY` +
parâmetro aditivo `moneyPageOverride` em `buildBlogCtaBodyLines` /
`sanityBlogCtaBlocksForCategory`) e `scripts/generate-blog-posts.ts` (flag
`--money-page`). Não quebra o comportamento default — sem a flag, o CTA
"platform" continua indo para `/plataforma` como antes.

Pautas marcadas para usar essa flag: `calendario-editorial.md`, Cluster 3
(itens 7, 8 e 9).

## Sanity: planos e custos agora são editáveis pelo Studio

Ao contrário do que este insight dizia antes, `/pricing` **não é mais
puramente code-first** para planos/custos: dois blocos nativos novos foram
criados — `pricingPlansBlock` e `variableCostsBlock`
(`src/sanity/schemaTypes/blocks/`) — registrados em `marketingPageType`.
`src/sanity/lib/pricingPlans.ts` (`getResolvedPricingPlansContent`) procura
um documento `marketingPage` com slug `pricing` no Sanity; se existir e
tiver esses blocos, usa os valores de lá; senão cai no fallback local
(`pt-pricing-page.ts`/`en-pricing-page.ts`, `plans`/`variableCosts`) — mesmo
padrão do `getMarketingPageFaqItems`. Hoje não existe documento `pricing`
no Sanity ainda, então está tudo no fallback; marketing pode criar esse
documento no Studio quando quiser editar sem deploy.

O FAQ técnico de API mudou de página (ver reversão acima, agora vive em
`apiIntegracoes.ts`/`ApiCodeAndFaqSection.tsx`, `/api-integracoes`); o resto
de `/pricing` (hero, FAQ geral, CTA final) continua code-first, sem bloco
Sanity dedicado.

## Componentes

- Insight relacionado: `insights/2026-07-24-organic-trend-interweave-presell.md`
  (estratégia trend→bridge blog → money page)
- `src/components/PricingPlansGlassGrid.tsx`, `PricingVariableCostsSection.tsx`,
  `PricingLandingPage.tsx`, `PricingSection.tsx` (Home, `PricingPlansGrid.tsx`
  antigo — inalterado)
- `src/sanity/lib/pricingPlans.ts`, `src/sanity/schemaTypes/blocks/pricingPlansBlock.ts`,
  `variableCostsBlock.ts`
- `src/lib/blogLandingLinks.ts`, `scripts/generate-blog-posts.ts`
