"use client";

import FeatureScreensCarousel from "@/components/FeatureScreensCarousel";
import HeroThemeBackdrop from "@/components/HeroThemeBackdrop";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { withBasePath } from "@/lib/basePath";
import { motion } from "framer-motion";
import { Trophy, Star, Zap } from "lucide-react";
import Image from "next/image";
import type { ResolvedGamificacaoContent, SanityImageDoc } from "@/sanity/lib/types";
import { getSanityImageUrl } from "@/sanity/lib/image";

export default function GamificationHero({
  content: h,
  showcaseImage,
}: {
  content: ResolvedGamificacaoContent["hero"];
  showcaseImage?: SanityImageDoc | null;
}) {
  const { locale } = useLocaleMessages();
  const showcaseImageUrl = getSanityImageUrl(showcaseImage, { width: 1600, height: 960, fit: "crop", crop: "entropy", quality: 86 });
  return (
    <section className="hero-theme-section relative overflow-hidden bg-brand-navy-dark pb-24 pt-32">
      <HeroThemeBackdrop theme="gamification" />
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/3 top-1/4 h-[800px] w-[800px] animate-pulse rounded-full bg-yoobe-purple/15 blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-yoobe-neon-pink/10 blur-[120px] mix-blend-screen"></div>
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWNDBoLTQweiBNMzkuNSAwSDQwdjQwaC0uNXoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMSkiLz48L3N2Zz4=')] bg-repeat"
        ></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute left-[10%] top-[20%] hidden items-center gap-3 rounded-2xl p-4 glass-panel-dark lg:flex"
          style={{ animation: "float 6s ease-in-out infinite" }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-yoobe-neon-pink/30 bg-yoobe-neon-pink/20">
            <Trophy className="h-5 w-5 text-yoobe-neon-pink" />
          </div>
          <div>
            <div className="font-heading text-sm font-bold text-white">{h.floatLevel}</div>
            <div className="font-sans text-xs text-white/50">{h.floatLevelSub}</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="absolute right-[10%] top-[40%] hidden w-48 flex-col gap-2 rounded-3xl p-5 glass-panel-dark lg:flex"
          style={{ animation: "float 8s ease-in-out infinite 1s" }}
        >
          <div className="flex w-full items-center justify-between">
            <div className="font-heading text-xl font-bold text-brand-orange">+500 pts</div>
            <Star className="h-5 w-5 fill-brand-orange text-brand-orange" />
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[75%] rounded-full bg-brand-orange"></div>
          </div>
          <div className="mt-1 font-sans text-[10px] text-white/40">{h.floatProgress}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="absolute bottom-[20%] left-[20%] hidden h-14 w-14 items-center justify-center rounded-full border-brand-orange/30 glass-panel-dark shadow-[0_0_30px_rgba(249,115,22,0.2)] lg:flex"
          style={{ animation: "float 5s ease-in-out infinite 0.5s" }}
        >
          <Zap className="h-6 w-6 text-brand-orange" />
        </motion.div>

        {/* Floating card — Admin dashboard (left, xl only) */}
        <motion.div
          initial={{ opacity: 0, x: -60, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 1.0, duration: 0.9, type: "spring" }}
          className="absolute left-[1%] top-[30%] hidden w-[240px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] xl:block"
          style={{ animation: "float 9s ease-in-out infinite 1s" }}
        >
          <div className="flex items-center gap-1.5 border-b border-white/8 bg-[#111827]/95 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-red-500/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
            <span className="h-2 w-2 rounded-full bg-green-500/70" />
            <span className="ml-2 font-mono text-[0.55rem] text-white/30 tracking-wider">gestor.4unik.io</span>
          </div>
          <div style={{ aspectRatio: "4/3" }} className="relative overflow-hidden">
            <Image
              src={withBasePath("/screens/admin-dashboard.webp")}
              alt="Dashboard 4unik"
              fill
              sizes="240px"
              className="object-cover object-top"
            />
          </div>
          <div className="flex items-center justify-between bg-[#0d1424]/95 px-3 py-1.5">
            <span className="text-[0.56rem] font-semibold text-brand-orange">Dashboard</span>
            <span className="rounded-full border border-brand-orange/30 bg-brand-orange/20 px-2 py-0.5 text-[0.5rem] font-bold uppercase tracking-widest text-brand-orange">
              Ao vivo
            </span>
          </div>
        </motion.div>

        {/* Campaign editor preview floating card (right) */}
        <motion.div
          initial={{ opacity: 0, x: 60, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, type: "spring" }}
          className="absolute bottom-[8%] right-[3%] hidden w-[260px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] lg:block xl:w-[300px]"
          style={{ animation: "float 10s ease-in-out infinite 2s" }}
        >
          <div className="flex items-center gap-1.5 border-b border-white/8 bg-[#111827]/95 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-red-500/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
            <span className="h-2 w-2 rounded-full bg-green-500/70" />
            <span className="ml-2 font-mono text-[0.55rem] text-white/30 tracking-wider">gestor.4unik.io · Campanha</span>
          </div>
          <div className="relative overflow-hidden bg-[#111827]" style={{ aspectRatio: "4/3" }}>
            {showcaseImageUrl ? (
              <Image
                src={showcaseImageUrl}
                alt={showcaseImage?.alt?.trim() || "Screenshot da plataforma 4unik"}
                fill
                sizes="300px"
                className="object-cover object-top"
                unoptimized
              />
            ) : (
              <Image
                src={withBasePath("/screens/admin-campaign-config-desktop.webp")}
                alt="Editor de campanha 4unik"
                fill
                sizes="300px"
                className="object-cover object-top"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#111827]/40 to-transparent" />
          </div>
          <div className="flex items-center justify-between bg-[#0d1424]/95 px-3 py-1.5">
            <span className="text-[0.56rem] font-semibold text-yoobe-purple">Preview ao vivo</span>
            <span className="rounded-full border border-yoobe-purple/30 bg-yoobe-purple/20 px-2 py-0.5 text-[0.5rem] font-bold uppercase tracking-widest text-yoobe-purple">
              Campanha
            </span>
          </div>
        </motion.div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 px-4 py-1.5 shadow-[0_0_20px_rgba(139,92,246,0.3)] backdrop-blur-sm"
          >
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-yoobe-purple">{h.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 font-heading text-5xl font-black leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            {h.titleLine1} <br />
            <span className="bg-linear-to-r from-yoobe-purple via-fuchsia-500 to-yoobe-neon-pink bg-clip-text text-transparent">{h.titleGradient}</span>
            <br />
            <span className="text-3xl text-white/70 md:text-4xl">{h.titleLine2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl font-sans text-xl font-light leading-relaxed text-white/60 md:text-2xl"
          >
            {h.sub}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex justify-center">
            <a
              href={h.ctaHref}
              className="flex items-center gap-2 rounded-full bg-white px-8 py-4 font-sans text-lg font-bold text-yoobe-purple shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all hover:scale-105"
            >
              {h.cta}
            </a>
          </motion.div>
        </div>

        {/* Platform preview carousel — desktop only, below hero text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="mx-auto mt-16 hidden max-w-3xl lg:block"
        >
          <FeatureScreensCarousel variant="gamification" locale={locale} intervalMs={4200} />
        </motion.div>
      </div>
    </section>
  );
}
