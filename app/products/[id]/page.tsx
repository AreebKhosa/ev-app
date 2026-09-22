"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { Clock, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductBuyBox } from "@/components/products/product-buy-box";
import { ProductBundle, BundleItem } from "@/components/products/product-bundle";
import { ProductTabs } from "@/components/products/product-tabs";
import { RecommendedProducts } from "@/components/products/recommended-products";
import { useCart } from "@/context/cart-context";
import { api } from "@/services/api";
import { Product, ProductColor, BatteryVariant } from "@/types/product";

const DEFAULT_BUNDLE: BundleItem[] = [
    { id: "helmet", name: "Volt Carbon Aerodynamic Helmet", price: 129, checked: true },
    { id: "charger", name: "HyperCharge 4A Fast Charger", price: 189, checked: true },
    { id: "lock", name: "Titanium GPS Anti-Theft Lock", price: 99, checked: false },
];

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const productId = resolvedParams.id;
    const { addToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [selectedColor, setSelectedColor] = useState<ProductColor>({ id: "volt", name: "Acid Lime", hex: "#D4FF00" });
    const [selectedBattery, setSelectedBattery] = useState<BatteryVariant>({ name: "Standard Range", range: "85 km", extraPrice: 0 });
    const [quantity, setQuantity] = useState(1);
    const [bundle, setBundle] = useState<BundleItem[]>(DEFAULT_BUNDLE);
    const [isAdded, setIsAdded] = useState(false);

    // Flash Sale Countdown Timer
    const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 18, seconds: 22 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Fetch product details from backend
    useEffect(() => {
        const loadProduct = async () => {
            try {
                const res = await api.products.getById(productId);
                if (res.data) {
                    const p = res.data;
                    
                    // Build unified gallery
                    const imgs: string[] = [];
                    if (p.image) imgs.push(p.image);
                    if (Array.isArray(p.gallery)) {
                        p.gallery.forEach((g: string) => {
                            if (g && !imgs.includes(g)) imgs.push(g);
                        });
                    }
                    if (imgs.length === 0) {
                        imgs.push("https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop");
                    }
                    setGalleryImages(imgs);

                    const colors: ProductColor[] = p.colors && p.colors.length > 0 ? p.colors : [
                        { id: "volt", name: "Acid Lime", hex: "#D4FF00", image: "" },
                        { id: "black", name: "Stealth Black", hex: "#1A1A1E", image: "" },
                    ];

                    const batteryVariants: BatteryVariant[] = p.batteryVariants && p.batteryVariants.length > 0 ? p.batteryVariants : [
                        { name: `Standard (${p.range || "85 km"})`, range: p.range || "85 km", extraPrice: 0 },
                        { name: "Extended Long Range", range: "140 km", extraPrice: 299 },
                    ];

                    const specsTable = p.specifications && p.specifications.length > 0 ? p.specifications : [
                        { label: "Motor Power", value: p.power || "750W High-Torque Brushless" },
                        { label: "Top Speed", value: p.speed || "45 km/h" },
                        { label: "Max Range", value: p.range || "85 km" },
                        { label: "Battery Cells", value: "Automotive-Grade Samsung 21700 Lithium-Ion" },
                        { label: "Charging Time", value: "3.5 Hours (With HyperCharge 4A Fast Charger)" },
                        { label: "Braking System", value: "Dual Quad-Piston Hydraulic Disc Rotors" },
                        { label: "Suspension", value: "160mm Inverted Front Air Fork + Rear Coil-Over" },
                        { label: "Display & OS", value: "High-Contrast Retina TFT with GPS Telemetry" },
                        { label: "Waterproof Rating", value: "IP67 Weather-Sealed (Powertrain & Display)" },
                    ];

                    const features = p.features && p.features.length > 0 ? p.features : [
                        "1000W Peak High-Torque Brushless Motor",
                        "Samsung 21700 Automotive-Grade Cells",
                        "Quad-Piston Hydraulic Disc Rotors",
                        "Retina 4.5\" High-Contrast Cockpit Display",
                    ];

                    const whatsInTheBox = p.whatsInTheBox && p.whatsInTheBox.length > 0 ? p.whatsInTheBox : [
                        "Volt Electric Vehicle (90% Pre-assembled)",
                        "HyperCharge 4A Fast Charger",
                        "Precision Multi-tool Setup Kit",
                        "Owner Digital Handbook & NFC Key Cards",
                    ];

                    const warrantyAndShipping = p.warrantyAndShipping || {
                        warranty: "2 Years Full Comprehensive Warranty",
                        trialPeriod: "30-Day Risk-Free Trial",
                        shipping: "Free Express Tracked Freight",
                        dispatchTime: "Ships within 24 Hours",
                    };

                    setProduct({
                        id: p.id,
                        name: p.name,
                        modelCode: p.modelCode,
                        category: p.category,
                        badge: p.badge,
                        rating: 4.9,
                        reviewsCount: 142,
                        price: Number(p.price) || 2499,
                        originalPrice: p.originalPrice ? Number(p.originalPrice) : Number(p.price) + 400,
                        stock: p.stock || 8,
                        speed: p.speed || "45 km/h",
                        range: p.range || "85 km",
                        power: p.power || "750W",
                        shortDescription: p.shortDescription || "",
                        description: p.description || "",
                        image: p.image,
                        gallery: imgs,
                        videoUrl: p.videoUrl || "",
                        colors,
                        batteryVariants,
                        features,
                        specifications: specsTable,
                        whatsInTheBox,
                        warrantyAndShipping,
                    });

                    if (colors[0]) setSelectedColor(colors[0]);
                    if (batteryVariants[0]) setSelectedBattery(batteryVariants[0]);
                }
            } catch (err) {
                console.error("Failed to load product by id:", err);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [productId]);

    // When color changes, if the color has its own image, set it as active or add to gallery
    const handleColorSelect = (color: ProductColor) => {
        setSelectedColor(color);
        if (color.image) {
            const foundIdx = galleryImages.indexOf(color.image);
            if (foundIdx !== -1) {
                setActiveImageIdx(foundIdx);
            } else {
                setGalleryImages((prev) => [color.image!, ...prev]);
                setActiveImageIdx(0);
            }
        }
    };

    const toggleBundleItem = (id: string) => {
        setBundle((prev) =>
            prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it))
        );
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0A0A0D] flex items-center justify-center text-white font-mono text-xs space-y-4">
                <Loader2 className="w-8 h-8 text-[#D4FF00] animate-spin" />
            </main>
        );
    }

    const currentProduct = product || {
        id: productId,
        name: "Volt Fleet Performance Model",
        modelCode: "VOLT-PERF-900",
        category: "Electric Fleet",
        badge: "FLAGSHIP",
        rating: 4.9,
        reviewsCount: 142,
        price: 2499,
        originalPrice: 2899,
        stock: 6,
        speed: "45 km/h",
        range: "85 km",
        power: "750W",
        shortDescription: "Ultra-agile electric vehicle engineered for precision urban velocity.",
        description: "Built on aerospace-grade alloy chassis.",
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop",
        gallery: ["https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1200&auto=format&fit=crop"],
        videoUrl: "",
        colors: [{ id: "volt", name: "Acid Lime", hex: "#D4FF00" }],
        batteryVariants: [{ name: "Standard 48V 15Ah", range: "85 km", extraPrice: 0 }],
        features: ["1000W Peak Motor", "Samsung Cells"],
        specifications: [{ label: "Motor Power", value: "750W Nominal" }],
        whatsInTheBox: ["Volt E-Bike", "Fast Charger 4A"],
        warrantyAndShipping: {
            warranty: "2 Years Full Comprehensive Warranty",
            trialPeriod: "30-Day Risk-Free Trial",
            shipping: "Free Express Freight",
            dispatchTime: "Ships within 24 Hours",
        },
    };

    const extraBatteryPrice = selectedBattery?.extraPrice || 0;
    const totalPrice = (currentProduct.price + extraBatteryPrice) * quantity;
    const bundleTotalPrice =
        totalPrice +
        bundle.filter((b) => b.checked).reduce((acc, it) => acc + it.price, 0);

    const handleAddToCart = () => {
        addToCart({
            id: currentProduct.id,
            name: `${currentProduct.name} (${selectedBattery?.name || "Standard"})`,
            modelCode: currentProduct.modelCode || `VOLT-${currentProduct.id.slice(-4)}`,
            category: currentProduct.category || "Electric Fleet",
            price: currentProduct.price + extraBatteryPrice,
            colorName: selectedColor?.name || "Standard",
            colorHex: selectedColor?.hex || "#D4FF00",
            image: currentProduct.image || galleryImages[0],
            quantity: quantity,
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2200);
    };

    const handleAddBundleToCart = () => {
        addToCart({
            id: currentProduct.id,
            name: currentProduct.name,
            modelCode: currentProduct.modelCode || `VOLT-${currentProduct.id.slice(-4)}`,
            category: currentProduct.category || "Electric Fleet",
            price: currentProduct.price + extraBatteryPrice,
            colorName: selectedColor?.name || "Standard",
            colorHex: selectedColor?.hex || "#D4FF00",
            image: currentProduct.image || galleryImages[0],
            quantity: quantity,
        });
        bundle.filter(b => b.checked).forEach(acc => {
            addToCart({
                id: `acc-${acc.id}`,
                name: acc.name,
                modelCode: "ACCESSORY",
                category: "Rider Hardware",
                price: acc.price,
                colorName: "Standard",
                colorHex: "#D4FF00",
                image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=300&auto=format&fit=crop",
                quantity: 1,
            });
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2200);
    };

    return (
        <main className="min-h-screen bg-[#E4E5E8] dark:bg-[#0A0A0D] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 overflow-x-hidden">
            <Header />

            {/* Production Urgency Top Bar */}
            <div className="mt-16 bg-neutral-950 text-white dark:bg-[#121316] border-b border-black/10 dark:border-white/10 py-2.5 px-4">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
                        <span className="font-bold text-[#D4FF00]">PRODUCTION RELEASE:</span>
                        <span>{currentProduct.warrantyAndShipping?.dispatchTime || "Direct factory dispatch available today!"}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-[#D4FF00]" />
                        <span className="text-neutral-400">Order Cutoff:</span>
                        <span className="font-bold text-white tabular-nums">
                            {String(timeLeft.hours).padStart(2, "0")}h :{" "}
                            {String(timeLeft.minutes).padStart(2, "0")}m :{" "}
                            {String(timeLeft.seconds).padStart(2, "0")}s
                        </span>
                    </div>
                </div>
            </div>

            <div className="pt-8 pb-20 px-4 md:px-10 max-w-7xl mx-auto space-y-16">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                    <Link href="/" className="hover:text-black dark:hover:text-white">Home</Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-black dark:hover:text-white">Electric Fleet</Link>
                    <span>/</span>
                    <span className="text-[#8ba800] dark:text-[#D4FF00] font-bold">{currentProduct.name}</span>
                </div>

                {/* Main 2-Column Product Showcase & Buy Box */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <ProductGallery
                        images={galleryImages}
                        activeImageIdx={activeImageIdx}
                        setActiveImageIdx={setActiveImageIdx}
                        productName={currentProduct.name}
                        originalPrice={currentProduct.originalPrice}
                        price={currentProduct.price}
                        badge={currentProduct.badge}
                        videoUrl={currentProduct.videoUrl}
                        warrantyAndShipping={currentProduct.warrantyAndShipping}
                    />

                    <ProductBuyBox
                        name={currentProduct.name}
                        modelCode={currentProduct.modelCode}
                        category={currentProduct.category}
                        badge={currentProduct.badge}
                        rating={currentProduct.rating}
                        reviewsCount={currentProduct.reviewsCount}
                        price={currentProduct.price}
                        originalPrice={currentProduct.originalPrice}
                        stockLeft={currentProduct.stock}
                        speed={currentProduct.speed}
                        range={currentProduct.range}
                        power={currentProduct.power}
                        shortDescription={currentProduct.shortDescription}
                        colors={currentProduct.colors || []}
                        selectedColor={selectedColor}
                        setSelectedColor={handleColorSelect}
                        batteryVariants={currentProduct.batteryVariants || []}
                        selectedBattery={selectedBattery}
                        setSelectedBattery={setSelectedBattery}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        totalPrice={totalPrice}
                        isAdded={isAdded}
                        onAddToCart={handleAddToCart}
                    />
                </div>

                {/* Frequently Bought Together Bundle */}
                <ProductBundle
                    bundle={bundle}
                    toggleBundleItem={toggleBundleItem}
                    bundleTotalPrice={bundleTotalPrice}
                    onAddBundleToCart={handleAddBundleToCart}
                />

                {/* Tabs: Specs, Features, Box, Delivery, Reviews */}
                <ProductTabs
                    description={currentProduct.description}
                    features={currentProduct.features}
                    specifications={currentProduct.specifications}
                    whatsInTheBox={currentProduct.whatsInTheBox}
                    warrantyAndShipping={currentProduct.warrantyAndShipping}
                    reviewsCount={currentProduct.reviewsCount}
                />

                {/* Recommended Products Section */}
                <div className="pt-8 border-t border-black/10 dark:border-white/10">
                    <RecommendedProducts
                        currentProductId={currentProduct.id}
                        title="You May Also Like"
                        subtitle="Compare against our other class-leading urban and all-terrain electric performance bikes."
                        limit={3}
                    />
                </div>
            </div>

            <Footer />
        </main>
    );
}