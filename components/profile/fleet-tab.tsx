"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, Unlock, BatteryCharging, Gauge, MapPin, ArrowUpRight } from "lucide-react";
import { OwnedVehicle } from "@/types/user";

export function FleetTab({
  vehicles,
  onToggleLock,
}: {
  vehicles: OwnedVehicle[];
  onToggleLock: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {vehicles.map((veh) => (
        <div
          key={veh.id}
          className="rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 p-6 md:p-8 shadow-sm space-y-6 flex flex-col justify-between"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-neutral-500">{veh.modelCode}</span>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{veh.name}</h3>
              <p className="text-[11px] font-mono text-neutral-400">VIN: {veh.vin}</p>
            </div>

            {/* Remote Lock / Unlock Switch */}
            <button
              onClick={() => onToggleLock(veh.id)}
              className={`p-3 rounded-2xl flex items-center gap-2 text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-md ${
                veh.isLocked
                  ? "bg-neutral-950 text-white dark:bg-white dark:text-black"
                  : "bg-[#D4FF00] text-black ring-2 ring-black dark:ring-white"
              }`}
            >
              {veh.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              <span>{veh.isLocked ? "Armed & Locked" : "Unlocked"}</span>
            </button>
          </div>

          {/* Vehicle Image */}
          <div className="relative w-full aspect-[16/9] my-auto flex items-center justify-center">
            <Image
              src={veh.image}
              alt={veh.name}
              fill
              className="object-contain filter drop-shadow-xl"
            />
          </div>

          {/* Live Telemetry Grid */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center text-xs font-mono">
            <div>
              <span className="text-[10px] text-neutral-500 block flex items-center justify-center gap-1">
                <BatteryCharging className="w-3 h-3 text-[#D4FF00]" /> Battery
              </span>
              <span className="font-bold text-neutral-900 dark:text-white tabular-nums">
                {veh.batteryLevel}%
              </span>
            </div>

            <div className="border-x border-black/5 dark:border-white/5">
              <span className="text-[10px] text-neutral-500 block flex items-center justify-center gap-1">
                <Gauge className="w-3 h-3 text-[#D4FF00]" /> Range
              </span>
              <span className="font-bold text-neutral-900 dark:text-white tabular-nums">
                {veh.rangeKm} km
              </span>
            </div>

            <div>
              <span className="text-[10px] text-neutral-500 block">Firmware</span>
              <span className="font-bold text-neutral-900 dark:text-white">
                {veh.firmware.split(" ")[0]}
              </span>
            </div>
          </div>

          {/* Bottom GPS Location */}
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 pt-2 border-t border-black/5 dark:border-white/10">
            <span className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00] shrink-0" />
              {veh.lastLocation}
            </span>
            <Link href={`/products/${veh.id}`} className="hover:text-black dark:hover:text-white flex items-center gap-1 shrink-0">
              <span>Telemetry</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
