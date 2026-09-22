export interface User {
  id: string;
  name: string;
  handle?: string;
  email: string;
  avatar?: string;
  role: "user" | "customer" | "admin" | "USER" | "ADMIN" | string;
  phone?: string;
  tier?: string;
  shippingAddress?: string;
  memberSince: string;
  joined?: string;
  stats?: {
    totalKm: string;
    co2Saved: string;
    ridesCount: number;
    avgBatteryHealth: string;
  };
}

export interface UserTelemetry {
  totalDistanceKm: number;
  topSpeedKmH: number;
  batteryHealthPct: number;
  co2SavedKg: number;
  ridesCompleted: number;
  avgEfficiencyWhKm: number;
}

export interface OwnedVehicle {
  id: string;
  name: string;
  modelCode: string;
  vin: string;
  colorName: string;
  colorHex: string;
  batteryLevel: number;
  rangeKm: number;
  firmware: string;
  isLocked: boolean;
  lastLocation: string;
  image: string;
}

export interface ProfileOrderItem {
  id?: string;
  productId?: string | null;
  name: string;
  colorName?: string;
  price: number;
  quantity: number;
  product?: {
    id?: string;
    name?: string;
    modelCode?: string;
    image?: string;
    speed?: string;
    range?: string;
    power?: string;
  } | null;
}

export interface ProfileOrder {
  id: string;
  orderNumber?: string;
  date: string;
  product: string;
  subtotal?: number;
  discountAmount?: number;
  tax?: number;
  total: number;
  status: string;
  rawStatus?: string;
  trackingNo: string;
  itemsCount?: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  senderAccountName?: string;
  transactionRef?: string;
  receiptFileUrl?: string;
  items?: ProfileOrderItem[];
}

export interface UserProfile {
  user: User;
  telemetry?: UserTelemetry;
  assignedBikeId?: string;
  connectedBikeModel?: string;
}
