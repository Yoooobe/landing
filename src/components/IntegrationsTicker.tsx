"use client";

import { motion } from "framer-motion";

type Badge = { label: string; dot: string; category: string };

const BANKS: Badge[] = [
  { label: "Nubank",    dot: "#8A05BE", category: "banco" },
  { label: "Itaú",     dot: "#003087", category: "banco" },
  { label: "Bradesco", dot: "#CC092F", category: "banco" },
  { label: "Santander",dot: "#EC0000", category: "banco" },
  { label: "Inter",    dot: "#FF7A00", category: "banco" },
  { label: "BTG",      dot: "#00468b", category: "banco" },
  { label: "Caixa",    dot: "#005CA9", category: "banco" },
  { label: "C6 Bank",  dot: "#242424", category: "banco" },
  { label: "XP Inc",   dot: "#000000", category: "banco" },
  { label: "Sicredi",  dot: "#007A3D", category: "banco" },
];

const PLATFORMS: Badge[] = [
  { label: "Workvivo",  dot: "#0EA5E9", category: "plataforma" },
  { label: "Salesforce",dot: "#00A1E0", category: "plataforma" },
  { label: "SAP",       dot: "#007DB8", category: "plataforma" },
  { label: "Oracle",    dot: "#C74634", category: "plataforma" },
  { label: "ADP",       dot: "#D50000", category: "plataforma" },
  { label: "TOTVS",     dot: "#E31E24", category: "plataforma" },
  { label: "Senior",    dot: "#1E3A5F", category: "plataforma" },
  { label: "Runrun.it", dot: "#FF4F00", category: "plataforma" },
  { label: "Gupy",      dot: "#4CAF50", category: "plataforma" },
  { label: "Sólides",   dot: "#7B2FF7", category: "plataforma" },
];

function TickerRow({
  badges,
  reverse = false,
  speed = 32,
}: {
  badges: Badge[];
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = [...badges, ...badges];
  return (
    <div className="relative overflow-hidden">
      <div
        className="ticker-track flex w-max gap-3"
        style={{
          animation: `${reverse ? "marqueeReverse" : "marquee"} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((b, i) => (
          <span
            key={`${b.label}-${i}`}
            className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2 shadow-sm"
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: b.dot }}
            />
            <span className="whitespace-nowrap font-mono text-sm font-semibold text-gray-700">
              {b.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

type Props = {
  locale?: "pt" | "en";
};

export default function IntegrationsTicker({ locale = "pt" }: Props) {
  const headline =
    locale === "en"
      ? "Connects with your entire ecosystem"
      : "Conecta com todo o seu ecossistema";
  const sub =
    locale === "en"
      ? "Banks, fintechs, and HR platforms already integrated"
      : "Bancos, fintechs e plataformas de RH já integrados";
  const bankLabel = locale === "en" ? "Financial" : "Financeiro";
  const hrLabel = locale === "en" ? "HR & Platforms" : "RH & Plataformas";

  return (
    <section className="relative overflow-hidden bg-brand-cream py-16">
      {/* Subtle pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #000 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-brand-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-brand-cream to-transparent" />

      <div className="container relative z-10 mx-auto px-4 text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 shadow-sm mb-4"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
            Open API
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="mb-2 font-heading text-2xl font-black text-gray-900 md:text-3xl"
        >
          {headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="text-base text-gray-500"
        >
          {sub}
        </motion.p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 mb-1 px-4 container mx-auto">
          <span className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-gray-400">
            {bankLabel}
          </span>
          <div className="h-px flex-1 bg-black/8" />
        </div>
        <TickerRow badges={BANKS} reverse={false} speed={36} />

        <div className="flex items-center gap-3 mt-4 mb-1 px-4 container mx-auto">
          <span className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-gray-400">
            {hrLabel}
          </span>
          <div className="h-px flex-1 bg-black/8" />
        </div>
        <TickerRow badges={PLATFORMS} reverse={true} speed={30} />
      </div>
    </section>
  );
}
