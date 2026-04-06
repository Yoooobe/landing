"use client";

import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const { m } = useLocaleMessages();
  const h = m.landingMore.howItWorks;
  const steps = h.steps;

  return (
    <section className="py-24 bg-[#0d1424] relative border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20 relative z-10 text-white">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-yoobe-neon-pink/30 bg-yoobe-neon-pink/10 text-yoobe-neon-pink text-sm font-bold tracking-wide uppercase">
            {h.badge}
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 font-heading">
            {h.titleBefore}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yoobe-neon-pink to-orange-500">
              {h.titleGradient}
            </span>
            {h.titleAfter}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start relative z-10 mb-20">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-white/10 -z-10"></div>
          
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex flex-col items-center text-center w-full md:w-1/4 px-4 mb-12 md:mb-0"
            >
              <div className="w-20 h-20 rounded-full bg-[#141b2d] border-2 border-white/10 flex items-center justify-center text-2xl font-bold text-white mb-6 shadow-xl font-heading relative">
                {step.num}
                {/* Active glow pip */}
                <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-brand-orange shadow-[0_0_10px_rgba(249,115,22,0.8)] border-2 border-[#141b2d]"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-heading">{step.title}</h3>
              <p className="text-sm text-white/60 font-sans leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* --- Visual Mockup / Architecture representation --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full max-w-5xl mx-auto hidden md:block"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-yoobe-neon-pink/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative aspect-[21/9] bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm p-8 flex items-center shadow-2xl">
            {/* SVG Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              {/* Left to Center */}
              <path d="M 150 150 C 300 150, 200 200, 350 200" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" strokeDasharray="6 6" className="animate-[pulse_3s_ease-in-out_infinite]" />
              <path d="M 150 250 C 300 250, 200 200, 350 200" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" strokeDasharray="6 6" className="animate-[pulse_3s_ease-in-out_infinite_1s]" />
              
              {/* Center to Right */}
              <path d="M 650 200 C 800 200, 700 150, 850 150" stroke="rgba(249,115,22,0.3)" strokeWidth="3" fill="none" strokeDasharray="8 8" className="animate-[pulse_2s_ease-in-out_infinite]" />
              <path d="M 650 200 C 800 200, 700 250, 850 250" stroke="rgba(249,115,22,0.3)" strokeWidth="3" fill="none" strokeDasharray="8 8" className="animate-[pulse_2s_ease-in-out_infinite_0.5s]" />

              {/* Animated pulses over lines */}
              <circle cx="0" cy="0" r="4" fill="#F97316" className="animate-[float_3s_linear_infinite]">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 150 150 C 300 150, 200 200, 350 200" />
              </circle>
              <circle cx="0" cy="0" r="4" fill="#F97316" className="animate-[float_3s_linear_infinite]">
                <animateMotion dur="4s" repeatCount="indefinite" path="M 150 250 C 300 250, 200 200, 350 200" />
              </circle>
              <circle cx="0" cy="0" r="5" fill="#e75782" className="animate-[float_2s_linear_infinite]">
                <animateMotion dur="2.5s" repeatCount="indefinite" path="M 650 200 C 800 200, 700 150, 850 150" />
              </circle>
              <circle cx="0" cy="0" r="5" fill="#e75782" className="animate-[float_2s_linear_infinite]">
                <animateMotion dur="2.2s" repeatCount="indefinite" path="M 650 200 C 800 200, 700 250, 850 250" />
              </circle>
            </svg>

            {/* Architecture Blocks */}
            <div className="w-full flex justify-between items-center relative z-10 px-8">
              
              {/* Left Column: Integrations */}
              <div className="flex flex-col gap-6 w-1/4">
                <div className="bg-[#141b2d] border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-black">W</div>
                  <div className="flex-1">
                    <div className="h-2 w-16 bg-white/20 rounded-full mb-2"></div>
                    <div className="h-1.5 w-10 bg-white/10 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-[#141b2d] border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-lg transform rotate-2 hover:rotate-0 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-yoobe-neon-pink/20 flex items-center justify-center text-yoobe-neon-pink font-black">H</div>
                  <div className="flex-1">
                    <div className="h-2 w-20 bg-white/20 rounded-full mb-2"></div>
                    <div className="h-1.5 w-12 bg-white/10 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Center Column: Yoobe Core Engine */}
              <div className="w-1/3 relative group">
                {/* Glowing border effect */}
                <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-yoobe-purple to-brand-orange opacity-50 blur-sm group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-[#0d1424]/90 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 shadow-2xl flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-orange to-yoobe-neon-pink flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.5)] mb-4">
                    <span className="text-white font-black text-2xl font-heading">Y.</span>
                  </div>
                  <h4 className="text-white font-bold font-heading text-lg mb-1">{h.mockInfrastructure}</h4>
                  <p className="text-white/50 text-xs font-sans text-center mb-6">{h.mockEngine}</p>
                  
                  {/* Internal logic mockup */}
                  <div className="w-full space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/70">{h.mockPoints}</span>
                      <span className="text-green-400 font-mono">OK</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5">
                      <div className="bg-brand-orange h-1.5 rounded-full w-[85%] animate-[pulse_2s_ease-in-out_infinite]"></div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs pt-2 border-t border-white/5">
                      <span className="text-white/70">{h.mockWebhook}</span>
                      <span className="text-yoobe-purple font-mono">SYNC</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Outcomes (Store / Analytics) */}
              <div className="flex flex-col gap-6 w-1/4">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col gap-3 shadow-lg transform rotate-2 hover:rotate-0 transition-transform">
                  <div className="flex justify-between items-center">
                    <div className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange text-sm">🛒</div>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold">{h.mockItems}</span>
                  </div>
                  <div className="w-full h-12 rounded-lg bg-gradient-to-br from-white/5 to-white/0 border border-white/5 flex items-center justify-center text-xs text-white/40">
                    {h.mockCatalog}
                  </div>
                </div>
                
                <div className="bg-[#141b2d] border border-white/10 rounded-2xl p-4 flex flex-col gap-3 shadow-lg transform -rotate-1 hover:rotate-0 transition-transform">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-yoobe-neon-pink animate-pulse"></div>
                    <span className="text-xs text-white/70 font-bold">{h.mockRoi}</span>
                  </div>
                  <div className="flex items-end gap-1 h-8">
                    <div className="w-1/4 bg-yoobe-purple/40 h-1/3 rounded-t-sm"></div>
                    <div className="w-1/4 bg-yoobe-purple/60 h-2/3 rounded-t-sm"></div>
                    <div className="w-1/4 bg-yoobe-neon-pink/80 h-full rounded-t-sm"></div>
                    <div className="w-1/4 bg-brand-orange h-[120%] rounded-t-sm shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
