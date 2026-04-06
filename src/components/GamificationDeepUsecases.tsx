"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";

export default function GamificationDeepUsecases() {
  const { m } = useLocaleMessages();
  const u = m.gamificacaoPage.deepUsecases;

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#0a0f18] py-24">
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white/70">{u.badge}</span>
          <h2 className="mb-6 font-heading text-3xl font-black text-white md:text-5xl">
            {u.titleBefore}{" "}
            <span className="bg-gradient-to-r from-yoobe-purple to-fuchsia-600 bg-clip-text text-transparent">{u.titleGradient}</span>
            {u.titleAfter ? ` ${u.titleAfter}` : ""}
          </h2>
          <p className="text-lg text-white/60">{u.sub}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {u.items.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-white/10 bg-[#121824] p-8 transition-all hover:border-yoobe-purple/50 hover:bg-[linear-gradient(135deg,#121824_0%,#1a1025_100%)]"
            >
              <div className="mb-4 text-4xl transition-transform group-hover:-translate-y-1">{item.icon}</div>
              <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-yoobe-purple">{item.title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-white/60">{item.desc}</p>
              <div className="mt-auto border-t border-white/5 pt-4">
                <span className="text-xs font-semibold italic text-yoobe-purple">&quot;{item.hook}&quot;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
