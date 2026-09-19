"use client";

import React from "react";
import Link from "next/link";
import { FaInstagram, FaFacebook } from "react-icons/fa";

function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function SocialBar() {
  const links = [
    { icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <FaFacebook className="w-4 h-4" />, href: "https://facebook.com", label: "Facebook" },
    { icon: <XIcon className="w-3.5 h-3.5" />, href: "https://x.com", label: "X" },
  ];

  return (
    <aside
      aria-label="Social Links"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex"
    >
      <div className="flex flex-col items-center gap-3 py-3 px-2 rounded-2xl backdrop-blur-2xl bg-white/70 dark:bg-black/40 border border-black/10 dark:border-white/10 shadow-lg">
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="p-2 rounded-xl text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all hover:scale-110"
          >
            {link.icon}
          </Link>
        ))}
      </div>
    </aside>
  );
}
