"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { motion } from "framer-motion";
import { BadgeCheck, ExternalLink } from "lucide-react";

type TestimonialItem = {
  text: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  illustrative?: boolean;
  verified?: boolean;
  caseStudyUrl?: string;
};

export default function TestimonialsSection() {
  const { locale, m } = useLocaleMessages();
  const t = m.testimonials as typeof m.testimonials & {
    illustrativeDisclaimer?: string;
    items: TestimonialItem[];
  };
  const verifiedLabel = locale === "pt" ? "Caso verificado" : "Verified case";
  const illustrativeLabel = locale === "pt" ? "Ilustrativo" : "Illustrative";
  const caseStudyLabel = locale === "pt" ? "Ver caso" : "View case";

  return (
    <section className="relative border-t border-white/5 bg-surface-section py-24">
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="relative z-10 mb-16 text-center text-white">
          <div className="mb-4 inline-block rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-yoobe-purple">
            {t.badge}
          </div>
          <h2 className="font-heading text-3xl font-black md:text-5xl">
            {t.titleBefore}{" "}
            <span className="bg-linear-to-r from-yoobe-purple to-yoobe-neon-pink bg-clip-text text-transparent">
              {t.titleGradient}
            </span>
          </h2>
          {t.illustrativeDisclaimer ? (
            <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-white/45">
              {t.illustrativeDisclaimer}
            </p>
          ) : null}
        </div>

        <div className="relative z-10 grid gap-8 md:grid-cols-3">
          {t.items.map((item, i) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col justify-between rounded-3xl border border-white/5 bg-surface-elevated p-8"
            >
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <div className="text-xl tracking-widest text-brand-orange">★★★★★</div>
                  {item.verified ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-xs font-bold text-emerald-300">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      {verifiedLabel}
                    </span>
                  ) : item.illustrative !== false ? (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-medium text-white/45">
                      {illustrativeLabel}
                    </span>
                  ) : null}
                </div>
                <p className="mb-8 font-sans text-lg italic leading-relaxed text-white/80">{item.text}</p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-yoobe-purple to-fuchsia-600 font-heading text-lg font-bold text-white">
                  {item.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-heading font-bold text-white">{item.author}</div>
                  <div className="font-sans text-xs text-white/50">
                    {item.role} — {item.company}
                  </div>
                  {item.verified && item.caseStudyUrl ? (
                    <a
                      href={item.caseStudyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-orange/90 hover:text-brand-orange"
                    >
                      {caseStudyLabel}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
