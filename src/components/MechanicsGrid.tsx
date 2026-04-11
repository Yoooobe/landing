"use client";

import { Coins, Goal, Medal, Rocket, Store, Trophy } from "lucide-react";
import Image from "next/image";
import type { ImageWithEmojiDoc, ResolvedGamificacaoContent } from "@/sanity/lib/types";
import { getSanityImageUrl } from "@/sanity/lib/image";

function MechanicIcon({ index }: { index: number }) {
  const c = "h-8 w-8";
  switch (index) {
    case 0:
      return <Coins className={`${c} text-yellow-400`} />;
    case 1:
      return <Trophy className={`${c} text-brand-orange`} />;
    case 2:
      return <Medal className={`${c} text-yoobe-neon-pink`} />;
    case 3:
      return <Goal className={`${c} text-blue-400`} />;
    case 4:
      return <Rocket className={`${c} text-yoobe-purple`} />;
    case 5:
      return <Store className={`${c} text-green-400`} />;
    default:
      return null;
  }
}
const GRADIENTS = [
  "from-yellow-400/20 to-orange-500/0",
  "from-brand-orange/20 to-red-500/0",
  "from-yoobe-neon-pink/20 to-pink-600/0",
  "from-blue-400/20 to-indigo-500/0",
  "from-yoobe-purple/20 to-fuchsia-500/0",
  "from-green-400/20 to-emerald-500/0",
] as const;
const BORDERS = [
  "hover:border-yellow-400/50",
  "hover:border-brand-orange/50",
  "hover:border-yoobe-neon-pink/50",
  "hover:border-blue-400/50",
  "hover:border-yoobe-purple/50",
  "hover:border-green-400/50",
] as const;

export default function MechanicsGrid({
  content: s,
  showcaseItems,
}: {
  content: ResolvedGamificacaoContent["mechanics"];
  showcaseItems?: ImageWithEmojiDoc[];
}) {
  return (
    <section id="mechanics" className="relative z-10 border-t border-white/5 bg-[#0d1424] py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white/70">{s.badge}</span>
          <h2 className="mb-6 font-heading text-4xl font-black text-white md:text-5xl">
            {s.titleBefore}{" "}
            <span className="bg-linear-to-r from-yoobe-purple to-fuchsia-600 bg-clip-text text-transparent">{s.titleGradient}</span>{" "}
            {s.titleAfter}
          </h2>
          <p className="text-lg text-white/60">{s.sub}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {s.items.map((item, i) => {
            const cardShowcase = showcaseItems?.[i];
            const cardImageUrl = getSanityImageUrl(cardShowcase?.image);
            return (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/5 bg-surface-elevated p-8 transition-all duration-300 ${BORDERS[i]} hover:-translate-y-2 hover:shadow-2xl`}
              >
                <div
                  className={`absolute right-0 top-0 h-48 w-48 rounded-full bg-linear-to-bl ${GRADIENTS[i]} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
                ></div>

                <div className="relative z-10">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 transition-transform duration-300 group-hover:scale-110">
                      {cardImageUrl ? (
                        <div className="relative h-8 w-8 overflow-hidden rounded-lg">
                          <Image src={cardImageUrl} alt={cardShowcase?.image?.alt || item.title} fill className="object-cover" unoptimized />
                        </div>
                      ) : cardShowcase?.emoji ? (
                        <span className="text-2xl leading-none">{cardShowcase.emoji}</span>
                      ) : (
                        <MechanicIcon index={i} />
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs font-semibold text-white/70">{item.badge}</span>
                      <div className="select-none font-mono text-4xl font-black text-white/5">{item.id}</div>
                    </div>
                  </div>
                  <h3 className="mb-4 font-heading text-2xl font-bold text-white transition-colors group-hover:text-white/90">{item.title}</h3>
                  <p className="mb-6 text-sm font-medium leading-relaxed text-white/50">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-white/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-yoobe-purple/50"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
