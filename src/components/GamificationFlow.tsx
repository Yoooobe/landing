"use client";

import { useState, type KeyboardEvent, Fragment } from "react";
import { motion } from "framer-motion";
import { Gift, LayoutDashboard, Target, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ResolvedGamificacaoContent } from "@/sanity/lib/types";

const CONNECTOR_LABELS = ["< 24h", "Automático", "Imediato"] as const;

type StepNum = "01" | "02" | "03" | "04";

const STEP_VISUAL: Record<
  StepNum,
  {
    Icon: LucideIcon;
    headerGradient: string;
    iconTint: string;
  }
> = {
  "01": {
    Icon: LayoutDashboard,
    headerGradient: "from-yoobe-purple/50 via-yoobe-purple/25 to-unik-blue-soft/35",
    iconTint: "text-white/95",
  },
  "02": {
    Icon: Target,
    headerGradient: "from-unik-blue-soft/45 via-demo-cyan/25 to-demo-cyan/30",
    iconTint: "text-demo-cyan/95",
  },
  "03": {
    Icon: Trophy,
    headerGradient: "from-demo-cyan/40 via-emerald-500/20 to-emerald-500/25",
    iconTint: "text-emerald-200",
  },
  "04": {
    Icon: Gift,
    headerGradient: "from-brand-orange/45 via-yoobe-neon-pink/25 to-yoobe-neon-pink/30",
    iconTint: "text-yoobe-neon-pink/95",
  },
};

function isStepNum(n: string): n is StepNum {
  return n === "01" || n === "02" || n === "03" || n === "04";
}

export default function GamificationFlow({ content: f }: { content: ResolvedGamificacaoContent["flow"] }) {
  const [activeStep, setActiveStep] = useState<StepNum>("01");

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-surface-deep py-24">
      <div className="absolute left-1/2 top-0 hidden h-full w-px bg-linear-to-b from-transparent via-demo-cyan/30 to-transparent md:block" aria-hidden />

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white/70">{f.badge}</span>
          <h2 className="mb-6 font-heading text-3xl font-black text-white md:text-5xl">
            {f.titleBefore}{" "}
            <span className="bg-linear-to-r from-yoobe-purple via-unik-blue-soft to-demo-cyan bg-clip-text text-transparent">{f.titleGradient}</span>{" "}
            {f.titleAfter}
          </h2>
          <p className="font-sans text-lg text-white/60">{f.sub}</p>
        </div>

        {/* Step navigator */}
        <nav
          className="mb-12 flex flex-wrap items-center justify-center gap-2 md:mb-16 md:gap-3"
          aria-label="Steps"
        >
          {f.steps.map((step) => {
            const num = isStepNum(step.num) ? step.num : "01";
            const isActive = activeStep === num;
            const shortLabel = step.title.split(/\s+/).slice(0, 2).join(" ");
            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStep(num)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-left text-sm font-semibold transition-all md:px-4 md:py-2.5 ${
                  isActive
                    ? "border-demo-cyan/50 bg-demo-cyan/15 text-white shadow-[0_0_24px_-4px_rgba(34,211,238,0.45)]"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="font-mono text-xs text-demo-cyan/90 md:text-sm">{step.num}</span>
                <span className="max-w-40 truncate md:max-w-none">{shortLabel}</span>
              </button>
            );
          })}
        </nav>

        <div className="relative md:space-y-0">
          {f.steps.map((step, index) => {
            const num = isStepNum(step.num) ? step.num : "01";
            const isActive = activeStep === num;
            const visual = STEP_VISUAL[num];
            const StepIcon = visual.Icon;

            const activate = () => setActiveStep(num);

            const onCardKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                activate();
              }
            };

            return (
              <Fragment key={step.num}>
                <div className="relative flex w-full flex-col items-center last:mb-0 md:mb-16 md:flex-row md:justify-between">
                  {step.align === "left" && <div className="hidden w-5/12 md:block" />}

                  <motion.div
                    className="w-full shrink-0 md:w-5/12"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={activate}
                      onKeyDown={onCardKeyDown}
                      className={`group cursor-pointer overflow-hidden rounded-2xl border bg-surface-panel transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-demo-cyan/70 ${
                        isActive
                          ? "scale-[1.02] border-demo-cyan/60 shadow-[0_0_40px_-8px_rgba(34,211,238,0.35)]"
                          : "border-white/10 hover:border-demo-cyan/25 hover:bg-surface-elevated"
                      }`}
                    >
                      <div
                        className={`relative flex min-h-[120px] items-center justify-center bg-linear-to-br px-6 py-8 md:min-h-[140px] ${visual.headerGradient}`}
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),transparent_65%)]" />
                        <StepIcon
                          className={`relative z-10 h-14 w-14 drop-shadow-lg md:h-16 md:w-16 ${visual.iconTint}`}
                          strokeWidth={1.35}
                          aria-hidden
                        />
                      </div>
                      <div className="p-6 md:p-8">
                        <div className="mb-6 flex flex-wrap items-center gap-3">
                          <span className="bg-linear-to-r from-yoobe-purple to-demo-cyan bg-clip-text font-mono text-3xl font-bold text-transparent">
                            {step.num}
                          </span>
                          <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">{step.role}</span>
                        </div>
                        <h3 className="mb-4 font-heading text-2xl font-bold text-white transition-colors group-hover:text-yoobe-purple">{step.title}</h3>
                        <p className="mb-6 font-sans text-base leading-relaxed text-white/60">{step.desc}</p>
                        <div className="flex flex-wrap gap-3 font-sans">
                          {step.features.map((feat) => (
                            <span
                              key={feat.text}
                              className="inline-flex items-center gap-2 rounded-lg border border-white/5 bg-black/40 px-3 py-1.5 text-sm text-white/80"
                            >
                              <span>{feat.icon}</span>
                              {feat.text}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {step.align === "right" && <div className="hidden w-5/12 md:block" />}

                  <div className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                    <motion.div
                      className={`rounded-full border-4 border-surface-deep bg-surface-panel shadow-[0_0_0_2px_rgba(34,211,238,0.35)] ${
                        isActive ? "h-10 w-10" : "h-8 w-8"
                      }`}
                      animate={isActive ? { scale: [1, 1.06, 1] } : {}}
                      transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
                    >
                      {isActive ? (
                        <div className="relative h-full w-full overflow-hidden rounded-full">
                          <div className="h-full w-full rounded-full bg-linear-to-br from-yoobe-purple to-demo-cyan" />
                          <motion.div
                            className="pointer-events-none absolute inset-0 rounded-full border-2 border-white/40"
                            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                        </div>
                      ) : (
                        <div className="h-full w-full animate-pulse rounded-full bg-linear-to-br from-yoobe-purple to-demo-cyan" />
                      )}
                    </motion.div>
                  </div>
                </div>

                {index < f.steps.length - 1 && (
                  <div className="relative hidden h-14 w-full md:block" aria-hidden>
                    <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                      <span className="whitespace-nowrap rounded-full border border-demo-cyan/30 bg-surface-deep/95 px-3 py-1 text-xs font-semibold tracking-wide text-demo-cyan/90 shadow-lg backdrop-blur-sm">
                        {CONNECTOR_LABELS[index]}
                      </span>
                    </div>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
