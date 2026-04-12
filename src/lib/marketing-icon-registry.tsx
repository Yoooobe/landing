import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  Code2,
  Coins,
  Cpu,
  Database,
  Fingerprint,
  GitBranch,
  Globe2,
  HeartHandshake,
  Image,
  Layers,
  Lightbulb,
  LineChart,
  Link2,
  Lock,
  MessageSquare,
  Network,
  Package,
  Palette,
  Plug,
  Puzzle,
  RefreshCw,
  Rocket,
  Search,
  Settings2,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import {
  DEFAULT_MARKETING_ICON_ID,
  MARKETING_ICON_MANIFEST,
  type MarketingIconEntry,
} from "@/config/marketing-icon-manifest";

/** Maps `lucideExport` from manifest → component (tree-shaken imports). */
const LUCIDE_BY_EXPORT: Record<string, LucideIcon> = {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  Code2,
  Coins,
  Cpu,
  Database,
  Fingerprint,
  GitBranch,
  Globe2,
  HeartHandshake,
  Image,
  Layers,
  Lightbulb,
  LineChart,
  Link2,
  Lock,
  MessageSquare,
  Network,
  Package,
  Palette,
  Plug,
  Puzzle,
  RefreshCw,
  Rocket,
  Search,
  Settings2,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
};

const ENTRY_BY_ID = new Map<string, MarketingIconEntry>(
  MARKETING_ICON_MANIFEST.map((e) => [e.id, e]),
);

export function getMarketingIconEntry(iconId: string | undefined): MarketingIconEntry | undefined {
  if (!iconId) return undefined;
  return ENTRY_BY_ID.get(iconId);
}

export function getMarketingLucideIcon(iconId: string | undefined): LucideIcon {
  const id = iconId && ENTRY_BY_ID.has(iconId) ? iconId : DEFAULT_MARKETING_ICON_ID;
  const entry = ENTRY_BY_ID.get(id);
  const Cmp = entry ? LUCIDE_BY_EXPORT[entry.lucideExport] : undefined;
  return Cmp ?? Sparkles;
}
