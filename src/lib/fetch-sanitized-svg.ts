import { sanitizeSvgMarkup } from "@/lib/sanitize-svg";

export async function fetchSanitizedSvgMarkup(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { Accept: "image/svg+xml,text/plain,*/*" },
    });
    if (!res.ok) return null;
    const text = await res.text();
    const clean = sanitizeSvgMarkup(text);
    return clean.length > 0 ? clean : null;
  } catch {
    return null;
  }
}
