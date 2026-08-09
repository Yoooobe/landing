"use client";

import { BarChart3, PackageCheck, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import ShowcaseImage from "@/components/ui/ShowcaseImage";
import type { ResolvedHomeContent } from "@/sanity/lib/types";
import { motion } from "framer-motion";

const ICONS: LucideIcon[] = [BarChart3, PackageCheck, Users, ShieldCheck];

export default function ManagementSection({
  homeContent = null,
}: {
  homeContent?: ResolvedHomeContent | null;
}) {
  const { m } = useLocaleMessages();
  const man = m.managementSection;
  const features = man.features.map((item, i) => {
    const visual = homeContent?.showcaseMedia?.managementSection?.featureCards?.[i];
    return {
      ...item,
      icon: ICONS[i] || BarChart3,
      image: visual?.image || null,
    };
  });

  return (
    <section id="gestao" className="relative border-t border-white/5 bg-brand-navy-dark py-24">
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="relative z-10 mb-16 text-center text-white">
          <div className="mb-4 inline-block rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-blue-400">
            {man.badge}
          </div>
          <h2 className="mb-6 font-heading text-3xl font-black md:text-5xl">
            {man.titleBefore} <span className="bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">{man.titleGradient}</span>
            {man.titleAfter}
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-white/50">{man.sub}</p>
        </div>

        <div className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-panel-dark flex flex-col justify-between rounded-[1.75rem] border border-white/12 bg-slate-950/80 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-[0_20px_50px_rgba(96,165,250,0.15)]"
              >
                <div>
                  <div className="mb-6">
                    {item.image ? (
                      <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2">
                        <ShowcaseImage
                          image={item.image}
                          alt={item.image.alt?.trim() || item.title}
                          variant="thumb"
                          sizes="80px"
                        />
                      </div>
                    ) : (
                      <div className="inline-flex rounded-2xl border border-blue-400/20 bg-blue-400/10 p-3.5 text-blue-400">
                        <Icon className="h-7 w-7" />
                      </div>
                    )}
                  </div>
                  <h3 className="mb-3 font-heading text-xl font-bold text-white">{item.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
