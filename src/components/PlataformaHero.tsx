"use client";

import HeroThemeBackdrop from "@/components/HeroThemeBackdrop";
import {
  AdminCampaignIdentityMockup,
  AdminDashboardMockup,
} from "@/components/PlatformMockupScreens";
import UnikWordmark from "@/components/UnikWordmark";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { motion } from "framer-motion";

export default function PlataformaHero() {
  const { m } = useLocaleMessages();
  const h = m.plataforma.hero;
  return (
    <section className="hero-theme-section relative overflow-hidden bg-brand-navy-dark pb-24 pt-32">
      <HeroThemeBackdrop theme="features" />
      {/* Abstract Grid & Glow */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWNDBoLTQweiBNMzkuNSAwSDQwdjQwaC0uNXoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] bg-repeat opacity-40"></div>
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      {/* Floating card — Dashboard (left) */}
      <motion.div
        initial={{ opacity: 0, x: -60, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9, type: "spring" }}
        className="absolute left-[2%] top-[28%] hidden w-[240px] overflow-hidden rounded-2xl border border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.55)] xl:block"
        style={{ animation: "float 9s ease-in-out infinite 0.5s" }}
      >
        <div className="flex items-center gap-1.5 border-b border-white/8 bg-[#111827]/95 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-500/70" />
          <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
          <span className="h-2 w-2 rounded-full bg-green-500/70" />
          <span className="ml-1.5 font-mono text-[0.52rem] tracking-wider text-white/30">
            gestor.4unik.io
          </span>
        </div>
        <div className="overflow-hidden bg-[#111827]" style={{ aspectRatio: "4/3" }}>
          <AdminDashboardMockup />
        </div>
        <div className="flex items-center justify-between bg-[#0d1424]/95 px-3 py-1.5">
          <span className="text-[0.55rem] font-semibold text-brand-orange">Dashboard</span>
          <span className="rounded-full border border-brand-orange/30 bg-brand-orange/15 px-2 py-0.5 text-[0.5rem] font-bold uppercase tracking-widest text-brand-orange">
            Ao vivo
          </span>
        </div>
      </motion.div>

      {/* Floating card — Campaign editor (right) */}
      <motion.div
        initial={{ opacity: 0, x: 60, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.85, duration: 0.9, type: "spring" }}
        className="absolute right-[2%] top-[22%] hidden w-[220px] overflow-hidden rounded-2xl border border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.55)] xl:block"
        style={{ animation: "float 11s ease-in-out infinite 1.5s" }}
      >
        <div className="flex items-center gap-1.5 border-b border-white/8 bg-[#111827]/95 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-500/70" />
          <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
          <span className="h-2 w-2 rounded-full bg-green-500/70" />
          <span className="ml-1.5 font-mono text-[0.52rem] tracking-wider text-white/30">
            Campanha
          </span>
        </div>
        <div className="overflow-hidden bg-[#111827]" style={{ aspectRatio: "4/3" }}>
          <AdminCampaignIdentityMockup />
        </div>
        <div className="flex items-center justify-between bg-[#0d1424]/95 px-3 py-1.5">
          <span className="text-[0.55rem] font-semibold text-unik-blue-soft">
            Editor
          </span>
          <span className="rounded-full border border-unik-blue/30 bg-unik-blue/15 px-2 py-0.5 text-[0.5rem] font-bold uppercase tracking-widest text-unik-blue-soft">
            Preview
          </span>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex justify-center"
          >
            <UnikWordmark variant="hero" className="opacity-90" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-orange/20 bg-brand-orange/10 backdrop-blur-sm mb-6"
          >
             <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
             <span className="text-brand-orange text-xs font-bold uppercase tracking-wider font-sans">{h.badge}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight font-heading"
          >
            {h.titleLine1} <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-orange to-red-500">
              {h.titleGradient}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 mb-10 max-w-2xl mx-auto font-light font-sans"
          >
            {h.sub}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
