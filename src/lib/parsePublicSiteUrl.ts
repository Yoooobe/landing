import publicSiteDefaults from "../../config/public-site.json";

export type ParsedPublicSite = {
  siteOrigin: string;
  basePath: string;
  /** URL base sem barra final (ex.: `https://host/landing` ou `https://host`). */
  siteUrl: string;
};

type PublicSiteJson = {
  defaultSiteUrl: string;
};

const defaults = publicSiteDefaults as PublicSiteJson;

/**
 * Deriva origem, `basePath` e URL base a partir de `NEXT_PUBLIC_SITE_URL` (ou equivalente em build).
 * Usado por `publicSite.ts`, `next.config` (via `basePath`), `robots.ts`, `sitemap.ts`, metadados e `generate:llms`.
 */
export function parsePublicSiteUrl(nextPublicSiteUrl?: string): ParsedPublicSite {
  const raw = (nextPublicSiteUrl ?? "").trim() || defaults.defaultSiteUrl;
  const href = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  const u = new URL(href);
  const siteOrigin = u.origin;
  let pathname = u.pathname || "/";
  if (pathname !== "/" && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }
  const basePath = pathname === "/" ? "" : pathname;
  const siteUrl = `${siteOrigin}${basePath}`;
  return { siteOrigin, basePath, siteUrl };
}
