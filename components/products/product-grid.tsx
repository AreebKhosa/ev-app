"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProductItem } from "@/types/product";
import { ProductCard } from "./product-card";
import { api } from "@/services/api";
import { getOptimizedImageUrl } from "@/lib/image";

export function ProductGrid({
  tag = "Featured Lineup",
  title = "Engineered for Velocity",
  subtitle = "Explore our premium fleet of smart electric vehicles built with precision aerodynamics.",
  limit = 8,
  showViewAll = true,
  onAddToCart,
}: {
  tag?: string;
  title?: string;
  subtitle?: string;
  limit?: number;
  showViewAll?: boolean;
  products?: ProductItem[];
  onAddToCart?: (product: ProductItem, color: string) => void;
}) {
  const [productsList, setProductsList] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.products.getAll(),
          api.categories.getAll(),
        ]);

        if (prodRes.data && prodRes.data.length > 0) {
          const mapped: ProductItem[] = prodRes.data.map((p: any) => ({
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
            specs: {
              speed: p.speed || "45 km/h",
              range: p.range || "85 km",
              power: p.power || "750W",
            },
          }));
          setProductsList(mapped);
        }

        if (catRes.data && catRes.data.length > 0) {
          setCategories(catRes.data.map((c: any) => c.name));
        }
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFleet();
  }, []);

  const filteredProducts =
    activeCategory === "all"
      ? productsList
      : productsList.filter((p) => (p.categoryLabel || p.category || "").toLowerCase() === activeCategory.toLowerCase());

  const displayedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  return (
    <section id="products" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full relative z-20">
      {/* Section Header & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
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

        {/* Dynamic Category Filter Pills */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === "all"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-black shadow-sm"
                  : "bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              }`}
            >
              All Vehicles
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-black shadow-sm"
                    : "bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Cards Grid (Displays up to 8 cards on homepage) */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className="h-96 rounded-3xl bg-black/5 dark:bg-white/5 animate-pulse border border-black/5 dark:border-white/5"
            />
          ))}
        </div>
      ) : displayedProducts.length > 0 ? (
        <>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View All Products CTA */}
          {showViewAll && (
            <div className="mt-14 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-neutral-950 text-white dark:bg-white dark:text-black font-black text-xs uppercase tracking-wider hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black transition-all duration-300 shadow-xl active:scale-95 group"
              >
                <Sparkles className="w-4 h-4 text-[#D4FF00] group-hover:text-black transition-colors" />
                <span>Explore Full Fleet Lineup ({productsList.length} Models)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white/50 dark:bg-[#121316]/50 border border-black/10 dark:border-white/10">
          <p className="text-sm font-mono text-neutral-500">
            No active fleet models found in this classification.
          </p>
        </div>
      )}
    </section>
  );
}
