#!/usr/bin/env node
/**
 * External indexing readiness check for GSC monitoring (no GSC API required).
 * Validates robots, sitemap, hreflang sample, growth pages, and key route smoke.
 *
 * Usage:
 *   node scripts/gsc-indexing-check.mjs [--base https://plataforma.4unik.com.br/landing] [--json]
 */
import { writeFileSync } from "node:fs";

const DEFAULT_BASE = "https://plataforma.4unik.com.br/landing";

function parseArgs(argv) {
  let base = DEFAULT_BASE;
  let jsonOnly = false;
  let outPath = null;
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--json") jsonOnly = true;
    else if (arg === "--base") {
      base = argv[++i]?.replace(/\/$/, "") ?? DEFAULT_BASE;
    } else if (arg === "--out") {
      outPath = argv[++i] ?? null;
    } else if (arg === "--help" || arg === "-h") {
      console.log("Usage: node scripts/gsc-indexing-check.mjs [--base URL] [--json] [--out file.json]");
      process.exit(0);
    }
  }
  return { base, jsonOnly, outPath };
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: "follow" });
  return { url, status: res.status, ok: res.ok, text: res.ok ? await res.text() : "" };
}

function extractMeta(html, name) {
  const robots = html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, "i"));
  if (robots) return robots[1];
  const robotsAlt = html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`, "i"));
  return robotsAlt?.[1] ?? null;
}

function isIndexableRobots(robotsMeta) {
  if (!robotsMeta) return true;
  return !/\bnoindex\b/i.test(robotsMeta);
}

function extractLink(html, rel) {
  const link = html.match(new RegExp(`<link[^>]+rel=["']${rel}["'][^>]+href=["']([^"']+)["']`, "i"));
  if (link) return link[1];
  const linkAlt = html.match(new RegExp(`<link[^>]+href=["']([^"']+)["'][^>]+rel=["']${rel}["']`, "i"));
  return linkAlt?.[1] ?? null;
}

function countSitemapUrls(xml) {
  return (xml.match(/<loc>/g) ?? []).length;
}

function hasHreflangTriplet(xml, ptPath) {
  const pt = ptPath.replace(/^\//, "");
  return (
    xml.includes(`hreflang="pt-BR"`) &&
    xml.includes(`/${pt}`) &&
    xml.includes(`hreflang="en"`) &&
    xml.includes(`hreflang="x-default"`)
  );
}

async function main() {
  const { base, jsonOnly, outPath } = parseArgs(process.argv);
  const checkedAt = new Date().toISOString();
  const checks = [];
  const warnings = [];

  const add = (id, label, pass, detail) => {
    checks.push({ id, label, pass, detail });
  };

  const robots = await fetchText(`${base}/robots.txt`);
  add(
    "robots.status",
    "robots.txt HTTP 200",
    robots.ok,
    `status=${robots.status}`,
  );
  const sitemapLine = robots.text.match(/^Sitemap:\s*(.+)$/m)?.[1]?.trim() ?? "";
  const expectedSitemap = `${base}/sitemap.xml`;
  add(
    "robots.sitemap",
    "robots.txt Sitemap canonical",
    sitemapLine === expectedSitemap,
    sitemapLine || "(missing)",
  );

  const sitemap = await fetchText(`${base}/sitemap.xml`);
  add("sitemap.status", "sitemap.xml HTTP 200", sitemap.ok, `status=${sitemap.status}`);
  const urlCount = sitemap.ok ? countSitemapUrls(sitemap.text) : 0;
  add("sitemap.count", "sitemap URL count >= 50", urlCount >= 50, `count=${urlCount}`);

  for (const path of ["/pricing/", "/seguranca/", "/para-plataformas/", "/en/pricing/"]) {
    const page = await fetchText(`${base}${path}`);
    const robotsMeta = extractMeta(page.text, "robots");
    const canonical = extractLink(page.text, "canonical");
    add(
      `page${path.replace(/\//g, "-") || "home"}.status`,
      `${path} HTTP 200`,
      page.ok,
      `status=${page.status}`,
    );
    if (page.ok) {
      add(
        `page${path.replace(/\//g, "-")}.robots`,
        `${path} indexable (explicit or default)`,
        isIndexableRobots(robotsMeta),
        robotsMeta ?? "(default index)",
      );
      add(
        `page${path.replace(/\//g, "-")}.canonical`,
        `${path} canonical on ${base}`,
        Boolean(canonical?.startsWith(base)),
        canonical ?? "(missing)",
      );
    }
  }

  const home = await fetchText(`${base}/`);
  if (home.ok) {
    const hreflangs = [...home.text.matchAll(/hrefLang=["']([^"']+)["']/gi)].map((m) => m[1]);
    add(
      "home.hreflang",
      "Home hreflang pt-BR + en + x-default",
      hreflangs.includes("pt-BR") && hreflangs.includes("en") && hreflangs.includes("x-default"),
      hreflangs.join(", ") || "(missing)",
    );
  }

  if (sitemap.ok) {
    add(
      "sitemap.hreflang.icp",
      "Sitemap hreflang for /para-plataformas/",
      hasHreflangTriplet(sitemap.text, "/para-plataformas/"),
      "pt-BR/en/x-default cluster",
    );
  }

  const llms = await fetchText(`${base}/llms.txt`);
  add("llms.status", "llms.txt HTTP 200", llms.ok, `status=${llms.status}`);
  if (llms.ok && !llms.text.includes(base)) {
    warnings.push("llms.txt may not reference canonical base URL");
  }

  const proxyPaths = [
    "/plataforma/motor-gamificacao/",
    "/pricing/",
    "/para-plataformas/",
  ];
  for (const path of proxyPaths) {
    const hostBase = base.replace(/\/landing$/, "");
    const res = await fetchText(`${hostBase}${path}`);
    if (res.status === 404) {
      warnings.push(
        `Root path ${hostBase}${path} returns 404 — configure proxy 301 → ${base}${path} (see docs/proxy-redirects-4unik.md)`,
      );
    }
  }

  const failed = checks.filter((c) => !c.pass);
  const report = {
    checkedAt,
    base,
    summary: {
      totalChecks: checks.length,
      passed: checks.length - failed.length,
      failed: failed.length,
      warnings: warnings.length,
      readyForGSC: failed.length === 0,
    },
    checks,
    warnings,
    gscConsole: {
      property: "https://plataforma.4unik.com.br/",
      sitemapSubmit: `${base}/sitemap.xml`,
      baselineMetricsPending: [
        "Indexed pages (Pages report)",
        "Impressions + clicks (28d Performance)",
        "Hreflang errors (International targeting)",
        "Sitemap status (Submitted / Discovered URLs)",
      ],
    },
  };

  if (outPath) writeFileSync(outPath, JSON.stringify(report, null, 2));

  if (jsonOnly) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(`gsc-indexing-check: ${report.summary.passed}/${report.summary.totalChecks} passed (${checkedAt})`);
    for (const check of checks) {
      console.log(`${check.pass ? "OK" : "FAIL"} ${check.id}: ${check.detail}`);
    }
    for (const warning of warnings) {
      console.log(`WARN ${warning}`);
    }
    if (failed.length) process.exitCode = 1;
  }

  return report;
}

main().catch((err) => {
  console.error("gsc-indexing-check:", err);
  process.exit(1);
});
