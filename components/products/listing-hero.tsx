"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

interface HeroScrollMediaFrameProps {
  framesPath?: string;
  framesCount?: number;
  framesExtension?: string;
  framePadding?: number;
  mediaSrc?: string;
  fallbackImage?: string;
  title?: string;
  scrollRange?: number;
  aspectClass?: string;
  maxWidthClass?: string;
}

export function HeroScrollMediaFrame({
  framesPath = "/frames/frame_",
  framesCount = 100,
  framesExtension = "jpg",
  framePadding = 4,
  mediaSrc,
  fallbackImage = "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=900&auto=format&fit=crop",
  title = "Volt Alpha 360°",
  scrollRange = 600,
  aspectClass = "aspect-[16/10]",
  maxWidthClass = "max-w-lg",
}: HeroScrollMediaFrameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [framesReady, setFramesReady] = useState(false);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);

  const frameUrls = useMemo(() => {
    if (!framesPath || framesCount <= 0) return [];
    return Array.from({ length: framesCount }, (_, i) => {
      const num = String(i + 1).padStart(framePadding, "0");
      return `${framesPath}${num}.${framesExtension}`;
    });
  }, [framesPath, framesCount, framesExtension, framePadding]);

  const useFrames = frameUrls.length > 0;

  useEffect(() => {
    if (!useFrames) return;
    let cancelled = false;

    const preload = async () => {
      const imgs: HTMLImageElement[] = [];

      await Promise.all(
        frameUrls.map(
          (url, i) =>
            new Promise<void>((resolve) => {
              const img = new window.Image();
              img.decoding = "sync";
              img.src = url;
              img.onload = () => resolve();
              img.onerror = () => resolve();
              imgs[i] = img;
            })
        )
      );

      if (!cancelled) {
        imagesRef.current = imgs;
        setFramesReady(true);
      }
    };

    preload();
    return () => {
      cancelled = true;
    };
  }, [useFrames, frameUrls]);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrollY = window.scrollY;
        const p = Math.min(Math.max(scrollY / scrollRange, 0), 1);

        if (useFrames) {
          const idx = Math.round(p * (frameUrls.length - 1));
          setActiveFrameIndex(idx);
        } else if (
          videoRef.current &&
          !isNaN(videoRef.current.duration)
        ) {
          videoRef.current.currentTime =
            videoRef.current.duration * p;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [scrollRange, useFrames, frameUrls.length]);

  useEffect(() => {
    if (!useFrames || !framesReady) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[activeFrameIndex];
    if (!img) return;

    if (
      canvas.width !== img.naturalWidth ||
      canvas.height !== img.naturalHeight
    ) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  }, [activeFrameIndex, framesReady, useFrames]);

  return (
    <div
      className={`relative w-full ${maxWidthClass} ${aspectClass} flex items-center justify-center bg-transparent pointer-events-none select-none`}
    >
      <div className="absolute inset-0 bg-radial from-[#D4FF00]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      {useFrames && framesReady && (
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)]"
        />
      )}

      {useFrames && !framesReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-neutral-400/40 border-t-[#D4FF00] animate-spin" />
        </div>
      )}

      {!useFrames && mediaSrc && (
        <video
          ref={videoRef}
          src={mediaSrc}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)]"
        />
      )}

      {!useFrames && !mediaSrc && (
        <img
          src={fallbackImage}
          alt={title}
          draggable={false}
          className="w-full h-full object-contain filter drop-shadow-2xl"
        />
      )}

      <div className="absolute bottom-1 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 dark:bg-white/10 backdrop-blur-md text-[10px] font-mono text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/10">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
        <span>360° SCROLL INTERACTIVE</span>
      </div>
    </div>
  );
}
