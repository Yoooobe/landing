/**
 * Single source of truth for marketing feature-card icons (Lucide).
 * Add entries here, then register the matching export in `marketing-icon-registry.tsx`.
 *
 * License: all current entries use **Lucide** (ISC) — https://github.com/lucide-icons/lucide/blob/main/LICENSE
 * Future families (Heroicons, etc.) need their own `family` + registry branch and license line.
 * Curadoria e famílias candidatas: [`docs/icon-libraries.md`](../../docs/icon-libraries.md).
 */
export const MARKETING_ICON_CATALOG_LICENSE =
  "Lucide icons — ISC License (https://github.com/lucide-icons/lucide)";

export type MarketingIconFamily = "lucide";

export type MarketingIconEntry = {
  /** Stored in Sanity (`icon` field on feature cards) */
  id: string;
  title: string;
  family: MarketingIconFamily;
  /** Must match a named export from `lucide-react` (PascalCase) */
  lucideExport: string;
};

export const MARKETING_ICON_MANIFEST: readonly MarketingIconEntry[] = [
  { id: "sparkles", title: "Sparkles", family: "lucide", lucideExport: "Sparkles" },
  { id: "zap", title: "Zap", family: "lucide", lucideExport: "Zap" },
  { id: "shield", title: "Shield", family: "lucide", lucideExport: "Shield" },
  { id: "target", title: "Target", family: "lucide", lucideExport: "Target" },
  { id: "bar-chart-3", title: "Bar chart", family: "lucide", lucideExport: "BarChart3" },
  { id: "brain-circuit", title: "Brain circuit", family: "lucide", lucideExport: "BrainCircuit" },
  { id: "package", title: "Package", family: "lucide", lucideExport: "Package" },
  { id: "store", title: "Store", family: "lucide", lucideExport: "Store" },
  { id: "coins", title: "Coins", family: "lucide", lucideExport: "Coins" },
  { id: "globe-2", title: "Globe", family: "lucide", lucideExport: "Globe2" },
  { id: "message-square", title: "Message square", family: "lucide", lucideExport: "MessageSquare" },
  { id: "link-2", title: "Link", family: "lucide", lucideExport: "Link2" },
  { id: "activity", title: "Activity", family: "lucide", lucideExport: "Activity" },
  { id: "arrow-right", title: "Arrow right", family: "lucide", lucideExport: "ArrowRight" },
  { id: "award", title: "Award", family: "lucide", lucideExport: "Award" },
  { id: "boxes", title: "Boxes", family: "lucide", lucideExport: "Boxes" },
  { id: "check-circle-2", title: "Check circle", family: "lucide", lucideExport: "CheckCircle2" },
  { id: "cloud", title: "Cloud", family: "lucide", lucideExport: "Cloud" },
  { id: "code-2", title: "Code", family: "lucide", lucideExport: "Code2" },
  { id: "cpu", title: "CPU", family: "lucide", lucideExport: "Cpu" },
  { id: "database", title: "Database", family: "lucide", lucideExport: "Database" },
  { id: "fingerprint", title: "Fingerprint", family: "lucide", lucideExport: "Fingerprint" },
  { id: "git-branch", title: "Git branch", family: "lucide", lucideExport: "GitBranch" },
  { id: "heart-handshake", title: "Heart handshake", family: "lucide", lucideExport: "HeartHandshake" },
  { id: "image", title: "Image", family: "lucide", lucideExport: "Image" },
  { id: "layers", title: "Layers", family: "lucide", lucideExport: "Layers" },
  { id: "lightbulb", title: "Lightbulb", family: "lucide", lucideExport: "Lightbulb" },
  { id: "line-chart", title: "Line chart", family: "lucide", lucideExport: "LineChart" },
  { id: "lock", title: "Lock", family: "lucide", lucideExport: "Lock" },
  { id: "network", title: "Network", family: "lucide", lucideExport: "Network" },
  { id: "palette", title: "Palette", family: "lucide", lucideExport: "Palette" },
  { id: "plug", title: "Plug", family: "lucide", lucideExport: "Plug" },
  { id: "puzzle", title: "Puzzle", family: "lucide", lucideExport: "Puzzle" },
  { id: "refresh-cw", title: "Refresh", family: "lucide", lucideExport: "RefreshCw" },
  { id: "rocket", title: "Rocket", family: "lucide", lucideExport: "Rocket" },
  { id: "search", title: "Search", family: "lucide", lucideExport: "Search" },
  { id: "settings-2", title: "Settings", family: "lucide", lucideExport: "Settings2" },
  { id: "smartphone", title: "Smartphone", family: "lucide", lucideExport: "Smartphone" },
  { id: "star", title: "Star", family: "lucide", lucideExport: "Star" },
  { id: "trending-up", title: "Trending up", family: "lucide", lucideExport: "TrendingUp" },
  { id: "users", title: "Users", family: "lucide", lucideExport: "Users" },
  { id: "workflow", title: "Workflow", family: "lucide", lucideExport: "Workflow" },
] as const;

const IDS = new Set(MARKETING_ICON_MANIFEST.map((e) => e.id));

export function isMarketingIconId(value: string | undefined): boolean {
  return typeof value === "string" && IDS.has(value);
}

export const DEFAULT_MARKETING_ICON_ID = "sparkles" as const;
