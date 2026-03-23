"use client";

import { Coins, Trophy, Medal, Goal, Rocket, Store } from "lucide-react";

export default function MechanicsGrid() {
  const mechanics = [
    {
      id: "01",
      icon: <Coins className="w-8 h-8 text-yellow-400" />,
      badge: "Fundamental",
      title: "Sistema de Pontos",
      description: "Colaboradores acumulam pontos por ações configuráveis: metas atingidas, peer recognition, participação em treinamentos, aniversários e muito mais.",
      features: ["Pontos por metas e OKRs", "Reconhecimento entre pares", "Bonificação por tempo de casa", "Segmentação por tags (presencial / híbrido)"],
      gradient: "from-yellow-400/20 to-orange-500/0",
      border: "hover:border-yellow-400/50"
    },
    {
      id: "02",
      icon: <Trophy className="w-8 h-8 text-brand-orange" />,
      badge: "Competição Saudável",
      title: "Leaderboards & Rankings",
      description: "Rankings individuais ou por equipe, departamento ou região. Visibilidade gera motivação e um senso de jogo justo e transparente.",
      features: ["Rankings por período", "Filtros por equipe / região", "Rankings individuais ou por equipe", "Colaboração vs. competição"],
      gradient: "from-brand-orange/20 to-red-500/0",
      border: "hover:border-brand-orange/50"
    },
    {
      id: "03",
      icon: <Medal className="w-8 h-8 text-yoobe-neon-pink" />,
      badge: "Reconhecimento Visual",
      title: "Badges & Conquistas",
      description: "Insignias visuais para competências, marcos de carreira e contribuições especiais. Colecionáveis e compartilháveis.",
      features: ["Badges personalizáveis", "Coleção de conquistas", "Compartilhamento social", "Certificações digitais"],
      gradient: "from-yoobe-neon-pink/20 to-pink-600/0",
      border: "hover:border-yoobe-neon-pink/50"
    },
    {
      id: "04",
      icon: <Goal className="w-8 h-8 text-blue-400" />,
      badge: "Engajamento Ativo",
      title: "Missões & Desafios",
      description: "Campanhas temáticas com prazo, regras e recompensas. Baseadas em metas/OKRs, datas comemorativas e desafios de equipe.",
      features: ["Missões baseadas em metas/OKRs", "Missões em equipe", "Campanhas sazonais", "Premiações automáticas"],
      gradient: "from-blue-400/20 to-indigo-500/0",
      border: "hover:border-blue-400/50"
    },
    {
      id: "05",
      icon: <Rocket className="w-8 h-8 text-yoobe-purple" />,
      badge: "Progressão",
      title: "Níveis & Progressão",
      description: "Sistema de níveis que reflete a jornada do colaborador. Quanto mais engajado, mais benefícios e reconhecimento recebe.",
      features: ["Trilhas de progressão", "Benefícios por nível", "Marcos de carreira", "Gamificação de onboarding"],
      gradient: "from-yoobe-purple/20 to-fuchsia-500/0",
      border: "hover:border-yoobe-purple/50"
    },
    {
      id: "06",
      icon: <Store className="w-8 h-8 text-green-400" />,
      badge: "Recompensas Reais",
      title: "Marketplace de Premiações",
      description: "+5.000 produtos reais para resgate. Colaboradores escolhem sua premiação e recebem em casa. Sem burocracia para o RH.",
      features: ["+5.000 produtos", "Entrega em todo Brasil", "Kits personalizados", "Catálogo de experiências"],
      gradient: "from-green-400/20 to-emerald-500/0",
      border: "hover:border-green-400/50"
    }
  ];

  return (
    <section id="mechanics" className="py-24 bg-[#0d1424] relative z-10 border-t border-white/5">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4">
            Mecânicas de Gamificação
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-heading">
            6 pilares que <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-fuchsia-600">transformam</span> o engajamento
          </h2>
          <p className="text-lg text-white/60">
            Cada mecânica é configurável e adaptável à cultura da sua empresa. Combine-as para criar programas únicos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mechanics.map((item) => (
            <div 
              key={item.id}
              className={`group relative overflow-hidden rounded-[2rem] bg-[#141b2d] border border-white/5 p-8 transition-all duration-300 ${item.border} hover:-translate-y-2 hover:shadow-2xl`}
            >
              {/* Internal Gradient Glow */}
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${item.gradient} blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-white/5 border border-white/10 rounded-full text-white/70">
                      {item.badge}
                    </span>
                    <div className="text-4xl font-black text-white/5 font-mono select-none">{item.id}</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors font-heading">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-medium mb-6">
                  {item.description}
                </p>
                <ul className="space-y-2">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-yoobe-purple/50"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
