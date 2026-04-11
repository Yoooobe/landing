import { defineField, defineType } from "sanity";

export const logoStripBlock = defineType({
  name: "logoStripBlock",
  title: "Sessão: Faixa de Logos",
  type: "object",
  fields: [
    defineField({
      name: "displayStyle",
      title: "Estilo visual",
      type: "string",
      initialValue: "grid",
      options: {
        list: [
          { title: "Faixa compacta", value: "compact" },
          { title: "Grid ampliado", value: "grid" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "sectionId",
      title: "ID opcional da seção",
      description: "Use para ancoragem no frontend, por exemplo `clientes`.",
      type: "string",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "collection",
      title: "Coleção de logos",
      description: "Fonte nativa preferencial. Quando preenchida, o bloco usa a coleção referenciada.",
      type: "reference",
      to: [{ type: "logoCollection" }],
    }),
    defineField({
      name: "items",
      title: "Logos",
      type: "array",
      description: "Fallback local quando a coleção referenciada não for usada.",
      of: [
        defineField({
          name: "logoItem",
          title: "Logo",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Nome",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link opcional",
              type: "string",
            }),
            defineField({
              name: "logo",
              title: "Imagem do logo",
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
              title: "name",
              media: "logo",
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
      displayStyle: "displayStyle",
      collectionTitle: "collection.title",
    },
    prepare({ title, items, displayStyle, collectionTitle }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: title || "Faixa de Logos",
        subtitle: [
          displayStyle === "compact" ? "Faixa compacta" : "Grid ampliado",
          collectionTitle || `${count} logo${count === 1 ? "" : "s"}`,
        ]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
