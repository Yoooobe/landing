"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { withBasePath } from "@/lib/basePath";
import { getSanityImageUrl, SANITY_IMAGE_PRESETS } from "@/sanity/lib/image";
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
  const logisticsPanelImageUrl =
    getSanityImageUrl(showcaseMedia?.logisticsPanelImage, SANITY_IMAGE_PRESETS.uiScreenshot) ??
    withBasePath("/screens/member-orders.webp");

  return (
    <section className="relative border-t border-brand-navy/5 bg-brand-cream py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 font-heading text-3xl font-black text-brand-navy md:text-5xl">{l.title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-brand-warm-gray">{l.sub}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-10 overflow-hidden rounded-[2rem] border border-brand-navy/10 bg-[#0b0e14] shadow-2xl"
        >
          <div className="relative aspect-16/7 w-full">
            <Image
              src={logisticsPanelImageUrl}
              alt={
                showcaseMedia?.logisticsPanelImage?.alt?.trim() ||
                "Painel de pedidos e logística integrada da 4unik"
              }
              fill
              sizes="100vw"
              className="object-contain object-top"
              unoptimized
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {l.cards.map((card, i) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -5 }}
              className="rounded-3xl border border-brand-navy/8 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-navy/10 bg-brand-cream">
                {i === 0 ? (
                  <PackageIcon className="h-7 w-7 text-brand-navy" />
                ) : i === 1 ? (
                  <Globe className="h-7 w-7 text-brand-navy" />
                ) : (
                  <CheckCircle2 className="h-7 w-7 text-brand-navy" />
                )}
              </div>
              <h3 className="mb-3 font-heading text-xl font-bold text-brand-navy">{card.title}</h3>
              <p className="text-sm leading-relaxed text-brand-warm-gray">{card.body}</p>
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
