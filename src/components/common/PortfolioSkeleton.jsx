"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function PortfolioSkeleton() {
  return (
    <section className="w-full">
      <div className="max-w-screen-xl mx-auto mt-14 px-4 md:px-8">
        {/* Heading */}
        <div className="mb-10">
          <Skeleton className="h-4 w-28 mb-2 bg-gray-200" />
          <Skeleton className="h-10 w-80 bg-gray-200" />
        </div>

        {/* Grid portfolio mirip aslinya */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden shadow-md"
            >
              {/* Gambar full background */}
              <Skeleton className="h-[450px] w-full rounded-2xl bg-gray-200 animate-pulse" />

              {/* Overlay text posisi mirip */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                <Skeleton className="h-3 w-24 bg-gray-200 animate-pulse" />{" "}
                {/* kategori */}
                <Skeleton className="h-5 w-40 bg-gray-200 animate-pulse" />{" "}
                {/* judul */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
