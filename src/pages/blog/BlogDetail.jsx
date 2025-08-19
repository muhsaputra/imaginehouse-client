"use client";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "@/sanityClient";
import { PortableText } from "@portabletext/react";
import NavigationBar from "@/components/layout/NavigationBar";
import BreadcrumbSection from "@/components/common/BreadCrumbs";
import Loading from "@/components/common/Loading";
import Footer from "@/components/layout/Footer";

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    document.title = "Imagine House | Detail";
    const fetchPost = async () => {
      if (!slug) {
        setLoading(false);
        setNotFound(true);
        return;
      }

      try {
        const query = `*[_type == "blog" && slug.current == $slug][0]{
          title,
          mainImage {
            asset -> {
              url
            }
          },
          publishedAt,
          author -> {
            name,
            image {
              asset -> {
                url
              }
            }
          },
          content
        }`;

        const result = await client.fetch(query, { slug });

        if (!result) {
          setNotFound(true);
        } else {
          setPost(result);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const components = {
    types: {
      image: ({ value }) => (
        <img
          src={value?.asset?.url}
          alt={value?.alt || " "}
          className="rounded-xl my-6"
        />
      ),
    },
    block: {
      h1: ({ children }) => (
        <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-700">
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className="text-base leading-relaxed text-gray-700 mb-4">
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
          {children}
        </blockquote>
      ),
      ul: ({ children }) => (
        <ul className="list-disc list-outside mb-4 space-y-2 text-gray-700 ">
          {children}
        </ul>
      ),
      ol: ({ children }) => (
        <ol className="list-decimal list-outside mb-4 space-y-1 text-gray-700">
          {children}
        </ol>
      ),
      li: ({ children }) => <li>{children}</li>,
    },
    marks: {
      link: ({ value, children }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {children}
        </a>
      ),
    },
  };

  if (loading)
    return (
      <>
        <Loading />
      </>
    );

  if (notFound || !post) {
    return (
      <div className="text-center py-20 text-red-500">
        Artikel tidak ditemukan.
      </div>
    );
  }

  return (
    <>
      <NavigationBar />
      <BreadcrumbSection
        title="Detail"
        bgImage="/images/bg2.webp"
        path={[
          { name: "Blog", href: "/blog" },
          { name: "Detail", href: `/blog/${slug}` },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 md:px-0 py-16 mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        <div className="flex items-center gap-3 mb-6 text-sm text-gray-600">
          {post.author?.image?.asset?.url && (
            <img
              src={post.author.image.asset.url}
              alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <span>{post.author?.name}</span>
          <span className="mx-2">•</span>
          <span>
            {new Date(post.publishedAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {post.mainImage?.asset?.url && (
          <img
            src={post.mainImage.asset.url}
            alt={post.title}
            className="w-full rounded-xl mb-8"
          />
        )}

        <div className="prose prose-lg max-w-none prose-ul:list-outside prose-ol:list-outside">
          <PortableText value={post.content} components={components} />
        </div>
      </div>

      <Footer />
    </>
  );
}
