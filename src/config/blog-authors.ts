import type { BlogAuthorProfile } from "@/sanity/lib/types";

/** Editorial author registry — EEAT bios for blog bylines and JSON-LD Person. */
export const BLOG_AUTHORS: Record<string, BlogAuthorProfile> = {
  "time-Yoobe": {
    name: "Time Editorial Yoobe",
    role: "Especialistas em reward infrastructure e engajamento",
    bio:
      "Equipe editorial da Yoobe que traduz práticas de gamificação, reconhecimento e recompensas em guias aplicáveis para RH, plataformas e operações. Content revisado com foco em integrações API-first e métricas auditáveis.",
    profileUrl: "/",
  },
  "Yoobe-team": {
    name: "Yoobe Editorial Team",
    role: "Reward infrastructure & engagement specialists",
    bio:
      "Yoobe editorial team publishing practical guides on gamification, recognition, and programmable rewards for HR, platforms, and operations. Content is reviewed for API-first integration patterns and measurable outcomes.",
    profileUrl: "/",
  },
  "rh-growth": {
    name: "Ana Luísa Mendes",
    role: "Estrategista de People & Growth, Yoobe",
    bio:
      "Mais de 8 anos em programas de reconhecimento e cultura em empresas de tecnologia. Na Yoobe, foca em playbooks de engajamento, OKRs comportamentais e métricas de retenção ligadas a reward infrastructure.",
    profileUrl: "/",
  },
  "events-ops": {
    name: "Bruno Ferreira",
    role: "Lead de Experiências & Eventos, Yoobe",
    bio:
      "Projeta jornadas ao vivo com QR, pontuação e resgate na loja corporativa. Especialista em operação de convenções, feiras internas e campanhas sazonais com logística integrada.",
    profileUrl: "/",
  },
};

const AUTHOR_ALIASES: Record<string, string> = {
  "time Yoobe": "time-Yoobe",
  "Yoobe team": "Yoobe-team",
};

/** Maps fallback blog slug → author registry key (PT). */
export const BLOG_AUTHOR_BY_SLUG_PT: Record<string, string> = {
  "1": "rh-growth",
  "2": "events-ops",
  "3": "time-Yoobe",
  "4": "rh-growth",
  "5": "events-ops",
  "6": "time-Yoobe",
  "7": "rh-growth",
  "8": "time-Yoobe",
};

/** Maps fallback blog slug → author registry key (EN). */
export const BLOG_AUTHOR_BY_SLUG_EN: Record<string, string> = {
  "1": "Yoobe-team",
  "2": "Yoobe-team",
  "3": "Yoobe-team",
  "4": "Yoobe-team",
  "5": "Yoobe-team",
  "6": "Yoobe-team",
  "7": "Yoobe-team",
  "8": "Yoobe-team",
};

export function resolveBlogAuthorKey(
  authorLabel: string | undefined,
  slug: string,
  locale: "pt" | "en",
): string | undefined {
  if (authorLabel) {
    const normalized = authorLabel.trim().toLowerCase();
    if (AUTHOR_ALIASES[normalized]) return AUTHOR_ALIASES[normalized];
  }
  const bySlug = locale === "pt" ? BLOG_AUTHOR_BY_SLUG_PT : BLOG_AUTHOR_BY_SLUG_EN;
  return bySlug[slug];
}

export function getBlogAuthorProfile(key: string | undefined): BlogAuthorProfile | undefined {
  if (!key) return undefined;
  return BLOG_AUTHORS[key];
}
