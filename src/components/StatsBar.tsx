"use client";

import { motion } from "framer-motion";

export default function StatsBar() {
  const stats = [
    { value: "500", suffix: "+", label: "Empresas atendidas" },
    { value: "1M", suffix: "+", label: "Premiações entregues" },
    { value: "98", suffix: "%", label: "Satisfação dos clientes" },
    { value: "5000", suffix: "+", label: "Produtos no catálogo" }
  ];

  return (
    <section className="py-20 bg-black border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="text-4xl md:text-5xl font-black text-white mb-2 font-heading tracking-tight flex justify-center items-end">
                <span>{stat.value}</span>
                <span className="text-brand-orange ml-1 text-3xl">{stat.suffix}</span>
              </div>
              <div className="text-sm font-bold text-white/40 uppercase tracking-widest font-sans flex justify-center text-center">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </section>
  );
}
