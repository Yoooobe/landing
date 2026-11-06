import assert from "node:assert/strict";
import { test } from "node:test";
import { buildYoobeBlogDocs, selectEnglishPosts, type BlogDoc } from "./blog-migrate-to-yoobe";

const post = (over: Partial<BlogDoc>): BlogDoc => ({
  _id: "x",
  _type: "blogPost",
  locale: "en",
  title: "T",
  slug: { _type: "slug", current: "t" },
  body: [],
  ...over,
});

test("selectEnglishPosts drops numeric slugs, excluded slugs, drafts and PT, and dedupes by title", () => {
  const docs = [
    post({ _id: "a", title: "How gamification works", slug: { _type: "slug", current: "1" } }),
    post({ _id: "b", title: "How gamification works", slug: { _type: "slug", current: "how-gamification-works" } }),
    post({ _id: "c", title: "OKRs", slug: { _type: "slug", current: "okrs-a" }, body: [{}] }),
    post({ _id: "d", title: "OKRs", slug: { _type: "slug", current: "okrs-b" }, body: [{}, {}, {}] }),
    post({ _id: "e", title: "Wrong content", slug: { _type: "slug", current: "recognition-360-peer-to-peer" } }),
    post({ _id: "drafts.f", title: "Draft", slug: { _type: "slug", current: "draft" } }),
    post({ _id: "g", locale: "pt", title: "PT", slug: { _type: "slug", current: "pt" } }),
  ];
  const out = selectEnglishPosts(docs, new Set(["recognition-360-peer-to-peer"]));
  assert.deepEqual(out.map((d) => d._id).sort(), ["b", "d"]);
});

test("buildYoobeBlogDocs rewrites brand, slug and legacy links, and keeps translated posts", () => {
  const existing = [
    post({
      _id: "en1",
      title: "4unik at events",
      slug: { _type: "slug", current: "4unik-at-events-fb2" },
      body: [{ _type: "block", markDefs: [{ _key: "l", _type: "link", href: "/landing/en/plataforma/loja-resgate" }], children: [{ text: "See 4Unik" }] }],
    }),
  ];
  const translated = [post({ _id: "pt9", locale: "en", title: "Yoobe vs Lobby", slug: { _type: "slug", current: "yoobe-vs-lobby" } })];
  const out = buildYoobeBlogDocs(existing, translated);
  assert.equal(out.length, 2);
  const a = out.find((d) => d.slug.current === "yoobe-at-events-fb2")!;
  assert.equal(a.title, "Yoobe at events");
  const block = a.body[0] as { markDefs: { href: string }[]; children: { text: string }[] };
  assert.equal(block.markDefs[0].href, "/platform/rewards-store/");
  assert.equal(block.children[0].text, "See Yoobe");
  const b = out.find((d) => d.slug.current === "yoobe-vs-lobby")!;
  assert.equal(b._id, "blogPost.yoobe.yoobe-vs-lobby");
  assert.equal(b.locale, "en");
  assert.ok(!JSON.stringify(out).match(/4\s*-?\s*unik/i));
});
