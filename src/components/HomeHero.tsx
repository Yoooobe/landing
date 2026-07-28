"use client";

import TrackedOutboundLink from "@/components/analytics/TrackedOutboundLink";
import FeatureScreensCarousel from "@/components/FeatureScreensCarousel";
import HeroThemeBackdrop from "@/components/HeroThemeBackdrop";
import UnikWordmark from "@/components/UnikWordmark";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { BASE_PATH, withBasePath } from "@/lib/basePath";
import { DEFAULT_CALENDLY_URL } from "@/lib/calendly";
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

const enterTransition = { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };

export default function HomeHero({ cmsHero = null, homeContent = null }: Props) {
  const { locale, m, path } = useLocaleMessages();
  const defaultExploreHref = withBasePath(path("/#platform"));
  const h = homeContent?.hero ?? {
    ...m.home.hero,
    ctaDemoHref: DEFAULT_CALENDLY_URL,
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
    ? cmsHero?.ctaLink?.trim() || h.ctaDemoHref || DEFAULT_CALENDLY_URL
    : h.ctaDemoHref || DEFAULT_CALENDLY_URL;
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
        <div className="absolute left-[10%] top-[12%] h-72 w-72 rounded-full bg-brand-orange/14 blur-[100px]" />
        <div className="absolute right-[8%] top-[18%] h-80 w-80 rounded-full bg-unik-blue/12 blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_38%)]" />
        <div className="absolute bottom-0 left-0 right-0 z-10 h-1/2 bg-linear-to-t from-brand-navy-dark to-transparent" />
        <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWNDBoLTQweiBNMzkuNSAwSDQwdjQwaC0uNXoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] bg-repeat opacity-40" />
      </div>

      <div className="relative z-10 container mx-auto grid items-center gap-10 px-4 sm:gap-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_560px] lg:px-8">
        <div className="mx-auto max-w-4xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enterTransition}
            className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm sm:mb-6 sm:px-4"
          >
            <Sparkles className="h-3 w-3 shrink-0 text-brand-orange sm:h-3.5 sm:w-3.5" />
            <span className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white/80 sm:text-[0.72rem] sm:tracking-[0.24em]">
              {h.badge}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: 0.04 }}
            className="mb-4 hidden justify-center sm:mb-6 sm:flex lg:justify-start"
          >
            <UnikWordmark
              variant="hero"
              alt="4Unik"
              className="mx-0"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: 0.06 }}
            className="mb-5 font-heading text-[2.35rem] font-black leading-[1.05] tracking-tight text-white sm:mb-6 sm:text-6xl md:text-7xl lg:text-[5.2rem]"
          >
            {hasCmsHero ? (
              heroHeadline
            ) : (
              <>
                <span className="block text-white">
                  <strong className="text-unik-blue-soft">{h.brand}</strong> {h.afterBrand}
                </span>
                <span className="block pb-1 text-gradient-hero">{h.line1b}</span>
                <span className="mt-2 block text-[1.75rem] leading-[1.02] text-white/92 sm:mt-3 sm:text-5xl md:text-6xl">
                  {h.line2}
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: 0.1 }}
            className="mb-6 max-w-2xl font-sans text-base font-light leading-relaxed text-white/72 sm:mb-8 sm:text-lg md:text-[1.45rem]"
          >
            {heroSubheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: 0.14 }}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start"
          >
            <TrackedOutboundLink
              href={primaryHref}
              source="home-hero-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 text-base font-bold text-white transition-all duration-200 hover:bg-brand-gradient-hover sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </TrackedOutboundLink>
            <a
              href={exploreHref}
              className="w-full rounded-full border border-white/20 px-6 py-3.5 text-base font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:border-brand-orange/35 hover:bg-white/10 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            >
              {h.ctaExplore}
            </a>
          </motion.div>
          {m.home.hero.ctaDemoHint ? (
            <p className="mt-3 text-center text-xs text-white/55 lg:text-left">{m.home.hero.ctaDemoHint}</p>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: 0.18 }}
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
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...enterTransition, delay: 0.12 }}
          className="relative mx-auto mt-2 w-full max-w-[560px] sm:mt-0"
        >
          {mainVisualUrl ? (
            <>
              <div className="absolute inset-0 rounded-[2.2rem] bg-brand-orange/12 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/5 shadow-xl backdrop-blur-md">
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: 0.22 }}
            className="glass-panel-dark absolute -top-5 right-4 z-10 hidden min-w-[170px] rounded-2xl px-5 py-4 transition-transform duration-200 hover:-translate-y-0.5 md:block"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              {h.floatAdhesion}
            </span>
            <span className="mt-1 block text-3xl font-bold text-white">{h.floatAdhesionValue}</span>
            <span className="text-[10px] text-white/55">{h.floatAdhesionSub}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: 0.26 }}
            className="glass-panel-dark absolute bottom-6 -left-4 z-10 hidden min-w-[190px] rounded-2xl px-5 py-4 transition-transform duration-200 hover:-translate-y-0.5 md:block"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              {h.floatRh}
            </span>
            <span className="mt-1 block text-3xl font-bold text-white">{h.floatRhValue}</span>
            <span className="text-[10px] text-white/55">{h.floatRhSub}</span>
          </motion.div>

          {supportingImageUrl ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...enterTransition, delay: 0.3 }}
              className="absolute -bottom-8 right-4 w-full max-w-[180px] overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/5 p-2 shadow-lg backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 sm:-bottom-12 sm:right-6 sm:max-w-[260px]"
            >
              <div className="mb-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-brand-orange/90">
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
