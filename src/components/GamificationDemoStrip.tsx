"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";

/**
 * Faixa inspirada na UI de membro (demo): pontos, missões e progresso —
 * acento demo-cyan + hierarquia institucional (unik-blue).
 */
export default function GamificationDemoStrip() {
  const { m } = useLocaleMessages();
  const d = m.demoStrip;
  const items = [
    { label: d.points, value: "12.4k", accent: "text-demo-cyan" },
    { label: d.missions, value: "08", accent: "text-unik-blue-soft" },
    { label: d.level, value: d.levelValue, accent: "text-brand-orange" },
  ];

  return (
    <div className="mx-auto mb-12 flex max-w-2xl flex-wrap items-center justify-center gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex min-w-[140px] flex-1 items-center justify-between gap-4 rounded-2xl border border-demo-cyan/20 bg-surface-panel/80 px-4 py-3 shadow-[0_0_24px_-4px_rgba(34,211,238,0.15)] backdrop-blur-sm sm:min-w-[160px]"
        >
          <div className="text-left">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/45">{item.label}</p>
            <p className={`font-heading text-lg font-black ${item.accent}`}>{item.value}</p>
          </div>
          <div
            className="h-10 w-10 shrink-0 rounded-full border-2 border-demo-cyan/40 bg-gradient-to-br from-demo-cyan/20 to-unik-blue/30"
            aria-hidden
          />
        </div>
      ))}
    </div>
  );
}
