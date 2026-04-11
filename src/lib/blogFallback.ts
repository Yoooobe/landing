import type { BlogPostDoc, PortableTextBlock } from "@/sanity/lib/types";
import type { Locale } from "@/lib/locale";

type SeedPost = Omit<BlogPostDoc, "_id" | "body"> & {
  /** Conteúdo editorial: parágrafos, H2 e listas com marcadores */
  bodySpec: BodySpecLine[];
};

type BodySpecLine =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

function blockH2(text: string, key: string): PortableTextBlock {
  return {
    _key: key,
    _type: "block",
    style: "h2",
    children: [{ _type: "span", text, marks: [] }],
    markDefs: [],
  };
}

function blockP(text: string, key: string): PortableTextBlock {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text, marks: [] }],
    markDefs: [],
  };
}

function blockBulletItems(items: string[], baseKey: string): PortableTextBlock[] {
  return items.map((text, i) => ({
    _key: `${baseKey}-li-${i}`,
    _type: "block" as const,
    style: "normal" as const,
    listItem: "bullet" as const,
    children: [{ _type: "span", text, marks: [] }],
    markDefs: [],
  }));
}

function buildBody(spec: BodySpecLine[]): PortableTextBlock[] {
  const out: PortableTextBlock[] = [];
  let i = 0;
  for (const line of spec) {
    const key = `b-${i++}`;
    if (line.type === "h2") {
      out.push(blockH2(line.text, key));
    } else if (line.type === "p") {
      out.push(blockP(line.text, key));
    } else {
      out.push(...blockBulletItems(line.items, key));
    }
  }
  return out;
}

function materialize(posts: readonly SeedPost[]): BlogPostDoc[] {
  return posts.map((post, index) => ({
    ...post,
    _id: `fallback-${post.locale}-${post.slug}-${index}`,
    body: buildBody(post.bodySpec),
  }));
}

/** Imagens de capa (Unsplash) — uma URL distinta por artigo para SEO e variedade visual */
const IMG = {
  teamRh: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop",
  eventStage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
  salesTeam: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
  welcomeKit: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=1600&auto=format&fit=crop",
  dashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
  analytics: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
  peopleHr: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1600&auto=format&fit=crop",
} as const;

const ptSeed: readonly SeedPost[] = [
  {
    title: "Engaja, time! Como a gamificação transforma o RH em motor de resultados",
    slug: "1",
    locale: "pt",
    excerpt:
      "Descubra como empresas líderes usam mecânicas de jogos para reduzir turnover e aumentar o engajamento com a plataforma 4unik — com pontos, missões e loja de recompensas integrada.",
    category: "Engajamento",
    publishedAt: "2026-03-20T00:00:00.000Z",
    readTimeMinutes: 9,
    featured: true,
    author: "Time 4unik",
    tags: ["gamificação", "engajamento", "4unik", "RH"],
    coverImage: {
      alt: "Equipe de RH e líderes celebrando metas com cultura de reconhecimento",
      asset: { url: IMG.teamRh },
    },
    relatedKeywords: ["gamificação RH", "engajamento", "turnover", "plataforma 4unik"],
    seo: {
      metaTitle: "Gamificação no RH com 4unik | Blog Engaja, time!",
      metaDescription:
        "Guia prático: como alinhar cultura, reconhecimento e resultados com gamificação corporativa na 4unik.",
    },
    bodySpec: [
      { type: "p", text: "Gamificação em RH não é crachá aleatório. O que funciona é ligar objetivos de negócio a comportamentos visíveis, missões recorrentes e recompensas na loja 4unik — para que colaboradores sintam progresso e líderes vejam dados." },
      { type: "h2", text: "Por que a 4unik foi feita para o RH moderno" },
      { type: "p", text: "A plataforma reúne motor de gamificação (pontos, níveis, missões), ranking opcional por equipe, catálogo de recompensas e logística — tudo com painéis para acompanhar adesão e impacto, sem depender de planilhas paralelas." },
      { type: "ul", items: [
        "Missões alinhadas a valores e metas (ex.: feedback, treinamento, vendas).",
        "Reconhecimento público com regras claras — evita gamificação vazia.",
        "Resgate na loja corporativa: o prêmio certo para cada perfil.",
      ]},
      { type: "h2", text: "Primeiros passos na prática" },
      { type: "p", text: "Comece por uma campanha piloto de 30 dias, uma audiência (ex.: uma área) e até três missões. Meça participação e NPS interno antes de expandir. A 4unik permite clonar campanhas e ajustar pontuação sem refazer o programa inteiro." },
      { type: "p", text: "Quando o programa conversa com comunicação interna e gestão, o RH deixa de ser ‘área de evento’ e passa a ser dono de um canal mensurável de engajamento — com histórico e aprendizado para o próximo ciclo." },
    ],
  },
  {
    title: "4unik em eventos: pontos, QR Code e troca de brindes ao vivo",
    slug: "2",
    locale: "pt",
    excerpt:
      "Transforme convenções, feiras internas e workshops em experiências memoráveis: QR Codes, pontuação em tempo real e resgate na loja 4unik.",
    category: "Eventos & Brindes",
    publishedAt: "2026-03-15T00:00:00.000Z",
    readTimeMinutes: 8,
    author: "Time 4unik",
    tags: ["eventos", "QR Code", "brindes", "loja"],
    coverImage: {
      alt: "Público em evento corporativo com iluminação de palco",
      asset: { url: IMG.eventStage },
    },
    relatedKeywords: ["eventos corporativos", "QR Code", "brindes", "gamificação"],
    seo: {
      metaTitle: "Eventos corporativos gamificados com 4unik | Blog Engaja, time!",
      metaDescription:
        "Use pontos e QR Codes em eventos e deixe o colaborador escolher o brinde na loja 4unik.",
    },
    bodySpec: [
      { type: "p", text: "Eventos são janelas curtas de atenção. A 4unik ajuda a transformar cada estação (stand, palestra, desafio) em pontos acumuláveis, com QR Codes para registrar participação e leaderboard opcional para dinamizar o dia." },
      { type: "h2", text: "Fluxo típico em uma convenção" },
      { type: "ul", items: [
        "Cadastre missões por atividade (check-in, quiz, visita ao stand).",
        "Gere QR Codes por missão; o colaborador escaneia e ganha pontos na hora.",
        "No encerramento ou após o evento, o saldo vira resgate na loja de recompensas — sem fila física de estoque no local.",
      ]},
      { type: "h2", text: "Dicas de UX para o RH" },
      { type: "p", text: "Comunique regras em uma tela ou cartaz com o link da loja. Prefira prazos de resgate claros e mix de prêmios (experiências, vouchers, kits) para caber em diferentes perfis. O objetivo é lembrança positiva da marca interna, não só ‘ganhei um brinde’." },
      { type: "p", text: "Depois do evento, exporte participação e resgates para cruzar com outras iniciativas de engajamento ao longo do ano." },
    ],
  },
  {
    title: "Campanha de vendas gamificada: ranking, missões e prêmios que o time aceita",
    slug: "3",
    locale: "pt",
    excerpt:
      "Monte incentivo comercial com transparência: metas em missões, ranking ao vivo e regras que evitam competição tóxica — tudo na 4unik.",
    category: "Gamificação de Times",
    publishedAt: "2026-03-10T00:00:00.000Z",
    readTimeMinutes: 8,
    author: "Time 4unik",
    tags: ["vendas", "ranking", "campanhas", "incentivo"],
    coverImage: {
      alt: "Equipe de vendas reunida em celebração de resultados",
      asset: { url: IMG.salesTeam },
    },
    relatedKeywords: ["vendas", "gamificação", "ranking", "incentivo"],
    seo: {
      metaTitle: "Campanha de vendas gamificada | 4unik Blog",
      metaDescription:
        "Ranking, missões e loja de prêmios para motivar o time comercial com a 4unik.",
    },
    bodySpec: [
      { type: "p", text: "Campanhas de vendas falham quando só o topo do ranking ganha atenção. Na 4unik, você combina metas em missões (diárias/semanais), reconhecimento por comportamento (qualidade do cadastro, trabalho em equipe) e prêmios escalonados na loja." },
      { type: "h2", text: "Regras que o time entende" },
      { type: "ul", items: [
        "Critérios objetivos e públicos — menos debate, mais execução.",
        "Metas intermediárias para quem não lidera o ranking manter engajamento.",
        "Premiação mista: resultado + esforço reconhecido pela liderança.",
      ]},
      { type: "h2", text: "O que medir com o gestor comercial" },
      { type: "p", text: "Além do faturamento, acompanhe adesão às missões, tempo médio de resposta e distribuição de resgates. Isso mostra se a campanha está saudável ou se apenas poucos participam ativamente." },
    ],
  },
  {
    title: "Welcome kit gamificado: onboarding que virá história no coffee break",
    slug: "4",
    locale: "pt",
    excerpt:
      "Una kit físico de boas-vindas a missões digitais na 4unik nos primeiros 30 dias — integração com leveza e propósito.",
    category: "Motivação & Reconhecimento",
    publishedAt: "2026-03-01T00:00:00.000Z",
    readTimeMinutes: 7,
    author: "Time 4unik",
    tags: ["onboarding", "welcome kit", "reconhecimento"],
    coverImage: {
      alt: "Caixa de boas-vindas e materiais de onboarding sobre mesa",
      asset: { url: IMG.welcomeKit },
    },
    relatedKeywords: ["onboarding", "welcome kit", "novos colaboradores"],
    seo: {
      metaTitle: "Onboarding gamificado com 4unik | Blog Engaja, time!",
      metaDescription:
        "Combine kit físico e missões na 4unik para o primeiro mês do colaborador.",
    },
    bodySpec: [
      { type: "p", text: "O primeiro contato físico com a empresa educa sobre cultura. Somado a missões na 4unik (conhecer o mentor, concluir treinamentos, primeira 1:1), você cria ritmo sem sobrecarregar o RH." },
      { type: "h2", text: "Missões sugeridas para os primeiros 30 dias" },
      { type: "ul", items: [
        "Completar cadastro e políticas essenciais.",
        "Agendar coffee com o líder direto.",
        "Participar de um ritmo de time (dailies ou weekly).",
        "Dar o primeiro feedback em par na plataforma interna.",
      ]},
      { type: "p", text: "Cada etapa pode gerar pontos trocáveis na loja, reforçando o comportamento desejado. O segredo é não transformar onboarding em ‘lista de tarefas infinita’: poucas missões com significado." },
    ],
  },
  {
    title: "OKRs e gamificação: conectar metas da empresa a recompensas na 4unik",
    slug: "5",
    locale: "pt",
    excerpt:
      "Use campanhas e missões para traduzir resultados-chave em ações diárias — com reconhecimento contínuo, não só no fechamento do trimestre.",
    category: "4unik na Prática",
    publishedAt: "2026-02-20T00:00:00.000Z",
    readTimeMinutes: 9,
    author: "Time 4unik",
    tags: ["OKRs", "metas", "4unik", "performance"],
    coverImage: {
      alt: "Tela de analytics e métricas de negócio",
      asset: { url: IMG.dashboard },
    },
    relatedKeywords: ["OKRs", "gamificação", "metas", "recompensas"],
    seo: {
      metaTitle: "OKRs + gamificação na 4unik | Blog Engaja, time!",
      metaDescription:
        "Alinhe objetivos estratégicos a missões e recompensas com a plataforma 4unik.",
    },
    bodySpec: [
      { type: "p", text: "OKRs definem o ‘onde’. A gamificação ajuda no ‘como’, quebrando resultados em entregas semanais visíveis. Na 4unik, cada KR pode inspirar uma ou mais missões com pontos proporcionais ao esforço ou impacto." },
      { type: "h2", text: "Evite armadilhas comuns" },
      { type: "ul", items: [
        "Não amarre 100% dos pontos só ao resultado final — celebre marcos.",
        "Alinhe com líderes para que missões não conflitem com a rotina operativa.",
        "Revise pesos a cada ciclo com base no que realmente mudou comportamento.",
      ]},
      { type: "p", text: "Assim, o colaborador enxerga a ponte entre a meta da empresa e o seu dia a dia — e o RH ganha narrativa para performance e cultura ao mesmo tempo." },
    ],
  },
  {
    title: "ROI de engajamento: métricas que o RH pode apresentar na reunião de diretoria",
    slug: "6",
    locale: "pt",
    excerpt:
      "Do participação em campanhas a impacto em retenção e eNPS: como estruturar indicadores quando você usa gamificação com a 4unik.",
    category: "Crescimento",
    publishedAt: "2026-02-10T00:00:00.000Z",
    readTimeMinutes: 8,
    author: "Time 4unik",
    tags: ["ROI", "métricas", "engajamento", "dados"],
    coverImage: {
      alt: "Gráficos e análise de dados em tela de notebook",
      asset: { url: IMG.analytics },
    },
    relatedKeywords: ["ROI RH", "métricas", "engajamento", "dashboard"],
    seo: {
      metaTitle: "ROI de engajamento e métricas de RH | Blog 4unik",
      metaDescription:
        "Indicadores para provar o valor de programas de gamificação e recompensas.",
    },
    bodySpec: [
      { type: "p", text: "Programas de engajamento precisam de números que falem a linguagem da diretoria: participação, frequência de reconhecimento, resgates e, quando possível, correlação com retenção e produtividade." },
      { type: "h2", text: "O que acompanhar na 4unik" },
      { type: "ul", items: [
        "Taxa de participação ativa por campanha e por área.",
        "Distribuição de reconhecimentos — evitar que só poucos colaboradores concentrem pontos.",
        "Custo por ponto resgatado versus orçamento de premiação.",
      ]},
      { type: "h2", text: "Conte a história certa" },
      { type: "p", text: "Combine dados da plataforma com pesquisas rápidas (pulso, eNPS) nos mesmos períodos. O ROI de engajamento raramente é uma linha única; é um conjunto de sinais que mostra tendência ao longo de trimestres." },
    ],
  },
  {
    title: "Gestão de pessoas e performance: gamificação além da avaliação anual",
    slug: "7",
    locale: "pt",
    excerpt:
      "Reconhecimento contínuo, feedback visível e metas transparentes ajudam a cultura a evoluir — com ferramentas que o colaborador usa toda semana.",
    category: "Gestão de Pessoas",
    publishedAt: "2026-01-28T00:00:00.000Z",
    readTimeMinutes: 8,
    author: "Time 4unik",
    tags: ["gestão de pessoas", "performance", "cultura", "feedback"],
    coverImage: {
      alt: "Profissional de RH em conversa estratégica com liderança",
      asset: { url: IMG.peopleHr },
    },
    relatedKeywords: ["gestão de pessoas", "performance", "cultura", "feedback"],
    seo: {
      metaTitle: "Gestão de pessoas e gamificação | Blog Engaja, time!",
      metaDescription:
        "Como usar a 4unik para reforçar feedback e performance no dia a dia.",
    },
    bodySpec: [
      { type: "p", text: "Avaliação de desempenho pontual mal sustenta mudança de comportamento. Quando o reconhecimento e as missões fazem parte da rotina — via 4unik — líderes e pares reforçam o que a empresa valoriza, sem esperar o ciclo formal." },
      { type: "h2", text: "Papel da liderança" },
      { type: "p", text: "Treine gestores para usar o sistema de forma justa: critérios claros, frequência saudável e foco em desenvolvimento, não só ranking. A plataforma é ferramenta; a cultura vem da conversa." },
      { type: "h2", text: "Diversidade e inclusão" },
      { type: "p", text: "Desenhe campanhas que celebrem colaboração e aprendizado, não apenas resultados individuais extremos. Isso reduz efeitos de ‘vencedor único’ e aproxima o programa de uma cultura de alto desempenho coletivo." },
    ],
  },
] as const;

const enSeed: readonly SeedPost[] = [
  {
    title: "How gamification turns HR into a results engine",
    slug: "1",
    locale: "en",
    excerpt:
      "Leading companies use game mechanics to cut turnover and lift engagement — with points, missions and the 4unik rewards store in one flow.",
    category: "Engagement",
    publishedAt: "2026-03-20T00:00:00.000Z",
    readTimeMinutes: 9,
    featured: true,
    author: "4unik Team",
    tags: ["gamification", "engagement", "4unik", "HR"],
    coverImage: {
      alt: "HR and leaders celebrating goals with a recognition culture",
      asset: { url: IMG.teamRh },
    },
    relatedKeywords: ["HR gamification", "engagement", "turnover", "4unik platform"],
    seo: {
      metaTitle: "HR gamification with 4unik | Engaja, time! Blog",
      metaDescription:
        "Align culture, recognition and outcomes with corporate gamification on 4unik.",
    },
    bodySpec: [
      { type: "p", text: "HR gamification is not random badges. It works when business goals tie to visible behaviors, recurring missions and rewards in the 4unik store — so employees feel progress and leaders see data." },
      { type: "h2", text: "Why 4unik fits modern HR" },
      { type: "p", text: "The platform combines a gamification engine (points, levels, missions), optional team rankings, a rewards catalog and fulfillment — with dashboards for adoption and impact, without parallel spreadsheets." },
      { type: "ul", items: [
        "Missions aligned to values and goals (feedback, training, sales).",
        "Public recognition with clear rules — avoiding empty gamification.",
        "Redemption in the corporate store: the right prize for each profile.",
      ]},
      { type: "h2", text: "Getting started" },
      { type: "p", text: "Run a 30-day pilot with one audience and up to three missions. Measure participation and internal NPS before scaling. 4unik lets you duplicate campaigns and tune scoring without rebuilding the whole program." },
    ],
  },
  {
    title: "4unik at events: points, QR codes and live reward swaps",
    slug: "2",
    locale: "en",
    excerpt:
      "Turn internal conferences and workshops into memorable journeys: QR codes, live scoring and redemption in the 4unik store.",
    category: "Events & Rewards",
    publishedAt: "2026-03-15T00:00:00.000Z",
    readTimeMinutes: 8,
    author: "4unik Team",
    tags: ["events", "QR code", "rewards", "store"],
    coverImage: {
      alt: "Corporate event audience and stage lighting",
      asset: { url: IMG.eventStage },
    },
    relatedKeywords: ["corporate events", "QR code", "rewards", "gamification"],
    seo: {
      metaTitle: "Gamified corporate events with 4unik | Blog",
      metaDescription:
        "Use points and QR codes at events; let people pick gifts in the 4unik store.",
    },
    bodySpec: [
      { type: "p", text: "Events are short attention windows. 4unik turns each touchpoint into earnable points, with QR codes for attendance and optional leaderboards to energize the day." },
      { type: "h2", text: "A typical conference flow" },
      { type: "ul", items: [
        "Create missions per activity (check-in, quiz, booth visit).",
        "Use per-mission QR codes; people scan and earn points instantly.",
        "After the event, balance converts to store redemption — no on-site stock queues.",
      ]},
      { type: "p", text: "Share rules on one slide plus the store link. Set clear redemption windows and a mix of experiences, vouchers and kits. The goal is lasting positive memory of your employer brand." },
    ],
  },
  {
    title: "Gamified sales campaign: rankings, missions and prizes teams accept",
    slug: "3",
    locale: "en",
    excerpt:
      "Build commercial incentives with transparency: goals as missions, live rankings and guardrails against toxic competition — on 4unik.",
    category: "Team Gamification",
    publishedAt: "2026-03-10T00:00:00.000Z",
    readTimeMinutes: 8,
    author: "4unik Team",
    tags: ["sales", "ranking", "campaigns", "incentives"],
    coverImage: {
      alt: "Sales team celebrating results together",
      asset: { url: IMG.salesTeam },
    },
    relatedKeywords: ["sales", "gamification", "ranking", "incentives"],
    seo: {
      metaTitle: "Gamified sales campaigns with 4unik | Blog",
      metaDescription:
        "Rankings, missions and a prize store to motivate sales with 4unik.",
    },
    bodySpec: [
      { type: "p", text: "Sales campaigns fail when only the top of the leaderboard gets airtime. On 4unik you pair revenue missions with behavior recognition and tiered prizes in the store." },
      { type: "h2", text: "Rules people understand" },
      { type: "ul", items: [
        "Objective, public criteria — less debate, more execution.",
        "Intermediate goals for people not leading the board.",
        "Mixed rewards: results plus effort recognized by managers.",
      ]},
      { type: "p", text: "Track mission adoption, response time and redemption spread — signals of a healthy campaign, not a handful of power users." },
    ],
  },
  {
    title: "Gamified welcome kit: onboarding people will talk about",
    slug: "4",
    locale: "en",
    excerpt:
      "Pair a physical welcome box with digital missions on 4unik in the first 30 days — structured, human onboarding.",
    category: "Motivation & Recognition",
    publishedAt: "2026-03-01T00:00:00.000Z",
    readTimeMinutes: 7,
    author: "4unik Team",
    tags: ["onboarding", "welcome kit", "recognition"],
    coverImage: {
      alt: "Welcome box and onboarding materials on a desk",
      asset: { url: IMG.welcomeKit },
    },
    relatedKeywords: ["onboarding", "welcome kit", "employees"],
    seo: {
      metaTitle: "Gamified onboarding with 4unik | Blog",
      metaDescription:
        "Physical kit plus missions on 4unik for month one.",
    },
    bodySpec: [
      { type: "p", text: "First physical touch teaches culture. Add 4unik missions (mentor coffee, training, first 1:1) for rhythm without HR overload." },
      { type: "h2", text: "Suggested first-30-day missions" },
      { type: "ul", items: [
        "Complete profile and key policies.",
        "Schedule coffee with the direct manager.",
        "Join a team ritual.",
        "Give first peer feedback on the internal tool.",
      ]},
      { type: "p", text: "Award points for meaningful steps — not an endless checklist. Few missions with real meaning beat twenty trivial tasks." },
    ],
  },
  {
    title: "OKRs and gamification: linking company goals to 4unik rewards",
    slug: "5",
    locale: "en",
    excerpt:
      "Use campaigns and missions to turn key results into weekly actions — with continuous recognition, not only quarter-end.",
    category: "4unik in Practice",
    publishedAt: "2026-02-20T00:00:00.000Z",
    readTimeMinutes: 9,
    author: "4unik Team",
    tags: ["OKRs", "goals", "4unik", "performance"],
    coverImage: {
      alt: "Analytics dashboard on a screen",
      asset: { url: IMG.dashboard },
    },
    relatedKeywords: ["OKRs", "gamification", "goals", "rewards"],
    seo: {
      metaTitle: "OKRs + gamification on 4unik | Blog",
      metaDescription:
        "Align strategic objectives with missions and rewards.",
    },
    bodySpec: [
      { type: "p", text: "OKRs set the ‘where’. Gamification helps with the ‘how’, breaking outcomes into visible weekly deliveries. On 4unik, each KR can inspire missions with points tied to effort or impact." },
      { type: "h2", text: "Common pitfalls" },
      { type: "ul", items: [
        "Do not tie 100% of points only to the final number — celebrate milestones.",
        "Align with leaders so missions do not fight operations.",
        "Review weights each cycle based on what changed behavior.",
      ]},
      { type: "p", text: "Employees see the bridge between company goals and their week — and HR gets a story that connects performance and culture." },
    ],
  },
  {
    title: "Engagement ROI: metrics HR can take to the leadership meeting",
    slug: "6",
    locale: "en",
    excerpt:
      "From campaign participation to retention signals: how to structure indicators when you run gamification on 4unik.",
    category: "Growth",
    publishedAt: "2026-02-10T00:00:00.000Z",
    readTimeMinutes: 8,
    author: "4unik Team",
    tags: ["ROI", "metrics", "engagement", "data"],
    coverImage: {
      alt: "Charts and data analysis on a laptop",
      asset: { url: IMG.analytics },
    },
    relatedKeywords: ["HR ROI", "metrics", "engagement", "dashboard"],
    seo: {
      metaTitle: "Engagement ROI and HR metrics | 4unik Blog",
      metaDescription:
        "Prove the value of recognition and gamification programs with data.",
    },
    bodySpec: [
      { type: "p", text: "Engagement programs need numbers leadership understands: participation, recognition frequency, redemptions and, where possible, links to retention and productivity." },
      { type: "h2", text: "What to track on 4unik" },
      { type: "ul", items: [
        "Active participation rate per campaign and department.",
        "Distribution of recognition — avoid concentration in a few people.",
        "Cost per point redeemed versus rewards budget.",
      ]},
      { type: "p", text: "Pair platform data with pulse and eNPS in the same periods. Engagement ROI is rarely one line; it is a trend across quarters." },
    ],
  },
  {
    title: "People management and performance: gamification beyond the annual review",
    slug: "7",
    locale: "en",
    excerpt:
      "Continuous recognition, visible feedback and transparent goals help culture evolve — with tools employees use every week.",
    category: "People Management",
    publishedAt: "2026-01-28T00:00:00.000Z",
    readTimeMinutes: 8,
    author: "4unik Team",
    tags: ["people", "performance", "culture", "feedback"],
    coverImage: {
      alt: "HR professional in strategic conversation with leadership",
      asset: { url: IMG.peopleHr },
    },
    relatedKeywords: ["people management", "performance", "culture"],
    seo: {
      metaTitle: "People management and gamification | 4unik Blog",
      metaDescription:
        "Use 4unik to reinforce feedback and performance daily.",
    },
    bodySpec: [
      { type: "p", text: "Annual reviews alone rarely shift behavior. When recognition and missions are routine — via 4unik — peers and leaders reinforce what the company values without waiting for the formal cycle." },
      { type: "h2", text: "Leadership’s role" },
      { type: "p", text: "Train managers to use the system fairly: clear criteria, healthy frequency and focus on development, not only rank. The platform is a tool; culture comes from conversation." },
      { type: "h2", text: "Diversity and inclusion" },
      { type: "p", text: "Design campaigns that celebrate collaboration and learning, not only extreme individual results. That reduces ‘single winner’ effects and supports collective high performance." },
    ],
  },
] as const;

const fallbackByLocale = {
  pt: materialize(ptSeed),
  en: materialize(enSeed),
} satisfies Record<Locale, BlogPostDoc[]>;

/** Mapeia rótulos EN → chave de filtro PT usada na UI do blog */
const EN_CATEGORY_TO_PT: Record<string, string> = {
  Engagement: "Engajamento",
  "Events & Rewards": "Eventos & Brindes",
  "Team Gamification": "Gamificação de Times",
  "Motivation & Recognition": "Motivação & Reconhecimento",
  "4unik in Practice": "4unik na Prática",
  Growth: "Crescimento",
  "People Management": "Gestão de Pessoas",
};

export function normalizeBlogCategoryForFilter(category: string): string {
  return EN_CATEGORY_TO_PT[category] ?? category;
}

export function getFallbackBlogPosts(locale: Locale): BlogPostDoc[] {
  return fallbackByLocale[locale];
}

export function getFallbackBlogPostBySlug(locale: Locale, slug: string): BlogPostDoc | null {
  return fallbackByLocale[locale].find((post) => post.slug === slug) ?? null;
}
