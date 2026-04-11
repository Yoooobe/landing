import type { MetadataRoute } from "next";
import { pageAbsoluteUrl } from "@/lib/site";
import { getBlogStaticSlugs, hasBlogPostWithSlug } from "@/sanity/lib/blog";

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
 * - Não listar `/gamificacao/` nem `/en/gamificacao/`: redireccionam no cliente para
 *   `/plataforma/motor-gamificacao/` (conteúdo unificado); a URL de motor é a canónica para SEO.
 * - Rotas stub, workvivo legacy ou `noindex` não entram aqui (ver `src/app/robots.ts`: só
 *   `disallow` explícito do Studio).
 */
const routePairs: RoutePair[] = [
  { pt: "/", en: "/en/", priority: 1, changeFrequency: "weekly" },
  { pt: "/api-integracoes/", en: "/en/api-integracoes/", priority: 0.9, changeFrequency: "weekly" },
  {
    pt: "/api-integracoes/workvivo/",
    en: "/en/api-integracoes/workvivo/",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  { pt: "/plataforma/", en: "/en/plataforma/", priority: 0.9, changeFrequency: "weekly" },
  { pt: "/inteligencia/", en: "/en/inteligencia/", priority: 0.85, changeFrequency: "weekly" },
  { pt: "/casos-de-uso/", en: "/en/casos-de-uso/", priority: 0.85, changeFrequency: "weekly" },
  { pt: "/blog/", en: "/en/blog/", priority: 0.8, changeFrequency: "weekly" },
  {
    pt: "/plataforma/motor-gamificacao/",
    en: "/en/plataforma/motor-gamificacao/",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    pt: "/plataforma/controle-carteiras/",
    en: "/en/plataforma/controle-carteiras/",
    priority: 0.55,
    changeFrequency: "monthly",
  },
  {
    pt: "/plataforma/painel-gestor/",
    en: "/en/plataforma/painel-gestor/",
    priority: 0.55,
    changeFrequency: "monthly",
  },
  {
    pt: "/plataforma/loja-resgate/",
    en: "/en/plataforma/loja-resgate/",
    priority: 0.5,
    changeFrequency: "monthly",
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = routePairs.flatMap((pair) => {
    const ptUrl = pageAbsoluteUrl(pair.pt);
    const enUrl = pageAbsoluteUrl(pair.en);
    const alternates = {
      languages: {
        "pt-BR": ptUrl,
        en: enUrl,
      },
    };

    return [
      {
        url: ptUrl,
        lastModified,
        changeFrequency: pair.changeFrequency,
        priority: pair.priority,
        alternates,
      },
      {
        url: enUrl,
        lastModified,
        changeFrequency: pair.changeFrequency,
        priority: Math.max(pair.priority - 0.05, 0.1),
        alternates,
      },
    ];
  });

  const [ptSlugs, enSlugs] = await Promise.all([
    getBlogStaticSlugs("pt"),
    getBlogStaticSlugs("en"),
  ]);

  const ptEntries = await Promise.all(
    ptSlugs.map(async (slug) => {
      const hasEnglishAlternate = await hasBlogPostWithSlug("en", slug);

      return {
        url: pageAbsoluteUrl(`/blog/${slug}/`),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: hasEnglishAlternate
          ? {
              languages: {
                "pt-BR": pageAbsoluteUrl(`/blog/${slug}/`),
                en: pageAbsoluteUrl(`/en/blog/${slug}/`),
              },
            }
          : undefined,
      };
    }),
  );

  const enEntries = await Promise.all(
    enSlugs.map(async (slug) => {
      const hasPortugueseAlternate = await hasBlogPostWithSlug("pt", slug);

      return {
        url: pageAbsoluteUrl(`/en/blog/${slug}/`),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.65,
        alternates: hasPortugueseAlternate
          ? {
              languages: {
                "pt-BR": pageAbsoluteUrl(`/blog/${slug}/`),
                en: pageAbsoluteUrl(`/en/blog/${slug}/`),
              },
            }
          : undefined,
      };
    }),
  );

  return [...staticEntries, ...ptEntries, ...enEntries];
}
