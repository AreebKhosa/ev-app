"use client";

import React, { useState } from "react";
import { Zap, Check, ShieldCheck, Truck, RotateCcw, PackageCheck } from "lucide-react";
import { SpecificationItem, WarrantyAndShipping } from "@/types/product";

interface ProductTabsProps {
    description?: string;
    features?: string[];
    specifications?: SpecificationItem[];
    whatsInTheBox?: string[];
    warrantyAndShipping?: WarrantyAndShipping;
    reviewsCount?: number;
}

export function ProductTabs({
    description,
    features = [],
    specifications = [],
    whatsInTheBox = [],
    warrantyAndShipping,
    reviewsCount = 428,
}: ProductTabsProps) {
    const [activeNavTab, setActiveNavTab] = useState<"features" | "specs" | "box" | "delivery" | "reviews">("features");

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/70 dark:bg-[#121316]/80 backdrop-blur-xl border border-black/10 dark:border-white/10 sticky top-20 z-30 overflow-x-auto no-scrollbar">
                {[
                    { id: "features", label: "Overview & Features" },
                    { id: "specs", label: `Technical Specifications (${specifications.length})` },
                    { id: "box", label: `What's In The Box (${whatsInTheBox.length})` },
                    { id: "delivery", label: "Warranty & Shipping" },
                    { id: "reviews", label: `Customer Reviews (${reviewsCount})` },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveNavTab(tab.id as any)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                            activeNavTab === tab.id
                                ? "bg-neutral-950 text-white dark:bg-white dark:text-black shadow-sm"
                                : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* TAB 1: FEATURES & OVERVIEW */}
            {activeNavTab === "features" && (
                <div className="space-y-6">
                    {description && (
                        <div className="p-8 rounded-3xl backdrop-blur-2xl bg-white/75 dark:bg-[#121316]/85 border border-black/10 dark:border-white/10 space-y-3">
                            <span className="text-[10px] font-mono uppercase font-bold text-[#8ba800] dark:text-[#D4FF00]">
                                Engineering Architecture
                            </span>
                            <h3 className="text-xl font-black text-neutral-950 dark:text-white">
                                Performance Overview
                            </h3>
                            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-4xl">
                                {description}
                            </p>
                        </div>
                    )}

                    {features.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {features.map((feat, idx) => (
                                <div
                                    key={idx}
                                    className="p-5 rounded-3xl backdrop-blur-xl bg-white/75 dark:bg-[#121316]/85 border border-black/10 dark:border-white/10 flex items-start gap-3.5"
                                >
                                    <div className="p-2 rounded-xl bg-[#D4FF00]/15 text-[#8ba800] dark:text-[#D4FF00] shrink-0 mt-0.5">
                                        <Zap className="w-4 h-4" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                                            {feat}
                                        </h4>
                                        <p className="text-xs text-neutral-500 font-mono">
                                            Precision engineered standard on this vehicle specification.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* TAB 2: FULL TECHNICAL SPECS TABLE */}
            {activeNavTab === "specs" && (
                <div className="rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 overflow-hidden shadow-sm">
                    {specifications.length === 0 ? (
                        <div className="p-8 text-center text-xs text-neutral-500 font-mono">
                            No detailed technical specifications configured.
                        </div>
                    ) : (
                        <table className="w-full text-left text-xs font-mono">
                            <tbody className="divide-y divide-black/5 dark:divide-white/5">
                                {specifications.map((spec, i) => (
                                    <tr key={i} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-bold text-neutral-500 uppercase w-1/3 bg-black/[0.02] dark:bg-white/[0.02]">
                                            {spec.label}
                                        </td>
                                        <td className="p-4 font-bold text-neutral-900 dark:text-white font-sans">
                                            {spec.value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {/* TAB 3: WHAT'S IN THE BOX */}
            {activeNavTab === "box" && (
                <div className="p-8 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 space-y-6">
                    <div className="space-y-1">
                        <h4 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                            <PackageCheck className="w-5 h-5 text-[#8ba800] dark:text-[#D4FF00]" />
                            <span>Package Contents & Inclusions</span>
                        </h4>
                        <p className="text-xs text-neutral-500 font-mono">
                            Everything included inside the reinforced factory freight delivery crate:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {whatsInTheBox.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5"
                            >
                                <div className="w-6 h-6 rounded-full bg-[#D4FF00] text-black flex items-center justify-center shrink-0">
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </div>
                                <span className="text-xs font-bold text-neutral-900 dark:text-white">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB 4: WARRANTY & SHIPPING */}
            {activeNavTab === "delivery" && (
                <div className="p-8 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 space-y-6">
                    <div className="space-y-2">
                        <h4 className="text-xl font-bold text-neutral-900 dark:text-white">
                            Global Logistics & Warranty Coverage
                        </h4>
                        <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            Every vehicle is pre-assembled and certified by master technicians before dispatch. Tracked via freight carrier directly to your residential or corporate delivery address.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 space-y-2 border border-black/5">
                            <ShieldCheck className="w-5 h-5 text-[#8ba800] dark:text-[#D4FF00]" />
                            <span className="text-[10px] font-mono text-neutral-500 uppercase block">Warranty</span>
                            <p className="text-xs font-bold text-neutral-900 dark:text-white">
                                {warrantyAndShipping?.warranty || "2 Years Full Coverage"}
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 space-y-2 border border-black/5">
                            <RotateCcw className="w-5 h-5 text-[#8ba800] dark:text-[#D4FF00]" />
                            <span className="text-[10px] font-mono text-neutral-500 uppercase block">Trial Period</span>
                            <p className="text-xs font-bold text-neutral-900 dark:text-white">
                                {warrantyAndShipping?.trialPeriod || "30-Day Risk Free"}
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 space-y-2 border border-black/5">
                            <Truck className="w-5 h-5 text-[#8ba800] dark:text-[#D4FF00]" />
                            <span className="text-[10px] font-mono text-neutral-500 uppercase block">Freight Shipping</span>
                            <p className="text-xs font-bold text-neutral-900 dark:text-white">
                                {warrantyAndShipping?.shipping || "Free Express Freight"}
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 space-y-2 border border-black/5">
                            <Zap className="w-5 h-5 text-[#8ba800] dark:text-[#D4FF00]" />
                            <span className="text-[10px] font-mono text-neutral-500 uppercase block">Dispatch Time</span>
                            <p className="text-xs font-bold text-neutral-900 dark:text-white">
                                {warrantyAndShipping?.dispatchTime || "Within 24 Hours"}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 5: REVIEWS */}
            {activeNavTab === "reviews" && (
                <div className="p-8 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h4 className="text-xl font-bold text-neutral-900 dark:text-white">Verified Customer Reviews</h4>
                            <p className="text-xs text-neutral-500 font-mono">4.9 out of 5 stars based on {reviewsCount} owner submissions</p>
                        </div>
                        <button className="px-5 py-2.5 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black font-bold text-xs transition-colors cursor-pointer">
                            Write a Review
                        </button>
                    </div>

                    {/* Review Snippets */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-xs">Marcus R. (Verified Owner)</span>
                                <span className="text-[10px] font-mono text-neutral-500">2 days ago</span>
                            </div>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                "The torque on this machine is outrageous. Climbed a 35-degree trail without even dropping into lowest gear. Worth every penny."
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-xs">Elena K. (Urban Commuter)</span>
                                <span className="text-[10px] font-mono text-neutral-500">1 week ago</span>
                            </div>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                "Battery longevity is real. I get almost 120km on a single charge with pedal assist level 2. Built like a supercar."
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
