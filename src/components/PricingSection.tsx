"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { motion } from "framer-motion";

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
            {p.titleBefore} <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">{p.titleGradient}</span>
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-white/50">{p.sub}</p>
        </div>

        <div className="relative z-10 grid gap-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col rounded-3xl border border-white/10 bg-[#141b2d] p-8"
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
            <a
              href="https://calendly.com/yoobeco/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto block w-full rounded-xl border border-white/20 bg-transparent py-4 text-center font-bold text-white transition-colors hover:bg-white/5 font-sans"
            >
              {p.starter.cta}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative flex flex-col rounded-3xl border border-brand-orange bg-gradient-to-b from-[#1a233a] to-[#141b2d] p-8 shadow-[0_0_40px_rgba(249,115,22,0.15)] md:-translate-y-4"
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
            <a
              href="https://calendly.com/yoobeco/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto block w-full rounded-xl bg-brand-orange py-4 text-center font-bold text-white transition-colors hover:bg-brand-orange-dark font-sans"
            >
              {p.pro.cta}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col rounded-3xl border border-white/10 bg-[#141b2d] p-8"
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
            <a
              href="https://calendly.com/yoobeco/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto block w-full rounded-xl border border-white/20 bg-transparent py-4 text-center font-bold text-white transition-colors hover:bg-white/5 font-sans"
            >
              {p.enterprise.cta}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
