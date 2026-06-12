export const enParaPlataformasPage = {
  seo: {
    title: "For platforms & SaaS | 4Unik — physical rewards via API",
    description:
      "Offer physical rewards inside your own product: catalog, checkout, and delivery via API. 4Unik is the execution layer—you own the experience, we handle inventory, shipping, and tracking.",
    openGraphDescription:
      "Embedded physical-rewards API: catalog, checkout in your app, fulfillment, and tracking via webhook.",
  },
  hero: {
    badge: "For platforms & SaaS",
    title: "Physical rewards as an API call",
    definitionLead:
      "4Unik is the layer that delivers physical rewards inside your product: you keep the experience; we handle catalog, inventory, and shipping.",
    sub:
      "Your platform shows the catalog and checkout inside your own app. 4Unik handles inventory, shipping, and tracking. You program the behavior; physical delivery is on us.",
    ctaLabel: "See API & integrations",
    ctaHref: "/en/api-integracoes/",
  },
  problem: {
    badge: "The pain",
    title: "Reward logistics isn't your core",
    items: [
      {
        title: "Operations outside your core",
        desc: "Managing suppliers, inventory, and shipping pulls focus away from your product.",
        icon: "package",
      },
      {
        title: "Building from scratch is costly",
        desc: "An in-house store, catalog, and logistics take months and slow your roadmap.",
        icon: "puzzle",
      },
      {
        title: "Catalog and delivery are work",
        desc: "Keeping items, lead times, and tracking up to date becomes recurring support.",
        icon: "refresh-cw",
      },
    ],
  },
  how: {
    badge: "How it works",
    title: "Embedded integration in a few steps",
    sub: "A REST API with SDKs and a sandbox so your team can connect without friction.",
    columns: "4" as const,
    items: [
      {
        eyebrow: "01",
        title: "Onboarding + inventory",
        desc: "Get started fast and pick products from the 4Unik catalog.",
        icon: "rocket",
      },
      {
        eyebrow: "02",
        title: "REST API + SDK + sandbox",
        desc: "Connect with Node.js and Python SDKs and test in the sandbox before going live.",
        icon: "code-2",
      },
      {
        eyebrow: "03",
        title: "Catalog & checkout in your app",
        desc: "Product and inventory APIs show items; the checkout API handles redemption without the user leaving your product.",
        icon: "store",
      },
      {
        eyebrow: "04",
        title: "Delivery + tracking via webhook",
        desc: "4Unik ships and returns real-time tracking through webhooks.",
        icon: "globe-2",
      },
    ],
  },
  benefits: {
    badge: "Why 4Unik",
    title: "Back-end operations",
    items: [
      {
        title: "Catalog ready to go",
        desc: "A wide catalog of physical products available for redemption, with no inventory to run.",
        icon: "boxes",
      },
      {
        title: "Experience in your product",
        desc: "Users redeem inside your app; the brand and journey stay yours.",
        icon: "smartphone",
      },
      {
        title: "Operations on us",
        desc: "Inventory, nationwide shipping, and tracking stay with 4Unik.",
        icon: "package",
      },
    ],
  },
  faq: {
    items: [
      {
        q: "What is reward infrastructure for SaaS platforms?",
        a: "It is the execution layer that delivers physical rewards inside your product via API: catalog, embedded checkout, inventory, and shipping stay with 4Unik. You keep the experience and engagement; we run logistics. Full definition at /en/reward-infrastructure/.",
      },
      {
        q: "Does 4Unik compete with my platform?",
        a: "No. We are a fulfillment partner: you own the experience and product; we handle catalog, inventory, shipping, and tracking. See the full definition at /en/reward-infrastructure/.",
      },
      {
        q: "What does the technical integration look like?",
        a: "A REST API with Node.js and Python SDKs and a testing sandbox. You use product, inventory, and checkout endpoints, and receive tracking updates via webhooks.",
      },
      {
        q: "Does the user leave my app to redeem?",
        a: "No. Checkout happens inside your product; 4Unik handles delivery behind the scenes.",
      },
      {
        q: "How long does integration take?",
        a: "It depends on scope, but the goal is a fast integration with SDKs and a sandbox. Talk to engineering for a plan tailored to your case.",
      },
    ],
  },
  cta: {
    eyebrow: "Next step",
    title: "Ready to plug rewards into your product?",
    body:
      "Tell us about your platform and use case. We'll walk through the API, the checkout flow, and the integration model.",
    primaryLabel: "Talk to engineering",
    primaryHref: "https://calendly.com/4unik/30min",
    secondaryLabel: "See API & integrations",
    secondaryHref: "/en/api-integracoes/",
  },
} as const;
