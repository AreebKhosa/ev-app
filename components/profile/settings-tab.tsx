"use client";

import React, { useState } from "react";
import { MapPin, ShieldCheck } from "lucide-react";

export function SettingsTab() {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("540 Mission St, Apt 4B, San Francisco, CA 94105");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Shipping Address Card */}
      <div className="p-6 md:p-8 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D4FF00]" /> Default Shipping Address
          </h3>
          <button
            onClick={() => setIsEditingAddress(!isEditingAddress)}
            className="text-xs font-mono text-[#92b500] dark:text-[#D4FF00] hover:underline"
          >
            {isEditingAddress ? "Done" : "Edit"}
          </button>
        </div>

        {isEditingAddress ? (
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            rows={3}
            className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
          />
        ) : (
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {shippingAddress}
          </p>
        )}
      </div>

      {/* Security & 2FA Card */}
      <div className="p-6 md:p-8 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4FF00]" /> Security & Biometrics
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <span>Two-Factor Authentication (2FA)</span>
            <span className="font-mono text-[11px] text-[#92b500] dark:text-[#D4FF00] font-bold">ENABLED</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <span>Remote Keyless Telemetry</span>
            <span className="font-mono text-[11px] text-[#92b500] dark:text-[#D4FF00] font-bold">ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
