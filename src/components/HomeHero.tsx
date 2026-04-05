"use client";

import { motion } from "framer-motion";

export default function HomeHero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-brand-navy-dark pt-24 pb-20">
      {/* Background Effects — 4unik (azul) + demo (ciano) + Yoobe */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-brand-orange/15 blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-1/3 right-1/4 h-[500px] w-[500px] rounded-full bg-unik-blue/20 blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-1/4 left-1/3 h-80 w-80 rounded-full bg-demo-cyan/10 blur-[100px] mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 right-0 z-10 h-1/2 bg-gradient-to-t from-brand-navy-dark to-transparent"></div>
        
        {/* Abstract Network SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" style={{ zIndex: 1 }}>
          <path d="M 10 200 C 300 100, 400 400, 800 300 S 1200 100, 1600 250" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
          <path d="M 50 300 C 250 200, 350 500, 750 400 S 1100 200, 1500 350" stroke="rgba(249,115,22,0.15)" strokeWidth="1" fill="none" />
          <circle cx="0" cy="0" r="2" fill="#F97316" className="animate-[float_8s_linear_infinite]">
            <animateMotion dur="8s" repeatCount="indefinite" path="M 10 200 C 300 100, 400 400, 800 300 S 1200 100, 1600 250" />
          </circle>
          <circle cx="0" cy="0" r="3" fill="#e75782" className="animate-[float_10s_linear_infinite_2s]">
            <animateMotion dur="10s" repeatCount="indefinite" path="M 50 300 C 250 200, 350 500, 750 400 S 1100 200, 1500 350" />
          </circle>
        </svg>

        {/* Tech Grid Background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWNDBoLTQweiBNMzkuNSAwSDQwdjQwaC0uNXoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] bg-repeat opacity-50 z-0"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping"></span>
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">Plataforma de Engajamento Corporativo</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-6 tracking-tight font-heading"
          >
            <strong className="text-unik-blue-soft">4unik</strong> conecta{" "}
            <span className="text-gradient-hero">engajamento,</span>
            <br />
            <span className="text-4xl md:text-6xl text-white/90">recompensas e logística</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed font-sans"
          >
            A plataforma que transforma o dia a dia do seu time. Crie campanhas, gamifique resultados e entregue prêmios físicos na porta da casa de cada colaborador, sem dar dor de cabeça para o RH.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://calendly.com/yoobeco/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-brand-navy-dark font-bold text-lg hover:bg-brand-orange hover:text-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(249,115,22,0.4)]"
            >
              Agendar Demonstração
            </a>
            <a
              href="#platform"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-medium text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Explorar Benefícios
            </a>
          </motion.div>
        </div>

        {/* Floating Data Widgets */}
        <div className="mt-20 relative h-[150px] md:h-20 hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute left-[10%] -top-4 glass-panel-dark px-6 py-4 rounded-2xl flex flex-col gap-1 transform -rotate-2 hover:rotate-0 transition-all cursor-default"
          >
            <span className="text-xs text-brand-orange font-bold uppercase tracking-wider">Adesão do Time</span>
            <span className="text-3xl font-bold text-white">92%</span>
            <span className="text-[10px] text-green-400">↑ Média nos primeiros 30 dias</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute right-[10%] top-6 glass-panel-dark px-6 py-4 rounded-2xl flex flex-col gap-1 transform rotate-3 hover:rotate-0 transition-all z-10 cursor-default"
          >
            <span className="text-xs text-yoobe-neon-pink font-bold uppercase tracking-wider">Trabalho Manual do RH</span>
            <span className="text-3xl font-bold text-white">0%</span>
            <span className="text-[10px] text-white/50">Nós cuidamos da logística</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="absolute left-[40%] top-12 glass-panel-dark px-6 py-4 rounded-2xl flex flex-col gap-1 transform -rotate-1 hover:rotate-0 transition-all cursor-default"
          >
            <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">Satisfação (eNPS)</span>
            <span className="text-3xl font-bold text-white">+42 pts</span>
            <span className="text-[10px] text-green-400">Impacto direto no clima</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
