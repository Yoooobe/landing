"use client";

import GamificationDemoStrip from "@/components/GamificationDemoStrip";
import { motion } from "framer-motion";

export default function GamificationSummary() {
  const cards = [
    { icon: "🏅", title: "Pontos & Rankings", desc: "Sistema de pontos configurável + leaderboards por equipe ou individual. Reconhecimento visível e justo." },
    { icon: "🎯", title: "Missões & Desafios", desc: "Campanhas temáticas, metas por OKR, desafios com prazo e premiações automáticas. Engajamento contínuo." },
    { icon: "🎖️", title: "Badges & Níveis", desc: "Insignias de conquista, trilhas de progressão e certificações digitais. O colaborador acompanha sua jornada." },
    { icon: "🛒", title: "Resgate de Prêmios", desc: "+5.000 produtos reais no marketplace. Colaborador escolhe e recebe em casa. Sem burocracia para o RH." }
  ];

  return (
    <section id="gamificacao" className="section-gradient-bg relative border-t border-white/5 py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="relative z-10 mb-16 text-center text-white">
          <div className="mb-4 inline-block rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-yoobe-purple">
            Gamificação Corporativa
          </div>
          <h2 className="mb-6 font-heading text-3xl font-black md:text-5xl">
            Gamificação que <span className="text-gradient">engaja</span>. A Yoobe executa.
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/50 font-sans">
            83% dos colaboradores se sentem mais motivados com gamificação. Pontos, rankings, missões e prêmios reais — tudo em uma plataforma integrada.
          </p>
        </div>

        <GamificationDemoStrip />

        <div className="relative z-10 mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-3xl border border-white/10 bg-surface-elevated/80 p-6 backdrop-blur-sm transition-transform hover:-translate-y-2 hover:border-unik-blue/25"
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
