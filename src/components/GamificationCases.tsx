"use client";

import Image from "next/image";
import type { GamificacaoShowcaseCaseVisualDoc, ResolvedGamificacaoContent } from "@/sanity/lib/types";
import { getSanityImageUrl } from "@/sanity/lib/image";
import { useState } from "react";

export default function GamificationCases({
  content: c,
  showcaseCases,
}: {
  content: ResolvedGamificacaoContent["cases"];
  showcaseCases?: GamificacaoShowcaseCaseVisualDoc[];
}) {
  function getShowcaseForCase(id: string) {
    return showcaseCases?.find((sc) => sc.company?.toLowerCase() === id.toLowerCase());
  }
  const [activeTab, setActiveTab] = useState<string>(c.items[0]?.id ?? "SAP");

  return (
    <section className="relative overflow-hidden bg-[#0a0f18] py-24">
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white/70">{c.badge}</span>
          <h2 className="mb-6 font-heading text-3xl font-black text-white md:text-5xl">
            {c.titleBefore}{" "}
            <span className="bg-linear-to-r from-yoobe-purple to-fuchsia-600 bg-clip-text text-transparent">{c.titleGradient}</span>{" "}
            {c.titleAfter}
          </h2>
          <p className="font-sans text-lg text-white/60">{c.sub}</p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {c.items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`rounded-full border px-6 py-3 text-sm font-bold transition-all ${
                activeTab === item.id
                  ? "border-yoobe-purple bg-yoobe-purple/20 text-yoobe-purple shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                  : "border-white/10 bg-surface-panel text-white/60 hover:border-white/30 hover:text-white"
              }`}
            >
              {item.id}
            </button>
          ))}
        </div>

        <div className="relative rounded-3xl border border-white/10 bg-surface-panel p-8 transition-all duration-500 lg:p-12">
          {c.items.map((item) => (
            <div
              key={item.id}
              className={`grid w-full animate-fade-in grid-cols-1 gap-12 lg:grid-cols-2 ${activeTab === item.id ? "block" : "hidden"}`}
            >
              <div className="flex flex-col justify-center">
                <div className="mb-6 flex items-center gap-3">
                  {(() => {
                    const sc = getShowcaseForCase(item.id);
                    const logoUrl = getSanityImageUrl(sc?.logoImage);
                    return logoUrl ? (
                      <div className="relative h-10 w-auto overflow-hidden rounded">
                        <Image src={logoUrl} alt={sc?.logoImage?.alt || item.company} width={120} height={40} className="h-10 w-auto object-contain" unoptimized />
                      </div>
                    ) : (
                      <span className="font-heading text-2xl font-bold uppercase tracking-widest text-white">{item.company}</span>
                    );
                  })()}
                  <span className="rounded-md bg-white/10 px-2 py-1 font-sans text-xs text-white/70">{item.industry}</span>
                </div>
                <h3 className="mb-4 line-clamp-2 font-heading text-2xl font-bold text-white lg:text-3xl">{item.title}</h3>
                <p className="mb-8 font-sans leading-relaxed text-white/60">{item.desc}</p>

                <div className="space-y-6">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-yoobe-purple">{c.challengeLabel}</h4>
                    <p className="text-sm text-white/80">{item.challenge}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-fuchsia-500">{c.solutionLabel}</h4>
                    <p className="text-sm text-white/80">{item.solution}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="grid w-full grid-cols-2 gap-6">
                  {item.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-white/5 bg-[#0a0f18] p-6 text-center transition-colors hover:border-yoobe-purple/50"
                    >
                      <div className="mb-2 bg-linear-to-br from-yoobe-purple to-fuchsia-600 bg-clip-text text-4xl font-black text-transparent lg:text-5xl">
                        {metric.value}
                      </div>
                      <div className="text-sm font-medium text-white/50">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
