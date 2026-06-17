"use client";

import TrackedOutboundLink from "@/components/analytics/TrackedOutboundLink";
import MarketingFaqSection from "@/components/MarketingFaqSection";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { ListChecks, Lock, ShieldCheck } from "lucide-react";

const ICONS = {
  shield: ShieldCheck,
  lock: Lock,
  list: ListChecks,
} as const;

export default function SegurancaLandingPage() {
  const { m, locale } = useLocaleMessages();
  const page = m.segurancaPage;
  const faqTitle = locale === "en" ? "Frequently asked questions" : "Perguntas frequentes";

  return (
    <div className="min-h-screen bg-brand-navy-dark text-white">
      <section className="relative overflow-hidden border-b border-white/5 bg-surface-base py-24 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.15),transparent_50%)]" />
        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-semibold text-white/70">
            {page.hero.badge}
          </div>
          <h1 className="mb-6 font-heading text-4xl font-black leading-tight md:text-5xl">{page.hero.title}</h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/65">{page.hero.sub}</p>
        </div>
      </section>

      <section className="border-b border-white/5 bg-surface-deep py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-wider text-brand-orange/90">
              {page.pillars.badge}
            </span>
            <h2 className="font-heading text-3xl font-black text-white md:text-4xl">{page.pillars.title}</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {page.pillars.items.map((item) => {
              const Icon = ICONS[item.icon as keyof typeof ICONS] ?? ShieldCheck;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-surface-panel p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-brand-orange">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="mb-3 font-heading text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <MarketingFaqSection
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
            source="seguranca-page-demo"
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
