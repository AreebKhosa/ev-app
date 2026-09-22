"use client";

import React, { useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { AdminOrder, AdminOrderStatus } from "@/types/admin";

interface AdminOrdersProps {
  orders: AdminOrder[];
  onUpdateStatus: (id: string, status: AdminOrderStatus) => void;
}

export function AdminOrders({ orders = [], onUpdateStatus }: AdminOrdersProps) {
  const [search, setSearch] = useState("");

  const filtered = orders.filter(
    (o) =>
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by ID, customer or product..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
        />
      </div>

      {/* Orders Table Container or Empty State */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl backdrop-blur-2xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#D4FF00]/15 text-[#84a300] dark:text-[#D4FF00] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            {orders.length === 0 ? "No Customer Orders Placed Yet" : "No Orders Found"}
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            {orders.length === 0
              ? "When customers place orders and upload payment transfer receipts, they will appear here for verification and fulfillment."
              : "Try adjusting your search criteria."}
          </p>
        </div>
      ) : (
        <div className="rounded-3xl backdrop-blur-2xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10 text-[10px] font-mono uppercase text-neutral-500 font-bold">
                <tr>
                  <th className="p-4 pl-6">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Fleet Model</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 pr-6">Fulfillment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 pl-6 font-mono font-bold text-neutral-900 dark:text-white">
                      {order.id}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-neutral-900 dark:text-white block">{order.customerName}</span>
                      <span className="text-[10px] font-mono text-neutral-500">{order.email}</span>
                    </td>
                    <td className="p-4 font-medium text-neutral-700 dark:text-neutral-300">
                      {order.product}
                    </td>
                    <td className="p-4 font-black text-neutral-900 dark:text-white tabular-nums">
                      ${order.total.toLocaleString()}
                    </td>
                    <td className="p-4 text-[11px] font-mono text-neutral-500">
                      {order.date}
                    </td>
                    <td className="p-4 pr-6">
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateStatus(order.id, e.target.value as AdminOrderStatus)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[#D4FF00] cursor-pointer"
                      >
                        <option value="Pending" className="bg-white dark:bg-[#121316]">Pending</option>
                        <option value="Assembled" className="bg-white dark:bg-[#121316]">Assembled</option>
                        <option value="In Transit" className="bg-white dark:bg-[#121316]">In Transit</option>
                        <option value="Delivered" className="bg-white dark:bg-[#121316]">Delivered</option>
                        <option value="Cancelled" className="bg-white dark:bg-[#121316]">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
