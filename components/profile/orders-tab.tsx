"use client";

import React from "react";
import { FileText } from "lucide-react";
import { ProfileOrder } from "@/types/user";

export function OrdersTab({ orders }: { orders: ProfileOrder[] }) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="p-6 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold bg-[#D4FF00] text-black px-2.5 py-0.5 rounded-full">
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

            <button className="px-4 py-2 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer">
              <FileText className="w-3.5 h-3.5" />
              <span>Invoice</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
