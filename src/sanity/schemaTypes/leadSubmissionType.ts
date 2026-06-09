import { defineField, defineType } from "sanity";

export const leadSubmissionType = defineType({
  name: "leadSubmission",
  title: "Lead (formulário)",
  type: "document",
  fields: [
    defineField({
      name: "submittedAt",
      title: "Recebido em",
      type: "datetime",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "company",
      title: "Empresa",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Telefone",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Mensagem",
      type: "text",
      rows: 4,
      readOnly: true,
    }),
    defineField({
      name: "source",
      title: "Origem (source)",
      type: "string",
      readOnly: true,
      description: "Identificador da página ou bloco (ex.: home, plataforma-motor).",
    }),
    defineField({
      name: "locale",
      title: "Idioma",
      type: "string",
      readOnly: true,
      options: {
        list: [
          { title: "Português", value: "pt" },
          { title: "English", value: "en" },
        ],
      },
    }),
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      readOnly: true,
      options: {
        list: [
          { title: "Email enviado", value: "emailed" },
          { title: "Recebido", value: "received" },
          { title: "Falhou", value: "failed" },
        ],
      },
      initialValue: "emailed",
    }),
    defineField({
      name: "postmarkInternalId",
      title: "Postmark ID (interno)",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "postmarkAutoReplyId",
      title: "Postmark ID (auto-reply)",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "slug",
      title: "Slug interno",
      type: "slug",
      readOnly: true,
      options: { source: "email", maxLength: 96 },
    }),
  ],
  orderings: [
    {
      title: "Mais recentes",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      name: "name",
      company: "company",
      source: "source",
      submittedAt: "submittedAt",
    },
    prepare({ name, company, source, submittedAt }) {
      const when = submittedAt ? new Date(submittedAt).toLocaleString("pt-BR") : "";
      return {
        title: name || "Lead",
        subtitle: [company, source, when].filter(Boolean).join(" · "),
      };
    },
  },
});
