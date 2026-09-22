"use client";

import React from "react";
import Image from "next/image";
import { Tag, ShieldCheck } from "lucide-react";
import { CheckoutOrderItem } from "./checkout-receipt-step";
import { getOptimizedImageUrl } from "@/lib/image";

interface CheckoutOrderSummaryProps {
    items: CheckoutOrderItem[];
    subtotal: number;
    discountPercent: number;
    discountAmount: number;
    tax: number;
    totalDue: number;
    promoCode: string;
    setPromoCode: (val: string) => void;
    onApplyPromo: () => void;
}

export function CheckoutOrderSummary({
    items,
    subtotal,
    discountPercent,
    discountAmount,
    tax,
    totalDue,
    promoCode,
    setPromoCode,
    onApplyPromo,
}: CheckoutOrderSummaryProps) {
    return (
        <div className="lg:col-span-5 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#131418]/90 border border-black/10 dark:border-white/10 p-6 md:p-8 shadow-lg space-y-6 lg:sticky lg:top-24">
            <h3 className="text-base font-bold text-neutral-950 dark:text-white uppercase font-mono">
                Order Summary ({items.length})
            </h3>

            {/* Items List */}
            <div className="space-y-3 divide-y divide-black/5 dark:divide-white/5">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 pt-3 first:pt-0">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 shrink-0 flex items-center justify-center p-1">
                            <Image src={getOptimizedImageUrl(item.image)} alt={item.name} fill unoptimized className="object-contain" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neutral-900 text-white text-[9px] font-black flex items-center justify-center">
                                {item.quantity}
                            </span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate">{item.name}</h4>
                            <p className="text-[10px] font-mono text-neutral-500">{item.color}</p>
                        </div>

                        <span className="text-xs font-black text-neutral-900 dark:text-white tabular-nums">
                            ${(item.price * item.quantity).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>

            {/* Promo Code Box */}
            <div className="pt-2 border-t border-black/5 dark:border-white/10">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Discount code (VOLT10)"
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono uppercase placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                        />
                    </div>
                    <button
                        onClick={onApplyPromo}
                        className="px-4 py-2 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black font-bold text-xs hover:bg-[#D4FF00] hover:text-black transition-colors cursor-pointer"
                    >
                        Apply
                    </button>
                </div>
            </div>

            {/* Totals */}
            <div className="space-y-2.5 text-xs font-mono border-t border-black/5 dark:border-white/10 pt-4">
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Subtotal</span>
                    <span className="font-bold tabular-nums text-neutral-900 dark:text-white">${subtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                    <div className="flex justify-between text-[#92b500] dark:text-[#D4FF00]">
                        <span>Discount ({discountPercent}%)</span>
                        <span className="font-bold tabular-nums">-${discountAmount.toLocaleString()}</span>
                    </div>
                )}

                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Insured Air Shipping</span>
                    <span className="font-bold text-[#92b500] dark:text-[#D4FF00]">FREE</span>
                </div>

                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-bold tabular-nums text-neutral-900 dark:text-white">${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-baseline text-sm pt-2 border-t border-black/10 dark:border-white/10">
                    <span className="font-bold text-neutral-900 dark:text-white uppercase">Total Due</span>
                    <span className="text-2xl font-black text-neutral-950 dark:text-white tabular-nums">
                        ${totalDue.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* Guarantee */}
            <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" /> 3-Year Armor Warranty
                </span>
                <span>30-Day Free Return</span>
            </div>
        </div>
    );
}
