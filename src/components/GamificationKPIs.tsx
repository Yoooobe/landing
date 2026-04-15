"use client";

import Image from "next/image";
import { BarChart3, DollarSign, RefreshCw, TrendingUp, Users, Zap } from "lucide-react";
import type { ImageWithEmojiDoc, ResolvedGamificacaoContent } from "@/sanity/lib/types";
import { getSanityImageUrl } from "@/sanity/lib/image";

const KPI_ICONS = [BarChart3, TrendingUp, RefreshCw, DollarSign, Zap, Users] as const;
const DEMO_VALUES = [85, 42, 68, 350, 24, 91] as const;
const DEMO_UNITS = ["pts", "%", "%", "%", "hrs", "%"] as const;
const BAR_WIDTHS = [85, 42, 68, 100, 24, 91] as const;

export default function GamificationKPIs({
  content: k,
  showcaseItems,
}: {
  content: ResolvedGamificacaoContent["kpis"];
  showcaseItems?: ImageWithEmojiDoc[];
}) {
  return (
    <section className="relative z-10 border-t border-white/5 bg-[#0a0f18] py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white/70">{k.badge}</span>
          <h2 className="mb-6 font-heading text-3xl font-black text-white md:text-5xl">
            {k.titleBefore}{" "}
            <span className="bg-linear-to-r from-yoobe-purple to-fuchsia-600 bg-clip-text text-transparent">{k.titleGradient}</span>
            {k.titleAfter ? ` ${k.titleAfter}` : ""}
          </h2>
          <p className="font-sans text-lg text-white/60">{k.sub}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {k.items.map((kpi, idx) => {
            const Icon = KPI_ICONS[idx];
            const cardShowcase = showcaseItems?.[idx];
            const cardImageUrl = getSanityImageUrl(cardShowcase?.image, { width: 1280, height: 800, fit: "crop", crop: "entropy", quality: 84 });
            return (
              <div key={kpi.title} className="group rounded-2xl border border-white/10 bg-surface-panel p-8 transition-colors hover:bg-[#161d2b]">
                <div className="mb-6 flex items-start justify-between">
                  <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-3 transition-all group-hover:scale-110 group-hover:bg-white/10">
                    {cardImageUrl ? (
                      <div className="relative h-8 w-8 overflow-hidden rounded-lg">
                        <Image src={cardImageUrl} alt={cardShowcase?.image?.alt || kpi.title} fill className="object-cover" unoptimized />
                      </div>
                    ) : cardShowcase?.emoji ? (
                      <span className="text-2xl leading-none">{cardShowcase.emoji}</span>
                    ) : (
                      <Icon className={`h-8 w-8 ${["text-blue-400", "text-green-400", "text-yoobe-purple", "text-amber-400", "text-yellow-500", "text-yoobe-neon-pink"][idx]}`} />
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-heading text-2xl font-bold text-white">{DEMO_VALUES[idx]}</span>
                    <span className="ml-1 text-xs text-white/40">{DEMO_UNITS[idx]}</span>
                  </div>
                </div>
                <h3 className="mb-1 font-heading text-xl font-bold text-white">{kpi.title}</h3>
                <div className="mb-4 font-sans text-sm font-semibold tracking-wide text-yoobe-purple">{kpi.subtitle}</div>
                <p className="mb-6 flex-1 font-sans text-sm leading-relaxed text-white/60">{kpi.desc}</p>
                <div className="mt-auto h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-brand-orange to-yoobe-neon-pink transition-all duration-1000 group-hover:w-full"
                    style={{ width: `${BAR_WIDTHS[idx]}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
