import { AdminProduct, AdminOrder, AdminQuery, AdminUser, BankDetails } from "@/types/admin";

export const INITIAL_ADMIN_PRODUCTS: AdminProduct[] = [
  {
    id: "prod-1",
    name: "Apex Nomad Pro",
    category: "All-Terrain",
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
    category: "Hyper GT",
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
    date: "May 12, 2025",
    status: "Delivered",
  },
];

export const INITIAL_ADMIN_QUERIES: AdminQuery[] = [
  {
    id: "qry-1",
    name: "Sarah Jenkins",
    email: "sarah.j@techcorp.com",
    topic: "Fleet & B2B Orders",
    model: "Apex Nomad 750",
    message: "We are looking to order 15 units for our corporate campus in Seattle. Can we get custom branding on the downtube?",
    date: "10 mins ago",
    isResolved: false,
  },
  {
    id: "qry-2",
    name: "Michael Brandt",
    email: "m.brandt@gmail.com",
    topic: "Book a Test Ride",
    model: "Volt Stealth Alpha",
    message: "Would love to book a test ride at the Berlin Showroom next Tuesday at 14:00.",
    date: "2 hours ago",
    isResolved: true,
  },
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "usr-1",
    name: "Alex Vance",
    email: "alex.vance@voltstudio.com",
    tier: "Titanium VIP",
    vehiclesCount: 2,
    totalSpent: 5798,
    status: "Active",
  },
  {
    id: "usr-2",
    name: "Sophie Miller",
    email: "sophie.m@berlin.de",
    tier: "Gold Rider",
    vehiclesCount: 1,
    totalSpent: 2499,
    status: "Active",
  },
];

export const INITIAL_ADMIN_BANK: BankDetails = {
  bankName: "Silicon Valley Commercial Bank",
  accountTitle: "Volt Studio Mobility Inc.",
  accountNumberOrIban: "US89 SVBK 0001 2948 5829 01",
  swiftBic: "SVBKUS6SXXX",
  branchAddress: "3003 Tasman Dr, Santa Clara, CA 95054",
  cryptoUsdtAddress: "0x71C...8942A (ERC20 / TRC20)",
};
