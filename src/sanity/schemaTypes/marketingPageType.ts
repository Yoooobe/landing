import { defineField, defineType } from "sanity";
import { LocaleSwitcherInput } from "@/sanity/components/LocaleSwitcherInput";

const localeOptions = [
  { title: "Português", value: "pt" },
  { title: "English", value: "en" },
];

export const marketingPageType = defineType({
  name: "marketingPage",
  title: "Landing Pages de Marketing",
  type: "document",
  groups: [
    { name: "editorial", title: "Editorial", default: true },
    { name: "seo", title: "SEO" },
    { name: "ops", title: "Operação" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título interno",
      type: "string",
      group: "editorial",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "ops",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "locale",
      title: "Idioma",
      type: "string",
      group: "ops",
      initialValue: "pt",
      options: {
        list: localeOptions,
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      components: { input: LocaleSwitcherInput },
    }),
    defineField({
      name: "summary",
      title: "Resumo interno",
      type: "text",
      group: "ops",
      rows: 3,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
    defineField({
      name: "content",
      title: "Sessões da página",
      type: "array",
      group: "editorial",
      description:
        "Editor visual por blocos. Pode combinar blocos nativos editáveis com blocos legados enquanto a migração editorial avança.",
      of: [
        { type: "heroBlock" },
        { type: "featureGridBlock" },
        { type: "caseStudyGridBlock" },
        { type: "splitContentBlock" },
        { type: "logoStripBlock" },
        { type: "legacySectionBlock" },
        { type: "richTextSection" },
        { type: "ctaBlock" },
        { type: "faqBlock" },
        { type: "statsBlock" },
        { type: "testimonialBlock" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `/${subtitle}` : "Sem slug",
      };
    },
  },
});
