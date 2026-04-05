import ApiFeaturesGrid from "@/components/ApiFeaturesGrid";
import ApiHero from "@/components/ApiHero";
import ApiPlatformModules from "@/components/ApiPlatformModules";
import NativeIntegrations from "@/components/NativeIntegrations";

export default function ApiIntegracoesPageSections() {
  return (
    <div className="min-h-screen bg-[#0a0f18] text-white">
      <ApiHero />
      <ApiFeaturesGrid />
      <NativeIntegrations />
      <ApiPlatformModules />

      <section className="relative border-t border-white/5 bg-[#0a0f18] py-24 text-center overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-cyan-500/5 blur-[100px]"></div>
        <div className="container relative z-10 mx-auto px-4">
          <h2 className="mb-6 font-mono text-3xl font-black text-white lg:text-5xl">{"<ReadyToBuild />"}</h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/50">
            Crie chaves de API restritas e acesse a documentação técnica interativa hospedada no Stoplight.
          </p>
          <a
            href="https://calendly.com/yoobeco/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center rounded-xl bg-cyan-500 px-10 text-lg font-bold text-[#0a0f18] shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all hover:scale-105 hover:bg-cyan-400"
          >
            Gerar API Keys
          </a>
        </div>
      </section>
    </div>
  );
}
