"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  MessageSquare,
  Users,
  Landmark,
  Bike,
  Layers,
  LogOut,
  X,
  Camera,
  Loader2,
} from "lucide-react";
import { AdminTab } from "@/types/admin";
import { api } from "@/services/api";

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  productsCount: number;
  categoriesCount?: number;
  ordersCount: number;
  queriesCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export function AdminSidebar({
  activeTab,
  setActiveTab,
  productsCount,
  categoriesCount = 0,
  ordersCount,
  queriesCount,
  isOpenMobile,
  onCloseMobile,
}: AdminSidebarProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [adminAvatar, setAdminAvatar] = useState<string>("");
  const [adminName, setAdminName] = useState<string>("Operations Director");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    const cachedAdmin = localStorage.getItem("volt_admin_user");
    if (cachedAdmin) {
      try {
        const parsed = JSON.parse(cachedAdmin);
        if (parsed.avatar) setAdminAvatar(parsed.avatar);
        if (parsed.name) setAdminName(parsed.name);
      } catch (e) {}
    }
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      const res = await api.upload.avatar(file);
      if (res.data?.url) {
        const newUrl = res.data.url;
        setAdminAvatar(newUrl);
        const cachedAdmin = localStorage.getItem("volt_admin_user");
        if (cachedAdmin) {
          try {
            const parsed = JSON.parse(cachedAdmin);
            parsed.avatar = newUrl;
            localStorage.setItem("volt_admin_user", JSON.stringify(parsed));
          } catch (e) {}
        }
      }
    } catch (err) {
      console.error("Admin avatar upload failed:", err);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("volt_admin_token");
    localStorage.removeItem("volt_admin_user");
    router.push("/admin/login");
  };

  const navItems = [
    { id: "overview" as AdminTab, label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "products" as AdminTab, label: "Fleet Catalog", icon: <Bike className="w-4 h-4" />, badge: productsCount },
    { id: "categories" as AdminTab, label: "Fleet Categories", icon: <Layers className="w-4 h-4" />, badge: categoriesCount },
    { id: "orders" as AdminTab, label: "Orders & Fulfillment", icon: <ShoppingBag className="w-4 h-4" />, badge: ordersCount },
    { id: "queries" as AdminTab, label: "Customer Inquiries", icon: <MessageSquare className="w-4 h-4" />, badge: queriesCount },
    { id: "users" as AdminTab, label: "Customers & Users", icon: <Users className="w-4 h-4" /> },
    { id: "banking" as AdminTab, label: "Banking & Settlement", icon: <Landmark className="w-4 h-4" /> },
  ];

  const content = (
    <div className="flex flex-col justify-between h-full space-y-6">
      {/* Hidden file input for uploading admin picture from PC */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />

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
            <button onClick={onCloseMobile} className="p-1.5 text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer">
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
                      isActive ? "bg-[#D4FF00] text-black font-black" : "bg-black/10 dark:bg-white/10"
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

      {/* Admin Profile & Exit */}
      <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
        <div className="flex items-center gap-3 p-2 rounded-2xl bg-black/5 dark:bg-white/5">
          <div className="relative group shrink-0">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#D4FF00] text-black font-black text-xs flex items-center justify-center relative">
              {adminAvatar ? (
                <Image src={adminAvatar} alt="Admin" fill unoptimized className="object-cover" />
              ) : (
                <span>AD</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer"
              title="Upload Admin Photo from PC"
            >
              {uploadingAvatar ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D4FF00]" />
              ) : (
                <Camera className="w-3.5 h-3.5 text-[#D4FF00]" />
              )}
            </button>
          </div>

          <div className="space-y-0.5 overflow-hidden flex-1">
            <span className="text-xs font-bold text-neutral-900 dark:text-white block truncate">
              {adminName}
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-[10px] font-mono text-[#84a300] dark:text-[#D4FF00] hover:underline block"
            >
              Upload Photo
            </button>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Admin Session</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex w-64 shrink-0 h-screen sticky top-0 bg-white/70 dark:bg-[#101114]/80 backdrop-blur-2xl border-r border-black/10 dark:border-white/10 p-6 flex-col justify-between">
        {content}
      </aside>

      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div onClick={onCloseMobile} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-[#121316] p-6 shadow-2xl z-10">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
