import { defineField, defineType } from "sanity";

const collectionKeyOptions = [
  { title: "Trust bar", value: "trustBar" },
  { title: "Grid de clientes", value: "clientsGrid" },
] as const;

export const logoCollectionType = defineType({
  name: "logoCollection",
  title: "Coleção de logos",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título interno",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "collectionKey",
      title: "Uso principal",
      type: "string",
      options: { list: [...collectionKeyOptions] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Logos",
      type: "array",
      validation: (Rule) => Rule.required().min(2),
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
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "name",
              media: "logo",
              subtitle: "href",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      collectionKey: "collectionKey",
      items: "items",
    },
    prepare({ title, collectionKey, items }) {
      const count = Array.isArray(items) ? items.length : 0;
      const useLabel =
        collectionKey === "clientsGrid"
          ? "Grid de clientes"
          : collectionKey === "trustBar"
            ? "Trust bar"
            : "Coleção";

      return {
        title: title || "Coleção de logos",
        subtitle: `${useLabel} · ${count} logo${count === 1 ? "" : "s"}`,
      };
    },
  },
});
