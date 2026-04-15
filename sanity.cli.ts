import { defineCliConfig } from "sanity/cli";

/**
 * Necessário para `sanity cors` / `sanity login` saberem qual projeto Sanity usar.
 * Variáveis alinhadas com `src/sanity/env` e `.env.local`.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  },
});
