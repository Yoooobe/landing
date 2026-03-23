"use client";

import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const testimonials = [
    {
      text: `"A Yoobe transformou nosso programa de reconhecimento. Em 3 meses, vimos um aumento de 40% no engajamento dos colaboradores e redução significativa no turnover."`,
      author: "Marina Costa",
      role: "Head de RH",
      company: "Tech Company (500+ colaboradores)",
      avatar: "MC"
    },
    {
      text: `"A integração via API foi surpreendentemente simples. Em menos de uma semana já estávamos com a plataforma rodando integrada ao nosso HRIS."`,
      author: "Rafael Santos",
      role: "CTO",
      company: "Fintech (200+ colaboradores)",
      avatar: "RS"
    },
    {
      text: `"Os welcome kits personalizados elevaram nossa employer branding a outro nível. Cada novo colaborador se sente especial desde o primeiro dia."`,
      author: "Ana Pereira",
      role: "People Ops",
      company: "E-commerce (1.000+ colaboradores)",
      avatar: "AP"
    }
  ];

  return (
    <section className="py-24 bg-[#0d1424] relative border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 relative z-10 text-white">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 text-yoobe-purple text-sm font-bold tracking-wide uppercase">
            Depoimentos
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-heading">
            O que nossos clientes <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-purple to-yoobe-neon-pink">dizem</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {testimonials.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#141b2d] border border-white/5 p-8 rounded-3xl flex flex-col justify-between"
            >
              <div>
                <div className="text-brand-orange text-xl mb-4 tracking-widest">★★★★★</div>
                <p className="text-white/80 font-sans leading-relaxed text-lg mb-8 italic">
                  {item.text}
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yoobe-purple to-fuchsia-600 flex items-center justify-center font-bold text-white text-lg font-heading">
                  {item.avatar}
                </div>
                <div>
                  <div className="font-bold text-white font-heading">{item.author}</div>
                  <div className="text-xs text-white/50 font-sans">{item.role} — {item.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
