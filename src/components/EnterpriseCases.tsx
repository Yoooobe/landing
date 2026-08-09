"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { withBasePath } from "@/lib/basePath";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { ResolvedHomeContent } from "@/sanity/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";

export default function EnterpriseCases({
  homeContent = null,
  showTestimonials = false,
}: {
  homeContent?: ResolvedHomeContent | null;
  showTestimonials?: boolean;
}) {
  const { m, locale, path } = useLocaleMessages();
  const ec = m.landingMore.enterpriseCases;
  const h = ec.hapvida;
  const p = ec.prio;
  const hapvidaLogoUrl = getSanityImageUrl(
    homeContent?.showcaseMedia?.enterpriseCases?.hapvidaLogoImage,
  );
  const hapvidaCaseImageUrl =
    withBasePath("/screens/hapvida/hapvida-vendas-on-login.webp");
  const prioLogoUrl = getSanityImageUrl(
    homeContent?.showcaseMedia?.enterpriseCases?.prioLogoImage,
  );
  const prioCaseImageUrl =
    withBasePath("/screens/prio/priostore-hero.webp");
  return (
    <section className="py-24 bg-surface-base relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-yoobe-neon-pink/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 mb-4 rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 text-yoobe-purple text-sm font-bold tracking-wide uppercase">
            {ec.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            {ec.titleBefore}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yoobe-purple to-brand-orange">
              {ec.titleGradient}
            </span>
          </h2>
          <p className="text-xl text-white/50 font-sans">{ec.sub}</p>
        </div>

        <div className="flex flex-col gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full bg-white/2 border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden group hover:bg-white/3 transition-all flex flex-col lg:flex-row gap-12 items-center"
          >
            <div className="flex-1 z-10 relative">
              <div className="flex items-center gap-4 mb-6">
                {hapvidaLogoUrl ? (
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-blue-500/20 bg-white/5 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    <Image
                      src={hapvidaLogoUrl}
                      alt={
                        homeContent?.showcaseMedia?.enterpriseCases?.hapvidaLogoImage?.alt?.trim() ||
                        "Logo Hapvida"
                      }
                      fill
                      sizes="64px"
                      className="object-contain p-2"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-600 to-cyan-500 flex items-center justify-center font-black text-white text-3xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    H
                  </div>
                )}
                <div>
                  <h3 className="text-3xl font-black text-white font-heading leading-none">Hapvida</h3>
                  <a
                    href="https://hapvida.yoobe.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-sm hover:underline flex items-center gap-1 font-mono mt-1"
                  >
                    hapvida.yoobe.app <span className="text-[10px]">↗</span>
                  </a>
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
                  {h.tag1}
                </span>
                <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-xs font-bold uppercase tracking-wider">
                  {h.tag2}
                </span>
              </div>

              <p className="text-white/70 font-sans mb-8 leading-relaxed text-lg">
                {h.bodyBefore}
                <strong className="text-white">{h.bodyStrong}</strong>
                {h.bodyAfter}
              </p>

              <p className="mb-4 text-[10px] font-semibold tracking-wider text-white/45 uppercase">
                {locale === "en" ? "How it works" : "Como funciona"}
              </p>
              <ul className="space-y-4 font-sans text-white/80">
                {h.bullets.map((line, i) => (
                  <li key={line} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 font-mono text-xs font-bold text-blue-300">
                      {i + 1}
                    </div>
                    {line}
                  </li>
                ))}
              </ul>
              <a
                href={path("/casos-de-uso/")}
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-300 transition-colors hover:text-blue-200"
              >
                {locale === "en" ? "See more use cases" : "Ver mais casos de uso"}
                <span aria-hidden>→</span>
              </a>
            </div>

            <div className="relative z-10 flex w-full flex-1 justify-center lg:justify-end">
              <div className="relative overflow-hidden rounded-[1.8rem] border border-blue-500/20 bg-slate-950 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-colors group-hover:border-blue-500/40 w-full max-w-md">
                <div className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-mono text-[0.6rem] tracking-wider text-blue-400/80">
                    hapvida.yoobe.app
                  </span>
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/15 px-2 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-widest text-blue-300">
                    Ao vivo
                  </span>
                </div>
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={hapvidaCaseImageUrl}
                    alt={
                      homeContent?.showcaseMedia?.enterpriseCases?.hapvidaCaseImage?.alt?.trim() ||
                      "Portal Hapvida VENDAS ON (Beehome)"
                    }
                    fill
                    sizes="(min-width: 1024px) 448px, 100vw"
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full bg-white/2 border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden group hover:bg-white/3 transition-all flex flex-col lg:flex-row-reverse gap-12 items-center"
          >
            <div className="flex-1 z-10 relative">
              <div className="flex items-center gap-4 mb-6">
                {prioLogoUrl ? (
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/10 bg-black shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <Image
                      src={prioLogoUrl}
                      alt={
                        homeContent?.showcaseMedia?.enterpriseCases?.prioLogoImage?.alt?.trim() ||
                        "Logo Prio"
                      }
                      fill
                      sizes="64px"
                      className="object-contain p-2"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center font-black text-white text-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] p-2">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                      <path d="M50 10 C20 10 10 30 10 50 C10 80 40 90 50 90 C80 90 90 70 90 50 C90 20 60 10 50 10 Z M50 30 C65 30 70 45 70 50 C70 65 60 70 50 70 C35 70 30 55 30 50 C30 35 40 30 50 30 Z" />
                    </svg>
                  </div>
                )}
                <div>
                  <h3 className="text-3xl font-black text-white font-heading leading-none">Prio</h3>
                  <a
                    href="https://priostore.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 text-sm hover:underline flex items-center gap-1 font-mono mt-1"
                  >
                    priostore.com.br <span className="text-[10px]">↗</span>
                  </a>
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <span className="px-3 py-1 rounded-full bg-gray-500/10 border border-gray-500/20 text-gray-300 text-xs font-bold uppercase tracking-wider">
                  {p.tag1}
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider">
                  {p.tag2}
                </span>
              </div>

              <p className="text-white/70 font-sans mb-8 leading-relaxed text-lg">
                {p.bodyBefore}
                <strong className="text-white">{p.bodyStrong}</strong>
                {p.bodyAfter}
              </p>

              <p className="mb-4 text-[10px] font-semibold tracking-wider text-white/45 uppercase">
                {locale === "en" ? "How it works" : "Como funciona"}
              </p>
              <ul className="space-y-4 font-sans text-white/80">
                {p.bullets.map((line, i) => (
                  <li key={line} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 font-mono text-xs font-bold text-brand-orange">
                      {i + 1}
                    </div>
                    {line}
                  </li>
                ))}
              </ul>
              <a
                href={path("/casos-de-uso/")}
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange transition-colors hover:text-brand-orange/80"
              >
                {locale === "en" ? "See more use cases" : "Ver mais casos de uso"}
                <span aria-hidden>→</span>
              </a>
            </div>

            <div className="relative z-10 flex w-full flex-1 justify-center lg:justify-start">
              <div className="relative overflow-hidden rounded-[1.8rem] border border-white/12 bg-slate-950 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-colors group-hover:border-white/30 w-full max-w-md">
                <div className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-mono text-[0.6rem] tracking-wider text-white/45">
                    priostore.com.br
                  </span>
                  <span className="rounded-full border border-brand-orange/30 bg-brand-orange/15 px-2 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-widest text-brand-orange">
                    Store
                  </span>
                </div>
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={prioCaseImageUrl || withBasePath("/screens/prio/priostore-hero.webp")}
                    alt={
                      homeContent?.showcaseMedia?.enterpriseCases?.prioCaseImage?.alt?.trim() ||
                      "Case Prio — loja corporativa white-label"
                    }
                    fill
                    sizes="(min-width: 1024px) 448px, 100vw"
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {showTestimonials ? (
          <div className="mt-20 border-t border-white/10 pt-16">
            <p className="mb-8 text-center text-sm font-bold tracking-widest text-white/40 uppercase">
              {m.testimonials.badge}
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {m.testimonials.items.slice(0, 2).map((item) => (
                <blockquote
                  key={item.author}
                  className="rounded-2xl border border-white/5 bg-white/2 p-6 font-sans"
                >
                  <p className="mb-4 text-sm italic leading-relaxed text-white/75">{item.text}</p>
                  <footer className="text-xs text-white/50">
                    <strong className="text-white/80">{item.author}</strong> — {item.role},{" "}
                    {item.company}
                  </footer>
                </blockquote>
              ))}
            </div>
            {locale === "pt" ? (
              <p className="mt-4 text-center text-xs text-white/40">
                Depoimentos ilustrativos; casos auditados aparecem com selo verificado.
              </p>
            ) : (
              <p className="mt-4 text-center text-xs text-white/40">
                Illustrative quotes; audited cases appear with a verified badge.
              </p>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
