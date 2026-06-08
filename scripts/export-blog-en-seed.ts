/**
 * Emite o seed EN do blog como JSON (stdout) para scripts Node (.mjs).
 * Uso: npx tsx scripts/export-blog-en-seed.ts
 */
import { blogFallbackEnSeedForSync } from "../src/lib/blogFallback";

process.stdout.write(JSON.stringify(blogFallbackEnSeedForSync));
