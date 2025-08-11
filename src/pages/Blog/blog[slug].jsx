"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Loading from "../../components/Loading";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const query = `
        *[_type == "blog" && slug.current == $slug][0] {
          title,
          publishedAt,
          excerpt,
          content,
          "imageUrl": mainImage.asset->url,
          "author": author->{
            name,
            "imageUrl": image.asset->url
          },
          tags
        }
      `;
      const data = await client.fetch(query, { slug });
      setBlog(data);
    };

    fetchBlog();
  }, [slug]);

  if (!blog)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-900 mb-6"
        >
          {blog.title}
        </motion.h1>
        <div className="flex items-center gap-3 mb-8 text-sm text-gray-500">
          {blog.author?.imageUrl && (
            <Image
              src={blog.author.imageUrl}
              alt={blog.author.name}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <span>{blog.author?.name}</span>
          <span>•</span>
          <span>{format(new Date(blog.publishedAt), "dd MMM yyyy")}</span>
        </div>

        {blog.imageUrl && (
          <div className="mb-10">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              width={960}
              height={540}
              className="rounded-2xl w-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none text-gray-800">
          <PortableText value={blog.content} />
        </div>

        {blog.tags?.length > 0 && (
          <div className="mt-10">
            <h3 className="font-semibold text-gray-700 mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
