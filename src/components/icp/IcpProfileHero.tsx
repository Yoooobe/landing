"use client";

import HeroThemeBackdrop from "@/components/HeroThemeBackdrop";
import { withBasePath } from "@/lib/basePath";
import type { Locale } from "@/lib/locale";
import type { IcpVerticalPage } from "@/lib/icpVerticalPages";
import type { IcpFloatIcon, IcpProfileVisual } from "@/config/icp-profile-visuals";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Award,
  CalendarDays,
  Code2,
  Gift,
  GraduationCap,
  Heart,
  type LucideIcon,
  Package,
  QrCode,
  Sparkles,
  Star,
  Store,
  Target,
  Ticket,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";

const FLOAT_ICONS: Record<IcpFloatIcon, LucideIcon> = {
  package: Package,
  gift: Gift,
  store: Store,
  code: Code2,
  sparkles: Sparkles,
  graduation: GraduationCap,
  award: Award,
  trending: TrendingUp,
  target: Target,
  users: Users,
  heart: Heart,
  ticket: Ticket,
  calendar: CalendarDays,
  scan: QrCode,
  zap: Zap,
  star: Star,
};

function resolveHref(href: string): string {
  return /^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith("#")
    ? href
    : withBasePath(href);
}

/** Splits the headline so a configured keyword renders in an accent gradient. */
function renderHeadline(title: string, gradientWord: string | undefined, gradientClass: string) {
  if (!gradientWord) return title;
  const idx = title.toLowerCase().indexOf(gradientWord.toLowerCase());
  if (idx === -1) return title;
  const before = title.slice(0, idx);
  const match = title.slice(idx, idx + gradientWord.length);
  const after = title.slice(idx + gradientWord.length);
  return (
    <>
      {before}
      <span className={`bg-linear-to-r ${gradientClass} bg-clip-text text-transparent`}>
        {match}
      </span>
      {after}
    </>
  );
}

type Props = {
  locale: Locale;
  hero: IcpVerticalPage["hero"];
  visual: IcpProfileVisual;
};

export default function IcpProfileHero({ locale, hero, visual }: Props) {
  const reduceMotion = useReducedMotion();
  const ctaHref = resolveHref(hero.ctaHref);
  const isExternal = /^(?:[a-z]+:)?\/\//i.test(ctaHref);

  return (
    <section className="hero-theme-section relative overflow-hidden bg-brand-navy-dark pb-20 pt-28 md:pb-28 md:pt-32">
      <HeroThemeBackdrop theme={visual.heroTheme} />
      <div className="absolute inset-0 z-0">
        <div className={`absolute left-[12%] top-[8%] h-[460px] w-[460px] rounded-full blur-[140px] mix-blend-screen ${visual.heroGlowPrimaryClass}`} />
        <div className={`absolute bottom-[-12%] right-[-6%] h-[420px] w-[420px] rounded-full blur-[130px] mix-blend-screen ${visual.heroGlowSecondaryClass}`} />
      </div>

      <div className="container relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)]">
        <div className="max-w-2xl text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm ${visual.accentBorderClass} ${visual.accentBgClass} ${visual.accentTextClass}`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-heading text-4xl font-black leading-[1.08] tracking-tight text-white md:text-6xl"
          >
            {renderHeadline(hero.title, visual.gradientWord?.[locale], visual.titleGradientClass)}
          </motion.h1>

          {hero.definitionLead ? (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.09 }}
              className="mx-auto mt-5 max-w-xl text-base font-medium leading-7 text-white/80 md:text-lg lg:mx-0"
            >
              {hero.definitionLead}
            </motion.p>
          ) : null}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className={`mx-auto max-w-xl text-lg leading-8 text-white/65 md:text-xl lg:mx-0 ${hero.definitionLead ? "mt-4" : "mt-6"}`}
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-9 flex justify-center lg:justify-start"
          >
            <a
              href={ctaHref}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={`group inline-flex h-12 items-center gap-2 rounded-full bg-linear-to-r px-8 font-bold text-white shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-transform hover:scale-[1.03] ${visual.titleGradientClass}`}
            >
              {hero.ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, type: "spring", stiffness: 90, damping: 18 }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          <div className="overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm">
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-gray-900/70 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 font-mono text-[0.6rem] tracking-wider text-white/35">
                {visual.chromeLabel}
              </span>
            </div>
            <Image
              src={withBasePath(visual.images.hero)}
              alt={hero.title}
              width={1280}
              height={860}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1024px) 560px, 92vw"
              priority
              fetchPriority="high"
            />
          </div>

          {visual.floatingCards.map((card, index) => {
            const Icon = FLOAT_ICONS[card.icon];
            const placement =
              index === 0
                ? "-left-3 top-[14%] sm:-left-8"
                : "-right-3 bottom-[12%] sm:-right-8";
            return (
              <motion.div
                key={card.icon}
                initial={{ opacity: 0, scale: 0.8, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: card.delay, duration: 0.6, type: "spring" }}
                className={`absolute z-20 hidden items-center gap-3 rounded-2xl border border-white/10 bg-surface-panel/90 p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-md sm:flex ${placement}`}
                style={reduceMotion ? undefined : { animation: `float ${card.floatDuration}s ease-in-out infinite` }}
              >
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${card.chipClass}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-heading text-sm font-bold text-white">{card.title[locale]}</div>
                  <div className="font-sans text-[0.7rem] text-white/50">{card.sub[locale]}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
