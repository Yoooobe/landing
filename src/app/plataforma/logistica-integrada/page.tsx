import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Logística Integrada | 4unik by Yoobe",
};

export default function LogisticaIntegradaPage() {
  return (
    <div className="pt-32 pb-24 bg-[#0a0f18] min-h-screen text-white flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="w-20 h-20 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-8 border border-blue-500/30">
          <Package className="w-10 h-10 text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 font-heading">
          Logística <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Integrada</span>
        </h1>
        <p className="text-xl text-white/60 font-sans leading-relaxed mb-12">
          Esta página será usada para explorar o módulo de entregas D+1, rastreamento Last-Mile e armazenamento de kits onboarding.
        </p>
        <Link href="/plataforma" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-white/5 px-6 py-3 rounded-full">
          <ArrowLeft className="w-4 h-4" /> Voltar para Plataforma
        </Link>
      </div>
    </div>
  );
}
