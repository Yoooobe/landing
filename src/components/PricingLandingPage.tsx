"use client";

import TrackedOutboundLink from "@/components/analytics/TrackedOutboundLink";
import MarketingFaqSection from "@/components/MarketingFaqSection";
import PricingPlansGrid from "@/components/PricingPlansGrid";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";

export default function PricingLandingPage() {
  const { m, locale } = useLocaleMessages();
  const page = m.pricingPage;
  const p = m.pricing;
  const faqTitle = locale === "en" ? "Frequently asked questions" : "Perguntas frequentes";

  return (
    <div className="min-h-screen bg-brand-navy-dark text-white">
      <section className="relative overflow-hidden border-b border-white/5 bg-surface-base py-24 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.12),transparent_45%)]" />
        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-block rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-green-400">
            {page.hero.badge}
          </div>
          <h1 className="mb-6 font-heading text-4xl font-black leading-tight md:text-5xl">{page.hero.title}</h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/65">{page.hero.sub}</p>
        </div>
      </section>

      <section id="planos" className="relative overflow-hidden border-b border-white/5 py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/5 blur-[120px]" />
        <div className="container relative z-10 mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-2xl font-black text-white md:text-3xl">
              {p.titleBefore}{" "}
              <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                {p.titleGradient}
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/50">{p.sub}</p>
          </div>
          <PricingPlansGrid includeScale />
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

      <section className="border-t border-white/5 bg-surface-base py-20">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-heading text-3xl font-black text-white">{page.cta.title}</h2>
          <p className="mb-8 text-lg text-white/65">{page.cta.body}</p>
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
