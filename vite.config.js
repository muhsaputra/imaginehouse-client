import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/", // base path aman untuk Vercel
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // hapus @dashboard karena folder sudah tidak ada
    },
  },
  server: {
    port: 5173,
    open: true,
    host: true,
    proxy: {
      "/api": {
        target: "https://imaginehouse-backend-production.up.railway.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 4173,
    host: true,
  },
});
