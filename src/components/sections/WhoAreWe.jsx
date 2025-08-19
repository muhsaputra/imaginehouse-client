import { useState } from "react";
import { PageTransition } from "@/components/common/PageTransition";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

export default function WhoAreWe() {
  const backgrounds = ["/images/bg16.jpg"];
  const [currentIndex] = useState(0);

  return (
    <PageTransition>
      <section className="w-full py-20 px-4 sm:px-6 md:px-12 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16">
          {/* Kiri - Teks */}
          <div className="w-full md:max-w-xl text-center md:text-left space-y-4">
            <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400">
              Siapa Kami?
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
              Apa Itu <br />
              <span className="text-primary">Imagine House?</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Imagine House adalah creative agency yang berfokus pada{" "}
              <PointerHighlight
                rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 leading-loose"
                pointerClassName="text-primary h-3 w-3"
                containerClassName="inline-block mr-1"
              >
                <span className="relative z-10">
                  fotografi, videografi, dan produksi film.
                </span>
              </PointerHighlight>{" "}
              Kami membantu brand, organisasi, dan individu menyampaikan cerita
              mereka secara visual dengan cara yang kreatif, profesional, dan
              berdampak.
            </p>
          </div>

          {/* Kanan - Gambar */}
          <div
            className="w-full h-[220px] sm:h-[280px] md:w-[500px] md:h-[320px] rounded-2xl shadow-lg bg-cover bg-center transition-transform duration-500 hover:scale-[1.02]"
            style={{
              backgroundImage: `url(${backgrounds[currentIndex]}?v=${currentIndex})`,
            }}
          />
        </div>
      </section>
    </PageTransition>
  );
}
