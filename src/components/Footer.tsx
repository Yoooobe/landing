import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-navy border-t border-white/5 pt-20 pb-10 text-white/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="text-xl font-bold tracking-tight text-white mb-4">
              4unik<span className="font-normal text-white/50"> by Yoobe</span>
            </div>
            <p className="text-sm mb-6 max-w-xs">
              Infraestrutura de recompensas corporativa. Motor de gamificação e catálogo integrado em uma plataforma SaaS premium para líderes e desenvolvedores.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold mb-2">Plataforma</h4>
            <Link href="/plataforma#gamificacao" className="text-sm hover:text-brand-orange transition-colors">Motor de Gamificação</Link>
            <Link href="/plataforma#wallet" className="text-sm hover:text-brand-orange transition-colors">Controle de Carteiras (Wallets)</Link>
            <Link href="/plataforma#gestor" className="text-sm hover:text-brand-orange transition-colors">Painel do Gestor</Link>
            <Link href="/casos-de-uso" className="text-sm hover:text-brand-orange transition-colors">Casos de Uso</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold mb-2">Recursos</h4>
            <Link href="/api-integracoes" className="text-sm hover:text-brand-orange transition-colors">API & Webhooks</Link>
            <Link href="https://catalogo.yoobe.co" className="text-sm hover:text-brand-orange transition-colors" target="_blank" rel="noopener noreferrer">Catálogo de Recompensas</Link>
            <Link href="https://4unik.com.br" className="text-sm hover:text-brand-orange transition-colors">Logística (Site 4Unik)</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold mb-2">Contato</h4>
            <a href="https://calendly.com/yoobeco/demo" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brand-orange transition-colors">
              Agendar Demonstração
            </a>
            <a href="https://wa.me/554187582060" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brand-orange transition-colors">
              Falar com Comercial
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} Yoobe. Reward Infrastructure Platform.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
            <Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
