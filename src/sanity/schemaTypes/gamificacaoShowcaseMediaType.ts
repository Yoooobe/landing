import { defineField, defineType } from "sanity";
import { LocaleSwitcherInput } from "@/sanity/components/LocaleSwitcherInput";
import { SectionAnnotation } from "@/sanity/components/SectionAnnotation";

function imageField(name: string, title: string, description?: string) {
  return defineField({
    name,
    title,
    type: "image",
    description,
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Texto alternativo",
        type: "string",
      }),
    ],
  });
}

function imageWithEmojiField(name: string, title: string, description?: string) {
  return defineField({
    name,
    title,
    type: "object",
    description,
    fields: [
      defineField({
        name: "emoji",
        title: "Emoji de fallback",
        type: "string",
      }),
      imageField("image", "Imagem", "Se enviada, substitui o emoji do card."),
    ],
    preview: {
      select: {
        title: "emoji",
        media: "image",
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prepare({ title, media }: { title?: string; media?: any }) {
        return {
          title: title || "Card visual",
          media,
        };
      },
    },
  });
}

export const gamificacaoShowcaseMediaType = defineType({
  name: "gamificacaoShowcaseMedia",
  title: "Mídia de showcase — Gamificação",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título interno",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mediaKey",
      title: "Chave editorial",
      type: "string",
      initialValue: "gamificacao-default",
      validation: (Rule) => Rule.required(),
      description:
        "Identificador estável para referências técnicas. Ex.: gamificacao-default.",
    }),
    defineField({
      name: "locale",
      title: "Idioma",
      type: "string",
      options: {
        list: [
          { title: "Português", value: "pt" },
          { title: "English", value: "en" },
        ],
        layout: "radio",
      },
      initialValue: "pt",
      validation: (Rule) => Rule.required(),
      description: "Emparelha documentos PT/EN com a mesma chave editorial no editor.",
      components: { input: LocaleSwitcherInput },
    }),
    defineField({
      name: "hero",
      title: "Hero da gamificação",
      type: "object",
      options: { collapsible: true, collapsed: false },
      components: { input: (props) => SectionAnnotation({ ...props, page: "gamificacao", section: "hero" }) },
      fields: [
        imageField(
          "showcaseImage",
          "Screenshot do hero",
          "Imagem exibida à direita ou como fundo no hero da página de gamificação.",
        ),
      ],
    }),
    defineField({
      name: "mechanics",
      title: "Cards de mecânicas",
      type: "object",
      options: { collapsible: true, collapsed: false },
      components: { input: (props) => SectionAnnotation({ ...props, page: "gamificacao", section: "mechanics" }) },
      description:
        "Até 6 cards na seção de mecânicas de gamificação. A ordem segue a ordem dos cards na página.",
      fields: [
        defineField({
          name: "items",
          title: "Visuais dos cards",
          type: "array",
          of: [
            imageWithEmojiField(
              "mechanicCard",
              "Card de mecânica",
              "Visual de um card de mecânica (pontos, missões, conquistas, etc.).",
            ),
          ],
          validation: (Rule) => Rule.max(6),
        }),
      ],
    }),
    defineField({
      name: "cases",
      title: "Cases / clientes",
      type: "object",
      options: { collapsible: true, collapsed: false },
      components: { input: (props) => SectionAnnotation({ ...props, page: "gamificacao", section: "cases" }) },
      description:
        "Logos e imagens dos cases de clientes exibidos na seção de estudos de caso.",
      fields: [
        defineField({
          name: "items",
          title: "Logos dos cases",
          type: "array",
          of: [
            defineField({
              name: "caseVisual",
              title: "Visual de case",
              type: "object",
              fields: [
                defineField({ name: "company", title: "Empresa", type: "string" }),
                imageField(
                  "logoImage",
                  "Logo da empresa",
                  "Substitui o texto/inicial exibido como logo no card do case.",
                ),
                imageField(
                  "featuredImage",
                  "Imagem de destaque do case",
                  "Imagem ou screenshot opcional exibida no card ou modal do case.",
                ),
              ],
              preview: {
                select: {
                  title: "company",
                  media: "logoImage",
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                prepare({ title, media }: { title?: string; media?: any }) {
                  return { title: title || "Case visual", media };
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "trends",
      title: "Cards de tendências",
      type: "object",
      options: { collapsible: true, collapsed: false },
      components: { input: (props) => SectionAnnotation({ ...props, page: "gamificacao", section: "trends" }) },
      description:
        "Até 6 cards na seção de tendências de mercado. A ordem segue a ordem dos cards na página.",
      fields: [
        defineField({
          name: "items",
          title: "Visuais dos cards",
          type: "array",
          of: [
            imageWithEmojiField(
              "trendCard",
              "Card de tendência",
              "Visual de um card de tendência de mercado.",
            ),
          ],
          validation: (Rule) => Rule.max(6),
        }),
      ],
    }),
    defineField({
      name: "kpis",
      title: "Cards de KPI",
      type: "object",
      options: { collapsible: true, collapsed: false },
      components: { input: (props) => SectionAnnotation({ ...props, page: "gamificacao", section: "kpis" }) },
      description:
        "Até 6 cards na seção de KPIs e impacto. A ordem segue a ordem dos cards na página.",
      fields: [
        defineField({
          name: "items",
          title: "Visuais dos cards",
          type: "array",
          of: [
            imageWithEmojiField(
              "kpiCard",
              "Card de KPI",
              "Visual de um card de KPI (retenção, engajamento, etc.).",
            ),
          ],
          validation: (Rule) => Rule.max(6),
        }),
      ],
    }),
    defineField({
      name: "deepUsecases",
      title: "Cards de casos de uso",
      type: "object",
      options: { collapsible: true, collapsed: false },
      components: { input: (props) => SectionAnnotation({ ...props, page: "gamificacao", section: "deepUsecases" }) },
      description:
        "Até 6 cards na seção de casos de uso aprofundados. A ordem segue a ordem dos cards na página.",
      fields: [
        defineField({
          name: "items",
          title: "Visuais dos cards",
          type: "array",
          of: [
            imageWithEmojiField(
              "usecaseCard",
              "Card de caso de uso",
              "Visual de um card de caso de uso (RH, vendas, logística, etc.).",
            ),
          ],
          validation: (Rule) => Rule.max(6),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "mediaKey",
      locale: "locale",
      media: "hero.showcaseImage",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare({
      title,
      subtitle,
      locale,
      media,
    }: {
      title?: string;
      subtitle?: string;
      locale?: string;
      media?: any;
    }) {
      return {
        title: title || "Mídia de showcase — Gamificação",
        subtitle: [subtitle ? `key: ${subtitle}` : null, locale ? `locale: ${locale}` : null]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});
