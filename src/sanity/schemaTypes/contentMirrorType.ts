import { defineField, defineType } from "sanity";

export const contentMirrorType = defineType({
  name: "contentMirror",
  title: "Espelho Editorial do Codigo",
  type: "document",
  description:
    "Espelho editorial do código-fonte para alinhamento e revisão. O site exportado não lê estes documentos no build — ver docs/content-mirror-policy.md.",
  fields: [
    defineField({
      name: "title",
      title: "Titulo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sourceKey",
      title: "Chave de origem",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: "sourcePath",
      title: "Caminho de origem",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "locale",
      title: "Idioma",
      type: "string",
      options: {
        list: [
          { title: "Portugues", value: "pt" },
          { title: "English", value: "en" },
          { title: "Global / Nao aplicavel", value: "global" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "area",
      title: "Area",
      type: "string",
      options: {
        list: [
          { title: "Messages segment", value: "messages" },
          { title: "Conteudo especial", value: "special-content" },
          { title: "Pagina com copy hardcoded", value: "page-copy" },
          { title: "Metadata / SEO", value: "metadata" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contentFormat",
      title: "Formato",
      type: "string",
      initialValue: "typescript",
      options: {
        list: [
          { title: "TypeScript", value: "typescript" },
          { title: "TSX", value: "tsx" },
          { title: "Texto", value: "text" },
        ],
      },
    }),
    defineField({
      name: "summary",
      title: "Resumo",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "homePayload",
      title: "Payload estruturado da home",
      type: "object",
      fields: [
        defineField({
          name: "seo",
          title: "SEO",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titulo", type: "string" }),
            defineField({
              name: "description",
              title: "Descricao",
              type: "text",
              rows: 3,
            }),
          ],
        }),
        defineField({
          name: "hero",
          title: "Hero",
          type: "object",
          fields: [
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "brand", title: "Marca", type: "string" }),
            defineField({ name: "afterBrand", title: "Depois da marca", type: "string" }),
            defineField({ name: "line1b", title: "Destaque linha 1", type: "string" }),
            defineField({ name: "line2", title: "Linha 2", type: "string" }),
            defineField({ name: "sub", title: "Subtitulo", type: "text", rows: 4 }),
            defineField({ name: "ctaDemo", title: "CTA demo", type: "string" }),
            defineField({ name: "ctaDemoHref", title: "Link CTA demo", type: "url" }),
            defineField({ name: "ctaExplore", title: "CTA explorar", type: "string" }),
            defineField({ name: "ctaExploreHref", title: "Link CTA explorar", type: "string" }),
            defineField({ name: "floatAdhesion", title: "Titulo adesao", type: "string" }),
            defineField({ name: "floatAdhesionValue", title: "Valor adesao", type: "string" }),
            defineField({ name: "floatAdhesionSub", title: "Sub adesao", type: "string" }),
            defineField({ name: "floatRh", title: "Titulo RH", type: "string" }),
            defineField({ name: "floatRhValue", title: "Valor RH", type: "string" }),
            defineField({ name: "floatRhSub", title: "Sub RH", type: "string" }),
            defineField({ name: "floatEnps", title: "Titulo eNPS", type: "string" }),
            defineField({ name: "floatEnpsValue", title: "Valor eNPS", type: "string" }),
            defineField({ name: "floatEnpsSub", title: "Sub eNPS", type: "string" }),
            defineField({
              name: "platformImage",
              title: "Imagem principal da plataforma",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
              ],
            }),
            defineField({
              name: "supportingImage",
              title: "Imagem complementar / mockup",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
              ],
            }),
          ],
        }),
        defineField({
          name: "fourUnik",
          title: "Faixa complementar 4unik",
          type: "object",
          fields: [
            defineField({ name: "kicker", title: "Kicker", type: "string" }),
            defineField({ name: "bodyBefore", title: "Texto antes", type: "string" }),
            defineField({ name: "brand", title: "Marca", type: "string" }),
            defineField({ name: "bodyMid", title: "Texto meio", type: "text", rows: 3 }),
            defineField({ name: "here", title: "Destaque aqui", type: "string" }),
            defineField({ name: "bodyAfter", title: "Texto depois", type: "text", rows: 3 }),
            defineField({ name: "cta", title: "CTA", type: "string" }),
            defineField({ name: "ctaHref", title: "Link CTA", type: "url" }),
            defineField({
              name: "sectionImage",
              title: "Imagem da faixa",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
              ],
            }),
          ],
        }),
        defineField({
          name: "trust",
          title: "Prova social",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titulo", type: "string" }),
          ],
        }),
        defineField({
          name: "showcaseMedia",
          title: "Mídia de showcase da home",
          description:
            "Referência nativa para mockups, screenshots e visuais dos cards da home.",
          type: "reference",
          to: [{ type: "homeShowcaseMedia" }],
        }),
        defineField({
          name: "finalCta",
          title: "CTA final",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titulo", type: "string" }),
            defineField({ name: "body", title: "Texto", type: "text", rows: 3 }),
            defineField({ name: "demo", title: "Texto CTA demo", type: "string" }),
            defineField({ name: "demoHref", title: "Link CTA demo", type: "url" }),
            defineField({ name: "whatsapp", title: "Texto CTA WhatsApp", type: "string" }),
            defineField({ name: "whatsappHref", title: "Link CTA WhatsApp", type: "url" }),
            defineField({
              name: "sectionImage",
              title: "Imagem do CTA final",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "apiIntegracoesPayload",
      title: "Payload estruturado de API e Integracoes",
      type: "object",
      fields: [
        defineField({
          name: "seo",
          title: "SEO",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titulo", type: "string" }),
            defineField({
              name: "description",
              title: "Descricao",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "openGraphDescription",
              title: "Descricao Open Graph",
              type: "text",
              rows: 3,
            }),
          ],
        }),
        defineField({
          name: "hero",
          title: "Hero",
          type: "object",
          fields: [
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "title", title: "Titulo", type: "text", rows: 4 }),
            defineField({ name: "description", title: "Descricao", type: "text", rows: 4 }),
            defineField({
              name: "visualCaption",
              title: "Legenda ao lado do mock (codigo + UI)",
              description:
                "Texto curto junto ao visual do hero (coluna direita). Ex.: mensagem de integracao com intranet ou engajamento.",
              type: "text",
              rows: 3,
            }),
            defineField({ name: "primaryCtaLabel", title: "CTA principal", type: "string" }),
            defineField({ name: "primaryCtaHref", title: "Link CTA principal", type: "string" }),
            defineField({ name: "secondaryCtaLabel", title: "CTA secundario", type: "string" }),
            defineField({ name: "secondaryCtaHref", title: "Link CTA secundario", type: "url" }),
            defineField({ name: "codeWindowTitle", title: "Titulo da janela de codigo", type: "string" }),
            defineField({ name: "codeSnippet", title: "Snippet de codigo", type: "text", rows: 12 }),
          ],
        }),
        defineField({
          name: "features",
          title: "Grade de features",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titulo", type: "string" }),
            defineField({ name: "description", title: "Descricao", type: "text", rows: 3 }),
            defineField({
              name: "items",
              title: "Itens",
              type: "array",
              of: [
                defineField({
                  name: "featureItem",
                  title: "Item de feature",
                  type: "object",
                  fields: [
                    defineField({ name: "title", title: "Titulo", type: "string" }),
                    defineField({ name: "description", title: "Descricao", type: "text", rows: 3 }),
                    defineField({ name: "icon", title: "Icone", type: "string" }),
                    defineField({ name: "colSpan", title: "Col span", type: "string" }),
                  ],
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: "integrations",
          title: "Integracoes prontas",
          type: "object",
          fields: [
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "title", title: "Titulo", type: "string" }),
            defineField({ name: "titleGradient", title: "Titulo em destaque", type: "string" }),
            defineField({ name: "titleAfter", title: "Titulo depois", type: "string" }),
            defineField({ name: "description", title: "Descricao", type: "text", rows: 3 }),
            defineField({
              name: "mainPlatforms",
              title: "Plataformas principais",
              type: "array",
              of: [
                defineField({
                  name: "platformItem",
                  title: "Plataforma",
                  type: "object",
                  fields: [
                    defineField({ name: "name", title: "Nome", type: "string" }),
                    defineField({ name: "by", title: "Subtitulo", type: "string" }),
                    defineField({ name: "logo", title: "Logo textual", type: "string" }),
                    defineField({ name: "badge", title: "Badge", type: "string" }),
                    defineField({ name: "color", title: "Cor utilitaria", type: "string" }),
                    defineField({ name: "description", title: "Descricao", type: "text", rows: 3 }),
                    defineField({
                      name: "features",
                      title: "Bullets",
                      type: "array",
                      of: [{ type: "string" }],
                    }),
                  ],
                }),
              ],
            }),
            defineField({
              name: "extraIntegrations",
              title: "Integracoes adicionais",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({
              name: "extraIntegrationsLabel",
              title: "Rotulo das integracoes adicionais",
              type: "string",
            }),
          ],
        }),
        defineField({
          name: "modules",
          title: "Modulos da plataforma",
          type: "object",
          fields: [
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "titleBefore", title: "Titulo antes", type: "string" }),
            defineField({ name: "titleGradient", title: "Titulo em destaque", type: "string" }),
            defineField({ name: "titleAfter", title: "Titulo depois", type: "string" }),
            defineField({ name: "description", title: "Descricao", type: "text", rows: 3 }),
            defineField({
              name: "items",
              title: "Modulos",
              type: "array",
              of: [
                defineField({
                  name: "moduleItem",
                  title: "Modulo",
                  type: "object",
                  fields: [
                    defineField({ name: "icon", title: "Icone", type: "string" }),
                    defineField({ name: "title", title: "Titulo", type: "string" }),
                    defineField({ name: "description", title: "Descricao", type: "text", rows: 3 }),
                  ],
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: "finalCta",
          title: "CTA final",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titulo", type: "string" }),
            defineField({ name: "description", title: "Descricao", type: "text", rows: 3 }),
            defineField({ name: "buttonLabel", title: "Texto do botao", type: "string" }),
            defineField({ name: "buttonHref", title: "Link do botao", type: "url" }),
          ],
        }),
        defineField({
          name: "showcaseMedia",
          title: "Mídia de showcase — API e Integrações",
          description:
            "Referência ao documento de mídia com logos, previews e screenshots dos cards desta página.",
          type: "reference",
          to: [{ type: "apiIntegracoesShowcaseMedia" }],
        }),
      ],
    }),
    defineField({
      name: "gamificacaoPayload",
      title: "Payload estruturado de Gamificacao",
      type: "object",
      fields: [
        defineField({
          name: "seo",
          title: "SEO",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titulo", type: "string" }),
            defineField({ name: "description", title: "Descricao", type: "text", rows: 3 }),
            defineField({
              name: "openGraphDescription",
              title: "Descricao Open Graph",
              type: "text",
              rows: 3,
            }),
          ],
        }),
        defineField({
          name: "hero",
          title: "Hero",
          type: "object",
          fields: [
            defineField({ name: "floatLevel", title: "Float level", type: "string" }),
            defineField({ name: "floatLevelSub", title: "Float level sub", type: "string" }),
            defineField({ name: "floatProgress", title: "Float progress", type: "string" }),
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "titleLine1", title: "Titulo linha 1", type: "string" }),
            defineField({ name: "titleGradient", title: "Titulo em destaque", type: "string" }),
            defineField({ name: "titleLine2", title: "Titulo linha 2", type: "string" }),
            defineField({ name: "sub", title: "Descricao", type: "text", rows: 4 }),
            defineField({ name: "cta", title: "CTA", type: "string" }),
            defineField({ name: "ctaHref", title: "Link CTA", type: "string" }),
          ],
        }),
        defineField({
          name: "problem",
          title: "Problema",
          type: "object",
          fields: [
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "title", title: "Titulo antes", type: "string" }),
            defineField({ name: "titleGradient", title: "Titulo em destaque", type: "string" }),
            defineField({ name: "titleAfter", title: "Titulo depois", type: "string" }),
            defineField({
              name: "cards",
              title: "Cards",
              type: "array",
              of: [
                defineField({
                  name: "problemCard",
                  title: "Card do problema",
                  type: "object",
                  fields: [
                    defineField({ name: "stat", title: "Estatistica", type: "string" }),
                    defineField({ name: "title", title: "Titulo", type: "string" }),
                    defineField({ name: "body", title: "Texto", type: "text", rows: 3 }),
                    defineField({ name: "cite", title: "Fonte", type: "string" }),
                  ],
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: "mechanics",
          title: "Mecanicas",
          type: "object",
          fields: [
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "titleBefore", title: "Titulo antes", type: "string" }),
            defineField({ name: "titleGradient", title: "Titulo em destaque", type: "string" }),
            defineField({ name: "titleAfter", title: "Titulo depois", type: "string" }),
            defineField({ name: "sub", title: "Descricao", type: "text", rows: 3 }),
            defineField({
              name: "items",
              title: "Itens",
              type: "array",
              of: [
                defineField({
                  name: "mechanicItem",
                  title: "Mecanica",
                  type: "object",
                  fields: [
                    defineField({ name: "id", title: "ID", type: "string" }),
                    defineField({ name: "badge", title: "Badge", type: "string" }),
                    defineField({ name: "title", title: "Titulo", type: "string" }),
                    defineField({ name: "description", title: "Descricao", type: "text", rows: 3 }),
                    defineField({ name: "features", title: "Bullets", type: "array", of: [{ type: "string" }] }),
                  ],
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: "flow",
          title: "Fluxo",
          type: "object",
          fields: [
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "titleBefore", title: "Titulo antes", type: "string" }),
            defineField({ name: "titleGradient", title: "Titulo em destaque", type: "string" }),
            defineField({ name: "titleAfter", title: "Titulo depois", type: "string" }),
            defineField({ name: "sub", title: "Descricao", type: "text", rows: 3 }),
            defineField({
              name: "steps",
              title: "Etapas",
              type: "array",
              of: [
                defineField({
                  name: "flowStep",
                  title: "Etapa",
                  type: "object",
                  fields: [
                    defineField({ name: "num", title: "Numero", type: "string" }),
                    defineField({ name: "role", title: "Papel", type: "string" }),
                    defineField({ name: "title", title: "Titulo", type: "string" }),
                    defineField({ name: "desc", title: "Descricao", type: "text", rows: 4 }),
                    defineField({
                      name: "features",
                      title: "Features",
                      type: "array",
                      of: [
                        defineField({
                          name: "flowFeature",
                          title: "Feature",
                          type: "object",
                          fields: [
                            defineField({ name: "icon", title: "Icone", type: "string" }),
                            defineField({ name: "text", title: "Texto", type: "string" }),
                          ],
                        }),
                      ],
                    }),
                    defineField({ name: "align", title: "Alinhamento", type: "string" }),
                  ],
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: "cases",
          title: "Cases",
          type: "object",
          fields: [
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "titleBefore", title: "Titulo antes", type: "string" }),
            defineField({ name: "titleGradient", title: "Titulo em destaque", type: "string" }),
            defineField({ name: "titleAfter", title: "Titulo depois", type: "string" }),
            defineField({ name: "sub", title: "Descricao", type: "text", rows: 3 }),
            defineField({ name: "challengeLabel", title: "Rotulo desafio", type: "string" }),
            defineField({ name: "solutionLabel", title: "Rotulo solucao", type: "string" }),
            defineField({
              name: "items",
              title: "Itens",
              type: "array",
              of: [
                defineField({
                  name: "caseItem",
                  title: "Case",
                  type: "object",
                  fields: [
                    defineField({ name: "id", title: "ID", type: "string" }),
                    defineField({ name: "company", title: "Empresa", type: "string" }),
                    defineField({ name: "industry", title: "Industria", type: "string" }),
                    defineField({ name: "title", title: "Titulo", type: "string" }),
                    defineField({ name: "desc", title: "Descricao", type: "text", rows: 3 }),
                    defineField({ name: "challenge", title: "Desafio", type: "text", rows: 3 }),
                    defineField({ name: "solution", title: "Solucao", type: "text", rows: 3 }),
                    defineField({
                      name: "metrics",
                      title: "Metricas",
                      type: "array",
                      of: [
                        defineField({
                          name: "caseMetric",
                          title: "Metrica",
                          type: "object",
                          fields: [
                            defineField({ name: "value", title: "Valor", type: "string" }),
                            defineField({ name: "label", title: "Rotulo", type: "string" }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: "trends",
          title: "Tendencias",
          type: "object",
          fields: [
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "titleBefore", title: "Titulo antes", type: "string" }),
            defineField({ name: "titleGradient", title: "Titulo em destaque", type: "string" }),
            defineField({ name: "titleAfter", title: "Titulo depois", type: "string" }),
            defineField({ name: "sub", title: "Descricao", type: "text", rows: 3 }),
            defineField({ name: "banner2025", title: "Banner 2025", type: "string" }),
            defineField({ name: "banner2033", title: "Banner 2033", type: "string" }),
            defineField({ name: "cagr", title: "CAGR", type: "string" }),
            defineField({ name: "value2025", title: "Valor 2025", type: "string" }),
            defineField({ name: "value2033", title: "Valor 2033", type: "string" }),
            defineField({
              name: "items",
              title: "Itens",
              type: "array",
              of: [
                defineField({
                  name: "trendItem",
                  title: "Tendencia",
                  type: "object",
                  fields: [
                    defineField({ name: "icon", title: "Icone", type: "string" }),
                    defineField({ name: "title", title: "Titulo", type: "string" }),
                    defineField({ name: "desc", title: "Descricao", type: "text", rows: 3 }),
                    defineField({ name: "tag", title: "Tag", type: "string" }),
                    defineField({ name: "tagStyle", title: "Estilo da tag", type: "number" }),
                  ],
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: "stats",
          title: "Stats",
          type: "object",
          fields: [
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "titleBefore", title: "Titulo antes", type: "string" }),
            defineField({ name: "titleGradient", title: "Titulo em destaque", type: "string" }),
            defineField({ name: "titleAfter", title: "Titulo depois", type: "string" }),
            defineField({
              name: "items",
              title: "Itens",
              type: "array",
              of: [
                defineField({
                  name: "statItem",
                  title: "Stat",
                  type: "object",
                  fields: [
                    defineField({ name: "value", title: "Valor", type: "string" }),
                    defineField({ name: "suffix", title: "Sufixo", type: "string" }),
                    defineField({ name: "desc", title: "Descricao", type: "text", rows: 2 }),
                  ],
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: "kpis",
          title: "KPIs",
          type: "object",
          fields: [
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "titleBefore", title: "Titulo antes", type: "string" }),
            defineField({ name: "titleGradient", title: "Titulo em destaque", type: "string" }),
            defineField({ name: "titleAfter", title: "Titulo depois", type: "string" }),
            defineField({ name: "sub", title: "Descricao", type: "text", rows: 3 }),
            defineField({
              name: "items",
              title: "Itens",
              type: "array",
              of: [
                defineField({
                  name: "kpiItem",
                  title: "KPI",
                  type: "object",
                  fields: [
                    defineField({ name: "title", title: "Titulo", type: "string" }),
                    defineField({ name: "subtitle", title: "Subtitulo", type: "string" }),
                    defineField({ name: "desc", title: "Descricao", type: "text", rows: 3 }),
                  ],
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: "deepUsecases",
          title: "Casos de uso",
          type: "object",
          fields: [
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "titleBefore", title: "Titulo antes", type: "string" }),
            defineField({ name: "titleGradient", title: "Titulo em destaque", type: "string" }),
            defineField({ name: "titleAfter", title: "Titulo depois", type: "string" }),
            defineField({ name: "sub", title: "Descricao", type: "text", rows: 3 }),
            defineField({
              name: "items",
              title: "Itens",
              type: "array",
              of: [
                defineField({
                  name: "usecaseItem",
                  title: "Caso de uso",
                  type: "object",
                  fields: [
                    defineField({ name: "icon", title: "Icone", type: "string" }),
                    defineField({ name: "title", title: "Titulo", type: "string" }),
                    defineField({ name: "desc", title: "Descricao", type: "text", rows: 3 }),
                    defineField({ name: "hook", title: "Hook", type: "string" }),
                  ],
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: "faq",
          title: "FAQ",
          type: "object",
          fields: [
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "titleBefore", title: "Titulo antes", type: "string" }),
            defineField({ name: "titleGradient", title: "Titulo em destaque", type: "string" }),
            defineField({ name: "titleAfter", title: "Titulo depois", type: "string" }),
            defineField({
              name: "items",
              title: "Perguntas",
              type: "array",
              of: [
                defineField({
                  name: "faqItem",
                  title: "Pergunta",
                  type: "object",
                  fields: [
                    defineField({ name: "q", title: "Pergunta", type: "string" }),
                    defineField({ name: "a", title: "Resposta", type: "text", rows: 4 }),
                  ],
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: "finalCta",
          title: "CTA final",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titulo", type: "string" }),
            defineField({ name: "body", title: "Descricao", type: "text", rows: 3 }),
            defineField({ name: "cta", title: "CTA", type: "string" }),
            defineField({ name: "ctaHref", title: "Link CTA", type: "url" }),
          ],
        }),
        defineField({
          name: "showcaseMedia",
          title: "Mídia de showcase — Gamificação",
          description:
            "Referência ao documento de mídia com logos, screenshots e visuais dos cards desta página.",
          type: "reference",
          to: [{ type: "gamificacaoShowcaseMedia" }],
        }),
      ],
    }),
    defineField({
      name: "routePayloadJson",
      title: "Payload JSON de override para rotas restantes",
      type: "text",
      rows: 24,
      description:
        "Bridge para paginas ainda baseadas em messages. O frontend faz parse deste JSON e aplica como override com fallback local.",
    }),
    defineField({
      name: "content",
      title: "Conteudo espelhado",
      type: "text",
      rows: 30,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "sourcePath",
      locale: "locale",
    },
    prepare({ title, subtitle, locale }) {
      return {
        title,
        subtitle: `${locale || "global"} · ${subtitle || "sem origem"}`,
      };
    },
  },
});
