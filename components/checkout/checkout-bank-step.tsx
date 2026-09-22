"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Landmark, ChevronLeft, Copy, Check, UploadCloud } from "lucide-react";

export interface BankDetails {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    swiftBic: string;
    usdtAddress: string;
}

interface CheckoutBankStepProps {
    orderId: string;
    totalDue: number;
    bankDetails: BankDetails;
    senderAccountName: string;
    setSenderAccountName: (val: string) => void;
    transactionRef: string;
    setTransactionRef: (val: string) => void;
    receiptFile: File | null;
    onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBack: () => void;
    onCompleteOrder: () => void;
}

export function CheckoutBankStep({
    orderId,
    totalDue,
    bankDetails,
    senderAccountName,
    setSenderAccountName,
    transactionRef,
    setTransactionRef,
    receiptFile,
    onFileUpload,
    onBack,
    onCompleteOrder,
}: CheckoutBankStepProps) {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const handleCopy = (text: string, fieldName: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 p-6 md:p-8 shadow-sm space-y-6"
        >
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1 text-xs font-mono text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer"
                >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Shipping</span>
                </button>
                <span className="text-xs font-mono text-neutral-500">Step 2 of 2</span>
            </div>

            <div className="space-y-1">
                <h2 className="text-xl font-bold text-neutral-950 dark:text-white flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-[#D4FF00]" />
                    Direct Bank Wire Transfer
                </h2>
                <p className="text-xs text-neutral-500 font-mono">
                    Transfer exact total <strong className="text-neutral-900 dark:text-white font-bold">${totalDue.toFixed(2)}</strong> using reference <strong className="text-[#92b500] dark:text-[#D4FF00] underline">{orderId}</strong>.
                </p>
            </div>

            {/* OFFICIAL BANK DETAILS BOX WITH 1-CLICK COPY BUTTONS */}
            <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Beneficiary:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">{bankDetails.accountTitle}</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Bank Name:</span>
                    <span className="font-bold text-neutral-900 dark:text-white">{bankDetails.bankName}</span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-black/5 dark:border-white/10">
                    <div>
                        <span className="text-neutral-500 block text-[10px]">IBAN / Account Number:</span>
                        <span className="font-bold text-neutral-900 dark:text-white">{bankDetails.accountNumber}</span>
                    </div>
                    <button
                        onClick={() => handleCopy(bankDetails.accountNumber, "iban")}
                        className="p-1.5 rounded-lg bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 hover:bg-[#D4FF00] hover:text-black transition-colors cursor-pointer"
                        title="Copy IBAN"
                    >
                        {copiedField === "iban" ? <Check className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-black/5 dark:border-white/10">
                    <div>
                        <span className="text-neutral-500 block text-[10px]">SWIFT / BIC Code:</span>
                        <span className="font-bold text-neutral-900 dark:text-white">{bankDetails.swiftBic}</span>
                    </div>
                    <button
                        onClick={() => handleCopy(bankDetails.swiftBic, "swift")}
                        className="p-1.5 rounded-lg bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 hover:bg-[#D4FF00] hover:text-black transition-colors cursor-pointer"
                        title="Copy SWIFT"
                    >
                        {copiedField === "swift" ? <Check className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                </div>
            </div>

            {/* RECEIPT UPLOAD ZONE */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onCompleteOrder();
                }}
                className="space-y-4 text-xs font-mono pt-2"
            >
                <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                        Upload Transfer Receipt / Screenshot *
                    </label>

                    <div className="relative border-2 border-dashed border-black/20 dark:border-white/20 rounded-2xl p-6 text-center hover:border-[#D4FF00] transition-colors cursor-pointer bg-black/[0.02] dark:bg-white/[0.02]">
                        <input
                            type="file"
                            required
                            accept="image/*,.pdf"
                            onChange={onFileUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <div className="space-y-2 flex flex-col items-center justify-center pointer-events-none">
                            <UploadCloud className="w-8 h-8 text-[#92b500] dark:text-[#D4FF00]" />
                            <div>
                                <span className="font-bold text-neutral-900 dark:text-white block font-sans">
                                    {receiptFile ? receiptFile.name : "Click or drag receipt screenshot/PDF here"}
                                </span>
                                <span className="text-[10px] text-neutral-500">Supports PNG, JPG, PDF up to 10MB</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 uppercase">Sender Account Name *</label>
                        <input
                            type="text"
                            required
                            value={senderAccountName}
                            onChange={(e) => setSenderAccountName(e.target.value)}
                            placeholder="Name on your bank account"
                            className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-sans text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 uppercase">Transaction Ref / ID (Optional)</label>
                        <input
                            type="text"
                            value={transactionRef}
                            onChange={(e) => setTransactionRef(e.target.value)}
                            placeholder="Bank transaction ID"
                            className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-sans text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#D4FF00] text-black hover:bg-[#c3ec00] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl cursor-pointer mt-4"
                >
                    <Check className="w-4 h-4" />
                    <span>I Have Completed Payment & Uploaded Receipt</span>
                </button>
            </form>
        </motion.div>
    );
}
