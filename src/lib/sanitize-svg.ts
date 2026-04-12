import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitize untrusted SVG for inline HTML. Strips scripts, event handlers, and foreign content.
 */
export function sanitizeSvgMarkup(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";

  return DOMPurify.sanitize(trimmed, {
    USE_PROFILES: { svg: true, svgFilters: true },
    ADD_ATTR: ["viewBox", "preserveAspectRatio", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "cx", "cy", "r", "x", "y", "rx", "ry", "width", "height", "d", "points", "transform", "opacity", "fill-rule", "clip-path", "stop-color", "offset"],
  });
}
