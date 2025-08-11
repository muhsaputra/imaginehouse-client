import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { client } from "@/sanityClient";
import { getAllBlogs } from "@/lib/queries";
import { Link } from "react-router-dom";

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogs = await client.fetch(getAllBlogs);
        setBlogPosts(blogs);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <section className="bg-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Blog <span className="text-primary">Kami</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Temukan cerita, pembaruan, dan wawasan terbaru dari perjalanan kami
            dalam menciptakan solusi kreatif dan membangun pengalaman terbaik
            bagi Anda.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {blogPosts.map((post) => (
            <Link to={`/blog/${post.slug.current}`} key={post._id}>
              <motion.div
                whileHover={{
                  y: -6,
                  boxShadow: "0px 12px 24px rgba(0,0,0,0.1)",
                }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-left">
                  <span className="inline-block text-xs font-medium text-white bg-primary px-3 py-1 rounded-full mb-3">
                    Article
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center mt-4 text-gray-500 text-xs">
                    <span className="font-medium text-gray-800">
                      {post.author?.name}
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
