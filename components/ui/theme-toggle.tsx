"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2 rounded-full backdrop-blur-md bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200 hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer"
      aria-label="Toggle Theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#D4FF00] transition-transform duration-300 rotate-0 hover:rotate-90" />
      ) : (
        <Moon className="w-4 h-4 text-neutral-800 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}
