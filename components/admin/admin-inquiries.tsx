"use client";

import React, { useState } from "react";
import { Check, Mail, MessageSquare } from "lucide-react";
import { AdminQuery } from "@/types/admin";

interface AdminInquiriesProps {
  queries: AdminQuery[];
  onToggleResolve: (id: string) => void;
}

export function AdminInquiries({ queries = [], onToggleResolve }: AdminInquiriesProps) {
  const [filterResolved, setFilterResolved] = useState<"all" | "pending" | "resolved">("all");

  const filtered = queries.filter((q) => {
    if (filterResolved === "pending") return !q.isResolved;
    if (filterResolved === "resolved") return q.isResolved;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filter Chips */}
      <div className="flex items-center gap-2">
        {(["all", "pending", "resolved"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterResolved(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase font-mono transition-all cursor-pointer ${
              filterResolved === tab
                ? "bg-neutral-950 text-white dark:bg-[#D4FF00] dark:text-black shadow-sm"
                : "bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:bg-black/10 dark:hover:bg-white/10"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Queries List or Empty State */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl backdrop-blur-2xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#D4FF00]/15 text-[#84a300] dark:text-[#D4FF00] flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            {queries.length === 0 ? "No Customer Inquiries Yet" : "No Inquiries in this Filter"}
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            When prospective buyers or enterprise partners submit test ride requests via the contact form, they will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((query) => (
            <div
              key={query.id}
              className="p-6 rounded-3xl backdrop-blur-2xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#D4FF00] text-black">
                    {query.topic}
                  </span>
                  <span className="text-xs font-mono text-neutral-500">{query.date}</span>
                </div>

                <button
                  onClick={() => onToggleResolve(query.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto ${
                    query.isResolved
                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                      : "bg-black/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-[#D4FF00] hover:text-black"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{query.isResolved ? "Resolved" : "Mark as Resolved"}</span>
                </button>
              </div>

              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span>{query.name}</span>
                  <span className="text-xs font-normal text-neutral-500 font-mono">({query.email})</span>
                </h4>
                <p className="text-xs font-mono text-[#84a300] dark:text-[#D4FF00] mt-0.5">
                  Model of Interest: {query.model}
                </p>
              </div>

              <p className="text-xs text-neutral-700 dark:text-neutral-300 bg-black/5 dark:bg-white/5 p-4 rounded-2xl leading-relaxed">
                “{query.message}”
              </p>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`mailto:${query.email}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white hover:underline"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D4FF00]" />
                  <span>Reply to Inquiry</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
