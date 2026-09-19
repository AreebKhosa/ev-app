"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageSquare, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FAQS_DATA, FaqItem } from "@/data/faqs";

export function FaqSection({
  tag = "Knowledge Base",
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about our electric architecture, charging, maintenance, and warranty.",
  faqs = FAQS_DATA,
}: {
  tag?: string;
  title?: string;
  subtitle?: string;
  faqs?: FaqItem[];
}) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Sticky Header & Help Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D4FF00] text-black uppercase tracking-wider">
              ✦ {tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white leading-tight">
              {title}
            </h2>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Quick Support Card */}
          <div className="p-6 md:p-8 rounded-3xl backdrop-blur-2xl bg-white/70 dark:bg-[#131418]/80 border border-black/10 dark:border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-[#D4FF00] flex items-center justify-center text-black font-bold shadow-md">
              <MessageSquare className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                Still have unanswered questions?
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                Our EV engineering and support specialists are available 24/7 for live consultation.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black font-semibold text-xs hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black transition-all duration-300 shadow-md active:scale-95"
            >
              <span>Speak with an Expert</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Column: Scroll-Reactive Accordion List */}
        <div className="lg:col-span-7 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`rounded-3xl backdrop-blur-2xl transition-all duration-300 border overflow-hidden ${
                  isOpen
                    ? "bg-white/90 dark:bg-[#15161C] border-[#D4FF00]/80 shadow-[0_20px_40px_rgba(212,255,0,0.08)]"
                    : "bg-white/60 dark:bg-[#121316]/70 border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20"
                }`}
              >
                {/* Question Header Bar */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-6 md:p-7 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">
                      {faq.category}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-neutral-900 dark:text-white leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#D4FF00] text-black rotate-180 shadow-md"
                        : "bg-black/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-300"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Animated Answer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-7 pb-6 pt-1 border-t border-black/5 dark:border-white/10">
                        <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
