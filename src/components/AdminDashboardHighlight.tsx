"use client";

import FeatureScreensCarousel from "@/components/FeatureScreensCarousel";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { getSanityImageUrl } from "@/sanity/lib/image";
import type { PlatformShowcaseMediaDoc } from "@/sanity/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AdminDashboardHighlight({
  showcaseMedia = null,
}: {
  showcaseMedia?: PlatformShowcaseMediaDoc | null;
}) {
  const { m } = useLocaleMessages();
  const d = m.plataforma.adminDashboard;
  const adminDashboardImageUrl = getSanityImageUrl(
    showcaseMedia?.adminDashboardImage,
  );

  return (
    <section id="gestor" className="py-24 bg-brand-navy-dark relative">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[60%] order-2 lg:order-1 relative"
          >
            <div className="absolute -inset-1 rounded-[2rem] bg-linear-to-r from-brand-orange via-unik-blue to-demo-cyan opacity-20 blur transition duration-1000 group-hover:opacity-40 group-hover:duration-200"></div>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-page shadow-2xl">
              {adminDashboardImageUrl ? (
                <div className="relative aspect-16/11 w-full overflow-hidden">
                  <Image
                    src={adminDashboardImageUrl}
                    alt={
                      showcaseMedia?.adminDashboardImage?.alt?.trim() ||
                      d.badge ||
                      "Mockup do painel do gestor"
                    }
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <FeatureScreensCarousel variant="admin" intervalMs={4200} />
              )}
            </div>
          </motion.div>

          <div className="w-full lg:w-[40%] order-1 lg:order-2">
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-4 font-sans">
              {d.badge}
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 font-heading">
              {d.titleBefore}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yoobe-purple via-unik-blue-soft to-brand-orange">
                {d.titleGradient}
              </span>
              {d.titleAfter}
            </h2>
            <p className="text-lg text-white/60 leading-relaxed mb-8 font-sans">{d.body}</p>
            <ul className="space-y-6 font-sans">
              {d.bullets.map((item, i) => (
                <li key={item.title} className="flex items-start gap-4">
                  <div
                    className={`min-w-8 min-h-8 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                      i === 0
                        ? "bg-unik-blue/20"
                        : i === 1
                          ? "bg-brand-orange/20"
                          : i === 2
                            ? "bg-yoobe-purple/20"
                            : "bg-green-500/20"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        i === 0
                          ? "bg-unik-blue"
                          : i === 1
                            ? "bg-brand-orange"
                            : i === 2
                              ? "bg-yoobe-purple"
                              : "bg-green-500"
                      }`}
                    ></div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg font-heading">{item.title}</h4>
                    <p className="text-sm text-white/50 mt-1">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
