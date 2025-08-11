import { useState, useEffect } from "react";
import { client } from "@/sanityClient";
import NavigationBar from "@/components/layout/NavigationBar";
import BreadcrumbSection from "@/components/common/BreadCrumbs";
import Loading from "@/components/common/Loading";
import Footer from "@/components/layout/Footer";
import Faqs from "@/components/sections/Faqs";
import {
  FaCameraRetro,
  FaUsers,
  FaBox,
  FaRegCalendarAlt,
  FaRing,
  FaTshirt,
} from "react-icons/fa";

export default function FotografiPage() {
  const [data, setData] = useState(null);

  const photographyServices = [
    {
      icon: <FaUsers className="text-white text-2xl" />,
      title: "Dokumentasi Acara",
      desc: "Mengabadikan setiap momen penting dalam acara formal maupun informal, dengan pendekatan sinematik dan storytelling visual.",
    },
    {
      icon: <FaRegCalendarAlt className="text-white text-2xl" />,
      title: "Foto Event",
      desc: "Menawarkan dokumentasi event secara dinamis dan estetik, mulai dari konser, peluncuran produk hingga gathering komunitas.",
    },
    {
      icon: <FaRing className="text-white text-2xl" />,
      title: "Prewedding",
      desc: "Ciptakan kisah cinta Anda dalam bingkai visual yang emosional dan berkelas, baik di dalam studio maupun konsep outdoor yang sesuai dengan kepribadian pasangan.",
    },
    {
      icon: <FaBox className="text-white text-2xl" />,
      title: "Fotografi Produk",
      desc: "Menampilkan keunggulan produk Anda melalui visual yang bersih, tajam, dan menarik untuk kebutuhan komersial dan promosi.",
    },
    {
      icon: <FaTshirt className="text-white text-2xl" />,
      title: "Fashion Shoot",
      desc: "Layanan pemotretan khusus fashion, katalog brand, dan koleksi visual, dengan penataan gaya dan estetika profesional yang sesuai dengan identitas visual klien.",
    },
    {
      icon: <FaCameraRetro className="text-white text-2xl" />,
      title: "Proyek Khusus",
      desc: "Solusi fotografi fleksibel dan kolaboratif untuk kebutuhan visual yang tidak umum — dikurasi khusus sesuai karakter dan tujuan proyek Anda.",
    },
  ];

  useEffect(() => {
    document.title = "Imagine House | Fotografi";
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
        title="Fotografi"
        bgImage={data.heroImage?.asset?.url || "/images/bg5.jpg"}
        path={[
          { name: "Layanan", href: "/service" },
          { name: "Fotografi", href: "/fotografi" },
        ]}
      />
      <section className="bg-white py-16 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-center font-semibold mb-2 text-gray-600">
            Fotografi
          </p>
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Layanan <span className="text-primary">Fotografi</span>
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Imagine House siap mendokumentasikan momen terbaik Anda melalui
            layanan fotografi profesional kami.
          </p>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {photographyServices.map((service, index) => (
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
