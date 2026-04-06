"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { withBasePath } from "@/lib/basePath";
import { motion } from "framer-motion";

export default function ClientsSection() {
  const { m } = useLocaleMessages();
  const c = m.clients;
  const logos = [
    { src: withBasePath("/clients/yampi.png"), alt: "Yampi" },
    { src: withBasePath("/clients/prio.png"), alt: "PRIO" },
    { src: withBasePath("/clients/hapvida.png"), alt: "Hapvida" },
    { src: withBasePath("/clients/join.svg"), alt: "Join" },
    { src: withBasePath("/clients/tecnospeed.svg"), alt: "Tecnospeed" },
    { src: withBasePath("/clients/boticario.png"), alt: "O Boticário" },
    { src: withBasePath("/clients/w1-consultoria.svg"), alt: "W1 Consultoria" },
    { src: withBasePath("/clients/contabilizei.svg"), alt: "Contabilizei" },
  ];

  return (
    <section id="clientes" className="relative border-t border-white/5 bg-brand-navy-dark py-24">
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="relative z-10 mb-16 text-center text-white">
          <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm font-bold uppercase tracking-wide text-white/80">
            {c.badge}
          </div>
          <h2 className="mb-6 font-heading text-3xl font-black md:text-5xl">
            {c.titleBefore}{" "}
            <span className="bg-gradient-to-r from-brand-orange via-unik-blue-soft to-demo-cyan bg-clip-text text-transparent">{c.titleGradient}</span>{" "}
            {c.titleAfter}
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-white/50">{c.sub}</p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.alt}
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
                className="max-h-12 max-w-[140px] transform object-contain opacity-50 grayscale transition-all duration-300 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
