const API_URL = import.meta.env.VITE_API_URL;

export async function fetchServices() {
  const res = await fetch(`${API_URL}/services`);
  if (!res.ok) throw new Error("Gagal mengambil data services");
  return res.json();
}

export async function fetchGallery() {
  const res = await fetch(`${API_URL}/gallery`);
  if (!res.ok) throw new Error("Gagal mengambil data gallery");
  return res.json();
}
