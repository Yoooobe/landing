"use client";

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
              emissão de <strong>Yoobes</strong> (sua moeda ou a nossa) 
              em tempo real no dashboard do gestor.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 text-white/80"
            >
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] border border-white/20">🏆</div>
                <strong className="text-lg">Achievements Padrões ou Customizados</strong>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-white/20">🎯</div>
                <strong className="text-lg">Gestão de Moeda Própria (Currency)</strong>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] border border-white/20">🚀</div>
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

          {/* Abstract UI Mockup Right */}
          <div className="lg:w-1/2 relative w-full h-[500px] z-10">
            {/* Blurry Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-yoobe-purple/30 blur-[100px] rounded-full z-0" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative z-10 glass-panel-dark rounded-2xl border border-white/10 shadow-2xl p-6 w-full h-full flex flex-col"
            >
               {/* UI Header Mock */}
               <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                 <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/80" />
                   <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                   <div className="w-3 h-3 rounded-full bg-green-500/80" />
                 </div>
                 <div className="text-xs text-white/40 font-mono">/gestor/currency</div>
               </div>

               {/* Simulated App Content */}
               <div className="flex-1 flex flex-col gap-4">
                  <div className="flex justify-between items-center bg-white/5 rounded-xl p-4">
                    <div>
                      <div className="text-xs text-white/50 mb-1">Total Emitido (Este Mês)</div>
                      <div className="text-2xl font-bold text-white">45.000 <span className="text-yoobe-neon-pink text-lg">Pts</span></div>
                    </div>
                    <div className="h-10 w-24 bg-gradient-to-r from-yoobe-purple/50 to-yoobe-neon-pink/50 rounded-lg opacity-80" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="text-xs text-white/50 mb-2">Achievement Mais Ativo</div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-yellow-400/20 flex items-center justify-center text-yellow-400">🏆</div>
                        <div className="text-sm font-medium text-white">Batedor de Meta</div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="text-xs text-white/50 mb-2">Engajamento</div>
                      <div className="text-xl font-bold text-green-400">+24% vs. Trimestre</div>
                    </div>
                  </div>

                  {/* Mystery Blur overlay simulating deeper rules engine */}
                  <div className="flex-1 relative mt-4 rounded-xl border border-white/5 bg-black/20 overflow-hidden">
                     <div className="absolute inset-0 bg-white/5 backdrop-blur-sm flex items-center justify-center z-10 transition-all hover:backdrop-blur-none cursor-pointer group">
                        <a href="https://calendly.com/yoobeco/demo" target="_blank" rel="noopener noreferrer" className="bg-white/10 text-white px-4 py-2 rounded-md font-medium text-sm shadow-xl border border-white/20 group-hover:scale-105 transition-transform">
                          Desbloquear Regras de Gamificação (Demo)
                        </a>
                     </div>
                     <div className="opacity-30 p-4 space-y-2 pointer-events-none">
                       <div className="h-4 w-3/4 bg-white/20 rounded" />
                       <div className="h-4 w-1/2 bg-white/20 rounded" />
                       <div className="h-4 w-5/6 bg-white/20 rounded" />
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
