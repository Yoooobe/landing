import { parsePublicSiteUrl } from "./parsePublicSiteUrl";

/**
 * URL canónica pública derivada de `NEXT_PUBLIC_SITE_URL` (build time).
 * Fallback: `config/public-site.json` — ver `docs/site-url-migration.md`.
 */

const parsed = parsePublicSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

/** Origem HTTPS (ex.: `https://www.exemplo.com`), sem path. */
export const SITE_ORIGIN = parsed.siteOrigin;

/**
 * Path base do Next (`basePath` / `assetPrefix`). `""` se o site servir na raiz do host.
 */
export const BASE_PATH = parsed.basePath;

/** URL base sem barra final (ex.: `https://host/landing` ou `https://host`). */
export const SITE_URL = parsed.siteUrl;
