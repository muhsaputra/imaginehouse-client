import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { PageTransition } from "@/components/common/PageTransition";
import { useState, useEffect } from "react";
import { TestimonialSkeleton } from "@/components/ui/skeletons";
import { client } from "@/sanityClient";

function SafeAnimatedTestimonials({ testimonials }) {
  if (!Array.isArray(testimonials) || testimonials.length === 0) {
    return (
      <p className="text-gray-500 mt-8">Belum ada testimonial yang tersedia.</p>
    );
  }

  try {
    return <AnimatedTestimonials testimonials={testimonials} />;
  } catch (err) {
    console.error("AnimatedTestimonials error:", err);
    return (
      <>
        <TestimonialSkeleton count={3} />
      </>
    );
  }
}

export default function AnimatedTestimonialsDemo() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const data = await client.fetch(`*[_type == "testimonial"]{
          name,
          designation,
          quote,
          "src": image.asset->url
        }`);
        setTestimonials(data);
      } catch (error) {
        console.error("Gagal ambil testimonial:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500">Memuat testimonial...</p>
    );

  return (
    <PageTransition>
      <section className="py-20 w-full text-center mb-8 bg-white">
        <div className="mb-2">
          <p className="text-sm font-semibold mb-2 text-gray-600">
            Testimonial
          </p>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 px-4 py-2 inline-block rounded-md">
          Apa Kata Mereka <span className="text-primary">Tentang Kami?</span>
        </h2>
        <p className="max-w-xl mx-auto text-gray-600 text-base mb-8">
          Testimoni dari para klien yang telah merasakan langsung dampak nyata
          dari hasil kerja kreatif kami.
        </p>

        {/* Komponen aman */}
        <SafeAnimatedTestimonials testimonials={testimonials} />
      </section>
    </PageTransition>
  );
}
