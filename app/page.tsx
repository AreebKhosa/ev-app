import { Gauge, BatteryCharging, Zap } from "lucide-react";
import { Header } from "@/components/layout/header";
import { SocialBar } from "@/components/layout/social-bar";
import { HeroSection } from "@/components/home/hero-section";
import { CategorySection } from "@/components/home/category-section";
import { EvSpecsSection } from "@/components/home/ev-specs-section";
import { ProductGrid } from "@/components/products/product-grid";
import { FaqSection } from "@/components/home/faq-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { PartnersSection } from "@/components/home/partners-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#E4E5E8] dark:bg-[#0A0A0D] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">

      {/* Existing Header */}
      <Header />

      {/* Floating Right Social Bar */}
      <SocialBar />

      {/* Scroll-Driven Pinned Hero Section */}
      <HeroSection
        framesPath="/frames/frame_"
        framesCount={100}          // ← apna number daalo
        framesExtension="jpg"
        framePadding={4}
        mediaAlt="E-Bike"
        titleTop="Future of"
        titleBottom="E-Bike"
        leftDescription="E-bike technology combines advanced electric motor systems, lightweight batteries, and smart controls to enhance cycling efficiency."
        rightDescription="Powered by innovation, motor technology with dynamic energy management."
        ctaText="Explore Bike"
        mediaSrc="/3.mp4"
      />

      {/* Section 2: 2 Category Cards Section */}
      <CategorySection
        tag="Our Fleet"
        heading="Find Your Perfect Ride"
        subheading="From city streets to mountain peaks."
        categories={[
          {
            id: "urban",
            badge: "City",
            title: "Urban Glide",
            subtitle: "Lightweight",
            description: "...",
            image: "/hero-ebike.jpg",
            href: "/urban",
            accentColor: "#D4FF00",
            specs: [
              { icon: <Gauge className="w-3.5 h-3.5" />, label: "Speed", value: "45 km/h" },
              { icon: <BatteryCharging className="w-3.5 h-3.5" />, label: "Range", value: "85 km" },
              { icon: <Zap className="w-3.5 h-3.5" />, label: "Motor", value: "500W" },
            ],
          },
          // ... jitni chaaho
          {
            id: "cruiser",
            badge: "City",
            title: "Urban Glide",
            subtitle: "Lightweight",
            description: "...",
            image: "/hero-ebike.jpg",
            href: "/urban",
            accentColor: "#D4FF00",
            specs: [
              { icon: <Gauge className="w-3.5 h-3.5" />, label: "Speed", value: "45 km/h" },
              { icon: <BatteryCharging className="w-3.5 h-3.5" />, label: "Range", value: "85 km" },
              { icon: <Zap className="w-3.5 h-3.5" />, label: "Motor", value: "500W" },
            ],
          },

        ]}
      />
      <EvSpecsSection
        bikeImage="/frame_0087.jpg"
      />
      <ProductGrid />

      {/* 7. Scroll-Reactive FAQ Section */}
      <FaqSection />

      {/* 8. Dual Parallax Testimonials Stream */}
      <TestimonialsSection />

      {/* 7. Technology Partners */}
      <PartnersSection />

      {/* 8. Studio Footer */}
      <Footer />
    </main>

  );
}