import assert from "node:assert/strict";
import { test } from "node:test";
import { privateDocId } from "../lib/sanityIds";

test("privateDocId uses a dotted path so Sanity hides it from anonymous reads", () => {
  const id = privateDocId("leads");
  assert.match(id, /^leads\.[0-9a-f-]{36}$/);
  assert.notEqual(id, privateDocId("leads"));
});
