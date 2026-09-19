"use client";

import React from "react";
import { Mail, Phone, Sparkles } from "lucide-react";

export function DirectChannels() {
  return (
    <div className="p-6 rounded-3xl backdrop-blur-2xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10 shadow-sm space-y-4">
      <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#D4FF00]" />
        Direct Channels
      </h3>

      <div className="space-y-3 text-xs">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/5 dark:bg-white/5">
          <Mail className="w-4 h-4 text-[#92b500] dark:text-[#D4FF00]" />
          <div>
            <span className="text-[10px] font-mono text-neutral-500 block">General & Press</span>
            <a href="mailto:engineering@voltstudio.com" className="font-bold hover:underline">
              engineering@voltstudio.com
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/5 dark:bg-white/5">
          <Phone className="w-4 h-4 text-[#92b500] dark:text-[#D4FF00]" />
          <div>
            <span className="text-[10px] font-mono text-neutral-500 block">Toll-Free Dispatch</span>
            <a href="tel:+18008658380" className="font-bold hover:underline">
              +1 (800) 865-8380
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
