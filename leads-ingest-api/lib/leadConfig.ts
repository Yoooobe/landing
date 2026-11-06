/** Envs que, fora do dataset `production` (deploy 4unik), precisam vir explícitas — sem cair nos defaults 4unik. */
export const BRAND_ENV = [
  "LEADS_NOTIFY_EMAIL",
  "LEADS_FROM_EMAIL",
  "POSTMARK_TEMPLATE_ID",
  "LEADS_SITE_URL",
  "LEADS_DEMO_URL",
  "ALLOWED_ORIGINS",
] as const;

export function missingBrandEnv(env: Record<string, string | undefined>): string[] {
  const dataset = env.NEXT_PUBLIC_SANITY_DATASET?.trim();
  if (!dataset || dataset === "production") return [];
  return BRAND_ENV.filter((k) => !env[k]?.trim());
}
