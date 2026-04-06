"use client";

import UnikWordmark from "@/components/UnikWordmark";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import Link from "next/link";

export default function Footer() {
  const { m, path } = useLocaleMessages();
  const f = m.footer;
  return (
    <footer className="bg-brand-navy border-t border-white/5 pt-20 pb-10 text-white/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-3">
              <UnikWordmark variant="footer" className="opacity-95" />
            </div>
            <p className="text-sm mb-6 max-w-xs">{f.blurb}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold mb-2">{f.colPlatform}</h4>
            <Link href={`${path("/plataforma")}#gamificacao`} className="text-sm hover:text-brand-orange transition-colors">
              {f.links.motor}
            </Link>
            <Link href={`${path("/plataforma")}#wallet`} className="text-sm hover:text-brand-orange transition-colors">
              {f.links.wallets}
            </Link>
            <Link href={`${path("/plataforma")}#gestor`} className="text-sm hover:text-brand-orange transition-colors">
              {f.links.gestor}
            </Link>
            <Link href={path("/casos-de-uso")} className="text-sm hover:text-brand-orange transition-colors">
              {f.links.casos}
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold mb-2">{f.colResources}</h4>
            <Link href={path("/api-integracoes")} className="text-sm hover:text-brand-orange transition-colors">
              {f.links.api}
            </Link>
            <Link href="https://catalogo.yoobe.co" className="text-sm hover:text-brand-orange transition-colors" target="_blank" rel="noopener noreferrer">
              {f.links.catalogo}
            </Link>
            <Link href="https://4unik.com.br" className="text-sm hover:text-brand-orange transition-colors">
              {f.links.logistica}
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold mb-2">{f.colContact}</h4>
            <a href="https://calendly.com/yoobeco/demo" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brand-orange transition-colors">
              {f.links.demo}
            </a>
            <a href="https://wa.me/554187582060" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brand-orange transition-colors">
              {f.links.comercial}
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} {f.copyright}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">
              {f.legal}
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              {f.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
