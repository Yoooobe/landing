import Hero from "@/components/Hero";
import HRChallenge from "@/components/HRChallenge";
import GamificationHighlight from "@/components/GamificationHighlight";
import WalletHighlight from "@/components/WalletHighlight";

export default function Home() {
  return (
    <>
      <Hero />
      <HRChallenge />
      <GamificationHighlight />
      <WalletHighlight />
      
      {/* Final "Mystery" CTA Section */}
      <section className="py-24 bg-gradient-to-b from-brand-navy-dark to-black border-t border-white/5 text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Construa o ecossistema definitivo.
          </h2>
          <p className="text-xl text-white/70 mb-10">
            Você viu apenas a ponta do iceberg. A verdadeira mágica da infraestrutura Yoobe acontece nos bastidores. Assuma o controle total da sua logística de recompensas.
          </p>
          <a
            href="https://calendly.com/yoobeco/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center rounded-xl bg-yoobe-purple px-10 font-bold text-white text-lg shadow-2xl shadow-yoobe-purple/20 transition-all hover:bg-yoobe-purple/90 hover:scale-105"
          >
            Descubra o Motor Completo
          </a>
        </div>
      </section>
    </>
  );
}
