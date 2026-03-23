/**
 * GitHub Pages project URL: https://yoooobe.github.io/landing/
 * Must stay in sync with `basePath` in `next.config.ts`.
 */
export const BASE_PATH = "/landing" as const;

export function withBasePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
