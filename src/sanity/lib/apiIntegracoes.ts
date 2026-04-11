import type { Locale } from "@/lib/locale";
import type { ResolvedApiIntegracoesContent } from "@/sanity/lib/types";

const fallbackByLocale: Record<Locale, ResolvedApiIntegracoesContent> = {
  pt: {
    seo: {
      title: "API e Integrações | 4unik",
      description:
        "API REST, webhooks e integrações para recompensas corporativas, catálogo e fulfillment na plataforma 4unik.",
      openGraphDescription:
        "API REST, webhooks e integrações para recompensas corporativas, catálogo e fulfillment.",
    },
    hero: {
      badge: "API RESTful + SDK + Webhooks",
      title: "API para recompensas, fulfillment e experiência corporativa",
      description:
        "API RESTful com Webhooks em tempo real, Sandbox para testes e SDKs para Node.js e Python. Endpoints dedicados para produtos, estoque, checkout e histórico de resgates.",
      primaryCtaLabel: "Ler a Documentação",
      primaryCtaHref: "#docs",
      secondaryCtaLabel: "Falar com Engenharia",
      secondaryCtaHref: "https://calendly.com/yoobeco/demo",
      codeWindowTitle: "issue_points.ts",
      codeSnippet: `POST /v2/api/integrations/rewards HTTP/1.1
Host: api.4unik.yoobe.co
Authorization: Bearer sec_tok_4Uxxxxxxxxx

{
  "user_identifier": "colab@suaempresa.com",
  "points_amount": 1000,
  "campaign_internal_id": "meta_q4_vendas",
  "trigger_notification": true
}`,
    },
    features: {
      title: "{ Arquitetura_Moderna }",
      description: "Design principles orientados ao desenvolvedor. Construída para não quebrar.",
      items: [
        {
          title: "Webhooks em Tempo Real",
          description:
            "Assine eventos como 'colaborador_reconhecido' ou 'meta_batida' e atualize seus dashboards em milissegundos.",
          icon: "plugZap",
          colSpan: "md:col-span-2",
        },
        {
          title: "Autenticação OAuth / Bearer",
          description:
            "Segurança enterprise-grade para integrações M2M (Machine to Machine) e Single Sign-On (SAML).",
          icon: "shieldCheck",
          colSpan: "md:col-span-1",
        },
        {
          title: "Sandbox Developer",
          description:
            "Ambiente dev.4unik para testar emissão de pontos e resgates sem gastar orçamento real do RH.",
          icon: "box",
          colSpan: "md:col-span-1",
        },
        {
          title: "SDKs Prontos",
          description:
            "Bibliotecas oficiais para Node.js e Python. Acelere o desenvolvimento com tipagem estática.",
          icon: "cpu",
          colSpan: "md:col-span-2",
        },
        {
          title: "Rate Limits Inteligentes",
          description:
            "Arquitetura que escala automaticamente para suportar picos de campanhas sazonais e de fim de ano sem engasgos.",
          icon: "refreshCw",
          colSpan: "md:col-span-3",
        },
      ],
    },
    integrations: {
      badge: "Integrações Prontas",
      title: "Conectado às maiores",
      titleGradient: "plataformas",
      titleAfter: "do mundo",
      description:
        "API integrada com as principais plataformas de employee experience, comunicação interna e RH do mercado.",
      mainPlatforms: [
        {
          name: "Workvivo",
          by: "by Zoom",
          logo: "W",
          badge: "API Pronta",
          color: "from-blue-500/20",
          description:
            "Plataforma líder de comunicação interna e employee experience. Integre gamificação, reconhecimento e premiações diretamente ao feed social dos colaboradores.",
          features: [
            "Sincronização de usuários via API",
            "Webhooks para eventos em tempo real",
            "SSO via OAuth 2.0",
            "Notificações no feed Workvivo",
            "Integração com Google/Microsoft 365",
          ],
        },
        {
          name: "Beehome",
          by: "Employee Experience",
          logo: "B",
          badge: "API Pronta",
          color: "from-yellow-400/20",
          description:
            "Plataforma de endomarketing, comunicação e gestão de pessoas. Gamificação nativa com campanhas de reconhecimento e celebrações automáticas.",
          features: [
            "Gestão de usuários via Bearer Token",
            "Timeline e notificações integradas",
            "Campanhas de reconhecimento",
            "Celebrações de aniversários",
            "Pesquisas e feedback integrados",
          ],
        },
        {
          name: "Humand",
          by: "Corporate Super App",
          logo: "H",
          badge: "API Pronta",
          color: "from-yoobe-neon-pink/20",
          description:
            "App corporativo completo com comunicação, RH, reconhecimento e processos. API RESTful documentada com Swagger e webhooks em tempo real.",
          features: [
            "API RESTful com Swagger",
            "Webhooks em tempo real",
            "Recognition programs nativo",
            "Integração SAP, Workday",
            "Zapier para +5.000 apps",
          ],
        },
      ],
      extraIntegrations: [
        "Slack",
        "Microsoft Teams",
        "Workday",
        "BambooHR",
        "SAP SuccessFactors",
        "Gupy",
        "TOTVS",
        "Zapier",
        "Google Workspace",
        "Microsoft 365",
      ],
      extraIntegrationsLabel: "Também integramos com:",
    },
    modules: {
      badge: "Plataforma como um todo",
      titleBefore: "Logística, estoque, campanhas e",
      titleGradient: "eventos",
      titleAfter: "",
      description:
        "A API não é um add-on. Ela faz parte de uma operação SaaS complète de recompensas, brindes corporativos e premiações.",
      items: [
        {
          icon: "package",
          title: "Logística Integrada",
          description:
            "Rastreamento de envios, armazenagem e entregas em até 48h para todo o Brasil. Rastreio last-mile e SLA de entrega em um painel único.",
        },
        {
          icon: "lineChart",
          title: "Estoque e Catálogo",
          description:
            "+5.000 produtos, controle de disponibilidade, centros de custo e orçamentos. Portal de fornecedores e mix físico e digital.",
        },
        {
          icon: "target",
          title: "Campanhas e Gamificação",
          description:
            "Campanhas temporárias, pontuação peer-to-peer, badges e conversão de metas em pontos. Motor de premiações plugado ao seu RH.",
        },
        {
          icon: "gift",
          title: "Eventos e Kits",
          description:
            "Welcome kits, premiação, feiras e gifting corporativo. Kits personalizados com identidade da empresa e envio on-demand.",
        },
        {
          icon: "shoppingBag",
          title: "Loja e Resgate",
          description:
            "Loja multi-moeda, resgate com pontos, envio de presentes e produtos digitais. Experiência B2C para o colaborador.",
        },
        {
          icon: "lock",
          title: "Gestão e Segurança",
          description:
            "Dashboard analítico, SSO, LGPD, audit logs e permissões granulares. SAML/Active Directory, Okta e Google Workspace.",
        },
      ],
    },
    finalCta: {
      title: "<ReadyToBuild />",
      description:
        "Crie chaves de API restritas e acesse a documentação técnica interativa hospedada no Stoplight.",
      buttonLabel: "Gerar API Keys",
      buttonHref: "https://calendly.com/yoobeco/demo",
    },
  },
  en: {
    seo: {
      title: "API & Integrations | 4Unik",
      description:
        "REST API, webhooks, and integrations for corporate rewards, catalog, and fulfillment, aligned with the 4Unik platform.",
      openGraphDescription:
        "REST API, webhooks, and integrations for corporate rewards, catalog, and fulfillment.",
    },
    hero: {
      badge: "REST API + SDK + Webhooks",
      title: "API for rewards, fulfillment, and corporate experiences",
      description:
        "REST API with real-time webhooks, a testing sandbox, and SDKs for Node.js and Python. Dedicated endpoints for products, inventory, checkout, and redemption history.",
      primaryCtaLabel: "Read documentation",
      primaryCtaHref: "#docs",
      secondaryCtaLabel: "Talk to engineering",
      secondaryCtaHref: "https://calendly.com/yoobeco/demo",
      codeWindowTitle: "issue_points.ts",
      codeSnippet: `POST /v2/api/integrations/rewards HTTP/1.1
Host: api.4unik.yoobe.co
Authorization: Bearer sec_tok_4Uxxxxxxxxx

{
  "user_identifier": "employee@company.com",
  "points_amount": 1000,
  "campaign_internal_id": "q4_sales_goal",
  "trigger_notification": true
}`,
    },
    features: {
      title: "{ Modern_Architecture }",
      description: "Developer-first design principles built to stay reliable under load.",
      items: [
        {
          title: "Real-time webhooks",
          description:
            "Subscribe to events like 'employee_rewarded' or 'goal_hit' and update your dashboards in milliseconds.",
          icon: "plugZap",
          colSpan: "md:col-span-2",
        },
        {
          title: "OAuth / Bearer authentication",
          description:
            "Enterprise-grade security for machine-to-machine integrations and SSO-ready enterprise flows.",
          icon: "shieldCheck",
          colSpan: "md:col-span-1",
        },
        {
          title: "Developer sandbox",
          description:
            "A dev environment to test point issuance and redemptions without using real HR budget.",
          icon: "box",
          colSpan: "md:col-span-1",
        },
        {
          title: "Ready-to-use SDKs",
          description:
            "Official libraries for Node.js and Python so engineering teams can move faster with typed integrations.",
          icon: "cpu",
          colSpan: "md:col-span-2",
        },
        {
          title: "Smart rate limits",
          description:
            "An architecture that scales for seasonal campaign spikes and year-end peaks without stalling.",
          icon: "refreshCw",
          colSpan: "md:col-span-3",
        },
      ],
    },
    integrations: {
      badge: "Ready integrations",
      title: "Connected to the leading",
      titleGradient: "platforms",
      titleAfter: "worldwide",
      description:
        "An API layer connected to leading employee experience, internal communication, and HR platforms.",
      mainPlatforms: [
        {
          name: "Workvivo",
          by: "by Zoom",
          logo: "W",
          badge: "Ready API",
          color: "from-blue-500/20",
          description:
            "A leading employee communication and experience platform. Connect gamification, recognition, and rewards directly into the employee social feed.",
          features: [
            "User sync through API",
            "Real-time event webhooks",
            "OAuth 2.0 SSO",
            "Notifications inside the Workvivo feed",
            "Google / Microsoft 365 integration",
          ],
        },
        {
          name: "Beehome",
          by: "Employee Experience",
          logo: "B",
          badge: "Ready API",
          color: "from-yellow-400/20",
          description:
            "An internal communication and people management platform with native gamification, recognition campaigns, and automated celebrations.",
          features: [
            "User management via Bearer token",
            "Integrated timeline and notifications",
            "Recognition campaigns",
            "Birthday celebrations",
            "Integrated surveys and feedback",
          ],
        },
        {
          name: "Humand",
          by: "Corporate Super App",
          logo: "H",
          badge: "Ready API",
          color: "from-yoobe-neon-pink/20",
          description:
            "A corporate super app with communication, HR, recognition, and workflows. Includes documented REST APIs and real-time webhooks.",
          features: [
            "Swagger-based REST API",
            "Real-time webhooks",
            "Native recognition programs",
            "SAP and Workday integrations",
            "Zapier for 5,000+ apps",
          ],
        },
      ],
      extraIntegrations: [
        "Slack",
        "Microsoft Teams",
        "Workday",
        "BambooHR",
        "SAP SuccessFactors",
        "Gupy",
        "TOTVS",
        "Zapier",
        "Google Workspace",
        "Microsoft 365",
      ],
      extraIntegrationsLabel: "We also integrate with:",
    },
    modules: {
      badge: "Platform end-to-end",
      titleBefore: "Logistics, inventory, campaigns, and",
      titleGradient: "events",
      titleAfter: "",
      description:
        "The API is not an add-on. It is part of a broader SaaS operation for rewards, corporate gifting, and recognition workflows.",
      items: [
        {
          icon: "package",
          title: "Integrated logistics",
          description:
            "Shipment tracking, warehousing, and delivery operations with a single operational view.",
        },
        {
          icon: "lineChart",
          title: "Inventory and catalog",
          description:
            "5,000+ products, availability controls, cost centers, budgets, and supplier-side catalog operations.",
        },
        {
          icon: "target",
          title: "Campaigns and gamification",
          description:
            "Time-bound campaigns, peer-to-peer scoring, badges, and goal-to-points conversion connected to HR workflows.",
        },
        {
          icon: "gift",
          title: "Events and kits",
          description:
            "Welcome kits, recognition kits, events, and gifting workflows with branded, on-demand fulfillment.",
        },
        {
          icon: "shoppingBag",
          title: "Store and redemption",
          description:
            "Multi-currency store, point redemption, gift delivery, and digital products with a B2C-like employee experience.",
        },
        {
          icon: "lock",
          title: "Management and security",
          description:
            "Analytical dashboards, SSO, privacy controls, audit logs, and granular permissions across teams.",
        },
      ],
    },
    finalCta: {
      title: "<ReadyToBuild />",
      description:
        "Create scoped API keys and access the interactive technical documentation hosted on Stoplight.",
      buttonLabel: "Generate API keys",
      buttonHref: "https://calendly.com/yoobeco/demo",
    },
  },
};

export async function getResolvedApiIntegracoesContent(
  locale: Locale,
): Promise<ResolvedApiIntegracoesContent> {
  return fallbackByLocale[locale];
}
