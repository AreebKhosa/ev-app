"use client";

import React, { useState } from "react";
import { MapPin, ShieldCheck, User, Phone, Check, Loader2 } from "lucide-react";
import { User as UserType } from "@/types/user";
import { api } from "@/services/api";

interface SettingsTabProps {
  user?: UserType;
  onUserUpdate?: (updated: Partial<UserType>) => void;
}

export function SettingsTab({ user, onUserUpdate }: SettingsTabProps) {
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [shippingAddress, setShippingAddress] = useState(
    user?.shippingAddress || "123 Market St, Suite 400, San Francisco, CA"
  );
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      const res = await api.auth.updateProfile({ name, phone, shippingAddress });
      if (res.data?.user) {
        setSavedSuccess(true);
        // Sync local storage
        const cached = localStorage.getItem("volt_user");
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            parsed.name = name;
            parsed.phone = phone;
            parsed.shippingAddress = shippingAddress;
            localStorage.setItem("volt_user", JSON.stringify(parsed));
          } catch (e) {}
        }
        if (onUserUpdate) {
          onUserUpdate({ name, phone, shippingAddress });
        }
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to update profile settings:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Account Info Card */}
      <form onSubmit={handleSave} className="p-6 md:p-8 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 space-y-5">
        <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <User className="w-4 h-4 text-[#84a300] dark:text-[#D4FF00]" />
            Personal & Shipping Details
          </h3>
          {savedSuccess && (
            <span className="text-xs font-mono text-[#84a300] dark:text-[#D4FF00] flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Saved!
            </span>
          )}
        </div>

        <div className="space-y-4 text-xs font-mono">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-neutral-500 uppercase">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Vance"
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-sans text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-neutral-500 uppercase">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-sans text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-neutral-500 uppercase flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#84a300] dark:text-[#D4FF00]" />
              Default Delivery Address
            </label>
            <textarea
              rows={3}
              required
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Enter street, suite, city, state, postal code..."
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-sans text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-3 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>Save Account Settings</span>
            )}
          </button>
        </div>
      </form>

      {/* Security & Authentication Settings */}
      <div className="p-6 md:p-8 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 space-y-4 flex flex-col justify-between">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2 border-b border-black/10 dark:border-white/10 pb-3">
            <ShieldCheck className="w-4 h-4 text-[#84a300] dark:text-[#D4FF00]" />
            Account Security & Privacy
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/5 dark:bg-white/5">
              <div>
                <span className="font-bold block text-neutral-900 dark:text-white">Email Authentication</span>
                <span className="text-[11px] text-neutral-500 font-mono">{user?.email || "Encrypted Session"}</span>
              </div>
              <span className="font-mono text-[10px] bg-[#D4FF00] text-black px-2 py-0.5 rounded-full font-bold">VERIFIED</span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/5 dark:bg-white/5">
              <div>
                <span className="font-bold block text-neutral-900 dark:text-white">Session Security</span>
                <span className="text-[11px] text-neutral-500 font-mono">256-bit JWT Encryption</span>
              </div>
              <span className="font-mono text-[10px] text-[#84a300] dark:text-[#D4FF00] font-bold">ACTIVE</span>
            </div>
          </div>
        </div>

        <div className="pt-4 text-[11px] font-mono text-neutral-400">
          Volt Studio Mobility Account Services • Protected by End-to-End Encryption
        </div>
      </div>
    </div>
  );
}
