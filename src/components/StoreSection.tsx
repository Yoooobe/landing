"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { ResolvedHomeContent } from "@/sanity/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";

const EMOJI = ["🎉", "🏆", "🎁", "🎓"] as const;

export default function StoreSection({
  homeContent = null,
}: {
  homeContent?: ResolvedHomeContent | null;
}) {
  const { m } = useLocaleMessages();
  const s = m.storeSection;
  const usecases = s.usecases.map((item, i) => {
    const visual = homeContent?.showcaseMedia?.storeSection?.usecaseCards?.[i];
    return {
      ...item,
      emoji: visual?.emoji || EMOJI[i],
      image: visual?.image || null,
      imageUrl: getSanityImageUrl(visual?.image),
    };
  });

  return (
    <section id="loja" className="relative overflow-hidden border-t border-white/5 bg-brand-navy-dark py-24">
      <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[60vw] max-h-[800px] w-[60vw] max-w-[800px] opacity-20 mix-blend-screen">
        <div className="h-full w-full rounded-full bg-linear-to-tl from-green-500/20 to-transparent blur-[100px]"></div>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="relative z-10 mb-16 text-center text-white">
          <div className="mb-4 inline-block rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-green-400">
            {s.badge}
          </div>
          <h2 className="mb-6 font-heading text-3xl font-black md:text-5xl">
            {s.titleBefore} <span className="bg-linear-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">{s.titleGradient}</span>{" "}
            {s.titleAfter}
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-white/50">{s.sub}</p>
        </div>

        <div className="relative z-10 mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {usecases.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-3xl border border-white/5 bg-surface-elevated p-8"
            >
              <div className="mb-4">
                {item.imageUrl ? (
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <Image
                      src={item.imageUrl}
                      alt={item.image?.alt?.trim() || item.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="text-4xl">{item.emoji}</div>
                )}
              </div>
              <h3 className="mb-3 font-heading text-xl font-bold text-white">{item.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-white/60">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 flex flex-wrap justify-center gap-4">
          <a
            href="https://catalogo.yoobe.co"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center rounded-xl bg-white px-8 font-bold text-brand-navy-dark transition-colors hover:bg-gray-100 font-sans"
          >
            {s.ctaCatalog}
          </a>
          <a
            href="https://catalogo.yoobe.co/kits"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center rounded-xl border border-white/20 bg-transparent px-8 font-bold text-white transition-colors hover:bg-white/5 font-sans"
          >
            {s.ctaKit}
          </a>
        </div>
      </div>
    </section>
  );
}
