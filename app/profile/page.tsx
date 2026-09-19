"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RiderHeader } from "@/components/profile/rider-header";
import { FleetTab } from "@/components/profile/fleet-tab";
import { OrdersTab } from "@/components/profile/orders-tab";
import { TelemetryTab } from "@/components/profile/telemetry-tab";
import { SettingsTab } from "@/components/profile/settings-tab";
import { USER_PROFILE_DATA, OWNED_VEHICLES_DATA, ORDER_HISTORY_DATA } from "@/data/profile";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"fleet" | "orders" | "telemetry" | "settings">("fleet");
  const [vehicles, setVehicles] = useState(OWNED_VEHICLES_DATA);

  // Lock/Unlock Remote Toggle
  const toggleVehicleLock = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isLocked: !v.isLocked } : v))
    );
  };

  const tabs = [
    { id: "fleet", label: "My Fleet", count: vehicles.length },
    { id: "orders", label: "Order History", count: ORDER_HISTORY_DATA.length },
    { id: "telemetry", label: "Ride Telemetry" },
    { id: "settings", label: "Account & Security" },
  ];

  return (
    <main className="min-h-screen bg-[#E4E5E8] dark:bg-[#0A0A0D] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 overflow-x-hidden">
      {/* 1. Header */}
      <Header />

      <div className="pt-28 pb-20 px-4 md:px-10 max-w-7xl mx-auto space-y-8">
        {/* 1. Rider Identity & Telemetry Header */}
        <RiderHeader profile={USER_PROFILE_DATA} />

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
                    activeTab === tab.id ? "bg-[#D4FF00] text-black" : "bg-black/10 dark:bg-white/10"
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
          {activeTab === "fleet" && (
            <FleetTab vehicles={vehicles} onToggleLock={toggleVehicleLock} />
          )}

          {activeTab === "orders" && <OrdersTab orders={ORDER_HISTORY_DATA} />}

          {activeTab === "telemetry" && <TelemetryTab />}

          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>

      {/* Universal Footer */}
      <Footer />
    </main>
  );
}