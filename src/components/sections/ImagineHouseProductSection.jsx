import { Film, Camera, MonitorPlay, Clapperboard } from "lucide-react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

export default function ImagineHouseProductSection() {
  const services = [
    {
      icon: (
        <Camera className="h-10 w-10 text-gray-800 hover:-translate-y-2 transition" />
      ),
      title: "Fotografi",
      description:
        "Jasa fotografi profesional untuk keperluan produk, portrait, dokumentasi event, hingga kebutuhan branding lainnya.",
      linkText: "Lihat layanan fotografi",
      link: "/fotografi",
    },
    {
      icon: (
        <Film className="h-10 w-10 text-gray-800 hover:-translate-y-2 transition" />
      ),
      title: "Video Production",
      description:
        "Produksi video komersial, dokumentasi event, hingga konten digital kreatif yang disesuaikan dengan kebutuhan brand Anda.",
      linkText: "Pelajari layanan video",
      link: "/videoproduction",
    },
    {
      icon: (
        <Clapperboard className="h-10 w-10 text-gray-800 hover:-translate-y-2 transition" />
      ),
      title: "Film Production",
      description:
        "Produksi film pendek, iklan, atau karya sinematik lainnya dari pra-produksi hingga pascaproduksi.",
      linkText: "Eksplorasi film produksi",
      link: "/filmproduction",
    },
  ];

  return (
    <section className="bg-white text-gray-800 py-20 px-6 md:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-2">
          <p className="text-sm font-semibold mb-2 text-gray-600">Layanan</p>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Layanan dari <span className="text-primary"> Imagine House</span>
        </h2>
        <p className="text-gray-500 mb-12 text-lg">
          Kami hadir untuk membantu brand dan organisasi menyampaikan cerita{" "}
          <br /> secara visual dari awal ide hingga hasil akhir yang siap
          tayang.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4">{item.icon}</div>
              <PointerHighlight
                rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 leading-loose"
                pointerClassName="text-primary h-3 w-3"
                containerClassName="inline-block mr-1"
              >
                <h3 className="text-2xl inline m-0 p-0 font-semibold mb-2 relative z-10">
                  {item.title}
                </h3>
              </PointerHighlight>
              <p className="text-gray-600 mb-3 mt-3">{item.description}</p>
              <a
                href={item.link}
                className="text-primary hover:underline font-medium inline-flex items-center"
              >
                {item.linkText}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
