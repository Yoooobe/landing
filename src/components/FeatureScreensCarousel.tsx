"use client";

import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export type CarouselScreen = {
  src: string;
  label: string;
  step: string;
  accent: string;
};

type VariantConfig = {
  screens: CarouselScreen[];
  urlBar: string;
  badgeText: string;
  badgeClass: string;
  dotColor: string;
  accentTextClass: string;
  poweredBy?: string;
  demoLabel: string;
};

const VARIANTS: Record<string, VariantConfig> = {
  pix: {
    screens: [
      { src: "/screens/pix-step-1-banks.webp", label: "Pix via Open Finance", step: "01", accent: "Nubank · Itaú · Santander" },
      { src: "/screens/pix-step-2-form.webp", label: "Autenticação segura", step: "02", accent: "CPF + CNPJ validados" },
      { src: "/screens/pix-step-3-success.webp", label: "Pagamento confirmado", step: "03", accent: "100% automatizado" },
    ],
    urlBar: "pay.4unik.io · Open Finance",
    badgeText: "API Integration",
    badgeClass: "border-demo-cyan/30 bg-demo-cyan/10 text-demo-cyan",
    dotColor: "bg-demo-cyan",
    accentTextClass: "text-demo-cyan/80",
    poweredBy: "Pluggy",
    demoLabel: "Demo ao vivo · Pix Open Finance",
  },
  member: {
    screens: [
      { src: "/screens/member-store-home.webp", label: "Loja de recompensas", step: "01", accent: "Catálogo personalizado" },
      { src: "/screens/member-orders.webp", label: "Minha conta", step: "02", accent: "Pedidos & devoluções" },
      { src: "/screens/member-points.webp", label: "Histórico de pontos", step: "03", accent: "Saldo em tempo real" },
    ],
    urlBar: "loja.4unik.io",
    badgeText: "Colaborador",
    badgeClass: "border-brand-orange/30 bg-brand-orange/10 text-brand-orange",
    dotColor: "bg-brand-orange",
    accentTextClass: "text-brand-orange/80",
    demoLabel: "Demo ao vivo · Experiência do time",
  },
  admin: {
    screens: [
      { src: "/screens/admin-dashboard.webp", label: "Dashboard geral", step: "01", accent: "Últimos 30 dias" },
      { src: "/screens/admin-campaign-identity.webp", label: "Editor de campanha", step: "02", accent: "Preview em tempo real" },
      { src: "/screens/admin-campaign-products.webp", label: "Seleção de produtos", step: "03", accent: "Assistente IA integrado" },
    ],
    urlBar: "gestor.4unik.io",
    badgeText: "Gestor",
    badgeClass: "border-yoobe-purple/30 bg-yoobe-purple/10 text-yoobe-purple",
    dotColor: "bg-yoobe-purple",
    accentTextClass: "text-yoobe-purple/80",
    demoLabel: "Demo ao vivo · Painel do gestor",
  },
  campaign: {
    screens: [
      { src: "/screens/admin-campaign-identity.webp", label: "Identidade da campanha", step: "01", accent: "Slug + cores personalizadas" },
      { src: "/screens/admin-campaign-products.webp", label: "Seleção de produtos", step: "02", accent: "Assistente IA integrado" },
      { src: "/screens/admin-campaign-config-desktop.webp", label: "Preview em tempo real", step: "03", accent: "Desktop e mobile" },
    ],
    urlBar: "gestor.4unik.io · Campanha",
    badgeText: "Campaign",
    badgeClass: "border-brand-orange/30 bg-brand-orange/10 text-brand-orange",
    dotColor: "bg-brand-orange",
    accentTextClass: "text-brand-orange/80",
    demoLabel: "Demo ao vivo · Editor de campanhas",
  },
};

type Props = {
  variant?: "pix" | "member" | "admin" | "campaign";
  screens?: CarouselScreen[];
  locale?: "pt" | "en";
  className?: string;
  intervalMs?: number;
};

export default function FeatureScreensCarousel({
  variant = "pix",
  screens: customScreens,
  locale = "pt",
  className = "",
  intervalMs = 3400,
}: Props) {
  const [active, setActive] = useState(0);
  const cfg = VARIANTS[variant];
  const screens = customScreens ?? cfg.screens;

  useEffect(() => {
    setActive(0);
  }, [variant]);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % screens.length), intervalMs);
    return () => clearInterval(t);
  }, [screens.length, intervalMs]);

  const screen = screens[active];
  if (!screen) return null;

  const isLight = variant === "pix";

  return (
    <div className={`relative w-full ${className}`}>
      {/* Outer glow */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-[2.2rem] blur-3xl ${
          variant === "member"
            ? "bg-linear-to-br from-brand-orange/22 via-unik-blue/14 to-demo-cyan/12"
            : variant === "admin"
            ? "bg-linear-to-br from-yoobe-purple/24 via-unik-blue/16 to-demo-cyan/12"
            : "bg-linear-to-br from-demo-cyan/22 via-unik-blue/16 to-yoobe-purple/12"
        }`}
      />

      {/* Browser chrome */}
      <div className="relative overflow-hidden rounded-[2.2rem] border border-white/12 bg-[#0d1424] shadow-[0_32px_80px_rgba(0,0,0,0.55)]">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/8 bg-[#111827]/90 px-4 py-3 backdrop-blur-md sm:px-5">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/6 px-3 py-1">
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dotColor} opacity-90`} />
            <span className="font-mono text-[0.6rem] tracking-wider text-white/45">{cfg.urlBar}</span>
          </div>
          <span className={`rounded-full border px-2 py-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-widest ${cfg.badgeClass}`}>
            {locale === "en" && variant === "member" ? "Employee" : locale === "en" && variant === "admin" ? "Manager" : cfg.badgeText}
          </span>
        </div>

        {/* Screen area */}
        <div
          className={`relative ${isLight ? "bg-[#f8fafc]" : "bg-[#111827]"}`}
          style={{ aspectRatio: "16/11" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.025 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.975 }}
              transition={{ duration: 0.36, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full overflow-hidden"
            >
              <Image
                src={withBasePath(screen.src)}
                alt={screen.label}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top"
                priority={active === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Step badge */}
          <div className="pointer-events-none absolute left-3 top-3 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${active}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 shadow-sm backdrop-blur-sm ${
                  isLight
                    ? "border-unik-blue/30 bg-white/90"
                    : "border-white/20 bg-[#1a2236]/90"
                }`}
              >
                <span className={`font-mono text-[0.58rem] font-bold ${isLight ? "text-unik-blue" : "text-demo-cyan"}`}>
                  {screen.step}
                </span>
                <span className={`text-[0.58rem] font-semibold ${isLight ? "text-gray-600" : "text-white/70"}`}>
                  {screen.label}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t border-white/8 bg-[#0d1424]/95 px-4 py-2.5 sm:px-5">
          <div className="flex items-center gap-2">
            {cfg.poweredBy && (
              <>
                <span className="text-[0.6rem] text-white/30">Powered by</span>
                <span className="text-[0.62rem] font-semibold text-white/55">{cfg.poweredBy}</span>
                <span className="h-1 w-1 rounded-full bg-white/15" />
              </>
            )}
            <AnimatePresence mode="wait">
              <motion.span
                key={`accent-${active}`}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.22 }}
                className={`text-[0.6rem] ${cfg.accentTextClass}`}
              >
                {screen.accent}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {screens.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Tela ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? `w-4 ${cfg.dotColor}` : "w-1.5 bg-white/20 hover:bg-white/35"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Demo label */}
      <div className="mt-3 flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-white/40 backdrop-blur-sm">
          <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${cfg.dotColor}`} />
          {cfg.demoLabel}
        </span>
      </div>
    </div>
  );
}
