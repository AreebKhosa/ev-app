"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Layers,
  Upload,
  Plus,
  Trash2,
  Video,
  Palette,
  BatteryCharging,
  ListPlus,
  ShieldCheck,
  Check,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { AdminProduct, AdminCategory } from "@/types/admin";
import { api } from "@/services/api";

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: AdminProduct | null;
  categories?: AdminCategory[];
  onSave: (productData: Partial<AdminProduct>) => void;
}

type ModalTab = "general" | "descriptions" | "media" | "variants" | "specs" | "shipping";

export function AdminProductModal({
  isOpen,
  onClose,
  editingProduct,
  categories = [],
  onSave,
}: AdminProductModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>("general");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const colorImageInputRef = useRef<HTMLInputElement>(null);
  const [activeColorImageIndex, setActiveColorImageIndex] = useState<number | null>(null);

  // Core Form State matching the requested schema
  const [formData, setFormData] = useState<Partial<AdminProduct>>({
    name: "",
    modelCode: "",
    category: categories[0]?.name || "Urban Commuter",
    badge: "FLEET FLAGSHIP",
    price: 2499,
    originalPrice: 2899,
    stock: 10,
    speed: "45 km/h",
    range: "85 km",
    power: "750W HyperDrive",
    shortDescription: "Ultra-agile electric vehicle engineered for precision urban velocity.",
    description: "Built on aerospace-grade hydroformed alloy chassis with smart BMS thermal telemetry and regenerative hydraulic disc braking.",
    image: "",
    gallery: [],
    videoUrl: "",
    colors: [
      { id: "volt", name: "Acid Lime", hex: "#D4FF00", image: "" },
      { id: "stealth", name: "Stealth Black", hex: "#1A1A1E", image: "" },
    ],
    batteryVariants: [
      { name: "Standard 48V 15Ah (85 km)", range: "85 km", extraPrice: 0 },
      { name: "Extended 48V 25Ah Long Range (140 km)", range: "140 km", extraPrice: 299 },
    ],
    features: [
      "1000W Peak High-Torque Brushless Motor",
      "Samsung 21700 Automotive-Grade Cells",
      "Quad-Piston Hydraulic Disc Rotors",
      "Retina 4.5\" High-Contrast Cockpit Display",
    ],
    specifications: [
      { label: "Motor Type", value: "Brushless DC Hub Motor" },
      { label: "Battery Cells", value: "Samsung 21700 Lithium-Ion" },
      { label: "Brakes", value: "Dual Hydraulic Disc Rotors" },
      { label: "Frame Material", value: "6061 Hydroformed Aviation Alloy" },
      { label: "Waterproof Rating", value: "IP67 Powertrain & Display" },
    ],
    whatsInTheBox: [
      "Volt Electric Vehicle (90% Pre-assembled)",
      "HyperCharge 4A Fast Charger",
      "Precision Multi-tool Setup Kit",
      "Owner Digital Handbook & NFC Key Cards",
    ],
    warrantyAndShipping: {
      warranty: "2 Years Full Comprehensive Warranty",
      trialPeriod: "30-Day Risk-Free Trial",
      shipping: "Free Express Tracked Freight",
      dispatchTime: "Ships within 24 Hours",
    },
  });

  const [customCategory, setCustomCategory] = useState("");
  const [useCustomCategory, setUseCustomCategory] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadingColorImage, setUploadingColorImage] = useState(false);

  // New item inputs
  const [newFeatureText, setNewFeatureText] = useState("");
  const [newBoxItemText, setNewBoxItemText] = useState("");
  const [newSpecLabel, setNewSpecLabel] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (editingProduct) {
        const prodCat = (editingProduct.category || "").trim();
        const matchedCategory = categories.find((c) => c.name.toLowerCase() === prodCat.toLowerCase());
        const effectiveCategory = matchedCategory ? matchedCategory.name : prodCat;

        setFormData({
          ...editingProduct,
          category: effectiveCategory || (categories[0]?.name || "Urban Commuter"),
          gallery: editingProduct.gallery || [],
          colors: editingProduct.colors && editingProduct.colors.length > 0
            ? editingProduct.colors
            : [{ id: "volt", name: "Acid Lime", hex: "#D4FF00", image: "" }],
          batteryVariants: editingProduct.batteryVariants && editingProduct.batteryVariants.length > 0
            ? editingProduct.batteryVariants
            : [{ name: "Standard Range", range: "85 km", extraPrice: 0 }],
          features: editingProduct.features || [],
          specifications: editingProduct.specifications || [],
          whatsInTheBox: editingProduct.whatsInTheBox || [],
          warrantyAndShipping: editingProduct.warrantyAndShipping || {
            warranty: "2 Years Full Comprehensive Warranty",
            trialPeriod: "30-Day Risk-Free Trial",
            shipping: "Free Express Tracked Freight",
            dispatchTime: "Ships within 24 Hours",
          },
        });

        if (!matchedCategory && prodCat) {
          setCustomCategory(prodCat);
          setUseCustomCategory(true);
        } else {
          setCustomCategory("");
          setUseCustomCategory(false);
        }
      } else {
        setFormData({
          name: "",
          modelCode: "",
          category: categories[0]?.name || "Urban Commuter",
          badge: "FLEET FLAGSHIP",
          price: 2499,
          originalPrice: 2899,
          stock: 10,
          speed: "45 km/h",
          range: "85 km",
          power: "750W HyperDrive",
          shortDescription: "Ultra-agile electric vehicle engineered for precision urban velocity.",
          description: "Built on aerospace-grade hydroformed alloy chassis with smart BMS thermal telemetry and regenerative hydraulic disc braking.",
          image: "",
          gallery: [],
          videoUrl: "",
          colors: [
            { id: "volt", name: "Acid Lime", hex: "#D4FF00", image: "" },
            { id: "stealth", name: "Stealth Black", hex: "#1A1A1E", image: "" },
          ],
          batteryVariants: [
            { name: "Standard 48V 15Ah (85 km)", range: "85 km", extraPrice: 0 },
            { name: "Extended 48V 25Ah Long Range (140 km)", range: "140 km", extraPrice: 299 },
          ],
          features: [
            "1000W Peak High-Torque Brushless Motor",
            "Samsung 21700 Automotive-Grade Cells",
            "Quad-Piston Hydraulic Disc Rotors",
            "Retina 4.5\" High-Contrast Cockpit Display",
          ],
          specifications: [
            { label: "Motor Type", value: "Brushless DC Hub Motor" },
            { label: "Battery Cells", value: "Samsung 21700 Lithium-Ion" },
            { label: "Brakes", value: "Dual Hydraulic Disc Rotors" },
            { label: "Frame Material", value: "6061 Hydroformed Aviation Alloy" },
            { label: "Waterproof Rating", value: "IP67 Powertrain & Display" },
          ],
          whatsInTheBox: [
            "Volt Electric Vehicle (90% Pre-assembled)",
            "HyperCharge 4A Fast Charger",
            "Precision Multi-tool Setup Kit",
            "Owner Digital Handbook & NFC Key Cards",
          ],
          warrantyAndShipping: {
            warranty: "2 Years Full Comprehensive Warranty",
            trialPeriod: "30-Day Risk-Free Trial",
            shipping: "Free Express Tracked Freight",
            dispatchTime: "Ships within 24 Hours",
          },
        });
        setUseCustomCategory(false);
        setCustomCategory("");
      }
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  // 1. Upload Main Image
  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingMain(true);
    try {
      const res = await api.upload.productImage(file);
      if (res.data?.url) {
        setFormData((prev) => ({ ...prev, image: res.data!.url }));
      }
    } catch (err) {
      console.error("Main image upload failed:", err);
    } finally {
      setUploadingMain(false);
    }
  };

  // 2. Upload Gallery Image
  const handleGalleryImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingGallery(true);
    try {
      const res = await api.upload.productImage(file);
      if (res.data?.url) {
        setFormData((prev) => ({
          ...prev,
          gallery: [...(prev.gallery || []), res.data!.url],
        }));
      }
    } catch (err) {
      console.error("Gallery upload failed:", err);
    } finally {
      setUploadingGallery(false);
    }
  };

  // 3. Upload Color Variant Image
  const handleColorImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || activeColorImageIndex === null) return;
    setUploadingColorImage(true);
    try {
      const res = await api.upload.productImage(file);
      if (res.data?.url) {
        const updatedColors = [...(formData.colors || [])];
        if (updatedColors[activeColorImageIndex]) {
          updatedColors[activeColorImageIndex].image = res.data.url;
          setFormData((prev) => ({ ...prev, colors: updatedColors }));
        }
      }
    } catch (err) {
      console.error("Color image upload failed:", err);
    } finally {
      setUploadingColorImage(false);
      setActiveColorImageIndex(null);
    }
  };

  // Color helpers
  const addColor = () => {
    setFormData((prev) => ({
      ...prev,
      colors: [
        ...(prev.colors || []),
        { id: `c-${Date.now()}`, name: "New Color", hex: "#D4FF00", image: "" },
      ],
    }));
  };

  const updateColor = (idx: number, field: string, val: string) => {
    const updated = [...(formData.colors || [])];
    if (updated[idx]) {
      (updated[idx] as any)[field] = val;
      setFormData((prev) => ({ ...prev, colors: updated }));
    }
  };

  const removeColor = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      colors: (prev.colors || []).filter((_, i) => i !== idx),
    }));
  };

  // Battery helpers
  const addBatteryVariant = () => {
    setFormData((prev) => ({
      ...prev,
      batteryVariants: [
        ...(prev.batteryVariants || []),
        { name: "Long Range Battery", range: "120 km", extraPrice: 199 },
      ],
    }));
  };

  const updateBattery = (idx: number, field: string, val: any) => {
    const updated = [...(formData.batteryVariants || [])];
    if (updated[idx]) {
      (updated[idx] as any)[field] = field === "extraPrice" ? Number(val) || 0 : val;
      setFormData((prev) => ({ ...prev, batteryVariants: updated }));
    }
  };

  const removeBattery = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      batteryVariants: (prev.batteryVariants || []).filter((_, i) => i !== idx),
    }));
  };

  // Feature helpers
  const addFeature = () => {
    if (!newFeatureText.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), newFeatureText.trim()],
    }));
    setNewFeatureText("");
  };

  const removeFeature = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== idx),
    }));
  };

  // Box items helpers
  const addBoxItem = () => {
    if (!newBoxItemText.trim()) return;
    setFormData((prev) => ({
      ...prev,
      whatsInTheBox: [...(prev.whatsInTheBox || []), newBoxItemText.trim()],
    }));
    setNewBoxItemText("");
  };

  const removeBoxItem = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      whatsInTheBox: (prev.whatsInTheBox || []).filter((_, i) => i !== idx),
    }));
  };

  // Specifications helpers
  const addSpec = () => {
    if (!newSpecLabel.trim() || !newSpecValue.trim()) return;
    setFormData((prev) => ({
      ...prev,
      specifications: [
        ...(prev.specifications || []),
        { label: newSpecLabel.trim(), value: newSpecValue.trim() },
      ],
    }));
    setNewSpecLabel("");
    setNewSpecValue("");
  };

  const removeSpec = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      specifications: (prev.specifications || []).filter((_, i) => i !== idx),
    }));
  };

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCategory = (
      useCustomCategory && customCategory.trim()
        ? customCategory.trim()
        : (formData.category || "").trim()
    ) || (categories[0]?.name || "Urban Commuter");

    const payload: Partial<AdminProduct> = {
      ...formData,
      category: finalCategory,
      price: Number(formData.price) || 0,
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      stock: Number(formData.stock) || 0,
      image: formData.image || "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=600&auto=format&fit=crop",
    };

    onSave(payload);
  };

  const tabs: { id: ModalTab; label: string; icon: React.ReactNode }[] = [
    { id: "general", label: "General & Specs", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "descriptions", label: "Descriptions", icon: <ListPlus className="w-3.5 h-3.5" /> },
    { id: "media", label: "Media & Gallery", icon: <ImageIcon className="w-3.5 h-3.5" /> },
    { id: "variants", label: "Colors & Battery", icon: <Palette className="w-3.5 h-3.5" /> },
    { id: "specs", label: "Tech Specs & Box", icon: <BatteryCharging className="w-3.5 h-3.5" /> },
    { id: "shipping", label: "Warranty & Logistics", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-black/75 backdrop-blur-md animate-in fade-in" />

      {/* Hidden file pickers */}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleMainImageChange} />
      <input ref={galleryInputRef} type="file" accept="image/*" className="hidden" onChange={handleGalleryImageChange} />
      <input ref={colorImageInputRef} type="file" accept="image/*" className="hidden" onChange={handleColorImageChange} />

      <div className="relative w-full max-w-3xl bg-white dark:bg-[#121316] rounded-3xl p-6 md:p-8 shadow-2xl border border-black/10 dark:border-white/10 z-10 space-y-6 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 shrink-0">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-[#8ba800] dark:text-[#D4FF00]">
              Fleet Model Architecture
            </span>
            <h3 className="text-xl font-black text-neutral-900 dark:text-white">
              {editingProduct ? `Edit ${editingProduct.name}` : "Deploy New Fleet Model"}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 text-neutral-500 hover:text-black dark:hover:text-white rounded-xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 overflow-x-auto no-scrollbar shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-neutral-950 text-white dark:bg-[#D4FF00] dark:text-black shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Scrollable Form Body */}
        <form id="product-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1 space-y-6 text-xs">
          {/* TAB 1: GENERAL & SPECS */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                    Model Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Volt Apex GT"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                    Model Code / SKU (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.modelCode || ""}
                    onChange={(e) => setFormData({ ...formData, modelCode: e.target.value })}
                    placeholder="e.g. VOLT-APEX-900"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>
              </div>

              {/* Category Selector */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-[#D4FF00]" /> Fleet Classification *
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const next = !useCustomCategory;
                      setUseCustomCategory(next);
                      if (next) {
                        setCustomCategory(formData.category || "");
                      } else {
                        const match = categories.find((c) => c.name.toLowerCase() === (customCategory || formData.category || "").toLowerCase());
                        const chosen = match ? match.name : (categories[0]?.name || "Urban Commuter");
                        setFormData((prev) => ({ ...prev, category: chosen }));
                      }
                    }}
                    className="text-[10px] font-mono text-[#8ba800] dark:text-[#D4FF00] hover:underline cursor-pointer"
                  >
                    {useCustomCategory ? "← Select from existing classifications" : "+ Enter custom classification"}
                  </button>
                </div>

                {useCustomCategory ? (
                  <input
                    type="text"
                    required
                    value={customCategory}
                    onChange={(e) => {
                      setCustomCategory(e.target.value);
                      setFormData((prev) => ({ ...prev, category: e.target.value }));
                    }}
                    placeholder="e.g. Dual Motor Mountain Beast"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                ) : (
                  <select
                    value={formData.category || (categories[0]?.name || "Urban Commuter")}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData((prev) => ({ ...prev, category: val }));
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  >
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <option key={cat.id} value={cat.name} className="bg-white dark:bg-[#121316]">
                          {cat.name}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Urban Commuter" className="bg-white dark:bg-[#121316]">Urban Commuter</option>
                        <option value="All-Terrain Beast" className="bg-white dark:bg-[#121316]">All-Terrain Beast</option>
                        <option value="Hyper GT Dual Motor" className="bg-white dark:bg-[#121316]">Hyper GT Dual Motor</option>
                        <option value="Cargo & Long Haul" className="bg-white dark:bg-[#121316]">Cargo & Long Haul</option>
                      </>
                    )}
                  </select>
                )}
              </div>

              {/* Badge & Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={formData.badge || ""}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="FLAGSHIP / BEST SELLER"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                    Sale Price ($ USD) *
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    min={0}
                    value={formData.price ?? ""}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value as any })}
                    placeholder="2499.00"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                    Original Price (MSRP $)
                  </label>
                  <input
                    type="number"
                    step="any"
                    min={0}
                    value={formData.originalPrice ?? ""}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value as any })}
                    placeholder="2899.00"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>
              </div>

              {/* Stock & Powertrain Trio */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    step="1"
                    required
                    min={0}
                    value={formData.stock ?? ""}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value as any })}
                    placeholder="10"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                    Top Speed
                  </label>
                  <input
                    type="text"
                    value={formData.speed || ""}
                    onChange={(e) => setFormData({ ...formData, speed: e.target.value })}
                    placeholder="45 km/h"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                    Max Range
                  </label>
                  <input
                    type="text"
                    value={formData.range || ""}
                    onChange={(e) => setFormData({ ...formData, range: e.target.value })}
                    placeholder="85 km"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                    Motor Power
                  </label>
                  <input
                    type="text"
                    value={formData.power || ""}
                    onChange={(e) => setFormData({ ...formData, power: e.target.value })}
                    placeholder="750W Peak"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DESCRIPTIONS */}
          {activeTab === "descriptions" && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                  Short Summary / Buy Box Description
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDescription || ""}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Ultra-agile electric vehicle engineered for precision urban velocity and long-range cruising."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                  Full Technical & Engineering Description
                </label>
                <textarea
                  rows={5}
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive description of frame engineering, motor telemetry, regenerative braking, smart BMS battery safety, etc."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                />
              </div>
            </div>
          )}

          {/* TAB 3: MEDIA & GALLERY */}
          {activeTab === "media" && (
            <div className="space-y-6">
              {/* Primary Image */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                    Main Hero Image (Primary Preview)
                  </label>
                  {uploadingMain && (
                    <span className="text-[10px] text-[#8ba800] dark:text-[#D4FF00] flex items-center gap-1 font-mono">
                      <Loader2 className="w-3 h-3 animate-spin" /> Uploading to server...
                    </span>
                  )}
                </div>

                {formData.image ? (
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 group">
                    <Image
                      src={formData.image}
                      alt="Main preview"
                      fill
                      unoptimized
                      className="object-contain p-3"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-[#D4FF00] transition-colors cursor-pointer"
                      >
                        Change Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, image: "" }))}
                        className="px-3 py-1.5 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 rounded-2xl border-2 border-dashed border-black/15 dark:border-white/15 hover:border-[#D4FF00] bg-black/5 dark:bg-white/5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors p-4 text-center"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#D4FF00]/15 text-[#8ba800] dark:text-[#D4FF00] flex items-center justify-center">
                      <Upload className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      Upload Main Hero Image from PC
                    </span>
                  </div>
                )}
              </div>

              {/* Gallery Images */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                    Product Gallery ({formData.gallery?.length || 0} images)
                  </label>
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    disabled={uploadingGallery}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-[#D4FF00] hover:text-black font-mono font-bold text-[11px] transition-colors cursor-pointer"
                  >
                    {uploadingGallery ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>Add Photo from PC</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {formData.gallery?.map((imgUrl, idx) => (
                    <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 group">
                      <Image
                        src={imgUrl}
                        alt={`Gallery image ${idx + 1}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((p) => ({
                            ...p,
                            gallery: (p.gallery || []).filter((_, i) => i !== idx),
                          }))
                        }
                        className="absolute top-1 right-1 p-1 rounded-lg bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video URL */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-[#D4FF00]" /> Video Preview / YouTube Embed URL
                </label>
                <input
                  type="url"
                  value={formData.videoUrl || ""}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/embed/... or /video.mp4"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                />
              </div>
            </div>
          )}

          {/* TAB 4: COLORS & BATTERY VARIANTS */}
          {activeTab === "variants" && (
            <div className="space-y-6">
              {/* Colors */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#D4FF00]" /> Color Variants & Swatches
                  </label>
                  <button
                    type="button"
                    onClick={addColor}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-[#D4FF00] hover:text-black font-mono font-bold text-[11px] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Color
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.colors?.map((col, idx) => (
                    <div key={idx} className="flex flex-wrap sm:flex-nowrap items-center gap-2 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5">
                      <input
                        type="color"
                        value={col.hex || "#D4FF00"}
                        onChange={(e) => updateColor(idx, "hex", e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                      />
                      <input
                        type="text"
                        value={col.name}
                        onChange={(e) => updateColor(idx, "name", e.target.value)}
                        placeholder="Color Name (e.g. Acid Lime)"
                        className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-[#131418] border border-black/10 dark:border-white/10 text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={col.hex}
                        onChange={(e) => updateColor(idx, "hex", e.target.value)}
                        placeholder="#D4FF00"
                        className="w-24 px-3 py-1.5 rounded-xl bg-white dark:bg-[#131418] border border-black/10 dark:border-white/10 text-xs font-mono"
                      />

                      {/* Color Specific Photo Upload */}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveColorImageIndex(idx);
                          colorImageInputRef.current?.click();
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-[#D4FF00] hover:text-black text-[10px] font-mono font-bold whitespace-nowrap cursor-pointer"
                      >
                        {col.image ? "✓ Photo Set" : "+ Set Photo"}
                      </button>

                      <button
                        type="button"
                        onClick={() => removeColor(idx)}
                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Battery Variants */}
              <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 flex items-center gap-1.5">
                    <BatteryCharging className="w-3.5 h-3.5 text-[#D4FF00]" /> Battery Range Configurations
                  </label>
                  <button
                    type="button"
                    onClick={addBatteryVariant}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-[#D4FF00] hover:text-black font-mono font-bold text-[11px] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Battery Variant
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.batteryVariants?.map((bat, idx) => (
                    <div key={idx} className="flex flex-wrap sm:flex-nowrap items-center gap-2 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5">
                      <input
                        type="text"
                        value={bat.name}
                        onChange={(e) => updateBattery(idx, "name", e.target.value)}
                        placeholder="Variant Name (e.g. Standard 48V 15Ah)"
                        className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-[#131418] border border-black/10 dark:border-white/10 text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={bat.range}
                        onChange={(e) => updateBattery(idx, "range", e.target.value)}
                        placeholder="Range (e.g. 85 km)"
                        className="w-28 px-3 py-1.5 rounded-xl bg-white dark:bg-[#131418] border border-black/10 dark:border-white/10 text-xs font-mono"
                      />
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-mono text-neutral-500">+$</span>
                        <input
                          type="number"
                          step="any"
                          min={0}
                          value={bat.extraPrice ?? ""}
                          onChange={(e) => updateBattery(idx, "extraPrice", e.target.value)}
                          placeholder="0"
                          className="w-20 px-3 py-1.5 rounded-xl bg-white dark:bg-[#131418] border border-black/10 dark:border-white/10 text-xs font-mono font-bold"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeBattery(idx)}
                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SPECS, FEATURES & BOX ITEMS */}
          {activeTab === "specs" && (
            <div className="space-y-6">
              {/* Features List */}
              <div className="space-y-3">
                <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                  Feature Highlights Bullet Points
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newFeatureText}
                    onChange={(e) => setNewFeatureText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    placeholder="e.g. 1000W Peak High-Torque Brushless Motor"
                    className="flex-1 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 rounded-xl bg-[#D4FF00] text-black font-bold text-xs cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.features?.map((f, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/10 text-xs font-medium border border-black/5"
                    >
                      <span>{f}</span>
                      <button type="button" onClick={() => removeFeature(idx)} className="text-red-500 hover:text-red-700 cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Key-Value Table */}
              <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
                <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                  Full Technical Specifications Key-Value Specs
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="text"
                    value={newSpecLabel}
                    onChange={(e) => setNewSpecLabel(e.target.value)}
                    placeholder="Spec Label (e.g. Brake Caliper)"
                    className="w-full sm:w-1/3 px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono"
                  />
                  <input
                    type="text"
                    value={newSpecValue}
                    onChange={(e) => setNewSpecValue(e.target.value)}
                    placeholder="Spec Value (e.g. Quad Piston Hydraulic 203mm Rotors)"
                    className="w-full sm:flex-1 px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                  />
                  <button
                    type="button"
                    onClick={addSpec}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#D4FF00] text-black font-bold text-xs cursor-pointer"
                  >
                    Add Spec
                  </button>
                </div>

                <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden divide-y divide-black/5 dark:divide-white/5">
                  {formData.specifications?.map((sp, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 text-xs">
                      <span className="font-mono text-neutral-500 w-1/3">{sp.label}</span>
                      <span className="font-bold flex-1 text-neutral-900 dark:text-white">{sp.value}</span>
                      <button type="button" onClick={() => removeSpec(idx)} className="text-red-500 p-1 cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's In The Box */}
              <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
                <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                  What's In The Box (Package Checklist)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newBoxItemText}
                    onChange={(e) => setNewBoxItemText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBoxItem())}
                    placeholder="e.g. HyperCharge 4A Fast Charger"
                    className="flex-1 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                  />
                  <button
                    type="button"
                    onClick={addBoxItem}
                    className="px-4 py-2 rounded-xl bg-[#D4FF00] text-black font-bold text-xs cursor-pointer"
                  >
                    Add Item
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {formData.whatsInTheBox?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5">
                      <span className="flex items-center gap-1.5 text-xs font-medium">
                        <Check className="w-3.5 h-3.5 text-[#8ba800] dark:text-[#D4FF00]" />
                        <span>{item}</span>
                      </span>
                      <button type="button" onClick={() => removeBoxItem(idx)} className="text-red-500 cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: WARRANTY & LOGISTICS */}
          {activeTab === "shipping" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                    Warranty Terms
                  </label>
                  <input
                    type="text"
                    value={formData.warrantyAndShipping?.warranty || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        warrantyAndShipping: {
                          ...formData.warrantyAndShipping,
                          warranty: e.target.value,
                        },
                      })
                    }
                    placeholder="2 Years Full Comprehensive Warranty"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                    Trial Period
                  </label>
                  <input
                    type="text"
                    value={formData.warrantyAndShipping?.trialPeriod || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        warrantyAndShipping: {
                          ...formData.warrantyAndShipping,
                          trialPeriod: e.target.value,
                        },
                      })
                    }
                    placeholder="30-Day Risk-Free Trial"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                    Shipping Carrier & Method
                  </label>
                  <input
                    type="text"
                    value={formData.warrantyAndShipping?.shipping || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        warrantyAndShipping: {
                          ...formData.warrantyAndShipping,
                          shipping: e.target.value,
                        },
                      })
                    }
                    placeholder="Free Express Tracked Freight"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                    Dispatch Speed
                  </label>
                  <input
                    type="text"
                    value={formData.warrantyAndShipping?.dispatchTime || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        warrantyAndShipping: {
                          ...formData.warrantyAndShipping,
                          dispatchTime: e.target.value,
                        },
                      })
                    }
                    placeholder="Ships within 24 Hours"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Footer Actions */}
        <div className="pt-4 flex items-center justify-between border-t border-black/10 dark:border-white/10 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="product-form"
            disabled={uploadingMain || uploadingGallery || uploadingColorImage}
            className="px-6 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-[#D4FF00] dark:text-black font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            {editingProduct ? "Update Vehicle Fleet Model" : "Deploy Fleet Model to Catalog"}
          </button>
        </div>
      </div>
    </div>
  );
}
