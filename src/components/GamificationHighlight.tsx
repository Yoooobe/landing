// SCREENSHOTS: Use imagens reais de /public/screens/ — NÃO substituir por SVG, JSX mockup ou ilustrações de cms-seed/
"use client";

import FeatureScreensCarousel from "@/components/FeatureScreensCarousel";
import { motion } from "framer-motion";

export default function GamificationHighlight() {
  return (
    <section id="gamificacao" className="py-24 bg-brand-navy border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Content Left */}
          <div className="lg:w-1/2 space-y-8 z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center rounded-full border border-brand-orange/50 bg-brand-orange/10 px-4 py-1.5"
            >
              <span className="text-sm font-semibold text-brand-orange">
                Motor de Gamificação
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white leading-tight"
            >
              Sua lógica, nossa moeda.<br />
              <span className="text-gradient">Resultados Imediatos.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-white/70 leading-relaxed max-w-xl"
            >
              Você define as regras. Nós gerenciamos o ecossistema. Crie
              Achievements personalizados, leaderboards e acompanhe a
              emissão de <strong>4Unik Coins</strong> (sua moeda ou a nossa) 
              em tempo real no dashboard do gestor.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 text-white/80"
            >
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-500 to-amber-700 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] border border-white/20">🏆</div>
                <strong className="text-lg">Achievements Padrões ou Customizados</strong>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-white/20">🎯</div>
                <strong className="text-lg">Gestão de Moeda Própria (Currency)</strong>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] border border-white/20">🚀</div>
                <strong className="text-lg">Leaderboards e Missões</strong>
              </li>
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-6"
            >
              <a href="https://calendly.com/yoobeco/demo" target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-10 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10">
                Ver Funcionamento na Prática
              </a>
            </motion.div>
          </div>

          {/* Screenshots da plataforma (carrossel) */}
          <div className="lg:w-1/2 relative w-full z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full max-h-[520px] bg-yoobe-purple/20 blur-[100px] rounded-full z-0 pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative z-10 w-full"
            >
              <FeatureScreensCarousel variant="gamification" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
