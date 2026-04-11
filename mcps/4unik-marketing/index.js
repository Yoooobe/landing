#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

/**
 * Base pública alinhada a `src/lib/site.ts` + `src/lib/basePath.ts`.
 * Sobrescreva com SITE_URL no ambiente do MCP se necessário.
 */
const DEFAULT_SITE_URL = process.env.SITE_URL || "https://yoooobe.github.io/landing";

// Configurações e credenciais simuladas para GA API
const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID || "123456789";

function normalizePath(path) {
  if (!path || String(path).trim() === "") return "";
  const p = String(path).trim();
  return p.startsWith("/") ? p : `/${p}`;
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
    agentSkills: [
      "skills/marketing-ai-citation-strategist/SKILL.md",
      "skills/marketing-content-creator/SKILL.md",
      "skills/marketing-growth-hacker/SKILL.md",
      "skills/landing-page-builder/SKILL.md",
      "skills/4unik-ai-discovery/SKILL.md",
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
    version: "1.0.0",
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
                cliEquivalent: `node scripts/generate-blog-posts.mjs --topic "${topic}" --category "${category}" --locale ${locale}`,
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
