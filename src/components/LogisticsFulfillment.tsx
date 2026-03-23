"use client";

import { motion } from "framer-motion";
import { Globe, CheckCircle2 } from "lucide-react";

export default function LogisticsFulfillment() {
  return (
    <section className="py-24 bg-[#0f172a] border-t border-white/5 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
            Logística ponta a ponta.
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Não somos apenas um software. Somos os donos do armazém. O prêmio resgatado é processado, embalado e despachado pelas nossas facilities com precisão militar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel-dark p-8 rounded-3xl border border-white/5"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
              <PackageIcon className="text-white w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-heading">Estoque Próprio</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Armazene seus brindes corporativos (swag) conosco ou utilize o nosso catálogo de parceiros. Fulfillment B2C para a residência de cada colaborador.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel-dark p-8 rounded-3xl border border-white/5"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
              <Globe className="text-white w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-heading">Cobertura Nacional</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Integração profunda com correios e transportadoras privadas para garantir frete otimizado e entrega rastreada até as regiões mais remotas.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel-dark p-8 rounded-3xl border border-white/5"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
              <CheckCircle2 className="text-white w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-heading">Resolução de Sinistros</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Extraviou? Quebrou? Nós fazemos o reenvio e a logística reversa automaticamente sem acionar a sua equipe de RH.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Custom simple Package icon since lucide package might be slightly different stylistically
function PackageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16.5 9.4 7.5 4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" y1="22" x2="12" y2="12" />
    </svg>
  );
}
