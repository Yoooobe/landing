#!/usr/bin/env node
/**
 * Agente de geração de posts do Blog Engaja, time! — 4unik
 *
 * Uso:
 *   node scripts/generate-blog-posts.mjs [opções]
 *
 * Opções:
 *   --count <n>         Número de posts a gerar (padrão: 3)
 *   --locale <pt|en>    Idioma dos posts (padrão: pt)
 *   --topic "<texto>"   Gera um post sobre um tópico específico
 *   --category "<cat>"  Restringe geração a uma categoria específica
 *   --dry-run           Exibe o JSON gerado sem publicar no Sanity
 *   --publish           Define publishedAt (publica em vez de criar rascunho)
 *
 * Variáveis de ambiente necessárias:
 *   OPENAI_API_KEY            — chave da API OpenAI
 *   NEXT_PUBLIC_SANITY_PROJECT_ID — ID do projeto Sanity
 *   NEXT_PUBLIC_SANITY_DATASET    — dataset do Sanity (ex: production)
 *   SANITY_API_TOKEN              — token com permissão de escrita
 *
 * Exemplo:
 *   node scripts/generate-blog-posts.mjs --count 5 --locale pt
 *   node scripts/generate-blog-posts.mjs --topic "Como gamificar eventos de RH" --publish
 */

import { createClient } from "@sanity/client";

// ──────────────────────────────────────────────
// Config
// ──────────────────────────────────────────────
const args = process.argv.slice(2);
const getArg = (flag, fallback) => {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
};
const hasFlag = (flag) => args.includes(flag);

const COUNT = parseInt(getArg("--count", "3"), 10);
const LOCALE = getArg("--locale", "pt");
const SPECIFIC_TOPIC = getArg("--topic", null);
const SPECIFIC_CATEGORY = getArg("--category", null);
const DRY_RUN = hasFlag("--dry-run");
const SHOULD_PUBLISH = hasFlag("--publish");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const SANITY_TOKEN = process.env.SANITY_API_TOKEN;

if (!OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY não definida. Adicione no .env.local ou exporte no terminal.");
  process.exit(1);
}

if (!DRY_RUN && (!SANITY_PROJECT_ID || !SANITY_TOKEN)) {
  console.error(
    "❌ NEXT_PUBLIC_SANITY_PROJECT_ID e SANITY_API_TOKEN são obrigatórios para publicar no Sanity.\n" +
    "   Use --dry-run para testar sem publicar."
  );
  process.exit(1);
}

// ──────────────────────────────────────────────
// Sanity client
// ──────────────────────────────────────────────
const sanity = !DRY_RUN
  ? createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: "2024-01-01",
      token: SANITY_TOKEN,
      useCdn: false,
    })
  : null;

// ──────────────────────────────────────────────
// Topic seeds por categoria
// ──────────────────────────────────────────────
const TOPIC_SEEDS = {
  "Engajamento": [
    "Métricas de engajamento que todo RH deveria acompanhar",
    "Como criar uma cultura de alto desempenho usando reconhecimento contínuo",
    "Por que elogios públicos aumentam retenção — e como estruturá-los na sua empresa",
    "Diversidade e inclusão gamificada: como promover pertencimento com engajamento",
    "Como medir o ROI de iniciativas de engajamento de forma prática",
  ],
  "Gamificação de Times": [
    "Como usar gamificação para reduzir turnover em equipes de vendas",
    "Ranking de equipes: como criar competições saudáveis sem gerar desmotivação",
    "Missões em grupo: como engajar times inteiros com desafios coletivos",
    "Gamificação para equipes remotas: como manter a cultura viva à distância",
    "Pontos, níveis e conquistas: montando o sistema de progressão ideal para seu time",
  ],
  "4unik na Prática": [
    "OKRs + gamificação: como transformar metas em engajamento real com a 4unik",
    "Como montar uma loja de recompensas que os colaboradores adoram visitar",
    "Passo a passo: criando sua primeira campanha de gamificação na plataforma 4unik",
    "Integrações 4unik: conectando a plataforma ao seu HRIS em menos de uma semana",
    "Como usar os dashboards da 4unik para tomar decisões de RH baseadas em dados",
  ],
  "Eventos & Brindes": [
    "Gamificação em eventos de RH: engajando participantes do início ao fim",
    "Como usar QR Codes + pontos 4unik para criar experiências memoráveis em eventos",
    "Brindes inteligentes: como substituir kits físicos por recompensas que os colaboradores escolhem",
    "Convenção de vendas gamificada: case prático com pontuação ao vivo e premiação na hora",
    "Hackathons internos gamificados: como a 4unik potencializa a inovação corporativa",
    "Gamificação em convenção de vendas: como a 4unik transforma o evento em experiência",
    "Como criar desafios com pontuação em tempo real durante eventos corporativos",
    "Troca de brindes gamificada: adeus kits de brinde genéricos, olá recompensas que o colaborador escolhe",
    "Evento de final de ano gamificado: guia completo para o RH montar do zero",
    "Premiação ao vivo: como criar momentos de reconhecimento inesquecíveis em eventos com a plataforma 4unik",
  ],
  "Crescimento": [
    "Como o RH pode medir o ROI de iniciativas de engajamento",
    "Gestão de performance com gamificação: além das avaliações tradicionais",
    "Como criar uma cultura de alto desempenho usando reconhecimento contínuo",
  ],
  "Gestão de Pessoas": [
    "Diversidade e inclusão gamificada: como promover pertencimento com engajamento",
    "Gestão de performance com gamificação: além das avaliações tradicionais",
    "Como criar rituais de reconhecimento que os funcionários realmente valorizam",
  ],
  "Motivação & Reconhecimento": [
    "5 formas de usar o 4unik para criar campanhas de reconhecimento que funcionam",
    "Por que elogios públicos aumentam retenção — e como estruturá-los na sua empresa",
    "Guia de onboarding gamificado para novos colaboradores com a 4unik",
    "Como criar rituais de reconhecimento que os funcionários realmente valorizam",
    "Como criar uma campanha mensal de metas com pontos e recompensas na 4unik",
    "Campanha de indicação interna: como a 4unik transforma seu colaborador no melhor recrutador",
    "30 dias de engajamento: como montar uma campanha de bem-estar gamificada para o time",
    "Como criar uma campanha de aniversário de empresa que o colaborador realmente vai lembrar",
    "Campanhas sazonais com a 4unik: do Dia do Trabalhador ao fim de ano, engajando em cada data",
    "Como montar uma campanha de onboarding gamificada para novos colaboradores com a 4unik",
    "Campanha de metas trimestrais: como conectar OKRs da empresa a recompensas individuais na plataforma",
    "Campanha de vendas gamificada: como montar ranking, prêmios e regras que todo time aceita",
  ],
};

const ALL_CATEGORIES = Object.keys(TOPIC_SEEDS);

// ──────────────────────────────────────────────
// System prompt for OpenAI
// ──────────────────────────────────────────────
const SYSTEM_PROMPT = `Você é um especialista em RH e engajamento corporativo, redator sênior do blog "Engaja, time! — um blog 4unik para os heróis do RH".

SOBRE A 4unik:
A 4unik é uma plataforma brasileira de gamificação e reconhecimento corporativo com as seguintes funcionalidades:
- Motor de gamificação: pontos, missões, rankings, badges, níveis e conquistas configuráveis
- Loja de recompensas: catálogo digital com produtos físicos, vouchers, experiências e brindes personalizados
- QR Codes para eventos: distribuição de pontos instantânea em stands, estações e checkpoints
- Campanhas: criação de campanhas temáticas com regras, prazos e metas
- Dashboards: métricas de engajamento, adesão por equipe, ROI de campanhas
- Integrações via API: conexão com HRIS, ATS, Slack, Microsoft Teams e outros
- Logística D+1: envio de brindes físicos com SLA de entrega garantido

PÚBLICO-ALVO: Profissionais de RH, People Ops, líderes de equipe e gestores de cultura em empresas brasileiras.

ESTILO DE ESCRITA:
- Tom: especialista amigável, direto, prático — como um colega de RH que já passou pelos mesmos desafios
- Português brasileiro, sem jargões desnecessários
- Parágrafos curtos (3-5 linhas), sem introduções genéricas ("Neste artigo vamos...")
- Comece sempre com um gancho que conecta com a dor do leitor
- Use exemplos práticos e números quando possível
- Mencione funcionalidades da 4unik de forma natural, não como propaganda
- Termine com um próximo passo acionável

IMPORTANTE: Retorne APENAS o JSON, sem markdown, sem \`\`\`json, sem texto antes ou depois.`;

// ──────────────────────────────────────────────
// Generate a blog post via OpenAI
// ──────────────────────────────────────────────
async function generatePost(topic, category, locale) {
  const langInstruction =
    locale === "en"
      ? "Write the entire post in English. Keep the same expertise level and practical tone."
      : "Escreva o post inteiro em português brasileiro.";

  const userPrompt = `${langInstruction}

Gere um post completo para o blog "Engaja, time!" sobre o seguinte tópico:
"${topic}"

Categoria: ${category}

Retorne um objeto JSON com exatamente esta estrutura:
{
  "title": "Título do post (máx 80 chars, atraente e com palavra-chave)",
  "excerpt": "Resumo de 1-2 frases (máx 220 chars) que convença o leitor a clicar",
  "category": "${category}",
  "author": "Time 4unik",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "readTimeMinutes": 7,
  "relatedKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "seo": {
    "metaTitle": "Meta title para SEO (máx 60 chars)",
    "metaDescription": "Meta description para SEO (máx 155 chars)"
  },
  "body": [
    {
      "_key": "block-0",
      "_type": "block",
      "style": "normal",
      "children": [{ "_type": "span", "text": "Primeiro parágrafo...", "marks": [] }],
      "markDefs": []
    }
  ]
}

O campo "body" deve ter 8-12 blocos. Use "style": "h2" para subtítulos e "style": "normal" para parágrafos.
Cada bloco deve ter "_key" único (ex: "block-0", "block-1", "h2-intro", etc.).
Conteúdo mínimo: 800 palavras. Inclua exemplos práticos, dados ou casos de uso da 4unik.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error: ${response.status} — ${err}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) throw new Error("Resposta vazia da OpenAI");

  try {
    return JSON.parse(content);
  } catch {
    // Try to extract JSON from the response if there's surrounding text
    const match = content.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error(`Não foi possível fazer parse do JSON: ${content.slice(0, 200)}`);
  }
}

// ──────────────────────────────────────────────
// Build slug from title
// ──────────────────────────────────────────────
function buildSlug(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 96);
}

// ──────────────────────────────────────────────
// Upsert to Sanity
// ──────────────────────────────────────────────
async function upsertToSanity(post) {
  const slug = buildSlug(post.title);
  const docId = `blogPost.${LOCALE}.${slug}`;

  const doc = {
    _id: docId,
    _type: "blogPost",
    title: post.title,
    slug: { _type: "slug", current: slug },
    locale: LOCALE,
    excerpt: post.excerpt,
    category: post.category,
    author: post.author || "Time 4unik",
    tags: post.tags || [],
    aiGenerated: true,
    contentBrief: post._brief || null,
    readTimeMinutes: post.readTimeMinutes || 7,
    relatedKeywords: post.relatedKeywords || [],
    seo: post.seo || null,
    body: post.body || [],
    featured: false,
    // Only set publishedAt if --publish flag is used
    ...(SHOULD_PUBLISH ? { publishedAt: new Date().toISOString() } : {}),
  };

  await sanity.createOrReplace(doc);
  return { slug, docId };
}

// ──────────────────────────────────────────────
// Pick topics to generate
// ──────────────────────────────────────────────
function pickTopics(count) {
  if (SPECIFIC_TOPIC) {
    const category = SPECIFIC_CATEGORY || ALL_CATEGORIES[0];
    return [{ topic: SPECIFIC_TOPIC, category }];
  }

  const pool = [];
  const cats = SPECIFIC_CATEGORY ? [SPECIFIC_CATEGORY] : ALL_CATEGORIES;

  for (const cat of cats) {
    const topics = TOPIC_SEEDS[cat] || [];
    for (const topic of topics) {
      pool.push({ topic, category: cat });
    }
  }

  // Shuffle and pick
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ──────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────
async function main() {
  console.log(`\n🚀 Blog Engaja, time! — Agente de geração de conteúdo 4unik`);
  console.log(`   Locale: ${LOCALE} | Posts: ${COUNT} | Dry-run: ${DRY_RUN} | Publicar: ${SHOULD_PUBLISH}\n`);

  const topics = pickTopics(COUNT);

  if (topics.length === 0) {
    console.error("❌ Nenhum tópico encontrado para os filtros especificados.");
    process.exit(1);
  }

  const results = [];

  for (let i = 0; i < topics.length; i++) {
    const { topic, category } = topics[i];
    console.log(`📝 [${i + 1}/${topics.length}] Gerando: "${topic}" (${category})`);

    try {
      const post = await generatePost(topic, category, LOCALE);
      post._brief = topic;

      if (DRY_RUN) {
        console.log(`✅  Gerado (dry-run):\n`, JSON.stringify(post, null, 2));
        results.push({ topic, status: "dry-run", title: post.title });
      } else {
        const { slug, docId } = await upsertToSanity(post);
        const status = SHOULD_PUBLISH ? "publicado" : "rascunho";
        console.log(`✅  Salvo no Sanity: ${docId} (${status})`);
        results.push({ topic, status, title: post.title, slug, docId });
      }
    } catch (err) {
      console.error(`❌  Erro ao gerar "${topic}":`, err.message);
      results.push({ topic, status: "error", error: err.message });
    }

    // Small delay to respect rate limits
    if (i < topics.length - 1) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  console.log("\n📊 Resumo:");
  for (const r of results) {
    const icon = r.status === "error" ? "❌" : "✅";
    console.log(`${icon} [${r.status}] ${r.title || r.topic}`);
  }

  const errors = results.filter((r) => r.status === "error");
  if (errors.length > 0) {
    console.log(`\n⚠️  ${errors.length} post(s) com erro. Verifique os logs acima.`);
    process.exit(1);
  }

  if (!DRY_RUN) {
    console.log(`\n🎉 ${results.length} post(s) criados no Sanity como ${SHOULD_PUBLISH ? "publicados" : "rascunhos"}!`);
    console.log("   Acesse o Sanity Studio → Blog → Rascunhos IA para revisar antes de publicar.\n");
  }
}

main().catch((err) => {
  console.error("Erro fatal:", err);
  process.exit(1);
});
