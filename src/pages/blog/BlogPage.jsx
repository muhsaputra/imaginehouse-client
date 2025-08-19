"use client";
import { useEffect } from "react";
import Navbar from "@/components/layout/NavigationBar";
import BreadcrumbSection from "@/components/common/BreadCrumbs";
import BlogSection from "@/components/sections/BlogSection";
import Footer from "@/components/layout/Footer";

export default function BlogPage() {
  useEffect(() => {
    document.title = "Imagine House | Blog";
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* BreadCrumb */}
      <BreadcrumbSection
        title="Blog Kami"
        bgImage="/images/bg2.webp"
        path={[{ name: "Blog", href: "/blog" }]}
      />

      {/* Blog Section */}
      <BlogSection />
      <Footer />
    </>
  );
}
