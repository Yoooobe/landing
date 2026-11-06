import assert from "node:assert/strict";
import { test } from "node:test";
import { missingBrandEnv } from "../lib/leadConfig";

const yoobe = {
  NEXT_PUBLIC_SANITY_DATASET: "yoobe",
  LEADS_NOTIFY_EMAIL: "genau@yoobe.co",
  LEADS_FROM_EMAIL: "leads@yoobe.co",
  POSTMARK_TEMPLATE_ID: "123",
  LEADS_SITE_URL: "https://www.yoobe.co",
  LEADS_DEMO_URL: "https://calendly.com/yoobeco/demo",
  ALLOWED_ORIGINS: "https://www.yoobe.co",
};

test("a non-production dataset must set every brand env explicitly", () => {
  const { POSTMARK_TEMPLATE_ID, ...withoutTemplate } = yoobe;
  void POSTMARK_TEMPLATE_ID;
  assert.deepEqual(missingBrandEnv(withoutTemplate), ["POSTMARK_TEMPLATE_ID"]);
  assert.deepEqual(missingBrandEnv(yoobe), []);
});

test("the legacy 4unik deploy (production dataset or unset) keeps its defaults", () => {
  assert.deepEqual(missingBrandEnv({ NEXT_PUBLIC_SANITY_DATASET: "production" }), []);
  assert.deepEqual(missingBrandEnv({}), []);
});
