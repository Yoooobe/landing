import { PRIMARY_CONTACT_SECTION_ID } from "@/lib/contactAnchor";
import { internalPathFromPathname } from "@/lib/locale";

export type LocalizedPathFn = (p: string) => string;

function isBlogInternal(internal: string): boolean {
  return internal === "/blog" || internal.startsWith("/blog/");
}

function isPlataformaStubInternal(internal: string): boolean {
  return internal.startsWith("/plataforma/") && internal !== "/plataforma";
}

function isWorkvivoLegacyInternal(internal: string): boolean {
  return internal === "/workvivo";
}

/**
 * Href (path localizado + hash) para o formulário principal de contacto.
 * Usa o mesmo path lógico que `useLocaleMessages().path` (sem basePath no fragmento).
 */
export function resolvePrimaryContactHref(
  pathname: string | null | undefined,
  path: LocalizedPathFn,
): string {
  const hash = `#${PRIMARY_CONTACT_SECTION_ID}`;
  if (!pathname || pathname.includes("/studio")) {
    return `${path("/")}${hash}`;
  }

  const internal = internalPathFromPathname(pathname);

  if (isBlogInternal(internal)) {
    return `${path("/")}${hash}`;
  }
  if (isPlataformaStubInternal(internal)) {
    return `${path("/plataforma")}${hash}`;
  }
  if (isWorkvivoLegacyInternal(internal)) {
    return `${path("/api-integracoes/workvivo")}${hash}`;
  }

  return `${path(internal)}${hash}`;
}

/** True quando o destino do formulário é a página atual (scroll in-page em vez de navegar). */
export function shouldScrollPrimaryContactInPlace(
  pathname: string | null | undefined,
  path: LocalizedPathFn,
): boolean {
  if (!pathname || pathname.includes("/studio")) return false;
  const internal = internalPathFromPathname(pathname);
  if (isBlogInternal(internal) || isPlataformaStubInternal(internal) || isWorkvivoLegacyInternal(internal)) {
    return false;
  }
  const target = resolvePrimaryContactHref(pathname, path);
  const here = `${path(internal)}#${PRIMARY_CONTACT_SECTION_ID}`;
  return target === here;
}

export function scrollToPrimaryContact(): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById(PRIMARY_CONTACT_SECTION_ID);
  if (!el) return;
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  const focusable = el.querySelector<HTMLElement>(
    'input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled]), button:not([disabled])',
  );
  window.setTimeout(() => focusable?.focus(), reduceMotion ? 0 : 400);
}
