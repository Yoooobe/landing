"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-brand-navy-dark">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(circle at center, black 20%, transparent 80%)", WebkitMaskImage: "radial-gradient(circle at center, black 20%, transparent 80%)" }} />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="text-sm font-bold uppercase tracking-wider text-white/90 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-orange shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
              Reward Infrastructure
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight text-white leading-[1.1]"
          >
            Gamificação para RH. <br />
            <span className="text-gradient">
              Recompensas reais, <br className="md:hidden" />integração em dias.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed"
          >
            Infraestrutura de recompensas para plataformas de gamificação e employee engagement. Sua plataforma gerencia a experiência; a 4Unik gerencia catálogo, logística e fulfillment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <a
              href="https://calendly.com/yoobeco/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center rounded-full bg-white px-10 font-bold text-brand-navy-dark shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all hover:bg-brand-orange hover:text-white hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(249,115,22,0.4)]"
            >
              Agendar Demonstração
            </a>
            <a
              href="#bento"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-10 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10"
            >
              Explorar Features
            </a>
          </motion.div>
        </div>

        {/* Floating Widgets */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative w-full max-w-4xl mx-auto h-[300px] mt-16 hidden lg:block"
        >
          {/* Widget 1 */}
          <motion.div 
             animate={{ y: [-10, 10, -10] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-0 left-[10%] bg-brand-navy-dark/70 backdrop-blur-xl border border-white/10 border-t-2 border-t-green-500 rounded-2xl p-6 shadow-2xl"
          >
            <div className="text-xs text-white/60 uppercase tracking-widest mb-1">Pedidos Hoje</div>
            <div className="text-3xl font-bold text-white">148</div>
            <div className="mt-2 text-xs bg-green-500/15 text-green-400 px-2 py-1 rounded inline-block">↑ 12% vs last week</div>
          </motion.div>

          {/* Widget 2 */}
          <motion.div 
             animate={{ y: [10, -10, 10] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute top-[40px] right-[10%] bg-brand-navy-dark/70 backdrop-blur-xl border border-white/10 border-t-2 border-t-brand-orange rounded-2xl p-6 shadow-2xl"
          >
            <div className="text-xs text-white/60 uppercase tracking-widest mb-1">Faturamento</div>
            <div className="text-3xl font-bold text-white">R$ 54k</div>
            <div className="mt-2 text-xs bg-brand-orange/15 text-brand-orange px-2 py-1 rounded inline-block">↑ 8% no mês</div>
          </motion.div>

          {/* Widget 3 */}
          <motion.div 
             animate={{ y: [-15, 15, -15] }}
             transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
             className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-brand-navy-dark/70 backdrop-blur-xl border border-white/10 border-t-2 border-t-yoobe-purple rounded-2xl p-6 shadow-2xl"
          >
            <div className="text-xs text-white/60 uppercase tracking-widest mb-1">Pontos Trocados</div>
            <div className="text-3xl font-bold text-white">45.000</div>
            <div className="mt-2 text-xs bg-yoobe-purple/15 text-yoobe-purple px-2 py-1 rounded inline-block">Alto Volume</div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
