"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  MessageSquare,
  Users,
  Landmark,
  Bike,
  LogOut,
  X,
} from "lucide-react";
import { AdminTab } from "@/types/admin";

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  productsCount: number;
  ordersCount: number;
  queriesCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export function AdminSidebar({
  activeTab,
  setActiveTab,
  productsCount,
  ordersCount,
  queriesCount,
  isOpenMobile,
  onCloseMobile,
}: AdminSidebarProps) {
  const navItems = [
    { id: "overview" as AdminTab, label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "products" as AdminTab, label: "Fleet Catalog", icon: <Bike className="w-4 h-4" />, badge: productsCount },
    { id: "orders" as AdminTab, label: "Orders & Shipping", icon: <ShoppingBag className="w-4 h-4" />, badge: ordersCount },
    { id: "queries" as AdminTab, label: "Customer Inquiries", icon: <MessageSquare className="w-4 h-4" />, badge: queriesCount },
    { id: "users" as AdminTab, label: "Rider Community", icon: <Users className="w-4 h-4" /> },
    { id: "banking" as AdminTab, label: "Banking & Settlement", icon: <Landmark className="w-4 h-4" /> },
  ];

  const content = (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#D4FF00] flex items-center justify-center font-black text-black text-sm shadow-md">
              V
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-wider uppercase block">
                Volt Studio
              </span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase">
                Admin Console
              </span>
            </div>
          </Link>

          {isOpenMobile && (
            <button onClick={onCloseMobile} className="p-1.5 text-neutral-500 hover:text-black dark:hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isOpenMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-neutral-950 text-white dark:bg-white dark:text-black shadow-md"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isActive ? "bg-[#D4FF00] text-black" : "bg-black/10 dark:bg-white/10"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout / Exit */}
      <div className="pt-4 border-t border-black/10 dark:border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-500 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Admin Suite</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 p-6 bg-white/70 dark:bg-[#0c0d10]/80 backdrop-blur-2xl border-r border-black/10 dark:border-white/10 z-30">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div onClick={onCloseMobile} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-72 h-full bg-white dark:bg-[#121316] p-6 shadow-2xl z-10 flex flex-col justify-between">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
