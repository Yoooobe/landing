export const ptCasosPage = {
  hero: {
    badge: "Estudos de Caso Global",
    titleBefore: "Resultados reais de",
    titleGradient: "gigantes",
    titleAfter: " do mercado.",
    sub:
      "Veja como SAP, Deloitte, IBM, Microsoft e CaLLogix utilizaram infraestruturas de gamificação para resolver problemas complexos de RH, vendas e comunidade.",
  },
  caseStudies: {
    challengeLabel: "O Desafio Resolvido",
    resultsLabel: "Resultados Comprovados",
    cases: [
      {
        id: "sap",
        company: "SAP",
        industry: "Tecnologia Enterprise",
        title: "Gamificação no SAP Community Network",
        description:
          "A SAP regamificou seu sistema de reputação na comunidade de desenvolvedores e implementou plataformas de aprendizado gamificadas.",
        challenge: "Baixa participação na comunidade e necessidade de melhorar a retenção de conhecimento técnico.",
        metrics: [
          { value: "+400%", label: "Uso da comunidade" },
          { value: "+96%", label: "Feedback" },
          { value: "-25%", label: "Custos de treinamento", tone: "success" as const },
        ],
      },
      {
        id: "deloitte",
        company: "Deloitte",
        industry: "Consultoria & Auditoria",
        title: "Liderança gamificada na Deloitte University",
        description:
          "A Deloitte transformou seu programa de capacitação de líderes com gamificação, tornando treinamentos obrigatórios em experiências engajadoras.",
        challenge: "Baixa taxa de conclusão em programas de liderança. Líderes não completavam os cursos em tempo hábil.",
        metrics: [
          { value: "+50%", label: "Conclusão de cursos" },
          { value: "+47%", label: "Taxa de retorno" },
          { value: "3x", label: "Mais engajamento" },
        ],
      },
      {
        id: "callogix",
        company: "CaLLogix",
        industry: "Contact Center",
        title: "Redução de turnover com gamificação",
        description:
          "A CaLLogix enfrentava altos índices de rotatividade e absenteísmo. Implementou gamificação focada em recompensas comportamentais.",
        challenge: "Rotatividade altíssima e absenteísmo crônico no setor de contact center, gerando altos custos.",
        metrics: [
          { value: "-50%", label: "Rotatividade", tone: "success" as const },
          { value: "-80%", label: "Absenteísmo", tone: "success" as const },
          { value: "US$ 380k", label: "Economia anual", tone: "accent" as const },
        ],
      },
      {
        id: "ibm",
        company: "IBM",
        industry: "Tecnologia",
        title: "Treinamento de vendedores de elite",
        description:
          "A IBM implementou programas gamificados para capacitar vendedores em habilidades técnicas, combinando simulações e desafios regionais.",
        challenge: "Vendedores precisavam dominar habilidades técnicas complexas, mas treinamentos tinham baixa adesão.",
        metrics: [
          { value: "+18%", label: "Aumento em vendas" },
          { value: "+70%", label: "Retenção de conhecimento" },
          { value: "2x", label: "Velocidade onboarding" },
        ],
      },
      {
        id: "microsoft",
        company: "Microsoft",
        industry: "Segurança & OS",
        title: "Language Quality Game & Beta Testing",
        description:
          "A Microsoft usou gamificação para melhorar traduções do Windows OS e para ampliar drasticamente a participação em testes beta.",
        challenge: "Qualidade inconsistente de traduções e baixa participação de funcionários em revisão de bugs.",
        metrics: [
          { value: "+400%", label: "Participação beta" },
          { value: "26k", label: "Tarefas completadas" },
          { value: "4.500", label: "Bugs reportados" },
        ],
      },
    ],
  },
} as const;
