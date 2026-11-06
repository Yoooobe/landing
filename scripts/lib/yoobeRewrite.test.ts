import assert from "node:assert/strict";
import { test } from "node:test";
import { rewriteBrand, rewriteDoc, rewriteHref } from "./yoobeRewrite";

test("rewriteBrand swaps the brand name keeping sentences readable", () => {
  assert.equal(rewriteBrand("Powered by 4Unik"), "Powered by Yoobe");
  assert.equal(rewriteBrand("4Unik by Yoobe"), "Yoobe");
  assert.equal(rewriteBrand("4UNIK"), "YOOBE");
  assert.equal(rewriteBrand("the 4unik platform"), "the Yoobe platform");
});

test("rewriteBrand rewrites 4unik URLs, emails, calendly and whatsapp", () => {
  assert.equal(
    rewriteBrand("https://plataforma.4unik.com.br/landing/en/plataforma/loja-resgate/"),
    "https://www.yoobe.co/platform/rewards-store/",
  );
  assert.equal(rewriteBrand("https://catalogo.4unik.com.br/product"), "https://catalogo.yoobe.co/product");
  assert.equal(rewriteBrand("fale com comercial@4unik.com.br"), "fale com vendas@yoobe.co");
  assert.equal(rewriteBrand("https://calendly.com/4unik/30min"), "https://calendly.com/yoobeco/demo");
  assert.equal(rewriteBrand("https://wa.me/551126844724"), "https://wa.me/5541987607512");
});

test("rewriteBrand turns slugs with 4unik into yoobe slugs", () => {
  assert.equal(rewriteBrand("4unik-at-events-points-qr-codes-fb2"), "yoobe-at-events-points-qr-codes-fb2");
});

test("rewriteHref maps legacy internal paths", () => {
  assert.equal(rewriteHref("/en/plataforma/"), "/platform/");
  assert.equal(rewriteHref("/landing/en/blog/x/"), "/blog/x/");
  assert.equal(rewriteHref("/en/#platform"), "/#platform");
  assert.equal(rewriteHref("#contato"), "#contato");
});

test("rewriteDoc rewrites nested strings but keeps system fields and asset refs", () => {
  const doc = {
    _id: "home-4unik",
    _type: "contentMirror",
    image: { asset: { _ref: "image-abc-4unik-800x600-png" }, alt: "Mockup da 4Unik" },
    cta: { href: "/en/plataforma/loja-resgate/", label: "See 4Unik" },
    body: [{ _key: "k1", children: [{ _key: "c1", text: "Visit https://plataforma.4unik.com.br/landing/en/pricing/" }] }],
  };
  const out = rewriteDoc(doc) as typeof doc;
  assert.equal(out._id, "home-4unik");
  assert.equal(out.image.asset._ref, "image-abc-4unik-800x600-png");
  assert.equal(out.image.alt, "Mockup da Yoobe");
  assert.equal(out.cta.href, "/platform/rewards-store/");
  assert.equal(out.cta.label, "See Yoobe");
  assert.equal(out.body[0].children[0].text, "Visit https://www.yoobe.co/pricing/");
});
