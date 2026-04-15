"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { withBasePath } from "@/lib/basePath";
import { resolveShellHref } from "@/lib/siteShell";
import { motion } from "framer-motion";
import { ArrowRight, Gamepad2, LayoutDashboard, ShoppingBag, Wallet } from "lucide-react";
import Image from "next/image";
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
    imageSrc: "/screens/gamif-bolsa.webp",
    imageAlt: "Motor de Gamificação — Bolsa de Pontos e métricas em tempo real",
    href: "/plataforma/motor-gamificacao/",
    titleKey: "motor",
    descKey: "motor",
  },
  {
    icon: Wallet,
    iconColor: "text-yoobe-purple",
    borderHover: "hover:border-yoobe-purple/40",
    imageSrc: "/screens/gamif-niveis.webp",
    imageAlt: "Controle de Carteiras — níveis, multiplicadores e progressão",
    href: "/plataforma/controle-carteiras/",
    titleKey: "wallets",
    descKey: "wallets",
  },
  {
    icon: LayoutDashboard,
    iconColor: "text-unik-blue",
    borderHover: "hover:border-unik-blue/40",
    imageSrc: "/screens/admin-dashboard.webp",
    imageAlt: "Painel do Gestor — dashboard geral",
    href: "/plataforma/painel-gestor/",
    titleKey: "manager",
    descKey: "manager",
  },
  {
    icon: ShoppingBag,
    iconColor: "text-demo-cyan",
    borderHover: "hover:border-demo-cyan/40",
    imageSrc: "/loja-corporativa/store-home.webp",
    imageAlt: "Loja Corporativa — home da loja",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURE_CARDS.map((card, i) => {
            const Icon = card.icon;
            const navEntry = m.nav[card.titleKey];
            const title = navEntry.title;
            const desc = navEntry.desc;
            const href = resolveShellHref(card.href, locale);

            return (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  href={href}
                  className={`group flex flex-col rounded-3xl border border-white/8 bg-surface-panel overflow-hidden transition-all duration-300 ${card.borderHover} hover:shadow-xl hover:-translate-y-1`}
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden">
                    <Image
                      src={withBasePath(card.imageSrc)}
                      alt={card.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-surface-panel/80 via-transparent to-transparent" />
                  </div>

                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                        <Icon className={`w-4 h-4 ${card.iconColor}`} />
                      </div>
                      <h3 className="text-white font-bold text-base font-heading leading-tight">
                        {title}
                      </h3>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                    <div className="flex items-center gap-1.5 text-white/40 text-xs font-semibold group-hover:text-white/70 transition-colors">
                      {locale === "en" ? "Learn more" : "Ver mais"}
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
