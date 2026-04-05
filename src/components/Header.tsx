"use client";

import UnikWordmark from "@/components/UnikWordmark";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Layers, Gamepad2, Brain, Gift, Network, Trophy, Menu, X, Sparkles } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          className={`flex items-center justify-between rounded-full transition-all duration-500 px-6 py-3 ${
            scrolled
              ? "glass-panel-dark shadow-2xl border-white/15"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Logo — wordmark 4unik */}
          <Link href="/" className="z-10 flex min-w-0 shrink-0 items-center">
            <UnikWordmark
              variant="header"
              className="shrink-0 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 text-[0.9rem] font-medium tracking-wide">
            
            {/* Produto Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all">
                Plataforma <ChevronDown className="w-3.5 h-3.5 opacity-70 transition-transform group-hover:rotate-180" />
              </button>
              
              {/* Dropdown Content */}
              <div className="absolute left-0 top-full pt-3 opacity-0 translate-y-3 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50">
                <div className="relative w-[340px] p-2 rounded-2xl bg-surface-page/95 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                  {/* Triangle indicator */}
                  <div className="absolute -top-1.5 left-8 w-3 h-3 bg-surface-page border-t border-l border-white/10 rotate-45"></div>
                  
                  <div className="flex flex-col gap-1 relative z-10">
                    <Link href="/plataforma" className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/item">
                      <div className="mt-0.5 bg-brand-orange/10 p-2.5 rounded-lg text-brand-orange group-hover/item:scale-110 transition-transform">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white font-medium mb-0.5">Visão Geral</div>
                        <div className="text-white/50 text-xs text-balance leading-relaxed">A base da sua operação e gestão.</div>
                      </div>
                    </Link>
                    
                    <Link href="/gamificacao" className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/item relative">
                      <div className="mt-0.5 bg-brand-orange/10 p-2.5 rounded-lg text-brand-orange group-hover/item:scale-110 transition-transform">
                        <Gamepad2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white font-medium mb-0.5 flex items-center gap-2">
                          Gamificação
                          <span className="bg-brand-orange/20 text-brand-orange text-[0.6rem] font-bold px-1.5 py-0.5 rounded border border-brand-orange/20 uppercase tracking-wider">CORE</span>
                        </div>
                        <div className="text-white/50 text-xs text-balance leading-relaxed">Engaje e premie seu time com mecânicas de jogos.</div>
                      </div>
                    </Link>
                    
                    <Link href="/inteligencia" className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/item relative">
                      <div className="mt-0.5 bg-yoobe-purple/10 p-2.5 rounded-lg text-yoobe-purple group-hover/item:scale-110 transition-transform">
                        <Brain className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white font-medium mb-0.5 flex items-center gap-2">
                          Inteligência
                          <span className="bg-yoobe-purple/20 text-yoobe-purple text-[0.6rem] font-bold px-1.5 py-0.5 rounded border border-yoobe-purple/20 uppercase tracking-wider">NEW</span>
                        </div>
                        <div className="text-white/50 text-xs text-balance leading-relaxed">IA avançada para campanhas e recomendações.</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Soluções Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all">
                Soluções <ChevronDown className="w-3.5 h-3.5 opacity-70 transition-transform group-hover:rotate-180" />
              </button>
              
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 translate-y-3 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50">
                <div className="relative w-[300px] p-2 rounded-2xl bg-surface-page/95 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                  {/* Triangle indicator */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-surface-page border-t border-l border-white/10 rotate-45"></div>

                  <div className="flex flex-col gap-1 relative z-10">
                    <Link href="/casos-de-uso" className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/item">
                      <div className="mt-0.5 bg-blue-500/10 p-2.5 rounded-lg text-blue-400 group-hover/item:scale-110 transition-transform">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white font-medium mb-0.5">Casos de Sucesso</div>
                        <div className="text-white/50 text-xs leading-relaxed">Veja quem já transforma o RH.</div>
                      </div>
                    </Link>
                    
                    <Link href="https://catalogo.yoobe.co" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/item">
                      <div className="mt-0.5 bg-brand-orange/10 p-2.5 rounded-lg text-brand-orange group-hover/item:scale-110 transition-transform">
                        <Gift className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white font-medium mb-0.5">Hub de Prêmios</div>
                        <div className="text-white/50 text-xs leading-relaxed">Milhares de opções incríveis para encantar.</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* API e integrações */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all">
                API <ChevronDown className="w-3.5 h-3.5 opacity-70 transition-transform group-hover:rotate-180" />
              </button>
              
              <div className="absolute right-0 top-full pt-3 opacity-0 translate-y-3 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50">
                <div className="relative w-[300px] p-2 rounded-2xl bg-surface-page/95 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                  {/* Triangle indicator */}
                  <div className="absolute -top-1.5 right-8 w-3 h-3 bg-surface-page border-t border-l border-white/10 rotate-45"></div>
                  
                  <div className="flex flex-col gap-1 relative z-10">
                    <Link href="/api-integracoes" className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/item">
                      <div className="mt-0.5 bg-emerald-500/10 p-2.5 rounded-lg text-emerald-400 group-hover/item:scale-110 transition-transform">
                        <Network className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white font-medium mb-0.5">API & Integrações</div>
                        <div className="text-white/50 text-xs leading-relaxed">Conecte a Yoobe ao seu ecossistema.</div>
                      </div>
                    </Link>
                    <Link href="/api-integracoes/workvivo/" className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/item">
                      <div className="mt-0.5 bg-fuchsia-500/10 p-2.5 rounded-lg text-fuchsia-400 group-hover/item:scale-110 transition-transform">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white font-medium mb-0.5">Workvivo × Yoobe</div>
                        <div className="text-white/50 text-xs leading-relaxed">Add-on na área de API — recompensas e loja.</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

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
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-white/80 hover:text-white p-2 transition-colors ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-surface-deep/95 backdrop-blur-xl lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ top: "80px" }} // Offset for header
      >
        <div className="flex flex-col h-full overflow-y-auto px-6 py-8 pb-24">
          <nav className="flex flex-col gap-6">
            {/* Produto Section */}
            <div className="flex flex-col gap-3">
              <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">Produto</div>
              <Link href="/plataforma" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-white/80 hover:text-white py-2">
                <Layers className="w-5 h-5 text-brand-orange" />
                <span className="font-medium text-lg">Visão Geral</span>
              </Link>
              <Link href="/gamificacao" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-white/80 hover:text-white py-2">
                <Gamepad2 className="w-5 h-5 text-brand-orange" />
                <span className="font-medium text-lg">Gamificação</span>
                <span className="bg-brand-orange/20 text-brand-orange text-[0.6rem] font-bold px-1.5 py-0.5 rounded border border-brand-orange/20 uppercase">CORE</span>
              </Link>
              <Link href="/inteligencia" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-white/80 hover:text-white py-2">
                <Brain className="w-5 h-5 text-yoobe-purple" />
                <span className="font-medium text-lg">Inteligência</span>
                <span className="bg-yoobe-purple/20 text-yoobe-purple text-[0.6rem] font-bold px-1.5 py-0.5 rounded border border-yoobe-purple/20 uppercase">NEW</span>
              </Link>
            </div>

            <div className="w-full h-px bg-white/10 my-2"></div>

            {/* Soluções Section */}
            <div className="flex flex-col gap-3">
              <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">Soluções</div>
              <Link href="/casos-de-uso" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-white/80 hover:text-white py-2">
                <Trophy className="w-5 h-5 text-blue-400" />
                <span className="font-medium text-lg">Casos de Sucesso</span>
              </Link>
              <Link href="https://catalogo.yoobe.co" onClick={() => setIsMobileMenuOpen(false)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white py-2">
                <Gift className="w-5 h-5 text-brand-orange" />
                <span className="font-medium text-lg">Hub de Prêmios</span>
              </Link>
            </div>

            <div className="w-full h-px bg-white/10 my-2"></div>

            {/* API e integrações */}
            <div className="flex flex-col gap-3">
              <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">API e integrações</div>
              <Link href="/api-integracoes" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-white/80 hover:text-white py-2">
                <Network className="w-5 h-5 text-emerald-400" />
                <span className="font-medium text-lg">Visão geral da API</span>
              </Link>
              <Link href="/api-integracoes/workvivo/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-white/80 hover:text-white py-2">
                <Sparkles className="w-5 h-5 text-fuchsia-400" />
                <span className="font-medium text-lg">Workvivo × Yoobe</span>
              </Link>
            </div>
            
            <div className="mt-8 flex flex-col gap-4">
              <a
                href="https://4unik.yoobe.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl border border-white/20 text-white font-medium text-center hover:bg-white/5 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Fazer Login
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
