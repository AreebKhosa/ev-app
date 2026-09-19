export interface AdminProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  speed: string;
  range: string;
  image: string;
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

export type AdminTab = "overview" | "products" | "orders" | "queries" | "users" | "banking";
