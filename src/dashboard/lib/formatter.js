// src/lib/formatter.js

export function formatRupiah(angka) {
  if (typeof angka !== "number") return angka;
  return angka.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
}

export function formatTanggal(inputTanggal) {
  const tanggal = new Date(inputTanggal);
  const day = tanggal.getDate().toString().padStart(2, "0");
  const month = (tanggal.getMonth() + 1).toString().padStart(2, "0");
  const year = tanggal.getFullYear();
  return `${day}/${month}/${year}`;
}
