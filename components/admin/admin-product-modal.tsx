"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { AdminProduct } from "@/types/admin";

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: AdminProduct | null;
  onSave: (productData: Partial<AdminProduct>) => void;
}

export function AdminProductModal({
  isOpen,
  onClose,
  editingProduct,
  onSave,
}: AdminProductModalProps) {
  const [formData, setFormData] = useState<Partial<AdminProduct>>({
    name: "",
    category: "Urban Commuter",
    price: 2499,
    stock: 10,
    speed: "45 km/h",
    range: "85 km",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=400&auto=format&fit=crop",
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData({
        name: "",
        category: "Urban Commuter",
        price: 2499,
        stock: 10,
        speed: "45 km/h",
        range: "85 km",
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=400&auto=format&fit=crop",
      });
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in" />

      <div className="relative w-full max-w-lg bg-white dark:bg-[#121316] rounded-3xl p-6 md:p-8 shadow-2xl border border-black/10 dark:border-white/10 z-10 space-y-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            {editingProduct ? "Edit Fleet Model" : "Deploy New Fleet Model"}
          </h3>
          <button onClick={onClose} className="p-1.5 text-neutral-500 hover:text-black dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
              Model Name *
            </label>
            <input
              type="text"
              required
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Volt Stealth Alpha"
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                Category
              </label>
              <select
                value={formData.category || "Urban Commuter"}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
              >
                <option value="Urban Commuter" className="bg-white dark:bg-[#121316]">Urban Commuter</option>
                <option value="All-Terrain" className="bg-white dark:bg-[#121316]">All-Terrain</option>
                <option value="Hyper GT" className="bg-white dark:bg-[#121316]">Hyper GT</option>
                <option value="Step-Thru" className="bg-white dark:bg-[#121316]">Step-Thru</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                Price ($ USD) *
              </label>
              <input
                type="number"
                required
                value={formData.price || 0}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                Stock Units
              </label>
              <input
                type="number"
                value={formData.stock || 0}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                Top Speed
              </label>
              <input
                type="text"
                value={formData.speed || ""}
                onChange={(e) => setFormData({ ...formData, speed: e.target.value })}
                placeholder="45 km/h"
                className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                Max Range
              </label>
              <input
                type="text"
                value={formData.range || ""}
                onChange={(e) => setFormData({ ...formData, range: e.target.value })}
                placeholder="85 km"
                className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
              Media Image URL
            </label>
            <input
              type="text"
              value={formData.image || ""}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-black/10 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-500 hover:text-black dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-neutral-950 text-white dark:bg-[#D4FF00] dark:text-black font-bold text-xs shadow-md"
            >
              {editingProduct ? "Save Changes" : "Create Model"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
