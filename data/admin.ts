import { AdminCategory, AdminProduct, AdminOrder, AdminQuery, AdminUser, BankDetails } from "@/types/admin";

export const INITIAL_ADMIN_CATEGORIES: AdminCategory[] = [
  {
    id: "cat-1",
    name: "Urban Commuter",
    slug: "urban",
    description: "Lightweight city mobility engineered for daily commutes and traffic agility.",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=400&auto=format&fit=crop",
    productCount: 4,
  },
  {
    id: "cat-2",
    name: "All-Terrain Beast",
    slug: "off-road",
    description: "Fat-tire rugged suspension systems for mountains, mud, snow, and gravel.",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=400&auto=format&fit=crop",
    productCount: 3,
  },
  {
    id: "cat-3",
    name: "Hyper GT Dual Motor",
    slug: "performance",
    description: "Dual 1000W peak electric motors with top speeds exceeding 75 km/h.",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=400&auto=format&fit=crop",
    productCount: 2,
  },
  {
    id: "cat-4",
    name: "Cargo & Long Haul",
    slug: "cargo",
    description: "Extended payload capacity and dual high-capacity battery systems.",
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=400&auto=format&fit=crop",
    productCount: 1,
  },
];

export const INITIAL_ADMIN_PRODUCTS: AdminProduct[] = [
  {
    id: "prod-1",
    name: "Apex Nomad Pro",
    category: "All-Terrain Beast",
    price: 3299,
    stock: 14,
    speed: "65 km/h",
    range: "120 km",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "prod-2",
    name: "Volt Stealth Alpha",
    category: "Urban Commuter",
    price: 2499,
    stock: 22,
    speed: "45 km/h",
    range: "85 km",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "prod-3",
    name: "CyberTrack GT Dual",
    category: "Hyper GT Dual Motor",
    price: 3899,
    stock: 8,
    speed: "75 km/h",
    range: "140 km",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=400&auto=format&fit=crop",
  },
];

export const INITIAL_ADMIN_ORDERS: AdminOrder[] = [
  {
    id: "ORD-94281",
    customerName: "Alex Vance",
    email: "alex.vance@gmail.com",
    product: "Apex Nomad Pro (750W)",
    total: 3299,
    date: "Today, 14:32",
    status: "In Transit",
  },
  {
    id: "ORD-94280",
    customerName: "Elena Rostova",
    email: "elena.r@zurich.ch",
    product: "Volt Stealth Alpha",
    total: 2499,
    date: "Yesterday",
    status: "Assembled",
  },
  {
    id: "ORD-94279",
    customerName: "David Chen",
    email: "dchen@austin.io",
    product: "CyberTrack GT Dual",
    total: 3899,
    date: "May 18",
    status: "Delivered",
  },
];

export const INITIAL_ADMIN_QUERIES: AdminQuery[] = [
  {
    id: "QRY-101",
    name: "Marcus Aurelius",
    email: "marcus@rome.eu",
    topic: "Enterprise Fleet Inquiry",
    model: "Volt Stealth Alpha",
    message: "Seeking quotation for 25 units for corporate mobility in Berlin office campus.",
    date: "Today, 11:20",
    isResolved: false,
  },
  {
    id: "QRY-102",
    name: "Sarah Jenkins",
    email: "sjenkins@techcorp.com",
    topic: "Test Ride Scheduling",
    model: "Apex Nomad Pro",
    message: "Can I schedule a private test ride at the SF Experience Center this Saturday?",
    date: "Yesterday",
    isResolved: true,
  },
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "USR-01",
    name: "Alex Vance",
    email: "alex.vance@gmail.com",
    tier: "Founding Member",
    vehiclesCount: 2,
    totalSpent: 5798,
    status: "Active",
  },
  {
    id: "USR-02",
    name: "Elena Rostova",
    email: "elena.r@zurich.ch",
    tier: "Pro Velocity",
    vehiclesCount: 1,
    totalSpent: 2499,
    status: "Active",
  },
  {
    id: "USR-03",
    name: "Suspended Test Account",
    email: "flagged.user@botnet.xyz",
    tier: "Standard",
    vehiclesCount: 0,
    totalSpent: 0,
    status: "Suspended",
  },
];

export const INITIAL_ADMIN_BANK: BankDetails = {
  bankName: "Silicon Valley Commercial Bank",
  accountTitle: "Volt Studio Mobility Inc.",
  accountNumberOrIban: "US89 SVBK 0001 2948 5829 01",
  swiftBic: "SVBKUS6SXXX",
  branchAddress: "3003 Tasman Dr, Santa Clara, CA 95054",
  cryptoUsdtAddress: "0x71C2B...9482A (ERC20 / TRC20)",
};
