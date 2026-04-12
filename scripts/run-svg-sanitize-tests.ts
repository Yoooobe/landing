/**
 * Testes mínimos de sanitização SVG (scripts maliciosos / event handlers).
 * Corre: npm run test:svg
 */
import assert from "node:assert/strict";
import { sanitizeSvgMarkup } from "../src/lib/sanitize-svg";

function run() {
  assert.equal(sanitizeSvgMarkup(""), "");

  const withScript = sanitizeSvgMarkup(
    '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script><circle r="1"/></svg>',
  );
  assert.ok(!withScript.includes("<script"), "remove script");
  assert.ok(withScript.includes("circle") || withScript.includes("svg"), "mantém estrutura útil");

  const onload = sanitizeSvgMarkup(
    '<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"><rect width="10" height="10"/></svg>',
  );
  assert.ok(!onload.toLowerCase().includes("onload"));

  const xlink = sanitizeSvgMarkup(
    '<svg xmlns="http://www.w3.org/2000/svg"><a xlink:href="javascript:alert(1)"><text>x</text></a></svg>',
  );
  assert.ok(!xlink.includes("javascript:"), "sem javascript: em href");

  const benign = sanitizeSvgMarkup(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2v20" stroke="currentColor" fill="none"/></svg>',
  );
  assert.ok(benign.length > 20, "SVG benigno preservado");

  // eslint-disable-next-line no-console -- script output
  console.log("OK test:svg (sanitizeSvgMarkup)");
}

run();
