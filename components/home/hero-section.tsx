"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { ArrowUpRight, Star, Mouse } from "lucide-react";

export interface HeroColor {
  name: string;
  hex: string;
}

export interface HeroProps {
  containerClassName?: string;
  boxClassName?: string;

  // Typography
  titleTop?: string;
  titleBottom?: string;
  titleSlot?: React.ReactNode;

  // Media (image or frames)
  mediaSrc?: string;
  mediaAlt?: string;
  mediaSlot?: React.ReactNode;

  // Frame-based scroll animation
  framesPath?: string;
  framesCount?: number;
  framesExtension?: string;
  framePadding?: number;

  // Left content
  leftDescription?: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  customerCount?: string;
  avatars?: string[];
  rating?: number;
  leftSlot?: React.ReactNode;

  // Right content
  rightDescription?: string;
  rightSlot?: React.ReactNode;

  // Bottom
  colors?: HeroColor[];
  onColorSelect?: (color: string) => void;
  bottomLeftSlot?: React.ReactNode;
  bottomCenterSlot?: React.ReactNode;
  bottomRightSlot?: React.ReactNode;

  children?: React.ReactNode;
}

const DEFAULT_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=faces",
];

const DEFAULT_COLORS: HeroColor[] = [
  { name: "Stealth Grey", hex: "#78716C" },
  { name: "Volt Lime", hex: "#D4FF00" },
  { name: "Sunset Orange", hex: "#F97316" },
  { name: "Deep Obsidian", hex: "#18181B" },
  { name: "Electric Cyan", hex: "#06B6D4" },
];

/* ============================================================
   SCROLL FRAMES COMPONENT
   ============================================================ */
function ScrollFrames({
  framesPath,
  framesCount,
  framesExtension = "jpg",
  framePadding = 4,
  scrollYProgress,
}: {
  framesPath: string;
  framesCount: number;
  framesExtension?: string;
  framePadding?: number;
  scrollYProgress: MotionValue<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  // Draw frame on canvas (cover fit)
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width * dpr;
    const height = rect.height * dpr;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;
    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    } else {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= framesCount; i++) {
      const img = new window.Image();
      const num = String(i).padStart(framePadding, "0");
      img.src = `${framesPath}${num}.${framesExtension}`;
      images.push(img);
    }

    imagesRef.current = images;

    if (images[0]) {
      images[0].onload = () => {
        drawFrame(0);
      };
    }
  }, [framesPath, framesCount, framesExtension, framePadding]);

  // Listen to scroll, change frame with rAF throttle
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest: number) => {
      const frameIndex = Math.min(
        Math.floor(latest * (framesCount - 1)),
        framesCount - 1
      );
      currentFrameRef.current = frameIndex;

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          drawFrame(currentFrameRef.current);
          rafRef.current = null;
        });
      }
    });

    return () => {
      unsubscribe();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollYProgress, framesCount]);

  // Redraw on resize
  useEffect(() => {
    const onResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-contain pointer-events-auto rounded-2xl"
      style={{
        filter: "drop-shadow(0 25px 45px rgba(0,0,0,0.25))",
      }}
    />
  );
}

/* ============================================================
   HERO SECTION
   ============================================================ */
export function HeroSection({
  containerClassName = "",
  boxClassName = "",
  titleTop = "Future of",
  titleBottom = "E-Bike",
  titleSlot,
  mediaSrc = "/hero-ebike.jpg",
  mediaAlt = "Electric Performance Bike",
  mediaSlot,
  framesPath = "/frames/frame_",
  framesCount = 0,
  framesExtension = "jpg",
  framePadding = 4,
  leftDescription = "E-bike technology combines advanced electric motor systems, lightweight aerospace batteries, and smart controls to enhance cycling efficiency.",
  ctaText = "Explore Fleet",
  ctaHref = "/products",
  onCtaClick,
  customerCount = "20k+ Satisfied Riders",
  avatars = DEFAULT_AVATARS,
  rating = 5,
  leftSlot,
  rightDescription = "Engineered with dual-motor torque vectoring and dynamic energy recuperation management.",
  rightSlot,
  colors = DEFAULT_COLORS,
  onColorSelect,
  bottomLeftSlot,
  bottomCenterSlot,
  bottomRightSlot,
  children,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState(colors[0]?.hex);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springConfig = {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.001,
  };

  // Parallax & fade
  const leftXRaw = useTransform(scrollYProgress, [0, 0.65], [0, -180]);
  const leftX = useSpring(leftXRaw, springConfig);

  const rightXRaw = useTransform(scrollYProgress, [0, 0.65], [0, 180]);
  const rightX = useSpring(rightXRaw, springConfig);

  const leftOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);

  const topTextXRaw = useTransform(scrollYProgress, [0, 0.65], [0, -120]);
  const topTextX = useSpring(topTextXRaw, springConfig);

  const bottomTextXRaw = useTransform(scrollYProgress, [0, 0.65], [0, 120]);
  const bottomTextX = useSpring(bottomTextXRaw, springConfig);

  const useFrames = framesCount > 0;

  return (
    <section
      ref={containerRef}
      className={`relative h-[200vh] w-full px-4 sm:px-6 lg:px-10 pt-24 pb-8 ${containerClassName}`}
    >
      <div className="sticky top-24 h-[calc(100vh-7.5rem)] min-h-[580px] max-h-[920px] w-full flex items-center justify-center">
        <div
          className={`relative w-full h-full max-w-7xl mx-auto rounded-3xl md:rounded-[2.5rem] border border-black/10 dark:border-white/10 bg-gradient-to-b from-white/80 via-white/50 to-white/70 dark:from-[#131418]/90 dark:via-[#0e0f12]/80 dark:to-[#131418]/90 backdrop-blur-md max-md:backdrop-blur-none will-change-transform shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] dark:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col justify-between p-6 sm:p-8 md:p-10 select-none ${boxClassName}`}
        >
          {/* Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4FF00]/10 dark:bg-[#D4FF00]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

          {/* Background Typography */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0 p-6 sm:p-10 overflow-hidden">
            {titleSlot ? (
              titleSlot
            ) : (
              <>
                <motion.h1
                  style={{ x: topTextX }}
                  className="text-[12vw] sm:text-[10vw] md:text-[8.5vw] font-black tracking-tighter text-black/20 dark:text-white/20 leading-none select-none uppercase will-change-transform"
                >
                  {titleTop}
                </motion.h1>

                <motion.h2
                  style={{ x: bottomTextX }}
                  className="text-[12vw] sm:text-[10vw] md:text-[8.5vw] font-black tracking-tighter text-black/15 dark:text-white/15 leading-none self-end select-none uppercase will-change-transform"
                >
                  {titleBottom}
                </motion.h2>
              </>
            )}
          </div>

          {/* Center Media */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 p-6">
            {mediaSlot ? (
              <div className="pointer-events-auto w-full h-full flex items-center justify-center">
                {mediaSlot}
              </div>
            ) : (
              <div className="relative w-[90%] sm:w-[75%] md:w-[60%] max-w-3xl aspect-[16/10] flex items-center justify-center will-change-transform">
                {useFrames ? (
                  <ScrollFrames
                    framesPath={framesPath}
                    framesCount={framesCount}
                    framesExtension={framesExtension}
                    framePadding={framePadding}
                    scrollYProgress={scrollYProgress}
                  />
                ) : (
                  <Image
                    src={mediaSrc}
                    alt={mediaAlt}
                    fill
                    priority
                    className="object-contain pointer-events-auto filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)]"
                  />
                )}
              </div>
            )}
          </div>

          {/* Bottom Row */}
          <div className="relative z-20 w-full grid grid-cols-1 md:grid-cols-12 gap-4 items-end pointer-events-none mt-auto pt-4">
            {/* Bottom Left: Left Description Card */}
            <motion.div
              style={{ x: leftX, opacity: leftOpacity }}
              className="md:col-span-5 lg:col-span-4 pointer-events-auto will-change-transform"
            >
              {leftSlot ? (
                leftSlot
              ) : (
                <div className="backdrop-blur-md max-md:backdrop-blur-none bg-white/70 dark:bg-[#15171c]/75 border border-black/5 dark:border-white/10 p-5 rounded-2xl md:rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] space-y-4 max-w-sm">
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
                    {leftDescription}
                  </p>

                  <div className="pt-1">
                    {onCtaClick ? (
                      <button
                        onClick={onCtaClick}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black font-semibold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer hover:shadow-[0_0_20px_rgba(212,255,0,0.3)]"
                      >
                        <span>{ctaText}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <Link
                        href={ctaHref}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black font-semibold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-md hover:shadow-[0_0_20px_rgba(212,255,0,0.3)]"
                      >
                        <span>{ctaText}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>

                  {/* Social Proof */}
                  <div className="flex items-center gap-3 pt-2 border-t border-black/5 dark:border-white/10">
                    <div className="flex items-center -space-x-2">
                      {avatars.slice(0, 4).map((src, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full border-2 border-white dark:border-neutral-900 overflow-hidden relative shadow-sm"
                        >
                          <Image
                            src={src}
                            alt="User Avatar"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                      <div className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-800 border-2 border-white dark:border-neutral-900 flex items-center justify-center text-[10px] font-bold text-neutral-700 dark:text-neutral-300">
                        +
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-[11px] font-bold text-neutral-900 dark:text-neutral-100">
                        {customerCount}
                      </p>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[...Array(rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-amber-500"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Bottom Center: Scroll Indicator */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center pointer-events-auto pb-1">
              {bottomCenterSlot ? (
                bottomCenterSlot
              ) : (
                <div className="flex flex-col items-center justify-center gap-1">
                  <Mouse className="w-4 h-4 text-neutral-600 dark:text-neutral-400 animate-bounce" />
                  <span className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 tracking-wider">
                    Scroll to explore
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Right: Custom slot */}
            <motion.div
              style={{ x: rightX, opacity: rightOpacity }}
              className="md:col-span-3 flex justify-end pointer-events-auto will-change-transform"
            >
              {bottomRightSlot}
            </motion.div>
          </div>

          {children && (
            <div className="relative z-30 pointer-events-auto">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
