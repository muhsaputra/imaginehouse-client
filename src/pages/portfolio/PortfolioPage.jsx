import Navbar from "@/components/layout/NavigationBar";
import BreadcrumbSection from "@/components/common/BreadCrumbs";
import Fitures from "@/components/sections/Fitures";
import Faqs from "@/components/sections/Faqs";
import { useEffect, useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { VelocityScroll } from "@/components/magicui/VelocityScroll";
import { client } from "@/sanityClient";
import Footer from "@/components/layout/Footer";
import Loading from "@/components/common/Loading";

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Imagine House | Portfolio";

    async function fetchData() {
      try {
        const [portfolioData, pageData] = await Promise.all([
          client.fetch(`
            *[_type == "portfolio"] | order(publishedAt desc) {
              _id,
              title,
              category,
              description,
              "thumbnail": thumbnail.asset->url,
              gallery[] {
                "url": asset->url
              }
            }
          `),
          client.fetch(`
            *[_type == "portfoliopage"][0]{
              titleBreadCrumb,
              heroImage {
                asset->{
                  url
                }
              }
            }
          `),
        ]);

        setPortfolio(portfolioData);
        setData(pageData);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const cards = portfolio.map((item, index) => (
    <Card
      key={item._id}
      card={{
        category: item.category,
        title: item.title,
        src: item.thumbnail,
        content: (
          <div className="space-y-4">
            <p className="text-neutral-700 dark:text-neutral-300">
              {item.description}
            </p>
            {item.gallery?.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                {item.gallery.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url}
                    alt={`${item.title}-${idx}`}
                    className="w-full h-40 object-cover rounded-lg shadow"
                  />
                ))}
              </div>
            )}
          </div>
        ),
      }}
      index={index}
    />
  ));

  if (!data)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <>
      <Navbar />

      <BreadcrumbSection
        title={data?.title || "Portfolio Kami"}
        bgImage={data?.heroImage?.asset?.url || "/images/bg5.jpg"}
        path={[{ name: "Portfolio", href: "/Portfolio" }]}
      />

      <div className="w-full h-full py-20">
        <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          <div className="mb-2">
            <p className="text-sm font-semibold mb-2 text-gray-600">
              Portfolio Kami
            </p>
          </div>
          Jelajahi Karya <span className="text-primary">Kreatif Kami</span>
        </h2>
        <Carousel items={cards} />
      </div>
      <div className="text-primary relative flex w-full flex-col items-center justify-center overflow-hidden">
        <VelocityScroll>Imagine House</VelocityScroll>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>

      <section className="bg-white dark:bg-gray-900">
        <Fitures />
        <Faqs />
      </section>
      <Footer />
    </>
  );
}
