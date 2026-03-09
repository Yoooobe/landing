"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-gradient-bg pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-yoobe-purple/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-yoobe-neon-pink/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="text-sm font-medium text-white/90">
              A Nova Era da Gamificação B2B
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight"
          >
            Gamificação para RH. <br className="hidden md:block" />
            <span className="text-gradient">
              Recompensas Reais.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed"
          >
            Infraestrutura B2B de recompensas. Desenhada para plataformas de
            employee engagement, centros de custo corporativos e operações que
            exigem performance sem atrito logístico.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <a
              href="https://calendly.com/yoobeco/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-md bg-brand-orange px-8 font-medium text-white shadow-lg shadow-brand-orange/20 transition-colors hover:bg-brand-orange-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-orange"
            >
              Agendar Demonstração
            </a>
            <a
              href="#gamificacao"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/20 bg-white/5 px-8 font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              Explorar Plataforma
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
