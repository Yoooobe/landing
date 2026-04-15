import type { Locale } from "@/lib/locale";
import type {
  BlogCtaBlock,
  BlogPostBodyItem,
  PortableTextBlock,
} from "@/sanity/lib/types";

/** Só consideramos CTAs “do CMS” se forem utilizáveis (evita stubs vazios que bloqueavam a injeção do fallback). */
export function bodyHasBlogCta(body: BlogPostBodyItem[] | undefined): boolean {
  return Boolean(
    body?.some((item) => {
      if (item._type !== "blogCta") return false;
      const href = String((item as BlogCtaBlock).ctaHref ?? "").trim();
      return href.length > 0;
    }),
  );
}

export function extractBlogCtaBlocks(fbBody: BlogPostBodyItem[] | undefined): BlogCtaBlock[] {
  if (!fbBody?.length) return [];
  return fbBody.filter((item): item is BlogCtaBlock => item._type === "blogCta");
}

function plainTextFromBlock(block: PortableTextBlock): string {
  return (block.children || []).map((c) => c.text || "").join("");
}

function findFirstParagraphBlockIndex(items: BlogPostBodyItem[]): number | null {
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (it._type !== "block") continue;
    if (it.listItem) continue;
    const st = it.style || "normal";
    if (st !== "h2" && st !== "h3") return i;
  }
  return null;
}

function matchesHelpHeading(text: string, locale: Locale): boolean {
  const t = text.toLowerCase();
  if (locale === "en") {
    return (
      t.includes("how 4unik helps") ||
      t.includes("helps in this scenario") ||
      (t.includes("4unik") && t.includes("help"))
    );
  }
  return (
    t.includes("ajuda neste cenário") ||
    t.includes("como a 4unik ajuda") ||
    (t.includes("4unik") && t.includes("ajuda") && t.includes("cenário"))
  );
}

function findHelpH2Index(items: BlogPostBodyItem[], locale: Locale): number | null {
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (it._type !== "block" || it.style !== "h2") continue;
    if (matchesHelpHeading(plainTextFromBlock(it), locale)) return i;
  }
  let h2Count = 0;
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (it._type === "block" && it.style === "h2") {
      h2Count += 1;
      if (h2Count === 2) return i;
    }
  }
  return null;
}

/**
 * Quando o CMS tem corpo editorial sem blocos `blogCta`, injeta os CTAs do fallback
 * (plataforma, feature, demo) nas mesmas posições relativas que em `blogFallback`.
 *
 * Inserção em **um único passe** sobre o corpo do CMS — evita colisão de índices
 * (ex.: plataforma e demo ambos em `splice(1,0,…)` em artigos curtos), que podia
 * omitir ou baralhar CTAs.
 */
export function injectFallbackBlogCtas(
  cmsBody: BlogPostBodyItem[],
  fbBody: BlogPostBodyItem[] | undefined,
  locale: Locale,
): BlogPostBodyItem[] {
  const ctas = extractBlogCtaBlocks(fbBody);
  if (ctas.length === 0) return cmsBody;

  const platformCta = ctas.find((c) => c.variant === "platform");
  const featureCta = ctas.find((c) => c.variant === "feature");
  const demoCta = ctas.find((c) => c.variant === "demo");

  const firstPara = findFirstParagraphBlockIndex(cmsBody);
  const helpH2 = findHelpH2Index(cmsBody, locale);
  const lastIdx = cmsBody.length - 1;

  const out: BlogPostBodyItem[] = [];

  for (let i = 0; i < cmsBody.length; i += 1) {
    if (i === lastIdx && lastIdx >= 1 && demoCta) {
      out.push(demoCta);
    }
    out.push(cmsBody[i]);
    if (firstPara === i && platformCta) out.push(platformCta);
    if (helpH2 === i && featureCta) out.push(featureCta);
  }

  if (cmsBody.length === 1 && demoCta) {
    out.push(demoCta);
  }

  if (out.length === cmsBody.length) {
    return [...cmsBody, ...ctas];
  }
  return out;
}
