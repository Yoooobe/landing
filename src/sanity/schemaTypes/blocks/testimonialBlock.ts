import { defineField, defineType } from "sanity";

export const testimonialBlock = defineType({
  name: "testimonialBlock",
  title: "Sessão: Depoimentos",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Depoimentos",
      type: "array",
      of: [
        defineField({
          name: "testimonialItem",
          title: "Depoimento",
          type: "object",
          fields: [
            defineField({
              name: "quote",
              title: "Citação",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "author",
              title: "Autor",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "role",
              title: "Cargo",
              type: "string",
            }),
            defineField({
              name: "company",
              title: "Empresa",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "author",
              subtitle: "company",
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
        title: title || "Depoimentos",
        subtitle: `${count} depoimento${count === 1 ? "" : "s"}`,
        media,
      };
    },
  },
});
