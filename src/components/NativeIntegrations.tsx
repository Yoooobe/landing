"use client";

import { motion } from "framer-motion";

export default function NativeIntegrations() {
  const mainPlatforms = [
    {
      name: "Workvivo",
      by: "by Zoom",
      logo: "W",
      type: "Employee Experience",
      badge: "API Pronta",
      color: "from-blue-500/20",
      desc: "Plataforma líder de comunicação interna e employee experience. Integre gamificação, reconhecimento e premiações diretamente ao feed social dos colaboradores.",
      features: [
        "Sincronização de usuários via API",
        "Webhooks para eventos em tempo real",
        "SSO via OAuth 2.0",
        "Notificações no feed Workvivo",
        "Integração com Google/Microsoft 365"
      ]
    },
    {
      name: "Beehome",
      by: "Employee Experience",
      logo: "B",
      type: "Intranet Social",
      badge: "API Pronta",
      color: "from-yellow-400/20",
      desc: "Plataforma de endomarketing, comunicação e gestão de pessoas. Gamificação nativa com campanhas de reconhecimento e celebrações automáticas.",
      features: [
        "Gestão de usuários via Bearer Token",
        "Timeline e notificações integradas",
        "Campanhas de reconhecimento",
        "Celebrações de aniversários",
        "Pesquisas e feedback integrados"
      ]
    },
    {
      name: "Humand",
      by: "Corporate Super App",
      logo: "H",
      type: "Digital Workplace",
      badge: "API Pronta",
      color: "from-yoobe-neon-pink/20",
      desc: "App corporativo completo com comunicação, RH, reconhecimento e processos. API RESTful documentada com Swagger e webhooks em tempo real.",
      features: [
        "API RESTful com Swagger",
        "Webhooks em tempo real",
        "Recognition programs nativo",
        "Integração SAP, Workday",
        "Zapier para +5.000 apps"
      ]
    }
  ];

  const extraIntegrations = [
    "Slack", "Microsoft Teams", "Workday", "BambooHR", "SAP SuccessFactors", 
    "Gupy", "TOTVS", "Zapier", "Google Workspace", "Microsoft 365"
  ];

  return (
    <section className="py-24 bg-[#0d1424] relative border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4">
            Integrações Prontas
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            Conectado às maiores <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-cyan-400">plataformas</span> do mundo
          </h2>
          <p className="text-lg text-white/50 mb-16 font-sans">
            API integrada com as principais plataformas de employee experience, comunicação interna e RH do mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {mainPlatforms.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden group bg-[#141b2d] rounded-3xl border border-white/5 p-8 hover:-translate-y-2 transition-all flex flex-col`}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${p.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold text-white">
                    {p.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white leading-tight font-heading">{p.name}</h3>
                    <span className="text-xs text-white/50">{p.by}</span>
                  </div>
                </div>
                <span className="px-2 py-1 bg-white/5 rounded-md text-[10px] font-bold tracking-widest uppercase text-white/70 border border-white/10">
                  {p.badge}
                </span>
              </div>
              
              <p className="text-sm text-white/60 mb-8 leading-relaxed relative z-10 flex-grow">
                {p.desc}
              </p>

              <ul className="space-y-3 relative z-10 border-t border-white/5 pt-6">
                {p.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="text-yoobe-purple flex-shrink-0 mt-0.5">✓</span>
                    <span className="leading-tight">{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Extra Integrations Pills */}
        <div className="text-center pt-8 border-t border-white/5">
          <span className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6 block">Também integramos com:</span>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {extraIntegrations.map((int, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white transition-colors cursor-default">
                {int}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
