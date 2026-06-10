import type { Locale } from "@/lib/locale";
import { ptParaPlataformasPage } from "@/messages/segments/pt-para-plataformas-page";
import { enParaPlataformasPage } from "@/messages/segments/en-para-plataformas-page";
import { ptEducacaoPage } from "@/messages/segments/pt-educacao-page";
import { enEducacaoPage } from "@/messages/segments/en-educacao-page";
import { ptVendasPage } from "@/messages/segments/pt-vendas-page";
import { enVendasPage } from "@/messages/segments/en-vendas-page";
import { ptComunidadesPage } from "@/messages/segments/pt-comunidades-page";
import { enComunidadesPage } from "@/messages/segments/en-comunidades-page";
import { ptEventosPage } from "@/messages/segments/pt-eventos-page";
import { enEventosPage } from "@/messages/segments/en-eventos-page";

export type IcpVerticalItem = {
  readonly title: string;
  readonly desc: string;
  readonly icon?: string;
  readonly eyebrow?: string;
};

export type IcpVerticalPage = {
  readonly seo: {
    readonly title: string;
    readonly description: string;
    readonly openGraphDescription?: string;
  };
  readonly hero: {
    readonly badge: string;
    readonly title: string;
    /** Visible definitional lead for AEO (below title, above subtitle). */
    readonly definitionLead?: string;
    readonly sub: string;
    readonly ctaLabel: string;
    readonly ctaHref: string;
  };
  readonly problem: { readonly badge: string; readonly title: string; readonly items: readonly IcpVerticalItem[] };
  readonly how: {
    readonly badge: string;
    readonly title: string;
    readonly sub?: string;
    readonly columns?: "2" | "3" | "4";
    readonly items: readonly IcpVerticalItem[];
  };
  readonly benefits: { readonly badge: string; readonly title: string; readonly items: readonly IcpVerticalItem[] };
  readonly caseStudy?: {
    readonly badge: string;
    readonly company: string;
    readonly title: string;
    readonly body: string;
    readonly logoSrc: string;
    readonly logoAlt: string;
    readonly metrics: readonly { readonly value: string; readonly label: string }[];
    readonly screenshots: readonly { readonly src: string; readonly alt: string; readonly caption: string }[];
  };
  readonly faq: { readonly items: readonly { readonly q: string; readonly a: string }[] };
  readonly cta: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly primaryLabel: string;
    readonly primaryHref: string;
    readonly secondaryLabel?: string;
    readonly secondaryHref?: string;
  };
};

export type IcpProfileSlug =
  | "para-plataformas"
  | "educacao"
  | "vendas"
  | "comunidades"
  | "eventos";

type IcpVerticalEntry = {
  readonly pt: IcpVerticalPage;
  readonly en: IcpVerticalPage;
  readonly titlePt: string;
  readonly titleEn: string;
};

/** Slug -> copy segment (PT/EN) for the ICP vertical pages. */
export const ICP_VERTICAL_PAGES: Record<IcpProfileSlug, IcpVerticalEntry> = {
  "para-plataformas": {
    pt: ptParaPlataformasPage,
    en: enParaPlataformasPage,
    titlePt: "Para plataformas e SaaS",
    titleEn: "For platforms & SaaS",
  },
  educacao: {
    pt: ptEducacaoPage,
    en: enEducacaoPage,
    titlePt: "Para educação e e-learning",
    titleEn: "For education & e-learning",
  },
  vendas: {
    pt: ptVendasPage,
    en: enVendasPage,
    titlePt: "Para times de vendas",
    titleEn: "For sales teams",
  },
  comunidades: {
    pt: ptComunidadesPage,
    en: enComunidadesPage,
    titlePt: "Para criadores e comunidades",
    titleEn: "For creators & communities",
  },
  eventos: {
    pt: ptEventosPage,
    en: enEventosPage,
    titlePt: "Para eventos",
    titleEn: "For events",
  },
};

export function isIcpProfileSlug(slug: string): slug is IcpProfileSlug {
  return slug in ICP_VERTICAL_PAGES;
}

export function getIcpVerticalEntry(slug: string): IcpVerticalEntry | null {
  return isIcpProfileSlug(slug) ? ICP_VERTICAL_PAGES[slug] : null;
}

export function getIcpVerticalPage(locale: Locale, slug: string): IcpVerticalPage | null {
  const entry = getIcpVerticalEntry(slug);
  if (!entry) return null;
  return locale === "en" ? entry.en : entry.pt;
}
