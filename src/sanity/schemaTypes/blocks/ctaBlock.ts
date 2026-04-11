import { defineField, defineType } from "sanity";

export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "Sessão: CTA",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "primaryLabel",
      title: "Texto do botão principal",
      type: "string",
    }),
    defineField({
      name: "primaryHref",
      title: "Link do botão principal",
      type: "url",
    }),
    defineField({
      name: "secondaryLabel",
      title: "Texto do botão secundário",
      type: "string",
    }),
    defineField({
      name: "secondaryHref",
      title: "Link do botão secundário",
      type: "url",
    }),
    defineField({
      name: "showLeadForm",
      title: "Mostrar formulário de contacto (lead)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "leadFormVariant",
      title: "Estilo do formulário",
      type: "string",
      options: {
        list: [
          { title: "Marketing (padrão escuro)", value: "marketing" },
          { title: "Home", value: "home" },
          { title: "Plataforma (cartão claro)", value: "plataforma" },
          { title: "API / integrações", value: "api" },
          { title: "Gamificação", value: "gamificacao" },
          { title: "Casos de uso", value: "casos" },
          { title: "Inteligência (cartão claro)", value: "inteligencia" },
        ],
        layout: "dropdown",
      },
      hidden: ({ parent }) => !parent?.showLeadForm,
    }),
    defineField({
      name: "image",
      title: "Imagem da secção",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "primaryLabel",
      media: "image",
    },
  },
});
