import { withBasePath } from "@/lib/basePath";

/**
 * URL absoluta para POST do lead. Em produção estática, define `NEXT_PUBLIC_LEADS_INGEST_URL`.
 * Em desenvolvimento, faz fallback para a Route Handler local.
 */
export function getLeadSubmitUrl(): string | null {
  const external = process.env.NEXT_PUBLIC_LEADS_INGEST_URL?.trim();
  if (external) {
    return external;
  }
  if (typeof window === "undefined") {
    return null;
  }
  if (process.env.NODE_ENV === "development") {
    return `${window.location.origin}${withBasePath("/api/leads")}`;
  }
  return null;
}
