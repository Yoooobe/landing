import { defineField, defineType } from "sanity";
import { LocaleSwitcherInput } from "@/sanity/components/LocaleSwitcherInput";

function imageField(name: string, title: string, description?: string) {
  return defineField({
    name,
    title,
    type: "image",
    description,
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Texto alternativo",
        type: "string",
      }),
    ],
  });
}

export const workvivoShowcaseMediaType = defineType({
  name: "workvivoShowcaseMedia",
  title: "Mídia de showcase da integração Workvivo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título interno",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mediaKey",
      title: "Chave editorial",
      type: "string",
      initialValue: "workvivo-default",
      validation: (Rule) => Rule.required(),
      description:
        "Identificador estável para emparelhar documentos PT/EN no editor (ex.: workvivo-default).",
    }),
    defineField({
      name: "locale",
      title: "Idioma",
      type: "string",
      options: {
        list: [
          { title: "Português", value: "pt" },
          { title: "English", value: "en" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      components: { input: LocaleSwitcherInput },
    }),
    imageField(
      "heroImage",
      "Imagem hero do Workvivo (feed + AI companion)",
      "Screenshot do feed Workvivo com AI companion. Substitui o static workvivo-hero.png na seção 'O que é o Workvivo'.",
    ),
    imageField(
      "commsImage",
      "Comms Orchestration",
      "Screenshot do painel de Comms Orchestration do Workvivo.",
    ),
    imageField(
      "intelligenceImage",
      "People Intelligence",
      "Screenshot do dashboard de analytics de engajamento (People Intelligence).",
    ),
    imageField(
      "frontlineImage",
      "Frontline App",
      "Screenshot do Workvivo no mobile — Frontline App.",
    ),
    imageField(
      "shoutoutImage",
      "Shoutout no feed (desktop escuro)",
      "Screenshot do desktop escuro mostrando um shoutout no feed. Usado na seção de gap (o que o Workvivo entrega).",
    ),
    imageField(
      "feedShoutoutImage",
      "Shoutout no feed (modo claro)",
      "Screenshot alternativo do feed com shoutout em modo claro.",
    ),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "locale",
      media: "heroImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Mídia Workvivo",
        subtitle: subtitle ? `locale: ${subtitle}` : undefined,
        media,
      };
    },
  },
});
