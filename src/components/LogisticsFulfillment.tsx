"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { PlatformShowcaseMediaDoc } from "@/sanity/lib/types";
import { motion } from "framer-motion";
import { Globe, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function LogisticsFulfillment({
  showcaseMedia = null,
}: {
  showcaseMedia?: PlatformShowcaseMediaDoc | null;
}) {
  const { m } = useLocaleMessages();
  const l = m.plataforma.logistics;
  const logisticsPanelImageUrl = getSanityImageUrl(showcaseMedia?.logisticsPanelImage, { width: 1440, height: 900, fit: "crop", crop: "entropy", quality: 86 });

  return (
    <section className="py-24 bg-brand-navy border-t border-white/5 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">{l.title}</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">{l.sub}</p>
        </div>

        {logisticsPanelImageUrl ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-surface-page shadow-2xl"
          >
            <div className="relative aspect-16/7 w-full">
              <Image
                src={logisticsPanelImageUrl}
                alt={
                  showcaseMedia?.logisticsPanelImage?.alt?.trim() ||
                  l.title ||
                  "Painel visual da logística integrada"
                }
                fill
                sizes="100vw"
                className="object-cover"
                unoptimized
              />
            </div>
          </motion.div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {l.cards.map((card, i) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -5 }}
              className="glass-panel-dark p-8 rounded-3xl border border-white/5"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                {i === 0 ? (
                  <PackageIcon className="text-white w-7 h-7" />
                ) : i === 1 ? (
                  <Globe className="text-white w-7 h-7" />
                ) : (
                  <CheckCircle2 className="text-white w-7 h-7" />
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-heading">{card.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PackageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16.5 9.4 7.5 4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" y1="22" x2="12" y2="12" />
    </svg>
  );
}
