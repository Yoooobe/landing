import { defineField, defineType } from "sanity";

export const emailTrackingEventType = defineType({
  name: "emailTrackingEvent",
  title: "Evento de rastreamento de e-mail",
  type: "document",
  fields: [
    defineField({ name: "eventId", title: "ID do evento", type: "number", readOnly: true }),
    defineField({ name: "eventType", title: "Tipo", type: "string", readOnly: true,
      options: { list: ["open", "click", "unsubscribe"] } }),
    defineField({ name: "trackId", title: "Track ID", type: "string", readOnly: true }),
    defineField({ name: "email", title: "E-mail do contato", type: "string", readOnly: true }),
    defineField({ name: "campaignId", title: "Campanha", type: "number", readOnly: true }),
    defineField({ name: "etapa", title: "Etapa", type: "string", readOnly: true }),
    defineField({ name: "destination", title: "Destino", type: "string", readOnly: true,
      description: "URL HTTP(S) ou mailto assinado no link da campanha." }),
    defineField({ name: "occurredAt", title: "Ocorrido em", type: "datetime", readOnly: true }),
    defineField({ name: "userAgent", title: "User agent", type: "text", readOnly: true, hidden: true }),
    defineField({ name: "country", title: "País", type: "string", readOnly: true }),
    defineField({ name: "ipHash", title: "Hash do IP", type: "string", readOnly: true, hidden: true }),
    defineField({ name: "prefetch", title: "Prefetch de máquina", type: "boolean", readOnly: true }),
  ],
  preview: {
    select: { type: "eventType", email: "email", date: "occurredAt" },
    prepare: ({ type, email, date }) => ({
      title: `${type || "evento"} · ${email || "sem e-mail"}`,
      subtitle: date ? new Date(date).toLocaleString("pt-BR") : "",
    }),
  },
});
