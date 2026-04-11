import type { PlatformFeaturePageContent } from "@/content/platformFeaturePages";
import { withBasePath } from "@/lib/basePath";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

type Props = {
  content: PlatformFeaturePageContent;
};

function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

export default function PlatformFeaturePage({ content }: Props) {
  return (
    <div className="min-h-screen bg-brand-navy-dark text-white">
      <section className="relative overflow-hidden border-b border-white/5 pt-32 pb-18">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,143,22,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(96,165,250,0.10),transparent_24%)]" />
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={content.backHref}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {content.backLabel}
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70">
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
                {content.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-white/8 bg-white/4 p-5 backdrop-blur-sm"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
                      {stat.label}
                    </div>
                    <div className="mt-3 text-2xl font-black text-white">{stat.value}</div>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-linear-to-r from-brand-orange/20 via-unik-blue/15 to-demo-cyan/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface-panel shadow-2xl">
                <div className="relative aspect-16/10 w-full">
                  <Image
                    src={withBasePath(content.imageSrc)}
                    alt={content.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 py-18">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-black md:text-4xl">{content.capabilitiesTitle}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {content.capabilities.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] border border-white/8 bg-surface-panel p-6 transition-colors hover:border-brand-orange/25"
                >
                  <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3">
                    <Icon className="h-6 w-6 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-white/58">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 py-18">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-black md:text-4xl">{content.workflowTitle}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {content.workflow.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[1.75rem] border border-white/8 bg-white/4 p-6"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-brand-orange/30 bg-brand-orange/12 text-sm font-bold text-brand-orange">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/58">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 py-18">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-black md:text-4xl">{content.galleryTitle}</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {content.gallery.map((item) => (
              <div
                key={item.src}
                className="overflow-hidden rounded-[1.75rem] border border-white/8 bg-surface-panel"
              >
                <div className="relative aspect-16/10 w-full">
                  <Image
                    src={withBasePath(item.src)}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed text-white/60">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-18">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/8 bg-linear-to-r from-white/6 to-white/3 p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-black md:text-4xl">{content.ctaTitle}</h2>
                <p className="mt-4 text-lg leading-relaxed text-white/62">{content.ctaBody}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                {isExternalHref(content.primaryCtaHref) ? (
                  <a
                    href={content.primaryCtaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy-dark transition-transform hover:-translate-y-0.5"
                  >
                    {content.primaryCtaLabel}
                    <ExternalLink className="h-4 w-4" />
                  </a>
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
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:text-white"
                >
                  {content.secondaryCtaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
