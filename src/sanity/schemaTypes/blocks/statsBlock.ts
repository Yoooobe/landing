import { defineField, defineType } from "sanity";

export const statsBlock = defineType({
  name: "statsBlock",
  title: "Sessão: Estatísticas",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Indicadores",
      type: "array",
      of: [
        defineField({
          name: "statItem",
          title: "Indicador",
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Valor",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Rótulo",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "supportingText",
              title: "Texto de apoio",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "value",
              subtitle: "label",
            },
          },
        }),
      ],
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
      items: "items",
      media: "image",
    },
    prepare({ title, items, media }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: title || "Estatísticas",
        subtitle: `${count} indicador${count === 1 ? "" : "es"}`,
        media,
      };
    },
  },
});
