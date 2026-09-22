"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Gauge, BatteryCharging, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { api } from "@/services/api";
import { getOptimizedImageUrl } from "@/lib/image";

interface RecommendedProductsProps {
    currentProductId?: string;
    title?: string;
    subtitle?: string;
    limit?: number;
    badgeText?: string;
}

export function RecommendedProducts({
    currentProductId,
    title = "Recommended Fleet Models",
    subtitle = "Engineered for uncompromising high performance and extreme electric range.",
    limit = 3,
    badgeText = "Recommended",
}: RecommendedProductsProps) {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<any[]>([]);
    const [addedId, setAddedId] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecommended = async () => {
            const res = await api.products.getAll();
            if (res.data && res.data.length > 0) {
                const filtered = res.data
                    .filter((p: any) => p.id !== currentProductId)
                    .slice(0, limit);
                setProducts(filtered);
            }
        };
        fetchRecommended();
    }, [currentProductId, limit]);

    const handleQuickAdd = (product: any) => {
        addToCart({
            id: product.id,
            name: product.name,
            modelCode: product.modelCode,
            category: product.category || "Electric Fleet",
            price: Number(product.price) || 2499,
            image: product.image || "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=600&auto=format&fit=crop",
            quantity: 1,
        });
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 1800);
    };

    if (products.length === 0) return null;

    return (
        <section className="space-y-6 pt-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#92b500] dark:text-[#D4FF00]" />
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#92b500] dark:text-[#D4FF00]">
                            {badgeText}
                        </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white tracking-tight">
                        {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                        {subtitle}
                    </p>
                </div>

                <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-900 dark:text-white hover:text-[#92b500] dark:hover:text-[#D4FF00] transition-colors group self-start sm:self-auto"
                >
                    <span>View All Fleet</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => {
                    const speed = product.speed || "45 km/h";
                    const range = product.range || "85 km";
                    const power = product.power || "750W";
                    const isAdded = addedId === product.id;

                    return (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="group rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 p-5 shadow-sm hover:shadow-xl hover:border-black/20 dark:hover:border-white/20 transition-all flex flex-col justify-between"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">
                                        {product.category || "Electric Fleet"}
                                    </span>
                                    {product.badge && (
                                        <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-[#D4FF00] text-black shadow-sm">
                                            {product.badge}
                                        </span>
                                    )}
                                </div>

                                <div className="relative aspect-[16/10] w-full rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 overflow-hidden flex items-center justify-center p-3 group-hover:scale-[1.02] transition-transform duration-300">
                                    <Image
                                        src={getOptimizedImageUrl(product.image)}
                                        alt={product.name}
                                        fill
                                        unoptimized
                                        className="object-contain filter drop-shadow-md"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-base font-bold text-neutral-950 dark:text-white group-hover:text-[#92b500] dark:group-hover:text-[#D4FF00] transition-colors">
                                        {product.name}
                                    </h4>

                                    <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 text-[10px] font-mono text-center">
                                        <div className="flex flex-col items-center">
                                            <Gauge className="w-3 h-3 text-[#92b500] dark:text-[#D4FF00] mb-0.5" />
                                            <span className="font-bold">{speed}</span>
                                        </div>
                                        <div className="flex flex-col items-center border-x border-black/5 dark:border-white/5">
                                            <BatteryCharging className="w-3 h-3 text-[#92b500] dark:text-[#D4FF00] mb-0.5" />
                                            <span className="font-bold">{range}</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <Zap className="w-3 h-3 text-[#92b500] dark:text-[#D4FF00] mb-0.5" />
                                            <span className="font-bold">{power}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-3">
                                <div>
                                    <span className="text-[10px] font-mono text-neutral-500 uppercase block">Starting at</span>
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-lg font-black text-neutral-950 dark:text-white tabular-nums">
                                            ${Number(product.price).toLocaleString()}
                                        </span>
                                        {product.originalPrice && (
                                            <span className="text-xs line-through text-neutral-400 tabular-nums">
                                                ${Number(product.originalPrice).toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleQuickAdd(product)}
                                        className={`p-2.5 rounded-xl border border-black/10 dark:border-white/10 transition-colors cursor-pointer ${
                                            isAdded
                                                ? "bg-[#D4FF00] text-black border-[#D4FF00]"
                                                : "bg-black/5 dark:bg-white/5 hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black text-neutral-700 dark:text-neutral-300"
                                        }`}
                                        title="Quick Add to Cart"
                                    >
                                        {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                                    </button>

                                    <Link
                                        href={`/products/${product.id}`}
                                        className="px-3.5 py-2.5 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black font-bold text-xs transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
                                    >
                                        <span>Customize</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
