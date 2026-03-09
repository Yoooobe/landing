"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, AlertTriangle, BatteryWarning, TrendingDown } from "lucide-react";

const metrics = [
  {
    id: 1,
    icon: BatteryWarning,
    value: "85%",
    title: "Desengajados",
    description: "População corporativa global não engajada no trabalho.",
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
  {
    id: 2,
    icon: TrendingDown,
    value: "20%",
    title: "Turnover Voluntário",
    description: "Custo altíssimo de reposição de talentos estratégicos.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    id: 3,
    icon: AlertTriangle,
    value: "65%",
    title: "Sem Reconhecimento",
    description: "Sentem que não receberam nenhum prêmio ou elogio no último ano.",
    color: "text-brand-orange",
    bg: "bg-brand-orange/10",
  },
  {
    id: 4,
    icon: ArrowDownRight,
    value: "200%",
    title: "Custo Oculto",
    description: "Até 200% do salário para repor um talento de alta performance.",
    color: "text-yoobe-neon-pink",
    bg: "bg-yoobe-neon-pink/10",
  },
];

export default function HRChallenge() {
  return (
    <section className="py-24 bg-brand-navy-dark border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            O Desafio do <span className="text-brand-orange">RH Moderno</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            A retenção não é ganha com salários, mas com percepção de valor e
            micro-recompensas diárias. Sem gamificação, seu orçamento vaza.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel-dark rounded-2xl p-6 relative group overflow-hidden"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${metric.bg} border border-white/5`}
              >
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className={`text-4xl font-extrabold mb-2 ${metric.color}`}>
                {metric.value}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {metric.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
