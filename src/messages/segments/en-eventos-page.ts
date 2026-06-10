export const enEventosPage = {
  seo: {
    title: "For events | 4Unik — giveaways without the logistics chaos",
    description:
      "End the chaos of event giveaways. Attendees earn points and check out from their phone: pick up at the booth or get it shipped home, tracked.",
    openGraphDescription:
      "Event giveaways without logistics chaos: phone checkout, booth pickup, or tracked delivery.",
  },
  hero: {
    badge: "For physical & hybrid events",
    title: "Giveaways without the logistics chaos",
    definitionLead:
      "At in-person or hybrid events, attendees pick giveaways on their phone—booth pickup or home delivery, tracked.",
    sub:
      "Transporting, storing, and handing out giveaways on-site is a headache. With 4Unik, attendees earn points and check out from their phone: pick up at the booth or get it shipped home, tracked.",
    ctaLabel: "Book a demo",
    ctaHref: "https://calendly.com/4unik/30min",
  },
  problem: {
    badge: "The pain",
    title: "Event giveaways become complex logistics",
    items: [
      {
        title: "On-site logistics",
        desc: "Transporting and storing giveaways at the event is costly and risky.",
        icon: "package",
      },
      {
        title: "Messy handout",
        desc: "Queues and manual control ruin the experience.",
        icon: "refresh-cw",
      },
      {
        title: "Too much or too little",
        desc: "Estimating quantities without data creates waste.",
        icon: "bar-chart-3",
      },
    ],
  },
  how: {
    badge: "How it works",
    title: "From a point at the event to a gift",
    sub: "Points on-site, checkout on the phone, and flexible delivery.",
    columns: "3" as const,
    items: [
      {
        title: "Attendees earn points",
        desc: "On-site actions (check-in, missions, booth) turn into points.",
        icon: "target",
      },
      {
        title: "Checkout from the phone",
        desc: "Everyone picks their giveaway on their own phone, no queue.",
        icon: "smartphone",
      },
      {
        title: "Pick up or ship home",
        desc: "Booth pickup or tracked delivery after the event.",
        icon: "globe-2",
      },
    ],
  },
  benefits: {
    badge: "Why 4Unik",
    title: "A smooth experience, no mountain of boxes",
    items: [
      {
        title: "Less on-site logistics",
        desc: "No mountain of boxes to manage on the day.",
        icon: "package",
      },
      {
        title: "Smooth experience",
        desc: "Self-service checkout on the phone, no queue.",
        icon: "smartphone",
      },
      {
        title: "Engagement data",
        desc: "See who took part and what they redeemed.",
        icon: "bar-chart-3",
      },
    ],
  },
  faq: {
    items: [
      {
        q: "How do digital giveaways work at in-person events?",
        a: "Attendees earn points for on-site actions (check-in, missions, booth) and check out from their phone to pick a giveaway. They can collect at the booth or get it shipped home with tracking—no queues or mountains of boxes to manage.",
      },
      {
        q: "Does it work for hybrid events?",
        a: "Yes. In-person, online, or hybrid—points and checkout work from the phone.",
      },
      {
        q: "Can I deliver at the booth and at home?",
        a: "Yes. The attendee chooses to pick up on-site or get it shipped home, tracked.",
      },
      {
        q: "Do I need to bring inventory?",
        a: "You decide. You can have items at the booth and/or use the catalog with later delivery.",
      },
      {
        q: "How do I control the budget?",
        a: "Through points and rules you define, with a view of redemptions in the dashboard.",
      },
    ],
  },
  cta: {
    eyebrow: "Next step",
    title: "Want giveaways without the headache at your next event?",
    body:
      "Tell us about the event, audience, and format. We'll design the points and checkout flow with you.",
    primaryLabel: "Book a demo",
    primaryHref: "https://calendly.com/4unik/30min",
  },
} as const;
