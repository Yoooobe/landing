export const enRest = {
  apiSection: {
    badge: "For your engineering team",
    titleBefore: "Connect",
    titleBrand: "4Unik",
    titleAfter: "to any system you already run",
    sub:
      "API pricing is based on active users—you pay for real program size, not a flat guess. Integrate gamification, shipping, HRIS, intranet, your own logistics, or merchandise suppliers. No vendor lock-in: your stack stays yours.",
    bullets: [
      "Trigger rewards and redemptions in real time from your systems",
      "Unified login with the security posture your IT team expects",
      "Clear developer docs and a safe sandbox environment",
      "Sync with HR, engagement, or your own catalog when that’s the right model",
      "Plug in carriers and suppliers—the platform orchestrates or simply fits what you already operate",
    ],
    ctaDocs: "Docs & API for developers",
    ctaApi: "Request API access",
    codeComment: "// Create reward via API",
    codeReason: "Q1 goal achieved",
  },
  storeSection: {
    badge: "Gifts for every moment",
    titleBefore: "Thousands of",
    titleGradient: "options",
    titleAfter: "for every moment",
    sub:
      "5,000+ products, 100+ categories. Build custom kits or let employees choose. We deliver worldwide—and for teams outside Brazil, we produce locally at the destination when it cuts time and cost.",
    usecases: [
      {
        title: "Welcome kits",
        desc: "Memorable day-one kits with your brand—without HR becoming the purchasing department.",
      },
      {
        title: "Recognition",
        desc: "Goals hit, work anniversaries, and team wins—with gifts people actually want.",
      },
      {
        title: "Suppliers & distributors",
        desc: "Put your products inside active corporate reward programs. The 4Unik store is a real B2B engagement channel—not a one-off promo.",
      },
      {
        title: "Events & trade shows",
        desc: "Themed swag and kits that stick—without spreadsheet chaos the night before.",
      },
    ],
    ctaCatalog: "Open catalog",
    ctaKit: "Build a custom kit",
  },
  managementSection: {
    badge: "Management without guesswork",
    titleBefore: "From order to",
    titleGradient: "delivery",
    titleAfter: ", everything under control",
    sub: "One dashboard for rewards, shipments, and program metrics—so HR sees what’s working and finance closes the month with clarity.",
    features: [
      {
        title: "A dashboard managers understand",
        desc: "Engagement, redemptions, and program signals in one place—no stitching five exports together.",
      },
      {
        title: "Integrated logistics",
        desc: "Tracking, reward inventory, and predictable timelines—across Brazil and international delivery when your program needs it.",
      },
      {
        title: "People and teams organized",
        desc: "Bulk import, segmentation by area or site, and per-person balance control.",
      },
      {
        title: "Security & compliance",
        desc: "Access roles, traceability, and privacy practices aligned with what your company already expects.",
      },
    ],
  },
  clients: {
    badge: "Who trusts 4Unik",
    titleBefore: "Companies that have already",
    titleGradient: "transformed",
    titleAfter: "their people programs",
    sub: "From lean teams to global operations, we help HR run recognition and corporate stores without becoming an internal shipping department.",
  },
  testimonials: {
    badge: "Testimonials",
    titleBefore: "What our customers",
    titleGradient: "say",
    items: [
      {
        text: `"4Unik unlocked our recognition program. In three months engagement rose about 40% and turnover started to drop in a noticeable way."`,
        author: "Marina Costa",
        role: "Head of HR",
        company: "Tech company (500+ employees)",
        avatar: "MC",
      },
      {
        text: `"API integration was straightforward. In under a week we were live with our HRIS—and per-user pricing made it easy to explain cost to finance."`,
        author: "Rafael Santos",
        role: "CTO",
        company: "Fintech (200+ employees)",
        avatar: "RS",
      },
      {
        text: `"Personalized welcome kits changed how day one feels. Every new hire sees that the company actually cared."`,
        author: "Ana Pereira",
        role: "People Ops",
        company: "E-commerce (1,000+ employees)",
        avatar: "AP",
      },
    ],
  },
  pricing: {
    badge: "Plans & pricing",
    titleBefore: "Pick the right plan for your",
    titleGradient: "company",
    sub: "No setup fee. No surprises. Scale as you grow.",
    popular: "Most popular",
    starter: {
      name: "Starter",
      blurb: "Up to 100 employees",
      price: "990",
      period: "/month",
      bullets: [
        "Up to 100 employees",
        "Full gamification (points, badges, missions)",
        "Analytics dashboard (eNPS, ROI, redemption)",
        "Catalog with 5,000+ products",
        "Shipping across Brazil plus global options when you need them",
        "Email support",
      ],
      cta: "Get started",
    },
    pro: {
      name: "Pro",
      blurb: "Up to 500 employees with per-user API pricing & kits",
      price: "2,490",
      period: "/month",
      bullets: [
        "Up to 500 employees",
        "Gamification + leaderboards + OKRs",
        "API + real-time webhooks (pricing aligned to active users)",
        "SDK (Node.js & Python)",
        "Welcome kits & themed experiences",
        "Priority support",
      ],
      cta: "Choose Pro",
    },
    enterprise: {
      name: "Enterprise",
      blurb: "Unlimited seats, dedicated SLA, custom integrations, and worldwide delivery",
      priceLabel: "Custom",
      bullets: [
        "Unlimited employees",
        "Everything in Pro",
        "SSO (SAML) + privacy compliance",
        "Dedicated SLA",
        "Account manager",
        "Custom integrations and local production at destination for global programs",
      ],
      cta: "Talk to a specialist",
    },
    currency: "R$",
  },
  workvivoRedirect: {
    message: "Redirecting to API & integrations, where the Workvivo × 4Unik page now lives...",
  },
  enterpriseTrustStrip: {
    ariaLabel: "Why enterprises choose 4Unik",
    items: [
      {
        title: "Fits your stack",
        body:
          "APIs, webhooks, and docs to connect HRIS, SSO, and tools your teams already use—without endless projects.",
      },
      {
        title: "Security and governance",
        body:
          "Role-based controls, traceability, and practices aligned with enterprise privacy expectations.",
      },
      {
        title: "Automated or integrated logistics",
        body:
          "Use 4Unik’s automated fulfillment—or connect your merchandise suppliers and carriers by API. You choose how operations run.",
      },
      {
        title: "Global reach, local production",
        body:
          "We ship anywhere in the world. For teams outside Brazil, we manufacture locally at the destination—faster delivery, no import hassle, same quality.",
      },
    ],
  },
  investorBar: {
    ariaLabel: "Strategic investment and program backing",
    label: "Invested by",
    badgeAlt: "Google for Startups",
  },
} as const;
