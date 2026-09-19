"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Mail } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  };

  const navGroups = [
    {
      title: "Fleet Models",
      links: [
        { label: "Volt Stealth Alpha", href: "/products/volt-stealth-alpha" },
        { label: "Apex Nomad 750", href: "/products/apex-nomad-750" },
        { label: "CyberTrack GT", href: "/products/cybertrack-gt-dual" },
        { label: "Pulse City Cruiser", href: "/products/pulse-city-cruiser" },
        { label: "Full Fleet Catalog", href: "/products", isNew: true },
      ],
    },
    {
      title: "Technology",
      links: [
        { label: "HyperDrive Motor", href: "/#specs" },
        { label: "21700 PowerCell Battery", href: "/#specs" },
        { label: "Retina TFT Cockpit", href: "/#specs" },
        { label: "Mobile Companion App", href: "/profile" },
        { label: "Firmware Release Notes", href: "/admin" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Volt Studio", href: "/#studio" },
        { label: "Sustainability & ESG", href: "/#specs" },
        { label: "Showroom Locations", href: "/contact" },
        { label: "Rider Telemetry", href: "/profile" },
        { label: "Master Admin Suite", href: "/admin" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Rider Handbook & Manuals", href: "/#faq" },
        { label: "Warranty & Replacement", href: "/#faq" },
        { label: "Certified Service Centers", href: "/contact" },
        { label: "Track My Cart / Order", href: "/cart" },
        { label: "Contact Engineering", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="relative w-full pt-20 pb-12 overflow-hidden border-t border-black/10 dark:border-white/10 bg-white/40 dark:bg-[#07080A] z-20">
      {/* Giant Typography Background Watermark */}
      <div className="absolute -bottom-10 inset-x-0 flex justify-center pointer-events-none select-none opacity-[0.03] dark:opacity-[0.06] -z-10">
        <span className="text-[22vw] font-black tracking-tighter leading-none">
          VOLT
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Top Section: Newsletter CTA */}
        <div className="p-8 md:p-12 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D4FF00] text-black uppercase tracking-wider">
              ✦ Priority Access
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              Join the Next Generation of Mobility
            </h3>
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
              Receive secret test ride invites, early-bird hardware drops, and software release updates.
            </p>
          </div>

          {/* Email Subscription Form */}
          <form onSubmit={handleSubmit} className="w-full lg:w-auto flex-1 max-w-md flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D4FF00] transition-all"
              />
            </div>

            <button
              type="submit"
              className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-md ${
                subscribed
                  ? "bg-[#D4FF00] text-black"
                  : "bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black"
              }`}
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Subscribed!</span>
                </>
              ) : (
                <>
                  <span>Join Waitlist</span>
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Middle Section: Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pt-4">
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-[#D4FF00] flex items-center justify-center font-black text-black text-sm shadow-md">
                V
              </div>
              <span className="font-black text-lg tracking-wider bg-gradient-to-r from-neutral-900 to-[#92b500] dark:from-white dark:to-[#D4FF00] bg-clip-text text-transparent uppercase">
                Volt Studio
              </span>
            </Link>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xs">
              Pioneering ultra-performance electric vehicles designed for the urban grid and wild terrains.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] animate-pulse" />
              <span className="text-[11px] font-mono text-neutral-500">
                Global Production Live
              </span>
            </div>
          </div>

          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-900 dark:text-white">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-xs text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-[#D4FF00] transition-colors flex items-center gap-1.5"
                    >
                      <span>{link.label}</span>
                      {link.isNew && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#D4FF00] text-black">
                          NEW
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright & Links */}
        <div className="pt-8 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p>© {new Date().getFullYear()} Volt Studio Mobility Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/admin" className="hover:text-black dark:hover:text-white transition-colors">
              Admin Suite
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
