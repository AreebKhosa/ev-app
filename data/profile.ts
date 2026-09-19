import { User, OwnedVehicle, ProfileOrder } from "@/types/user";

export const USER_PROFILE_DATA: User = {
  id: "usr-01",
  name: "Alex Vance",
  handle: "@alex_vance",
  email: "alex.vance@voltstudio.com",
  phone: "+1 (415) 865-9201",
  tier: "Titanium VIP Rider",
  memberSince: "March 2024",
  joined: "March 2024",
  role: "rider",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
  stats: {
    totalKm: "2,840",
    co2Saved: "482 kg",
    ridesCount: 142,
    avgBatteryHealth: "99%",
  },
};

export const OWNED_VEHICLES_DATA: OwnedVehicle[] = [
  {
    id: "veh-1",
    name: "Apex Nomad Pro",
    modelCode: "VOLT (750-GT)",
    vin: "VT-9028-APEX",
    colorName: "Acid Lime Finish",
    colorHex: "#D4FF00",
    batteryLevel: 84,
    rangeKm: 92,
    firmware: "v2.4.1 (Latest)",
    isLocked: true,
    lastLocation: "Downtown Garage, San Francisco",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "veh-2",
    name: "Volt Stealth Alpha",
    modelCode: "VOLT (500-URBAN)",
    vin: "VT-5541-STLT",
    colorName: "Matte Black",
    colorHex: "#1A1A1E",
    batteryLevel: 100,
    rangeKm: 85,
    firmware: "v2.4.1 (Latest)",
    isLocked: true,
    lastLocation: "Studio Residence",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop",
  },
];

export const ORDER_HISTORY_DATA: ProfileOrder[] = [
  {
    id: "ORD-94281",
    date: "May 14, 2025",
    product: "Apex Nomad Pro (750W)",
    total: 3299.0,
    status: "In Transit",
    trackingNo: "FEDEX-88912903",
    itemsCount: 1,
  },
  {
    id: "ORD-82019",
    date: "January 10, 2025",
    product: "Volt Stealth Alpha + Fast Charger",
    total: 2688.0,
    status: "Delivered",
    trackingNo: "DHL-44019283",
    itemsCount: 2,
  },
];
