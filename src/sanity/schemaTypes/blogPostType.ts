import { defineField, defineType } from "sanity";

const localeOptions = [
  { title: "Português", value: "pt" },
  { title: "English", value: "en" },
];

export const blogPostType = defineType({
  name: "blogPost",
  title: "Posts do Blog",
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
      name: "excerpt",
      title: "Resumo",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTimeMinutes",
      title: "Tempo de leitura (min)",
      type: "number",
      initialValue: 5,
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: "featured",
      title: "Destacar no topo da listagem",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de capa",
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
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
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
      ],
    }),
    defineField({
      name: "relatedKeywords",
      title: "Palavras-chave relacionadas",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "string",
      description: "Nome do editor ou redator responsável pelo post.",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: 'Labels finos como "OKRs", "NPS", "Recompensas", "Eventos".',
    }),
    defineField({
      name: "aiGenerated",
      title: "Gerado por IA",
      type: "boolean",
      initialValue: false,
      description: "Marque quando o conteúdo foi gerado automaticamente pelo agente de IA 4unik. Revise antes de publicar.",
      group: "editorial",
    }),
    defineField({
      name: "contentBrief",
      title: "Brief / Prompt usado",
      type: "text",
      rows: 4,
      description: "Brief editorial ou prompt usado para geração do conteúdo. Apenas para referência interna.",
      group: "editorial",
    }),
  ],
  groups: [
    {
      name: "editorial",
      title: "Dados editoriais",
    },
  ],
  orderings: [
    {
      title: "Mais recentes",
      name: "publishedAtDesc",
      by: [
        { field: "publishedAt", direction: "desc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
      author: "author",
      aiGenerated: "aiGenerated",
    },
    prepare({ title, subtitle, media, author, aiGenerated }) {
      const parts = [subtitle, author].filter(Boolean).join(" · ");
      return {
        title: aiGenerated ? `🤖 ${title}` : title,
        subtitle: parts || subtitle,
        media,
      };
    },
  },
});
