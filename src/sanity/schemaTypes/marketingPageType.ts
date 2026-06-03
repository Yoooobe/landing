import { defineField, defineType } from "sanity";
import { LocaleSwitcherInput } from "@/sanity/components/LocaleSwitcherInput";

const localeOptions = [
  { title: "Português", value: "pt" },
  { title: "English", value: "en" },
];

type MarketingPageDoc = {
  content?: unknown[];
  seo?: { metaTitle?: string; metaDescription?: string };
};

export const marketingPageType = defineType({
  name: "marketingPage",
  title: "Landing Pages de Marketing",
  type: "document",
  validation: (Rule) =>
    Rule.custom((doc) => {
      const page = doc as MarketingPageDoc | undefined;
      const content = page?.content;
      if (!Array.isArray(content) || content.length === 0) {
        return "Adicione pelo menos uma sessão (bloco) antes de considerar a página pronta.";
      }
      if (!page?.seo?.metaTitle?.trim()) {
        return "Preencha o Meta Title no grupo SEO.";
      }
      if (!page?.seo?.metaDescription?.trim()) {
        return "Preencha a Meta Description no grupo SEO.";
      }
      return true;
    }),
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
      validation: (Rule) =>
        Rule.min(1).error("Inclua pelo menos um bloco de conteúdo (hero, grid, legado, etc.)."),
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
