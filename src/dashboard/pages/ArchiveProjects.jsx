import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { PageTransition } from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";

const ArchiveProjects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    client: "",
    category: "",
    mediaLinks: "",
    description: "",
    thumbnail: null,
    status: "Selesai",
  });

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const API = "http://localhost:4000/api/v1/archive-projects";

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(API);
      setProjects(res.data);
    } catch (err) {
      toast.error("Gagal mengambil data arsip.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("client", form.client);
      formData.append("category", form.category);
      formData.append("mediaLinks", form.mediaLinks);
      formData.append("description", form.description);
      formData.append("status", form.status);
      if (form.thumbnail) {
        formData.append("thumbnail", form.thumbnail);
      }

      await axios.post(API, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Project berhasil disimpan!");
      setForm({
        title: "",
        client: "",
        category: "",
        mediaLinks: "",
        description: "",
        thumbnail: null,
        status: "Selesai",
      });
      fetchProjects();
    } catch (err) {
      toast.error("Gagal menyimpan project.");
    }
  };

  const confirmDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/${confirmDeleteId}`);
      toast.success("Project dihapus.");
      setConfirmDeleteId(null);
      fetchProjects();
    } catch (err) {
      toast.error("Gagal menghapus project.");
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Daftar Archive Projects", 14, 10);
    const tableData = filtered.map((p, index) => [
      index + 1,
      p.title,
      p.client,
      p.category,
      p.status,
      new Date(p.createdAt).toLocaleDateString("id-ID"),
    ]);

    doc.autoTable({
      head: [["No", "Judul", "Klien", "Kategori", "Status", "Tanggal"]],
      body: tableData,
      startY: 20,
    });

    doc.save("archive-projects.pdf");
  };

  const filtered = projects.filter((p) => {
    const date = new Date(p.createdAt);
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = String(date.getFullYear());

    const matchMonthYear = (!month || m === month) && (!year || y === year);
    const matchSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase());

    return matchMonthYear && (!searchTerm || matchSearch);
  });

  return (
    <PageTransition>
      <div className="w-full h-full overflow-y-auto px-4 md:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-4xl font-bold text-[#841618] dark:text-white">
            Archive Projects 📦
          </h1>
          <div className="flex flex-wrap gap-2">
            <select
              onChange={(e) => setMonth(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="">Bulan</option>
              {[
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
              ].map((name, i) => {
                const value = String(i + 1).padStart(2, "0");
                return (
                  <option key={value} value={value}>
                    {name}
                  </option>
                );
              })}
            </select>
            <select
              onChange={(e) => setYear(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="">Tahun</option>
              {[2023, 2024, 2025, 2026].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Cari judul / klien..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded px-3 py-2 text-sm w-full md:w-60"
            />
            <button
              onClick={exportToPDF}
              className="bg-[#841618] text-white text-sm px-4 py-2 rounded hover:bg-[#6d1012] transition"
            >
              Export PDF
            </button>
          </div>
        </div>

        {/* Form Tambah Arsip */}
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4 bg-white dark:bg-neutral-800 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm"
        >
          <input
            type="text"
            placeholder="Judul Project"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Nama Klien"
            value={form.client}
            onChange={(e) => setForm({ ...form, client: e.target.value })}
            required
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Kategori (contoh: Video, Design, UI/UX)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
            className="p-2 border rounded w-full"
          />
          <input
            type="url"
            placeholder="Link Media (contoh: https://...)"
            value={form.mediaLinks}
            onChange={(e) => setForm({ ...form, mediaLinks: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <textarea
            placeholder="Deskripsi"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            required
            className="md:col-span-2 p-2 border rounded w-full"
          />
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={(e) => setForm({ ...form, thumbnail: e.target.files[0] })}
            className="md:col-span-2 p-2 border rounded w-full"
          />
          <button
            type="submit"
            className="md:col-span-2 bg-[#841618] text-white py-2 px-4 rounded hover:bg-[#6d1012] transition"
          >
            Simpan Project
          </button>
        </form>

        {/* List Project */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <div
              key={project._id}
              className="relative rounded-xl overflow-hidden shadow-lg group"
            >
              <img
                src={project.thumbnail || "https://via.placeholder.com/400x300"}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h2 className="text-lg font-bold">{project.title}</h2>
                <p className="text-sm">{project.client}</p>
                <p className="text-sm">{project.category}</p>
                <p className="text-xs">
                  {new Date(project.createdAt).toLocaleDateString("id-ID")}
                </p>

                <div className="flex gap-2 mt-2">
                  {project.mediaLinks && (
                    <a
                      href={project.mediaLinks}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#841618] hover:bg-[#721419] text-white px-3 py-1 rounded text-sm"
                    >
                      Lihat Media
                    </a>
                  )}
                  <button
                    onClick={() => confirmDelete(project._id)}
                    className="bg-[#841618] hover:bg-[#721419] text-white px-3 py-1 rounded text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            Tidak ada data ditemukan.
          </div>
        )}
      </div>

      {/* Modal Confirm Delete */}
      <AnimatePresence>
        {confirmDeleteId && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-xl w-[90%] max-w-sm transform scale-100 opacity-100 animate-popup">
              <h2 className="text-lg font-semibold text-[#841618] dark:text-red-400 mb-2">
                Confirm Delete
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Are you sure you want to delete this project?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="px-4 py-2 rounded-md text-sm bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-md text-sm text-white bg-[#841618] hover:bg-[#6d1012]"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default ArchiveProjects;
