"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { Spotlight } from "../ui/Spotlight";
import { client } from "@/sanityClient";

export function HeroSectionOne() {
  const [data, setData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "heroSection"][0]{
          title,
          subtitle,
          description,
          primaryButtonText,
          primaryButtonLink,
          secondaryButtonText,
          secondaryButtonLink,
          backgroundImages[]{asset->{url}}
        }`
      )
      .then((res) => setData(res))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (data?.backgroundImages?.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % data.backgroundImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [data]);

  if (!data) return null;

  const backgrounds = data.backgroundImages.map((img) => img.asset.url);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-[1]">
        <AnimatePresence mode="wait">
          <motion.div
            key={backgrounds[currentIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            loading="lazy"
            className="absolute inset-0 bg-cover bg-center min-h-screen"
            style={{
              backgroundImage: `url(${backgrounds[currentIndex]})`,
            }}
          />
        </AnimatePresence>
      </div>

      {/* Black gradient overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/70 via-black/50 to-transparent" />

      {/* Spotlight */}
      <Spotlight
        className="z-[3] -top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />

      {/* Main Content */}
      <div className="relative z-[4] max-w-5xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
        >
          <div className="block text-white drop-shadow-md">
            Visualkan
            <ContainerTextFlip />
            Anda
          </div>
          <span className="block">{data.subtitle}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-4 font-normal text-base text-neutral-300 max-w-lg mx-auto"
        >
          {data.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {data.primaryButtonText && (
            <a
              href={data.primaryButtonLink || "/portfolio"}
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#841618] hover:bg-[#721419] transition duration-300 text-white font-semibold text-base shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              {data.primaryButtonText}
            </a>
          )}
          {data.secondaryButtonText && (
            <a
              href={data.secondaryButtonLink}
              className="w-full sm:w-auto px-8 py-3 rounded-full border border-white bg-white/10 hover:bg-white/20 text-white shadow-md transition font-medium text-base backdrop-blur-sm hover:shadow-lg duration-300 transform hover:-translate-y-1"
            >
              {data.secondaryButtonText}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
