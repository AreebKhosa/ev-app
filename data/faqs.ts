export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FAQS_DATA: FaqItem[] = [
  {
    id: "faq-1",
    category: "Battery & Charging",
    question: "How long does a full battery charge take and what is its lifespan?",
    answer:
      "Using our HyperCharge 4A fast charger, the battery reaches 80% in just 2 hours and 100% in 3.5 hours. Our automotive-grade 21700 lithium cells maintain over 85% original capacity even after 1,000 full charge cycles (approx. 3-5 years of daily riding).",
  },
  {
    id: "faq-2",
    category: "Weather & Terrain",
    question: "Can I ride in heavy rain, mud, and extreme cold temperatures?",
    answer:
      "Yes. The entire powertrain, motor, display, and battery pack are IP67 weather-sealed against heavy rain, mud splashes, and dust. The intelligent Battery Management System (BMS) includes low-temperature thermal monitoring to ensure stable output down to -15°C.",
  },
  {
    id: "faq-3",
    category: "Street Legality",
    question: "Is a driver's license or vehicle registration required?",
    answer:
      "In most jurisdictions, our Urban Series models (capped at 25–32 km/h assist) are classified as standard electric bicycles with no license or registration required. Our high-power Hyper GT models include an Off-Road Mode switch for track/private land use.",
  },
  {
    id: "faq-4",
    category: "Warranty & Support",
    question: "What does the 3-Year Volt Armor warranty cover?",
    answer:
      "Our comprehensive warranty covers the frame, motor, battery pack, suspension, and digital display for 3 full years. We also provide worldwide door-to-door replacement parts and 24/7 telemetry support through our companion app.",
  },
  {
    id: "faq-5",
    category: "Delivery & Setup",
    question: "How does home delivery work, and is assembly difficult?",
    answer:
      "Every bike is shipped 90% pre-assembled in an eco-friendly reinforced flight crate. You only need to attach the handlebars, front wheel, and pedals using the custom titanium multi-tool kit included in the box (takes ~15 minutes).",
  },
];
