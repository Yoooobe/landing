import type { Metadata } from "next";
import Link from "next/link";
import { withBasePath } from "@/lib/basePath";
import "./globals.css";

export const metadata: Metadata = {
  title: "Página não encontrada | 4Unik",
  description: "A página que procuras não existe ou foi movida.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-navy-dark px-6 py-24 text-white">
      {/* Brand wordmark */}
      <Link href={withBasePath("/")} className="mb-16 block opacity-90 hover:opacity-100 transition-opacity">
        <img
          src={withBasePath("/brand/4unik-wordmark@2x.webp")}
          alt="4unik"
          width={200}
          height={59}
          fetchPriority="high"
          className="h-10 w-auto object-contain"
        />
      </Link>

      {/* Error code */}
      <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-brand-orange/80">
        Erro 404
      </p>
      <h1 className="mb-4 font-heading text-7xl font-black tracking-tight text-white sm:text-9xl">
        404
      </h1>
      <p className="mb-2 text-center text-2xl font-bold text-white/90 sm:text-3xl">
        Página não encontrada
      </p>
      <p className="mb-12 max-w-md text-center leading-relaxed text-white/55">
        A URL que procuras não existe ou foi movida. Volta ao início ou fala diretamente com a nossa
        equipa.
      </p>

      {/* CTAs */}
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href={withBasePath("/")}
          className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-xl bg-brand-orange px-8 font-bold text-white shadow-lg shadow-brand-orange/20 hover:bg-brand-orange/90 transition-colors"
        >
          Voltar ao início
        </Link>
        <a
          href="https://wa.me/554187582060"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 font-bold text-white hover:bg-white/10 transition-colors"
        >
          Falar no WhatsApp
        </a>
      </div>

      {/* Subtle decoration */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yoobe-purple/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-brand-orange/5 blur-[100px]" />
      </div>
    </div>
  );
}
