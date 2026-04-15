"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { ResolvedHomeContent } from "@/sanity/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";

const ICONS = ["📊", "📦", "👥", "🔒"] as const;

export default function ManagementSection({
  homeContent = null,
}: {
  homeContent?: ResolvedHomeContent | null;
}) {
  const { m } = useLocaleMessages();
  const man = m.managementSection;
  const features = man.features.map((item, i) => {
    const visual = homeContent?.showcaseMedia?.managementSection?.featureCards?.[i];
    return {
      ...item,
      icon: visual?.emoji || ICONS[i],
      image: visual?.image || null,
      imageUrl: getSanityImageUrl(visual?.image, { width: 1280, height: 800, fit: "crop", crop: "entropy", quality: 84 }),
    };
  });

  return (
    <section id="gestao" className="relative border-t border-white/5 bg-brand-navy-dark py-24">
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="relative z-10 mb-16 text-center text-white">
          <div className="mb-4 inline-block rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-blue-400">
            {man.badge}
          </div>
          <h2 className="mb-6 font-heading text-3xl font-black md:text-5xl">
            {man.titleBefore} <span className="bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">{man.titleGradient}</span>
            {man.titleAfter}
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-white/50">{man.sub}</p>
        </div>

        <div className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10"
            >
              <div className="mb-6">
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
                  <div className="text-4xl">{item.icon}</div>
                )}
              </div>
              <h3 className="mb-3 font-heading text-xl font-bold text-white">{item.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-white/60">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
