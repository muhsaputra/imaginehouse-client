import { useEffect, useState } from "react";
import { client } from "@/SanityClient";
import Navbar from "@/components/layout/NavigationBar";
import BreadcrumbSection from "@/components/common/BreadCrumbs";
import Fitures from "@/components/sections/Fitures";
import Faqs from "@/components/sections/Faqs";
import Footer from "@/components/layout/Footer";
import SkeletonAbout from "@/components/common/SkeletonAbout";
import SkeletonBreadcrumb from "@/components/common/SkeletonBreadcrumb";

export default function AboutPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    document.title = "Imagine House | Tentang";
  }, []);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "aboutPage"][0]{
          title,
          subtitle,
          description,
          heroImage {
            asset->{url}
          },
          images[]{
            asset->{url}
          }
        }`
      )
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.error("Sanity fetch error:", err));
  }, []);

  // Loading state pakai skeleton
  if (!data) {
    return (
      <>
        <Navbar />
        <SkeletonBreadcrumb />
        <SkeletonAbout />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Breadcrumb image dari Sanity */}
      <BreadcrumbSection
        title="Tentang Kami"
        bgImage={data.heroImage?.asset?.url || "/images/bg5.jpg"}
        path={[{ name: "Tentang", href: "/about" }]}
      />

      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <p className="text-xs sm:text-sm font-semibold mb-2 text-gray-600">
              {data.subtitle}
            </p>
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white">
              Kami hadir untuk wujudkan{" "}
              <span className="text-primary">imajinasi Anda</span>
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              {data.description
                ?.split("\n")
                .filter((p) => p.trim() !== "")
                .map((p, idx) => (
                  <p key={idx} className="text-justify">
                    {p}
                  </p>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 w-full max-w-3xl">
            {data.images?.map((img, idx) => (
              <div
                key={idx}
                className={`w-full h-64 sm:h-64 md:h-72 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ${
                  idx === 1 ? "sm:mt-6" : ""
                }`}
              >
                <img
                  className="w-full h-full object-cover"
                  src={img.asset?.url}
                  alt={`about-${idx}`}
                />
              </div>
            ))}
          </div>
        </div>

        <Fitures />

        <Faqs />
      </section>
      <Footer />
    </>
  );
}
