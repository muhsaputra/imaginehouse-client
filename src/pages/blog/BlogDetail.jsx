"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "@/sanityClient"; // sementara masih dipakai buat fetch post
import { PortableText } from "@portabletext/react";
import NavigationBar from "@/components/layout/NavigationBar";
import BreadcrumbSection from "@/components/common/BreadCrumbs";
import Footer from "@/components/layout/Footer";
import { Toaster, toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Comment state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Reply state
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyTexts, setReplyTexts] = useState({});

  const [expanded, setExpanded] = useState(false);

  /**
   * ✅ Fetch comments dari backend (by slug)
   */
  const fetchComments = async (slug) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/comments/${slug}`
      );
      if (!res.ok) throw new Error("Gagal fetch komentar");
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  /**
   * ✅ Fetch blog post by slug (masih pakai Sanity)
   */
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
            _id,
            title,
            mainImage { asset -> { url } },
            publishedAt,
            author -> { name, image { asset -> { url } } },
            content
          }`;

        const result = await client.fetch(query, { slug });

        if (!result) {
          setNotFound(true);
        } else {
          setPost(result);
          await fetchComments(slug); // ⚡ pakai slug, bukan _id
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

  /**
   * ✅ Handle submit komentar baru
   */
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim() || !email.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postSlug: slug, // ⚡ ganti ke slug
            parentId: null,
            name,
            email,
            comment: newComment,
          }),
        }
      );

      if (res.ok) {
        toast.success("Komentar berhasil dikirim 🎉");
        setNewComment("");
        fetchComments(slug);
      } else {
        toast.error("Gagal mengirim komentar 😢");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan 😢");
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * ✅ Handle submit reply
   */
  const handleReplySubmit = async (e, parentId) => {
    e.preventDefault();
    if (!replyTexts[parentId]?.trim() || !name.trim() || !email.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postSlug: slug, // ⚡ slug juga
            parentId,
            name,
            email,
            comment: replyTexts[parentId],
          }),
        }
      );

      if (res.ok) {
        toast.success("Balasan berhasil dikirim 🎉");
        setReplyingTo(null);
        setReplyTexts((prev) => ({ ...prev, [parentId]: "" }));
        fetchComments(slug);
      } else {
        toast.error("Gagal mengirim balasan 😢");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan 😢");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <SkeletonLoader />;

  if (notFound || !post) {
    return (
      <div className="text-center py-20 text-red-500 font-medium">
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

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-4 md:px-0 py-16 mb-16">
        {/* Title */}
        <motion.h1
          className="text-4xl font-bold text-gray-900 mb-4 leading-snug"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {post.title}
        </motion.h1>

        {/* Author & meta */}
        <motion.div
          className="flex items-center gap-3 mb-6 text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
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
        </motion.div>

        {/* Main image */}
        {post.mainImage?.asset?.url && (
          <motion.img
            src={post.mainImage.asset.url}
            alt={post.title}
            className="w-full rounded-xl mb-8 shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none prose-ul:list-outside prose-ol:list-outside">
          <PortableText value={post.content} />
        </div>

        {/* Comment Section */}
        <div className="mt-20 border-t pt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 flex items-center gap-2">
            💬 Komentar
            <span className="text-sm font-normal text-gray-500">
              {comments.length} diskusi
            </span>
          </h2>

          {/* Form komentar utama */}
          <form
            onSubmit={handleCommentSubmit}
            className="mb-12 bg-white/70 backdrop-blur border border-gray-200 p-6 md:p-8 rounded-3xl shadow-lg space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama kamu"
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email kamu"
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Tulis komentar kamu di sini..."
              className="w-full border border-gray-300 rounded-xl p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              rows="4"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl font-medium hover:from-red-700 hover:to-red-600 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Mengirim..." : "Kirim"}
              </button>
            </div>
          </form>

          {/* List komentar */}
          <CommentList
            comments={comments}
            expanded={expanded}
            setExpanded={setExpanded}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
            replyTexts={replyTexts}
            setReplyTexts={setReplyTexts}
            handleReplySubmit={handleReplySubmit}
            submitting={submitting}
          />
        </div>
      </div>

      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

/**
 * Recursive Comment List
 */
function CommentList({
  comments,
  expanded,
  setExpanded,
  replyingTo,
  setReplyingTo,
  replyTexts,
  setReplyTexts,
  handleReplySubmit,
  submitting,
}) {
  return (
    <div className="space-y-6">
      <AnimatePresence>
        {comments.length === 0 ? (
          <EmptyComment />
        ) : (
          comments.slice(0, expanded ? comments.length : 3).map((c, i) => (
            <motion.div
              key={c._id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex flex-col gap-4 bg-white/80 backdrop-blur p-5 rounded-2xl shadow border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex gap-4 items-start">
                {/* Avatar */}
                <div
                  className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center font-bold text-white shadow"
                  style={{
                    backgroundColor: `hsl(${
                      ((c.name?.charCodeAt(0) || 65) * 7) % 360
                    }, 70%, 50%)`,
                  }}
                >
                  {c.name?.charAt(0).toUpperCase()}
                </div>

                {/* Isi komentar */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900">{c.name}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(c.createdAt).toLocaleString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{c.comment}</p>

                  <button
                    onClick={() =>
                      setReplyingTo(replyingTo === c._id ? null : c._id)
                    }
                    className="text-sm text-red-600 mt-2 hover:underline"
                  >
                    {replyingTo === c._id ? "Batal" : "Balas"}
                  </button>

                  {/* Form reply */}
                  {replyingTo === c._id && (
                    <form
                      onSubmit={(e) => handleReplySubmit(e, c._id)}
                      className="mt-3 space-y-2"
                    >
                      <textarea
                        value={replyTexts[c._id] || ""}
                        onChange={(e) =>
                          setReplyTexts((prev) => ({
                            ...prev,
                            [c._id]: e.target.value,
                          }))
                        }
                        placeholder="Tulis balasan..."
                        className="w-full border border-gray-300 rounded-xl p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        rows="3"
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition disabled:opacity-50"
                      >
                        {submitting ? "Mengirim..." : "Kirim Balasan"}
                      </button>
                    </form>
                  )}

                  {/* Render replies */}
                  {c.replies && c.replies.length > 0 && (
                    <div className="mt-4 pl-6 border-l space-y-4">
                      <CommentList
                        comments={c.replies}
                        expanded={true}
                        setExpanded={setExpanded}
                        replyingTo={replyingTo}
                        setReplyingTo={setReplyingTo}
                        replyTexts={replyTexts}
                        setReplyTexts={setReplyTexts}
                        handleReplySubmit={handleReplySubmit}
                        submitting={submitting}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>

      {comments.length > 3 && !expanded && (
        <div className="text-center mt-6">
          <button
            onClick={() => setExpanded(true)}
            className="text-red-600 hover:underline font-medium"
          >
            Tampilkan lebih banyak komentar
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Skeleton Loader
 */
function SkeletonLoader() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 space-y-8 animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-3/4"></div>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
      <div className="h-64 bg-gray-200 rounded-xl"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  );
}

/**
 * Empty Comment
 */
function EmptyComment() {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-gray-500 text-center italic py-6"
    >
      Belum ada komentar. Jadilah yang pertama!
    </motion.p>
  );
}
