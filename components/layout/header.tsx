"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface HeaderProps {
  logoText?: string;
  logoHref?: string;
  links?: NavItem[];
  cartCount?: number;
  onCartClick?: () => void;
  showThemeToggle?: boolean;
  showAuth?: boolean;
  loginText?: string;
  loginHref?: string;
  signupText?: string;
  signupHref?: string;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

const DEFAULT_LINKS: NavItem[] = [
  { label: "Products", href: "/products" },
  { label: "Specs", href: "/#specs" },
  { label: "Contact", href: "/contact" },
];

export function Header({
  logoText = "Volt Studio",
  logoHref = "/",
  links = DEFAULT_LINKS,
  cartCount = 2,
  onCartClick,
  showThemeToggle = true,
  showAuth = true,
  loginText = "Log In",
  loginHref = "/login",
  signupText = "Sign Up",
  signupHref = "/signup",
  onLoginClick,
  onSignupClick,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll listener for the dynamic stretch & condense animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 inset-x-0 mx-auto transition-all duration-500 ease-out px-4 pointer-events-none ${
        isScrolled ? "top-2.5 max-w-7xl" : "top-5 max-w-6xl"
      }`}
    >
      {/* Ultra-Glass Container */}
      <div
        className={`pointer-events-auto w-full backdrop-blur-md backdrop-saturate-150 border transition-all duration-500 ease-out flex items-center justify-between ${
          isScrolled
            ? "bg-white/50 dark:bg-[#0c0d10]/50 border-black/10 dark:border-white/15 py-2.5 px-5 md:px-7 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.12)]"
            : "bg-white/40 dark:bg-[#121316]/55 border-white/60 dark:border-white/10 py-3.5 px-6 md:px-8 rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.06),inset_0_1px_2px_0_rgba(255,255,255,0.9)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.1)]"
        }`}
      >
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link
            href={logoHref}
            className="flex items-center gap-2.5 group cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-xl bg-[#D4FF00] flex items-center justify-center font-black text-black text-sm shadow-[0_0_20px_rgba(212,255,0,0.45)] group-hover:rotate-12 transition-transform duration-300">
              V
            </div>
            <span className="font-extrabold tracking-wider text-base bg-gradient-to-r from-neutral-950 via-neutral-800 to-[#84a300] dark:from-white dark:via-neutral-100 dark:to-[#D4FF00] bg-clip-text text-transparent uppercase">
              {logoText}
            </span>
          </Link>
        </div>

        {/* Middle: Clean Nav Links */}
        {links.length > 0 && (
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`relative text-xs lg:text-sm font-medium transition-all duration-200 py-1 group/link ${
                    isActive
                      ? "text-black dark:text-white font-semibold"
                      : "text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-full bg-[#D4FF00]"
                        : "w-0 group-hover/link:w-full bg-[#D4FF00]/80"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right: Cart + Toggle + Login + Signup */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Cart Icon Button */}
          <Link
            href="/cart"
            className="relative p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-neutral-800 dark:text-neutral-200 cursor-pointer active:scale-95"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4FF00] text-[10px] font-black text-black ring-2 ring-white dark:ring-[#0c0d10] animate-in zoom-in">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Theme Switcher Toggle */}
          {showThemeToggle && (
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          )}

          {/* Auth Section: Login & Sign Up */}
          {showAuth && (
            <div className="hidden md:flex items-center gap-2 ml-1">
              <div className="h-4 w-[1px] bg-black/10 dark:bg-white/15 mx-1" />

              {onLoginClick ? (
                <button
                  onClick={onLoginClick}
                  className="text-xs font-semibold text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  {loginText}
                </button>
              ) : (
                <Link
                  href={loginHref}
                  className="text-xs font-semibold text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white px-3 py-1.5 rounded-lg transition-colors"
                >
                  {loginText}
                </Link>
              )}

              {onSignupClick ? (
                <button
                  onClick={onSignupClick}
                  className="inline-flex items-center gap-1 text-xs font-bold bg-neutral-900 text-white dark:bg-white dark:text-black px-4 py-2 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer hover:shadow-[0_0_20px_rgba(212,255,0,0.3)]"
                >
                  <span>{signupText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                </button>
              ) : (
                <Link
                  href={signupHref}
                  className="inline-flex items-center gap-1 text-xs font-bold bg-neutral-900 text-white dark:bg-white dark:text-black px-4 py-2 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md hover:shadow-[0_0_20px_rgba(212,255,0,0.3)]"
                >
                  <span>{signupText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                </Link>
              )}
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl md:hidden text-neutral-800 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-2.5 backdrop-blur-2xl bg-white/95 dark:bg-[#101114]/95 border border-black/10 dark:border-white/10 rounded-2xl p-5 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white px-3 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="h-[1px] bg-black/10 dark:bg-white/10 w-full" />

          {showAuth && (
            <div className="flex items-center justify-between pt-1">
              <Link
                href={loginHref}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold px-4 py-2 text-neutral-800 dark:text-neutral-200 hover:underline"
              >
                {loginText}
              </Link>
              <Link
                href={signupHref}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold bg-neutral-900 text-white dark:bg-white dark:text-black px-4 py-2 rounded-xl shadow-md"
              >
                {signupText}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
