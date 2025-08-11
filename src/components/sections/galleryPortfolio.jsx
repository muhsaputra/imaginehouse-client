"use client";
import React, { useEffect, useState } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { PageTransition } from "@/components/common/PageTransition";
import { client } from "@/sanityClient";
import GallerySkeleton from "@/components/common/GallerySkeleton"; // tambahkan ini

export function LayoutGridDemo() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "portfolioItem"]{
        _id,
        title,
        description,
        "thumbnailUrl": thumbnail.asset->url
      }`
      )
      .then((data) => {
        const formattedCards = data.map((item, idx) => ({
          id: item._id,
          content: (
            <PageTransition>
              <div>
                <p className="font-bold md:text-4xl text-xl text-white">
                  {item.title}
                </p>
                <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                  {item.description}
                </p>
              </div>
            </PageTransition>
          ),
          className: idx % 2 === 0 ? "md:col-span-2" : "col-span-1",
          thumbnail: item.thumbnailUrl,
        }));
        setCards(formattedCards);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <GallerySkeleton />;

  return (
    <PageTransition>
      <section className="h-screen py-20 w-full text-center mb-8 bg-white">
        <div className="mb-2">
          <p className="text-sm font-semibold mb-2 text-gray-600">Portfolio</p>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 px-4 py-2 inline-block rounded-md">
          Jelajahi Karya <span className="text-primary">Kreatif Kami</span>
        </h2>
        <p className="max-w-xl mx-auto text-gray-600 text-base">
          Temukan visual menakjubkan yang menceritakan kisah Anda.
        </p>
        <LayoutGrid cards={cards} />
      </section>
    </PageTransition>
  );
}
