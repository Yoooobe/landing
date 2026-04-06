"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";

const CARD_BORDER = ["hover:border-red-500/30", "hover:border-amber-500/30", "hover:border-blue-500/30", "hover:border-yoobe-purple/30"] as const;
const STAT_COLOR = ["text-red-500", "text-amber-500", "text-blue-500", "text-yoobe-purple"] as const;

export default function GamificationProblem() {
  const { m } = useLocaleMessages();
  const p = m.gamificacao.problem;

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#0a0f18] py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-full bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.05)_0%,transparent_50%)]"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white/70">{p.badge}</span>
          <h2 className="mb-6 font-heading text-3xl font-black text-white md:text-5xl">
            {p.title} <span className="bg-gradient-to-r from-yoobe-purple to-fuchsia-600 bg-clip-text text-transparent">{p.titleGradient}</span> {p.titleAfter}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {p.cards.map((card, i) => (
            <div
              key={card.title}
              className={`rounded-2xl border border-white/10 bg-[#121824] p-8 transition-all hover:-translate-y-1 ${CARD_BORDER[i]}`}
            >
              <div className={`mb-4 font-black text-4xl ${STAT_COLOR[i]}`}>{card.stat}</div>
              <h3 className="mb-3 font-heading text-xl font-bold text-white">{card.title}</h3>
              <p className="mb-4 font-sans text-white/60">{card.body}</p>
              <cite className="block font-sans text-xs text-white/40">{card.cite}</cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
