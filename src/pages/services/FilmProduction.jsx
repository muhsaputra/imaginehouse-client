import { useState, useEffect } from "react";
import { client } from "@/SanityClient";
import NavigationBar from "@/components/layout/NavigationBar";
import BreadcrumbSection from "@/components/common/BreadCrumbs";
import Loading from "@/components/common/Loading";
import Footer from "@/components/layout/Footer";
import Faqs from "@/components/sections/Faqs";
import {
  FaFilm,
  FaUserFriends,
  FaTheaterMasks,
  FaRegLightbulb,
} from "react-icons/fa";

export default function FilmProduction() {
  const [data, setData] = useState(null);

  const FilmProductionServices = [
    {
      icon: <FaFilm className="text-white text-2xl" />,
      title: "Short Film Production",
      desc: "Produksi film pendek dari pengembangan ide hingga pascaproduksi, dengan kualitas sinematik dan storytelling yang kuat.",
    },
    {
      icon: <FaUserFriends className="text-white text-2xl" />,
      title: "Documentary Film",
      desc: "Pembuatan film dokumenter untuk berbagai topik, dari sosial, budaya, hingga profil tokoh atau komunitas — mengangkat narasi autentik dan berdampak.",
    },
    {
      icon: <FaTheaterMasks className="text-white text-2xl" />,
      title: "Creative Fiction Projects",
      desc: "Kolaborasi kreatif untuk pengembangan dan produksi proyek fiksi seperti drama, thriller, hingga experimental film.",
    },
    {
      icon: <FaRegLightbulb className="text-white text-2xl" />,
      title: "Scriptwriting & Development",
      desc: "Layanan pengembangan ide cerita, penulisan skenario, dan struktur naskah untuk kebutuhan film pendek maupun panjang.",
    },
  ];

  useEffect(() => {
    document.title = "Imagine House | Film Production";
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

  if (!data) return <Loading />;

  return (
    <>
      <NavigationBar />

      <BreadcrumbSection
        title="Film Production"
        bgImage={data.heroImage?.asset?.url || "/images/bg5.jpg"}
        path={[
          { name: "Layanan", href: "/service" },
          { name: "Film Production", href: "/videoproduction" },
        ]}
      />

      <section className="bg-white py-16 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-center font-semibold mb-2 text-gray-600">
            Film Production
          </p>
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Layanan <span className="text-primary">Film Production</span>
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Imagine House siap mendokumentasikan momen terbaik Anda melalui
            layanan Film Production profesional kami.
          </p>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {FilmProductionServices.map((service, index) => (
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
