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

| Campo | Valor na KB (referência) | Na landing hoje | Status |
| --- | --- | --- | --- |
| Starter | R$ 990–999/mês, ≤100 users | Igual à home (`m.pricing.starter`) | ✅ Aprovado (home + página dedicada) |
| Pro / Business | R$ 2.490–2.999/mês | Igual à home (`m.pricing.pro`) | ✅ Aprovado |
| Scale | R$ 7.999/mês, GraphQL/analytics | **Sob consulta** na página dedicada | ⏸ Não publicar valor até Financeiro |
| Enterprise | R$ 24.999/mês, SLA 99,95% | **Sob consulta** (sem % SLA na UI) | ⏸ Não publicar valor/SLA até Comercial + Jurídico |
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
