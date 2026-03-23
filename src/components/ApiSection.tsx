"use client";

import { motion } from "framer-motion";

export default function ApiSection() {
  return (
    <section id="api" className="py-24 bg-[#05080e] relative border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2" >
            <div className="inline-block px-3 py-1 mb-4 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-bold tracking-wide uppercase">
              Para o Time de Tecnologia
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
              Conecte a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Yoobe</span> às ferramentas que seu time já usa
            </h2>
            <p className="text-lg text-white/60 font-sans leading-relaxed mb-8">
              Integração completa e segura com o seu ecossistema atual. Conecte sem atritos com Slack, Teams, sistemas de RH ou Intranets corporativas.
            </p>
            <ul className="space-y-4 mb-10 font-sans">
              <li className="flex items-center text-white/80"><span className="text-blue-400 mr-3">✓</span> Automação de premiações em tempo real</li>
              <li className="flex items-center text-white/80"><span className="text-blue-400 mr-3">✓</span> Login unificado com a segurança da sua empresa</li>
              <li className="flex items-center text-white/80"><span className="text-blue-400 mr-3">✓</span> Documentação moderna para desenvolvedores</li>
              <li className="flex items-center text-white/80"><span className="text-blue-400 mr-3">✓</span> Sincronização automática com seu software de RH</li>
              <li className="flex items-center text-white/80"><span className="text-blue-400 mr-3">✓</span> Ambiente de testes seguro</li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <a href="/api-integracoes" className="inline-flex h-14 items-center justify-center rounded-xl border border-white/20 bg-transparent px-8 font-bold text-white hover:bg-white/5 transition-colors font-sans">
                Documentação e API para Devs
              </a>
              <a href="https://calendly.com/yoobeco/demo" target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center rounded-xl bg-blue-500 px-8 font-bold text-white hover:bg-blue-600 transition-colors font-sans shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                Solicitar Acesso à API
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-[#0d1117] border border-white/10 rounded-2xl p-6 shadow-2xl relative"
            >
              <div className="flex gap-2.5 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="font-mono text-sm leading-relaxed overflow-x-auto text-white">
                <code className="block">
<span className="text-gray-500 italic">// Criar premiação via API</span>{"\n"}
<span className="text-pink-400 font-bold">const</span> response = <span className="text-pink-400 font-bold">await</span> fetch({"{"}{"\n"}  
  <span className="text-green-300">'https://api.yoobe.co/v1/rewards'</span>,{"\n"}
  {"{"}
    method: <span className="text-green-300">'POST'</span>,{"\n"}
    headers: {"{"}{"\n"}
      <span className="text-blue-300">'Authorization'</span>: <span className="text-green-300">`Bearer {"${token}"}`</span>,{"\n"}
      <span className="text-blue-300">'Content-Type'</span>: <span className="text-green-300">'application/json'</span>{"\n"}
    {"}"},{"\n"}
    body: JSON.stringify({"{"}{"\n"}
      employee_id: <span className="text-green-300">'emp_482'</span>,{"\n"}
      points: <span className="text-orange-300">1500</span>,{"\n"}
      reason: <span className="text-green-300">'Meta Q1 atingida'</span>{"\n"}
    {"}"}){"\n"}
  {"}"}
{")"}
                </code>
              </pre>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
