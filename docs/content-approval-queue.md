# Fila de aprovação — copy de crescimento

Páginas e claims que **não** podem ir para SEO público ou ads até sign-off. A KB NotebookLM (`docs/knowledge-base/notebooklm/`) guarda números de referência; a landing só publica o que estiver aprovado aqui.

Substitua `_a definir_` pelos nomes reais quando o sign-off formal for registado.

---

## Gate de indexação (pricing + segurança)

| Critério | Status | Data | Notas |
| --- | --- | --- | --- |
| Comercial | ✅ Aprovado (escopo restrito) | 2026-06-03 | Páginas `/pricing/` e `/seguranca/`; Scale/Enterprise só «sob consulta»; sem comparativos % |
| Financeiro | ✅ Aprovado (parcial) | 2026-06-03 | Starter R$ 990 e Pro R$ 2.490 — **já na home**; valores Scale (R$ 7.999) e Enterprise **não** na UI |
| Jurídico | ✅ Aprovado (escopo restrito) | 2026-06-03 | Segurança sem SLA %, sem ISO/SOC2; FAQ declara limites contratuais |
| Marca | ✅ Aprovado | 2026-06-03 | Sem logos de clientes nem caso Boticário nas novas páginas |
| **Indexação SEO** | ✅ Liberado | 2026-06-03 | Ativar `NEXT_PUBLIC_INDEX_GROWTH_PAGES=true` no build de produção |

**Responsáveis formais (preencher):**

| Área | Nome / e-mail | Assinatura registrada |
| --- | --- | --- |
| Comercial | _a definir_ | ☐ |
| Financeiro | _a definir_ | ☐ |
| Jurídico | _a definir_ | ☐ |
| Marca | _a definir_ | ☐ |

---

## Como publicar após aprovação

1. Confirmar o gate acima (quatro áreas + indexação).
2. Ajustar copy em `src/messages/segments/` se necessário.
3. Definir `NEXT_PUBLIC_INDEX_GROWTH_PAGES=true` no build (GitHub Actions secret ou `.env.local` para teste).
4. `npm run build` — sitemap passa a incluir `/pricing/` e `/seguranca/` automaticamente.
5. Atualizar `docs/landing-improvement-backlog.md` (mover para **Done**).

Enquanto `NEXT_PUBLIC_INDEX_GROWTH_PAGES` não estiver `true`, `/pricing/` e `/seguranca/` usam **`robots: noindex`** (revisão interna + links no footer).

---

## Pricing (`/pricing/`, `/en/pricing/`)

> **Atualização 2026-07-24 — decisão direta do fundador:** a página dedicada
> `/pricing/` foi reestruturada (Essentials/Scale/Enterprise, com toggle
> mensal/anual) e passou a publicar o valor de cobrança de API por usuário
> ativo (R$ 4,90/usuário/mês) e uma seção de custos operacionais/logísticos
> variáveis (setup, fulfillment, armazenagem, colaborador extra), conteúdo
> em `src/messages/segments/pt-pricing-page.ts` / `en-pricing-page.ts`
> (`plans`, `variableCosts`). Isso foi autorizado diretamente pelo
> fundador/dono do produto nesta sessão — **não passou pelo fluxo formal de
> sign-off Comercial/Financeiro/Jurídico/Marca abaixo**, que continua
> valendo para a home e para qualquer novo claim além do que já está
> publicado aqui. A tabela abaixo reflete o estado anterior (home,
> `m.pricing.starter/pro/enterprise`), que **não foi alterado** por esta
> mudança — a home e a página dedicada agora mostram planos com nomes e
> preços diferentes entre si.

| Campo | Valor na KB (referência) | Na landing hoje | Status |
| --- | --- | --- | --- |
| Starter | R$ 990–999/mês, ≤100 users | Igual à home (`m.pricing.starter`) — **não usado na página `/pricing` dedicada desde 2026-07-24** | ✅ Aprovado (home) |
| Pro / Business | R$ 2.490–2.999/mês | Igual à home (`m.pricing.pro`) — **não usado na página `/pricing` dedicada desde 2026-07-24** | ✅ Aprovado (home) |
| Scale | R$ 7.999/mês, GraphQL/analytics | Home: **sob consulta**. Página dedicada: **Essentials/Scale/Enterprise com preços próprios** (ver acima) | ⏸ Home ainda sem valor até Financeiro; página dedicada já publica valores por decisão do fundador |
| Enterprise | R$ 24.999/mês, SLA 99,95% | Home: **sob consulta** (sem % SLA). Página dedicada: sob consulta + bullet de API R$4,90/usuário/mês | ⏸ SLA % continua fora da UI em ambas |
| API por usuário ativo | — | **Retirado da UI no mesmo dia (2026-07-24).** O valor de API não é mais exibido em nenhum lugar da página (planos, custos variáveis, FAQ) — texto agora redireciona para "fale com nosso time comercial" | ⏸ **Não publicar valor de API** até nova decisão do fundador — retração 2026-07-24 |
| Custos operacionais variáveis | — | Setup R$4.900, fulfillment R$4,50+frete, armazenagem R$0,65/un/mês, colaborador extra R$1,90/un/mês continuam publicados na página dedicada (só a linha de API/Gamificação virou "Sob consulta") | ✅ Publicado 2026-07-24 (decisão do fundador, fora do fluxo formal) — exceto API, ver linha acima |
| Comparativo setup | R$ 80k–150k vs build interno | Não exposto | ❌ Pendente |
| Comparativo % vs Shopify/VTEX | Notebook competitors | Não exposto | ❌ Pendente |

---

## Segurança (`/seguranca/`, `/en/seguranca/`)

| Claim | Na landing (rascunho) | Status |
| --- | --- | --- |
| SLA 99,95% | Não citado | ❌ Pendente — só após contrato/SLA documentado |
| SSO/SAML, LGPD | Copy genérica «controles e boas práticas» | ✅ Aprovado (escopo restrito) |
| Certificações (ISO, SOC2) | Não citadas | ✅ N/A (não prometido) |

---

## Prova social e tração (não ligado ao gate atual)

| Claim | Fonte KB | Status |
| --- | --- | --- |
| R$ 1,34M receita 2025 | briefing | ❌ Pendente — Marketing + Financeiro |
| 15 enterprise, 1M+ recompensas, 500+ empresas | briefing | ❌ Pendente |
| Logos O Boticário, Softplan | briefing | ✅ Boticário publicado (2026-06-10) em `/educacao/`, trust bar, blog slug `"8"` — decisão editorial; Softplan ❌ Pendente — Marca |
| Boticário +308% conclusão cursos | icp-messaging-guide | ✅ Publicado (2026-06-10) em `/educacao/` e blog slug `"8"` — alinhado a case aprovado editorialmente |
| Comparativos «70% menos que VTEX» | competitors.md | ❌ Pendente — Comercial + Jurídico |

**Aprovadores:** Marketing + Jurídico + Marca (logos).

---

## Próximo backlog (sem implementação ainda)

| Item | Rotas candidatas | Bloqueio |
| --- | --- | --- |
| ICP RH | `/rh/`, `/en/rh/` | Copy + aprovação; matriz em `icp-messaging-guide.md` |
| ICP Marketing | `/marketing/`, `/en/marketing/` | Idem |
| Calculadora ROI | `/recursos/roi/` (proposta) | Fórmula e métricas — Financeiro; sem ROI garantido em JSON-LD |
| Calculadora de orçamento de kits | `/recursos/calculadora-kits/` (proposta) | Faixas de custo — Financeiro; CTA — Comercial; escopo em `docs/proposals/calculadora-orcamento-kits.md` (sem ROI, só faixas de mercado) |

---

## ROI (futuro)

Calculadora interativa e JSON-LD com ROI garantido: **não implementar** até métricas e fórmula aprovadas por Financeiro.

---

## Histórico

| Data | Nota |
| --- | --- |
| 2026-06-03 | Criada fila; páginas pricing/segurança em rascunho `noindex` |
| 2026-06-03 | Gate de indexação liberado (escopo restrito); footer + sitemap condicional; RH/Marketing/ROI só backlog |
| 2026-06-10 | Case Boticário (+308%, logo, métricas) publicado em `/educacao/` e blog slug `"8"` — alinhamento editorial (fora do gate pricing/segurança) |
