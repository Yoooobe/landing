export const enEducacaoPage = {
  seo: {
    title: "For education & e-learning | 4Unik — rewards on completion",
    description:
      "Fight course drop-off with a real reward on completion: the learner finishes the path and gets a physical prize at home. 4Unik handles the catalog and delivery.",
    openGraphDescription:
      "Tangible reward on course completion, with 4Unik's catalog and logistics.",
  },
  hero: {
    badge: "For education & e-learning",
    title: "A real reward when the learner finishes",
    sub:
      "Turn course completion into something they can see and feel. When the learner finishes the path, 4Unik delivers a physical prize—you focus on content, we handle logistics.",
    ctaLabel: "Talk to a specialist",
    ctaHref: "https://calendly.com/yoobeco/demo",
  },
  problem: {
    badge: "The pain",
    title: "Many start, few finish",
    items: [
      {
        title: "High drop-off",
        desc: "Many learners start and few finish—engagement drops mid-journey.",
        icon: "activity",
      },
      {
        title: "A certificate isn't enough",
        desc: "Digital-only recognition doesn't always motivate completion.",
        icon: "award",
      },
      {
        title: "No arm for logistics",
        desc: "Shipping physical prizes by hand doesn't scale to your learner base.",
        icon: "package",
      },
    ],
  },
  how: {
    badge: "How it works",
    title: "Completion that becomes a reward",
    sub: "Set the milestone, the learner picks the prize, and 4Unik delivers.",
    columns: "3" as const,
    items: [
      {
        title: "Set the trigger",
        desc: "Pick the milestone (100% of the course, a module, or a certification) that unlocks the reward.",
        icon: "target",
      },
      {
        title: "Learner picks the prize",
        desc: "A catalog with thousands of items; the learner redeems what they want.",
        icon: "store",
      },
      {
        title: "Tracked delivery",
        desc: "4Unik ships and tracks delivery all the way to the learner's home.",
        icon: "globe-2",
      },
    ],
  },
  benefits: {
    badge: "Why 4Unik",
    title: "More completion, less operations",
    items: [
      {
        title: "More completions",
        desc: "A tangible reward gives a concrete reason to finish the path.",
        icon: "award",
      },
      {
        title: "Integrates with your LMS",
        desc: "Connect via API to unlock prizes automatically on completion.",
        icon: "link-2",
      },
      {
        title: "Logistics on us",
        desc: "You don't pack or ship anything—4Unik handles it.",
        icon: "package",
      },
    ],
  },
  caseStudy: {
    badge: "Success story",
    company: "Grupo Boticário",
    title: "Gamification that unlocked corporate training",
    body:
      "At its Data Center of Excellence, Grupo Boticário turned course completion into points redeemable in an internal store, with branded physical prizes and automated 4Unik logistics. The result: higher adoption of technical training and measurable ROI in corporate education.",
    logoSrc: "/clients/boticario.webp",
    logoAlt: "Grupo Boticário logo",
    metrics: [
      { value: "+308%", label: "Course opens and completions" },
      { value: "11k+", label: "Physical prizes shipped" },
      { value: "R$ 63k", label: "Campaigns with proven ROI" },
      { value: "6", label: "New teams adopted the model" },
    ],
    screenshots: [
      {
        src: "/screens/gamif-regras.webp",
        alt: "Course-completion scoring rules in the 4Unik platform",
        caption: "Completion-based scoring rules, configurable per team.",
      },
      {
        src: "/screens/admin-campaign-config-desktop.webp",
        alt: "Training campaign setup with real-time preview",
        caption: "Training campaign with a prize catalog and real-time preview.",
      },
    ],
  },
  faq: {
    items: [
      {
        q: "Does it work for any course?",
        a: "Yes—internal courses, partner training, or paid online courses. You define the milestone that unlocks the reward.",
      },
      {
        q: "How does it connect to my LMS or platform?",
        a: "Via API: when completion is recorded, 4Unik unlocks the points or prize redemption.",
      },
      {
        q: "Who handles delivery?",
        a: "4Unik—catalog, inventory, shipping, and tracking. The learner receives it at home.",
      },
      {
        q: "Can I reward steps, not just the end?",
        a: "Yes. You can reward modules, streaks, or interim goals to keep the pace.",
      },
    ],
  },
  cta: {
    eyebrow: "Next step",
    title: "Want to raise your course completion?",
    body:
      "Tell us about your learning operation and learner base. We'll design the completion-reward flow with you.",
    primaryLabel: "Talk to a specialist",
    primaryHref: "https://calendly.com/yoobeco/demo",
  },
} as const;
