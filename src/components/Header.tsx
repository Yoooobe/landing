"use client";

import UnikWordmark from "@/components/UnikWordmark";
import {
  useSiteSettings,
  useSiteShellMenu,
} from "@/contexts/SiteSettingsContext";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import {
  resolvePrimaryContactHref,
  scrollToPrimaryContact,
  shouldScrollPrimaryContactInPlace,
} from "@/lib/resolvePrimaryContactHref";
import TrackedOutboundLink, {
  trackContactIntent,
} from "@/components/analytics/TrackedOutboundLink";
import { mergeShellMenuSections } from "@/lib/mergeShellMenuSections";
import { DEFAULT_CALENDLY_URL } from "@/lib/calendly";
import { normalizeWhatsappHref } from "@/lib/whatsapp";
import { resolveRewardsCatalogProductUrl } from "@/lib/rewardsCatalog";
import { isExternalShellHref, resolveShellHref } from "@/lib/siteShell";
import { toggleLocalePath } from "@/lib/locale";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type ReactNode,
} from "react";
import {
  Boxes,
  Brain,
  CalendarDays,
  ChevronDown,
  Gamepad2,
  Gift,
  GraduationCap,
  LayoutDashboard,
  Layers,
  Menu,
  Network,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
  Wallet,
  X,
} from "lucide-react";

type HeaderMenuItem = {
  label: string;
  description?: string;
  href: string;
  badge?: string;
  icon?: string;
  openInNewTab?: boolean;
};

type HeaderMenuSection = {
  title: string;
  items: HeaderMenuItem[];
};

const HEADER_ICON_MAP = {
  overview: Layers,
  gamification: Gamepad2,
  intelligence: Brain,
  cases: Trophy,
  rewards: Gift,
  api: Network,
  workvivo: Sparkles,
  wallets: Wallet,
  manager: LayoutDashboard,
  store: ShoppingBag,
  logistics: Gift,
  platforms: Boxes,
  education: GraduationCap,
  sales: TrendingUp,
  communities: Users,
  events: CalendarDays,
} as const;

function mergeHeaderSections(
  cmsSections: Array<{
    title?: string;
    items?: Array<{
      label?: string;
      description?: string;
      href?: string;
      badge?: string;
      icon?: string;
      openInNewTab?: boolean;
    }>;
  }> | null | undefined,
  fallbackSections: HeaderMenuSection[],
): HeaderMenuSection[] {
  return mergeShellMenuSections(cmsSections, fallbackSections, (item, fallbackItem) => ({
    label: item?.label || fallbackItem?.label || "Item",
    description: item?.description ?? fallbackItem?.description,
    href: item?.href || fallbackItem?.href || "/",
    badge: item?.badge ?? fallbackItem?.badge,
    icon: item?.icon ?? fallbackItem?.icon,
    openInNewTab: item?.openInNewTab ?? fallbackItem?.openInNewTab,
  }));
}

function dropdownPanelClasses(index: number, total: number, isOpen: boolean): string {
  const base =
    "absolute top-full z-50 pt-3 transition-all duration-200";
  const visibility = isOpen
    ? "visible translate-y-0 opacity-100"
    : "invisible translate-y-2 opacity-0 pointer-events-none";

  if (index === 0) {
    return `${base} left-0 ${visibility}`;
  }

  if (index === total - 1) {
    return `${base} right-0 ${visibility}`;
  }

  return `${base} left-1/2 -translate-x-1/2 ${visibility}`;
}

function normalizePathForMatch(value: string): string {
  const trimmed = value.replace(/\/+$/, "");
  return trimmed.length > 0 ? trimmed : "/";
}

function pathMatchesHref(
  pathname: string | null,
  href: string,
  locale: "pt" | "en",
): boolean {
  if (!pathname) return false;
  const resolved = normalizeWhatsappHref(resolveShellHref(href, locale));
  if (isExternalShellHref(resolved) || resolved.startsWith("#")) return false;
  const current = normalizePathForMatch(pathname);
  const target = normalizePathForMatch(resolved);
  return current === target || current.startsWith(`${target}/`);
}

function dropdownTriangleClasses(index: number, total: number): string {
  if (index === 0) {
    return "absolute -top-1.5 left-8 w-3 h-3 bg-surface-page border-t border-l border-white/10 rotate-45";
  }

  if (index === total - 1) {
    return "absolute -top-1.5 right-8 w-3 h-3 bg-surface-page border-t border-l border-white/10 rotate-45";
  }

  return "absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-surface-page border-t border-l border-white/10 rotate-45";
}

function dropdownWidthClass(section: HeaderMenuSection, index: number, total: number): string {
  const hasDescriptions = section.items.some((item) => item.description);
  if (!hasDescriptions) {
    return "w-[260px]";
  }

  if (index === 0) {
    return "w-[360px]";
  }

  if (index === total - 1) {
    return "w-[300px]";
  }

  return "w-[340px]";
}

type ShellMenuLinkProps = {
  href: string;
  locale: "pt" | "en";
  openInNewTab?: boolean;
  className: string;
  onClick?: () => void;
  ariaCurrent?: "page" | undefined;
  children: ReactNode;
};

function ShellMenuLink({
  href,
  locale,
  openInNewTab,
  className,
  onClick,
  ariaCurrent,
  children,
}: ShellMenuLinkProps) {
  const resolvedHref = normalizeWhatsappHref(resolveShellHref(href, locale));
  const isExternal = isExternalShellHref(resolvedHref);
  const shouldOpenInNewTab = openInNewTab ?? isExternal;

  if (isExternal) {
    return (
      <a
        href={resolvedHref}
        target={shouldOpenInNewTab ? "_blank" : undefined}
        rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
        className={className}
        onClick={onClick}
        aria-current={ariaCurrent}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={resolvedHref}
      className={className}
      onClick={onClick}
      aria-current={ariaCurrent}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const { m, path, locale } = useLocaleMessages();
  const { sanity } = useSiteSettings();
  const cmsHeaderMenu = useSiteShellMenu("header", locale);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  /** After Escape, ignore hover reopen until the pointer leaves the section. */
  const megaMenuHoverLockedRef = useRef(false);

  const fallbackSections = useMemo<HeaderMenuSection[]>(
    () => [
      {
        title: m.nav.platform,
        items: [
          {
            label: m.nav.overview.title,
            description: m.nav.overview.desc,
            href: "/plataforma/",
            icon: "overview",
          },
          {
            label: m.nav.wallets.title,
            description: m.nav.wallets.desc,
            href: "/plataforma/controle-carteiras/",
            icon: "wallets",
          },
          {
            label: m.nav.manager.title,
            description: m.nav.manager.desc,
            href: "/plataforma/painel-gestor/",
            icon: "manager",
          },
          {
            label: m.nav.store.title,
            description: m.nav.store.desc,
            href: "/plataforma/loja-resgate/",
            icon: "store",
          },
          {
            label: m.nav.gamificationCampaigns.title,
            description: m.nav.gamificationCampaigns.desc,
            href: "/plataforma/campanhas-gamificacao/",
            badge: m.nav.gamificationCampaigns.badge,
            icon: "gamification",
          },
        ],
      },
      {
        title: m.nav.solutions,
        items: [
          {
            label: m.nav.gamification.title,
            description: m.nav.gamification.desc,
            href: "/plataforma/motor-gamificacao/",
            badge: m.nav.gamification.badge,
            icon: "gamification",
          },
          {
            label: m.nav.rewardsHub.title,
            description: m.nav.rewardsHub.desc,
            href: resolveRewardsCatalogProductUrl(sanity?.rewardsCatalogUrl),
            icon: "rewards",
            openInNewTab: true,
          },
        ],
      },
      {
        title: m.nav.solutionsByProfile,
        items: [
          {
            label: m.nav.verticals.platforms.title,
            description: m.nav.verticals.platforms.desc,
            href: "/para-plataformas/",
            icon: "platforms",
          },
          {
            label: m.nav.verticals.education.title,
            description: m.nav.verticals.education.desc,
            href: "/educacao/",
            icon: "education",
          },
          {
            label: m.nav.verticals.sales.title,
            description: m.nav.verticals.sales.desc,
            href: "/vendas/",
            icon: "sales",
          },
          {
            label: m.nav.verticals.communities.title,
            description: m.nav.verticals.communities.desc,
            href: "/comunidades/",
            icon: "communities",
          },
          {
            label: m.nav.verticals.events.title,
            description: m.nav.verticals.events.desc,
            href: "/eventos/",
            icon: "events",
          },
        ],
      },
      {
        title: m.nav.api,
        items: [
          {
            label: m.nav.apiHub.title,
            description: m.nav.apiHub.desc,
            href: "/api-integracoes/",
            icon: "api",
          },
        ],
      },
    ],
    [m, sanity?.rewardsCatalogUrl],
  );

  const navSections = useMemo(
    () => mergeHeaderSections(cmsHeaderMenu?.sections, fallbackSections),
    [cmsHeaderMenu?.sections, fallbackSections],
  );

  const demoUrl = sanity?.calendlyUrl?.trim() || DEFAULT_CALENDLY_URL;
  const contactHref = resolvePrimaryContactHref(pathname, path);
  const contactScrollInPlace = shouldScrollPrimaryContactInPlace(pathname, path);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (openMenuIndex === null && !isMobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      megaMenuHoverLockedRef.current = true;
      setOpenMenuIndex(null);
      setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openMenuIndex, isMobileMenuOpen]);

  useEffect(() => {
    megaMenuHoverLockedRef.current = false;
    setOpenMenuIndex(null);
  }, [pathname]);

  const openMegaMenuFromHover = useCallback((sectionIndex: number) => {
    if (megaMenuHoverLockedRef.current) return;
    setOpenMenuIndex(sectionIndex);
  }, []);

  const openMegaMenuFromFocus = useCallback((sectionIndex: number) => {
    megaMenuHoverLockedRef.current = false;
    setOpenMenuIndex(sectionIndex);
  }, []);

  const closeMegaMenuSection = useCallback((sectionIndex: number) => {
    megaMenuHoverLockedRef.current = false;
    setOpenMenuIndex((current) => (current === sectionIndex ? null : current));
  }, []);

  const isHrefActive = useCallback(
    (href: string) => pathMatchesHref(pathname, href, locale),
    [pathname, locale],
  );

  const blogActive = Boolean(
    pathname &&
      (normalizePathForMatch(pathname).endsWith("/blog") ||
        normalizePathForMatch(pathname).includes("/blog/")),
  );

  const pricingActive = Boolean(
    pathname &&
      (normalizePathForMatch(pathname).endsWith("/pricing") ||
        normalizePathForMatch(pathname).includes("/pricing/")),
  );

  const handleMenuBlur = useCallback(
    (sectionIndex: number, event: FocusEvent<HTMLDivElement>) => {
      const next = event.relatedTarget as Node | null;
      if (!event.currentTarget.contains(next)) {
        setOpenMenuIndex((current) => (current === sectionIndex ? null : current));
      }
    },
    [],
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 font-sans transition-all duration-200 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-200 ${
            scrolled
              ? "border border-white/15 bg-surface-panel/60 shadow-lg backdrop-blur-xl"
              : "border border-white/0 bg-transparent"
          }`}
        >
          {/* Logo — lockup 4Unik */}
          <Link href={path("/")} className="z-10 flex min-w-0 shrink-0 items-center">
            <UnikWordmark
              variant="header"
              alt="4Unik"
              className="shrink-0"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 text-[0.9rem] font-medium tracking-wide" aria-label={locale === "en" ? "Primary" : "Principal"}>
            {navSections.map((section, sectionIndex) => {
              const isOpen = openMenuIndex === sectionIndex;
              const sectionActive = section.items.some((item) => isHrefActive(item.href));

              return (
              <div
                key={`${section.title}-${sectionIndex}`}
                className="relative"
                onMouseEnter={() => openMegaMenuFromHover(sectionIndex)}
                onMouseLeave={() => closeMegaMenuSection(sectionIndex)}
                onFocus={() => openMegaMenuFromFocus(sectionIndex)}
                onBlur={(event) => handleMenuBlur(sectionIndex, event)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60 ${
                    sectionActive || isOpen
                      ? "bg-brand-orange/10 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  onClick={() => {
                    megaMenuHoverLockedRef.current = false;
                    setOpenMenuIndex((current) =>
                      current === sectionIndex ? null : sectionIndex,
                    );
                  }}
                >
                  {section.title}{" "}
                  <ChevronDown
                    className={`h-3.5 w-3.5 opacity-70 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>

                <div
                  className={dropdownPanelClasses(sectionIndex, navSections.length, isOpen)}
                  role="menu"
                  aria-label={section.title}
                >
                  <div
                    className={`relative ${dropdownWidthClass(
                      section,
                      sectionIndex,
                      navSections.length,
                    )} rounded-2xl border border-white/10 bg-surface-page/95 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl`}
                  >
                    <div className={dropdownTriangleClasses(sectionIndex, navSections.length)} aria-hidden />

                    <div className="relative z-10 flex flex-col gap-1">
                      {section.items.map((item, itemIndex) => {
                        const Icon =
                          HEADER_ICON_MAP[item.icon as keyof typeof HEADER_ICON_MAP] || Layers;
                        const itemActive = isHrefActive(item.href);

                        return (
                          <ShellMenuLink
                            key={`${item.label}-${itemIndex}`}
                            href={item.href}
                            locale={locale}
                            openInNewTab={item.openInNewTab}
                            ariaCurrent={itemActive ? "page" : undefined}
                            onClick={() => setOpenMenuIndex(null)}
                            className={`group/item flex items-start gap-3 rounded-xl p-3 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60 ${
                              itemActive
                                ? "bg-brand-orange/10"
                                : "hover:bg-white/5"
                            }`}
                          >
                            <div className="mt-0.5 rounded-lg bg-white/5 p-2.5 text-white/80 transition-colors duration-200 group-hover/item:text-brand-orange">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="mb-0.5 flex items-center gap-2 font-medium text-white">
                                {item.label}
                                {item.badge ? (
                                  <span className="rounded border border-brand-orange/30 bg-brand-orange/10 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-brand-orange">
                                    {item.badge}
                                  </span>
                                ) : null}
                              </div>
                              {item.description ? (
                                <div className="text-xs leading-relaxed text-white/50">
                                  {item.description}
                                </div>
                              ) : null}
                            </div>
                          </ShellMenuLink>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
            <Link
              href={path("/pricing/")}
              aria-current={pricingActive ? "page" : undefined}
              className={`hidden lg:inline-flex rounded-full px-4 py-2 text-[0.9rem] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60 ${
                pricingActive
                  ? "bg-brand-orange/10 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {m.nav.pricing}
            </Link>
            <Link
              href={path("/blog/")}
              aria-current={blogActive ? "page" : undefined}
              className={`hidden lg:inline-flex rounded-full px-4 py-2 text-[0.9rem] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60 ${
                blogActive
                  ? "bg-brand-orange/10 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {m.nav.blog}
            </Link>
            {contactScrollInPlace ? (
              <button
                type="button"
                onClick={() => {
                  trackContactIntent("header-contact");
                  scrollToPrimaryContact();
                }}
                className="hidden lg:inline-flex rounded-full px-4 py-2 text-[0.9rem] font-medium text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60"
              >
                {m.conversionDock.contactNav}
              </button>
            ) : (
              <Link
                href={contactHref}
                onClick={() => trackContactIntent("header-contact")}
                className="hidden lg:inline-flex rounded-full px-4 py-2 text-[0.9rem] font-medium text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60"
              >
                {m.conversionDock.contactNav}
              </Link>
            )}
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-3 z-10 shrink-0 md:gap-4">
            <Link
              href={toggleLocalePath(pathname)}
              className="hidden text-[0.88rem] font-medium text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60 md:block"
              hrefLang={locale === "pt" ? "en" : "pt-BR"}
            >
              {locale === "pt" ? m.nav.langToEn : m.nav.langToPt}
            </Link>
            <TrackedOutboundLink
              href={demoUrl}
              source="header-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap rounded-full bg-brand-gradient px-6 py-2.5 text-[0.95rem] font-semibold text-white transition-all duration-200 hover:bg-brand-gradient-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60"
            >
              {m.nav.requestDemo}
            </TrackedOutboundLink>
            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="ml-2 p-2 text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={isMobileMenuOpen ? (locale === "en" ? "Close menu" : "Fechar menu") : locale === "en" ? "Open menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden /> : <Menu className="w-6 h-6" aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-nav-menu"
        className={`fixed inset-0 z-40 bg-surface-deep/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        style={{ top: "80px" }}
        hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col h-full overflow-y-auto px-6 py-8 pb-24">
          <nav className="flex flex-col gap-6">
            {navSections.map((section, sectionIndex) => (
              <div key={`${section.title}-mobile-${sectionIndex}`}>
                <div className="flex flex-col gap-3">
                  <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">
                    {section.title}
                  </div>
                  {section.items.map((item, itemIndex) => {
                    const Icon =
                      HEADER_ICON_MAP[item.icon as keyof typeof HEADER_ICON_MAP] || Layers;
                    const itemActive = isHrefActive(item.href);

                    return (
                      <ShellMenuLink
                        key={`${item.label}-mobile-${itemIndex}`}
                        href={item.href}
                        locale={locale}
                        openInNewTab={item.openInNewTab}
                        ariaCurrent={itemActive ? "page" : undefined}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 py-2 transition-colors duration-200 ${
                          itemActive
                            ? "text-brand-orange"
                            : "text-white/80 hover:text-white"
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${itemActive ? "text-brand-orange" : "text-white/70"}`} />
                        <span className="text-lg font-medium">{item.label}</span>
                        {item.badge ? (
                          <span className="rounded border border-brand-orange/30 bg-brand-orange/10 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase text-brand-orange">
                            {item.badge}
                          </span>
                        ) : null}
                      </ShellMenuLink>
                    );
                  })}
                </div>

                {sectionIndex < navSections.length - 1 ? (
                  <div className="w-full h-px bg-white/10 my-4" />
                ) : null}
              </div>
            ))}
            <div className="w-full h-px bg-white/10 my-4" />
            <Link
              href={path("/pricing/")}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 text-white font-medium text-lg py-2 border border-white/15 rounded-xl px-4 hover:bg-white/5"
            >
              {m.nav.pricing}
            </Link>
            <Link
              href={path("/blog/")}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 text-white font-medium text-lg py-2 border border-white/15 rounded-xl px-4 hover:bg-white/5"
            >
              {m.nav.blog}
            </Link>
            <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40">
                {m.conversionDock.mobileGroupTitle}
              </div>
              <TrackedOutboundLink
                href={demoUrl}
                source="header-mobile-demo"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-xl bg-brand-gradient py-3 text-center text-base font-semibold text-white transition-all duration-200 hover:bg-brand-gradient-hover"
              >
                {m.conversionDock.linkDemo}
              </TrackedOutboundLink>
              {contactScrollInPlace ? (
                <button
                  type="button"
                  onClick={() => {
                    trackContactIntent("header-mobile-contact");
                    scrollToPrimaryContact();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-center rounded-xl border border-brand-orange/35 bg-brand-orange/10 py-3 text-center text-base font-medium text-white transition-colors duration-200 hover:bg-brand-orange/15"
                >
                  {m.conversionDock.linkForm}
                </button>
              ) : (
                <Link
                  href={contactHref}
                  onClick={() => {
                    trackContactIntent("header-mobile-contact");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-center rounded-xl border border-brand-orange/35 bg-brand-orange/10 py-3 text-center text-base font-medium text-white transition-colors duration-200 hover:bg-brand-orange/15"
                >
                  {m.conversionDock.linkForm}
                </Link>
              )}
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <Link
                href={toggleLocalePath(pathname)}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 rounded-xl border border-white/20 text-white font-medium text-center hover:bg-white/5 transition-colors"
                hrefLang={locale === "pt" ? "en" : "pt-BR"}
              >
                {locale === "pt" ? m.nav.langToEn : m.nav.langToPt}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
