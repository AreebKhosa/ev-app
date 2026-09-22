"use client";

import React from "react";
import Link from "next/link";
import { Star, ShoppingBag, Plus, Minus, Check, ArrowRight, Lock, Gauge, BatteryCharging, Zap } from "lucide-react";
import { ProductColor, BatteryVariant } from "@/types/product";

interface ProductBuyBoxProps {
    name: string;
    modelCode?: string;
    category?: string;
    badge?: string;
    rating?: number;
    reviewsCount?: number;
    price: number;
    originalPrice?: number;
    stockLeft?: number;
    speed?: string;
    range?: string;
    power?: string;
    shortDescription?: string;
    colors: ProductColor[];
    selectedColor: ProductColor;
    setSelectedColor: (c: ProductColor) => void;
    batteryVariants: BatteryVariant[];
    selectedBattery: BatteryVariant;
    setSelectedBattery: (b: BatteryVariant) => void;
    quantity: number;
    setQuantity: (q: number) => void;
    totalPrice: number;
    isAdded: boolean;
    onAddToCart: () => void;
}

export function ProductBuyBox({
    name,
    modelCode,
    category,
    badge,
    rating = 4.9,
    reviewsCount = 128,
    price,
    originalPrice,
    stockLeft = 10,
    speed,
    range,
    power,
    shortDescription,
    colors = [],
    selectedColor,
    setSelectedColor,
    batteryVariants = [],
    selectedBattery,
    setSelectedBattery,
    quantity,
    setQuantity,
    totalPrice,
    isAdded,
    onAddToCart,
}: ProductBuyBoxProps) {
    const hasDiscount = originalPrice && originalPrice > price;

    return (
        <div className="lg:col-span-5 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#131418]/90 border border-black/10 dark:border-white/10 p-6 md:p-8 shadow-lg space-y-6">
            {/* Header / Badges / Model Code */}
            <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <div className="flex text-amber-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                            ))}
                        </div>
                        <span className="text-xs font-bold text-neutral-900 dark:text-white font-mono">
                            {rating}
                        </span>
                        <span className="text-xs text-neutral-500 underline cursor-pointer">
                            ({reviewsCount} reviews)
                        </span>
                    </div>

                    {modelCode && (
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-neutral-500">
                            {modelCode}
                        </span>
                    )}
                </div>

                <h1 className="text-2xl md:text-3xl font-black text-neutral-950 dark:text-white leading-tight">
                    {name}
                </h1>

                {shortDescription && (
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {shortDescription}
                    </p>
                )}
            </div>

            {/* Powertrain Performance Spec Badges */}
            {(speed || range || power) && (
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5">
                    {speed && (
                        <div className="text-center space-y-0.5">
                            <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-neutral-500">
                                <Gauge className="w-3 h-3 text-[#8ba800] dark:text-[#D4FF00]" />
                                <span>Speed</span>
                            </div>
                            <span className="text-xs font-bold text-neutral-900 dark:text-white font-mono">{speed}</span>
                        </div>
                    )}
                    {range && (
                        <div className="text-center space-y-0.5 border-x border-black/10 dark:border-white/10">
                            <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-neutral-500">
                                <BatteryCharging className="w-3 h-3 text-[#8ba800] dark:text-[#D4FF00]" />
                                <span>Range</span>
                            </div>
                            <span className="text-xs font-bold text-neutral-900 dark:text-white font-mono">{range}</span>
                        </div>
                    )}
                    {power && (
                        <div className="text-center space-y-0.5">
                            <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-neutral-500">
                                <Zap className="w-3 h-3 text-[#8ba800] dark:text-[#D4FF00]" />
                                <span>Power</span>
                            </div>
                            <span className="text-xs font-bold text-neutral-900 dark:text-white font-mono">{power}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Price & Installment */}
            <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2">
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-neutral-950 dark:text-white tabular-nums">
                        ${totalPrice.toLocaleString()}
                    </span>
                    {hasDiscount && (
                        <>
                            <span className="text-base line-through text-neutral-400 tabular-nums">
                                ${(originalPrice! * quantity).toLocaleString()}
                            </span>
                            <span className="text-xs font-mono font-bold text-[#8ba800] dark:text-[#D4FF00] bg-[#D4FF00]/10 px-2 py-0.5 rounded">
                                Save ${((originalPrice! - price) * quantity).toLocaleString()}
                            </span>
                        </>
                    )}
                </div>

                <p className="text-[11px] font-mono text-neutral-500">
                    Or 3 interest-free installments of{" "}
                    <strong className="text-neutral-900 dark:text-white">
                        ${(totalPrice / 3).toFixed(2)}
                    </strong>{" "}
                    with <span className="font-bold text-neutral-900 dark:text-white underline">Klarna</span> /{" "}
                    <span className="font-bold text-neutral-900 dark:text-white underline">ClearPay</span>.
                </p>
            </div>

            {/* Stock Alert */}
            {stockLeft > 0 && (
                <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    <span>
                        🔥 Only <strong>{stockLeft} units left</strong> in stock — Fast tracked dispatch!
                    </span>
                </div>
            )}

            {/* Option 1: Color Finish Swatches */}
            {colors.length > 0 && (
                <div className="space-y-2">
                    <span className="text-xs font-mono uppercase font-bold text-neutral-500 block">
                        Color Finish: <strong className="text-neutral-900 dark:text-white font-sans">{selectedColor?.name || "Selected"}</strong>
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                        {colors.map((c, idx) => (
                            <button
                                key={c.id || idx}
                                onClick={() => setSelectedColor(c)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                    selectedColor?.id === c.id || selectedColor?.name === c.name
                                        ? "border-[#D4FF00] bg-[#D4FF00]/10 text-neutral-900 dark:text-white ring-1 ring-[#D4FF00]"
                                        : "border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:border-black/20"
                                }`}
                            >
                                <span
                                    style={{ backgroundColor: c.hex || "#D4FF00" }}
                                    className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                                />
                                <span>{c.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Option 2: Battery Range Variant Selector */}
            {batteryVariants.length > 0 && (
                <div className="space-y-2">
                    <span className="text-xs font-mono uppercase font-bold text-neutral-500 block">
                        Battery Architecture & Range:
                    </span>
                    <div className="space-y-2">
                        {batteryVariants.map((bat, idx) => (
                            <button
                                key={bat.id || idx}
                                onClick={() => setSelectedBattery(bat)}
                                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                                    selectedBattery?.name === bat.name
                                        ? "border-[#D4FF00] bg-[#D4FF00]/10 ring-1 ring-[#D4FF00]"
                                        : "border-black/10 dark:border-white/10 hover:border-black/20"
                                }`}
                            >
                                <div className="space-y-0.5">
                                    <span className="text-xs font-bold text-neutral-900 dark:text-white block font-sans">
                                        {bat.name}
                                    </span>
                                    {bat.range && (
                                        <span className="text-[10px] font-mono text-neutral-500">
                                            ⚡ Est. Range: {bat.range} per single charge
                                        </span>
                                    )}
                                </div>

                                <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white tabular-nums">
                                    {bat.extraPrice === 0 ? "Included" : `+$${bat.extraPrice}`}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Quantity Stepper & Main CTAs */}
            <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
                        >
                            <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-black font-mono tabular-nums">
                            {quantity}
                        </span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
                        >
                            <Plus className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Add to Cart CTA */}
                    <button
                        onClick={onAddToCart}
                        className={`flex-1 py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md cursor-pointer ${
                            isAdded
                                ? "bg-[#D4FF00] text-black"
                                : "bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black"
                        }`}
                    >
                        {isAdded ? (
                            <>
                                <Check className="w-4 h-4 text-black" />
                                <span>Added to Cart!</span>
                            </>
                        ) : (
                            <>
                                <ShoppingBag className="w-4 h-4" />
                                <span>Add to Cart • ${totalPrice.toLocaleString()}</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Instant Buy Now Express Checkout */}
                <Link
                    href="/checkout"
                    className="w-full py-3.5 rounded-2xl bg-[#D4FF00] text-black hover:bg-[#c0e600] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg cursor-pointer"
                >
                    <span>Express Buy Now</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Payment & Security Badges */}
            <div className="pt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#8ba800] dark:text-[#D4FF00]" /> 256-Bit SSL Checkout
                </span>
                <span>Wire Transfer • Visa • USDT Vault</span>
            </div>
        </div>
    );
}
