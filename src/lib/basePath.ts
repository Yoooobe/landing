/**
 * Path do repositório no GitHub Pages. Deve coincidir com `basePath` em `next.config.ts`
 * e com `SITE_URL` em `src/lib/site.ts`.
 */
export const BASE_PATH = "/landing" as const;

export function withBasePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
