import { defineField, defineType } from "sanity";

export const variableCostsBlock = defineType({
  name: "variableCostsBlock",
  title: "Sessão: Custos Operacionais Variáveis",
  type: "object",
  fields: [
    defineField({ name: "badge", title: "Selo (ex: valores parametrizados e editáveis)", type: "string" }),
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "text" }),
    defineField({
      name: "items",
      title: "Itens de custo",
      type: "array",
      of: [
        defineField({
          name: "variableCostItem",
          title: "Item de custo",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Rótulo", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "value", title: "Valor (ex: R$ 4,90)", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "unit", title: "Unidade (ex: usuário/mês, único, + frete)", type: "string" }),
            defineField({ name: "description", title: "Descrição", type: "text" }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        }),
      ],
    }),
    defineField({ name: "disclaimer", title: "Aviso legal / fiscal", type: "text" }),
  ],
  preview: {
    select: { title: "title", items: "items" },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: title || "Custos Operacionais Variáveis",
        subtitle: `${count} item${count === 1 ? "" : "s"}`,
      };
    },
  },
});
