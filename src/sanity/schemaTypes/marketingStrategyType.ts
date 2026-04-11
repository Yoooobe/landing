import { defineField, defineType } from "sanity";
import { portableTextField } from "./blocks/shared/portableText";

const localeOptions = [
  { title: "Português", value: "pt" },
  { title: "English", value: "en" },
];

export const marketingStrategyType = defineType({
  name: "marketingStrategy",
  title: "Estratégias de Marketing",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "locale",
      title: "Idioma",
      type: "string",
      initialValue: "pt",
      options: {
        list: localeOptions,
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pillar",
      title: "Pilar estratégico",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      initialValue: "draft",
      options: {
        list: [
          { title: "Rascunho", value: "draft" },
          { title: "Ativo", value: "active" },
          { title: "Arquivado", value: "archived" },
        ],
      },
    }),
    defineField({
      name: "summary",
      title: "Resumo",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    {
      ...portableTextField("body", "Conteúdo"),
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) => Rule.required(),
                  }),
                ],
              },
            ],
          },
        },
        { type: "ctaBlock" },
        { type: "faqBlock" },
        { type: "statsBlock" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "pillar",
    },
  },
});
