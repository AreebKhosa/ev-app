"use client";

import React, { useState } from "react";
import {
  SlidersHorizontal,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  Zap,
  BatteryCharging,
  X,
} from "lucide-react";

export interface FilterState {
  category: string;
  maxPrice: number;
  motorPowers: string[];
  minRange: number;
  colors: string[];
  features: string[];
  inStockOnly: boolean;
}

export const INITIAL_FILTERS: FilterState = {
  category: "all",
  maxPrice: 5000,
  motorPowers: [],
  minRange: 0,
  colors: [],
  features: [],
  inStockOnly: false,
};

export interface ProductFilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset?: () => void;
  totalResults?: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  className?: string;
}

export function ProductFilterSidebar({
  filters,
  onFilterChange,
  onReset,
  totalResults = 12,
  isOpenMobile = false,
  onCloseMobile,
  className = "",
}: ProductFilterSidebarProps) {
  const [sections, setSections] = useState({
    categories: true,
    price: true,
    motor: true,
    range: true,
    colors: true,
    features: true,
  });

  const toggleSection = (key: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const categories = [
    { id: "all", label: "All Fleet", count: 12 },
    { id: "urban", label: "Urban Series", count: 5 },
    { id: "off-road", label: "All-Terrain Beast", count: 4 },
    { id: "performance", label: "Hyper GT Dual", count: 3 },
  ];

  const motorOptions = [
    { id: "350W", label: "350W City Hub" },
    { id: "500W", label: "500W High-Torque" },
    { id: "750W", label: "750W Bafang Ultra" },
    { id: "1000W+", label: "1000W+ Dual Motors" },
  ];

  const colorOptions = [
    { id: "volt", name: "Acid Lime", hex: "#D4FF00" },
    { id: "black", name: "Matte Black", hex: "#1A1A1E" },
    { id: "silver", name: "Titanium Silver", hex: "#9CA3AF" },
    { id: "purple", name: "Hyper Purple", hex: "#7B61FF" },
    { id: "sand", name: "Desert Sand", hex: "#C2A676" },
  ];

  const featureOptions = [
    "Hydraulic Disc Brakes",
    "Inverted Suspension",
    "Removable Battery",
    "Turn Signals & LED Ring",
    "Apple Find My™ Support",
    "Torque Sensor Assist",
  ];

  const handleCategory = (id: string) => {
    onFilterChange({ ...filters, category: id });
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, maxPrice: Number(e.target.value) });
  };

  const toggleMotor = (motor: string) => {
    const next = filters.motorPowers.includes(motor)
      ? filters.motorPowers.filter((m) => m !== motor)
      : [...filters.motorPowers, motor];
    onFilterChange({ ...filters, motorPowers: next });
  };

  const toggleColor = (color: string) => {
    const next = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onFilterChange({ ...filters, colors: next });
  };

  const toggleFeature = (feat: string) => {
    const next = filters.features.includes(feat)
      ? filters.features.filter((f) => f !== feat)
      : [...filters.features, feat];
    onFilterChange({ ...filters, features: next });
  };

  const SidebarContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#D4FF00]" />
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider font-mono">
            Filters ({totalResults})
          </h3>
        </div>

        {onReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-[11px] font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-[#D4FF00] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Categories */}
      <div className="space-y-3 pb-4 border-b border-black/5 dark:border-white/10">
        <button
          onClick={() => toggleSection("categories")}
          className="flex items-center justify-between w-full text-xs font-bold text-neutral-900 dark:text-white uppercase font-mono tracking-wider cursor-pointer"
        >
          <span>Category</span>
          {sections.categories ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {sections.categories && (
          <div className="flex flex-col gap-1.5 pt-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  filters.category === cat.id
                    ? "bg-neutral-950 text-white dark:bg-white dark:text-black font-bold shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] font-mono opacity-60">({cat.count})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. Price Range Slider */}
      <div className="space-y-3 pb-4 border-b border-black/5 dark:border-white/10">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-xs font-bold text-neutral-900 dark:text-white uppercase font-mono tracking-wider cursor-pointer"
        >
          <span>Max Price</span>
          {sections.price ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {sections.price && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-neutral-500">$1,500</span>
              <span className="text-neutral-900 dark:text-white bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-md text-[#92b500] dark:text-[#D4FF00]">
                ${filters.maxPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="1500"
              max="5000"
              step="100"
              value={filters.maxPrice}
              onChange={handlePrice}
              className="w-full accent-[#D4FF00] h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* 3. Motor Powertrain */}
      <div className="space-y-3 pb-4 border-b border-black/5 dark:border-white/10">
        <button
          onClick={() => toggleSection("motor")}
          className="flex items-center justify-between w-full text-xs font-bold text-neutral-900 dark:text-white uppercase font-mono tracking-wider cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#D4FF00]" /> Motor Output
          </span>
          {sections.motor ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {sections.motor && (
          <div className="space-y-2 pt-1">
            {motorOptions.map((opt) => {
              const checked = filters.motorPowers.includes(opt.id);
              return (
                <label
                  key={opt.id}
                  onClick={() => toggleMotor(opt.id)}
                  className="flex items-center gap-2.5 text-xs text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white cursor-pointer select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                      checked
                        ? "bg-[#D4FF00] border-[#D4FF00] text-black"
                        : "border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5"
                    }`}
                  >
                    {checked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={checked ? "font-bold text-neutral-900 dark:text-white" : ""}>
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Minimum Range */}
      <div className="space-y-3 pb-4 border-b border-black/5 dark:border-white/10">
        <button
          onClick={() => toggleSection("range")}
          className="flex items-center justify-between w-full text-xs font-bold text-neutral-900 dark:text-white uppercase font-mono tracking-wider cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <BatteryCharging className="w-3.5 h-3.5 text-[#D4FF00]" /> Minimum Range
          </span>
          {sections.range ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {sections.range && (
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {[0, 60, 100].map((km) => (
              <button
                key={km}
                onClick={() => onFilterChange({ ...filters, minRange: km })}
                className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  filters.minRange === km
                    ? "bg-[#D4FF00] text-black shadow-sm"
                    : "bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:bg-black/10 dark:hover:bg-white/10"
                }`}
              >
                {km === 0 ? "Any" : `${km}+ km`}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 5. Color Swatches */}
      <div className="space-y-3 pb-4 border-b border-black/5 dark:border-white/10">
        <button
          onClick={() => toggleSection("colors")}
          className="flex items-center justify-between w-full text-xs font-bold text-neutral-900 dark:text-white uppercase font-mono tracking-wider cursor-pointer"
        >
          <span>Color Finish</span>
          {sections.colors ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {sections.colors && (
          <div className="flex items-center gap-2 pt-1">
            {colorOptions.map((c) => {
              const selected = filters.colors.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggleColor(c.id)}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                  title={c.name}
                  className={`w-5 h-5 rounded-full transition-all cursor-pointer relative flex items-center justify-center ${
                    selected
                      ? "ring-2 ring-black dark:ring-[#D4FF00] scale-125"
                      : "opacity-75 hover:opacity-100 hover:scale-110"
                  }`}
                >
                  {selected && (
                    <Check
                      className={`w-3 h-3 ${
                        c.hex === "#FFFFFF" || c.hex === "#D4FF00" ? "text-black" : "text-white"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Special Features */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("features")}
          className="flex items-center justify-between w-full text-xs font-bold text-neutral-900 dark:text-white uppercase font-mono tracking-wider cursor-pointer"
        >
          <span>Advanced Tech</span>
          {sections.features ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {sections.features && (
          <div className="space-y-2 pt-1">
            {featureOptions.map((feat) => {
              const checked = filters.features.includes(feat);
              return (
                <label
                  key={feat}
                  onClick={() => toggleFeature(feat)}
                  className="flex items-center gap-2.5 text-xs text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white cursor-pointer select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                      checked
                        ? "bg-[#D4FF00] border-[#D4FF00] text-black"
                        : "border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5"
                    }`}
                  >
                    {checked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={checked ? "font-bold text-neutral-900 dark:text-white" : ""}>
                    {feat}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        className={`hidden lg:block w-72 shrink-0 rounded-3xl backdrop-blur-2xl bg-white/75 dark:bg-[#121316]/85 border border-black/10 dark:border-white/10 p-6 shadow-sm sticky top-28 self-start ${className}`}
      >
        {SidebarContent}
      </aside>

      {/* Mobile Sliding Drawer */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
          />

          <div className="relative ml-auto w-full max-w-xs h-full bg-white dark:bg-[#121316] p-6 overflow-y-auto shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/10 dark:border-white/10">
                <h2 className="font-bold text-base text-neutral-900 dark:text-white">Filter Fleet</h2>
                <button onClick={onCloseMobile} className="p-2 text-neutral-500 hover:text-black dark:hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {SidebarContent}
            </div>

            <div className="pt-6 mt-6 border-t border-black/10 dark:border-white/10">
              <button
                onClick={onCloseMobile}
                className="w-full py-3 rounded-xl bg-neutral-950 text-white dark:bg-[#D4FF00] dark:text-black font-bold text-xs shadow-md"
              >
                Apply Filters ({totalResults})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
