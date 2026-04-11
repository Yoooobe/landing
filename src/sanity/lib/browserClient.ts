import { createClient, type SanityClient } from "@sanity/client";

import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

/**
 * Cliente Sanity para o browser (leitura pública via CDN).
 * Retorna null se projeto/dataset não estiverem configurados no build.
 */
export function createBrowserSanityClient(): SanityClient | null {
  if (!isSanityConfigured()) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  });
}
