# Briefing (NotebookLM + repositório)

**Fontes:**
- Notebook `1251466e-39f5-4a02-966b-3631d0082d11` (comercial, planos, tração).
- Complemento `skills/4unik-ai-discovery` + landing repo (API Yoobe, roadmap Inteligência, rotas, SEO).

**Última curadoria:** fatiado em `positioning.md`, `icp-personas.md`, `competitors.md`, `product-facts.md`, `editorial-themes.md`.

---

## Contexto e Posicionamento

**Identidade:** A **4unik by Yoobe** é uma infraestrutura SaaS com IA para engajamento corporativo. Não somos apenas uma empresa de brindes, mas uma plataforma que programa comportamentos através de recompensas e gamificação.

**Problema:** RH, Vendas e Marketing perdem tempo com planilhas, logística fragmentada e falta de rastreamento no engajamento de pessoas.

**Solução:** Uma camada de execução all-in-one unindo API, Motor de Gamificação, Loja VIP (+5.000 itens) e Logística Nacional com envios rastreáveis.

---

## Visão de Inteligência Artificial

**Engagement Autopilot:** Uma camada de IA preditiva projetada para criar campanhas automaticamente, prever o engajamento, automatizar fluxos de trabalho e otimizar a retenção sem esforço manual.

---

## Casos de Uso

- **RH:** Onboarding (Welcome Kits) e programas de reconhecimento para reduzir turnover.
- **Vendas:** Metas atingidas, bônus e leaderboards baseados em performance.
- **Eventos/Comunidades:** Swags corporativos, programas de fidelidade e recompensas por engajamento digital.

## 5 ICPs refinados (eixo API-first / camada de execução)

A 4unik vende **comportamento programável** e atua como **camada de execução** (não "empresa de brindes"). Detalhe e personas em [`icp-personas.md`](icp-personas.md); mensagens em [`icp-messaging-guide.md`](icp-messaging-guide.md).

1. **Plataformas de gamificação / B2B SaaS (embedded):** plugam a API; usuário resgata dentro do app deles; 4unik cuida de estoque/frete/tracking.
2. **Infoprodutores / E-learning:** recompensa tangível ao concluir o curso. Caso Boticário **+308% conclusão** (flag aprovação).
3. **Diretores / VP de Vendas:** integração CRM → bate meta → pontos automáticos → gratificação instantânea.
4. **Criadores / Comunidades:** loja VIP de fãs (swag exclusivo), 100% do fulfillment pela 4unik.
5. **Produtores de eventos físicos/híbridos:** checkout pelo celular; retira no estande ou recebe em casa rastreado.

**Diferenciação âncora:** "recompensa física como uma chamada de API"; ~85% das plataformas focam só software e sofrem com logística física (número com flag aprovação).

---

## Planos e Preços

| Plano | Preço (notebook) | Capacidades citadas |
|-------|------------------|---------------------|
| **Starter** | R$ 990 a 999/mês | Até 100 usuários, dashboard básico e catálogo completo. Substitui desenvolvimentos internos caros. |
| **Pro/Business** | R$ 2.490 a 2.999/mês | Até 500 usuários, gamificação completa e API. Elimina 80% dos erros manuais, pagando-se pelo próprio ROI. |
| **Scale** | R$ 7.999/mês | Foco em performance, GraphQL e analytics para operações robustas. |
| **Enterprise** | R$ 24.999/mês (~R$ 0,67/usuário) | Infraestrutura dedicada, SLAs críticos (99,95%), SSO/SAML e suporte exclusivo (CSM/TAM). |

> **Nota de curadoria:** no export original, a linha Enterprise e os valores “R$ 80 mil e R$ 150 mil” (setup vs. desenvolvimento interno) vinham com artefactos de OCR; valores acima seguem o sentido do notebook. Validar com financeiro/comercial antes de publicar na landing.

---

## Diferenciais Competitivos (Matriz de Concorrência)

- **Shopify:** A 4unik oferece e-commerce, fulfillment e gamificação nativa, custando 50% menos para obter as mesmas funcionalidades.
- **VTEX:** Recursos enterprise similares por 70% menos custo e setup 3x mais rápido.
- **Desenvolvimento Interno:** O setup da 4unik leva apenas 15 dias, economizando entre R$ 80 mil e R$ 150 mil, além de 6 meses de construção de código.

---

## Tração e Validação

- Receita de **R$ 1,34M em 2025** com **15 clientes enterprise** ativos.
- Mais de **1 milhão de recompensas entregues** e **+500 empresas impactadas**, com validações de grandes contas como **O Boticário** e **Softplan**.

---

## Complemento repositório (marcas, API, Inteligência, rotas)

### Marcas e categoria

- **4unik** — plataforma pública de gamificação corporativa, engajamento, campanhas, loja de resgate e integrações ([`plataforma.4unik.com.br/landing`](https://plataforma.4unik.com.br/landing)).
- **Yoobe** — Reward Infrastructure API: catálogo físico, kits, fulfillment global, API de resgate; não posicionar só como empresa de brindes/swag.
- **Categoria:** infraestrutura de recompensas no cruzamento de Employee Rewards, Corporate Gamification e Employee Engagement Platforms.

### Problema (ecossistema B2B)

Plataformas de gamificação e RH lutam com fornecedores, logística global, inventário, fulfillment, manutenção de catálogo, envio e tributação internacional. Yoobe/4unik oferecem infraestrutura plug-and-play.

### Produto (factos do repo)

- **Reward Marketplace API:** catálogo, kits, onboarding kits, eletrónica, merchandise; resgate com pontos ou budget.
- **Endpoints de exemplo (Yoobe API):** `GET /catalog`, `GET /catalog?country=BR`, `POST /redeem`, `POST /orders`, `GET /order-status`.
- **Fluxo:** colaborador ganha pontos → loja → seleciona recompensa → API Yoobe → fulfillment.
- **Integração alvo:** menos de uma semana (mensagem developer no skill).
- **Parceiro destacado:** **Workvivo** — eventos/comunicação/reconhecimento → campanhas e recompensas.

### Inteligência (4unik — «Inteligência», não «AI» genérico)

Alinhar **Engagement Autopilot** (notebook) com roadmap por fases:

| Fase | Capacidades |
|------|-------------|
| **1 — Assistida** | AI Campaign Builder, AI Kit Builder, Reward Recommendation Engine |
| **2 — Decisão** | Smart Segmentation, Engagement Score, Best Next Action, Dynamic Storefront |
| **3 — Agêntica** | Mission Generator, AI Budget Copilot, Workvivo Feed Orchestrator |

**Fundação técnica (skill):** GCP Vertex AI, Agent Builder, Search for Commerce, AlloyDB/pgvector, Cloud Run, Pub/Sub, BigQuery.

### Clientes / ICP (repo)

Gamification platforms, employee engagement software, HR tech, sales gamification, loyalty programs.

**Personas:** CHRO/VP RH, People Ops, Benefits, Internal Comms, CTO/produto (integrações).

### Ecossistema (referência — não página «vs» sem revisão)

Workvivo, Bonusly, Achievers, Motivosity, Centrical, Spinify, Humand, Communitive, Peoplefy — frequentemente precisam de reward delivery infrastructure.

### Mensagens core (repo)

- Reward Infrastructure for Gamification Platforms / API for Employee Rewards & Fulfillment.
- Evitar: swag company, merchandise vendor, gift provider como definição principal.
- **Hero exemplo:** launch global reward marketplace without managing logistics; 4unik V3 API + infrastructure.

### SEO (PT/EN no repo)

employee rewards platform, gamification rewards API, corporate reward marketplace, plataforma de gamificação corporativa, programa de reconhecimento, engajamento de colaboradores (lista completa em `skills/4unik-ai-discovery`).

### Pilares enterprise (landing)

Reward infrastructure | Engajamento e gamificação | Integrações enterprise | Escala e governança | Prova social.

### Rotas existentes (PT)

`/`, `/plataforma/`, `/api-integracoes/`, `/gamificacao/`, `/inteligencia/`, `/casos-de-uso/`, `/blog/`, subpáginas plataforma (motor, painel, carteiras, loja, campanhas, logística integrada), `/workvivo/`.

### Futuro estratégico (não implementado)

`/seguranca/`, `/recursos/sla/`, calculadora ROI, pilar «gamificação para RH», comparativos educativos AEO.

---

## Manutenção

Após alterações no NotebookLM ou no skill `4unik-ai-discovery`: atualizar este ficheiro, `meta.yaml` (`last_synced`), `changelog.md` e pedir `notebooklm-knowledge-curator` para re-fatiar.
