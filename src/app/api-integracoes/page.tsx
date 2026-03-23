import ApiHero from "@/components/ApiHero";
import ApiFeaturesGrid from "@/components/ApiFeaturesGrid";
import NativeIntegrations from "@/components/NativeIntegrations";
import ApiPlatformModules from "@/components/ApiPlatformModules";

export default function ApiIntegracoesPage() {
  return (
    <div className="bg-[#0a0f18] text-white min-h-screen">
      <ApiHero />
      <ApiFeaturesGrid />
      <NativeIntegrations />
      <ApiPlatformModules />
      
      {/* Dev CTA */}
      <section className="py-24 text-center border-t border-white/5 bg-[#0a0f18] relative overflow-hidden">
         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-cyan-500/5 blur-[100px] pointer-events-none"></div>
         <div className="container mx-auto px-4 relative z-10">
           <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 font-mono">{"<ReadyToBuild />"}</h2>
           <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
             Crie chaves de API restritas e acesse a documentação técnica interativa hospedada no Stoplight.
           </p>
           <a
             href="https://calendly.com/yoobeco/demo"
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex h-14 items-center justify-center rounded-xl bg-cyan-500 px-10 font-bold text-[#0a0f18] shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:bg-cyan-400 transition-all text-lg hover:scale-105"
           >
             Gerar API Keys
           </a>
         </div>
      </section>
    </div>
  );
}
