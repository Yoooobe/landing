export const enCasosPage = {
  hero: {
    badge: "Global case studies",
    titleBefore: "Real outcomes from",
    titleGradient: "market leaders",
    titleAfter: ".",
    sub:
      "How SAP, Deloitte, IBM, Microsoft, and CaLLogix used gamification infrastructure to solve complex HR, sales, and community problems.",
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
          "SAP redesigned its developer community reputation system and rolled out gamified learning platforms.",
        challenge: "Low community participation and the need to improve retention of technical knowledge.",
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
          "CaLLogix faced high churn and absenteeism. It implemented gamification focused on behavioral rewards.",
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
} as const;
