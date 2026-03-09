"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-full transition-all duration-300 px-6 py-3 ${
            scrolled
              ? "glass-panel-light dark:glass-panel-dark shadow-md"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-10 shrink-0">
            <img src="/logo-4unik-by-yoobe.png" alt="4unik by Yoobe" className="h-[48px] w-auto drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 text-[0.88rem] font-medium">
            <Link href="/plataforma" className="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-full transition-all">
              Plataforma
            </Link>
            <Link href="/casos-de-uso" className="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-full transition-all">
              Casos de Uso
            </Link>
            <Link href="/api-integracoes" className="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-full transition-all">
              Integrações e API
            </Link>
            <Link href="https://catalogo.yoobe.co" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-full transition-all">
              Catálogo
            </Link>
            <Link href="https://4unik.com.br" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-full transition-all">
              Logística
            </Link>
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-4 z-10 shrink-0">
            <a
              href="https://4unik.yoobe.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.88rem] font-medium text-white/70 hover:text-white transition-colors hidden md:block"
            >
              Entrar
            </a>
            <a
              href="https://calendly.com/yoobeco/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white hover:bg-brand-orange text-brand-navy-dark hover:text-white px-6 py-2.5 text-[0.95rem] font-semibold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] whitespace-nowrap"
            >
              Solicitar demo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
