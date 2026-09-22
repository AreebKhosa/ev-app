"use client";

import React from "react";
import {
  Layers,
  RotateCcw,
  X,
  Sparkles,
  ChevronRight,
  DollarSign,
  Gauge,
  BatteryCharging,
  Zap,
  Check,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";

export interface FilterState {
  category: string;
  minPrice?: number;
  maxPrice?: number;
  minRange?: number;
  minSpeed?: number;
  motorPower?: string;
  inStockOnly?: boolean;
}

export const INITIAL_FILTERS: FilterState = {
  category: "all",
  minPrice: undefined,
  maxPrice: undefined,
  minRange: undefined,
  minSpeed: undefined,
  motorPower: "all",
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
  availableCategories?: { id: string; label: string; count: number }[];
  highestPrice?: number;
}

export function ProductFilterSidebar({
  filters,
  onFilterChange,
  onReset,
  totalResults = 0,
  isOpenMobile = false,
  onCloseMobile,
  className = "",
  availableCategories = [],
  highestPrice = 6000,
}: ProductFilterSidebarProps) {
  const isFiltered =
    filters.category !== "all" ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.minRange !== undefined ||
    filters.minSpeed !== undefined ||
    (filters.motorPower && filters.motorPower !== "all") ||
    filters.inStockOnly === true;

  const handleCategory = (id: string) => {
    onFilterChange({ ...filters, category: id });
    if (onCloseMobile) onCloseMobile();
  };

  const handleQuickPrice = (min?: number, max?: number) => {
    onFilterChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const pricePresets = [
    { label: "All Prices", min: undefined, max: undefined },
    { label: "Under $2,000", min: undefined, max: 2000 },
    { label: "$2,000 - $3,500", min: 2000, max: 3500 },
    { label: "$3,500 - $5,000", min: 3500, max: 5000 },
    { label: "$5,000+", min: 5000, max: undefined },
  ];

  const speedOptions = [
    { label: "All Velocities", value: undefined },
    { label: "35+ km/h", value: 35 },
    { label: "45+ km/h", value: 45 },
    { label: "60+ km/h", value: 60 },
    { label: "80+ km/h (Hyper)", value: 80 },
  ];

  const rangeOptions = [
    { label: "All Ranges", value: undefined },
    { label: "50+ km", value: 50 },
    { label: "80+ km (Touring)", value: 80 },
    { label: "110+ km (Long Haul)", value: 110 },
    { label: "140+ km (Ultra)", value: 140 },
  ];

  const powerOptions = [
    { label: "All Outputs", value: "all" },
    { label: "500W Urban", value: "500" },
    { label: "750W Performance", value: "750" },
    { label: "1000W+ Extreme", value: "1000" },
    { label: "Dual Motor AWD", value: "dual" },
  ];

  const SidebarContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#92b500] dark:text-[#D4FF00]" />
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider font-mono">
            Fleet Filters
          </h3>
        </div>

        {onReset && isFiltered && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-[11px] font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-[#D4FF00] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* SECTION 1: FLEET CATEGORIES */}
      <div className="space-y-2.5">
        <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" />
          <span>Fleet Classification</span>
        </label>

        <div className="space-y-1.5">
          {availableCategories.map((cat) => {
            const isSelected =
              filters.category === cat.id ||
              (filters.category === "all" && cat.id === "all") ||
              filters.category.toLowerCase() === cat.id.toLowerCase();

            return (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs transition-all duration-200 cursor-pointer text-left group ${isSelected
                    ? "bg-neutral-950 text-white dark:bg-[#D4FF00] dark:text-black font-black shadow-md scale-[1.01]"
                    : "bg-black/5 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white font-medium"
                  }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span
                    className={`w-2 h-2 rounded-full transition-all ${isSelected
                        ? "bg-[#D4FF00] dark:bg-black scale-125"
                        : "bg-neutral-400 dark:bg-neutral-600 group-hover:bg-[#92b500] dark:group-hover:bg-[#D4FF00]"
                      }`}
                  />
                  <span className="truncate">{cat.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${isSelected
                        ? "bg-white/20 dark:bg-black/20 font-bold"
                        : "bg-black/5 dark:bg-white/10 text-neutral-500"
                      }`}
                  >
                    {cat.count}
                  </span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${isSelected ? "translate-x-0.5" : "opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5"
                      }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: PRICE MATCH & BUDGET */}
      <div className="space-y-3 pt-3 border-t border-black/5 dark:border-white/10">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" />
            <span>Price Match ($ USD)</span>
          </label>
          {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
            <span className="text-[10px] font-mono font-bold text-[#8ba800] dark:text-[#D4FF00]">
              {filters.minPrice ? `$${filters.minPrice}` : "$0"} - {filters.maxPrice ? `$${filters.maxPrice}` : `Max`}
            </span>
          )}
        </div>

        {/* Quick Price Buttons */}
        <div className="grid grid-cols-2 gap-1.5">
          {pricePresets.map((p, i) => {
            const isPresetActive =
              filters.minPrice === p.min && filters.maxPrice === p.max;

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickPrice(p.min, p.max)}
                className={`px-2.5 py-1.5 rounded-xl text-[10px] font-mono font-bold transition-all text-center cursor-pointer ${isPresetActive
                    ? "bg-neutral-950 text-white dark:bg-[#D4FF00] dark:text-black shadow-sm"
                    : "bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10"
                  }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Custom Min / Max Price Inputs */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="space-y-1">
            <span className="text-[9px] font-mono uppercase text-neutral-400">Min Price</span>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs font-mono">$</span>
              <input
                type="number"
                step="any"
                min={0}
                value={filters.minPrice ?? ""}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    minPrice: e.target.value === "" ? undefined : parseFloat(e.target.value),
                  })
                }
                placeholder="0"
                className="w-full pl-6 pr-2 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#D4FF00]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] font-mono uppercase text-neutral-400">Max Price</span>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs font-mono">$</span>
              <input
                type="number"
                step="any"
                min={0}
                value={filters.maxPrice ?? ""}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    maxPrice: e.target.value === "" ? undefined : parseFloat(e.target.value),
                  })
                }
                placeholder="5000"
                className="w-full pl-6 pr-2 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#D4FF00]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: TOP VELOCITY */}
      <div className="space-y-2.5 pt-3 border-t border-black/5 dark:border-white/10">
        <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" />
          <span>Top Velocity</span>
        </label>

        <div className="grid grid-cols-2 gap-1.5">
          {speedOptions.map((opt, i) => {
            const isActive = filters.minSpeed === opt.value;
            return (
              <button
                key={i}
                type="button"
                onClick={() => onFilterChange({ ...filters, minSpeed: opt.value })}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-medium transition-all text-left flex items-center justify-between cursor-pointer ${isActive
                    ? "bg-neutral-950 text-white dark:bg-[#D4FF00] dark:text-black font-bold shadow-sm"
                    : "bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10"
                  }`}
              >
                <span>{opt.label}</span>
                {isActive && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: RANGE TELEMETRY */}
      <div className="space-y-2.5 pt-3 border-t border-black/5 dark:border-white/10">
        <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 flex items-center gap-1.5">
          <BatteryCharging className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" />
          <span>Range Telemetry</span>
        </label>

        <div className="grid grid-cols-2 gap-1.5">
          {rangeOptions.map((opt, i) => {
            const isActive = filters.minRange === opt.value;
            return (
              <button
                key={i}
                type="button"
                onClick={() => onFilterChange({ ...filters, minRange: opt.value })}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-medium transition-all text-left flex items-center justify-between cursor-pointer ${isActive
                    ? "bg-neutral-950 text-white dark:bg-[#D4FF00] dark:text-black font-bold shadow-sm"
                    : "bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10"
                  }`}
              >
                <span>{opt.label}</span>
                {isActive && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 5: MOTOR POWERTRAIN */}
      <div className="space-y-2.5 pt-3 border-t border-black/5 dark:border-white/10">
        <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" />
          <span>Powertrain Motor</span>
        </label>

        <div className="grid grid-cols-2 gap-1.5">
          {powerOptions.map((opt, i) => {
            const isActive = (filters.motorPower || "all") === opt.value;
            return (
              <button
                key={i}
                type="button"
                onClick={() => onFilterChange({ ...filters, motorPower: opt.value })}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-medium transition-all text-left flex items-center justify-between cursor-pointer ${isActive
                    ? "bg-neutral-950 text-white dark:bg-[#D4FF00] dark:text-black font-bold shadow-sm"
                    : "bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10"
                  }`}
              >
                <span>{opt.label}</span>
                {isActive && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>



      {/* Fleet Classification Tag */}
      <div className="p-4 rounded-2xl bg-[#D4FF00]/10 border border-[#D4FF00]/20 space-y-1.5">
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-neutral-900 dark:text-white uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" />
          <span>Real-Time Factory Sync</span>
        </div>
        <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Telemetry, speed ranges, and factory stock updated in real time.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        className={`hidden lg:block w-72 shrink-0 rounded-3xl backdrop-blur-2xl bg-white/75 dark:bg-[#131418]/85 border border-black/10 dark:border-white/10 p-6 shadow-sm sticky top-28 self-start ${className}`}
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
                <h2 className="font-bold text-base text-neutral-900 dark:text-white">Fleet Filters</h2>
                <button
                  onClick={onCloseMobile}
                  className="p-2 text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {SidebarContent}
            </div>

            <div className="pt-6 mt-6 border-t border-black/10 dark:border-white/10">
              <button
                onClick={onCloseMobile}
                className="w-full py-3 rounded-xl bg-neutral-950 text-white dark:bg-[#D4FF00] dark:text-black font-bold text-xs shadow-md cursor-pointer"
              >
                View Filtered ({totalResults} Vehicles)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
