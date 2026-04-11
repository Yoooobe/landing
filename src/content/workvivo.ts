export type WorkvivoLocale = "pt" | "en";

export const workvivoMeta = {
  pt: {
    title: "Workvivo × 4Unik — Add-on de Recompensas (API) | 4unik",
    description:
      "Integração de recompensas Workvivo com a 4Unik: loja corporativa, pontos e automação, alinhada à API e ao ecossistema de integrações. Cobertura global — Europa, EUA e América Latina. Fulfillment 4Unik ou conexão via API/ERP.",
  },
  en: {
    title: "Workvivo × 4Unik — Rewards Add-on (API) | 4Unik",
    description:
      "Workvivo rewards integration with 4Unik: corporate store, points, and automation, aligned with the API and integrations ecosystem. Global coverage — Europe, US, and Latin America. 4Unik fulfillment or API/ERP connection.",
  },
} as const;

export type WorkvivoCopy = {
  langLabel: string;
  otherLocalePath: string;
  otherLocaleLabel: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  tagline: string;
  orchestrationEyebrow: string;
  orchestrationTitle: string;
  orchestrationBody: string;
  orchestrationImageAlt: string;
  orchestrationImageCaption: string;
  flouiLogoAlt: string;
  flouiSiteLabel: string;
  flouiSiteUrl: string;
  casePrioTitle: string;
  casePrioBody: string;
  caseStripEyebrow: string;
  partnersLabel: string;
  partnersCaption: string;
  workvivoLogoAlt: string;
  zoomLogoAlt: string;
  yoobeMarkAlt: string;
  partnersStripHint: string;
  /** Contexto rápido: o que é o Workvivo */
  whatIsWorkvivoTitle: string;
  whatIsWorkvivoBody: string;
  workvivoPillars: { title: string; description: string }[];
  /** A lacuna: Workvivo faz reconhecimento; 4Unik entrega a recompensa */
  gapTitle: string;
  gapBody: string;
  gapWorkvivoLabel: string;
  gapWorkvivoItems: string[];
  gapAddonLabel: string;
  gapAddonItems: string[];
  /** Exemplos concretos de gatilhos Workvivo → 4Unik */
  triggersTitle: string;
  triggersBody: string;
  triggers: { event: string; result: string }[];
  storeShowcaseTitle: string;
  storeShowcaseBody: string;
  storeExampleLinkLabel: string;
  storeExampleDisclaimer: string;
  storeGallery: { file: string; alt: string; caption: string }[];
  ctaDemo: string;
  ctaWhatsapp: string;
  globalTitle: string;
  globalBody: string;
  globalRegions: string[];
  pillarsTitle: string;
  pillars: { title: string; description: string }[];
  pathsSectionTitle: string;
  pathsSectionSubtitle: string;
  pathA: {
    title: string;
    description: string;
    bullets: string[];
    whenLabel: string;
    whenText: string;
  };
  pathB: {
    title: string;
    description: string;
    bullets: string[];
    whenLabel: string;
    whenText: string;
  };
  integrationTitle: string;
  integrationSubtitle: string;
  integrationSteps: { title: string; description: string; icon: string }[];
  costsTitle: string;
  costsIntro: string;
  costsFactors: string[];
  costsReferenceTitle: string;
  costsReferenceBody: string;
  costsReferenceLink: string;
  costsDisclaimer: string;
  finalTitle: string;
  finalSubtitle: string;
  apiLearnMore: string;
};

export const workvivoContent: Record<WorkvivoLocale, WorkvivoCopy> = {
  pt: {
    langLabel: "Idioma",
    otherLocalePath: "/en/api-integracoes/workvivo/",
    otherLocaleLabel: "English",
    heroBadge: "API e integrações · Add-on Workvivo",
    heroTitle: "Recompensas reais para cada momento na Workvivo",
    heroSubtitle:
      "Shoutouts, badges e kudos na Workvivo geram reconhecimento. O add-on 4Unik vai além: transforma cada ação em pontos reais, com loja corporativa, checkout e entrega física — ponta a ponta, sem trabalho manual para o RH.",
    tagline: "Reconheça. Recompense. Retenha.",
    orchestrationEyebrow: "Automação com Floui",
    orchestrationTitle: "Orquestradores que ligam regras de gamificação ao mundo real",
    orchestrationBody:
      "Com os orquestradores da Floui, é possível integrar e automatizar regras de gamificação em praticamente qualquer sistema — desde o registo do motivo da ação até ao crédito de pontos e ao resgate na 4Unik. A imagem ao lado ilustra como o contexto (por exemplo, o motivo do reconhecimento) acompanha o fluxo operacional.",
    orchestrationImageAlt:
      "Interface com destaque para o campo Motivo e resumo de saldo — exemplo de registo contextual em programa de reconhecimento",
    orchestrationImageCaption:
      "Exemplo ilustrativo: motivo e saldo visíveis na jornada do colaborador.",
    flouiLogoAlt: "Floui — automação e orquestração",
    flouiSiteLabel: "Visitar floui.io",
    flouiSiteUrl: "https://floui.io/integracao-de-sistemas/",
    casePrioTitle: "Case de referência: PRIO",
    casePrioBody:
      "A PRIO é referência na operação com 4Unik: programa com loja corporativa (Prio Store), reconhecimento e campanhas em escala. A camada Floui orquestra quando e como os eventos viram regras de pontos e integrações — em conjunto com o add-on Workvivo × 4Unik. Abaixo, a vitrine Prio Store mostra o lado do resgate e do catálogo.",
    caseStripEyebrow: "Case",
    partnersLabel: "Referências do ecossistema",
    partnersCaption:
      "A Workvivo é a plataforma de experiência do colaborador no ecossistema Zoom. A Floui automatiza e orquestra integrações entre sistemas para ligar eventos às regras de recompensa. A 4Unik adiciona recompensas físicas, loja corporativa e fulfillment — para times que já usam Workvivo e querem completar o ciclo de reconhecimento.",
    workvivoLogoAlt: "Logotipo Workvivo",
    zoomLogoAlt: "Logotipo Zoom",
    yoobeMarkAlt: "Ícone 4Unik — recompensas e loja corporativa",
    partnersStripHint: "Camada 4Unik",
    whatIsWorkvivoTitle: "O que é a Workvivo?",
    whatIsWorkvivoBody:
      "Workvivo by Zoom é a plataforma líder de experiência do colaborador — usada por milhões de pessoas para comunicar, engajar, colaborar e medir o clima organizacional em um único lugar.",
    workvivoPillars: [
      {
        title: "Comunicações",
        description:
          "Notícias, campanhas, chat, push, live-stream e read receipts para alcançar todo o time.",
      },
      {
        title: "Engajamento",
        description:
          "Shoutouts, badges, kudos, community spaces, surveys e eventos de cultura.",
      },
      {
        title: "Intranet Digital",
        description:
          "Wikis, diretório de pessoas e integrações com 40+ ferramentas de RH e produtividade.",
      },
      {
        title: "Employee Listening",
        description:
          "Analytics de engajamento, análise de sentimento e relatórios para decisões baseadas em dados.",
      },
    ],
    gapTitle: "Workvivo já tem reconhecimento. O que falta é a recompensa.",
    gapBody:
      "A plataforma mobiliza o time com shoutouts e badges — mas não entrega o prêmio físico. O add-on 4Unik fecha esse ciclo.",
    gapWorkvivoLabel: "O que o Workvivo entrega",
    gapWorkvivoItems: [
      "Shoutouts e kudos entre colegas",
      "Badges e reconhecimentos públicos",
      "Pesquisas de clima e análise de engajamento",
      "Comunicação e comunidade no app",
    ],
    gapAddonLabel: "O que o add-on 4Unik adiciona",
    gapAddonItems: [
      "Pontos a cada ação reconhecida na Workvivo",
      "Loja corporativa com catálogo de produtos",
      "Checkout e resgate direto no programa",
      "Entrega física ou kit personalizado ao colaborador",
    ],
    triggersTitle: "Cada momento na Workvivo pode virar um prêmio real",
    triggersBody:
      "Você define as regras; a 4Unik cuida do crédito de pontos, da loja e da entrega.",
    triggers: [
      { event: "Shoutout recebido", result: "Pontos creditados automaticamente" },
      { event: "Badge conquistado", result: "Prêmio desbloqueado na loja" },
      { event: "Meta de equipe batida", result: "Campanha de resgate ativada" },
      { event: "Onboarding concluído", result: "Kit de boas-vindas enviado a domicílio" },
    ],
    storeShowcaseTitle: "Exemplo de loja corporativa",
    storeShowcaseBody:
      "Veja como uma vitrine de resgate pode se parecer na prática. Abaixo, capturas da Prio Store — loja corporativa de referência que demonstra catálogo, vitrine e navegação típicos do add-on.",
    storeExampleLinkLabel: "Abrir priostore.com.br",
    storeExampleDisclaimer:
      "Imagens ilustrativas para referência visual. Marcas e produtos exibidos pertencem aos respectivos titulares.",
    storeGallery: [
      {
        file: "priostore-1.webp",
        alt: "Página inicial da Prio Store — exemplo de loja corporativa",
        caption: "Home e destaques",
      },
      {
        file: "priostore-2.webp",
        alt: "Listagem de produtos na Prio Store",
        caption: "Catálogo / vitrine",
      },
      {
        file: "priostore-3.webp",
        alt: "Categoria Destaques na Prio Store",
        caption: "Navegação por categoria",
      },
    ],
    ctaDemo: "Agendar conversa",
    ctaWhatsapp: "Falar no WhatsApp",
    globalTitle: "Plataforma global",
    globalBody:
      "A 4Unik é uma plataforma global: oferecemos soluções de integração em escala mundial para empresas com operações e times distribuídos.",
    globalRegions: ["Europa", "Estados Unidos", "América Latina"],
    pillarsTitle: "O que o add-on entrega",
    pillars: [
      {
        title: "Loja corporativa pronta",
        description:
          "Vitrine de produtos conectada ao programa. Colaboradores escolhem o próprio prêmio — sem burocracia para o RH.",
      },
      {
        title: "Pontos a partir da Workvivo",
        description:
          "Cada shoutout, badge ou ação reconhecida gera pontos. Você define as regras; a 4Unik cuida do saldo.",
      },
      {
        title: "Entrega ponta a ponta",
        description:
          "Fulfillment próprio ou integração com seu ERP. O brinde chega na casa do colaborador — em qualquer país.",
      },
    ],
    pathsSectionTitle: "Duas formas de operar com a 4Unik",
    pathsSectionSubtitle:
      "O mesmo add-on na Workvivo pode apoiar o pós-pedido de duas maneiras — escolha o modelo que combina com sua operação hoje.",
    pathA: {
      title: "Fulfillment 4Unik",
      description:
        "Produção, armazenagem e envio de brindes e kits pela operação 4Unik: ideal quando você quer catálogo, resgate e entrega ponta a ponta em um só lugar.",
      bullets: [
        "Gestão de estoque e expedição para colaboradores",
        "Operação alinhada ao catálogo e às campanhas de resgate",
        "Suporte à logística de brindes corporativos (swag) e kits",
      ],
      whenLabel: "Faz sentido quando",
      whenText:
        "você quer loja e logística completas na 4Unik, sem depender do seu ERP ou da sua operação de envio própria.",
    },
    pathB: {
      title: "Loja corporativa + API e ERP",
      description:
        "Use a 4Unik como vitrine e motor de pontos, e integre pedidos e envios ao ERP ou à stack logística que você já utiliza — inclusive se já houver API de envio ou parceiro de fulfillment.",
      bullets: [
        "Pedidos e status conectados ao seu ecossistema",
        "Compatível com quem já tem logística ou TMS integrado",
        "Camada de API para encaixar na arquitetura existente",
      ],
      whenLabel: "Faz sentido quando",
      whenText:
        "a empresa já opera envios, armazém ou ERP próprio e precisa apenas da loja, dos pontos e da integração com a Workvivo.",
    },
    integrationTitle: "Como funciona a integração",
    integrationSubtitle:
      "Do reconhecimento na Workvivo à entrega do prêmio — quatro passos sem trabalho manual no meio do caminho.",
    integrationSteps: [
      {
        title: "Workvivo",
        description:
          "Colaborador recebe shoutout, conquista badge ou atinge meta — o gatilho é acionado.",
        icon: "megaphone",
      },
      {
        title: "Pontos 4Unik",
        description:
          "Pontos são creditados automaticamente conforme as regras que você configurou.",
        icon: "coins",
      },
      {
        title: "Loja & resgate",
        description:
          "Colaborador acessa a loja corporativa, escolhe o produto e finaliza o resgate.",
        icon: "store",
      },
      {
        title: "Entrega",
        description:
          "O prêmio é enviado ao endereço do colaborador via fulfillment 4Unik ou integração com seu ERP.",
        icon: "package",
      },
    ],
    costsTitle: "Custos e modelo comercial",
    costsIntro:
      "O investimento do add-on Workvivo depende do desenho do programa: número de colaboradores, volume de resgates, escolha entre fulfillment 4Unik ou integração via API, e personalizações. Falamos com transparência na reunião comercial.",
    costsFactors: [
      "Escala de usuários e frequência de campanhas",
      "Modelo logístico: operação 4Unik ou integração com seu ERP/API",
      "Customizações de catálogo, marcas e relatórios",
    ],
    costsReferenceTitle: "Referência de planos 4Unik",
    costsReferenceBody:
      "Na página principal você encontra planos gerais da plataforma como referência de faixas — o pacote Workvivo é cotado de forma consultiva.",
    costsReferenceLink: "Ver planos na home",
    costsDisclaimer:
      "Valores do add-on Workvivo × 4Unik: sob consulta — solicite uma proposta alinhada à sua operação.",
    finalTitle: "Pronto para ligar recompensas reais à Workvivo?",
    finalSubtitle:
      "Agende uma conversa e veja como encaixar a 4Unik no seu programa — na Europa, nos EUA ou na América Latina.",
    apiLearnMore: "Hub da API e integrações",
  },
  en: {
    langLabel: "Language",
    otherLocalePath: "/api-integracoes/workvivo/",
    otherLocaleLabel: "Português",
    heroBadge: "API & integrations · Workvivo add-on",
    heroTitle: "Real-world rewards for every Workvivo moment",
    heroSubtitle:
      "Shoutouts, badges, and kudos in Workvivo create recognition. The 4Unik add-on goes further: it turns every action into real points, with a corporate store, checkout, and physical delivery — end to end, with no manual work for HR.",
    tagline: "Recognize. Reward. Retain.",
    orchestrationEyebrow: "Automation with Floui",
    orchestrationTitle: "Orchestrators that connect gamification rules to real-world rewards",
    orchestrationBody:
      "Floui's orchestrators help integrate and automate gamification rules across systems — from capturing the reason for an action to crediting points and redeeming through 4Unik. The image shows how context (such as the recognition reason) stays with the operational flow.",
    orchestrationImageAlt:
      "UI mockup emphasizing the Reason field and balance summary — example of contextual recognition logging",
    orchestrationImageCaption:
      "Illustrative example: reason and balance visible in the member journey.",
    flouiLogoAlt: "Floui — automation and orchestration",
    flouiSiteLabel: "Visit floui.io",
    flouiSiteUrl: "https://floui.io/integracao-de-sistemas/",
    casePrioTitle: "Reference case: PRIO",
    casePrioBody:
      "PRIO is a flagship 4Unik operation: a corporate rewards program with Prio Store, recognition, and campaigns at scale. Floui orchestration defines when events become point rules and integrations — alongside the Workvivo × 4Unik add-on. Below, Prio Store illustrates the catalog and redemption experience.",
    caseStripEyebrow: "Case study",
    partnersLabel: "Ecosystem references",
    partnersCaption:
      "Workvivo is the employee experience platform in the Zoom ecosystem. Floui automates and orchestrates integrations across systems to connect events with reward rules. 4Unik adds physical rewards, a corporate store, and fulfillment — for teams already using Workvivo who want to complete the recognition cycle.",
    workvivoLogoAlt: "Workvivo logo",
    zoomLogoAlt: "Zoom logo",
    yoobeMarkAlt: "4Unik icon — rewards and corporate store",
    partnersStripHint: "4Unik layer",
    whatIsWorkvivoTitle: "What is Workvivo?",
    whatIsWorkvivoBody:
      "Workvivo by Zoom is the leading employee experience platform — used by millions to communicate, engage, collaborate, and measure organizational culture in one place.",
    workvivoPillars: [
      {
        title: "Communications",
        description:
          "News, campaigns, chat, push, live-stream, and read receipts to reach every employee.",
      },
      {
        title: "Engagement",
        description:
          "Shoutouts, badges, kudos, community spaces, surveys, and culture events.",
      },
      {
        title: "Digital Workplace",
        description:
          "Wikis, people directory, and integrations with 40+ HR and productivity tools.",
      },
      {
        title: "Employee Listening",
        description:
          "Engagement analytics, sentiment analysis, and reports to make data-driven decisions.",
      },
    ],
    gapTitle: "Workvivo already has recognition. What's missing is the reward.",
    gapBody:
      "The platform mobilizes the team with shoutouts and badges — but doesn't deliver the physical prize. The 4Unik add-on closes that loop.",
    gapWorkvivoLabel: "What Workvivo delivers",
    gapWorkvivoItems: [
      "Peer-to-peer shoutouts and kudos",
      "Badges and public recognition",
      "Pulse surveys and engagement analytics",
      "Communications and community in the app",
    ],
    gapAddonLabel: "What the 4Unik add-on adds",
    gapAddonItems: [
      "Points for every recognized action in Workvivo",
      "Corporate store with a product catalog",
      "Checkout and redemption directly in the program",
      "Physical delivery or personalized kit to the employee",
    ],
    triggersTitle: "Every Workvivo moment can become a real reward",
    triggersBody:
      "You set the rules; 4Unik handles points, the store, and delivery.",
    triggers: [
      { event: "Shoutout received", result: "Points credited automatically" },
      { event: "Badge earned", result: "Reward unlocked in the store" },
      { event: "Team goal hit", result: "Redemption campaign activated" },
      { event: "Onboarding completed", result: "Welcome kit shipped to their door" },
    ],
    storeShowcaseTitle: "Corporate store example",
    storeShowcaseBody:
      "See what a redemption storefront can look like in practice. Below are examples from Prio Store, a reference corporate store that illustrates the catalog, merchandising, and navigation patterns typical of the add-on.",
    storeExampleLinkLabel: "Open priostore.com.br",
    storeExampleDisclaimer:
      "Illustrative screenshots for visual reference. Brands and products belong to their respective owners.",
    storeGallery: [
      {
        file: "priostore-1.webp",
        alt: "Prio Store homepage — corporate store example",
        caption: "Home and highlights",
      },
      {
        file: "priostore-2.webp",
        alt: "Product listing on Prio Store",
        caption: "Catalog / storefront",
      },
      {
        file: "priostore-3.webp",
        alt: "Highlights category on Prio Store",
        caption: "Category navigation",
      },
    ],
    ctaDemo: "Book a call",
    ctaWhatsapp: "Talk on WhatsApp",
    globalTitle: "Global platform",
    globalBody:
      "4Unik is a global platform, delivering integration solutions for distributed teams and multi-country operations.",
    globalRegions: ["Europe", "United States", "Latin America"],
    pillarsTitle: "What the add-on delivers",
    pillars: [
      {
        title: "Ready-made corporate store",
        description:
          "A product storefront connected to your program. Employees pick their own reward — no HR overhead.",
      },
      {
        title: "Points from Workvivo",
        description:
          "Every shoutout, badge, or recognized action earns points. You set the rules; 4Unik manages the balance.",
      },
      {
        title: "End-to-end delivery",
        description:
          "4Unik fulfillment or ERP integration. The reward arrives at the employee's door — in any country.",
      },
    ],
    pathsSectionTitle: "Two ways to run 4Unik alongside Workvivo",
    pathsSectionSubtitle:
      "The same Workvivo add-on can support redemptions in two ways, so you can choose the model that fits your current operation.",
    pathA: {
      title: "4Unik fulfillment",
      description:
        "Production, warehousing, and shipping for swag and kits run through 4Unik operations. It is the best fit when you want catalog, redemption, and delivery end to end in one place.",
      bullets: [
        "Inventory and shipping to employees' addresses",
        "Operations aligned with catalog and redemption campaigns",
        "Support for corporate swag and kit programs",
      ],
      whenLabel: "Choose this when",
      whenText:
        "you want a full store-plus-logistics solution without relying on an ERP or carrier stack managed elsewhere.",
    },
    pathB: {
      title: "Corporate store + API & ERP",
      description:
        "Use 4Unik as the storefront and points engine, then connect orders and shipments to the ERP or logistics stack you already use, including existing shipping APIs or fulfillment partners.",
      bullets: [
        "Orders and status wired into your ecosystem",
        "Fits teams that already run logistics or a TMS",
        "API layer to fit your current architecture",
      ],
      whenLabel: "Choose this when",
      whenText:
        "you already operate warehousing, shipping, or a corporate ERP and need the store, points, and Workvivo integration on top.",
    },
    integrationTitle: "How the integration works",
    integrationSubtitle:
      "From recognition in Workvivo to reward delivery — four steps with no manual work in between.",
    integrationSteps: [
      {
        title: "Workvivo",
        description:
          "Employee receives a shoutout, earns a badge, or hits a goal — the trigger fires.",
        icon: "megaphone",
      },
      {
        title: "4Unik points",
        description:
          "Points are credited automatically according to the rules you configured.",
        icon: "coins",
      },
      {
        title: "Store & redemption",
        description:
          "Employee opens the corporate store, picks a product, and completes redemption.",
        icon: "store",
      },
      {
        title: "Delivery",
        description:
          "The reward ships to the employee's address via 4Unik fulfillment or your ERP integration.",
        icon: "package",
      },
    ],
    costsTitle: "Pricing & commercial model",
    costsIntro:
      "Workvivo add-on pricing depends on your program design: headcount, redemption volume, 4Unik fulfillment versus API-led integration, and customization. We walk through it transparently during a commercial call.",
    costsFactors: [
      "User scale and campaign frequency",
      "Logistics model: 4Unik-operated vs. integration with your ERP/API",
      "Catalog, branding, and reporting customization",
    ],
    costsReferenceTitle: "4Unik plan reference",
    costsReferenceBody:
      "Our main landing page shows general platform tiers as a reference, while the Workvivo package is quoted consultatively.",
    costsReferenceLink: "View plans on homepage",
    costsDisclaimer:
      "Workvivo × 4Unik add-on pricing is available on request. We will tailor a proposal to your operating model.",
    finalTitle: "Ready to connect real rewards to Workvivo?",
    finalSubtitle:
      "Book a conversation and see how 4Unik fits your program — in Europe, the US, or Latin America.",
    apiLearnMore: "API & integrations hub",
  },
};
