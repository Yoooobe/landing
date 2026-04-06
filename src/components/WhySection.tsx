"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { motion } from "framer-motion";

const ICONS = ["🎯", "⚡", "📈"] as const;

export default function WhySection() {
  const { m } = useLocaleMessages();
  const w = m.why;

  return (
    <section id="plataforma" className="relative overflow-hidden bg-surface-page py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-unik-blue/10 blur-[100px]"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-demo-cyan/5 blur-[80px]"></div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="relative z-10 mb-16 text-center">
          <div className="mb-4 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-brand-orange">
            {w.badge}
          </div>
          <h2 className="mb-6 font-heading text-3xl font-black text-white md:text-5xl">
            {w.titleBefore}{" "}
            <span className="bg-gradient-to-r from-brand-orange to-unik-blue bg-clip-text text-transparent">{w.titleGradient}</span>
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-white/50">{w.sub}</p>
        </div>

        <div className="relative z-10 grid gap-8 md:grid-cols-3">
          {w.cards.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="rounded-3xl border border-white/5 bg-surface-elevated p-8 transition-transform duration-300 hover:-translate-y-2 hover:border-unik-blue/20"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-3xl shadow-inner">{ICONS[i]}</div>
              <h3 className="mb-4 font-heading text-2xl font-bold text-white">{item.title}</h3>
              <p className="font-sans leading-relaxed text-white/60">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
