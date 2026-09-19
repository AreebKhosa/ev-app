"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    SlidersHorizontal,
    ArrowUpDown,
    Gauge,
    BatteryCharging,
    Zap,
    ShoppingBag,
    Heart,
    Check,
    ArrowUpRight,
    RotateCcw,
    Sparkles,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
    ProductFilterSidebar,
    INITIAL_FILTERS,
    FilterState,
} from "@/components/products/product-filter-sidebar";
import { HeroScrollMediaFrame } from "@/components/products/listing-hero";
import { Product } from "@/types/product";
import { PRODUCTS_CATALOG } from "@/data/products";

const ALL_PRODUCTS: Product[] = PRODUCTS_CATALOG;

export default function ProductListingPage() {
    const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "speed" | "range">("featured");
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // ================= FILTERING & SORTING ENGINE =================
    const filteredProducts = useMemo(() => {
        return ALL_PRODUCTS.filter((product) => {
            // 1. Search Query
            if (
                searchQuery &&
                !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
                return false;
            }

            // 2. Category
            if (filters.category !== "all" && product.category !== filters.category) {
                return false;
            }

            // 3. Max Price
            if (product.price > filters.maxPrice) {
                return false;
            }

            // 4. Motor Output
            if (
                filters.motorPowers.length > 0 &&
                (!product.motorPower || !filters.motorPowers.includes(product.motorPower))
            ) {
                return false;
            }

            // 5. Min Range
            if (product.rangeKm !== undefined && product.rangeKm < filters.minRange) {
                return false;
            }

            // 6. Colors
            if (
                filters.colors.length > 0 &&
                !product.colors.some((c) => c.id && filters.colors.includes(c.id))
            ) {
                return false;
            }

            // 7. Features
            if (
                filters.features.length > 0 &&
                (!product.features || !filters.features.every((f) => product.features?.includes(f)))
            ) {
                return false;
            }

            return true;
        }).sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            if (sortBy === "speed") return (b.speedKm ?? 0) - (a.speedKm ?? 0);
            if (sortBy === "range") return (b.rangeKm ?? 0) - (a.rangeKm ?? 0);
            return 0; // "featured"
        });
    }, [filters, searchQuery, sortBy]);

    // Active filters count for mobile button badge
    const activeFiltersCount =
        (filters.category !== "all" ? 1 : 0) +
        (filters.maxPrice < 5000 ? 1 : 0) +
        filters.motorPowers.length +
        (filters.minRange > 0 ? 1 : 0) +
        filters.colors.length +
        filters.features.length;

    return (
        <main className="min-h-screen bg-[#E4E5E8] dark:bg-[#0A0A0D] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">

            {/* 1. Universal Glass Header */}
            <Header />

            {/* ================= HERO HEADER BANNER (WITH SCROLL FRAME VIDEO) ================= */}
            <div className="pt-28 pb-10 px-6 md:px-12 max-w-7xl mx-auto border-b border-black/5 dark:border-white/10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    {/* ================= LEFT SIDE: Headings & Search ================= */}
                    <div className="lg:col-span-6 space-y-5">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <span className="text-[#92b500] dark:text-[#D4FF00] font-bold">Fleet Models</span>
                        </div>

                        <div className="space-y-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#D4FF00] text-black uppercase tracking-wider">
                                ✦ 2025 Generation Fleet
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
                                Electric Fleet Lineup
                            </h1>
                            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed">
                                Precision-engineered for hyper-velocity urban commuting and rugged off-road exploration. Scroll to inspect 360° aerodynamics.
                            </p>
                        </div>

                        {/* Search Input Bar */}
                        <div className="relative w-full max-w-md pt-1">
                            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search model, powertrain, features..."
                                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/80 dark:bg-[#121316]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 text-xs font-medium placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D4FF00] shadow-sm transition-all"
                            />
                        </div>

                        {/* Quick Fleet Highlights */}
                        <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] font-mono text-neutral-500">
                            <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00]" /> 750W–1500W Dual Motors
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00]" /> Up to 150km Range
                            </span>
                        </div>
                    </div>

                    {/* ================= RIGHT SIDE: SCROLL-DRIVEN PICTURE FRAME / VIDEO ================= */}
                    <div className="lg:col-span-6 flex justify-center lg:justify-end">
                        <HeroScrollMediaFrame
                            framesPath="/frames/frame_"
                            framesCount={100}
                            framesExtension="jpg"
                            framePadding={4}
                            title="Volt Alpha 360°"
                            scrollRange={600}
                        />
                    </div>

                </div>
            </div>

            {/* ================= MAIN CONTENT AREA ================= */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex gap-8 items-start relative">

                {/* REUSABLE SIDEBAR COMPONENT */}
                <ProductFilterSidebar
                    filters={filters}
                    onFilterChange={(newFilters) => setFilters(newFilters)}
                    onReset={() => {
                        setFilters(INITIAL_FILTERS);
                        setSearchQuery("");
                    }}
                    totalResults={filteredProducts.length}
                    isOpenMobile={mobileFilterOpen}
                    onCloseMobile={() => setMobileFilterOpen(false)}
                />

                {/* ================= RIGHT PRODUCTS LISTING COLUMN ================= */}
                <div className="flex-1 w-full space-y-6">

                    {/* Top Control Bar: Total Found, Mobile Filter Button & Sorting */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-[#121316]/60 border border-black/10 dark:border-white/10">

                        {/* Left: Mobile Filter Button & Product Count */}
                        <div className="flex items-center gap-3">
                            {/* Mobile Filter Toggle Button */}
                            <button
                                onClick={() => setMobileFilterOpen(true)}
                                className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black font-bold text-xs shadow-md active:scale-95"
                            >
                                <SlidersHorizontal className="w-3.5 h-3.5" />
                                <span>Filters</span>
                                {activeFiltersCount > 0 && (
                                    <span className="w-4 h-4 rounded-full bg-[#D4FF00] text-black text-[10px] font-black flex items-center justify-center">
                                        {activeFiltersCount}
                                    </span>
                                )}
                            </button>

                            <span className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400 tabular-nums">
                                Showing <strong className="text-neutral-900 dark:text-white">{filteredProducts.length}</strong> of {ALL_PRODUCTS.length} vehicles
                            </span>
                        </div>

                        {/* Right: Sort By Dropdown */}
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                            <span className="text-xs font-mono text-neutral-500 hidden sm:inline">Sort:</span>
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 text-xs font-bold text-neutral-900 dark:text-white cursor-pointer focus:outline-none"
                                >
                                    <option value="featured" className="bg-white dark:bg-[#121316]">Featured First</option>
                                    <option value="price-low" className="bg-white dark:bg-[#121316]">Price: Low to High</option>
                                    <option value="price-high" className="bg-white dark:bg-[#121316]">Price: High to Low</option>
                                    <option value="speed" className="bg-white dark:bg-[#121316]">Top Speed</option>
                                    <option value="range" className="bg-white dark:bg-[#121316]">Longest Range</option>
                                </select>
                                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* ================= PRODUCT CARDS GRID ================= */}
                    {filteredProducts.length > 0 ? (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {filteredProducts.map((product) => (
                                    <PLPCard key={product.id} product={product} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        /* Empty State */
                        <div className="p-12 text-center rounded-3xl backdrop-blur-xl bg-white/50 dark:bg-[#121316]/50 border border-dashed border-black/20 dark:border-white/20 space-y-4 my-8">
                            <div className="w-12 h-12 rounded-2xl bg-[#D4FF00]/20 flex items-center justify-center mx-auto text-black dark:text-[#D4FF00]">
                                <Search className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                                No vehicles match your active criteria
                            </h3>
                            <p className="text-xs text-neutral-500 max-w-md mx-auto">
                                Try expanding your price range or resetting feature filters to discover available configurations.
                            </p>
                            <button
                                onClick={() => {
                                    setFilters(INITIAL_FILTERS);
                                    setSearchQuery("");
                                }}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Reset All Filters</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Universal Studio Footer */}
            <Footer />
        </main>
    );
}

// ================= INDIVIDUAL PRODUCT CARD =================
function PLPCard({ product }: { product: Product }) {
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1800);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="group relative rounded-3xl backdrop-blur-2xl bg-white/75 dark:bg-[#131418]/85 border border-black/10 dark:border-white/10 p-5 flex flex-col justify-between overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.4)] hover:border-[#D4FF00]/60 hover:-translate-y-1 transition-all duration-300"
        >
            {/* Top Header: Badge & Wishlist */}
            <div className="flex items-center justify-between z-10">
                {product.badge ? (
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#D4FF00] text-black shadow-sm">
                        {product.badge}
                    </span>
                ) : (
                    <span className="text-[10px] font-mono font-medium tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-neutral-500">
                        {product.categoryLabel}
                    </span>
                )}

                <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer"
                    aria-label="Wishlist"
                >
                    <Heart
                        className={`w-3.5 h-3.5 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-neutral-500"
                            }`}
                    />
                </button>
            </div>

            {/* Product Image */}
            <div className="relative w-full aspect-[4/3] my-3 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#D4FF00]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.2)] group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Color Finishes */}
            <div className="flex items-center justify-between pt-2 pb-1 border-t border-black/5 dark:border-white/10 z-10">
                <span className="text-[10px] font-mono text-neutral-500">
                    Finish: <strong className="text-neutral-800 dark:text-neutral-200">{selectedColor.name}</strong>
                </span>
                <div className="flex items-center gap-1.5">
                    {product.colors.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => setSelectedColor(c)}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                            className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${selectedColor.id === c.id
                                ? "ring-2 ring-black dark:ring-[#D4FF00] scale-125"
                                : "opacity-75 hover:opacity-100"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Name & Pricing */}
            <div className="py-2 z-10">
                <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-[#92b500] dark:group-hover:text-[#D4FF00] transition-colors">
                    {product.name}
                </h3>

                <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-lg font-black text-neutral-900 dark:text-white tabular-nums">
                        ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                        <span className="text-xs line-through text-neutral-400 tabular-nums">
                            ${product.originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>

            {/* 3 Telemetry Specs */}
            <div className="grid grid-cols-3 gap-1 py-1.5 my-1 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5 z-10 text-center">
                <div className="p-1">
                    <div className="flex items-center justify-center gap-1 text-[9px] text-neutral-500">
                        <Gauge className="w-2.5 h-2.5" />
                        <span>Speed</span>
                    </div>
                    <span className="text-[11px] font-bold text-neutral-900 dark:text-white tabular-nums">
                        {product.speedKm} km/h
                    </span>
                </div>

                <div className="p-1 border-x border-black/5 dark:border-white/5">
                    <div className="flex items-center justify-center gap-1 text-[9px] text-neutral-500">
                        <BatteryCharging className="w-2.5 h-2.5" />
                        <span>Range</span>
                    </div>
                    <span className="text-[11px] font-bold text-neutral-900 dark:text-white tabular-nums">
                        {product.rangeKm} km
                    </span>
                </div>

                <div className="p-1">
                    <div className="flex items-center justify-center gap-1 text-[9px] text-neutral-500">
                        <Zap className="w-2.5 h-2.5" />
                        <span>Motor</span>
                    </div>
                    <span className="text-[11px] font-bold text-neutral-900 dark:text-white tabular-nums">
                        {product.motorPower}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="pt-2.5 flex items-center gap-2 z-10">
                <button
                    onClick={handleAdd}
                    className={`flex-1 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-95 shadow-md ${isAdded
                        ? "bg-[#D4FF00] text-black"
                        : "bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black"
                        }`}
                >
                    {isAdded ? (
                        <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                        </>
                    ) : (
                        <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                        </>
                    )}
                </button>

                <Link
                    href={`/products/${product.id}`}
                    className="p-2 rounded-xl border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                    aria-label="Details"
                >
                    <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
}

