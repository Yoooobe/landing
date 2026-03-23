"use client";

import { motion } from "framer-motion";

export default function GamificationSummary() {
  const cards = [
    { icon: "🏅", title: "Pontos & Rankings", desc: "Sistema de pontos configurável + leaderboards por equipe ou individual. Reconhecimento visível e justo." },
    { icon: "🎯", title: "Missões & Desafios", desc: "Campanhas temáticas, metas por OKR, desafios com prazo e premiações automáticas. Engajamento contínuo." },
    { icon: "🎖️", title: "Badges & Níveis", desc: "Insignias de conquista, trilhas de progressão e certificações digitais. O colaborador acompanha sua jornada." },
    { icon: "🛒", title: "Resgate de Prêmios", desc: "+5.000 produtos reais no marketplace. Colaborador escolhe e recebe em casa. Sem burocracia para o RH." }
  ];

  return (
    <section id="gamificacao" className="py-24 bg-brand-navy-dark relative border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 relative z-10 text-white">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 text-yoobe-purple text-sm font-bold tracking-wide uppercase">
            Gamificação Corporativa
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 font-heading">
            Gamificação que <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-yoobe-neon-pink">engaja</span>. A Yoobe executa.
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto font-sans leading-relaxed">
            83% dos colaboradores se sentem mais motivados com gamificação. Pontos, rankings, missões e prêmios reais — tudo em uma plataforma integrada.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative z-10">
          {cards.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:-translate-y-2 transition-transform"
            >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-heading">{item.title}</h3>
              <p className="text-sm text-white/60 font-sans leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
