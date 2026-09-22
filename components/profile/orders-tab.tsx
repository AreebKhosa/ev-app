"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  ShoppingBag,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  MapPin,
  User,
  Phone,
  Mail,
  CreditCard,
  ExternalLink,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  Wrench,
  XCircle,
  Eye,
  Printer,
  X,
} from "lucide-react";
import { ProfileOrder, ProfileOrderItem } from "@/types/user";
import { getOptimizedImageUrl } from "@/lib/image";

export function OrdersTab({ orders = [] }: { orders?: ProfileOrder[] }) {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [invoiceModalOrder, setInvoiceModalOrder] = useState<ProfileOrder | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="p-12 text-center rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-[#D4FF00]/20 text-[#84a300] dark:text-[#D4FF00] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
          No Orders Found
        </h3>
        <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed font-sans">
          You haven&apos;t placed any fleet vehicle or accessory orders yet. When you complete checkout via bank transfer, your orders and tracking details will appear here immediately.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black text-xs font-bold shadow-md hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black transition-all active:scale-95 cursor-pointer"
        >
          <span>Explore Volt Fleet Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#D4FF00] text-black">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Delivered
          </span>
        );
      case "In Transit":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-500 text-white">
            <Truck className="w-3.5 h-3.5" />
            In Transit
          </span>
        );
      case "Assembled":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-500 text-white">
            <Wrench className="w-3.5 h-3.5" />
            Assembled
          </span>
        );
      case "Cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full bg-red-500 text-white">
            <XCircle className="w-3.5 h-3.5" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-400 text-black">
            <Clock className="w-3.5 h-3.5" />
            {status || "Pending Verification"}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {orders.map((order) => {
        const isExpanded = expandedOrderId === order.id;
        const items: ProfileOrderItem[] = order.items && order.items.length > 0
          ? order.items
          : [
              {
                name: order.product || "Volt Electric Fleet Vehicle",
                colorName: "Standard Fleet Edition",
                price: order.total,
                quantity: order.itemsCount || 1,
              },
            ];

        return (
          <div
            key={order.id}
            className="rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 shadow-sm overflow-hidden transition-all duration-300"
          >
            {/* Top Order Card Summary */}
            <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Column: ID, Status, Items Summary */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  {getStatusBadge(order.status)}
                  <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-lg">
                    #{order.orderNumber || order.id}
                  </span>
                  <span className="text-xs font-mono text-neutral-500">
                    Placed on {order.date}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white">
                    {order.product}
                  </h3>
                  <p className="text-xs font-mono text-neutral-500 mt-1 flex items-center gap-2">
                    <span>Tracking ID:</span>
                    <strong className="text-neutral-900 dark:text-white font-bold tracking-wider">
                      {order.trackingNo}
                    </strong>
                  </p>
                </div>

                {/* Quick Ordered By Mini-strip */}
                {order.customerName && (
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-500 pt-1">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#84a300] dark:text-[#D4FF00]" />
                      {order.customerName}
                    </span>
                    {order.customerEmail && (
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-neutral-400" />
                        {order.customerEmail}
                      </span>
                    )}
                    {order.customerPhone && (
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-neutral-400" />
                        {order.customerPhone}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: Pricing & Action Controls */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-black/5 dark:border-white/10">
                <div className="text-left lg:text-right">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Total Amount</span>
                  <span className="text-2xl font-black text-neutral-900 dark:text-white tabular-nums tracking-tight">
                    ${(order.total || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setInvoiceModalOrder(order)}
                    className="px-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-xs font-bold flex items-center gap-1.5 text-neutral-900 dark:text-white transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#84a300] dark:text-[#D4FF00]" />
                    <span>Invoice</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleExpand(order.id)}
                    className="px-3.5 py-2 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <span>{isExpanded ? "Hide Details" : "View Details"}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Order Details Panel */}
            {isExpanded && (
              <div className="border-t border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-6 md:p-8 space-y-6">
                {/* 1. Ordered Products Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#84a300] dark:text-[#D4FF00]" />
                    Ordered Product Items ({items.length})
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item, idx) => {
                      const itemImg =
                        item.product?.image ||
                        "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=300&auto=format&fit=crop";

                      return (
                        <div
                          key={item.id || idx}
                          className="p-4 rounded-2xl bg-white dark:bg-[#181920] border border-black/10 dark:border-white/10 flex items-center gap-4 shadow-sm"
                        >
                          <div className="relative w-16 h-16 rounded-xl bg-black/5 dark:bg-white/5 overflow-hidden shrink-0 border border-black/5 dark:border-white/5 flex items-center justify-center">
                            <Image
                              src={getOptimizedImageUrl(itemImg)}
                              alt={item.name}
                              fill
                              unoptimized
                              className="object-contain p-1"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-bold text-neutral-900 dark:text-white truncate">
                              {item.name}
                            </h5>
                            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mt-1">
                              <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5">
                                {item.colorName || "Standard"}
                              </span>
                              <span>Qty: <strong>{item.quantity}</strong></span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-sm font-bold text-neutral-900 dark:text-white font-mono block">
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                            {item.quantity > 1 && (
                              <span className="text-[10px] font-mono text-neutral-400 block">
                                (${item.price} each)
                              </span>
                            )}
                            {item.productId && (
                              <Link
                                href={`/products/${item.productId}`}
                                className="text-[11px] font-mono text-[#84a300] dark:text-[#D4FF00] hover:underline flex items-center justify-end gap-1 mt-1"
                              >
                                <span>Vehicle Info</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Customer & Shipping & Payment Proof Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {/* Customer Information */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#181920] border border-black/10 dark:border-white/10 space-y-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-neutral-500 block flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#84a300] dark:text-[#D4FF00]" />
                      Customer Details
                    </span>
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">
                      {order.customerName || "Customer"}
                    </p>
                    <p className="text-xs font-mono text-neutral-500 truncate">
                      {order.customerEmail || "No email"}
                    </p>
                    {order.customerPhone && (
                      <p className="text-xs font-mono text-neutral-500">
                        {order.customerPhone}
                      </p>
                    )}
                  </div>

                  {/* Delivery Address */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#181920] border border-black/10 dark:border-white/10 space-y-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-neutral-500 block flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#84a300] dark:text-[#D4FF00]" />
                      Shipping Address
                    </span>
                    <p className="text-xs text-neutral-900 dark:text-white leading-relaxed font-sans">
                      {order.shippingAddress || "Standard Ground Logistics"}
                    </p>
                    {(order.city || order.country) && (
                      <p className="text-xs font-mono text-neutral-500">
                        {[order.city, order.postalCode, order.country].filter(Boolean).join(", ")}
                      </p>
                    )}
                  </div>

                  {/* Bank & Payment Proof */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#181920] border border-black/10 dark:border-white/10 space-y-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-neutral-500 block flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-[#84a300] dark:text-[#D4FF00]" />
                      Bank Transfer Proof
                    </span>
                    <p className="text-xs font-mono text-neutral-900 dark:text-white truncate">
                      Sender: <strong>{order.senderAccountName || "Wire Deposit"}</strong>
                    </p>
                    {order.transactionRef && (
                      <p className="text-xs font-mono text-neutral-500 truncate">
                        Ref: {order.transactionRef}
                      </p>
                    )}
                    {order.receiptFileUrl && (
                      <a
                        href={order.receiptFileUrl.startsWith("http") ? order.receiptFileUrl : `http://localhost:5000${order.receiptFileUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#84a300] dark:text-[#D4FF00] hover:underline pt-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Bank Receipt File</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* 3. Financial Summary Breakdown */}
                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <span className="text-neutral-500 block">Subtotal:</span>
                      <span className="font-bold text-neutral-900 dark:text-white">
                        ${(order.subtotal || order.total).toLocaleString()}
                      </span>
                    </div>

                    {(order.discountAmount || 0) > 0 && (
                      <div>
                        <span className="text-neutral-500 block">Promo Discount:</span>
                        <span className="font-bold text-[#84a300] dark:text-[#D4FF00]">
                          -${(order.discountAmount || 0).toLocaleString()}
                        </span>
                      </div>
                    )}

                    {(order.tax || 0) > 0 && (
                      <div>
                        <span className="text-neutral-500 block">Tax (8%):</span>
                        <span className="font-bold text-neutral-900 dark:text-white">
                          +${(order.tax || 0).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase text-neutral-500 block">Total Finalized</span>
                    <span className="text-base font-black text-[#84a300] dark:text-[#D4FF00]">
                      ${(order.total || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Official Invoice Modal */}
      {invoiceModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#121316] text-neutral-900 dark:text-white rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl p-6 md:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#84a300] dark:text-[#D4FF00] font-bold block">
                  VOLT STUDIO MOBILITY
                </span>
                <h3 className="text-xl font-bold">
                  Official Fleet Invoice #{invoiceModalOrder.orderNumber || invoiceModalOrder.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInvoiceModalOrder(null)}
                className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Bill To & Date Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-neutral-500 uppercase text-[10px] block">Billed To:</span>
                <strong className="text-sm block">{invoiceModalOrder.customerName || "Customer"}</strong>
                <p className="text-neutral-500">{invoiceModalOrder.customerEmail}</p>
                <p className="text-neutral-500">{invoiceModalOrder.customerPhone}</p>
                <p className="text-neutral-500">{invoiceModalOrder.shippingAddress}</p>
              </div>

              <div className="space-y-1 text-right">
                <span className="text-neutral-500 uppercase text-[10px] block">Invoice Date:</span>
                <strong className="text-sm block">{invoiceModalOrder.date}</strong>
                <p className="text-neutral-500">Payment: Direct Bank Transfer</p>
                <p className="text-neutral-500">Status: <strong className="text-[#84a300] dark:text-[#D4FF00]">{invoiceModalOrder.status}</strong></p>
                <p className="text-neutral-500">Sender: {invoiceModalOrder.senderAccountName || "Verified Account"}</p>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-black/5 dark:bg-white/5 font-mono text-[11px] text-neutral-500 uppercase">
                  <tr>
                    <th className="p-3">Item Description</th>
                    <th className="p-3 text-center">Color</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5 font-mono">
                  {(invoiceModalOrder.items && invoiceModalOrder.items.length > 0
                    ? invoiceModalOrder.items
                    : [{ name: invoiceModalOrder.product, colorName: "Standard", price: invoiceModalOrder.total, quantity: 1 }]
                  ).map((it, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-sans font-bold">{it.name}</td>
                      <td className="p-3 text-center text-neutral-500">{it.colorName || "Standard"}</td>
                      <td className="p-3 text-center">{it.quantity}</td>
                      <td className="p-3 text-right font-bold">${(it.price * it.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Section */}
            <div className="flex justify-end pt-2">
              <div className="w-64 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-neutral-500">
                  <span>Subtotal:</span>
                  <span>${(invoiceModalOrder.subtotal || invoiceModalOrder.total).toLocaleString()}</span>
                </div>
                {(invoiceModalOrder.discountAmount || 0) > 0 && (
                  <div className="flex justify-between text-[#84a300] dark:text-[#D4FF00]">
                    <span>Discount:</span>
                    <span>-${(invoiceModalOrder.discountAmount || 0).toLocaleString()}</span>
                  </div>
                )}
                {(invoiceModalOrder.tax || 0) > 0 && (
                  <div className="flex justify-between text-neutral-500">
                    <span>Tax:</span>
                    <span>+${(invoiceModalOrder.tax || 0).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-black/10 dark:border-white/10">
                  <span>Total Due / Paid:</span>
                  <span className="text-[#84a300] dark:text-[#D4FF00]">
                    ${invoiceModalOrder.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Print / Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/10">
              <span className="text-[11px] font-mono text-neutral-400">
                Official Commercial Invoice • Volt Studio Mobility Inc.
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black font-bold text-xs flex items-center gap-2 hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Invoice</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInvoiceModalOrder(null)}
                  className="px-4 py-2 rounded-xl border border-black/10 dark:border-white/10 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
