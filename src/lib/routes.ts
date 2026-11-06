export const ROUTE_TABLE = [
  { key: "home", path: "/", legacyEn: "/en/", legacyPt: "/" },
  { key: "platform", path: "/platform/", legacyEn: "/en/plataforma/", legacyPt: "/plataforma/" },
  {
    key: "gamificationEngine",
    path: "/platform/gamification-engine/",
    legacyEn: "/en/plataforma/motor-gamificacao/",
    legacyPt: "/plataforma/motor-gamificacao/",
  },
  {
    key: "campaigns",
    path: "/platform/campaigns/",
    legacyEn: "/en/plataforma/campanhas-gamificacao/",
    legacyPt: "/plataforma/campanhas-gamificacao/",
  },
  {
    key: "wallets",
    path: "/platform/wallets/",
    legacyEn: "/en/plataforma/controle-carteiras/",
    legacyPt: "/plataforma/controle-carteiras/",
  },
  {
    key: "rewardsStore",
    path: "/platform/rewards-store/",
    legacyEn: "/en/plataforma/loja-resgate/",
    legacyPt: "/plataforma/loja-resgate/",
  },
  {
    key: "logistics",
    path: "/platform/logistics/",
    legacyEn: "/en/plataforma/logistica-integrada/",
    legacyPt: "/plataforma/logistica-integrada/",
  },
  {
    key: "managerDashboard",
    path: "/platform/manager-dashboard/",
    legacyEn: "/en/plataforma/painel-gestor/",
    legacyPt: "/plataforma/painel-gestor/",
  },
  { key: "integrations", path: "/integrations/", legacyEn: "/en/api-integracoes/", legacyPt: "/api-integracoes/" },
  {
    key: "integrationsWorkvivo",
    path: "/integrations/workvivo/",
    legacyEn: "/en/api-integracoes/workvivo/",
    legacyPt: "/api-integracoes/workvivo/",
  },
  { key: "workvivo", path: "/workvivo/", legacyEn: "/en/workvivo/", legacyPt: "/workvivo/" },
  { key: "intelligence", path: "/intelligence/", legacyEn: "/en/inteligencia/", legacyPt: "/inteligencia/" },
  {
    key: "rewardInfrastructure",
    path: "/reward-infrastructure/",
    legacyEn: "/en/reward-infrastructure/",
    legacyPt: "/infraestrutura-de-recompensas/",
  },
  { key: "useCases", path: "/use-cases/", legacyEn: "/en/casos-de-uso/", legacyPt: "/casos-de-uso/" },
  { key: "forPlatforms", path: "/for-platforms/", legacyEn: "/en/para-plataformas/", legacyPt: "/para-plataformas/" },
  { key: "education", path: "/solutions/education/", legacyEn: "/en/educacao/", legacyPt: "/educacao/" },
  { key: "sales", path: "/solutions/sales/", legacyEn: "/en/vendas/", legacyPt: "/vendas/" },
  { key: "communities", path: "/solutions/communities/", legacyEn: "/en/comunidades/", legacyPt: "/comunidades/" },
  { key: "events", path: "/solutions/events/", legacyEn: "/en/eventos/", legacyPt: "/eventos/" },
  { key: "gamification", path: "/gamification/", legacyEn: "/en/gamificacao/", legacyPt: "/gamificacao/" },
  {
    key: "gamificationForHr",
    path: "/gamification-for-hr/",
    legacyEn: "/en/gamificacao-para-rh/",
    legacyPt: "/gamificacao-para-rh/",
  },
  { key: "roiCalculator", path: "/roi-calculator/", legacyEn: "/en/calculadora-roi/", legacyPt: "/calculadora-roi/" },
  { key: "pricing", path: "/pricing/", legacyEn: "/en/pricing/", legacyPt: "/pricing/" },
  { key: "security", path: "/security/", legacyEn: "/en/seguranca/", legacyPt: "/seguranca/" },
  { key: "blog", path: "/blog/", legacyEn: "/en/blog/", legacyPt: "/blog/" },
  { key: "blogPost", path: "/blog/[slug]/", legacyEn: "/en/blog/[slug]/", legacyPt: "/blog/[slug]/" },
] as const;

export type RouteKey = (typeof ROUTE_TABLE)[number]["key"];

export const ROUTES = Object.fromEntries(ROUTE_TABLE.map((r) => [r.key, r.path])) as Record<RouteKey, string>;

export const LEGACY_4UNIK_EN_TO_YOOBE: Record<string, string> = Object.fromEntries(
  ROUTE_TABLE.map((r) => [r.legacyEn, r.path]),
);

const LEGACY_TO_PATH = new Map<string, string>();
for (const r of ROUTE_TABLE) {
  if (r.key === "blogPost") continue;
  LEGACY_TO_PATH.set(r.legacyPt, r.path);
  LEGACY_TO_PATH.set(r.legacyEn, r.path);
  LEGACY_TO_PATH.set(r.path, r.path);
}

const FILE_LIKE = /\/[^/]+\.[a-z0-9]+$/i;

export function toYoobePath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const match = /^([^?#]*)(.*)$/.exec(path)!;
  let pathname = match[1];
  const suffix = match[2];
  if (FILE_LIKE.test(pathname)) return path;
  if (pathname === "/landing" || pathname.startsWith("/landing/")) pathname = pathname.slice(8) || "/";
  if (pathname === "/en") pathname = "/en/";
  if (!pathname.endsWith("/")) pathname = `${pathname}/`;

  const direct = LEGACY_TO_PATH.get(pathname);
  if (direct) return `${direct}${suffix}`;

  const blog = /^(?:\/en)?\/(?:plataforma\/)?blog\/([^/]+)\/$/.exec(pathname);
  if (blog) return `/blog/${blog[1]}/${suffix}`;

  if (pathname.startsWith("/en/")) return `${pathname.slice(3)}${suffix}`;
  return path;
}
