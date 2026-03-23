"use client";

import { motion } from "framer-motion";

export default function ClientsSection() {
  const logos = [
    { src: "/clients/yampi.png", alt: "Yampi" },
    { src: "/clients/prio.png", alt: "PRIO" },
    { src: "/clients/hapvida.png", alt: "Hapvida" },
    { src: "/clients/join.svg", alt: "Join" },
    { src: "/clients/tecnospeed.svg", alt: "Tecnospeed" },
    { src: "/clients/boticario.png", alt: "O Boticário" },
    { src: "/clients/w1-consultoria.svg", alt: "W1 Consultoria" },
    { src: "/clients/contabilizei.svg", alt: "Contabilizei" }
  ];

  return (
    <section id="clientes" className="py-24 bg-brand-navy-dark relative border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 relative z-10 text-white">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-white/20 bg-white/5 text-white/80 text-sm font-bold tracking-wide uppercase">
            Quem confia na Yoobe
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 font-heading">
            Empresas que já <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">transformaram</span> seu RH
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto font-sans leading-relaxed">
            De startups a grandes corporações, ajudamos equipes de RH a criar programas de reconhecimento que funcionam.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
          {logos.map((logo, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="bg-[#141b2d] border border-white/5 p-6 rounded-2xl flex items-center justify-center min-h-[120px] group"
              title={logo.alt}
            >
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="max-h-12 max-w-[140px] opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 object-contain" 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
