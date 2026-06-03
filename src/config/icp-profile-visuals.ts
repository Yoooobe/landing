import type { IcpProfileSlug } from "@/lib/icpVerticalPages";

export type IcpHeroTheme =
  | "icp-platforms"
  | "icp-education"
  | "icp-sales"
  | "icp-communities"
  | "icp-events";

/** Lucide icon ids used by the floating hero cards (mapped in IcpProfileHero). */
export type IcpFloatIcon =
  | "package"
  | "gift"
  | "store"
  | "code"
  | "sparkles"
  | "graduation"
  | "award"
  | "trending"
  | "target"
  | "users"
  | "heart"
  | "ticket"
  | "calendar"
  | "scan"
  | "zap"
  | "star";

type LocalizedText = { readonly pt: string; readonly en: string };

export type IcpFloatingCard = {
  readonly icon: IcpFloatIcon;
  readonly title: LocalizedText;
  readonly sub: LocalizedText;
  /** Tailwind classes for the icon chip (text + bg + border). */
  readonly chipClass: string;
  /** Stagger delay + float duration tuning. */
  readonly delay: number;
  readonly floatDuration: number;
};

export type IcpProfileVisual = {
  readonly heroTheme: IcpHeroTheme;
  /** Word inside the hero title to wrap in an accent gradient (per locale). */
  readonly gradientWord?: LocalizedText;
  /** Gradient applied to the highlighted title word + accent CTAs. */
  readonly titleGradientClass: string;
  /** Accent used for badges, eyebrows, icon chips across light sections. */
  readonly accentTextClass: string;
  readonly accentBgClass: string;
  readonly accentBorderClass: string;
  /** Two soft glows behind the hero (already include color + opacity). */
  readonly heroGlowPrimaryClass: string;
  readonly heroGlowSecondaryClass: string;
  /** Fake browser chrome label shown above framed screenshots. */
  readonly chromeLabel: string;
  /** Generated showcase images under /screens/icp/. */
  readonly images: {
    readonly hero: string;
    readonly how: string;
    readonly benefits: string;
  };
  readonly floatingCards: readonly IcpFloatingCard[];
};

export const ICP_PROFILE_VISUALS: Record<IcpProfileSlug, IcpProfileVisual> = {
  "para-plataformas": {
    heroTheme: "icp-platforms",
    gradientWord: { pt: "API", en: "API" },
    titleGradientClass: "from-unik-blue-soft via-unik-blue to-demo-cyan",
    accentTextClass: "text-unik-blue",
    accentBgClass: "bg-unik-blue/10",
    accentBorderClass: "border-unik-blue/30",
    heroGlowPrimaryClass: "bg-unik-blue/20",
    heroGlowSecondaryClass: "bg-demo-cyan/12",
    chromeLabel: "api.4unik.io",
    images: {
      hero: "/screens/icp/para-plataformas-hero.webp",
      how: "/screens/icp/para-plataformas-how.webp",
      benefits: "/screens/icp/para-plataformas-benefits.webp",
    },
    floatingCards: [
      {
        icon: "code",
        title: { pt: "200 OK", en: "200 OK" },
        sub: { pt: "POST /v1/checkout", en: "POST /v1/checkout" },
        chipClass: "text-demo-cyan bg-demo-cyan/15 border-demo-cyan/30",
        delay: 0.5,
        floatDuration: 7,
      },
      {
        icon: "package",
        title: { pt: "Entrega criada", en: "Shipment created" },
        sub: { pt: "Webhook · tracking", en: "Webhook · tracking" },
        chipClass: "text-unik-blue bg-unik-blue/15 border-unik-blue/30",
        delay: 0.7,
        floatDuration: 8.5,
      },
    ],
  },
  educacao: {
    heroTheme: "icp-education",
    gradientWord: { pt: "conclusão", en: "completion" },
    titleGradientClass: "from-yoobe-purple via-fuchsia-500 to-unik-blue-soft",
    accentTextClass: "text-yoobe-purple",
    accentBgClass: "bg-yoobe-purple/10",
    accentBorderClass: "border-yoobe-purple/30",
    heroGlowPrimaryClass: "bg-yoobe-purple/22",
    heroGlowSecondaryClass: "bg-fuchsia-500/12",
    chromeLabel: "app.4unik.io · trilha",
    images: {
      hero: "/screens/icp/educacao-hero.webp",
      how: "/screens/icp/educacao-how.webp",
      benefits: "/screens/icp/educacao-benefits.webp",
    },
    floatingCards: [
      {
        icon: "graduation",
        title: { pt: "Curso concluído", en: "Course completed" },
        sub: { pt: "Recompensa liberada", en: "Reward unlocked" },
        chipClass: "text-yoobe-purple bg-yoobe-purple/15 border-yoobe-purple/30",
        delay: 0.5,
        floatDuration: 7.5,
      },
      {
        icon: "award",
        title: { pt: "+1 conquista", en: "+1 achievement" },
        sub: { pt: "Trilha avançada", en: "Advanced track" },
        chipClass: "text-fuchsia-400 bg-fuchsia-500/15 border-fuchsia-500/30",
        delay: 0.7,
        floatDuration: 9,
      },
    ],
  },
  vendas: {
    heroTheme: "icp-sales",
    gradientWord: { pt: "na hora", en: "instantly" },
    titleGradientClass: "from-brand-orange via-amber-400 to-yoobe-neon-pink",
    accentTextClass: "text-brand-orange",
    accentBgClass: "bg-brand-orange/10",
    accentBorderClass: "border-brand-orange/30",
    heroGlowPrimaryClass: "bg-brand-orange/22",
    heroGlowSecondaryClass: "bg-yoobe-neon-pink/12",
    chromeLabel: "gestor.4unik.io · metas",
    images: {
      hero: "/screens/icp/vendas-hero.webp",
      how: "/screens/icp/vendas-how.webp",
      benefits: "/screens/icp/vendas-benefits.webp",
    },
    floatingCards: [
      {
        icon: "target",
        title: { pt: "Meta batida", en: "Quota hit" },
        sub: { pt: "118% do trimestre", en: "118% of quarter" },
        chipClass: "text-brand-orange bg-brand-orange/15 border-brand-orange/30",
        delay: 0.5,
        floatDuration: 7,
      },
      {
        icon: "trending",
        title: { pt: "+500 pts", en: "+500 pts" },
        sub: { pt: "Premiação na hora", en: "Instant reward" },
        chipClass: "text-yoobe-neon-pink bg-yoobe-neon-pink/15 border-yoobe-neon-pink/30",
        delay: 0.7,
        floatDuration: 8.5,
      },
    ],
  },
  comunidades: {
    heroTheme: "icp-communities",
    gradientWord: { pt: "fãs", en: "fans" },
    titleGradientClass: "from-yoobe-neon-pink via-fuchsia-500 to-yoobe-purple",
    accentTextClass: "text-yoobe-neon-pink",
    accentBgClass: "bg-yoobe-neon-pink/10",
    accentBorderClass: "border-yoobe-neon-pink/30",
    heroGlowPrimaryClass: "bg-yoobe-neon-pink/20",
    heroGlowSecondaryClass: "bg-yoobe-purple/14",
    chromeLabel: "loja.4unik.io · VIP",
    images: {
      hero: "/screens/icp/comunidades-hero.webp",
      how: "/screens/icp/comunidades-how.webp",
      benefits: "/screens/icp/comunidades-benefits.webp",
    },
    floatingCards: [
      {
        icon: "heart",
        title: { pt: "Drop esgotado", en: "Drop sold out" },
        sub: { pt: "Loja VIP de fãs", en: "VIP fan store" },
        chipClass: "text-yoobe-neon-pink bg-yoobe-neon-pink/15 border-yoobe-neon-pink/30",
        delay: 0.5,
        floatDuration: 7.5,
      },
      {
        icon: "gift",
        title: { pt: "Pedido enviado", en: "Order shipped" },
        sub: { pt: "Fulfillment 4Unik", en: "4Unik fulfillment" },
        chipClass: "text-fuchsia-400 bg-fuchsia-500/15 border-fuchsia-500/30",
        delay: 0.7,
        floatDuration: 9,
      },
    ],
  },
  eventos: {
    heroTheme: "icp-events",
    gradientWord: { pt: "no celular", en: "on mobile" },
    titleGradientClass: "from-demo-cyan via-unik-blue-soft to-yoobe-purple",
    accentTextClass: "text-demo-cyan-deep",
    accentBgClass: "bg-demo-cyan/10",
    accentBorderClass: "border-demo-cyan/30",
    heroGlowPrimaryClass: "bg-demo-cyan/18",
    heroGlowSecondaryClass: "bg-unik-blue/14",
    chromeLabel: "loja.4unik.io · evento",
    images: {
      hero: "/screens/icp/eventos-hero.webp",
      how: "/screens/icp/eventos-how.webp",
      benefits: "/screens/icp/eventos-benefits.webp",
    },
    floatingCards: [
      {
        icon: "scan",
        title: { pt: "Check-in", en: "Check-in" },
        sub: { pt: "QR no celular", en: "QR on mobile" },
        chipClass: "text-demo-cyan-deep bg-demo-cyan/15 border-demo-cyan/30",
        delay: 0.5,
        floatDuration: 7,
      },
      {
        icon: "ticket",
        title: { pt: "Resgate ativo", en: "Redemption live" },
        sub: { pt: "Sem fila, sem caos", en: "No queue, no chaos" },
        chipClass: "text-unik-blue bg-unik-blue/15 border-unik-blue/30",
        delay: 0.7,
        floatDuration: 8.5,
      },
    ],
  },
};

export function getIcpProfileVisual(slug: string): IcpProfileVisual | null {
  return slug in ICP_PROFILE_VISUALS
    ? ICP_PROFILE_VISUALS[slug as IcpProfileSlug]
    : null;
}
