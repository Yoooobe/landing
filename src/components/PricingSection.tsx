"use client";

import PricingPlansGrid from "@/components/PricingPlansGrid";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";

export default function PricingSection() {
  const { m } = useLocaleMessages();
  const p = m.pricing;

  return (
    <section id="planos" className="relative overflow-hidden border-t border-white/5 bg-brand-navy-dark py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/5 blur-[120px]"></div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="relative z-10 mb-16 text-center text-white">
          <div className="mb-4 inline-block rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-green-400">
            {p.badge}
          </div>
          <h2 className="mb-6 font-heading text-3xl font-black md:text-5xl">
            {p.titleBefore}{" "}
            <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              {p.titleGradient}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-white/50">{p.sub}</p>
        </div>

        <div className="relative z-10">
          <PricingPlansGrid />
        </div>
      </div>
    </section>
  );
}
