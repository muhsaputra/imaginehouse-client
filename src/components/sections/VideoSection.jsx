// src/components/Portfolio/VideoSection.jsx
import { useState } from "react";
import { Play } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Jangan Matikan Lampu",
    category: "Short Movie",
    thumbnail: "https://img.youtube.com/vi/sdzk_Kcjs_0/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=sdzk_Kcjs_0",
  },
  {
    id: 2,
    title: "FFBAN 2022 'PERCANTEN'",
    category: "Short Movie",
    thumbnail: "https://img.youtube.com/vi/UI1JRkwxYg8/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
  {
    id: 3,
    title: "TIGA KATA | JUARA 3 FILM PAHLAWAN MASA KINI",
    category: "Short Movie",
    thumbnail: "https://img.youtube.com/vi/iqq__wqi4IA/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "BTS Perpisahan SMKN 1 Kota Serang",
    category: "Documentary",
    thumbnail: "https://img.youtube.com/vi/aj_l_pZZ4pc/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=aj_l_pZZ4pc",
  },
  {
    id: 4,
    title: "TULAH NGANJI | JUARA 1 NOMINASI PELAJAR | FFBAN 2023",
    category: "Short Film",
    thumbnail: "https://img.youtube.com/vi/tLuy90iSpUQ/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=tLuy90iSpUQ",
  },
];

export default function VideoSection() {
  const [visibleCount, setVisibleCount] = useState(6); // tampilkan 6 video awal

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3); // tambah 3 setiap klik
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <h2 className="max-w-7xl mb-12 pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          <div className="mb-2">
            <p className="text-sm font-semibold mb-2 text-gray-600">
              Portfolio Video Kami
            </p>
          </div>
          Jelajahi Karya <span className="text-primary">Kreatif Kami</span>
        </h2>

        {/* Grid Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.slice(0, visibleCount).map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Overlay Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-4 opacity-0 group-hover:opacity-100 transition">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Info text di bawah (overlay mirip PhotoSection) */}
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm">{video.category}</p>
                <h3 className="text-lg font-semibold">{video.title}</h3>
              </div>
              {/* Overlay gelap untuk readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </a>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < videos.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-primary text-white rounded-xl shadow-md hover:bg-primary/90 transition"
            >
              Lihat Selanjutnya
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
