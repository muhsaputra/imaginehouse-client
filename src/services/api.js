const API_URL = import.meta.env.VITE_API_URL;

// Helper fetch dengan error handling
async function fetchData(endpoint) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      credentials: "include", // biar cookie/JWT otomatis terkirim
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Gagal mengambil data dari ${endpoint}:`, error);
    throw error;
  }
}

// Ambil data services
export async function fetchServices() {
  return fetchData("/services");
}

// Ambil data gallery
export async function fetchGallery() {
  return fetchData("/gallery");
}
