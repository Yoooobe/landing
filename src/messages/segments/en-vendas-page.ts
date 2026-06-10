export const enVendasPage = {
  seo: {
    title: "For sales teams | 4Unik — incentives integrated with your CRM",
    description:
      "Hit the goal, get rewarded instantly. Connect your CRM and reward the sales team automatically, with real prizes—no spreadsheets, no waiting.",
    openGraphDescription:
      "Sales incentives integrated with your CRM: instant rewards and real prizes.",
  },
  hero: {
    badge: "For sales teams",
    title: "Hit the goal, get rewarded instantly",
    definitionLead:
      "Sales teams connect their CRM to 4Unik to reward goals with real prizes—no spreadsheets, no delivery delays.",
    sub:
      "Stop rewarding sales with spreadsheets and delays. Connect your CRM: when a goal is hit, 4Unik unlocks points automatically for the rep to redeem for real prizes.",
    ctaLabel: "Talk to a specialist",
    ctaHref: "https://calendly.com/yoobeco/demo",
  },
  problem: {
    badge: "The pain",
    title: "Manual incentives demotivate the team",
    items: [
      {
        title: "Manual, slow rewards",
        desc: "Tallying results in a spreadsheet delays the prize and cools motivation.",
        icon: "activity",
      },
      {
        title: "Recognition without rhythm",
        desc: "When the prize lags, the incentive loses its effect in the race to the goal.",
        icon: "target",
      },
      {
        title: "Generic catalog",
        desc: "A dull giveaway won't move a high-performance team.",
        icon: "package",
      },
    ],
  },
  how: {
    badge: "How it works",
    title: "From CRM to prize, automatically",
    sub: "The win becomes points on the spot, with no manual work.",
    columns: "3" as const,
    items: [
      {
        title: "Connect the CRM",
        desc: "Integrate via API; goals and results trigger the reward.",
        icon: "link-2",
      },
      {
        title: "Goal hit unlocks points",
        desc: "No manual step: the win turns into points instantly.",
        icon: "zap",
      },
      {
        title: "Rep picks the prize",
        desc: "A broad catalog of real products for instant redemption.",
        icon: "store",
      },
    ],
  },
  benefits: {
    badge: "Why 4Unik",
    title: "Performance recognized at the right time",
    items: [
      {
        title: "Instant gratification",
        desc: "Recognizing on the spot keeps the team engaged for the next goal.",
        icon: "zap",
      },
      {
        title: "Leaderboards & campaigns",
        desc: "Performance leaderboards and quarterly campaigns.",
        icon: "bar-chart-3",
      },
      {
        title: "Delivery on us",
        desc: "4Unik handles inventory, shipping, and tracking.",
        icon: "package",
      },
    ],
  },
  faq: {
    items: [
      {
        q: "How do you reward sales teams without spreadsheets?",
        a: "Connect your CRM via API: when a goal is hit, 4Unik unlocks points automatically for the rep to redeem real prizes. No manual tallying or delays—catalog, inventory, and shipping stay with 4Unik. See integrations at /en/api-integracoes/.",
      },
      {
        q: "Which CRM does it integrate with?",
        a: "Integration is via API, so it connects to the major CRMs and sales tools. Talk to us about your stack.",
      },
      {
        q: "Is the reward really automatic?",
        a: "Yes. When a goal is recorded as hit, 4Unik unlocks the points automatically for redemption.",
      },
      {
        q: "Does it work for individual and team goals?",
        a: "Both. You define rules by person, squad, or region, with leaderboards.",
      },
      {
        q: "What prizes can the team redeem?",
        a: "Real products from a broad catalog; the rep chooses and receives it at home.",
      },
    ],
  },
  cta: {
    eyebrow: "Next step",
    title: "Want to reward sales at the right moment?",
    body:
      "Tell us about your team, goals, and CRM. We'll set up the automatic incentive flow with you.",
    primaryLabel: "Talk to a specialist",
    primaryHref: "https://calendly.com/yoobeco/demo",
  },
} as const;
