export const enRewardInfrastructurePage = {
  seo: {
    title: "Reward infrastructure for employee engagement | 4Unik",
    description:
      "What is reward infrastructure: an API-first layer for catalog, checkout, and fulfillment in corporate engagement and gamification programs—without running logistics in-house.",
    openGraphDescription:
      "Stable definition of reward infrastructure: API, catalog, and delivery integrated with engagement platforms.",
  },
  hero: {
    badge: "Reward Infrastructure",
    titleBefore: "What is",
    titleGradient: "reward infrastructure",
    sub:
      "An API-first layer that connects engagement programs to a corporate catalog, checkout, and fulfillment—for HR, SaaS platforms, and teams that need to ship real rewards without becoming a logistics operation.",
    definition:
      "Reward infrastructure is the technical and operational layer that lets recognition, gamification, and incentive programs redeem physical or digital rewards—with catalog, inventory, checkout, and delivery integrated via API or a managed platform.",
  },
  notThis: {
    badge: "Positioning",
    title: "Not a swag shop or standalone storefront",
    body:
      "Swag vendors sell products; engagement platforms need a layer that turns points, goals, and recognition into trackable deliveries. 4Unik operates in that layer: it connects to your HRIS, intranet, or SaaS product and runs catalog, inventory, and logistics—or plugs into suppliers you already use.",
    bullets: [
      "Does not replace your HRIS, ERP, or internal comms platform",
      "Not a B2C marketplace—B2B infrastructure for corporate programs",
      "Does not require HR to become procurement and shipping",
    ],
  },
  components: {
    badge: "Components",
    title: "What the stack includes",
    items: [
      {
        title: "API and webhooks",
        desc: "REST endpoints for catalog, inventory, checkout, and tracking—embedded in your product or HR stack.",
        icon: "link-2",
      },
      {
        title: "Corporate catalog",
        desc: "Thousands of physical items and kits ready for redemption with points, budgets, or manager-to-peer recognition.",
        icon: "store",
      },
      {
        title: "Fulfillment",
        desc: "Order operations, inventory, shipping, and tracking—in Brazil and internationally, with local production when it speeds delivery.",
        icon: "package",
      },
      {
        title: "Engagement engine (optional)",
        desc: "Campaigns, gamification, and a redemption store on the 4unik V3 platform when you want to run the program, not only delivery.",
        icon: "target",
      },
    ],
  },
  audiences: {
    badge: "Who it's for",
    title: "Who uses reward infrastructure",
    items: [
      {
        title: "HR and People teams",
        desc: "Recognition programs, welcome kits, and culture campaigns with automated delivery.",
        href: "/en/plataforma/",
      },
      {
        title: "SaaS platforms",
        desc: "Physical rewards embedded via API inside your engagement or incentive product.",
        href: "/en/para-plataformas/",
      },
      {
        title: "Education and sales",
        desc: "Learning paths and commercial goals tied to prizes without operational friction.",
        href: "/en/educacao/",
      },
      {
        title: "Events and communities",
        desc: "Giveaways, swag, and VIP stores with inventory and shipping managed by the platform.",
        href: "/en/eventos/",
      },
    ],
  },
  related: {
    title: "Go deeper in the 4Unik ecosystem",
    links: [
      { label: "API & integrations", href: "/en/api-integracoes/" },
      { label: "Platform overview", href: "/en/plataforma/" },
      { label: "Use cases", href: "/en/casos-de-uso/" },
      { label: "For platforms & SaaS", href: "/en/para-plataformas/" },
    ],
  },
  cta: {
    title: "See the stack live",
    sub: "30-minute demo: catalog, redemption flow, API, and logistics mapped to your use case.",
    button: "Book a demo",
  },
  faq: {
    badge: "FAQ",
    titleBefore: "Questions about",
    titleGradient: "reward infrastructure",
    titleAfter: "",
    items: [
      {
        q: "What is reward infrastructure?",
        a: "Reward infrastructure is the API-first layer that connects employee engagement and corporate gamification programs to catalog, checkout, and fulfillment. Instead of every company building a store, inventory, and logistics, you integrate a provider like 4Unik that operates that layer.",
      },
      {
        q: "How is reward infrastructure different from a swag vendor?",
        a: "A swag vendor sells standalone products. Reward infrastructure turns points, goals, and recognition into trackable deliveries inside the program flow—with API, webhooks, governance, and integration into the corporate stack.",
      },
      {
        q: "Is 4Unik API-only or also a platform?",
        a: "Both. Platforms and engineering teams can consume API and fulfillment only; HR and operations can use the 4unik V3 platform with a gamification engine, redemption store, and dashboards—the same infrastructure underneath.",
      },
      {
        q: "Who needs reward infrastructure?",
        a: "Large enterprises with recognition programs, engagement platforms that want embedded physical rewards, sales or education teams with goal-based incentives, and event or community operators that need catalog and shipping without manual ops.",
      },
      {
        q: "How should I choose a reward infrastructure provider?",
        a: "Evaluate integration (API, SSO, webhooks), catalog and fulfillment coverage, governance for large populations, and whether the model fits embedded (SaaS) or managed (HR) use. See real stories at /en/casos-de-uso/ and technical details at /en/api-integracoes/.",
      },
    ],
  },
} as const;
