"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus } from "lucide-react";
import { getOptimizedImageUrl } from "@/lib/image";

export interface CartItem {
    id: string;
    name: string;
    modelCode?: string;
    category: string;
    price: number;
    colorName: string;
    colorHex: string;
    image: string;
    quantity: number;
    hasArmorCare?: boolean;
}

interface CartItemsListProps {
    items: CartItem[];
    onUpdateQty: (id: string, delta: number) => void;
    onRemoveItem: (id: string) => void;
}

export function CartItemsList({
    items,
    onUpdateQty,
    onRemoveItem,
}: CartItemsListProps) {
    return (
        <div className="space-y-4">
            <AnimatePresence mode="popLayout">
                {items.map((item) => (
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
                                    src={getOptimizedImageUrl(item.image)}
                                    alt={item.name}
                                    fill
                                    unoptimized
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
                                    onClick={() => onUpdateQty(item.id, -1)}
                                    className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                                    aria-label="Decrease Quantity"
                                >
                                    <Minus className="w-3.5 h-3.5" />
                                </button>

                                <span className="w-6 text-center text-xs font-black font-mono tabular-nums">
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() => onUpdateQty(item.id, 1)}
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
                                    onClick={() => onRemoveItem(item.id)}
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
    );
}
