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
          <div className="relative overflow-hidden rounded-[1.8rem] border border-white/12 bg-slate-950 shadow-[0_30px_80px_rgba(0,0,0,0.65)] backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-5 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-[0.62rem] text-white/50 tracking-wider">
                gestor.4unik.io · Motor de Regras & Orquestração
              </span>
              <span className="rounded-full border border-yoobe-neon-pink/30 bg-yoobe-neon-pink/15 px-3 py-1 font-mono text-[0.58rem] font-bold uppercase tracking-widest text-yoobe-neon-pink">
                Arquitetura Fim a Fim
              </span>
            </div>
            <div className="relative aspect-16/9 w-full overflow-hidden bg-slate-900">
              <Image
                src={architectureImageUrl || withBasePath("/screens/admin-dashboard.webp")}
                alt={
                  homeContent?.showcaseMedia?.howItWorks?.architectureImage?.alt?.trim() ||
                  "Arquitetura da Plataforma 4unik — Motor de Gamificação, Carteiras e Loja Corporativa"
                }
                fill
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover object-top"
                unoptimized
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-slate-950/60 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
