"use client";

import React from "react";

export function TelemetryTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10 space-y-3">
        <span className="text-xs font-mono text-neutral-500 uppercase block">Weekly Mileage</span>
        <p className="text-3xl font-black text-neutral-900 dark:text-white">184.2 km</p>
        <div className="h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#D4FF00] w-[75%]" />
        </div>
        <span className="text-[10px] font-mono text-[#92b500] dark:text-[#D4FF00] block">+12% vs last week</span>
      </div>

      <div className="p-6 rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10 space-y-3">
        <span className="text-xs font-mono text-neutral-500 uppercase block">Peak Speed Reached</span>
        <p className="text-3xl font-black text-neutral-900 dark:text-white">62.8 km/h</p>
        <span className="text-[10px] font-mono text-neutral-500 block">Logged on Alpine Trail Mode</span>
      </div>

      <div className="p-6 rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10 space-y-3">
        <span className="text-xs font-mono text-neutral-500 uppercase block">Regenerative Recovery</span>
        <p className="text-3xl font-black text-[#92b500] dark:text-[#D4FF00]">18.4 kWh</p>
        <span className="text-[10px] font-mono text-neutral-500 block">Energy returned to battery pack</span>
      </div>
    </div>
  );
}
