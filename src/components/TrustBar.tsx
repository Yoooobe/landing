"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { withBasePath } from "@/lib/basePath";

export default function TrustBar() {
  const { m } = useLocaleMessages();
  const logos = [
    { src: withBasePath("/clients/yampi.png"), alt: "Yampi" },
    { src: withBasePath("/clients/prio.png"), alt: "PRIO" },
    { src: withBasePath("/clients/hapvida.png"), alt: "Hapvida" },
    { src: withBasePath("/clients/join.svg"), alt: "Join" },
    { src: withBasePath("/clients/tecnospeed.svg"), alt: "Tecnospeed" },
    { src: withBasePath("/clients/boticario.png"), alt: "O Boticário" }
  ];

  return (
    <section className="border-b border-t border-white/5 bg-surface-page py-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-bold tracking-widest text-white/40 uppercase mb-8">{m.home.trust.title}</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {logos.map((logo, i) => (
            <div key={i} className="h-8 md:h-12 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
              <img src={logo.src} alt={logo.alt} className="max-h-full max-w-[120px] object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
