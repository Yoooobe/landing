"use client";

import FeatureScreensCarousel from "@/components/FeatureScreensCarousel";
import HeroThemeBackdrop from "@/components/HeroThemeBackdrop";
import UnikWordmark from "@/components/UnikWordmark";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { BASE_PATH, withBasePath } from "@/lib/basePath";
import {
  getSanityImageUrl,
  SANITY_HOME_HERO_MAIN_WIDTH,
  SANITY_HOME_HERO_SUPPORTING_WIDTH,
} from "@/sanity/lib/image";
import type { HeroBlockDoc, ResolvedHomeContent } from "@/sanity/lib/types";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

type Props = {
  /** Opcional: primeiro bloco `heroBlock` da página Sanity com slug `home`. */
  cmsHero?: HeroBlockDoc | null;
  homeContent?: ResolvedHomeContent | null;
};

function resolvePublicHref(href: string | undefined, fallback: string): string {
  if (!href) return fallback;
  if (
    href.startsWith(BASE_PATH) ||
    href.startsWith("#") ||
    /^(?:[a-z]+:)?\/\//i.test(href)
  ) {
    return href;
  }
  if (href.startsWith("/")) {
    return withBasePath(href);
  }
  return href;
}

export default function HomeHero({ cmsHero = null, homeContent = null }: Props) {
  const { locale, m, path } = useLocaleMessages();
  const defaultExploreHref = withBasePath(path("/#platform"));
  const h = homeContent?.hero ?? {
    ...m.home.hero,
    ctaDemoHref: "https://calendly.com/yoobeco/demo",
    ctaExploreHref: defaultExploreHref,
    floatAdhesionValue: "92%",
    floatRhValue: "0%",
    floatEnpsValue: "+42 pts",
  };
  const exploreHref = resolvePublicHref(h.ctaExploreHref?.trim(), defaultExploreHref);
  const platformImageUrl = getSanityImageUrl(h.platformImage, {
    width: SANITY_HOME_HERO_MAIN_WIDTH,
    height: 760,
    fit: "crop",
    crop: "focalpoint",
    focalPoint: { x: 0.5, y: 0.16 },
    quality: 84,
  });
  const supportingImageUrl = getSanityImageUrl(h.supportingImage, {
    width: SANITY_HOME_HERO_SUPPORTING_WIDTH,
    height: 520,
    fit: "crop",
    crop: "focalpoint",
    focalPoint: { x: 0.52, y: 0.18 },
    quality: 82,
  });
  const cmsHeroImageUrl = getSanityImageUrl(cmsHero?.image, {
    width: SANITY_HOME_HERO_MAIN_WIDTH,
    height: 760,
    fit: "crop",
    crop: "focalpoint",
    focalPoint: { x: 0.5, y: 0.16 },
    quality: 84,
  });
  const hasCmsHero = Boolean(cmsHero?.headline?.trim());
  const primaryHref = hasCmsHero
    ? cmsHero?.ctaLink?.trim() || h.ctaDemoHref || "https://calendly.com/yoobeco/demo"
    : h.ctaDemoHref || "https://calendly.com/yoobeco/demo";
  const primaryLabel = hasCmsHero ? cmsHero?.ctaText?.trim() || h.ctaDemo : h.ctaDemo;
  const heroSubheadline =
    (hasCmsHero ? cmsHero?.subheadline?.trim() : "") || h.sub;
  const heroHeadline = hasCmsHero ? cmsHero?.headline?.trim() || "" : "";
  const mainVisualUrl = cmsHeroImageUrl || platformImageUrl;
  const mainVisualAlt = hasCmsHero
    ? cmsHero?.image?.alt?.trim() || heroHeadline || "Imagem principal da 4unik"
    : h.platformImage?.alt?.trim() || `${h.brand} platform preview`;
  const narrativeEyebrow =
    locale === "pt"
      ? "Da campanha ao presente na porta de casa"
      : "From campaign to gift at the doorstep";
  const narrativePanelTitle =
    locale === "pt"
      ? "Logística própria automatizada ou integrada à sua operação — você escolhe. O time só vê reconhecimento que chega."
      : "Our automated fulfillment—or yours, connected by API. Employees just see recognition that shows up.";
  const heroProofItems = [
    {
      label: h.floatAdhesion,
      value: h.floatAdhesionValue,
    },
    {
      label: h.floatRh,
      value: h.floatRhValue,
    },
    {
      label: h.floatEnps,
      value: h.floatEnpsValue,
    },
  ];

  return (
    <section className="hero-theme-section relative overflow-hidden bg-brand-navy-dark pb-20 pt-24 sm:pb-24 sm:pt-28 md:pb-28 md:pt-32">
      <HeroThemeBackdrop theme="home" />
      <div className="absolute inset-0 z-0">
        <div className="absolute left-[8%] top-[10%] h-72 w-72 rounded-full bg-brand-orange/18 blur-[110px] mix-blend-screen" />
        <div className="absolute right-[6%] top-[12%] h-[420px] w-[420px] rounded-full bg-unik-blue/18 blur-[135px] mix-blend-screen" />
        <div className="absolute bottom-[8%] left-[35%] h-64 w-64 rounded-full bg-demo-cyan/12 blur-[95px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%)]" />
        <div className="absolute bottom-0 left-0 right-0 z-10 h-1/2 bg-linear-to-t from-brand-navy-dark to-transparent" />

        <svg className="pointer-events-none absolute inset-0 z-1 h-full w-full opacity-20">
          <path d="M 10 200 C 300 100, 400 400, 800 300 S 1200 100, 1600 250" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
          <path d="M 50 300 C 250 200, 350 500, 750 400 S 1100 200, 1500 350" stroke="rgba(249,115,22,0.15)" strokeWidth="1" fill="none" />
          <circle cx="0" cy="0" r="2" fill="#F97316" className="animate-[float_8s_linear_infinite]">
            <animateMotion dur="8s" repeatCount="indefinite" path="M 10 200 C 300 100, 400 400, 800 300 S 1200 100, 1600 250" />
          </circle>
          <circle cx="0" cy="0" r="3" fill="#e75782" className="animate-[float_10s_linear_infinite_2s]">
            <animateMotion dur="10s" repeatCount="indefinite" path="M 50 300 C 250 200, 350 500, 750 400 S 1100 200, 1500 350" />
          </circle>
        </svg>

        <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWNDBoLTQweiBNMzkuNSAwSDQwdjQwaC0uNXoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] bg-repeat opacity-50"></div>
      </div>

      <div className="relative z-10 container mx-auto grid items-center gap-10 px-4 sm:gap-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_560px] lg:px-8">
        <div className="mx-auto max-w-4xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm sm:mb-6 sm:px-4"
          >
            <Sparkles className="h-3 w-3 shrink-0 text-brand-orange sm:h-3.5 sm:w-3.5" />
            <span className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white/80 sm:text-[0.72rem] sm:tracking-[0.24em]">
              {h.badge}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mb-4 hidden justify-center sm:mb-6 sm:flex lg:justify-start"
          >
            <UnikWordmark
              variant="hero"
              alt="4unik"
              className="mx-0 drop-shadow-[0_10px_30px_rgba(143,211,255,0.14)]"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-5 font-heading text-[2.35rem] font-black leading-[0.98] tracking-tight text-white sm:mb-6 sm:text-6xl md:text-7xl lg:text-[5.2rem]"
          >
            {hasCmsHero ? (
              heroHeadline
            ) : (
              <>
                <span className="block text-white">
                  <strong className="text-unik-blue-soft">{h.brand}</strong> {h.afterBrand}
                </span>
                <span className="block text-gradient-hero">{h.line1b}</span>
                <span className="mt-2 block text-[1.75rem] leading-[1.02] text-white/92 sm:mt-3 sm:text-5xl md:text-6xl">
                  {h.line2}
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-6 max-w-2xl font-sans text-base font-light leading-relaxed text-white/72 sm:mb-8 sm:text-lg md:text-[1.45rem]"
          >
            {heroSubheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start"
          >
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-bold text-brand-navy-dark shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all hover:bg-brand-orange hover:text-white hover:shadow-[0_0_60px_rgba(249,115,22,0.4)] sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a
              href={exploreHref}
              className="w-full rounded-full border border-white/20 px-6 py-3.5 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            >
              {h.ctaExplore}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:justify-center lg:justify-start"
          >
            {heroProofItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left backdrop-blur-sm last:col-span-2 sm:rounded-full sm:px-4 sm:py-2 sm:last:col-span-1"
              >
                <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/50">
                  {item.label}
                </span>
                <span className="mt-1 block text-base font-semibold text-white">
                  {item.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative mx-auto mt-2 w-full max-w-[560px] sm:mt-0"
        >
          {mainVisualUrl ? (
            <>
              <div className="absolute inset-0 rounded-[2.2rem] bg-linear-to-br from-brand-orange/20 via-unik-blue/18 to-demo-cyan/18 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md">
                <div className="border-b border-white/10 bg-white/5 px-4 py-3 sm:px-5 sm:py-4">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-brand-orange/90 sm:text-[0.68rem] sm:tracking-[0.24em]">
                    {narrativeEyebrow}
                  </span>
                  <p className="mt-2 max-w-md text-base font-semibold text-white sm:text-lg md:text-xl">
                    {narrativePanelTitle}
                  </p>
                </div>
                <div className="p-2 sm:p-3">
                  <Image
                    src={mainVisualUrl}
                    alt={mainVisualAlt}
                    width={1120}
                    height={760}
                    sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, 92vw"
                    className="h-full w-full rounded-[1.4rem] object-cover object-[50%_16%]"
                    priority
                    fetchPriority="high"
                    decoding="async"
                    unoptimized
                  />
                </div>
              </div>
            </>
            ) : (
              <FeatureScreensCarousel variant="member" locale={locale} />
            )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="glass-panel-dark absolute -top-5 right-4 z-10 hidden min-w-[170px] rounded-2xl px-5 py-4 md:block"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              {h.floatAdhesion}
            </span>
            <span className="mt-1 block text-3xl font-bold text-white">{h.floatAdhesionValue}</span>
            <span className="text-[10px] text-green-400">{h.floatAdhesionSub}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.8 }}
            className="glass-panel-dark absolute bottom-6 -left-4 z-10 hidden min-w-[190px] rounded-2xl px-5 py-4 md:block"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-yoobe-neon-pink">
              {h.floatRh}
            </span>
            <span className="mt-1 block text-3xl font-bold text-white">{h.floatRhValue}</span>
            <span className="text-[10px] text-white/55">{h.floatRhSub}</span>
          </motion.div>

          {supportingImageUrl ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.84, duration: 0.8 }}
              className="absolute -bottom-8 right-4 w-full max-w-[180px] overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/5 p-2 shadow-xl backdrop-blur-sm sm:-bottom-12 sm:right-6 sm:max-w-[260px]"
            >
              <div className="mb-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-blue-300">
                  {h.floatEnps}
                </span>
                <span className="mt-1 block text-lg font-semibold text-white">{h.floatEnpsValue}</span>
              </div>
              <div className="overflow-hidden rounded-[1.1rem]">
                <Image
                  src={supportingImageUrl}
                  alt={h.supportingImage?.alt?.trim() || `${h.brand} supporting mockup`}
                  width={SANITY_HOME_HERO_SUPPORTING_WIDTH}
                  height={520}
                  sizes="(min-width: 1024px) 260px, 45vw"
                  className="h-full w-full rounded-[1.2rem] object-cover object-[52%_18%]"
                  decoding="async"
                  loading="lazy"
                  unoptimized
                />
              </div>
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
