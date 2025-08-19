import "@/index.css";

// Components
import { useEffect } from "react";
import { LayoutGridDemo } from "@/components/sections/galleryPortfolio";
import { HeroSectionOne } from "@/components/sections/Hero";
import Fitures from "@/components/sections/Fitures";
import Navbar from "@/components/layout/NavigationBar";
import WhoAreWe from "@/components/sections/WhoAreWe";
import AnimatedTestimonialsDemo from "@/components/sections/Testimonials";
import Faqs from "@/components/sections/Faqs";
import Footer from "@/components/layout/Footer";
import BlogSection from "@/components/sections/BlogSection";

export default function Home() {
  useEffect(() => {
    document.title = "Imagine House | Rumahnya Cerita Visual Kamu";
  }, []);

  return (
    <div className="">
      {/* Navigasi utama */}
      <Navbar>
        <div className="w-full"></div>
      </Navbar>

      {/* Hero Section dengan background dinamis */}
      <HeroSectionOne />

      {/* Sekilas tentang Imagine House */}
      <WhoAreWe />

      {/* Galeri portofolio dengan layout grid modern */}
      <LayoutGridDemo />

      {/* Fitur layanan kami */}
      <Fitures />

      {/* Testimoni klien */}
      <AnimatedTestimonialsDemo />

      {/* Blog Section */}
      <BlogSection />

      {/* Pertanyaan yang sering diajukan */}
      <Faqs />

      {/* Footer */}
      <Footer />
    </div>
  );
}
