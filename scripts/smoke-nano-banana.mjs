#!/usr/bin/env node
/**
 * Smoke test: Nano Banana API (mesmo contrato que o Sanity Studio em produção).
 * Simula o browser no GitHub Pages: POST JSON + Origin: https://yoooobe.github.io
 *
 * Uso:
 *   npm run smoke:nano-banana
 *   SANITY_STUDIO_NANO_BANANA_URL=https://…/api/generate npm run smoke:nano-banana
 */

const endpoint =
  process.env.SANITY_STUDIO_NANO_BANANA_URL?.trim() ||
  "https://nano-banana-api-pi.vercel.app/api/generate";

const origin = "https://yoooobe.github.io";

const body = JSON.stringify({
  prompt: "Smoke test: minimal flat blue square icon on dark background",
});

const res = await fetch(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Origin: origin,
  },
  body,
});

const text = await res.text();
let data;
try {
  data = JSON.parse(text);
} catch {
  console.error("FAIL: resposta não é JSON");
  console.error("HTTP", res.status, text.slice(0, 500));
  process.exit(1);
}

const ok =
  res.ok &&
  typeof data.imageBase64 === "string" &&
  data.imageBase64.length > 100 &&
  typeof data.mimeType === "string" &&
  data.mimeType.startsWith("image/");

if (!ok) {
  console.error("FAIL: esperado 200 + { imageBase64, mimeType }");
  console.error("HTTP", res.status, data);
  process.exit(1);
}

console.log("OK smoke Nano Banana");
console.log("  endpoint:", endpoint);
console.log("  Origin:", origin);
console.log("  HTTP:", res.status);
console.log("  mimeType:", data.mimeType);
console.log("  imageBase64 length:", data.imageBase64.length);
