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

export const apiIntegracoesShowcaseMediaType = defineType({
  name: "apiIntegracoesShowcaseMedia",
  title: "Mídia de showcase — API e Integrações",
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
      initialValue: "api-integracoes-default",
      validation: (Rule) => Rule.required(),
      description:
        "Identificador estável para referências técnicas. Ex.: api-integracoes-default.",
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
      title: "Hero da página de API",
      type: "object",
      options: { collapsible: true, collapsed: false },
      components: { input: (props) => SectionAnnotation({ ...props, page: "api", section: "hero" }) },
      fields: [
        imageField(
          "showcaseImage",
          "Diagrama / screenshot do hero",
          "Imagem ou diagrama exibido à direita do hero da página de API e Integrações (substitui a janela de código animada).",
        ),
      ],
    }),
    defineField({
      name: "integrations",
      title: "Cards de integrações prontas",
      type: "object",
      options: { collapsible: true, collapsed: false },
      components: { input: (props) => SectionAnnotation({ ...props, page: "api", section: "integrations" }) },
      description:
        "Logos e previews das 3 plataformas de integração principais (Workvivo, Beehome, Hapvida). A ordem segue a ordem dos cards na página.",
      fields: [
        defineField({
          name: "platforms",
          title: "Plataformas",
          type: "array",
          of: [
            defineField({
              name: "platformVisual",
              title: "Visual de plataforma",
              type: "object",
              fields: [
                defineField({
                  name: "platformName",
                  title: "Nome da plataforma",
                  type: "string",
                  description: "Ex.: Workvivo, Beehome, Hapvida.",
                }),
                imageField(
                  "logoImage",
                  "Logo da plataforma",
                  "Substitui o círculo com letra/inicial exibido no card da integração.",
                ),
                imageField(
                  "previewImage",
                  "Preview / mockup da integração",
                  "Screenshot ou mockup exibido como visual principal do card ou modal da integração.",
                ),
              ],
              preview: {
                select: {
                  title: "platformName",
                  media: "logoImage",
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                prepare({ title, media }: { title?: string; media?: any }) {
                  return { title: title || "Plataforma", media };
                },
              },
            }),
          ],
          validation: (Rule) => Rule.max(3),
        }),
      ],
    }),
    defineField({
      name: "features",
      title: "Cards de features da grade",
      type: "object",
      options: { collapsible: true, collapsed: false },
      components: { input: (props) => SectionAnnotation({ ...props, page: "api", section: "features" }) },
      description:
        "Imagens opcionais para os cards da grade de features da API (REST, webhooks, sandbox, etc.).",
      fields: [
        defineField({
          name: "items",
          title: "Visuais dos cards",
          type: "array",
          of: [
            imageWithEmojiField(
              "featureCard",
              "Card de feature",
              "Visual de um card de feature da grade (API REST, Webhooks, Sandbox, etc.).",
            ),
          ],
          validation: (Rule) => Rule.max(6),
        }),
      ],
    }),
    defineField({
      name: "modules",
      title: "Cards de módulos da plataforma",
      type: "object",
      options: { collapsible: true, collapsed: false },
      components: { input: (props) => SectionAnnotation({ ...props, page: "api", section: "modules" }) },
      description:
        "Até 6 cards da seção de módulos da plataforma. A ordem segue a ordem dos cards na página.",
      fields: [
        defineField({
          name: "items",
          title: "Visuais dos cards",
          type: "array",
          of: [
            imageWithEmojiField(
              "moduleCard",
              "Card de módulo",
              "Visual de um módulo da plataforma (gestão, loja, campanhas, etc.).",
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
        title: title || "Mídia de showcase — API e Integrações",
        subtitle: [subtitle ? `key: ${subtitle}` : null, locale ? `locale: ${locale}` : null]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});
