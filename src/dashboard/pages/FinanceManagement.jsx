"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { PageTransition } from "@/components/PageTransition";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const formatRupiahInput = (angka) => {
  const numberString = angka.replace(/[^,\d]/g, "").toString();
  const split = numberString.split(",");
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  return rupiah ? "Rp" + rupiah : "";
};

const FinanceManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    description: "",
    date: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const API = "http://localhost:4000/api/v1/finance";

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(API);
      setTransactions(res.data);
    } catch (err) {
      toast.error("Gagal mengambil data transaksi.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Parse amount ke integer (menghapus Rp dan .)
      const parsedAmount = parseInt(form.amount.replace(/[^0-9]/g, ""), 10);

      await axios.post(API, {
        ...form,
        amount: parsedAmount,
      });

      toast.success("Transaksi berhasil disimpan!");
      setForm({
        title: "",
        amount: "",
        type: "income",
        category: "",
        description: "",
        date: "",
      });
      fetchTransactions();
    } catch (err) {
      toast.error("Gagal menyimpan transaksi.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      toast.success("Transaksi dihapus.");
      fetchTransactions();
    } catch (err) {
      toast.error("Gagal menghapus transaksi.");
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Daftar Transaksi Keuangan", 14, 10);
    const tableData = filtered.map((t, index) => [
      index + 1,
      t.title,
      t.type,
      t.category,
      t.amount,
      new Date(t.date).toLocaleDateString("id-ID"),
    ]);

    doc.autoTable({
      head: [["No", "Judul", "Tipe", "Kategori", "Jumlah", "Tanggal"]],
      body: tableData,
      startY: 20,
    });

    doc.save("finance-transactions.pdf");
  };

  const exportBulananPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    doc.setFontSize(16);
    doc.text("Laporan Keuangan Bulanan", 70, 20);

    const bulanNama = month
      ? [
          "",
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
        ][parseInt(month)]
      : "Semua Bulan";

    doc.setFontSize(12);
    doc.text(`Bulan: ${bulanNama}`, 14, 30);
    doc.text(`Tahun: ${year || "Semua Tahun"}`, 14, 36);

    const tableData = filtered.map((t, index) => [
      index + 1,
      t.title,
      t.type,
      t.category,
      t.amount,
      new Date(t.date).toLocaleDateString("id-ID"),
    ]);

    doc.autoTable({
      head: [["No", "Judul", "Tipe", "Kategori", "Jumlah", "Tanggal"]],
      body: tableData,
      startY: 40,
    });

    doc.text(
      `Total Income: Rp${totalIncome.toLocaleString()}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.text(
      `Total Expense: Rp${totalExpense.toLocaleString()}`,
      14,
      doc.lastAutoTable.finalY + 16
    );
    doc.text(
      `Saldo: Rp${saldo.toLocaleString()}`,
      14,
      doc.lastAutoTable.finalY + 22
    );

    doc.save(`laporan-keuangan-${month || "all"}-${year || "all"}.pdf`);
  };

  const filtered = transactions.filter((t) => {
    const date = new Date(t.date);
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = String(date.getFullYear());

    const matchMonthYear = (!month || m === month) && (!year || y === year);
    const matchSearch = t.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchCategory = !selectedCategory || t.category === selectedCategory;

    return matchMonthYear && (!searchTerm || matchSearch) && matchCategory;
  });

  const totalIncome = filtered
    .filter((t) => t.type === "income")
    .reduce((acc, cur) => acc + cur.amount, 0);

  const totalExpense = filtered
    .filter((t) => t.type === "expense")
    .reduce((acc, cur) => acc + cur.amount, 0);

  const saldo = totalIncome - totalExpense;

  const chartData = [
    { name: "Income", amount: totalIncome },
    { name: "Expense", amount: totalExpense },
  ];

  // Generate cashflowData for Line Chart
  const cashflowData = [];
  for (let i = 1; i <= 12; i++) {
    const monthName = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ][i];

    const income = transactions
      .filter(
        (t) =>
          t.type === "income" &&
          new Date(t.date).getMonth() + 1 === i &&
          (!year || new Date(t.date).getFullYear() === parseInt(year))
      )
      .reduce((acc, cur) => acc + cur.amount, 0);

    const expense = transactions
      .filter(
        (t) =>
          t.type === "expense" &&
          new Date(t.date).getMonth() + 1 === i &&
          (!year || new Date(t.date).getFullYear() === parseInt(year))
      )
      .reduce((acc, cur) => acc + cur.amount, 0);

    cashflowData.push({
      month: monthName,
      saldo: income - expense,
    });
  }

  return (
    <PageTransition>
      <div className="w-full h-full overflow-y-auto px-4 md:px-8 py-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-4xl font-bold text-[#841618] dark:text-white">
            Finance Tracker 💰
          </h1>
          <div className="flex flex-wrap gap-2">
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="">Kategori</option>
              {[...new Set(transactions.map((t) => t.category))].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

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
              placeholder="Cari judul..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded px-3 py-2 text-sm w-full md:w-60"
            />

            <button
              onClick={exportToPDF}
              className="bg-[#841618] text-white text-sm px-4 py-2 rounded hover:bg-[#6d1012] transition"
            >
              Export Semua
            </button>

            <button
              onClick={exportBulananPDF}
              className="bg-[#841618] text-white text-sm px-4 py-2 rounded hover:bg-[#6d1012] transition"
            >
              Export Bulanan
            </button>
          </div>
        </div>

        {/* Saldo */}
        <div className="text-left font-bold text-2xl text-[#841618] dark:text-white">
          Total Saldo: Rp{saldo.toLocaleString()}
        </div>

        {/* Form Input */}
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4 bg-white dark:bg-neutral-800 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm"
        >
          <input
            type="text"
            placeholder="Judul"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Jumlah"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: formatRupiahInput(e.target.value),
              })
            }
            required
            className="p-2 border rounded w-full"
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            required
            className="p-2 border rounded w-full"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            type="text"
            placeholder="Kategori"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
            className="p-2 border rounded w-full"
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
            className="p-2 border rounded w-full"
          />
          <textarea
            placeholder="Deskripsi"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="md:col-span-2 p-2 border rounded w-full"
          />
          <button
            type="submit"
            className="md:col-span-2 bg-[#841618] text-white py-2 px-4 rounded hover:bg-[#6d1012] transition"
          >
            Simpan
          </button>
        </form>

        {/* List Transaksi */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <div
              key={t._id}
              className="bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t.title}
                </h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    t.type === "income"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {t.type}
                </span>
              </div>

              {/* Jumlah sebagai sub-header */}
              <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                Rp{t.amount.toLocaleString()}
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                {t.description?.substring(0, 100)}...
              </p>

              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <div>Kategori: {t.category}</div>
                <div>
                  Tanggal:{" "}
                  {new Date(t.date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>

              <div className="flex gap-2 mt-4 flex-wrap">
                <button
                  onClick={() => handleDelete(t._id)}
                  className="text-white bg-[#841618] hover:bg-[#721419] text-xs px-4 py-2 rounded-full"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            Tidak ada data ditemukan.
          </div>
        )}

        {/* Grafik Income vs Expense */}
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Grafik Income vs Expense
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#841618" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Grafik Cashflow Bulanan */}
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Grafik Cashflow Bulanan
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cashflowData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="saldo" stroke="#841618" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Form Input, List Transaksi, Saldo */}
        {/* Tetap seperti sebelumnya */}
        {/* (Kode form dan list transaksi tidak diubah di sini untuk singkatnya) */}
      </div>
    </PageTransition>
  );
};

export default FinanceManagement;
