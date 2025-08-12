import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

function CrewArchivePage() {
  const [crews, setCrews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    birth_place: "",
    birth_date: "",
    phone: "",
    email: "",
    payment_number: "",
    bank_or_ewallet: "",
    photo: null,
  });

  useEffect(() => {
    fetchCrews();
  }, []);

  const fetchCrews = () => {
    setFetching(true);
    axios
      .get("http://localhost:4000/api/v1/crew")
      .then((res) => setCrews(res.data))
      .catch((err) => console.log(err))
      .finally(() => setFetching(false));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Email tidak valid");
      return false;
    }
    if (!/^\d{10,}$/.test(formData.phone)) {
      alert("Nomor telepon minimal 10 digit angka");
      return false;
    }
    if (new Date(formData.birth_date) > new Date()) {
      alert("Tanggal lahir tidak boleh di masa depan");
      return false;
    }
    if (!editId && !formData.photo) {
      alert("Foto wajib diunggah");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    setLoading(true);
    try {
      if (editId) {
        await axios.put(`http://localhost:4000/api/v1/crew/${editId}`, data);
      } else {
        await axios.post("http://localhost:4000/api/v1/crew", data);
      }

      fetchCrews();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan. Cek console untuk detail.");
    }
    setLoading(false);
  };

  const handleEdit = (crew) => {
    setFormData({
      name: crew.name,
      birth_place: crew.birth_place,
      birth_date: crew.birth_date.split("T")[0],
      phone: crew.phone,
      email: crew.email,
      payment_number: crew.payment_account.number,
      bank_or_ewallet: crew.payment_account.bank_or_ewallet,
      photo: null,
    });
    setEditId(crew._id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/crew/${deleteId}`);
      fetchCrews();
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      birth_place: "",
      birth_date: "",
      phone: "",
      email: "",
      payment_number: "",
      bank_or_ewallet: "",
      photo: null,
    });
    setEditId(null);
  };

  const filteredCrews = crews.filter(
    (crew) =>
      crew.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crew.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="p-4  min-h-screen">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-4xl font-bold text-[#841618]">Arsip Data Crew</h1>

          <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Cari crew..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#841618] placeholder-gray-500"
              />
            </div>

            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="bg-[#841618] hover:bg-[#721419] text-white px-4 py-2 rounded-lg shadow-sm transition"
            >
              + Tambah Crew
            </button>
          </div>
        </div>

        {/* Crew Grid */}
        {fetching ? (
          <p className="text-white">Loading...</p>
        ) : filteredCrews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCrews.map((crew) => (
              <div
                key={crew._id}
                className="rounded-3xl overflow-hidden relative shadow-lg"
              >
                <img
                  src={crew.photo}
                  alt={crew.name}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-4 text-white">
                  <h2 className="text-xl font-bold">{crew.name}</h2>
                  <p className="text-sm">
                    {crew.birth_place},{" "}
                    {new Date(crew.birth_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm">{crew.phone}</p>
                  <p className="text-sm">{crew.email}</p>
                  <p className="text-sm">
                    {crew.payment_account.number} (
                    {crew.payment_account.bank_or_ewallet})
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(crew)}
                      className="bg-[#841618] hover:bg-[#721419] text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(crew._id);
                        setShowDeleteModal(true);
                      }}
                      className="bg-[#841618] hover:bg-[#721419] text-white px-3 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Tidak ada crew yang ditemukan.
          </p>
        )}

        {/* Modal Tambah/Edit */}
        <AnimatePresence>
          {showModal && (
            <Modal
              title={editId ? "Edit Crew" : "Tambah Crew"}
              onClose={() => {
                setShowModal(false);
                resetForm();
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Form inputs */}
                {[
                  { name: "name", placeholder: "Nama", type: "text" },
                  {
                    name: "birth_place",
                    placeholder: "Tempat Lahir",
                    type: "text",
                  },
                  { name: "birth_date", type: "date" },
                  { name: "phone", placeholder: "No Telp", type: "text" },
                  { name: "email", placeholder: "Email", type: "email" },
                  {
                    name: "payment_number",
                    placeholder: "No Rek / E-wallet",
                    type: "text",
                  },
                  {
                    name: "bank_or_ewallet",
                    placeholder: "Bank / E-wallet",
                    type: "text",
                  },
                ].map((input) => (
                  <input
                    key={input.name}
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    value={formData[input.name]}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#841618]"
                  />
                ))}
                <input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  className="w-full"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#841618] hover:bg-[#721419] text-white px-4 py-2 rounded"
                  >
                    {loading ? "Menyimpan..." : editId ? "Update" : "Simpan"}
                  </button>
                </div>
              </form>
            </Modal>
          )}
        </AnimatePresence>

        {/* Modal Hapus */}
        <AnimatePresence>
          {showDeleteModal && (
            <Modal title="Hapus Crew" onClose={() => setShowDeleteModal(false)}>
              <p>Yakin ingin menghapus crew ini?</p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-[#841618] hover:bg-[#721419] text-white px-4 py-2 rounded"
                >
                  Hapus
                </button>
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

// 🔥 Reusable Modal Component
const Modal = ({ title, children, onClose }) => (
  <motion.div
    key="modal"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
    >
      <h2 className="text-xl font-semibold mb-4 text-[#841618]">{title}</h2>
      {children}
    </motion.div>
  </motion.div>
);

export default CrewArchivePage;
