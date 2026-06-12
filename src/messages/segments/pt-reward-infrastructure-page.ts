export const ptRewardInfrastructurePage = {
  seo: {
    title: "Infraestrutura de recompensas (Reward Infrastructure) | 4Unik",
    description:
      "O que é reward infrastructure: camada API-first de catálogo, checkout e fulfillment para programas de employee engagement e gamificação corporativa — sem operar logística interna.",
    openGraphDescription:
      "Definição estável de infraestrutura de recompensas: API, catálogo e entregas integrados a plataformas de engajamento.",
  },
  hero: {
    badge: "Reward Infrastructure",
    titleBefore: "O que é",
    titleGradient: "infraestrutura de recompensas",
    sub:
      "Camada API-first que conecta programas de engajamento a catálogo corporativo, checkout e fulfillment — para RH, plataformas SaaS e times que precisam entregar prémios reais sem virar operação logística.",
    definition:
      "Reward infrastructure é a infraestrutura técnica e operacional que permite resgatar recompensas físicas ou digitais dentro de programas de reconhecimento, gamificação ou incentivo — com catálogo, estoque, pagamento/resgate e entrega integrados via API ou plataforma administrada.",
  },
  notThis: {
    badge: "Posicionamento",
    title: "Não é loja de brindes nem e-commerce avulso",
    body:
      "Empresas de swag vendem produtos; plataformas de engagement precisam de uma camada que traduz pontos, metas e reconhecimento em entregas rastreáveis. A 4Unik opera nessa camada: conecta-se ao seu HRIS, intranet ou produto SaaS e assume catálogo, estoque e logística — ou encaixa fornecedores que você já usa.",
    bullets: [
      "Não substitui o seu HRIS, ERP ou plataforma de comunicação interna",
      "Não é marketplace B2C — é infraestrutura B2B para programas corporativos",
      "Não exige que o RH vire compras e transportadora",
    ],
  },
  components: {
    badge: "Componentes",
    title: "O que compõe a stack",
    items: [
      {
        title: "API e webhooks",
        desc: "Endpoints REST para catálogo, estoque, checkout e rastreio — integração embedded no seu produto ou stack de RH.",
        icon: "link-2",
      },
      {
        title: "Catálogo corporativo",
        desc: "Milhares de itens físicos e kits prontos para resgate com pontos, budget ou reconhecimento manager-to-peer.",
        icon: "store",
      },
      {
        title: "Fulfillment",
        desc: "Operação de pedidos, estoque, frete e rastreamento — no Brasil e internacionalmente, com produção local quando acelera entrega.",
        icon: "package",
      },
      {
        title: "Motor de engajamento (opcional)",
        desc: "Campanhas, gamificação e loja de resgates na plataforma 4unik V3 quando você quer administrar o programa, não só a entrega.",
        icon: "target",
      },
    ],
  },
  audiences: {
    badge: "Para quem",
    title: "Quem usa reward infrastructure",
    items: [
      {
        title: "RH e People",
        desc: "Programas de reconhecimento, onboarding kits e campanhas de clima com entrega automatizada.",
        href: "/plataforma/",
      },
      {
        title: "Plataformas SaaS",
        desc: "Recompensas físicas embedded via API dentro do seu produto de engagement ou incentivo.",
        href: "/para-plataformas/",
      },
      {
        title: "Educação e vendas",
        desc: "Trilhas de aprendizado e metas comerciais ligadas a prémios entregues sem fricção operacional.",
        href: "/educacao/",
      },
      {
        title: "Eventos e comunidades",
        desc: "Brindes, swag e lojas VIP com inventário e envio geridos pela plataforma.",
        href: "/eventos/",
      },
    ],
  },
  related: {
    title: "Aprofunde no ecossistema 4Unik",
    links: [
      { label: "API e integrações", href: "/api-integracoes/" },
      { label: "Visão da plataforma", href: "/plataforma/" },
      { label: "Casos de uso", href: "/casos-de-uso/" },
      { label: "Para plataformas SaaS", href: "/para-plataformas/" },
    ],
  },
  cta: {
    title: "Veja a stack em ação",
    sub: "Demonstração de 30 minutos: catálogo, fluxo de resgate, API e operação logística integrada ao seu caso.",
    button: "Agendar demonstração",
  },
  faq: {
    badge: "FAQ",
    titleBefore: "Perguntas sobre",
    titleGradient: "reward infrastructure",
    titleAfter: "",
    items: [
      {
        q: "O que é reward infrastructure?",
        a: "Reward infrastructure (infraestrutura de recompensas) é a camada API-first que conecta programas de employee engagement e gamificação corporativa a catálogo, checkout e fulfillment. Em vez de cada empresa construir loja, estoque e logística, integra-se a um provedor como a 4Unik que opera essa camada.",
      },
      {
        q: "Qual a diferença entre reward infrastructure e uma loja de brindes?",
        a: "Uma loja de brindes vende produtos avulsos. Reward infrastructure traduz pontos, metas e reconhecimento em entregas rastreáveis dentro do fluxo do programa — com API, webhooks, governança e integração ao stack corporativo.",
      },
      {
        q: "A 4Unik é só API ou também plataforma?",
        a: "As duas coisas. Plataformas e times técnicos podem consumir só API e fulfillment; RH e operação podem usar a plataforma 4unik V3 com motor de gamificação, loja de resgates e painéis — a mesma infraestrutura por baixo.",
      },
      {
        q: "Quem precisa de reward infrastructure?",
        a: "Grandes empresas com programas de reconhecimento, plataformas de engagement que querem prémios físicos embedded, times de vendas ou educação com incentivos ligados a metas, e operadores de eventos/comunidades que precisam de catálogo e envio sem operação manual.",
      },
      {
        q: "Como escolher um provedor de infraestrutura de recompensas?",
        a: "Avalie integração (API, SSO, webhooks), cobertura de catálogo e fulfillment, governança para bases grandes, e se o modelo encaixa embedded (SaaS) ou administrado (RH). Veja casos reais em /casos-de-uso/ e detalhes técnicos em /api-integracoes/.",
      },
    ],
  },
} as const;
