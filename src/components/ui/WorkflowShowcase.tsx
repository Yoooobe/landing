"use client";

import FeatureScreensCarousel, {
  type CarouselScreen,
} from "@/components/FeatureScreensCarousel";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

export type WorkflowShowcaseStep = {
  title: string;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
};

type Props = {
  title: string;
  steps: ReadonlyArray<WorkflowShowcaseStep>;
  /** Badge no chrome do browser (ex.: content.badge da página). */
  badge?: string;
  urlBar?: string;
  /** Tempo por passo no autoplay. */
  intervalMs?: number;
  className?: string;
};

const AUTOPLAY_RESUME_MS = 14000;

/**
 * Product tour interativo para a secção "workflow" das páginas de feature:
 * passos clicáveis com barra de progresso gamificada + screenshot grande em
 * moldura de browser (crossfade via FeatureScreensCarousel controlado).
 * Autoplay pausa em interação e desliga com prefers-reduced-motion.
 */
export default function WorkflowShowcase({
  title,
  steps,
  badge,
  urlBar = "app.4unik.io",
  intervalMs = 6000,
  className = "",
}: Props) {
  const reducedMotion = useReducedMotion();
  const baseId = useId();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const len = steps.length;
  const hasAllImages = len > 0 && steps.every((step) => Boolean(step.imageSrc));
  const autoplayOn = Boolean(!reducedMotion && !paused && len > 1 && hasAllImages);

  const screens = useMemo<CarouselScreen[]>(
    () =>
      steps.map((step, i) => ({
        src: step.imageSrc ?? "",
        label: step.title,
        step: String(i + 1).padStart(2, "0"),
        accent: `${String(i + 1).padStart(2, "0")} / ${String(len).padStart(2, "0")}`,
        alt: step.imageAlt ?? step.title,
      })),
    [steps, len],
  );

  useEffect(() => {
    if (!autoplayOn) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % len), intervalMs);
    return () => clearTimeout(t);
  }, [autoplayOn, active, cycle, intervalMs, len]);

  useEffect(
    () => () => {
      if (resumeRef.current) clearTimeout(resumeRef.current);
    },
    [],
  );

  const goTo = useCallback(
    (i: number) => {
      if (len === 0) return;
      setActive(((i % len) + len) % len);
      setPaused(true);
      if (resumeRef.current) clearTimeout(resumeRef.current);
      resumeRef.current = setTimeout(() => {
        setPaused(false);
        setCycle((c) => c + 1);
      }, AUTOPLAY_RESUME_MS);
    },
    [len],
  );

  const onTablistKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      let next: number | null = null;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") next = active + 1;
      else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = active - 1;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = len - 1;
      if (next === null) return;
      event.preventDefault();
      const target = ((next % len) + len) % len;
      goTo(target);
      tabRefs.current[target]?.focus();
    },
    [active, len, goTo],
  );

  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = `${baseId}-panel`;

  if (len === 0) return null;

  // Fallback: conteúdo (ex.: Sanity) sem imagem em todos os passos → grid estático.
  if (!hasAllImages) {
    return (
      <div className={className}>
        <h2 className="max-w-3xl text-3xl font-black md:text-4xl">{title}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="glass-panel-dark rounded-[1.75rem] border-t border-t-white/12 p-6"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-brand-orange/30 bg-brand-orange/12 text-sm font-bold text-brand-orange backdrop-blur-sm">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/58">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <h2 className="max-w-3xl text-3xl font-black md:text-4xl">{title}</h2>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label={title}
          onKeyDown={onTablistKeyDown}
          className="order-2 flex flex-col gap-3 lg:order-1"
        >
          {steps.map((step, i) => {
            const isActive = i === active;

            return (
              <button
                key={step.title}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={tabId(i)}
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => goTo(i)}
                className={`relative overflow-hidden rounded-3xl border text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60 ${
                  isActive
                    ? "glass-panel-dark border-white/12 border-t-white/15 shadow-[0_18px_44px_rgba(0,0,0,0.35)]"
                    : "border-white/8 bg-white/[0.03] hover:-translate-y-0.5 hover:bg-white/[0.06]"
                }`}
              >
                <span className="flex items-start gap-4 p-5">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors duration-300 ${
                      isActive
                        ? "border-brand-orange/40 bg-brand-orange/15 text-brand-orange"
                        : "border-white/12 bg-white/5 text-white/45"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-base font-bold transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/65"
                      }`}
                    >
                      {step.title}
                    </span>
                    <span
                      className={`block overflow-hidden text-sm leading-relaxed text-white/58 transition-all duration-300 ${
                        isActive ? "mt-2 max-h-40 opacity-100" : "mt-0 max-h-0 opacity-0"
                      }`}
                    >
                      {step.body}
                    </span>
                  </span>
                </span>
                <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/8" aria-hidden>
                  {isActive ? (
                    autoplayOn ? (
                      <motion.span
                        key={`${active}-${cycle}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: intervalMs / 1000, ease: "linear" }}
                        style={{ originX: 0 }}
                        className="block h-full bg-brand-orange"
                      />
                    ) : (
                      <span className="block h-full w-full bg-brand-orange/60" />
                    )
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={panelId}
          aria-labelledby={tabId(active)}
          className="order-1 lg:order-2"
        >
          <FeatureScreensCarousel
            variant="admin"
            screens={screens}
            activeIndex={active}
            onActiveIndexChange={goTo}
            autoplay={false}
            urlBarOverride={urlBar}
            badgeTextOverride={badge}
            demoLabelOverride={badge ?? title}
          />
        </div>
      </div>
    </div>
  );
}
