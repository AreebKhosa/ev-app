"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Gauge,
    BatteryCharging,
    ShieldCheck,
    Zap,
    ShoppingBag,
    Truck,
    RotateCcw,
    Lock,
    Star,
    Check,
    Heart,
    ArrowUpRight,
    Sparkles,
    ThumbsUp,
    MessageSquare,
    Sliders,
    Cpu,
    Layers,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// ================= DATA =================
const PRODUCT = {
    id: "apex-nomad-750",
    modelCode: "VOLT (750-GT)",
    name: "APEX NOMAD PRO",
    price: 3299,
    originalPrice: 3699,
    rating: 4.9,
    reviewsCount: 1240,
    shortDesc:
        "Engineered with a high-torque 750W motor, quad-piston hydraulic disc brakes, and dual 21700 lithium battery cells for aggressive all-terrain exploration.",
    specs: [
        { label: "Top Speed", value: "65 km/h", icon: <Gauge className="w-4 h-4 text-[#D4FF00]" /> },
        { label: "Max Range", value: "120 km", icon: <BatteryCharging className="w-4 h-4 text-[#D4FF00]" /> },
        { label: "Protection", value: "IP67 Weather", icon: <ShieldCheck className="w-4 h-4 text-[#D4FF00]" /> },
        { label: "Peak Power", value: "1000W Torque", icon: <Zap className="w-4 h-4 text-[#D4FF00]" /> },
    ],
    angles: [
        {
            id: "angle-front",
            name: "Front 3/4 Perspective",
            colorName: "Acid Lime Finish",
            image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop",
            secondaryImage: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1200&auto=format&fit=crop",
            colorHex: "#D4FF00",
        },
        {
            id: "angle-side",
            name: "Stealth Profile",
            colorName: "Matte Black",
            image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1200&auto=format&fit=crop",
            secondaryImage: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=1200&auto=format&fit=crop",
            colorHex: "#1A1A1E",
        },
        {
            id: "angle-rear",
            name: "Titanium Trail",
            colorName: "Desert Titanium",
            image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=1200&auto=format&fit=crop",
            secondaryImage: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop",
            colorHex: "#C2A676",
        },
    ],
};

const DETAILED_SPECS = [
    {
        title: "HyperDrive Dual Powertrain",
        desc: "1000W peak brushless motor with 95Nm torque. Delivers instant acceleration across 35° mountain inclines.",
        icon: <Zap className="w-5 h-5 text-[#D4FF00]" />,
    },
    {
        title: "21700 PowerCell Battery",
        desc: "Automotive-grade 960Wh lithium pack with intelligent BMS thermal management and 3.5h HyperCharge.",
        icon: <BatteryCharging className="w-5 h-5 text-[#D4FF00]" />,
    },
    {
        title: "Quad Hydraulic Braking",
        desc: "Quad-piston mineral calipers paired with 203mm ventilated steel rotors for heat-resistant stopping power.",
        icon: <ShieldCheck className="w-5 h-5 text-[#D4FF00]" />,
    },
    {
        title: "Retina TFT Cockpit OS",
        desc: "4.5-inch anti-glare sunlight display with real-time telemetry, turn-by-turn GPS, and BLE app integration.",
        icon: <Cpu className="w-5 h-5 text-[#D4FF00]" />,
    },
];

const REVIEWS = [
    {
        id: "r1",
        author: "Marcus Vance",
        location: "Seattle, WA",
        rating: 5,
        date: "2 days ago",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
        verified: true,
        title: "Unmatched Torque & Range on Alpine Climbs",
        comment:
            "I've ridden the Apex Nomad Pro over 1,800 km in the wet Pacific Northwest. The IP67 weather sealing holds up against relentless rain, and the battery consistently delivers over 110 km per charge.",
    },
    {
        id: "r2",
        author: "Elena Rostova",
        location: "Zurich, CH",
        rating: 5,
        date: "1 week ago",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        verified: true,
        title: "Pure Industrial Design Perfection",
        comment:
            "The seamless frame welds and acid lime details turn heads wherever I ride. The inverted suspension absorbs chunky gravel trails effortlessly.",
    },
    {
        id: "r3",
        author: "David Chen",
        location: "Austin, TX",
        rating: 5,
        date: "3 weeks ago",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        verified: true,
        title: "The TFT Cockpit & App Sync is Flawless",
        comment:
            "Anti-theft GPS tracking gives total peace of mind. Instant throttle response and the quad-piston hydraulic brakes are super confidence-inspiring.",
    },
];

const RECOMMENDED_PRODUCTS = [
    {
        id: "volt-stealth-alpha",
        name: "Volt Stealth Alpha",
        category: "Urban Series",
        price: 2499,
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=600&auto=format&fit=crop",
        specs: "45 km/h • 85 km Range",
    },
    {
        id: "cybertrack-gt-dual",
        name: "CyberTrack GT Dual",
        category: "Hyper GT Dual",
        price: 3899,
        image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=600&auto=format&fit=crop",
        specs: "75 km/h • 140 km Range",
    },
    {
        id: "pulse-city-cruiser",
        name: "Pulse City Cruiser",
        category: "Lightweight Commuter",
        price: 1999,
        image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=600&auto=format&fit=crop",
        specs: "35 km/h • 70 km Range",
    },
];

export default function ProductDetailPage() {
    const [activeAngleIdx, setActiveAngleIdx] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const currentAngle = PRODUCT.angles[activeAngleIdx];

    const handleAddToCart = () => {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <main className="min-h-screen bg-[#E4E5E8] dark:bg-[#0A0A0D] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 overflow-x-hidden">

            {/* 1. Header */}
            <Header />

            <div className="pt-24 md:pt-28 pb-20 px-4 md:px-10 max-w-7xl mx-auto space-y-16">

                {/* ================= 1. TOP BRUTALIST HEADLINE ================= */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-6">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-1">
                            <Link href="/" className="hover:text-black dark:hover:text-white">Home</Link>
                            <span>/</span>
                            <Link href="/products" className="hover:text-black dark:hover:text-white">Fleet</Link>
                            <span>/</span>
                            <span className="text-[#92b500] dark:text-[#D4FF00] font-bold">{PRODUCT.name}</span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-neutral-950 dark:text-white uppercase leading-none">
                            {PRODUCT.modelCode}
                        </h1>
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-neutral-950 dark:text-white uppercase opacity-90">
                            {PRODUCT.name}
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#D4FF00] text-black font-bold uppercase">
                            ✦ In Stock • 2025 Fleet
                        </span>
                    </div>
                </div>

                {/* ================= 2. MAIN INTERACTIVE PRODUCT STAGE ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    {/* LEFT / SPECS PILLS (3 cols) */}
                    <div className="lg:col-span-3 order-2 lg:order-1 grid grid-cols-2 lg:grid-cols-1 gap-3">
                        {PRODUCT.specs.map((spec, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10 shadow-sm flex items-center gap-3"
                            >
                                <div className="p-2 rounded-xl bg-black/5 dark:bg-white/10">
                                    {spec.icon}
                                </div>
                                <div>
                                    <span className="text-[10px] font-mono uppercase text-neutral-500 block">
                                        {spec.label}
                                    </span>
                                    <span className="text-sm font-black text-neutral-900 dark:text-white">
                                        {spec.value}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CENTER: BORDERLESS 3D IMAGE STAGE WITH MOTION (6 cols) */}
                    <div className="lg:col-span-6 order-1 lg:order-2 relative w-full aspect-[4/3] md:aspect-[16/11] flex items-center justify-center select-none">
                        {/* Ambient Spotlight */}
                        <div className="absolute inset-0 bg-radial from-[#D4FF00]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

                        {/* Layered Secondary Image Behind */}
                        <div className="absolute inset-4 md:inset-8 opacity-20 pointer-events-none filter blur-[1px] scale-95 translate-y-3">
                            <Image
                                src={currentAngle.secondaryImage}
                                alt="Depth view"
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Active Front Image */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentAngle.id}
                                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.08, y: -20 }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                className="relative w-full h-full flex items-center justify-center z-10"
                            >
                                <Image
                                    src={currentAngle.image}
                                    alt={PRODUCT.name}
                                    fill
                                    priority
                                    className="object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.22)] dark:drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)]"
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Color Finish Dots */}
                        <div className="absolute bottom-1 z-20 flex items-center gap-2 p-1.5 rounded-full bg-white/70 dark:bg-black/60 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-md">
                            {PRODUCT.angles.map((ang, idx) => (
                                <button
                                    key={ang.id}
                                    onClick={() => setActiveAngleIdx(idx)}
                                    style={{ backgroundColor: ang.colorHex }}
                                    title={ang.name}
                                    className={`w-4 h-4 rounded-full transition-all cursor-pointer ${activeAngleIdx === idx
                                        ? "ring-2 ring-black dark:ring-[#D4FF00] scale-125 shadow-sm"
                                        : "opacity-75 hover:opacity-100"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT / BUY BOX (3 cols) */}
                    <div className="lg:col-span-3 order-3 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#131418]/90 border border-black/10 dark:border-white/10 p-6 shadow-lg space-y-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-amber-500">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                                    ))}
                                </div>
                                <span className="text-xs font-bold font-mono text-neutral-800 dark:text-neutral-200">
                                    {PRODUCT.rating}
                                </span>
                            </div>
                            <span className="text-[10px] font-mono text-neutral-500">
                                ({PRODUCT.reviewsCount} reviews)
                            </span>
                        </div>

                        <div>
                            <span className="text-[10px] font-mono uppercase text-neutral-500 block">Total Price</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-neutral-950 dark:text-white tabular-nums">
                                    ${PRODUCT.price.toLocaleString()}
                                </span>
                                <span className="text-xs line-through text-neutral-400">
                                    ${PRODUCT.originalPrice.toLocaleString()}
                                </span>
                            </div>
                            <p className="text-[11px] text-neutral-500 mt-1 font-mono">
                                Active Finish: <strong className="text-neutral-900 dark:text-white">{currentAngle.colorName}</strong>
                            </p>
                        </div>

                        <div className="space-y-2 pt-2">
                            <button
                                onClick={handleAddToCart}
                                className="w-full py-3.5 rounded-2xl bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md cursor-pointer"
                            >
                                {isAdded ? (
                                    <>
                                        <Check className="w-4 h-4 text-black" />
                                        <span>Added to Order</span>
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-4 h-4" />
                                        <span>Buy Now & Configure</span>
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className="w-full py-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                                <span>{isWishlisted ? "Saved in Wishlist" : "Save for Later"}</span>
                            </button>
                        </div>

                        <div className="pt-3 border-t border-black/5 dark:border-white/10 text-[10px] font-mono text-neutral-500 space-y-1">
                            <div className="flex items-center gap-1.5">
                                <Truck className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" />
                                <span>Free Insured Air Freight</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" />
                                <span>3-Year Full Powertrain Warranty</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= 3. DETAILED ENGINEERING & SPECS BREAKDOWN ================= */}
                <div className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
                    <div className="space-y-2 max-w-xl">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#92b500] dark:text-[#D4FF00] font-bold">
                            ✦ Architecture Details
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-neutral-950 dark:text-white">
                            Precision Engineering Overview
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {DETAILED_SPECS.map((item, idx) => (
                            <div
                                key={idx}
                                className="p-5 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10 space-y-3"
                            >
                                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/10 w-fit">
                                    {item.icon}
                                </div>
                                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                                    {item.title}
                                </h4>
                                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ================= 4. VERIFIED CUSTOMER REVIEWS ================= */}
                <div className="space-y-8 pt-6 border-t border-black/10 dark:border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div className="space-y-1">
                            <span className="text-[11px] font-mono uppercase tracking-widest text-[#92b500] dark:text-[#D4FF00] font-bold">
                                ✦ Verified Telemetry
                            </span>
                            <h3 className="text-2xl md:text-3xl font-black text-neutral-950 dark:text-white">
                                Rider Reviews ({PRODUCT.reviewsCount})
                            </h3>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 p-2 px-3 rounded-xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10">
                                <Star className="w-4 h-4 fill-[#D4FF00] text-[#D4FF00]" />
                                <span className="text-xs font-bold font-mono">4.9 Overall Rating</span>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {REVIEWS.map((rev) => (
                            <div
                                key={rev.id}
                                className="p-6 rounded-3xl backdrop-blur-2xl bg-white/75 dark:bg-[#121316]/85 border border-black/10 dark:border-white/10 space-y-4 shadow-sm flex flex-col justify-between"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <div className="relative w-9 h-9 rounded-xl overflow-hidden">
                                                <Image src={rev.avatar} alt={rev.author} fill className="object-cover" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1">
                                                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">{rev.author}</h4>
                                                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4FF00]" />
                                                </div>
                                                <p className="text-[10px] text-neutral-500 font-mono">{rev.location}</p>
                                            </div>
                                        </div>

                                        <span className="text-[10px] font-mono text-neutral-400">{rev.date}</span>
                                    </div>

                                    <div className="flex items-center gap-0.5 text-amber-500">
                                        {[...Array(rev.rating)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-amber-500" />
                                        ))}
                                    </div>

                                    <h5 className="text-xs font-bold text-neutral-900 dark:text-white">{rev.title}</h5>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed italic">
                                        “{rev.comment}”
                                    </p>
                                </div>

                                <div className="pt-2 border-t border-black/5 dark:border-white/10 flex items-center gap-1.5 text-[10px] font-mono text-[#92b500] dark:text-[#D4FF00]">
                                    <Check className="w-3 h-3" />
                                    <span>Verified Purchase Rider</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ================= 5. RECOMMENDED / SIMILAR FLEET MODELS ================= */}
                <div className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
                    <div className="flex items-end justify-between">
                        <div className="space-y-1">
                            <span className="text-[11px] font-mono uppercase tracking-widest text-[#92b500] dark:text-[#D4FF00] font-bold">
                                ✦ Fleet Comparison
                            </span>
                            <h3 className="text-2xl md:text-3xl font-black text-neutral-950 dark:text-white">
                                You Might Also Like
                            </h3>
                        </div>

                        <Link
                            href="/products"
                            className="text-xs font-mono font-bold text-[#92b500] dark:text-[#D4FF00] hover:underline flex items-center gap-1"
                        >
                            <span>View All Fleet</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {RECOMMENDED_PRODUCTS.map((prod) => (
                            <Link
                                key={prod.id}
                                href={`/products/${prod.id}`}
                                className="group p-5 rounded-3xl backdrop-blur-2xl bg-white/75 dark:bg-[#131418]/85 border border-black/10 dark:border-white/10 hover:border-[#D4FF00]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase">
                                    <span>{prod.category}</span>
                                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[#D4FF00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </div>

                                <div className="relative w-full aspect-[4/3] my-3">
                                    <Image
                                        src={prod.image}
                                        alt={prod.name}
                                        fill
                                        className="object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                <div className="pt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-[#92b500] dark:group-hover:text-[#D4FF00] transition-colors">
                                            {prod.name}
                                        </h4>
                                        <span className="text-[10px] font-mono text-neutral-500">{prod.specs}</span>
                                    </div>
                                    <span className="text-sm font-black text-neutral-950 dark:text-white tabular-nums">
                                        ${prod.price.toLocaleString()}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>

            {/* Universal Footer */}
            <Footer />
        </main>
    );
}