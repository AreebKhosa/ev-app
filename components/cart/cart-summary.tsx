"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck, RotateCcw, Tag, Check } from "lucide-react";

interface CartSummaryProps {
    subtotal: number;
    discountPercent: number;
    discountAmount: number;
    estimatedTax: number;
    grandTotal: number;
    promoCode: string;
    setPromoCode: (val: string) => void;
    promoApplied: boolean;
    promoError: boolean;
    onApplyPromo: (e: React.FormEvent) => void;
}

export function CartSummary({
    subtotal,
    discountPercent,
    discountAmount,
    estimatedTax,
    grandTotal,
    promoCode,
    setPromoCode,
    promoApplied,
    promoError,
    onApplyPromo,
}: CartSummaryProps) {
    return (
        <div className="lg:col-span-5 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#131418]/90 border border-black/10 dark:border-white/10 p-6 md:p-8 shadow-lg space-y-6 sticky top-28">
            <h2 className="text-lg font-black text-neutral-900 dark:text-white uppercase tracking-tight">
                Order Telemetry
            </h2>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Subtotal</span>
                    <span className="font-bold text-neutral-900 dark:text-white tabular-nums">
                        ${subtotal.toLocaleString()}
                    </span>
                </div>

                {discountAmount > 0 && (
                    <div className="flex justify-between text-[#92b500] dark:text-[#D4FF00]">
                        <span>Promo Discount ({discountPercent}%)</span>
                        <span className="font-bold tabular-nums">
                            -${discountAmount.toLocaleString()}
                        </span>
                    </div>
                )}

                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Global Air Freight</span>
                    <span className="text-[#92b500] dark:text-[#D4FF00] font-bold">FREE</span>
                </div>

                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-bold text-neutral-900 dark:text-white tabular-nums">
                        ${estimatedTax.toFixed(2)}
                    </span>
                </div>

                <div className="h-[1px] bg-black/10 dark:border-white/10 my-2" />

                {/* Final Total */}
                <div className="flex justify-between items-baseline text-sm pt-1">
                    <span className="font-bold text-neutral-900 dark:text-white uppercase">
                        Total Due
                    </span>
                    <span className="text-2xl font-black text-neutral-950 dark:text-white tabular-nums">
                        ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
            </div>

            {/* Promo Code Box */}
            <form onSubmit={onApplyPromo} className="space-y-2 pt-1">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Promo code (Try VOLT10)"
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono uppercase placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-[#D4FF00] transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black font-bold text-xs transition-colors cursor-pointer"
                    >
                        Apply
                    </button>
                </div>

                {promoApplied && (
                    <p className="text-[11px] font-mono text-[#92b500] dark:text-[#D4FF00] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> 10% Discount applied successfully!
                    </p>
                )}
                {promoError && (
                    <p className="text-[11px] font-mono text-red-500">
                        Invalid code. Use <strong className="underline">VOLT10</strong> for 10% off.
                    </p>
                )}
            </form>

            {/* Checkout CTA */}
            <div className="space-y-3 pt-2">
                <Link
                    href="/checkout"
                    className="w-full py-4 rounded-2xl bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl cursor-pointer"
                >
                    <span>Proceed to Encrypted Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-neutral-500">
                    <Lock className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" />
                    <span>256-bit Encrypted SSL Payment Protocol</span>
                </div>
            </div>

            {/* Guarantee Badges */}
            <div className="pt-4 border-t border-black/5 dark:border-white/10 grid grid-cols-2 gap-3 text-[10px] font-mono text-neutral-500">
                <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" />
                    <span>3-Year Warranty</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" />
                    <span>30-Day Free Return</span>
                </div>
            </div>
        </div>
    );
}
