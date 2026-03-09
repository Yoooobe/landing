"use client";

import { motion } from "framer-motion";

export default function CasosDeUsoPage() {
  const cases = [
    {
      title: "Reconhecimento de Pares (Peer-to-Peer)",
      description: "Colaboradores distribuem pontos entre si baseados nos valores da empresa. A Yoobe liquida as recompensas.",
      icon: "👥",
      color: "border-brand-orange/50 bg-brand-orange/5"
    },
    {
      title: "Aceleração de B2B Vendas (SPIFFs)",
      description: "Esqueça pagar prêmios por fora e lidar com complexidade tributária. Gamifique campanhas de vendas e entregue via Wallet Yoobe.",
      icon: "📈",
      color: "border-green-500/50 bg-green-500/5"
    },
    {
      title: "Onboarding Tematizado",
      description: "Kits de boas-vindas acionados automaticamente via API quando o novo talento preenche a documentação pelo sistema de admissão.",
      icon: "🎁",
      color: "border-yoobe-purple/50 bg-yoobe-purple/5"
    },
    {
      title: "Batalhas de Engajamento",
      description: "Integração direta de pontuações via dashboards B2B recompensando departamentos produtivos em ciclos quinzenais.",
      icon: "⚔️",
      color: "border-yoobe-neon-pink/50 bg-yoobe-neon-pink/5"
    }
  ];

  return (
    <div className="pt-24 pb-20 overflow-hidden relative min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Nenhuma campanha é <span className="text-brand-orange">complexa demais.</span>
          </motion.h1>
          <p className="text-xl text-white/70">
            A infraestrutura abstrata da Yoobe serve qualquer arquitetura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-2xl glass-panel-dark border ${c.color} hover:-translate-y-1 transition-transform`}
            >
              <div className="text-4xl mb-4">{c.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{c.title}</h3>
              <p className="text-white/70 leading-relaxed">{c.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
           <a href="https://calendly.com/yoobeco/demo" target="_blank" rel="noopener noreferrer" className="btn-b btn-primary-b bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-brand-orange/20">
             Discutir meu Caso de Uso Específico
           </a>
        </div>
      </div>
    </div>
  );
}
