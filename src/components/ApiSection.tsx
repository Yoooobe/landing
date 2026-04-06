"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { withBasePath } from "@/lib/basePath";
import { motion } from "framer-motion";

export default function ApiSection() {
  const { m, path } = useLocaleMessages();
  const a = m.apiSection;

  return (
    <section id="api" className="relative overflow-hidden border-t border-white/5 bg-surface-deep py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <div className="w-full lg:w-1/2">
            <div className="mb-4 inline-block rounded-full border border-unik-blue/30 bg-unik-blue/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-unik-blue-soft">
              {a.badge}
            </div>
            <h2 className="mb-6 font-heading text-3xl font-black text-white md:text-5xl">
              {a.titleBefore}{" "}
              <span className="bg-gradient-to-r from-unik-blue-soft to-demo-cyan bg-clip-text text-transparent">{a.titleBrand}</span>{" "}
              {a.titleAfter}
            </h2>
            <p className="mb-8 font-sans text-lg leading-relaxed text-white/60">{a.sub}</p>
            <ul className="mb-10 space-y-4 font-sans">
              {a.bullets.map((line) => (
                <li key={line} className="flex items-center text-white/80">
                  <span className="mr-3 text-demo-cyan">✓</span>
                  {line}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <a
                href={withBasePath(path("/api-integracoes"))}
                className="inline-flex h-14 items-center justify-center rounded-xl border border-white/20 bg-transparent px-8 font-bold text-white transition-colors hover:bg-white/5 font-sans"
              >
                {a.ctaDocs}
              </a>
              <a
                href="https://calendly.com/yoobeco/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-unik-blue px-8 font-sans font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.35)] transition-colors hover:bg-unik-blue-deep"
              >
                {a.ctaApi}
              </a>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl border border-white/10 bg-surface-page p-6 shadow-2xl"
            >
              <div className="mb-6 flex gap-2.5">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-white">
                <code className="block">
                  <span className="italic text-gray-500">{a.codeComment}</span>
                  {"\n"}
                  <span className="font-bold text-pink-400">const</span> response = <span className="font-bold text-pink-400">await</span> fetch({"("}
                  {"\n"}
                  <span className="text-green-300">&apos;https://api.yoobe.co/v1/rewards&apos;</span>,{"\n"}
                  {"{"}
                  {"\n"}
                  {"    "}method: <span className="text-green-300">&apos;POST&apos;</span>,{"\n"}
                  {"    "}headers: {"{"}
                  {"\n"}
                  {"      "}
                  <span className="text-blue-300">&apos;Authorization&apos;</span>:{" "}
                  <span className="text-green-300">`Bearer {"${token}"}`</span>,{"\n"}
                  {"      "}
                  <span className="text-blue-300">&apos;Content-Type&apos;</span>: <span className="text-green-300">&apos;application/json&apos;</span>
                  {"\n"}
                  {"    "}
                  {"}"},{"\n"}
                  {"    "}body: JSON.stringify({"{"}
                  {"\n"}
                  {"      "}employee_id: <span className="text-green-300">&apos;emp_482&apos;</span>,{"\n"}
                  {"      "}points: <span className="text-orange-300">1500</span>,{"\n"}
                  {"      "}reason: <span className="text-green-300">&apos;{a.codeReason}&apos;</span>
                  {"\n"}
                  {"    "}
                  {"}"}){"\n"}
                  {"  "}
                  {"}"}
                  {"\n"}
                  {")"}
                </code>
              </pre>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
