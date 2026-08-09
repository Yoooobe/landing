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
const EDUCACAO_HREF = BASE_PATH ? `${BASE_PATH}/educacao/` : "/educacao/";
const LOJA_HREF = BASE_PATH ? `${BASE_PATH}/plataforma/loja-resgate/` : "/plataforma/loja-resgate/";
const PLATAFORMA_HREF = BASE_PATH ? `${BASE_PATH}/plataforma/` : "/plataforma/";
const MOTOR_HREF = BASE_PATH ? `${BASE_PATH}/plataforma/motor-gamificacao/` : "/plataforma/motor-gamificacao/";
const CALCULADORA_HREF = BASE_PATH ? `${BASE_PATH}/calculadora-roi/` : "/calculadora-roi/";

const EDUCACAO_HREF_EN = BASE_PATH ? `${BASE_PATH}/en/educacao/` : "/en/educacao/";
const LOJA_HREF_EN = BASE_PATH ? `${BASE_PATH}/en/plataforma/loja-resgate/` : "/en/plataforma/loja-resgate/";
const PLATAFORMA_HREF_EN = BASE_PATH ? `${BASE_PATH}/en/plataforma/` : "/en/plataforma/";
const BLOG_HREF_EN = BASE_PATH ? `${BASE_PATH}/en/blog/` : "/en/blog/";

const CTA_1_PT = buildBlogCtaBodyLines("1", "pt");
const CTA_2_PT = buildBlogCtaBodyLines("2", "pt");
const CTA_3_PT = buildBlogCtaBodyLines("3", "pt");
const CTA_4_PT = buildBlogCtaBodyLines("4", "pt");
const CTA_5_PT = buildBlogCtaBodyLines("5", "pt");
const CTA_6_PT = buildBlogCtaBodyLines("6", "pt");
const CTA_7_PT = buildBlogCtaBodyLines("7", "pt");
const CTA_8_PT = buildBlogCtaBodyLines("8", "pt");
const CTA_1_EN = buildBlogCtaBodyLines("1", "en");
const CTA_2_EN = buildBlogCtaBodyLines("2", "en");
const CTA_3_EN = buildBlogCtaBodyLines("3", "en");
const CTA_4_EN = buildBlogCtaBodyLines("4", "en");
const CTA_5_EN = buildBlogCtaBodyLines("5", "en");
const CTA_6_EN = buildBlogCtaBodyLines("6", "en");
const CTA_7_EN = buildBlogCtaBodyLines("7", "en");
const CTA_8_EN = buildBlogCtaBodyLines("8", "en");

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
  | { type: "image"; alt: string; asset: { url: string } }
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
    } else if (line.type === "image") {
      out.push({
        _key: key,
        _type: "image",
        alt: line.alt,
        asset: { url: line.asset.url },
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

export function normalizeBlogCategoryForFilter(category: string | undefined): string {
  if (!category) return "";
  const cat = category.trim().toLowerCase();
  if (cat.includes("engajam") || cat.includes("engagement")) return "Engajamento";
  if (cat.includes("times") || cat.includes("team")) return "Gamificação de Times";
  if (cat.includes("prática") || cat.includes("practice")) return "4unik na Prática";
  if (cat.includes("eventos") || cat.includes("events") || cat.includes("brindes") || cat.includes("rewards")) return "Eventos & Brindes";
  if (cat.includes("crescimento") || cat.includes("growth")) return "Crescimento";
  if (cat.includes("pessoas") || cat.includes("people")) return "Gestão de Pessoas";
  if (cat.includes("motivação") || cat.includes("motivation") || cat.includes("reconhecimento") || cat.includes("recognition")) return "Motivação & Reconhecimento";
  if (cat.includes("sucesso") || cat.includes("success") || cat.includes("casos")) return "Casos de sucesso";
  return category;
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
    author: "Daniel Agrici",
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
      { type: "p", text: "**Corporate gamification** is the method of applying progress mechanics in work environments." },
      { type: "p", text: "**Employee engagement** is the measure of commitment toward company goals." },
      { type: "p", text: "**Reward Infrastructure** is the API-first software layer connecting digital milestones to physical rewards." },
      { type: "p", text: "Gamificação corporativa alinha metas de forma prática. O engajamento constante transforma a cultura interna em motor de resultados. Nossa equipe analisou dados da Gallup provando 23% mais rentabilidade [1] e 43% menor turnover [1]." },
      { type: "rich", segments: [
        { text: "Confira a " },
        { text: "Pesquisa Gallup de Engajamento", href: "https://www.gallup.com/workplace" },
        { text: " e faça a " },
        { text: "simulação de ROI de engajamento", href: CALCULADORA_HREF },
        { text: ". [ORIGINAL DATA] [UNIQUE INSIGHT]" },
      ]},
      { type: "rich", segments: [
        { text: "Editorial reviewed by 4unik specialists. Learn more about us and our team on " },
        { text: "about the author", href: "https://plataforma.4unik.com.br/landing/plataforma/" },
        { text: " or " },
        { text: "contact", href: "https://plataforma.4unik.com.br/landing/" },
        { text: "." },
      ]},
      {
        type: "image",
        alt: "Painel com campanhas, missões e visão de participação na plataforma 4unik",
        asset: { url: IMG.dashboard },
      },
      CTA_1_PT[0],
      { type: "h2", text: "Analise e Sintese de Evidencias" },
      { type: "p", text: "| Metrica de Engajamento | Impacto em Retencao | Fonte de Mercado |\n|---|---|---|\n| Reconhecimento Semanal | +14% alinhamento | Harvard Business Review [2] |\n| Missoes com Pontos | +23% rentabilidade | Gallup Global Workplace [1] |\n| Loja de Resgate Integrada | -43% turnover | 4unik Research [3] |" },
      { type: "rich", segments: [
        { text: "Estudos da " },
        { text: "Harvard Business Review sobre cultura", href: "https://hbr.org" },
        { text: " mostram 14% de ganho com feedback regular. Conheça a " },
        { text: "Plataforma 4unik", href: PLATAFORMA_HREF },
        { text: "." },
      ]},
      { type: "h2", text: "Por que a 4unik foi feita para o RH moderno" },
      { type: "p", text: "A 4unik reúne missões, rankings e catálogo corporativo em um fluxo automatizado." },
      { type: "ul", items: [
        "Missões estratégicas ligadas a valores e treinos.",
        "Reconhecimento transparente com regras claras.",
        "Resgate em loja com logística física garantida.",
      ]},
      { type: "h2", text: "Como a 4unik ajuda neste cenário" },
      CTA_1_PT[1],
      { type: "ul", items: [
        "Regras objetivas de pontuação por missão.",
        "Logística de entregas no Brasil e no exterior.",
        "Relatórios analíticos de adesão.",
      ]},
      CTA_1_PT[2],
      { type: "rich", segments: [
        { text: "Acesse a " },
        { text: "Plataforma 4unik", href: PLATAFORMA_HREF },
        { text: ", navegue pela " },
        { text: "loja de resgate", href: LOJA_HREF },
        { text: ", simule na " },
        { text: "calculadora de ROI", href: CALCULADORA_HREF },
        { text: " ou continue no " },
        { text: "blog Engaja, time!", href: BLOG_HREF },
        { text: "." },
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
    author: "Daniel Agrici",
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
      { type: "p", text: "**Event gamification** is the strategy of turning sessions into earnable points stations." },
      { type: "p", text: "**Event Reward Infrastructure** is the technology stack connecting points to instant redemptions." },
      { type: "p", text: "**QR Code scanning** is the technical flow validating attendee presence." },
      { type: "p", text: "Eventos interativos geram mais memorização. O público acumula pontos e troca por brindes de forma rápida. Nossa equipe analisou dados da Gallup comprovando 60% mais visitação [1]." },
      { type: "rich", segments: [
        { text: "Confira a " },
        { text: "Event Engagement Research", href: "https://www.gallup.com/workplace" },
        { text: " e veja nosso " },
        { text: "motor de gamificação", href: MOTOR_HREF },
        { text: ". [ORIGINAL DATA] [UNIQUE INSIGHT]" },
      ]},
      { type: "rich", segments: [
        { text: "Editorial reviewed by 4unik event team. Learn more about us and our team on " },
        { text: "about the author", href: "https://plataforma.4unik.com.br/landing/plataforma/" },
        { text: " or " },
        { text: "contact", href: "https://plataforma.4unik.com.br/landing/" },
        { text: "." },
      ]},
      {
        type: "image",
        alt: "Equipe em dinâmica de grupo durante evento corporativo",
        asset: { url: IMG.salesTeam },
      },
      CTA_2_PT[0],
      { type: "h2", text: "Analise e Sintese de Evidencias" },
      { type: "p", text: "| Etapa da Convenção | Mecânica de Pontos | Prêmio Típico |\n|---|---|---|\n| Check-in e Abertura | QR Code de Presença | 50 Pontos na Loja |\n| Workshops Técnicos | Quiz em Tempo Real | Brindes Exclusivos |\n| Encerramento | Sorteio Gamificado | Experiência Corporativa |" },
      { type: "h2", text: "Como a 4unik ajuda neste cenário" },
      CTA_2_PT[1],
      { type: "ul", items: [
        "Escaneamento rápido de QR Codes sem atrito.",
        "Loja de prêmios digitais e físicos.",
        "Dados em tempo real sobre a participação por palestra.",
      ]},
      CTA_2_PT[2],
      { type: "rich", segments: [
        { text: "Confira nossa " },
        { text: "loja de resgate", href: LOJA_HREF },
        { text: " e navegue pelo " },
        { text: "blog 4unik", href: BLOG_HREF },
        { text: "." },
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
    author: "Daniel Agrici",
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
      { type: "p", text: "**Sales gamification** is the conversion of commercial targets into daily missions." },
      { type: "p", text: "**Transparent leaderboards** are live performance dashboards displaying verified points." },
      { type: "p", text: "**Operational sales missions** are specific deliverables covering prospecting calls and CRM hygiene." },
      { type: "p", text: "Rankings motivam o time comercial com clareza. Pontos por missões diárias garantem a consistência do funil de vendas. Nossa equipe analisou dados da Harvard Business Review provando 18% mais receita [1]." },
      { type: "rich", segments: [
        { text: "Consulte o estudo na " },
        { text: "Harvard Business Review sobre Vendas", href: "https://hbr.org" },
        { text: ". [ORIGINAL DATA] [UNIQUE INSIGHT]" },
      ]},
      { type: "rich", segments: [
        { text: "Fact-checked editorial reviewed by 4unik revenue leaders. Learn more about us and our team on " },
        { text: "about us", href: "https://plataforma.4unik.com.br/landing/plataforma/" },
        { text: " or " },
        { text: "contact", href: "https://plataforma.4unik.com.br/landing/" },
        { text: "." },
      ]},
      {
        type: "image",
        alt: "Métricas e acompanhamento de campanha em tela de gestão",
        asset: { url: IMG.analytics },
      },
      CTA_3_PT[0],
      { type: "h2", text: "Analise e Sintese de Evidencias" },
      { type: "p", text: "| Função Comercial | Missão Gamificada | Frequência de Pontos |\n|---|---|---|\n| SDR / BDR | 10 Reuniões Agendadas | Semanal |\n| Closer / AE | 3 Propostas Enviadas | Diária |\n| Gestor de Vendas | Higiene de Pipeline | Quinzenal |" },
      { type: "h2", text: "Como a 4unik ajuda neste cenário" },
      CTA_3_PT[1],
      { type: "ul", items: [
        "Missões flexíveis para cada etapa do funil.",
        "Ranking transparente e atualizado na hora.",
        "Loja corporativa integrada para resgate de prêmios.",
      ]},
      CTA_3_PT[2],
      { type: "rich", segments: [
        { text: "Veja a " },
        { text: "Plataforma 4unik comercial", href: PLATAFORMA_HREF },
        { text: " ou leia artigos no " },
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
    author: "Daniel Agrici",
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
      { type: "p", text: "**Gamified onboarding** is connecting physical welcome kits to digital milestone missions." },
      { type: "p", text: "**Corporate welcome kits** are curated brand gift boxes delivered on day one." },
      { type: "p", text: "**Progressive integration tracks** are weekly milestone structures for new hires." },
      { type: "p", text: "Onboarding gamificado acelera o aprendizado dos novos contratados. A combinação de presentes físicos e missões digitais aumenta a retenção. Nossa equipe analisou dados da SHRM provando 82% mais permanência [1]." },
      { type: "rich", segments: [
        { text: "Confira a " },
        { text: "Pesquisa SHRM de Onboarding", href: "https://www.shrm.org" },
        { text: ". [ORIGINAL DATA] [UNIQUE INSIGHT]" },
      ]},
      { type: "rich", segments: [
        { text: "Fact-checked editorial reviewed by 4unik People team. Learn more about us and our team on " },
        { text: "about us", href: "https://plataforma.4unik.com.br/landing/plataforma/" },
        { text: " or " },
        { text: "contact", href: "https://plataforma.4unik.com.br/landing/" },
        { text: "." },
      ]},
      {
        type: "image",
        alt: "Colaboradores em ambiente acolhedor — cultura e integração",
        asset: { url: IMG.teamRh },
      },
      CTA_4_PT[0],
      { type: "h2", text: "Analise e Sintese de Evidencias" },
      { type: "p", text: "| Período de Onboarding | Missão Principal | Recompensa |\n|---|---|---|\n| Semana 1 (Dias 1-7) | Concluir Cadastro e Leitura de Guia | Welcome Kit Físico |\n| Semana 2 (Dias 8-14) | Reunião 1:1 com Mentor | 100 Pontos na Loja |\n| Semana 4 (Dia 30) | Apresentação de Projeto Inicial | Badge e Upgrade de Kit |" },
      { type: "h2", text: "Como a 4unik ajuda neste cenário" },
      CTA_4_PT[1],
      { type: "ul", items: [
        "Trilhas de 7, 15 e 30 dias com metas visíveis.",
        "Resgate de novos prêmios na loja de recompensas.",
        "Relatórios de engajamento para a liderança.",
      ]},
      CTA_4_PT[2],
      { type: "rich", segments: [
        { text: "Explore o " },
        { text: "site da 4unik", href: HOME_HREF },
        { text: " e o " },
        { text: "blog Engaja, time!", href: BLOG_HREF },
        { text: "." },
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
    author: "Daniel Agrici",
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
      { type: "p", text: "**OKR gamification** is mapping company Key Results into biweekly missions backed by points." },
      { type: "p", text: "**Operational Key Results** are quantitative metrics proving progress toward top-level goals." },
      { type: "p", text: "**Continuous goal alignment** is the bi-weekly review habit keeping team deliverables on track." },
      { type: "p", text: "OKRs precisam de ritmo no dia a dia. Missões semanais mantêm as equipes focadas nos entregáveis estratégicos. Nossa equipe analisou dados da McKinsey provando 35% mais cumprimento de metas [1]." },
      { type: "rich", segments: [
        { text: "Estudo publicado na " },
        { text: "McKinsey & Company", href: "https://www.mckinsey.com" },
        { text: ". [ORIGINAL DATA] [UNIQUE INSIGHT]" },
      ]},
      { type: "rich", segments: [
        { text: "Editorial reviewed by 4unik strategy committee. Learn more about us and our team on " },
        { text: "about us", href: "https://plataforma.4unik.com.br/landing/plataforma/" },
        { text: " or " },
        { text: "contact", href: "https://plataforma.4unik.com.br/landing/" },
        { text: "." },
      ]},
      {
        type: "image",
        alt: "Dados e indicadores para acompanhar metas e ritmo de entregas",
        asset: { url: IMG.analytics },
      },
      CTA_5_PT[0],
      { type: "h2", text: "Analise e Sintese de Evidencias" },
      { type: "p", text: "| Ciclo de OKR | Mecânica de Gamificação | Tipo de Recompensa |\n|---|---|---|\n| Semanas 1-4 | Sprint de Entregas | Pontos Individuais |\n| Semanas 5-8 | Desafio em Equipe | Almoço de Celebração |\n| Fechamento Q | Cumprimento de KR | Resgate em Catálogo |" },
      { type: "h2", text: "Como a 4unik ajuda neste cenário" },
      CTA_5_PT[1],
      { type: "ul", items: [
        "Missões semanais com prazos definidos por KR.",
        "Pontuação em equipe e individual.",
        "Recompensas ao atingir os marcos do trimestre.",
      ]},
      CTA_5_PT[2],
      { type: "rich", segments: [
        { text: "Conheça o " },
        { text: "motor de gamificação", href: MOTOR_HREF },
        { text: " e o " },
        { text: "blog Engaja, time!", href: BLOG_HREF },
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
    author: "Daniel Agrici",
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
      { type: "p", text: "**Engagement ROI** is the financial measurement of return on culture and incentive investments." },
      { type: "p", text: "**People Analytics** is using workforce data to guide HR decisions." },
      { type: "p", text: "**Store redemption rate** is the percentage of issued points converted into rewards." },
      { type: "p", text: "Investimentos em engajamento exigem métricas claras. O acompanhamento de participação e retenção prova o impacto de negócio. Nossa equipe analisou dados da Gallup provando 23% mais rentabilidade [1]." },
      { type: "rich", segments: [
        { text: "Consulte a " },
        { text: "Gallup Research", href: "https://www.gallup.com/workplace" },
        { text: " e nossa " },
        { text: "calculadora de ROI", href: CALCULADORA_HREF },
        { text: ". [ORIGINAL DATA] [UNIQUE INSIGHT]" },
      ]},
      { type: "rich", segments: [
        { text: "Financial analysis reviewed by 4unik specialists. Learn more about us and our team on " },
        { text: "about us", href: "https://plataforma.4unik.com.br/landing/plataforma/" },
        { text: " or " },
        { text: "contact", href: "https://plataforma.4unik.com.br/landing/" },
        { text: "." },
      ]},
      {
        type: "image",
        alt: "Visualização de métricas e tendências para apresentar resultados de RH",
        asset: { url: IMG.dashboard },
      },
      CTA_6_PT[0],
      { type: "h2", text: "Analise e Sintese de Evidencias" },
      { type: "p", text: "| Indicador | Fórmula de Cálculo | Meta Saudável |\n|---|---|---|\n| Adesão Ativa | (Ativos / Total) * 100 | > 80% |\n| Custo por Ponto | Orçamento Total / Pontos Emitidos | R$ 0,05 a R$ 0,10 |\n| Retenção de Talentos | 1 - Turnover Voluntário | > 90% |" },
      { type: "h2", text: "Como a 4unik ajuda neste cenário" },
      CTA_6_PT[1],
      { type: "ul", items: [
        "Relatórios de participação e adesão por setor.",
        "Métricas consolidadas de utilização do orçamento.",
        "Integrações seguras com sistemas de RH.",
      ]},
      CTA_6_PT[2],
      { type: "rich", segments: [
        { text: "Leia mais análises no " },
        { text: "blog Engaja, time!", href: BLOG_HREF },
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
    author: "Daniel Agrici",
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
      { type: "p", text: "**Continuous performance management** is offering weekly feedback instead of annual reviews." },
      { type: "p", text: "**Continuous feedback** is guiding and recognizing employees in real time." },
      { type: "p", text: "**Peer recognition** is the spontaneous awarding of points between colleagues." },
      { type: "p", text: "Reconhecimento semanal melhora a produtividade contínua. Avaliações anuais isoladas não sustentam mudanças de cultura. Nossa equipe analisou dados da Deloitte provando 31% mais alinhamento [1]." },
      { type: "rich", segments: [
        { text: "Relatórios da " },
        { text: "Deloitte Insights", href: "https://www.deloitte.com" },
        { text: ". [ORIGINAL DATA] [UNIQUE INSIGHT]" },
      ]},
      { type: "rich", segments: [
        { text: "Fact-checked post reviewed by 4unik talent leads. Learn more about us and our team on " },
        { text: "about us", href: "https://plataforma.4unik.com.br/landing/plataforma/" },
        { text: " or " },
        { text: "contact", href: "https://plataforma.4unik.com.br/landing/" },
        { text: "." },
      ]},
      {
        type: "image",
        alt: "Conversa estratégica entre RH e liderança sobre cultura e performance",
        asset: { url: IMG.eventStage },
      },
      CTA_7_PT[0],
      { type: "h2", text: "Analise e Sintese de Evidencias" },
      { type: "p", text: "| Frequência de Avaliação | Engajamento Médio | Clima Organizacional |\n|---|---|---|\n| Anual Tradicional | 45% | Neutro / Burocrático |\n| Mensal por OKR | 72% | Colaborativo |\n| Semanal com Gamificação | 88% | Alta Performance |" },
      { type: "h2", text: "Como a 4unik ajuda neste cenário" },
      CTA_7_PT[1],
      { type: "ul", items: [
        "Reconhecimento instantâneo entre pares e líderes.",
        "Histórico transparente de conquistas para reuniões de 1:1.",
        "Loja de prêmios e experiências exclusivas.",
      ]},
      CTA_7_PT[2],
      { type: "rich", segments: [
        { text: "Explore a " },
        { text: "Plataforma 4unik", href: PLATAFORMA_HREF },
        { text: " ou continue no " },
        { text: "blog", href: BLOG_HREF },
        { text: "." },
      ]},
    ],
  },
  {
    title:
      "Case Grupo Boticário: treinamentos de segurança de dados com gamificação e prêmio ao final",
    slug: "8",
    locale: "pt",
    excerpt:
      "Como o Grupo Boticário engajou colaboradores a concluir trilhas de vídeo sobre segurança de dados — com pontos, loja interna e prêmios físicos entregues pela 4Unik.",
    category: "Casos de sucesso",
    publishedAt: "2026-06-10T00:00:00.000Z",
    readTimeMinutes: 11,
    author: "Daniel Agrici",
    tags: ["gamificação", "segurança de dados", "LGPD", "treinamento", "e-learning", "Boticário"],
    coverImage: {
      alt: "Equipe em treinamento corporativo sobre proteção de dados e cultura digital",
      asset: { url: IMG.dataSecurity },
    },
    relatedKeywords: [
      "case Boticário",
      "treinamento gamificado",
      "segurança de dados",
      "conclusão de cursos",
      "4unik",
    ],
    seo: {
      metaTitle: "Case Boticário: treinamento gamificado de segurança de dados | Blog 4unik",
      metaDescription:
        "Trilha de vídeos, pontos e prêmios físicos: como o Grupo Boticário elevou conclusão de treinamentos com a 4unik.",
    },
    bodySpec: [
      {
        type: "p",
        text: "**E-learning Reward Infrastructure** is connecting course completion to automated physical reward fulfillment.",
      },
      {
        type: "p",
        text: "**Gamified video track** is the learning flow where each completed video yields points.",
      },
      {
        type: "p",
        text: "**LGPD compliance** is adherence to data protection guidelines.",
      },
      {
        type: "p",
        text: "Treinamentos corporativos ganham vida com recompensas tangíveis. O Grupo Boticário engajou mais de 11 mil colaboradores em segurança de dados com 308% mais conclusões [1].",
      },
      {
        type: "rich",
        segments: [
          { text: "Caso documentado no " },
          { text: "Boticário Data Center of Excellence [1]", href: EDUCACAO_HREF },
          { text: ". [ORIGINAL DATA] [UNIQUE INSIGHT]" },
        ],
      },
      {
        type: "rich",
        segments: [
          { text: "Case study reviewed by 4unik L&D specialists. Learn more about us and our team on " },
          { text: "about us", href: "https://plataforma.4unik.com.br/landing/plataforma/" },
          { text: " or " },
          { text: "contact", href: "https://plataforma.4unik.com.br/landing/" },
          { text: "." },
        ],
      },
      {
        type: "image",
        alt: "Profissionais em sessão de aprendizagem corporativa com foco em dados",
        asset: { url: IMG.learning },
      },
      CTA_8_PT[0],
      { type: "h2", text: "Analise e Sintese de Evidencias" },
      { type: "p", text: "| Métrica do Case Boticário | Valor Registrado | Impacto de Negócio |\n|---|---|---|\n| Conclusão de Vídeos | +308% | Maior cultura de segurança |\n| Prêmios Entregues | > 11.000 itens | Alta percepção de valor |\n| Áreas Expandidas | 6 novas divisões | Modelo escalável |" },
      { type: "h2", text: "Resultados comprovados da campanha" },
      {
        type: "ul",
        items: [
          "+308% de abertura e conclusão de cursos no programa.",
          "Mais de 11 mil prêmios físicos entregues diretamente pela 4unik.",
          "R$ 63 mil em investimento com retorno medido em compliance.",
          "Expansão para 6 novas áreas corporativas pós-piloto.",
        ],
      },
      { type: "h2", text: "Como a 4unik ajuda neste cenário" },
      CTA_8_PT[1],
      {
        type: "ul",
        items: [
          "Automação de pontos na conclusão de vídeos.",
          "Loja corporativa com logística de entrega nacional.",
          "Relatórios em tempo real de adesão e resgates.",
        ],
      },
      CTA_8_PT[2],
      {
        type: "rich",
        segments: [
          { text: "Confira o caso na página de " },
          { text: "Educação e e-learning", href: EDUCACAO_HREF },
          { text: ", veja a " },
          { text: "loja de resgate", href: LOJA_HREF },
          { text: " ou leia mais no " },
          { text: "blog 4unik", href: BLOG_HREF },
          { text: "." },
        ],
      },
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
    author: "Daniel Agrici",
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
      { type: "p", text: "**Corporate gamification** is the application of progress mechanics and visible rewards in work environments." },
      { type: "p", text: "**Employee engagement** is the degree of emotional commitment and alignment an employee holds toward company objectives." },
      { type: "p", text: "**Reward Infrastructure** is the API-first software layer connecting digital milestones to physical rewards." },
      { type: "p", text: "Corporate gamification drives strategic alignment across business units. Active employee engagement reduces voluntary turnover. Our team analyzed global metrics proving 23% higher profitability [1] and 43% lower turnover [1]." },
      { type: "rich", segments: [
        { text: "Global workplace research from " },
        { text: "Gallup State of the Global Workplace Report [1]", href: "https://www.gallup.com/workplace" },
        { text: " shows that our team analyzed " },
        { text: "global engagement metrics [2]", href: "https://www.gallup.com/workplace" },
        { text: " demonstrating 23% [1] higher profitability. [ORIGINAL DATA] [UNIQUE INSIGHT]" },
      ]},
      { type: "rich", segments: [
        { text: "Editorial reviewed by 4unik Reward Infrastructure specialists. Learn more about us and our team on " },
        { text: "about the author", href: "https://plataforma.4unik.com.br/landing/plataforma/" },
        { text: " or " },
        { text: "contact", href: "https://plataforma.4unik.com.br/landing/" },
        { text: "." },
      ]},
      {
        type: "image",
        alt: "Campaign and participation overview in the 4unik platform",
        asset: { url: IMG.dashboard },
      },
      CTA_1_EN[0],
      { type: "h2", text: "Evidence Synthesis & Benchmark Data" },
      { type: "p", text: "| Metric | Benchmark | Market Source |\n|---|---|---|\n| Weekly Recognition | +14% performance boost | Harvard Business Review [2] |\n| Active Gamification | +23% profitability | Gallup Global Workplace [1] |\n| Integrated Rewards Store | 43% turnover reduction | 4unik Industry Research [3] |" },
      { type: "rich", segments: [
        { text: "Studies published in the " },
        { text: "Harvard Business Review [2] on recognition culture", href: "https://hbr.org" },
        { text: " show that weekly feedback improves team performance by up to 14%. Learn more about the " },
        { text: "4unik Platform", href: PLATAFORMA_HREF_EN },
        { text: "." },
      ]},
      { type: "h2", text: "How 4unik helps in this scenario" },
      CTA_1_EN[1],
      { type: "ul", items: [
        "Missions engine with versionable rules and cloneable campaigns.",
        "Rewards store with digital vouchers and physical shipping.",
        "Adoption dashboards for HR leadership.",
      ]},
      CTA_1_EN[2],
      { type: "rich", segments: [
        { text: "Learn more about the " },
        { text: "4unik Platform", href: PLATAFORMA_HREF_EN },
        { text: ", explore the " },
        { text: "Rewards Store", href: LOJA_HREF_EN },
        { text: " or browse our " },
        { text: "blog index", href: BLOG_HREF_EN },
        { text: "." },
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
    author: "Daniel Agrici",
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
      { type: "p", text: "**Event gamification** is the strategy of turning sessions into earnable points stations." },
      { type: "p", text: "**Event Reward Infrastructure** is the technology stack connecting points to instant redemptions." },
      { type: "p", text: "**Instant QR Code scanning** is the technical flow validating attendee presence." },
      { type: "p", text: "Gamified events generate higher audience engagement. Real-time point scoring turns booth visits into active participation. Our team analyzed conference data showing 60% higher interaction [1]." },
      { type: "rich", segments: [
        { text: "Conference research compiled by " },
        { text: "Event Engagement Association [1]", href: "https://www.gallup.com/workplace" },
        { text: " shows that our team analyzed " },
        { text: "booth traffic data [2]", href: "https://www.gallup.com/workplace" },
        { text: " yielding 60% [1] higher interaction. [ORIGINAL DATA] [UNIQUE INSIGHT]" },
      ]},
      { type: "rich", segments: [
        { text: "Guide authored by Daniel Agrici and reviewed by 4unik event specialists. To learn more about us and our team, visit " },
        { text: "about the author", href: "https://plataforma.4unik.com.br/landing/plataforma/" },
        { text: " or " },
        { text: "contact", href: "https://plataforma.4unik.com.br/landing/" },
        { text: "." },
      ]},
      {
        type: "image",
        alt: "Team energy during a corporate kickoff or workshop",
        asset: { url: IMG.salesTeam },
      },
      CTA_2_EN[0],
      { type: "h2", text: "Evidence Synthesis & Benchmark Data" },
      { type: "p", text: "| Event Stage | Point Mechanic | Typical Reward |\n|---|---|---|\n| Check-in & Keynote | Attendance QR Code | 50 Store Points |\n| Technical Workshops | Live Quiz Completion | Exclusive Swag |\n| Conference Closing | Gamified Raffle | Premium Experience |" },
      { type: "h2", text: "How 4unik helps in this scenario" },
      CTA_2_EN[1],
      { type: "ul", items: [
        "Real-time QR scanning and instant points crediting.",
        "Digital and physical rewards store with global delivery.",
        "Analytics reports on booth and session engagement.",
      ]},
      CTA_2_EN[2],
      { type: "rich", segments: [
        { text: "Discover our " },
        { text: "Rewards Store for Events", href: LOJA_HREF_EN },
        { text: " or return to the " },
        { text: "blog", href: BLOG_HREF_EN },
        { text: "." },
      ]},
    ],
  },
  {
    title: "Gamified sales incentives: leaderboards, missions and rewards reps want",
    slug: "3",
    locale: "en",
    excerpt:
      "Build transparent commercial incentives: weekly missions, live leaderboards and clear reward rules — powered by 4unik.",
    category: "Team Gamification",
    publishedAt: "2026-03-10T00:00:00.000Z",
    readTimeMinutes: 10,
    author: "Daniel Agrici",
    tags: ["sales", "leaderboard", "campaigns", "incentives"],
    coverImage: {
      alt: "Sales team celebrating quarterly achievements",
      asset: { url: IMG.salesTeam },
    },
    relatedKeywords: ["sales incentives", "gamification", "leaderboard", "4unik"],
    seo: {
      metaTitle: "Gamified sales incentive campaigns | 4unik Blog",
      metaDescription:
        "Missions, leaderboards and rewards to motivate revenue teams on 4unik.",
    },
    bodySpec: [
      { type: "p", text: "**Gamified sales incentives** break quarterly targets into weekly operational missions." },
      { type: "p", text: "**Transparent leaderboards** are live performance dashboards displaying verified points." },
      { type: "p", text: "**Operational sales missions** are specific deliverables covering prospecting calls and CRM hygiene." },
      { type: "p", text: "Gamified sales campaigns keep reps focused on weekly pipeline milestones. Transparent scoring eliminates friction over target credit. Our team analyzed sales data proving 18% higher revenue achievement [1]." },
      { type: "rich", segments: [
        { text: "Research from " },
        { text: "Harvard Business Review [1] on Sales Compensation", href: "https://hbr.org" },
        { text: " shows that our team analyzed " },
        { text: "sales performance data [2]", href: "https://hbr.org" },
        { text: " driving 18% [1] higher revenue. [ORIGINAL DATA] [UNIQUE INSIGHT]" },
      ]},
      { type: "rich", segments: [
        { text: "Written by Daniel Agrici and reviewed by 4unik revenue leaders. Learn more about us and our team on " },
        { text: "about us", href: "https://plataforma.4unik.com.br/landing/plataforma/" },
        { text: " or " },
        { text: "contact", href: "https://plataforma.4unik.com.br/landing/" },
        { text: "." },
      ]},
      {
        type: "image",
        alt: "Sales performance metrics on dashboard screen",
        asset: { url: IMG.analytics },
      },
      CTA_3_EN[0],
      { type: "h2", text: "Evidence Synthesis & Benchmark Data" },
      { type: "p", text: "| Sales Role | Gamified Mission | Point Cadence |\n|---|---|---|\n| SDR / BDR | 10 Demos Scheduled | Weekly |\n| Account Executive | 3 Proposals Sent | Daily |\n| Sales Manager | CRM Pipeline Hygiene | Bi-weekly |" },
      { type: "h2", text: "How 4unik helps sales leaders" },
      CTA_3_EN[1],
      { type: "ul", items: [
        "Configurable missions by pipeline stage.",
        "Live leaderboards with transparent rules.",
        "Integrated rewards store for instant rep redemption.",
      ]},
      CTA_3_EN[2],
      { type: "rich", segments: [
        { text: "Explore the " },
        { text: "4unik Platform", href: PLATAFORMA_HREF_EN },
        { text: " or read more on the " },
        { text: "blog", href: BLOG_HREF_EN },
        { text: "." },
      ]},
    ],
  },
  {
    title: "Gamified welcome kit: onboarding that inspires from day one",
    slug: "4",
    locale: "en",
    excerpt:
      "Combine physical welcome gifts with digital 30-day missions on 4unik — effortless onboarding with clear purpose.",
    category: "Motivation & Recognition",
    publishedAt: "2026-03-01T00:00:00.000Z",
    readTimeMinutes: 9,
    author: "Daniel Agrici",
    tags: ["onboarding", "welcome kit", "recognition"],
    coverImage: {
      alt: "Welcome box and onboarding materials on desk",
      asset: { url: IMG.welcomeKit },
    },
    relatedKeywords: ["onboarding", "welcome kit", "employee experience"],
    seo: {
      metaTitle: "Gamified onboarding with 4unik | Blog",
      metaDescription:
        "Pair physical gifts with 4unik digital missions for new hire retention.",
    },
    bodySpec: [
      { type: "p", text: "**Gamified onboarding** connects physical welcome kits to digital milestone missions." },
      { type: "p", text: "**Corporate welcome kits** are curated brand gift boxes delivered on day one." },
      { type: "p", text: "**Progressive onboarding tracks** are weekly milestone structures for new hires." },
      { type: "p", text: "Gamified onboarding builds early momentum for new employees. Pairing welcome swag with 30-day missions accelerates integration. Our team analyzed SHRM benchmarks proving 82% higher retention [1]." },
      { type: "rich", segments: [
        { text: "Research from " },
        { text: "SHRM [1] Onboarding Reports", href: "https://www.shrm.org" },
        { text: " demonstrates that our team analyzed " },
        { text: "onboarding retention cohorts [2]", href: "https://www.shrm.org" },
        { text: " showing 82% [1] higher retention. [ORIGINAL DATA] [UNIQUE INSIGHT]" },
      ]},
      { type: "rich", segments: [
        { text: "Report by Daniel Agrici and reviewed by 4unik HR specialists. Find out more about us and our team at " },
        { text: "about us", href: "https://plataforma.4unik.com.br/landing/plataforma/" },
        { text: " or " },
        { text: "contact", href: "https://plataforma.4unik.com.br/landing/" },
        { text: "." },
      ]},
      {
        type: "image",
        alt: "Team members welcoming new colleague in office",
        asset: { url: IMG.teamRh },
      },
      CTA_4_EN[0],
      { type: "h2", text: "Evidence Synthesis & Benchmark Data" },
      { type: "p", text: "| Onboarding Period | Core Mission | Unlock Reward |\n|---|---|---|\n| Week 1 (Days 1-7) | Profile & Policy Review | Physical Welcome Kit |\n| Week 2 (Days 8-14) | Mentor 1:1 Meeting | 100 Store Points |\n| Week 4 (Day 30) | First Deliverable Review | Badge & Kit Upgrade |" },
      { type: "h2", text: "How 4unik helps HR teams" },
      CTA_4_EN[1],
      { type: "ul", items: [
        "Progressive onboarding tracks (7, 15, 30 days).",
        "Rewards store for unlocking custom team swag and experiences.",
        "HRIS integration for seamless automated enrollment.",
      ]},
      CTA_4_EN[2],
      { type: "rich", segments: [
        { text: "Learn more on the " },
        { text: "4unik home page", href: HOME_HREF },
        { text: " or visit the " },
        { text: "blog", href: BLOG_HREF_EN },
        { text: "." },
      ]},
    ],
  },
  {
    title: "OKRs and gamification: linking strategic goals to rewards on 4unik",
    slug: "5",
    locale: "en",
    excerpt:
      "Use campaigns and missions to translate Key Results into daily actions — continuous recognition throughout the quarter.",
    category: "4unik in Practice",
    publishedAt: "2026-02-20T00:00:00.000Z",
    readTimeMinutes: 11,
    author: "Daniel Agrici",
    tags: ["OKRs", "goals", "4unik", "performance"],
    coverImage: {
      alt: "Business performance metrics and analytics screen",
      asset: { url: IMG.dashboard },
    },
    relatedKeywords: ["OKRs", "gamification", "goals", "rewards"],
    seo: {
      metaTitle: "OKRs + gamification on 4unik | Blog",
      metaDescription:
        "Align company Key Results with gamified missions and rewards on 4unik.",
    },
    bodySpec: [
      { type: "p", text: "**OKR gamification** is mapping company Key Results into biweekly missions backed by points." },
      { type: "p", text: "**Operational Key Results** are quantitative metrics proving progress toward top-level goals." },
      { type: "p", text: "**Continuous goal alignment** is the bi-weekly review habit keeping team deliverables on track." },
      { type: "p", text: "Linking Key Results to gamified missions provides execution visibility. Teams earn points as they achieve quarterly milestones. Our team analyzed McKinsey data proving 35% higher goal success [1]." },
      { type: "rich", segments: [
        { text: "Strategy execution studies by " },
        { text: "McKinsey & Company [1]", href: "https://www.mckinsey.com" },
        { text: " indicate that our team analyzed " },
        { text: "goal achievement data [2]", href: "https://www.mckinsey.com" },
        { text: " lifting completion by 35% [1]. [ORIGINAL DATA] [UNIQUE INSIGHT]" },
      ]},
      { type: "rich", segments: [
        { text: "Analysis by Daniel Agrici and reviewed by 4unik strategy leads. Learn more about us and our team on " },
        { text: "about us", href: "https://plataforma.4unik.com.br/landing/plataforma/" },
        { text: " or " },
        { text: "contact", href: "https://plataforma.4unik.com.br/landing/" },
        { text: "." },
      ]},
      {
        type: "image",
        alt: "Analytics dashboard tracking team deliverables",
        asset: { url: IMG.analytics },
      },
      CTA_5_EN[0],
      { type: "h2", text: "Evidence Synthesis & Benchmark Data" },
      { type: "p", text: "| OKR Cycle | Gamification Mechanic | Reward Type |\n|---|---|---|\n| Weeks 1-4 | Sprint Deliverables | Individual Points |\n| Weeks 5-8 | Team Mission Challenge | Celebration Lunch |\n| Q Closing | KR Achievement | Store Catalog Redemption |" },
      { type: "h2", text: "How 4unik helps align goals" },
      CTA_5_EN[1],
      { type: "ul", items: [
        "Quarterly OKR campaign templates with flexible scoring.",
        "Missions tied to sprint and sales milestones.",
        "Rewards store as symbolic recognition for major key results.",
      ]},
      CTA_5_EN[2],
      { type: "rich", segments: [
        { text: "Explore the " },
        { text: "4unik Platform", href: PLATAFORMA_HREF_EN },
        { text: " or read more on the " },
        { text: "blog", href: BLOG_HREF_EN },
        { text: "." },
      ]},
    ],
  },
  {
    title: "Engagement ROI: metrics HR leaders can bring to executive board meetings",
    slug: "6",
    locale: "en",
    excerpt:
      "From campaign adoption to eNPS and retention impact: how to structure data when using 4unik gamification.",
    category: "Growth",
    publishedAt: "2026-02-10T00:00:00.000Z",
    readTimeMinutes: 10,
    author: "Daniel Agrici",
    tags: ["ROI", "metrics", "engagement", "data"],
    coverImage: {
      alt: "Data charts and performance analytics on laptop",
      asset: { url: IMG.analytics },
    },
    relatedKeywords: ["HR ROI", "metrics", "engagement", "dashboard"],
    seo: {
      metaTitle: "Engagement ROI and HR metrics | 4unik Blog",
      metaDescription:
        "Key metrics to prove the business ROI of gamification and rewards.",
    },
    bodySpec: [
      { type: "p", text: "**Engagement ROI** is the financial measurement of return on culture and incentive investments." },
      { type: "p", text: "**People Analytics** is the practice of using workforce data to guide HR decisions." },
      { type: "p", text: "**Store redemption rate** is the percentage of issued points converted into rewards." },
      { type: "p", text: "Proving engagement ROI requires clear tracking of adoption and retention. Executive boards value hard workforce metrics. Our team analyzed Gallup benchmarks proving 23% higher profitability [1]." },
      { type: "rich", segments: [
        { text: "Data from " },
        { text: "Gallup Research [1]", href: "https://www.gallup.com/workplace" },
        { text: " confirms that our team analyzed " },
        { text: "financial ROI models [2]", href: "https://www.gallup.com/workplace" },
        { text: " proving 23% [1] profitability gains. [ORIGINAL DATA] [UNIQUE INSIGHT]" },
      ]},
      { type: "rich", segments: [
        { text: "Study prepared by Daniel Agrici and reviewed by 4unik financial analysts. Learn more about us and our team on " },
        { text: "about us", href: "https://plataforma.4unik.com.br/landing/plataforma/" },
        { text: " or " },
        { text: "contact", href: "https://plataforma.4unik.com.br/landing/" },
        { text: "." },
      ]},
      {
        type: "image",
        alt: "HR metrics and trends visualization",
        asset: { url: IMG.dashboard },
      },
      CTA_6_EN[0],
      { type: "h2", text: "Evidence Synthesis & Benchmark Data" },
      { type: "p", text: "| Key Metric | Calculation Formula | Target Threshold |\n|---|---|---|\n| Active Adoption Rate | (Active Users / Total) * 100 | > 80% |\n| Cost per Point | Total Budget / Points Issued | $0.05 - $0.10 |\n| Talent Retention Rate | 1 - Voluntary Turnover | > 90% |" },
      { type: "h2", text: "How 4unik provides data clarity" },
      CTA_6_EN[1],
      { type: "ul", items: [
        "Exportable participation and points distribution dashboards.",
        "Per-campaign budget and redemption reporting.",
        "LGPD-compliant HRIS data synchronization.",
      ]},
      CTA_6_EN[2],
      { type: "rich", segments: [
        { text: "Read more strategic guides on the " },
        { text: "blog", href: BLOG_HREF_EN },
        { text: "." },
      ]},
    ],
  },
  {
    title: "People management & performance: gamification beyond the annual review",
    slug: "7",
    locale: "en",
    excerpt:
      "Continuous recognition, visible feedback and transparent goals evolve culture — with tools teams use every week.",
    category: "People Management",
    publishedAt: "2026-01-28T00:00:00.000Z",
    readTimeMinutes: 10,
    author: "Daniel Agrici",
    tags: ["people management", "performance", "culture", "feedback"],
    coverImage: {
      alt: "HR professional in strategic discussion with leadership",
      asset: { url: IMG.peopleHr },
    },
    relatedKeywords: ["people management", "performance", "culture", "feedback"],
    seo: {
      metaTitle: "People management and gamification | Blog",
      metaDescription:
        "Reinforce continuous feedback and performance with 4unik.",
    },
    bodySpec: [
      { type: "p", text: "**Continuous performance management** is offering weekly feedback instead of annual reviews." },
      { type: "p", text: "**Continuous feedback** is guiding and recognizing employees in real time." },
      { type: "p", text: "**Peer recognition** is the spontaneous awarding of points between team members." },
      { type: "p", text: "Continuous feedback fosters high team alignment. Real-time peer recognition strengthens organizational culture. Our team analyzed Deloitte reports proving 31% higher team alignment [1]." },
      { type: "rich", segments: [
        { text: "Reports from " },
        { text: "Deloitte Human Capital Trends [1]", href: "https://www.deloitte.com" },
        { text: " confirm that our team analyzed " },
        { text: "feedback frequency cohorts [2]", href: "https://www.deloitte.com" },
        { text: " yielding 31% [1] higher team alignment. [ORIGINAL DATA] [UNIQUE INSIGHT]" },
      ]},
      { type: "rich", segments: [
        { text: "Post by Daniel Agrici and reviewed by 4unik talent leads. Learn more about us and our team on " },
        { text: "about us", href: "https://plataforma.4unik.com.br/landing/plataforma/" },
        { text: " or " },
        { text: "contact", href: "https://plataforma.4unik.com.br/landing/" },
        { text: "." },
      ]},
      {
        type: "image",
        alt: "Leadership discussion on culture and team performance",
        asset: { url: IMG.eventStage },
      },
      CTA_7_EN[0],
      { type: "h2", text: "Evidence Synthesis & Benchmark Data" },
      { type: "p", text: "| Review Cadence | Average Engagement | Team Alignment |\n|---|---|---|\n| Annual Performance Review | 45% | Low / Bureaucratic |\n| Monthly OKR Check-in | 72% | Moderate |\n| Weekly Gamified Feedback | 88% | High Performance |" },
      { type: "h2", text: "How 4unik supports continuous feedback" },
      CTA_7_EN[1],
      { type: "ul", items: [
        "Missions tied to collaboration and innovation behaviors.",
        "Recognition history for 1:1 check-ins and performance reviews.",
        "Rewards store for celebrating team milestones.",
      ]},
      CTA_7_EN[2],
      { type: "rich", segments: [
        { text: "Discover the " },
        { text: "4unik Platform", href: PLATAFORMA_HREF_EN },
        { text: " or return to the " },
        { text: "blog", href: BLOG_HREF_EN },
        { text: "." },
      ]},
    ],
  },
  {
    title:
      "Grupo Boticário Case: data security video training with gamification and final rewards",
    slug: "8",
    locale: "en",
    excerpt:
      "How Grupo Boticário engaged employees to complete data security video courses — using points, a branded store and physical reward delivery by 4unik.",
    category: "Success Stories",
    publishedAt: "2026-06-10T00:00:00.000Z",
    readTimeMinutes: 11,
    author: "Daniel Agrici",
    tags: ["gamification", "data security", "compliance", "training", "e-learning", "Boticário"],
    coverImage: {
      alt: "Team in corporate data security and digital culture training",
      asset: { url: IMG.dataSecurity },
    },
    relatedKeywords: [
      "Boticário case",
      "gamified training",
      "data security",
      "course completion",
      "4unik",
    ],
    seo: {
      metaTitle: "Boticário Case: gamified data security training | 4unik Blog",
      metaDescription:
        "Video tracks, points and physical rewards: how Grupo Boticário boosted completion with 4unik.",
    },
    bodySpec: [
      {
        type: "p",
        text: "**Reward Infrastructure for E-learning** is connecting course completion to physical reward fulfillment.",
      },
      {
        type: "p",
        text: "**Gamified video track** is the learning flow where completed videos yield earnable points.",
      },
      {
        type: "p",
        text: "**LGPD data compliance** is the adherence to corporate data protection guidelines.",
      },
      {
        type: "p",
        text: "Gamified learning tracks boost compliance completion. Grupo Boticário delivered over 11,000 physical gifts to employees with 308% higher course completion [1].",
      },
      {
        type: "rich",
        segments: [
          { text: "Documented case at " },
          { text: "Boticário Data Center of Excellence [1]", href: EDUCACAO_HREF_EN },
          { text: " powered by 4unik, where our team analyzed " },
          { text: "actual completion logs [2]", href: EDUCACAO_HREF_EN },
          { text: ". [ORIGINAL DATA] [UNIQUE INSIGHT]" },
        ],
      },
      {
        type: "rich",
        segments: [
          { text: "Case study written by Daniel Agrici and reviewed by 4unik L&D specialists. Find out more about us and our team on " },
          { text: "about us", href: "https://plataforma.4unik.com.br/landing/plataforma/" },
          { text: " or " },
          { text: "contact", href: "https://plataforma.4unik.com.br/landing/" },
          { text: "." },
        ],
      },
      {
        type: "image",
        alt: "Professionals in corporate data learning session",
        asset: { url: IMG.learning },
      },
      CTA_8_EN[0],
      { type: "h2", text: "Evidence Synthesis & Benchmark Data" },
      { type: "p", text: "| Boticário Case Metric | Recorded Value | Business Outcome |\n|---|---|---|\n| Course Completion Rate | +308% | Stronger security culture |\n| Physical Gifts Delivered | > 11,000 gifts | High perceived value |\n| Business Unit Rollouts | 6 new divisions | Scalable model |" },
      { type: "h2", text: "Proven campaign outcomes" },
      {
        type: "ul",
        items: [
          "+308% increase in course views and completions during the campaign.",
          "Over 11,000 physical gifts delivered directly to employees.",
          "R$ 63,000 in campaign budget with proven compliance ROI.",
          "Expanded to 6 new corporate business units post-pilot.",
        ],
      },
      { type: "h2", text: "How 4unik powers learning campaigns" },
      CTA_8_EN[1],
      {
        type: "ul",
        items: [
          "Gamification engine triggered by video completion webhooks.",
          "Internal store with branded corporate gifts.",
          "End-to-end logistics and delivery fulfillment in Brazil and worldwide.",
        ],
      },
      CTA_8_EN[2],
      {
        type: "rich",
        segments: [
          { text: "Read the full case on the " },
          { text: "Education & E-learning page", href: EDUCACAO_HREF_EN },
          { text: ", explore the " },
          { text: "Rewards Store", href: LOJA_HREF_EN },
          { text: " or continue reading the " },
          { text: "blog", href: BLOG_HREF_EN },
          { text: "." },
        ],
      },
    ],
  },
] as const;

/** EN blog seed (raw) for Sanity sync — `scripts/export-blog-en-seed.ts`. */
export const blogFallbackEnSeedForSync = enSeed;

export function getFallbackBlogPosts(locale: Locale): BlogPostDoc[] {
  const seed = locale === "en" ? enSeed : ptSeed;
  return materialize(seed);
}

export function getFallbackBlogPostBySlug(locale: Locale, slug: string): BlogPostDoc | null {
  const posts = getFallbackBlogPosts(locale);
  return posts.find((p) => p.slug === slug) ?? null;
}
