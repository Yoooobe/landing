export const enPlataforma = {
  seo: {
    title: "Platform | 4Unik V3 — Reward Infrastructure",
    description:
      "Analytics console, gamification engine, redemption store, logistics, and enterprise security. Reward infrastructure and fulfillment for engagement programs.",
    openGraphDescription:
      "Console, gamification, catalog, fulfillment, and SSO: the 4Unik V3 stack to run rewards at scale.",
  },
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
      "Where managers, HR, and budget owners control the rules, with ERP-style visibility into balances, SLAs, and reward logistics.",
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
          "Track top redeemed items each quarter and monitor employee satisfaction over time.",
      },
    ],
  },
  gamificationEngine: {
    badge: "Gamification engine",
    titleBefore: "The ",
    titleGradient: "heart",
    titleAfter: " of engagement.",
    body:
      "Use 4unik as your native gamification and engagement layer or connect external platforms. Goals, internal actions, recognition, and challenges become points, campaigns, and redemption pages inside the corporate store.",
    cards: [
      {
        title: "Campaigns with dedicated pages",
        body:
          "Publish dedicated redemption experiences for hackathons, internal challenges, onboarding flows, and performance goals with their own identity, catalog, and timing.",
      },
      {
        title: "Native engine or integrations",
        body:
          "4unik can receive events from other engagement platforms or run the full mechanic itself with rules, wallet, and redemption in one flow.",
      },
    ],
    flowTitle: "Logical flow (autonomous events)",
    flow: {
      node1Title: "CRM webhook",
      node1Sub: "(target hit)",
      arrow1: "--- 500 pts --->",
      node2Title: "4Unik engine",
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
      "Stop managing stock or buying products employees do not want. 4Unik V3 fills the store with 5,000+ quality swag options featuring ",
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
      p1Name: "Premium hoodie with 4Unik logo",
      p2Category: "Digital",
      p2Name: "iFood gift card R$100",
      pts: "pts",
    },
  },
  logistics: {
    title: "End-to-end logistics.",
    sub:
      "We are not just software. We run the warehouse too, so every redeemed reward is picked, packed, and shipped through a single operating model.",
    cards: [
      {
        title: "Owned inventory",
        body:
          "Store corporate swag with us or use our partner catalog. B2C fulfillment straight to each employee’s home.",
      },
      {
        title: "National coverage",
        body:
          "Deep carrier integrations for optimized freight and tracked delivery, including remote regions.",
      },
      {
        title: "Issue resolution",
        body:
          "If something is lost or damaged, we handle reshipments and reverse logistics automatically, without pulling HR into firefighting.",
      },
    ],
  },
  security: {
    badge: "Enterprise security",
    title: "Security, corporate SSO & privacy",
    body:
      "We protect sensitive employee data, including shipping addresses, tax IDs, and department details. Our platform meets the due diligence standards expected by banks and global technology companies.",
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
  faq: {
    badge: "FAQ",
    titleBefore: "Questions about the",
    titleGradient: "4Unik V3 platform",
    titleAfter: "",
    items: [
      {
        q: "Is 4Unik V3 just a swag catalog?",
        a: "No. 4Unik V3 is reward infrastructure: administration, a gamification engine, catalog, fulfillment, and integrations built for engagement and incentive programs, not a standalone storefront.",
      },
      {
        q: "How does reward fulfillment work?",
        a: "Operations cover catalog, stock, shipping, and post-sale support; managers track SLAs and deliveries in the console, with tracking and reverse logistics when needed.",
      },
      {
        q: "Does the platform scale to thousands of employees?",
        a: "Yes—cost-center separation, roles, SSO, and reporting for large populations, with an enterprise-grade architecture.",
      },
      {
        q: "Where do APIs and integrations fit?",
        a: "Events and data flow through APIs and webhooks to CRMs, HRIS, and channels like Workvivo; the API section of the site explains the ecosystem.",
      },
    ],
  },
} as const;
