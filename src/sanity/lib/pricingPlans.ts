import type { Locale } from "@/lib/locale";
import { enPricingPage } from "@/messages/segments/en-pricing-page";
import { ptPricingPage } from "@/messages/segments/pt-pricing-page";
import { getMarketingPageBySlug } from "@/sanity/lib/marketingPages";
import type { PricingPlanFeatureDoc, PricingPlanItemDoc, VariableCostItemDoc } from "@/sanity/lib/types";

export type ResolvedPricingFeature = {
  label: string;
  hint?: string;
};

export type ResolvedPricingPlan = {
  id: string;
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  capacity: string;
  description: string;
  valueProposition: string;
  isPopular?: boolean;
  features: ResolvedPricingFeature[];
  ctaText: string;
};

export type ResolvedVariableCostItem = {
  label: string;
  value: string;
  unit: string;
  description: string;
};

export type ResolvedPricingPlansContent = {
  billingToggle: { monthly: string; annual: string; annualBadge: string };
  popularLabel: string;
  periodLabel: string;
  annualSavingsNote: string;
  plans: ResolvedPricingPlan[];
  variableCosts: {
    badge: string;
    title: string;
    subtitle: string;
    items: ResolvedVariableCostItem[];
    disclaimer: string;
  };
};

function fallbackContent(locale: Locale): ResolvedPricingPlansContent {
  const page = locale === "en" ? enPricingPage : ptPricingPage;
  return {
    billingToggle: page.plans.billingToggle,
    popularLabel: page.plans.popularLabel,
    periodLabel: page.plans.periodLabel,
    annualSavingsNote: page.plans.annualSavingsNote,
    plans: page.plans.items.map((p) => ({ ...p, features: p.features.map((f) => ({ ...f })) })),
    variableCosts: { ...page.variableCosts, items: page.variableCosts.items.map((i) => ({ ...i })) },
  };
}

function mapSanityFeature(feature: PricingPlanFeatureDoc): ResolvedPricingFeature | null {
  if (!feature.label) return null;
  return { label: feature.label, hint: feature.hint || undefined };
}

function mapSanityPlan(plan: PricingPlanItemDoc): ResolvedPricingPlan | null {
  if (!plan.planId || !plan.name) return null;
  return {
    id: plan.planId,
    name: plan.name,
    monthlyPrice: plan.monthlyPrice || "",
    annualPrice: plan.annualPrice || "",
    capacity: plan.capacity || "",
    description: plan.description || "",
    valueProposition: plan.valueProposition || "",
    isPopular: Boolean(plan.isPopular),
    features: Array.isArray(plan.features)
      ? plan.features.map(mapSanityFeature).filter((f): f is ResolvedPricingFeature => f !== null)
      : [],
    ctaText: plan.ctaText || "",
  };
}

function mapSanityCostItem(item: VariableCostItemDoc): ResolvedVariableCostItem | null {
  if (!item.label || !item.value) return null;
  return {
    label: item.label,
    value: item.value,
    unit: item.unit || "",
    description: item.description || "",
  };
}

/**
 * Resolve conteúdo de planos/custos variáveis: procura `pricingPlansBlock` e
 * `variableCostsBlock` no documento `marketingPage` (slug "pricing") no Sanity;
 * cai para o fallback local (`pt-pricing-page.ts`/`en-pricing-page.ts`) campo a
 * campo quando o Sanity não tiver o bloco ou os itens — mesmo padrão usado por
 * `getMarketingPageFaqItems`.
 */
export async function getResolvedPricingPlansContent(locale: Locale): Promise<ResolvedPricingPlansContent> {
  const fallback = fallbackContent(locale);

  const page = await getMarketingPageBySlug(locale, "pricing");
  if (!page?.content?.length) return fallback;

  const plansBlock = page.content.find((block) => block._type === "pricingPlansBlock");
  const costsBlock = page.content.find((block) => block._type === "variableCostsBlock");

  const resolved: ResolvedPricingPlansContent = { ...fallback };

  if (plansBlock?._type === "pricingPlansBlock") {
    resolved.billingToggle = {
      monthly: plansBlock.billingToggleMonthlyLabel || fallback.billingToggle.monthly,
      annual: plansBlock.billingToggleAnnualLabel || fallback.billingToggle.annual,
      annualBadge: plansBlock.billingToggleAnnualBadge || fallback.billingToggle.annualBadge,
    };
    const mappedPlans = (plansBlock.plans || []).map(mapSanityPlan).filter((p): p is ResolvedPricingPlan => p !== null);
    if (mappedPlans.length > 0) resolved.plans = mappedPlans;
  }

  if (costsBlock?._type === "variableCostsBlock") {
    const mappedItems = (costsBlock.items || [])
      .map(mapSanityCostItem)
      .filter((i): i is ResolvedVariableCostItem => i !== null);
    resolved.variableCosts = {
      badge: costsBlock.badge || fallback.variableCosts.badge,
      title: costsBlock.title || fallback.variableCosts.title,
      subtitle: costsBlock.subtitle || fallback.variableCosts.subtitle,
      items: mappedItems.length > 0 ? mappedItems : fallback.variableCosts.items,
      disclaimer: costsBlock.disclaimer || fallback.variableCosts.disclaimer,
    };
  }

  return resolved;
}
