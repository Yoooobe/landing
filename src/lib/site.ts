import { BASE_PATH } from "./basePath";
import { SITE_URL } from "./publicSite";

export { SITE_ORIGIN, SITE_URL } from "./publicSite";

const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;
const FILE_PATH_PATTERN = /\/[^/?#]+\.[^/?#]+$/;

export const SITE_NAME = "4Unik" as const;

/**
 * URL absoluta de uma rota do site (inclui `BASE_PATH`, ex.: `/casos-de-uso/`).
 */
export function normalizeSitePath(path: string): string {
  if (!path || path === "/") {
    return "/";
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (FILE_PATH_PATTERN.test(normalized)) {
    return normalized;
  }
  return normalized.endsWith("/") ? normalized : `${normalized}/`;
}

export function pageAbsoluteUrl(path: string): string {
  if (ABSOLUTE_URL_PATTERN.test(path)) {
    return path;
  }

  const normalized = normalizeSitePath(path);
  const base = `${SITE_URL}/`;
  /** Paths like `/blog/x/` must resolve under `SITE_URL` (incl. basePath), not site origin root. */
  const relative = normalized === "/" ? "" : normalized.startsWith("/") ? normalized.slice(1) : normalized;
  return new URL(relative, base).href;
}

/**
 * Base para metadata Next.js (OG, ícones, canonical relativos).
 *
 * Em desenvolvimento usa o host local (com `BASE_PATH`) para que `icons`, OG e
 * URLs derivadas não apontem só para produção — caso contrário o browser pede
 * favicon em `yoooobe.github.io` enquanto a app corre em `localhost`.
 */
export function siteMetadataBase(): URL {
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}${BASE_PATH}/`);
  }
  if (process.env.NODE_ENV !== "production") {
    const port = process.env.PORT ?? "3000";
    return new URL(`http://127.0.0.1:${port}${BASE_PATH}/`);
  }
  return new URL(`${SITE_URL}/`);
}

/**
 * IDs de analytics/ads a partir de variáveis de ambiente.
 * Sempre têm prioridade sobre o documento `siteSettings` em runtime.
 */
function readEnvValue(
  key: string,
  placeholder: string | undefined,
  pattern: RegExp,
): string | undefined {
  const raw = process.env[key]?.trim();
  if (!raw || raw === placeholder || !pattern.test(raw)) {
    return undefined;
  }
  return raw;
}

export function getGoogleAnalyticsIdFromEnv(): string | undefined {
  return readEnvValue("NEXT_PUBLIC_GA_ID", "G-XXXXXXXXXX", /^G-[A-Z0-9]+$/i);
}

export function getGoogleTagManagerIdFromEnv(): string | undefined {
  return readEnvValue("NEXT_PUBLIC_GTM_ID", undefined, /^GTM-[A-Z0-9]+$/i);
}

export function getMetaPixelIdFromEnv(): string | undefined {
  return readEnvValue("NEXT_PUBLIC_META_PIXEL_ID", undefined, /^\d+$/);
}

export function getLinkedinPartnerIdFromEnv(): string | undefined {
  return readEnvValue("NEXT_PUBLIC_LINKEDIN_PARTNER_ID", undefined, /^[a-zA-Z0-9_-]+$/);
}
