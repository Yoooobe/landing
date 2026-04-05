export type WorkvivoLocale = "pt" | "en";

export const workvivoMeta = {
  pt: {
    title: "Workvivo × Yoobe — Add-on de Recompensas | 4unik",
    description:
      "Integre recompensas reais à Workvivo com a Yoobe: loja corporativa, pontos e automação. Plataforma global com integração na Europa, EUA e América Latina. Fulfillment ou API + ERP.",
  },
  en: {
    title: "Workvivo × Yoobe — Rewards Add-on | 4unik",
    description:
      "Connect real-world rewards to Workvivo with Yoobe: corporate store, points, and automation. Global platform with integrations across Europe, the US, and Latin America. Fulfillment or API + ERP.",
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
  partnersLabel: string;
  partnersCaption: string;
  workvivoLogoAlt: string;
  zoomLogoAlt: string;
  yoobeMarkAlt: string;
  partnersStripHint: string;
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
  integrationSteps: { title: string; description: string }[];
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
    otherLocalePath: "/en/workvivo/",
    otherLocaleLabel: "English",
    heroBadge: "Add-on de Recompensas Workvivo",
    heroTitle: "Recompensas reais para cada momento na Workvivo",
    heroSubtitle:
      "Incentive a interação digital com recompensas no mundo real. Cada reconhecimento, atualização e comentário na Workvivo pode virar pontos — e seus colaboradores trocam por produtos que amam, com loja corporativa e processo de checkout integrados.",
    tagline: "Reconheça. Recompense. Retenha.",
    partnersLabel: "Referências do ecossistema",
    partnersCaption:
      "A Workvivo é a plataforma de experiência do colaborador no ecossistema Zoom. A Yoobe adiciona recompensas físicas, loja corporativa e integrações — alinhada a marcas que já usam Workvivo e Zoom.",
    workvivoLogoAlt: "Logotipo Workvivo",
    zoomLogoAlt: "Logotipo Zoom",
    yoobeMarkAlt: "Ícone Yoobe — recompensas e loja corporativa",
    partnersStripHint: "Camada Yoobe",
    storeShowcaseTitle: "Exemplo de loja corporativa",
    storeShowcaseBody:
      "Veja como uma vitrine de resgate pode se parecer na prática. Abaixo, capturas da Prio Store — loja corporativa de referência que demonstra catálogo, vitrine e navegação típicos do add-on.",
    storeExampleLinkLabel: "Abrir priostore.com.br",
    storeExampleDisclaimer:
      "Imagens ilustrativas para referência visual. Marcas e produtos exibidos pertencem aos respectivos titulares.",
    storeGallery: [
      {
        file: "priostore-1.png",
        alt: "Página inicial da Prio Store — exemplo de loja corporativa",
        caption: "Home e destaques",
      },
      {
        file: "priostore-2.png",
        alt: "Listagem de produtos na Prio Store",
        caption: "Catálogo / vitrine",
      },
      {
        file: "priostore-3.png",
        alt: "Categoria Destaques na Prio Store",
        caption: "Navegação por categoria",
      },
    ],
    ctaDemo: "Agendar conversa",
    ctaWhatsapp: "Falar no WhatsApp",
    globalTitle: "Plataforma global",
    globalBody:
      "A Yoobe é uma plataforma global: oferecemos soluções de integração em escala mundial para empresas com operações e times distribuídos.",
    globalRegions: ["Europa", "Estados Unidos", "América Latina"],
    pillarsTitle: "O que o add-on entrega",
    pillars: [
      {
        title: "Loja corporativa",
        description:
          "Loja virtual com catálogo de produtos e fluxo de checkout — pronta para o programa de recompensas.",
      },
      {
        title: "Pontos a partir da Workvivo",
        description:
          "Interações na Workvivo geram pontos; você define quanto vale cada tipo de ação e o que entra na conta.",
      },
      {
        title: "Automação",
        description:
          "Menos trabalho manual: regras e resgates fluem de forma integrada, com foco na operação do programa.",
      },
    ],
    pathsSectionTitle: "Duas formas de operar com a Yoobe",
    pathsSectionSubtitle:
      "O mesmo add-on na Workvivo pode apoiar o pós-pedido de duas maneiras — escolha o modelo que combina com sua operação hoje.",
    pathA: {
      title: "Fulfillment Yoobe",
      description:
        "Produção, armazenagem e envio de brindes e kits pela operação Yoobe: ideal quando você quer catálogo, resgate e entrega ponta a ponta em um só lugar.",
      bullets: [
        "Gestão de estoque e expedição para colaboradores",
        "Operação alinhada ao catálogo e às campanhas de resgate",
        "Suporte à logística de brindes corporativos (swag) e kits",
      ],
      whenLabel: "Faça sentido quando",
      whenText:
        "você quer loja e logística completas na Yoobe, sem depender do seu ERP ou da sua operação de envio própria.",
    },
    pathB: {
      title: "Loja corporativa + API e ERP",
      description:
        "Use a Yoobe como vitrine e motor de pontos, e integre pedidos e envios ao ERP ou à stack logística que você já utiliza — inclusive se já houver API de envio ou parceiro de fulfillment.",
      bullets: [
        "Pedidos e status conectados ao seu ecossistema",
        "Compatível com quem já tem logística ou TMS integrado",
        "Camada de API para encaixar na arquitetura existente",
      ],
      whenLabel: "Faça sentido quando",
      whenText:
        "a empresa já opera envios, armazém ou ERP próprio e precisa apenas da loja, dos pontos e da integração com a Workvivo.",
    },
    integrationTitle: "Integração em alto nível",
    integrationSubtitle:
      "Um fluxo simples para o time de negócio entender; detalhes técnicos ficam para a fase de implementação com especialistas Yoobe.",
    integrationSteps: [
      {
        title: "Workvivo",
        description:
          "Reconhecimentos e interações seguem as regras do seu programa na Workvivo.",
      },
      {
        title: "Pontos Yoobe",
        description:
          "Saldo e regras de crédito de pontos ficam na Yoobe, alinhadas ao que você definiu.",
      },
      {
        title: "Catálogo e resgate",
        description:
          "Colaboradores escolhem produtos na loja corporativa e concluem o resgate.",
      },
      {
        title: "Fulfillment ou API",
        description:
          "A entrega segue pelo modelo Yoobe (fulfillment) ou é enviada ao seu sistema via integração.",
      },
    ],
    costsTitle: "Custos e modelo comercial",
    costsIntro:
      "O investimento do add-on Workvivo depende do desenho do programa: número de colaboradores, volume de resgates, escolha entre fulfillment Yoobe ou integração via API, e personalizações. Falamos com transparência na reunião comercial.",
    costsFactors: [
      "Escala de usuários e frequência de campanhas",
      "Modelo logístico: operação Yoobe ou integração com seu ERP/API",
      "Customizações de catálogo, marcas e relatórios",
    ],
    costsReferenceTitle: "Referência de planos Yoobe",
    costsReferenceBody:
      "Na página principal você encontra planos gerais da plataforma como referência de faixas — o pacote Workvivo é cotado de forma consultiva.",
    costsReferenceLink: "Ver planos na home",
    costsDisclaimer:
      "Valores do add-on Workvivo × Yoobe: sob consulta — solicite uma proposta alinhada à sua operação.",
    finalTitle: "Pronto para ligar recompensas reais à Workvivo?",
    finalSubtitle:
      "Agende uma conversa e veja como encaixar a Yoobe no seu programa — na Europa, nos EUA ou na América Latina.",
    apiLearnMore: "Ver API e integrações",
  },
  en: {
    langLabel: "Language",
    otherLocalePath: "/workvivo/",
    otherLocaleLabel: "Português",
    heroBadge: "Workvivo Rewards Add-on",
    heroTitle: "Real-world rewards for every Workvivo moment",
    heroSubtitle:
      "Drive digital engagement with real-world rewards. Every recognition, update, and comment on Workvivo can earn points — and employees redeem for products they love, with a corporate store and checkout flow built in.",
    tagline: "Recognize. Reward. Retain.",
    partnersLabel: "Ecosystem references",
    partnersCaption:
      "Workvivo is the employee experience platform in the Zoom ecosystem. Yoobe adds physical rewards, a corporate store, and integrations — built for teams already on Workvivo and Zoom.",
    workvivoLogoAlt: "Workvivo logo",
    zoomLogoAlt: "Zoom logo",
    yoobeMarkAlt: "Yoobe icon — rewards and corporate store",
    partnersStripHint: "Yoobe layer",
    storeShowcaseTitle: "Corporate store example",
    storeShowcaseBody:
      "See what a redemption storefront can look like in practice. Below are captures from Prio Store — a reference corporate store that illustrates catalog, merchandising, and navigation typical of the add-on.",
    storeExampleLinkLabel: "Open priostore.com.br",
    storeExampleDisclaimer:
      "Illustrative screenshots for visual reference. Brands and products belong to their respective owners.",
    storeGallery: [
      {
        file: "priostore-1.png",
        alt: "Prio Store homepage — corporate store example",
        caption: "Home and highlights",
      },
      {
        file: "priostore-2.png",
        alt: "Product listing on Prio Store",
        caption: "Catalog / storefront",
      },
      {
        file: "priostore-3.png",
        alt: "Highlights category on Prio Store",
        caption: "Category navigation",
      },
    ],
    ctaDemo: "Book a call",
    ctaWhatsapp: "Message on WhatsApp",
    globalTitle: "Global platform",
    globalBody:
      "Yoobe is a global platform: we deliver integration solutions worldwide for distributed teams and multi-country operations.",
    globalRegions: ["Europe", "United States", "Latin America"],
    pillarsTitle: "What the add-on delivers",
    pillars: [
      {
        title: "Corporate store",
        description:
          "A full virtual store with a product catalog and checkout — ready for your rewards program.",
      },
      {
        title: "Points from Workvivo",
        description:
          "Workvivo interactions earn points; you decide how much each action is worth and what counts.",
      },
      {
        title: "Automation",
        description:
          "Less manual work: rules and redemptions flow in an integrated way so you can run the program smoothly.",
      },
    ],
    pathsSectionTitle: "Two ways to run Yoobe alongside Workvivo",
    pathsSectionSubtitle:
      "The same Workvivo add-on can support post-redemption in two ways — pick the model that fits how you operate today.",
    pathA: {
      title: "Yoobe fulfillment",
      description:
        "Production, warehousing, and shipping of swag and kits on Yoobe’s operations: best when you want catalog, redemption, and delivery end-to-end in one place.",
      bullets: [
        "Inventory and shipping to employees’ addresses",
        "Operations aligned with catalog and redemption campaigns",
        "Support for corporate swag and kit programs",
      ],
      whenLabel: "Choose this when",
      whenText:
        "you want a full store-plus-logistics solution without relying on an ERP or carrier stack you already run separately.",
    },
    pathB: {
      title: "Corporate store + API & ERP",
      description:
        "Use Yoobe as the storefront and points engine, and connect orders and shipments to the ERP or logistics stack you already use — including existing shipping APIs or fulfillment partners.",
      bullets: [
        "Orders and status wired into your ecosystem",
        "Fits teams that already run logistics or a TMS",
        "API layer to fit your current architecture",
      ],
      whenLabel: "Choose this when",
      whenText:
        "you already operate warehousing, shipping, or a corporate ERP and need the store, points, and Workvivo integration on top.",
    },
    integrationTitle: "Integration at a glance",
    integrationSubtitle:
      "A simple flow for stakeholders; technical deep-dives happen during implementation with Yoobe specialists.",
    integrationSteps: [
      {
        title: "Workvivo",
        description:
          "Recognitions and interactions follow the rules of your Workvivo program.",
      },
      {
        title: "Yoobe points",
        description:
          "Balances and earning rules live in Yoobe, aligned with your configuration.",
      },
      {
        title: "Catalog & redemption",
        description:
          "Employees pick products in the corporate store and complete redemption.",
      },
      {
        title: "Fulfillment or API",
        description:
          "Delivery runs on Yoobe fulfillment or is handed off to your systems via integration.",
      },
    ],
    costsTitle: "Pricing & commercial model",
    costsIntro:
      "Workvivo add-on pricing depends on your program design: headcount, redemption volume, Yoobe fulfillment vs. API-led integration, and customization. We walk through this transparently on a commercial call.",
    costsFactors: [
      "User scale and campaign frequency",
      "Logistics model: Yoobe-operated vs. integration with your ERP/API",
      "Catalog, branding, and reporting customization",
    ],
    costsReferenceTitle: "Yoobe plan reference",
    costsReferenceBody:
      "Our main landing page shows general platform tiers as a reference — the Workvivo package is quoted consultatively.",
    costsReferenceLink: "View plans on homepage",
    costsDisclaimer:
      "Workvivo × Yoobe add-on pricing: contact us — we’ll propose based on your operating model.",
    finalTitle: "Ready to connect real rewards to Workvivo?",
    finalSubtitle:
      "Book a conversation and see how Yoobe fits your program — in Europe, the US, or Latin America.",
    apiLearnMore: "API & integrations",
  },
};
