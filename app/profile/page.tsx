"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RiderHeader } from "@/components/profile/rider-header";
import { FleetTab } from "@/components/profile/fleet-tab";
import { OrdersTab } from "@/components/profile/orders-tab";
import { TelemetryTab } from "@/components/profile/telemetry-tab";
import { SettingsTab } from "@/components/profile/settings-tab";
import { api } from "@/services/api";
import { User, ProfileOrder, OwnedVehicle } from "@/types/user";
import { ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "fleet" | "telemetry" | "settings">("orders");
  const [vehicles, setVehicles] = useState<OwnedVehicle[]>([]);
  const [userProfile, setUserProfile] = useState<User>({
    id: "",
    name: "User",
    email: "",
    role: "USER",
    tier: "Customer",
    memberSince: new Date().getFullYear().toString(),
  });
  const [orders, setOrders] = useState<ProfileOrder[]>([]);

  // 1. Protected Route Authentication Check & Live Data Hydration
  useEffect(() => {
    const token = localStorage.getItem("volt_auth_token");
    const cachedUser = localStorage.getItem("volt_user");

    if (!token && !cachedUser) {
      router.push("/login?redirect=/profile");
      return;
    }

    if (cachedUser) {
      try {
        const parsed = JSON.parse(cachedUser);
        setUserProfile((prev) => ({
          ...prev,
          id: parsed.id || prev.id,
          name: parsed.name || prev.name,
          email: parsed.email || prev.email,
          avatar: parsed.avatar || prev.avatar,
          tier: parsed.tier || prev.tier || "Customer",
          shippingAddress: parsed.shippingAddress || prev.shippingAddress,
        }));
      } catch (e) {
        // ignore parse error
      }
    }

    setIsAuthenticated(true);

    // 2. Fetch fresh real profile & orders from backend API
    const loadProfile = async () => {
      try {
        const res = await api.auth.getProfile();
        if (res.data) {
          const u = res.data;
          setUserProfile((prev) => ({
            ...prev,
            id: u.id,
            name: u.name,
            email: u.email,
            avatar: u.avatar || prev.avatar,
            tier: u.tier || "Customer",
            phone: u.phone,
            shippingAddress: u.shippingAddress,
            joined: u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : prev.joined,
          }));

          if (u.orders && u.orders.length > 0) {
            const mappedOrders: ProfileOrder[] = u.orders.map((o: any) => ({
              id: o.orderNumber || o.id,
              product: o.items?.[0]?.name || "Volt Electric Fleet Vehicle",
              date: new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
              total: o.totalDue || 0,
              status: o.status === "DELIVERED" ? "Delivered" : o.status === "IN_TRANSIT" ? "In Transit" : "Processing",
              trackingNo: o.transactionRef || "VOLT-TRK-" + o.id.slice(0, 6).toUpperCase(),
            }));
            setOrders(mappedOrders);

            // Derive owned vehicles from fulfilled orders
            const mappedVehicles: OwnedVehicle[] = u.orders
              .flatMap((o: any) => o.items || [])
              .map((item: any, idx: number) => ({
                id: item.productId || `veh-${idx}`,
                name: item.name,
                modelCode: "VOLT-FLEET",
                vin: `VLT${Math.floor(10000000 + Math.random() * 90000000)}`,
                colorName: item.colorName || "Acid Lime",
                colorHex: "#D4FF00",
                batteryLevel: 98,
                rangeKm: 85,
                firmware: "v4.2.0 (Active)",
                isLocked: true,
                lastLocation: u.shippingAddress ? u.shippingAddress.split(",")[0] : "Connected Garage",
                image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=600&auto=format&fit=crop",
              }));
            setVehicles(mappedVehicles);
          }
        }
      } catch (err) {
        console.error("Failed to load live profile:", err);
      }
    };

    loadProfile();
  }, [router]);

  // Sign Out Handler
  const handleLogout = () => {
    localStorage.removeItem("volt_auth_token");
    localStorage.removeItem("volt_user");
    router.push("/login");
  };

  // Lock/Unlock Remote Toggle
  const toggleVehicleLock = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isLocked: !v.isLocked } : v))
    );
  };

  const tabs = [
    { id: "orders", label: "My Orders", count: orders.length },
    { id: "fleet", label: "My Vehicles", count: vehicles.length },
    { id: "telemetry", label: "Ride Telemetry" },
    { id: "settings", label: "Account & Settings" },
  ];

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0A0A0D] flex flex-col items-center justify-center text-white space-y-4 font-mono text-xs">
        <div className="w-8 h-8 rounded-full border-2 border-[#D4FF00] border-t-transparent animate-spin" />
        <span className="text-neutral-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4FF00]" />
          Verifying Encrypted Session...
        </span>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#E4E5E8] dark:bg-[#0A0A0D] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 overflow-x-hidden">
      <Header />

      <div className="pt-28 pb-20 px-4 md:px-10 max-w-7xl mx-auto space-y-8">
        {/* 1. User Header with Profile Photo Upload & Live Metrics */}
        <RiderHeader
          profile={userProfile}
          orders={orders}
          onLogout={handleLogout}
          onAvatarUpdate={(url) => setUserProfile((prev) => ({ ...prev, avatar: url }))}
        />

        {/* 2. Tabbed Navigation */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/60 dark:bg-[#121316]/70 backdrop-blur-xl border border-black/10 dark:border-white/10 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 relative ${
                activeTab === tab.id
                  ? "bg-neutral-950 text-white dark:bg-white dark:text-black shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    activeTab === tab.id ? "bg-[#D4FF00] text-black font-bold" : "bg-black/10 dark:bg-white/10"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* 3. Tab Content Views */}
        <div className="space-y-6">
          {activeTab === "orders" && <OrdersTab orders={orders} />}

          {activeTab === "fleet" && (
            <FleetTab vehicles={vehicles} onToggleLock={toggleVehicleLock} />
          )}

          {activeTab === "telemetry" && <TelemetryTab />}

          {activeTab === "settings" && (
            <SettingsTab
              user={userProfile}
              onUserUpdate={(updated) => setUserProfile((prev) => ({ ...prev, ...updated }))}
            />
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}