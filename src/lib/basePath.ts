/**
 * Path do repositório no GitHub Pages. Deve coincidir com `basePath` em `next.config.ts`
 * e com `SITE_URL` em `src/lib/site.ts`.
 */
export const BASE_PATH = "/landing" as const;

/**
 * Prefixa caminhos para que assets e links públicos funcionem tanto no dev local
 * quanto na produção com o mesmo `basePath`.
 */
export function withBasePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
