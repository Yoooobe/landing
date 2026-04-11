import {
  siteSettingsQuery,
  type SiteSettingsQueryResult,
} from "@/sanity/queries/siteSettings";
import { getSanityClient } from "./client";

/** Lê configurações globais no build (static export). Devolve `null` se Sanity não estiver configurado ou em erro de rede. */
export async function getSiteSettings(): Promise<SiteSettingsQueryResult> {
  const client = getSanityClient();
  if (!client) return null;
  try {
    const doc = await client.fetch<SiteSettingsQueryResult>(siteSettingsQuery);
    return doc ?? null;
  } catch {
    return null;
  }
}
