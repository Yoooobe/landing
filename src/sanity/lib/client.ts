import { createClient, type SanityClient } from "@sanity/client";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

/** Cliente só quando `NEXT_PUBLIC_SANITY_*` estão definidos; caso contrário `null`. */
export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured()) return null;
  const token =
    process.env.SANITY_API_WRITE_TOKEN?.trim() ||
    process.env.SANITY_API_TOKEN?.trim() ||
    process.env.SANITY_READ_TOKEN?.trim();
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    ...(token ? { token } : {}),
  });
}

