import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: "2025-07-01", // tanggal API terbaru
  useCdn: true, // true untuk caching cepat
});
