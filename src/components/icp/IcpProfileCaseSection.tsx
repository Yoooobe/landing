"use client";

import ScreenshotCard from "@/components/ui/ScreenshotCard";
import type { IcpProfileVisual } from "@/config/icp-profile-visuals";
import { withBasePath } from "@/lib/basePath";
import type { IcpVerticalPage } from "@/lib/icpVerticalPages";
import { motion } from "framer-motion";
import Image from "next/image";

type CaseStudy = NonNullable<IcpVerticalPage["caseStudy"]>;

export default function IcpProfileCaseSection({
  caseStudy,
  visual,
}: {
  caseStudy: CaseStudy;
  visual: IcpProfileVisual;
}) {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-surface-base py-20 md:py-28">
      <div className="absolute -top-24 right-1/4 h-[420px] w-[420px] rounded-full bg-yoobe-purple/10 blur-[140px] pointer-events-none" />
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-28 items-center justify-center rounded-2xl border border-black/5 bg-white px-4 shadow-lg">
                <div className="relative h-9 w-full">
                  <Image
                    src={withBasePath(caseStudy.logoSrc)}
                    alt={caseStudy.logoAlt}
                    fill
                    sizes="112px"
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${visual.accentBorderClass} ${visual.accentBgClass} ${visual.accentTextClass}`}
              >
                {caseStudy.badge}
              </span>
            </div>

            <h2 className="font-heading text-3xl font-black leading-tight text-white md:text-4xl">
              {caseStudy.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/60">{caseStudy.body}</p>

            <dl className="mt-8 grid grid-cols-2 gap-4">
              {caseStudy.metrics.map((metric) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <dt className="sr-only">{metric.label}</dt>
                  <dd>
                    <span className={`block text-3xl font-black ${visual.accentTextClass}`}>
                      {metric.value}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-white/55">
                      {metric.label}
                    </span>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-5">
            {caseStudy.screenshots.map((shot) => (
              <ScreenshotCard
                key={shot.src}
                src={withBasePath(shot.src)}
                alt={shot.alt}
                aspectRatio="16/10"
                sizes="(min-width: 1024px) 45vw, 100vw"
                caption={shot.caption}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
