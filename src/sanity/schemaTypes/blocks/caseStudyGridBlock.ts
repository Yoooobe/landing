import { defineField, defineType } from "sanity";

export const caseStudyGridBlock = defineType({
  name: "caseStudyGridBlock",
  title: "Sessão: Estudos de Caso",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título opcional da seção",
      type: "string",
    }),
    defineField({
      name: "challengeLabel",
      title: "Rótulo do desafio",
      type: "string",
      initialValue: "Challenge solved",
    }),
    defineField({
      name: "resultsLabel",
      title: "Rótulo dos resultados",
      type: "string",
      initialValue: "Proven results",
    }),
    defineField({
      name: "items",
      title: "Cases",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineField({
          name: "caseStudyItem",
          title: "Case",
          type: "object",
          fields: [
            defineField({
              name: "company",
              title: "Empresa",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "industry",
              title: "Indústria",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Título do case",
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
              name: "challenge",
              title: "Desafio",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "href",
              title: "Link opcional",
              type: "string",
            }),
            defineField({
              name: "metrics",
              title: "Métricas",
              type: "array",
              validation: (Rule) => Rule.required().min(1),
              of: [
                defineField({
                  name: "metric",
                  title: "Métrica",
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
                      name: "tone",
                      title: "Tom",
                      type: "string",
                      options: {
                        list: [
                          { title: "Padrão", value: "default" },
                          { title: "Sucesso", value: "success" },
                          { title: "Accent", value: "accent" },
                        ],
                        layout: "radio",
                      },
                      initialValue: "default",
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
          ],
          preview: {
            select: {
              title: "company",
              subtitle: "title",
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
    },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: title || "Estudos de Caso",
        subtitle: `${count} case${count === 1 ? "" : "s"}`,
      };
    },
  },
});
