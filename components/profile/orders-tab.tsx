"use client";

import React from "react";
import Link from "next/link";
import { FileText, ShoppingBag, ArrowRight } from "lucide-react";
import { ProfileOrder } from "@/types/user";

export function OrdersTab({ orders = [] }: { orders?: ProfileOrder[] }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="p-12 text-center rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#D4FF00]/20 text-[#84a300] dark:text-[#D4FF00] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
          No Orders Placed Yet
        </h3>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto">
          Your active and completed vehicle orders and delivery fulfillment updates will appear right here.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black text-xs font-bold shadow-md hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black transition-all active:scale-95"
        >
          <span>Explore Fleet Catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="p-6 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                order.status === "Delivered"
                  ? "bg-[#D4FF00] text-black"
                  : order.status === "In Transit"
                  ? "bg-blue-500 text-white"
                  : "bg-amber-400 text-black"
              }`}>
                {order.status}
              </span>
              <span className="text-xs font-mono text-neutral-500">
                {order.id} • {order.date}
              </span>
            </div>

            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              {order.product}
            </h3>

            <p className="text-xs font-mono text-neutral-500">
              Tracking: <strong className="text-neutral-900 dark:text-white">{order.trackingNo}</strong>
            </p>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-black/5 dark:border-white/10">
            <div className="text-left md:text-right">
              <span className="text-[10px] font-mono text-neutral-500 block">Total Billed</span>
              <span className="text-lg font-black text-neutral-900 dark:text-white tabular-nums">
                ${order.total.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => alert(`Invoice for order ${order.id}\nStatus: ${order.status}\nTotal: $${order.total}`)}
              className="px-4 py-2 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Invoice</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
