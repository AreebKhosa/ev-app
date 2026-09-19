"use client";

import React, { useState } from "react";
import { AdminTab, AdminProduct, AdminOrder, AdminQuery, AdminUser, BankDetails, AdminOrderStatus } from "@/types/admin";
import {
  INITIAL_ADMIN_PRODUCTS,
  INITIAL_ADMIN_ORDERS,
  INITIAL_ADMIN_QUERIES,
  INITIAL_ADMIN_USERS,
  INITIAL_ADMIN_BANK,
} from "@/data/admin";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminOverview } from "@/components/admin/admin-overview";
import { AdminProducts } from "@/components/admin/admin-products";
import { AdminOrders } from "@/components/admin/admin-orders";
import { AdminInquiries } from "@/components/admin/admin-inquiries";
import { AdminCustomers } from "@/components/admin/admin-customers";
import { AdminBanking } from "@/components/admin/admin-banking";
import { AdminProductModal } from "@/components/admin/admin-product-modal";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Core Data States
  const [products, setProducts] = useState<AdminProduct[]>(INITIAL_ADMIN_PRODUCTS);
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ADMIN_ORDERS);
  const [queries, setQueries] = useState<AdminQuery[]>(INITIAL_ADMIN_QUERIES);
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [bankDetails, setBankDetails] = useState<BankDetails>(INITIAL_ADMIN_BANK);

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Product Operations
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (product: AdminProduct) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (formData: Partial<AdminProduct>) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? ({ ...p, ...formData } as AdminProduct) : p))
      );
    } else {
      const newP: AdminProduct = {
        id: "prod-" + Date.now(),
        name: formData.name || "Untitled Fleet Model",
        category: formData.category || "Urban Commuter",
        price: Number(formData.price) || 1999,
        stock: Number(formData.stock) || 5,
        speed: formData.speed || "45 km/h",
        range: formData.range || "80 km",
        image: formData.image || "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=400&auto=format&fit=crop",
      };
      setProducts((prev) => [newP, ...prev]);
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Orders Operations
  const handleUpdateOrderStatus = (id: string, status: AdminOrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  // Inquiries Operations
  const handleToggleQueryResolve = (id: string) => {
    setQueries((prev) => prev.map((q) => (q.id === id ? { ...q, isResolved: !q.isResolved } : q)));
  };

  // Customer Operations
  const handleToggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u))
    );
  };

  // Tab Titles & Subtitles Map
  const tabTitles: Record<AdminTab, { title: string; subtitle: string }> = {
    overview: { title: "Command Center Overview", subtitle: "Real-time telemetry, revenue performance, and dispatch status." },
    products: { title: "Fleet Model Catalog", subtitle: "Configure hardware specs, inventory levels, and production releases." },
    orders: { title: "Order Fulfillment & Logistics", subtitle: "Track assembly stages, shipping carriers, and customer deliveries." },
    queries: { title: "Direct Transmission Inquiries", subtitle: "Respond to customer test ride requests and enterprise fleet RFQs." },
    users: { title: "Rider Community Directory", subtitle: "Manage user permissions, tier rankings, and rider telemetry." },
    banking: { title: "Banking & Settlement Vault", subtitle: "Enterprise payout routing and cryptocurrency merchant settlement." },
  };

  return (
    <div className="flex min-h-screen bg-[#E4E5E8] dark:bg-[#0A0A0D] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* 1. Master Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        productsCount={products.length}
        ordersCount={orders.length}
        queriesCount={queries.filter((q) => !q.isResolved).length}
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* 2. Main Admin Dashboard Content Area */}
      <main className="flex-1 min-w-0 p-6 md:p-10 space-y-8 max-w-7xl">
        {/* Dynamic Header */}
        <AdminHeader
          title={tabTitles[activeTab].title}
          subtitle={tabTitles[activeTab].subtitle}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        {/* Tab Viewport */}
        {activeTab === "overview" && (
          <AdminOverview
            products={products}
            orders={orders}
            queries={queries}
            users={users}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === "products" && (
          <AdminProducts
            products={products}
            onAddProduct={handleOpenAddProduct}
            onEditProduct={handleOpenEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}

        {activeTab === "orders" && (
          <AdminOrders orders={orders} onUpdateStatus={handleUpdateOrderStatus} />
        )}

        {activeTab === "queries" && (
          <AdminInquiries queries={queries} onToggleResolve={handleToggleQueryResolve} />
        )}

        {activeTab === "users" && (
          <AdminCustomers users={users} onToggleStatus={handleToggleUserStatus} />
        )}

        {activeTab === "banking" && (
          <AdminBanking bankDetails={bankDetails} onSaveBank={setBankDetails} />
        )}
      </main>

      {/* 3. Product Add/Edit Modal */}
      <AdminProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        editingProduct={editingProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
}