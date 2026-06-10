export const ptEducacaoPage = {
  seo: {
    title: "Para educação e e-learning | 4Unik — recompensa por conclusão",
    description:
      "Combata a evasão de cursos com recompensa real por conclusão: o aluno termina a trilha e recebe um prêmio físico em casa. A 4Unik cuida do catálogo e da entrega.",
    openGraphDescription:
      "Recompensa tangível por conclusão de curso, com catálogo e logística da 4Unik.",
  },
  hero: {
    badge: "Para educação e e-learning",
    title: "Recompensa real quando o aluno conclui",
    definitionLead:
      "Programas de e-learning usam a 4Unik para premiar conclusão de módulos com prémios físicos entregues ao aluno — sem operar catálogo nem logística.",
    sub:
      "Transforme a conclusão de cursos em algo que se vê e se sente. Quando o aluno termina a trilha, a 4Unik entrega um prêmio físico — você foca no conteúdo, nós na logística.",
    ctaLabel: "Falar com especialista",
    ctaHref: "https://calendly.com/4unik/30min",
  },
  problem: {
    badge: "A dor",
    title: "Começam muitos, terminam poucos",
    items: [
      {
        title: "Evasão alta",
        desc: "Muitos alunos começam e poucos terminam — o engajamento cai no meio da jornada.",
        icon: "activity",
      },
      {
        title: "Certificado não basta",
        desc: "Reconhecimento só digital nem sempre motiva a concluir.",
        icon: "award",
      },
      {
        title: "Sem braço para logística",
        desc: "Enviar prêmios físicos manualmente não escala para a sua base de alunos.",
        icon: "package",
      },
    ],
  },
  how: {
    badge: "Como funciona",
    title: "Conclusão que vira recompensa",
    sub: "Defina o marco, o aluno escolhe o prêmio e a 4Unik entrega.",
    columns: "3" as const,
    items: [
      {
        title: "Defina o gatilho",
        desc: "Escolha o marco (100% do curso, módulo ou certificação) que libera a recompensa.",
        icon: "target",
      },
      {
        title: "Aluno escolhe o prêmio",
        desc: "Catálogo com milhares de itens; o aluno resgata o que quer.",
        icon: "store",
      },
      {
        title: "Entrega rastreada",
        desc: "A 4Unik envia e acompanha a entrega até a casa do aluno.",
        icon: "globe-2",
      },
    ],
  },
  benefits: {
    badge: "Por que a 4Unik",
    title: "Mais conclusão, menos operação",
    items: [
      {
        title: "Mais conclusões",
        desc: "Recompensa tangível dá um motivo concreto para terminar a trilha.",
        icon: "award",
      },
      {
        title: "Integra com seu LMS",
        desc: "Conecte por API para liberar prêmios automaticamente na conclusão.",
        icon: "link-2",
      },
      {
        title: "Logística com a gente",
        desc: "Você não embala nem despacha nada — a 4Unik cuida.",
        icon: "package",
      },
    ],
  },
  caseStudy: {
    badge: "Case de sucesso",
    company: "Grupo Boticário",
    title: "Gamificação que destravou treinamentos corporativos",
    body:
      "No Centro de Excelência em Dados, o Grupo Boticário transformou a conclusão de cursos em pontos resgatáveis numa loja interna, com prêmios físicos brandados e logística automatizada da 4Unik. O resultado foi mais adesão aos treinamentos técnicos e ROI mensurável em educação corporativa.",
    logoSrc: "/clients/boticario.webp",
    logoAlt: "Logo do Grupo Boticário",
    metrics: [
      { value: "+308%", label: "Abertura e conclusão de cursos" },
      { value: "11k+", label: "Prêmios físicos enviados" },
      { value: "R$ 63k", label: "Campanhas com ROI comprovado" },
      { value: "6", label: "Novas áreas aderiram ao modelo" },
    ],
    screenshots: [
      {
        src: "/screens/gamif-regras.webp",
        alt: "Regras de pontuação por conclusão de curso na plataforma 4Unik",
        caption: "Regras de pontuação por conclusão de trilha, configuráveis por área.",
      },
      {
        src: "/screens/admin-campaign-config-desktop.webp",
        alt: "Configuração da campanha de treinamento com preview em tempo real",
        caption: "Campanha de treinamento com catálogo de prêmios e preview em tempo real.",
      },
    ],
  },
  faq: {
    items: [
      {
        q: "Como a gamificação com prémios físicos ajuda e-learning?",
        a: "A recompensa tangível dá um motivo concreto para terminar a trilha: ao concluir um módulo ou curso, o aluno escolhe um prémio real e a 4Unik entrega em casa. Você define o marco; nós cuidamos do catálogo e do envio. Integre por API com o seu LMS ou plataforma.",
      },
      {
        q: "Funciona para qualquer curso?",
        a: "Sim — cursos internos, formações de parceiros ou infoprodutos. Você define o marco que libera a recompensa.",
      },
      {
        q: "Como conecta ao meu LMS ou plataforma?",
        a: "Por API: ao registrar a conclusão, a 4Unik libera os pontos ou o resgate do prêmio.",
      },
      {
        q: "Quem cuida da entrega?",
        a: "A 4Unik — catálogo, estoque, frete e rastreio. O aluno recebe em casa.",
      },
      {
        q: "Dá para premiar etapas, não só o fim?",
        a: "Sim. Você pode recompensar módulos, sequências ou metas intermediárias para manter o ritmo.",
      },
    ],
  },
  cta: {
    eyebrow: "Próximo passo",
    title: "Quer elevar a conclusão dos seus cursos?",
    body:
      "Conte sobre a sua operação de ensino e a base de alunos. Desenhamos o fluxo de recompensa por conclusão com você.",
    primaryLabel: "Falar com especialista",
    primaryHref: "https://calendly.com/4unik/30min",
  },
} as const;
