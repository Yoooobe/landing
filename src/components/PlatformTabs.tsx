"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { ResolvedHomeContent } from "@/sanity/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function PlatformTabs({
  homeContent = null,
}: {
  homeContent?: ResolvedHomeContent | null;
}) {
  const { m } = useLocaleMessages();
  const t = m.platformTabs;
  const [activeTab, setActiveTab] = useState("gestao");
  const managementImageUrl = getSanityImageUrl(
    homeContent?.showcaseMedia?.platformTabs?.managementImage,
  );
  const storeImageUrl = getSanityImageUrl(
    homeContent?.showcaseMedia?.platformTabs?.storeImage,
  );
  const campaignsImageUrl = getSanityImageUrl(
    homeContent?.showcaseMedia?.platformTabs?.campaignsImage,
  );

  return (
    <section id="preview" className="relative overflow-hidden bg-brand-navy-dark py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-yoobe-purple">
            {t.badge}
          </div>
          <h2 className="mb-6 font-heading text-3xl font-black text-white md:text-5xl">{t.title}</h2>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => setActiveTab("gestao")}
            className={`rounded-full px-6 py-3 font-bold transition-all ${activeTab === "gestao" ? "scale-105 bg-white text-black" : "bg-white/5 text-white/70 hover:bg-white/10"}`}
          >
            {t.tabGestao}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("loja")}
            className={`rounded-full px-6 py-3 font-bold transition-all ${activeTab === "loja" ? "scale-105 bg-white text-black" : "bg-white/5 text-white/70 hover:bg-white/10"}`}
          >
            {t.tabLoja}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("campanhas")}
            className={`rounded-full px-6 py-3 font-bold transition-all ${activeTab === "campanhas" ? "scale-105 bg-white text-black" : "bg-white/5 text-white/70 hover:bg-white/10"}`}
          >
            {t.tabCampanhas}
          </button>
        </div>

        <div className="relative min-h-[400px]">
          {activeTab === "gestao" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h3 className="mb-4 font-heading text-3xl font-bold text-white">{t.gestao.title}</h3>
                <p className="mb-6 font-sans leading-relaxed text-white/60">{t.gestao.body}</p>
                <ul className="mb-8 space-y-4 font-sans">
                  {t.gestao.bullets.map((line) => (
                    <li key={line} className="flex items-center text-white/80">
                      <span className="mr-3 text-green-400">✓</span>
                      {line}
                    </li>
                  ))}
                </ul>
                <a
                  href="#gestao"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-transparent px-8 font-bold text-white transition-colors hover:bg-white/5 font-sans"
                >
                  {t.gestao.cta}
                </a>
              </div>
              <div className="relative rounded-2xl border border-white/10 bg-[#f8fafc] p-4 shadow-2xl md:p-8">
                {managementImageUrl ? (
                  <div className="relative min-h-[320px] overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <Image
                      src={managementImageUrl}
                      alt={
                        homeContent?.showcaseMedia?.platformTabs?.managementImage?.alt?.trim() ||
                        t.gestao.mockTitle
                      }
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <>
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                        <div className="h-3 w-3 rounded-full bg-green-400"></div>
                      </div>
                      <span className="ml-2 text-xs font-bold text-slate-800">{t.gestao.mockTitle}</span>
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                      <div className="h-16 rounded-xl border border-slate-200 bg-white shadow-sm"></div>
                      <div className="h-16 rounded-xl border border-slate-200 bg-white shadow-sm"></div>
                    </div>
                    <div className="h-32 rounded-xl border border-slate-200 bg-white shadow-sm"></div>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "loja" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h3 className="mb-4 font-heading text-3xl font-bold text-white">{t.loja.title}</h3>
                <p className="mb-6 font-sans leading-relaxed text-white/60">{t.loja.body}</p>
                <ul className="mb-8 space-y-4 font-sans">
                  {t.loja.bullets.map((line) => (
                    <li key={line} className="flex items-center text-white/80">
                      <span className="mr-3 text-green-400">✓</span>
                      {line}
                    </li>
                  ))}
                </ul>
                <a
                  href="#loja"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-orange px-8 font-bold text-white transition-colors hover:bg-brand-orange-dark font-sans"
                >
                  {t.loja.cta}
                </a>
              </div>
              <div className="relative rounded-2xl border border-white/10 bg-[#f8fafc] p-4 shadow-2xl md:p-8">
                {storeImageUrl ? (
                  <div className="relative min-h-[320px] overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <Image
                      src={storeImageUrl}
                      alt={
                        homeContent?.showcaseMedia?.platformTabs?.storeImage?.alt?.trim() ||
                        t.loja.mockTitle
                      }
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <>
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                        <div className="h-3 w-3 rounded-full bg-green-400"></div>
                      </div>
                      <span className="ml-2 text-xs font-bold text-slate-800">{t.loja.mockTitle}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                          <div className="mb-2 h-16 rounded-lg bg-slate-100"></div>
                          <div className="mt-2 h-2 w-2/3 rounded bg-slate-200"></div>
                          <div className="mt-2 text-[10px] font-bold text-brand-orange">{(i * 0.8).toFixed(1)}k pts</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "campanhas" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h3 className="mb-4 font-heading text-3xl font-bold text-white">{t.campanhas.title}</h3>
                <p className="mb-6 font-sans leading-relaxed text-white/60">{t.campanhas.body}</p>
                <ul className="mb-8 space-y-4 font-sans">
                  {t.campanhas.bullets.map((line) => (
                    <li key={line} className="flex items-center text-white/80">
                      <span className="mr-3 text-green-400">✓</span>
                      {line}
                    </li>
                  ))}
                </ul>
                <a
                  href="#gamificacao"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-transparent px-8 font-bold text-white transition-colors hover:bg-white/5 font-sans"
                >
                  {t.campanhas.cta}
                </a>
              </div>
              <div className="relative rounded-2xl border border-white/10 bg-[#f8fafc] p-4 text-center shadow-2xl md:p-8">
                {campaignsImageUrl ? (
                  <div className="relative min-h-[320px] overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <Image
                      src={campaignsImageUrl}
                      alt={
                        homeContent?.showcaseMedia?.platformTabs?.campaignsImage?.alt?.trim() ||
                        t.campanhas.mockTitle
                      }
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <>
                    <div className="mb-4 flex items-center gap-2 text-left">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                        <div className="h-3 w-3 rounded-full bg-green-400"></div>
                      </div>
                      <span className="ml-2 text-xs font-bold text-slate-800">{t.campanhas.mockTitle}</span>
                    </div>
                    <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8">
                      <div className="mb-4 text-4xl">⚙️</div>
                      <div className="mx-auto mb-2 h-2 w-1/2 rounded bg-slate-200"></div>
                      <div className="mx-auto mb-6 h-2 w-1/3 rounded bg-slate-200"></div>
                      <button type="button" className="rounded-full bg-brand-navy px-6 py-2 text-sm font-bold text-white shadow-md">
                        {t.campanhas.mockBtn}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
