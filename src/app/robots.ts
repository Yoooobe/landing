import type { MetadataRoute } from "next";
import { BASE_PATH } from "@/lib/basePath";
import { pageAbsoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/**
 * robots.txt estático no export. Permite crawlers (incl. usados em índices e assistentes).
 * O Studio Sanity permanece indexável por URL; pode reduzir-se orçamento de crawl com disallow se necessário.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [`${BASE_PATH}/studio/`],
      },
    ],
    sitemap: pageAbsoluteUrl("/sitemap.xml"),
  };
}
