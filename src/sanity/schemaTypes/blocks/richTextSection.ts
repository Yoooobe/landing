import { defineField, defineType } from "sanity";
import { portableTextField } from "./shared/portableText";

export const richTextSection = defineType({
  name: "richTextSection",
  title: "Sessão: Texto Rico",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Título da secção",
      type: "string",
    }),
    portableTextField("content", "Conteúdo"),
    defineField({
      name: "image",
      title: "Imagem da secção",
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
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Texto Rico",
        media,
      };
    },
  },
});
