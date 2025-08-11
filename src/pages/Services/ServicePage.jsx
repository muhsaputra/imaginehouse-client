import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/NavigationBar";
import BreadcrumbSection from "@/components/common/BreadCrumbs";
import ImagineHouseProductSection from "@/components/sections/ImagineHouseProductSection";
import { LayoutGridDemo } from "@/components/sections/galleryPortfolio";
import { client } from "@/sanityClient";
import Faqs from "@/components/sections/Faqs";
import Footer from "@/components/layout/Footer";
import Loading from "@/components/common/Loading";

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
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  if (!data)
    return (
      <>
        <Loading />
      </>
    );
  return (
    <>
      <Navbar />
      <BreadcrumbSection
        title={data.title || "Layanan Kami"}
        bgImage={data.heroImage?.asset?.url || "/images/bg5.jpg"}
        path={[{ name: "Layanan", href: "/layanan" }]}
      />

      <section className="bg-white py-14 px-4">
        <ImagineHouseProductSection />
        <LayoutGridDemo />
        <Faqs />
      </section>
      <Footer />
    </>
  );
}
