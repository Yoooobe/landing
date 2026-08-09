// SCREENSHOTS: Use imagens reais de /public/screens/ — NÃO substituir por SVG, JSX mockup ou ilustrações de cms-seed/
"use client";

import { ZoomableScreenshot } from "@/components/ui/ScreenshotLightbox";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { withBasePath } from "@/lib/basePath";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { ResolvedHomeContent } from "@/sanity/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

type TabId = "gestao" | "loja" | "campanhas";

const TAB_ROUTES: Record<TabId, string> = {
  gestao: "/plataforma/painel-gestor/",
  loja: "/plataforma/loja-resgate/",
  campanhas: "/plataforma/campanhas-gamificacao/",
};

export default function PlatformTabs({
  homeContent = null,
}: {
  homeContent?: ResolvedHomeContent | null;
}) {
  const { m, path } = useLocaleMessages();
  const t = m.platformTabs;
  const [activeTab, setActiveTab] = useState<TabId>("gestao");
  const managementImageUrl =
    getSanityImageUrl(
      homeContent?.showcaseMedia?.platformTabs?.managementImage,
      { width: 1360, height: 860, fit: "crop", crop: "focalpoint", focalPoint: { x: 0.5, y: 0.16 }, quality: 85 },
    ) ?? withBasePath("/screens/dash/dashboard-geral.webp");
  const storeImageUrl =
    getSanityImageUrl(
      homeContent?.showcaseMedia?.platformTabs?.storeImage,
      { width: 1360, height: 860, fit: "crop", crop: "focalpoint", focalPoint: { x: 0.5, y: 0.18 }, quality: 85 },
    ) ?? withBasePath("/screens/member-store-home.webp");
  const campaignsImageUrl =
    getSanityImageUrl(
      homeContent?.showcaseMedia?.platformTabs?.campaignsImage,
      { width: 1360, height: 860, fit: "crop", crop: "focalpoint", focalPoint: { x: 0.5, y: 0.2 }, quality: 85 },
    ) ?? withBasePath("/screens/flows/campanha-passo-1.webp");

  const tabs: Array<{ id: TabId; label: string }> = [
    { id: "gestao", label: t.tabGestao },
    { id: "loja", label: t.tabLoja },
    { id: "campanhas", label: t.tabCampanhas },
  ];

  const tabButtonClass = (id: TabId) =>
    `rounded-full px-6 py-3 font-bold transition-all duration-200 ${
      activeTab === id
        ? "bg-brand-gradient text-white"
        : "border border-white/15 bg-white/5 text-white/70 backdrop-blur-md hover:border-brand-orange/25 hover:bg-white/10"
    }`;

  return (
    <section id="preview" className="relative overflow-hidden bg-brand-navy-dark py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-brand-orange">
            {t.badge}
          </div>
          <h2 className="mb-6 font-heading text-3xl font-black text-white md:text-5xl">{t.title}</h2>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-4" role="tablist" aria-label={t.title}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={tabButtonClass(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative min-h-[400px]">
          {activeTab === "gestao" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="grid items-center gap-12 md:grid-cols-2"
            >
              <div>
                <h3 className="mb-4 font-heading text-3xl font-bold text-white">{t.gestao.title}</h3>
                <p className="mb-6 font-sans leading-relaxed text-white/60">{t.gestao.body}</p>
                <ul className="mb-8 space-y-4 font-sans">
                  {t.gestao.bullets.map((line) => (
                    <li key={line} className="flex items-center text-white/80">
                      <span className="mr-3 text-brand-orange">✓</span>
                      {line}
                    </li>
                  ))}
                </ul>
                <Link
                  href={path(TAB_ROUTES.gestao)}
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-transparent px-8 font-sans font-bold text-white transition-colors duration-200 hover:border-brand-orange/40 hover:bg-white/5"
                >
                  {t.gestao.cta}
                </Link>
              </div>
              <div className="relative">
                <div className="relative overflow-hidden rounded-[1.8rem] border border-white/12 bg-slate-950 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm">
                  <div className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="font-mono text-[0.6rem] tracking-wider text-white/45">
                      gestor.4unik.io · Dashboard
                    </span>
                    <span className="rounded-full border border-brand-orange/30 bg-brand-orange/15 px-2 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-widest text-brand-orange">
                      Ao vivo
                    </span>
                  </div>
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                    <ZoomableScreenshot
                      src={managementImageUrl}
                      alt={
                        homeContent?.showcaseMedia?.platformTabs?.managementImage?.alt?.trim() ||
                        t.gestao.mockTitle
                      }
                      sizes="(min-width: 768px) 45vw, 100vw"
                      imgClassName="object-cover object-top"
                      className="absolute inset-0 h-full w-full"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "loja" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="grid items-center gap-12 md:grid-cols-2"
            >
              <div>
                <h3 className="mb-4 font-heading text-3xl font-bold text-white">{t.loja.title}</h3>
                <p className="mb-6 font-sans leading-relaxed text-white/60">{t.loja.body}</p>
                <ul className="mb-8 space-y-4 font-sans">
                  {t.loja.bullets.map((line) => (
                    <li key={line} className="flex items-center text-white/80">
                      <span className="mr-3 text-brand-orange">✓</span>
                      {line}
                    </li>
                  ))}
                </ul>
                <Link
                  href={path(TAB_ROUTES.loja)}
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-gradient px-8 font-sans font-bold text-white transition-all duration-200 hover:bg-brand-gradient-hover"
                >
                  {t.loja.cta}
                </Link>
              </div>
              <div className="relative">
                <div className="relative overflow-hidden rounded-[1.8rem] border border-white/12 bg-slate-950 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm">
                  <div className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="font-mono text-[0.6rem] tracking-wider text-white/45">
                      loja.4unik.io · Membro
                    </span>
                    <span className="rounded-full border border-yoobe-purple/30 bg-yoobe-purple/15 px-2 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-widest text-yoobe-purple">
                      Loja
                    </span>
                  </div>
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                    <ZoomableScreenshot
                      src={storeImageUrl}
                      alt={
                        homeContent?.showcaseMedia?.platformTabs?.storeImage?.alt?.trim() ||
                        t.loja.mockTitle
                      }
                      sizes="(min-width: 768px) 45vw, 100vw"
                      imgClassName="object-cover object-top"
                      className="absolute inset-0 h-full w-full"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "campanhas" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="grid items-center gap-12 md:grid-cols-2"
            >
              <div>
                <h3 className="mb-4 font-heading text-3xl font-bold text-white">{t.campanhas.title}</h3>
                <p className="mb-6 font-sans leading-relaxed text-white/60">{t.campanhas.body}</p>
                <ul className="mb-8 space-y-4 font-sans">
                  {t.campanhas.bullets.map((line) => (
                    <li key={line} className="flex items-center text-white/80">
                      <span className="mr-3 text-brand-orange">✓</span>
                      {line}
                    </li>
                  ))}
                </ul>
                <Link
                  href={path(TAB_ROUTES.campanhas)}
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-transparent px-8 font-sans font-bold text-white transition-colors duration-200 hover:border-brand-orange/40 hover:bg-white/5"
                >
                  {t.campanhas.cta}
                </Link>
              </div>
              <div className="relative">
                <div className="relative overflow-hidden rounded-[1.8rem] border border-white/12 bg-slate-950 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm">
                  <div className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="font-mono text-[0.6rem] tracking-wider text-white/45">
                      gestor.4unik.io · Campanhas
                    </span>
                    <span className="rounded-full border border-unik-blue/30 bg-unik-blue/15 px-2 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-widest text-unik-blue-soft">
                      Editor
                    </span>
                  </div>
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                    <ZoomableScreenshot
                      src={campaignsImageUrl}
                      alt={
                        homeContent?.showcaseMedia?.platformTabs?.campaignsImage?.alt?.trim() ||
                        t.campanhas.mockTitle
                      }
                      sizes="(min-width: 768px) 45vw, 100vw"
                      imgClassName="object-cover object-top"
                      className="absolute inset-0 h-full w-full"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
