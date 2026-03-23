"use client";

import { Package, LineChart, Target, Gift, ShoppingBag, Lock } from "lucide-react";

export default function ApiPlatformModules() {
  const modules = [
    {
      icon: <Package className="w-8 h-8 text-blue-400" />,
      title: "Logística Integrada",
      desc: "Rastreamento de envios, armazenagem e entregas em até 48h para todo o Brasil. Rastreio last-mile e SLA de entrega em um painel único.",
    },
    {
      icon: <LineChart className="w-8 h-8 text-green-400" />,
      title: "Estoque e Catálogo",
      desc: "+5.000 produtos, controle de disponibilidade, centros de custo e orçamentos. Portal de fornecedores e mix físico e digital.",
    },
    {
      icon: <Target className="w-8 h-8 text-yoobe-neon-pink" />,
      title: "Campanhas e Gamificação",
      desc: "Campanhas temporárias, pontuação peer-to-peer, badges e conversão de metas em pontos. Motor de premiações plugado ao seu RH.",
    },
    {
      icon: <Gift className="w-8 h-8 text-brand-orange" />,
      title: "Eventos e Kits",
      desc: "Welcome kits, premiação, feiras e gifting corporativo. Kits personalizados com identidade da empresa e envio on-demand.",
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-cyan-400" />,
      title: "Loja e Resgate",
      desc: "Loja multi-moeda, resgate com pontos, envio de presentes e produtos digitais. Experiência B2C para o colaborador.",
    },
    {
      icon: <Lock className="w-8 h-8 text-yoobe-purple" />,
      title: "Gestão e Segurança",
      desc: "Dashboard analítico, SSO, LGPD, audit logs e permissões granulares. SAML/Active Directory, Okta e Google Workspace.",
    },
  ];

  return (
    <section className="py-24 bg-[#0d1424] relative text-center overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4">
            Plataforma como um todo
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            Logística, estoque, campanhas e <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-fuchsia-600">eventos</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-sans">
            A API não é um add-on. Ela faz parte de uma operação SaaS complète de recompensas, brindes corporativos e premiações.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m, i) => (
            <div key={i} className="bg-[#121824] border border-white/10 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 text-left group">
              <div className="mb-6 bg-white/5 p-4 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                {m.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-heading">{m.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed font-sans">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
