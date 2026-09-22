"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { AdminUser } from "@/types/admin";

interface AdminCustomersProps {
  users: AdminUser[];
  onToggleStatus: (id: string) => void;
}

export function AdminCustomers({ users, onToggleStatus }: AdminCustomersProps) {
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers by name or email..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
        />
      </div>

      {/* Users Table Container */}
      <div className="rounded-3xl backdrop-blur-2xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10 text-[10px] font-mono uppercase text-neutral-500 font-bold">
              <tr>
                <th className="p-4 pl-6">Customer Name</th>
                <th className="p-4">Standing Tier</th>
                <th className="p-4">Vehicles Owned</th>
                <th className="p-4">Total Lifetime Value</th>
                <th className="p-4 pr-6">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-neutral-500 font-mono text-xs">
                    {users.length === 0
                      ? "No registered customers found in the database yet."
                      : "No customers match your search criteria."}
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 pl-6">
                      <span className="font-bold text-neutral-900 dark:text-white block">{user.name}</span>
                      <span className="text-[10px] font-mono text-neutral-500">{user.email}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-[#D4FF00] text-black">
                        {user.tier || "Customer"}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-neutral-700 dark:text-neutral-300">
                      {user.vehiclesCount || 0} units
                    </td>
                    <td className="p-4 font-black text-neutral-900 dark:text-white tabular-nums">
                      ${(user.totalSpent || 0).toLocaleString()}
                    </td>
                    <td className="p-4 pr-6">
                      <button
                        onClick={() => onToggleStatus(user.id)}
                        className={`px-3 py-1 rounded-xl text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                          user.status === "Active"
                            ? "bg-green-500/10 text-green-600 dark:text-green-400"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {user.status}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
