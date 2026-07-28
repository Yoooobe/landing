import { defineField, defineType } from "sanity";

export const pricingPlansBlock = defineType({
  name: "pricingPlansBlock",
  title: "Sessão: Planos de Preço",
  type: "object",
  fields: [
    defineField({
      name: "billingToggleMonthlyLabel",
      title: "Rótulo do toggle — Mensal",
      type: "string",
    }),
    defineField({
      name: "billingToggleAnnualLabel",
      title: "Rótulo do toggle — Anual",
      type: "string",
    }),
    defineField({
      name: "billingToggleAnnualBadge",
      title: "Badge do toggle anual (ex: 15% OFF)",
      type: "string",
    }),
    defineField({
      name: "plans",
      title: "Planos",
      type: "array",
      of: [
        defineField({
          name: "pricingPlan",
          title: "Plano",
          type: "object",
          fields: [
            defineField({ name: "planId", title: "ID interno", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "name", title: "Nome do plano", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "monthlyPrice", title: "Preço mensal (texto, ex: R$ 1.800 ou Sob consulta)", type: "string" }),
            defineField({ name: "annualPrice", title: "Preço anual (texto)", type: "string" }),
            defineField({ name: "capacity", title: "Capacidade (ex: até 99 usuários)", type: "string" }),
            defineField({ name: "description", title: "Descrição", type: "text" }),
            defineField({ name: "valueProposition", title: "Proposta de valor (frase curta)", type: "string" }),
            defineField({ name: "isPopular", title: "Plano em destaque / mais popular", type: "boolean" }),
            defineField({
              name: "features",
              title: "Lista de recursos inclusos",
              type: "array",
              of: [
                defineField({
                  name: "pricingPlanFeature",
                  title: "Recurso",
                  type: "object",
                  fields: [
                    defineField({ name: "label", title: "Texto do bullet", type: "string", validation: (Rule) => Rule.required() }),
                    defineField({
                      name: "hint",
                      title: "Hint explicativo (aparece no ícone de info)",
                      type: "text",
                      description: "Explicação curta e intuitiva do recurso — deixe em branco pra bullets que são só cabeçalho (ex: 'Tudo do Essentials e mais:').",
                    }),
                  ],
                  preview: {
                    select: { title: "label", subtitle: "hint" },
                  },
                }),
              ],
            }),
            defineField({ name: "ctaText", title: "Texto do botão CTA", type: "string" }),
          ],
          preview: {
            select: { title: "name", subtitle: "monthlyPrice" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { plans: "plans" },
    prepare({ plans }) {
      const count = Array.isArray(plans) ? plans.length : 0;
      return {
        title: "Planos de Preço",
        subtitle: `${count} plano${count === 1 ? "" : "s"}`,
      };
    },
  },
});
