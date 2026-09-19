"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    Lock,
    User,
    Eye,
    EyeOff,
    ArrowRight,
    Check,
    ShieldCheck,
    Sparkles,
    ArrowLeft,
    Apple,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function AuthPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // Calculate Password Strength (0 to 4)
    const getPasswordStrength = (pass: string) => {
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        return score;
    };

    const strength = getPasswordStrength(formData.password);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate Auth API Call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                router.push("/profile");
            }, 1200);
        }, 1200);
    };

    return (
        <main className="min-h-screen w-full bg-[#E4E5E8] dark:bg-[#0A0A0D] text-neutral-900 dark:text-neutral-100 flex flex-col justify-between relative overflow-hidden transition-colors duration-300 select-none">

            {/* ================= BACKGROUND ROTATING HUD RINGS & GLOW ================= */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                {/* Radial Neon Glow */}
                <div className="absolute w-[500px] h-[500px] bg-[#D4FF00]/15 dark:bg-[#D4FF00]/10 rounded-full blur-[120px]" />

                {/* Slow Spinning HUD Rings */}
                <div className="absolute w-[650px] h-[650px] rounded-full border border-dashed border-black/10 dark:border-white/10 animate-spin-slow" />
                <div className="absolute w-[450px] h-[450px] rounded-full border border-black/5 dark:border-white/5 animate-spin-reverse" />
            </div>

            {/* ================= TOP NAVIGATION BAR ================= */}
            <header className="relative z-20 px-6 md:px-12 py-6 flex items-center justify-between">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Studio</span>
                </Link>

                {/* Logo & Theme Toggle */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-[#D4FF00] flex items-center justify-center font-black text-black text-xs shadow-md">
                            V
                        </div>
                        <span className="font-black text-sm tracking-wider uppercase hidden sm:inline">
                            Volt Studio
                        </span>
                    </Link>
                    <ThemeToggle />
                </div>
            </header>

            {/* ================= CENTER AUTH CARD ================= */}
            <div className="relative z-20 flex-1 flex items-center justify-center p-4 md:p-6">
                <motion.div
                    layout
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-md rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 p-7 md:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] space-y-6"
                >
                    {/* Top Pill Switcher (Morphing Tab Animation) */}
                    <div className="p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex relative">
                        <button
                            onClick={() => {
                                setIsLogin(true);
                                setIsSuccess(false);
                            }}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all relative z-10 cursor-pointer ${isLogin ? "text-neutral-950 dark:text-white" : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                                }`}
                        >
                            Sign In
                        </button>

                        <button
                            onClick={() => {
                                setIsLogin(false);
                                setIsSuccess(false);
                            }}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all relative z-10 cursor-pointer ${!isLogin ? "text-neutral-950 dark:text-white" : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                                }`}
                        >
                            Create Account
                        </button>

                        {/* Sliding Fluid Indicator Pill */}
                        <motion.div
                            layoutId="active-auth-pill"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            className={`absolute top-1 bottom-1 rounded-xl bg-white dark:bg-white/15 shadow-sm ${isLogin ? "left-1 right-1/2" : "left-1/2 right-1"
                                }`}
                        />
                    </div>

                    {/* Header Copy */}
                    <div className="space-y-1 text-center">
                        <h2 className="text-2xl font-black tracking-tight text-neutral-950 dark:text-white">
                            {isLogin ? "Welcome Back" : "Join the Movement"}
                        </h2>
                        <p className="text-xs text-neutral-500">
                            {isLogin
                                ? "Enter your credentials to access your telemetry dashboard"
                                : "Register for customized test rides, firmware drops & perks"}
                        </p>
                    </div>

                    {/* Social Auth Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-xs font-bold text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer">
                            {/* <Chrome className="w-4 h-4" /> */}
                            <span>Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-xs font-bold text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer">
                            <Apple className="w-4 h-4" />
                            <span>Apple</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="h-[1px] bg-black/10 dark:bg-white/10 flex-1" />
                        <span className="text-[10px] font-mono text-neutral-400 uppercase">Or continue with email</span>
                        <div className="h-[1px] bg-black/10 dark:bg-white/10 flex-1" />
                    </div>

                    {/* Form Fields */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Name Input (Only on Sign Up) */}
                        <AnimatePresence>
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-1 overflow-hidden"
                                >
                                    <label className="text-[11px] font-mono text-neutral-500 uppercase font-bold">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="text"
                                            required={!isLogin}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Alex Vance"
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D4FF00] transition-all"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Email Input */}
                        <div className="space-y-1">
                            <label className="text-[11px] font-mono text-neutral-500 uppercase font-bold">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="rider@voltstudio.com"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D4FF00] transition-all"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="text-[11px] font-mono text-neutral-500 uppercase font-bold">
                                    Password
                                </label>
                                {isLogin && (
                                    <Link
                                        href="#"
                                        className="text-[11px] font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-[#D4FF00] transition-colors"
                                    >
                                        Forgot?
                                    </Link>
                                )}
                            </div>

                            <div className="relative">
                                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••••••"
                                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D4FF00] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>

                            {/* Live Password Strength Meter (On Sign Up) */}
                            {!isLogin && formData.password && (
                                <div className="space-y-1 pt-1.5 animate-in fade-in">
                                    <div className="flex gap-1 h-1">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={`flex-1 rounded-full transition-all duration-300 ${strength >= level
                                                    ? strength >= 3
                                                        ? "bg-[#D4FF00]"
                                                        : strength === 2
                                                            ? "bg-amber-400"
                                                            : "bg-red-400"
                                                    : "bg-black/10 dark:bg-white/10"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-mono text-neutral-500 block">
                                        Security:{" "}
                                        <strong className="text-neutral-900 dark:text-white">
                                            {strength <= 1 ? "Weak" : strength === 2 ? "Moderate" : strength === 3 ? "Strong" : "Military Grade"}
                                        </strong>
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Submit Button with Fluid Morphing States */}
                        <button
                            type="submit"
                            disabled={isLoading || isSuccess}
                            className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer mt-2 active:scale-95 ${isSuccess
                                ? "bg-[#D4FF00] text-black"
                                : "bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black"
                                }`}
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : isSuccess ? (
                                <>
                                    <Check className="w-4 h-4 text-black" />
                                    <span>{isLogin ? "Authenticated!" : "Account Created!"}</span>
                                </>
                            ) : (
                                <>
                                    <span>{isLogin ? "Authenticate" : "Create Account"}</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Security Assurance Tag */}
                    <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] font-mono text-neutral-500">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" />
                        <span>256-bit Encrypted Telemetry Authentication</span>
                    </div>
                </motion.div>
            </div>

            {/* ================= BOTTOM FOOTER BAR ================= */}
            <footer className="relative z-20 px-6 py-4 text-center text-[11px] font-mono text-neutral-500">
                © {new Date().getFullYear()} Volt Studio Mobility Inc. All rights reserved.
            </footer>
        </main>
    );
}