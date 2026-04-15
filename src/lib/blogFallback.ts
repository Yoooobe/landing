import { BLOG_FALLBACK_IMG as IMG } from "@/lib/blogFallbackImages";
import { buildBlogCtaBodyLines } from "@/lib/blogLandingLinks";
import { BASE_PATH } from "@/lib/publicSite";
import type { Locale } from "@/lib/locale";
import type {
  BlogCtaVariant,
  BlogPostBodyItem,
  BlogPostDoc,
  PortableTextBlock,
  PortableTextMarkDefinition,
  PortableTextSpan,
} from "@/sanity/lib/types";

/** Links relativos ao host (respeitam `basePath` em export estático). */
const HOME_HREF = BASE_PATH ? `${BASE_PATH}/` : "/";
const BLOG_HREF = BASE_PATH ? `${BASE_PATH}/blog/` : "/blog/";

const CTA_1_PT = buildBlogCtaBodyLines("1", "pt");
const CTA_2_PT = buildBlogCtaBodyLines("2", "pt");
const CTA_3_PT = buildBlogCtaBodyLines("3", "pt");
const CTA_4_PT = buildBlogCtaBodyLines("4", "pt");
const CTA_5_PT = buildBlogCtaBodyLines("5", "pt");
const CTA_6_PT = buildBlogCtaBodyLines("6", "pt");
const CTA_7_PT = buildBlogCtaBodyLines("7", "pt");
const CTA_1_EN = buildBlogCtaBodyLines("1", "en");
const CTA_2_EN = buildBlogCtaBodyLines("2", "en");
const CTA_3_EN = buildBlogCtaBodyLines("3", "en");
const CTA_4_EN = buildBlogCtaBodyLines("4", "en");
const CTA_5_EN = buildBlogCtaBodyLines("5", "en");
const CTA_6_EN = buildBlogCtaBodyLines("6", "en");
const CTA_7_EN = buildBlogCtaBodyLines("7", "en");

type SeedPost = Omit<BlogPostDoc, "_id" | "body"> & {
  /** Conteúdo editorial: parágrafos, H2 e listas com marcadores */
  bodySpec: BodySpecLine[];
};

type BodySpecCta = {
  variant: BlogCtaVariant;
  eyebrow?: string;
  title: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
  featureImage?: { alt: string; asset: { url: string } };
};

type BodySpecLine =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "rich"; segments: Array<{ text: string; href?: string }> }
  | ({ type: "blogCta" } & BodySpecCta);

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

function blockH3(text: string, key: string): PortableTextBlock {
  return {
    _key: key,
    _type: "block",
    style: "h3",
    children: [{ _type: "span", text, marks: [] }],
    markDefs: [],
  };
}

function blockRich(segments: Array<{ text: string; href?: string }>, key: string): PortableTextBlock {
  const markDefs: PortableTextMarkDefinition[] = [];
  const children: PortableTextSpan[] = [];
  let mi = 0;
  for (const seg of segments) {
    if (seg.href) {
      const mk = `lnk-${key}-${mi++}`;
      markDefs.push({ _key: mk, _type: "link", href: seg.href });
      children.push({ _type: "span", text: seg.text, marks: [mk] });
    } else {
      children.push({ _type: "span", text: seg.text, marks: [] });
    }
  }
  return {
    _key: key,
    _type: "block",
    style: "normal",
    children,
    markDefs,
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

function buildBody(spec: BodySpecLine[]): BlogPostBodyItem[] {
  const out: BlogPostBodyItem[] = [];
  let i = 0;
  for (const line of spec) {
    const key = `b-${i++}`;
    if (line.type === "blogCta") {
      out.push({
        _key: key,
        _type: "blogCta",
        variant: line.variant,
        eyebrow: line.eyebrow,
        title: line.title,
        description: line.description,
        ctaLabel: line.ctaLabel,
        ctaHref: line.ctaHref,
        featureImage: line.featureImage
          ? { alt: line.featureImage.alt, asset: { url: line.featureImage.asset.url } }
          : undefined,
      });
    } else if (line.type === "h2") {
      out.push(blockH2(line.text, key));
    } else if (line.type === "h3") {
      out.push(blockH3(line.text, key));
    } else if (line.type === "p") {
      out.push(blockP(line.text, key));
    } else if (line.type === "rich") {
      out.push(blockRich(line.segments, key));
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

const ptSeed: readonly SeedPost[] = [
  {
    title: "Engaja, time! Como a gamificação transforma o RH em motor de resultados",
    slug: "1",
    locale: "pt",
    excerpt:
      "Descubra como empresas líderes usam mecânicas de jogos para reduzir turnover e aumentar o engajamento com a plataforma 4unik — com pontos, missões e loja de recompensas integrada.",
    category: "Engajamento",
    publishedAt: "2026-03-20T00:00:00.000Z",
    readTimeMinutes: 12,
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
      CTA_1_PT[0],
      { type: "h2", text: "Por que a 4unik foi feita para o RH moderno" },
      { type: "p", text: "A plataforma reúne motor de gamificação (pontos, níveis, missões), ranking opcional por equipe, catálogo de recompensas e logística — tudo com painéis para acompanhar adesão e impacto, sem depender de planilhas paralelas." },
      { type: "ul", items: [
        "Missões alinhadas a valores e metas (ex.: feedback, treinamento, vendas).",
        "Reconhecimento público com regras claras — evita gamificação vazia.",
        "Resgate na loja corporativa: o prêmio certo para cada perfil.",
      ]},
      { type: "h3", text: "Erros que derrubam programas de pontos" },
      { type: "p", text: "Regras mudando toda semana, premiação opaca ou missões desconectadas do trabalho real geram cinismo. Documente o ‘porquê’ de cada missão, publique o calendário de campanhas e mostre quem pode reconhecer quem — transparência sustenta confiança." },
      { type: "h2", text: "Como a 4unik ajuda neste cenário" },
      CTA_1_PT[1],
      { type: "ul", items: [
        "Motor de missões e pontos com regras versionáveis e campanhas clonáveis.",
        "Loja de recompensas com catálogo digital e logística para brindes físicos quando fizer sentido.",
        "Dashboards de adesão e participação por time, para o RH provar tendência, não só anedota.",
        "Integrações via API com HRIS e ferramentas de colaboração — menos cópia manual de dados.",
        "Campanhas temáticas alinhadas a valores e metas de negócio, com histórico para auditoria interna.",
      ]},
      { type: "h2", text: "Primeiros passos na prática" },
      { type: "p", text: "Comece por uma campanha piloto de 30 dias, uma audiência (ex.: uma área) e até três missões. Meça participação e NPS interno antes de expandir. A 4unik permite clonar campanhas e ajustar pontuação sem refazer o programa inteiro." },
      { type: "p", text: "Quando o programa conversa com comunicação interna e gestão, o RH deixa de ser ‘área de evento’ e passa a ser dono de um canal mensurável de engajamento — com histórico e aprendizado para o próximo ciclo." },
      CTA_1_PT[2],
      { type: "rich", segments: [
        { text: "Quer ver outros ângulos sobre engajamento? Volte ao " },
        { text: "índice do blog", href: BLOG_HREF },
        { text: " ou explore o site da " },
        { text: "4unik", href: HOME_HREF },
        { text: " para alinhar próximos passos com o time." },
      ]},
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
    readTimeMinutes: 10,
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
      CTA_2_PT[0],
      { type: "h2", text: "Fluxo típico em uma convenção" },
      { type: "ul", items: [
        "Cadastre missões por atividade (check-in, quiz, visita ao stand).",
        "Gere QR Codes por missão; o colaborador escaneia e ganha pontos na hora.",
        "No encerramento ou após o evento, o saldo vira resgate na loja de recompensas — sem fila física de estoque no local.",
      ]},
      { type: "h3", text: "Checklist rápido antes de abrir as inscrições" },
      { type: "ul", items: [
        "Defina orçamento de premiação e teto de pontos por pessoa.",
        "Valide acessibilidade (QR em altura e contraste, fila de apoio).",
        "Tenha plano B se a rede falhar (registro manual ou segunda leitura).",
      ]},
      { type: "h2", text: "Como a 4unik ajuda neste cenário" },
      CTA_2_PT[1],
      { type: "ul", items: [
        "QR Codes por missão com pontuação instantânea e rastreio por estação do evento.",
        "Loja de recompensas para o colaborador escolher o brinde — vouchers, experiências ou kits com logística integrada.",
        "Campanhas com prazo e regras claras, reaproveitáveis em próximas convenções.",
        "Painéis com participação e resgates para o RH medir ROI do evento em números, não só feeling.",
      ]},
      { type: "h2", text: "Dicas de UX para o RH" },
      { type: "p", text: "Comunique regras em uma tela ou cartaz com o link da loja. Prefira prazos de resgate claros e mix de prêmios (experiências, vouchers, kits) para caber em diferentes perfis. O objetivo é lembrança positiva da marca interna, não só ‘ganhei um brinde’." },
      { type: "p", text: "Depois do evento, exporte participação e resgates para cruzar com outras iniciativas de engajamento ao longo do ano." },
      CTA_2_PT[2],
      { type: "rich", segments: [
        { text: "Veja mais artigos na " },
        { text: "lista do blog Engaja, time!", href: BLOG_HREF },
      ]},
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
    readTimeMinutes: 10,
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
      CTA_3_PT[0],
      { type: "h2", text: "Regras que o time entende" },
      { type: "ul", items: [
        "Critérios objetivos e públicos — menos debate, mais execução.",
        "Metas intermediárias para quem não lidera o ranking manter engajamento.",
        "Premiação mista: resultado + esforço reconhecido pela liderança.",
      ]},
      { type: "h3", text: "Evite competição tóxica" },
      { type: "p", text: "Combine ranking com missões de colaboração e qualidade (pipeline limpo, registro no CRM, handoff entre SDR e closer). Isso mantém o meio do funil motivado e alinha comportamentos com a estratégia comercial, não só com o número final." },
      { type: "h2", text: "Como a 4unik ajuda neste cenário" },
      CTA_3_PT[1],
      { type: "ul", items: [
        "Missões configuráveis por função com pontos e prazos — da prospecção ao fechamento.",
        "Ranking opcional por equipe ou indivíduo, com transparência de regras.",
        "Loja de prêmios para resgate de incentivos alinhados ao orçamento da campanha.",
        "Dashboards para o gestor acompanhar adesão, não só resultado financeiro.",
      ]},
      { type: "h2", text: "O que medir com o gestor comercial" },
      { type: "p", text: "Além do faturamento, acompanhe adesão às missões, tempo médio de resposta e distribuição de resgates. Isso mostra se a campanha está saudável ou se apenas poucos participam ativamente." },
      CTA_3_PT[2],
      { type: "rich", segments: [
        { text: "Confira outros temas no " },
        { text: "blog", href: BLOG_HREF },
        { text: "." },
      ]},
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
    readTimeMinutes: 9,
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
      CTA_4_PT[0],
      { type: "h2", text: "Missões sugeridas para os primeiros 30 dias" },
      { type: "ul", items: [
        "Completar cadastro e políticas essenciais.",
        "Agendar coffee com o líder direto.",
        "Participar de um ritmo de time (dailies ou weekly).",
        "Dar o primeiro feedback em par na plataforma interna.",
      ]},
      { type: "h3", text: "Combine kit físico e jornada digital" },
      { type: "p", text: "Insira no welcome kit um cartão com QR ou link para a primeira missão na 4unik — o gesto físico puxa o hábito digital. Ajuste o tom para acolhimento, não para burocracia." },
      { type: "h2", text: "Como a 4unik ajuda neste cenário" },
      CTA_4_PT[1],
      { type: "ul", items: [
        "Trilhas de missões por período (7, 15, 30 dias) com pontos e reconhecimento visível.",
        "Loja de recompensas para trocar pontos por itens que reforcem pertencimento (livros, experiências, upgrades de kit).",
        "Campanhas dedicadas a novos contratados, separadas da operação do restante da empresa.",
        "Integrações para sincronizar público-alvo com o cadastro do RHIS e reduzir erro manual.",
      ]},
      { type: "p", text: "Cada etapa pode gerar pontos trocáveis na loja, reforçando o comportamento desejado. O segredo é não transformar onboarding em ‘lista de tarefas infinita’: poucas missões com significado." },
      CTA_4_PT[2],
      { type: "rich", segments: [
        { text: "Mais ideias no " },
        { text: "blog", href: BLOG_HREF },
        { text: " e na " },
        { text: "página inicial", href: HOME_HREF },
        { text: " da 4unik." },
      ]},
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
    readTimeMinutes: 11,
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
      CTA_5_PT[0],
      { type: "h2", text: "Evite armadilhas comuns" },
      { type: "ul", items: [
        "Não amarre 100% dos pontos só ao resultado final — celebre marcos.",
        "Alinhe com líderes para que missões não conflitem com a rotina operativa.",
        "Revise pesos a cada ciclo com base no que realmente mudou comportamento.",
      ]},
      { type: "h3", text: "Ritmo de check-in com a liderança" },
      { type: "p", text: "A cada duas semanas, revise com cada time se as missões ainda refletem os KRs ativos. OKRs mudam; a gamificação precisa acompanhar para não premiar o indicador errado." },
      { type: "h2", text: "Como a 4unik ajuda neste cenário" },
      CTA_5_PT[1],
      { type: "ul", items: [
        "Campanhas por trimestre ou ciclo de OKR, com ajuste de pesos sem reconstruir o programa.",
        "Missões com prazos alinhados a entregas intermediárias (sprints, releases, metas de receita).",
        "Dashboards para ver se times engajados nos KRs correlacionam com participação nas missões.",
        "Loja de recompensas como reforço simbólico quando um KR crítico é atingido.",
      ]},
      { type: "p", text: "Assim, o colaborador enxerga a ponte entre a meta da empresa e o seu dia a dia — e o RH ganha narrativa para performance e cultura ao mesmo tempo." },
      CTA_5_PT[2],
      { type: "rich", segments: [
        { text: "Explore mais no " },
        { text: "blog", href: BLOG_HREF },
        { text: "." },
      ]},
    ],
  },
  {
    title: "ROI de engajamento: métricas que o RH pode apresentar na reunião de diretoria",
    slug: "6",
    locale: "pt",
    excerpt:
      "Da participação em campanhas a impacto em retenção e eNPS: como estruturar indicadores quando você usa gamificação com a 4unik.",
    category: "Crescimento",
    publishedAt: "2026-02-10T00:00:00.000Z",
    readTimeMinutes: 10,
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
      CTA_6_PT[0],
      { type: "h2", text: "O que acompanhar na 4unik" },
      { type: "ul", items: [
        "Taxa de participação ativa por campanha e por área.",
        "Distribuição de reconhecimentos — evitar que só poucos colaboradores concentrem pontos.",
        "Custo por ponto resgatado versus orçamento de premiação.",
      ]},
      { type: "h3", text: "Ligue engajamento a indicadores de negócio" },
      { type: "p", text: "Quando possível, compare cohorts: quem participou de campanhas contínuas versus quem não participou, usando dados de absenteísmo, eNPS ou performance de time — sempre com cautela estatística e amostras grandes o suficiente." },
      { type: "h2", text: "Como a 4unik ajuda neste cenário" },
      CTA_6_PT[1],
      { type: "ul", items: [
        "Dashboards com adesão, resgates e distribuição de pontos exportáveis para apresentações.",
        "Campanhas nomeadas para isolar período e orçamento no relatório.",
        "Loja de recompensas com custo por resgate visível para o financeiro.",
        "Integrações para cruzar identificação de colaborador com sistemas de RH (respeitando LGPD).",
      ]},
      { type: "h2", text: "Conte a história certa" },
      { type: "p", text: "Combine dados da plataforma com pesquisas rápidas (pulso, eNPS) nos mesmos períodos. O ROI de engajamento raramente é uma linha única; é um conjunto de sinais que mostra tendência ao longo de trimestres." },
      CTA_6_PT[2],
      { type: "rich", segments: [
        { text: "Veja outros artigos no " },
        { text: "blog", href: BLOG_HREF },
        { text: "." },
      ]},
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
    readTimeMinutes: 10,
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
      CTA_7_PT[0],
      { type: "h2", text: "Papel da liderança" },
      { type: "p", text: "Treine gestores para usar o sistema de forma justa: critérios claros, frequência saudável e foco em desenvolvimento, não só ranking. A plataforma é ferramenta; a cultura vem da conversa." },
      { type: "h3", text: "Feedback contínuo, não surpresa no ciclo" },
      { type: "p", text: "Combine reconhecimento público na 4unik com conversas 1:1 sobre desenvolvimento. O colaborador precisa saber o que foi celebrado e o que ainda falta para a próxima etapa de carreira." },
      { type: "h2", text: "Como a 4unik ajuda neste cenário" },
      CTA_7_PT[1],
      { type: "ul", items: [
        "Missões e pontos ligados a comportamentos de liderança (feedback, desenvolvimento de pares, inclusão em reuniões).",
        "Campanhas que equilibram resultado individual e colaboração em time.",
        "Reconhecimento rastreável para revisão em comitês de calibragem.",
        "Loja e experiências como reforço simbólico de valores, não só de volume de vendas.",
      ]},
      { type: "h2", text: "Diversidade e inclusão" },
      { type: "p", text: "Desenhe campanhas que celebrem colaboração e aprendizado, não apenas resultados individuais extremos. Isso reduz efeitos de ‘vencedor único’ e aproxima o programa de uma cultura de alto desempenho coletivo." },
      CTA_7_PT[2],
      { type: "rich", segments: [
        { text: "Continue lendo no " },
        { text: "blog", href: BLOG_HREF },
        { text: " ou fale com a equipe pela " },
        { text: "4unik", href: HOME_HREF },
        { text: "." },
      ]},
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
    readTimeMinutes: 12,
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
      CTA_1_EN[0],
      { type: "h2", text: "Why 4unik fits modern HR" },
      { type: "p", text: "The platform combines a gamification engine (points, levels, missions), optional team rankings, a rewards catalog and fulfillment — with dashboards for adoption and impact, without parallel spreadsheets." },
      { type: "ul", items: [
        "Missions aligned to values and goals (feedback, training, sales).",
        "Public recognition with clear rules — avoiding empty gamification.",
        "Redemption in the corporate store: the right prize for each profile.",
      ]},
      { type: "h3", text: "Mistakes that sink points programs" },
      { type: "p", text: "Rules that change weekly, opaque rewards or missions disconnected from real work breed cynicism. Document why each mission exists, publish the campaign calendar, and show who can recognize whom — transparency sustains trust." },
      { type: "h2", text: "How 4unik helps in this scenario" },
      CTA_1_EN[1],
      { type: "ul", items: [
        "Mission and points engine with versionable rules and cloneable campaigns.",
        "Rewards store with a digital catalog and logistics for physical gifts when it matters.",
        "Adoption and participation dashboards by team so HR proves trends, not anecdotes.",
        "API integrations with HRIS and collaboration tools — less manual data copying.",
        "Thematic campaigns aligned to values and business goals, with history for internal audit.",
      ]},
      { type: "h2", text: "Getting started" },
      { type: "p", text: "Run a 30-day pilot with one audience and up to three missions. Measure participation and internal NPS before scaling. 4unik lets you duplicate campaigns and tune scoring without rebuilding the whole program." },
      CTA_1_EN[2],
      { type: "rich", segments: [
        { text: "More engagement ideas: browse the " },
        { text: "blog index", href: BLOG_HREF },
        { text: " or visit " },
        { text: "4unik", href: HOME_HREF },
        { text: " to plan next steps with your team." },
      ]},
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
    readTimeMinutes: 10,
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
      CTA_2_EN[0],
      { type: "h2", text: "A typical conference flow" },
      { type: "ul", items: [
        "Create missions per activity (check-in, quiz, booth visit).",
        "Use per-mission QR codes; people scan and earn points instantly.",
        "After the event, balance converts to store redemption — no on-site stock queues.",
      ]},
      { type: "h3", text: "Quick checklist before registrations open" },
      { type: "ul", items: [
        "Set reward budget and per-person points cap.",
        "Check accessibility (QR height and contrast, help desk).",
        "Have a plan B if the network fails (manual logging or second scan).",
      ]},
      { type: "h2", text: "How 4unik helps in this scenario" },
      CTA_2_EN[1],
      { type: "ul", items: [
        "Per-mission QR codes with instant scoring and tracking by event station.",
        "Rewards store so people choose gifts — vouchers, experiences or kits with integrated logistics.",
        "Campaigns with clear deadlines and rules, reusable for the next conference.",
        "Dashboards for participation and redemptions so HR measures event ROI with data, not vibes.",
      ]},
      { type: "h2", text: "UX tips for HR" },
      { type: "p", text: "Share rules on one slide plus the store link. Set clear redemption windows and a mix of experiences, vouchers and kits. The goal is lasting positive memory of your employer brand." },
      CTA_2_EN[2],
      { type: "rich", segments: [
        { text: "Read more on the " },
        { text: "Engaja, time! blog", href: BLOG_HREF },
        { text: "." },
      ]},
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
    readTimeMinutes: 10,
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
      CTA_3_EN[0],
      { type: "h2", text: "Rules people understand" },
      { type: "ul", items: [
        "Objective, public criteria — less debate, more execution.",
        "Intermediate goals for people not leading the board.",
        "Mixed rewards: results plus effort recognized by managers.",
      ]},
      { type: "h3", text: "Avoid toxic competition" },
      { type: "p", text: "Pair the leaderboard with collaboration and quality missions (clean pipeline, CRM hygiene, SDR-to-AE handoffs). That keeps mid-funnel sellers motivated and ties behavior to strategy, not only the final number." },
      { type: "h2", text: "How 4unik helps in this scenario" },
      CTA_3_EN[1],
      { type: "ul", items: [
        "Configurable missions by role with points and deadlines — from prospecting to close.",
        "Optional team or individual rankings with transparent rules.",
        "Prize store redemption aligned to campaign budget.",
        "Dashboards so managers track adoption, not only revenue.",
      ]},
      { type: "p", text: "Track mission adoption, response time and redemption spread — signals of a healthy campaign, not a handful of power users." },
      CTA_3_EN[2],
      { type: "rich", segments: [
        { text: "More topics in the " },
        { text: "blog", href: BLOG_HREF },
        { text: "." },
      ]},
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
    readTimeMinutes: 9,
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
      CTA_4_EN[0],
      { type: "h2", text: "Suggested first-30-day missions" },
      { type: "ul", items: [
        "Complete profile and key policies.",
        "Schedule coffee with the direct manager.",
        "Join a team ritual.",
        "Give first peer feedback on the internal tool.",
      ]},
      { type: "h3", text: "Pair physical kit and digital journey" },
      { type: "p", text: "Put a QR or link to the first 4unik mission inside the welcome kit — physical gesture pulls people into the digital habit. Keep the tone welcoming, not bureaucratic." },
      { type: "h2", text: "How 4unik helps in this scenario" },
      CTA_4_EN[1],
      { type: "ul", items: [
        "Mission paths by period (7, 15, 30 days) with points and visible recognition.",
        "Rewards store to redeem points for items that reinforce belonging (books, experiences, kit upgrades).",
        "Dedicated new-hire campaigns, separate from the rest of the company.",
        "Integrations to sync audience with HRIS and reduce manual errors.",
      ]},
      { type: "p", text: "Award points for meaningful steps — not an endless checklist. Few missions with real meaning beat twenty trivial tasks." },
      CTA_4_EN[2],
      { type: "rich", segments: [
        { text: "More ideas on the " },
        { text: "blog", href: BLOG_HREF },
        { text: " and " },
        { text: "4unik home", href: HOME_HREF },
        { text: "." },
      ]},
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
    readTimeMinutes: 11,
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
      CTA_5_EN[0],
      { type: "h2", text: "Common pitfalls" },
      { type: "ul", items: [
        "Do not tie 100% of points only to the final number — celebrate milestones.",
        "Align with leaders so missions do not fight operations.",
        "Review weights each cycle based on what changed behavior.",
      ]},
      { type: "h3", text: "Leadership check-in rhythm" },
      { type: "p", text: "Every two weeks, review with each team whether missions still reflect active KRs. OKRs change; gamification must follow so you do not reward the wrong indicator." },
      { type: "h2", text: "How 4unik helps in this scenario" },
      CTA_5_EN[1],
      { type: "ul", items: [
        "Quarterly or OKR-cycle campaigns with adjustable weights without rebuilding the program.",
        "Missions with deadlines aligned to intermediate deliveries (sprints, releases, revenue milestones).",
        "Dashboards to see whether teams engaged on KRs correlate with mission participation.",
        "Rewards store as symbolic reinforcement when a critical KR is achieved.",
      ]},
      { type: "p", text: "Employees see the bridge between company goals and their week — and HR gets a story that connects performance and culture." },
      CTA_5_EN[2],
      { type: "rich", segments: [
        { text: "Read more on the " },
        { text: "blog", href: BLOG_HREF },
        { text: "." },
      ]},
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
    readTimeMinutes: 10,
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
      CTA_6_EN[0],
      { type: "h2", text: "What to track on 4unik" },
      { type: "ul", items: [
        "Active participation rate per campaign and department.",
        "Distribution of recognition — avoid concentration in a few people.",
        "Cost per point redeemed versus rewards budget.",
      ]},
      { type: "h3", text: "Tie engagement to business indicators" },
      { type: "p", text: "Where possible, compare cohorts: people in ongoing campaigns versus not, using absenteeism, eNPS or team performance — with statistical caution and large enough samples." },
      { type: "h2", text: "How 4unik helps in this scenario" },
      CTA_6_EN[1],
      { type: "ul", items: [
        "Dashboards with adoption, redemptions and points distribution exportable to decks.",
        "Named campaigns to isolate period and budget in reports.",
        "Rewards store with visible cost per redemption for finance.",
        "Integrations to join employee IDs with HR systems (respecting privacy rules).",
      ]},
      { type: "p", text: "Pair platform data with pulse and eNPS in the same periods. Engagement ROI is rarely one line; it is a trend across quarters." },
      CTA_6_EN[2],
      { type: "rich", segments: [
        { text: "Browse more on the " },
        { text: "blog", href: BLOG_HREF },
        { text: "." },
      ]},
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
    readTimeMinutes: 10,
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
      CTA_7_EN[0],
      { type: "h2", text: "Leadership’s role" },
      { type: "p", text: "Train managers to use the system fairly: clear criteria, healthy frequency and focus on development, not only rank. The platform is a tool; culture comes from conversation." },
      { type: "h3", text: "Continuous feedback, not cycle surprises" },
      { type: "p", text: "Pair public recognition on 4unik with 1:1 development conversations. People should know what was celebrated and what is still needed for the next career step." },
      { type: "h2", text: "How 4unik helps in this scenario" },
      CTA_7_EN[1],
      { type: "ul", items: [
        "Missions and points tied to leadership behaviors (feedback, peer development, inclusive meetings).",
        "Campaigns that balance individual results and team collaboration.",
        "Traceable recognition for calibration committees.",
        "Store and experiences as symbolic reinforcement of values — not only sales volume.",
      ]},
      { type: "h2", text: "Diversity and inclusion" },
      { type: "p", text: "Design campaigns that celebrate collaboration and learning, not only extreme individual results. That reduces ‘single winner’ effects and supports collective high performance." },
      CTA_7_EN[2],
      { type: "rich", segments: [
        { text: "Keep reading on the " },
        { text: "blog", href: BLOG_HREF },
        { text: " or reach out via " },
        { text: "4unik", href: HOME_HREF },
        { text: "." },
      ]},
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
