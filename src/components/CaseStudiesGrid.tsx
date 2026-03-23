"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CaseStudiesGrid() {
  const cases = [
    {
      id: "sap",
      company: "SAP",
      industry: "Tecnologia Enterprise",
      title: "Gamificação no SAP Community Network",
      description: "A SAP regamificou seu sistema de reputação na comunidade de desenvolvedores e implementou plataformas de aprendizado gamificadas.",
      challenge: "Baixa participação na comunidade e necessidade de melhorar a retenção de conhecimento técnico.",
      metrics: [
        { value: "+400%", label: "Uso da comunidade" },
        { value: "+96%", label: "Feedback" },
        { value: "-25%", label: "Custos de treinamento", color: "text-green-400" },
      ]
    },
    {
      id: "deloitte",
      company: "Deloitte",
      industry: "Consultoria & Auditoria",
      title: "Liderança gamificada na Deloitte University",
      description: "A Deloitte transformou seu programa de capacitação de líderes com gamificação, tornando treinamentos obrigatórios em experiências engajadoras.",
      challenge: "Baixa taxa de conclusão em programas de liderança. Líderes não completavam os cursos em tempo hábil.",
      metrics: [
        { value: "+50%", label: "Conclusão de cursos" },
        { value: "+47%", label: "Taxa de retorno" },
        { value: "3x", label: "Mais engajamento" },
      ]
    },
    {
      id: "callogix",
      company: "CaLLogix",
      industry: "Contact Center",
      title: "Redução de turnover com gamificação",
      description: "A CaLLogix enfrentava altos índices de rotatividade e absenteísmo. Implementou gamificação focada em recompensas comportamentais.",
      challenge: "Rotatividade altíssima e absenteísmo crônico no setor de contact center, gerando altos custos.",
      metrics: [
        { value: "-50%", label: "Rotatividade", color: "text-green-400" },
        { value: "-80%", label: "Absenteísmo", color: "text-green-400" },
        { value: "US$ 380k", label: "Economia anual", color: "text-yoobe-neon-pink" },
      ]
    },
    {
      id: "ibm",
      company: "IBM",
      industry: "Tecnologia",
      title: "Treinamento de vendedores de elite",
      description: "A IBM implementou programas gamificados para capacitar vendedores em habilidades técnicas, combinando simulações e desafios regionais.",
      challenge: "Vendedores precisavam dominar habilidades técnicas complexas, mas treinamentos tinham baixa adesão.",
      metrics: [
        { value: "+18%", label: "Aumento em vendas" },
        { value: "+70%", label: "Retenção de conhecimento" },
        { value: "2x", label: "Velocidade onboarding" },
      ]
    },
    {
      id: "microsoft",
      company: "Microsoft",
      industry: "Segurança & OS",
      title: "Language Quality Game & Beta Testing",
      description: "A Microsoft usou gamificação para melhorar traduções do Windows OS e para ampliar drasticamente a participação em testes beta.",
      challenge: "Qualidade inconsistente de traduções e baixa participação de funcionários em revisão de bugs.",
      metrics: [
        { value: "+400%", label: "Participação beta" },
        { value: "26k", label: "Tarefas completadas" },
        { value: "4.500", label: "Bugs reportados" },
      ]
    }
  ];

  return (
    <section className="py-12 pb-32 bg-brand-navy-dark relative z-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`glass-panel-dark rounded-[2.5rem] border border-white/5 p-8 md:p-12 relative overflow-hidden group ${
                i === 0 || i === cases.length - 1 ? 'md:col-span-2 flex flex-col md:flex-row gap-8' : 'flex flex-col'
              }`}
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className={i === 0 || i === cases.length - 1 ? 'md:w-1/2' : ''}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-3xl font-bold text-white tracking-widest uppercase">{c.company}</span>
                    <div className="text-xs text-brand-orange font-bold uppercase tracking-wider mt-1">{c.industry}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors border border-white/10">
                    <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{c.title}</h3>
                <p className="text-white/60 mb-6 font-light leading-relaxed">{c.description}</p>

                <div className="bg-[#0a0f18] rounded-xl p-5 border border-white/5">
                  <span className="text-xs font-bold text-white/40 uppercase mb-2 block">O Desafio Resolvido</span>
                  <p className="text-sm text-white/80">{c.challenge}</p>
                </div>
              </div>

              <div className={`mt-8 ${i === 0 || i === cases.length - 1 ? 'md:mt-0 md:w-1/2 flex flex-col justify-center' : 'mt-auto pt-8 border-t border-white/5'}`}>
                <span className="text-xs font-bold text-white/40 uppercase mb-6 block">Resultados Comprovados</span>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {c.metrics.map((m, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                       <span className={`text-3xl font-bold ${m.color || 'text-white'}`}>{m.value}</span>
                       <span className="text-xs text-white/50 font-medium uppercase">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
