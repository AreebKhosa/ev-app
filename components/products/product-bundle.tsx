"use client";

import React from "react";
import { Check } from "lucide-react";

export interface BundleItem {
    id: string;
    name: string;
    price: number;
    checked: boolean;
}

interface ProductBundleProps {
    bundle: BundleItem[];
    toggleBundleItem: (id: string) => void;
    bundleTotalPrice: number;
    onAddBundleToCart: () => void;
}

export function ProductBundle({
    bundle,
    toggleBundleItem,
    bundleTotalPrice,
    onAddBundleToCart,
}: ProductBundleProps) {
    return (
        <div className="p-6 md:p-8 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 space-y-6 shadow-sm">
            <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#92b500] dark:text-[#D4FF00] font-bold">
                    ✦ Rider Bundle Discount
                </span>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    Frequently Bought Together
                </h3>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="space-y-3 flex-1">
                    {bundle.map((item) => (
                        <label
                            key={item.id}
                            onClick={() => toggleBundleItem(item.id)}
                            className="flex items-center gap-3 text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer select-none"
                        >
                            <div
                                className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                                    item.checked
                                        ? "bg-[#D4FF00] border-[#D4FF00] text-black"
                                        : "border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5"
                                }`}
                            >
                                {item.checked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={item.checked ? "font-bold text-neutral-900 dark:text-white" : ""}>
                                {item.name} (+${item.price})
                            </span>
                        </label>
                    ))}
                </div>

                <div className="flex items-center gap-4 border-t lg:border-t-0 lg:border-l border-black/10 dark:border-white/10 pt-4 lg:pt-0 lg:pl-6 shrink-0 w-full lg:w-auto justify-between lg:justify-end">
                    <div>
                        <span className="text-[10px] font-mono text-neutral-500 uppercase block">Bundle Total</span>
                        <span className="text-2xl font-black text-neutral-900 dark:text-white tabular-nums">
                            ${bundleTotalPrice.toLocaleString()}
                        </span>
                    </div>

                    <button
                        onClick={onAddBundleToCart}
                        className="px-5 py-3 rounded-2xl bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black font-bold text-xs shadow-md active:scale-95 cursor-pointer"
                    >
                        Add All to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
