/**
 * `BASE_PATH` vem de `NEXT_PUBLIC_SITE_URL` — ver [`publicSite.ts`](./publicSite.ts).
 * Mantém-se este módulo para imports existentes (`withBasePath`, `next.config`).
 */
import { BASE_PATH } from "./publicSite";

export { BASE_PATH };

/**
 * Prefixa caminhos para que assets e links públicos funcionem tanto no dev local
 * quanto na produção com o mesmo `basePath`.
 */
export function withBasePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!BASE_PATH) {
    return normalized;
  }
  return `${BASE_PATH}${normalized}`;
}
