import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/", // pastikan base path benar untuk Vercel
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@dashboard": path.resolve(__dirname, "./src/dashboard"),
    },
  },
  server: {
    port: 5173,
    open: true,
    host: true,
    // ini penting untuk React Router agar tidak 404 saat refresh
    historyApiFallback: true,
  },
  preview: {
    port: 4173,
    host: true,
    // fallback juga untuk preview mode
    historyApiFallback: true,
  },
});
