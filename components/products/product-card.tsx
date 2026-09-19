"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Gauge, BatteryCharging, Zap, ArrowUpRight, Check } from "lucide-react";
import { ProductItem } from "@/types/product";

export function ProductCard({
  product,
  onAddToCart,
}: {
  product: ProductItem;
  onAddToCart?: (product: ProductItem, color: string) => void;
}) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdded(true);
    onAddToCart?.(product, selectedColor.name);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const productDetailUrl = `/products/${product.id}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-3xl backdrop-blur-2xl bg-white/75 dark:bg-[#131418]/85 border border-black/10 dark:border-white/10 p-5 flex flex-col justify-between overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.4)] hover:border-[#D4FF00]/60 hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* Top Bar: Badge & Wishlist */}
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
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-neutral-600 dark:text-neutral-400"
            }`}
          />
        </button>
      </div>

      {/* Image with Link */}
      <Link
        href={productDetailUrl}
        className="relative w-full aspect-[4/3] my-3 flex items-center justify-center cursor-pointer block"
      >
        <div className="absolute inset-0 bg-[#D4FF00]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.2)] group-hover:scale-108 transition-transform duration-500 ease-out"
        />
      </Link>

      {/* Color Variants Selector */}
      <div className="flex items-center justify-between pt-2 pb-1 border-t border-black/5 dark:border-white/10 z-10">
        <span className="text-[11px] font-mono text-neutral-500">
          Color: <span className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedColor.name}</span>
        </span>
        <div className="flex items-center gap-1.5">
          {product.colors.map((c, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(c);
              }}
              style={{ backgroundColor: c.hex }}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-200 cursor-pointer ${
                selectedColor.hex === c.hex
                  ? "ring-2 ring-black dark:ring-[#D4FF00] scale-125"
                  : "opacity-75 hover:opacity-100"
              }`}
              title={c.name}
            />
          ))}
        </div>
      </div>

      {/* Product Name & Price */}
      <div className="py-2 z-10">
        <Link href={productDetailUrl} className="block group-hover:text-[#92b500] dark:group-hover:text-[#D4FF00] transition-colors">
          <h3 className="text-base font-bold text-neutral-900 dark:text-white cursor-pointer">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2 mt-1">
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

      {/* Telemetry Specs Row */}
      <div className="grid grid-cols-3 gap-1 py-2 my-1 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5 z-10">
        <div className="flex flex-col items-center justify-center p-1">
          <div className="flex items-center gap-1 text-[10px] text-neutral-500">
            <Gauge className="w-3 h-3" />
            <span>Speed</span>
          </div>
          <span className="text-[11px] font-bold text-neutral-900 dark:text-white mt-0.5 tabular-nums">
            {product.specs.speed}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-1 border-x border-black/5 dark:border-white/5">
          <div className="flex items-center gap-1 text-[10px] text-neutral-500">
            <BatteryCharging className="w-3 h-3" />
            <span>Range</span>
          </div>
          <span className="text-[11px] font-bold text-neutral-900 dark:text-white mt-0.5 tabular-nums">
            {product.specs.range}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-1">
          <div className="flex items-center gap-1 text-[10px] text-neutral-500">
            <Zap className="w-3 h-3" />
            <span>Power</span>
          </div>
          <span className="text-[11px] font-bold text-neutral-900 dark:text-white mt-0.5 tabular-nums">
            {product.specs.power}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 flex items-center gap-2 z-10">
        <button
          onClick={handleAdd}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-95 shadow-md ${
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
          href={productDetailUrl}
          className="p-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="View Details"
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
