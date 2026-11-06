"use client";

import { ZoomableScreenshot } from "@/components/ui/ScreenshotLightbox";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Step = {
  number: string;
  title: string;
  desc: string;
  tag: string;
  tagColor: string;
  img: string;
  accentColor: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Basics & slug",
    desc: "Set the campaign name, slug, and branding. The wizard guides each field so the redemption landing page ships with a friendly URL and consistent branding.",
    tag: "Branding",
    tagColor: "#2563eb",
    img: "/screens/admin-campaign-identity.webp",
    accentColor: "#2563eb",
  },
  {
    number: "02",
    title: "Welcome message",
    desc: "Set the banner, headlines, and messages for the experience. Explain the action, the goal, and the campaign mechanics to participants, employees, or partners.",
    tag: "Content",
    tagColor: "#8338ec",
    img: "/screens/admin-campaign-identity.webp",
    accentColor: "#8338ec",
  },
  {
    number: "03",
    title: "Company & products",
    desc: "Pick the company and the products that will stock the redemption page. Build the campaign showcase and set up the reward journey.",
    tag: "Products",
    tagColor: "#ff6b57",
    img: "/screens/admin-campaign-products.webp",
    accentColor: "#ff6b57",
  },
  {
    number: "04",
    title: "Final settings",
    desc: "Publish the campaign with dates, redemption rules, and final tweaks. Yoobe runs the operation through redemption and shipping.",
    tag: "Publishing",
    tagColor: "#22d3ee",
    img: "/screens/admin-campaign-config-desktop.webp",
    accentColor: "#22d3ee",
  },
];

const AUTO_MS = 3800;

export default function CampaignBuilderShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((p) => (p + 1) % STEPS.length), AUTO_MS);
    return () => clearInterval(t);
  }, [paused]);

  const step = STEPS[active];

  return (
    <section className="relative overflow-hidden bg-brand-surface py-20 md:py-28">
      {/* Dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #1e293b 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Radial glow top */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-brand-primary/12 blur-[80px]" />

      <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 shadow-sm mb-5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
              Campaign editor
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07 }}
            className="font-heading text-3xl font-black text-gray-900 md:text-5xl mb-4"
          >
            Build campaigns in{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #ff6b57, #8338ec)",
              }}
            >
              4 steps
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.13 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto"
          >
            From concept to a published redemption page, with real-time desktop and mobile preview for engagement campaigns, goals, and challenges.
          </motion.p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16 items-start">
          {/* Left: step selector */}
          <div className="flex flex-col gap-3">
            {STEPS.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.number}
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                  className={`group relative w-full rounded-2xl border text-left backdrop-blur-xl transition-all duration-300 ${
                    isActive
                      ? "border-white/0 bg-white shadow-lg shadow-black/10"
                      : "border-black/10 bg-white/50 hover:bg-white/80 hover:shadow-sm"
                  }`}
                >
                  {/* Progress bar at top of active card */}
                  {isActive && !paused && (
                    <div
                      className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl origin-left"
                      style={{ backgroundColor: s.accentColor }}
                    >
                      <div
                        className="h-full rounded-t-2xl"
                        style={{
                          animation: `progressShrink ${AUTO_MS}ms linear`,
                          backgroundColor: s.accentColor,
                        }}
                      />
                    </div>
                  )}

                  <div className="flex items-start gap-4 p-5">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-black text-white transition-transform duration-300"
                      style={{
                        backgroundColor: isActive ? s.accentColor : "#e2e8f0",
                        color: isActive ? "#fff" : "#94a3b8",
                      }}
                    >
                      {s.number}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-heading text-base font-bold text-gray-900">
                          {s.title}
                        </span>
                        <span
                          className="hidden md:inline-flex items-center rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest"
                          style={{
                            backgroundColor: `${s.tagColor}18`,
                            color: s.tagColor,
                          }}
                        >
                          {s.tag}
                        </span>
                      </div>
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-sm text-gray-500 leading-relaxed overflow-hidden"
                          >
                            {s.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Dots */}
            <div className="flex justify-center gap-2 pt-2">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setActive(i); setPaused(true); }}
                  aria-label={`Step ${i + 1}`}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? "2rem" : "0.375rem",
                    backgroundColor: i === active ? step.accentColor : "#cbd5e1",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glow behind screenshot */}
            <div
              className="pointer-events-none absolute -inset-4 rounded-3xl blur-2xl opacity-20 transition-colors duration-700"
              style={{ backgroundColor: step.accentColor }}
            />

            {/* Browser chrome */}
            <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl shadow-black/15">
              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-black/10 bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: step.accentColor }}
                  />
                  <span className="font-mono text-[0.6rem] text-gray-400 tracking-wider">
                    admin.yoobe.co · Campaign
                  </span>
                </div>
                <span
                  className="rounded-full px-2 py-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-widest"
                  style={{
                    backgroundColor: `${step.accentColor}18`,
                    color: step.accentColor,
                  }}
                >
                  {step.tag}
                </span>
              </div>

              {/* Screenshot */}
              <div className="relative bg-gray-100" style={{ aspectRatio: "16/10" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 1.02, x: 16 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.98, x: -16 }}
                    transition={{ duration: 0.38, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <ZoomableScreenshot
                      src={step.img}
                      alt={step.title}
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      imgClassName="object-cover object-top"
                      className="absolute inset-0 h-full w-full"
                      unoptimized
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer bar */}
              <div className="flex items-center justify-between border-t border-black/10 bg-gray-50 px-4 py-2">
                <span className="font-mono text-[0.6rem] text-gray-400">
                  Step {step.number} of {STEPS.length}
                </span>
                <span
                  className="text-[0.62rem] font-semibold"
                  style={{ color: step.accentColor }}
                >
                  Real-time preview
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
