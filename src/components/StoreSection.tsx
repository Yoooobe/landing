"use client";

import { motion } from "framer-motion";

export default function StoreSection() {
  const usecases = [
    { emoji: "🎉", title: "Welcome Kits", desc: "Impressione desde o primeiro dia com kits personalizados com a identidade da empresa." },
    { emoji: "🏆", title: "Reconhecimento", desc: "Celebre marcos de carreira, metas batidas e aniversários com presentes significativos." },
    { emoji: "🎁", title: "Clientes & Parceiros", desc: "Fortaleça relações com experiências de marca premium para stakeholders externos." },
    { emoji: "🎓", title: "Eventos & Feiras", desc: "Destaque-se com swags criativos e kits temáticos que geram lembrança de marca." }
  ];

  return (
    <section id="loja" className="py-24 bg-brand-navy-dark relative border-t border-white/5 overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute right-[-10%] bottom-[-20%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] opacity-20 pointer-events-none mix-blend-screen">
        <div className="w-full h-full bg-gradient-to-tl from-green-500/20 to-transparent rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 relative z-10 text-white">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-bold tracking-wide uppercase">
            Loja Corporativa & Kits
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 font-heading">
            Milhares de <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">opções</span> para cada momento
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto font-sans leading-relaxed">
            +5.000 produtos, +100 categorias. Monte kits personalizados ou deixe o colaborador escolher.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative z-10">
          {usecases.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#141b2d] border border-white/5 p-8 rounded-3xl"
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-xl font-bold text-white mb-3 font-heading">{item.title}</h3>
              <p className="text-sm text-white/60 font-sans leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          <a href="https://catalogo.yoobe.co" target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center rounded-xl bg-white px-8 font-bold text-brand-navy-dark hover:bg-gray-100 transition-colors font-sans">
            Acessar Catálogo
          </a>
          <a href="https://catalogo.yoobe.co/kits" target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center rounded-xl border border-white/20 bg-transparent px-8 font-bold text-white hover:bg-white/5 transition-colors font-sans">
            Montar Kit Personalizado
          </a>
        </div>
      </div>
    </section>
  );
}
