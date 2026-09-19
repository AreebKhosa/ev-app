"use client";

import React, { useState } from "react";
import { Check, Landmark, ShieldCheck } from "lucide-react";
import { BankDetails } from "@/types/admin";

interface AdminBankingProps {
  bankDetails: BankDetails;
  onSaveBank: (details: BankDetails) => void;
}

export function AdminBanking({ bankDetails, onSaveBank }: AdminBankingProps) {
  const [formData, setFormData] = useState<BankDetails>(bankDetails);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBank(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="p-6 md:p-8 rounded-3xl backdrop-blur-2xl bg-white/70 dark:bg-[#121316]/80 border border-black/10 dark:border-white/10 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Landmark className="w-5 h-5 text-[#D4FF00]" />
              Merchant Settlement Account
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Configure primary receiving corporate accounts and multi-chain settlement routing.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-[#D4FF00] text-black">
            SSL Verified
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                Beneficiary Bank Name
              </label>
              <input
                type="text"
                required
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                Account Corporate Title
              </label>
              <input
                type="text"
                required
                value={formData.accountTitle}
                onChange={(e) => setFormData({ ...formData, accountTitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                IBAN / Account Number
              </label>
              <input
                type="text"
                required
                value={formData.accountNumberOrIban}
                onChange={(e) => setFormData({ ...formData, accountNumberOrIban: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                SWIFT / BIC Routing Code
              </label>
              <input
                type="text"
                required
                value={formData.swiftBic}
                onChange={(e) => setFormData({ ...formData, swiftBic: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
              Branch Physical Address
            </label>
            <input
              type="text"
              required
              value={formData.branchAddress}
              onChange={(e) => setFormData({ ...formData, branchAddress: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
              Corporate Crypto USDT Vault Address
            </label>
            <input
              type="text"
              required
              value={formData.cryptoUsdtAddress}
              onChange={(e) => setFormData({ ...formData, cryptoUsdtAddress: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-neutral-500 flex items-center gap-1.5 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#D4FF00]" />
              256-bit encrypted settlement tunnel
            </span>

            <button
              type="submit"
              className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                saved
                  ? "bg-[#D4FF00] text-black"
                  : "bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black"
              }`}
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Settlement Config Saved</span>
                </>
              ) : (
                <span>Save Banking Details</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
