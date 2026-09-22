"use client";

import React, { useState, useEffect } from "react";
import { CheckoutHeader } from "@/components/checkout/checkout-header";
import { CheckoutShippingStep, ShippingFormData } from "@/components/checkout/checkout-shipping-step";
import { CheckoutBankStep, BankDetails } from "@/components/checkout/checkout-bank-step";
import { CheckoutReceiptStep, CheckoutOrderItem } from "@/components/checkout/checkout-receipt-step";
import { CheckoutOrderSummary } from "@/components/checkout/checkout-order-summary";
import { useCart } from "@/context/cart-context";
import { api } from "@/services/api";

const DEFAULT_ORDER_ITEMS: CheckoutOrderItem[] = [
    {
        id: "apex-nomad-750",
        name: "Volt Apex Nomad Pro 750W",
        color: "Acid Lime Finish",
        price: 3299,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=400&auto=format&fit=crop",
    },
];

const INITIAL_BANK_DETAILS: BankDetails = {
    bankName: "Silicon Valley Commercial Bank",
    accountTitle: "Volt Studio Mobility Inc.",
    accountNumber: "US89 SVBK 0001 2948 5829 01",
    swiftBic: "SVBKUS6SXXX",
    usdtAddress: "0x71C2B...9482A (ERC20 / TRC20)",
};

export default function CheckoutPage() {
    const { items: cartItems, clearCart } = useCart();
    const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Shipping, 2: Bank & Upload, 3: Success Receipt
    const [orderId] = useState(`VT-${Math.floor(100000 + Math.random() * 900000)}`);
    const [bankDetails, setBankDetails] = useState<BankDetails>(INITIAL_BANK_DETAILS);

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<any>(null);

    // Form State
    const [shippingData, setShippingData] = useState<ShippingFormData>({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        postalCode: "",
        country: "United States",
        phone: "",
    });

    // Bank & Receipt State
    const [senderAccountName, setSenderAccountName] = useState("");
    const [transactionRef, setTransactionRef] = useState("");
    const [receiptFile, setReceiptFile] = useState<File | null>(null);
    const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

    // Promo Code State
    const [promoCode, setPromoCode] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);

    // Check user authentication and pre-fill details
    useEffect(() => {
        const token = localStorage.getItem("volt_auth_token");
        const storedUserStr = localStorage.getItem("volt_user");

        if (token) {
            setIsAuthenticated(true);
            if (storedUserStr) {
                try {
                    const parsedUser = JSON.parse(storedUserStr);
                    setCurrentUser(parsedUser);

                    const nameParts = (parsedUser.name || "").split(" ");
                    setShippingData((prev) => ({
                        ...prev,
                        email: prev.email || parsedUser.email || "",
                        firstName: prev.firstName || nameParts[0] || "",
                        lastName: prev.lastName || nameParts.slice(1).join(" ") || "",
                        phone: prev.phone || parsedUser.phone || "",
                        address: prev.address || parsedUser.shippingAddress || "",
                    }));
                } catch (e) {
                    console.error("Failed to parse stored user", e);
                }
            }

            // Also refresh profile from backend if available
            api.auth.getProfile().then((res) => {
                if (res.data) {
                    setCurrentUser(res.data);
                    const nameParts = (res.data.name || "").split(" ");
                    setShippingData((prev) => ({
                        ...prev,
                        email: prev.email || res.data.email || "",
                        firstName: prev.firstName || nameParts[0] || "",
                        lastName: prev.lastName || nameParts.slice(1).join(" ") || "",
                        phone: prev.phone || res.data.phone || "",
                        address: prev.address || res.data.shippingAddress || "",
                    }));
                }
            }).catch(() => {});
        }
    }, []);

    // Fetch Corporate Bank Details from Backend on mount
    useEffect(() => {
        api.admin.getBankDetails().then((res) => {
            if (res.data) {
                setBankDetails({
                    bankName: res.data.bankName || INITIAL_BANK_DETAILS.bankName,
                    accountTitle: res.data.accountTitle || INITIAL_BANK_DETAILS.accountTitle,
                    accountNumber: res.data.accountNumberOrIban || INITIAL_BANK_DETAILS.accountNumber,
                    swiftBic: res.data.swiftBic || INITIAL_BANK_DETAILS.swiftBic,
                    usdtAddress: res.data.cryptoUsdtAddress || INITIAL_BANK_DETAILS.usdtAddress,
                });
            }
        });
    }, []);

    // Order items from cart or fallback
    const orderItems: CheckoutOrderItem[] = cartItems.length > 0
        ? cartItems.map((it) => ({
            id: it.id,
            name: it.name,
            color: it.colorName,
            price: it.price + (it.hasArmorCare ? 199 : 0),
            quantity: it.quantity,
            image: it.image,
        }))
        : DEFAULT_ORDER_ITEMS;

    // Totals Calculation
    const subtotal = orderItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
    const discountAmount = (subtotal * discountPercent) / 100;
    const tax = (subtotal - discountAmount) * 0.08;
    const totalDue = subtotal - discountAmount + tax;

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setReceiptFile(file);
            setReceiptPreview(URL.createObjectURL(file));
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleApplyPromo = () => {
        if (promoCode.trim().toUpperCase() === "VOLT10") {
            setDiscountPercent(10);
        }
    };

    const handleCompleteOrder = async () => {
        // Send order and receipt to Backend API
        if (receiptFile) {
            const formData = new FormData();
            formData.append("orderNumber", orderId);
            formData.append("customerName", `${shippingData.firstName} ${shippingData.lastName}`.trim());
            formData.append("customerEmail", shippingData.email);
            formData.append("customerPhone", shippingData.phone);
            formData.append("shippingAddress", shippingData.address);
            formData.append("city", shippingData.city);
            formData.append("postalCode", shippingData.postalCode);
            formData.append("country", shippingData.country);
            formData.append("subtotal", String(subtotal));
            formData.append("discountAmount", String(discountAmount));
            formData.append("tax", String(tax));
            formData.append("totalDue", String(totalDue));
            formData.append("senderAccountName", senderAccountName);
            formData.append("transactionRef", transactionRef);
            formData.append("receipt", receiptFile);
            formData.append("items", JSON.stringify(orderItems));

            await api.orders.checkout(formData);
        }

        setStep(3);
        // Clear global cart after placing order
        if (cartItems.length > 0) {
            clearCart();
        }
    };

    return (
        <main className="min-h-screen bg-[#E4E5E8] dark:bg-[#0A0A0D] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
            {/* Top Checkout Header */}
            <CheckoutHeader step={step} />

            <div className="max-w-7xl mx-auto px-4 md:px-10 py-8 md:py-12">
                {step === 3 ? (
                    /* Step 3: Success & Printable Receipt */
                    <CheckoutReceiptStep
                        orderId={orderId}
                        shippingData={shippingData}
                        orderItems={orderItems}
                        subtotal={subtotal}
                        tax={tax}
                        totalDue={totalDue}
                        senderAccountName={senderAccountName}
                        transactionRef={transactionRef}
                        receiptFile={receiptFile}
                        receiptPreview={receiptPreview}
                        onPrint={handlePrint}
                    />
                ) : (
                    /* Step 1 & 2: 2-Column Checkout Layout */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        {/* Left Column: Multi-Step Forms */}
                        <div className="lg:col-span-7 space-y-8">
                            {step === 1 && (
                                <CheckoutShippingStep
                                    shippingData={shippingData}
                                    setShippingData={setShippingData}
                                    onContinue={() => setStep(2)}
                                    isAuthenticated={isAuthenticated}
                                    currentUser={currentUser}
                                />
                            )}

                            {step === 2 && (
                                <CheckoutBankStep
                                    orderId={orderId}
                                    totalDue={totalDue}
                                    bankDetails={bankDetails}
                                    senderAccountName={senderAccountName}
                                    setSenderAccountName={setSenderAccountName}
                                    transactionRef={transactionRef}
                                    setTransactionRef={setTransactionRef}
                                    receiptFile={receiptFile}
                                    onFileUpload={handleFileUpload}
                                    onBack={() => setStep(1)}
                                    onCompleteOrder={handleCompleteOrder}
                                />
                            )}
                        </div>

                        {/* Right Column: Sticky Order Summary */}
                        <CheckoutOrderSummary
                            items={orderItems}
                            subtotal={subtotal}
                            discountPercent={discountPercent}
                            discountAmount={discountAmount}
                            tax={tax}
                            totalDue={totalDue}
                            promoCode={promoCode}
                            setPromoCode={setPromoCode}
                            onApplyPromo={handleApplyPromo}
                        />
                    </div>
                )}
            </div>
        </main>
    );
}
