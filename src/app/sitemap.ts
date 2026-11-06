import type { MetadataRoute } from "next";
import { GROWTH_INDEX_ROUTE_PAIRS, isGrowthPageIndexable } from "@/lib/growthPagePublish";
import { pageAbsoluteUrl } from "@/lib/site";
import { getBlogStaticSlugs } from "@/sanity/lib/blog";

export const dynamic = "force-static";

type RoutePair = {
  pt: string;
  en: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
};

/**
 * URLs canónicas indexáveis (pares PT/EN + hreflang).
 *
 * - Não listar `/gamificacao/` nem `/gamification/`: redireccionam no cliente para
 *   `/plataforma/motor-gamificacao/` (conteúdo unificado); a URL de motor é a canónica para SEO.
 * - Rotas stub, workvivo legacy ou `noindex` não entram aqui (ver `src/app/robots.ts`: só
 *   `disallow` explícito do Studio).
 */
const routePairs: RoutePair[] = [
  { pt: "/", en: "/", priority: 1, changeFrequency: "weekly" },
  { pt: "/api-integracoes/", en: "/integrations/", priority: 0.9, changeFrequency: "weekly" },
  {
    pt: "/api-integracoes/workvivo/",
    en: "/integrations/workvivo/",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  { pt: "/plataforma/", en: "/platform/", priority: 0.9, changeFrequency: "weekly" },
  { pt: "/inteligencia/", en: "/intelligence/", priority: 0.85, changeFrequency: "weekly" },
  {
    pt: "/infraestrutura-de-recompensas/",
    en: "/reward-infrastructure/",
    priority: 0.88,
    changeFrequency: "monthly",
  },
  { pt: "/casos-de-uso/", en: "/use-cases/", priority: 0.85, changeFrequency: "weekly" },
  { pt: "/para-plataformas/", en: "/for-platforms/", priority: 0.7, changeFrequency: "weekly" },
  { pt: "/educacao/", en: "/solutions/education/", priority: 0.7, changeFrequency: "weekly" },
  { pt: "/vendas/", en: "/solutions/sales/", priority: 0.7, changeFrequency: "weekly" },
  { pt: "/comunidades/", en: "/solutions/communities/", priority: 0.7, changeFrequency: "weekly" },
  { pt: "/eventos/", en: "/solutions/events/", priority: 0.7, changeFrequency: "weekly" },
  {
    pt: "/gamificacao-para-rh/",
    en: "/gamification-for-hr/",
    priority: 0.75,
    changeFrequency: "weekly",
  },
  {
    pt: "/calculadora-roi/",
    en: "/roi-calculator/",
    priority: 0.88,
    changeFrequency: "weekly",
  },

  { pt: "/blog/", en: "/blog/", priority: 0.8, changeFrequency: "weekly" },
  {
    pt: "/plataforma/motor-gamificacao/",
    en: "/platform/gamification-engine/",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    pt: "/plataforma/campanhas-gamificacao/",
    en: "/platform/campaigns/",
    priority: 0.85,
    changeFrequency: "weekly",
  },
  {
    pt: "/plataforma/controle-carteiras/",
    en: "/platform/wallets/",
    priority: 0.55,
    changeFrequency: "monthly",
  },
  {
    pt: "/plataforma/painel-gestor/",
    en: "/platform/manager-dashboard/",
    priority: 0.55,
    changeFrequency: "monthly",
  },
  {
    pt: "/plataforma/loja-resgate/",
    en: "/platform/rewards-store/",
    priority: 0.5,
    changeFrequency: "monthly",
  },
];

function allRoutePairs(): RoutePair[] {
  if (!isGrowthPageIndexable()) {
    return routePairs;
  }
  return [
    ...routePairs,
    ...GROWTH_INDEX_ROUTE_PAIRS.map((pair) => ({
      pt: pair.pt,
      en: pair.en,
      priority: pair.priority,
      changeFrequency: pair.changeFrequency,
    })),
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = allRoutePairs().map((pair) => {
    const url = pageAbsoluteUrl(pair.en);
    return {
      url,
      lastModified,
      changeFrequency: pair.changeFrequency,
      priority: pair.priority,
      alternates: { languages: { en: url, "x-default": url } },
    };
  });

  const enSlugs = await getBlogStaticSlugs("en");
  const blogEntries: MetadataRoute.Sitemap = enSlugs.map((slug) => ({
    url: pageAbsoluteUrl(`/blog/${slug}/`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticEntries, ...blogEntries];
}
