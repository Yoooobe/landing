export const ptParaPlataformasPage = {
  seo: {
    title: "Para plataformas e SaaS | 4Unik — recompensas físicas via API",
    description:
      "Ofereça recompensas físicas dentro do seu produto: catálogo, checkout e entrega via API. A 4Unik é a camada de execução — você cuida da experiência, nós do estoque, frete e rastreio.",
    openGraphDescription:
      "API de recompensas físicas embedded: catálogo, checkout no seu app, fulfillment e tracking por webhook.",
  },
  hero: {
    badge: "Para plataformas e SaaS",
    title: "Recompensas físicas como uma chamada de API",
    definitionLead:
      "A 4Unik é a camada que entrega prémios físicos dentro do seu produto: você mantém a experiência; nós tratamos de catálogo, stock e envio.",
    sub:
      "Sua plataforma mostra o catálogo e o checkout dentro do próprio app. A 4Unik cuida de estoque, envio e rastreio. Você programa o comportamento; a entrega física é com a gente.",
    ctaLabel: "Ver API e integrações",
    ctaHref: "/api-integracoes/",
  },
  problem: {
    badge: "A dor",
    title: "Logística de prêmios não é o seu core",
    items: [
      {
        title: "Operação fora do core",
        desc: "Gerir fornecedores, estoque e frete tira o foco do seu produto.",
        icon: "package",
      },
      {
        title: "Construir do zero é caro",
        desc: "Loja, catálogo e logística internos levam meses e seguram o roadmap.",
        icon: "puzzle",
      },
      {
        title: "Catálogo e entrega dão trabalho",
        desc: "Manter itens, prazos e rastreio atualizados vira suporte recorrente.",
        icon: "refresh-cw",
      },
    ],
  },
  how: {
    badge: "Como funciona",
    title: "Integração embedded em poucos passos",
    sub: "Uma API REST com SDKs e sandbox para o seu time conectar sem fricção.",
    columns: "4" as const,
    items: [
      {
        eyebrow: "01",
        title: "Onboarding + inventário",
        desc: "Comece rápido e escolha os produtos do catálogo 4Unik.",
        icon: "rocket",
      },
      {
        eyebrow: "02",
        title: "API REST + SDK + sandbox",
        desc: "Conecte com SDKs Node.js e Python e teste no sandbox antes de ir ao ar.",
        icon: "code-2",
      },
      {
        eyebrow: "03",
        title: "Catálogo e checkout no seu app",
        desc: "As APIs de produtos e estoque exibem os itens; a de checkout resolve o resgate sem o usuário sair do seu produto.",
        icon: "store",
      },
      {
        eyebrow: "04",
        title: "Entrega + tracking por webhook",
        desc: "A 4Unik faz o envio e devolve o rastreio em tempo real via webhooks.",
        icon: "globe-2",
      },
    ],
  },
  benefits: {
    badge: "Por que a 4Unik",
    title: "A camada de execução invisível",
    items: [
      {
        title: "Catálogo pronto",
        desc: "Mais de 5.000 produtos físicos disponíveis para resgate, sem você operar estoque.",
        icon: "boxes",
      },
      {
        title: "Experiência no seu produto",
        desc: "O usuário resgata dentro do seu app; a marca e a jornada continuam suas.",
        icon: "smartphone",
      },
      {
        title: "Operação por nossa conta",
        desc: "Inventário, frete nacional e rastreio ficam com a 4Unik.",
        icon: "package",
      },
    ],
  },
  faq: {
    items: [
      {
        q: "O que é reward infrastructure para plataformas SaaS?",
        a: "É a camada de execução que entrega prémios físicos dentro do seu produto via API: catálogo, checkout embedded, estoque e envio ficam com a 4Unik. Você mantém a experiência e o engajamento; nós operamos a logística. Definição completa em /infraestrutura-de-recompensas/.",
      },
      {
        q: "A 4Unik compete com a minha plataforma?",
        a: "Não. A 4Unik é a camada de execução de recompensas físicas: você cuida da experiência e do engajamento; nós cuidamos de catálogo, estoque, frete e rastreio.",
      },
      {
        q: "Como é a integração técnica?",
        a: "API REST com SDKs para Node.js e Python e um sandbox de testes. Você usa endpoints de produtos, estoque e checkout, e recebe atualizações de rastreio por webhooks.",
      },
      {
        q: "O usuário sai do meu app para resgatar?",
        a: "Não. O checkout acontece dentro do seu produto; a 4Unik resolve a entrega nos bastidores.",
      },
      {
        q: "Em quanto tempo dá para integrar?",
        a: "Depende do escopo, mas o objetivo é uma integração rápida com SDKs e sandbox. Fale com a engenharia para um plano alinhado ao seu caso.",
      },
    ],
  },
  cta: {
    eyebrow: "Próximo passo",
    title: "Pronto para plugar recompensas no seu produto?",
    body:
      "Conte sobre a sua plataforma e o caso de uso. Mostramos a API, o fluxo de checkout e o modelo de integração.",
    primaryLabel: "Falar com engenharia",
    primaryHref: "https://calendly.com/yoobeco/demo",
    secondaryLabel: "Ver API e integrações",
    secondaryHref: "/api-integracoes/",
  },
} as const;
