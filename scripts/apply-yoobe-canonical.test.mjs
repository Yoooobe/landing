import assert from "node:assert/strict";
import { test } from "node:test";
import { applyCanonical } from "./apply-yoobe-canonical.mjs";

test("replaces only the canonical link", () => {
  const html = '<head><link rel="canonical" href="https://plataforma.4unik.com.br/landing/en/pricing/"/><link rel="alternate" hrefLang="en" href="x"/></head>';
  const out = applyCanonical(html, "https://www.yoobe.co/pricing/");
  assert.equal(out, '<head><link rel="canonical" href="https://www.yoobe.co/pricing/"/><link rel="alternate" hrefLang="en" href="x"/></head>');
});

test("inserts a canonical when the page has none", () => {
  const out = applyCanonical("<head><title>x</title></head>", "https://www.yoobe.co/");
  assert.equal(out, '<head><title>x</title><link rel="canonical" href="https://www.yoobe.co/"/></head>');
});
