export const enStatsBentoTabsWhy = {
  statsBar: {
    items: [
      { value: "500", suffix: "+", label: "Companies served" },
      { value: "1M", suffix: "+", label: "Rewards delivered" },
      { value: "98", suffix: "%", label: "Customer satisfaction" },
      { value: "5000", suffix: "+", label: "Catalog products" },
    ],
  },
  bento: {
    badge: "Overview",
    titleLine1: "The central hub to inspire and",
    titleLine2: "reward the people who make things happen.",
    sub:
      "Campaigns, points, store, and delivery in one place. Less spreadsheet work, more clarity for leaders and teams.",
    card1: {
      title: "You’re in control",
      body: "Set budgets and see what matters in real time. Finance-ready reports—without chasing approvals in email threads.",
      cta: "See the dashboard",
    },
    mockMonth: "Monthly overview",
    mockDate: "Oct 2026",
    mockRev: "Revenue",
    mockRed: "Redemptions",
    mockSla: "SLA on time",
    card2: {
      title: "Fun campaigns",
      body: "Launch missions tied to business goals. Points, rankings, and recognition stay visible to everyone.",
    },
    card3: {
      title: "They pick the prize",
      body: "People redeem points from the catalog. We handle fulfillment—from order to doorstep across Brazil.",
    },
    card4: {
      title: "Connects with your stack",
      body: "Managers get a simple workflow; IT gets a clear API and docs to plug into what you already run day to day.",
      cta: "Documentation",
      apiNote: "Built to integrate without the usual integration headaches.",
    },
  },
  platformTabs: {
    badge: "Explore the solution",
    title: "A smooth experience for managers and members",
    tabGestao: "📊 Manager dashboard",
    tabLoja: "🎁 Member store",
    tabCampanhas: "🎯 Campaign management",
    gestao: {
      title: "Full operational visibility",
      body: "One dashboard for orders, revenue, reward inventory, and points in circulation—from pipeline status to redemption insights.",
      bullets: [
        "Order funnel and revenue signals in real time",
        "Roles and permissions for admins, ops, and store experiences",
        "Activity history for governance and audit trails",
        "Budgets, balances, and finance-ready exports",
      ],
      cta: "Explore features",
      mockTitle: "Admin view",
    },
    loja: {
      title: "A VIP corporate store",
      body: "Employees redeem points for thousands of items from the premium 4Unik catalog or partner brands, with balance, filters, and delivery tracking built in.",
      bullets: [
        "Coin balance always visible",
        "Filters by value and category",
        "Delivery status with home shipping",
        "Digital options or physical kits and swag",
      ],
      cta: "Open catalog",
      mockTitle: "Member view",
    },
    campanhas: {
      title: "Campaigns & engagement",
      body: "Launch campaigns with landing pages and templates for onboarding, recognition, promos, or retention—with segmentation and business rules.",
      bullets: [
        "Customizable pages and themes without running a separate site",
        "Audience segmentation, tags, and credits (performance, tenure, seasonal)",
        "Track engagement and campaign performance in the dashboard",
        "APIs and webhooks connect CRM, HR, and engagement tools",
      ],
      cta: "Gamification strategies",
      mockTitle: "Campaign setup",
      mockBtn: "+ New campaign",
    },
  },
  why: {
    badge: "Why we exist",
    titleBefore: "Recognition drives",
    titleGradient: "performance",
    sub:
      "65% of employees receive no recognition during the year. We change that with gamification, integrated logistics, and full privacy compliance.",
    cards: [
      {
        title: "Purpose",
        desc: "We believe recognition shapes culture. Every reward becomes a meaningful connection between company and employee.",
      },
      {
        title: "How we do it",
        desc: "We combine gamification, logistics, and tech in one integrated platform—from points to delivery.",
      },
      {
        title: "Outcomes",
        desc: "Active companies report +30 eNPS points in 6 months, ~78% redemption, and up to 25% lower turnover in year one.",
      },
    ],
  },
  gamificationSummary: {
    badge: "Corporate gamification",
    titleBefore: "Gamification that",
    titleGradient: "engages",
    titleAfter: ". 4Unik delivers.",
    sub:
      "83% of employees report higher motivation with gamification. Points, rankings, missions, and real rewards in one integrated platform.",
    cards: [
      {
        title: "Points & rankings",
        desc: "Configurable points plus team or individual leaderboards—visible, fair recognition.",
      },
      {
        title: "Missions & challenges",
        desc: "Thematic campaigns, OKR goals, time-bound challenges, and automatic rewards—ongoing engagement.",
      },
      {
        title: "Badges & levels",
        desc: "Achievement badges, progression paths, and digital certifications—employees track the journey.",
      },
      {
        title: "Prize redemption",
        desc: "5,000+ real products in the marketplace. Employees choose what they want and receive it at home with minimal HR overhead.",
      },
    ],
  },
  demoStrip: {
    points: "Points",
    missions: "Active missions",
    level: "Level",
    levelValue: "Gold II",
  },
  sectionLeadCta: {
    common: {
      secondaryHint: "Prefer to book or chat now?",
    },
    afterPlatform: {
      title: "Want to see users, roles, and permissions in action?",
      body: "Tell us your team size and what you need to run (orders, points, store). We’ll reply with clear next steps.",
      source: "home-after-platform",
    },
    afterCampaigns: {
      title: "Campaigns with landing pages and segmentation—how would it fit?",
      body: "Share your goals (onboarding, targets, retention) and desired integrations. We’ll align a proposal with your HR stack.",
      source: "home-campaigns",
    },
    afterOperations: {
      title: "Catalog, logistics, and delivery at scale",
      body: "Tell us about product variants, shipping, and multi-site needs—we’ll help design end-to-end operations on 4Unik.",
      source: "home-operations",
    },
  },
} as const;
