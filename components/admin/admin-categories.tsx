"use client";

import React, { useState, useRef } from "react";
import { Plus, Edit2, Trash2, Layers, Search, Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { AdminCategory } from "@/types/admin";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/services/api";

interface AdminCategoriesProps {
    categories: AdminCategory[];
    onAddCategory: (data: { name: string; description?: string; image?: string }) => void;
    onUpdateCategory: (id: string, data: { name: string; description?: string; image?: string }) => void;
    onDeleteCategory: (id: string) => void;
}

export function AdminCategories({
    categories,
    onAddCategory,
    onUpdateCategory,
    onDeleteCategory,
}: AdminCategoriesProps) {
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imagePreview, setImagePreview] = useState("");

    const filtered = categories.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.slug.toLowerCase().includes(search.toLowerCase()) ||
        (c.description && c.description.toLowerCase().includes(search.toLowerCase()))
    );

    const handleOpenAdd = () => {
        setEditingCategory(null);
        setName("");
        setDescription("");
        setImage("");
        setImagePreview("");
        setIsModalOpen(true);
    };

    const handleOpenEdit = (cat: AdminCategory) => {
        setEditingCategory(cat);
        setName(cat.name);
        setDescription(cat.description || "");
        setImage(cat.image || "");
        setImagePreview(cat.image || "");
        setIsModalOpen(true);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const localUrl = URL.createObjectURL(file);
        setImagePreview(localUrl);
        setUploadingImage(true);

        try {
            const res = await api.upload.categoryImage(file);
            if (res.data?.url) {
                setImage(res.data.url);
                setImagePreview(res.data.url);
            }
        } catch (err) {
            console.error("Category image upload failed:", err);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        const finalImage = image || imagePreview || "";

        if (editingCategory) {
            onUpdateCategory(editingCategory.id, { name, description, image: finalImage });
        } else {
            onAddCategory({ name, description, image: finalImage });
        }

        setIsModalOpen(false);
        setEditingCategory(null);
    };

    return (
        <div className="space-y-6">
            {/* Top Bar: Search + Add Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search fleet categories..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/70 dark:bg-[#121316]/70 border border-black/10 dark:border-white/10 text-xs font-mono placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                    />
                </div>

                <button
                    onClick={handleOpenAdd}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#D4FF00] text-black hover:bg-[#c0e600] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Create New Category</span>
                </button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((cat) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-black/20 dark:hover:border-white/20 transition-colors"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-xl bg-[#D4FF00]/15 text-[#92b500] dark:text-[#D4FF00] flex items-center justify-center font-bold">
                                        <Layers className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-mono uppercase font-bold text-neutral-500">
                                        Slug: /{cat.slug}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handleOpenEdit(cat)}
                                        className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                                        title="Edit Category"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => onDeleteCategory(cat.id)}
                                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                                        title="Delete Category"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {cat.image && (
                                <div className="relative w-full h-28 rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
                                    <Image src={cat.image} alt={cat.name} fill unoptimized className="object-cover" />
                                </div>
                            )}

                            <div>
                                <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                                    {cat.name}
                                </h3>
                                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mt-1">
                                    {cat.description || "No description provided for this vehicle fleet category."}
                                </p>
                            </div>
                        </div>

                        <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                            <span>Assigned Fleet Models:</span>
                            <span className="font-bold text-neutral-900 dark:text-white">
                                {cat.productCount || 0} Models
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Category Modal (Create / Edit) */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md rounded-3xl bg-white dark:bg-[#131418] border border-black/10 dark:border-white/15 p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar"
                        >
                            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
                                <h3 className="text-lg font-black text-neutral-950 dark:text-white flex items-center gap-2">
                                    <Layers className="w-5 h-5 text-[#D4FF00]" />
                                    <span>{editingCategory ? "Edit Fleet Category" : "New Fleet Category"}</span>
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-1 rounded-lg text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-neutral-500 uppercase">
                                        Category Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. All-Terrain Beast"
                                        className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-sans text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-neutral-500 uppercase">
                                        Description / Architecture Scope
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Explain the vehicle classification and riding terrain profile..."
                                        className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-sans text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                                    />
                                </div>

                                {/* Category Image Upload from Local Computer */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-neutral-500 uppercase flex items-center justify-between">
                                        <span>Category Image (Upload from PC)</span>
                                        {uploadingImage && (
                                            <span className="text-[10px] text-[#92b500] dark:text-[#D4FF00] flex items-center gap-1">
                                                <Loader2 className="w-3 h-3 animate-spin" /> Uploading...
                                            </span>
                                        )}
                                    </label>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />

                                    {imagePreview ? (
                                        <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 group">
                                            <Image
                                                src={imagePreview}
                                                alt="Category preview"
                                                fill
                                                unoptimized
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="px-3 py-1.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-[#D4FF00] transition-colors cursor-pointer"
                                                >
                                                    Change Image
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setImagePreview("");
                                                        setImage("");
                                                    }}
                                                    className="px-3 py-1.5 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors cursor-pointer"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-full h-28 rounded-2xl border-2 border-dashed border-black/15 dark:border-white/15 hover:border-[#D4FF00] bg-black/5 dark:bg-white/5 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors p-4 text-center"
                                        >
                                            <div className="w-8 h-8 rounded-xl bg-[#D4FF00]/15 text-[#92b500] dark:text-[#D4FF00] flex items-center justify-center">
                                                <Upload className="w-4 h-4" />
                                            </div>
                                            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                                                Choose category image from PC
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-3 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 font-bold hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={uploadingImage}
                                        className="px-6 py-2.5 rounded-xl bg-[#D4FF00] text-black font-black uppercase tracking-wider hover:bg-[#c0e600] transition-colors shadow-md cursor-pointer disabled:opacity-50"
                                    >
                                        {editingCategory ? "Update Category" : "Create Category"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
