"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, ShieldCheck, RotateCcw, Play, X } from "lucide-react";

interface ProductGalleryProps {
    images: string[];
    activeImageIdx: number;
    setActiveImageIdx: (idx: number) => void;
    productName: string;
    originalPrice?: number;
    price: number;
    discountPercent?: number;
    badge?: string;
    videoUrl?: string;
    warrantyAndShipping?: {
        warranty?: string;
        trialPeriod?: string;
        shipping?: string;
        dispatchTime?: string;
    };
}

export function ProductGallery({
    images,
    activeImageIdx,
    setActiveImageIdx,
    productName,
    originalPrice,
    price,
    discountPercent,
    badge,
    videoUrl,
    warrantyAndShipping,
}: ProductGalleryProps) {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const validImages = images && images.length > 0 ? images : [
        "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop"
    ];

    const currentImage = validImages[activeImageIdx] || validImages[0];
    const hasDiscount = originalPrice && originalPrice > price;

    return (
        <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-28">
            {/* Main Image Stage */}
            <div className="relative w-full aspect-[4/3] rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 p-6 flex items-center justify-center overflow-hidden shadow-sm">
                {/* Top Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                    {badge && (
                        <span className="text-[10px] font-mono font-black uppercase px-3 py-1 rounded-full bg-[#D4FF00] text-black shadow-sm">
                            ✦ {badge}
                        </span>
                    )}
                    {hasDiscount && (
                        <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black">
                            SAVE ${(originalPrice! - price).toLocaleString()}
                        </span>
                    )}
                </div>

                {/* Video Play Button Overlay if videoUrl exists */}
                {videoUrl && (
                    <button
                        onClick={() => setIsVideoOpen(true)}
                        className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-[#D4FF00] text-white hover:text-black text-xs font-mono font-bold backdrop-blur-md transition-all shadow-md cursor-pointer"
                    >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Watch Video</span>
                    </button>
                )}

                {/* Ambient Glow */}
                <div className="absolute inset-0 bg-radial from-[#D4FF00]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

                {/* Main Image Display with Motion Switch */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeImageIdx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={currentImage}
                            alt={productName}
                            fill
                            priority
                            unoptimized
                            className="object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Thumbnail Strip */}
            {validImages.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                    {validImages.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveImageIdx(i)}
                            className={`relative aspect-[4/3] rounded-2xl overflow-hidden backdrop-blur-xl bg-white/60 dark:bg-[#121316]/70 border transition-all cursor-pointer ${
                                activeImageIdx === i
                                    ? "border-[#D4FF00] ring-2 ring-[#D4FF00]/50 shadow-md scale-[1.02]"
                                    : "border-black/10 dark:border-white/10 opacity-70 hover:opacity-100"
                            }`}
                        >
                            <Image src={img} alt={`${productName} thumbnail ${i + 1}`} fill unoptimized className="object-contain p-2" />
                        </button>
                    ))}
                </div>
            )}

            {/* Trust Assurance Strip under Gallery */}
            <div className="grid grid-cols-3 gap-2 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center text-[11px] font-mono">
                <div className="flex items-center justify-center gap-1.5 text-neutral-700 dark:text-neutral-300">
                    <Truck className="w-3.5 h-3.5 text-[#8ba800] dark:text-[#D4FF00]" />
                    <span>{warrantyAndShipping?.shipping || "Free Express Freight"}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-neutral-700 dark:text-neutral-300 border-x border-black/5 dark:border-white/5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8ba800] dark:text-[#D4FF00]" />
                    <span>{warrantyAndShipping?.warranty || "2-Year Warranty"}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-neutral-700 dark:text-neutral-300">
                    <RotateCcw className="w-3.5 h-3.5 text-[#8ba800] dark:text-[#D4FF00]" />
                    <span>{warrantyAndShipping?.trialPeriod || "30-Day Risk-Free Trial"}</span>
                </div>
            </div>

            {/* Video Modal Popup */}
            {isVideoOpen && videoUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="relative w-full max-w-3xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                        <button
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
                            <iframe
                                src={videoUrl.replace("watch?v=", "embed/")}
                                title={productName}
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <video src={videoUrl} controls autoPlay className="w-full h-full object-cover" />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
