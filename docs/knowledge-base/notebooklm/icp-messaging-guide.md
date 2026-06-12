# Guia de mensagens por ICP (linguagem acessível)

**Objetivo:** guiar agentes e editores a escrever copy clara, em linguagem simples e orientada a cada persona, sem contradizer o posicionamento ou expor claims sensíveis.

Fontes: [`briefing.md`](briefing.md), [`positioning.md`](positioning.md), [`icp-personas.md`](icp-personas.md), [`skills/4unik-ai-discovery`](../../../skills/4unik-ai-discovery/SKILL.md).

---

## Princípios de linguagem

1. **Fale com a pessoa:** use "você" e "sua empresa". Evite terceira pessoa distante.
2. **Uma ideia por frase.** Frases curtas. Sem subordinadas empilhadas.
3. **Benefício antes da feature.** Diga o que a pessoa ganha; depois como.
4. **Vocabulário:** "colaboradores" (não "funcionários"); "experiências" e "recompensas" (não só "brindes/prêmios").
5. **Sem jargão interno** na copy pública: nada de "entropy crop", "fulfillment" sem explicar, "infraestrutura" solta. Traduza para o resultado ("nós cuidamos da logística e da entrega").
6. **Concreto, não vago:** prefira "envios rastreáveis no Brasil e no mundo" a "solução completa".
7. **Posicionamento (não "empresa de brindes"):** a 4unik é **infraestrutura de engajamento API-first** — vende **comportamento programável** e atua como **camada de execução**. Para públicos técnicos, "recompensa física como uma chamada de API"; para RH/negócio, traduzir para "do ponto ao presente na mão da pessoa, sem você operar logística".
8. **Claims sensíveis** (números, %, logos) só com aprovação — ver "O que não dizer".

---

## Matriz por ICP

Cada página deve abrir pela dor do ICP dominante e fechar com o CTA sugerido.

### RH / People (CHRO, People Ops, Benefícios, Endomarketing)

- **Dor:** engajamento baixo, reconhecimento manual em planilhas, turnover, onboarding sem brilho.
- **Promessa:** reconhecer e premiar o time sem virar uma operação de logística.
- **Prova:** menos trabalho manual do RH; entregas que a 4unik cuida; campanhas em poucos cliques.
- **CTA:** "Agendar demonstração" / "Ver a plataforma".

### Vendas (Diretoria comercial, RevOps)

- **Dor:** metas sem motivação contínua; premiação lenta; ranking em planilha.
- **Promessa:** metas, bônus e rankings que premiam na hora certa.
- **Prova:** leaderboards por performance; recompensas imediatas.
- **CTA:** "Falar com especialista".

### Marketing / Eventos / Comunidades

- **Dor:** participação baixa, brindes genéricos, sem rastreio de quem engajou.
- **Promessa:** transforme eventos e campanhas em engajamento mensurável com recompensas reais.
- **Prova:** loja com catálogo amplo; fidelidade e recompensas por engajamento digital.
- **CTA:** "Agendar demonstração".

### CTO / Produto (plataformas que integram)

- **Dor:** stack fragmentada; construir loja, catálogo e logística do zero.
- **Promessa:** uma API para recompensas — você cuida da experiência, a 4unik da operação.
- **Prova:** API e integração rápida; integrações nomeadas (ex.: Workvivo).
- **CTA:** "Ver API e integrações".

---

## Matriz dos 5 ICPs verticais (eixo API-first)

Detalhe factual em [`icp-personas.md`](icp-personas.md). Resumo de mensagem:

| ICP | Dor (abrir aqui) | Promessa | Prova (com flag aprovação) | CTA |
|-----|------------------|----------|----------------------------|-----|
| **Plataformas / B2B SaaS** (embedded) | Logística de prêmios foge do seu core | Sua plataforma entrega prêmios físicos sem operar estoque nem frete — a 4unik é a camada de execução | Catálogo 5.000+, checkout no seu app, tracking por webhook | "Ver API e integrações" |
| **Educação / E-learning** | Alunos não terminam os cursos | Recompensa que chega na casa do aluno ao concluir — motivação que se vê | Caso Boticário (+308% conclusão) | "Falar com especialista" |
| **Vendas** | Premiação manual e lenta esfria o time | Bateu a meta, ganhou na hora — direto do CRM | Pontos automáticos por performance | "Falar com especialista" |
| **Criadores / Comunidades** | Quer premiar fãs, mas não quer embalar e enviar | Loja VIP da sua comunidade; a 4unik cuida de 100% da entrega | Swag exclusivo + fulfillment 4unik | "Agendar demonstração" |
| **Eventos** | Brinde no evento vira caos logístico | Participante escolhe pelo celular: retira no estande ou recebe em casa | Checkout + rastreio ponta a ponta | "Agendar demonstração" |

**Tom por público:** técnico (CTO/dev) aceita "API", "SDK", "webhook", "sandbox"; RH/negócio recebe a tradução em benefício.

---

## Vocabulário PT/EN (termos estáveis)

| Conceito | PT (landing) | EN (landing) | Nota |
|----------|--------------|--------------|------|
| Engagement Autopilot | Inteligência aplicada ao engajamento | Engagement intelligence | Em `/inteligencia/`; sem prometer recursos de roadmap como prontos |
| Reward infrastructure | Infraestrutura de recompensas | Reward infrastructure | Explicar como "loja + catálogo + logística + API" |
| Loja VIP | Loja de recompensas / catálogo | Rewards store / catalog | "+5.000 itens" só se aprovado |
| Fulfillment | Logística e entrega | Logistics and delivery | Evitar "fulfillment" cru no PT |
| Colaboradores | Colaboradores | Employees / team | Nunca "funcionários" |

---

## O que NÃO dizer na landing (sem aprovação)

- Percentuais comparativos ("50% menos que Shopify", "70% menos que VTEX", "80% menos erros", "85% das plataformas focam só software").
- Métricas de tração e de caso (R$ 1,34M, 15 enterprise, 1M+ recompensas, 500+ empresas, **Boticário +308% conclusão de cursos**) em hero ou metadata.
- Logos de clientes (O Boticário, Softplan) sem permissão de marca e asset aprovado no CMS.
- Recursos das fases 2 e 3 de Inteligência como se já estivessem disponíveis.
- ROI garantido em JSON-LD, ads ou títulos.

Esses itens vivem na KB para contexto dos agentes, mas só vão para a copy pública após validação comercial/jurídica.

---

## Frases canónicas (anti-repetição)

Cada promessa central tem **uma frase canónica**. Use-a **uma vez por página**; nas outras secções referencie por link/CTA em vez de reescrever a mesma promessa com outras palavras.

| Promessa | Frase canónica PT | EN |
|----------|-------------------|----|
| Logística | "Nós cuidamos da logística e da entrega — no Brasil e no mundo." | "We handle logistics and delivery — in Brazil and worldwide." |
| API/embed | "Recompensa física como uma chamada de API." | "Physical rewards as an API call." |
| GTM dual | "Plataforma completa ou camada de execução via API." | "Full platform or execution layer via API." |

**Regra de densidade:**

- Uma promessa central por página (a do ICP dominante); as restantes aparecem no máximo uma vez como apoio.
- Cada estatística (ex.: 65% engajamento, 83%) aparece **uma única vez no site inteiro** — hoje vivem na home (`WhySection`); não duplicar em outras secções/páginas.
- Termos saturados (`gamificação`, `engajamento`, `reconhecimento`): antes de adicionar mais uma ocorrência, verifique se a frase não funciona com o termo já presente no título da secção.
- Exemplos de mercado (SAP, Deloitte, estudos de terceiros) levam sempre o rótulo "exemplo de mercado" — nunca apresentar como clientes 4unik.

## Registo de propriedade (stats e promessas)

Cada estatística e cada promessa canónica tem **uma página dona**. Antes de escrever um número ou promessa, confirme aqui; fora da página dona, referencie por link.

| Item | Página dona | Ficheiro | Nota |
|------|-------------|----------|------|
| 65% (sem reconhecimento) | Home (`WhySection`) | `pt-stats-bento-tabs-why.ts` | Outras páginas usam linguagem qualitativa ("um ano sem reconhecimento") |
| 83% (motivação) | Home (`WhySection`) | `pt-stats-bento-tabs-why.ts` | — |
| R$ 7 mi (transacionado) | Home (`WhySection`/stats) | `pt-stats-bento-tabs-why.ts` | — |
| +5.000 itens | Home (1×, secção produto) + `/plataforma/loja-resgate/` | `pt-stats-bento-tabs-why.ts`, `platformFeaturePages.ts` | Restantes páginas: "catálogo amplo" |
| +308% / R$ 63k (Boticário, aprovado) | `/educacao/` | `pt-educacao-page.ts` | Campanhas e gamificação linkam para `/educacao/` |
| Caso Deloitte (exemplo de mercado) | `/casos-de-uso/` | `pt-casos-page.ts` | Sempre com rótulo "exemplo de mercado" |
| "Camada de execução" | `/para-plataformas/` (hero, 1×) | `pt-para-plataformas-page.ts` | Home pode usar a frase canónica GTM dual 1× |
| Definição "API-first" | `/infraestrutura-de-recompensas/` (1 bloco) | `pt-reward-infrastructure-page.ts` | — |
| "Plataforma completa ou camada de execução via API" | Home (1×) | `pt-landing-more.ts` | FAQs de outras páginas linkam em vez de reescrever |
| "Nós cuidamos da logística e da entrega" | Home (1×) | `pt-home.ts` | — |

## Checklist rápido (antes de publicar copy)

- [ ] Abre pela dor do ICP dominante da página?
- [ ] Frases curtas, "você", sem jargão?
- [ ] Benefício antes da feature?
- [ ] Promessas centrais usam a frase canónica (1× por página)?
- [ ] Nenhuma estatística duplicada noutra secção/página?
- [ ] PT e EN com o mesmo significado?
- [ ] Sem claim sensível não aprovado?
- [ ] Coerente com `positioning.md` e `4unik-ai-discovery`?
