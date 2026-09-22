"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Zap, Gauge, BatteryCharging, Layers } from "lucide-react";
import { api } from "@/services/api";

export interface CategoryItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
  specs?: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }[];
  accentColor?: string;
}

export function CategorySection({
  tag = "Fleet Architecture",
  heading = "Explore Electric Classifications",
  subheading = "Engineered classifications tailored for precision urban agility, long-range endurance, and high-velocity trail conquest.",
  categories: initialCategories,
}: {
  tag?: string;
  heading?: string;
  subheading?: string;
  categories?: CategoryItem[];
}) {
  const [categoriesList, setCategoriesList] = useState<CategoryItem[]>(initialCategories || []);
  const [loading, setLoading] = useState(!initialCategories || initialCategories.length === 0);

  useEffect(() => {
    const fetchLiveCategories = async () => {
      try {
        const res = await api.categories.getAll();
        if (res.data && res.data.length > 0) {
          const mapped: CategoryItem[] = res.data.map((c: any, idx: number) => ({
            id: c.id || `cat-${idx}`,
            badge: c.slug ? `/${c.slug.toUpperCase()}` : "FLEET SERIES",
            title: c.name,
            subtitle: "Electric Vehicle Segment",
            description: c.description || "Precision engineered for high-performance zero-emission mobility.",
            image: c.image || (idx % 2 === 0
              ? "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=900&auto=format&fit=crop"
              : "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=900&auto=format&fit=crop"
            ),
            href: `/products?category=${encodeURIComponent(c.name)}`,
            specs: [
              { icon: <Gauge className="w-3.5 h-3.5" />, label: "Class", value: "Level 3 EV" },
              { icon: <BatteryCharging className="w-3.5 h-3.5" />, label: "Architecture", value: "Smart BMS" },
              { icon: <Zap className="w-3.5 h-3.5" />, label: "Powertrain", value: "Brushless" },
            ],
          }));
          setCategoriesList(mapped);
        }
      } catch (err) {
        console.error("Failed to load live categories on homepage:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveCategories();
  }, []);

  if (!loading && categoriesList.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-24 px-6 md:px-12 max-w-7xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D4FF00] text-black uppercase tracking-wider shadow-sm">
          ✦ {tag}
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
          {heading}
        </h2>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {subheading}
        </p>
      </div>

      {/* Categories Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[1, 2].map((n) => (
            <div key={n} className="h-96 rounded-3xl bg-black/5 dark:bg-white/5 animate-pulse border border-black/5 dark:border-white/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categoriesList.map((cat) => (
            <div
              key={cat.id}
              className="group relative rounded-3xl p-8 md:p-10 backdrop-blur-2xl bg-white/70 dark:bg-[#131418]/80 border border-black/10 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col justify-between overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#D4FF00]/50"
            >
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#D4FF00]/10 rounded-full blur-3xl group-hover:bg-[#D4FF00]/20 transition-all duration-500 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/10">
                    {cat.badge}
                  </span>

                  <Link
                    href={cat.href}
                    className="w-10 h-10 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black flex items-center justify-center group-hover:bg-[#D4FF00] group-hover:text-black transition-colors duration-300 shadow-md cursor-pointer"
                    aria-label={`Explore ${cat.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                  </Link>
                </div>

                <div>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900 dark:text-white group-hover:text-[#84a300] dark:group-hover:text-[#D4FF00] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-1 uppercase tracking-widest">
                    {cat.subtitle}
                  </p>
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-md">
                  {cat.description}
                </p>
              </div>

              <div className="relative w-full aspect-[16/10] my-6 flex items-center justify-center overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  unoptimized
                  className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/10 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                {cat.specs && (
                  <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
                    {cat.specs.map((spec, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center sm:items-start p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
                      >
                        <div className="flex items-center gap-1 text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
                          {spec.icon}
                          <span>{spec.label}</span>
                        </div>
                        <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-0.5 tabular-nums">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  href={cat.href}
                  className="w-full sm:w-auto text-center px-5 py-2.5 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black font-semibold text-xs hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black transition-all duration-300 shadow-md whitespace-nowrap cursor-pointer"
                >
                  Explore Category
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
