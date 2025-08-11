import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./Reactbits/**/*.{js,ts,jsx,tsx}", // ⬅️ Scan Reactbits di luar src
    "./node_modules/@aceternity/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      /* --- ANIMASI & FONT (TETAP) --- */
      animation: {
        "fade-in-down": "fadeInDown 0.3s ease-out",
      },
      keyframes: {
        fadeInDown: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },

      /* --- WARNA (DITAMBAH TOKEN) --- */
      colors: {
        /* warna lama – biarkan apa adanya */
        primary: "#841618",
        secondary: "#721419",

        /* token shadcn/ui – ditambah */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        neutral: {
          DEFAULT: "hsl(var(--neutral))",
          foreground: "hsl(var(--neutral-foreground))",
        },
        primaryToken: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondaryToken: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
    },
  },

  plugins: [require("flowbite/plugin")],

  /* --- ALIAS (tetap di sini sesuai permintaan) --- */
  alias: {
    "@": path.resolve(__dirname, "./src"),
    "@reactbits": path.resolve(__dirname, "./Reactbits"), // ⬅️ alias ke folder luar src
  },
};
