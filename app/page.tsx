import { Header } from "@/components/layout/header";
import { SocialBar } from "@/components/layout/social-bar";
import { HeroSection } from "@/components/home/hero-section";
import { CategorySection } from "@/components/home/category-section";
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
        framesCount={100}
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

      {/* Real Live Categories from Backend */}
      <CategorySection
        tag="Fleet Architecture"
        heading="Find Your Perfect Vehicle Segment"
        subheading="Engineered platforms tailored for high-speed urban agility, long-range endurance, and rugged all-terrain exploration."
      />

      {/* Real Live Products from Backend */}
      <ProductGrid />

      {/* Scroll-Reactive FAQ Section */}
      <FaqSection />

      {/* Dual Parallax Testimonials Stream */}
      <TestimonialsSection />

      {/* Technology Partners */}
      <PartnersSection />

      {/* Studio Footer */}
      <Footer />
    </main>
  );
}