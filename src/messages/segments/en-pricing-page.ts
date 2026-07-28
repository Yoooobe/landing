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
        q: "How does billing work for 4unik API usage and gamification platform integrations?",
        a: "Any integration via the 4unik API — whether to connect with partner gamification platforms (like Feedz, Beehome, Catho, Workplace), ERPs, HR systems (Totvs, Senior), or communication channels (Slack/Teams) — is priced based on volume and integration type on the Enterprise plan. Talk to our sales team to get pricing for your case.",
      },
      {
        q: "Who is responsible for issuing invoices and shipping the rewards?",
        a: "4unik runs the entire fiscal and logistics operation end-to-end. We issue the shipping and delivery invoices required to send each product to the employee's final address anywhere in Brazil.",
      },
      {
        q: "How does inventory and storage management work?",
        a: "Your company can use our own product catalog or send custom gifts to 4unik's distribution center. All inventory is tracked in real time on the dashboard, with turnover reports and restock alerts.",
      },
      {
        q: "Can the platform integrate with our HR system or ERP?",
        a: "Yes. On the Enterprise plan we support REST API integrations, SSO (SAML/OAuth), and automated sync for onboarding and offboarding directly from your HR system. Pricing for API integrations is worked out with our sales team.",
      },
      {
        q: "What's the average delivery time for the employee?",
        a: "Orders ship within 24 to 48 business hours after redemption. Final transit time varies by destination region, averaging 2 to 5 business days for capitals and major metro areas.",
      },
      {
        q: "How is the monthly service billed?",
        a: "Billing consists of a fixed platform license fee (per the chosen plan) plus fulfillment, shipping, and any API integrations (pricing worked out with our sales team). All invoices are itemized on the dashboard.",
      },
    ],
  },
  plans: {
    sectionBadge: "Plans & investment",
    sectionTitle: "Engagement and recognition that drive results",
    sectionSubtitle:
      "We believe recognition is the key to engagement. Choose the right structure for the size of your company.",
    billingToggle: { monthly: "Monthly billing", annual: "Annual plan", annualBadge: "15% OFF" },
    popularLabel: "Most chosen by HR teams",
    periodLabel: "/mo",
    annualSavingsNote: "15% savings on annual billing",
    items: [
      {
        id: "essentials",
        name: "Essentials",
        monthlyPrice: "R$ 1,800",
        annualPrice: "R$ 1,530",
        capacity: "Up to 99 users",
        description:
          "A 100% no-code corporate store with a full catalog of 5,000+ products and self-contained gamification. The ideal starting point for small teams.",
        valueProposition: "Recognition without the hassle. Start valuing your team today.",
        features: [
          {
            label: "100% native (no-code) environment",
            hint: "Configure and publish without relying on a technical team — fully visual setup, no code.",
          },
          {
            label: "Corporate store with full catalog (5,000+ products)",
            hint: "5,000+ physical and digital products, experiences, and custom kits ready for redemption.",
          },
          {
            label: "Operated via the Manager Panel",
            hint: "Track orders, campaigns, users, and metrics in a single command panel — no juggling multiple systems.",
          },
          {
            label: "Self-contained gamification (points and badges)",
            hint: "Points for goals and peer recognition, plus visual badges for achievements and career milestones — all inside 4unik.",
          },
          {
            label: "PIX with points and milestone dates",
            hint: "Employees convert points into PIX balance, and the platform auto-triggers kits for birthdays and milestone dates.",
          },
          {
            label: "Gift shipping with our own logistics",
            hint: "Pick the product and recipients, schedule the shipment — 4unik handles logistics all the way to the employee's door.",
          },
          {
            label: "Campaign redemption landing page builder",
            hint: "Build a dedicated page for each campaign — hackathon, sales goal, onboarding — with its own branding and friendly URL, via a guided wizard.",
          },
          {
            label: "4unik home delivery and logistics",
            hint: "Delivered straight to the employee's home, with calculated shipping and tracking, anywhere in Brazil.",
          },
          {
            label: "Usage and redemption reports",
            hint: "Usage, redemption, and ROI reports to back HR and leadership decisions — no more loose spreadsheets.",
          },
          {
            label: "Priority email and chat support",
            hint: "A dedicated support team resolves operational questions fast, without generic ticket queues.",
          },
        ],
        ctaText: "Start with Essentials",
      },
      {
        id: "scale",
        name: "Scale",
        monthlyPrice: "R$ 4,000",
        annualPrice: "R$ 3,400",
        capacity: "Up to 499 users",
        description:
          "Full gamification and an expanded corporate store with 5,000+ premium products, including digital redemptions. For fast-growing companies.",
        valueProposition: "Immediate engagement, tangible results. Robust gamification.",
        isPopular: true,
        features: [
          { label: "Everything in Essentials, plus:" },
          {
            label: "Corporate store with full catalog (5,000+ products)",
            hint: "5,000+ physical and digital products, experiences, and custom kits ready for redemption.",
          },
          {
            label: "Digital product redemption in the corporate store",
            hint: "Gift cards, credits, and other digital items redeemable right in the store, alongside physical products.",
          },
          {
            label: "Self-contained gamification (points and badges)",
            hint: "Points for goals and peer recognition, plus visual badges for achievements and career milestones — all inside 4unik.",
          },
          {
            label: "PIX with points and milestone dates",
            hint: "Employees convert points into PIX balance, and the platform auto-triggers kits for birthdays and milestone dates.",
          },
          {
            label: "Intuitive campaign and goal management",
            hint: "Launch missions and goals by team or individual, with automatic recognition for milestones and birthdays, right from the panel.",
          },
          {
            label: "Human, hands-on support for managers",
            hint: "A support team stays close to your program's operation, on top of standard email and chat support.",
          },
        ],
        ctaText: "Book a demo",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        monthlyPrice: "Custom pricing",
        annualPrice: "Custom pricing",
        capacity: "499+ users",
        description:
          "Automation via 4unik APIs, native integrations with gamification platforms, and a dedicated CSM.",
        valueProposition: "Transform your culture with automated, limitless engagement.",
        features: [
          { label: "Everything in Scale, plus:" },
          {
            label: "4unik API usage: custom pricing",
            hint: "Covers real-time data traffic, point/statement endpoints, and redemption webhooks. Talk to our sales team for pricing on your case.",
          },
          {
            label: "Integration with gamification platforms (Feedz, Beehome, Catho, etc.)",
            hint: "Connect to the gamification and HR platforms your company already uses — from Feedz and Beehome to Workvivo, Slack, and ERPs — with no tool switching.",
          },
          {
            label: "Real-time webhooks and balance sync",
            hint: "Get points and redemption events in real time via webhook and keep balances always in sync with your system.",
          },
          {
            label: "Third-party logistics integration (self-managed) as an option",
            hint: "Prefer to use your own carrier or logistics ERP? 4unik connects with what you already have — or orchestrates everything on its own.",
          },
          {
            label: "Dedicated Customer Success Manager and guaranteed SLA",
            hint: "A Customer Success Manager oversees your operation, with a formal SLA defined in the contract.",
          },
        ],
        ctaText: "Talk to sales",
      },
    ],
  },
  variableCosts: {
    badge: "Parameterized values, editable in the contract",
    title: "Variable operational and logistics costs",
    subtitle: "Full transparency: you only pay for storage and shipments actually performed",
    items: [
      {
        label: "Setup and onboarding",
        value: "R$ 4,900",
        unit: "one-time",
        description: "Environment setup, brand upload, and training.",
      },
      {
        label: "API / gamification usage",
        value: "Custom pricing",
        unit: "user/month",
        description: "Cost per active user for any integration via the 4unik API (gamification platforms, HR systems, and ERPs) — talk to our sales team.",
      },
      {
        label: "Fulfillment per shipment",
        value: "R$ 4.50",
        unit: "+ shipping",
        description: "Picking, handling, and standard packaging per package shipped.",
      },
      {
        label: "Storage",
        value: "R$ 0.65",
        unit: "unit/month",
        description: "Secure storage of items at 4unik's distribution center.",
      },
      {
        label: "Extra employee",
        value: "R$ 1.90",
        unit: "unit/month",
        description: "Only for additional active seats beyond the plan's allowance.",
      },
    ],
    disclaimer: "Taxes not included. Shipping and DIFAL passed through per the applicable table. Values in Brazilian reais (R$).",
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
