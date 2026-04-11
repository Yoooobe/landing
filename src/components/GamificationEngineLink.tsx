"use client";

import FeatureScreensCarousel from "@/components/FeatureScreensCarousel";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { resolveShellHref } from "@/lib/siteShell";
import { motion } from "framer-motion";
import { ArrowRight, BellRing, Gamepad2, GitBranch, Target } from "lucide-react";
import Link from "next/link";

const BULLETS_PT = [
  {
    icon: Target,
    title: "Campanhas com páginas próprias",
    body: "Hackathons, desafios, metas e onboarding com vigência, elegibilidade e preview em tempo real.",
  },
  {
    icon: GitBranch,
    title: "Motor nativo ou integrado",
    body: "Use a 4unik como engine principal ou conecte plataformas externas via API, webhook ou ação manual.",
  },
  {
    icon: BellRing,
    title: "Comunicação e fulfillment acoplados",
    body: "Da landing page ao envio físico: carteira, catálogo, pedidos e logística seguem a mesma regra da campanha.",
  },
];

const BULLETS_EN = [
  {
    icon: Target,
    title: "Campaigns with their own pages",
    body: "Hackathons, challenges, goals, and onboarding with timing, eligibility, and live preview.",
  },
  {
    icon: GitBranch,
    title: "Native or integrated engine",
    body: "Run 4unik as the core engine or plug in external platforms via API, webhook, or manual action.",
  },
  {
    icon: BellRing,
    title: "Messaging and fulfillment in one flow",
    body: "From landing page to physical delivery: wallet, catalog, orders, and logistics follow the same campaign rule.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
} as const;

export default function GamificationEngineLink() {
  const { locale } = useLocaleMessages();
  const bullets = locale === "en" ? BULLETS_EN : BULLETS_PT;
  const engineHref = resolveShellHref("/plataforma/motor-gamificacao/", locale);

  return (
    <section className="py-24 bg-[#0a0f18] border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-orange/8 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Text column */}
          <motion.div
            className="w-full lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={itemVariants}>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-sm font-semibold text-brand-orange">
                <Gamepad2 className="w-4 h-4" />
                {locale === "en" ? "Gamification Engine" : "Motor de Gamificação"}
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-black text-white leading-tight font-heading mb-6"
            >
              {locale === "en" ? (
                <>
                  Rules, campaigns and{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-orange to-red-500">
                    redemptions in one engine
                  </span>
                </>
              ) : (
                <>
                  Regras, campanhas e{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-orange to-red-500">
                    resgates em um único motor
                  </span>
                </>
              )}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-white/55 leading-relaxed mb-10 font-light"
            >
              {locale === "en"
                ? "The Gamification Engine is the operational layer behind every campaign in 4unik — connecting goals, points, the corporate store, and delivery without parallel operations."
                : "O Motor de Gamificação é a camada operacional por trás de cada campanha na 4unik — conectando metas, pontos, loja corporativa e entrega sem operação paralela."}
            </motion.p>

            <div className="space-y-4 mb-10">
              {bullets.map((bullet, i) => {
                const Icon = bullet.icon;
                return (
                  <motion.div
                    key={bullet.title}
                    variants={itemVariants}
                    custom={i}
                    className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/3 p-5 hover:border-brand-orange/20 transition-colors"
                  >
                    <div className="shrink-0 mt-0.5 p-2.5 rounded-xl bg-brand-orange/10 border border-brand-orange/20">
                      <Icon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base mb-1 font-heading">
                        {bullet.title}
                      </h4>
                      <p className="text-sm text-white/50 leading-relaxed">{bullet.body}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={itemVariants}>
              <Link
                href={engineHref}
                className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-bold text-brand-navy-dark transition-all hover:scale-105 hover:shadow-[0_0_24px_rgba(249,143,22,0.4)]"
              >
                {locale === "en" ? "Explore the engine" : "Explorar o motor"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Carousel column */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <FeatureScreensCarousel variant="campaign" intervalMs={4000} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
