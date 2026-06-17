#!/usr/bin/env node
/**
 * Snapshot GA4 — períodos A/B/C da revisão agentes/SEO.
 * Requer GOOGLE_APPLICATION_CREDENTIALS + Viewer na propriedade 327916606.
 *
 * Usage:
 *   npm run fetch:ga4-snapshot
 *   node scripts/fetch-ga4-landing-metrics.mjs [--update-review]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchGa4LandingMetrics } from "../mcps/4unik-marketing/lib/ga4.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const SNAPSHOT_DIR = path.join(REPO_ROOT, "docs/reviews/ga4-snapshots");
const REVIEW_PATH = path.join(REPO_ROOT, "docs/reviews/agent-seo-traffic-2026-06.md");

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function formatRate(sessions, leads) {
  if (!sessions) return "—";
  return `${((leads / sessions) * 100).toFixed(2)}%`;
}

function formatNum(n) {
  if (n === undefined || n === null || Number.isNaN(n)) return "—";
  return String(Math.round(n * 100) / 100);
}

const PERIODS = [
  {
    id: "A",
    label: "Baseline",
    startDate: "2026-06-10",
    endDate: "2026-06-11",
    filterMode: "stream",
    notes: "Pós-fix tag GA4",
  },
  {
    id: "B",
    label: "Pós-conteúdo",
    startDate: "2026-06-12",
    endDate: todayIso(),
    filterMode: "stream",
    notes: "Home redesign + motor/campanhas",
  },
  {
    id: "C",
    label: "Pré-stream",
    startDate: "2026-06-03",
    endDate: "2026-06-09",
    filterMode: "hostname",
    notes: "hostName = plataforma.4unik.com.br",
  },
];

function buildMarkdownTable(results) {
  const lines = [
    "| Período | Janela | Utilizadores ativos | Sessões | Novos utilizadores | `generate_lead` | Taxa lead/sessão | Notas |",
    "|---------|--------|---------------------|---------|-------------------|-----------------|------------------|-------|",
  ];

  for (const { period, result } of results) {
    const m = result.metrics ?? {};
    const window = `${period.startDate} – ${period.endDate}`;
    const status =
      result.status === "success"
        ? ""
        : ` ⚠️ ${result.reason}: ${result.note ?? ""}`;
    lines.push(
      `| **${period.id} — ${period.label}** | ${window} | ${formatNum(m.activeUsers)} | ${formatNum(m.sessions)} | ${formatNum(m.newUsers)} | ${formatNum(m.generateLeadEvents)} | ${formatRate(m.sessions, m.generateLeadEvents)} | ${period.notes}${status} |`,
    );
  }

  return lines.join("\n");
}

function updateReviewMarkdown(tableMd, snapshotDate, allSuccess) {
  if (!fs.existsSync(REVIEW_PATH)) {
    console.warn("fetch-ga4-landing-metrics: review file not found, skipping update");
    return;
  }

  let content = fs.readFileSync(REVIEW_PATH, "utf8");
  const markerStart = "### Tabela para preenchimento manual no Admin";
  const markerEnd = "**Métricas derivadas a calcular:**";

  const startIdx = content.indexOf(markerStart);
  const endIdx = content.indexOf(markerEnd);
  if (startIdx === -1 || endIdx === -1) {
    console.warn("fetch-ga4-landing-metrics: review markers not found");
    return;
  }

  const header = `${markerStart}\n\n_Último snapshot: ${snapshotDate}${allSuccess ? "" : " (parcial — ver notas na tabela)"}._\n\n`;
  const replacement = `${header}${tableMd}\n\n`;
  content = content.slice(0, startIdx) + replacement + content.slice(endIdx);
  fs.writeFileSync(REVIEW_PATH, content, "utf8");
  console.log(`fetch-ga4-landing-metrics: updated ${REVIEW_PATH}`);
}

async function main() {
  const updateReview = process.argv.includes("--update-review") || !process.argv.includes("--no-update-review");
  const snapshotDate = todayIso();

  fs.mkdirSync(SNAPSHOT_DIR, { recursive: true });

  const results = [];
  let allSuccess = true;

  for (const period of PERIODS) {
    console.log(`==> Período ${period.id} (${period.startDate} – ${period.endDate})`);
    const result = await fetchGa4LandingMetrics({
      startDate: period.startDate,
      endDate: period.endDate,
      filterMode: period.filterMode,
    });
    if (result.status !== "success") allSuccess = false;
    results.push({ period, result });
    console.log(`    status: ${result.status}${result.note ? ` — ${result.note}` : ""}`);
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    snapshotDate,
    allSuccess,
    periods: results.map(({ period, result }) => ({
      ...period,
      result,
    })),
  };

  const jsonPath = path.join(SNAPSHOT_DIR, `${snapshotDate}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2), "utf8");
  console.log(`fetch-ga4-landing-metrics: wrote ${jsonPath}`);

  const tableMd = buildMarkdownTable(results);
  if (updateReview) {
    updateReviewMarkdown(tableMd, snapshotDate, allSuccess);
  } else {
    console.log("\n" + tableMd);
  }

  if (!allSuccess) {
    console.error(
      "\nfetch-ga4-landing-metrics: alguns períodos falharam. Adicione landing-ga4-reader@institucional-480905.iam.gserviceaccount.com como Viewer em GA4 Admin.",
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
