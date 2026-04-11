import { defineField, defineType } from "sanity";

const iconOptions = [
  { title: "Sparkles", value: "sparkles" },
  { title: "Zap", value: "zap" },
  { title: "Shield", value: "shield" },
  { title: "Target", value: "target" },
  { title: "Bar chart", value: "bar-chart-3" },
  { title: "Brain circuit", value: "brain-circuit" },
  { title: "Package", value: "package" },
  { title: "Store", value: "store" },
  { title: "Coins", value: "coins" },
  { title: "Globe", value: "globe-2" },
  { title: "Message square", value: "message-square" },
  { title: "Link", value: "link-2" },
] as const;

export const featureGridBlock = defineType({
  name: "featureGridBlock",
  title: "Sessão: Grade de Features",
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
      title: "Descrição de apoio",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Imagem opcional da seção",
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
    defineField({
      name: "columns",
      title: "Colunas no desktop",
      type: "string",
      initialValue: "3",
      options: {
        list: [
          { title: "2 colunas", value: "2" },
          { title: "3 colunas", value: "3" },
          { title: "4 colunas", value: "4" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      validation: (Rule) => Rule.required().min(2),
      of: [
        defineField({
          name: "featureCard",
          title: "Card",
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
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Ícone",
              type: "string",
              options: {
                list: [...iconOptions],
              },
            }),
            defineField({
              name: "href",
              title: "Link opcional",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
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
        title: title || "Grade de Features",
        subtitle: `${count} card${count === 1 ? "" : "s"}`,
        media,
      };
    },
  },
});
