"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { PlatformShowcaseMediaDoc } from "@/sanity/lib/types";
import { Shield, Lock, FileKey } from "lucide-react";
import Image from "next/image";

export default function SecurityEnterprise({
  showcaseMedia = null,
}: {
  showcaseMedia?: PlatformShowcaseMediaDoc | null;
}) {
  const { m } = useLocaleMessages();
  const sec = m.plataforma.security;
  const icons = [Lock, FileKey] as const;
  const securityPanelImageUrl = getSanityImageUrl(showcaseMedia?.securityPanelImage, { width: 1440, height: 900, fit: "crop", crop: "entropy", quality: 86 });

  return (
    <section className="py-24 bg-brand-navy-dark relative border-t border-white/5">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="glass-panel-dark rounded-[2.5rem] p-10 md:p-16 border border-white/10 relative overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6 relative z-10">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{sec.badge}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight relative z-10 font-heading">{sec.title}</h2>
              <p className="text-lg text-white/60 mb-8 relative z-10">{sec.body}</p>
            </div>

            <div className="md:w-1/2 flex flex-col gap-4 w-full relative z-10">
              {securityPanelImageUrl ? (
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0f1522]">
                  <Image
                    src={securityPanelImageUrl}
                    alt={
                      showcaseMedia?.securityPanelImage?.alt?.trim() ||
                      sec.title ||
                      "Painel visual da segurança enterprise"
                    }
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : null}

              {sec.items.map((item, i) => {
                const Icon = icons[i] ?? Lock;
                return (
                  <div
                    key={item.title}
                    className="bg-[#0f1522] border border-white/5 p-5 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="p-3 bg-white/5 rounded-xl">
                      <Icon className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-white/50 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
