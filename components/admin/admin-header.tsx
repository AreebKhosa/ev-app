"use client";

import React from "react";
import { Menu, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface AdminHeaderProps {
  title: string;
  subtitle: string;
  onOpenMobileSidebar: () => void;
}

export function AdminHeader({ title, subtitle, onOpenMobileSidebar }: AdminHeaderProps) {
  return (
    <header className="flex items-center justify-between pb-6 border-b border-black/10 dark:border-white/10 gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 rounded-xl lg:hidden bg-black/5 dark:bg-white/10 text-neutral-800 dark:text-neutral-200"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-tight">
            {title}
          </h1>
          <p className="text-xs text-neutral-500 font-medium">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
          <span>Production Live</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
