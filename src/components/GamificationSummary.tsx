"use client";

import GamificationDemoStrip from "@/components/GamificationDemoStrip";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { motion } from "framer-motion";

const ICONS = ["🏅", "🎯", "🎖️", "🛒"] as const;

export default function GamificationSummary() {
  const { m } = useLocaleMessages();
  const g = m.gamificationSummary;

  return (
    <section id="gamificacao" className="section-gradient-bg relative border-t border-white/5 py-24">
      <div className="container relative z-10 mx-auto max-w-6xl px-4 text-white">
        <div className="relative z-10 mb-16 text-center">
          <div className="mb-4 inline-block rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-yoobe-purple">
            {g.badge}
          </div>
          <h2 className="mb-6 font-heading text-3xl font-black md:text-5xl">
            {g.titleBefore} <span className="text-gradient">{g.titleGradient}</span>
            {g.titleAfter}
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-white/50">{g.sub}</p>
        </div>

        <GamificationDemoStrip />

        <div className="relative z-10 mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {g.cards.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-3xl border border-white/10 bg-surface-elevated/80 p-6 backdrop-blur-sm transition-transform hover:-translate-y-2 hover:border-unik-blue/25"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl">{ICONS[i]}</div>
              <h3 className="mb-2 font-heading text-lg font-bold text-white">{item.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-white/60">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
