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
      prepare({ title, media }) {
        return {
          title: title || "Card visual",
          media,
        };
      },
    },
  });
}

export const homeShowcaseMediaType = defineType({
  name: "homeShowcaseMedia",
  title: "Mídia de showcase da home",
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
      initialValue: "home-default",
      validation: (Rule) => Rule.required(),
      description:
        "Identificador estável para referências técnicas. Ex.: home-default.",
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
      name: "bento",
      title: "Cards Bento",
      type: "object",
      options: { collapsible: true, collapsed: false },
      components: { input: (props) => SectionAnnotation({ ...props, page: "home", section: "bento" }) },
      fields: [
        imageField(
          "primaryCardImage",
          "Imagem do card principal",
          "Substitui o mockup do dashboard no primeiro card da seção Bento.",
        ),
        imageField(
          "storeCardImage",
          "Imagem do card de catálogo",
          "Substitui a mídia do card de loja/recompensas na seção Bento.",
        ),
      ],
    }),
    defineField({
      name: "platformTabs",
      title: "Tabs da plataforma",
      type: "object",
      options: { collapsible: true, collapsed: false },
      components: { input: (props) => SectionAnnotation({ ...props, page: "home", section: "platformTabs" }) },
      fields: [
        imageField(
          "managementImage",
          "Imagem da aba Dashboard do Gestor",
          "Preview principal exibido quando a aba de gestão está ativa.",
        ),
        imageField(
          "storeImage",
          "Imagem da aba Loja do Membro",
          "Preview principal exibido quando a aba de loja está ativa.",
        ),
        imageField(
          "campaignsImage",
          "Imagem da aba Gestão de Campanhas",
          "Preview principal exibido quando a aba de campanhas está ativa.",
        ),
      ],
    }),
    defineField({
      name: "enterpriseCases",
      title: "Enterprise cases",
      type: "object",
      options: { collapsible: true, collapsed: false },
      components: { input: (props) => SectionAnnotation({ ...props, page: "home", section: "enterpriseCases" }) },
      fields: [
        imageField(
          "hapvidaLogoImage",
          "Logo da Hapvida",
          "Substitui o selo/letra usado no card Hapvida.",
        ),
        imageField(
          "hapvidaCaseImage",
          "Imagem principal do case Hapvida",
          "Substitui o mockup completo do case Hapvida.",
        ),
        imageField(
          "prioLogoImage",
          "Logo da Prio",
          "Substitui o selo/logo usado no card Prio.",
        ),
        imageField(
          "prioCaseImage",
          "Imagem principal do case Prio",
          "Substitui o mockup completo do case Prio.",
        ),
      ],
    }),
    defineField({
      name: "storeSection",
      title: "Loja corporativa",
      type: "object",
      options: { collapsible: true, collapsed: false },
      components: { input: (props) => SectionAnnotation({ ...props, page: "home", section: "storeSection" }) },
      fields: [
        defineField({
          name: "usecaseCards",
          title: "Cards de uso",
          type: "array",
          of: [
            imageWithEmojiField(
              "usecaseCard",
              "Card visual",
              "A ordem segue os 4 cards da seção de loja.",
            ),
          ],
          validation: (Rule) => Rule.max(4),
        }),
      ],
    }),
    defineField({
      name: "howItWorks",
      title: "Como funciona",
      type: "object",
      options: { collapsible: true, collapsed: false },
      components: { input: (props) => SectionAnnotation({ ...props, page: "home", section: "howItWorks" }) },
      fields: [
        imageField(
          "architectureImage",
          "Imagem da arquitetura",
          "Substitui o mockup técnico exibido no fim da seção.",
        ),
      ],
    }),
    defineField({
      name: "aiRoadmap",
      title: "AI roadmap",
      type: "object",
      options: { collapsible: true, collapsed: false },
      components: { input: (props) => SectionAnnotation({ ...props, page: "home", section: "aiRoadmap" }) },
      fields: [
        defineField({
          name: "stages",
          title: "Stages",
          type: "array",
          of: [
            defineField({
              name: "roadmapStage",
              title: "Stage visual",
              type: "object",
              fields: [
                defineField({
                  name: "icon",
                  title: "Ícone",
                  type: "string",
                  options: {
                    list: [
                      { title: "Sparkles", value: "sparkles" },
                      { title: "Target", value: "target" },
                      { title: "CPU", value: "cpu" },
                      { title: "Zap", value: "zap" },
                      { title: "Command", value: "command" },
                      { title: "Activity", value: "activity" },
                      { title: "Brain Circuit", value: "brain-circuit" },
                    ],
                  },
                }),
                defineField({
                  name: "accentTone",
                  title: "Cor de destaque",
                  type: "string",
                  options: {
                    list: [
                      { title: "Orange", value: "orange" },
                      { title: "Purple", value: "purple" },
                      { title: "Cyan", value: "cyan" },
                      { title: "Emerald", value: "emerald" },
                    ],
                  },
                }),
                imageField(
                  "image",
                  "Imagem do stage",
                  "Opcional. Se enviada, aparece acima da lista do stage.",
                ),
              ],
              preview: {
                select: {
                  title: "icon",
                  subtitle: "accentTone",
                  media: "image",
                },
                prepare({ title, subtitle, media }) {
                  return {
                    title: title || "Stage visual",
                    subtitle,
                    media,
                  };
                },
              },
            }),
          ],
          validation: (Rule) => Rule.max(4),
        }),
      ],
    }),
    defineField({
      name: "dedicatedIntegrations",
      title: "Integrações dedicadas",
      type: "object",
      options: { collapsible: true, collapsed: false },
      components: { input: (props) => SectionAnnotation({ ...props, page: "home", section: "dedicatedIntegrations" }) },
      fields: [
        defineField({
          name: "workvivo",
          title: "Workvivo",
          type: "object",
          fields: [
            imageField("logoImage", "Logo", "Substitui o selo/logo do card Workvivo."),
            imageField(
              "previewImage",
              "Preview principal",
              "Substitui o mockup central do feed/recompensa do Workvivo.",
            ),
          ],
        }),
        defineField({
          name: "beehome",
          title: "Beehome",
          type: "object",
          fields: [
            imageField("logoImage", "Logo", "Substitui o selo/logo do card Beehome."),
            imageField(
              "previewImage",
              "Preview principal",
              "Substitui o mockup de fluxo/conexão do card Beehome.",
            ),
          ],
        }),
      ],
    }),
    defineField({
      name: "managementSection",
      title: "Seção de gestão",
      type: "object",
      options: { collapsible: true, collapsed: false },
      components: { input: (props) => SectionAnnotation({ ...props, page: "home", section: "managementSection" }) },
      fields: [
        defineField({
          name: "featureCards",
          title: "Cards de gestão",
          type: "array",
          of: [
            imageWithEmojiField(
              "featureCard",
              "Card de gestão",
              "A ordem segue os 4 cards da ManagementSection.",
            ),
          ],
          validation: (Rule) => Rule.max(4),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "mediaKey",
      locale: "locale",
      media: "bento.primaryCardImage",
    },
    prepare({ title, subtitle, locale, media }) {
      return {
        title: title || "Mídia de showcase da home",
        subtitle: [subtitle ? `key: ${subtitle}` : null, locale ? `locale: ${locale}` : null]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});
