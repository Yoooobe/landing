// SCREENSHOTS: Use imagens reais de /public/screens/ — NÃO substituir por SVG, JSX mockup ou ilustrações de cms-seed/
"use client";

import { withBasePath } from "@/lib/basePath";
import Image from "next/image";
import { useState } from "react";
import { Activity, Gift, Sparkles, Zap } from "lucide-react";

const TAB_IMAGES = {
  campaign: {
    src: "/screens/admin-campaign-identity.webp",
    alt: "AI Campaign Builder — identidade da campanha no gestor",
  },
  kit: {
    src: "/screens/admin-campaign-products.webp",
    alt: "AI Kit Builder — seleção de produtos e recompensas",
  },
  recommendation: {
    src: "/screens/admin-campaign-config-desktop.webp",
    alt: "Smart Recommendations — preview desktop da campanha",
  },
} as const;

export default function AiFeatureMockups() {
  const [activeTab, setActiveTab] = useState<"campaign" | "kit" | "recommendation">("campaign");
  const shot = TAB_IMAGES[activeTab];

  return (
    <section className="py-24 bg-[#0a0f18] relative overflow-hidden font-sans border-t border-white/5">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-yoobe-purple/10 blur-[130px] rounded-full pointer-events-none -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 mb-6">
            <Sparkles className="h-4 w-4 text-yoobe-purple" />
            <span className="text-sm font-semibold text-yoobe-purple uppercase tracking-wider">Preview da Plataforma</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            Veja a inteligência em ação
          </h2>
          <p className="text-xl text-white/70">
            Descubra como os assistentes agênticos da 4Unik vão transformar horas de planejamento operacional em segundos de orquestração.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            type="button"
            onClick={() => setActiveTab("campaign")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              activeTab === "campaign"
                ? "bg-white text-brand-navy-dark shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            <Zap className="h-4 w-4" />
            AI Campaign Builder
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("kit")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              activeTab === "kit"
                ? "bg-yoobe-purple text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            <Gift className="h-4 w-4" />
            AI Kit Builder
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("recommendation")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              activeTab === "recommendation"
                ? "bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            <Activity className="h-4 w-4" />
            Smart Recommendations
          </button>
        </div>

        {/* Screenshot da plataforma (por aba) */}
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl" style={{ aspectRatio: "16 / 11" }}>
          <Image
            key={shot.src}
            src={withBasePath(shot.src)}
            alt={shot.alt}
            fill
            className="object-cover object-top"
            sizes="(min-width: 1024px) 80vw, 100vw"
            priority={activeTab === "campaign"}
          />
        </div>
      </div>
    </section>
  );
}
