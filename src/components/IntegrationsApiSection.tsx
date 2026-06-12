"use client";

import DedicatedIntegrations from "@/components/DedicatedIntegrations";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { withBasePath } from "@/lib/basePath";
import type { ResolvedHomeContent } from "@/sanity/lib/types";
import { motion } from "framer-motion";

export default function IntegrationsApiSection({
  homeContent = null,
}: {
  homeContent?: ResolvedHomeContent | null;
}) {
  const { m, path } = useLocaleMessages();
  const a = m.apiSection;
  const di = m.landingMore.dedicatedIntegrations;

  return (
    <section id="api" className="relative overflow-hidden border-t border-white/5 bg-surface-deep py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-sm font-bold tracking-wide text-blue-400 uppercase">
            {di.badge}
          </span>
          <h2 className="mb-4 font-heading text-3xl font-black text-white md:text-4xl">
            {a.titleBefore}{" "}
            <span className="bg-linear-to-r from-unik-blue-soft to-demo-cyan bg-clip-text text-transparent">
              {a.titleBrand}
            </span>{" "}
            {a.titleAfter}
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-lg text-white/60">{a.sub}</p>
        </div>

        <div className="mb-16 flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className="w-full lg:w-1/2">
            <ul className="mb-8 space-y-3 font-sans">
              {a.bullets.slice(0, 4).map((line) => (
                <li key={line} className="flex items-start text-white/80">
                  <span className="mr-3 text-demo-cyan">✓</span>
                  {line}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <a
                href={withBasePath(path("/api-integracoes"))}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-transparent px-6 font-bold text-white transition-colors hover:bg-white/5 font-sans"
              >
                {a.ctaDocs}
              </a>
              <a
                href="https://calendly.com/4unik/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-unik-blue px-6 font-sans font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.35)] transition-colors hover:bg-unik-blue-deep"
              >
                {a.ctaApi}
              </a>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-white/10 bg-surface-page p-5 shadow-2xl"
            >
              <div className="mb-4 flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-white sm:text-sm">
                <code className="block">
                  <span className="italic text-gray-500">{a.codeComment}</span>
                  {"\n"}
                  <span className="font-bold text-pink-400">const</span> response ={" "}
                  <span className="font-bold text-pink-400">await</span> fetch(
                  {"\n"}
                  <span className="text-green-300">&apos;https://api.yoobe.co/v1/rewards&apos;</span>, …
                </code>
              </pre>
            </motion.div>
          </div>
        </div>

        <DedicatedIntegrations homeContent={homeContent} embedded />
      </div>
    </section>
  );
}
