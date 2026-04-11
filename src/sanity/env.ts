/** API version for Sanity GROQ (see https://www.sanity.io/docs/api-versioning) */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-17";

const PLACEHOLDER_PROJECT_IDS = new Set([
  "",
  "your-project-id",
  "placeholder",
  "xxx",
  "changeme",
]);

function normalizeProjectId(raw: string | undefined): string {
  const v = raw?.trim() ?? "";
  if (!v || PLACEHOLDER_PROJECT_IDS.has(v.toLowerCase())) {
    return "";
  }
  return v;
}

/** Project ID real; vazio se não definido ou se ainda for valor de exemplo (`.env.example`). */
export const projectId = normalizeProjectId(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
);

/** Dataset (trimmed). */
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ?? "";

export function isSanityConfigured(): boolean {
  return Boolean(projectId && dataset);
}
