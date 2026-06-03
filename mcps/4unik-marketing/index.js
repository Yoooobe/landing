#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../..");
const KB_ROOT = path.join(REPO_ROOT, "docs/knowledge-base");
const NOTEBOOKLM_DIR = path.join(KB_ROOT, "notebooklm");

/**
 * Base pública alinhada a `src/lib/site.ts` + `src/lib/basePath.ts`.
 * Sobrescreva com SITE_URL no ambiente do MCP se necessário.
 */
const DEFAULT_SITE_URL = process.env.SITE_URL || "https://yoooobe.github.io/landing";
const DEFAULT_STALE_AFTER_DAYS = 30;

// Configurações e credenciais simuladas para GA API
const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID || "123456789";

function normalizePath(routePath) {
  if (!routePath || String(routePath).trim() === "") return "";
  const p = String(routePath).trim();
  return p.startsWith("/") ? p : `/${p}`;
}

function readTextFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function parseYamlScalar(raw, key) {
  const line = raw.split("\n").find((l) => l.startsWith(`${key}:`));
  if (!line) return null;
  let v = line.slice(key.length + 1).trim();
  if (v === "null") return null;
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1);
  }
  return v || null;
}

function parseNotebooklmMeta() {
  const raw = readTextFileSafe(path.join(NOTEBOOKLM_DIR, "meta.yaml"));
  if (!raw) {
    return {
      notebook_id: null,
      last_synced: null,
      stale_after_days: DEFAULT_STALE_AFTER_DAYS,
    };
  }
  const stale = parseYamlScalar(raw, "stale_after_days");
  return {
    notebook_id: parseYamlScalar(raw, "notebook_id"),
    notebook_url: parseYamlScalar(raw, "notebook_url"),
    last_synced: parseYamlScalar(raw, "last_synced"),
    stale_after_days: stale ? Number(stale) : DEFAULT_STALE_AFTER_DAYS,
    owner: parseYamlScalar(raw, "owner"),
    sync_frequency_recommended: parseYamlScalar(raw, "sync_frequency_recommended"),
  };
}

function listKnowledgeMarkdownFiles(dir = KB_ROOT, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listKnowledgeMarkdownFiles(full, acc);
    else if (entry.name.endsWith(".md")) acc.push(full);
  }
  return acc;
}

function searchProductKnowledge(query, maxResults = 12) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) {
    return { status: "error", message: "query é obrigatório" };
  }
  const hits = [];
  for (const filePath of listKnowledgeMarkdownFiles()) {
    const rel = path.relative(REPO_ROOT, filePath);
    const lines = readTextFileSafe(filePath)?.split("\n") || [];
    lines.forEach((line, idx) => {
      if (line.toLowerCase().includes(q)) {
        hits.push({
          file: rel,
          line: idx + 1,
          excerpt: line.trim().slice(0, 240),
        });
      }
    });
  }
  return {
    status: "success",
    query: q,
    totalMatches: hits.length,
    matches: hits.slice(0, maxResults),
    truncated: hits.length > maxResults,
    kbRoot: path.relative(REPO_ROOT, KB_ROOT),
  };
}

function daysSinceIsoDate(isoDate) {
  if (!isoDate) return null;
  const parsed = new Date(`${isoDate}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  const diffMs = Date.now() - parsed.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function getKnowledgeFreshness() {
  const meta = parseNotebooklmMeta();
  const days = daysSinceIsoDate(meta.last_synced);
  const threshold = meta.stale_after_days || DEFAULT_STALE_AFTER_DAYS;
  const briefing = readTextFileSafe(path.join(NOTEBOOKLM_DIR, "briefing.md")) || "";
  const briefingEmpty =
    briefing.includes("Nenhum conteúdo do notebook foi sincronizado") ||
    briefing.includes("Ação necessária");

  let status = "ok";
  if (!meta.last_synced || briefingEmpty) status = "missing_sync";
  else if (days !== null && days > threshold) status = "stale";

  return {
    status: "success",
    freshness: status,
    last_synced: meta.last_synced,
    days_since_sync: days,
    stale_after_days: threshold,
    is_stale: status === "stale",
    briefing_needs_content: briefingEmpty,
    recommendation:
      status === "missing_sync"
        ? "Cole o Briefing do NotebookLM em docs/knowledge-base/notebooklm/briefing.md e atualize meta.yaml."
        : status === "stale"
          ? `Último sync há ${days} dias (limite ${threshold}). Reexportar do NotebookLM.`
          : "Base de conhecimento dentro do prazo.",
    meta,
  };
}

function getNotebooklmBriefing() {
  const meta = parseNotebooklmMeta();
  const briefingPath = path.join(NOTEBOOKLM_DIR, "briefing.md");
  const briefing = readTextFileSafe(briefingPath);
  return {
    status: "success",
    meta,
    briefingPath: path.relative(REPO_ROOT, briefingPath),
    briefing: briefing || "",
    briefingLength: briefing?.length || 0,
    note: !meta.last_synced
      ? "last_synced não definido — ver docs/agent-knowledge-notebooklm.md"
      : undefined,
  };
}

function listPtAppRoutes() {
  const ptApp = path.join(REPO_ROOT, "src/app/(pt)");
  const routes = [];
  function walk(currentDir, urlPrefix) {
    if (!fs.existsSync(currentDir)) return;
    if (fs.existsSync(path.join(currentDir, "page.tsx"))) {
      routes.push(urlPrefix === "" ? "/" : urlPrefix);
    }
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const nextPrefix =
        urlPrefix === "" ? `/${entry.name}` : `${urlPrefix}/${entry.name}`;
      walk(path.join(currentDir, entry.name), nextPrefix);
    }
  }
  walk(ptApp, "");
  return [...new Set(routes)].sort();
}

const STRATEGIC_PAGE_GAPS = [
  {
    route: "/seguranca/",
    enRoute: "/en/seguranca/",
    intention: "Governança, LGPD, confiança enterprise",
    icp: "Segurança, TI, comprador enterprise",
    proofNeeded: "Políticas reais, certificações verificáveis",
    effort: "high",
    priority: "P2",
    source: "docs/enterprise-content-strategy.md",
  },
  {
    route: "/recursos/sla/",
    enRoute: "/en/recursos/sla/",
    intention: "SLA e suporte B2B",
    icp: "TI / procurement",
    proofNeeded: "SLA contratual",
    effort: "medium",
    priority: "P3",
    source: "docs/enterprise-content-strategy.md",
  },
  {
    route: "/gamificacao-para-rh/",
    enRoute: "/en/gamification-for-hr/",
    intention: "Pilar SEO/AEO long-tail RH",
    icp: "CHRO, People Ops",
    proofNeeded: "FAQ + casos",
    effort: "medium",
    priority: "P1",
    source: "docs/aeo-ai-visibility.md",
  },
  {
    route: "/para-plataformas/",
    enRoute: "/en/for-platforms/",
    intention: "Camada de execução embedded: API de recompensas dentro do app do parceiro (Product/Inventory/Checkout, SDK, webhooks)",
    icp: "Plataformas de gamificação / B2B SaaS (CTO, Produto)",
    proofNeeded: "Docs de API, fluxo de integração, SDK/sandbox confirmados pelo produto",
    effort: "high",
    priority: "P1",
    source: "docs/knowledge-base/notebooklm/icp-personas.md",
  },
  {
    route: "/educacao/",
    enRoute: "/en/education/",
    intention: "Recompensa tangível por conclusão de curso para e-learning/infoprodutores",
    icp: "E-learning, infoprodutores, L&D",
    proofNeeded: "Caso Boticário (+308% conclusão) com aprovação de marca",
    effort: "medium",
    priority: "P2",
    source: "docs/knowledge-base/notebooklm/icp-personas.md",
  },
  {
    route: "/vendas/",
    enRoute: "/en/sales/",
    intention: "Incentivo de vendas integrado ao CRM com premiação instantânea",
    icp: "Diretor/VP de Vendas, RevOps",
    proofNeeded: "Integração CRM e fluxo de pontos automáticos",
    effort: "medium",
    priority: "P2",
    source: "docs/knowledge-base/notebooklm/icp-personas.md",
  },
  {
    route: "/comunidades/",
    enRoute: "/en/communities/",
    intention: "Loja VIP de fãs com fulfillment 100% pela 4unik",
    icp: "Criadores de conteúdo, gestores de comunidade",
    proofNeeded: "Exemplos de swag exclusivo + catálogo",
    effort: "medium",
    priority: "P3",
    source: "docs/knowledge-base/notebooklm/icp-personas.md",
  },
  {
    route: "/eventos/",
    enRoute: "/en/events/",
    intention: "Pontos no evento + checkout no celular: retira no estande ou recebe em casa",
    icp: "Produtores de eventos físicos/híbridos, agências de experiência",
    proofNeeded: "Fluxo de checkout e rastreio no evento",
    effort: "medium",
    priority: "P3",
    source: "docs/knowledge-base/notebooklm/icp-personas.md",
  },
  {
    route: "/recursos/roi-calculadora/",
    enRoute: "/en/resources/roi-calculator/",
    intention: "Conversão mid-funnel",
    icp: "RH Strategist",
    proofNeeded: "Modelo de ROI auditável",
    effort: "high",
    priority: "P2",
    source: "docs/landing-improvement-backlog.md",
  },
];

function suggestGrowthOpportunities(focus) {
  const existing = listPtAppRoutes();
  const existingSet = new Set(existing.map((r) => r.replace(/\/$/, "") || "/"));

  const missingPages = STRATEGIC_PAGE_GAPS.filter((gap) => {
    const key = gap.route.replace(/\/$/, "") || "/";
    return !existingSet.has(key);
  });

  const kbSearch = focus
    ? searchProductKnowledge(focus, 6)
    : { status: "skipped", note: "Passe focus para cruzar com a KB" };

  const freshness = getKnowledgeFreshness();

  return {
    status: "success",
    focus: focus || null,
    knowledgeFreshness: freshness.freshness,
    existingRouteCount: existing.length,
    sampleExistingRoutes: existing.slice(0, 20),
    strategicGaps: missingPages,
    blogClusters: [
      "Reward infrastructure / API",
      "Gamificação para RH",
      "Integrações enterprise (Workvivo, HRIS)",
      "Prova social e casos",
    ],
    ctaOpportunities: [
      "Fortalecer CTA acima da dobra em /casos-de-uso/ e /api-integracoes/",
      "Alinhar FAQs a perguntas literais para AEO (get_aeo_landing_checklist)",
      "Verificar NEXT_PUBLIC_LEADS_INGEST_URL em produção",
    ],
    backlogFile: "docs/landing-improvement-backlog.md",
    enterpriseStrategy: "docs/enterprise-content-strategy.md",
    kbMatches: kbSearch.status === "success" ? kbSearch.matches : undefined,
    nextSteps: [
      "Adicionar linhas em docs/landing-improvement-backlog.md (secção Next Up)",
      "Sync NotebookLM se freshness !== ok",
      "Uma rota por batch implementation com paridade PT/EN",
    ],
  };
}

function buildPageUrl(path) {
  const base = DEFAULT_SITE_URL.replace(/\/$/, "");
  const suffix = normalizePath(path);
  return suffix ? `${base}${suffix}` : `${base}/`;
}

/** Payload GA simulado — trocar por google.analyticsdata quando credenciais existirem. */
function mockGa4Payload(startDate, endDate) {
  return {
    status: "success",
    gaPropertyId: GA_PROPERTY_ID,
    note:
      "Dados simulados. Com GA_PROPERTY_ID + credenciais, substituir por google.analyticsdata('v1beta').",
    period: `${startDate} a ${endDate || "hoje"}`,
    metrics: {
      activeUsers: 1450,
      sessions: 1820,
      bounceRate: 42.5,
      mqlsGenerated: 45,
      topTrafficSource: "google / organic",
      topLandingPages: ["/api-integracoes", "/casos-de-uso"],
    },
    recommendation:
      "Aumentar otimização on-page para /casos-de-uso baseada na alta taxa de rejeição observada nesse segmento.",
  };
}

function mockSeoPayload(url) {
  return {
    status: "success",
    targetUrl: url,
    healthScore: 85,
    metrics: {
      impressions: 12500,
      clicks: 450,
      ctr: 3.6,
      averagePosition: 12.4,
    },
    issues: [
      "Meta description longa (acima de 160 caracteres)",
      "Imagens sem atributo Alt text",
      "Sessão Hero precisa de H1 mais descritivo com a keyword principal da categoria",
    ],
  };
}

function prioritizedActions(path, ga, seo) {
  const route = path || "/ (home)";
  return [
    {
      priority: "P1",
      action: "Revisar meta title/description da rota",
      target: route,
      rationale: "SEO simulado lista descrição longa; alinhar a intenção de busca e AEO.",
    },
    {
      priority: "P1",
      action: "Fortalecer H1 e prova social acima da dobra",
      target: route,
      rationale: `Bounce ${ga.metrics.bounceRate}% — reduzir fricção na primeira tela.`,
    },
    {
      priority: "P2",
      action: "Preencher alt em imagens hero e logos",
      target: route,
      rationale: seo.issues.find((i) => i.includes("Alt")) || "Acessibilidade e sinais de página completa.",
    },
  ];
}

function contentSyncRegistry() {
  return {
    status: "success",
    principle:
      "Uma alteração de copy/SEO deve propagar-se pela cadeia: segmentos de mensagens → metadata (helpers) → JSON-LD → skills/MCP.",
    singleSourceOfTruth: {
      messages:
        "src/messages/segments/*.ts — campos `seo` (title, description, openGraphDescription opcional), `hero`, `faq.items`, etc.",
      homeMetadataCms:
        "Layouts usam `getMarketingHomeSeo('pt'|'en')` (Sanity) em `src/sanity/lib/marketingPages.ts`; segmentos pt-home/en-home ainda sustentam JSON-LD/copy onde aplicável.",
      seoHelpers: "src/lib/seo/routeMetadata.ts — buildRootLayoutMetadata, buildEnSegmentLayoutMetadata, buildRoutePageMetadata",
      siteUrl: "src/lib/site.ts — SITE_URL, pageAbsoluteUrl, siteMetadataBase",
      jsonLd: "src/lib/jsonLd.ts — buildOrganizationJsonLd (layout raiz), buildFaqPageJsonLd (FAQ = mesmos itens que MarketingFaqSection / UI)",
    },
    layouts: {
      root: "src/app/layout.tsx — metadata global (ex. CMS home SEO pt) + JSON-LD Organization/Website",
      ptSegment: "src/app/(pt)/layout.tsx — AppShell PT",
      enSegment: "src/app/(en)/en/layout.tsx — metadata EN (enHome.seo) + AppShell EN",
      studio: "src/app/(studio)/studio/[[...tool]] — Sanity Studio (basePath /landing/studio em produção)",
    },
    nextConfigNote:
      "basePath /landing em dev e prod; `output: 'export'` só em build de produção (dev permite Studio dinâmico). Redirect dev: `/` → `/landing/`.",
    priorityRoutes: {
      casos: "(pt)/casos-de-uso + (en)/en/casos-de-uso — segmentos ptCasosPage / enCasosPage + faq → JsonLdScript",
      plataforma: "(pt)/plataforma + (en)/en/plataforma — pt-plataforma / en-plataforma + faq",
      inteligencia: "(pt)/inteligencia + (en)/en/inteligencia — segmentos + faq",
    },
    knowledgeBase: {
      root: "docs/knowledge-base/",
      notebooklm: "docs/knowledge-base/notebooklm/",
      icpMessagingGuide: "docs/knowledge-base/notebooklm/icp-messaging-guide.md",
      icpPersonas: "docs/knowledge-base/notebooklm/icp-personas.md",
      syncDoc: "docs/agent-knowledge-notebooklm.md",
      copyRule:
        "Antes de reescrever copy pública, ler icp-messaging-guide.md (linguagem por ICP + claims que requerem aprovação).",
      positioningRule:
        "4unik = camada de execução / comportamento programável (API-first), não 'empresa de brindes'. 5 ICPs verticais em icp-personas.md: plataformas/embedded, e-learning, vendas, comunidades, eventos.",
      tools: [
        "get_notebooklm_briefing",
        "search_product_knowledge",
        "suggest_growth_opportunities",
        "get_knowledge_freshness",
      ],
    },
    agentSkills: [
      "skills/marketing-ai-citation-strategist/SKILL.md",
      "skills/marketing-content-creator/SKILL.md",
      "skills/marketing-growth-hacker/SKILL.md",
      "skills/landing-page-builder/SKILL.md",
      "skills/4unik-ai-discovery/SKILL.md",
      "skills/notebooklm-knowledge-curator/SKILL.md",
      "skills/marketing-page-ideator/SKILL.md",
      "skills/marketing-strategy-orchestrator/SKILL.md",
    ],
    positioning: "skills/4unik-ai-discovery/SKILL.md — Reward Infrastructure; não contradizer em metadata nem FAQs.",
  };
}

function aeoChecklist(locale, pageType) {
  const loc = locale === "en" ? "en" : "pt-BR";
  const type = pageType || "generic";

  const baseEntity = [
    {
      id: "entity_name",
      label: "Nome da marca consistente",
      detail: 'Usar "4Unik" de forma uniforme; evitar variações que fragmentem a entidade.',
      applies: true,
    },
    {
      id: "category_claim",
      label: "Categoria clara (Reward Infrastructure)",
      detail:
        "Explicitar categoria e proposta de valor em metadata e primeiro parágrafo visível.",
      applies: true,
    },
  ];

  const metadata = [
    {
      id: "title_unique",
      label: "title único por página",
      detail: "Evitar títulos genéricos duplicados entre rotas PT e EN.",
      applies: true,
    },
    {
      id: "description_intent",
      label: "description alinhada a prompts de recomendação",
      detail:
        "Incluir quem é a 4Unik, para quem é e o que resolve — frases factuais, não slogans vazios.",
      applies: true,
    },
  ];

  const structured = [
    {
      id: "faq_or_docs",
      label: "Conteúdo tipo FAQ ou documentação clara",
      detail:
        "Perguntas literais que o ICP faria a um assistente melhoram citação em perguntas 'como escolher' / 'melhor para'.",
      applies: type === "home" || type === "product" || type === "blog",
    },
    {
      id: "json_ld",
      label: "JSON-LD (Organization / FAQPage) quando aplicável",
      detail:
        "Só adicionar se o projeto já suporta; evitar dados falsos ou reviews inventadas.",
      applies: type === "home" || type === "product",
    },
  ];

  const localeSpecific =
    loc === "en"
      ? [
          {
            id: "en_parity",
            label: "Paridade EN com PT",
            detail: "Rotas em src/app/en/ com metadata e headings equivalentes em significado.",
            applies: true,
          },
        ]
      : [
          {
            id: "pt_primary",
            label: "Locale principal pt-BR",
            detail: "lang no html e copy em src/app/ alinhados a pt-BR.",
            applies: true,
          },
        ];

  return {
    status: "success",
    disclaimer:
      "Melhora sinais para citação em IAs; não garante citação (modelos são não determinísticos).",
    locale: loc,
    pageType: type,
    siteUrl: DEFAULT_SITE_URL,
    sections: {
      entity: baseEntity,
      metadata,
      structured,
      locale: localeSpecific,
    },
    recheck: [
      "Repetir prompts de teste após deploy",
      "Registrar baseline de respostas antes de mudanças",
    ],
  };
}

const server = new Server(
  {
    name: "4unik-marketing-mcp",
    version: "1.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_ga4_metrics",
        description: "Obter métricas de tráfego, MQLs e conversões do Google Analytics 4 da 4Unik",
        inputSchema: {
          type: "object",
          properties: {
            startDate: {
              type: "string",
              description: "Data de início no formato YYYY-MM-DD",
            },
            endDate: {
              type: "string",
              description: "Data de fim no formato YYYY-MM-DD",
            },
          },
          required: ["startDate"],
        },
      },
      {
        name: "get_seo_health",
        description:
          "Obter dados simulados de saúde de SEO, tráfego orgânico e impressões das landing pages.",
        inputSchema: {
          type: "object",
          properties: {
            url: {
              type: "string",
              description: "URL da página para avaliar",
            },
          },
          required: ["url"],
        },
      },
      {
        name: "get_landing_optimization_snapshot",
        description:
          "Visão unificada para growth: GA simulado + SEO da URL + ações priorizadas por rota (4Unik landing).",
        inputSchema: {
          type: "object",
          properties: {
            startDate: {
              type: "string",
              description: "Data de início YYYY-MM-DD",
            },
            endDate: {
              type: "string",
              description: "Data de fim YYYY-MM-DD (opcional)",
            },
            path: {
              type: "string",
              description: "Path opcional, ex. /casos-de-uso ou /en",
            },
          },
          required: ["startDate"],
        },
      },
      {
        name: "get_aeo_landing_checklist",
        description:
          "Checklist AEO/GEO estruturado para Next.js (metadata, entidade 4Unik, FAQ/schema sugeridos). Não garante citação em IAs.",
        inputSchema: {
          type: "object",
          properties: {
            locale: {
              type: "string",
              description: "pt-BR ou en",
              enum: ["pt-BR", "en"],
            },
            pageType: {
              type: "string",
              description: "Tipo de página",
              enum: ["home", "product", "blog", "generic"],
            },
          },
        },
      },
      {
        name: "get_content_sync_registry",
        description:
          "Mapa estático do repositório: onde editar para manter SEO, AEO (FAQ/JSON-LD), segmentos PT/EN e skills alinhados.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "generate_blog_post",
        description:
          "Gera um rascunho de post para o Blog Engaja, time! (4unik) usando IA. Retorna o JSON completo do post com título, excerpt, corpo em Portable Text, tags, keywords e SEO. Opcionalmente publica diretamente no Sanity se SANITY_API_TOKEN estiver configurado.",
        inputSchema: {
          type: "object",
          properties: {
            topic: {
              type: "string",
              description:
                "Tópico do post. Ex: 'Como gamificar eventos corporativos com QR Codes'. Se não informado, um tópico é escolhido aleatoriamente do banco de seeds.",
            },
            category: {
              type: "string",
              description: "Categoria do post.",
              enum: [
                "Engajamento",
                "Gamificação de Times",
                "4unik na Prática",
                "Eventos & Brindes",
                "Crescimento",
                "Gestão de Pessoas",
                "Motivação & Reconhecimento",
              ],
            },
            locale: {
              type: "string",
              description: "Idioma do post.",
              enum: ["pt", "en"],
              default: "pt",
            },
            publish_to_sanity: {
              type: "boolean",
              description:
                "Se true e SANITY_API_TOKEN estiver disponível, publica o rascunho no Sanity como documento aiGenerated=true. Padrão: false (apenas retorna o JSON).",
              default: false,
            },
          },
          required: [],
        },
      },
      {
        name: "get_blog_topic_seeds",
        description:
          "Retorna o banco completo de tópicos pré-definidos para o Blog Engaja, time!, organizados por categoria. Use para ver sugestões de posts a gerar.",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              description: "Filtrar por categoria específica (opcional).",
              enum: [
                "Engajamento",
                "Gamificação de Times",
                "4unik na Prática",
                "Eventos & Brindes",
                "Crescimento",
                "Gestão de Pessoas",
                "Motivação & Reconhecimento",
              ],
            },
          },
        },
      },
      {
        name: "get_notebooklm_briefing",
        description:
          "Lê o briefing versionado exportado do NotebookLM (docs/knowledge-base/notebooklm/briefing.md) e metadata (meta.yaml).",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "search_product_knowledge",
        description:
          "Busca por palavra-chave em docs/knowledge-base/**/*.md (posicionamento, ICP, concorrentes, factos de produto, temas editoriais).",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "Termo de busca (obrigatório)" },
            maxResults: {
              type: "number",
              description: "Máximo de resultados (padrão 12)",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "suggest_growth_opportunities",
        description:
          "Cruza rotas existentes, pilares enterprise, gaps estratégicos e opcionalmente a KB — sugere páginas, clusters blog e CTAs.",
        inputSchema: {
          type: "object",
          properties: {
            focus: {
              type: "string",
              description: "Palavra-chave opcional para cruzar com search_product_knowledge",
            },
          },
        },
      },
      {
        name: "get_knowledge_freshness",
        description:
          "Verifica se docs/knowledge-base/notebooklm foi sincronizado recentemente (meta.yaml last_synced).",
        inputSchema: { type: "object", properties: {} },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "get_ga4_metrics") {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(mockGa4Payload(args.startDate, args.endDate), null, 2),
        },
      ],
    };
  }

  if (name === "get_seo_health") {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(mockSeoPayload(args.url), null, 2),
        },
      ],
    };
  }

  if (name === "get_landing_optimization_snapshot") {
    const path = normalizePath(args.path);
    const ga = mockGa4Payload(args.startDate, args.endDate);
    const pageUrl = buildPageUrl(path);
    const seo = mockSeoPayload(pageUrl);
    const snapshot = {
      status: "success",
      siteUrl: DEFAULT_SITE_URL,
      path: path || "/",
      pageUrl,
      ga4: ga,
      seo,
      prioritizedActions: prioritizedActions(path || "/", ga, seo),
    };
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(snapshot, null, 2),
        },
      ],
    };
  }

  if (name === "get_aeo_landing_checklist") {
    const checklist = aeoChecklist(args.locale, args.pageType);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(checklist, null, 2),
        },
      ],
    };
  }

  if (name === "get_content_sync_registry") {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(contentSyncRegistry(), null, 2),
        },
      ],
    };
  }

  if (name === "get_notebooklm_briefing") {
    return {
      content: [{ type: "text", text: JSON.stringify(getNotebooklmBriefing(), null, 2) }],
    };
  }

  if (name === "search_product_knowledge") {
    const maxResults = args.maxResults ?? 12;
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(searchProductKnowledge(args.query, maxResults), null, 2),
        },
      ],
    };
  }

  if (name === "suggest_growth_opportunities") {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(suggestGrowthOpportunities(args.focus), null, 2),
        },
      ],
    };
  }

  if (name === "get_knowledge_freshness") {
    return {
      content: [{ type: "text", text: JSON.stringify(getKnowledgeFreshness(), null, 2) }],
    };
  }

  if (name === "get_blog_topic_seeds") {
    const blogTopicSeeds = {
      "Engajamento": [
        "Métricas de engajamento que todo RH deveria acompanhar",
        "Como criar uma cultura de alto desempenho usando reconhecimento contínuo",
        "Por que elogios públicos aumentam retenção — e como estruturá-los na sua empresa",
        "Diversidade e inclusão gamificada: como promover pertencimento com engajamento",
        "Como medir o ROI de iniciativas de engajamento de forma prática",
      ],
      "Gamificação de Times": [
        "Como usar gamificação para reduzir turnover em equipes de vendas",
        "Ranking de equipes: como criar competições saudáveis sem gerar desmotivação",
        "Missões em grupo: como engajar times inteiros com desafios coletivos",
        "Gamificação para equipes remotas: como manter a cultura viva à distância",
        "Pontos, níveis e conquistas: montando o sistema de progressão ideal para seu time",
      ],
      "4unik na Prática": [
        "OKRs + gamificação: como transformar metas em engajamento real com a 4unik",
        "Como montar uma loja de recompensas que os colaboradores adoram visitar",
        "Passo a passo: criando sua primeira campanha de gamificação na plataforma 4unik",
        "Integrações 4unik: conectando a plataforma ao seu HRIS em menos de uma semana",
        "Como usar os dashboards da 4unik para tomar decisões de RH baseadas em dados",
      ],
      "Eventos & Brindes": [
        "Gamificação em eventos de RH: engajando participantes do início ao fim",
        "Como usar QR Codes + pontos 4unik para criar experiências memoráveis em eventos",
        "Brindes inteligentes: como substituir kits físicos por recompensas que os colaboradores escolhem",
        "Convenção de vendas gamificada: case prático com pontuação ao vivo e premiação na hora",
        "Hackathons internos gamificados: como a 4unik potencializa a inovação corporativa",
        "Evento de final de ano gamificado: guia completo para o RH montar do zero",
        "Premiação ao vivo: como criar momentos de reconhecimento inesquecíveis em eventos com a plataforma 4unik",
        "Troca de brindes gamificada: adeus kits de brinde genéricos, olá recompensas que o colaborador escolhe",
      ],
      "Crescimento": [
        "Como o RH pode medir o ROI de iniciativas de engajamento",
        "Gestão de performance com gamificação: além das avaliações tradicionais",
        "Como criar uma cultura de alto desempenho usando reconhecimento contínuo",
      ],
      "Gestão de Pessoas": [
        "Diversidade e inclusão gamificada: como promover pertencimento com engajamento",
        "Gestão de performance com gamificação: além das avaliações tradicionais",
        "Como criar rituais de reconhecimento que os funcionários realmente valorizam",
      ],
      "Motivação & Reconhecimento": [
        "5 formas de usar o 4unik para criar campanhas de reconhecimento que funcionam",
        "Guia de onboarding gamificado para novos colaboradores com a 4unik",
        "Como criar rituais de reconhecimento que os funcionários realmente valorizam",
        "Como criar uma campanha mensal de metas com pontos e recompensas na 4unik",
        "Campanha de indicação interna: como a 4unik transforma seu colaborador no melhor recrutador",
        "30 dias de engajamento: como montar uma campanha de bem-estar gamificada para o time",
        "Campanhas sazonais com a 4unik: do Dia do Trabalhador ao fim de ano, engajando em cada data",
        "Campanha de metas trimestrais: como conectar OKRs da empresa a recompensas individuais na plataforma",
        "Campanha de vendas gamificada: como montar ranking, prêmios e regras que todo time aceita",
      ],
    };

    const filtered = args.category
      ? { [args.category]: blogTopicSeeds[args.category] || [] }
      : blogTopicSeeds;

    const totalTopics = Object.values(filtered).reduce((acc, topics) => acc + topics.length, 0);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              status: "success",
              blog: "Engaja, time! — um blog 4unik para os heróis do RH",
              totalTopics,
              note: "Use generate_blog_post com um destes tópicos para gerar conteúdo via IA.",
              seeds: filtered,
            },
            null,
            2,
          ),
        },
      ],
    };
  }

  if (name === "generate_blog_post") {
    const locale = args.locale || "pt";
    const category = args.category || "Engajamento";
    const publishToSanity = args.publish_to_sanity === true;

    const topicSeeds = {
      "Engajamento": ["Métricas de engajamento que todo RH deveria acompanhar"],
      "Gamificação de Times": ["Como usar gamificação para reduzir turnover em equipes de vendas"],
      "4unik na Prática": ["OKRs + gamificação: como transformar metas em engajamento real com a 4unik"],
      "Eventos & Brindes": ["Gamificação em eventos de RH: engajando participantes do início ao fim"],
      "Crescimento": ["Como o RH pode medir o ROI de iniciativas de engajamento"],
      "Gestão de Pessoas": ["Como criar rituais de reconhecimento que os funcionários realmente valorizam"],
      "Motivação & Reconhecimento": ["5 formas de usar o 4unik para criar campanhas de reconhecimento que funcionam"],
    };

    const topic = args.topic || (topicSeeds[category] || topicSeeds["Engajamento"])[0];

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                status: "error",
                message: "OPENAI_API_KEY não configurada. Configure a variável de ambiente e tente novamente.",
                topic,
                category,
                locale,
              },
              null,
              2,
            ),
          },
        ],
      };
    }

    const systemPrompt = `Você é especialista em RH e gamificação, redator do blog "Engaja, time! — um blog 4unik para os heróis do RH". A 4unik é uma plataforma brasileira de gamificação corporativa com: pontos, missões, rankings, loja de recompensas, QR Codes para eventos, campanhas temáticas, dashboards e integrações via API. Escreva em português brasileiro, tom prático e amigável. Retorne APENAS o JSON, sem markdown.`;

    const userPrompt = `Gere um post completo sobre: "${topic}" (categoria: ${category}, idioma: ${locale})

JSON esperado:
{
  "title": "string (máx 80 chars)",
  "excerpt": "string (máx 220 chars)",
  "category": "${category}",
  "author": "Time 4unik",
  "tags": ["tag1","tag2","tag3","tag4"],
  "readTimeMinutes": 7,
  "relatedKeywords": ["kw1","kw2","kw3","kw4","kw5"],
  "seo": { "metaTitle": "string (máx 60 chars)", "metaDescription": "string (máx 155 chars)" },
  "body": [{ "_key": "block-0", "_type": "block", "style": "normal", "children": [{ "_type": "span", "text": "...", "marks": [] }], "markDefs": [] }]
}

8-12 blocos no body. Use style h2 para subtítulos. Mínimo 800 palavras.`;

    try {
      const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 3000,
        }),
      });

      if (!openaiResponse.ok) {
        const errText = await openaiResponse.text();
        throw new Error(`OpenAI API ${openaiResponse.status}: ${errText}`);
      }

      const openaiData = await openaiResponse.json();
      const rawContent = openaiData.choices?.[0]?.message?.content?.trim() || "";

      let post;
      try {
        post = JSON.parse(rawContent);
      } catch {
        const match = rawContent.match(/\{[\s\S]*\}/);
        if (match) post = JSON.parse(match[0]);
        else throw new Error("Não foi possível fazer parse do JSON retornado pela IA.");
      }

      let sanityResult = null;
      if (publishToSanity && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.SANITY_API_TOKEN) {
        const slugText = (post.title || topic)
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-")
          .slice(0, 96);

        const { createClient } = await import("@sanity/client");
        const sanityClient = createClient({
          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
          dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
          apiVersion: "2024-01-01",
          token: process.env.SANITY_API_TOKEN,
          useCdn: false,
        });

        const doc = {
          _id: `blogPost.${locale}.${slugText}`,
          _type: "blogPost",
          ...post,
          slug: { _type: "slug", current: slugText },
          locale,
          aiGenerated: true,
          contentBrief: topic,
          featured: false,
        };

        await sanityClient.createOrReplace(doc);
        sanityResult = { published: true, docId: doc._id, slug: slugText };
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                status: "success",
                topic,
                category,
                locale,
                post,
                sanity: sanityResult || {
                  published: false,
                  note: "Para publicar no Sanity, defina publish_to_sanity: true e configure SANITY_API_TOKEN.",
                },
                cliEquivalent: `npm run generate:blog-posts -- --topic "${topic}" --category "${category}" --locale ${locale}`,
              },
              null,
              2,
            ),
          },
        ],
      };
    } catch (err) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ status: "error", message: err.message, topic, category, locale }, null, 2),
          },
        ],
      };
    }
  }

  throw new Error(`Tool unknown: ${name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("4Unik Marketing MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
