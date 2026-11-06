import assert from "node:assert/strict";
import { test } from "node:test";
import { buildCanonicalMap } from "./build-canonical-map";

const p = (slug: string, title: string) => ({ slug, title });

test("maps every 4unik EN page route to an absolute yoobe.co URL", () => {
  const map = buildCanonicalMap([], []);
  assert.equal(map["/en/plataforma/loja-resgate/"], "https://www.yoobe.co/platform/rewards-store/");
  assert.equal(map["/en/"], "https://www.yoobe.co/");
  assert.equal(map["/en/blog/"], "https://www.yoobe.co/blog/");
  assert.equal(Object.keys(map).length, 25);
  for (const v of Object.values(map)) assert.ok(v.startsWith("https://www.yoobe.co/"));
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
  assert.equal(map["/en/blog/4unik-at-events-fb2/"], "https://www.yoobe.co/blog/yoobe-at-events-fb2/");
  assert.equal(map["/en/blog/2/"], "https://www.yoobe.co/blog/yoobe-at-events-fb2/");
  assert.equal(map["/en/blog/rewards-logistics-sla-d1/"], "https://www.yoobe.co/blog/yoobe-at-events-fb2/");
  assert.equal(map["/en/blog/orphan/"], "https://www.yoobe.co/blog/");
});
