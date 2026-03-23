"use client";

import { motion } from "framer-motion";

export default function ManagementSection() {
  const features = [
    { icon: "📊", title: "Dashboard Analítico", desc: "Métricas de engajamento, eNPS, taxa de resgate e ROI do programa em tempo real." },
    { icon: "📦", title: "Logística Integrada", desc: "Rastreamento de envios, gestão de estoque e entregas em até 48h para todo o Brasil." },
    { icon: "👥", title: "Gestão de Colaboradores", desc: "Importação em massa, segmentação por área/filial e controle de saldos individualizado." },
    { icon: "🔒", title: "Segurança & Compliance", desc: "LGPD compliant, SSO, audit logs e controle granular de permissões por perfil." }
  ];

  return (
    <section id="gestao" className="py-24 bg-brand-navy-dark relative border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 relative z-10 text-white">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-blue-400/30 bg-blue-400/10 text-blue-400 text-sm font-bold tracking-wide uppercase">
            Plataforma de Gestão
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 font-heading">
            Do pedido à <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">entrega</span>, tudo sob controle
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto font-sans leading-relaxed">
            Dashboard completo para gerenciar premiações, acompanhar envios e gerar relatórios em tempo real.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {features.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors"
            >
              <div className="text-4xl mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3 font-heading">{item.title}</h3>
              <p className="text-sm text-white/60 font-sans leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
