"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ApiIntegracoesShowcasePlatformDoc, ResolvedApiIntegracoesContent } from "@/sanity/lib/types";
import { getSanityImageUrl } from "@/sanity/lib/image";

export default function NativeIntegrations({
  content,
  showcasePlatforms,
}: {
  content: ResolvedApiIntegracoesContent["integrations"];
  showcasePlatforms?: ApiIntegracoesShowcasePlatformDoc[];
}) {
  function getShowcaseForPlatform(name: string) {
    return showcasePlatforms?.find(
      (sp) => sp.platformName?.toLowerCase() === name.toLowerCase(),
    );
  }
  return (
    <section className="py-24 bg-[#0d1424] relative border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4">
            {content.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            {content.title} <span className="bg-linear-to-r from-yoobe-purple to-cyan-400 bg-clip-text text-transparent">{content.titleGradient}</span> {content.titleAfter}
          </h2>
          <p className="text-lg text-white/50 mb-16 font-sans">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {content.mainPlatforms.map((p, i) => {
            const sc = getShowcaseForPlatform(p.name);
            const logoUrl = getSanityImageUrl(sc?.logoImage);
            const previewUrl = getSanityImageUrl(sc?.previewImage);
            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-surface-elevated p-8 transition-all hover:-translate-y-2"
            >
              <div className={`pointer-events-none absolute inset-0 bg-linear-to-b ${p.color} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold text-white overflow-hidden">
                    {logoUrl ? (
                      <Image src={logoUrl} alt={sc?.logoImage?.alt || p.name} width={48} height={48} className="h-full w-full object-contain" unoptimized />
                    ) : (
                      p.logo
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white leading-tight font-heading">{p.name}</h3>
                    <span className="text-xs text-white/50">{p.by}</span>
                  </div>
                </div>
                <span className="px-2 py-1 bg-white/5 rounded-md text-[10px] font-bold tracking-widest uppercase text-white/70 border border-white/10">
                  {p.badge}
                </span>
              </div>
              
              <p className="relative z-10 mb-8 grow text-sm leading-relaxed text-white/60">
                {p.description}
              </p>

              {previewUrl && (
                <div className="relative z-10 mb-6 overflow-hidden rounded-xl border border-white/5" style={{ aspectRatio: "16/9" }}>
                  <Image src={previewUrl} alt={sc?.previewImage?.alt || p.name} fill className="object-cover" unoptimized />
                </div>
              )}

              <ul className="space-y-3 relative z-10 border-t border-white/5 pt-6">
                {p.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="mt-0.5 shrink-0 text-yoobe-purple">✓</span>
                    <span className="leading-tight">{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            );
          })}
        </div>

        {/* Extra Integrations Pills */}
        <div className="text-center pt-8 border-t border-white/5">
          <span className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6 block">{content.extraIntegrationsLabel}</span>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {content.extraIntegrations.map((int, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white transition-colors cursor-default">
                {int}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
