"use client";

import Image from "next/image";
import { Package, LineChart, Target, Gift, ShoppingBag, Lock } from "lucide-react";
import type { ImageWithEmojiDoc, ResolvedApiIntegracoesContent } from "@/sanity/lib/types";
import { getSanityImageUrl } from "@/sanity/lib/image";

const iconMap = {
  package: <Package className="w-8 h-8 text-blue-400" />,
  lineChart: <LineChart className="w-8 h-8 text-green-400" />,
  target: <Target className="w-8 h-8 text-yoobe-neon-pink" />,
  gift: <Gift className="w-8 h-8 text-brand-orange" />,
  shoppingBag: <ShoppingBag className="w-8 h-8 text-cyan-400" />,
  lock: <Lock className="w-8 h-8 text-yoobe-purple" />,
} as const;

export default function ApiPlatformModules({
  content,
  showcaseItems,
}: {
  content: ResolvedApiIntegracoesContent["modules"];
  showcaseItems?: ImageWithEmojiDoc[];
}) {
  const modules = content.items.map((item) => ({
    ...item,
    iconNode: iconMap[item.icon as keyof typeof iconMap] ?? iconMap.package,
  }));
  return (
    <section className="py-24 bg-[#0d1424] relative text-center overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4">
            {content.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            {content.titleBefore} <span className="bg-linear-to-r from-yoobe-purple to-fuchsia-600 bg-clip-text text-transparent">{content.titleGradient}</span>{content.titleAfter ? ` ${content.titleAfter}` : ""}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-sans">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m, i) => {
            const cardShowcase = showcaseItems?.[i];
            const cardImageUrl = getSanityImageUrl(cardShowcase?.image, { width: 1280, height: 800, fit: "crop", crop: "entropy", quality: 84 });
            return (
            <div key={i} className="group rounded-3xl border border-white/10 bg-surface-panel p-8 text-left transition-transform duration-300 hover:-translate-y-2">
              <div className="mb-6 bg-white/5 p-4 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                {cardImageUrl ? (
                  <div className="relative h-8 w-8 overflow-hidden rounded-lg">
                    <Image src={cardImageUrl} alt={cardShowcase?.image?.alt || m.title} fill className="object-cover" unoptimized />
                  </div>
                ) : cardShowcase?.emoji ? (
                  <span className="text-2xl leading-none">{cardShowcase.emoji}</span>
                ) : (
                  m.iconNode
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-heading">{m.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed font-sans">{m.description}</p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
