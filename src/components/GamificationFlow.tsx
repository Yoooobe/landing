"use client";

import type { ResolvedGamificacaoContent } from "@/sanity/lib/types";

export default function GamificationFlow({ content: f }: { content: ResolvedGamificacaoContent["flow"] }) {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-surface-deep py-24">
      <div className="absolute left-1/2 top-0 hidden h-full w-px bg-linear-to-b from-transparent via-demo-cyan/30 to-transparent md:block"></div>

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white/70">{f.badge}</span>
          <h2 className="mb-6 font-heading text-3xl font-black text-white md:text-5xl">
            {f.titleBefore}{" "}
            <span className="bg-linear-to-r from-yoobe-purple via-unik-blue-soft to-demo-cyan bg-clip-text text-transparent">{f.titleGradient}</span>{" "}
            {f.titleAfter}
          </h2>
          <p className="font-sans text-lg text-white/60">{f.sub}</p>
        </div>

        <div className="relative space-y-16 md:space-y-0">
          {f.steps.map((step) => (
            <div key={step.num} className="relative flex w-full flex-col items-center last:mb-0 md:mb-16 md:flex-row md:justify-between">
              {step.align === "left" && <div className="hidden w-5/12 md:block"></div>}

              <div className="w-full shrink-0 md:w-5/12">
                <div className="group rounded-2xl border border-white/10 bg-surface-panel p-8 transition-all hover:border-demo-cyan/25 hover:bg-surface-elevated">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="bg-linear-to-r from-yoobe-purple to-demo-cyan bg-clip-text font-mono text-3xl font-bold text-transparent">{step.num}</span>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">{step.role}</span>
                  </div>
                  <h3 className="mb-4 font-heading text-2xl font-bold text-white transition-colors group-hover:text-yoobe-purple">{step.title}</h3>
                  <p className="mb-6 font-sans text-base leading-relaxed text-white/60">{step.desc}</p>
                  <div className="flex flex-wrap gap-3 font-sans">
                    {step.features.map((feat) => (
                      <span
                        key={feat.text}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/5 bg-black/40 px-3 py-1.5 text-sm text-white/80"
                      >
                        <span>{feat.icon}</span>
                        {feat.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {step.align === "right" && <div className="hidden w-5/12 md:block"></div>}

              <div className="absolute left-1/2 top-1/2 z-20 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-surface-deep bg-surface-panel shadow-[0_0_0_2px_rgba(34,211,238,0.35)] md:block">
                <div className="h-full w-full animate-pulse rounded-full bg-linear-to-br from-yoobe-purple to-demo-cyan"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
