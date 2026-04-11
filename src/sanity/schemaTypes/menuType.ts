import { defineField, defineType } from "sanity";

const localeOptions = [
  { title: "Português", value: "pt" },
  { title: "English", value: "en" },
] as const;

const menuKeyOptions = [
  { title: "Header", value: "header" },
  { title: "Footer", value: "footer" },
] as const;

const iconOptions = [
  { title: "Layers / Visão geral", value: "overview" },
  { title: "Gamepad / Gamificação", value: "gamification" },
  { title: "Brain / Inteligência", value: "intelligence" },
  { title: "Trophy / Casos", value: "cases" },
  { title: "Gift / Catálogo", value: "rewards" },
  { title: "Network / API", value: "api" },
  { title: "Sparkles / Workvivo", value: "workvivo" },
  { title: "Wallets", value: "wallets" },
  { title: "Gestão", value: "manager" },
  { title: "Logística", value: "logistics" },
] as const;

export const menuType = defineType({
  name: "menu",
  title: "Menu de Navegação",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título interno",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "menuKey",
      title: "Área do menu",
      type: "string",
      options: { list: [...menuKeyOptions] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "locale",
      title: "Idioma",
      type: "string",
      options: { list: [...localeOptions] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Seções",
      type: "array",
      of: [
        defineField({
          name: "menuSection",
          title: "Seção do menu",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Título da seção",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "items",
              title: "Itens",
              type: "array",
              of: [
                defineField({
                  name: "menuItem",
                  title: "Item de menu",
                  type: "object",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Rótulo",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "description",
                      title: "Descrição curta",
                      type: "string",
                    }),
                    defineField({
                      name: "href",
                      title: "Link",
                      description:
                        "Pode ser uma rota interna (`/plataforma`, `/api-integracoes/workvivo/`) ou uma URL externa completa.",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "badge",
                      title: "Badge",
                      type: "string",
                    }),
                    defineField({
                      name: "icon",
                      title: "Ícone",
                      type: "string",
                      options: { list: [...iconOptions] },
                    }),
                    defineField({
                      name: "openInNewTab",
                      title: "Abrir em nova aba",
                      type: "boolean",
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: {
                      title: "label",
                      subtitle: "href",
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              itemCount: "items",
            },
            prepare({ title, itemCount }) {
              const count = Array.isArray(itemCount) ? itemCount.length : 0;
              return {
                title: title || "Seção do menu",
                subtitle: `${count} item${count === 1 ? "" : "s"}`,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      locale: "locale",
      menuKey: "menuKey",
    },
    prepare({ title, locale, menuKey }) {
      const localeLabel = locale === "en" ? "EN" : "PT";
      const areaLabel = menuKey === "footer" ? "Footer" : "Header";
      return {
        title: title || "Menu",
        subtitle: `${areaLabel} · ${localeLabel}`,
      };
    },
  },
});
