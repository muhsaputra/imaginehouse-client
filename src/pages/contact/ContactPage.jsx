import React from "react";
import Navbar from "@/components/layout/NavigationBar";
import BreadcrumbSection from "@/components/common/BreadCrumbs";
import { client } from "@/sanityClient";
import { useState, useEffect } from "react";
import Faqs from "@/components/sections/Faqs";
import Footer from "@/components/layout/Footer";
import Loading from "@/components/common/Loading";
import SkeletonBreadcrumb from "@/components/common/SkeletonBreadcrumb";

export default function ContactPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    document.title = "Imagine House | Kontak";

    client
      .fetch(
        `*[_type == "contactpage"][0]{
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
        <SkeletonBreadcrumb />
      </>
    );

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Breadcrumb */}
      <BreadcrumbSection
        title={data?.title || "Hubungi Kami"}
        bgImage={data?.heroImage?.asset?.url || "/images/bg2.jpg"}
        path={[{ name: "Kontak", href: "/contact" }]}
      />

      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-2">
            <p className="text-sm font-semibold mb-2 text-gray-600">
              Kontak Kami
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Hubungi <span className="text-primary">Imagine House</span>
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Silakan hubungi kami untuk pertanyaan, kerjasama, atau informasi
            lebih lanjut. Tim kami siap membantu Anda!
          </p>

          {/* 3 kolom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Sales */}
            <div className="border rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Project & Sales
              </h4>
              <p className="text-gray-600 mb-4">
                Tertarik bekerja sama atau butuh penawaran? Hubungi tim kami.
              </p>
              <a
                href="mailto:imaginehouseoperations@gmail.com"
                className="text-primary font-medium hover:underline"
              >
                Kirim Email
              </a>
            </div>

            {/* Support */}
            <div className="border rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Support
              </h4>
              <p className="text-gray-600 mb-4">
                Butuh bantuan teknis, pertanyaan layanan, atau konsultasi?
              </p>
              <a
                href="https://wa.me/6287884456638"
                className="text-primary font-medium hover:underline"
              >
                Hubungi Support
              </a>
            </div>

            {/* General Inquiries */}
            <div className="border rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Pertanyaan Umum
              </h4>
              <p className="text-gray-600 mb-4">
                Untuk pertanyaan umum, silakan hubungi kami melalui WhatsApp.
              </p>
              <a
                href="https://wa.me/6287884456638"
                className="text-primary font-medium hover:underline"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Maps */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.93243547921446!2d106.15762706146458!3d-6.141587016416461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e418ace1e1c5373%3A0x848bbc78cdb2bc56!2sGriya%20Permata%20Asri!5e0!3m2!1sid!2sid!4v1753787348656!5m2!1sid!2sid"
              width="100%"
              height="400"
              style={{ border: 0 }} // ✅ style pakai object
              allowFullScreen="" // ✅ prop boolean
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" // ✅ camelCase
            ></iframe>
          </div>
        </div>
      </section>
      <Faqs />
      <Footer />
    </>
  );
}
