"use client";

import React from "react";
import { MapPin, Clock } from "lucide-react";
import { SHOWROOMS_DATA } from "@/data/contact";
import { Showroom } from "@/types/contact";

export function ShowroomList({ showrooms = SHOWROOMS_DATA }: { showrooms?: Showroom[] }) {
  return (
    <div className="p-6 rounded-3xl backdrop-blur-2xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10 shadow-sm space-y-4">
      <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
        Showrooms & Experience Hubs
      </h3>

      <div className="space-y-3">
        {showrooms.map((hub, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" />
                {hub.city}
              </h4>
              <span className="text-[10px] font-mono text-neutral-500">{hub.role}</span>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400">{hub.address}</p>

            <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-neutral-500 border-t border-black/5 dark:border-white/10">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {hub.hours}
              </span>
              <span>{hub.phone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
