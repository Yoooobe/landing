"use client";

import { motion } from "framer-motion";
import { PlugZap, RefreshCw, Box, ShieldCheck, Cpu } from "lucide-react";

export default function ApiFeaturesGrid() {
  const features = [
    {
      title: "Webhooks em Tempo Real",
      description: "Assine eventos como 'colaborador_reconhecido' ou 'meta_batida' e atualize seus dashboards em milissegundos.",
      icon: <PlugZap className="w-6 h-6 text-brand-orange" />,
      colSpan: "md:col-span-2",
      delay: 0.1
    },
    {
      title: "Autenticação OAuth / Bearer",
      description: "Segurança enterprise-grade para integrações M2M (Machine to Machine) e Single Sign-On (SAML).",
      icon: <ShieldCheck className="w-6 h-6 text-yoobe-neon-pink" />,
      colSpan: "md:col-span-1",
      delay: 0.2
    },
    {
      title: "Sandbox Developer",
      description: "Ambiente dev.4unik para testar emissão de pontos e resgates sem gastar orçamento real do RH.",
      icon: <Box className="w-6 h-6 text-cyan-400" />,
      colSpan: "md:col-span-1",
      delay: 0.3
    },
    {
      title: "SDKs Prontos",
      description: "Bibliotecas oficiais para Node.js e Python. Acelere o desenvolvimento com tipagem estática.",
      icon: <Cpu className="w-6 h-6 text-yoobe-purple" />,
      colSpan: "md:col-span-2",
      delay: 0.4
    },
    {
      title: "Rate Limits Inteligentes",
      description: "Arquitetura que escala automaticamente para suportar picos de campanhas sazonais e de fim de ano sem engasgos.",
      icon: <RefreshCw className="w-6 h-6 text-green-400" />,
      colSpan: "md:col-span-3",
      delay: 0.5
    }
  ];

  return (
    <section className="py-24 bg-[#0a0f18] relative border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-mono font-heading">
            {"{ Arquitetura_Moderna }"}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-sans">
            Design principles orientados ao desenvolvedor. Construída para não quebrar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: f.delay }}
              className={`glass-panel-dark border border-white/5 rounded-[2rem] p-8 hover:border-white/10 transition-colors group ${f.colSpan}`}
            >
              <div className="p-4 bg-[#141b2d] rounded-2xl inline-block mb-6 border border-white/5 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 font-heading">{f.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm md:text-base font-sans">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
