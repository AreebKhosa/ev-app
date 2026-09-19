"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductItem } from "@/types/product";
import { FEATURED_PRODUCTS } from "@/data/products";
import { ProductCard } from "./product-card";

export function ProductGrid({
  tag = "Featured Lineup",
  title = "Engineered for Velocity",
  subtitle = "Explore our premium fleet of smart electric vehicles built with precision aerodynamics.",
  products = FEATURED_PRODUCTS,
  onAddToCart,
}: {
  tag?: string;
  title?: string;
  subtitle?: string;
  products?: ProductItem[];
  onAddToCart?: (product: ProductItem, color: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full relative z-20">
      {/* Section Header & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-3 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D4FF00] text-black uppercase tracking-wider">
            ✦ {tag}
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
            {title}
          </h2>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Product Cards Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
