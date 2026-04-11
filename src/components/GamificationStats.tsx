"use client";

import type { ResolvedGamificacaoContent } from "@/sanity/lib/types";

export default function GamificationStats({ content: s }: { content: ResolvedGamificacaoContent["stats"] }) {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-brand-navy py-24 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yoobe-purple/10 blur-[100px]"></div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mb-16">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white/70">{s.badge}</span>
          <h2 className="font-heading text-3xl font-black text-white md:text-5xl">
            {s.titleBefore}{" "}
            <span className="bg-linear-to-r from-yoobe-purple to-fuchsia-600 bg-clip-text text-transparent">{s.titleGradient}</span>{" "}
            {s.titleAfter}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {s.items.map((stat, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-surface-panel p-8 transition-transform duration-300 hover:-translate-y-2">
              <div className="mb-4 text-5xl font-black text-white">
                {stat.value}
                <span className="align-top text-3xl text-yoobe-purple">{stat.suffix}</span>
              </div>
              <p className="mx-auto max-w-[200px] text-sm leading-relaxed text-white/70">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
