"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Check, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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

interface CartContextType {
    items: CartItem[];
    addToCart: (item: {
        id: string;
        name: string;
        modelCode?: string;
        category?: string;
        price: number;
        colorName?: string;
        colorHex?: string;
        image: string;
        quantity?: number;
        hasArmorCare?: boolean;
    }) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    toggleArmorCare: (id: string) => void;
    clearCart: () => void;
    totalCount: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const INITIAL_CART: CartItem[] = [];

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);
    const [toastItem, setToastItem] = useState<{ name: string; image: string; price: number } | null>(null);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem("volt_cart_items");
            if (saved) {
                setItems(JSON.parse(saved));
            } else {
                setItems([]);
            }
        } catch (e) {
            setItems([]);
        }
        setIsInitialized(true);
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (isInitialized) {
            try {
                localStorage.setItem("volt_cart_items", JSON.stringify(items));
            } catch (e) {
                console.error("Failed to save cart to localStorage", e);
            }
        }
    }, [items, isInitialized]);

    const addToCart = (newItem: {
        id: string;
        name: string;
        modelCode?: string;
        category?: string;
        price: number;
        colorName?: string;
        colorHex?: string;
        image: string;
        quantity?: number;
        hasArmorCare?: boolean;
    }) => {
        const qtyToAdd = newItem.quantity || 1;
        const colorName = newItem.colorName || "Acid Lime Finish";
        const colorHex = newItem.colorHex || "#D4FF00";
        const category = newItem.category || "Electric Fleet";

        setItems((prev) => {
            const existingIndex = prev.findIndex(
                (item) => item.id === newItem.id && item.colorName === colorName
            );

            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + qtyToAdd,
                };
                return updated;
            } else {
                return [
                    ...prev,
                    {
                        id: newItem.id,
                        name: newItem.name,
                        modelCode: newItem.modelCode || "VOLT-EV",
                        category,
                        price: newItem.price,
                        colorName,
                        colorHex,
                        image: newItem.image,
                        quantity: qtyToAdd,
                        hasArmorCare: newItem.hasArmorCare || false,
                    },
                ];
            }
        });

        // Trigger toast notification
        setToastItem({
            name: newItem.name,
            image: newItem.image,
            price: newItem.price,
        });

        setTimeout(() => {
            setToastItem(null);
        }, 3500);
    };

    const removeFromCart = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setItems((prev) =>
            prev
                .map((item) => {
                    if (item.id === id) {
                        const newQty = Math.max(1, item.quantity + delta);
                        return { ...item, quantity: newQty };
                    }
                    return item;
                })
                .filter((item) => item.quantity > 0)
        );
    };

    const toggleArmorCare = (id: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, hasArmorCare: !item.hasArmorCare } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalCount = items.reduce((acc, it) => acc + it.quantity, 0);

    const subtotal = items.reduce((acc, item) => {
        const care = item.hasArmorCare ? 199 : 0;
        return acc + (item.price + care) * item.quantity;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                toggleArmorCare,
                clearCart,
                totalCount,
                subtotal,
            }}
        >
            {children}

            {/* Global Add to Cart Toast Notification */}
            <AnimatePresence>
                {toastItem && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-50 max-w-sm w-full p-4 rounded-2xl bg-neutral-950 text-white dark:bg-[#131418] border border-black/10 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl flex items-center justify-between gap-3"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#D4FF00] text-black flex items-center justify-center shrink-0">
                                <Check className="w-5 h-5 stroke-[3]" />
                            </div>
                            <div className="space-y-0.5 overflow-hidden">
                                <span className="text-[10px] font-mono uppercase font-bold text-[#D4FF00] block">
                                    Added to Queue
                                </span>
                                <h4 className="text-xs font-bold truncate text-white">{toastItem.name}</h4>
                                <p className="text-[11px] font-mono text-neutral-400">${toastItem.price.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <Link
                                href="/cart"
                                className="px-3 py-1.5 rounded-xl bg-[#D4FF00] text-black text-xs font-bold hover:bg-[#c0e600] transition-colors"
                            >
                                View Cart
                            </Link>
                            <button
                                onClick={() => setToastItem(null)}
                                className="p-1 rounded-lg text-neutral-400 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
