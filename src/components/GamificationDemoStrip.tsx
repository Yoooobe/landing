"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Faixa inspirada na UI de membro (demo): pontos, missões e progresso —
 * acento demo-cyan + hierarquia institucional (unik-blue).
 */
export default function GamificationDemoStrip() {
  const { m } = useLocaleMessages();
  const d = m.demoStrip;
  const reduceMotion = useReducedMotion();
  const items = [
    { label: d.points, value: "12.4k", accent: "text-demo-cyan", progress: 78 },
    { label: d.missions, value: "08", accent: "text-unik-blue-soft", progress: 62 },
    { label: d.level, value: d.levelValue, accent: "text-brand-orange", progress: 91 },
  ];

  return (
    <div className="mx-auto mb-12 flex max-w-2xl flex-wrap items-center justify-center gap-3">
      {items.map((item, i) => (
        <div
          key={item.label}
          className="flex min-w-[140px] flex-1 items-center justify-between gap-4 rounded-2xl border border-demo-cyan/20 bg-surface-panel/80 px-4 py-3 shadow-[0_0_24px_-4px_rgba(34,211,238,0.15)] backdrop-blur-sm sm:min-w-[160px]"
        >
          <div className="text-left">
            <p className="text-[10px] font-semibold tracking-wider text-white/55 uppercase">{item.label}</p>
            <p className={`font-heading text-lg font-black ${item.accent}`}>{item.value}</p>
            <div className="mt-2 h-1 w-16 overflow-hidden rounded-full bg-white/10" aria-hidden>
              <motion.div
                className="h-full rounded-full bg-demo-cyan"
                initial={{ width: reduceMotion ? `${item.progress}%` : 0 }}
                whileInView={{ width: `${item.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : i * 0.1 }}
              />
            </div>
          </div>
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-demo-cyan/40 bg-linear-to-br from-demo-cyan/20 to-unik-blue/30 text-[10px] font-bold text-demo-cyan"
            aria-hidden
          >
            {item.progress}%
          </div>
        </div>
      ))}
    </div>
  );
}
