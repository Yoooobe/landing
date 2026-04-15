"use client";

import Image from "next/image";
import type { ImageWithEmojiDoc, ResolvedGamificacaoContent } from "@/sanity/lib/types";
import { getSanityImageUrl } from "@/sanity/lib/image";

const TAG_STYLES: Record<number, string> = {
  0: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  1: "bg-yoobe-neon-pink/20 text-yoobe-neon-pink border-yoobe-neon-pink/30",
  2: "bg-green-500/20 text-green-400 border-green-500/30",
  3: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  4: "bg-yoobe-purple/20 text-yoobe-purple border-yoobe-purple/30",
};

export default function GamificationTrends({
  content: t,
  showcaseItems,
}: {
  content: ResolvedGamificacaoContent["trends"];
  showcaseItems?: ImageWithEmojiDoc[];
}) {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#0d1424] py-24">
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white/70">{t.badge}</span>
          <h2 className="mb-6 font-heading text-3xl font-black text-white md:text-5xl">
            {t.titleBefore}{" "}
            <span className="bg-linear-to-r from-yoobe-purple to-fuchsia-600 bg-clip-text text-transparent">{t.titleGradient}</span>
            {t.titleAfter ? ` ${t.titleAfter}` : ""}
          </h2>
          <p className="text-lg text-white/60">{t.sub}</p>
        </div>

        <div className="group relative mb-16 flex flex-col items-center justify-around gap-8 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-r from-surface-panel to-[#1a1025] p-8 text-center shadow-2xl md:flex-row">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.1)_0%,transparent_50%)] opacity-50 transition-opacity duration-500 group-hover:opacity-100"></div>

          <div className="relative z-10 flex flex-col">
            <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50">{t.banner2025}</span>
            <span className="glow-text text-4xl font-black text-white md:text-5xl">{t.value2025}</span>
          </div>

          <div className="relative z-10 hidden flex-col items-center justify-center text-yoobe-purple md:flex">
            <span className="mb-1 text-sm font-bold uppercase tracking-widest">{t.cagr}</span>
            <svg width="64" height="24" viewBox="0 0 64 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse">
              <path d="M0,12 L50,12 M42,4 L52,12 L42,20" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col">
            <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50">{t.banner2033}</span>
            <span className="glow-text text-4xl font-black text-yoobe-purple md:text-5xl">{t.value2033}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.items.map((trend, idx) => {
            const cardShowcase = showcaseItems?.[idx];
            const cardImageUrl = getSanityImageUrl(cardShowcase?.image, { width: 1280, height: 800, fit: "crop", crop: "entropy", quality: 84 });
            return (
            <div
              key={idx}
              className="group rounded-2xl border border-white/10 bg-surface-panel p-8 transition-all hover:-translate-y-2 hover:border-yoobe-purple/50"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-4xl transition-transform group-hover:scale-110">
                {cardImageUrl ? (
                  <div className="relative h-10 w-10 overflow-hidden rounded-xl">
                    <Image src={cardImageUrl} alt={cardShowcase?.image?.alt || trend.title} fill className="object-cover" unoptimized />
                  </div>
                ) : cardShowcase?.emoji ? (
                  <span>{cardShowcase.emoji}</span>
                ) : (
                  trend.icon
                )}
              </div>
              <h3 className="mb-3 font-heading text-xl font-bold text-white transition-colors group-hover:text-yoobe-purple">{trend.title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-white/60">{trend.desc}</p>
              <div className="mt-auto">
                <span className={`inline-block rounded-md border px-3 py-1 text-xs font-bold ${TAG_STYLES[trend.tagStyle] ?? TAG_STYLES[0]}`}>
                  {trend.tag}
                </span>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
