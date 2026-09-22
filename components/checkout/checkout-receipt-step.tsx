"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Printer, ArrowRight, Check } from "lucide-react";
import { ShippingFormData } from "./checkout-shipping-step";

export interface CheckoutOrderItem {
    id: string;
    name: string;
    color: string;
    price: number;
    quantity: number;
    image: string;
}

interface CheckoutReceiptStepProps {
    orderId: string;
    shippingData: ShippingFormData;
    orderItems: CheckoutOrderItem[];
    subtotal: number;
    tax: number;
    totalDue: number;
    senderAccountName: string;
    transactionRef: string;
    receiptFile: File | null;
    receiptPreview: string | null;
    onPrint: () => void;
}

export function CheckoutReceiptStep({
    orderId,
    shippingData,
    orderItems,
    subtotal,
    tax,
    totalDue,
    senderAccountName,
    transactionRef,
    receiptFile,
    receiptPreview,
    onPrint,
}: CheckoutReceiptStepProps) {
    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
            {/* Top Success Card */}
            <div className="p-8 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 text-center space-y-3 shadow-lg">
                <div className="w-14 h-14 rounded-full bg-[#D4FF00] text-black flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>

                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#92b500] dark:text-[#D4FF00] block">
                    Order Placed Successfully
                </span>
                <h1 className="text-3xl font-black text-neutral-950 dark:text-white">
                    Thank You, {shippingData.firstName || "Rider"}!
                </h1>
                <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                    Your payment receipt has been uploaded for verification. An automated confirmation copy has been dispatched to <strong className="text-neutral-900 dark:text-white">{shippingData.email || "your email"}</strong>.
                </p>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                    <button
                        onClick={onPrint}
                        className="px-5 py-2.5 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                        <Printer className="w-4 h-4" />
                        <span>Download / Print Receipt (PDF)</span>
                    </button>

                    <Link
                        href="/profile"
                        className="px-5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 font-bold text-xs flex items-center gap-2 transition-all"
                    >
                        <span>Track Order in Profile</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* PRINTABLE TAX INVOICE RECEIPT */}
            <div id="printable-receipt" className="p-8 md:p-10 rounded-3xl bg-white dark:bg-[#111215] border border-black/10 dark:border-white/10 shadow-2xl space-y-8 print:border-none print:shadow-none print:p-0">
                {/* Receipt Header */}
                <div className="flex items-start justify-between border-b border-black/10 dark:border-white/10 pb-6">
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-tight">Volt Studio Mobility Inc.</h2>
                        <p className="text-xs font-mono text-neutral-500">Official Deposit Tax Invoice & Proof</p>
                        <p className="text-[11px] font-mono text-neutral-400 mt-1">Order Ref: <strong className="text-neutral-900 dark:text-white">{orderId}</strong></p>
                    </div>
                    <div className="text-right text-xs font-mono">
                        <span className="px-2.5 py-1 rounded bg-[#D4FF00] text-black font-bold text-[10px] uppercase">
                            Payment Verification Pending
                        </span>
                        <p className="text-[11px] text-neutral-500 mt-2">Date: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Customer & Shipping Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
                    <div>
                        <span className="text-neutral-400 block text-[10px] uppercase">Billed / Shipped To:</span>
                        <p className="font-bold text-neutral-900 dark:text-white">{shippingData.firstName} {shippingData.lastName}</p>
                        <p className="text-neutral-600 dark:text-neutral-400">{shippingData.address}</p>
                        <p className="text-neutral-600 dark:text-neutral-400">{shippingData.city}, {shippingData.postalCode}</p>
                        <p className="text-neutral-600 dark:text-neutral-400">{shippingData.country}</p>
                    </div>

                    <div>
                        <span className="text-neutral-400 block text-[10px] uppercase">Payment Method:</span>
                        <p className="font-bold text-neutral-900 dark:text-white">Direct Bank Wire Transfer</p>
                        <p className="text-neutral-500">Sender: {senderAccountName || "N/A"}</p>
                        <p className="text-neutral-500">Ref: {transactionRef || orderId}</p>
                    </div>

                    <div>
                        <span className="text-neutral-400 block text-[10px] uppercase">Shipping Method:</span>
                        <p className="font-bold text-neutral-900 dark:text-white">Free Insured Air Freight</p>
                        <p className="text-neutral-500">Estimated Delivery: 2-3 Days</p>
                    </div>
                </div>

                {/* Items Table */}
                <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/10 text-[10px] text-neutral-500 uppercase">
                            <tr>
                                <th className="p-3">Item Description</th>
                                <th className="p-3 text-center">Qty</th>
                                <th className="p-3 text-right">Price</th>
                                <th className="p-3 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5 dark:divide-white/5">
                            {orderItems.map((it) => (
                                <tr key={it.id}>
                                    <td className="p-3 font-bold font-sans text-neutral-900 dark:text-white">
                                        {it.name} <span className="text-neutral-500 text-[11px] font-mono block">Finish: {it.color}</span>
                                    </td>
                                    <td className="p-3 text-center">{it.quantity}</td>
                                    <td className="p-3 text-right tabular-nums">${it.price.toLocaleString()}</td>
                                    <td className="p-3 text-right font-bold tabular-nums">${(it.price * it.quantity).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Totals Breakdown */}
                <div className="flex justify-between items-start text-xs font-mono pt-2">
                    <div className="text-[11px] text-neutral-500 space-y-1">
                        <p>• 3-Year Volt Armor Global Powertrain Warranty Included.</p>
                        <p>• 30-Day Money-Back Trial Guarantee Included.</p>
                    </div>

                    <div className="w-64 space-y-2 text-right">
                        <div className="flex justify-between text-neutral-500">
                            <span>Subtotal:</span>
                            <span className="font-bold tabular-nums text-neutral-900 dark:text-white">${subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-neutral-500">
                            <span>Shipping:</span>
                            <span className="font-bold text-[#92b500] dark:text-[#D4FF00]">FREE</span>
                        </div>
                        <div className="flex justify-between text-neutral-500">
                            <span>Estimated Tax (8%):</span>
                            <span className="font-bold tabular-nums text-neutral-900 dark:text-white">${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-base font-black border-t border-black/10 dark:border-white/10 pt-2 text-neutral-950 dark:text-white">
                            <span>Total Amount:</span>
                            <span className="tabular-nums">${totalDue.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Uploaded Receipt Thumbnail Preview */}
                {receiptPreview && (
                    <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-black/10 shrink-0">
                            <Image src={receiptPreview} alt="Receipt Proof" fill unoptimized className="object-cover" />
                        </div>
                        <div className="text-xs font-mono">
                            <span className="font-bold text-neutral-900 dark:text-white flex items-center gap-1">
                                <Check className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" /> Bank Receipt Attached
                            </span>
                            <p className="text-[10px] text-neutral-500">{receiptFile?.name}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
