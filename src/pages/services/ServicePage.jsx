import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/NavigationBar";
import BreadcrumbSection from "@/components/common/BreadCrumbs";
import ImagineHouseProductSection from "@/components/sections/ImagineHouseProductSection";
import { LayoutGridDemo } from "@/components/sections/galleryPortfolio";
import { client } from "@/sanityClient";
import Faqs from "@/components/sections/Faqs";
import Footer from "@/components/layout/Footer";
import SkeletonServicePage from "@/components/common/SkeletonServicePage";
import SkeletonBreadcrumb from "@/components/common/SkeletonBreadcrumb";

export default function ServicePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    document.title = "Imagine House | Layanan";
    // Fetch data dari Sanity
    client
      .fetch(
        `*[_type == "layananpage"][0]{
          title,
          heroImage {
            asset->{
              url
            }
          }
        }`
      )
      .then((res) => setData(res))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Skeleton saat loading
  if (!data)
    return (
      <>
        <SkeletonBreadcrumb />
        <SkeletonServicePage />;
      </>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <BreadcrumbSection
        title={data.title || "Layanan Kami"}
        bgImage={data.heroImage?.asset?.url || "/images/bg5.jpg"}
        path={[{ name: "Layanan", href: "/layanan" }]}
      />

      <main className="bg-white py-14 px-4 sm:px-6 md:px-12 flex-grow">
        <ImagineHouseProductSection />
        <LayoutGridDemo />
        <Faqs />
      </main>

      <Footer />
    </div>
  );
}
