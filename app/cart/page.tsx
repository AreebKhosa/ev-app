"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trash2,
    Plus,
    Minus,
    ShoppingBag,
    ArrowRight,
    ShieldCheck,
    Truck,
    RotateCcw,
    Lock,
    Tag,
    Check,
    Zap,
    ArrowUpRight,
    Sparkles,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface CartItem {
    id: string;
    name: string;
    modelCode: string;
    category: string;
    price: number;
    colorName: string;
    colorHex: string;
    image: string;
    quantity: number;
    hasArmorCare?: boolean;
}

const INITIAL_CART: CartItem[] = [
    {
        id: "apex-nomad-750",
        name: "Apex Nomad Pro",
        modelCode: "VOLT (750-GT)",
        category: "All-Terrain Beast",
        price: 3299,
        colorName: "Acid Lime Finish",
        colorHex: "#D4FF00",
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=600&auto=format&fit=crop",
        quantity: 1,
        hasArmorCare: true,
    },
    {
        id: "volt-stealth-alpha",
        name: "Volt Stealth Alpha",
        modelCode: "VOLT (500-URBAN)",
        category: "Urban Commuter",
        price: 2499,
        colorName: "Matte Black",
        colorHex: "#1A1A1E",
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=600&auto=format&fit=crop",
        quantity: 1,
    },
];

const ACCESSORIES = [
    {
        id: "acc-1",
        name: "HyperCharge 4A Fast Charger",
        price: 189,
        image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=300&auto=format&fit=crop",
        desc: "Recharge from 0 to 80% in just 1.8 hours.",
    },
    {
        id: "acc-2",
        name: "Titanium GPS Smart Lock",
        price: 99,
        image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=300&auto=format&fit=crop",
        desc: "Fingerprint & companion app unlocked.",
    },
];

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
    const [promoCode, setPromoCode] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoError, setPromoError] = useState(false);

    // Quantity updates
    const updateQty = (id: string, delta: number) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newQty = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQty };
                }
                return item;
            })
        );
    };

    // Remove Item
    const removeItem = (id: string) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    // Toggle Armor Care (+$199)
    const toggleArmorCare = (id: string) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, hasArmorCare: !item.hasArmorCare } : item
            )
        );
    };

    // Add accessory directly into cart
    const addAccessory = (acc: (typeof ACCESSORIES)[0]) => {
        setCart((prev) => [
            ...prev,
            {
                id: acc.id + "-" + Date.now(),
                name: acc.name,
                modelCode: "ACCESSORY",
                category: "Hardware",
                price: acc.price,
                colorName: "Standard",
                colorHex: "#D4FF00",
                image: acc.image,
                quantity: 1,
            },
        ]);
    };

    // Calculations
    const subtotal = cart.reduce((acc, item) => {
        const carePrice = item.hasArmorCare ? 199 : 0;
        return acc + (item.price + carePrice) * item.quantity;
    }, 0);

    const discountAmount = (subtotal * discountPercent) / 100;
    const estimatedTax = (subtotal - discountAmount) * 0.08;
    const grandTotal = subtotal - discountAmount + estimatedTax;

    const handleApplyPromo = (e: React.FormEvent) => {
        e.preventDefault();
        if (promoCode.trim().toUpperCase() === "VOLT10") {
            setDiscountPercent(10);
            setPromoApplied(true);
            setPromoError(false);
        } else {
            setPromoError(true);
            setPromoApplied(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#E4E5E8] dark:bg-[#0A0A0D] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 overflow-x-hidden">

            {/* 1. Universal Header */}
            <Header />

            <div className="pt-28 pb-20 px-4 md:px-10 max-w-7xl mx-auto space-y-10">

                {/* ================= HEADER TITLE ================= */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-1">
                            <Link href="/" className="hover:text-black dark:hover:text-white">Home</Link>
                            <span>/</span>
                            <span className="text-[#92b500] dark:text-[#D4FF00] font-bold">Fleet Cart</span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 dark:text-white uppercase leading-none">
                            Your Fleet Order
                        </h1>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/70 dark:bg-[#121316]/80 backdrop-blur-md border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 font-bold">
                            {cart.reduce((acc, it) => acc + it.quantity, 0)} Units in Queue
                        </span>
                    </div>
                </div>

                {/* ================= MAIN CART CONTENT ================= */}
                {cart.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* ================= LEFT COLUMN: CART ITEMS LIST (7 cols) ================= */}
                        <div className="lg:col-span-7 space-y-6">

                            <div className="space-y-4">
                                <AnimatePresence mode="popLayout">
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                            className="p-5 md:p-6 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center gap-5 justify-between"
                                        >
                                            {/* Product Thumbnail & Details */}
                                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                                <div className="relative w-24 h-20 md:w-28 md:h-24 rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shrink-0 flex items-center justify-center p-2">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-contain filter drop-shadow-md"
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-mono text-neutral-500 uppercase">
                                                        {item.category}
                                                    </span>
                                                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                                                        {item.name}
                                                    </h3>

                                                    {/* Color Swatch */}
                                                    <div className="flex items-center gap-1.5 pt-0.5 text-xs text-neutral-500">
                                                        <span
                                                            style={{ backgroundColor: item.colorHex }}
                                                            className="w-2.5 h-2.5 rounded-full border border-black/20 dark:border-white/20"
                                                        />
                                                        <span className="text-[11px] font-mono">{item.colorName}</span>
                                                    </div>

                                                    {/* Unit Price */}
                                                    <p className="text-sm font-black text-neutral-900 dark:text-white tabular-nums pt-1">
                                                        ${item.price.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Quantity Stepper & Actions */}
                                            <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-black/5 dark:border-white/10">

                                                {/* Stepper */}
                                                <div className="flex items-center gap-2 p-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                                                    <button
                                                        onClick={() => updateQty(item.id, -1)}
                                                        className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                                                        aria-label="Decrease Quantity"
                                                    >
                                                        <Minus className="w-3.5 h-3.5" />
                                                    </button>

                                                    <span className="w-6 text-center text-xs font-black font-mono tabular-nums">
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        onClick={() => updateQty(item.id, 1)}
                                                        className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                                                        aria-label="Increase Quantity"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>

                                                {/* Total per row & Trash button */}
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-black text-neutral-950 dark:text-white tabular-nums">
                                                        ${((item.price + (item.hasArmorCare ? 199 : 0)) * item.quantity).toLocaleString()}
                                                    </span>

                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="p-2 rounded-xl text-neutral-400 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                                                        aria-label="Remove Item"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Recommended Upgrades / Add-ons */}
                            <div className="p-6 rounded-3xl backdrop-blur-xl bg-white/60 dark:bg-[#121316]/70 border border-black/10 dark:border-white/10 space-y-4">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-[#D4FF00]" />
                                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                                        Recommended Add-Ons
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {ACCESSORIES.map((acc) => (
                                        <div
                                            key={acc.id}
                                            className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between gap-3"
                                        >
                                            <div className="space-y-0.5">
                                                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">{acc.name}</h4>
                                                <p className="text-[10px] text-neutral-500 font-mono">${acc.price}</p>
                                            </div>

                                            <button
                                                onClick={() => addAccessory(acc)}
                                                className="px-3 py-1.5 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black text-[11px] font-bold transition-all shrink-0 cursor-pointer"
                                            >
                                                + Add
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* ================= RIGHT COLUMN: ORDER SUMMARY & CHECKOUT (5 cols) ================= */}
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
                            <form onSubmit={handleApplyPromo} className="space-y-2 pt-1">
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
                                <button className="w-full py-4 rounded-2xl bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl cursor-pointer">
                                    <span>Proceed to Encrypted Checkout</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>

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

                    </div>
                ) : (
                    /* ================= EMPTY CART STATE ================= */
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
                )}

            </div>

            {/* Universal Footer */}
            <Footer />
        </main>
    );
}