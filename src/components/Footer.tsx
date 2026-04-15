"use client";
/* eslint-disable @next/next/no-img-element */

import UnikWordmark from "@/components/UnikWordmark";
import {
  useSiteSettings,
  useSiteShellMenu,
} from "@/contexts/SiteSettingsContext";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { withBasePath } from "@/lib/basePath";
import { resolveShellHref, isExternalShellHref } from "@/lib/siteShell";
import Link from "next/link";
import { useMemo, type ReactNode } from "react";

type FooterMenuItem = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

type FooterMenuSection = {
  title: string;
  items: FooterMenuItem[];
};

function mergeFooterSections(
  cmsSections: Array<{
    title?: string;
    items?: Array<{
      label?: string;
      href?: string;
      openInNewTab?: boolean;
    }>;
  }> | null | undefined,
  fallbackSections: FooterMenuSection[],
): FooterMenuSection[] {
  const sourceSections = cmsSections?.length ? cmsSections : fallbackSections;

  return sourceSections.map((section, sectionIndex) => {
    const fallbackSection = fallbackSections[sectionIndex];
    const sourceItems = section.items?.length ? section.items : fallbackSection?.items || [];

    return {
      title: section.title || fallbackSection?.title || "Links",
      items: sourceItems.map((item, itemIndex) => {
        const fallbackItem = fallbackSection?.items[itemIndex];
        return {
          label: item.label || fallbackItem?.label || "Item",
          href: item.href || fallbackItem?.href || "/",
          openInNewTab: item.openInNewTab ?? fallbackItem?.openInNewTab,
        };
      }),
    };
  });
}

type FooterShellLinkProps = {
  href: string;
  locale: "pt" | "en";
  openInNewTab?: boolean;
  className: string;
  children: ReactNode;
};

function normalizeFooterHref(href: string, locale: "pt" | "en"): string {
  const normalized = href.replace(/\/+$/, "");

  if (normalized === "/plataforma#gamificacao" || normalized === "/plataforma/#gamificacao") {
    return "/plataforma/motor-gamificacao";
  }

  if (normalized === "/plataforma#wallet" || normalized === "/plataforma/#wallet") {
    return "/plataforma/controle-carteiras";
  }

  if (normalized === "/plataforma#gestor" || normalized === "/plataforma/#gestor") {
    return "/plataforma/painel-gestor";
  }

  if (locale === "en" && normalized.startsWith("/en/plataforma")) {
    return normalized.replace(/^\/en/, "");
  }

  return href;
}

function FooterShellLink({
  href,
  locale,
  openInNewTab,
  className,
  children,
}: FooterShellLinkProps) {
  const resolvedHref = resolveShellHref(normalizeFooterHref(href, locale), locale);
  const isExternal = isExternalShellHref(resolvedHref);
  const shouldOpenInNewTab = openInNewTab ?? isExternal;

  if (isExternal) {
    return (
      <a
        href={resolvedHref}
        target={shouldOpenInNewTab ? "_blank" : undefined}
        rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={resolvedHref} className={className}>
      {children}
    </Link>
  );
}

export default function Footer() {
  const { m, locale } = useLocaleMessages();
  const { sanity } = useSiteSettings();
  const cmsFooterMenu = useSiteShellMenu("footer", locale);
  const f = m.footer;

  const fallbackSections = useMemo<FooterMenuSection[]>(
    () => [
      {
        title: f.colPlatform,
        items: [
          { label: f.links.motor, href: "/plataforma/motor-gamificacao" },
          { label: f.links.wallets, href: "/plataforma/controle-carteiras" },
          { label: f.links.gestor, href: "/plataforma/painel-gestor" },
          { label: f.links.casos, href: "/casos-de-uso" },
        ],
      },
      {
        title: f.colResources,
        items: [
          { label: f.links.blog, href: "/blog/" },
          { label: f.links.api, href: "/api-integracoes" },
          {
            label: f.links.catalogo,
            href: sanity?.rewardsCatalogUrl?.trim() || "https://catalogo.yoobe.co",
            openInNewTab: true,
          },
          {
            label: f.links.logistica,
            href: sanity?.companySiteUrl?.trim() || "https://4unik.com.br",
            openInNewTab: true,
          },
        ],
      },
      {
        title: f.colContact,
        items: [
          {
            label: f.links.demo,
            href: sanity?.calendlyUrl?.trim() || "https://calendly.com/yoobeco/demo",
            openInNewTab: true,
          },
          {
            label: f.links.comercial,
            href: sanity?.whatsappUrl?.trim() || "https://wa.me/554187582060",
            openInNewTab: true,
          },
        ],
      },
    ],
    [
      f,
      sanity?.calendlyUrl,
      sanity?.companySiteUrl,
      sanity?.rewardsCatalogUrl,
      sanity?.whatsappUrl,
    ],
  );

  const footerSections = useMemo(
    () => mergeFooterSections(cmsFooterMenu?.sections, fallbackSections),
    [cmsFooterMenu?.sections, fallbackSections],
  );

  const privacyUrl = sanity?.privacyUrl?.trim() || null;
  const termsUrl = sanity?.termsUrl?.trim() || null;

  return (
    <footer className="bg-brand-navy border-t border-white/5 pt-20 pb-10 text-white/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-3">
              <UnikWordmark
                variant="footer"
                alt="4unik"
                className="opacity-95"
              />
            </div>
            <p className="text-sm mb-6 max-w-xs">{f.blurb}</p>
            <div className="mt-1 flex flex-wrap items-center gap-4 opacity-70 transition-opacity hover:opacity-100">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                {f.backedBy}
              </span>
              <img
                src={withBasePath("/partners/google-badge.jpg")}
                alt={m.investorBar.badgeAlt}
                width={200}
                height={200}
                loading="lazy"
                decoding="async"
                className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-[4.5rem] sm:w-[4.5rem]"
              />
            </div>
          </div>

          {footerSections.map((section, sectionIndex) => (
            <div key={`${section.title}-${sectionIndex}`} className="flex flex-col gap-3">
              <h4 className="text-white font-semibold mb-2">{section.title}</h4>
              {section.items.map((item, itemIndex) => (
                <FooterShellLink
                  key={`${item.label}-${itemIndex}`}
                  href={item.href}
                  locale={locale}
                  openInNewTab={item.openInNewTab}
                  className="text-sm hover:text-brand-orange transition-colors"
                >
                  {item.label}
                </FooterShellLink>
              ))}
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} {f.copyright}</p>
          {privacyUrl || termsUrl ? (
            <div className="flex gap-6 mt-4 md:mt-0">
              {privacyUrl ? (
                <FooterShellLink
                  href={privacyUrl}
                  locale={locale}
                  className="hover:text-white transition-colors"
                >
                  {f.legal}
                </FooterShellLink>
              ) : null}
              {termsUrl ? (
                <FooterShellLink
                  href={termsUrl}
                  locale={locale}
                  className="hover:text-white transition-colors"
                >
                  {f.terms}
                </FooterShellLink>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
