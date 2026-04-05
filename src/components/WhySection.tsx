"use client";

import { motion } from "framer-motion";

export default function WhySection() {
  const reasons = [
    {
      icon: "🎯",
      title: "Propósito",
      desc: "Acreditamos que reconhecimento transforma cultura. Cada premiação é uma oportunidade de conexão real entre empresa e colaborador."
    },
    {
      icon: "⚡",
      title: "Como fazemos",
      desc: "Unimos gamificação, logística e tecnologia em uma plataforma integrada. Do ponto à entrega, tudo em um só lugar."
    },
    {
      icon: "📈",
      title: "Resultados",
      desc: "Empresas ativas reportam eNPS +30 pontos em 6 meses, taxa de resgate média de 78% e redução de turnover em até 25% no primeiro ano."
    }
  ];

  return (
    <section id="plataforma" className="relative overflow-hidden bg-surface-page py-24">
      {/* Background elements */}
      <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-unik-blue/10 blur-[100px]"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-demo-cyan/5 blur-[80px]"></div>
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 relative z-10">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-sm font-bold tracking-wide uppercase">
            Por que existimos
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            Reconhecimento gera{" "}
            <span className="bg-gradient-to-r from-brand-orange to-unik-blue bg-clip-text text-transparent">
              performance
            </span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto font-sans leading-relaxed">
            65% dos colaboradores não recebem reconhecimento durante o ano. Mudamos isso com gamificação, logística integrada e conformidade total com a LGPD.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {reasons.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="rounded-3xl border border-white/5 bg-surface-elevated p-8 transition-transform duration-300 hover:-translate-y-2 hover:border-unik-blue/20"
            >
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-heading">{item.title}</h3>
              <p className="text-white/60 leading-relaxed font-sans">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
