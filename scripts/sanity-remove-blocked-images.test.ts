import assert from "node:assert/strict";
import { test } from "node:test";
import { stripAssetRefs } from "./sanity-remove-blocked-images";

test("removes image objects and array items that point to blocked assets", () => {
  const blocked = new Set(["image-bad"]);
  const doc = {
    _id: "d",
    hero: { _type: "image", asset: { _ref: "image-bad" } },
    keep: { _type: "image", asset: { _ref: "image-ok" } },
    gallery: [{ _key: "a", asset: { _ref: "image-bad" } }, { _key: "b", asset: { _ref: "image-ok" } }],
  };
  assert.deepEqual(stripAssetRefs(doc, blocked), {
    _id: "d",
    keep: { _type: "image", asset: { _ref: "image-ok" } },
    gallery: [{ _key: "b", asset: { _ref: "image-ok" } }],
  });
});
