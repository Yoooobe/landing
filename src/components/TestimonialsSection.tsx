"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const { m } = useLocaleMessages();
  const t = m.testimonials;

  return (
    <section className="relative border-t border-white/5 bg-[#0d1424] py-24">
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="relative z-10 mb-16 text-center text-white">
          <div className="mb-4 inline-block rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-yoobe-purple">
            {t.badge}
          </div>
          <h2 className="font-heading text-3xl font-black md:text-5xl">
            {t.titleBefore} <span className="bg-gradient-to-r from-yoobe-purple to-yoobe-neon-pink bg-clip-text text-transparent">{t.titleGradient}</span>
          </h2>
        </div>

        <div className="relative z-10 grid gap-8 md:grid-cols-3">
          {t.items.map((item, i) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col justify-between rounded-3xl border border-white/5 bg-[#141b2d] p-8"
            >
              <div>
                <div className="mb-4 text-xl tracking-widest text-brand-orange">★★★★★</div>
                <p className="mb-8 font-sans text-lg italic leading-relaxed text-white/80">{item.text}</p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-yoobe-purple to-fuchsia-600 font-heading text-lg font-bold text-white">
                  {item.avatar}
                </div>
                <div>
                  <div className="font-heading font-bold text-white">{item.author}</div>
                  <div className="font-sans text-xs text-white/50">
                    {item.role} — {item.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
