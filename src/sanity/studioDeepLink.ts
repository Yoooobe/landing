/** Chave partilhada com `scripts/patch-studio-spa-fallback.mjs` (out/404.html no GitHub Pages). */
export const SANITY_STUDIO_RESTORE_PATH_KEY = "sanity-studio-restore-path";

const MARKETING_PAGE_DOCUMENT_ID_RE = /^marketingPage\.(pt|en)\.[^/;]+$/;

/** Path do App Router (sem `basePath`) a partir do pathname do browser. */
export function studioPathnameToAppRouter(pathname: string, basePath: string): string {
  if (!basePath) {
    return pathname.startsWith("/") ? pathname : `/${pathname}`;
  }
  if (pathname === basePath || pathname === `${basePath}/`) {
    return "/";
  }
  if (pathname.startsWith(`${basePath}/`)) {
    const rest = pathname.slice(basePath.length);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname;
}

/**
 * Normaliza URLs da structure com painel `marketingPage-pt` / `marketingPage-en`
 * para `marketingPage;{documentId}`.
 */
export function getCanonicalMarketingPageStudioPath(
  pathname: string | null,
  search: string,
): string | null {
  if (!pathname) {
    return null;
  }

  const structurePrefix = "/studio/structure/";
  const prefixIndex = pathname.indexOf(structurePrefix);

  if (prefixIndex === -1) {
    return null;
  }

  const panePath = pathname.slice(prefixIndex + structurePrefix.length);
  const segments = panePath.split(";").filter(Boolean);
  const documentId = segments.at(-1);

  if (!documentId || !MARKETING_PAGE_DOCUMENT_ID_RE.test(documentId)) {
    return null;
  }

  const canonicalPanePath = `marketingPage;${documentId}`;

  if (panePath === canonicalPanePath) {
    return null;
  }

  const base = pathname.slice(0, prefixIndex + structurePrefix.length);
  return `${base}${canonicalPanePath}${search}`;
}

export function resolveStudioRestoreTarget(
  storedPath: string,
  basePath: string,
): string {
  let pathname: string;
  let search = "";

  try {
    const url = new URL(storedPath, "http://localhost");
    pathname = url.pathname;
    search = url.search;
  } catch {
    const q = storedPath.indexOf("?");
    if (q >= 0) {
      pathname = storedPath.slice(0, q);
      search = storedPath.slice(q);
    } else {
      pathname = storedPath;
    }
  }

  const appPath = studioPathnameToAppRouter(pathname, basePath);
  return getCanonicalMarketingPageStudioPath(appPath, search) ?? `${appPath}${search}`;
}
