export const enCasosPage = {
  seo: {
    title: "Use Cases | 4Unik — Reward Infrastructure",
    description:
      "Global enterprise case studies in corporate gamification and communities. How market leaders scale engagement—and how 4Unik provides reward infrastructure.",
    openGraphDescription:
      "Global enterprise case studies in corporate gamification and communities. Reward infrastructure for engagement programs.",
  },
  hero: {
    badge: "Global case studies",
    titleBefore: "Real outcomes from",
    titleGradient: "market leaders",
    titleAfter: ".",
    sub:
      "How SAP, Deloitte, IBM, Microsoft, and CaLLogix used gamification to solve complex HR, sales, and community challenges.",
  },
  caseStudies: {
    challengeLabel: "Challenge solved",
    resultsLabel: "Proven results",
    cases: [
      {
        id: "sap",
        company: "SAP",
        industry: "Enterprise technology",
        title: "Gamification in the SAP Community Network",
        description:
          "SAP redesigned its developer community reputation system and rolled out gamified learning experiences.",
        challenge: "Low community participation and a need to improve retention of technical knowledge.",
        metrics: [
          { value: "+400%", label: "Community usage" },
          { value: "+96%", label: "Feedback" },
          { value: "-25%", label: "Training costs", tone: "success" as const },
        ],
      },
      {
        id: "deloitte",
        company: "Deloitte",
        industry: "Consulting & audit",
        title: "Gamified leadership at Deloitte University",
        description:
          "Deloitte transformed its leadership curriculum with gamification, turning mandatory training into engaging experiences.",
        challenge: "Low completion rates for leadership programs—leaders weren’t finishing courses on time.",
        metrics: [
          { value: "+50%", label: "Course completion" },
          { value: "+47%", label: "Return rate" },
          { value: "3x", label: "More engagement" },
        ],
      },
      {
        id: "callogix",
        company: "CaLLogix",
        industry: "Contact center",
        title: "Turnover reduction with gamification",
        description:
          "CaLLogix faced high churn and absenteeism. It introduced gamification focused on behavioral rewards.",
        challenge: "Very high turnover and chronic absenteeism in contact centers, driving up costs.",
        metrics: [
          { value: "-50%", label: "Turnover", tone: "success" as const },
          { value: "-80%", label: "Absenteeism", tone: "success" as const },
          { value: "US$ 380k", label: "Annual savings", tone: "accent" as const },
        ],
      },
      {
        id: "ibm",
        company: "IBM",
        industry: "Technology",
        title: "Elite seller training",
        description:
          "IBM ran gamified programs to upskill sellers on technical topics, blending simulations and regional challenges.",
        challenge: "Sellers needed deep technical skills, but training saw low adoption.",
        metrics: [
          { value: "+18%", label: "Sales lift" },
          { value: "+70%", label: "Knowledge retention" },
          { value: "2x", label: "Onboarding speed" },
        ],
      },
      {
        id: "microsoft",
        company: "Microsoft",
        industry: "Security & OS",
        title: "Language Quality Game & beta testing",
        description:
          "Microsoft used gamification to improve Windows OS translations and dramatically increase beta participation.",
        challenge: "Inconsistent translation quality and low employee participation in bug review.",
        metrics: [
          { value: "+400%", label: "Beta participation" },
          { value: "26k", label: "Tasks completed" },
          { value: "4,500", label: "Bugs reported" },
        ],
      },
    ],
  },
  faq: {
    badge: "FAQ",
    titleBefore: "Questions on",
    titleGradient: "use cases",
    titleAfter: "and 4Unik",
    items: [
      {
        q: "What is 4Unik in the context of corporate gamification?",
        a: "4Unik is reward infrastructure: API, catalog, and fulfillment for teams that already run or are building engagement programs, often alongside the 4Unik V3 platform for gamification and incentives.",
      },
      {
        q: "Do these case studies use 4Unik directly?",
        a: "The stories highlight enterprises that invested in gamification and community programs with public outcomes. They illustrate the class of problems engagement infrastructure solves; 4Unik positions itself as reward infrastructure and integrations for similar programs.",
      },
      {
        q: "How should I choose reward infrastructure for my program?",
        a: "Evaluate API-first integration, catalog depth, logistics coverage, privacy compliance, and whether you need a standalone catalog or a full platform with a gamification engine, which aligns with what 4Unik delivers alongside 4Unik V3.",
      },
      {
        q: "Where can I read about APIs and integrations?",
        a: "The API & integrations section covers webhooks, ecosystem, and partners; 4Unik emphasizes API integration so rewards fit your stack.",
      },
    ],
  },
} as const;
