"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, ShieldCheck, Zap, Gauge, HeartHandshake } from "lucide-react";
import { TESTIMONIALS_ROW_1, TESTIMONIALS_ROW_2, TestimonialItem } from "@/data/testimonials";

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -320]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-320, 0]);

  return (
    <section
      id="reviews"
      ref={containerRef}
      className="py-28 w-full overflow-hidden relative z-20"
    >
      {/* Section Header & Metrics Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center space-y-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D4FF00] text-black uppercase tracking-wider shadow-sm">
          ✦ Real Telemetry
        </span>

        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-neutral-900 dark:text-white max-w-2xl mx-auto">
          Validated by 20,000+ Riders Worldwide
        </h2>

        {/* 3 Quick Community Metrics */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-[#131418]/80 border border-black/10 dark:border-white/10">
            <Star className="w-4 h-4 fill-[#D4FF00] text-[#D4FF00]" />
            <span className="text-xs font-bold text-neutral-900 dark:text-white">4.9 / 5.0 Rating</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-[#131418]/80 border border-black/10 dark:border-white/10">
            <Gauge className="w-4 h-4 text-[#D4FF00]" />
            <span className="text-xs font-bold text-neutral-900 dark:text-white">2.4M+ Kilometers Logged</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-[#131418]/80 border border-black/10 dark:border-white/10">
            <HeartHandshake className="w-4 h-4 text-[#D4FF00]" />
            <span className="text-xs font-bold text-neutral-900 dark:text-white">99.4% Rider Satisfaction</span>
          </div>
        </div>
      </div>

      {/* Dual Parallax Stream */}
      <div className="space-y-6 select-none">
        {/* ROW 1: SLIDES LEFT */}
        <motion.div style={{ x: x1 }} className="flex gap-6 w-max pl-6">
          {TESTIMONIALS_ROW_1.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* ROW 2: SLIDES RIGHT */}
        <motion.div style={{ x: x2 }} className="flex gap-6 w-max pl-6">
          {TESTIMONIALS_ROW_2.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div className="w-[340px] md:w-[420px] rounded-3xl backdrop-blur-2xl bg-white/75 dark:bg-[#121316]/85 border border-black/10 dark:border-white/10 p-6 md:p-8 flex flex-col justify-between space-y-6 shadow-[0_15px_35px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.35)] hover:border-[#D4FF00]/60 transition-all duration-300">
      {/* Top Author & Verified Tag */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-black/5 dark:border-white/10">
            <Image
              src={item.avatar}
              alt={item.author}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                {item.author}
              </h4>
              <ShieldCheck className="w-4 h-4 text-[#D4FF00]" />
            </div>
            <p className="text-xs text-neutral-500 font-mono">{item.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-0.5 text-amber-500">
          {[...Array(item.rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
          ))}
        </div>
      </div>

      <p className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
        “{item.quote}”
      </p>

      <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] font-mono">
        <span className="flex items-center gap-1 text-neutral-800 dark:text-neutral-200 font-semibold px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
          <Zap className="w-3 h-3 text-[#D4FF00]" />
          {item.modelOwned}
        </span>
        <span className="text-neutral-500 dark:text-neutral-400 tabular-nums">
          Logged: <strong className="text-neutral-900 dark:text-white font-bold">{item.milesLogged}</strong>
        </span>
      </div>
    </div>
  );
}
