# Revisão: agentes Paperclip/Cursor, SEO e evolução de visitas

**Data da revisão:** 2026-06-17  
**Propriedade GA4:** `327916606` (conta `66932658`)  
**Stream landing:** `Plataforma Landing` — `G-SMJDYCENBC` (stream ID `15052677461`)  
**Host canónico:** `https://plataforma.4unik.com.br/landing/`

---

## 1. Resumo executivo

| Dimensão | Veredito |
|----------|----------|
| **Agentes (Paperclip + Cursor)** | Entrega forte em conteúdo, SEO técnico e instrumentação (jun 2–12). KB, 10 skills, MCP e backlog com 13 itens Done. |
| **SEO técnico** | **OK** — build, sitemap (56 URLs), canonical, growth pages indexáveis, smoke produção nas rotas chave. 3 avisos de proxy 301 em paths sem `/landing`. |
| **Analytics** | **Infra OK** — tag `G-SMJDYCENBC` em produção, 63 páginas marketing com GA, `generate_lead` implementado. |
| **Evolução de visitas** | **Inconclusivo** — stream da landing criado em 10/jun; sem API GA4 configurada neste ambiente; números reais exigem login no Admin (ver §4). |

**Conclusão:** os agentes melhoraram de forma mensurável a **capacidade** da landing (conteúdo, indexação, tracking). Não há evidência estatística de **crescimento orgânico de audiência** atribuível ao Paperclip nos primeiros dias pós-deploy — janela curta e lag natural de SEO.

---

## 2. Scorecard — ecossistema de agentes

### Arquitetura

| Camada | Estado | Referência |
|--------|--------|------------|
| Paperclip | Externo; governança via KB no repo após push `main` | [`integrations.md`](../knowledge-base/integrations.md) § Agentes Paperclip |
| Cursor background lanes | 5 lanes (audit → ideation → implementation → verification → visual-check) | [`landing-background-agents.md`](../landing-background-agents.md) |
| Skills versionadas | **10** skills em [`skills/`](../../skills/) | content-creator, growth-hacker, page-ideator, 4unik-ai-discovery, etc. |
| MCP `4unik-marketing` | Ativo; KB + growth tools; **GA/SEO simulados** | [`mcps/4unik-marketing/`](../../mcps/4unik-marketing/) |
| Cursor Automations | Documentadas; **ativação não confirmada** | [`cursor-automations-growth.md`](../cursor-automations-growth.md) |

### Entregas no código (jun 2026)

| Data | Entrega | Commits / KB |
|------|---------|--------------|
| 02/jun | KB NotebookLM + `icp-messaging-guide` + copy 5 ICPs | changelog KB |
| 03/jun | 5 páginas verticais PT+EN no header/sitemap | `0b2d7a26`, changelog 03/jun |
| 08–09/jun | Leads (Postmark, ingest API), logos clientes | `8e3bdc66`, `f9981304` |
| 10/jun | GA4 produção, EEAT blog, UNI SEO fixes, case Boticário | `73cc2442`, `920d0444`, PR #4 |
| 11/jun | Screenshots reais, copy diet PT/EN | `257721f9`, `456a38ea` |
| 12/jun | Home redesign (8 secções, 1 CTA), motor vs campanhas | `bb7fb26c`, `afc09b49` |

### Backlog ([`landing-improvement-backlog.md`](../landing-improvement-backlog.md))

- **Done:** 13 itens (SEO OG blog, sitemap gamificação, ICPs, pricing/seguranca gate, Boticário, performance, i18n, CMS guardrails).
- **Next Up:** pricing Scale/Enterprise, ICP RH/Marketing, ROI calculator, prova social na home.

### Gaps operacionais

| Gap | Impacto | Notas |
|-----|---------|-------|
| Sanity `marketingPage.home` | Studio/fallback desalinhado (~25 blocos antigos via `buildHomeMarketingPageContent`) | Site público usa `HomePage.tsx` nativo — **sem impacto no visitante** |
| GitHub Actions | CI + Deploy workflow **falham** (~3–9s, billing) | `gh-pages` nativo OK (deploy 12/jun success); deploy manual via `npm run deploy:production` |
| MCP GA4 | Métricas simuladas (`mockGa4Payload`) | `GA_PROPERTY_ID=327916606` sem service account GCP |
| Proxy 301 | URLs sem `/landing` → 404 no host raiz | Ver [`proxy-redirects-4unik.md`](../proxy-redirects-4unik.md) |

---

## 3. Scorecard — SEO técnico

### Scripts (build com `NEXT_PUBLIC_SITE_URL` + `NEXT_PUBLIC_INDEX_GROWTH_PAGES=true`)

| Check | Resultado | Data |
|-------|-----------|------|
| `npm run build` | OK (71 rotas estáticas) | 2026-06-17 |
| `validate:landing-routes` | OK (20 route pairs) | 2026-06-17 |
| `validate:blog-ctas` | OK (8 landing paths) | 2026-06-17 |
| `verify:canonical-urls-build` | OK — sem localhost | 2026-06-17 |
| `verify:ga-build` + `verify:ga-pages` | OK com `G-SMJDYCENBC` — 63 páginas marketing | 2026-06-17 |
| `verify:growth-index-build` | OK — pricing/seguranca indexáveis | 2026-06-17 |
| `check:gsc-indexing` | **19/19 passed** | 2026-06-17 |

### Smoke produção (`validate:landing-routes --smoke`)

| URL | HTTP | Notas |
|-----|------|-------|
| `/landing/` | 200 | GA tag + JSON-LD + 1 campo email (formulário único) |
| `/landing/plataforma/motor-gamificacao/` | 200 | Título distinto; sem showcase campanhas |
| `/landing/plataforma/campanhas-gamificacao/` | 200 | Título “Campanhas de Gamificação” |
| `/landing/para-plataformas/`, `/educacao/` | 200 | ICPs no ar |
| `/landing/robots.txt`, `/llms.txt`, `/sitemap.xml` | 200 | 56 URLs no sitemap |
| `/landing` (sem barra) | 404 + gtag | nginx 301 recomendado |
| `og:image` home | OK | `…/og/4unik-home.png` (não localhost) |

### Avisos GSC / proxy (não bloqueantes)

Paths no host raiz sem prefixo `/landing` devolvem 404:

- `https://plataforma.4unik.com.br/plataforma/motor-gamificacao/`
- `https://plataforma.4unik.com.br/pricing/`
- `https://plataforma.4unik.com.br/para-plataformas/`

Configurar 301 conforme [`infra/plataforma-4unik-nginx-redirects.conf`](../../infra/plataforma-4unik-nginx-redirects.conf).

---

## 4. Evolução de visitas (GA4)

### Limitações desta revisão

1. Stream `Plataforma Landing` criado em **10/jun/2026** — sem baseline pré-agentes no mesmo stream.
2. **GA Data API:** tentativa com `gcloud` retornou `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT`; service account não configurada ([`GCP_SERVICE_ACCOUNT_SETUP.md`](../../GCP_SERVICE_ACCOUNT_SETUP.md)).
3. **Browser GA4:** requer re-autenticação Google (não automatizável nesta sessão).
4. **MCP `get_ga4_metrics`:** devolve dados **simulados** (1450 users, 1820 sessions) — **não usar para decisões**.

### Tabela para preenchimento manual no Admin

_Último snapshot: 2026-06-17._

| Período | Janela | Utilizadores ativos | Sessões | Novos utilizadores | `generate_lead` | Taxa lead/sessão | Notas |
|---------|--------|---------------------|---------|-------------------|-----------------|------------------|-------|
| **A — Baseline** | 2026-06-10 – 2026-06-11 | 13 | 20 | 13 | 0 | 0.00% | Pós-fix tag GA4 |
| **B — Pós-conteúdo** | 2026-06-12 – 2026-06-17 | 11 | 21 | 7 | 0 | 0.00% | Home redesign + motor/campanhas |
| **C — Pré-stream** | 2026-06-03 – 2026-06-09 | 0 | 0 | 0 | 0 | — | hostName = plataforma.4unik.com.br |

**Métricas derivadas a calcular:**

- Taxa `generate_lead` / sessão (B vs A)
- Top 10 páginas: `/landing/`, ICPs, motor/campanhas, blog `"8"`
- Origem/meio: organic vs direct vs referral

### Interpretação esperada

| Hipótese | Expectativa |
|----------|-------------|
| Pico de pageviews em 10/jun | Provável **efeito de instrumentação** (tag passou a contar), não crescimento de audiência |
| Impacto SEO do redesign (12/jun) | Visível em **2–4 semanas** em impressões GSC / organic GA4 |
| ICPs + blog Boticário | Tráfego incremental mensurável após indexação completa |

### Evidência de infra (não de tráfego)

Auditoria 10/jun em [`integrations.md`](../knowledge-base/integrations.md): Realtime confirmado, hit `g/collect` com `tid=G-SMJDYCENBC`, 63 páginas com GA no export.

---

## 5. Veredito

### (a) Melhoria de infra — **confirmada**

- Conteúdo: home narrativa nova, gamificação diferenciada, 5 ICPs, case Boticário, dedupe de stats.
- SEO: sitemap, canonical, hreflang, OG ICP, `llms.txt`, EEAT blog, growth pages com gate.
- Analytics: GA4 end-to-end em produção + evento de lead.
- Agentes: KB estruturada, skills, backlog disciplinado, documentação para Paperclip.

### (b) Crescimento de tráfego comprovado — **não confirmado nesta revisão**

- Janela de dados do stream landing ≈ **7 dias** (10–17/jun).
- Redesign de maior impacto SEO publicado em **12/jun** — demasiado recente para organic.
- Sem números reais extraídos do Admin nesta execução.

**Frase de síntese:** *Infra pronta para medir e escalar; reavaliar tráfego em 2–4 semanas com relatório GA4 preenchido (§4) e comparativo GSC impressões/cliques.*

---

## 6. Recomendações — próximos 30 dias

| Prioridade | Ação | Responsável sugerido |
|------------|------|----------------------|
| **P1** | Configurar service account GCP + GA Data API no MCP (substituir `mockGa4Payload`) | Dev + owner GA |
| **P1** | Marcar `generate_lead` como **key event** no GA4; criar exploração “Landing stream only” | Marketing |
| **P1** | Ativar automation **weekly growth audit** ([`cursor-automations-growth.md`](../cursor-automations-growth.md)) | Cursor admin |
| **P2** | Aplicar proxy 301 para paths sem `/landing` (motor-gamificacao, pricing, ICPs) | Infra |
| **P2** | Alinhar seed Sanity home (`buildHomeMarketingPageContent` → narrativa 8 secções) | Dev |
| **P2** | Resolver billing GitHub Actions OU manter ritual `deploy:production` pós-merge | Owner org Yoooobe |
| **P3** | Revisão GSC (impressões/cliques por página ICP) após 28 dias do deploy ICPs | Marketing |

---

## Anexo — comandos de verificação

```bash
export NEXT_PUBLIC_SITE_URL=https://plataforma.4unik.com.br/landing/
export NEXT_PUBLIC_GA_ID=G-SMJDYCENBC
export NEXT_PUBLIC_INDEX_GROWTH_PAGES=true
export NEXT_PUBLIC_SANITY_DATASET=production
export NEXT_PUBLIC_SANITY_PROJECT_ID=placeholder

npm run build
npm run validate:landing-routes
npm run validate:blog-ctas
npm run verify:canonical-urls-build
npm run verify:ga-build && npm run verify:ga-pages
npm run verify:growth-index-build
npm run check:gsc-indexing
npm run validate:landing-routes -- --smoke https://plataforma.4unik.com.br/landing
```
