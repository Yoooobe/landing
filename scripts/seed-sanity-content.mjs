import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createClient } from "@sanity/client";
import { seedDocuments } from "./sanity-seed-data.mjs";
import {
  apiIntegracoesPayloadEn,
  buildCurrentEnglishBlogPosts,
  buildCurrentEnglishMarketingPages,
  buildCurrentEnglishMenus,
  buildSegmentRoutePayload,
  gamificacaoPayloadEn,
  homePayloadEn,
} from "./sync-sanity-en-content.mjs";

const ROOT_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const ENV_FILE = path.join(ROOT_DIR, ".env.local");
const SANITY_CONFIG_FILE = path.join(os.homedir(), ".config", "sanity", "config.json");
const MESSAGE_SEGMENTS_DIR = path.join(ROOT_DIR, "src", "messages", "segments");

const extraMirrorSources = [
  {
    area: "special-content",
    locale: "global",
    relativePath: "src/content/workvivo.ts",
    summary: "Conteudo especial da landing Workvivo em PT e EN.",
    title: "Workvivo content",
  },
  {
    area: "page-copy",
    locale: "pt",
    relativePath: "src/components/ApiIntegracoesPageSections.tsx",
    summary: "Secao final da pagina API e Integracoes com CTA e copy hardcoded.",
    title: "API Integracoes page sections",
  },
  {
    area: "metadata",
    locale: "pt",
    relativePath: "src/app/(pt)/api-integracoes/page.tsx",
    summary: "Metadata hardcoded da pagina API e Integracoes em portugues.",
    title: "API Integracoes metadata PT",
  },
  {
    area: "metadata",
    locale: "en",
    relativePath: "src/app/(en)/en/api-integracoes/page.tsx",
    summary: "Metadata hardcoded da pagina API e Integrations em ingles.",
    title: "API Integrations metadata EN",
  },
];

const homePayloadByLocale = {
  pt: {
    seo: {
      title: "4Unik - Reward Infrastructure | Gamificacao e Recompensas",
      description:
        "Infraestrutura de recompensas para plataformas de gamificacao e employee engagement. API, catalogo e fulfillment em um so lugar.",
    },
    hero: {
      badge: "Plataforma de Engajamento Corporativo",
      brand: "4unik",
      afterBrand: "conecta",
      line1b: "engajamento,",
      line2: "recompensas e logistica",
      sub:
        "A plataforma que transforma o dia a dia do seu time. Crie campanhas, gamifique resultados e entregue premios fisicos na porta da casa de cada colaborador, sem dar dor de cabeca para o RH.",
      ctaDemo: "Agendar Demonstracao",
      ctaDemoHref: "https://calendly.com/yoobeco/demo",
      ctaExplore: "Explorar Beneficios",
      ctaExploreHref: "/#platform",
      floatAdhesion: "Adesao do Time",
      floatAdhesionValue: "92%",
      floatAdhesionSub: "↑ Media nos primeiros 30 dias",
      floatRh: "Trabalho Manual do RH",
      floatRhValue: "0%",
      floatRhSub: "Nos cuidamos da logistica",
      floatEnps: "Satisfacao (eNPS)",
      floatEnpsValue: "+42 pts",
      floatEnpsSub: "Impacto direto no clima",
    },
    fourUnik: {
      kicker: "Complemento ao 4unik institucional",
      bodyBefore: "Em",
      brand: "4unik.com.br",
      bodyMid:
        "voce encontra o panorama de beneficios corporativos, logistica de recompensas e presenca da marca.",
      here: "Aqui",
      bodyAfter:
        "aprofundamos a plataforma: gamificacao, API, integracoes, catalogo e operacao para RH e squads tecnicos.",
      cta: "Ver oferta completa no site 4unik",
      ctaHref: "https://4unik.com.br",
    },
    trust: {
      title: "Empresas que confiam na 4Unik",
    },
    showcaseMedia: {
      _type: "reference",
      _ref: "homeShowcaseMedia.home-default",
    },
    finalCta: {
      title: "Pronto para transformar o reconhecimento na sua empresa?",
      body:
        "Solicite uma demonstracao e veja como a 4Unik eleva o engajamento e a retencao do seu time.",
      demo: "Solicitar Demonstracao",
      demoHref: "https://calendly.com/yoobeco/demo",
      whatsapp: "Falar com Especialista",
      whatsappHref: "https://wa.me/554187582060",
    },
  },
  en: homePayloadEn(),
};

const apiIntegracoesPayloadByLocale = {
  pt: {
    seo: {
      title: "API e Integracoes | 4unik",
      description:
        "API REST, webhooks e integracoes para recompensas corporativas, catalogo e fulfillment na plataforma 4unik.",
      openGraphDescription:
        "API REST, webhooks e integracoes para recompensas corporativas, catalogo e fulfillment.",
    },
    hero: {
      badge: "API RESTful + SDK + Webhooks",
      title: "API para recompensas, fulfillment e experiencia corporativa",
      description:
        "API RESTful com Webhooks em tempo real, Sandbox para testes e SDKs para Node.js e Python. Endpoints dedicados para produtos, estoque, checkout e historico de resgates.",
      primaryCtaLabel: "Ler a Documentacao",
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
      description: "Design principles orientados ao desenvolvedor. Construida para nao quebrar.",
      items: [
        {
          title: "Webhooks em Tempo Real",
          description:
            "Assine eventos como 'colaborador_reconhecido' ou 'meta_batida' e atualize seus dashboards em milissegundos.",
          icon: "plugZap",
          colSpan: "md:col-span-2",
        },
        {
          title: "Autenticacao OAuth / Bearer",
          description:
            "Seguranca enterprise-grade para integracoes M2M (Machine to Machine) e Single Sign-On (SAML).",
          icon: "shieldCheck",
          colSpan: "md:col-span-1",
        },
        {
          title: "Sandbox Developer",
          description:
            "Ambiente dev.4unik para testar emissao de pontos e resgates sem gastar orcamento real do RH.",
          icon: "box",
          colSpan: "md:col-span-1",
        },
        {
          title: "SDKs Prontos",
          description:
            "Bibliotecas oficiais para Node.js e Python. Acelere o desenvolvimento com tipagem estatica.",
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
      badge: "Integracoes Prontas",
      title: "Conectado as maiores",
      titleGradient: "plataformas",
      titleAfter: "do mundo",
      description:
        "API integrada com as principais plataformas de employee experience, comunicacao interna e RH do mercado.",
      mainPlatforms: [
        {
          name: "Workvivo",
          by: "by Zoom",
          logo: "W",
          badge: "API Pronta",
          color: "from-blue-500/20",
          description:
            "Plataforma lider de comunicacao interna e employee experience. Integre gamificacao, reconhecimento e premiacoes diretamente ao feed social dos colaboradores.",
          features: [
            "Sincronizacao de usuarios via API",
            "Webhooks para eventos em tempo real",
            "SSO via OAuth 2.0",
            "Notificacoes no feed Workvivo",
            "Integracao com Google/Microsoft 365",
          ],
        },
        {
          name: "Beehome",
          by: "Employee Experience",
          logo: "B",
          badge: "API Pronta",
          color: "from-yellow-400/20",
          description:
            "Plataforma de endomarketing, comunicacao e gestao de pessoas. Gamificacao nativa com campanhas de reconhecimento e celebracoes automaticas.",
          features: [
            "Gestao de usuarios via Bearer Token",
            "Timeline e notificacoes integradas",
            "Campanhas de reconhecimento",
            "Celebracoes de aniversarios",
            "Pesquisas e feedback integrados",
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
      extraIntegrationsLabel: "Tambem integramos com:",
    },
    modules: {
      badge: "Plataforma como um todo",
      titleBefore: "Logistica, estoque, campanhas e",
      titleGradient: "eventos",
      titleAfter: "",
      description:
        "A API nao e um add-on. Ela faz parte de uma operacao SaaS complete de recompensas, brindes corporativos e premiacoes.",
      items: [
        {
          icon: "package",
          title: "Logistica Integrada",
          description:
            "Rastreamento de envios, armazenagem e entregas em ate 48h para todo o Brasil. Rastreio last-mile e SLA de entrega em um painel unico.",
        },
        {
          icon: "lineChart",
          title: "Estoque e Catalogo",
          description:
            "+5.000 produtos, controle de disponibilidade, centros de custo e orcamentos. Portal de fornecedores e mix fisico e digital.",
        },
        {
          icon: "target",
          title: "Campanhas e Gamificacao",
          description:
            "Campanhas temporarias, pontuacao peer-to-peer, badges e conversao de metas em pontos. Motor de premiacoes plugado ao seu RH.",
        },
        {
          icon: "gift",
          title: "Eventos e Kits",
          description:
            "Welcome kits, premiacao, feiras e gifting corporativo. Kits personalizados com identidade da empresa e envio on-demand.",
        },
        {
          icon: "shoppingBag",
          title: "Loja e Resgate",
          description:
            "Loja multi-moeda, resgate com pontos, envio de presentes e produtos digitais. Experiencia B2C para o colaborador.",
        },
        {
          icon: "lock",
          title: "Gestao e Seguranca",
          description:
            "Dashboard analitico, SSO, LGPD, audit logs e permissoes granulares. SAML/Active Directory, Okta e Google Workspace.",
        },
      ],
    },
    finalCta: {
      title: "<ReadyToBuild />",
      description:
        "Crie chaves de API restritas e acesse a documentacao tecnica interativa hospedada no Stoplight.",
      buttonLabel: "Gerar API Keys",
      buttonHref: "https://calendly.com/yoobeco/demo",
    },
  },
  en: {
    seo: {
      title: "API & Integrations | 4unik",
      description:
        "REST API, webhooks, and integrations for corporate rewards, catalog, and fulfillment - aligned with the 4unik platform.",
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
      description: "Developer-oriented design principles. Built to stay reliable under load.",
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
            "Official libraries for Node.js and Python so engineering teams can move faster with stronger typing.",
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
        "An API layer connected to the main employee experience, internal communication, and HR platforms on the market.",
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
            "5,000+ products, availability controls, cost centers, budgets, and supplier-facing catalog operations.",
        },
        {
          icon: "target",
          title: "Campaigns and gamification",
          description:
            "Temporary campaigns, peer-to-peer scoring, badges, and goal-to-points conversion connected to HR motions.",
        },
        {
          icon: "gift",
          title: "Events and kits",
          description:
            "Welcome kits, recognition kits, fairs, and gifting workflows with branded on-demand fulfillment.",
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
        "Create restricted API keys and access the interactive technical documentation hosted on Stoplight.",
      buttonLabel: "Generate API keys",
      buttonHref: "https://calendly.com/yoobeco/demo",
    },
  },
};

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, "utf8");
  return Object.fromEntries(
    content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separator = line.indexOf("=");
        const key = line.slice(0, separator).trim();
        const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
        return [key, value];
      }),
  );
}

function readSanityCliToken() {
  if (!fs.existsSync(SANITY_CONFIG_FILE)) return "";
  try {
    const raw = JSON.parse(fs.readFileSync(SANITY_CONFIG_FILE, "utf8"));
    return typeof raw.authToken === "string" ? raw.authToken.trim() : "";
  } catch {
    return "";
  }
}

function toSanityIdFragment(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inferLocaleFromFileName(fileName) {
  if (fileName.startsWith("pt-")) return "pt";
  if (fileName.startsWith("en-")) return "en";
  return "global";
}

function titleFromSegmentFile(fileName) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/^(pt|en)-/, "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function loadSegmentObject(relativePath) {
  const fileContent = fs.readFileSync(path.join(ROOT_DIR, relativePath), "utf8");
  const separatorIndex = fileContent.indexOf("=");
  if (separatorIndex === -1) {
    throw new Error(`Nao foi possivel ler o objeto exportado em ${relativePath}`);
  }

  const objectExpression = fileContent
    .slice(separatorIndex + 1)
    .trim()
    .replace(/ as const/g, "")
    .replace(/;\s*$/, "");

  return Function(`"use strict"; return (${objectExpression});`)();
}

function loadNamedExportObject(relativePath, exportName) {
  const fileContent = fs.readFileSync(path.join(ROOT_DIR, relativePath), "utf8");
  const matcher = new RegExp(`export const ${exportName}(?:\\s*:\\s*[^=]+)?\\s*=`);
  const match = fileContent.match(matcher);
  if (!match || match.index === undefined) {
    throw new Error(`Nao foi possivel localizar export ${exportName} em ${relativePath}`);
  }

  let index = match.index + match[0].length;
  while (/\s/.test(fileContent[index] || "")) index += 1;

  let depth = 0;
  let inString = false;
  let stringQuote = "";
  let escaped = false;
  let endIndex = index;

  for (let i = index; i < fileContent.length; i += 1) {
    const char = fileContent[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === stringQuote) {
        inString = false;
        stringQuote = "";
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = true;
      stringQuote = char;
      continue;
    }

    if (char === "{" || char === "[" || char === "(") depth += 1;
    if (char === "}" || char === "]" || char === ")") depth -= 1;

    if (char === ";" && depth <= 0) {
      endIndex = i;
      break;
    }
  }

  const objectExpression = fileContent
    .slice(index, endIndex)
    .trim()
    .replace(/ as const/g, "");

  return Function(`"use strict"; return (${objectExpression});`)();
}

const ptGamificacaoSegment = loadSegmentObject("src/messages/segments/pt-gamificacao.ts");
const enGamificacaoSegment = loadSegmentObject("src/messages/segments/en-gamificacao.ts");
const ptGamificacaoPageSegment = loadSegmentObject("src/messages/segments/pt-gamificacao-page.ts");
const enGamificacaoPageSegment = loadSegmentObject("src/messages/segments/en-gamificacao-page.ts");
const ptCasosPageSegment = loadSegmentObject("src/messages/segments/pt-casos-page.ts");
const enCasosPageSegment = loadSegmentObject("src/messages/segments/en-casos-page.ts");
const ptInteligenciaPageSegment = loadSegmentObject("src/messages/segments/pt-inteligencia-page.ts");
const enInteligenciaPageSegment = loadSegmentObject("src/messages/segments/en-inteligencia-page.ts");
const ptPlataformaSegment = loadSegmentObject("src/messages/segments/pt-plataforma.ts");
const enPlataformaSegment = loadSegmentObject("src/messages/segments/en-plataforma.ts");
const ptStatsBentoTabsWhySegment = loadSegmentObject("src/messages/segments/pt-stats-bento-tabs-why.ts");
const enStatsBentoTabsWhySegment = loadSegmentObject("src/messages/segments/en-stats-bento-tabs-why.ts");
const ptLandingMoreSegment = loadSegmentObject("src/messages/segments/pt-landing-more.ts");
const enLandingMoreSegment = loadSegmentObject("src/messages/segments/en-landing-more.ts");
const ptBlogPageSegment = loadSegmentObject("src/messages/segments/pt-blog-page.ts");
const enBlogPageSegment = loadSegmentObject("src/messages/segments/en-blog-page.ts");
const ptRestSegment = loadSegmentObject("src/messages/segments/pt-rest.ts");
const enRestSegment = loadSegmentObject("src/messages/segments/en-rest.ts");
const workvivoMeta = loadNamedExportObject("src/content/workvivo.ts", "workvivoMeta");
const workvivoContent = loadNamedExportObject("src/content/workvivo.ts", "workvivoContent");

const gamificacaoPayloadByLocale = {
  pt: {
    seo: {
      title: "Gamificacao Corporativa | 4unik",
      description:
        "Motor de gamificacao corporativa com pontos, rankings, desafios, recompensas reais e analytics para RH e liderancas.",
      openGraphDescription:
        "Gamificacao corporativa com pontos, rankings, desafios e recompensas reais para elevar engajamento e performance.",
    },
    hero: {
      ...ptGamificacaoSegment.hero,
      ctaHref: "#mechanics",
    },
    problem: ptGamificacaoSegment.problem,
    mechanics: ptGamificacaoPageSegment.mechanics,
    flow: ptGamificacaoPageSegment.flow,
    cases: ptGamificacaoPageSegment.cases,
    trends: ptGamificacaoPageSegment.trends,
    stats: ptGamificacaoPageSegment.stats,
    kpis: ptGamificacaoPageSegment.kpis,
    deepUsecases: ptGamificacaoPageSegment.deepUsecases,
    faq: ptGamificacaoPageSegment.faq,
    finalCta: {
      ...ptGamificacaoSegment.pageCta,
      ctaHref: "https://calendly.com/yoobeco/demo",
    },
  },
  en: gamificacaoPayloadEn(),
};

const routePayloadJsonBySegmentFile = {
  "pt-casos-page.ts": JSON.stringify({
    seo: ptCasosPageSegment.seo,
    faqItems: ptCasosPageSegment.faq.items,
    messagesOverride: { casosPage: ptCasosPageSegment },
  }),
  "en-casos-page.ts": JSON.stringify({
    seo: enCasosPageSegment.seo,
    faqItems: enCasosPageSegment.faq.items,
    messagesOverride: { casosPage: enCasosPageSegment },
  }),
  "pt-inteligencia-page.ts": JSON.stringify({
    seo: ptInteligenciaPageSegment.seo,
    faqItems: ptInteligenciaPageSegment.faq.items,
    messagesOverride: {
      inteligenciaPage: ptInteligenciaPageSegment,
      landingMore: { aiRoadmap: ptLandingMoreSegment.aiRoadmap },
    },
  }),
  "en-inteligencia-page.ts": buildSegmentRoutePayload("en-inteligencia-page.ts"),
  "pt-plataforma.ts": JSON.stringify({
    seo: ptPlataformaSegment.seo,
    faqItems: ptPlataformaSegment.faq.items,
    messagesOverride: {
      plataforma: ptPlataformaSegment,
      landingMore: { aiRoadmap: ptLandingMoreSegment.aiRoadmap },
    },
  }),
  "en-plataforma.ts": buildSegmentRoutePayload("en-plataforma.ts"),
  "pt-landing-more.ts": JSON.stringify({
    messagesOverride: { landingMore: { plataformaStubs: ptLandingMoreSegment.plataformaStubs } },
    stubSeo: {
      motor: {
        title: "Motor de Gamificação | 4unik",
        description: ptLandingMoreSegment.plataformaStubs.motor.body,
      },
      logistica: {
        title: "Logística Integrada | 4unik",
        description: ptLandingMoreSegment.plataformaStubs.logistica.body,
      },
      loja: {
        title: "Loja e Resgate | 4unik",
        description: ptLandingMoreSegment.plataformaStubs.loja.body,
      },
    },
  }),
  "en-landing-more.ts": buildSegmentRoutePayload("en-landing-more.ts"),
  "pt-blog-page.ts": JSON.stringify({
    seo: {
      title: "Blog | 4unik",
      description:
        "Insights, tendências e guias sobre employee engagement, gamificação e logística de premiações corporativas.",
      openGraphDescription:
        "Insights, tendências e guias sobre employee engagement, gamificação e logística de premiações corporativas.",
    },
    messagesOverride: {
      blogPage: {
        ...ptBlogPageSegment,
        backToBlog: "Voltar para o blog",
      },
    },
  }),
  "en-blog-page.ts": buildSegmentRoutePayload("en-blog-page.ts"),
  "pt-rest.ts": JSON.stringify({
    redirectMessage: ptRestSegment.workvivoRedirect.message,
  }),
  "en-rest.ts": buildSegmentRoutePayload("en-rest.ts"),
};

const routePayloadJsonByExtraSource = {
  "src/content/workvivo.ts": JSON.stringify({
    workvivoMeta,
    workvivoContent,
  }),
};

function collectMirrorDocuments() {
  const segmentFiles = fs
    .readdirSync(MESSAGE_SEGMENTS_DIR)
    .filter((fileName) => fileName.endsWith(".ts"))
    .sort();

  const segmentDocuments = segmentFiles.map((fileName) => {
    const relativePath = path.join("src", "messages", "segments", fileName);
    const content = fs.readFileSync(path.join(ROOT_DIR, relativePath), "utf8");
    const locale = inferLocaleFromFileName(fileName);
    const sourceKey = relativePath.replace(/[\\/]/g, ":");
    const homePayload =
      fileName === "pt-home.ts"
        ? homePayloadByLocale.pt
        : fileName === "en-home.ts"
          ? homePayloadByLocale.en
          : undefined;
    const gamificacaoPayload =
      fileName === "pt-gamificacao-page.ts"
        ? gamificacaoPayloadByLocale.pt
        : fileName === "en-gamificacao-page.ts"
          ? gamificacaoPayloadByLocale.en
          : undefined;
    const routePayloadJson = routePayloadJsonBySegmentFile[fileName];

    return {
      _id: `contentMirror.${toSanityIdFragment(fileName)}`,
      _type: "contentMirror",
      title: `Segmento ${titleFromSegmentFile(fileName)}`,
      sourceKey,
      sourcePath: relativePath,
      locale,
      area: "messages",
      contentFormat: "typescript",
      summary: `Espelho do ficheiro ${fileName} com o conteudo editorial atualmente usado no frontend.`,
      ...(homePayload ? { homePayload } : {}),
      ...(gamificacaoPayload ? { gamificacaoPayload } : {}),
      ...(routePayloadJson ? { routePayloadJson } : {}),
      content,
    };
  });

  const extraDocuments = extraMirrorSources.map((entry) => {
    const content = fs.readFileSync(path.join(ROOT_DIR, entry.relativePath), "utf8");
    const apiIntegracoesPayload =
      entry.relativePath === "src/app/(pt)/api-integracoes/page.tsx"
        ? apiIntegracoesPayloadByLocale.pt
        : entry.relativePath === "src/app/(en)/en/api-integracoes/page.tsx"
          ? apiIntegracoesPayloadByLocale.en
          : undefined;
    const routePayloadJson = routePayloadJsonByExtraSource[entry.relativePath];

    return {
      _id: `contentMirror.${toSanityIdFragment(entry.relativePath)}`,
      _type: "contentMirror",
      title: entry.title,
      sourceKey: entry.relativePath.replace(/[\\/]/g, ":"),
      sourcePath: entry.relativePath,
      locale: entry.locale,
      area: entry.area,
      contentFormat: entry.relativePath.endsWith(".tsx") ? "tsx" : "typescript",
      summary: entry.summary,
      ...(apiIntegracoesPayload ? { apiIntegracoesPayload } : {}),
      ...(routePayloadJson ? { routePayloadJson } : {}),
      content,
    };
  });

  return [...segmentDocuments, ...extraDocuments];
}

const envFromFile = parseEnvFile(ENV_FILE);
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ||
  envFromFile.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ||
  "";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ||
  envFromFile.NEXT_PUBLIC_SANITY_DATASET?.trim() ||
  "";
const token =
  process.env.SANITY_API_WRITE_TOKEN?.trim() ||
  process.env.SANITY_AUTH_TOKEN?.trim() ||
  readSanityCliToken();

if (!projectId || projectId === "your-project-id") {
  throw new Error(
    "NEXT_PUBLIC_SANITY_PROJECT_ID nao esta configurado com um valor real. Atualize .env.local ou exporte a variavel antes de rodar o seed.",
  );
}

if (!dataset) {
  throw new Error(
    "NEXT_PUBLIC_SANITY_DATASET nao esta configurado. Atualize .env.local ou exporte a variavel antes de rodar o seed.",
  );
}

if (!token) {
  throw new Error(
    'Nenhum token de escrita foi encontrado. Execute "npx sanity login" ou defina SANITY_API_WRITE_TOKEN antes de rodar o seed.',
  );
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-03-17",
  useCdn: false,
});

const uploadedImages = new Map();

async function withRetry(label, operation, attempts = 4) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt === attempts) break;
      const delayMs = attempt * 1500;
      console.warn(
        `[retry ${attempt}/${attempts - 1}] ${label} falhou. Nova tentativa em ${delayMs}ms.`,
      );
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw lastError;
}

async function uploadImageIfNeeded(imageUrl, filename) {
  if (!imageUrl) return null;
  if (uploadedImages.has(imageUrl)) return uploadedImages.get(imageUrl);

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Falha ao descarregar imagem ${imageUrl}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await withRetry(`upload remoto ${filename || imageUrl}`, () =>
    client.assets.upload("image", buffer, { filename }),
  );
  uploadedImages.set(imageUrl, asset);
  return asset;
}

async function uploadLocalImageIfNeeded(relativePath, filename) {
  if (!relativePath) return null;

  const absolutePath = path.join(ROOT_DIR, relativePath);
  if (uploadedImages.has(absolutePath)) return uploadedImages.get(absolutePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Arquivo de imagem nao encontrado: ${relativePath}`);
  }

  const buffer = fs.readFileSync(absolutePath);
  const resolvedFilename = filename || path.basename(relativePath);
  const asset = await withRetry(`upload local ${resolvedFilename}`, () =>
    client.assets.upload("image", buffer, {
      filename: resolvedFilename,
    }),
  );
  uploadedImages.set(absolutePath, asset);
  return asset;
}

async function upsertBlogPost(post) {
  const imageAsset = await uploadImageIfNeeded(
    post.imageUrl,
    `${post.slug.current}.jpg`,
  );

  const document = {
    _id: post._id,
    _type: post._type,
    title: post.title,
    slug: post.slug,
    locale: post.locale,
    excerpt: post.excerpt,
    category: post.category,
    publishedAt: post.publishedAt,
    readTimeMinutes: post.readTimeMinutes,
    featured: post.featured,
    seo: post.seo,
    body: post.body,
    relatedKeywords: post.relatedKeywords,
    ...(imageAsset
      ? {
          coverImage: {
            _type: "image",
            alt: post.imageAlt,
            asset: {
              _type: "reference",
              _ref: imageAsset._id,
            },
          },
        }
      : {}),
  };

  await withRetry(`createOrReplace ${document._id}`, () =>
    client.createOrReplace(document),
  );
  return document._id;
}

async function upsertDocument(document) {
  await withRetry(`createOrReplace ${document._id}`, () =>
    client.createOrReplace(document),
  );
  return document._id;
}

function toImageField(asset, alt) {
  if (!asset) return undefined;
  return {
    _type: "image",
    ...(alt ? { alt } : {}),
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

async function resolveBlockImage(imagePath, imageAlt, filename) {
  const asset = await uploadLocalImageIfNeeded(imagePath, filename);
  return toImageField(asset, imageAlt);
}

async function resolveMarketingPageContent(content, documentId) {
  const blocks = [];

  for (const [blockIndex, block] of (content || []).entries()) {
    const resolvedBlock = { ...block };
    const blockSlug = `${documentId}-${block._key || block._type || blockIndex + 1}`
      .replaceAll(".", "-")
      .replaceAll("_", "-");

    if ("imagePath" in resolvedBlock || "imageAlt" in resolvedBlock) {
      resolvedBlock.image = await resolveBlockImage(
        resolvedBlock.imagePath,
        resolvedBlock.imageAlt,
        `${blockSlug}-image`,
      );
      delete resolvedBlock.imagePath;
      delete resolvedBlock.imageAlt;
    }

    if (resolvedBlock._type === "featureGridBlock") {
      resolvedBlock.items = await Promise.all(
        (resolvedBlock.items || []).map(async (item, itemIndex) => {
          const resolvedItem = { ...item };

          if ("imagePath" in resolvedItem || "imageAlt" in resolvedItem) {
            resolvedItem.image = await resolveBlockImage(
              resolvedItem.imagePath,
              resolvedItem.imageAlt,
              `${blockSlug}-item-${itemIndex + 1}`,
            );
            delete resolvedItem.imagePath;
            delete resolvedItem.imageAlt;
          }

          return resolvedItem;
        }),
      );
    }

    blocks.push(resolvedBlock);
  }

  return blocks;
}

function portableTextBlocks(paragraphs) {
  return (paragraphs || []).map((paragraph, index) => ({
    _key: `block-${index + 1}`,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `span-${index + 1}`,
        _type: "span",
        marks: [],
        text: paragraph,
      },
    ],
  }));
}

function heroBlock(key, values) {
  return { _key: key, _type: "heroBlock", ...values };
}

function splitContentBlock(key, values) {
  return {
    _key: key,
    _type: "splitContentBlock",
    ...values,
    body: values.body ? portableTextBlocks(values.body) : [],
  };
}

function featureGridBlock(key, values) {
  return {
    _key: key,
    _type: "featureGridBlock",
    ...values,
    items: (values.items || []).map((item, index) => ({
      _key: `${key}-feature-${index + 1}`,
      ...item,
    })),
  };
}

function caseStudyGridBlock(key, values) {
  return {
    _key: key,
    _type: "caseStudyGridBlock",
    ...values,
    items: (values.items || []).map((item, index) => ({
      _key: `${key}-case-${index + 1}`,
      ...item,
      metrics: (item.metrics || []).map((metric, metricIndex) => ({
        _key: `${key}-case-${index + 1}-metric-${metricIndex + 1}`,
        ...metric,
      })),
    })),
  };
}

function statsBlock(key, values) {
  return {
    _key: key,
    _type: "statsBlock",
    ...values,
    items: (values.items || []).map((item, index) => ({
      _key: `${key}-stat-${index + 1}`,
      ...item,
    })),
  };
}

function faqBlock(key, values) {
  return {
    _key: key,
    _type: "faqBlock",
    ...values,
    items: (values.items || []).map((item, index) => ({
      _key: `${key}-item-${index + 1}`,
      ...item,
    })),
  };
}

function ctaBlock(key, values) {
  return { _key: key, _type: "ctaBlock", ...values };
}

function logoStripBlock(key, values) {
  return {
    _key: key,
    _type: "logoStripBlock",
    ...values,
    items: (values.items || []).map((item, index) => ({
      _key: `${key}-logo-${index + 1}`,
      ...item,
    })),
  };
}

function testimonialBlock(key, title, items) {
  return {
    _key: key,
    _type: "testimonialBlock",
    title,
    items: items.map((item, index) => ({
      _key: `${key}-testimonial-${index + 1}`,
      ...item,
    })),
  };
}

function joinTitle(...parts) {
  return parts.filter(Boolean).join(" ").trim();
}

function buildHomeMarketingPageContent(locale) {
  const isEn = locale === "en";
  const home = homePayloadByLocale[locale];
  const stats = isEn ? enStatsBentoTabsWhySegment : ptStatsBentoTabsWhySegment;
  const landingMore = isEn ? enLandingMoreSegment : ptLandingMoreSegment;
  const rest = isEn ? enRestSegment : ptRestSegment;

  return [
    heroBlock("hero", {
      headline: joinTitle(
        home.hero.brand,
        home.hero.afterBrand,
        home.hero.line1b,
        home.hero.line2,
      ),
      subheadline: home.hero.sub,
      ctaText: home.hero.ctaDemo,
      ctaLink: home.hero.ctaDemoHref,
      imagePath: "public/cms-seed/home-bento-dashboard.svg",
      imageAlt: isEn
        ? "4Unik home hero overview dashboard"
        : "Visao principal do dashboard da home da 4Unik",
    }),
    splitContentBlock("4unik-context", {
      eyebrow: home.fourUnik.kicker,
      title: home.fourUnik.brand,
      body: [
        joinTitle(
          home.fourUnik.bodyBefore,
          home.fourUnik.brand,
          home.fourUnik.bodyMid,
          home.fourUnik.here,
          home.fourUnik.bodyAfter,
        ),
      ],
      primaryLabel: home.fourUnik.cta,
      primaryHref: home.fourUnik.ctaHref,
      imageSide: "right",
    }),
    logoStripBlock("home-trust", {
      displayStyle: "compact",
      title: home.trust.title,
      collection: { _type: "reference", _ref: "logoCollection.trustBar" },
    }),
    featureGridBlock("bento-overview", {
      eyebrow: stats.bento.badge,
      title: joinTitle(stats.bento.titleLine1, stats.bento.titleLine2),
      description: stats.bento.sub,
      columns: "2",
      imagePath: "public/cms-seed/home-bento-dashboard.svg",
      imageAlt: isEn
        ? "Overview of the 4Unik engagement and rewards dashboard"
        : "Visao geral do dashboard de engajamento e recompensas da 4Unik",
      items: [
        {
          title: stats.bento.card1.title,
          description: stats.bento.card1.body,
          icon: "bar-chart-3",
          href: isEn ? "/en/plataforma" : "/plataforma",
        },
        {
          title: stats.bento.card2.title,
          description: stats.bento.card2.body,
          icon: "target",
          href: isEn ? "/en/plataforma/motor-gamificacao" : "/plataforma/motor-gamificacao",
        },
        {
          title: stats.bento.card3.title,
          description: stats.bento.card3.body,
          icon: "store",
          href: isEn ? "/en/plataforma/loja-resgate" : "/plataforma/loja-resgate",
        },
        {
          title: stats.bento.card4.title,
          description: stats.bento.card4.body,
          icon: "link-2",
          href: isEn ? "/en/api-integracoes" : "/api-integracoes",
        },
      ],
    }),
    splitContentBlock("platform-management", {
      eyebrow: stats.platformTabs.badge,
      title: stats.platformTabs.gestao.title,
      body: [stats.platformTabs.gestao.body],
      bullets: stats.platformTabs.gestao.bullets,
      primaryLabel: stats.platformTabs.gestao.cta,
      primaryHref: isEn ? "/en/plataforma" : "/plataforma",
      imagePath: "public/cms-seed/home-platform-management.svg",
      imageAlt: isEn
        ? "Manager dashboard view on 4Unik"
        : "Visao de gestao da plataforma 4Unik",
      imageSide: "right",
    }),
    splitContentBlock("platform-store", {
      eyebrow: stats.platformTabs.badge,
      title: stats.platformTabs.loja.title,
      body: [stats.platformTabs.loja.body],
      bullets: stats.platformTabs.loja.bullets,
      primaryLabel: stats.platformTabs.loja.cta,
      primaryHref: isEn ? "/en/plataforma/loja-resgate" : "/plataforma/loja-resgate",
      imagePath: "public/cms-seed/home-platform-store.svg",
      imageAlt: isEn
        ? "Member store experience on 4Unik"
        : "Experiencia da loja do colaborador na 4Unik",
      imageSide: "left",
    }),
    splitContentBlock("platform-campaigns", {
      eyebrow: stats.platformTabs.badge,
      title: stats.platformTabs.campanhas.title,
      body: [stats.platformTabs.campanhas.body],
      bullets: stats.platformTabs.campanhas.bullets,
      primaryLabel: stats.platformTabs.campanhas.cta,
      primaryHref: isEn ? "/en/plataforma/motor-gamificacao" : "/plataforma/motor-gamificacao",
      imagePath: "public/cms-seed/home-platform-campaigns.svg",
      imageAlt: isEn
        ? "Campaign management setup on 4Unik"
        : "Setup de campanhas na plataforma 4Unik",
      imageSide: "right",
    }),
    statsBlock(
      "stats",
      isEn
        ? "Operational metrics already visible in the platform"
        : "Metricas operacionais visiveis na plataforma",
      stats.statsBar.items.map((item) => ({
        value: `${item.value}${item.suffix}`.trim(),
        label: item.label,
      })),
    ),
    featureGridBlock("why-4unik", {
      eyebrow: stats.why.badge,
      title: joinTitle(stats.why.titleBefore, stats.why.titleGradient),
      description: stats.why.sub,
      columns: "3",
      items: stats.why.cards.map((item, index) => ({
        title: item.title,
        description: item.desc,
        icon: ["target", "sparkles", "bar-chart-3"][index] || "sparkles",
      })),
    }),
    featureGridBlock("gamification-summary", {
      eyebrow: stats.gamificationSummary.badge,
      title: joinTitle(
        stats.gamificationSummary.titleBefore,
        stats.gamificationSummary.titleGradient,
        stats.gamificationSummary.titleAfter,
      ),
      description: stats.gamificationSummary.sub,
      columns: "2",
      items: stats.gamificationSummary.cards.map((item, index) => ({
        title: item.title,
        description: item.desc,
        icon: ["coins", "target", "sparkles", "store"][index] || "sparkles",
      })),
    }),
    splitContentBlock("ready-to-use", {
      eyebrow: landingMore.duality.badge,
      title: landingMore.duality.sideA.title,
      body: [landingMore.duality.sideA.body],
      bullets: landingMore.duality.sideA.bullets,
      primaryLabel: isEn ? "See the platform" : "Ver a plataforma",
      primaryHref: isEn ? "/en/plataforma" : "/plataforma",
      imageSide: "right",
    }),
    splitContentBlock("invisible-integration", {
      eyebrow: landingMore.duality.badge,
      title: landingMore.duality.sideB.title,
      body: [landingMore.duality.sideB.body],
      bullets: landingMore.duality.sideB.bullets,
      primaryLabel: isEn ? "Explore integrations" : "Explorar integracoes",
      primaryHref: isEn ? "/en/api-integracoes" : "/api-integracoes",
      imageSide: "left",
    }),
    splitContentBlock("enterprise-hapvida", {
      eyebrow: landingMore.enterpriseCases.badge,
      title: `Hapvida · ${landingMore.enterpriseCases.hapvida.tag2}`,
      body: [
        joinTitle(
          landingMore.enterpriseCases.hapvida.bodyBefore,
          landingMore.enterpriseCases.hapvida.bodyStrong,
          landingMore.enterpriseCases.hapvida.bodyAfter,
        ),
      ],
      bullets: landingMore.enterpriseCases.hapvida.bullets,
      imagePath: "public/cms-seed/home-enterprise-hapvida.svg",
      imageAlt: isEn
        ? "Enterprise Hapvida use case visual"
        : "Visual do case enterprise da Hapvida",
      imageSide: "right",
    }),
    splitContentBlock("enterprise-prio", {
      eyebrow: landingMore.enterpriseCases.badge,
      title: `PRIO · ${landingMore.enterpriseCases.prio.tag2}`,
      body: [
        joinTitle(
          landingMore.enterpriseCases.prio.bodyBefore,
          landingMore.enterpriseCases.prio.bodyStrong,
          landingMore.enterpriseCases.prio.bodyAfter,
        ),
      ],
      bullets: landingMore.enterpriseCases.prio.bullets,
      imagePath: "public/cms-seed/home-enterprise-prio.svg",
      imageAlt: isEn
        ? "Enterprise PRIO use case visual"
        : "Visual do case enterprise da PRIO",
      imageSide: "left",
    }),
    splitContentBlock("integration-workvivo", {
      eyebrow: landingMore.dedicatedIntegrations.badge,
      title: landingMore.dedicatedIntegrations.workvivo.title,
      body: [landingMore.dedicatedIntegrations.workvivo.body],
      bullets: landingMore.dedicatedIntegrations.workvivo.bullets,
      primaryLabel: isEn ? "See Workvivo integration" : "Ver integracao Workvivo",
      primaryHref: isEn ? "/en/api-integracoes/workvivo" : "/api-integracoes/workvivo",
      imagePath: "public/cms-seed/home-integrations-workvivo.svg",
      imageAlt: isEn
        ? "Workvivo integration preview"
        : "Preview da integracao Workvivo",
      imageSide: "right",
    }),
    splitContentBlock("integration-beehome", {
      eyebrow: landingMore.dedicatedIntegrations.badge,
      title: landingMore.dedicatedIntegrations.beehome.title,
      body: [landingMore.dedicatedIntegrations.beehome.body],
      bullets: landingMore.dedicatedIntegrations.beehome.bullets,
      primaryLabel: isEn ? "Talk to engineering" : "Falar com engenharia",
      primaryHref: "https://calendly.com/yoobeco/demo",
      imagePath: "public/cms-seed/home-integrations-beehome.svg",
      imageAlt: isEn
        ? "Beehome integration preview"
        : "Preview da integracao Beehome",
      imageSide: "left",
    }),
    featureGridBlock("store-usecases", {
      eyebrow: rest.storeSection.badge,
      title: joinTitle(
        rest.storeSection.titleBefore,
        rest.storeSection.titleGradient,
        rest.storeSection.titleAfter,
      ),
      description: rest.storeSection.sub,
      columns: "2",
      items: rest.storeSection.usecases.map((item, index) => ({
        title: item.title,
        description: item.desc,
        icon: ["package", "sparkles", "shield", "zap"][index] || "sparkles",
      })),
    }),
    splitContentBlock("api-section", {
      eyebrow: rest.apiSection.badge,
      title: joinTitle(
        rest.apiSection.titleBefore,
        rest.apiSection.titleBrand,
        rest.apiSection.titleAfter,
      ),
      body: [rest.apiSection.sub],
      bullets: rest.apiSection.bullets,
      primaryLabel: rest.apiSection.ctaDocs,
      primaryHref: isEn ? "/en/api-integracoes" : "/api-integracoes",
      secondaryLabel: rest.apiSection.ctaApi,
      secondaryHref: "https://calendly.com/yoobeco/demo",
      imageSide: "right",
    }),
    featureGridBlock("ai-roadmap", {
      eyebrow: landingMore.aiRoadmap.badge,
      title: joinTitle(
        landingMore.aiRoadmap.titleBefore,
        landingMore.aiRoadmap.titleGradient,
        landingMore.aiRoadmap.titleAfter,
      ),
      columns: "4",
      items: landingMore.aiRoadmap.stages.map((stage, index) => ({
        eyebrow: stage.status,
        title: stage.title,
        description: stage.items.join(" • "),
        icon: ["brain-circuit", "store", "zap", "bar-chart-3"][index] || "sparkles",
      })),
    }),
    featureGridBlock("management-features", {
      eyebrow: rest.managementSection.badge,
      title: joinTitle(
        rest.managementSection.titleBefore,
        rest.managementSection.titleGradient,
        rest.managementSection.titleAfter,
      ),
      description: rest.managementSection.sub,
      columns: "2",
      items: rest.managementSection.features.map((item, index) => ({
        title: item.title,
        description: item.desc,
        icon: ["bar-chart-3", "package", "target", "shield"][index] || "sparkles",
      })),
    }),
    featureGridBlock("how-it-works", {
      eyebrow: landingMore.howItWorks.badge,
      title: joinTitle(
        landingMore.howItWorks.titleBefore,
        landingMore.howItWorks.titleGradient,
        landingMore.howItWorks.titleAfter,
      ),
      columns: "4",
      imagePath: "public/cms-seed/home-how-it-works.svg",
      imageAlt: isEn
        ? "Architecture of the 4Unik operation flow"
        : "Arquitetura da operacao da 4Unik",
      items: landingMore.howItWorks.steps.map((step, index) => ({
        eyebrow: step.num,
        title: step.title,
        description: step.desc,
        icon: ["link-2", "target", "coins", "package"][index] || "sparkles",
      })),
    }),
    featureGridBlock("pricing", {
      eyebrow: rest.pricing.badge,
      title: joinTitle(rest.pricing.titleBefore, rest.pricing.titleGradient),
      description: rest.pricing.sub,
      columns: "3",
      items: [
        {
          eyebrow: rest.pricing.starter.blurb,
          title: `${rest.pricing.starter.name} · ${rest.pricing.currency}${rest.pricing.starter.price}${rest.pricing.starter.period}`,
          description: rest.pricing.starter.bullets.join(" • "),
          icon: "sparkles",
        },
        {
          eyebrow: rest.pricing.popular,
          title: `${rest.pricing.pro.name} · ${rest.pricing.currency}${rest.pricing.pro.price}${rest.pricing.pro.period}`,
          description: rest.pricing.pro.bullets.join(" • "),
          icon: "zap",
        },
        {
          eyebrow: rest.pricing.enterprise.blurb,
          title: `${rest.pricing.enterprise.name} · ${rest.pricing.enterprise.priceLabel}`,
          description: rest.pricing.enterprise.bullets.join(" • "),
          icon: "shield",
        },
      ],
    }),
    testimonialBlock(
      "testimonials",
      joinTitle(rest.testimonials.titleBefore, rest.testimonials.titleGradient),
      rest.testimonials.items.map((item) => ({
        quote: item.text.replace(/^"|"$/g, ""),
        author: item.author,
        role: item.role,
        company: item.company,
      })),
    ),
    logoStripBlock("home-clients", {
      displayStyle: "grid",
      sectionId: "clientes",
      eyebrow: rest.clients.badge,
      title: joinTitle(
        rest.clients.titleBefore,
        rest.clients.titleGradient,
        rest.clients.titleAfter,
      ),
      description: rest.clients.sub,
      collection: { _type: "reference", _ref: "logoCollection.clientsGrid" },
    }),
    ctaBlock("final-cta", {
      eyebrow: isEn ? "Next step" : "Proximo passo",
      title: home.finalCta.title,
      description: home.finalCta.body,
      primaryLabel: home.finalCta.demo,
      primaryHref: home.finalCta.demoHref,
      secondaryLabel: home.finalCta.whatsapp,
      secondaryHref: home.finalCta.whatsappHref,
    }),
  ];
}

function buildGamificacaoMarketingPageContent(locale) {
  const isEn = locale === "en";
  const page = gamificacaoPayloadByLocale[locale];

  return [
    heroBlock("hero", {
      headline: joinTitle(
        page.hero.titleLine1,
        page.hero.titleGradient,
        page.hero.titleLine2,
      ),
      subheadline: page.hero.sub,
      ctaText: page.hero.cta,
      ctaLink: page.hero.ctaHref,
      imagePath: "public/cms-seed/gamification-hero.svg",
      imageAlt: isEn
        ? "Corporate gamification hero visual"
        : "Visual principal da landing de gamificacao corporativa",
    }),
    featureGridBlock("problem", {
      eyebrow: page.problem.badge,
      title: joinTitle(
        page.problem.title,
        page.problem.titleGradient,
        page.problem.titleAfter,
      ),
      columns: "2",
      imagePath: "public/cms-seed/gamification-problem.svg",
      imageAlt: isEn
        ? "Visual summary of the engagement crisis"
        : "Visual editorial da crise de engajamento nas empresas",
      items: page.problem.cards.map((item) => ({
        eyebrow: item.stat,
        title: item.title,
        description: `${item.body} ${item.cite}`.trim(),
        icon: "bar-chart-3",
      })),
    }),
    featureGridBlock("mechanics", {
      eyebrow: page.mechanics.badge,
      title: joinTitle(
        page.mechanics.titleBefore,
        page.mechanics.titleGradient,
        page.mechanics.titleAfter,
      ),
      description: page.mechanics.sub,
      columns: "3",
      imagePath: "public/cms-seed/gamification-mechanics.svg",
      imageAlt: isEn
        ? "Overview of the main gamification mechanics"
        : "Visao geral das principais mecanicas de gamificacao",
      items: page.mechanics.items.map((item, index) => ({
        eyebrow: `${item.id} · ${item.badge}`,
        title: item.title,
        description: `${item.description} ${item.features.join(" • ")}`.trim(),
        icon:
          ["coins", "target", "sparkles", "zap", "bar-chart-3", "store"][
            index
          ] || "sparkles",
      })),
    }),
    splitContentBlock("flow", {
      eyebrow: page.flow.badge,
      title: joinTitle(
        page.flow.titleBefore,
        page.flow.titleGradient,
        page.flow.titleAfter,
      ),
      body: [page.flow.sub],
      bullets: page.flow.steps.map(
        (step) =>
          `${step.num} · ${step.role} · ${step.title}: ${step.desc} (${step.features
            .map((feature) => feature.text)
            .join(" • ")})`,
      ),
      imageSide: "right",
      imagePath: "public/cms-seed/gamification-flow.svg",
      imageAlt: isEn
        ? "Implementation flow for a gamification program"
        : "Fluxo visual de implementacao de um programa de gamificacao",
    }),
    caseStudyGridBlock("cases", {
      title: joinTitle(
        page.cases.titleBefore,
        page.cases.titleGradient,
        page.cases.titleAfter,
      ),
      challengeLabel: page.cases.challengeLabel,
      resultsLabel: page.cases.solutionLabel || "Results",
      items: page.cases.items.map((item) => ({
        company: item.company,
        industry: item.industry,
        title: item.title,
        description: item.desc,
        challenge: `${item.challenge} ${item.solution}`.trim(),
        metrics: item.metrics,
      })),
    }),
    featureGridBlock("trends", {
      eyebrow: page.trends.badge,
      title: joinTitle(
        page.trends.titleBefore,
        page.trends.titleGradient,
        page.trends.titleAfter,
      ),
      description: `${page.trends.sub} ${page.trends.banner2025}: ${page.trends.value2025}. ${page.trends.banner2033}: ${page.trends.value2033}. ${page.trends.cagr}`.trim(),
      columns: "3",
      imagePath: "public/cms-seed/gamification-trends.svg",
      imageAlt: isEn
        ? "Market trends and projections for gamification"
        : "Visual de tendencias e projecoes de mercado para gamificacao",
      items: page.trends.items.map((item) => ({
        eyebrow: item.tag,
        title: item.title,
        description: item.desc,
        icon: "brain-circuit",
      })),
    }),
    statsBlock("stats", {
      title: joinTitle(
        page.stats.titleBefore,
        page.stats.titleGradient,
        page.stats.titleAfter,
      ),
      imagePath: "public/cms-seed/gamification-stats.svg",
      imageAlt: isEn
        ? "Performance metrics for gamification programs"
        : "Metricas de performance de programas de gamificacao",
      items: page.stats.items.map((item) => ({
        value: `${item.value}${item.suffix}`,
        label: item.desc,
      })),
    }),
    featureGridBlock("kpis", {
      eyebrow: page.kpis.badge,
      title: joinTitle(
        page.kpis.titleBefore,
        page.kpis.titleGradient,
        page.kpis.titleAfter,
      ),
      description: page.kpis.sub,
      columns: "3",
      items: page.kpis.items.map((item, index) => ({
        eyebrow: item.subtitle,
        title: item.title,
        description: item.desc,
        icon: ["bar-chart-3", "target", "coins", "sparkles", "zap", "globe-2"][index] || "bar-chart-3",
      })),
    }),
    featureGridBlock("deep-usecases", {
      eyebrow: page.deepUsecases.badge,
      title: joinTitle(
        page.deepUsecases.titleBefore,
        page.deepUsecases.titleGradient,
        page.deepUsecases.titleAfter,
      ),
      description: page.deepUsecases.sub,
      columns: "3",
      items: page.deepUsecases.items.map((item, index) => ({
        eyebrow: item.hook,
        title: item.title,
        description: item.desc,
        icon: ["sparkles", "coins", "target", "message-square", "brain-circuit", "globe-2"][index] || "sparkles",
      })),
    }),
    faqBlock("faq", {
      title: joinTitle(
        page.faq.titleBefore,
        page.faq.titleGradient,
        page.faq.titleAfter,
      ),
      items: page.faq.items.map((item) => ({
        question: item.q,
        answer: item.a,
      })),
    }),
    ctaBlock("cta", {
      eyebrow: isEn ? "Next step" : "Proximo passo",
      title: page.finalCta.title,
      description: page.finalCta.body,
      primaryLabel: page.finalCta.cta,
      primaryHref: page.finalCta.ctaHref,
      imagePath: "public/cms-seed/gamification-cta.svg",
      imageAlt: isEn
        ? "Final CTA visual for the gamification page"
        : "Visual editorial do CTA final da pagina de gamificacao",
    }),
  ];
}

function buildApiIntegracoesMarketingPageContent(locale) {
  const isEn = locale === "en";
  const page = apiIntegracoesPayloadByLocale[locale];
  const mapFeatureIcon = (icon) =>
    icon === "shieldCheck"
      ? "shield"
      : icon === "plugZap"
        ? "zap"
        : icon === "refreshCw"
          ? "globe-2"
          : icon === "cpu"
            ? "brain-circuit"
            : icon === "box"
              ? "package"
              : icon;
  const mapModuleIcon = (icon) =>
    icon === "lineChart"
      ? "bar-chart-3"
      : icon === "shoppingBag"
        ? "store"
        : icon === "gift"
          ? "sparkles"
          : icon === "lock"
            ? "shield"
            : icon;

  return [
    heroBlock("hero", {
      headline: page.hero.title,
      subheadline: page.hero.description,
      ctaText: page.hero.primaryCtaLabel,
      ctaLink: page.hero.primaryCtaHref,
      imagePath: "public/cms-seed/api-integrations-hero.svg",
      imageAlt: isEn
        ? "API integrations hero visual with code example"
        : "Visual principal da landing de API e integracoes com exemplo de codigo",
    }),
    featureGridBlock("features", {
      title: page.features.title,
      description: page.features.description,
      columns: "3",
      imagePath: "public/cms-seed/api-integrations-features.svg",
      imageAlt: isEn
        ? "Architecture overview for API features"
        : "Visao da arquitetura e dos recursos principais da API",
      items: page.features.items.map((item) => ({
        ...item,
        icon: mapFeatureIcon(item.icon),
      })),
    }),
    featureGridBlock("integrations", {
      eyebrow: page.integrations.badge,
      title: joinTitle(
        page.integrations.title,
        page.integrations.titleGradient,
        page.integrations.titleAfter,
      ),
      description: `${page.integrations.description} ${page.integrations.extraIntegrationsLabel} ${page.integrations.extraIntegrations.join(" • ")}`.trim(),
      columns: "3",
      imagePath: "public/cms-seed/api-integrations-platforms.svg",
      imageAlt: isEn
        ? "Connected ecosystem of HR and employee experience platforms"
        : "Ecossistema conectado de plataformas de RH e employee experience",
      items: page.integrations.mainPlatforms.map((item) => ({
        eyebrow: item.badge,
        title: `${item.name}${item.by ? ` · ${item.by}` : ""}`,
        description: `${item.description} ${item.features.join(" • ")}`.trim(),
        icon: "link-2",
      })),
    }),
    featureGridBlock("modules", {
      eyebrow: page.modules.badge,
      title: joinTitle(
        page.modules.titleBefore,
        page.modules.titleGradient,
        page.modules.titleAfter,
      ),
      description: page.modules.description,
      columns: "3",
      imagePath: "public/cms-seed/api-integrations-modules.svg",
      imageAlt: isEn
        ? "Operational modules connected to the API layer"
        : "Modulos operacionais conectados a camada de API",
      items: page.modules.items.map((item) => ({
        ...item,
        icon: mapModuleIcon(item.icon),
      })),
    }),
    ctaBlock("cta", {
      eyebrow: isEn ? "Next step" : "Proximo passo",
      title: page.finalCta.title,
      description: page.finalCta.description,
      primaryLabel: page.finalCta.buttonLabel,
      primaryHref: page.finalCta.buttonHref,
      imagePath: "public/cms-seed/api-integrations-hero.svg",
      imageAlt: isEn
        ? "API integrations visual for the final CTA"
        : "Visual da API e integracoes para o CTA final",
    }),
  ];
}

async function upsertMarketingPage(page) {
  const sourceContent =
    page.slug?.current === "home"
      ? buildHomeMarketingPageContent(page.locale)
      : page.slug?.current === "gamificacao"
      ? buildGamificacaoMarketingPageContent(page.locale)
      : page.slug?.current === "api-integracoes"
        ? buildApiIntegracoesMarketingPageContent(page.locale)
      : page.content;
  const content = await resolveMarketingPageContent(sourceContent, page._id);
  const document = {
    ...page,
    content,
  };

  await withRetry(`createOrReplace ${document._id}`, () =>
    client.createOrReplace(document),
  );
  return document._id;
}

async function upsertLogoCollection(collection) {
  const items = [];

  for (const item of collection.items || []) {
    const imageAsset = await uploadLocalImageIfNeeded(
      item.logoPath,
      `${collection.collectionKey || "logos"}-${item.name || item._key || "logo"}`,
    );

    items.push({
      _key: item._key,
      name: item.name,
      href: item.href,
      logo: toImageField(imageAsset, item.logoAlt || item.name),
    });
  }

  const document = {
    _id: collection._id,
    _type: collection._type,
    title: collection.title,
    collectionKey: collection.collectionKey,
    items,
  };

  await withRetry(`createOrReplace ${document._id}`, () =>
    client.createOrReplace(document),
  );
  return document._id;
}

async function upsertHomeShowcaseMedia(showcase) {
  const primaryCardAsset = await uploadLocalImageIfNeeded(
    showcase.bento?.primaryCardImagePath,
    `${showcase.mediaKey || "home"}-bento-primary`,
  );
  const storeCardAsset = await uploadLocalImageIfNeeded(
    showcase.bento?.storeCardImagePath,
    `${showcase.mediaKey || "home"}-bento-store`,
  );
  const managementAsset = await uploadLocalImageIfNeeded(
    showcase.platformTabs?.managementImagePath,
    `${showcase.mediaKey || "home"}-platform-management`,
  );
  const storeAsset = await uploadLocalImageIfNeeded(
    showcase.platformTabs?.storeImagePath,
    `${showcase.mediaKey || "home"}-platform-store`,
  );
  const campaignsAsset = await uploadLocalImageIfNeeded(
    showcase.platformTabs?.campaignsImagePath,
    `${showcase.mediaKey || "home"}-platform-campaigns`,
  );
  const hapvidaLogoAsset = await uploadLocalImageIfNeeded(
    showcase.enterpriseCases?.hapvidaLogoImagePath,
    `${showcase.mediaKey || "home"}-enterprise-hapvida-logo`,
  );
  const hapvidaCaseAsset = await uploadLocalImageIfNeeded(
    showcase.enterpriseCases?.hapvidaCaseImagePath,
    `${showcase.mediaKey || "home"}-enterprise-hapvida-case`,
  );
  const prioLogoAsset = await uploadLocalImageIfNeeded(
    showcase.enterpriseCases?.prioLogoImagePath,
    `${showcase.mediaKey || "home"}-enterprise-prio-logo`,
  );
  const prioCaseAsset = await uploadLocalImageIfNeeded(
    showcase.enterpriseCases?.prioCaseImagePath,
    `${showcase.mediaKey || "home"}-enterprise-prio-case`,
  );
  const howItWorksAsset = await uploadLocalImageIfNeeded(
    showcase.howItWorks?.architectureImagePath,
    `${showcase.mediaKey || "home"}-how-it-works`,
  );
  const workvivoLogoAsset = await uploadLocalImageIfNeeded(
    showcase.dedicatedIntegrations?.workvivo?.logoImagePath,
    `${showcase.mediaKey || "home"}-integrations-workvivo-logo`,
  );
  const workvivoPreviewAsset = await uploadLocalImageIfNeeded(
    showcase.dedicatedIntegrations?.workvivo?.previewImagePath,
    `${showcase.mediaKey || "home"}-integrations-workvivo-preview`,
  );
  const beehomeLogoAsset = await uploadLocalImageIfNeeded(
    showcase.dedicatedIntegrations?.beehome?.logoImagePath,
    `${showcase.mediaKey || "home"}-integrations-beehome-logo`,
  );
  const beehomePreviewAsset = await uploadLocalImageIfNeeded(
    showcase.dedicatedIntegrations?.beehome?.previewImagePath,
    `${showcase.mediaKey || "home"}-integrations-beehome-preview`,
  );
  const storeUsecaseCards = [];
  const managementFeatureCards = [];

  for (const [index, card] of (showcase.storeSection?.usecaseCards || []).entries()) {
    const imageAsset = await uploadLocalImageIfNeeded(
      card.imagePath,
      `${showcase.mediaKey || "home"}-store-usecase-${index + 1}`,
    );

    storeUsecaseCards.push({
      _key: `store-usecase-${index + 1}`,
      emoji: card.emoji,
      image: toImageField(imageAsset, card.imageAlt),
    });
  }

  for (const [index, card] of (showcase.managementSection?.featureCards || []).entries()) {
    const imageAsset = await uploadLocalImageIfNeeded(
      card.imagePath,
      `${showcase.mediaKey || "home"}-management-card-${index + 1}`,
    );

    managementFeatureCards.push({
      _key: `management-card-${index + 1}`,
      emoji: card.emoji,
      image: toImageField(imageAsset, card.imageAlt),
    });
  }

  const aiRoadmapStages = [];

  for (const [index, stage] of (showcase.aiRoadmap?.stages || []).entries()) {
    const imageAsset = await uploadLocalImageIfNeeded(
      stage.imagePath,
      `${showcase.mediaKey || "home"}-ai-roadmap-${index + 1}`,
    );

    aiRoadmapStages.push({
      _key: `ai-roadmap-stage-${index + 1}`,
      icon: stage.icon,
      accentTone: stage.accentTone,
      image: toImageField(imageAsset, stage.imageAlt),
    });
  }

  const document = {
    _id: showcase._id,
    _type: showcase._type,
    title: showcase.title,
    mediaKey: showcase.mediaKey,
    bento: {
      primaryCardImage: toImageField(
        primaryCardAsset,
        showcase.bento?.primaryCardImageAlt,
      ),
      storeCardImage: toImageField(
        storeCardAsset,
        showcase.bento?.storeCardImageAlt,
      ),
    },
    platformTabs: {
      managementImage: toImageField(
        managementAsset,
        showcase.platformTabs?.managementImageAlt,
      ),
      storeImage: toImageField(storeAsset, showcase.platformTabs?.storeImageAlt),
      campaignsImage: toImageField(
        campaignsAsset,
        showcase.platformTabs?.campaignsImageAlt,
      ),
    },
    enterpriseCases: {
      hapvidaLogoImage: toImageField(
        hapvidaLogoAsset,
        showcase.enterpriseCases?.hapvidaLogoImageAlt,
      ),
      hapvidaCaseImage: toImageField(
        hapvidaCaseAsset,
        showcase.enterpriseCases?.hapvidaCaseImageAlt,
      ),
      prioLogoImage: toImageField(
        prioLogoAsset,
        showcase.enterpriseCases?.prioLogoImageAlt,
      ),
      prioCaseImage: toImageField(
        prioCaseAsset,
        showcase.enterpriseCases?.prioCaseImageAlt,
      ),
    },
    storeSection: {
      usecaseCards: storeUsecaseCards,
    },
    howItWorks: {
      architectureImage: toImageField(
        howItWorksAsset,
        showcase.howItWorks?.architectureImageAlt,
      ),
    },
    aiRoadmap: {
      stages: aiRoadmapStages,
    },
    dedicatedIntegrations: {
      workvivo: {
        logoImage: toImageField(
          workvivoLogoAsset,
          showcase.dedicatedIntegrations?.workvivo?.logoImageAlt,
        ),
        previewImage: toImageField(
          workvivoPreviewAsset,
          showcase.dedicatedIntegrations?.workvivo?.previewImageAlt,
        ),
      },
      beehome: {
        logoImage: toImageField(
          beehomeLogoAsset,
          showcase.dedicatedIntegrations?.beehome?.logoImageAlt,
        ),
        previewImage: toImageField(
          beehomePreviewAsset,
          showcase.dedicatedIntegrations?.beehome?.previewImageAlt,
        ),
      },
    },
    managementSection: {
      featureCards: managementFeatureCards,
    },
  };

  await withRetry(`createOrReplace ${document._id}`, () =>
    client.createOrReplace(document),
  );
  return document._id;
}

async function upsertPlatformShowcaseMedia(showcase) {
  const adminDashboardAsset = await uploadLocalImageIfNeeded(
    showcase.adminDashboardImagePath,
    `${showcase.pageKey || "plataforma"}-${showcase.locale || "pt"}-admin-dashboard`,
  );
  const storeMockupAsset = await uploadLocalImageIfNeeded(
    showcase.storeMockupImagePath,
    `${showcase.pageKey || "plataforma"}-${showcase.locale || "pt"}-store`,
  );
  const logisticsPanelAsset = await uploadLocalImageIfNeeded(
    showcase.logisticsPanelImagePath,
    `${showcase.pageKey || "plataforma"}-${showcase.locale || "pt"}-logistics`,
  );
  const securityPanelAsset = await uploadLocalImageIfNeeded(
    showcase.securityPanelImagePath,
    `${showcase.pageKey || "plataforma"}-${showcase.locale || "pt"}-security`,
  );

  const document = {
    _id: showcase._id,
    _type: showcase._type,
    title: showcase.title,
    pageKey: showcase.pageKey,
    locale: showcase.locale,
    adminDashboardImage: toImageField(
      adminDashboardAsset,
      showcase.adminDashboardImageAlt,
    ),
    storeMockupImage: toImageField(
      storeMockupAsset,
      showcase.storeMockupImageAlt,
    ),
    logisticsPanelImage: toImageField(
      logisticsPanelAsset,
      showcase.logisticsPanelImageAlt,
    ),
    securityPanelImage: toImageField(
      securityPanelAsset,
      showcase.securityPanelImageAlt,
    ),
  };

  await withRetry(`createOrReplace ${document._id}`, () =>
    client.createOrReplace(document),
  );
  return document._id;
}

async function upsertSiteSettings(siteSettings) {
  const headerWordmarkAsset = await uploadLocalImageIfNeeded(
    siteSettings.headerWordmarkPath,
    "site-settings-header-wordmark",
  );
  const footerWordmarkAsset = await uploadLocalImageIfNeeded(
    siteSettings.footerWordmarkPath,
    "site-settings-footer-wordmark",
  );

  const document = {
    ...siteSettings,
    headerWordmarkImage: toImageField(
      headerWordmarkAsset,
      siteSettings.headerWordmarkAlt,
    ),
    footerWordmarkImage: toImageField(
      footerWordmarkAsset,
      siteSettings.footerWordmarkAlt,
    ),
  };

  delete document.headerWordmarkPath;
  delete document.headerWordmarkAlt;
  delete document.footerWordmarkPath;
  delete document.footerWordmarkAlt;

  await withRetry(`createOrReplace ${document._id}`, () =>
    client.createOrReplace(document),
  );
  return document._id;
}

async function main() {
  const created = [];
  let currentDocumentId = "";
  const englishMenus = buildCurrentEnglishMenus();
  const englishMenuById = new Map([
    [englishMenus.header._id, englishMenus.header],
    [englishMenus.footer._id, englishMenus.footer],
  ]);
  const englishBlogPostById = new Map(
    buildCurrentEnglishBlogPosts().map((post) => [post._id, post]),
  );
  const englishMarketingPageById = new Map(
    buildCurrentEnglishMarketingPages().map((page) => [page._id, page]),
  );

  try {
    for (const menu of seedDocuments.menus || []) {
      const document = englishMenuById.get(menu._id) || menu;
      currentDocumentId = document._id;
      created.push(await upsertDocument(document));
    }

    for (const logoCollection of seedDocuments.logoCollections || []) {
      currentDocumentId = logoCollection._id;
      created.push(await upsertLogoCollection(logoCollection));
    }

    for (const showcase of seedDocuments.homeShowcaseMedia || []) {
      currentDocumentId = showcase._id;
      created.push(await upsertHomeShowcaseMedia(showcase));
    }

    for (const showcase of seedDocuments.platformShowcaseMedia || []) {
      currentDocumentId = showcase._id;
      created.push(await upsertPlatformShowcaseMedia(showcase));
    }

    if (seedDocuments.siteSettings) {
      currentDocumentId = seedDocuments.siteSettings._id;
      created.push(await upsertSiteSettings(seedDocuments.siteSettings));
    }

    for (const post of seedDocuments.blogPosts) {
      const document = englishBlogPostById.get(post._id) || post;
      currentDocumentId = document._id;
      created.push(await upsertBlogPost(document));
    }

    for (const page of seedDocuments.marketingPages) {
      const document = englishMarketingPageById.get(page._id) || page;
      currentDocumentId = document._id;
      created.push(await upsertMarketingPage(document));
    }

    for (const strategy of seedDocuments.marketingStrategies) {
      currentDocumentId = strategy._id;
      created.push(await upsertDocument(strategy));
    }

    for (const mirrorDocument of collectMirrorDocuments()) {
      currentDocumentId = mirrorDocument._id;
      created.push(await upsertDocument(mirrorDocument));
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Erro ao processar ${currentDocumentId || "documento desconhecido"}: ${message}`);
  }

  console.log("Seed concluido com sucesso.");
  console.log(`Projeto: ${projectId}`);
  console.log(`Dataset: ${dataset}`);
  console.log(`Documentos processados: ${created.length}`);
  created.forEach((id) => console.log(`- ${id}`));
}

main().catch((error) => {
  console.error("Falha ao popular o Sanity.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
