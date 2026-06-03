# Fila de aprovação — copy de crescimento

Páginas e claims que **não** podem ir para SEO público ou ads até sign-off. A KB NotebookLM (`docs/knowledge-base/notebooklm/`) guarda números de referência; a landing só publica o que estiver aprovado aqui.

## Como publicar após aprovação

1. Marcar o item abaixo como **Aprovado** (data + responsável).
2. Ajustar copy em `src/messages/segments/` se necessário.
3. Definir `NEXT_PUBLIC_INDEX_GROWTH_PAGES=true` no build de produção (ou remover `noindex` manualmente nas rotas).
4. Incluir rotas em `src/app/sitemap.ts` e `scripts/validate-landing-routes.mjs`.
5. Atualizar `docs/landing-improvement-backlog.md` (mover para **Done**).

Enquanto `NEXT_PUBLIC_INDEX_GROWTH_PAGES` não estiver `true`, `/pricing/` e `/seguranca/` respondem com **`robots: noindex`** (acessíveis para revisão interna).

---

## Pricing (`/pricing/`, `/en/pricing/`)

| Campo | Valor na KB (referência) | Na landing hoje | Status |
| --- | --- | --- | --- |
| Starter | R$ 990–999/mês, ≤100 users | Igual à home (`m.pricing.starter`) | **Parcial** — já na home; página dedicada em rascunho |
| Pro / Business | R$ 2.490–2.999/mês | Igual à home (`m.pricing.pro`) | **Parcial** |
| Scale | R$ 7.999/mês, GraphQL/analytics | **Sob consulta** na página dedicada | **Pendente** financeiro |
| Enterprise | R$ 24.999/mês, SLA 99,95% | **Sob consulta** (sem % SLA na UI) | **Pendente** |
| Comparativo setup | R$ 80k–150k vs build interno | Não exposto | **Pendente** |
| Comparativo % vs Shopify/VTEX | Notebook competitors | Não exposto | **Pendente** |

**Aprovadores:** Comercial + Financeiro (valores); Jurídico (termos implícitos nos bullets).

---

## Segurança (`/seguranca/`, `/en/seguranca/`)

| Claim | Na landing (rascunho) | Status |
| --- | --- | --- |
| SLA 99,95% | Não citado | **Pendente** — só após contrato/SLA documentado |
| SSO/SAML, LGPD | Copy genérica “controles e boas práticas” | **Pendente** jurídico |
| Certificações (ISO, SOC2) | Não citadas | **Pendente** |

**Aprovadores:** Jurídico + Infra/SecOps.

---

## Prova social e tração

| Claim | Fonte KB | Status |
| --- | --- | --- |
| R$ 1,34M receita 2025 | briefing | **Pendente** |
| 15 enterprise, 1M+ recompensas, 500+ empresas | briefing | **Pendente** |
| Logos O Boticário, Softplan | briefing | **Pendente** marca |
| Boticário +308% conclusão cursos | icp-messaging-guide | **Pendente** — não usar em hero/metadata |
| Comparativos “70% menos que VTEX” | competitors.md | **Pendente** |

**Aprovadores:** Marketing + Jurídico + Marca (logos).

---

## ROI (futuro)

Calculadora interativa e JSON-LD com ROI garantido: **não implementar** até métricas e fórmula aprovadas por Financeiro. Ver backlog **Next Up** e `STRATEGIC_PAGE_GAPS` no MCP.

---

## ICP transversal (futuro)

Rotas candidatas (sem `page.tsx` ainda): `/rh/`, `/marketing/` (PT+EN), copy a partir de `icp-messaging-guide.md` matriz RH/Marketing.

---

## Histórico

| Data | Nota |
| --- | --- |
| 2026-06-03 | Criada fila; páginas pricing/segurança em rascunho `noindex` |
