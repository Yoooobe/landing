import { BASE_PATH } from "@/lib/basePath";

export type Locale = "pt" | "en";

/**
 * Tag BCP 47 para `<html lang>`. Usar só no servidor (`LocaleRootLayout` / layouts de rota);
 * evita depender de correção pós-hidratação no cliente.
 */
export function htmlLangForLocale(locale: Locale): "pt-BR" | "en" {
  return locale === "en" ? "en" : "pt-BR";
}

/** Pathname do Next (inclui `basePath` quando configurado). */
export function localeFromPathname(pathname: string | null | undefined): Locale {
  if (!pathname) return "pt";
  let rest = pathname;
  if (rest.startsWith(BASE_PATH)) {
    rest = rest.slice(BASE_PATH.length) || "/";
  }
  rest = rest.replace(/\/$/, "") || "/";
  if (rest === "/en" || rest.startsWith("/en/")) return "en";
  return "pt";
}

/** Path interno da app (sem `basePath`, sem prefixo `/en`). */
export function internalPathFromPathname(pathname: string | null | undefined): string {
  if (!pathname) return "/";
  let rest = pathname;
  if (rest.startsWith(BASE_PATH)) {
    rest = rest.slice(BASE_PATH.length) || "/";
  }
  rest = rest.replace(/\/$/, "") || "/";
  if (rest === "/en") return "/";
  if (rest.startsWith("/en/")) {
    rest = rest.slice(3) || "/";
  }
  return rest.startsWith("/") ? rest : `/${rest}`;
}

/** Path interno da app (sem `assetPrefix`); Next `Link` aplica `basePath`. */
export function localizedPath(path: string, locale: Locale): string {
  const normalized = path === "" || path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  if (locale === "pt") return normalized === "/" ? "/" : normalized;
  if (normalized === "/") return "/en/";
  return `/en${normalized}`;
}

/** Alterna PT ↔ EN mantendo a mesma rota lógica. */
export function toggleLocalePath(pathname: string | null | undefined): string {
  const locale = localeFromPathname(pathname);
  const internal = internalPathFromPathname(pathname);
  return localizedPath(internal, locale === "pt" ? "en" : "pt");
}
