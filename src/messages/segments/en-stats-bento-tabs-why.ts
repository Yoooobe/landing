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
      "From small sales challenges to delivering a physical prize to an employee’s home—everything in one place, without endless spreadsheets.",
    card1: {
      title: "You’re in control",
      body: "Skip approval ping-pong. Set budgets, track engagement, and ship automated reports to finance.",
      cta: "See the dashboard",
    },
    mockMonth: "Monthly overview",
    mockDate: "Oct 2026",
    mockRev: "Revenue",
    mockRed: "Redemptions",
    mockSla: "SLA on time",
    card2: {
      title: "Fun campaigns",
      body: "Create missions tied to company goals. Distribute points, build healthy rankings, and recognize top performers.",
    },
    card3: {
      title: "They pick the prize",
      body: "A huge catalog where teams redeem points—and we deliver door-to-door across Brazil.",
    },
    card4: {
      title: "Connects to your stack",
      body: "Low friction for IT. Plug into the tools you already use every day—Slack, Teams, Workday, and more.",
      cta: "Documentation",
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
      body: "Managers get end-to-end control of recognition—from order status to redemption analytics.",
      bullets: [
        "Real-time BRL monitoring",
        "Budget and balance approvals",
        "User base with granular permissions",
        "ERP-ready report exports",
      ],
      cta: "Explore features",
      mockTitle: "Admin view",
    },
    loja: {
      title: "A VIP corporate store",
      body: "Employees redeem points for thousands of items from the premium Yoobe catalog or partners—balance, filters, and track & trace.",
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
      body: "Business rules with levels, tags, and credits by performance, tenure, or time-bound campaigns.",
      bullets: [
        "Campaigns with badges and levels",
        "User tags (e.g., on-site, hybrid)",
        "APIs connect CRM or HR",
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
        desc: "We believe recognition shapes culture. Every reward is a real connection between company and employee.",
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
    titleAfter: ". Yoobe delivers.",
    sub:
      "83% of employees feel more motivated with gamification. Points, rankings, missions, and real rewards—one integrated platform.",
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
        desc: "5,000+ real products in the marketplace. Employees choose and receive at home—minimal HR overhead.",
      },
    ],
  },
  demoStrip: {
    points: "Points",
    missions: "Active missions",
    level: "Level",
    levelValue: "Gold II",
  },
} as const;
