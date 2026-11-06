import assert from "node:assert/strict";
import { test } from "node:test";
import { buildCanonicalMap } from "./build-canonical-map";

const p = (slug: string, title: string) => ({ slug, title });

test("maps every 4unik EN page route to an absolute yoobe.co URL", () => {
  const map = buildCanonicalMap([], []);
  assert.equal(map["/en/plataforma/loja-resgate/"], "https://corporate.yoobe.co/platform/rewards-store/");
  assert.equal(map["/en/"], "https://corporate.yoobe.co/");
  assert.equal(map["/en/blog/"], "https://corporate.yoobe.co/blog/");
  assert.equal(Object.keys(map).length, 25);
  assert.equal(map["/en/gamificacao/"], "https://corporate.yoobe.co/platform/gamification-engine/");
  assert.equal(map["/en/plataforma/logistica-integrada/"], "https://corporate.yoobe.co/platform/");
  assert.equal(map["/en/workvivo/"], "https://corporate.yoobe.co/integrations/workvivo/");
  for (const v of Object.values(map)) assert.ok(v.startsWith("https://corporate.yoobe.co/"));
});

test("maps 4unik EN posts by title, so duplicated and mismatched slugs land on the right yoobe post", () => {
  const fourUnik = [
    p("4unik-at-events-fb2", "4unik at events: points"),
    p("2", "4unik at events: points"),
    p("rewards-logistics-sla-d1", "4unik at Events: Points"),
    p("orphan", "Something not migrated"),
  ];
  const yoobe = [p("yoobe-at-events-fb2", "Yoobe at events: points"), p("rewards-logistics-sla-d1", "Logistics SLA")];
  const map = buildCanonicalMap(fourUnik, yoobe);
  assert.equal(map["/en/blog/4unik-at-events-fb2/"], "https://corporate.yoobe.co/blog/yoobe-at-events-fb2/");
  assert.equal(map["/en/blog/2/"], "https://corporate.yoobe.co/blog/yoobe-at-events-fb2/");
  assert.equal(map["/en/blog/rewards-logistics-sla-d1/"], "https://corporate.yoobe.co/blog/yoobe-at-events-fb2/");
  assert.equal(map["/en/blog/orphan/"], "https://corporate.yoobe.co/blog/");
});

test("numeric 4unik slugs fall back to the yoobe post ending in -fbN", () => {
  const map = buildCanonicalMap([p("5", "Different wording")], [p("okrs-and-gamification-fb5", "OKRs and gamification")]);
  assert.equal(map["/en/blog/5/"], "https://corporate.yoobe.co/blog/okrs-and-gamification-fb5/");
});
