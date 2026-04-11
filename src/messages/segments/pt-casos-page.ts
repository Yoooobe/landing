export const ptCasosPage = {
  seo: {
    title: "Casos de uso | 4Unik — Reward Infrastructure",
    description:
      "Estudos de caso de empresas globais em gamificação corporativa e comunidades. Como gigantes escalam engajamento — e como a 4Unik fornece infraestrutura de recompensas.",
    openGraphDescription:
      "Estudos de caso de empresas globais em gamificação corporativa e comunidades. Infraestrutura de recompensas 4Unik para programas de engajamento.",
  },
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
  faq: {
    badge: "FAQ",
    titleBefore: "Perguntas sobre",
    titleGradient: "casos de uso",
    titleAfter: "e 4Unik",
    items: [
      {
        q: "O que é a 4Unik em relação à gamificação corporativa?",
        a: "A 4Unik é uma camada de infraestrutura de recompensas (Reward Infrastructure): API, catálogo e fulfillment para quem já tem ou está construindo engajamento — frequentemente integrada à plataforma 4unik V3 para gamificação e programas de incentivo.",
      },
      {
        q: "Estes casos usam a 4Unik diretamente?",
        a: "Os estudos citam gigantes que investiram em gamificação e comunidades com resultados públicos. Eles ilustram o tipo de problema que infraestrutura de engajamento resolve; a 4Unik posiciona-se como infraestrutura de recompensas e integrações para programas semelhantes.",
      },
      {
        q: "Como escolher uma infraestrutura de recompensas para o meu programa?",
        a: "Avalie integração por API, catálogo e cobertura logística, conformidade (LGPD), e se o modelo é catálogo avulso ou plataforma completa com motor de gamificação — critérios alinhados ao que a 4Unik oferece em conjunto com a 4unik V3.",
      },
      {
        q: "Onde vejo integrações e API?",
        a: "Na área de API e integrações do site encontram-se visão de webhooks, ecossistema e parceiros; a 4Unik enfatiza integração por API para encaixar recompensas no seu fluxo.",
      },
    ],
  },
} as const;
