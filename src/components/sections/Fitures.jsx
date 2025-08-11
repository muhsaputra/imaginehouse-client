import { Camera, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/common/PageTransition";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

export default function Fitures() {
  return (
    <PageTransition>
      <section className="py-16 px-4 sm:px-8 md:px-20 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold mb-2 text-gray-600">
              Keunggulan Kami
            </p>
            <h2 className="text-3xl text-gray-800 md:text-5xl font-bold leading-tight mb-4">
              Mengubah Imajinasi Anda <br className="hidden md:block" />
              Menjadi{" "}
              <span className="text-primary"> Visual yang Menginspirasi</span>
            </h2>
            <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto md:mx-0 mb-12">
              Imagine House hadir untuk menangkap cerita Anda lewat visual yang
              estetis dan bermakna. Dengan tim kreatif berpengalaman, kami
              menggabungkan teknologi dan seni untuk menciptakan hasil yang
              berkesan.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="text-center md:text-left">
              <Camera className="w-10 h-10 mb-4 mx-auto md:mx-0 text-gray-800" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                <PointerHighlight
                  rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 leading-loose"
                  pointerClassName="text-primary h-3 w-3"
                  containerClassName="inline-block mr-1"
                >
                  <span className="relative z-10">
                    Visual Berkualitas Tinggi
                  </span>
                </PointerHighlight>
              </h3>
              <p className="text-gray-600">
                Kami mengabadikan setiap momen penting Anda dengan kualitas foto
                dan video terbaik, sesuai standar industri.
              </p>
            </div>

            {/* Card 2 */}
            <div className="text-center md:text-left">
              <Sparkles className="w-10 h-10 mb-4 mx-auto md:mx-0 text-gray-800" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                <PointerHighlight
                  rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 leading-loose"
                  pointerClassName="text-primary h-3 w-3"
                  containerClassName="inline-block mr-1"
                >
                  <span className="relative z-10">
                    Pengalaman yang Personal & Unik
                  </span>
                </PointerHighlight>
              </h3>
              <p className="text-gray-600">
                Setiap proyek kami tangani secara personal untuk memastikan
                hasil akhir mencerminkan karakter dan pesan brand Anda.
              </p>
            </div>

            {/* Card 3 */}
            <div className="text-center md:text-left">
              <Users className="w-10 h-10 mb-4 mx-auto md:mx-0 text-gray-800" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                <PointerHighlight
                  rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 leading-loose"
                  pointerClassName="text-primary h-3 w-3"
                  containerClassName="inline-block mr-1"
                >
                  <span className="relative z-10">
                    Tim Profesional & Kolaboratif
                  </span>
                </PointerHighlight>
              </h3>
              <p className="text-gray-600">
                Didukung oleh tim fotografer, videografer, dan editor
                profesional yang siap bekerja sama dengan Anda dari awal hingga
                akhir.
              </p>
            </div>
          </div>

          {/* Tombol */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row items-center lg:justify-start md:justify-start justify-center gap-4"
          >
            <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#841618] hover:bg-[#721419] transition duration-300 text-white font-semibold text-base shadow-md hover:shadow-lg transform hover:-translate-y-1">
              <a href="/portfolio">Lihat Portofolio</a>
            </button>
            <button className="w-full sm:w-auto px-8 py-3 rounded-full border border-neutral-800 bg-white text-neutral-800 hover:bg-neutral-100 shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 font-medium text-base">
              <a href="https://wa.me/6287884456638">Hubungi Kami</a>
            </button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
