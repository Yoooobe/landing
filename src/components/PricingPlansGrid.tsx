"use client";

import TrackedOutboundLink from "@/components/analytics/TrackedOutboundLink";
import { DEFAULT_CALENDLY_URL } from "@/lib/calendly";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { motion } from "framer-motion";

type Props = {
  /** Inclui o plano Scale (preço sob consulta) — página dedicada `/pricing/`. */
  includeScale?: boolean;
};

export default function PricingPlansGrid({ includeScale = false }: Props) {
  const { m } = useLocaleMessages();
  const p = m.pricing;
  const scale = m.pricingPage?.scale;

  const gridClass = includeScale
    ? "grid gap-8 md:grid-cols-2 xl:grid-cols-4"
    : "grid gap-8 md:grid-cols-3";

  return (
    <div className={gridClass}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col rounded-3xl border border-white/10 bg-surface-elevated p-8"
      >
        <h3 className="mb-2 font-heading text-2xl font-bold text-white">{p.starter.name}</h3>
        <p className="mb-6 font-sans text-sm text-white/50">{p.starter.blurb}</p>
        <div className="mb-6">
          <span className="text-2xl font-bold text-white/70">{p.currency}</span>
          <span className="text-5xl font-black tracking-tight text-white"> {p.starter.price}</span>
          <span className="text-sm text-white/50">{p.starter.period}</span>
        </div>
        <ul className="mb-8 flex-1 space-y-4 font-sans">
          {p.starter.bullets.map((line) => (
            <li key={line} className="flex items-center text-white/80">
              <span className="mr-3 text-green-400">✓</span>
              {line}
            </li>
          ))}
        </ul>
        <TrackedOutboundLink
          href={DEFAULT_CALENDLY_URL}
          source="pricing-plan-starter"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto block w-full rounded-xl border border-white/20 bg-transparent py-4 text-center font-bold text-white transition-colors hover:bg-white/5 font-sans"
        >
          {p.starter.cta}
        </TrackedOutboundLink>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="relative flex flex-col rounded-3xl border border-brand-orange bg-linear-to-b from-surface-tier-from to-surface-elevated p-8 shadow-[0_0_40px_rgba(249,115,22,0.15)] md:-translate-y-4"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
          {p.popular}
        </div>
        <h3 className="mb-2 font-heading text-2xl font-bold text-white">{p.pro.name}</h3>
        <p className="mb-6 font-sans text-sm text-white/50">{p.pro.blurb}</p>
        <div className="mb-6">
          <span className="text-2xl font-bold text-white/70">{p.currency}</span>
          <span className="text-5xl font-black tracking-tight text-white"> {p.pro.price}</span>
          <span className="text-sm text-white/50">{p.pro.period}</span>
        </div>
        <ul className="mb-8 flex-1 space-y-4 font-sans">
          {p.pro.bullets.map((line) => (
            <li key={line} className="flex items-center text-white/80">
              <span className="mr-3 text-brand-orange">✓</span>
              {line}
            </li>
          ))}
        </ul>
        <TrackedOutboundLink
          href={DEFAULT_CALENDLY_URL}
          source="pricing-plan-pro"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto block w-full rounded-xl bg-brand-orange py-4 text-center font-bold text-white transition-colors hover:bg-brand-orange-dark font-sans"
        >
          {p.pro.cta}
        </TrackedOutboundLink>
      </motion.div>

      {includeScale && scale ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-col rounded-3xl border border-white/10 bg-surface-elevated p-8"
        >
          <h3 className="mb-2 font-heading text-2xl font-bold text-white">{scale.name}</h3>
          <p className="mb-6 font-sans text-sm text-white/50">{scale.blurb}</p>
          <div className="mb-6">
            <span className="text-3xl font-black tracking-tight text-white">{scale.priceLabel}</span>
          </div>
          <ul className="mb-8 flex-1 space-y-4 font-sans">
            {scale.bullets.map((line) => (
              <li key={line} className="flex items-center text-white/80">
                <span className="mr-3 text-green-400">✓</span>
                {line}
              </li>
            ))}
          </ul>
          <TrackedOutboundLink
            href={DEFAULT_CALENDLY_URL}
            source="pricing-plan-scale"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto block w-full rounded-xl border border-white/20 bg-transparent py-4 text-center font-bold text-white transition-colors hover:bg-white/5 font-sans"
          >
            {scale.cta}
          </TrackedOutboundLink>
        </motion.div>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: includeScale ? 0.2 : 0.2 }}
        className="flex flex-col rounded-3xl border border-white/10 bg-surface-elevated p-8"
      >
        <h3 className="mb-2 font-heading text-2xl font-bold text-white">{p.enterprise.name}</h3>
        <p className="mb-6 font-sans text-sm text-white/50">{p.enterprise.blurb}</p>
        <div className="mb-6">
          <span className="text-4xl font-black tracking-tight text-white">{p.enterprise.priceLabel}</span>
        </div>
        <ul className="mb-8 flex-1 space-y-4 font-sans">
          {p.enterprise.bullets.map((line) => (
            <li key={line} className="flex items-center text-white/80">
              <span className="mr-3 text-green-400">✓</span>
              {line}
            </li>
          ))}
        </ul>
        <TrackedOutboundLink
          href={DEFAULT_CALENDLY_URL}
          source="pricing-plan-enterprise"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto block w-full rounded-xl border border-white/20 bg-transparent py-4 text-center font-bold text-white transition-colors hover:bg-white/5 font-sans"
        >
          {p.enterprise.cta}
        </TrackedOutboundLink>
      </motion.div>
    </div>
  );
}
