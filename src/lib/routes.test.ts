import assert from "node:assert/strict";
import { test } from "node:test";
import { localeFromPathname, localizedPath } from "./locale";
import { LEGACY_4UNIK_EN_TO_YOOBE, ROUTES, toYoobePath } from "./routes";

test("ROUTES uses english slugs at the root", () => {
  assert.equal(ROUTES.rewardsStore, "/platform/rewards-store/");
  assert.equal(ROUTES.home, "/");
  for (const value of Object.values(ROUTES)) {
    assert.ok(value.startsWith("/") && value.endsWith("/"), value);
    assert.ok(!value.includes("/en/"), value);
  }
});

test("legacy 4unik EN map covers the 26 routes", () => {
  assert.equal(Object.keys(LEGACY_4UNIK_EN_TO_YOOBE).length, 26);
  assert.equal(LEGACY_4UNIK_EN_TO_YOOBE["/en/plataforma/loja-resgate/"], "/platform/rewards-store/");
  assert.equal(LEGACY_4UNIK_EN_TO_YOOBE["/en/reward-infrastructure/"], "/reward-infrastructure/");
  assert.equal(LEGACY_4UNIK_EN_TO_YOOBE["/en/"], "/");
});

test("toYoobePath maps PT internal and /en paths, keeping hash, query and blog slugs", () => {
  assert.equal(toYoobePath("/plataforma/loja-resgate/"), "/platform/rewards-store/");
  assert.equal(toYoobePath("/plataforma/loja-resgate"), "/platform/rewards-store/");
  assert.equal(toYoobePath("/en/plataforma/loja-resgate/"), "/platform/rewards-store/");
  assert.equal(toYoobePath("/infraestrutura-de-recompensas/"), "/reward-infrastructure/");
  assert.equal(toYoobePath("/api-integracoes/#faq"), "/integrations/#faq");
  assert.equal(toYoobePath("/en/blog/some-post/"), "/blog/some-post/");
  assert.equal(toYoobePath("/blog/?cat=rh"), "/blog/?cat=rh");
  assert.equal(toYoobePath("/en/"), "/");
  assert.equal(toYoobePath("/en"), "/");
  assert.equal(toYoobePath("/landing/en/plataforma/loja-resgate"), "/platform/rewards-store/");
  assert.equal(toYoobePath("/landing/plataforma"), "/platform/");
  assert.equal(toYoobePath("/landing/"), "/");
  assert.equal(toYoobePath("/landing/blog/x/"), "/blog/x/");
  assert.equal(toYoobePath("#contato"), "#contato");
  assert.equal(toYoobePath("https://catalogo.yoobe.co/"), "https://catalogo.yoobe.co/");
  assert.equal(toYoobePath("/brand/yoobe-mark.webp"), "/brand/yoobe-mark.webp");
});

test("locale helpers default to english without /en prefix", () => {
  assert.equal(localeFromPathname("/platform/"), "en");
  assert.equal(localeFromPathname("/"), "en");
  assert.equal(localizedPath("/pricing/", "en"), "/pricing/");
  assert.equal(localizedPath("/plataforma/painel-gestor/", "en"), "/platform/manager-dashboard/");
  assert.equal(localizedPath("/", "en"), "/");
});
