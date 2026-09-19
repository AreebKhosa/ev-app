"use client";

import React from "react";
import Image from "next/image";
import { User } from "@/types/user";

export function RiderHeader({ profile }: { profile: User }) {
  return (
    <div className="p-6 md:p-8 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
      {/* User Info */}
      <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-3xl overflow-hidden border-2 border-[#D4FF00] shadow-md shrink-0">
          <Image src={profile.avatar || ""} alt={profile.name} fill className="object-cover" />
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-[#D4FF00] border-2 border-white dark:border-black" />
        </div>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl md:text-3xl font-black text-neutral-950 dark:text-white">
              {profile.name}
            </h1>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#D4FF00] text-black shadow-sm">
              {profile.tier}
            </span>
          </div>
          <p className="text-xs text-neutral-500 font-mono">
            {profile.email} • Joined {profile.joined || profile.memberSince}
          </p>
        </div>
      </div>

      {/* Quick Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
        <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
          <span className="text-[10px] font-mono text-neutral-500 uppercase block">Distance</span>
          <span className="text-sm font-black text-neutral-900 dark:text-white tabular-nums">
            {profile.stats?.totalKm} km
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
          <span className="text-[10px] font-mono text-neutral-500 uppercase block">CO₂ Saved</span>
          <span className="text-sm font-black text-[#92b500] dark:text-[#D4FF00] tabular-nums">
            {profile.stats?.co2Saved}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
          <span className="text-[10px] font-mono text-neutral-500 uppercase block">Total Rides</span>
          <span className="text-sm font-black text-neutral-900 dark:text-white tabular-nums">
            {profile.stats?.ridesCount}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
          <span className="text-[10px] font-mono text-neutral-500 uppercase block">Battery Health</span>
          <span className="text-sm font-black text-neutral-900 dark:text-white tabular-nums">
            {profile.stats?.avgBatteryHealth}
          </span>
        </div>
      </div>
    </div>
  );
}
