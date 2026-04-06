export const enPlataforma = {
  hero: {
    badge: "Full operational control",
    titleLine1: "Total visibility.",
    titleGradient: "Faster decisions.",
    sub:
      "Real-time analytics with eNPS, ROI, and redemption metrics. Budget approvals, bulk import, and direct ERP export—with full privacy compliance.",
  },
  pageCta: {
    title: "Ready for full control?",
    cta: "Request a demo",
  },
  adminDashboard: {
    mock: {
      sidebarOverview: "Overview",
      sidebarDashboard: "Dashboard",
      sidebarWallets: "Accounts (wallets)",
      sidebarStock: "Stock & shipping",
      chartTitle: "Operations performance",
      chartUpdated: "Updated 1 minute ago",
      chartRange: "Last 30 days",
      statLeftLabel: "Logistics cost (SLA)",
      statLeftValue: "R$ 12,450",
      statLeftTrend: "↓ 4.2% vs prior month",
      statRightLabel: "Service level",
      statRightValue: "99.8%",
      statRightSub: "On-time deliveries",
    },
    badge: "Manager console (admin)",
    titleBefore: "Own the rules of the ",
    titleGradient: "game",
    titleAfter: ".",
    body:
      "Where supervisors, HR, and budget owners govern the rules—e‑commerce / ERP‑style visibility over currency, SLAs, and reward logistics.",
    bullets: [
      {
        title: "SLA monitoring",
        body:
          "See where every kit is—from warehouse to doorstep—with integrated last‑mile tracking and D+1 delivery.",
      },
      {
        title: "Cost centers (budgeting)",
        body:
          "Manage approvals, split billing by department, and ship unified reports to finance—no loose spreadsheets.",
      },
      {
        title: "User base & levels",
        body:
          "Map roles, set starting coin balances, and separate operational vs. admin groups.",
      },
      {
        title: "Visual charts (BI)",
        body:
          "Spot top redeemed items each quarter and monitor ongoing team satisfaction.",
      },
    ],
  },
  gamificationEngine: {
    badge: "Gamification engine",
    titleBefore: "The ",
    titleGradient: "heart",
    titleAfter: " of engagement.",
    body:
      "Turn one-off or ongoing org goals (e.g. monthly sales, culture, feedback) into points inside a psychologically sound reward loop.",
    cards: [
      {
        title: "Time-bound campaigns",
        body:
          'Set start, end, and prize rules for a “Q3 sales push.” The engine scores conversion and awards badges when goals close.',
      },
      {
        title: "Peer-to-peer points",
        body:
          "Let employees send gratitude points that reinforce company values and 360° recognition.",
      },
    ],
    flowTitle: "Logical flow (autonomous events)",
    flow: {
      node1Title: "CRM webhook",
      node1Sub: "(target hit)",
      arrow1: "--- 500 pts --->",
      node2Title: "4unik engine",
      node2Sub: "(rules applied)",
      arrow2: "--- Wallet --->",
      node3Title: "Push app",
      node3Sub: "(app/email)",
    },
  },
  store: {
    badge: "Premium VIP catalog",
    titleBefore: "A VIP store with ",
    titleGradient: "your brand",
    titleAfter: " front and center.",
    bodyBefore:
      "Stop managing stock or buying products employees don’t want. Yoobe fills the store with 5,000+ quality SWAGs featuring ",
    bodyStrong: "YOUR BRAND",
    bodyAfter: " with on-demand shipping.",
    features: [
      {
        title: "B2C-grade experience for B2B",
        desc: "Filters, categories, rich product mockups, and fast transparent checkouts in the “coins” your company defines.",
      },
      {
        title: "Physical & digital mix",
        desc: "Blend swag with iFood, Uber, streaming, or VISA gift cards—so every generation at work finds something they want.",
      },
    ],
    mock: {
      navFeatured: "Highlights",
      navApparel: "Apparel",
      navDigital: "Digital",
      weekTitle: "This week’s launches",
      filter: "Filter",
      newBadge: "NEW",
      p1Category: "Apparel",
      p1Name: "Yoobe logo premium hoodie",
      p2Category: "Digital",
      p2Name: "iFood gift card R$100",
      pts: "pts",
    },
  },
  logistics: {
    title: "End-to-end logistics.",
    sub:
      "We’re not just software—we run the warehouse. Every redeemed reward is picked, packed, and shipped from our facilities with military precision.",
    cards: [
      {
        title: "Owned inventory",
        body:
          "Store corporate swag with us or use our partner catalog. B2C fulfillment straight to each employee’s home.",
      },
      {
        title: "National coverage",
        body:
          "Deep carrier integrations for optimized freight and tracked delivery—even to remote regions.",
      },
      {
        title: "Issue resolution",
        body:
          "Lost or damaged? We handle reship and reverse logistics automatically—no HR fire drills.",
      },
    ],
  },
  security: {
    badge: "Enterprise security",
    title: "Security, corporate SSO & privacy",
    body:
      "We protect highly sensitive people data (shipping addresses, tax IDs, department names). Our platform meets strict due diligence from banks and global tech enterprises.",
    items: [
      {
        title: "SAML / SSO (Active Directory)",
        body:
          "Microsoft Entra ID (Azure AD), Okta, or Google Workspace. When someone leaves, access is revoked instantly.",
      },
      {
        title: "Encryption & audit logs",
        body:
          "Every coin movement or HR permission change is recorded immutably in audit logs for five years.",
      },
    ],
  },
} as const;
