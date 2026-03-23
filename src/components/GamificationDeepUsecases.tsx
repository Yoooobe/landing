export default function GamificationDeepUsecases() {
  const cases = [
    {
      icon: "🎉",
      title: "Welcome Kits & Onboarding",
      desc: "Impressione desde o primeiro dia. Trilhas de onboarding gamificadas, welcome kits premium e missões de integração que reduzem o turnover nos primeiros 45 dias.",
      hook: "A primeira impressão define a jornada",
    },
    {
      icon: "🎂",
      title: "Aniversários & Marcos",
      desc: "Celebre cada ano de dedicação automaticamente. Pontos bônus, badges de tempo de casa e presentes personalizados que mostram que cada colaborador importa.",
      hook: "Cada ano merece ser celebrado",
    },
    {
      icon: "🎯",
      title: "Metas, OKRs & Vendas",
      desc: "Equipes de vendas gamificadas atingem cotas 78% mais rápido. Leaderboards de performance, missões trimestrais e premiações por resultado.",
      hook: "Performance reconhecida, performance repetida",
    },
    {
      icon: "🤝",
      title: "Peer Recognition",
      desc: "Reconhecimento entre colegas é a forma mais autêntica de valorização. Sistema de kudos, cartões de reconhecimento e pontos entre pares.",
      hook: "Quem melhor reconhece é quem convive",
    },
    {
      icon: "📚",
      title: "Treinamentos & Capacitação",
      desc: "Transforme treinamentos em experiências. Trilhas de aprendizado com pontos, certificações digitais e competições de conhecimento.",
      hook: "Aprender pode ser divertido",
    },
    {
      icon: "🎪",
      title: "Eventos & Feiras",
      desc: "Engaje participantes com QR codes, check-ins gamificados, missões durante o evento e swags como recompensa. Gere buzz e dados.",
      hook: "Transforme eventos em experiências",
    },
  ];

  return (
    <section className="py-24 bg-[#0a0f18] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4">
            Casos de Uso
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            Gamificação para cada <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-fuchsia-600">momento</span>
          </h2>
          <p className="text-lg text-white/60">
            Da integração de novos colaboradores a campanhas de vendas, a gamificação se adapta a cada necessidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, idx) => (
            <div key={idx} className="bg-[#121824] border border-white/10 p-8 rounded-2xl hover:border-yoobe-purple/50 transition-all hover:bg-[linear-gradient(135deg,#121824_0%,#1a1025_100%)] group">
              <div className="text-4xl mb-4 group-hover:-translate-y-1 transition-transform">
                {c.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yoobe-purple transition-colors">
                {c.title}
              </h3>
              <p className="text-white/60 mb-6 text-sm leading-relaxed">
                {c.desc}
              </p>
              <div className="mt-auto border-t border-white/5 pt-4">
                <span className="text-yoobe-purple text-xs font-semibold italic">
                  "{c.hook}"
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
