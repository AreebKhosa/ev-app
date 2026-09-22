"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartItemsList } from "@/components/cart/cart-items-list";
import { CartAddons, AccessoryItem } from "@/components/cart/cart-addons";
import { CartSummary } from "@/components/cart/cart-summary";
import { CartEmpty } from "@/components/cart/cart-empty";
import { RecommendedProducts } from "@/components/products/recommended-products";
import { useCart } from "@/context/cart-context";

const ACCESSORIES: AccessoryItem[] = [
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
    const { items: cart, updateQuantity, removeFromCart, addToCart, subtotal, totalCount } = useCart();
    const [promoCode, setPromoCode] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoError, setPromoError] = useState(false);

    // Add accessory directly into global cart
    const addAccessory = (acc: AccessoryItem) => {
        addToCart({
            id: acc.id,
            name: acc.name,
            modelCode: "ACCESSORY",
            category: "Hardware",
            price: acc.price,
            colorName: "Standard",
            colorHex: "#D4FF00",
            image: acc.image,
            quantity: 1,
        });
    };

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
            {/* Universal Header */}
            <Header />

            <div className="pt-28 pb-20 px-4 md:px-10 max-w-7xl mx-auto space-y-12">
                {/* Header Title */}
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
                            {totalCount} Units in Queue
                        </span>
                    </div>
                </div>

                {/* Main Cart Content */}
                {cart.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Column: Cart Items List & Addons */}
                        <div className="lg:col-span-7 space-y-6">
                            <CartItemsList
                                items={cart}
                                onUpdateQty={updateQuantity}
                                onRemoveItem={removeFromCart}
                            />

                            <CartAddons
                                accessories={ACCESSORIES}
                                onAddAccessory={addAccessory}
                            />
                        </div>

                        {/* Right Column: Order Summary & Checkout */}
                        <CartSummary
                            subtotal={subtotal}
                            discountPercent={discountPercent}
                            discountAmount={discountAmount}
                            estimatedTax={estimatedTax}
                            grandTotal={grandTotal}
                            promoCode={promoCode}
                            setPromoCode={setPromoCode}
                            promoApplied={promoApplied}
                            promoError={promoError}
                            onApplyPromo={handleApplyPromo}
                        />
                    </div>
                ) : (
                    <CartEmpty />
                )}

                {/* Recommended Products Section */}
                <div className="pt-10 border-t border-black/10 dark:border-white/10">
                    <RecommendedProducts
                        title="Riders Also Added to Fleet"
                        subtitle="Add another performance vehicle to your fleet with free global air freight."
                        limit={3}
                        badgeText="Trending Fleet"
                    />
                </div>
            </div>

            {/* Universal Footer */}
            <Footer />
        </main>
    );
}