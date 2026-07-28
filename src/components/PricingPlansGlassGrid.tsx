"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Building2, Rocket, ShieldCheck, Sparkles, Store, Users } from "lucide-react";
import TrackedOutboundLink from "@/components/analytics/TrackedOutboundLink";
import FeatureHint from "@/components/FeatureHint";
import { DEFAULT_CALENDLY_URL } from "@/lib/calendly";
import type { ResolvedPricingPlansContent } from "@/sanity/lib/pricingPlans";

type Props = {
  content: ResolvedPricingPlansContent;
};

const checkIcon =
  "mr-3 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-check-mint-bg text-xs text-check-mint";

const HIGHLIGHT_PATTERN = /(gamifica(?:ção|ções)?|loja corporativa)/gi;

function renderHighlightedLabel(label: string) {
  const parts = label.split(HIGHLIGHT_PATTERN);
  return parts.map((part, idx) => {
    if (!part) return null;
    const isGamification = /^gamifica/i.test(part);
    const isStore = /^loja corporativa/i.test(part);
    if (isGamification) {
      return (
        <span
          key={idx}
          className="mx-0.5 inline-block rounded-md bg-brand-orange/10 px-1.5 py-px font-bold text-brand-orange"
        >
          {part}
        </span>
      );
    }
    if (isStore) {
      return (
        <span
          key={idx}
          className="mx-0.5 inline-block rounded-md bg-accent-sky/10 px-1.5 py-px font-bold text-accent-sky"
        >
          {part}
        </span>
      );
    }
    return part;
  });
}

type PlanVisual = {
  icon: typeof Building2;
  badgeIcon: typeof Building2;
  badgeTop: string;
  badgeBottom: string;
  glowBlob: string;
  glowShadow: string;
  hoverBorder: string;
  iconBg: string;
  iconColor: string;
  wash: string;
  panelWash: string;
};

const PLAN_VISUALS: Record<string, PlanVisual> = {
  essentials: {
    icon: Building2,
    badgeIcon: Store,
    badgeTop: "Loja corporativa",
    badgeBottom: "+5.000 produtos",
    glowBlob: "bg-accent-sky/25",
    glowShadow: "hover:shadow-[0_16px_44px_rgba(62,143,216,0.18)]",
    hoverBorder: "hover:border-accent-sky-border-hover",
    iconBg: "bg-accent-sky/10",
    iconColor: "text-accent-sky",
    wash: "from-accent-sky/[0.06]",
    panelWash: "from-accent-sky/10",
  },
  scale: {
    icon: Sparkles,
    badgeIcon: Award,
    badgeTop: "Gamificação completa",
    badgeBottom: "Loja corporativa",
    glowBlob: "bg-brand-orange/20",
    glowShadow: "hover:shadow-[0_14px_36px_rgba(249,143,22,0.16)]",
    hoverBorder: "",
    iconBg: "bg-brand-orange/10",
    iconColor: "text-brand-orange",
    wash: "from-brand-orange/[0.07]",
    panelWash: "from-brand-orange/10",
  },
  enterprise: {
    icon: Rocket,
    badgeIcon: ShieldCheck,
    badgeTop: "SLA garantido",
    badgeBottom: "CSM dedicado",
    glowBlob: "bg-yoobe-purple/25",
    glowShadow: "hover:shadow-[0_16px_44px_rgba(131,56,236,0.18)]",
    hoverBorder: "hover:border-yoobe-purple/30",
    iconBg: "bg-yoobe-purple/10",
    iconColor: "text-yoobe-purple",
    wash: "from-yoobe-purple/[0.06]",
    panelWash: "from-yoobe-purple/10",
  },
};

const DEFAULT_VISUAL = PLAN_VISUALS.essentials;

export default function PricingPlansGlassGrid({ content }: Props) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const { plans, billingToggle, popularLabel, periodLabel, annualSavingsNote } = content;

  return (
    <div>
      <div className="mb-10 flex justify-center px-4">
        <div className="flex flex-wrap items-center justify-center gap-1 rounded-2xl border border-sky-border bg-white p-1.5 shadow-sm">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`rounded-xl px-3 py-2 text-[11px] font-bold transition-all sm:px-5 sm:text-xs ${
              billingCycle === "monthly" ? "bg-ink-deep text-white shadow-xs" : "text-ink-muted hover:text-ink-deep"
            }`}
          >
            {billingToggle.monthly}
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("annual")}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-[11px] font-bold whitespace-nowrap transition-all sm:px-5 sm:text-xs ${
              billingCycle === "annual" ? "bg-ink-deep text-white shadow-xs" : "text-ink-muted hover:text-ink-deep"
            }`}
          >
            {billingToggle.annual}
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
              {billingToggle.annualBadge}
            </span>
          </button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan, i) => {
          const price = billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice;
          const isCustom = price.toLowerCase().includes("consulta") || price.toLowerCase().includes("custom");
          const visual = PLAN_VISUALS[plan.id] ?? DEFAULT_VISUAL;
          const Icon = visual.icon;
          const BadgeIcon = visual.badgeIcon;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col overflow-hidden rounded-3xl bg-linear-to-b ${visual.wash} to-white p-8 shadow-[0_4px_24px_rgba(22,40,58,0.06)] transition-all duration-300 ${visual.glowShadow} ${
                plan.isPopular
                  ? "border-2 border-brand-orange shadow-[0_8px_40px_rgba(249,143,22,0.18)] hover:scale-[1.015] md:-translate-y-4"
                  : `border border-sky-border hover:-translate-y-1 ${visual.hoverBorder}`
              }`}
            >
              <div className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full ${visual.glowBlob} blur-3xl`} />

              {plan.isPopular ? (
                <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-brand-orange px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(249,143,22,0.4)]">
                  <span className="relative z-10">{popularLabel}</span>
                  <motion.span
                    aria-hidden
                    animate={{ x: ["-120%", "220%"] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-white/40 to-transparent"
                  />
                </div>
              ) : null}

              <div className="relative mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-2xl ${visual.iconBg} ${visual.iconColor} shadow-sm`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-ink-deep">{plan.name}</h3>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-mist px-2.5 py-1 text-[11px] font-semibold text-accent-sky">
                  <Users className="h-3 w-3" /> {plan.capacity}
                </span>
              </div>

              {plan.valueProposition ? (
                <p className="relative mb-3 text-sm font-semibold italic text-accent-sky">{plan.valueProposition}</p>
              ) : null}
              <p className="relative mb-5 text-sm leading-relaxed text-ink-muted">{plan.description}</p>

              <div
                className={`relative mb-6 flex h-32 items-center justify-center overflow-hidden rounded-2xl border border-white bg-linear-to-br ${visual.panelWash} to-white`}
              >
                <div className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full ${visual.glowBlob} blur-3xl`} />
                <div className={`pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full ${visual.glowBlob} opacity-50 blur-3xl`} />

                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  className={`relative flex h-16 w-16 items-center justify-center rounded-3xl ${visual.iconBg} ${visual.iconColor} shadow-[0_10px_28px_rgba(22,40,58,0.1)]`}
                >
                  <Icon className="h-8 w-8" />
                </motion.span>

                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="glass-panel-light absolute left-3 top-3 flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[10px] font-bold text-ink-deep shadow-sm"
                >
                  <BadgeIcon className={`h-3 w-3 ${visual.iconColor}`} />
                  {visual.badgeTop}
                </motion.div>
                <div className="glass-panel-light absolute bottom-3 right-3 rounded-xl px-2.5 py-1.5 text-[10px] font-bold text-ink-deep shadow-sm">
                  {visual.badgeBottom}
                </div>
              </div>

              <div className="relative mb-6">
                {isCustom ? (
                  <span className="text-3xl font-black tracking-tight text-ink-deep">{price}</span>
                ) : (
                  <>
                    <span className="font-heading text-4xl font-black tracking-tight text-ink-deep">{price}</span>
                    <span className="ml-1 text-sm text-ink-muted">{periodLabel}</span>
                  </>
                )}
                {!isCustom && billingCycle === "annual" ? (
                  <p className="mt-1 text-xs font-semibold text-check-mint">{annualSavingsNote}</p>
                ) : null}
              </div>

              <ul className="relative mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.label} className="flex items-start text-sm font-medium text-ink-deep/85">
                    <span className={checkIcon}>✓</span>
                    <span className="leading-relaxed">
                      {renderHighlightedLabel(feature.label)}
                      {feature.hint ? <FeatureHint hint={feature.hint} /> : null}
                    </span>
                  </li>
                ))}
              </ul>

              <TrackedOutboundLink
                href={DEFAULT_CALENDLY_URL}
                source={`pricing-plan-${plan.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  plan.isPopular
                    ? "relative mt-auto block w-full rounded-xl bg-brand-orange py-4 text-center font-bold text-white transition-colors hover:bg-brand-orange-dark"
                    : "relative mt-auto block w-full rounded-xl border border-ink-deep/15 bg-transparent py-4 text-center font-bold text-ink-deep transition-colors hover:bg-sky-mist"
                }
              >
                {plan.ctaText}
              </TrackedOutboundLink>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
