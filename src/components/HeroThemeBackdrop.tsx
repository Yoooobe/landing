/* eslint-disable @next/next/no-img-element */
import { withBasePath } from "@/lib/basePath";

type HeroTheme = "home" | "gamification" | "api" | "features";

const THEME_ASSET: Record<HeroTheme, string> = {
  home: "/hero-home-rewards-background.svg",
  gamification: "/hero-gamification-background.svg",
  api: "/hero-api-background.svg",
  features: "/hero-features-background.svg",
};

type Props = {
  theme: HeroTheme;
  className?: string;
};

export default function HeroThemeBackdrop({ theme, className = "" }: Props) {
  const assetSrc = withBasePath(THEME_ASSET[theme]);

  return (
    <div className={`hero-theme-backdrop hero-theme-${theme} ${className}`}>
      <div className="hero-theme-grid" />
      <div className="hero-theme-lines" />
      <div className="hero-theme-rings" />
      <div className="hero-theme-orb hero-theme-orb-primary" />
      <div className="hero-theme-orb hero-theme-orb-secondary" />
      <div className="hero-theme-particles">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <img
        src={assetSrc}
        alt=""
        aria-hidden="true"
        className="hero-theme-asset hero-theme-asset-primary"
        decoding="async"
        fetchPriority="high"
        loading="eager"
      />
      <img
        src={assetSrc}
        alt=""
        aria-hidden="true"
        className="hero-theme-asset hero-theme-asset-secondary"
        decoding="async"
        loading="lazy"
      />
    </div>
  );
}
