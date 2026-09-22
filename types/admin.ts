export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount?: number;
}

export interface AdminProduct {
  id: string;
  name: string;
  modelCode?: string;
  category: string;
  badge?: string;
  price: number;
  originalPrice?: number;
  stock: number;
  speed?: string;
  range?: string;
  power?: string;
  shortDescription?: string;
  description?: string;
  image: string;
  gallery?: string[];
  videoUrl?: string;
  colors?: { id?: string; name: string; hex: string; image?: string }[];
  batteryVariants?: { name: string; range: string; extraPrice: number }[];
  features?: string[];
  specifications?: { label: string; value: string }[];
  whatsInTheBox?: string[];
  warrantyAndShipping?: {
    warranty?: string;
    trialPeriod?: string;
    shipping?: string;
    dispatchTime?: string;
  };
}

export type AdminOrderStatus = "Pending" | "Assembled" | "In Transit" | "Delivered" | "Cancelled";

export interface AdminOrder {
  id: string;
  customerName: string;
  email: string;
  product: string;
  total: number;
  date: string;
  status: AdminOrderStatus;
}

export interface AdminQuery {
  id: string;
  name: string;
  email: string;
  topic: string;
  model: string;
  message: string;
  date: string;
  isResolved: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  tier: string;
  vehiclesCount: number;
  totalSpent: number;
  status: "Active" | "Suspended";
}

export interface BankDetails {
  bankName: string;
  accountTitle: string;
  accountNumberOrIban: string;
  swiftBic: string;
  branchAddress: string;
  cryptoUsdtAddress: string;
}

export type AdminTab = "overview" | "products" | "categories" | "orders" | "queries" | "users" | "banking";
