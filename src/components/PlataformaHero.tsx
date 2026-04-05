"use client";

import UnikWordmark from "@/components/UnikWordmark";
import { motion } from "framer-motion";

export default function PlataformaHero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-brand-navy-dark">
      {/* Abstract Grid & Glow */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWNDBoLTQweiBNMzkuNSAwSDQwdjQwaC0uNXoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] bg-repeat opacity-40"></div>
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

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
             <span className="text-brand-orange text-xs font-bold uppercase tracking-wider font-sans">Controle Total da Operação</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight font-heading"
          >
            Visibilidade total. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">
              Decisões mais rápidas.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 mb-10 max-w-2xl mx-auto font-light font-sans"
          >
            Dashboard analítico em tempo real com métricas de eNPS, ROI e taxas de resgate. Aprovação de orçamentos, importação em massa e exportação direta para o ERP — com conformidade total à LGPD.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
