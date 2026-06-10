import type { BlogAuthorProfile } from "@/sanity/lib/types";

/** Editorial author registry — EEAT bios for blog bylines and JSON-LD Person. */
export const BLOG_AUTHORS: Record<string, BlogAuthorProfile> = {
  "time-4unik": {
    name: "Time Editorial 4unik",
    role: "Especialistas em reward infrastructure e engajamento",
    bio:
      "Equipe editorial da 4unik que traduz práticas de gamificação, reconhecimento e recompensas em guias aplicáveis para RH, plataformas e operações. Conteúdo revisado com foco em integrações API-first e métricas auditáveis.",
    profileUrl: "https://plataforma.4unik.com.br/landing/",
  },
  "4unik-team": {
    name: "4unik Editorial Team",
    role: "Reward infrastructure & engagement specialists",
    bio:
      "4unik editorial team publishing practical guides on gamification, recognition, and programmable rewards for HR, platforms, and operations. Content is reviewed for API-first integration patterns and measurable outcomes.",
    profileUrl: "https://plataforma.4unik.com.br/landing/en/",
  },
  "rh-growth": {
    name: "Ana Luísa Mendes",
    role: "Estrategista de People & Growth, 4unik",
    bio:
      "Mais de 8 anos em programas de reconhecimento e cultura em empresas de tecnologia. Na 4unik, foca em playbooks de engajamento, OKRs comportamentais e métricas de retenção ligadas a reward infrastructure.",
    profileUrl: "https://plataforma.4unik.com.br/landing/",
  },
  "events-ops": {
    name: "Bruno Ferreira",
    role: "Lead de Experiências & Eventos, 4unik",
    bio:
      "Projeta jornadas ao vivo com QR, pontuação e resgate na loja corporativa. Especialista em operação de convenções, feiras internas e campanhas sazonais com logística integrada.",
    profileUrl: "https://plataforma.4unik.com.br/landing/",
  },
};

const AUTHOR_ALIASES: Record<string, string> = {
  "time 4unik": "time-4unik",
  "4unik team": "4unik-team",
};

/** Maps fallback blog slug → author registry key (PT). */
export const BLOG_AUTHOR_BY_SLUG_PT: Record<string, string> = {
  "1": "rh-growth",
  "2": "events-ops",
  "3": "time-4unik",
  "4": "rh-growth",
  "5": "events-ops",
  "6": "time-4unik",
  "7": "rh-growth",
  "8": "time-4unik",
};

/** Maps fallback blog slug → author registry key (EN). */
export const BLOG_AUTHOR_BY_SLUG_EN: Record<string, string> = {
  "1": "4unik-team",
  "2": "4unik-team",
  "3": "4unik-team",
  "4": "4unik-team",
  "5": "4unik-team",
  "6": "4unik-team",
  "7": "4unik-team",
  "8": "4unik-team",
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
