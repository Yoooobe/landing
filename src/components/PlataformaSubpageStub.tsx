"use client";

import Link from "next/link";
import { ArrowLeft, Package, ShoppingBag, Zap } from "lucide-react";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";

const icons = {
  motor: Zap,
  logistica: Package,
  loja: ShoppingBag,
} as const;

type Variant = keyof typeof icons;

const gradients: Record<
  Variant,
  { iconWrap: string; title: string }
> = {
  motor: {
    iconWrap: "bg-brand-orange/20 border border-brand-orange/30",
    title: "text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500",
  },
  logistica: {
    iconWrap: "bg-blue-500/20 border border-blue-500/30",
    title: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400",
  },
  loja: {
    iconWrap: "bg-yoobe-neon-pink/20 border border-yoobe-neon-pink/30",
    title: "text-transparent bg-clip-text bg-gradient-to-r from-yoobe-neon-pink to-fuchsia-600",
  },
};

export default function PlataformaSubpageStub({ variant }: { variant: Variant }) {
  const { m, path } = useLocaleMessages();
  const copy = m.landingMore.plataformaStubs[variant];
  const Icon = icons[variant];
  const g = gradients[variant];

  return (
    <div className="pt-32 pb-24 bg-[#0a0f18] min-h-screen text-white flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div
          className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-8 ${g.iconWrap}`}
        >
          <Icon className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 font-heading">
          {copy.titleBefore}{" "}
          <span className={g.title}>{copy.titleGradient}</span>
        </h1>
        <p className="text-xl text-white/60 font-sans leading-relaxed mb-12">{copy.body}</p>
        <Link
          href={path("/plataforma")}
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-white/5 px-6 py-3 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" /> {m.landingMore.plataformaStubs.back}
        </Link>
      </div>
    </div>
  );
}
