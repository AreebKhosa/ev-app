"use client";

import React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface CheckoutHeaderProps {
    step: 1 | 2 | 3;
}

export function CheckoutHeader({ step }: CheckoutHeaderProps) {
    return (
        <header className="border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#121316]/80 backdrop-blur-xl px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-40">
            <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#D4FF00] flex items-center justify-center font-black text-black text-sm shadow-md">
                    V
                </div>
                <span className="font-black text-base tracking-wider uppercase">
                    Volt Studio
                </span>
            </Link>

            {/* Multi-Step Indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
                <span className={step >= 1 ? "text-neutral-900 dark:text-white font-bold" : "text-neutral-400"}>
                    1. Shipping
                </span>
                <span className="text-neutral-400">→</span>
                <span className={step >= 2 ? "text-neutral-900 dark:text-white font-bold" : "text-neutral-400"}>
                    2. Bank Payment & Proof
                </span>
                <span className="text-neutral-400">→</span>
                <span className={step === 3 ? "text-[#92b500] dark:text-[#D4FF00] font-bold" : "text-neutral-400"}>
                    3. Official Receipt
                </span>
            </div>

            <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs font-mono text-neutral-500">
                    <Lock className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" /> 256-Bit SSL
                </span>
                <ThemeToggle />
            </div>
        </header>
    );
}
