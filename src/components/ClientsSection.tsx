"use client";

import { withBasePath } from "@/lib/basePath";
import { motion } from "framer-motion";

export default function ClientsSection() {
  const logos = [
    { src: withBasePath("/clients/yampi.png"), alt: "Yampi" },
    { src: withBasePath("/clients/prio.png"), alt: "PRIO" },
    { src: withBasePath("/clients/hapvida.png"), alt: "Hapvida" },
    { src: withBasePath("/clients/join.svg"), alt: "Join" },
    { src: withBasePath("/clients/tecnospeed.svg"), alt: "Tecnospeed" },
    { src: withBasePath("/clients/boticario.png"), alt: "O Boticário" },
    { src: withBasePath("/clients/w1-consultoria.svg"), alt: "W1 Consultoria" },
    { src: withBasePath("/clients/contabilizei.svg"), alt: "Contabilizei" }
  ];

  return (
    <section id="clientes" className="py-24 bg-brand-navy-dark relative border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 relative z-10 text-white">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-white/20 bg-white/5 text-white/80 text-sm font-bold tracking-wide uppercase">
            Quem confia na Yoobe
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 font-heading">
            Empresas que já{" "}
            <span className="bg-gradient-to-r from-brand-orange via-unik-blue-soft to-demo-cyan bg-clip-text text-transparent">
              transformaram
            </span>{" "}
            seu RH
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
              className="group flex min-h-[120px] items-center justify-center rounded-2xl border border-white/5 bg-surface-elevated p-6"
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
