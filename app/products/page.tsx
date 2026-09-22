"use client";

import React, { useState, useMemo, useEffect } from "react";
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
    X,
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
import { api } from "@/services/api";
import { useCart } from "@/context/cart-context";
import { getOptimizedImageUrl } from "@/lib/image";

export default function ProductListingPage() {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [rawCategories, setRawCategories] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "speed" | "range">("featured");
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // Fetch Live Products and Categories from Backend
    useEffect(() => {
        const loadFleet = async () => {
            try {
                const [prodRes, catRes] = await Promise.all([
                    api.products.getAll(),
                    api.categories.getAll(),
                ]);

                if (catRes.data) {
                    setRawCategories(catRes.data);
                }

                if (prodRes.data && prodRes.data.length > 0) {
                    const mapped: Product[] = prodRes.data.map((p: any) => ({
                        id: p.id,
                        name: p.name,
                        modelCode: p.modelCode || `VOLT-${p.id.slice(-4)}`,
                        category: p.category ? p.category.toLowerCase().replace(/\s+/g, "-") : "urban",
                        categoryLabel: p.category || "Electric Fleet",
                        badge: p.badge || (p.stock < 5 ? "Limited Production" : undefined),
                        price: Number(p.price) || 2499,
                        originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
                        image: getOptimizedImageUrl(p.image),
                        colors: p.colors && p.colors.length > 0 ? p.colors : [
                            { id: "volt", name: "Acid Lime", hex: "#D4FF00" },
                            { id: "black", name: "Stealth Black", hex: "#111111" },
                        ],
                        speed: p.speed || "45 km/h",
                        speedKm: parseInt(String(p.speed).replace(/[^0-9]/g, "")) || 45,
                        range: p.range || "85 km",
                        rangeKm: parseInt(String(p.range).replace(/[^0-9]/g, "")) || 85,
                        power: p.power || "750W",
                        motorPower: p.power || "750W",
                        stock: p.stock || 10,
                        features: Array.isArray(p.features) ? p.features : ["Hydraulic Disc Brakes", "IP67 Waterproof"],
                    }));
                    setAllProducts(mapped);
                }
            } catch (err) {
                console.error("Failed to fetch fleet products:", err);
            } finally {
                setLoading(false);
            }
        };

        loadFleet();
    }, []);

    // Main Categories strictly from backend Category table
    const availableCategories = useMemo(() => {
        const list = [
            { id: "all", label: "All Vehicles", count: allProducts.length },
        ];

        rawCategories.forEach((c) => {
            const count = allProducts.filter(
                (p) =>
                    (p.categoryLabel || "").toLowerCase() === c.name.toLowerCase() ||
                    (p.category || "").toLowerCase() === c.name.toLowerCase() ||
                    (p.category || "").toLowerCase().replace(/\s+/g, "-") === c.name.toLowerCase().replace(/\s+/g, "-")
            ).length;
            list.push({ id: c.name, label: c.name, count });
        });

        return list;
    }, [allProducts, rawCategories]);

    // ================= FILTERING & SORTING ENGINE =================
    const filteredProducts = useMemo(() => {
        return allProducts.filter((product) => {
            // 1. Search Query
            const catStr = (product.categoryLabel || product.category || "").toLowerCase();
            const powerStr = (product.power || product.motorPower || "").toLowerCase();
            const modelStr = (product.modelCode || "").toLowerCase();
            if (
                searchQuery &&
                !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !catStr.includes(searchQuery.toLowerCase()) &&
                !powerStr.includes(searchQuery.toLowerCase()) &&
                !modelStr.includes(searchQuery.toLowerCase())
            ) {
                return false;
            }

            // 2. Category (matches exact backend category name or slug)
            if (filters.category && filters.category !== "all") {
                const targetCat = filters.category.toLowerCase().trim();
                const prodCat = (product.category || "").toLowerCase().trim();
                const prodCatLabel = (product.categoryLabel || "").toLowerCase().trim();
                const prodSlug = prodCat.replace(/\s+/g, "-");
                const targetSlug = targetCat.replace(/\s+/g, "-");

                if (prodCat !== targetCat && prodCatLabel !== targetCat && prodSlug !== targetSlug) {
                    return false;
                }
            }

            // 3. Price Filter (minPrice & maxPrice)
            if (filters.minPrice !== undefined && filters.minPrice > 0) {
                if (product.price < filters.minPrice) return false;
            }
            if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
                if (product.price > filters.maxPrice) return false;
            }

            // 4. Min Speed Filter
            if (filters.minSpeed !== undefined && filters.minSpeed > 0) {
                const spd = product.speedKm ?? (parseInt(String(product.speed || "0").replace(/[^0-9]/g, ""), 10) || 0);
                if (spd < filters.minSpeed) return false;
            }

            // 5. Min Range Filter
            if (filters.minRange !== undefined && filters.minRange > 0) {
                const rng = product.rangeKm ?? (parseInt(String(product.range || "0").replace(/[^0-9]/g, ""), 10) || 0);
                if (rng < filters.minRange) return false;
            }

            // 6. Motor Power Filter
            if (filters.motorPower && filters.motorPower !== "all") {
                const pwr = (product.power || product.motorPower || "").toLowerCase();
                const targetPwr = filters.motorPower.toLowerCase();
                if (!pwr.includes(targetPwr)) return false;
            }

            // 7. In Stock Only Filter
            if (filters.inStockOnly) {
                if (!product.stock || product.stock <= 0) return false;
            }

            return true;
        }).sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            if (sortBy === "speed") {
                const spdA = a.speedKm ?? (parseInt(String(a.speed || "0").replace(/[^0-9]/g, ""), 10) || 0);
                const spdB = b.speedKm ?? (parseInt(String(b.speed || "0").replace(/[^0-9]/g, ""), 10) || 0);
                return spdB - spdA;
            }
            if (sortBy === "range") {
                const rngA = a.rangeKm ?? (parseInt(String(a.range || "0").replace(/[^0-9]/g, ""), 10) || 0);
                const rngB = b.rangeKm ?? (parseInt(String(b.range || "0").replace(/[^0-9]/g, ""), 10) || 0);
                return rngB - rngA;
            }
            return 0; // "featured"
        });
    }, [allProducts, filters, searchQuery, sortBy]);

    const hasActiveFilters =
        filters.category !== "all" ||
        filters.minPrice !== undefined ||
        filters.maxPrice !== undefined ||
        filters.minSpeed !== undefined ||
        filters.minRange !== undefined ||
        (filters.motorPower && filters.motorPower !== "all") ||
        filters.inStockOnly === true ||
        Boolean(searchQuery);

    return (
        <main className="min-h-screen bg-[#E4E5E8] dark:bg-[#0A0A0D] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
            {/* Universal Glass Header */}
            <Header />

            {/* HERO HEADER BANNER (WITH SCROLL FRAME VIDEO) */}
            <div className="pt-28 pb-10 px-6 md:px-12 max-w-7xl mx-auto border-b border-black/5 dark:border-white/10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* LEFT SIDE: Headings & Search */}
                    <div className="lg:col-span-6 space-y-5">
                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <span className="text-[#92b500] dark:text-[#D4FF00] font-bold">Fleet Models</span>
                        </div>

                        <div className="space-y-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#D4FF00] text-black uppercase tracking-wider">
                                ✦ Live Fleet Catalog
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
                                Electric Fleet Lineup
                            </h1>
                            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed">
                                Precision-engineered for hyper-velocity urban commuting and rugged off-road exploration. Synchronized directly with live factory inventory.
                            </p>
                        </div>

                        {/* Search Input Bar */}
                        <div className="relative w-full max-w-md pt-1">
                            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search model, category, specs..."
                                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/80 dark:bg-[#121316]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 text-xs font-medium placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D4FF00] shadow-sm transition-all"
                            />
                        </div>
                    </div>

                    {/* RIGHT SIDE: SCROLL-DRIVEN PICTURE FRAME */}
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

            {/* MAIN CONTENT AREA */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex gap-8 items-start relative">
                {/* Main Filters Sidebar */}
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
                    availableCategories={availableCategories}
                />

                {/* RIGHT PRODUCTS LISTING COLUMN */}
                <div className="flex-1 w-full space-y-6">
                    {/* Top Control Bar */}
                    <div className="flex flex-col gap-3 p-4 rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-[#121316]/60 border border-black/10 dark:border-white/10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setMobileFilterOpen(true)}
                                    className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black font-bold text-xs shadow-md active:scale-95 cursor-pointer"
                                >
                                    <SlidersHorizontal className="w-3.5 h-3.5" />
                                    <span>Filters</span>
                                </button>

                                <span className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400 tabular-nums">
                                    Showing <strong className="text-neutral-900 dark:text-white">{filteredProducts.length}</strong> of {allProducts.length} vehicles
                                </span>
                            </div>

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

                        {/* Active Filter Badges */}
                        {hasActiveFilters && (
                            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-black/5 dark:border-white/5 text-[11px] font-mono">
                                <span className="text-neutral-500">Active:</span>

                                {filters.category !== "all" && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#D4FF00]/15 text-[#728a00] dark:text-[#D4FF00] font-bold">
                                        <span>Category: {filters.category}</span>
                                        <button
                                            onClick={() => setFilters((p) => ({ ...p, category: "all" }))}
                                            className="hover:text-red-500 cursor-pointer"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}

                                {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#D4FF00]/15 text-[#728a00] dark:text-[#D4FF00] font-bold">
                                        <span>Price: {filters.minPrice ? `$${filters.minPrice}` : "$0"} - {filters.maxPrice ? `$${filters.maxPrice}` : "Max"}</span>
                                        <button
                                            onClick={() => setFilters((p) => ({ ...p, minPrice: undefined, maxPrice: undefined }))}
                                            className="hover:text-red-500 cursor-pointer"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}

                                {filters.minSpeed !== undefined && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#D4FF00]/15 text-[#728a00] dark:text-[#D4FF00] font-bold">
                                        <span>Speed: {filters.minSpeed}+ km/h</span>
                                        <button
                                            onClick={() => setFilters((p) => ({ ...p, minSpeed: undefined }))}
                                            className="hover:text-red-500 cursor-pointer"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}

                                {filters.minRange !== undefined && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#D4FF00]/15 text-[#728a00] dark:text-[#D4FF00] font-bold">
                                        <span>Range: {filters.minRange}+ km</span>
                                        <button
                                            onClick={() => setFilters((p) => ({ ...p, minRange: undefined }))}
                                            className="hover:text-red-500 cursor-pointer"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}

                                {filters.motorPower && filters.motorPower !== "all" && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#D4FF00]/15 text-[#728a00] dark:text-[#D4FF00] font-bold">
                                        <span>Motor: {filters.motorPower}</span>
                                        <button
                                            onClick={() => setFilters((p) => ({ ...p, motorPower: "all" }))}
                                            className="hover:text-red-500 cursor-pointer"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}

                                {filters.inStockOnly && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#D4FF00]/15 text-[#728a00] dark:text-[#D4FF00] font-bold">
                                        <span>In Stock Only</span>
                                        <button
                                            onClick={() => setFilters((p) => ({ ...p, inStockOnly: false }))}
                                            className="hover:text-red-500 cursor-pointer"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}

                                {searchQuery && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/10 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 font-bold">
                                        <span>Search: &quot;{searchQuery}&quot;</span>
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="hover:text-red-500 cursor-pointer"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}

                                <button
                                    onClick={() => {
                                        setFilters(INITIAL_FILTERS);
                                        setSearchQuery("");
                                    }}
                                    className="text-[10px] text-red-500 hover:underline cursor-pointer ml-1"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}
                    </div>

                    {/* PRODUCT CARDS GRID */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <div
                                    key={n}
                                    className="h-96 rounded-3xl bg-black/5 dark:bg-white/5 animate-pulse border border-black/5 dark:border-white/5"
                                />
                            ))}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {filteredProducts.map((product) => (
                                    <PLPCard key={product.id} product={product} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="p-12 text-center rounded-3xl backdrop-blur-xl bg-white/50 dark:bg-[#121316]/50 border border-dashed border-black/20 dark:border-white/20 space-y-4 my-8">
                            <div className="w-12 h-12 rounded-2xl bg-[#D4FF00]/20 flex items-center justify-center mx-auto text-black dark:text-[#D4FF00]">
                                <Search className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                                No vehicles in this category
                            </h3>
                            <p className="text-xs text-neutral-500 max-w-md mx-auto">
                                Try selecting another category from the sidebar or resetting the filter to view the entire fleet.
                            </p>
                            <button
                                onClick={() => {
                                    setFilters(INITIAL_FILTERS);
                                    setSearchQuery("");
                                }}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Show All Vehicles</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}

// INDIVIDUAL PRODUCT CARD
function PLPCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const defaultColors =
        product.colors && product.colors.length > 0
            ? product.colors
            : [{ id: "volt", name: "Acid Lime", hex: "#D4FF00" }];
    const [selectedColor, setSelectedColor] = useState(defaultColors[0]);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const activeImage = getOptimizedImageUrl(
        selectedColor?.image || product.image || (product.gallery && product.gallery[0])
    );

    const handleAdd = () => {
        addToCart({
            id: product.id,
            name: product.name,
            modelCode: product.modelCode,
            category: product.categoryLabel || product.category || "Electric Fleet",
            price: product.price,
            colorName: selectedColor?.name || "Standard",
            colorHex: selectedColor?.hex || "#D4FF00",
            image: activeImage,
            quantity: 1,
        });
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
                        {product.categoryLabel || product.category}
                    </span>
                )}

                <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer"
                    aria-label="Wishlist"
                >
                    <Heart
                        className={`w-3.5 h-3.5 transition-colors ${
                            isWishlisted ? "fill-red-500 text-red-500" : "text-neutral-500"
                        }`}
                    />
                </button>
            </div>

            {/* Product Image */}
            <Link
                href={`/products/${product.id}`}
                className="relative w-full aspect-[4/3] my-3 flex items-center justify-center cursor-pointer block"
            >
                <div className="absolute inset-0 bg-[#D4FF00]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <Image
                    src={activeImage}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.2)] group-hover:scale-105 transition-transform duration-500"
                />
            </Link>

            {/* Color Finishes */}
            {defaultColors.length > 0 && (
                <div className="flex items-center justify-between pt-2 pb-1 border-t border-black/5 dark:border-white/10 z-10">
                    <span className="text-[10px] font-mono text-neutral-500">
                        Finish: <strong className="text-neutral-800 dark:text-neutral-200">{selectedColor?.name}</strong>
                    </span>
                    <div className="flex items-center gap-1.5">
                        {defaultColors.map((c, i) => (
                            <button
                                key={c.id || c.name || i}
                                onClick={() => setSelectedColor(c)}
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                                className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                                    selectedColor?.name === c.name
                                        ? "ring-2 ring-black dark:ring-[#D4FF00] scale-125 shadow-sm"
                                        : "opacity-75 hover:opacity-100"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Name & Pricing */}
            <div className="py-2 z-10">
                <Link href={`/products/${product.id}`} className="block group-hover:text-[#92b500] dark:group-hover:text-[#D4FF00] transition-colors">
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                        {product.name}
                    </h3>
                </Link>

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
                        {product.speed || (product.speedKm ? `${product.speedKm} km/h` : "45 km/h")}
                    </span>
                </div>

                <div className="p-1 border-x border-black/5 dark:border-white/5">
                    <div className="flex items-center justify-center gap-1 text-[9px] text-neutral-500">
                        <BatteryCharging className="w-2.5 h-2.5" />
                        <span>Range</span>
                    </div>
                    <span className="text-[11px] font-bold text-neutral-900 dark:text-white tabular-nums">
                        {product.range || (product.rangeKm ? `${product.rangeKm} km` : "85 km")}
                    </span>
                </div>

                <div className="p-1">
                    <div className="flex items-center justify-center gap-1 text-[9px] text-neutral-500">
                        <Zap className="w-2.5 h-2.5" />
                        <span>Motor</span>
                    </div>
                    <span className="text-[11px] font-bold text-neutral-900 dark:text-white tabular-nums">
                        {product.power || product.motorPower || "750W"}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="pt-2.5 flex items-center gap-2 z-10">
                <button
                    onClick={handleAdd}
                    className={`flex-1 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-95 shadow-md ${
                        isAdded
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
                    className="p-2 rounded-xl border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
                    aria-label="Details"
                >
                    <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
}
