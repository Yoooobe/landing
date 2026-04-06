"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { motion } from "framer-motion";

export default function GamificationDuality() {
  const { m } = useLocaleMessages();
  const d = m.landingMore.duality;

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-surface-page py-24">
      {/* Background Decor */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-yoobe-neon-pink/5 to-transparent"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-full w-1/2 bg-gradient-to-r from-unik-blue/10 to-transparent"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-sm font-bold tracking-wide uppercase">
            {d.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            {d.titleBefore} <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-brand-orange via-unik-blue-soft to-yoobe-neon-pink bg-clip-text text-transparent">
              {d.titleGradient}
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-sans">{d.sub}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* LADO A: Engine Nativa */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-white/[0.03] border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden group hover:border-yoobe-neon-pink/30 hover:bg-white/[0.04] transition-all"
          >
            {/* Ambient background glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-yoobe-neon-pink/20 rounded-full blur-[80px] group-hover:bg-yoobe-neon-pink/30 transition-all pointer-events-none"></div>
            
            <h3 className="text-2xl font-black text-white mb-4 font-heading flex items-center gap-3">
              <span className="bg-yoobe-neon-pink/20 text-yoobe-neon-pink w-10 h-10 rounded-xl flex items-center justify-center">🎯</span>
              {d.sideA.title}
            </h3>
            <p className="text-white/60 font-sans mb-8 min-h-[50px]">{d.sideA.body}</p>

            {/* SVG Visual */}
            <div className="relative mb-8 flex aspect-[4/3] w-full flex-col justify-end overflow-hidden rounded-2xl border border-white/5 bg-surface-page shadow-inner">
              {/* Leaderboard Mockup */}
              <div className="p-4 space-y-3 relative z-10 w-full">
                {/* 1st Place */}
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-xl p-3 border border-yoobe-neon-pink/30 shadow-[0_0_15px_rgba(231,87,130,0.15)] transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="text-yoobe-neon-pink font-bold w-6 text-center">1º</div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yoobe-neon-pink to-orange-400"></div>
                  <div className="flex-1">
                    <div className="h-2 w-16 bg-white/80 rounded mb-1.5"></div>
                    <div className="h-1.5 w-10 bg-white/40 rounded"></div>
                  </div>
                  <div className="text-brand-orange font-bold text-sm">4.2k pts</div>
                </div>
                {/* 2nd Place */}
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/5 transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                  <div className="text-white/40 font-bold w-6 text-center">2º</div>
                  <div className="w-8 h-8 rounded-full bg-white/20"></div>
                  <div className="flex-1">
                    <div className="h-2 w-20 bg-white/60 rounded mb-1.5"></div>
                    <div className="h-1.5 w-14 bg-white/30 rounded"></div>
                  </div>
                  <div className="text-white/80 font-bold text-sm">3.8k pts</div>
                </div>
                {/* 3rd Place */}
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/5">
                  <div className="text-white/40 font-bold w-6 text-center">3º</div>
                  <div className="w-8 h-8 rounded-full bg-white/10"></div>
                  <div className="flex-1">
                    <div className="h-2 w-14 bg-white/40 rounded mb-1.5"></div>
                    <div className="h-1.5 w-12 bg-white/20 rounded"></div>
                  </div>
                  <div className="text-white/60 font-bold text-sm">2.1k pts</div>
                </div>
              </div>

              {/* Decorative elements behind */}
              <svg className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-50 transition-opacity">
                <circle cx="80%" cy="20%" r="40" fill="url(#neonGradient)" filter="blur(20px)" />
                <defs>
                  <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e75782" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <ul className="space-y-3 font-sans text-sm text-white/70">
              {d.sideA.bullets.map((line) => (
                <li key={line} className="flex gap-2 items-start">
                  <span className="text-yoobe-neon-pink">✓</span> {line}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* LADO B: Integration Layer (Connector) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative flex-1 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all hover:border-unik-blue/30 hover:bg-white/[0.04] lg:p-12"
          >
            {/* Ambient background glow */}
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-unik-blue/20 blur-[80px] transition-all group-hover:bg-unik-blue/30"></div>
            
            <h3 className="mb-4 flex items-center gap-3 font-heading text-2xl font-black text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-unik-blue/20 text-unik-blue-soft">
                🔌
              </span>
              {d.sideB.title}
            </h3>
            <p className="text-white/60 font-sans mb-8 min-h-[50px]">{d.sideB.body}</p>

            {/* SVG Visual */}
            <div className="relative mb-8 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-surface-page shadow-inner">
              
              {/* Nodes Mockup */}
              <div className="relative w-full h-full p-8 flex items-center justify-center">
                {/* Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  <path d="M 50 150 C 150 150, 100 150, 200 150" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" strokeDasharray="4 4" className="transition-colors group-hover:stroke-unik-blue/50" />
                  <path d="M 50 50 C 150 50, 150 150, 200 150" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" strokeDasharray="4 4" className="transition-colors group-hover:stroke-unik-blue/50" />
                  <path d="M 50 250 C 150 250, 150 150, 200 150" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" strokeDasharray="4 4" className="transition-colors group-hover:stroke-unik-blue/50" />
                  
                  {/* Traffic pulses */}
                  <circle cx="0" cy="0" r="3" fill="var(--color-unik-blue)" className="animate-[float_2s_linear_infinite] group-hover:fill-yoobe-neon-pink">
                    <animateMotion dur="2s" repeatCount="indefinite" path="M 50 150 C 150 150, 100 150, 200 150" />
                  </circle>
                  <circle cx="0" cy="0" r="3" fill="var(--color-unik-blue)" className="animate-[float_2s_linear_infinite_0.5s]">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M 50 50 C 150 50, 150 150, 200 150" />
                  </circle>
                </svg>

                {/* Left Nodes */}
                <div className="absolute left-6 top-0 bottom-0 flex flex-col justify-around py-4 z-10 w-16">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-surface-elevated text-white/50 shadow-lg transition-transform group-hover:scale-110">
                    W
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-surface-elevated text-white/50 shadow-lg transition-transform delay-75 group-hover:scale-110">
                    B
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-surface-elevated text-white/50 shadow-lg transition-transform delay-150 group-hover:scale-110">
                    H
                  </div>
                </div>

                {/* Center Yoobe Node */}
                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-brand-orange bg-brand-navy shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all duration-500 group-hover:border-unik-blue group-hover:shadow-[0_0_40px_rgba(37,99,235,0.35)]">
                  <span className="absolute font-heading text-3xl font-black text-white">Y.</span>
                  
                  {/* Circular scanning effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/0">
                    <div className="absolute -top-[25%] -left-[25%] h-[150%] w-[150%] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(37,99,235,0)_0%,rgba(37,99,235,0.28)_50%,rgba(37,99,235,0)_100%)] opacity-0 transition-opacity animate-[spin_4s_linear_infinite] group-hover:opacity-100"></div>
                  </div>
                </div>
              </div>
            </div>

            <ul className="space-y-3 font-sans text-sm text-white/70">
              {d.sideB.bullets.map((line) => (
                <li key={line} className="flex gap-2 items-start">
                  <span className="text-blue-400">✓</span> {line}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
