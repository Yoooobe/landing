import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createClient } from "@sanity/client";
import { seedDocuments } from "./sanity-seed-data.mjs";

const ROOT_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const ENV_FILE = path.join(ROOT_DIR, ".env.local");
const SANITY_CONFIG_FILE = path.join(os.homedir(), ".config", "sanity", "config.json");
const MESSAGE_SEGMENTS_DIR = path.join(ROOT_DIR, "src", "messages", "segments");

function extractExpression(source, matcher, label) {
  const match = source.match(matcher);
  if (!match || match.index === undefined) {
    throw new Error(`Could not locate ${label}`);
  }

  let index = match.index + match[0].length;
  while (/\s/.test(source[index] || "")) index += 1;

  let depth = 0;
  let inString = false;
  let stringQuote = "";
  let escaped = false;
  let endIndex = index;

  for (let i = index; i < source.length; i += 1) {
    const char = source[i];

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

  return source
    .slice(index, endIndex)
    .trim()
    .replace(/ as const/g, "");
}

function loadNamedExportObject(relativePath, exportName) {
  const fileContent = fs.readFileSync(path.join(ROOT_DIR, relativePath), "utf8");
  const objectExpression = extractExpression(
    fileContent,
    new RegExp(`export const ${exportName}(?:\\s*:\\s*[^=]+)?\\s*=`),
    `export ${exportName} in ${relativePath}`,
  );
  return Function(`"use strict"; return (${objectExpression});`)();
}

function loadConstObject(relativePath, constName, context = {}) {
  const fileContent = fs.readFileSync(path.join(ROOT_DIR, relativePath), "utf8");
  const objectExpression = extractExpression(
    fileContent,
    new RegExp(`const ${constName}(?:\\s*:\\s*[^=]+)?\\s*=`),
    `const ${constName} in ${relativePath}`,
  );
  return Function(
    ...Object.keys(context),
    `"use strict"; return (${objectExpression});`,
  )(...Object.values(context));
}

function materializeSeedPosts(posts) {
  return posts.map((post, index) => ({
    ...post,
    _id: `fallback-${post.locale}-${post.slug}-${index}`,
    body: (post.bodyParagraphs || []).map((paragraph, paragraphIndex) => ({
      _key: `p-${paragraphIndex}`,
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: paragraph,
          marks: [],
        },
      ],
      markDefs: [],
    })),
  }));
}

const enHome = loadNamedExportObject("src/messages/segments/en-home.ts", "enHome");
const enNav = loadNamedExportObject("src/messages/segments/en-nav.ts", "enNav");
const enFooter = loadNamedExportObject("src/messages/segments/en-footer.ts", "enFooter");
const enCasos = loadNamedExportObject("src/messages/segments/en-casos.ts", "enCasos");
const enCasosPage = loadNamedExportObject("src/messages/segments/en-casos-page.ts", "enCasosPage");
const enGamificacao = loadNamedExportObject("src/messages/segments/en-gamificacao.ts", "enGamificacao");
const enGamificacaoPage = loadNamedExportObject(
  "src/messages/segments/en-gamificacao-page.ts",
  "enGamificacaoPage",
);
const enInteligenciaPage = loadNamedExportObject(
  "src/messages/segments/en-inteligencia-page.ts",
  "enInteligenciaPage",
);
const enLandingMore = loadNamedExportObject(
  "src/messages/segments/en-landing-more.ts",
  "enLandingMore",
);
const enPlataforma = loadNamedExportObject("src/messages/segments/en-plataforma.ts", "enPlataforma");
const enBlogPage = loadNamedExportObject("src/messages/segments/en-blog-page.ts", "enBlogPage");
const enRest = loadNamedExportObject("src/messages/segments/en-rest.ts", "enRest");
const workvivoMeta = loadNamedExportObject("src/content/workvivo.ts", "workvivoMeta");
const workvivoContent = loadNamedExportObject("src/content/workvivo.ts", "workvivoContent");
const blogFallbackImg = loadConstObject("src/lib/blogFallback.ts", "IMG");
const enFallbackBlogPosts = materializeSeedPosts(
  loadConstObject("src/lib/blogFallback.ts", "enSeed", { IMG: blogFallbackImg }),
);

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

function slugField(current) {
  return { _type: "slug", current };
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

function portableTextBlocks(paragraphs) {
  return paragraphs.map((paragraph, index) => ({
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

function portableTextParagraph(key, text) {
  return [
    {
      _key: key,
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: `${key}-span`,
          _type: "span",
          marks: [],
          text,
        },
      ],
    },
  ];
}

function legacySectionBlock(section) {
  return {
    _key: section,
    _type: "legacySectionBlock",
    section,
  };
}

function legacySections(...sections) {
  return sections.map(legacySectionBlock);
}

function logoStripBlock(key, values) {
  return {
    _key: key,
    _type: "logoStripBlock",
    ...values,
  };
}

export function homePayloadEn() {
  return {
    seo: {
      title: enHome.seo.title,
      description: enHome.seo.description,
    },
    hero: {
      ...enHome.hero,
      ctaDemoHref: "https://calendly.com/yoobeco/demo",
      ctaExploreHref: "/en/#platform",
      floatAdhesionValue: "92%",
      floatRhValue: "0%",
      floatEnpsValue: "+42 pts",
    },
    fourUnik: {
      ...enHome.fourUnik,
      ctaHref: "https://4unik.com.br",
    },
    trust: {
      ...enHome.trust,
    },
    finalCta: {
      ...enHome.finalCta,
      demoHref: "https://calendly.com/yoobeco/demo",
      whatsappHref: "https://wa.me/554187582060",
    },
  };
}

export function apiIntegracoesPayloadEn() {
  return {
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
  };
}

export function gamificacaoPayloadEn() {
  return {
    seo: {
      title: "Corporate Gamification | 4Unik",
      description:
        "Corporate gamification engine with points, rankings, missions, real rewards, and analytics for HR and business leaders.",
      openGraphDescription:
        "Corporate gamification with points, leaderboards, challenges, and real rewards to improve engagement and performance.",
    },
    hero: {
      ...enGamificacao.hero,
      ctaHref: "#mechanics",
    },
    problem: enGamificacao.problem,
    mechanics: enGamificacaoPage.mechanics,
    flow: enGamificacaoPage.flow,
    cases: enGamificacaoPage.cases,
    trends: enGamificacaoPage.trends,
    stats: enGamificacaoPage.stats,
    kpis: enGamificacaoPage.kpis,
    deepUsecases: enGamificacaoPage.deepUsecases,
    faq: enGamificacaoPage.faq,
    finalCta: {
      ...enGamificacao.pageCta,
      ctaHref: "https://calendly.com/yoobeco/demo",
    },
  };
}

function inteligenciaBlocksEn() {
  const page = enInteligenciaPage;
  return [
    {
      _key: "hero",
      _type: "heroBlock",
      headline: `${page.hero.titleBefore} ${page.hero.titleGradient}`,
      subheadline: page.hero.sub,
      ctaText: page.cta.button,
      ctaLink: "https://calendly.com/yoobeco/demo",
    },
    {
      _key: "core-capabilities",
      _type: "featureGridBlock",
      eyebrow: page.hero.badge,
      title: "What the intelligence layer unlocks",
      description:
        "Core capabilities that make engagement programs more adaptive, personalized, and measurable.",
      columns: "2",
      items: page.cards.map((card, index) => ({
        _key: `core-capabilities-${index + 1}`,
        title: card.title,
        description: card.desc,
        icon: ["brain-circuit", "package", "target", "bar-chart-3"][index],
      })),
    },
    {
      _key: "workvivo-ai",
      _type: "featureGridBlock",
      eyebrow: "Workvivo + AI",
      title: `${page.workvivo.titleBefore} ${page.workvivo.titleGradient}`,
      description: page.workvivo.sub,
      columns: "3",
      items: page.workvivo.cases.map((item, index) => ({
        _key: `workvivo-ai-${index + 1}`,
        title: item.title,
        description: item.desc,
        icon: ["zap", "message-square", "target", "shield", "coins", "bar-chart-3"][index],
      })),
    },
    {
      _key: "faq",
      _type: "faqBlock",
      title: `${page.faq.titleBefore} ${page.faq.titleGradient} ${page.faq.titleAfter}`.trim(),
      items: page.faq.items.map((item, index) => ({
        _key: `faq-item-${index + 1}`,
        question: item.q,
        answer: item.a,
      })),
    },
    {
      _key: "cta",
      _type: "ctaBlock",
      eyebrow: "Next step",
      title: page.cta.title,
      description: page.cta.sub,
      primaryLabel: page.cta.button,
      primaryHref: "https://calendly.com/yoobeco/demo",
    },
  ];
}

function casosBlocksEn() {
  const page = enCasosPage;
  return [
    {
      _key: "hero",
      _type: "heroBlock",
      headline: `${page.hero.titleBefore} ${page.hero.titleGradient}${page.hero.titleAfter || ""}`,
      subheadline: page.hero.sub,
    },
    {
      _key: "case-studies",
      _type: "caseStudyGridBlock",
      challengeLabel: page.caseStudies.challengeLabel,
      resultsLabel: page.caseStudies.resultsLabel,
      items: page.caseStudies.cases.map((item, index) => ({
        _key: `case-studies-${index + 1}`,
        company: item.company,
        industry: item.industry,
        title: item.title,
        description: item.description,
        challenge: item.challenge,
        metrics: item.metrics.map((metric, metricIndex) => ({
          _key: `case-studies-${index + 1}-metric-${metricIndex + 1}`,
          value: metric.value,
          label: metric.label,
          tone: "tone" in metric ? metric.tone : undefined,
        })),
      })),
    },
    {
      _key: "faq",
      _type: "faqBlock",
      title: `${page.faq.titleBefore} ${page.faq.titleGradient} ${page.faq.titleAfter}`.trim(),
      items: page.faq.items.map((item, index) => ({
        _key: `faq-item-${index + 1}`,
        question: item.q,
        answer: item.a,
      })),
    },
    {
      _key: "cta",
      _type: "ctaBlock",
      eyebrow: "Next step",
      title: enCasos.pageCta.title,
      description: enCasos.pageCta.body,
      primaryLabel: enCasos.pageCta.cta,
      primaryHref: "https://calendly.com/yoobeco/demo",
    },
  ];
}

function plataformaBlocksEn() {
  const page = enPlataforma;
  const roadmap = enLandingMore.aiRoadmap;
  return [
    {
      _key: "hero",
      _type: "heroBlock",
      headline: `${page.hero.titleLine1} ${page.hero.titleGradient}`,
      subheadline: page.hero.sub,
      ctaText: page.pageCta.cta,
      ctaLink: "https://calendly.com/yoobeco/demo",
    },
    {
      _key: "admin-dashboard",
      _type: "splitContentBlock",
      eyebrow: page.adminDashboard.badge,
      title: `${page.adminDashboard.titleBefore}${page.adminDashboard.titleGradient}${page.adminDashboard.titleAfter}`,
      body: portableTextParagraph("admin-dashboard-body", page.adminDashboard.body),
      bullets: page.adminDashboard.bullets.map((item) => `${item.title}: ${item.body}`),
      imageSide: "right",
    },
    {
      _key: "gamification-engine-intro",
      _type: "splitContentBlock",
      eyebrow: page.gamificationEngine.badge,
      title: `${page.gamificationEngine.titleBefore}${page.gamificationEngine.titleGradient}${page.gamificationEngine.titleAfter}`,
      body: portableTextParagraph("gamification-engine-body", page.gamificationEngine.body),
      bullets: [
        `${page.gamificationEngine.flowTitle}: ${page.gamificationEngine.flow.node1Title} -> ${page.gamificationEngine.flow.node2Title} -> ${page.gamificationEngine.flow.node3Title}`,
      ],
      imageSide: "left",
    },
    {
      _key: "gamification-engine-cards",
      _type: "featureGridBlock",
      eyebrow: "Engine mechanics",
      title: "How the platform turns goals into reward loops",
      description:
        "Use campaigns, peer recognition, and event-driven logic as reusable building blocks.",
      columns: "2",
      items: page.gamificationEngine.cards.map((item, index) => ({
        _key: `gamification-engine-cards-${index + 1}`,
        title: item.title,
        description: item.body,
        icon: index === 0 ? "target" : "coins",
      })),
    },
    {
      _key: "store-intro",
      _type: "splitContentBlock",
      eyebrow: page.store.badge,
      title: `${page.store.titleBefore}${page.store.titleGradient}${page.store.titleAfter}`,
      body: portableTextParagraph(
        "store-intro-body",
        `${page.store.bodyBefore}${page.store.bodyStrong}${page.store.bodyAfter}`,
      ),
      imageSide: "right",
    },
    {
      _key: "store-features",
      _type: "featureGridBlock",
      eyebrow: "Store operations",
      title: "A catalog experience employees actually want to use",
      description: "Blend physical and digital rewards into a single redemption flow.",
      columns: "2",
      items: page.store.features.map((item, index) => ({
        _key: `store-features-${index + 1}`,
        title: item.title,
        description: item.desc,
        icon: index === 0 ? "store" : "sparkles",
      })),
    },
    {
      _key: "logistics",
      _type: "featureGridBlock",
      eyebrow: "Fulfillment",
      title: page.logistics.title,
      description: page.logistics.sub,
      columns: "3",
      items: page.logistics.cards.map((item, index) => ({
        _key: `logistics-${index + 1}`,
        title: item.title,
        description: item.body,
        icon: index === 0 ? "package" : index === 1 ? "globe-2" : "shield",
      })),
    },
    {
      _key: "ai-roadmap",
      _type: "featureGridBlock",
      eyebrow: roadmap.badge,
      title: `${roadmap.titleBefore}${roadmap.titleGradient}${roadmap.titleAfter}`,
      description: "The same platform can evolve from operational control to intelligent orchestration.",
      columns: "4",
      items: roadmap.stages.map((stage, index) => ({
        _key: `ai-roadmap-${index + 1}`,
        eyebrow: stage.status,
        title: stage.title,
        description: stage.items.join(" • "),
        icon: index === 0 ? "sparkles" : index === 1 ? "coins" : index === 2 ? "zap" : "bar-chart-3",
      })),
    },
    {
      _key: "security",
      _type: "splitContentBlock",
      eyebrow: page.security.badge,
      title: page.security.title,
      body: portableTextParagraph("security-body", page.security.body),
      bullets: page.security.items.map((item) => `${item.title}: ${item.body}`),
      imageSide: "left",
    },
    {
      _key: "faq",
      _type: "faqBlock",
      title: `${page.faq.titleBefore} ${page.faq.titleGradient} ${page.faq.titleAfter}`.trim(),
      items: page.faq.items.map((item, index) => ({
        _key: `faq-item-${index + 1}`,
        question: item.q,
        answer: item.a,
      })),
    },
    {
      _key: "cta",
      _type: "ctaBlock",
      eyebrow: "Next step",
      title: page.pageCta.title,
      primaryLabel: page.pageCta.cta,
      primaryHref: "https://calendly.com/yoobeco/demo",
    },
  ];
}

export function buildCurrentEnglishMenus() {
  return {
    header: {
      _id: "menu.header.en",
      _type: "menu",
      title: "Header EN",
      menuKey: "header",
      locale: "en",
      sections: [
        {
          _key: "product",
          title: "Platform",
          items: [
            {
              _key: "overview",
              label: enNav.overview.title,
              description: enNav.overview.desc,
              href: "/plataforma",
              icon: "overview",
            },
            {
              _key: "gamification",
              label: enNav.gamification.title,
              description: enNav.gamification.desc,
              href: "/gamificacao",
              badge: enNav.gamification.badge,
              icon: "gamification",
            },
            {
              _key: "intelligence",
              label: enNav.intelligence.title,
              description: enNav.intelligence.desc,
              href: "/inteligencia",
              badge: enNav.intelligence.badge,
              icon: "intelligence",
            },
          ],
        },
        {
          _key: "solutions",
          title: "Solutions",
          items: [
            {
              _key: "cases",
              label: enNav.cases.title,
              description: enNav.cases.desc,
              href: "/casos-de-uso",
              icon: "cases",
            },
            {
              _key: "rewards",
              label: enNav.rewardsHub.title,
              description: enNav.rewardsHub.desc,
              href: "https://catalogo.yoobe.co",
              icon: "rewards",
              openInNewTab: true,
            },
          ],
        },
        {
          _key: "api",
          title: "API",
          items: [
            {
              _key: "apiHub",
              label: enNav.apiHub.title,
              description: enNav.apiHub.desc,
              href: "/api-integracoes",
              icon: "api",
            },
            {
              _key: "workvivo",
              label: enNav.workvivo.title,
              description: enNav.workvivo.desc,
              href: "/api-integracoes/workvivo/",
              icon: "workvivo",
            },
          ],
        },
      ],
    },
    footer: {
      _id: "menu.footer.en",
      _type: "menu",
      title: "Footer EN",
      menuKey: "footer",
      locale: "en",
      sections: [
        {
          _key: "platform",
          title: enFooter.colPlatform,
          items: [
            { _key: "motor", label: enFooter.links.motor, href: "/plataforma/motor-gamificacao" },
            { _key: "wallets", label: enFooter.links.wallets, href: "/plataforma/controle-carteiras" },
            { _key: "manager", label: enFooter.links.gestor, href: "/plataforma/painel-gestor" },
            { _key: "cases", label: enFooter.links.casos, href: "/casos-de-uso" },
          ],
        },
        {
          _key: "resources",
          title: enFooter.colResources,
          items: [
            { _key: "api", label: enFooter.links.api, href: "/api-integracoes" },
            {
              _key: "catalog",
              label: enFooter.links.catalogo,
              href: "https://catalogo.yoobe.co",
              openInNewTab: true,
            },
            {
              _key: "company",
              label: enFooter.links.logistica,
              href: "https://4unik.com.br",
              openInNewTab: true,
            },
          ],
        },
        {
          _key: "contact",
          title: enFooter.colContact,
          items: [
            {
              _key: "demo",
              label: enFooter.links.demo,
              href: "https://calendly.com/yoobeco/demo",
              openInNewTab: true,
            },
            {
              _key: "sales",
              label: enFooter.links.comercial,
              href: "https://wa.me/554187582060",
              openInNewTab: true,
            },
          ],
        },
      ],
    },
  };
}

export function buildCurrentEnglishBlogPosts() {
  const fallbackPosts = enFallbackBlogPosts;
  const seedPosts = seedDocuments.blogPosts.filter((post) => post.locale === "en");
  return seedPosts.map((seedPost, index) => {
    const fallback = fallbackPosts[index];
    if (!fallback) return seedPost;
    return {
      ...seedPost,
      title: fallback.title,
      excerpt: fallback.excerpt,
      category: fallback.category,
      publishedAt: fallback.publishedAt,
      readTimeMinutes: fallback.readTimeMinutes,
      featured: fallback.featured,
      relatedKeywords: fallback.relatedKeywords,
      seo: fallback.seo,
      body: fallback.body,
      imageAlt: fallback.coverImage?.alt || seedPost.imageAlt,
      imageUrl: fallback.coverImage?.asset?.url || seedPost.imageUrl,
    };
  });
}

function mergeVisualFields(current, base) {
  if (Array.isArray(current)) {
    if (!Array.isArray(base)) return current;
    return current.map((item, index) => mergeVisualFields(item, base[index]));
  }

  if (!current || typeof current !== "object") {
    return current;
  }

  if (!base || typeof base !== "object" || Array.isArray(base)) {
    return current;
  }

  const merged = { ...current };
  for (const key of ["image", "imagePath", "imageAlt", "logo", "logoPath", "logoAlt"]) {
    if (merged[key] === undefined && base[key] !== undefined) {
      merged[key] = base[key];
    }
  }

  for (const [key, value] of Object.entries(merged)) {
    if (Array.isArray(value) && Array.isArray(base[key])) {
      merged[key] = mergeVisualFields(value, base[key]);
    }
  }

  return merged;
}

function pageBaseById(id) {
  return seedDocuments.marketingPages.find((page) => page._id === id);
}

export function buildCurrentEnglishMarketingPages() {
  const pages = [
    {
      _id: "marketingPage.en.home",
      _type: "marketingPage",
      title: "Home",
      slug: slugField("home"),
      locale: "en",
      summary:
        "Fallback marketing page that preserves the current home layout while editorial ownership moves into Sanity.",
      seo: {
        metaTitle: enHome.seo.title,
        metaDescription: enHome.seo.description,
      },
      content: [
        legacySectionBlock("homeHero"),
        legacySectionBlock("homeFourUnik"),
        logoStripBlock("home-trust", {
          displayStyle: "compact",
          title: "Companies that trust 4Unik",
          collection: { _type: "reference", _ref: "logoCollection.trustBar" },
        }),
        legacySectionBlock("homeBentoFeatures"),
        legacySectionBlock("homePlatformTabs"),
        legacySectionBlock("homeStatsBar"),
        legacySectionBlock("homeWhySection"),
        legacySectionBlock("homeGamificationSummary"),
        legacySectionBlock("homeGamificationDuality"),
        legacySectionBlock("homeEnterpriseCases"),
        legacySectionBlock("homeDedicatedIntegrations"),
        legacySectionBlock("homeStoreSection"),
        legacySectionBlock("homeApiSection"),
        legacySectionBlock("homeAiRoadmap"),
        legacySectionBlock("homeManagementSection"),
        legacySectionBlock("homeHowItWorks"),
        legacySectionBlock("homePricingSection"),
        legacySectionBlock("homeTestimonialsSection"),
        logoStripBlock("home-clients", {
          displayStyle: "grid",
          sectionId: "clientes",
          eyebrow: "Who trusts 4Unik",
          title: "Companies that have already transformed their people programs",
          description:
            "From startups to large enterprises, we help HR teams run recognition programs that work.",
          collection: { _type: "reference", _ref: "logoCollection.clientsGrid" },
        }),
        legacySectionBlock("homeFinalCta"),
      ],
    },
    {
      _id: "marketingPage.en.api-integracoes",
      _type: "marketingPage",
      title: "API & Integrations",
      slug: slugField("api-integracoes"),
      locale: "en",
      summary:
        "Fallback marketing page for API and integrations until the page is fully modeled with Sanity blocks.",
      seo: {
        metaTitle: apiIntegracoesPayloadEn().seo.title,
        metaDescription: apiIntegracoesPayloadEn().seo.description,
      },
      content: legacySections("apiIntegracoesPage"),
    },
    {
      _id: "marketingPage.en.gamificacao",
      _type: "marketingPage",
      title: "Corporate Gamification",
      slug: slugField("gamificacao"),
      locale: "en",
      summary: "Fallback marketing page for the corporate gamification offer.",
      seo: {
        metaTitle: gamificacaoPayloadEn().seo.title,
        metaDescription: gamificacaoPayloadEn().seo.description,
      },
      content: legacySections(
        "gamificacaoHero",
        "gamificacaoProblem",
        "gamificacaoMechanics",
        "gamificacaoFlow",
        "gamificacaoCases",
        "gamificacaoTrends",
        "gamificacaoStats",
        "gamificacaoKpis",
        "gamificacaoDeepUsecases",
        "gamificacaoFaq",
        "gamificacaoCta",
      ),
    },
    {
      _id: "marketingPage.en.plataforma",
      _type: "marketingPage",
      title: "Platform",
      slug: slugField("plataforma"),
      locale: "en",
      summary: "Fallback marketing page for the platform overview.",
      seo: {
        metaTitle: enPlataforma.seo.title,
        metaDescription: enPlataforma.seo.description,
      },
      content: plataformaBlocksEn(),
    },
    {
      _id: "marketingPage.en.inteligencia",
      _type: "marketingPage",
      title: "Intelligence",
      slug: slugField("inteligencia"),
      locale: "en",
      summary: "Fallback marketing page for the intelligence and AI narrative.",
      seo: {
        metaTitle: enInteligenciaPage.seo.title,
        metaDescription: enInteligenciaPage.seo.description,
      },
      content: inteligenciaBlocksEn(),
    },
    {
      _id: "marketingPage.en.casos-de-uso",
      _type: "marketingPage",
      title: "Use Cases",
      slug: slugField("casos-de-uso"),
      locale: "en",
      summary: "Fallback marketing page for use cases and case studies.",
      seo: {
        metaTitle: enCasosPage.seo.title,
        metaDescription: enCasosPage.seo.description,
      },
      content: casosBlocksEn(),
    },
  ];

  return pages.map((page) => {
    const base = pageBaseById(page._id);
    if (!base) return page;
    return {
      ...base,
      ...page,
      content: mergeVisualFields(page.content, base.content),
    };
  });
}

export function buildSegmentRoutePayload(fileName) {
  switch (fileName) {
    case "en-casos-page.ts":
      return JSON.stringify({
        seo: enCasosPage.seo,
        faqItems: enCasosPage.faq.items,
        messagesOverride: { casosPage: enCasosPage },
      });
    case "en-inteligencia-page.ts":
      return JSON.stringify({
        seo: enInteligenciaPage.seo,
        faqItems: enInteligenciaPage.faq.items,
        messagesOverride: {
          inteligenciaPage: enInteligenciaPage,
          landingMore: { aiRoadmap: enLandingMore.aiRoadmap },
        },
      });
    case "en-plataforma.ts":
      return JSON.stringify({
        seo: enPlataforma.seo,
        faqItems: enPlataforma.faq.items,
        messagesOverride: {
          plataforma: enPlataforma,
          landingMore: { aiRoadmap: enLandingMore.aiRoadmap },
        },
      });
    case "en-landing-more.ts":
      return JSON.stringify({
        messagesOverride: { landingMore: { plataformaStubs: enLandingMore.plataformaStubs } },
        stubSeo: {
          motor: {
            title: "Gamification Engine | 4Unik",
            description: enLandingMore.plataformaStubs.motor.body,
          },
          logistica: {
            title: "Integrated Logistics | 4Unik",
            description: enLandingMore.plataformaStubs.logistica.body,
          },
          loja: {
            title: "Corporate Store & Redemptions | 4Unik",
            description: enLandingMore.plataformaStubs.loja.body,
          },
        },
      });
    case "en-blog-page.ts":
      return JSON.stringify({
        seo: {
          title: "Blog | 4Unik",
          description:
            "Insights, guides, and trends on employee engagement, gamification, and rewards logistics.",
          openGraphDescription:
            "Insights, guides, and trends on employee engagement, gamification, and rewards logistics.",
        },
        messagesOverride: {
          blogPage: {
            ...enBlogPage,
            backToBlog: "Back to blog",
          },
        },
      });
    case "en-rest.ts":
      return JSON.stringify({
        redirectMessage: enRest.workvivoRedirect.message,
      });
    default:
      return undefined;
  }
}

function collectEnglishMirrorDocuments() {
  const segmentFiles = fs
    .readdirSync(MESSAGE_SEGMENTS_DIR)
    .filter((fileName) => fileName.startsWith("en-") && fileName.endsWith(".ts"))
    .sort();

  const segmentDocuments = segmentFiles.map((fileName) => {
    const relativePath = path.join("src", "messages", "segments", fileName);
    const content = fs.readFileSync(path.join(ROOT_DIR, relativePath), "utf8");
    return {
      _id: `contentMirror.${toSanityIdFragment(fileName)}`,
      _type: "contentMirror",
      title: `Segmento ${titleFromSegmentFile(fileName)}`,
      sourceKey: relativePath.replace(/[\\/]/g, ":"),
      sourcePath: relativePath,
      locale: inferLocaleFromFileName(fileName),
      area: "messages",
      contentFormat: "typescript",
      summary: `Mirror of ${fileName} with the editorial content currently used in the frontend.`,
      ...(fileName === "en-home.ts" ? { homePayload: homePayloadEn() } : {}),
      ...(fileName === "en-gamificacao-page.ts"
        ? { gamificacaoPayload: gamificacaoPayloadEn() }
        : {}),
      ...(buildSegmentRoutePayload(fileName)
        ? { routePayloadJson: buildSegmentRoutePayload(fileName) }
        : {}),
      content,
    };
  });

  const workvivoPath = "src/content/workvivo.ts";
  const apiMetadataPath = "src/app/(en)/en/api-integracoes/page.tsx";

  const extraDocuments = [
    {
      _id: `contentMirror.${toSanityIdFragment(workvivoPath)}`,
      _type: "contentMirror",
      title: "Workvivo content",
      sourceKey: workvivoPath.replace(/[\\/]/g, ":"),
      sourcePath: workvivoPath,
      locale: "global",
      area: "special-content",
      contentFormat: "typescript",
      summary: "Mirror of the special Workvivo landing content in PT and EN.",
      routePayloadJson: JSON.stringify({ workvivoMeta, workvivoContent }),
      content: fs.readFileSync(path.join(ROOT_DIR, workvivoPath), "utf8"),
    },
    {
      _id: `contentMirror.${toSanityIdFragment(apiMetadataPath)}`,
      _type: "contentMirror",
      title: "API Integrations metadata EN",
      sourceKey: apiMetadataPath.replace(/[\\/]/g, ":"),
      sourcePath: apiMetadataPath,
      locale: "en",
      area: "metadata",
      contentFormat: "tsx",
      summary: "Mirror of the hardcoded metadata for the API & Integrations page in English.",
      apiIntegracoesPayload: apiIntegracoesPayloadEn(),
      content: fs.readFileSync(path.join(ROOT_DIR, apiMetadataPath), "utf8"),
    },
  ];

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
  throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not configured with a real value.");
}

if (!dataset) {
  throw new Error("NEXT_PUBLIC_SANITY_DATASET is not configured.");
}

if (!token) {
  throw new Error('No Sanity write token found. Run "npx sanity login" or define SANITY_API_WRITE_TOKEN.');
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-03-17",
  useCdn: false,
});

const uploadedImages = new Map();

async function uploadImageIfNeeded(imageUrl, filename) {
  if (!imageUrl) return null;
  if (uploadedImages.has(imageUrl)) return uploadedImages.get(imageUrl);

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to download image ${imageUrl}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename });
  uploadedImages.set(imageUrl, asset);
  return asset;
}

async function uploadLocalImageIfNeeded(relativePath, filename) {
  if (!relativePath) return null;
  const absolutePath = path.join(ROOT_DIR, relativePath);
  if (uploadedImages.has(absolutePath)) return uploadedImages.get(absolutePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Image file not found: ${relativePath}`);
  }
  const buffer = fs.readFileSync(absolutePath);
  const asset = await client.assets.upload("image", buffer, {
    filename: filename || path.basename(relativePath),
  });
  uploadedImages.set(absolutePath, asset);
  return asset;
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

async function upsertDocument(document) {
  await client.createOrReplace(document);
  return document._id;
}

async function upsertBlogPost(post) {
  const imageAsset = await uploadImageIfNeeded(post.imageUrl, `${post.slug.current}.jpg`);
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
  await client.createOrReplace(document);
  return document._id;
}

async function upsertMarketingPage(page) {
  const content = await resolveMarketingPageContent(page.content, page._id);
  const document = {
    ...page,
    content,
  };
  await client.createOrReplace(document);
  return document._id;
}

export async function main() {
  const processed = [];
  const menus = buildCurrentEnglishMenus();

  processed.push(await upsertDocument(menus.header));
  processed.push(await upsertDocument(menus.footer));

  for (const post of buildCurrentEnglishBlogPosts()) {
    processed.push(await upsertBlogPost(post));
  }

  for (const page of buildCurrentEnglishMarketingPages()) {
    processed.push(await upsertMarketingPage(page));
  }

  for (const mirrorDocument of collectEnglishMirrorDocuments()) {
    processed.push(await upsertDocument(mirrorDocument));
  }

  console.log("English Sanity sync completed successfully.");
  console.log(`Project: ${projectId}`);
  console.log(`Dataset: ${dataset}`);
  console.log(`Documents processed: ${processed.length}`);
  processed.forEach((id) => console.log(`- ${id}`));
}

const entryHref = process.argv[1] ? pathToFileURL(process.argv[1]).href : "";
if (import.meta.url === entryHref) {
  main().catch((error) => {
    console.error("English Sanity sync failed.");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    process.exitCode = 1;
  });
}
