/** Official 4Unik WhatsApp contact, digits only as required by click-to-chat. */
export const DEFAULT_WHATSAPP_NUMBER = "551126844724";
export const DEFAULT_WHATSAPP_URL = `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}`;

export function isWhatsappUrl(value?: string | null): boolean {
  const raw = value?.trim();
  if (!raw) return false;

  try {
    const host = new URL(raw).hostname.toLowerCase();
    return host === "wa.me" || host.endsWith(".wa.me") || host === "whatsapp.com" || host.endsWith(".whatsapp.com");
  } catch {
    return false;
  }
}

/**
 * Forces WhatsApp URLs coming from Sanity to the official contact while
 * preserving prefilled message/query parameters.
 */
export function resolveWhatsappUrl(value?: string | null): string {
  const raw = value?.trim();
  if (!raw) return DEFAULT_WHATSAPP_URL;

  try {
    const url = new URL(raw);
    const host = url.hostname.toLowerCase();

    if (host === "wa.me" || host.endsWith(".wa.me")) {
      url.pathname = `/${DEFAULT_WHATSAPP_NUMBER}`;
      return url.toString();
    }

    if (host === "whatsapp.com" || host.endsWith(".whatsapp.com")) {
      url.searchParams.set("phone", DEFAULT_WHATSAPP_NUMBER);
      return url.toString();
    }
  } catch {
    return DEFAULT_WHATSAPP_URL;
  }

  return DEFAULT_WHATSAPP_URL;
}

/** Rewrites WhatsApp links and leaves every other destination untouched. */
export function normalizeWhatsappHref(value: string): string {
  return isWhatsappUrl(value) ? resolveWhatsappUrl(value) : value;
}
