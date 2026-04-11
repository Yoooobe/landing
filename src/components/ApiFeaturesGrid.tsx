"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PlugZap, RefreshCw, Box, ShieldCheck, Cpu } from "lucide-react";
import type { ImageWithEmojiDoc, ResolvedApiIntegracoesContent } from "@/sanity/lib/types";
import { getSanityImageUrl } from "@/sanity/lib/image";

const iconMap = {
  plugZap: <PlugZap className="w-6 h-6 text-brand-orange" />,
  shieldCheck: <ShieldCheck className="w-6 h-6 text-yoobe-neon-pink" />,
  box: <Box className="w-6 h-6 text-cyan-400" />,
  cpu: <Cpu className="w-6 h-6 text-yoobe-purple" />,
  refreshCw: <RefreshCw className="w-6 h-6 text-green-400" />,
} as const;

export default function ApiFeaturesGrid({
  content,
  showcaseItems,
}: {
  content: ResolvedApiIntegracoesContent["features"];
  showcaseItems?: ImageWithEmojiDoc[];
}) {
  const features = content.items.map((item, index) => ({
    ...item,
    iconNode: iconMap[item.icon as keyof typeof iconMap] ?? iconMap.plugZap,
    delay: 0.1 + index * 0.1,
  }));

  return (
    <section className="py-24 bg-[#0a0f18] relative border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 font-mono text-3xl font-black text-white md:text-5xl">
            {content.title}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-sans">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const cardShowcase = showcaseItems?.[i];
            const cardImageUrl = getSanityImageUrl(cardShowcase?.image);
            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: f.delay }}
              className={`glass-panel-dark border border-white/5 rounded-[2rem] p-8 hover:border-white/10 transition-colors group ${f.colSpan}`}
            >
              <div className="mb-6 inline-block rounded-2xl border border-white/5 bg-surface-elevated p-4 transition-transform group-hover:scale-110">
                {cardImageUrl ? (
                  <div className="relative h-6 w-6 overflow-hidden rounded">
                    <Image src={cardImageUrl} alt={cardShowcase?.image?.alt || f.title} fill className="object-cover" unoptimized />
                  </div>
                ) : cardShowcase?.emoji ? (
                  <span className="text-xl leading-none">{cardShowcase.emoji}</span>
                ) : (
                  f.iconNode
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 font-heading">{f.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm md:text-base font-sans">{f.description}</p>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
