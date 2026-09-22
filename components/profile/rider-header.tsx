"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { LogOut, Camera, Loader2, ShoppingBag, ShieldCheck, MapPin, Sparkles } from "lucide-react";
import { User, ProfileOrder } from "@/types/user";
import { api } from "@/services/api";

interface UserHeaderProps {
  profile: User;
  orders?: ProfileOrder[];
  onLogout?: () => void;
  onAvatarUpdate?: (newAvatarUrl: string) => void;
}

export function RiderHeader({ profile, orders = [], onLogout, onAvatarUpdate }: UserHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(profile.avatar || "");

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      const res = await api.upload.avatar(file);
      if (res.data?.url) {
        const newUrl = res.data.url;
        setCurrentAvatar(newUrl);
        // Persist to backend user profile
        await api.auth.updateProfile({ avatar: newUrl });
        // Update local storage cached user
        const cachedUser = localStorage.getItem("volt_user");
        if (cachedUser) {
          try {
            const parsed = JSON.parse(cachedUser);
            parsed.avatar = newUrl;
            localStorage.setItem("volt_user", JSON.stringify(parsed));
          } catch (e) {}
        }
        if (onAvatarUpdate) onAvatarUpdate(newUrl);
      }
    } catch (err) {
      console.error("Avatar upload failed:", err);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const totalSpent = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  return (
    <div className="p-6 md:p-8 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
      {/* Hidden file input for uploading profile picture from PC */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />

      {/* User Info */}
      <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <div className="relative group shrink-0">
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-3xl overflow-hidden border-2 border-[#D4FF00] shadow-md bg-neutral-900 flex items-center justify-center">
            {currentAvatar ? (
              <Image src={currentAvatar} alt={profile.name} fill unoptimized className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#D4FF00] to-lime-600 text-black font-black text-2xl">
                {profile.name?.slice(0, 2).toUpperCase() || "VU"}
              </div>
            )}
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-[#D4FF00] border-2 border-white dark:border-black" />
          </div>

          {/* Upload Button Overlay */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingAvatar}
            className="absolute inset-0 rounded-3xl bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 text-white transition-opacity cursor-pointer"
            title="Upload Profile Picture from PC"
          >
            {uploadingAvatar ? (
              <Loader2 className="w-5 h-5 animate-spin text-[#D4FF00]" />
            ) : (
              <>
                <Camera className="w-5 h-5 text-[#D4FF00]" />
                <span className="text-[9px] font-mono font-bold">Change Photo</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white">
              {profile.name}
            </h1>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#D4FF00] text-black shadow-sm flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 fill-current" />
              {profile.tier || "Verified Customer"}
            </span>
          </div>
          <p className="text-xs text-neutral-500 font-mono">
            {profile.email} • Joined {profile.joined || profile.memberSince || "2025"}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-mono text-[#84a300] dark:text-[#D4FF00] hover:underline cursor-pointer flex items-center gap-1"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Upload Photo from PC</span>
            </button>

            {onLogout && (
              <>
                <span className="text-neutral-400">•</span>
                <button
                  onClick={onLogout}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 hover:underline cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Real Live Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
        <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
          <span className="text-[10px] font-mono text-neutral-500 uppercase block">Orders Placed</span>
          <span className="text-sm font-black text-neutral-900 dark:text-white tabular-nums">
            {orders.length}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
          <span className="text-[10px] font-mono text-neutral-500 uppercase block">Total Spent</span>
          <span className="text-sm font-black text-[#84a300] dark:text-[#D4FF00] tabular-nums">
            ${totalSpent.toLocaleString()}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
          <span className="text-[10px] font-mono text-neutral-500 uppercase block">Account Tier</span>
          <span className="text-sm font-black text-neutral-900 dark:text-white">
            {profile.tier || "Member"}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
          <span className="text-[10px] font-mono text-neutral-500 uppercase block">Security</span>
          <span className="text-sm font-black text-neutral-900 dark:text-white">
            Encrypted
          </span>
        </div>
      </div>
    </div>
  );
}
