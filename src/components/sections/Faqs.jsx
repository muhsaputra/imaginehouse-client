"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { PageTransition } from "@/components/common/PageTransition";
import { client } from "@/sanityClient";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    // Fetch FAQ dari Sanity
    client
      .fetch(
        `*[_type == "faq"] | order(_createdAt asc){
          question,
          answer
        }`
      )
      .then((res) => {
        if (res.length > 0) setFaqs(res);
        else {
          // fallback dummy jika belum ada di Sanity
          setFaqs([
            {
              question: "Apa saja layanan utama dari Imagine House?",
              answer:
                "Kami menyediakan layanan Video Production, Fotografi, dan Film Production untuk kebutuhan brand, kampanye, dan dokumentasi visual.",
            },
            {
              question:
                "Apakah Imagine House bisa menangani produksi dari awal hingga akhir?",
              answer:
                "Ya, kami menangani seluruh proses produksi mulai dari pengembangan ide dan konsep, penulisan naskah, produksi di lapangan, hingga editing dan delivery final output.",
            },
          ]);
        }
      })
      .catch((err) => console.error("Error fetch FAQ:", err));
  }, []);

  return (
    <PageTransition>
      <section className="bg-white text-gray-800 py-20 px-4 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Title Section */}
          <div>
            <p className="text-xs sm:text-sm font-semibold mb-2 text-gray-600">
              FAQ
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              Pertanyaan <span className="text-primary">Umum</span>
            </h2>
            <p className="mt-4 text-gray-500">
              Temukan jawaban atas pertanyaan yang sering diajukan <br />{" "}
              tentang layanan kami.
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-6">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const contentId = `faq-content-${index}`;
              return (
                <div
                  key={index}
                  className="border-b border-gray-300 pb-4 transition-colors duration-200"
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex justify-between items-center text-left focus:outline-none"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                  >
                    <span className="text-lg sm:text-xl font-medium text-left">
                      {faq.question}
                    </span>
                    <motion.div
                      initial={false}
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={contentId}
                        id={contentId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 text-gray-600 text-base leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
