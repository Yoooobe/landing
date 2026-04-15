// SCREENSHOTS: Use imagens reais de /public/screens/ — NÃO substituir por SVG, JSX mockup ou ilustrações de cms-seed/
"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { ResolvedHomeContent } from "@/sanity/lib/types";
import { withBasePath } from "@/lib/basePath";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Trophy, Package, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

function BentoMediaFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative mt-6 aspect-4/3 w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-brand-charcoal/80 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export default function BentoFeatures({
  homeContent = null,
}: {
  homeContent?: ResolvedHomeContent | null;
}) {
  const { m, path } = useLocaleMessages();
  const b = m.bento;
  const primaryCardImageUrl = getSanityImageUrl(
    homeContent?.showcaseMedia?.bento?.primaryCardImage,
  );
  const storeCardImageUrl = getSanityImageUrl(
    homeContent?.showcaseMedia?.bento?.storeCardImage,
  );

  const dashboardFallback = withBasePath("/screens/admin-dashboard.webp");
  const gamificationFallback = withBasePath("/screens/gamif-bolsa.webp");
  const storeFallback = withBasePath("/screens/member-store-home.webp");
  const apiFallback = withBasePath("/screens/pix-step-1-banks.webp");

  return (
    <section id="platform" className="section-gradient-bg relative overflow-hidden py-24">
      <div className="pointer-events-none absolute top-0 right-1/4 h-96 w-96 rounded-full bg-brand-orange/10 blur-[100px]"></div>
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-yoobe-purple/10 blur-[120px]"></div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-yoobe-purple">
            {b.badge}
          </div>
          <h2 className="mb-6 font-heading text-3xl font-black text-white md:text-5xl">
            {b.titleLine1} <br className="hidden md:block" />
            {b.titleLine2}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/60">{b.sub}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.a
            href={withBasePath(path("/plataforma"))}
            whileHover={{ y: -5 }}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 glass-panel-dark p-6 sm:p-8"
          >
            <div className="relative z-10 flex flex-1 flex-col">
              <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand-orange to-red-500">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-heading text-xl font-bold text-white transition-colors group-hover:text-brand-orange sm:text-2xl">
                {b.card1.title}
              </h3>
              <p className="mb-4 font-sans text-sm leading-relaxed text-white/60">{b.card1.body}</p>
              <div className="mt-auto flex items-center font-sans text-sm font-semibold text-brand-orange">
                {b.card1.cta} <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            <BentoMediaFrame>
              {primaryCardImageUrl ? (
                <Image
                  src={primaryCardImageUrl}
                  alt={
                    homeContent?.showcaseMedia?.bento?.primaryCardImage?.alt?.trim() ||
                    b.card1.title
                  }
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <Image
                  src={dashboardFallback}
                  alt={b.card1.title}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                  unoptimized
                />
              )}
            </BentoMediaFrame>
          </motion.a>

          <motion.a
            href={withBasePath(path("/plataforma/motor-gamificacao/"))}
            whileHover={{ y: -5 }}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 glass-panel-dark p-6 sm:p-8"
          >
            <div className="relative z-10 flex flex-1 flex-col">
              <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-yoobe-purple to-pink-500">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-heading text-xl font-bold text-white transition-colors group-hover:text-yoobe-neon-pink">{b.card2.title}</h3>
              <p className="mb-4 flex-1 font-sans text-sm leading-relaxed text-white/60">{b.card2.body}</p>
            </div>
            <BentoMediaFrame>
              <Image
                src={gamificationFallback}
                alt={b.card2.title}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                unoptimized
              />
            </BentoMediaFrame>
          </motion.a>

          <motion.a
            href={`${withBasePath(path("/plataforma"))}#loja`}
            whileHover={{ y: -5 }}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 glass-panel-dark p-6 sm:p-8"
          >
            <div className="relative z-10 flex flex-1 flex-col">
              <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-green-400 to-emerald-600">
                <Package className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-heading text-xl font-bold text-white transition-colors group-hover:text-green-400">{b.card3.title}</h3>
              <p className="mb-4 flex-1 font-sans text-sm leading-relaxed text-white/60">{b.card3.body}</p>
            </div>
            <BentoMediaFrame>
              {storeCardImageUrl ? (
                <Image
                  src={storeCardImageUrl}
                  alt={
                    homeContent?.showcaseMedia?.bento?.storeCardImage?.alt?.trim() ||
                    b.card3.title
                  }
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <Image
                  src={storeFallback}
                  alt={b.card3.title}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                  unoptimized
                />
              )}
            </BentoMediaFrame>
          </motion.a>

          <motion.a
            href={withBasePath(path("/api-integracoes"))}
            whileHover={{ y: -5 }}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 glass-panel-dark p-6 sm:p-8"
          >
            <div className="relative z-10 mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-unik-blue to-demo-cyan-deep">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-2 font-heading text-xl font-bold text-white transition-colors group-hover:text-demo-cyan sm:text-2xl">{b.card4.title}</h3>
            <p className="mb-4 font-sans text-sm leading-relaxed text-white/60">{b.card4.body}</p>
            <BentoMediaFrame>
              <Image
                src={apiFallback}
                alt={b.card4.title}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                unoptimized
              />
            </BentoMediaFrame>
            {b.card4.apiNote ? (
              <p className="mt-3 text-center font-sans text-xs text-white/45">{b.card4.apiNote}</p>
            ) : null}
            <div className="mt-auto flex items-center pt-4 font-sans text-sm font-semibold text-blue-400">
              {b.card4.cta} <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
