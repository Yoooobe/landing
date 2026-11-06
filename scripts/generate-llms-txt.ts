#!/usr/bin/env npx tsx
/**
 * Gera `public/llms.txt` (inglês) a partir de ROUTE_TABLE e dos posts EN do Sanity.
 * Executado antes de `next build`; as URLs passam pelo check-internal-links no fim do build.
 */
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { parsePublicSiteUrl } from "../src/lib/parsePublicSiteUrl";
import { ROUTES } from "../src/lib/routes";
import { getBlogPosts } from "../src/sanity/lib/blog";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { siteUrl } = parsePublicSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
const url = (path: string) => `${siteUrl}${path}`;

const SECTIONS: { title: string; items: [string, keyof typeof ROUTES][] }[] = [
  {
    title: "Platform",
    items: [
      ["Platform overview", "platform"],
      ["Gamification engine", "gamificationEngine"],
      ["Gamification campaigns", "campaigns"],
      ["Wallet control", "wallets"],
      ["Rewards store", "rewardsStore"],
      ["Manager dashboard", "managerDashboard"],
      ["Reward infrastructure", "rewardInfrastructure"],
      ["AI & intelligence", "intelligence"],
    ],
  },
  {
    title: "Solutions",
    items: [
      ["Gamification for HR", "gamificationForHr"],
      ["Platforms & SaaS (rewards API)", "forPlatforms"],
      ["Education & e-learning", "education"],
      ["Sales incentives", "sales"],
      ["Creators & communities", "communities"],
      ["Events", "events"],
      ["Use cases", "useCases"],
    ],
  },
  {
    title: "API & integrations",
    items: [
      ["API, webhooks & integrations", "integrations"],
      ["Workvivo integration", "integrationsWorkvivo"],
    ],
  },
  {
    title: "Company",
    items: [
      ["Plans & pricing", "pricing"],
      ["Security & governance", "security"],
      ["ROI calculator", "roiCalculator"],
      ["Blog", "blog"],
    ],
  },
];

async function main() {
  const posts = await getBlogPosts("en");
  const body = [
    "# Yoobe",
    "",
    "> Yoobe Inc. (Delaware, USA) — reward infrastructure for employee engagement: gamification engine, corporate rewards store, wallets, swag catalog, and fulfillment, available as a full platform or via API.",
    "",
    `Website: ${url("/")}`,
    "Swag & corporate gifts catalog: https://catalogo.yoobe.co/",
    "Contact: vendas@yoobe.co · WhatsApp +55 41 98760-7512 · Book a demo: https://calendly.com/yoobeco/demo",
    "",
    ...SECTIONS.flatMap((s) => [`## ${s.title}`, "", ...s.items.map(([label, key]) => `- [${label}](${url(ROUTES[key])})`), ""]),
    "## Blog",
    "",
    ...posts.map((p) => `- [${p.title}](${url(`/blog/${p.slug}/`)})`),
    "",
  ].join("\n");
  writeFileSync(join(root, "public", "llms.txt"), body);
  console.log(`generate-llms-txt: ${posts.length} posts`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
