"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  Cpu,
  BatteryCharging,
  Zap,
  Disc,
  Activity,
} from "lucide-react";

export type CardDirection = "left" | "right" | "top" | "bottom";

export interface SpecPoint {
  id: string;
  step: string;
  partName: string;
  category: string;
  headline: string;
  description: string;
  hotspot: { x: number; y: number };
  icon: React.ReactNode;
  metrics: { label: string; value: string; unit?: string }[];
  direction?: CardDirection;
  bikeShift?: number;
}

const DEFAULT_SPECS: SpecPoint[] = [
  {
    id: "cockpit",
    step: "01",
    partName: "Smart Digital Cockpit",
    category: "Telemetry & Control",
    headline: "Retina TFT Interface with Real-Time OS",
    description:
      "Anti-glare 4.5-inch color display with turn-by-turn navigation, battery thermal monitoring, and Bluetooth smartphone integration.",
    hotspot: { x: 48, y: 22 },
    icon: <Cpu className="w-5 h-5 text-[#D4FF00]" />,
    metrics: [
      { label: "Display", value: "4.5” TFT" },
      { label: "Connectivity", value: "BLE 5.2 / GPS" },
      { label: "Protection", value: "IP67 Rated" },
    ],
    direction: "left",
    bikeShift: 12,
  },
  {
    id: "battery",
    step: "02",
    partName: "48V PowerCell Battery",
    category: "Energy Architecture",
    headline: "Automotive-Grade 21700 Lithium Cells",
    description:
      "Integrated downtube battery with intelligent Battery Management System (BMS), regenerative braking recovery, and rapid charging support.",
    hotspot: { x: 53, y: 48 },
    icon: <BatteryCharging className="w-5 h-5 text-[#D4FF00]" />,
    metrics: [
      { label: "Capacity", value: "960", unit: "Wh" },
      { label: "Max Range", value: "120", unit: "km" },
      { label: "Charge Time", value: "3.5", unit: "hrs" },
    ],
    direction: "right",
    bikeShift: -12,
  },
  {
    id: "motor",
    step: "03",
    partName: "HyperDrive Dual Motor",
    category: "Powertrain",
    headline: "1000W Peak High-Torque Brushless Motor",
    description:
      "Instantaneous torque delivery capable of conquering 35° incline gradients with liquid thermal dissipation and 5 power delivery modes.",
    hotspot: { x: 59, y: 64 },
    icon: <Zap className="w-5 h-5 text-[#D4FF00]" />,
    metrics: [
      { label: "Peak Power", value: "1000", unit: "Watts" },
      { label: "Max Torque", value: "95", unit: "Nm" },
      { label: "Top Speed", value: "65", unit: "km/h" },
    ],
    direction: "bottom",
    bikeShift: 18,
  },
  {
    id: "suspension-brakes",
    step: "04",
    partName: "Inverted Suspension & Disc Brakes",
    category: "Chassis & Safety",
    headline: "Quad-Piston Hydraulic Stopping Power",
    description:
      "Adjustable 160mm inverted front fork suspension paired with 203mm ventilated rotors for maximum grip on gravel, mud, and asphalt.",
    hotspot: { x: 36, y: 62 },
    icon: <Disc className="w-5 h-5 text-[#D4FF00]" />,
    metrics: [
      { label: "Brake Type", value: "4-Piston Hyd." },
      { label: "Rotor Size", value: "203", unit: "mm" },
      { label: "Travel", value: "160", unit: "mm" },
    ],
    direction: "top",
    bikeShift: -18,
  },
];

const DIRECTION_VARIANTS: Record<
  CardDirection,
  {
    initial: { opacity: number; x?: number; y?: number; filter: string };
    animate: { opacity: number; x: number; y: number; filter: string };
    exit: { opacity: number; x?: number; y?: number; filter: string };
  }
> = {
  left: {
    initial: { opacity: 0, x: -60, filter: "blur(10px)" },
    animate: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, x: -40, filter: "blur(10px)" },
  },
  right: {
    initial: { opacity: 0, x: 60, filter: "blur(10px)" },
    animate: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, x: 40, filter: "blur(10px)" },
  },
  top: {
    initial: { opacity: 0, y: -60, filter: "blur(10px)" },
    animate: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -40, filter: "blur(10px)" },
  },
  bottom: {
    initial: { opacity: 0, y: 60, filter: "blur(10px)" },
    animate: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: 40, filter: "blur(10px)" },
  },
};

const getCardPositionClasses = (direction: CardDirection): string => {
  const base = "absolute z-40 w-full max-w-sm mx-auto px-2";
  switch (direction) {
    case "left":
      return `${base} left-0 right-0 bottom-0 lg:left-6 lg:right-auto lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:px-0`;
    case "right":
      return `${base} left-0 right-0 bottom-0 lg:left-auto lg:right-6 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:px-0`;
    case "top":
      return `${base} left-0 right-0 bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:bottom-auto lg:top-6 lg:px-0`;
    case "bottom":
      return `${base} left-0 right-0 bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:top-auto lg:bottom-6 lg:px-0`;
  }
};

export function EvSpecsSection({
  specs = DEFAULT_SPECS,
  bikeImage = "/frame_0087.jpg",
  bikeAlt = "EV Architecture",
  sectionHeight = "380vh",
}: {
  specs?: SpecPoint[];
  bikeImage?: string;
  bikeAlt?: string;
  sectionHeight?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const stepCount = specs.length;
    const current = Math.min(
      Math.floor(latest * stepCount),
      stepCount - 1
    );
    if (current !== activeStep) {
      setActiveStep(current);
    }
  });

  const activeSpec = specs[activeStep] || specs[0];
  const direction: CardDirection = activeSpec.direction || "left";
  const variants = DIRECTION_VARIANTS[direction];
  const bikeShift = activeSpec.bikeShift ?? 0;

  return (
    <section
      id="specs"
      ref={containerRef}
      className="relative w-full"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col p-4 sm:p-6 md:p-10 lg:p-12 select-none">
        {/* Section Header */}
        <div className="relative z-30 flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3 sm:pb-4 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#D4FF00] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-neutral-800 dark:text-neutral-200">
              Architecture Teardown
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5">
            {specs.map((item, idx) => (
              <div
                key={item.id}
                className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                  activeStep === idx
                    ? "w-6 sm:w-8 bg-[#D4FF00]"
                    : "w-1.5 sm:w-2 bg-black/10 dark:bg-white/20"
                }`}
              />
            ))}
            <span className="text-[10px] sm:text-xs font-mono font-bold ml-1.5 sm:ml-2 text-neutral-500 tabular-nums">
              0{activeStep + 1} / 0{specs.length}
            </span>
          </div>
        </div>

        {/* Main Interactive View */}
        <div className="relative flex-1 min-h-0 w-full flex flex-col lg:flex-row items-center lg:justify-center">
          <div className="relative w-full lg:w-full h-full flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl aspect-square sm:aspect-[16/12] lg:aspect-[16/10] flex items-center justify-center">
              <div className="absolute inset-0 bg-radial from-[#D4FF00]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

              <motion.div
                animate={{ x: `${bikeShift}%` }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                  mass: 0.8,
                }}
                className="relative w-full h-full"
              >
                <Image
                  src={bikeImage}
                  alt={bikeAlt}
                  fill
                  priority
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 60vw, 900px"
                  className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500"
                />

                <motion.div
                  animate={{
                    left: `${activeSpec.hotspot.x}%`,
                    top: `${activeSpec.hotspot.y}%`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#D4FF00]/20 animate-ping" />
                    <span className="absolute w-5 h-5 sm:w-8 sm:h-8 rounded-full border border-[#D4FF00] animate-spin-slow" />
                    <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#D4FF00] shadow-[0_0_20px_#D4FF00] ring-2 sm:ring-4 ring-black/40 flex items-center justify-center">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black" />
                    </span>

                    <div className="absolute w-10 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D4FF00] to-transparent pointer-events-none" />
                    <div className="absolute h-10 sm:h-20 w-[1px] bg-gradient-to-b from-transparent via-[#D4FF00] to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Floating Telemetry Card */}
          <div className={getCardPositionClasses(direction)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpec.id}
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="backdrop-blur-2xl backdrop-saturate-150 bg-white/75 dark:bg-[#121316]/85 border border-white/40 dark:border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.15),inset_0_1px_1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.08)] space-y-3 sm:space-y-4 md:space-y-5"
              >
                <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-2.5 sm:pb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-black/5 dark:bg-white/10 shrink-0">
                      {activeSpec.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 truncate">
                        {activeSpec.category}
                      </p>
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white truncate">
                        {activeSpec.partName}
                      </h4>
                    </div>
                  </div>
                  <span className="text-xl sm:text-2xl font-black font-mono text-[#D4FF00] opacity-90 shrink-0 ml-2">
                    {activeSpec.step}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-neutral-900 dark:text-white leading-snug">
                    {activeSpec.headline}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mt-1.5 sm:mt-2">
                    {activeSpec.description}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                  {activeSpec.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 flex flex-col justify-center"
                    >
                      <span className="text-[9px] sm:text-[10px] font-medium text-neutral-500 dark:text-neutral-400 leading-tight">
                        {m.label}
                      </span>
                      <div className="text-[11px] sm:text-xs font-black text-neutral-900 dark:text-white mt-0.5 tabular-nums">
                        {m.value}{" "}
                        {m.unit && (
                          <span className="text-[9px] sm:text-[10px] font-normal text-neutral-500">
                            {m.unit}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 pt-2 sm:pt-3 border-t border-black/5 dark:border-white/10 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4FF00]" />
            <span className="font-mono text-[9px] sm:text-[11px]">
              System Diagnostic Active
            </span>
          </div>
          <span className="font-mono text-[9px] sm:text-[11px] tracking-wide animate-pulse hidden sm:inline">
            Scroll down to inspect next component ↓
          </span>
        </div>
      </div>
    </section>
  );
}
