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
import { isExternalShellHref, resolveShellHref } from "@/lib/siteShell";
import { toggleLocalePath } from "@/lib/locale";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Brain,
  ChevronDown,
  Gamepad2,
  Gift,
  LayoutDashboard,
  Layers,
  Menu,
  Network,
  ShoppingBag,
  Sparkles,
  Trophy,
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
  const sourceSections = cmsSections?.length ? cmsSections : fallbackSections;

  return sourceSections.map((section, sectionIndex) => {
    const fallbackSection = fallbackSections[sectionIndex];
    const sourceItems = section.items?.length ? section.items : fallbackSection?.items || [];

    return {
      title: section.title || fallbackSection?.title || "Menu",
      items: sourceItems.map((item, itemIndex) => {
        const fallbackItem = fallbackSection?.items[itemIndex];
        return {
          label: item.label || fallbackItem?.label || "Item",
          description: item.description ?? fallbackItem?.description,
          href: item.href || fallbackItem?.href || "/",
          badge: item.badge ?? fallbackItem?.badge,
          icon: item.icon ?? fallbackItem?.icon,
          openInNewTab: item.openInNewTab ?? fallbackItem?.openInNewTab,
        };
      }),
    };
  });
}

function dropdownPanelClasses(index: number, total: number): string {
  if (index === 0) {
    return "absolute left-0 top-full pt-3 opacity-0 translate-y-3 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50";
  }

  if (index === total - 1) {
    return "absolute right-0 top-full pt-3 opacity-0 translate-y-3 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50";
  }

  return "absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 translate-y-3 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50";
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
  children: ReactNode;
};

function ShellMenuLink({
  href,
  locale,
  openInNewTab,
  className,
  onClick,
  children,
}: ShellMenuLinkProps) {
  const resolvedHref = resolveShellHref(href, locale);
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
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={resolvedHref} className={className} onClick={onClick}>
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

  const fallbackSections = useMemo<HeaderMenuSection[]>(
    () => [
      {
        title: m.nav.platform,
        items: [
          {
            label: m.nav.overview.title,
            description: m.nav.overview.desc,
            href: "/plataforma",
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
            label: m.nav.cases.title,
            description: m.nav.cases.desc,
            href: "/casos-de-uso",
            icon: "cases",
          },
          {
            label: m.nav.rewardsHub.title,
            description: m.nav.rewardsHub.desc,
            href: sanity?.rewardsCatalogUrl?.trim() || "https://catalogo.yoobe.co",
            icon: "rewards",
            openInNewTab: true,
          },
        ],
      },
      {
        title: m.nav.api,
        items: [
          {
            label: m.nav.apiHub.title,
            description: m.nav.apiHub.desc,
            href: "/api-integracoes",
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

  const loginUrl = sanity?.appLoginUrl?.trim() || null;
  const demoUrl = sanity?.calendlyUrl?.trim() || "https://calendly.com/yoobeco/demo";
  const whatsappUrl = sanity?.whatsappUrl?.trim() || "https://wa.me/554187582060";
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          className={`flex items-center justify-between rounded-full transition-all duration-500 px-6 py-3 ${
            scrolled
              ? "glass-panel-dark shadow-2xl border-white/15"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Logo — wordmark 4unik */}
          <Link href={path("/")} className="z-10 flex min-w-0 shrink-0 items-center">
            <UnikWordmark
              variant="header"
              alt="4unik"
              className="shrink-0 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 text-[0.9rem] font-medium tracking-wide">
            {navSections.map((section, sectionIndex) => (
              <div key={`${section.title}-${sectionIndex}`} className="relative group">
                <button className="flex items-center gap-1.5 text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all">
                  {section.title}{" "}
                  <ChevronDown className="w-3.5 h-3.5 opacity-70 transition-transform group-hover:rotate-180" />
                </button>

                <div className={dropdownPanelClasses(sectionIndex, navSections.length)}>
                  <div
                    className={`relative ${dropdownWidthClass(
                      section,
                      sectionIndex,
                      navSections.length,
                    )} p-2 rounded-2xl bg-surface-page/95 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl`}
                  >
                    <div className={dropdownTriangleClasses(sectionIndex, navSections.length)} />

                    <div className="flex flex-col gap-1 relative z-10">
                      {section.items.map((item, itemIndex) => {
                        const Icon =
                          HEADER_ICON_MAP[item.icon as keyof typeof HEADER_ICON_MAP] || Layers;

                        return (
                          <ShellMenuLink
                            key={`${item.label}-${itemIndex}`}
                            href={item.href}
                            locale={locale}
                            openInNewTab={item.openInNewTab}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/item"
                          >
                            <div className="mt-0.5 bg-white/5 p-2.5 rounded-lg text-white/80 group-hover/item:scale-110 transition-transform">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-white font-medium mb-0.5 flex items-center gap-2">
                                {item.label}
                                {item.badge ? (
                                  <span className="bg-white/10 text-white/80 text-[0.6rem] font-bold px-1.5 py-0.5 rounded border border-white/10 uppercase tracking-wider">
                                    {item.badge}
                                  </span>
                                ) : null}
                              </div>
                              {item.description ? (
                                <div className="text-white/50 text-xs leading-relaxed">
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
            ))}
            <Link
              href={path("/blog/")}
              className="hidden lg:inline-flex text-[0.9rem] font-medium text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-colors"
            >
              {m.nav.blog}
            </Link>
            {contactScrollInPlace ? (
              <button
                type="button"
                onClick={() => scrollToPrimaryContact()}
                className="hidden lg:inline-flex text-[0.9rem] font-medium text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-colors"
              >
                {m.conversionDock.contactNav}
              </button>
            ) : (
              <Link
                href={contactHref}
                className="hidden lg:inline-flex text-[0.9rem] font-medium text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-colors"
              >
                {m.conversionDock.contactNav}
              </Link>
            )}
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-3 z-10 shrink-0 md:gap-4">
            <Link
              href={toggleLocalePath(pathname)}
              className="hidden text-[0.88rem] font-medium text-white/70 hover:text-white transition-colors md:block"
              hrefLang={locale === "pt" ? "en" : "pt-BR"}
            >
              {locale === "pt" ? m.nav.langToEn : m.nav.langToPt}
            </Link>
            {loginUrl ? (
              <a
                href={loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.88rem] font-medium text-white/70 hover:text-white transition-colors hidden md:block"
              >
                {m.nav.login}
              </a>
            ) : null}
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white hover:bg-brand-orange text-brand-navy-dark hover:text-white px-6 py-2.5 text-[0.95rem] font-semibold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] whitespace-nowrap"
            >
              {m.nav.requestDemo}
            </a>
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-white/80 hover:text-white p-2 transition-colors ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-surface-deep/95 backdrop-blur-xl lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ top: "80px" }} // Offset for header
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

                    return (
                      <ShellMenuLink
                        key={`${item.label}-mobile-${itemIndex}`}
                        href={item.href}
                        locale={locale}
                        openInNewTab={item.openInNewTab}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 text-white/80 hover:text-white py-2"
                      >
                        <Icon className="w-5 h-5 text-white/70" />
                        <span className="font-medium text-lg">{item.label}</span>
                        {item.badge ? (
                          <span className="bg-white/10 text-white/70 text-[0.6rem] font-bold px-1.5 py-0.5 rounded border border-white/10 uppercase">
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
              href={path("/blog/")}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 text-white font-medium text-lg py-2 border border-white/15 rounded-xl px-4 hover:bg-white/5"
            >
              {m.nav.blog}
            </Link>
            <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
              <div className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                {m.conversionDock.mobileGroupTitle}
              </div>
              {contactScrollInPlace ? (
                <button
                  type="button"
                  onClick={() => {
                    scrollToPrimaryContact();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 py-3 text-center text-base font-medium text-white hover:bg-white/10"
                >
                  {m.conversionDock.linkForm}
                </button>
              ) : (
                <Link
                  href={contactHref}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 py-3 text-center text-base font-medium text-white hover:bg-white/10"
                >
                  {m.conversionDock.linkForm}
                </Link>
              )}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-xl bg-[#25D366] py-3 text-center text-base font-medium text-white hover:bg-[#128C7E]"
              >
                {m.conversionDock.linkWhatsapp}
              </a>
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-xl border border-white/20 py-3 text-center text-base font-medium text-white hover:bg-white/5"
              >
                {m.conversionDock.linkDemo}
              </a>
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
              {loginUrl ? (
                <a
                  href={loginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl border border-white/20 text-white font-medium text-center hover:bg-white/5 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {m.nav.mobileLogin}
                </a>
              ) : null}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
