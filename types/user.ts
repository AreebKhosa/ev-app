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

export interface ProfileOrder {
  id: string;
  date: string;
  product: string;
  total: number;
  status: string;
  trackingNo: string;
  itemsCount?: number;
}

export interface UserProfile {
  user: User;
  telemetry?: UserTelemetry;
  assignedBikeId?: string;
  connectedBikeModel?: string;
}
