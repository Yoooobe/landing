export const enPricingPage = {
  seo: {
    title: "Plans & pricing | 4Unik",
    description:
      "Compare plans for gamification, rewards store, and API. Scale with active users without running logistics alone.",
  },
  hero: {
    badge: "Plans & pricing",
    title: "Pick the right plan for your program size",
    sub: "No surprise setup fees. Scale as engagement grows — 4Unik runs the rewards operation.",
  },
  faq: {
    items: [
      {
        q: "Are home page prices the same as here?",
        a: "Starter and Pro match the home reference. Scale and Enterprise terms are finalized with sales based on volume and integrations.",
      },
      {
        q: "Per active user API billing?",
        a: "Yes — API plans align cost to active users in the program, not a generic flat bundle.",
      },
      {
        q: "Can we start small and upgrade?",
        a: "Most customers start on Starter or Pro and move up as headcount, campaigns, or integrations grow.",
      },
    ],
  },
  cta: {
    title: "Need a quote for your volume?",
    body: "Book a call and we will shape the plan around integrations, catalog, and logistics for your case.",
    primaryLabel: "Book a demo",
    primaryHref: "https://calendly.com/4unik/30min",
  },
  scale: {
    name: "Scale",
    blurb: "For larger ops with analytics and GraphQL",
    priceLabel: "Custom pricing",
    bullets: [
      "Volume beyond Pro",
      "Advanced analytics",
      "GraphQL and extended integrations",
      "Dedicated support",
    ],
    cta: "Talk to sales",
  },
} as const;
