export interface User {
  id: string;
  name: string;
  handle?: string;
  email: string;
  avatar?: string;
  role: "rider" | "admin";
  phone?: string;
  tier?: string;
  memberSince: string;
  joined?: string;
  stats?: {
    totalKm: string;
    co2Saved: string;
    ridesCount: number;
    avgBatteryHealth: string;
  };
}

export interface RiderTelemetry {
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
  itemsCount: number;
}

export interface RiderProfile {
  user: User;
  telemetry: RiderTelemetry;
  assignedBikeId?: string;
  connectedBikeModel?: string;
}
