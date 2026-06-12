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
  const { m, locale } = useLocaleMessages();
  const ec = m.landingMore.enterpriseCases;
  const h = ec.hapvida;
  const p = ec.prio;
  const hapvidaLogoUrl = getSanityImageUrl(
    homeContent?.showcaseMedia?.enterpriseCases?.hapvidaLogoImage,
  );
  const hapvidaCaseImageUrl =
    getSanityImageUrl(homeContent?.showcaseMedia?.enterpriseCases?.hapvidaCaseImage) ??
    withBasePath("/screens/hapvida/hapvida-vendas-on-login.webp");
  const prioLogoUrl = getSanityImageUrl(
    homeContent?.showcaseMedia?.enterpriseCases?.prioLogoImage,
  );
  const prioCaseImageUrl = getSanityImageUrl(
    homeContent?.showcaseMedia?.enterpriseCases?.prioCaseImage,
  );
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

              <ul className="space-y-4 font-sans text-white/80">
                {h.bullets.map((line) => (
                  <li key={line} className="flex gap-3 items-center">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-blue-400 text-sm shrink-0">
                      ✓
                    </div>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 w-full relative z-10 flex justify-center lg:justify-end">
              <div className="w-full max-w-md aspect-4/5 bg-surface-section border border-blue-500/20 rounded-2xl relative overflow-hidden shadow-2xl group-hover:border-blue-500/40 transition-colors">
                <Image
                  src={hapvidaCaseImageUrl}
                  alt={
                    homeContent?.showcaseMedia?.enterpriseCases?.hapvidaCaseImage?.alt?.trim() ||
                    "Portal Hapvida VENDAS ON (Beehome)"
                  }
                  fill
                  sizes="(min-width: 1024px) 448px, 100vw"
                  className="object-cover"
                  unoptimized
                />
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

              <ul className="space-y-4 font-sans text-white/80">
                {p.bullets.map((line) => (
                  <li key={line} className="flex gap-3 items-center">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white text-sm shrink-0">✓</div>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 w-full relative z-10 flex justify-center lg:justify-start">
              <div className="w-full max-w-md aspect-4/5 bg-surface-section border border-white/10 rounded-2xl relative overflow-hidden shadow-2xl group-hover:border-white/30 transition-colors">
                {prioCaseImageUrl ? (
                  <Image
                    src={prioCaseImageUrl}
                    alt={
                      homeContent?.showcaseMedia?.enterpriseCases?.prioCaseImage?.alt?.trim() ||
                      "Case Prio"
                    }
                    fill
                    sizes="(min-width: 1024px) 448px, 100vw"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <>
                    <div className="h-16 border-b border-white/5 bg-black flex items-center justify-between px-6">
                      <div className="text-white font-black text-xl tracking-tighter">
                        PRIO<span className="text-white/50 font-normal">STORE</span>
                      </div>
                      <div className="w-6 h-6 rounded text-white/50 border border-white/20 flex items-center justify-center text-xs">
                        ≡
                      </div>
                    </div>
                    <div className="p-5 bg-surface-base">
                      <div className="w-full rounded-xl bg-linear-to-br from-gray-800 to-black border border-white/10 mb-4 relative overflow-hidden">
                        <div className="relative w-full aspect-[1024/565]">
                          <Image
                            src={withBasePath("/screens/prio/priostore-hero.webp")}
                            alt="Home da Prio Store — vitrine Exclusive Merchandising"
                            fill
                            sizes="(min-width: 1024px) 400px, 90vw"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex flex-col px-4 py-3 border-t border-white/10 bg-black/60">
                          <span className="text-white font-black text-base leading-tight">{p.mockHeroTitle}</span>
                          <span className="text-white/60 text-xs font-mono">{p.mockHeroSubtitle}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-32 rounded-xl bg-white/5 border border-white/5 p-3 flex flex-col group-hover:bg-white/10 transition-colors relative">
                          <div className="relative flex-1 rounded overflow-hidden mb-2">
                            <Image
                              src={withBasePath("/screens/prio/priostore-product.webp")}
                              alt="Página de produto na Prio Store — moleskine I love PRIO"
                              fill
                              sizes="200px"
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div className="w-full h-2 bg-white/20 rounded-full mb-1"></div>
                          <div className="w-1/2 h-2 bg-brand-orange/50 rounded-full"></div>
                        </div>
                        <div className="h-32 rounded-xl bg-white/5 border border-white/5 p-3 flex flex-col group-hover:bg-white/10 transition-colors relative">
                          <div className="relative flex-1 rounded overflow-hidden mb-2">
                            <Image
                              src={withBasePath("/screens/prio/priostore-catalog.webp")}
                              alt="Catálogo Moda PRIO na Prio Store"
                              fill
                              sizes="200px"
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div className="w-full h-2 bg-white/20 rounded-full mb-1"></div>
                          <div className="w-2/3 h-2 bg-brand-orange/50 rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute -right-6 top-24 bg-black/80 backdrop-blur-md border border-white/20 px-4 py-3 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] transform group-hover:scale-105 transition-transform z-20">
                      <div className="text-[10px] text-white/50 uppercase font-bold mb-1">{p.mockDeliveryLabel}</div>
                      <div className="text-sm font-black text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> {p.mockDeliveryStatus}
                      </div>
                    </div>
                  </>
                )}
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
