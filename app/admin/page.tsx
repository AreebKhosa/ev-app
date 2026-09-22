"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AdminTab,
  AdminProduct,
  AdminCategory,
  AdminOrder,
  AdminQuery,
  AdminUser,
  BankDetails,
  AdminOrderStatus,
} from "@/types/admin";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminOverview } from "@/components/admin/admin-overview";
import { AdminProducts } from "@/components/admin/admin-products";
import { AdminCategories } from "@/components/admin/admin-categories";
import { AdminOrders } from "@/components/admin/admin-orders";
import { AdminInquiries } from "@/components/admin/admin-inquiries";
import { AdminCustomers } from "@/components/admin/admin-customers";
import { AdminBanking } from "@/components/admin/admin-banking";
import { AdminProductModal } from "@/components/admin/admin-product-modal";
import { api } from "@/services/api";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // Core Real Data States (Initialized empty - 0 dummy data)
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [queries, setQueries] = useState<AdminQuery[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bankName: "Corporate Settlement Vault",
    accountTitle: "Volt Studio Mobility Inc.",
    accountNumberOrIban: "US89VOLT000987654321",
    swiftBic: "VOLTUS33",
    branchAddress: "500 Howard St, San Francisco, CA",
    cryptoUsdtAddress: "0x71C...89A",
  });

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Check Admin Authentication on mount
  useEffect(() => {
    const adminToken = localStorage.getItem("volt_admin_token");
    if (!adminToken) {
      router.push("/admin/login");
    } else {
      setIsAuthChecked(true);
    }
  }, [router]);

  // Sync Real Data with Backend API on load
  const refreshBackendData = async () => {
    try {
      // 1. Fetch Categories
      const catRes = await api.categories.getAll();
      if (catRes.data) {
        setCategories(
          catRes.data.map((c: any) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            description: c.description || "",
            image: c.image || "",
            productCount: 0,
          }))
        );
      }

      // 2. Fetch Products
      const prodRes = await api.products.getAll();
      if (prodRes.data) {
        setProducts(
          prodRes.data.map((p: any) => ({
            id: p.id,
            name: p.name,
            modelCode: p.modelCode,
            category: p.category,
            badge: p.badge,
            price: Number(p.price) || 0,
            originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
            stock: p.stock || 0,
            speed: p.speed || "45 km/h",
            range: p.range || "85 km",
            power: p.power || "750W",
            shortDescription: p.shortDescription || "",
            description: p.description || "",
            image: p.image || "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=400&auto=format&fit=crop",
            gallery: p.gallery || [],
            videoUrl: p.videoUrl || "",
            colors: p.colors || [],
            batteryVariants: p.batteryVariants || [],
            features: p.features || [],
            specifications: p.specifications || [],
            whatsInTheBox: p.whatsInTheBox || [],
            warrantyAndShipping: p.warrantyAndShipping || {},
          }))
        );
      }

      // 3. Fetch Orders
      const ordRes = await api.orders.getAllAdmin();
      if (ordRes.status === 401) {
        localStorage.removeItem("volt_admin_token");
        localStorage.removeItem("volt_admin_user");
        router.push("/admin/login");
        return;
      }
      if (ordRes.data) {
        setOrders(
          ordRes.data.map((o: any) => ({
            id: o.orderNumber || o.id,
            customerName: o.customerName,
            email: o.customerEmail,
            product: o.items?.[0]?.name || "Fleet Vehicle",
            total: o.totalDue || 0,
            date: new Date(o.createdAt).toLocaleDateString(),
            status: o.status === "IN_TRANSIT" ? "In Transit" : o.status === "ASSEMBLED" ? "Assembled" : o.status === "DELIVERED" ? "Delivered" : "Pending",
          }))
        );
      }

      // 4. Fetch Queries
      const qryRes = await api.queries.getAllAdmin();
      if (qryRes.data) {
        setQueries(
          qryRes.data.map((q: any) => ({
            id: q.id,
            name: q.name,
            email: q.email,
            topic: q.topic,
            model: q.model,
            message: q.message,
            date: new Date(q.createdAt).toLocaleDateString(),
            isResolved: q.isResolved,
          }))
        );
      }

      // 5. Fetch Users / Customers
      const usrRes = await api.admin.getUsers();
      if (usrRes.data) {
        setUsers(
          usrRes.data.map((u: any) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            tier: u.tier || "Customer",
            vehiclesCount: u.vehiclesCount ?? (u.orders?.length || 0),
            totalSpent: u.totalSpent ?? (u.orders?.reduce((sum: number, o: any) => sum + (o.totalDue || 0), 0) || 0),
            status: u.isSuspended ? "Suspended" : "Active",
          }))
        );
      }

      // 6. Fetch Bank Details
      const bankRes = await api.admin.getBankDetails();
      if (bankRes.data) {
        setBankDetails({
          bankName: bankRes.data.bankName || "",
          accountTitle: bankRes.data.accountTitle || "",
          accountNumberOrIban: bankRes.data.accountNumberOrIban || "",
          swiftBic: bankRes.data.swiftBic || "",
          branchAddress: bankRes.data.branchAddress || "",
          cryptoUsdtAddress: bankRes.data.cryptoUsdtAddress || "",
        });
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    }
  };

  useEffect(() => {
    refreshBackendData();
  }, []);

  // Category Operations
  const handleAddCategory = async (data: { name: string; description?: string; image?: string }) => {
    await api.categories.create(data);
    await refreshBackendData();
  };

  const handleUpdateCategory = async (id: string, data: { name: string; description?: string; image?: string }) => {
    await api.categories.update(id, data);
    await refreshBackendData();
  };

  const handleDeleteCategory = async (id: string) => {
    await api.categories.delete(id);
    await refreshBackendData();
  };

  // Product Operations
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (product: AdminProduct) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (formData: Partial<AdminProduct>) => {
    if (editingProduct) {
      await api.products.update(editingProduct.id, formData);
    } else {
      await api.products.create({
        ...formData,
        name: formData.name || "Volt Electric Model",
        category: formData.category || (categories[0]?.name || "Electric Fleet"),
        price: Number(formData.price) || 1999,
        stock: Number(formData.stock) || 5,
        speed: formData.speed || "45 km/h",
        range: formData.range || "80 km",
        power: formData.power || "750W",
        image: formData.image || "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=400&auto=format&fit=crop",
      });
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
    await refreshBackendData();
  };

  const handleDeleteProduct = async (id: string) => {
    await api.products.delete(id);
    await refreshBackendData();
  };

  // Orders Operations
  const handleUpdateOrderStatus = async (id: string, status: AdminOrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    const apiStatus = status.toUpperCase().replace(/\s+/g, "_");
    await api.orders.updateStatus(id, apiStatus);
    await refreshBackendData();
  };

  // Banking Operations
  const handleSaveBank = async (details: BankDetails) => {
    setBankDetails(details);
    const res = await api.admin.updateBankDetails(details);
    if (res.data?.settings) {
      setBankDetails({
        bankName: res.data.settings.bankName || "",
        accountTitle: res.data.settings.accountTitle || "",
        accountNumberOrIban: res.data.settings.accountNumberOrIban || "",
        swiftBic: res.data.settings.swiftBic || "",
        branchAddress: res.data.settings.branchAddress || "",
        cryptoUsdtAddress: res.data.settings.cryptoUsdtAddress || "",
      });
    }
  };

  // Inquiries Operations
  const handleToggleQueryResolve = async (id: string) => {
    setQueries((prev) => prev.map((q) => (q.id === id ? { ...q, isResolved: !q.isResolved } : q)));
    await api.queries.toggleResolved(id);
  };

  // Customer Operations
  const handleToggleUserStatus = async (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u))
    );
    await api.admin.toggleUserSuspension(id);
  };

  // Tab Titles & Subtitles Map
  const tabTitles: Record<AdminTab, { title: string; subtitle: string }> = {
    overview: { title: "Command Center Overview", subtitle: "Real-time telemetry, revenue performance, and dispatch status." },
    products: { title: "Fleet Model Catalog", subtitle: "Configure hardware specs, inventory levels, and production releases." },
    categories: { title: "Fleet Categories Architecture", subtitle: "Manage vehicle classifications and segment profiles." },
    orders: { title: "Order Fulfillment & Logistics", subtitle: "Track assembly stages, shipping carriers, and customer deliveries." },
    queries: { title: "Direct Transmission Inquiries", subtitle: "Respond to customer test ride requests and enterprise fleet RFQs." },
    users: { title: "Customer & User Directory", subtitle: "Manage customer permissions, tier rankings, and order activity." },
    banking: { title: "Banking & Settlement Vault", subtitle: "Enterprise payout routing and cryptocurrency merchant settlement." },
  };

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen bg-[#0A0A0D] flex items-center justify-center text-white font-mono text-xs">
        <span>Authenticating Level 4 Clearance...</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#E4E5E8] dark:bg-[#0A0A0D] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* 1. Master Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        productsCount={products.length}
        categoriesCount={categories.length}
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

        {activeTab === "categories" && (
          <AdminCategories
            categories={categories}
            onAddCategory={handleAddCategory}
            onUpdateCategory={handleUpdateCategory}
            onDeleteCategory={handleDeleteCategory}
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
          <AdminBanking bankDetails={bankDetails} onSaveBank={handleSaveBank} />
        )}
      </main>

      {/* 3. Product Add/Edit Modal (with categories prop) */}
      <AdminProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        editingProduct={editingProduct}
        categories={categories}
        onSave={handleSaveProduct}
      />
    </div>
  );
}