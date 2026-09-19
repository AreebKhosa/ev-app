"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Edit3, Trash2, Search, Gauge, BatteryCharging } from "lucide-react";
import { AdminProduct } from "@/types/admin";

interface AdminProductsProps {
  products: AdminProduct[];
  onAddProduct: () => void;
  onEditProduct: (product: AdminProduct) => void;
  onDeleteProduct: (id: string) => void;
}

export function AdminProducts({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}: AdminProductsProps) {
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search & Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fleet models..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
          />
        </div>

        <button
          onClick={onAddProduct}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-neutral-950 text-white dark:bg-[#D4FF00] dark:text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Model</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="rounded-3xl backdrop-blur-2xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10 p-5 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-neutral-500">
                {product.category}
              </span>
              <span className="text-[11px] font-mono text-neutral-500">
                Stock: <strong className="text-neutral-900 dark:text-white font-bold">{product.stock}</strong>
              </span>
            </div>

            <div className="relative w-full aspect-[4/3] my-2 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain filter drop-shadow-md"
              />
            </div>

            <div>
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">{product.name}</h4>
              <p className="text-lg font-black text-neutral-900 dark:text-white mt-0.5 tabular-nums">
                ${product.price.toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center text-[10px] font-mono text-neutral-500">
              <div className="flex items-center justify-center gap-1">
                <Gauge className="w-3 h-3 text-[#D4FF00]" />
                <span>{product.speed}</span>
              </div>
              <div className="flex items-center justify-center gap-1 border-l border-black/5 dark:border-white/5">
                <BatteryCharging className="w-3 h-3 text-[#D4FF00]" />
                <span>{product.range}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 border-t border-black/5 dark:border-white/10">
              <button
                onClick={() => onEditProduct(product)}
                className="flex-1 py-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => onDeleteProduct(product.id)}
                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold transition-colors cursor-pointer"
                title="Delete Model"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
