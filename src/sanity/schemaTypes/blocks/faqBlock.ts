import { defineField, defineType } from "sanity";

export const faqBlock = defineType({
  name: "faqBlock",
  title: "Sessão: FAQ",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
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
            defineField({
              name: "question",
              title: "Pergunta",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Resposta",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "question",
              subtitle: "answer",
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
        title: title || "FAQ",
        subtitle: `${count} pergunta${count === 1 ? "" : "s"}`,
        media,
      };
    },
  },
});
