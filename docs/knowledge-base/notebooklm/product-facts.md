# Factos de produto

**Fontes:** NotebookLM (comercial) + repositório (API, roadmap, rotas). Validar preços e SLAs antes da landing pública.

## Oferta all-in-one (notebook)

API · Motor de Gamificação · Loja VIP (+5.000 itens) · Logística Nacional (rastreável)

## Reward Marketplace API (Yoobe — repo)

- Catálogo, kits, onboarding kits, eletrónica, merchandise; resgate com pontos ou budget.
- **Endpoints de exemplo:** `GET /catalog`, `GET /catalog?country=BR`, `POST /redeem`, `POST /orders`, `GET /order-status`.
- **Fluxo:** pontos → loja → recompensa → API Yoobe → fulfillment.
- **Time-to-integrate (skill):** menos de uma semana (validar em produto).

## Fluxo de integração embedded (ICP 1 — plataformas / B2B SaaS)

A 4unik atua como camada de execução dentro do app do parceiro:

1. **Onboarding rápido** + compra de inventário do catálogo 4unik.
2. **API RESTful** com **SDK Node.js e Python** + **sandbox** de testes.
3. **Product / Inventory API** exibem itens disponíveis no app do parceiro.
4. **Checkout API** dá resgate transparente — o usuário nunca sai do app do parceiro.
5. **4unik faz o fulfillment** e devolve **tracking em tempo real via webhooks** ao sistema do parceiro.

> Confirmar nomes exatos de endpoints/SDK com o time de produto antes de publicar como documentação oficial na landing.

## Integrações

- **Workvivo** (repo) — parceiro destacado; Feed Orchestrator na fase 3 do roadmap Inteligência.

## Inteligência

| Fonte | Detalhe |
|-------|---------|
| Notebook | **Engagement Autopilot** — preditiva, campanhas, previsão, automação, retenção |
| Repo Fase 1 | AI Campaign Builder, AI Kit Builder, Reward Recommendation Engine |
| Repo Fase 2 | Smart Segmentation, Engagement Score, Best Next Action, Dynamic Storefront |
| Repo Fase 3 | Mission Generator, AI Budget Copilot, Workvivo Feed Orchestrator |
| Stack (skill) | Vertex AI, Agent Builder, Search for Commerce, AlloyDB/pgvector, Cloud Run, Pub/Sub, BigQuery |

## Planos e preços (notebook)

| Plano | Preço | Notas |
|-------|-------|-------|
| Starter | R$ 990–999/mês | ≤100 users; dashboard básico; catálogo completo |
| Pro/Business | R$ 2.490–2.999/mês | ≤500 users; gamificação + API; claim 80% menos erros manuais |
| Scale | R$ 7.999/mês | GraphQL; analytics |
| Enterprise | R$ 24.999/mês (~R$ 0,67/user) | SLA 99,95%; SSO/SAML; CSM/TAM |

## Tração (notebook — aprovação marketing)

R$ 1,34M (2025), 15 enterprise, 1M+ recompensas, 500+ empresas; O Boticário, Softplan.

**Caso por ICP (requer aprovação de marca + dado):** O Boticário — **+308% na conclusão de cursos** com recompensa tangível ao concluir (ICP Educação/e-learning).

## Setup vs. build interno (notebook)

15 dias vs. ~6 meses; economia R$ 80 mil–R$ 150 mil (validar).

## Rotas implementadas (PT, repo)

| Rota | Notas |
|------|-------|
| `/` | Home |
| `/plataforma/` | + motor, painel, carteiras, loja, campanhas, logística integrada |
| `/api-integracoes/`, `/workvivo/` | API e integrações |
| `/gamificacao/`, `/inteligencia/`, `/casos-de-uso/`, `/blog/` | Ofertas e conteúdo |

**Futuro:** `/seguranca/`, `/recursos/sla/`, calculadora ROI, pilar gamificação para RH.

Pricing na UI: alinhar `PricingSection` / Sanity aos 4 planos após aprovação comercial.

## Notas do NotebookLM

_(Sources PDF — colar resumos no próximo sync.)_
