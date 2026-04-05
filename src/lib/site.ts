import { BASE_PATH } from "./basePath";

/**
 * Origem pública do GitHub Pages (sem path do repositório).
 * Deve coincidir com a org/user do Pages.
 */
export const SITE_ORIGIN = "https://yoooobe.github.io" as const;

/**
 * URL base do site em produção (inclui `BASE_PATH` do repositório).
 * Manter alinhado com `BASE_PATH` em basePath.ts e com o deploy em scripts/deploy-gh-pages.sh.
 */
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}` as const;

/**
 * Base para metadata Next.js (OG, canonical relativos).
 */
export const siteMetadataBase = () => new URL(`${SITE_URL}/`);

/** GA4 Measurement ID; só retorna quando configurado (evita enviar hits com placeholder). */
export function getGoogleAnalyticsMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_ID?.trim();
  if (!id || id === "G-XXXXXXXXXX" || !/^G-[A-Z0-9]+$/i.test(id)) {
    return undefined;
  }
  return id;
}
