import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Loja e Resgate | 4unik",
};

export default function LojaResgatePage() {
  return (
    <div className="pt-32 pb-24 bg-[#0a0f18] min-h-screen text-white flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="w-20 h-20 mx-auto bg-yoobe-neon-pink/20 rounded-full flex items-center justify-center mb-8 border border-yoobe-neon-pink/30">
          <ShoppingBag className="w-10 h-10 text-yoobe-neon-pink" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 font-heading">
          Loja Corporativa e <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-neon-pink to-fuchsia-600">Resgates</span>
        </h1>
        <p className="text-xl text-white/60 font-sans leading-relaxed mb-12">
          Esta página está reservada para o aprofundamento do catálogo de prêmios, experiências B2C para o colaborador e resgate multi-moeda.
        </p>
        <Link href="/plataforma" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-white/5 px-6 py-3 rounded-full">
          <ArrowLeft className="w-4 h-4" /> Voltar para Plataforma
        </Link>
      </div>
    </div>
  );
}
