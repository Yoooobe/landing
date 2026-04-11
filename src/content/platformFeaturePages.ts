import {
  BellRing,
  Coins,
  CreditCard,
  Filter,
  Gift,
  GitBranch,
  LayoutDashboard,
  PackageCheck,
  Radar,
  ScanSearch,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Target,
  Truck,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PlatformFeaturePageKey = "motor" | "wallets" | "manager" | "loja";

export type PlatformFeaturePageContent = {
  seo: {
    title: string;
    description: string;
  };
  badge: string;
  title: string;
  highlight: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  stats: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
  capabilitiesTitle: string;
  capabilities: Array<{
    icon: LucideIcon;
    title: string;
    body: string;
  }>;
  workflowTitle: string;
  workflow: Array<{
    title: string;
    body: string;
  }>;
  galleryTitle: string;
  gallery: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
  ctaTitle: string;
  ctaBody: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  backLabel: string;
  backHref: string;
};

export const ptPlatformFeaturePages: Record<PlatformFeaturePageKey, PlatformFeaturePageContent> = {
  motor: {
    seo: {
      title: "Motor de Gamificação | 4unik",
      description:
        "Campanhas, regras, pontuação e integrações para transformar metas e ações de engajamento em experiências de reconhecimento dentro da 4unik.",
    },
    badge: "Motor de Gamificação",
    title: "A 4unik conecta metas,",
    highlight: "resgates e engajamento em uma só operação.",
    description:
      "A 4unik pode operar como motor nativo de gamificação e engajamento ou ser conectada a plataformas externas. Com ela, a loja corporativa vira a camada de resgate auditável para presentear times, colaboradores e parceiros, enquanto campanhas com páginas próprias ativam hackathons, desafios corporativos, ações internas, onboarding e metas comerciais sem operação paralela.",
    imageSrc: "/screens/admin-campaign-config-desktop.webp",
    imageAlt: "Tela de configuração de campanha da 4unik",
    stats: [
      {
        label: "Campanhas publicadas",
        value: "24h",
        detail: "Landing pages de resgate, produtos e regras entram no ar em fluxo guiado.",
      },
      {
        label: "Motor flexível",
        value: "Nativo ou integrado",
        detail: "A 4unik atende programas próprios ou conecta stacks externas de gamificação e engajamento.",
      },
      {
        label: "Resgate operacional",
        value: "Fim a fim",
        detail: "Carteira, catálogo, pedidos e fulfillment ficam conectados na mesma jornada.",
      },
    ],
    capabilitiesTitle: "O que o motor entrega",
    capabilities: [
      {
        icon: Target,
        title: "Campanhas para ações reais do negócio",
        body:
          "Modele hackathons, desafios internos, campanhas de metas, onboarding e ações sazonais com vigência, elegibilidade, página própria e premiação.",
      },
      {
        icon: GitBranch,
        title: "Motor nativo ou integrado",
        body:
          "Use o sistema de gamificação da 4unik ou conecte plataformas externas de engajamento, CRM, HRIS e outras fontes de evento por API, webhook ou ações manuais.",
      },
      {
        icon: Gift,
        title: "Loja corporativa como camada de resgate",
        body:
          "Cada campanha pode publicar uma página de resgate com produtos selecionados para presentear colaboradores, times e parceiros com controle auditável do uso dos pontos.",
      },
      {
        icon: BellRing,
        title: "Comunicação e operação acopladas",
        body:
          "Landing page, banner, carteira, notificações e operação logística seguem a mesma regra para a campanha ir do lançamento até a entrega sem quebra de contexto.",
      },
    ],
    workflowTitle: "Como a 4unik opera uma campanha",
    workflow: [
      {
        title: "1. Crie a campanha e a página de resgate",
        body: "Defina o objetivo da ação, quem participa e publique uma experiência própria para hackathon, desafio, reconhecimento ou meta.",
      },
      {
        title: "2. Configure regras e comunicação",
        body: "Personalize identidade, mensagem, vigência, critérios de pontuação e como os participantes verão a campanha.",
      },
      {
        title: "3. Distribua pontos e abra o catálogo",
        body: "Associe produtos, limites e lógica de distribuição para que os participantes possam acumular benefícios e resgatar na loja corporativa.",
      },
      {
        title: "4. Acompanhe resgates até a entrega",
        body: "O gestor acompanha adesão, carteira, pedidos e fulfillment, enquanto a 4unik sustenta a operação até a conclusão dos envios.",
      },
    ],
    galleryTitle: "Telas reais da jornada de campanha",
    gallery: [
      {
        src: "/screens/admin-campaign-config-desktop.webp",
        alt: "Tela de identidade de campanha",
        caption: "Criação da página de campanha com identidade, slug, tema visual e preview em tempo real.",
      },
      {
        src: "/screens/admin-campaign-products.webp",
        alt: "Tela de seleção de produtos para campanha",
        caption: "Curadoria do catálogo que abastece a página de resgate daquela campanha.",
      },
      {
        src: "/screens/admin-campaign-config-mobile.webp",
        alt: "Preview mobile da campanha",
        caption: "Preview mobile da experiência final antes da campanha entrar no ar para os participantes.",
      },
    ],
    ctaTitle: "Quer ativar campanhas e resgates com operação fim a fim?",
    ctaBody:
      "A 4unik une motor de regras, loja corporativa, carteira, pedidos e fulfillment para que sua ação saia do briefing e chegue até o resgate e a entrega sem fricção.",
    primaryCtaLabel: "Solicitar demonstração",
    primaryCtaHref: "https://calendly.com/yoobeco/demo",
    secondaryCtaLabel: "Ver plataforma completa",
    secondaryCtaHref: "/plataforma",
    backLabel: "Voltar para plataforma",
    backHref: "/plataforma",
  },
  wallets: {
    seo: {
      title: "Controle de Carteiras (Wallets) | 4unik",
      description:
        "Saldo, extrato, resgates e governança de pontos em uma carteira auditável para programas de engajamento, campanhas e recompensas.",
    },
    badge: "Controle de Carteiras (Wallets)",
    title: "Participantes acompanham",
    highlight: "pontos, resgates e saldo em uma carteira auditável.",
    description:
      "Na 4unik, funcionários e participantes de campanhas de engajamento consultam saldo, verificam extrato, acompanham pedidos e usam pontos dentro da loja corporativa com total rastreabilidade. A wallet também pode receber dados de ferramentas externas de gamificação, mantendo o uso dos pontos auditável do crédito ao resgate.",
    imageSrc: "/screens/member-points.webp",
    imageAlt: "Histórico de pontos na carteira do colaborador",
    stats: [
      {
        label: "Saldo em tempo real",
        value: "Consulta imediata",
        detail: "Participantes acompanham pontos, saldo e movimentações assim que campanhas e ajustes são processados.",
      },
      {
        label: "Rastreabilidade",
        value: "100%",
        detail: "Cada crédito, débito e resgate mostra motivo, data, tipo de transação e saldo posterior.",
      },
      {
        label: "Integração de jornada",
        value: "Wallet + loja",
        detail: "A carteira conversa com catálogo, pedidos e integrações externas no mesmo fluxo auditável.",
      },
    ],
    capabilitiesTitle: "O que a carteira resolve",
    capabilities: [
      {
        icon: Wallet,
        title: "Consulta clara para o participante",
        body:
          "Colaboradores e participantes visualizam saldo atual, total ganho, total gasto e histórico de pontos em uma interface familiar e pronta para uso.",
      },
      {
        icon: Coins,
        title: "Pontos conectados às campanhas",
        body:
          "A 4unik registra bônus, reconhecimento, metas batidas, ajustes operacionais e consumo na loja corporativa com contexto completo de origem e uso.",
      },
      {
        icon: ShieldCheck,
        title: "Uso auditável dos pontos",
        body:
          "RH, marketing e operação conseguem auditar a jornada do crédito ao resgate, validar políticas e eliminar reconciliações manuais.",
      },
      {
        icon: CreditCard,
        title: "Integração com loja e ferramentas externas",
        body:
          "A wallet se conecta ao catálogo, checkout, pedidos e também a outras plataformas de gamificação e engajamento que precisem enviar ou consumir pontos.",
      },
    ],
    workflowTitle: "Como a wallet opera na prática",
    workflow: [
      {
        title: "1. Ganhe pontos na ação certa",
        body: "Os pontos entram por campanha, meta, reconhecimento, integração externa ou ajuste manual com motivo registrado.",
      },
      {
        title: "2. Consulte carteira e extrato",
        body: "O participante acompanha saldo, histórico e origem dos créditos antes de decidir como usar os pontos.",
      },
      {
        title: "3. Resgate na loja corporativa",
        body: "Os pontos são usados em produtos e experiências da loja, com débito auditável e conexão direta com o pedido.",
      },
      {
        title: "4. Acompanhe pedido e histórico",
        body: "Participantes e gestores visualizam pedido, extrato e status do resgate, enquanto a operação mantém governança fim a fim.",
      },
    ],
    galleryTitle: "Telas reais da experiência da wallet",
    gallery: [
      {
        src: "/screens/member-points.webp",
        alt: "Histórico de pontos do colaborador",
        caption: "Carteira com saldo, ganho, gasto e histórico por tipo de evento e campanha.",
      },
      {
        src: "/screens/member-orders.webp",
        alt: "Lista de pedidos do colaborador",
        caption: "Pedidos e resgates vinculados à wallet para acompanhar consumo e status da jornada.",
      },
      {
        src: "/screens/member-order-detail.webp",
        alt: "Detalhe do pedido resgatado",
        caption: "Detalhe logístico do resgate para fechar o ciclo entre pontos, loja corporativa e entrega.",
      },
    ],
    ctaTitle: "Quer uma wallet auditável e pronta para integração?",
    ctaBody:
      "A 4unik entrega uma wallet única para consulta, uso e auditoria de pontos dentro da loja corporativa e também como camada conectada a outras ferramentas de gamificação e engajamento.",
    primaryCtaLabel: "Falar com o time",
    primaryCtaHref: "https://wa.me/554187582060",
    secondaryCtaLabel: "Ver a plataforma",
    secondaryCtaHref: "/plataforma",
    backLabel: "Voltar para plataforma",
    backHref: "/plataforma",
  },
  manager: {
    seo: {
      title: "Painel do Gestor | 4unik",
      description:
        "Painel analítico para acompanhar campanhas, pedidos, usuários, produtos, estoque e performance operacional dentro da 4unik.",
    },
    badge: "Painel do Gestor",
    title: "O gestor enxerga a operação",
    highlight: "de ponta a ponta em um só painel.",
    description:
      "O painel do gestor da 4unik reúne performance da operação, catálogo, pedidos, campanhas, usuários e indicadores críticos em uma camada de comando pensada para RH, marketing, people ops e times administrativos.",
    imageSrc: "/screens/admin-dashboard.webp",
    imageAlt: "Dashboard administrativo da 4unik",
    stats: [
      {
        label: "Visão executiva",
        value: "360°",
        detail: "Pedidos, faturamento, estoque, usuários e campanhas em leitura única.",
      },
      {
        label: "Leitura operacional",
        value: "Em tempo real",
        detail: "Acompanhe gargalos, itens sem estoque e evolução de uso do programa.",
      },
      {
        label: "Tomada de decisão",
        value: "Mais rápida",
        detail: "Relatórios e alertas substituem gestão fragmentada entre planilhas e sistemas.",
      },
    ],
    capabilitiesTitle: "O que o painel concentra",
    capabilities: [
      {
        icon: LayoutDashboard,
        title: "Visão geral do programa",
        body:
          "KPIs de pedidos, faturamento, pontos distribuídos, pontos resgatados, estoque baixo e itens indisponíveis na mesma página.",
      },
      {
        icon: Radar,
        title: "Acompanhamento de campanhas",
        body:
          "O gestor navega entre campanhas, configurações, catálogo e validade com preview da experiência final antes da publicação.",
      },
      {
        icon: PackageCheck,
        title: "Operação e fulfillment",
        body:
          "Pedidos, envios, métodos logísticos, usuários e empresas ficam conectados ao fluxo do programa sem múltiplos painéis paralelos.",
      },
      {
        icon: ScanSearch,
        title: "Leitura analítica acionável",
        body:
          "A 4unik transforma volume operacional em sinais úteis para decidir mix de produtos, campanhas prioritárias e saúde da operação.",
      },
    ],
    workflowTitle: "Como o gestor usa o painel no dia a dia",
    workflow: [
      {
        title: "1. Monitora a saúde da operação",
        body: "Bate o olho no dashboard e identifica desvios em pedidos, catálogo, estoque e engajamento.",
      },
      {
        title: "2. Ajusta campanhas e catálogo",
        body: "Revisa identidade, produtos, múltiplos resgates, vigência e regras sem sair da mesma estrutura.",
      },
      {
        title: "3. Acompanha execução",
        body: "Valida pedidos, visualiza usuários, envios e comportamento de resgate por período.",
      },
      {
        title: "4. Fecha o ciclo com dados",
        body: "Usa os indicadores para defender orçamento, priorizar ações e evoluir o programa com mais precisão.",
      },
    ],
    galleryTitle: "Telas reais do painel do gestor",
    gallery: [
      {
        src: "/screens/admin-dashboard.webp",
        alt: "Dashboard com indicadores operacionais",
        caption: "Dashboard com indicadores centrais para gestão contínua do programa.",
      },
      {
        src: "/screens/admin-campaign-identity.webp",
        alt: "Tela de identidade da campanha",
        caption: "Criação e edição da camada visual da campanha com preview imediato.",
      },
      {
        src: "/screens/admin-campaign-products.webp",
        alt: "Tela de produtos da campanha",
        caption: "Gestão do catálogo da campanha com busca, seleção e apoio de IA.",
      },
    ],
    ctaTitle: "Quer visibilidade real sobre campanhas, pedidos e catálogo?",
    ctaBody:
      "Com a 4unik, o gestor deixa de navegar entre sistemas isolados e passa a operar o programa inteiro a partir de um centro de comando único.",
    primaryCtaLabel: "Agendar demonstração",
    primaryCtaHref: "https://calendly.com/yoobeco/demo",
    secondaryCtaLabel: "Explorar a plataforma",
    secondaryCtaHref: "/plataforma",
    backLabel: "Voltar para plataforma",
    backHref: "/plataforma",
  },
  loja: {
    seo: {
      title: "Loja Corporativa | 4Unik",
      description:
        "A loja corporativa da 4Unik permite que colaboradores escolham o próprio prêmio em um catálogo white-label — resgate de pontos, checkout e entrega gerenciados ponta a ponta.",
    },
    badge: "Plataforma · Loja Corporativa",
    title: "A loja de recompensas onde o colaborador",
    highlight: "escolhe o próprio prêmio.",
    description:
      "Uma vitrine totalmente white-label conectada ao seu programa de pontos. Colaboradores navegam pelo catálogo, resgatam pontos e recebem prêmios físicos ou digitais — sem nenhuma operação manual do RH.",
    imageSrc: "/loja-corporativa/store-home.webp",
    imageAlt: "Home da loja corporativa 4Unik — catálogo com produtos em 4Ucoins",
    stats: [
      {
        label: "Catálogo",
        value: "Ilimitado",
        detail: "Produtos físicos, digitais, experiências e kits personalizados.",
      },
      {
        label: "Checkout",
        value: "Automatizado",
        detail: "Pontos debitados no pedido; frete calculado em tempo real.",
      },
      {
        label: "Entrega",
        value: "Global",
        detail: "Fulfillment 4Unik ou integração via API com seu ERP e transportadora.",
      },
    ],
    capabilitiesTitle: "O que a loja entrega",
    capabilities: [
      {
        icon: ShoppingBag,
        title: "Catálogo configurável",
        body: "Adicione produtos físicos, vouchers digitais, kits e experiências. Filtre por categoria, tag ou campanha para controlar o que cada colaborador vê.",
      },
      {
        icon: Gift,
        title: "Wizard de presentes para gestores",
        body: "O RH define o presente (nome, produtos, destinatários) em quatro passos e agenda o envio. Sem planilhas, sem e-mails — só clicar e enviar.",
      },
      {
        icon: CreditCard,
        title: "Checkout 100% em pontos",
        body: "Colaboradores pagam com o saldo acumulado. Pagamento misto (pontos + dinheiro) pode ser habilitado por campanha.",
      },
      {
        icon: Truck,
        title: "Logística integrada",
        body: "Acompanhe cada pedido no painel de admin. Use o fulfillment 4Unik ou conecte seu ERP e transportadora via API.",
      },
      {
        icon: Tag,
        title: "Variantes e SKUs",
        body: "Tamanhos, cores e bundles são gerenciados nativamente. Estoque e disponibilidade atualizam em tempo real.",
      },
      {
        icon: Filter,
        title: "Segmentação e campanhas",
        body: "Restrinja itens do catálogo a grupos específicos de colaboradores ou campanhas. Controle o que aparece, quando e para quem.",
      },
    ],
    workflowTitle: "Como funciona um resgate",
    workflow: [
      {
        title: "1. Acumula pontos",
        body: "Reconhecimentos (shoutouts, badges, metas) creditam o saldo do colaborador automaticamente.",
      },
      {
        title: "2. Navega na loja",
        body: "O colaborador abre a loja corporativa da empresa, filtra o catálogo e lê os detalhes do produto.",
      },
      {
        title: "3. Finaliza o pedido",
        body: "Os pontos são debitados no checkout; endereço e método de envio são confirmados.",
      },
      {
        title: "4. Recebe o prêmio",
        body: "O item é enviado para o endereço do colaborador via fulfillment 4Unik ou parceiro de logística.",
      },
    ],
    galleryTitle: "A loja em ação",
    gallery: [
      {
        src: "/loja-corporativa/product-detail.webp",
        alt: "Página de produto — Alexa Echo Dot 5 em 4Ucoins",
        caption: "Páginas de produto mostram preço em pontos, estoque, descrição e condições de entrega.",
      },
      {
        src: "/loja-corporativa/cart.webp",
        alt: "Carrinho com dois itens e resumo do pedido",
        caption: "O carrinho exibe itens, subtotal em pontos e estimativa de frete.",
      },
      {
        src: "/loja-corporativa/gift-wizard-review.webp",
        alt: "Revisão do wizard de presente — nome, 2 produtos, 2 destinatários",
        caption: "Gestores revisam o presente antes de salvar. O agendamento do envio é opcional.",
      },
    ],
    ctaTitle: "Pronto para lançar a loja da sua empresa?",
    ctaBody:
      "Agende uma conversa e veja como a 4Unik transforma o seu programa de reconhecimento numa loja que os colaboradores realmente usam.",
    primaryCtaLabel: "Agendar demonstração",
    primaryCtaHref: "https://calendly.com/yoobeco/demo",
    secondaryCtaLabel: "Explorar a plataforma",
    secondaryCtaHref: "/plataforma/",
    backLabel: "Voltar para plataforma",
    backHref: "/plataforma/",
  },
};

export const enPlatformFeaturePages: Record<PlatformFeaturePageKey, PlatformFeaturePageContent> = {
  motor: {
    seo: {
      title: "Gamification Engine | 4unik",
      description:
        "Campaigns, rules, scoring, and integrations that turn business goals into recognition experiences inside 4unik.",
    },
    badge: "Gamification engine",
    title: "4unik connects goals,",
    highlight: "redemptions, and engagement in one operation.",
    description:
      "4unik can run as your native gamification and engagement layer or connect to external engagement platforms. It turns the corporate store into an auditable redemption layer for teams, employees, and partners while campaign-specific landing pages support hackathons, internal challenges, recognition programs, onboarding, and performance goals.",
    imageSrc: "/screens/admin-campaign-config-desktop.webp",
    imageAlt: "4unik campaign setup screen",
    stats: [
      {
        label: "Campaign launch",
        value: "24h",
        detail: "Redemption landing pages, products, and rules go live through a guided publishing flow.",
      },
      {
        label: "Flexible engine",
        value: "Native or integrated",
        detail: "Use 4unik as the core engine or connect external gamification and engagement stacks.",
      },
      {
        label: "Redemption operations",
        value: "End to end",
        detail: "Wallet, catalog, orders, and fulfillment stay connected throughout the experience.",
      },
    ],
    capabilitiesTitle: "What the engine delivers",
    capabilities: [
      {
        icon: Target,
        title: "Campaigns for real business actions",
        body:
          "Model hackathons, internal challenges, onboarding flows, incentive pushes, and recurring engagement programs with their own timing, audience, page, and rewards.",
      },
      {
        icon: GitBranch,
        title: "Native engine or external integrations",
        body:
          "Use the native 4unik gamification system or connect external engagement platforms, CRM, HRIS, and other event sources through APIs, webhooks, and manual actions.",
      },
      {
        icon: Gift,
        title: "Corporate store as the redemption layer",
        body:
          "Each campaign can publish its own redemption page with curated products for employees, teams, and partners, with auditable points usage.",
      },
      {
        icon: BellRing,
        title: "Messaging and operations in one flow",
        body:
          "Landing page, banner, wallet, notifications, and logistics stay aligned so campaigns move from launch to delivery without fragmented operations.",
      },
    ],
    workflowTitle: "How 4unik runs a campaign",
    workflow: [
      {
        title: "1. Create the campaign and redemption page",
        body: "Define the objective, target audience, and the dedicated experience for hackathons, recognition actions, internal challenges, or goal-based programs.",
      },
      {
        title: "2. Configure rules and messaging",
        body: "Set identity, communication, timing, and point rules so participants understand the action and how rewards will work.",
      },
      {
        title: "3. Open the catalog and distribute value",
        body: "Attach products, limits, and distribution logic so participants can earn benefits and redeem through the corporate store.",
      },
      {
        title: "4. Track redemptions through delivery",
        body: "Managers monitor adoption, balances, orders, and fulfillment while 4unik supports the operation through the final delivery step.",
      },
    ],
    galleryTitle: "Real campaign workflow screens",
    gallery: [
      {
        src: "/screens/admin-campaign-config-desktop.webp",
        alt: "Campaign identity screen",
        caption: "Campaign page creation with identity, slug, visual theme, and live preview.",
      },
      {
        src: "/screens/admin-campaign-products.webp",
        alt: "Campaign product selection screen",
        caption: "Catalog curation for the specific redemption page tied to the campaign.",
      },
      {
        src: "/screens/admin-campaign-config-mobile.webp",
        alt: "Mobile preview of the campaign",
        caption: "Mobile preview of the final participant experience before publishing.",
      },
    ],
    ctaTitle: "Need campaigns and redemptions with end-to-end operations?",
    ctaBody:
      "4unik combines rules, wallet, corporate store, orders, and fulfillment so your action can move from idea to redemption and delivery without operational gaps.",
    primaryCtaLabel: "Request a demo",
    primaryCtaHref: "https://calendly.com/yoobeco/demo",
    secondaryCtaLabel: "View full platform",
    secondaryCtaHref: "/plataforma",
    backLabel: "Back to platform",
    backHref: "/plataforma",
  },
  wallets: {
    seo: {
      title: "Wallet Control | 4unik",
      description:
        "Balance, statements, redemptions, and points governance in an auditable wallet built for engagement campaigns and reward programs.",
    },
    badge: "Wallet control",
    title: "Participants track",
    highlight: "points, redemptions, and balance in one auditable wallet.",
    description:
      "In 4unik, employees and campaign participants can review balances, check point history, follow redemptions, and use points inside the corporate store with full traceability. The wallet can also receive data from external gamification tools while keeping point usage auditable from credit to redemption.",
    imageSrc: "/screens/member-points.webp",
    imageAlt: "Employee wallet points history",
    stats: [
      {
        label: "Live balance",
        value: "Instant visibility",
        detail: "Participants see balances and point movements as soon as campaigns, integrations, and adjustments are processed.",
      },
      {
        label: "Traceability",
        value: "100%",
        detail: "Every credit, debit, and redemption shows the reason, type, date, and resulting balance.",
      },
      {
        label: "Journey integration",
        value: "Wallet + store",
        detail: "The wallet stays connected to the catalog, orders, and external engagement systems in one auditable flow.",
      },
    ],
    capabilitiesTitle: "What the wallet solves",
    capabilities: [
      {
        icon: Wallet,
        title: "Clear participant view",
        body:
          "Employees and campaign participants can track current balance, total earned, total spent, and transaction history in a familiar interface.",
      },
      {
        icon: Coins,
        title: "Points tied to campaigns and actions",
        body:
          "4unik records campaign bonuses, recognition points, goal achievements, order usage, and operational adjustments with full traceability.",
      },
      {
        icon: ShieldCheck,
        title: "Auditable point usage",
        body:
          "Managers can audit the full path from credit to redemption, validate policies, and eliminate manual reconciliation work.",
      },
      {
        icon: CreditCard,
        title: "Store and external tool integrations",
        body:
          "The wallet connects to the catalog, checkout, orders, and external gamification tools that need to send or consume points.",
      },
    ],
    workflowTitle: "How the wallet operates day to day",
    workflow: [
      {
        title: "1. Earn points in the right moment",
        body: "Points enter through campaigns, goal completion, recognition, external integrations, or manual adjustments with clear attribution.",
      },
      {
        title: "2. Review wallet and statement",
        body: "Participants check balances, point history, and the origin of each credit before using them.",
      },
      {
        title: "3. Redeem through the corporate store",
        body: "Points are used on products and experiences in the store, with an auditable debit connected directly to the order.",
      },
      {
        title: "4. Track orders and history",
        body: "Participants and managers follow the order, the statement, and redemption status while operations maintain governance end to end.",
      },
    ],
    galleryTitle: "Real wallet experience screens",
    gallery: [
      {
        src: "/screens/member-points.webp",
        alt: "Employee points history",
        caption: "Wallet history with current balance, earned points, spent points, and classified campaign events.",
      },
      {
        src: "/screens/member-orders.webp",
        alt: "Employee orders list",
        caption: "Orders and redemptions connected to the wallet so users can understand spend and status.",
      },
      {
        src: "/screens/member-order-detail.webp",
        alt: "Redeemed order detail",
        caption: "Logistics detail closes the loop between points, the corporate store, and delivery.",
      },
    ],
    ctaTitle: "Need an auditable wallet ready for integrations?",
    ctaBody:
      "4unik gives you one wallet layer for checking, spending, and auditing points inside the corporate store and across external engagement and gamification tools.",
    primaryCtaLabel: "Talk to the team",
    primaryCtaHref: "https://wa.me/554187582060",
    secondaryCtaLabel: "View the platform",
    secondaryCtaHref: "/plataforma",
    backLabel: "Back to platform",
    backHref: "/plataforma",
  },
  manager: {
    seo: {
      title: "Manager Dashboard | 4unik",
      description:
        "Analytics and operations dashboard for campaigns, orders, users, products, stock, and program performance inside 4unik.",
    },
    badge: "Manager dashboard",
    title: "Managers see the operation",
    highlight: "end to end in one dashboard.",
    description:
      "4unik brings program performance, catalog, orders, campaigns, users, and operational signals into one command layer built for HR, marketing, people ops, and admin teams.",
    imageSrc: "/screens/admin-dashboard.webp",
    imageAlt: "4unik admin dashboard",
    stats: [
      {
        label: "Executive visibility",
        value: "360°",
        detail: "Orders, revenue, stock, users, and campaigns in one view.",
      },
      {
        label: "Operational reading",
        value: "Real time",
        detail: "Spot bottlenecks, stock issues, and engagement movement as it happens.",
      },
      {
        label: "Decision speed",
        value: "Higher",
        detail: "Reports and alerts replace fragmented control across systems and spreadsheets.",
      },
    ],
    capabilitiesTitle: "What the dashboard centralizes",
    capabilities: [
      {
        icon: LayoutDashboard,
        title: "Program overview",
        body:
          "KPIs for orders, revenue, distributed points, redeemed points, low stock, and unavailable items live in the same interface.",
      },
      {
        icon: Radar,
        title: "Campaign oversight",
        body:
          "Managers move through campaigns, settings, catalog, and validity with preview of the final experience before publishing.",
      },
      {
        icon: PackageCheck,
        title: "Operations and fulfillment",
        body:
          "Orders, shipping, logistics methods, users, and companies stay connected to the reward program without multiple disconnected panels.",
      },
      {
        icon: ScanSearch,
        title: "Actionable analytics",
        body:
          "4unik converts operational volume into signals that help teams decide on product mix, campaign priority, and program health.",
      },
    ],
    workflowTitle: "How managers use the dashboard",
    workflow: [
      {
        title: "1. Monitor program health",
        body: "Open the dashboard and identify drift in orders, catalog, stock, and engagement.",
      },
      {
        title: "2. Adjust campaigns and catalog",
        body: "Review identity, products, multiple redemptions, validity, and rules in the same structure.",
      },
      {
        title: "3. Track execution",
        body: "Validate orders, inspect users, shipments, and redemption behavior by date range.",
      },
      {
        title: "4. Close the loop with data",
        body: "Use the indicators to defend budgets, prioritize actions, and improve the program.",
      },
    ],
    galleryTitle: "Real manager dashboard screens",
    gallery: [
      {
        src: "/screens/admin-dashboard.webp",
        alt: "Dashboard with core metrics",
        caption: "Dashboard with the operating metrics that matter most to program owners.",
      },
      {
        src: "/screens/admin-campaign-identity.webp",
        alt: "Campaign identity screen",
        caption: "Create and edit the visual layer of each campaign with immediate preview.",
      },
      {
        src: "/screens/admin-campaign-products.webp",
        alt: "Campaign product selection",
        caption: "Manage the campaign catalog with search, selection, and AI assistance.",
      },
    ],
    ctaTitle: "Need real visibility into campaigns, orders, and catalog?",
    ctaBody:
      "With 4unik, managers stop bouncing between disconnected tools and run the whole program from one control center.",
    primaryCtaLabel: "Book a demo",
    primaryCtaHref: "https://calendly.com/yoobeco/demo",
    secondaryCtaLabel: "Explore the platform",
    secondaryCtaHref: "/plataforma",
    backLabel: "Back to platform",
    backHref: "/plataforma",
  },
  loja: {
    seo: {
      title: "Corporate store | 4Unik",
      description:
        "A 4Unik corporate store lets employees choose their own reward from a fully branded catalog — points redemption, checkout, and delivery handled end to end.",
    },
    badge: "Platform · Corporate Store",
    title: "The reward store where employees",
    highlight: "choose their own prize.",
    description:
      "A fully white-labeled storefront connected to your points program. Employees browse the catalog, redeem points, and receive physical or digital rewards — without any manual work from HR.",
    imageSrc: "/loja-corporativa/store-home.webp",
    imageAlt: "4Unik corporate store home — catalog with products priced in 4Ucoins",
    stats: [
      {
        label: "Catalog",
        value: "Unlimited",
        detail: "Physical products, digital items, experiences, and branded kits.",
      },
      {
        label: "Checkout",
        value: "Automated",
        detail: "Points deducted automatically; shipping calculated at order time.",
      },
      {
        label: "Delivery",
        value: "Global",
        detail: "4Unik fulfillment or API integration with your own ERP and carrier.",
      },
    ],
    capabilitiesTitle: "What the store delivers",
    capabilities: [
      {
        icon: ShoppingBag,
        title: "Configurable catalog",
        body: "Add physical products, digital vouchers, branded kits, or experiences. Filter by category, tag, or campaign to control what each employee sees.",
      },
      {
        icon: Gift,
        title: "Gift wizard for managers",
        body: "HR defines a gift (name, products, recipients) in four steps and schedules delivery. No spreadsheets, no emails — just click and ship.",
      },
      {
        icon: CreditCard,
        title: "Points-only checkout",
        body: "Employees pay entirely with their earned balance. Optional mixed payment (points + money) can be enabled per campaign.",
      },
      {
        icon: Truck,
        title: "Integrated logistics",
        body: "Track every order from the admin panel. Use 4Unik fulfillment or connect your ERP and carrier stack via API.",
      },
      {
        icon: Tag,
        title: "Product variants and SKUs",
        body: "Sizes, colors, and bundles are handled natively. Stock levels and availability update in real time.",
      },
      {
        icon: Filter,
        title: "Segmentation and campaigns",
        body: "Restrict catalog items to specific employee groups or campaigns. Control what is visible, when, and to whom.",
      },
    ],
    workflowTitle: "How a redemption works",
    workflow: [
      {
        title: "Earn points",
        body: "Recognition events (shoutouts, badges, goals) credit the employee's balance automatically.",
      },
      {
        title: "Browse the store",
        body: "Employee opens the branded store, filters the catalog, and reads product details.",
      },
      {
        title: "Complete checkout",
        body: "Points are deducted at checkout; address and shipping method are confirmed.",
      },
      {
        title: "Receive the reward",
        body: "The item ships to the employee's door via 4Unik fulfillment or your logistics partner.",
      },
    ],
    galleryTitle: "The store in action",
    gallery: [
      {
        src: "/loja-corporativa/product-detail.webp",
        alt: "Product page showing Alexa Echo Dot 5 priced in 4Ucoins",
        caption: "Product pages show price in points, stock, description, and delivery conditions.",
      },
      {
        src: "/loja-corporativa/cart.webp",
        alt: "Cart with two items and order summary",
        caption: "The cart shows item breakdown, subtotal in points, and shipping estimate.",
      },
      {
        src: "/loja-corporativa/gift-wizard-review.webp",
        alt: "Gift wizard review step — name, 2 products, 2 recipients",
        caption: "Managers review the gift before saving. Scheduling is optional.",
      },
    ],
    ctaTitle: "Ready to launch your company's reward store?",
    ctaBody:
      "Book a call and see how 4Unik turns your recognition program into a store employees actually love using.",
    primaryCtaLabel: "Book a demo",
    primaryCtaHref: "https://calendly.com/yoobeco/demo",
    secondaryCtaLabel: "Explore the platform",
    secondaryCtaHref: "/en/plataforma/",
    backLabel: "Back to platform",
    backHref: "/en/plataforma/",
  },
};
