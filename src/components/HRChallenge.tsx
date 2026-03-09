import { motion } from "framer-motion";
import { LineChart, Target, Gift, ShieldCheck } from "lucide-react";

const metrics = [
  {
    id: 1,
    icon: <LineChart className="w-6 h-6" />,
    value: "Admin",
    title: "Painel do Gestor",
    description: "Visão absoluta de pedidos, SLAs, orçamentos (R$) e faturamento. Gestão inspirada nos melhores SaaS B2B.",
    color: "text-white",
    bg: "bg-gradient-to-br from-[#141415] to-[#0a0a0b]",
    colSpan: "md:col-span-2 lg:col-span-2",
    rowSpan: "md:row-span-2"
  },
  {
    id: 2,
    icon: <Target className="w-6 h-6" />,
    value: "Motor",
    title: "Gamificação",
    description: "Badges virtuais, tabelas de líderes (leaderboards), e tags de segmentação para impulsionar adoção.",
    color: "text-white",
    bg: "bg-yoobe-purple/10",
    colSpan: "md:col-span-2 lg:col-span-2",
    rowSpan: "md:row-span-1"
  },
  {
    id: 3,
    icon: <Gift className="w-6 h-6" />,
    value: "VIP",
    title: "Catálogo Interno",
    description: "Skins proprietárias para a loja da sua empresa e acesso instantâneo a milhares de produtos premium.",
    color: "text-white",
    bg: "bg-yoobe-neon-pink/10",
    colSpan: "md:col-span-1 lg:col-span-1",
    rowSpan: "md:row-span-1"
  },
  {
    id: 4,
    icon: <ShieldCheck className="w-6 h-6" />,
    value: "Safe",
    title: "Seguro & LGPD",
    description: "Compliance total com SSO (SAML), rotas JWT Auth e servidor Sandbox para testes de integração seguros.",
    color: "text-white",
    bg: "bg-brand-orange/10",
    colSpan: "md:col-span-1 lg:col-span-1",
    rowSpan: "md:row-span-1"
  },
];

export default function HRChallenge() {
  return (
    <section className="py-24 bg-brand-navy-dark relative overflow-hidden" id="bento">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-wider text-white bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6 backdrop-blur-md">
            Visão Geral
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[3rem] font-extrabold text-white mb-6 tracking-tight">
            Tudo o que sua operação precisa.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-[1200px] mx-auto md:auto-rows-[240px]">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-panel-dark rounded-3xl p-8 relative group overflow-hidden flex flex-col hover:bg-[#1c1c1e] hover:border-white/20 transition-all duration-400 hover:-translate-y-1 ${metric.colSpan} ${metric.rowSpan} ${metric.id === 1 ? 'bg-gradient-to-br from-[#141415] to-[#0a0a0b]' : ''}`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${metric.bg} border border-white/5 text-2xl filter drop-shadow-md`}
              >
                {metric.icon}
              </div>
              <h3 className="text-[1.4rem] font-bold text-white mb-2 leading-tight">
                {metric.title}
              </h3>
              <p className="text-[0.95rem] text-white/60 leading-relaxed max-w-[90%] flex-1">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
