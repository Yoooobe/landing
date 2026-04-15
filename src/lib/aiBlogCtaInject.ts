import type { BlogCtaBlock, BlogPostBodyItem, PortableTextBlock } from "@/sanity/lib/types";

function isPortableTextBlock(item: BlogPostBodyItem): item is PortableTextBlock {
  return item._type === "block";
}

function blockPlainText(block: PortableTextBlock): string {
  return (block.children ?? []).map((c) => ("text" in c ? String(c.text ?? "") : "")).join("");
}

function findHelpsH2Index(blocks: BlogPostBodyItem[], locale: "pt" | "en"): number {
  const needle = locale === "en" ? "How 4unik helps" : "Como a 4unik ajuda";
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (!isPortableTextBlock(b) || b.style !== "h2") continue;
    if (blockPlainText(b).includes(needle)) return i;
  }
  return -1;
}

/** Primeiro índice depois do último bullet contíguo a partir de `start`. */
function indexAfterBulletRun(blocks: BlogPostBodyItem[], start: number): number {
  let i = start;
  while (i < blocks.length) {
    const b = blocks[i];
    if (!isPortableTextBlock(b) || b.listItem !== "bullet") break;
    i += 1;
  }
  return i;
}

/**
 * Injeta o triplet (platform → após 1.º parágrafo; feature → após bullets da secção "Como a 4unik ajuda…";
 * demo → fim) no corpo gerado por IA, alinhado ao fallback em `blogFallback.ts`.
 */
export function injectAiGeneratedBlogCtas(
  body: BlogPostBodyItem[],
  ctas: [BlogCtaBlock, BlogCtaBlock, BlogCtaBlock],
  locale: "pt" | "en",
): BlogPostBodyItem[] {
  const [platform, feature, demo] = ctas;
  const orig = [...body];
  const helpsIdx = findHelpsH2Index(orig, locale);
  let origFeatureInsert = -1;
  if (helpsIdx >= 0) {
    origFeatureInsert = indexAfterBulletRun(orig, helpsIdx + 1);
  }

  const work = [...orig];
  if (work.length > 0 && isPortableTextBlock(work[0])) {
    work.splice(1, 0, platform);
  } else {
    work.unshift(platform);
  }

  let featurePos: number;
  if (origFeatureInsert < 0) {
    featurePos = Math.max(2, Math.floor(work.length / 2));
  } else {
    featurePos = origFeatureInsert + 1;
  }
  work.splice(featurePos, 0, feature);
  work.push(demo);
  return work;
}
