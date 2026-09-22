"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export interface AccessoryItem {
    id: string;
    name: string;
    price: number;
    image: string;
    desc: string;
}

interface CartAddonsProps {
    accessories: AccessoryItem[];
    onAddAccessory: (acc: AccessoryItem) => void;
}

export function CartAddons({ accessories, onAddAccessory }: CartAddonsProps) {
    return (
        <div className="p-6 rounded-3xl backdrop-blur-xl bg-white/60 dark:bg-[#121316]/70 border border-black/10 dark:border-white/10 space-y-4">
            <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4FF00]" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                    Recommended Add-Ons
                </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {accessories.map((acc) => (
                    <div
                        key={acc.id}
                        className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between gap-3"
                    >
                        <div className="space-y-0.5">
                            <h4 className="text-xs font-bold text-neutral-900 dark:text-white">{acc.name}</h4>
                            <p className="text-[10px] text-neutral-500 font-mono">${acc.price}</p>
                        </div>

                        <button
                            onClick={() => onAddAccessory(acc)}
                            className="px-3 py-1.5 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black text-[11px] font-bold transition-all shrink-0 cursor-pointer"
                        >
                            + Add
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
