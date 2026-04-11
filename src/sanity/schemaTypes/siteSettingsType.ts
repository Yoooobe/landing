import { defineField, defineType } from "sanity";

const gaPattern = /^G-[A-Z0-9]+$/i;
const gtmPattern = /^GTM-[A-Z0-9]+$/i;

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Configurações do site",
  type: "document",
  fields: [
    defineField({
      name: "notes",
      title: "Notas internas",
      type: "text",
      rows: 3,
      description: "Uso interno (não aparece na landing).",
    }),
    defineField({
      name: "environmentLabel",
      title: "Ambiente",
      description:
        "Ex.: production, staging. Indicador opcional no UI de desenvolvimento.",
      type: "string",
      initialValue: "production",
    }),
    defineField({
      name: "gaMeasurementId",
      title: "Google Analytics 4 — Measurement ID",
      description:
        "Formato G-XXXXXXXXXX. Prioridade: variável NEXT_PUBLIC_GA_ID, depois este campo.",
      type: "string",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value || String(value).trim() === "") return true;
          return gaPattern.test(String(value).trim())
            ? true
            : "Use um ID válido no formato G-…";
        }),
    }),
    defineField({
      name: "gtmContainerId",
      title: "Google Tag Manager — Container ID",
      description: "Formato GTM-XXXXXXX.",
      type: "string",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value || String(value).trim() === "") return true;
          return gtmPattern.test(String(value).trim())
            ? true
            : "Use um ID válido no formato GTM-…";
        }),
    }),
    defineField({
      name: "metaPixelId",
      title: "Meta (Facebook) Pixel ID",
      type: "string",
    }),
    defineField({
      name: "linkedinPartnerId",
      title: "LinkedIn Partner ID",
      type: "string",
    }),
    defineField({
      name: "calendlyUrl",
      title: "URL do Calendly (demo)",
      type: "url",
    }),
    defineField({
      name: "whatsappUrl",
      title: "URL do WhatsApp",
      type: "url",
    }),
    defineField({
      name: "contactEmail",
      title: "Email de contacto",
      type: "string",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value || String(value).trim() === "") return true;
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim())
            ? true
            : "Email inválido";
        }),
    }),
    defineField({
      name: "appLoginUrl",
      title: "URL de login da plataforma",
      type: "url",
    }),
    defineField({
      name: "rewardsCatalogUrl",
      title: "URL do catálogo de recompensas",
      type: "url",
    }),
    defineField({
      name: "companySiteUrl",
      title: "URL institucional / logística",
      type: "url",
    }),
    defineField({
      name: "privacyUrl",
      title: "URL da política de privacidade",
      type: "url",
    }),
    defineField({
      name: "termsUrl",
      title: "URL dos termos de uso",
      type: "url",
    }),
    defineField({
      name: "headerWordmarkImage",
      title: "Wordmark do header",
      description:
        "Opcional. Se vazio, o frontend usa o wordmark estático atual.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
      ],
    }),
    defineField({
      name: "footerWordmarkImage",
      title: "Wordmark do footer",
      description:
        "Opcional. Se vazio, o frontend usa o wordmark estático atual.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
      ],
    }),
    defineField({
      name: "defaultOgImage",
      title: "Imagem Open Graph por defeito",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
      ],
    }),
    defineField({
      name: "headerMenuPt",
      title: "Menu do header (PT)",
      description: "Documento `menu` usado no header em português.",
      type: "reference",
      to: [{ type: "menu" }],
    }),
    defineField({
      name: "headerMenuEn",
      title: "Menu do header (EN)",
      description: "Documento `menu` usado no header em inglês.",
      type: "reference",
      to: [{ type: "menu" }],
    }),
    defineField({
      name: "footerMenuPt",
      title: "Menu do footer (PT)",
      description: "Documento `menu` usado no footer em português.",
      type: "reference",
      to: [{ type: "menu" }],
    }),
    defineField({
      name: "footerMenuEn",
      title: "Menu do footer (EN)",
      description: "Documento `menu` usado no footer em inglês.",
      type: "reference",
      to: [{ type: "menu" }],
    }),
    defineField({
      name: "trustLogoCollection",
      title: "Coleção de logos da trust bar",
      description: "Logos exibidos na faixa de confiança da home.",
      type: "reference",
      to: [{ type: "logoCollection" }],
    }),
    defineField({
      name: "clientsLogoCollection",
      title: "Coleção de logos da grade de clientes",
      description: "Logos exibidos na seção ampla de clientes e prova social.",
      type: "reference",
      to: [{ type: "logoCollection" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Configurações do site" };
    },
  },
});
