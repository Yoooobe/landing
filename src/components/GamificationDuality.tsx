// SCREENSHOTS: Use imagens reais de /public/screens/ — NÃO substituir por SVG, JSX mockup ou ilustrações de cms-seed/
"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { withBasePath } from "@/lib/basePath";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GamificationDuality() {
  const { m } = useLocaleMessages();
  const d = m.landingMore.duality;

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-surface-page py-24">
      {/* Background Decor */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 bg-linear-to-l from-yoobe-neon-pink/5 to-transparent"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-full w-1/2 bg-linear-to-r from-unik-blue/10 to-transparent"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-sm font-bold tracking-wide uppercase">
            {d.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            {d.titleBefore} <br className="hidden md:block" />
            <span className="bg-linear-to-r from-brand-orange via-unik-blue-soft to-yoobe-neon-pink bg-clip-text text-transparent">
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
            className="flex-1 bg-white/3 border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden group hover:border-yoobe-neon-pink/30 hover:bg-white/4 transition-all"
          >
            {/* Ambient background glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-yoobe-neon-pink/20 rounded-full blur-[80px] group-hover:bg-yoobe-neon-pink/30 transition-all pointer-events-none"></div>
            
            <h3 className="text-2xl font-black text-white mb-4 font-heading flex items-center gap-3">
              <span className="bg-yoobe-neon-pink/20 text-yoobe-neon-pink w-10 h-10 rounded-xl flex items-center justify-center">🎯</span>
              {d.sideA.title}
            </h3>
            <p className="text-white/60 font-sans mb-8 min-h-[50px]">{d.sideA.body}</p>

            <div className="relative mb-8 aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/5 bg-surface-page shadow-inner">
              <Image
                src={withBasePath("/screens/gamif-niveis.webp")}
                alt={d.sideA.title}
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
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
            className="group relative flex-1 overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-8 transition-all hover:border-unik-blue/30 hover:bg-white/4 lg:p-12"
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

            <div className="relative mb-8 aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/5 bg-surface-page shadow-inner">
              <Image
                src={withBasePath("/screens/pix-step-1-banks.webp")}
                alt={d.sideB.title}
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
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
