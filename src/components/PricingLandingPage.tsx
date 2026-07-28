"use client";

import TrackedOutboundLink from "@/components/analytics/TrackedOutboundLink";
import MarketingFaqSection from "@/components/MarketingFaqSection";
import PricingPlansGlassGrid from "@/components/PricingPlansGlassGrid";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import type { ResolvedPricingPlansContent } from "@/sanity/lib/pricingPlans";

type Props = {
  content: ResolvedPricingPlansContent;
};

export default function PricingLandingPage({ content }: Props) {
  const { m, locale } = useLocaleMessages();
  const page = m.pricingPage;
  const plansCopy = m.pricingPage.plans;
  const faqTitle = locale === "en" ? "Frequently asked questions" : "Perguntas frequentes";

  return (
    <div className="min-h-screen bg-sky-mist text-ink-deep">
      <section className="relative overflow-hidden border-b border-white/5 bg-brand-navy-dark py-24 text-white md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(62,143,216,0.16),transparent_45%)]" />
        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-block rounded-full border border-accent-sky/30 bg-accent-sky/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-accent-sky">
            {page.hero.badge}
          </div>
          <h1 className="mb-6 font-heading text-4xl font-black leading-tight md:text-5xl">{page.hero.title}</h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/65">{page.hero.sub}</p>
        </div>
      </section>

      <section id="planos" className="relative overflow-hidden border-b border-sky-border bg-sky-mist py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-sky/10 blur-[120px]" />
        <div className="container relative z-10 mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full border border-sky-border bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-sky shadow-sm">
              {plansCopy.sectionBadge}
            </span>
            <h2 className="font-heading text-2xl font-black text-ink-deep md:text-3xl">{plansCopy.sectionTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-ink-muted">{plansCopy.sectionSubtitle}</p>
          </div>
          <PricingPlansGlassGrid content={content} />
        </div>
      </section>

      <MarketingFaqSection
        tone="light"
        faq={{
          badge: "FAQ",
          titleBefore: faqTitle,
          titleGradient: "",
          titleAfter: "",
          items: page.faq.items.map((item) => ({ q: item.q, a: item.a })),
        }}
      />

      <section className="border-t border-sky-border bg-white py-20">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-heading text-3xl font-black text-ink-deep">{page.cta.title}</h2>
          <p className="mb-8 text-lg text-ink-muted">{page.cta.body}</p>
          <TrackedOutboundLink
            href={page.cta.primaryHref}
            source="pricing-page-demo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-orange px-8 font-bold text-white hover:bg-brand-orange/90"
          >
            {page.cta.primaryLabel}
          </TrackedOutboundLink>
        </div>
      </section>
    </div>
  );
}
