"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Truck, ArrowRight, Lock, UserCheck, LogIn, UserPlus } from "lucide-react";

export interface ShippingFormData {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
}

interface CheckoutShippingStepProps {
    shippingData: ShippingFormData;
    setShippingData: React.Dispatch<React.SetStateAction<ShippingFormData>>;
    onContinue: () => void;
    isAuthenticated?: boolean;
    currentUser?: any;
}

export function CheckoutShippingStep({
    shippingData,
    setShippingData,
    onContinue,
    isAuthenticated = false,
    currentUser,
}: CheckoutShippingStepProps) {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated) {
            router.push("/login?redirect=/checkout");
            return;
        }
        onContinue();
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 p-6 md:p-8 shadow-sm space-y-6"
        >
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
                <h2 className="text-lg font-bold text-neutral-950 dark:text-white flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#D4FF00]" />
                    Shipping & Delivery Address
                </h2>
                <span className="text-xs font-mono text-neutral-500">Step 1 of 2</span>
            </div>

            {/* Authentication Gate Status Banner */}
            {!isAuthenticated ? (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#D4FF00]/10 to-transparent border border-[#D4FF00]/30 space-y-3">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#D4FF00] text-black flex items-center justify-center font-bold shadow-sm">
                            <Lock className="w-4 h-4" />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                                Sign In Required for Checkout
                            </h4>
                            <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                                You must be signed in to reserve vehicle inventory and receive live order updates.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 pt-1">
                        <Link
                            href="/login?redirect=/checkout"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-950 text-white dark:bg-[#D4FF00] dark:text-black font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-md"
                        >
                            <LogIn className="w-3.5 h-3.5" />
                            <span>Sign In to Checkout</span>
                        </Link>
                        <Link
                            href="/signup?redirect=/checkout"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-neutral-800 dark:text-neutral-200 font-bold text-xs transition-all"
                        >
                            <UserPlus className="w-3.5 h-3.5" />
                            <span>Create Account</span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="p-3.5 rounded-2xl bg-[#D4FF00]/10 border border-[#D4FF00]/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <UserCheck className="w-4 h-4 text-[#92b500] dark:text-[#D4FF00]" />
                        <span className="text-xs font-mono text-neutral-800 dark:text-neutral-200">
                            Signed in as <strong className="text-neutral-950 dark:text-white">{currentUser?.name || currentUser?.email || "Authenticated User"}</strong>
                        </span>
                    </div>
                    <Link
                        href="/login?redirect=/checkout"
                        className="text-[11px] font-mono text-neutral-500 hover:text-black dark:hover:text-[#D4FF00] underline"
                    >
                        Switch Account
                    </Link>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-4 text-xs font-mono"
            >
                {/* Email */}
                <div className="space-y-1">
                    <label className="text-[11px] text-neutral-500 uppercase font-bold">Contact Email *</label>
                    <input
                        type="email"
                        required
                        value={shippingData.email}
                        onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                        placeholder="alex.vance@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-sans text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                    />
                </div>

                {/* First & Last Name */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label className="text-[11px] text-neutral-500 uppercase font-bold">First Name *</label>
                        <input
                            type="text"
                            required
                            value={shippingData.firstName}
                            onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                            placeholder="Alex"
                            className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-sans text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] text-neutral-500 uppercase font-bold">Last Name *</label>
                        <input
                            type="text"
                            required
                            value={shippingData.lastName}
                            onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                            placeholder="Vance"
                            className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-sans text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-1">
                    <label className="text-[11px] text-neutral-500 uppercase font-bold">Street Address *</label>
                    <input
                        type="text"
                        required
                        value={shippingData.address}
                        onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                        placeholder="540 Mission St, Apt 4B"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-sans text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                    />
                </div>

                {/* City, Postal, Country */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                        <label className="text-[11px] text-neutral-500 uppercase font-bold">City *</label>
                        <input
                            type="text"
                            required
                            value={shippingData.city}
                            onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                            placeholder="San Francisco"
                            className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-sans text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] text-neutral-500 uppercase font-bold">Postal Code *</label>
                        <input
                            type="text"
                            required
                            value={shippingData.postalCode}
                            onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                            placeholder="94105"
                            className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-sans text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] text-neutral-500 uppercase font-bold">Country</label>
                        <input
                            type="text"
                            disabled
                            value={shippingData.country}
                            className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-sans text-neutral-500"
                        />
                    </div>
                </div>

                {/* Phone */}
                <div className="space-y-1">
                    <label className="text-[11px] text-neutral-500 uppercase font-bold">Phone Number (For Delivery Driver) *</label>
                    <input
                        type="tel"
                        required
                        value={shippingData.phone}
                        onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-sans text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg cursor-pointer mt-4"
                >
                    {isAuthenticated ? (
                        <>
                            <span>Continue to Bank Transfer Payment</span>
                            <ArrowRight className="w-4 h-4" />
                        </>
                    ) : (
                        <>
                            <LogIn className="w-4 h-4" />
                            <span>Sign In to Continue Checkout</span>
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
}
