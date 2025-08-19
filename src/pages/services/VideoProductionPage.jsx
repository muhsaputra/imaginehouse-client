import { useState, useEffect } from "react";
import { client } from "@/SanityClient";
import NavigationBar from "@/components/layout/NavigationBar";
import BreadcrumbSection from "@/components/common/BreadCrumbs";
import Loading from "@/components/common/Loading";
import Footer from "@/components/layout/Footer";
import Faqs from "@/components/sections/Faqs";
import {
  FaVideo,
  FaBullhorn,
  FaUsers,
  FaBuilding,
  FaChalkboardTeacher,
} from "react-icons/fa";

export default function VideoProductionPage() {
  const [data, setData] = useState(null);

  const VideographyServices = [
    {
      icon: <FaBullhorn className="text-white text-2xl" />,
      title: "Commercial & Brand Video",
      desc: "Produksi video iklan dan konten brand untuk keperluan promosi digital, campaign marketing, atau iklan televisi, dengan storytelling yang kuat dan visual yang menarik.",
    },
    {
      icon: <FaUsers className="text-white text-2xl" />,
      title: "Event Documentation",
      desc: "Video dokumentasi acara formal maupun nonformal seperti seminar, konser, workshop, atau peluncuran produk — ditangkap secara dinamis dan sinematik.",
    },
    {
      icon: <FaBuilding className="text-white text-2xl" />,
      title: "Company Profile Video",
      desc: "Pembuatan video profil perusahaan untuk membangun citra profesional di hadapan klien, investor, atau mitra bisnis.",
    },
    {
      icon: <FaVideo className="text-white text-2xl" />,
      title: "Social Media Content",
      desc: "Video pendek untuk platform seperti Instagram, TikTok, dan YouTube Shorts — dirancang agar engaging, on-brand, dan sesuai tren.",
    },
  ];

  useEffect(() => {
    document.title = "Imagine House | Video Production";
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
      <NavigationBar />

      <BreadcrumbSection
        title="Video Production"
        bgImage={data.heroImage?.asset?.url || "/images/bg5.jpg"}
        path={[
          { name: "Layanan", href: "/service" },
          { name: "Video Production", href: "/videoproduction" },
        ]}
      />
      <section className="bg-white py-16 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-center font-semibold mb-2 text-gray-600">
            Video Production
          </p>
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Layanan <span className="text-primary">Video Production</span>
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Imagine House siap mendokumentasikan momen terbaik Anda melalui
            layanan Video Production profesional kami.
          </p>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {VideographyServices.map((service, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-primary p-4 rounded-full flex items-center justify-center">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Faqs />
      <Footer />
    </>
  );
}
