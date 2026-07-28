"use client";

import PricingPlansGrid from "@/components/PricingPlansGrid";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";

export default function PricingSection() {
  const { m } = useLocaleMessages();
  const p = m.pricing;

  return (
    <section id="planos" className="relative overflow-hidden bg-sky-mist py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-sky/10 blur-[120px]"></div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="relative z-10 mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-sky-border bg-white px-3 py-1 text-sm font-bold uppercase tracking-wide text-accent-sky shadow-sm">
            {p.badge}
          </span>
          <h2 className="mb-6 font-heading text-3xl font-black text-ink-deep md:text-5xl">
            {p.titleBefore} <span className="text-accent-sky">{p.titleGradient}</span>
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-ink-muted">{p.sub}</p>
        </div>

        <div className="relative z-10">
          <PricingPlansGrid />
        </div>
      </div>
    </section>
  );
}
