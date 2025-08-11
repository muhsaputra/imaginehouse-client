import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, // ganti dari sanity.json / manage.sanity.io
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: "2025-07-01", // bulan dan hari cukup sesuai // pakai tanggal hari ini
  useCdn: true,
});
