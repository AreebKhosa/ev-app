"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/contact/contact-form";
import { DirectChannels } from "@/components/contact/direct-channels";
import { ShowroomList } from "@/components/contact/showroom-list";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#E4E5E8] dark:bg-[#0A0A0D] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 overflow-x-hidden">
      {/* 1. Header */}
      <Header />

      <div className="pt-28 pb-20 px-4 md:px-10 max-w-7xl mx-auto space-y-12">
        {/* Hero Header */}
        <div className="space-y-4 border-b border-black/10 dark:border-white/10 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#92b500] dark:text-[#D4FF00] font-bold">Contact Desk</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#D4FF00] text-black uppercase tracking-wider">
                ✦ 24/7 Global Engineering Dispatch
              </span>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-neutral-950 dark:text-white uppercase leading-none">
                Connect with Studio
              </h1>
            </div>

            <div className="flex items-center gap-2 p-2 px-3 rounded-2xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10 backdrop-blur-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] animate-pulse" />
              <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
                Avg Response: <strong className="text-neutral-900 dark:text-white font-bold">&lt; 15 mins</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Column: Direct Channels & Showrooms (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <DirectChannels />
            <ShowroomList />
          </div>
        </div>
      </div>

      {/* Universal Footer */}
      <Footer />
    </main>
  );
}