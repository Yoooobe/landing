import {
  DEFAULT_MARKETING_ICON_ID,
  isMarketingIconId,
  MARKETING_ICON_MANIFEST,
} from "@/config/marketing-icon-manifest";
import { IconPickerInput } from "@/sanity/components/IconPickerInput";
import { defineField, defineType } from "sanity";

const iconListOptions = MARKETING_ICON_MANIFEST.map((e) => ({
  title: e.title,
  value: e.id,
}));

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
              title: "Ícone (Lucide)",
              type: "string",
              initialValue: DEFAULT_MARKETING_ICON_ID,
              options: {
                list: iconListOptions,
                layout: "dropdown",
              },
              components: { input: IconPickerInput },
              validation: (Rule) =>
                Rule.custom((val) => {
                  if (val == null || val === "") return true;
                  return isMarketingIconId(String(val)) || "Ícone não está no manifest aprovado";
                }),
            }),
            defineField({
              name: "customSvg",
              title: "SVG personalizado (opcional)",
              description:
                "Se carregar um ficheiro .svg, ele substitui o ícone Lucide no site. O SVG é sanitizado automaticamente.",
              type: "file",
              options: {
                accept: "image/svg+xml",
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
