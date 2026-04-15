"use client";
/* eslint-disable @next/next/no-img-element */

import LeadCaptureForm from "@/components/LeadCaptureForm";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { PRIMARY_CONTACT_SECTION_ID } from "@/lib/contactAnchor";
import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  CheckCircle2,
  Coins,
  Globe2,
  LayoutGrid,
  Link2,
  Megaphone,
  MessageSquare,
  Package,
  Sparkles,
  Store,
  Users,
  Zap,
} from "lucide-react";
import { withBasePath } from "@/lib/basePath";
import YoobeMark from "@/components/YoobeMark";
import { cn } from "@/lib/utils";
import {
  type WorkvivoLocale,
  type WorkvivoCopy,
  workvivoContent,
} from "@/content/workvivo";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { SanityImageDoc, WorkvivoShowcaseMediaDoc } from "@/sanity/lib/types";

function shotUrl(
  showcase: WorkvivoShowcaseMediaDoc | null | undefined,
  field:
    | "heroImage"
    | "commsImage"
    | "intelligenceImage"
    | "frontlineImage"
    | "shoutoutImage",
  fallbackPublicPath: string,
): string {
  const focalByField: Record<typeof field, { x: number; y: number }> = {
    heroImage: { x: 0.5, y: 0.16 },
    commsImage: { x: 0.5, y: 0.16 },
    intelligenceImage: { x: 0.5, y: 0.16 },
    frontlineImage: { x: 0.5, y: 0.2 },
    shoutoutImage: { x: 0.5, y: 0.15 },
  };
  const url = getSanityImageUrl(showcase?.[field] as SanityImageDoc | null | undefined, {
    width: 1600,
    height: 1000,
    fit: "crop",
    crop: "focalpoint",
    focalPoint: focalByField[field],
    quality: 86,
  });
  return url ?? withBasePath(fallbackPublicPath);
}

const CALENDLY = "https://calendly.com/yoobeco/demo";
const WHATSAPP = "https://wa.me/554187582060";

const PILLAR_ICONS = [MessageSquare, Users, LayoutGrid, BarChart2];

const STEP_ICONS: Record<string, React.ElementType> = {
  megaphone: Megaphone,
  coins: Coins,
  store: Store,
  package: Package,
};

type Props = {
  locale: WorkvivoLocale;
  /** Quando true, a página está sob /api-integracoes (subnav já ocupa o topo). */
  apiHub?: boolean;
  content?: WorkvivoCopy;
  /** Imagens opcionais do Sanity; se ausentes, usam-se os ficheiros em /public/workvivo/. */
  showcaseMedia?: WorkvivoShowcaseMediaDoc | null;
};

const WORKVIVO_GRID_SHOTS = [
  { field: "heroImage" as const, fallback: "/workvivo/workvivo-hero.webp", label: "Feed & AI Companion" },
  { field: "commsImage" as const, fallback: "/workvivo/workvivo-comms.webp", label: "Comms Orchestration" },
  { field: "intelligenceImage" as const, fallback: "/workvivo/workvivo-intelligence.webp", label: "People Intelligence" },
  { field: "frontlineImage" as const, fallback: "/workvivo/workvivo-frontline.webp", label: "Frontline App" },
] as const;

export default function WorkvivoLanding({ locale, apiHub = false, content, showcaseMedia = null }: Props) {
  const { path, m } = useLocaleMessages();
  const c = content ?? workvivoContent[locale];
  const lf = m.leadForm;

  return (
    <div className="min-h-screen bg-brand-navy-dark text-white">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
          className={cn(
            "relative overflow-hidden border-b border-white/5",
            apiHub ? "pt-8 pb-12 md:pt-10 md:pb-16" : "pt-28 pb-16 md:pt-36 md:pb-20",
          )}
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[min(90vw,560px)] h-[560px] bg-yoobe-purple/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[min(80vw,480px)] h-[480px] bg-brand-orange/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <span className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-orange">
              {c.heroBadge}
            </span>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <span className="hidden sm:inline">{c.langLabel}</span>
              <Link
                href={c.otherLocalePath}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/90 hover:bg-white/10 transition-colors"
              >
                {c.otherLocaleLabel}
                <ArrowRight className="w-4 h-4 opacity-70" />
              </Link>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-balance leading-tight mb-6">
            {c.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed mb-4">
            {c.heroSubtitle}
          </p>
          <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-brand-orange to-yoobe-neon-pink mb-8 font-heading">
            {c.tagline}
          </p>

          {/* Partner logos strip */}
          <div className="mb-10 rounded-2xl border border-white/10 border-t-2 border-t-yoobe-blue/60 bg-linear-to-b from-yoobe-blue/12 to-white/4 px-5 py-6 md:px-8 md:py-7 shadow-[0_0_60px_-12px_rgba(30,58,95,0.35)] backdrop-blur-sm">
            <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/45 mb-5">
              {c.partnersLabel}
            </p>
            <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-8 md:gap-x-12 md:gap-y-8 lg:gap-x-16">
              <a
                href="https://www.workvivo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center justify-center opacity-95 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange rounded-lg"
              >
                <img
                  src={withBasePath("/partners/workvivo-logo-white.svg")}
                  alt={c.workvivoLogoAlt}
                  className="h-9 w-auto max-w-[200px] object-contain object-left md:h-10"
                  width={166}
                  height={50}
                />
              </a>
              <span className="hidden text-2xl font-light text-yoobe-blue/40 sm:block" aria-hidden>·</span>
              <a
                href="https://www.zoom.us/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center justify-center opacity-95 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b5cff] rounded-lg"
              >
                <img
                  src={withBasePath("/partners/zoom-logo.svg")}
                  alt={c.zoomLogoAlt}
                  className="h-7 w-auto max-w-[120px] object-contain brightness-0 invert opacity-[0.92] md:h-8"
                  width={91}
                  height={21}
                />
              </a>
              <span className="hidden text-2xl font-light text-yoobe-blue/40 sm:block" aria-hidden>·</span>
              <a
                href={c.flouiSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center justify-center opacity-95 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400/80 rounded-lg"
              >
                <img
                  src={withBasePath("/partners/floui-logo.svg")}
                  alt={c.flouiLogoAlt}
                  className="h-7 w-auto max-w-[140px] object-contain md:h-8"
                  width={120}
                  height={32}
                />
              </a>
              <span className="hidden text-2xl font-light text-yoobe-blue/40 sm:block" aria-hidden>·</span>
              <div className="flex flex-col items-center gap-2 shrink-0">
                <YoobeMark
                  className="h-11 w-11 md:h-12 md:w-12"
                  aria-label={c.yoobeMarkAlt}
                  title={c.yoobeMarkAlt}
                />
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-yoobe-blue/90">
                  {c.partnersStripHint}
                </span>
              </div>
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-white/55">
              {c.partnersCaption}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-yoobe-purple px-8 font-bold text-white shadow-lg shadow-yoobe-purple/25 hover:bg-yoobe-purple/90 transition-colors"
            >
              {c.ctaDemo}
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 font-bold text-white hover:bg-white/10 transition-colors"
            >
              {c.ctaWhatsapp}
            </a>
          </div>
        </div>
      </section>

      {/* ── A. O que é o Workvivo ────────────────────────────────────── */}
      <section className="py-14 md:py-18 border-b border-white/5 bg-surface-page/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-yoobe-purple" />
              Workvivo by Zoom
            </div>
            <h2 className="text-2xl md:text-3xl font-black font-heading text-white mb-3">
              {c.whatIsWorkvivoTitle}
            </h2>
            <p className="text-white/60 leading-relaxed">{c.whatIsWorkvivoBody}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {c.workvivoPillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <div
                  key={pillar.title}
                  className="glass-panel-dark rounded-2xl border border-white/8 p-5 flex flex-col gap-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yoobe-purple/15 border border-yoobe-purple/20">
                    <Icon className="w-5 h-5 text-yoobe-purple" />
                  </div>
                  <h3 className="font-bold font-heading text-white text-sm">{pillar.title}</h3>
                  <p className="text-xs text-white/55 leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>

          {/* Workvivo UI screenshots — visual proof of the platform */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WORKVIVO_GRID_SHOTS.map((shot) => (
              <figure
                key={shot.field}
                className="overflow-hidden rounded-2xl border border-white/10 bg-brand-navy-dark/50 shadow-lg shadow-black/20"
              >
                <img
                  src={shotUrl(showcaseMedia, shot.field, shot.fallback)}
                  alt={`Workvivo — ${shot.label}`}
                  className="w-full aspect-video object-cover object-[50%_16%]"
                  loading="lazy"
                  width={800}
                  height={450}
                />
                <figcaption className="border-t border-white/8 px-3 py-2 text-center text-[0.65rem] font-semibold uppercase tracking-wider text-white/40">
                  {shot.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── B. A lacuna (gap) ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-4xl font-black font-heading text-white mb-4">
              {c.gapTitle}
            </h2>
            <p className="text-white/60 leading-relaxed">{c.gapBody}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-0 md:rounded-3xl md:overflow-hidden md:border md:border-white/10">
            {/* Left: what Workvivo delivers */}
            <div className="rounded-3xl md:rounded-none border border-white/10 md:border-0 bg-white/4 p-8 md:border-r md:border-white/10">
              <div className="flex items-center gap-3 mb-5">
                <img
                  src={withBasePath("/partners/workvivo-logo-white.svg")}
                  alt={c.workvivoLogoAlt}
                  className="h-7 w-auto max-w-[140px] object-contain"
                  loading="lazy"
                  width={140}
                  height={36}
                />
              </div>
              {/* Workvivo shoutout screenshot */}
              <figure className="mb-5 overflow-hidden rounded-xl border border-white/10 shadow-md">
                <img
                  src={shotUrl(showcaseMedia, "shoutoutImage", "/workvivo/workvivo-desktop-shoutout.webp")}
                  alt="Workvivo — shoutout posted in the feed"
                  className="w-full aspect-video object-cover object-[50%_15%]"
                  loading="lazy"
                  width={800}
                  height={450}
                />
              </figure>
              {getSanityImageUrl(showcaseMedia?.feedShoutoutImage, { width: 1600, height: 1000, fit: "crop", crop: "focalpoint", focalPoint: { x: 0.5, y: 0.15 }, quality: 86 }) ? (
                <figure className="mb-5 overflow-hidden rounded-xl border border-white/10 shadow-md">
                  <img
                    src={getSanityImageUrl(showcaseMedia?.feedShoutoutImage, { width: 1600, height: 1000, fit: "crop", crop: "focalpoint", focalPoint: { x: 0.5, y: 0.15 }, quality: 86 }) ?? ""}
                    alt={
                      showcaseMedia?.feedShoutoutImage?.alt?.trim() ||
                      "Workvivo — shoutout no feed (modo claro)"
                    }
                    className="w-full aspect-video object-cover object-[50%_15%]"
                    loading="lazy"
                    width={800}
                    height={450}
                  />
                </figure>
              ) : null}
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
                {c.gapWorkvivoLabel}
              </p>
              <ul className="space-y-3">
                {c.gapWorkvivoItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/75">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-yoobe-purple/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: what 4Unik adds */}
            <div className="rounded-3xl md:rounded-none border border-brand-orange/25 bg-linear-to-br from-brand-orange/10 to-yoobe-neon-pink/5 p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 rounded-full bg-brand-orange/15 border border-brand-orange/25 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-brand-orange">
                Add-on
              </div>
              <div className="flex items-center gap-3 mb-6">
                <YoobeMark className="h-8 w-8" aria-hidden />
                <span className="font-black font-heading text-white text-lg">4Unik</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange/70 mb-4">
                {c.gapAddonLabel}
              </p>
              <ul className="space-y-3">
                {c.gapAddonItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-brand-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── C. Gatilhos ──────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 border-b border-white/5 bg-surface-page/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-black font-heading text-white mb-3">
              {c.triggersTitle}
            </h2>
            <p className="text-white/60 leading-relaxed">{c.triggersBody}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.triggers.map((trigger) => (
              <div
                key={trigger.event}
                className="glass-panel-dark rounded-2xl border border-white/10 p-5 flex flex-col gap-3 hover:border-brand-orange/30 transition-colors"
              >
                <p className="text-sm font-semibold text-white/90 leading-snug">{trigger.event}</p>
                <div className="flex items-center gap-1.5">
                  <ArrowRight className="w-4 h-4 text-brand-orange shrink-0" />
                </div>
                <p className="text-sm text-brand-orange font-semibold leading-snug">
                  {trigger.result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global strip ─────────────────────────────────────────────── */}
      <section className="border-b border-white/5 bg-surface-page/80">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 border border-cyan-500/25">
                <Globe2 className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-lg font-bold font-heading text-white">{c.globalTitle}</h2>
            </div>
            <div className="flex-1">
              <p className="text-white/70 leading-relaxed mb-3">{c.globalBody}</p>
              <div className="flex flex-wrap gap-2">
                {c.globalRegions.map((region) => (
                  <span
                    key={region}
                    className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/85"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillars ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 border-b border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-4xl font-black font-heading text-center mb-12">
            {c.pillarsTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {c.pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="glass-panel-dark rounded-3xl border border-white/10 p-8 hover:border-brand-orange/30 transition-colors"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange/15 border border-brand-orange/25">
                  {i === 0 ? (
                    <Store className="w-6 h-6 text-brand-orange" />
                  ) : i === 1 ? (
                    <Coins className="w-6 h-6 text-brand-orange" />
                  ) : (
                    <Zap className="w-6 h-6 text-brand-orange" />
                  )}
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">{pillar.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── D. Integration flow (visual) ─────────────────────────────── */}
      <section className="py-16 md:py-20 border-t border-white/5 bg-surface-page/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Workvivo × 4Unik
            </div>
            <h2 className="text-2xl md:text-4xl font-black font-heading mb-4">
              {c.integrationTitle}
            </h2>
            <p className="text-white/55">{c.integrationSubtitle}</p>
          </div>

          {/* Desktop: horizontal flow with arrow connectors */}
          <div className="hidden lg:flex items-stretch gap-0">
            {c.integrationSteps.map((step, index) => {
              const Icon = STEP_ICONS[step.icon] ?? Sparkles;
              const isLast = index === c.integrationSteps.length - 1;
              return (
                <div key={step.title} className="flex items-center flex-1 min-w-0">
                  <div className="flex-1 glass-panel-dark rounded-2xl border border-white/10 p-6 flex flex-col h-full min-h-[200px]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-orange/15 border border-brand-orange/25">
                        <Icon className="w-5 h-5 text-brand-orange" />
                      </div>
                      <span className="text-2xl font-black text-white/10 font-heading tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-bold font-heading text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed flex-1">{step.description}</p>
                  </div>
                  {!isLast && (
                    <div className="flex items-center justify-center w-8 shrink-0">
                      <ArrowRight className="w-5 h-5 text-brand-orange/50" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile: vertical stack */}
          <div className="flex flex-col gap-3 lg:hidden">
            {c.integrationSteps.map((step, index) => {
              const Icon = STEP_ICONS[step.icon] ?? Sparkles;
              const isLast = index === c.integrationSteps.length - 1;
              return (
                <div key={step.title}>
                  <div className="glass-panel-dark rounded-2xl border border-white/10 p-5 flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange/15 border border-brand-orange/25">
                      <Icon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-black text-white/10 font-heading tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-bold font-heading text-white">{step.title}</h3>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                  {!isLast && (
                    <div className="flex justify-center py-1">
                      <ArrowRight className="w-4 h-4 text-brand-orange/40 rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Floui orchestration ──────────────────────────────────────── */}
      <section className="py-16 md:py-20 border-b border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <figure className="order-2 overflow-hidden rounded-2xl border border-white/10 bg-brand-navy-dark/50 shadow-lg shadow-black/20 lg:order-1">
              <img
                src={withBasePath("/workvivo/floui-motivo-ui.webp")}
                alt={c.orchestrationImageAlt}
                className="w-full object-cover object-top"
                loading="lazy"
                width={1200}
                height={750}
              />
              <figcaption className="border-t border-white/10 px-4 py-3 text-center text-xs text-white/55">
                {c.orchestrationImageCaption}
              </figcaption>
            </figure>
            <div className="order-1 lg:order-2">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/50">
                {c.orchestrationEyebrow}
              </div>
              <h2 className="mb-4 text-2xl font-black font-heading text-white md:text-4xl">
                {c.orchestrationTitle}
              </h2>
              <p className="mb-8 leading-relaxed text-white/60">{c.orchestrationBody}</p>
              <a
                href={c.flouiSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
              >
                <img
                  src={withBasePath("/partners/floui-logo.svg")}
                  alt={c.flouiLogoAlt}
                  className="h-8 w-auto shrink-0 object-contain md:h-9"
                  width={120}
                  height={36}
                />
                <span className="min-w-0 flex-1 font-semibold text-white">{c.flouiSiteLabel}</span>
                <ArrowRight className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Case PRIO (before Prio Store gallery) ────────────────────── */}
      <section className="border-b border-white/5 bg-surface-page/30 py-12 md:py-14">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="rounded-3xl border border-brand-orange/20 bg-linear-to-br from-brand-orange/10 to-transparent p-8 md:p-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-orange/80">
              {c.caseStripEyebrow}
            </p>
            <h2 className="mb-4 text-xl font-black font-heading text-white md:text-2xl">
              {c.casePrioTitle}
            </h2>
            <p className="leading-relaxed text-white/65">{c.casePrioBody}</p>
          </div>
        </div>
      </section>

      {/* ── Store showcase (Prio Store) ──────────────────────────────── */}
      <section className="py-16 md:py-20 border-b border-white/5 bg-surface-page/40">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-black font-heading mb-4">
              {c.storeShowcaseTitle}
            </h2>
            <p className="text-white/60 leading-relaxed">{c.storeShowcaseBody}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            {c.storeGallery.map((shot) => (
              <figure
                key={shot.file}
                className="overflow-hidden rounded-2xl border border-white/10 bg-brand-navy-dark/50 shadow-lg shadow-black/20"
              >
                <img
                  src={withBasePath(`/workvivo/${shot.file}`)}
                  alt={shot.alt}
                  className="aspect-16/10 w-full object-cover object-top"
                  loading="lazy"
                  width={1400}
                  height={900}
                />
                <figcaption className="border-t border-white/10 px-3 py-2.5 text-center text-xs text-white/55">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <a
              href="https://priostore.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-yoobe-blue/40 bg-yoobe-blue/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-yoobe-blue/25 transition-colors"
            >
              {c.storeExampleLinkLabel}
              <ArrowRight className="w-4 h-4 opacity-80" />
            </a>
            <p className="max-w-2xl text-xs text-white/40 leading-relaxed">
              {c.storeExampleDisclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* ── Two paths ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-yoobe-purple/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl md:text-4xl font-black font-heading mb-4">
              {c.pathsSectionTitle}
            </h2>
            <p className="text-white/60 leading-relaxed">{c.pathsSectionSubtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-panel-dark rounded-3xl border border-white/10 p-8 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <Package className="w-8 h-8 text-yoobe-neon-pink" />
                <h3 className="text-xl font-bold font-heading">{c.pathA.title}</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{c.pathA.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {c.pathA.bullets.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-white/75">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-yoobe-neon-pink mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <span className="font-semibold text-white">{c.pathA.whenLabel}</span>
                <span className="text-white/60"> — {c.pathA.whenText}</span>
              </div>
            </div>

            <div className="glass-panel-dark rounded-3xl border border-yoobe-purple/25 p-8 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <Link2 className="w-8 h-8 text-yoobe-purple" />
                <h3 className="text-xl font-bold font-heading">{c.pathB.title}</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{c.pathB.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {c.pathB.bullets.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-white/75">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-yoobe-purple mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl border border-yoobe-purple/20 bg-yoobe-purple/10 p-4 text-sm">
                <span className="font-semibold text-white">{c.pathB.whenLabel}</span>
                <span className="text-white/60"> — {c.pathB.whenText}</span>
              </div>
              <Link
                href={path("/api-integracoes/")}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
              >
                {c.apiLearnMore}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Costs ────────────────────────────────────────────────────── */}
      <section id="custos" className="py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-black font-heading text-center mb-6">
            {c.costsTitle}
          </h2>
          <p className="text-white/65 text-center leading-relaxed mb-10">{c.costsIntro}</p>

          <ul className="space-y-3 mb-10">
            {c.costsFactors.map((factor) => (
              <li
                key={factor}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                {factor}
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 mb-6">
            <h3 className="font-bold font-heading text-emerald-300/90 mb-2">
              {c.costsReferenceTitle}
            </h3>
            <p className="text-sm text-white/60 mb-4">{c.costsReferenceBody}</p>
            <Link
              href={path("/#planos")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
            >
              {c.costsReferenceLink}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-center text-sm text-white/45">{c.costsDisclaimer}</p>
        </div>
      </section>

      {/* ── Final CTA + lead form ────────────────────────────────────── */}
      <section
        id={PRIMARY_CONTACT_SECTION_ID}
        className="py-20 border-t border-white/5 bg-linear-to-b from-transparent to-brand-navy-dark/80"
      >
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-4xl font-black font-heading mb-4">{c.finalTitle}</h2>
          <p className="text-white/60 mb-8 leading-relaxed">{c.finalSubtitle}</p>
          <div className="mx-auto mb-10 max-w-lg text-left">
            <LeadCaptureForm variant="api" source="workvivo" className="w-full" />
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/45">
            {lf.altCalendly}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-xl bg-brand-orange px-8 font-bold text-white shadow-lg shadow-brand-orange/20 hover:bg-brand-orange-dark transition-colors"
            >
              {c.ctaDemo}
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 font-bold text-white hover:bg-white/10 transition-colors"
            >
              {c.ctaWhatsapp}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
