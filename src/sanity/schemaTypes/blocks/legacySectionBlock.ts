import { defineField, defineType } from "sanity";

const sectionOptions = [
  { title: "Home: Hero", value: "homeHero" },
  { title: "Home: Faixa 4Unik", value: "homeFourUnik" },
  { title: "Home: Trust Bar", value: "homeTrustBar" },
  { title: "Home: Bento Features", value: "homeBentoFeatures" },
  { title: "Home: Platform Tabs", value: "homePlatformTabs" },
  { title: "Home: Stats Bar", value: "homeStatsBar" },
  { title: "Home: Why Section", value: "homeWhySection" },
  { title: "Home: Gamification Summary", value: "homeGamificationSummary" },
  { title: "Home: Gamification Duality", value: "homeGamificationDuality" },
  { title: "Home: Enterprise Cases", value: "homeEnterpriseCases" },
  { title: "Home: Dedicated Integrations", value: "homeDedicatedIntegrations" },
  { title: "Home: Store Section", value: "homeStoreSection" },
  { title: "Home: API Section", value: "homeApiSection" },
  { title: "Home: AI Roadmap", value: "homeAiRoadmap" },
  { title: "Home: Management Section", value: "homeManagementSection" },
  { title: "Home: How It Works", value: "homeHowItWorks" },
  { title: "Home: Pricing Section", value: "homePricingSection" },
  { title: "Home: Testimonials", value: "homeTestimonialsSection" },
  { title: "Home: Clients", value: "homeClientsSection" },
  { title: "Home: Final CTA", value: "homeFinalCta" },
  { title: "API e Integracoes: Pagina completa", value: "apiIntegracoesPage" },
  { title: "Gamificacao: Hero", value: "gamificacaoHero" },
  { title: "Gamificacao: Problem", value: "gamificacaoProblem" },
  { title: "Gamificacao: Mechanics", value: "gamificacaoMechanics" },
  { title: "Gamificacao: Flow", value: "gamificacaoFlow" },
  { title: "Gamificacao: Cases", value: "gamificacaoCases" },
  { title: "Gamificacao: Trends", value: "gamificacaoTrends" },
  { title: "Gamificacao: Stats", value: "gamificacaoStats" },
  { title: "Gamificacao: KPIs", value: "gamificacaoKpis" },
  { title: "Gamificacao: Deep Usecases", value: "gamificacaoDeepUsecases" },
  { title: "Gamificacao: FAQ", value: "gamificacaoFaq" },
  { title: "Gamificacao: CTA", value: "gamificacaoCta" },
  { title: "Plataforma: Hero", value: "plataformaHero" },
  { title: "Plataforma: Admin Dashboard", value: "plataformaAdminDashboard" },
  { title: "Plataforma: Gamification Engine", value: "plataformaGamificationEngine" },
  { title: "Plataforma: Store", value: "plataformaStore" },
  { title: "Plataforma: Logistics", value: "plataformaLogistics" },
  { title: "Plataforma: AI Roadmap", value: "plataformaAiRoadmap" },
  { title: "Plataforma: Security", value: "plataformaSecurity" },
  { title: "Plataforma: FAQ", value: "plataformaFaq" },
  { title: "Plataforma: CTA", value: "plataformaCta" },
  { title: "Inteligencia: Pagina completa", value: "inteligenciaPage" },
  { title: "Casos de uso: Hero", value: "casosHero" },
  { title: "Casos de uso: Grid", value: "casosGrid" },
  { title: "Casos de uso: FAQ", value: "casosFaq" },
  { title: "Casos de uso: CTA", value: "casosCta" },
] as const;

export const legacySectionBlock = defineType({
  name: "legacySectionBlock",
  title: "Sessao: Bloco legado",
  type: "object",
  description:
    "Permite montar paginas de marketing com as secoes existentes da landing enquanto o page builder migra para blocos nativos do Sanity.",
  fields: [
    defineField({
      name: "section",
      title: "Secao existente",
      type: "string",
      options: {
        list: [...sectionOptions],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "note",
      title: "Nota editorial",
      type: "string",
      description: "Campo opcional para registrar contexto interno sobre o uso desta secao.",
    }),
  ],
  preview: {
    select: {
      title: "section",
      subtitle: "note",
    },
    prepare({ title, subtitle }) {
      const option = sectionOptions.find((item) => item.value === title);

      return {
        title: option?.title || "Bloco legado",
        subtitle: subtitle || "Renderiza uma secao existente do frontend",
      };
    },
  },
});
