#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { google } from "googleapis";

// Configurações e credenciais simuladas para GA API
const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID || "123456789";

const server = new Server(
  {
    name: "yoobe-marketing-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Definir as ferramentas disponíveis
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_ga4_metrics",
        description: "Obter métricas de tráfego, MQLs e conversões do Google Analytics 4 da Yoobe",
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
        description: "Obter dados simulados de saúde de SEO, tráfego orgânico e impressões das landing pages.",
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
    ],
  };
});

// Implementar as ferramentas
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "get_ga4_metrics") {
    // IMPORTANTE: Em produção, isso usaria a googleapis autenticada
    // const analytics = google.analyticsdata("v1beta");
    
    // Simulação do payload retornado para agentes utilizarem na otimização da landing page
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            status: "success",
            period: `${args.startDate} a ${args.endDate || 'hoje'}`,
            metrics: {
              activeUsers: 1450,
              sessions: 1820,
              bounceRate: 42.5,
              mqlsGenerated: 45, // Marketing Qualified Leads
              topTrafficSource: "google / organic",
              topLandingPages: ["/api-integracoes", "/casos-de-uso"]
            },
            recommendation: "Aumentar otimização on-page para /casos-de-uso baseada na alta taxa de rejeição observada nesse segmento."
          }, null, 2),
        },
      ],
    };
  }

  if (name === "get_seo_health") {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            status: "success",
            targetUrl: args.url,
            healthScore: 85,
            metrics: {
              impressions: 12500,
              clicks: 450,
              ctr: 3.6,
              averagePosition: 12.4
            },
            issues: [
              "Meta description longa (acima de 160 caracteres)",
              "Imagens sem atributo Alt text",
              "Sessão Hero precisa de H1 mais descritivo com a keyword faturamento"
            ]
          }, null, 2),
        },
      ],
    };
  }

  throw new Error(`Tool unknown: ${name}`);
});

// Iniciar o servidor usando stdio
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Yoobe Marketing MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
