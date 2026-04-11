import AiRoadmap from "@/components/AiRoadmap";
import AdminDashboardHighlight from "@/components/AdminDashboardHighlight";
import ApiSection from "@/components/ApiSection";
import BentoFeatures from "@/components/BentoFeatures";
import CaseStudiesGrid from "@/components/CaseStudiesGrid";
import CasosHero from "@/components/CasosHero";
import CasosPageCta from "@/components/CasosPageCta";
import ClientsSection from "@/components/ClientsSection";
import DedicatedIntegrations from "@/components/DedicatedIntegrations";
import EnterpriseCases from "@/components/EnterpriseCases";
import FourUnikComplementStrip from "@/components/FourUnikComplementStrip";
import GamificationDuality from "@/components/GamificationDuality";
import GamificationSummary from "@/components/GamificationSummary";
import HomeFinalCta from "@/components/HomeFinalCta";
import HomeHero from "@/components/HomeHero";
import HowItWorks from "@/components/HowItWorks";
import InteligenciaPageContent from "@/components/InteligenciaPageContent";
import LogisticsFulfillment from "@/components/LogisticsFulfillment";
import ManagementSection from "@/components/ManagementSection";
import MarketingFaqSection from "@/components/MarketingFaqSection";
import PlatformTabs from "@/components/PlatformTabs";
import PlataformaGamificationEngine from "@/components/PlataformaGamificationEngine";
import PlataformaHero from "@/components/PlataformaHero";
import PlataformaPageCta from "@/components/PlataformaPageCta";
import PlataformaStore from "@/components/PlataformaStore";
import PortableTextContent from "@/components/PortableTextContent";
import PricingSection from "@/components/PricingSection";
import SecurityEnterprise from "@/components/SecurityEnterprise";
import StatsBar from "@/components/StatsBar";
import StoreSection from "@/components/StoreSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustBar from "@/components/TrustBar";
import WhySection from "@/components/WhySection";
import { enCasosPage } from "@/messages/segments/en-casos-page";
import { enPlataforma } from "@/messages/segments/en-plataforma";
import { ptCasosPage } from "@/messages/segments/pt-casos-page";
import { ptPlataforma } from "@/messages/segments/pt-plataforma";
import { getSanityImageUrl } from "@/sanity/lib/image";
import { isExternalShellHref, resolveShellHref } from "@/lib/siteShell";
import type { Locale } from "@/lib/locale";
import type {
  CaseStudyGridBlockDoc,
  CtaBlockDoc,
  FaqBlockDoc,
  FeatureGridBlockDoc,
  LogoStripBlockDoc,
  MarketingPageDoc,
  MarketingPageContentBlock,
  RichTextSectionDoc,
  SplitContentBlockDoc,
  StatsBlockDoc,
  TestimonialBlockDoc,
} from "@/sanity/lib/types";
import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Coins,
  Globe2,
  Link2,
  MessageSquare,
  Package,
  Shield,
  Sparkles,
  Store,
  Target,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import LeadCaptureForm, { type LeadFormVariant } from "@/components/LeadCaptureForm";
import MarketingPageEmptyState from "@/components/MarketingPageEmptyState";
import { PRIMARY_CONTACT_SECTION_ID } from "@/lib/contactAnchor";

type SupportData = {
  platformShowcaseMedia?: import("@/sanity/lib/types").PlatformShowcaseMediaDoc | null;
  homeContent?: import("@/sanity/lib/types").ResolvedHomeContent | null;
};

type Props = {
  locale: Locale;
  page: MarketingPageDoc | null;
  supportData?: SupportData;
};

const featureIconMap = {
  sparkles: Sparkles,
  zap: Zap,
  shield: Shield,
  target: Target,
  "bar-chart-3": BarChart3,
  "brain-circuit": BrainCircuit,
  package: Package,
  store: Store,
  coins: Coins,
  "globe-2": Globe2,
  "message-square": MessageSquare,
  "link-2": Link2,
} as const;

function isExternalHref(href: string): boolean {
  return /^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

function marketingSectionId(key: string | undefined): string | undefined {
  switch (key) {
    case "bento-overview":
      return "platform";
    case "platform-management":
      return "gestao";
    case "platform-store":
      return "loja";
    case "gamification-summary":
      return "gamificacao";
    case "pricing":
      return "planos";
    case "mechanics":
      return "mechanics";
    case "admin-dashboard":
      return "gestor";
    case "gamification-engine-intro":
      return "gamificacao";
    case "store-intro":
      return "loja";
    default:
      return undefined;
  }
}

function marketingExtraAnchorIds(key: string | undefined): string[] {
  switch (key) {
    case "store-intro":
      return ["wallet"];
    default:
      return [];
  }
}

function GenericHeroBlock({ block }: { block: Extract<MarketingPageContentBlock, { _type: "heroBlock" }> }) {
  const imageUrl = getSanityImageUrl(block.image, {
    width: 840,
    fit: "crop",
    quality: 82,
  });
  const opensInNewTab = isExternalHref(block.ctaLink || "");
  const sectionId = block.ctaLink === "#docs" ? "docs" : undefined;

  return (
    <section
      id={sectionId}
      className="relative overflow-hidden border-b border-white/5 bg-[#0a0f18] py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.18),transparent_35%)]" />
      <div className="container relative z-10 mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[minmax(0,1fr)_420px] md:px-6">
        <div className="max-w-3xl">
          {block.headline ? (
            <h1 className="font-heading text-4xl font-black leading-tight text-white md:text-6xl">
              {block.headline}
            </h1>
          ) : null}
          {block.subheadline ? (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
              {block.subheadline}
            </p>
          ) : null}
          {block.ctaText && block.ctaLink ? (
            <div className="mt-10">
              <a
                href={block.ctaLink}
                target={opensInNewTab ? "_blank" : undefined}
                rel={opensInNewTab ? "noopener noreferrer" : undefined}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-orange px-8 font-bold text-white transition-transform hover:scale-[1.02]"
              >
                {block.ctaText}
              </a>
            </div>
          ) : null}
        </div>
        {imageUrl ? (
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl">
            <Image
              src={imageUrl}
              alt={block.image?.alt?.trim() || block.headline || "Imagem da landing"}
              width={840}
              height={680}
              className="h-full w-full rounded-[1.4rem] object-cover"
              sizes="(min-width: 1280px) 420px, (min-width: 768px) 38vw, 92vw"
              priority
              fetchPriority="high"
              decoding="async"
              unoptimized
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function GenericRichTextSection({ block }: { block: RichTextSectionDoc }) {
  const imageUrl = getSanityImageUrl(block.image);

  return (
    <section className="border-b border-white/5 bg-brand-navy-dark py-20">
      <div className="container mx-auto grid max-w-5xl gap-10 px-4 md:grid-cols-[minmax(0,1fr)_320px] md:px-6">
        <div>
          {block.title ? (
            <h2 className="mb-8 font-heading text-3xl font-black text-white md:text-5xl">
              {block.title}
            </h2>
          ) : null}
          <PortableTextContent blocks={block.content} />
        </div>
        {imageUrl ? (
          <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 p-3 shadow-xl">
            <Image
              src={imageUrl}
              alt={block.image?.alt?.trim() || block.title || "Imagem da secao"}
              width={640}
              height={640}
              className="h-full w-full rounded-[1.2rem] object-cover"
              sizes="320px"
              unoptimized
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function GenericFeatureGridBlock({ block }: { block: FeatureGridBlockDoc }) {
  const imageUrl = getSanityImageUrl(block.image);
  const sectionId = marketingSectionId(block._key);
  const columnsClass =
    block.columns === "2"
      ? "md:grid-cols-2"
      : block.columns === "4"
        ? "md:grid-cols-2 xl:grid-cols-4"
        : "md:grid-cols-2 xl:grid-cols-3";

  return (
    <section id={sectionId} className="border-b border-white/5 bg-brand-navy-dark py-20">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {(block.eyebrow || block.title || block.description) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {block.eyebrow ? (
              <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-semibold text-white/70">
                {block.eyebrow}
              </div>
            ) : null}
            {block.title ? (
              <h2 className="font-heading text-3xl font-black text-white md:text-5xl">
                {block.title}
              </h2>
            ) : null}
            {block.description ? (
              <p className="mt-5 text-lg leading-8 text-white/65">{block.description}</p>
            ) : null}
          </div>
        )}
        {imageUrl ? (
          <div className="mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-xl">
            <Image
              src={imageUrl}
              alt={block.image?.alt?.trim() || block.title || "Imagem da seção"}
              width={1440}
              height={900}
              className="h-full w-full rounded-[1.4rem] object-cover"
              sizes="(min-width: 1024px) 960px, 100vw"
              unoptimized
            />
          </div>
        ) : null}
        <div className={`grid gap-6 ${columnsClass}`}>
          {(block.items || []).map((item, index) => {
            const Icon = featureIconMap[item.icon as keyof typeof featureIconMap] || Sparkles;
            const cardContent = (
              <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-brand-orange/30">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-orange/20 bg-brand-orange/10">
                  <Icon className="h-6 w-6 text-brand-orange" />
                </div>
                {item.eyebrow ? (
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                    {item.eyebrow}
                  </div>
                ) : null}
                <h3 className="font-heading text-2xl font-bold text-white">{item.title}</h3>
                {item.description ? (
                  <p className="mt-4 text-base leading-7 text-white/65">{item.description}</p>
                ) : null}
              </div>
            );

            if (item.href) {
              return (
                <a key={`${item.title || "feature"}-${index}`} href={item.href} className="block">
                  {cardContent}
                </a>
              );
            }

            return <div key={`${item.title || "feature"}-${index}`}>{cardContent}</div>;
          })}
        </div>
      </div>
    </section>
  );
}

function GenericSplitContentBlock({ block }: { block: SplitContentBlockDoc }) {
  const imageUrl = getSanityImageUrl(block.image);
  const imageFirst = block.imageSide === "left";
  const sectionId = marketingSectionId(block._key);
  const extraAnchorIds = marketingExtraAnchorIds(block._key);
  const primaryOpensInNewTab = isExternalHref(block.primaryHref || "");
  const secondaryOpensInNewTab = isExternalHref(block.secondaryHref || "");

  const textSection = (
    <div>
      {block.eyebrow ? (
        <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-semibold text-white/70">
          {block.eyebrow}
        </div>
      ) : null}
      {block.title ? (
        <h2 className="font-heading text-3xl font-black text-white md:text-5xl">{block.title}</h2>
      ) : null}
      {block.body?.length ? (
        <div className="mt-6">
          <PortableTextContent blocks={block.body} />
        </div>
      ) : null}
      {block.bullets?.length ? (
        <ul className="mt-8 space-y-3 text-white/70">
          {block.bullets.map((bullet, index) => (
            <li key={`${bullet}-${index}`} className="flex gap-3">
              <Sparkles className="mt-1 h-4 w-4 shrink-0 text-brand-orange" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {(block.primaryLabel && block.primaryHref) || (block.secondaryLabel && block.secondaryHref) ? (
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          {block.primaryLabel && block.primaryHref ? (
            <a
              href={block.primaryHref}
              target={primaryOpensInNewTab ? "_blank" : undefined}
              rel={primaryOpensInNewTab ? "noopener noreferrer" : undefined}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-orange px-8 font-bold text-white transition-transform hover:scale-[1.02]"
            >
              {block.primaryLabel}
            </a>
          ) : null}
          {block.secondaryLabel && block.secondaryHref ? (
            <a
              href={block.secondaryHref}
              target={secondaryOpensInNewTab ? "_blank" : undefined}
              rel={secondaryOpensInNewTab ? "noopener noreferrer" : undefined}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 px-8 font-semibold text-white transition-colors hover:bg-white/5"
            >
              {block.secondaryLabel}
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );

  const imageSection = imageUrl ? (
    <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 p-3 shadow-xl">
      <Image
        src={imageUrl}
        alt={block.image?.alt?.trim() || block.title || "Imagem da seção"}
        width={960}
        height={960}
        className="h-full w-full rounded-[1.2rem] object-cover"
        sizes="(min-width: 768px) 420px, 100vw"
        unoptimized
      />
    </div>
  ) : null;

  return (
    <section
      id={sectionId}
      className="border-b border-white/5 bg-[#0a0f18] py-20"
    >
      {extraAnchorIds.map((anchorId) => (
        <div
          key={anchorId}
          id={anchorId}
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 h-px w-px opacity-0"
        />
      ))}
      <div className="container mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-[minmax(0,1fr)_420px] md:px-6">
        {imageFirst ? imageSection : textSection}
        {imageFirst ? textSection : imageSection}
      </div>
    </section>
  );
}

function renderLogoLink(
  locale: Locale,
  href: string | undefined,
  child: ReactNode,
) {
  if (!href) {
    return child;
  }

  const resolvedHref = resolveShellHref(href, locale);
  if (isExternalShellHref(resolvedHref)) {
    return (
      <a href={resolvedHref} target="_blank" rel="noopener noreferrer" className="block">
        {child}
      </a>
    );
  }

  return <Link href={resolvedHref}>{child}</Link>;
}

function GenericLogoStripBlock({
  block,
  locale,
}: {
  block: LogoStripBlockDoc;
  locale: Locale;
}) {
  const items = (block.collection?.items?.length ? block.collection.items : block.items) || [];
  const displayStyle =
    block.displayStyle ||
    (block.collection?.collectionKey === "trustBar" ? "compact" : "grid");

  if (!items.length) {
    return null;
  }

  if (displayStyle === "compact") {
    return (
      <section
        id={block.sectionId}
        className="border-b border-t border-white/5 bg-surface-page py-12"
      >
        <div className="container mx-auto px-4 text-center">
          {block.title ? (
            <p className="mb-8 text-sm font-bold tracking-widest text-white/40 uppercase">
              {block.title}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 md:gap-16">
            {items.map((item, index) => {
              const imageUrl = getSanityImageUrl(item.logo, {
                width: 240,
                quality: 82,
              });
              const inner = (
                <div
                  key={`${item.name || "logo"}-${index}`}
                  className="flex h-8 items-center justify-center opacity-70 transition-opacity hover:opacity-100 md:h-12"
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={item.logo?.alt?.trim() || item.name || "Logo"}
                      width={240}
                      height={96}
                      className="max-h-full w-auto max-w-[120px] object-contain"
                      sizes="120px"
                      unoptimized
                    />
                  ) : (
                    <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
                      {item.name}
                    </span>
                  )}
                </div>
              );

              return (
                <div key={`${item.name || "logo"}-${index}`}>
                  {renderLogoLink(locale, item.href, inner)}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={block.sectionId}
      className="relative border-t border-white/5 bg-brand-navy-dark py-24"
    >
      <div className="container mx-auto max-w-6xl px-4 text-center md:px-6">
        {block.eyebrow ? (
          <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm font-bold uppercase tracking-wide text-white/80">
            {block.eyebrow}
          </div>
        ) : null}
        {block.title ? (
          <h2 className="font-heading text-3xl font-black text-white md:text-5xl">{block.title}</h2>
        ) : null}
        {block.description ? (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/50">
            {block.description}
          </p>
        ) : null}
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map((item, index) => {
            const imageUrl = getSanityImageUrl(item.logo);
            const inner = (
              <div
                className="group flex min-h-[120px] items-center justify-center rounded-2xl border border-white/5 bg-surface-elevated p-6"
                title={item.logo?.alt?.trim() || item.name || "Logo"}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={item.logo?.alt?.trim() || item.name || "Logo"}
                    width={240}
                    height={120}
                    className="h-auto max-h-14 w-full max-w-[min(100%,12rem)] object-contain opacity-65 grayscale transition-all duration-300 group-hover:scale-[1.06] group-hover:opacity-100 group-hover:grayscale-0 md:max-h-16"
                    sizes="(min-width: 768px) 192px, 160px"
                    unoptimized
                  />
                ) : (
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">
                    {item.name}
                  </span>
                )}
              </div>
            );

            return (
              <div key={`${item.name || "logo"}-${index}`}>
                {renderLogoLink(locale, item.href, inner)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function metricToneClass(tone: unknown): string {
  if (tone === "success") return "text-green-400";
  if (tone === "accent") return "text-yoobe-neon-pink";
  return "text-white";
}

function GenericCaseStudyGridBlock({ block }: { block: CaseStudyGridBlockDoc }) {
  const cases = block.items || [];

  return (
    <section className="border-b border-white/5 bg-brand-navy-dark py-12 pb-32">
      <div className="container mx-auto max-w-7xl px-4">
        {block.title ? (
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-black text-white md:text-5xl">{block.title}</h2>
          </div>
        ) : null}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {cases.map((item, index) => {
            const featured = index === 0 || index === cases.length - 1;
            const content = (
              <div
                className={`glass-panel-dark group relative overflow-hidden rounded-[2.5rem] border border-white/5 p-8 md:p-12 ${
                  featured ? "flex flex-col gap-8 md:col-span-2 md:flex-row" : "flex flex-col"
                }`}
              >
                <div className="absolute inset-0 bg-linear-to-br from-white/2 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className={featured ? "md:w-1/2" : ""}>
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <span className="text-3xl font-bold uppercase tracking-widest text-white">
                        {item.company}
                      </span>
                      {item.industry ? (
                        <div className="mt-1 text-xs font-bold uppercase tracking-wider text-brand-orange">
                          {item.industry}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:bg-white/10">
                      <ArrowUpRight className="h-5 w-5 text-white/50 transition-colors group-hover:text-white" />
                    </div>
                  </div>
                  {item.title ? (
                    <h3 className="mb-4 text-2xl font-bold leading-tight text-white">{item.title}</h3>
                  ) : null}
                  {item.description ? (
                    <p className="mb-6 leading-relaxed text-white/60">{item.description}</p>
                  ) : null}
                  {item.challenge ? (
                    <div className="rounded-xl border border-white/5 bg-[#0a0f18] p-5">
                      {block.challengeLabel ? (
                        <span className="mb-2 block text-xs font-bold uppercase text-white/40">
                          {block.challengeLabel}
                        </span>
                      ) : null}
                      <p className="text-sm text-white/80">{item.challenge}</p>
                    </div>
                  ) : null}
                </div>
                <div
                  className={`${
                    featured
                      ? "mt-8 flex flex-col justify-center md:mt-0 md:w-1/2"
                      : "mt-auto border-t border-white/5 pt-8"
                  }`}
                >
                  {block.resultsLabel ? (
                    <span className="mb-6 block text-xs font-bold uppercase text-white/40">
                      {block.resultsLabel}
                    </span>
                  ) : null}
                  <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
                    {(item.metrics || []).map((metric, metricIndex) => (
                      <div key={`${metric.label || "metric"}-${metricIndex}`} className="flex flex-col gap-1">
                        <span className={`text-3xl font-bold ${metricToneClass(metric.tone)}`}>
                          {metric.value}
                        </span>
                        <span className="text-xs font-medium uppercase text-white/50">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );

            if (item.href) {
              return (
                <a key={`${item.company || "case"}-${index}`} href={item.href} className="block">
                  {content}
                </a>
              );
            }

            return <div key={`${item.company || "case"}-${index}`}>{content}</div>;
          })}
        </div>
      </div>
    </section>
  );
}

function GenericStatsBlock({ block }: { block: StatsBlockDoc }) {
  return (
    <section className="border-b border-white/5 bg-brand-navy py-20">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {block.title ? (
          <h2 className="mb-10 text-center font-heading text-3xl font-black text-white md:text-5xl">
            {block.title}
          </h2>
        ) : null}
        <div className="grid gap-6 md:grid-cols-3">
          {(block.items || []).map((item, index) => (
            <div
              key={item.label || item.value || index}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
            >
              <div className="text-4xl font-black text-brand-orange">{item.value}</div>
              <div className="mt-3 text-lg font-semibold text-white">{item.label}</div>
              {item.supportingText ? (
                <p className="mt-3 text-sm leading-6 text-white/60">{item.supportingText}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GenericTestimonialsBlock({ block }: { block: TestimonialBlockDoc }) {
  return (
    <section className="border-b border-white/5 bg-brand-navy-dark py-20">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {block.title ? (
          <h2 className="mb-10 text-center font-heading text-3xl font-black text-white md:text-5xl">
            {block.title}
          </h2>
        ) : null}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(block.items || []).map((item, index) => (
            <article
              key={`${item.author || "testimonial"}-${index}`}
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              {item.quote ? <p className="text-lg leading-8 text-white/75">&ldquo;{item.quote}&rdquo;</p> : null}
              <div className="mt-6 text-sm text-white/60">
                <div className="font-bold text-white">{item.author}</div>
                <div>
                  {[item.role, item.company].filter(Boolean).join(" • ")}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function resolveCtaLeadVariant(block: CtaBlockDoc): LeadFormVariant {
  const v = block.leadFormVariant;
  if (
    v === "home" ||
    v === "plataforma" ||
    v === "api" ||
    v === "gamificacao" ||
    v === "casos" ||
    v === "inteligencia" ||
    v === "marketing"
  ) {
    return v;
  }
  return "marketing";
}

function blockHasAssignableContactForm(block: MarketingPageContentBlock): boolean {
  if (block._type === "ctaBlock") return Boolean(block.showLeadForm);
  if (block._type === "legacySectionBlock") {
    const s = block.section;
    return (
      s === "casosCta" ||
      s === "plataformaCta" ||
      s === "homeFinalCta" ||
      s === "inteligenciaPage"
    );
  }
  return false;
}

function findLastAssignableContactBlockIndex(blocks: MarketingPageContentBlock[]): number {
  let last = -1;
  blocks.forEach((b, i) => {
    if (blockHasAssignableContactForm(b)) last = i;
  });
  return last;
}

function GenericCtaBlock({
  block,
  pageSlug,
  assignPrimaryContactSection,
}: {
  block: CtaBlockDoc;
  pageSlug: string;
  assignPrimaryContactSection: boolean;
}) {
  const imageUrl = getSanityImageUrl(block.image);
  const showForm = Boolean(block.showLeadForm);
  const leadVariant = resolveCtaLeadVariant(block);

  return (
    <section
      id={showForm && assignPrimaryContactSection ? PRIMARY_CONTACT_SECTION_ID : undefined}
      className="border-b border-white/5 bg-[#101827] py-24"
    >
      <div
        className={`container mx-auto max-w-5xl gap-8 px-4 md:px-6 ${
          showForm
            ? "grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]"
            : "grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_320px]"
        }`}
      >
        <div>
          {block.eyebrow ? (
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white/70">
              {block.eyebrow}
            </span>
          ) : null}
          {block.title ? (
            <h2 className="mt-5 font-heading text-3xl font-black text-white md:text-5xl">
              {block.title}
            </h2>
          ) : null}
          {block.description ? (
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">{block.description}</p>
          ) : null}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            {block.primaryLabel && block.primaryHref ? (
              <a
                href={block.primaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-orange px-8 font-bold text-white transition-transform hover:scale-[1.02]"
              >
                {block.primaryLabel}
              </a>
            ) : null}
            {block.secondaryLabel && block.secondaryHref ? (
              <a
                href={block.secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 px-8 font-semibold text-white transition-colors hover:bg-white/5"
              >
                {block.secondaryLabel}
              </a>
            ) : null}
          </div>
        </div>
        {showForm ? (
          <LeadCaptureForm variant={leadVariant} source={`cta-${pageSlug}`} className="w-full max-w-xl lg:justify-self-end" />
        ) : imageUrl ? (
          <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 p-3 shadow-xl">
            <Image
              src={imageUrl}
              alt={block.image?.alt?.trim() || block.title || "Imagem do CTA"}
              width={640}
              height={640}
              className="h-full w-full rounded-[1.2rem] object-cover"
              sizes="320px"
              unoptimized
            />
          </div>
        ) : null}
      </div>
      {showForm && imageUrl ? (
        <div className="container mx-auto mt-10 max-w-5xl px-4 md:px-6">
          <div className="mx-auto max-w-md overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 p-3 shadow-xl">
            <Image
              src={imageUrl}
              alt={block.image?.alt?.trim() || block.title || "Imagem do CTA"}
              width={640}
              height={640}
              className="h-full w-full rounded-[1.2rem] object-cover"
              sizes="(min-width: 768px) 448px, 100vw"
              unoptimized
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}

function GenericFaqBlock({ block }: { block: FaqBlockDoc }) {
  return (
    <MarketingFaqSection
      faq={{
        badge: "FAQ",
        titleBefore: block.title || "Perguntas frequentes",
        titleGradient: "",
        titleAfter: "",
        items: (block.items || []).map((item) => ({
          q: item.question || "",
          a: item.answer || "",
        })),
      }}
    />
  );
}

function renderLegacySection(
  block: Extract<MarketingPageContentBlock, { _type: "legacySectionBlock" }>,
  locale: Locale,
  supportData: SupportData,
  assignPrimaryContactSection: boolean,
) {
  const contactProp = assignPrimaryContactSection ? undefined : null;
  switch (block.section) {
    case "homeHero":
      return <HomeHero />;
    case "homeFourUnik":
      return <FourUnikComplementStrip />;
    case "homeTrustBar":
      return <TrustBar />;
    case "homeBentoFeatures":
      return <BentoFeatures />;
    case "homePlatformTabs":
      return <PlatformTabs />;
    case "homeStatsBar":
      return <StatsBar />;
    case "homeWhySection":
      return <WhySection />;
    case "homeGamificationSummary":
      return <GamificationSummary />;
    case "homeGamificationDuality":
      return <GamificationDuality />;
    case "homeEnterpriseCases":
      return <EnterpriseCases />;
    case "homeDedicatedIntegrations":
      return <DedicatedIntegrations />;
    case "homeStoreSection":
      return <StoreSection />;
    case "homeApiSection":
      return <ApiSection />;
    case "homeAiRoadmap":
      return <AiRoadmap />;
    case "homeManagementSection":
      return <ManagementSection />;
    case "homeHowItWorks":
      return <HowItWorks />;
    case "homePricingSection":
      return <PricingSection />;
    case "homeTestimonialsSection":
      return <TestimonialsSection />;
    case "homeClientsSection":
      return <ClientsSection />;
    case "homeFinalCta":
      return <HomeFinalCta contactSectionId={contactProp} />;
    case "plataformaHero":
      return <PlataformaHero />;
    case "plataformaAdminDashboard":
      return (
        <AdminDashboardHighlight
          showcaseMedia={supportData.platformShowcaseMedia}
        />
      );
    case "plataformaGamificationEngine":
      return (
        <PlataformaGamificationEngine
          gamificacaoFeatureCards={supportData.platformShowcaseMedia?.gamificacaoFeatureCards}
        />
      );
    case "plataformaStore":
      return (
        <PlataformaStore showcaseMedia={supportData.platformShowcaseMedia} />
      );
    case "plataformaLogistics":
      return (
        <LogisticsFulfillment
          showcaseMedia={supportData.platformShowcaseMedia}
        />
      );
    case "plataformaAiRoadmap":
      return <AiRoadmap homeContent={supportData.homeContent} />;
    case "plataformaSecurity":
      return (
        <SecurityEnterprise
          showcaseMedia={supportData.platformShowcaseMedia}
        />
      );
    case "plataformaFaq":
      return <MarketingFaqSection faq={(locale === "en" ? enPlataforma : ptPlataforma).faq} />;
    case "plataformaCta":
      return <PlataformaPageCta contactSectionId={contactProp} />;
    case "inteligenciaPage":
      return <InteligenciaPageContent contactSectionId={contactProp} />;
    case "casosHero":
      return <CasosHero />;
    case "casosGrid":
      return <CaseStudiesGrid />;
    case "casosFaq":
      return <MarketingFaqSection faq={(locale === "en" ? enCasosPage : ptCasosPage).faq} />;
    case "casosCta":
      return <CasosPageCta contactSectionId={contactProp} />;
    default:
      return null;
  }
}

function renderBlock(
  block: MarketingPageContentBlock,
  locale: Locale,
  supportData: SupportData,
  pageSlug: string,
  assignPrimaryContactSection: boolean,
) {
  switch (block._type) {
    case "heroBlock":
      return <GenericHeroBlock block={block} />;
    case "featureGridBlock":
      return <GenericFeatureGridBlock block={block} />;
    case "caseStudyGridBlock":
      return <GenericCaseStudyGridBlock block={block} />;
    case "splitContentBlock":
      return <GenericSplitContentBlock block={block} />;
    case "logoStripBlock":
      return <GenericLogoStripBlock block={block} locale={locale} />;
    case "legacySectionBlock":
      return renderLegacySection(block, locale, supportData, assignPrimaryContactSection);
    case "richTextSection":
      return <GenericRichTextSection block={block} />;
    case "ctaBlock":
      return (
        <GenericCtaBlock
          block={block}
          pageSlug={pageSlug}
          assignPrimaryContactSection={assignPrimaryContactSection}
        />
      );
    case "faqBlock":
      return <GenericFaqBlock block={block} />;
    case "statsBlock":
      return <GenericStatsBlock block={block} />;
    case "testimonialBlock":
      return <GenericTestimonialsBlock block={block} />;
    default:
      return null;
  }
}

export default function MarketingPageRenderer({
  locale,
  page,
  supportData = {},
}: Props) {
  if (!page?.content?.length) {
    return <MarketingPageEmptyState locale={locale} />;
  }

  const pageSlug = page.slug || "page";

  const lastContactIdx = findLastAssignableContactBlockIndex(page.content);

  const renderedBlocks = page.content
    .map((block, index) => ({
      key: block._key || `${block._type}-${index}`,
      node: renderBlock(
        block,
        locale,
        supportData,
        pageSlug,
        lastContactIdx >= 0 && index === lastContactIdx,
      ),
    }))
    .filter((entry) => entry.node !== null);

  if (!renderedBlocks.length) {
    return <MarketingPageEmptyState locale={locale} />;
  }

  return (
    <div className="min-h-screen bg-brand-navy-dark text-white">
      {renderedBlocks.map((entry) => (
        <div key={entry.key}>
          {entry.node}
        </div>
      ))}
    </div>
  );
}
