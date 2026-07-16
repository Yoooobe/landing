"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { withBasePath } from "@/lib/basePath";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { ResolvedHomeContent } from "@/sanity/lib/types";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function HowItWorks({
  homeContent = null,
}: {
  homeContent?: ResolvedHomeContent | null;
}) {
  const { m, path } = useLocaleMessages();
  const h = m.landingMore.howItWorks;
  const d = m.landingMore.duality;
  const steps = h.steps;
  const reduceMotion = useReducedMotion();
  const architectureImageUrl = getSanityImageUrl(
    homeContent?.showcaseMedia?.howItWorks?.architectureImage,
  );

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-surface-section py-24">
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mb-20 text-center text-white">
          <div className="mb-4 inline-block rounded-full border border-yoobe-neon-pink/30 bg-yoobe-neon-pink/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-yoobe-neon-pink">
            {h.badge}
          </div>
          <h2 className="mb-6 font-heading text-3xl font-black md:text-5xl">
            {h.titleBefore}{" "}
            <span className="bg-linear-to-r from-yoobe-neon-pink to-orange-500 bg-clip-text text-transparent">
              {h.titleGradient}
            </span>
            {h.titleAfter}
          </h2>
        </div>

        <div className="relative z-10 mb-20 flex flex-col items-start justify-between md:flex-row">
          <div className="absolute top-[60px] right-[10%] left-[10%] -z-10 hidden h-0.5 bg-white/10 md:block" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: reduceMotion ? 0 : i * 0.15, duration: 0.5 }}
              className="mb-12 flex w-full flex-col items-center px-4 text-center md:mb-0 md:w-1/4"
            >
              <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/10 bg-surface-elevated font-heading text-2xl font-bold text-white shadow-xl">
                {step.num}
                <div className="absolute top-0 right-0 h-4 w-4 rounded-full border-2 border-surface-elevated bg-brand-orange shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
              </div>
              <h3 className="mb-3 font-heading text-xl font-bold text-white">{step.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-white/70">{step.desc}</p>
              <div className="mt-4 h-1.5 w-24 overflow-hidden rounded-full bg-white/10" aria-hidden>
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-brand-orange to-yoobe-neon-pink"
                  initial={{ width: reduceMotion ? `${((i + 1) / steps.length) * 100}%` : 0 }}
                  whileInView={{ width: `${((i + 1) / steps.length) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.2 + i * 0.12 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 mt-20 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-white/3 p-8"
          >
            <h3 className="mb-3 font-heading text-xl font-bold text-white">{d.sideA.title}</h3>
            <p className="mb-6 font-sans text-sm leading-relaxed text-white/70">{d.sideA.body}</p>
            <ul className="space-y-2 font-sans text-sm text-white/70">
              {d.sideA.bullets.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-yoobe-neon-pink">✓</span> {line}
                </li>
              ))}
            </ul>
            <a
              href={withBasePath(path("/plataforma/motor-gamificacao"))}
              className="mt-6 inline-block text-sm font-semibold text-brand-orange hover:underline"
            >
              {m.platformTabs.campanhas.cta} →
            </a>
          </motion.div>
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-white/3 p-8"
          >
            <h3 className="mb-3 font-heading text-xl font-bold text-white">{d.sideB.title}</h3>
            <p className="mb-6 font-sans text-sm leading-relaxed text-white/70">{d.sideB.body}</p>
            <ul className="space-y-2 font-sans text-sm text-white/70">
              {d.sideB.bullets.slice(0, 3).map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-blue-400">✓</span> {line}
                </li>
              ))}
            </ul>
            <a
              href={withBasePath(path("/api-integracoes"))}
              className="mt-6 inline-block text-sm font-semibold text-brand-orange hover:underline"
            >
              {m.apiSection.ctaDocs} →
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.3 }}
          className="relative mx-auto mt-16 hidden w-full max-w-5xl md:block"
        >
          {architectureImageUrl ? (
            <div className="relative aspect-21/9 overflow-hidden rounded-3xl border border-white/5 bg-[#0b0e14] shadow-2xl">
              <Image
                src={architectureImageUrl}
                alt={
                  homeContent?.showcaseMedia?.howItWorks?.architectureImage?.alt?.trim() ||
                  h.mockInfrastructure
                }
                fill
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-contain object-top"
                unoptimized
              />
            </div>
          ) : (
            <>
              <div className="pointer-events-none absolute top-1/2 left-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yoobe-neon-pink/10 blur-[100px]" />

              <div className="relative flex aspect-21/9 items-center overflow-hidden rounded-3xl border border-white/5 bg-white/2 p-8 shadow-2xl backdrop-blur-sm">
                <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 0 }} aria-hidden>
                  <path d="M 150 150 C 300 150, 200 200, 350 200" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" strokeDasharray="6 6" className="motion-safe:animate-[pulse_3s_ease-in-out_infinite]" />
                  <path d="M 150 250 C 300 250, 200 200, 350 200" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" strokeDasharray="6 6" className="motion-safe:animate-[pulse_3s_ease-in-out_infinite_1s]" />
                  <path d="M 650 200 C 800 200, 700 150, 850 150" stroke="rgba(249,115,22,0.3)" strokeWidth="3" fill="none" strokeDasharray="8 8" className="motion-safe:animate-[pulse_2s_ease-in-out_infinite]" />
                  <path d="M 650 200 C 800 200, 700 250, 850 250" stroke="rgba(249,115,22,0.3)" strokeWidth="3" fill="none" strokeDasharray="8 8" className="motion-safe:animate-[pulse_2s_ease-in-out_infinite_0.5s]" />
                  {!reduceMotion ? (
                    <>
                      <circle cx="0" cy="0" r="4" fill="#F97316">
                        <animateMotion dur="3s" repeatCount="indefinite" path="M 150 150 C 300 150, 200 200, 350 200" />
                      </circle>
                      <circle cx="0" cy="0" r="4" fill="#F97316">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M 150 250 C 300 250, 200 200, 350 200" />
                      </circle>
                      <circle cx="0" cy="0" r="5" fill="#e75782">
                        <animateMotion dur="2.5s" repeatCount="indefinite" path="M 650 200 C 800 200, 700 150, 850 150" />
                      </circle>
                      <circle cx="0" cy="0" r="5" fill="#e75782">
                        <animateMotion dur="2.2s" repeatCount="indefinite" path="M 650 200 C 800 200, 700 250, 850 250" />
                      </circle>
                    </>
                  ) : null}
                </svg>

                <div className="relative z-10 flex w-full items-center justify-between px-8">
                  <div className="flex w-1/4 flex-col gap-6">
                    <div className="flex transform items-center gap-3 rounded-2xl border border-white/10 bg-surface-elevated p-4 shadow-lg -rotate-2 transition-transform hover:rotate-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 font-black text-blue-400">W</div>
                      <div className="flex-1">
                        <div className="mb-2 h-2 w-16 rounded-full bg-white/20" />
                        <div className="h-1.5 w-10 rounded-full bg-white/10" />
                      </div>
                    </div>
                    <div className="flex transform items-center gap-3 rounded-2xl border border-white/10 bg-surface-elevated p-4 shadow-lg rotate-2 transition-transform hover:rotate-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yoobe-neon-pink/20 font-black text-yoobe-neon-pink">H</div>
                      <div className="flex-1">
                        <div className="mb-2 h-2 w-20 rounded-full bg-white/20" />
                        <div className="h-1.5 w-12 rounded-full bg-white/10" />
                      </div>
                    </div>
                  </div>

                  <div className="group relative w-1/3">
                    <div className="absolute -inset-1 rounded-[32px] bg-linear-to-r from-yoobe-purple to-brand-orange opacity-50 blur-sm transition duration-500 group-hover:opacity-100" />
                    <div className="relative flex flex-col items-center rounded-[28px] border border-white/10 bg-surface-section/90 p-6 shadow-2xl backdrop-blur-xl">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-brand-orange to-yoobe-neon-pink shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                        <span className="font-heading text-2xl font-black text-white">Y.</span>
                      </div>
                      <h4 className="mb-1 font-heading text-lg font-bold text-white">{h.mockInfrastructure}</h4>
                      <p className="mb-6 text-center font-sans text-xs text-white/50">{h.mockEngine}</p>

                      <div className="w-full space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white/70">{h.mockPoints}</span>
                          <span className="font-mono text-green-400">OK</span>
                        </div>
                        <div
                          className="h-1.5 w-full overflow-hidden rounded-full bg-white/5"
                          role="progressbar"
                          aria-valuenow={85}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={h.mockPoints}
                        >
                          <motion.div
                            className="h-1.5 rounded-full bg-brand-orange"
                            initial={{ width: reduceMotion ? "85%" : 0 }}
                            whileInView={{ width: "85%" }}
                            viewport={{ once: true }}
                            transition={{ duration: reduceMotion ? 0 : 1.1, delay: 0.2 }}
                          />
                        </div>

                        <div className="flex items-center justify-between border-t border-white/5 pt-2 text-xs">
                          <span className="text-white/70">{h.mockWebhook}</span>
                          <span className="font-mono text-yoobe-purple">SYNC</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-1/4 flex-col gap-6">
                    <div className="flex transform flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-md rotate-2 transition-transform hover:rotate-0">
                      <div className="flex items-center justify-between">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange/20 text-sm text-brand-orange">🛒</div>
                        <span className="text-[10px] font-bold tracking-wider text-white/50 uppercase">{h.mockItems}</span>
                      </div>
                      <div className="flex h-12 w-full items-center justify-center rounded-lg border border-white/5 bg-linear-to-br from-white/5 to-transparent text-xs text-white/40">
                        {h.mockCatalog}
                      </div>
                    </div>

                    <div className="flex transform flex-col gap-3 rounded-2xl border border-white/10 bg-surface-elevated p-4 shadow-lg -rotate-1 transition-transform hover:rotate-0">
                      <div className="mb-1 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-yoobe-neon-pink motion-safe:animate-pulse" />
                        <span className="text-xs font-bold text-white/70">{h.mockRoi}</span>
                      </div>
                      <div className="flex h-8 items-end gap-1">
                        <div className="h-1/3 w-1/4 rounded-t-sm bg-yoobe-purple/40" />
                        <div className="h-2/3 w-1/4 rounded-t-sm bg-yoobe-purple/60" />
                        <div className="h-full w-1/4 rounded-t-sm bg-yoobe-neon-pink/80" />
                        <div className="h-[120%] w-1/4 rounded-t-sm bg-brand-orange shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
