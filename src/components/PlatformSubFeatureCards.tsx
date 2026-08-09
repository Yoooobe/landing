"use client";

import { ZoomableScreenshot } from "@/components/ui/ScreenshotLightbox";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { resolveShellHref } from "@/lib/siteShell";
import { motion } from "framer-motion";
import { ArrowRight, Gamepad2, LayoutDashboard, ShoppingBag, Wallet } from "lucide-react";
import Link from "next/link";

type FeatureCard = {
  icon: React.ElementType;
  iconColor: string;
  borderHover: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  titleKey: "motor" | "wallets" | "manager" | "store";
  descKey: "motor" | "wallets" | "manager" | "store";
};

const FEATURE_CARDS: FeatureCard[] = [
  {
    icon: Gamepad2,
    iconColor: "text-brand-orange",
    borderHover: "hover:border-brand-orange/40",
    imageSrc: "/screens/flows/campanha-passo-1.webp",
    imageAlt: "Motor de Gamificação — Regras e mecânicas de pontuação",
    href: "/plataforma/motor-gamificacao/",
    titleKey: "motor",
    descKey: "motor",
  },
  {
    icon: Wallet,
    iconColor: "text-yoobe-purple",
    borderHover: "hover:border-yoobe-purple/40",
    imageSrc: "/screens/flows/brinde-passo-1.webp",
    imageAlt: "Controle de Carteiras — Saldos e distribuição de pontos",
    href: "/plataforma/controle-carteiras/",
    titleKey: "wallets",
    descKey: "wallets",
  },
  {
    icon: LayoutDashboard,
    iconColor: "text-unik-blue",
    borderHover: "hover:border-unik-blue/40",
    imageSrc: "/screens/dash/dashboard-geral.webp",
    imageAlt: "Painel do Gestor — Dashboard e métricas em tempo real",
    href: "/plataforma/painel-gestor/",
    titleKey: "manager",
    descKey: "manager",
  },
  {
    icon: ShoppingBag,
    iconColor: "text-demo-cyan",
    borderHover: "hover:border-demo-cyan/40",
    imageSrc: "/screens/member-store-home.webp",
    imageAlt: "Loja Corporativa — Resgate de prêmios e produtos",
    href: "/plataforma/loja-resgate/",
    titleKey: "store",
    descKey: "store",
  },
];

export default function PlatformSubFeatureCards() {
  const { m, locale } = useLocaleMessages();

  return (
    <section className="py-20 bg-brand-navy-dark border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white font-heading mb-4">
            {locale === "en" ? "Platform modules" : "Módulos da plataforma"}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-light">
            {locale === "en"
              ? "Each module works together as one integrated operation."
              : "Cada módulo opera em conjunto como uma única operação integrada."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURE_CARDS.map((card, i) => {
            const Icon = card.icon;
            const navEntry = m.nav[card.titleKey];
            const title = navEntry.title;
            const desc = navEntry.desc;
            const href = resolveShellHref(card.href, locale);
            const domainPill =
              card.titleKey === "store"
                ? "loja.4unik.io"
                : `gestor.4unik.io · ${title}`;

            return (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div
                  className={`group glass-panel-dark flex flex-col overflow-hidden rounded-2xl border border-white/12 bg-slate-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(0,0,0,0.55)] ${card.borderHover}`}
                >
                  {/* Browser Chrome Header (ICP Communities Standard) */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-3 py-2 z-10">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500/80" />
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/80" />
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="font-mono text-[0.52rem] text-white/45 tracking-wider truncate max-w-[120px]">
                      {domainPill}
                    </span>
                  </div>

                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                    <ZoomableScreenshot
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      imgClassName="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      className="absolute inset-0 h-full w-full"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
                  </div>

                  <Link href={href} className="flex flex-col gap-3 p-5">
                    <div className="flex items-center gap-2">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
                        <Icon className={`h-4 w-4 ${card.iconColor}`} />
                      </div>
                      <h3 className="font-heading text-base font-bold leading-tight text-white">
                        {title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-white/50">{desc}</p>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white/40 transition-colors group-hover:text-white/80">
                      {locale === "en" ? "Learn more" : "Ver mais"}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-white/50">
          {locale === "en" ? "Want the problem → solution story? " : "Quer a narrativa problema → solução? "}
          <Link
            href={resolveShellHref("/plataforma/campanhas-gamificacao/", locale)}
            className="font-semibold text-brand-orange hover:text-brand-orange/80 transition-colors"
          >
            {locale === "en" ? "Gamification campaigns" : "Campanhas de gamificação"}
            <ArrowRight className="inline w-3.5 h-3.5 ml-0.5 -mt-0.5" />
          </Link>
        </p>
      </div>
    </section>
  );
}
