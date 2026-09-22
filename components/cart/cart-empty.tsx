"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowUpRight } from "lucide-react";

export function CartEmpty() {
    return (
        <div className="p-16 text-center rounded-3xl backdrop-blur-2xl bg-white/60 dark:bg-[#121316]/70 border border-dashed border-black/20 dark:border-white/20 space-y-4 my-8 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#D4FF00]/20 text-black dark:text-[#D4FF00] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Your Fleet Queue is Empty
            </h3>

            <p className="text-xs text-neutral-500 leading-relaxed">
                Explore our performance electric fleet and customize your vehicle with smart telemetry.
            </p>

            <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black text-xs font-bold transition-all shadow-md active:scale-95"
            >
                <span>Explore Fleet Lineup</span>
                <ArrowUpRight className="w-4 h-4" />
            </Link>
        </div>
    );
}
