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
            <span className="text-xl font-bold tracking-tight text-foreground">
              4unik<span className="font-normal text-muted-foreground"> by Yoobe</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/plataforma" className="text-foreground hover:text-brand-orange transition-colors">
              Plataforma
            </Link>
            <Link href="/casos-de-uso" className="text-muted-foreground hover:text-brand-orange transition-colors">
              Casos de Uso
            </Link>
            <Link href="/api-integracoes" className="text-muted-foreground hover:text-brand-orange transition-colors">
              Integrações e API
            </Link>
            <Link href="https://catalogo.yoobe.co" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-brand-orange transition-colors">
              Catálogo
            </Link>
            <Link href="https://4unik.com.br" className="text-muted-foreground hover:text-brand-orange transition-colors">
              Logística
            </Link>
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-4 z-10 shrink-0">
            <a
              href="https://4unik.yoobe.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground hover:text-brand-orange transition-colors hidden sm:block"
            >
              Entrar
            </a>
            <a
              href="https://calendly.com/yoobeco/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white px-5 py-2.5 text-sm font-semibold transition-colors shadow-lg shadow-brand-orange/20"
            >
              Agendar Demonstração
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
