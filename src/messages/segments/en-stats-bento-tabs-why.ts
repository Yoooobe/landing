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
    titleLine1: "One place to inspire,",
    titleLine2: "engage, and reward your team.",
    sub:
      "Everything you need to recognize people who move the business forward—without living in spreadsheets or chasing vendors the night before an event.",
    card1: {
      title: "You’re in control",
      body: "Set budgets and see what matters in real time. Finance-ready reports without approval threads in email.",
      cta: "See the dashboard",
    },
    mockMonth: "Monthly overview",
    mockDate: "Oct 2026",
    mockRev: "Revenue",
    mockRed: "Redemptions",
    mockSla: "SLA on time",
    card2: {
      title: "Campaigns people actually get",
      body: "Missions tied to real goals. Points, rankings, and recognition stay visible—without feeling like a gimmick.",
    },
    card3: {
      title: "They pick the gift",
      body:
        "People redeem points from the catalog. 4Unik runs automated logistics from order to tracking—we ship worldwide, and for teams outside Brazil we produce locally at the destination when it’s faster and simpler.",
    },
    card4: {
      title: "Fits what you already run",
      body:
        "Simple workflows for HR and managers; clear API docs and per-user pricing for engineering. Connect gamification, shipping, HRIS, or intranet—without vendor lock-in.",
      cta: "Documentation",
      apiNote: "Built to integrate without the usual integration headaches.",
    },
  },
  platformTabs: {
    badge: "Explore the solution",
    title: "A clear experience for managers and members",
    tabGestao: "📊 Manager dashboard",
    tabLoja: "🎁 Member store",
    tabCampanhas: "🎯 Campaign management",
    gestao: {
      title: "Everything visible in one dashboard",
      body: "Track orders, revenue, reward inventory, and points in circulation—from pipeline status to what people are redeeming.",
      bullets: [
        "Order status and revenue signals in real time",
        "Roles for admins, ops, and store experiences",
        "History for governance and audit when you need it",
        "Budgets, balances, and exports to your ERP",
      ],
      cta: "Explore features",
      mockTitle: "Admin view",
    },
    loja: {
      title: "A corporate store that feels like a gift, not a generic perk",
      body: "Employees redeem points for thousands of items from the 4Unik catalog or partners—with clear balance, filters, and delivery tracking.",
      bullets: [
        "Coin balance always visible",
        "Filters by value and category",
        "Delivery tracking to the doorstep",
        "Digital items, physical kits, or branded swag",
      ],
      cta: "Open catalog",
      mockTitle: "Member view",
    },
    campanhas: {
      title: "Campaigns & engagement",
      body: "Onboarding, recognition, goals, or milestones—with branded pages, segmentation, and rules you control.",
      bullets: [
        "On-brand pages without maintaining another website",
        "Audiences by team, tag, or profile (goals, tenure, seasonality)",
        "Engagement and outcomes in the same dashboard",
        "Connect CRM, HR, and engagement tools when it makes sense",
      ],
      cta: "Gamification strategies",
      mockTitle: "Campaign setup",
      mockBtn: "+ New campaign",
    },
  },
  why: {
    badge: "Why 4Unik",
    titleBefore: "Recognition drives",
    titleGradient: "performance",
    sub:
      "65% of employees receive no recognition during the year. We help change that with approachable gamification, a corporate store, and logistics that don’t bury HR—built with privacy in mind.",
    cards: [
      {
        title: "Purpose",
        desc: "Real recognition shapes culture. Every reward is a chance to connect company and person.",
      },
      {
        title: "How we do it",
        desc: "Gamification, store, and delivery in one flow—from points to the gift in hand—with our logistics or yours connected by API.",
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
      "83% of employees report higher motivation when gamification is done well. Points, rankings, missions, and real rewards—integrated, not scattered across spreadsheets.",
    cards: [
      {
        title: "Points & rankings",
        desc: "Clear rules and team or individual leaderboards. Everyone sees who is recognized and why.",
      },
      {
        title: "Missions & challenges",
        desc: "Time-bound campaigns with goals and automatic rewards—momentum without weekly manual ops.",
      },
      {
        title: "Badges & levels",
        desc: "Achievements, paths, and visible milestones—people track their own journey.",
      },
      {
        title: "Prize redemption",
        desc: "5,000+ real products. People choose what they want—we fulfill or connect your logistics. Your call.",
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
      title: "Want to see dashboards, roles, and reports in action?",
      body: "Tell us your team size and what you need to run (orders, points, store). We’ll reply with clear next steps within one business day.",
      source: "home-after-platform",
    },
    afterCampaigns: {
      title: "Campaigns & segmentation—how would this fit your HR stack?",
      body: "Share your goals (onboarding, targets, retention) and tools you already use. We’ll align a proposal without unnecessary jargon.",
      source: "home-campaigns",
    },
    afterOperations: {
      title: "Catalog, shipping, and teams across countries",
      body: "Tell us about product variants, timelines, and whether you need local production abroad. We’ll design end-to-end operations with you.",
      source: "home-operations",
    },
  },
} as const;
