/**
 * Garante que os caminhos internos em `BLOG_CTA_PATHS_BY_SLUG` têm `page.tsx` em `src/app/(pt)/…`.
 * Corre no CI (`npm run validate:blog-ctas`); não precisa de credenciais Sanity.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { BLOG_CTA_PATHS_BY_SLUG, type BlogFallbackSlug } from "@/lib/blogLandingLinks";

const PT_APP = join(process.cwd(), "src/app/(pt)");

function pageFileForInternalPath(internalPath: string): string {
  const p = internalPath.replace(/^\//, "");
  return join(PT_APP, p, "page.tsx");
}

const slugs = Object.keys(BLOG_CTA_PATHS_BY_SLUG) as BlogFallbackSlug[];
const paths = new Set<string>();
for (const slug of slugs) {
  const { platform, feature } = BLOG_CTA_PATHS_BY_SLUG[slug];
  paths.add(platform);
  paths.add(feature);
}

let errors = 0;
for (const internal of paths) {
  const file = pageFileForInternalPath(internal);
  if (!existsSync(file)) {
    console.error(`validate-blog-landing-ctas: missing route for blog CTA path "${internal}" (expected ${file})`);
    errors += 1;
  }
}

if (errors > 0) {
  process.exit(1);
}

console.log(`validate-blog-landing-ctas: OK (${paths.size} unique landing paths).`);
