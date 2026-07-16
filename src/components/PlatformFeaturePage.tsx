import TrackedOutboundLink from "@/components/analytics/TrackedOutboundLink";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import FadeUp from "@/components/ui/FadeUp";
import FeatureFlowVideoPlayer from "@/components/ui/FeatureFlowVideoPlayer";
import ScreenshotCard from "@/components/ui/ScreenshotCard";
import type { PlatformFeaturePageContent } from "@/content/platformFeaturePages";
import { withBasePath } from "@/lib/basePath";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  content: PlatformFeaturePageContent;
  /** Passed to `LeadCaptureForm` `source` (e.g. `plataforma-loja-resgate`). */
  leadSource: string;
  /** Optional Sanity override for the hero screenshot (absolute URL). */
  heroImageOverride?: string | null;
  /** Optional Sanity overrides per gallery item (absolute URLs, index-aligned). */
  galleryOverrides?: ReadonlyArray<string | null | undefined>;
};

function resolveScreenshotSrc(override: string | null | undefined, fallback: string): string {
  return override ? override : withBasePath(fallback);
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

export default function PlatformFeaturePage({
  content,
  leadSource,
  heroImageOverride = null,
  galleryOverrides = [],
}: Props) {
  const hasWorkflowImages = content.workflow.some((step) => Boolean(step.imageSrc));

  return (
    <div className="min-h-screen bg-brand-navy-dark text-white">
      <section className="relative overflow-hidden border-b border-white/5 pt-32 pb-18">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,143,22,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(96,165,250,0.10),transparent_24%)]" />
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={content.backHref}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-md transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {content.backLabel}
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <FadeUp>
              <span className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 backdrop-blur-md">
                {content.badge}
              </span>
              <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
                {content.title}{" "}
                <span className="bg-linear-to-r from-brand-orange via-unik-blue-soft to-demo-cyan bg-clip-text text-transparent">
                  {content.highlight}
                </span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/65">
                {content.description}
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {content.stats.map((stat, i) => (
                  <FadeUp
                    key={stat.label}
                    delay={i * 0.08}
                    className="glass-panel-dark rounded-3xl border-t border-t-white/15 p-5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
                      {stat.label}
                    </div>
                    <div className="mt-3 text-2xl font-black text-white">{stat.value}</div>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{stat.detail}</p>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.1} className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-linear-to-r from-brand-orange/20 via-unik-blue/15 to-demo-cyan/20 blur-2xl" />
              <ScreenshotCard
                src={resolveScreenshotSrc(heroImageOverride, content.imageSrc)}
                alt={content.imageAlt}
                aspectRatio="16/10"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="relative"
                priority
              />
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 py-18">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-black md:text-4xl">{content.capabilitiesTitle}</h2>
          </FadeUp>
          <div className="grid gap-5 md:grid-cols-2">
            {content.capabilities.map((item, i) => {
              const Icon = item.icon;

              return (
                <FadeUp
                  key={item.title}
                  delay={i * 0.06}
                  className="glass-panel-dark rounded-[1.75rem] border-t border-t-white/12 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/30"
                >
                  <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                    <Icon className="h-6 w-6 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-white/58">{item.body}</p>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 py-18">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-black md:text-4xl">{content.workflowTitle}</h2>
          </FadeUp>
          <div
            className={`grid gap-4 ${
              hasWorkflowImages
                ? "md:grid-cols-2 xl:grid-cols-4"
                : "md:grid-cols-2 xl:grid-cols-4"
            }`}
          >
            {content.workflow.map((step, index) => (
              <FadeUp
                key={step.title}
                delay={index * 0.07}
                className="glass-panel-dark group overflow-hidden rounded-[1.75rem] border-t border-t-white/12 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.4)]"
              >
                {step.imageSrc ? (
                  <div className="relative aspect-16/10 w-full overflow-hidden border-b border-white/8 bg-[#0b0e14]">
                    <Image
                      src={withBasePath(step.imageSrc)}
                      alt={step.imageAlt ?? step.title}
                      fill
                      sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw"
                      className="object-contain object-top transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-brand-orange/30 bg-brand-orange/12 text-sm font-bold text-brand-orange backdrop-blur-sm">
                    0{index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/58">{step.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {content.video ? (
        <section className="border-b border-white/5 py-18">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <FadeUp className="mb-8 text-center">
              <h2 className="text-3xl font-black md:text-4xl">{content.video.title}</h2>
              {content.video.body ? (
                <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/55">
                  {content.video.body}
                </p>
              ) : null}
            </FadeUp>
            <FadeUp delay={0.08}>
              <FeatureFlowVideoPlayer
                title={content.video.title}
                body={content.video.body}
                playLabel={content.video.playLabel}
                webm={content.video.webm}
                mp4={content.video.mp4}
                poster={content.video.poster}
              />
            </FadeUp>
          </div>
        </section>
      ) : null}

      <section className="border-b border-white/5 py-18">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-black md:text-4xl">{content.galleryTitle}</h2>
          </FadeUp>
          <div
            className={`grid gap-6 ${
              content.gallery.length > 3
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : "lg:grid-cols-3"
            }`}
          >
            {content.gallery.map((item, index) => (
              <FadeUp key={item.src} delay={index * 0.06}>
                <ScreenshotCard
                  src={resolveScreenshotSrc(galleryOverrides[index], item.src)}
                  alt={item.alt}
                  aspectRatio="16/10"
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  caption={item.caption}
                  className="transition-transform duration-300 hover:-translate-y-1"
                />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="border-b border-white/5 py-18">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl">
            <LeadCaptureForm variant="plataforma" source={leadSource} className="w-full" />
          </div>
        </div>
      </section>

      <section className="py-18">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp className="glass-panel-dark rounded-[2rem] border-t border-t-white/15 bg-linear-to-r from-white/5 to-transparent p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-black md:text-4xl">{content.ctaTitle}</h2>
                <p className="mt-4 text-lg leading-relaxed text-white/62">{content.ctaBody}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                {isExternalHref(content.primaryCtaHref) ? (
                  <TrackedOutboundLink
                    href={content.primaryCtaHref}
                    source={`${leadSource}-primary`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy-dark transition-transform hover:-translate-y-0.5"
                  >
                    {content.primaryCtaLabel}
                    <ExternalLink className="h-4 w-4" />
                  </TrackedOutboundLink>
                ) : (
                  <Link
                    href={content.primaryCtaHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy-dark transition-transform hover:-translate-y-0.5"
                  >
                    {content.primaryCtaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
                <Link
                  href={content.secondaryCtaHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur-sm transition-colors hover:text-white"
                >
                  {content.secondaryCtaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
