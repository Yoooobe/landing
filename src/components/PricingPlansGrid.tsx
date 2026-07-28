"use client";

import TrackedOutboundLink from "@/components/analytics/TrackedOutboundLink";
import { DEFAULT_CALENDLY_URL } from "@/lib/calendly";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { motion } from "framer-motion";

type Props = {
  /** Inclui o plano Scale (preço sob consulta) — página dedicada `/pricing/`. */
  includeScale?: boolean;
};

const cardBase =
  "flex flex-col rounded-3xl border border-sky-border bg-white p-8 shadow-[0_4px_24px_rgba(22,40,58,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-accent-sky-border-hover hover:shadow-[0_12px_40px_rgba(22,40,58,0.12)]";

const checkIcon = "mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-check-mint-bg text-xs text-check-mint";

const secondaryCta =
  "mt-auto block w-full rounded-xl border border-ink-deep/15 bg-transparent py-4 text-center font-bold text-ink-deep transition-colors hover:bg-sky-mist font-sans";

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
        className={cardBase}
      >
        <h3 className="mb-2 font-heading text-2xl font-bold text-ink-deep">{p.starter.name}</h3>
        <p className="mb-6 font-sans text-sm text-ink-muted">{p.starter.blurb}</p>
        <div className="mb-6">
          <span className="text-2xl font-bold text-ink-muted">{p.currency}</span>
          <span className="text-5xl font-black tracking-tight text-ink-deep"> {p.starter.price}</span>
          <span className="text-sm text-ink-muted">{p.starter.period}</span>
        </div>
        <ul className="mb-8 flex-1 space-y-4 font-sans">
          {p.starter.bullets.map((line) => (
            <li key={line} className="flex items-center text-ink-deep/80">
              <span className={checkIcon}>✓</span>
              {line}
            </li>
          ))}
        </ul>
        <TrackedOutboundLink
          href={DEFAULT_CALENDLY_URL}
          source="pricing-plan-starter"
          target="_blank"
          rel="noopener noreferrer"
          className={secondaryCta}
        >
          {p.starter.cta}
        </TrackedOutboundLink>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="relative flex flex-col rounded-3xl border-2 border-brand-orange bg-white p-8 shadow-[0_8px_40px_rgba(249,143,22,0.18)] transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_16px_50px_rgba(249,143,22,0.24)] md:-translate-y-4"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
          {p.popular}
        </div>
        <h3 className="mb-2 font-heading text-2xl font-bold text-ink-deep">{p.pro.name}</h3>
        <p className="mb-6 font-sans text-sm text-ink-muted">{p.pro.blurb}</p>
        <div className="mb-6">
          <span className="text-2xl font-bold text-ink-muted">{p.currency}</span>
          <span className="text-5xl font-black tracking-tight text-ink-deep"> {p.pro.price}</span>
          <span className="text-sm text-ink-muted">{p.pro.period}</span>
        </div>
        <ul className="mb-8 flex-1 space-y-4 font-sans">
          {p.pro.bullets.map((line) => (
            <li key={line} className="flex items-center text-ink-deep/80">
              <span className={checkIcon}>✓</span>
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
          className={cardBase}
        >
          <h3 className="mb-2 font-heading text-2xl font-bold text-ink-deep">{scale.name}</h3>
          <p className="mb-6 font-sans text-sm text-ink-muted">{scale.blurb}</p>
          <div className="mb-6">
            <span className="text-3xl font-black tracking-tight text-ink-deep">{scale.priceLabel}</span>
          </div>
          <ul className="mb-8 flex-1 space-y-4 font-sans">
            {scale.bullets.map((line) => (
              <li key={line} className="flex items-center text-ink-deep/80">
                <span className={checkIcon}>✓</span>
                {line}
              </li>
            ))}
          </ul>
          <TrackedOutboundLink
            href={DEFAULT_CALENDLY_URL}
            source="pricing-plan-scale"
            target="_blank"
            rel="noopener noreferrer"
            className={secondaryCta}
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
        className={cardBase}
      >
        <h3 className="mb-2 font-heading text-2xl font-bold text-ink-deep">{p.enterprise.name}</h3>
        <p className="mb-6 font-sans text-sm text-ink-muted">{p.enterprise.blurb}</p>
        <div className="mb-6">
          <span className="text-4xl font-black tracking-tight text-ink-deep">{p.enterprise.priceLabel}</span>
        </div>
        <ul className="mb-8 flex-1 space-y-4 font-sans">
          {p.enterprise.bullets.map((line) => (
            <li key={line} className="flex items-center text-ink-deep/80">
              <span className={checkIcon}>✓</span>
              {line}
            </li>
          ))}
        </ul>
        <TrackedOutboundLink
          href={DEFAULT_CALENDLY_URL}
          source="pricing-plan-enterprise"
          target="_blank"
          rel="noopener noreferrer"
          className={secondaryCta}
        >
          {p.enterprise.cta}
        </TrackedOutboundLink>
      </motion.div>
    </div>
  );
}
