"use client";

import React from "react";
import { DollarSign, ShoppingBag, Users, MessageSquare, TrendingUp, ArrowUpRight } from "lucide-react";
import { AdminProduct, AdminOrder, AdminQuery, AdminUser } from "@/types/admin";

interface AdminOverviewProps {
  products: AdminProduct[];
  orders: AdminOrder[];
  queries: AdminQuery[];
  users: AdminUser[];
  onNavigateTab: (tab: any) => void;
}

export function AdminOverview({
  products,
  orders,
  queries,
  users,
  onNavigateTab,
}: AdminOverviewProps) {
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== "Cancelled" ? o.total : 0), 0);
  const activeOrders = orders.filter((o) => o.status !== "Delivered" && o.status !== "Cancelled").length;
  const pendingQueries = queries.filter((q) => !q.isResolved).length;

  const stats = [
    { label: "Gross Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: <DollarSign className="w-5 h-5 text-[#D4FF00]" />, change: "+18.4% vs last month" },
    { label: "Active Orders", value: activeOrders, icon: <ShoppingBag className="w-5 h-5 text-[#D4FF00]" />, change: `${orders.length} total orders` },
    { label: "Registered Customers", value: users.length, icon: <Users className="w-5 h-5 text-[#D4FF00]" />, change: "100% active standing" },
    { label: "Open Inquiries", value: pendingQueries, icon: <MessageSquare className="w-5 h-5 text-[#D4FF00]" />, change: `${queries.length} total received` },
  ];

  return (
    <div className="space-y-8">
      {/* 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="p-5 rounded-3xl backdrop-blur-2xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-500 uppercase">{s.label}</span>
              <div className="p-2 rounded-xl bg-black/5 dark:bg-white/10">{s.icon}</div>
            </div>
            <div>
              <p className="text-2xl font-black text-neutral-900 dark:text-white tabular-nums">{s.value}</p>
              <span className="text-[11px] font-mono text-[#92b500] dark:text-[#D4FF00] mt-0.5 block flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {s.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders & Inquiries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl backdrop-blur-2xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider font-mono">
              Recent Dispatches
            </h3>
            <button
              onClick={() => onNavigateTab("orders")}
              className="text-xs font-mono text-[#92b500] dark:text-[#D4FF00] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {orders.length === 0 ? (
              <p className="text-xs text-neutral-500 py-6 text-center font-mono">No customer orders dispatched yet.</p>
            ) : (
              orders.slice(0, 3).map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
                >
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">{o.customerName}</h4>
                    <p className="text-[10px] font-mono text-neutral-500">{o.product} • {o.id}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-neutral-900 dark:text-white block tabular-nums">
                      ${o.total.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#92b500] dark:text-[#D4FF00]">
                      {o.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Fleet Summary (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl backdrop-blur-2xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider font-mono">
              Fleet Inventory ({products.length})
            </h3>
            <button
              onClick={() => onNavigateTab("products")}
              className="text-xs font-mono text-[#92b500] dark:text-[#D4FF00] hover:underline flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {products.length === 0 ? (
              <p className="text-xs text-neutral-500 py-6 text-center font-mono">No products in inventory yet.</p>
            ) : (
              products.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
                >
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">{p.name}</h4>
                    <p className="text-[10px] font-mono text-neutral-500">{p.category} • {p.stock} in stock</p>
                  </div>
                  <span className="text-xs font-black text-neutral-900 dark:text-white tabular-nums">
                    ${p.price.toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
