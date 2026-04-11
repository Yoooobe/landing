import { defineField, defineType } from "sanity";
import { portableTextField } from "./shared/portableText";

export const splitContentBlock = defineType({
  name: "splitContentBlock",
  title: "Sessão: Texto + Imagem",
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
    portableTextField("body", "Conteúdo"),
    defineField({
      name: "bullets",
      title: "Bullets opcionais",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "imageSide",
      title: "Posição da imagem",
      type: "string",
      initialValue: "right",
      options: {
        list: [
          { title: "Imagem à direita", value: "right" },
          { title: "Imagem à esquerda", value: "left" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "image",
      title: "Imagem",
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
      name: "primaryLabel",
      title: "CTA principal",
      type: "string",
    }),
    defineField({
      name: "primaryHref",
      title: "Link do CTA principal",
      type: "string",
    }),
    defineField({
      name: "secondaryLabel",
      title: "CTA secundário",
      type: "string",
    }),
    defineField({
      name: "secondaryHref",
      title: "Link do CTA secundário",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Texto + Imagem",
        subtitle,
        media,
      };
    },
  },
});
