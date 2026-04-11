import type { Locale } from "@/lib/locale";
import { localizedPath } from "@/lib/locale";

export function isExternalShellHref(href: string | undefined | null): boolean {
  if (!href) return false;
  return /^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function resolveShellHref(
  href: string | undefined | null,
  locale: Locale,
): string {
  if (!href) {
    return localizedPath("/", locale);
  }

  if (isExternalShellHref(href) || href.startsWith("#")) {
    return href;
  }

  if (href.startsWith("/")) {
    return localizedPath(href, locale);
  }

  return href;
}
