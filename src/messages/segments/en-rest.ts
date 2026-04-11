export const enRest = {
  apiSection: {
    badge: "For your engineering team",
    titleBefore: "Connect",
    titleBrand: "4Unik",
    titleAfter: "to the tools your team already uses",
    sub:
      "Secure, low-friction integrations for the tools your team already uses, including Slack, Teams, HR systems, and corporate intranets.",
    bullets: [
      "Real-time reward automation",
      "Unified login with your company’s security",
      "Modern developer documentation",
      "Automatic sync with your HR software",
      "Safe sandbox environment",
    ],
    ctaDocs: "Docs & API for developers",
    ctaApi: "Request API access",
    codeComment: "// Create reward via API",
    codeReason: "Q1 goal achieved",
  },
  storeSection: {
    badge: "Corporate store & kits",
    titleBefore: "Thousands of",
    titleGradient: "options",
    titleAfter: "for every moment",
    sub: "5,000+ products, 100+ categories. Build custom kits or let employees choose.",
    usecases: [
      {
        title: "Welcome kits",
        desc: "Make day one memorable with kits tailored to your brand.",
      },
      {
        title: "Recognition",
        desc: "Celebrate career milestones, goals hit, and birthdays with meaningful gifts.",
      },
      {
        title: "Clients & partners",
        desc: "Strengthen relationships with premium brand experiences for external stakeholders.",
      },
      {
        title: "Events & trade shows",
        desc: "Stand out with creative swag and themed kits that stick in people’s minds.",
      },
    ],
    ctaCatalog: "Open catalog",
    ctaKit: "Build a custom kit",
  },
  managementSection: {
    badge: "Management platform",
    titleBefore: "From order to",
    titleGradient: "delivery",
    titleAfter: ", everything under control",
    sub: "Full dashboard to manage rewards, track shipments, and report in real time.",
    features: [
      {
        title: "Analytics dashboard",
        desc: "Engagement, eNPS, redemption rate, and program ROI in real time.",
      },
      {
        title: "Integrated logistics",
        desc: "Shipment tracking, inventory management, and delivery across Brazil in as little as 48 hours.",
      },
      {
        title: "People management",
        desc: "Bulk import, segmentation by area/site, and per-person balance control.",
      },
      {
        title: "Security & compliance",
        desc: "Privacy-ready, SSO, audit logs, and granular role permissions.",
      },
    ],
  },
  clients: {
    badge: "Who trusts 4Unik",
    titleBefore: "Companies that have already",
    titleGradient: "transformed",
    titleAfter: "their people programs",
    sub: "From startups to large enterprises, we help HR teams run recognition programs that work.",
  },
  testimonials: {
    badge: "Testimonials",
    titleBefore: "What our customers",
    titleGradient: "say",
    items: [
      {
        text: `"4Unik transformed our recognition program. In 3 months we saw a 40% lift in engagement and a meaningful drop in turnover."`,
        author: "Marina Costa",
        role: "Head of HR",
        company: "Tech company (500+ employees)",
        avatar: "MC",
      },
      {
        text: `"API integration was surprisingly simple. In under a week we had the platform running with our HRIS."`,
        author: "Rafael Santos",
        role: "CTO",
        company: "Fintech (200+ employees)",
        avatar: "RS",
      },
      {
        text: `"Personalized welcome kits took our employer brand to another level. Every new hire feels special from day one."`,
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
        "Shipping across Brazil",
        "Email support",
      ],
      cta: "Get started",
    },
    pro: {
      name: "Pro",
      blurb: "Up to 500 employees with API & kits",
      price: "2,490",
      period: "/month",
      bullets: [
        "Up to 500 employees",
        "Gamification + leaderboards + OKRs",
        "API + real-time webhooks",
        "SDK (Node.js & Python)",
        "Welcome kits & themed experiences",
        "Priority support",
      ],
      cta: "Choose Pro",
    },
    enterprise: {
      name: "Enterprise",
      blurb: "Unlimited seats, dedicated SLA, custom integrations",
      priceLabel: "Custom",
      bullets: [
        "Unlimited employees",
        "Everything in Pro",
        "SSO (SAML) + privacy compliance",
        "Dedicated SLA",
        "Account manager",
        "Custom integrations",
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
          "APIs, webhooks, and docs to connect HRIS, SSO, and tools your teams already use — without endless projects.",
      },
      {
        title: "Security and governance",
        body:
          "Role-based controls, traceability, and practices aligned with enterprise privacy expectations.",
      },
      {
        title: "Operational scale",
        body:
          "Catalog and fulfillment built for programs that grow across sites, countries, and thousands of employees.",
      },
    ],
  },
} as const;
