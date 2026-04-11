import { createClient, type SanityClient } from "@sanity/client";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

/** Cliente só quando `NEXT_PUBLIC_SANITY_*` estão definidos; caso contrário `null`. */
export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured()) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
  });
}
