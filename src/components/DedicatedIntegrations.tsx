"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { withBasePath } from "@/lib/basePath";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { ResolvedHomeContent } from "@/sanity/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";

export default function DedicatedIntegrations({
  homeContent = null,
  embedded = false,
}: {
  homeContent?: ResolvedHomeContent | null;
  embedded?: boolean;
}) {
  const { m } = useLocaleMessages();
  const di = m.landingMore.dedicatedIntegrations;
  const w = di.workvivo;
  const b = di.beehome;
  const workvivoLogoUrl = getSanityImageUrl(
    homeContent?.showcaseMedia?.dedicatedIntegrations?.workvivo?.logoImage,
  );
  const workvivoPreviewUrl =
    getSanityImageUrl(
      homeContent?.showcaseMedia?.dedicatedIntegrations?.workvivo?.previewImage,
    ) ?? withBasePath("/workvivo/workvivo-feed-shoutout.webp");
  const beehomeLogoUrl = getSanityImageUrl(
    homeContent?.showcaseMedia?.dedicatedIntegrations?.beehome?.logoImage,
  );
  const beehomePreviewUrl = getSanityImageUrl(
    homeContent?.showcaseMedia?.dedicatedIntegrations?.beehome?.previewImage,
  );

  const Wrapper = embedded ? "div" : "section";
  const wrapperClass = embedded
    ? "relative"
    : "py-24 bg-brand-navy-dark relative border-t border-white/5 overflow-hidden";

  return (
    <Wrapper className={wrapperClass}>
      {!embedded ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      ) : null}

      <div className={`relative z-10 ${embedded ? "" : "container mx-auto px-4 max-w-7xl"}`}>
        {!embedded ? (
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 mb-4 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-400 text-sm font-bold tracking-wide uppercase">
              {di.badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
              {di.titleBefore}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">{di.titleGradient}</span>
            </h2>
            <p className="text-xl text-white/50 font-sans">
              {di.subBefore}
              <strong className="text-white">{di.subStrong}</strong>
              {di.subAfter}
            </p>
          </div>
        ) : (
          <p className="mb-8 text-center font-sans text-white/60">
            {di.subBefore}
            <strong className="text-white">{di.subStrong}</strong>
            {di.subAfter}
          </p>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface-elevated border border-white/10 rounded-3xl p-8 lg:p-10 relative overflow-hidden group hover:border-blue-500/30 transition-colors flex flex-col"
          >
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] group-hover:bg-blue-500/30 transition-all pointer-events-none"></div>

            <div className="flex items-center gap-4 mb-6 relative z-10">
              {workvivoLogoUrl ? (
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-white shadow-lg">
                  <Image
                    src={workvivoLogoUrl}
                    alt={
                      homeContent?.showcaseMedia?.dedicatedIntegrations?.workvivo?.logoImage?.alt?.trim() ||
                      "Logo Workvivo"
                    }
                    fill
                    sizes="56px"
                    className="object-contain p-2"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center font-black text-blue-600 text-2xl shadow-lg">
                  W
                </div>
              )}
              <h3 className="text-3xl font-black text-white font-heading">{w.title}</h3>
            </div>

            <p className="text-white/60 font-sans mb-8 min-h-[60px] relative z-10">{w.body}</p>

            <div className="w-full aspect-16/10 border border-white/12 bg-slate-950 rounded-2xl relative overflow-hidden mb-8 shadow-2xl font-sans max-w-sm mx-auto group-hover:border-blue-500/40 transition-colors">
              <div className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-3 py-1.5 z-10 relative">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-500/80" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
                  <span className="h-2 w-2 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-[0.55rem] text-white/45 tracking-wider">workvivo.com · feed</span>
              </div>
              <div className="relative h-[calc(100%-26px)] w-full bg-slate-900">
                <Image
                  src={withBasePath("/screens/dash/campanhas-landing-pages.webp")}
                  alt="Integração Workvivo — feed e resgate 4unik"
                  fill
                  sizes="(min-width: 1024px) 384px, 100vw"
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
              <div className="absolute top-8 right-3 bg-slate-950/90 text-white text-[10px] px-3 py-1.5 rounded-lg font-mono shadow-2xl flex items-center gap-2 border border-white/15 backdrop-blur-md z-20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {w.realtime}
              </div>
            </div>

            <ul className="space-y-3 font-sans text-sm text-white/70 mt-auto">
              {w.bullets.map((line) => (
                <li key={line} className="flex gap-2 items-start">
                  <span className="text-blue-400 shrink-0">✓</span> {line}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-surface-elevated border border-white/10 rounded-3xl p-8 lg:p-10 relative overflow-hidden group hover:border-yellow-400/30 transition-colors flex flex-col"
          >
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-yellow-400/10 rounded-full blur-[80px] group-hover:bg-yellow-400/20 transition-all pointer-events-none"></div>

            <div className="flex items-center gap-4 mb-6 relative z-10">
              {beehomeLogoUrl ? (
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-white/5 shadow-lg">
                  <Image
                    src={beehomeLogoUrl}
                    alt={
                      homeContent?.showcaseMedia?.dedicatedIntegrations?.beehome?.logoImage?.alt?.trim() ||
                      "Logo Beehome"
                    }
                    fill
                    sizes="56px"
                    className="object-contain p-2"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-yellow-400 to-orange-400 flex items-center justify-center font-black text-white text-2xl shadow-lg">
                  B
                </div>
              )}
              <h3 className="text-3xl font-black text-white font-heading">{b.title}</h3>
            </div>

            <p className="text-white/60 font-sans mb-8 min-h-[60px] relative z-10">{b.body}</p>

            <div className="w-full aspect-16/10 border border-white/12 bg-slate-950 rounded-2xl relative overflow-hidden mb-8 shadow-2xl font-sans max-w-sm mx-auto group-hover:border-yellow-400/40 transition-colors">
              <div className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-3 py-1.5 z-10 relative">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-500/80" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
                  <span className="h-2 w-2 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-[0.55rem] text-white/45 tracking-wider">beehome.io · portal</span>
              </div>
              <div className="relative h-[calc(100%-26px)] w-full bg-slate-900">
                <Image
                  src={withBasePath("/screens/hapvida/hapvida-vendas-on-login.webp")}
                  alt="Integração Beehome — portal corporativo e resgate 4unik"
                  fill
                  sizes="(min-width: 1024px) 384px, 100vw"
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
              <div className="absolute top-8 right-3 bg-slate-950/90 text-white text-[10px] px-3 py-1.5 rounded-lg font-mono shadow-2xl flex items-center gap-2 border border-white/15 backdrop-blur-md z-20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Sincronizado
              </div>
            </div>

            <ul className="space-y-3 font-sans text-sm text-white/70 mt-auto">
              {b.bullets.map((line) => (
                <li key={line} className="flex gap-2 items-start">
                  <span className="text-yellow-400 shrink-0">✓</span> {line}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </Wrapper>
  );
}
