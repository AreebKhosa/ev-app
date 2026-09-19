"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Battery, Disc, Layers } from "lucide-react";

export interface PartnerItem {
  name: string;
  category: string;
  icon: React.ReactNode;
}

const DEFAULT_PARTNERS: PartnerItem[] = [
  { name: "SAMSUNG SDI", category: "21700 Battery Cells", icon: <Battery className="w-4 h-4" /> },
  { name: "SHIMANO", category: "Precision Drivetrain", icon: <Layers className="w-4 h-4" /> },
  { name: "BREMBO", category: "Hydraulic Quad Braking", icon: <Disc className="w-4 h-4" /> },
  { name: "BOSCH SYSTEMS", category: "ECU Motor Telemetry", icon: <Cpu className="w-4 h-4" /> },
  { name: "ROCKSHOX", category: "Inverted Suspension", icon: <ShieldCheck className="w-4 h-4" /> },
  { name: "MICHELIN", category: "All-Terrain Compound Tires", icon: <Disc className="w-4 h-4" /> },
];

export function PartnersSection({
  tag = "Hardware Alliance",
  title = "Powered by Industry Leaders",
  partners = DEFAULT_PARTNERS,
}: {
  tag?: string;
  title?: string;
  partners?: PartnerItem[];
}) {
  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full relative z-20 border-t border-black/5 dark:border-white/10">
      <div className="text-center space-y-3 mb-12">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#92b500] dark:text-[#D4FF00] font-bold">
          ✦ {tag}
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group p-5 rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-[#121316]/70 border border-black/5 dark:border-white/10 hover:border-[#D4FF00]/50 hover:bg-white/90 dark:hover:bg-[#181920] transition-all duration-300 flex flex-col items-center text-center justify-center space-y-2 shadow-sm"
          >
            <div className="text-neutral-500 group-hover:text-[#D4FF00] transition-colors">
              {partner.icon}
            </div>
            <span className="text-xs font-black tracking-wider text-neutral-800 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white transition-colors">
              {partner.name}
            </span>
            <span className="text-[10px] font-mono text-neutral-500 line-clamp-1">
              {partner.category}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
