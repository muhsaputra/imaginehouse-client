import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#841618] dark:bg-[#5c1011] mt-48">
      <div className="mx-auto w-full max-w-screen-xl p-6 lg:py-10 text-center text-white">
        <div className="flex flex-col items-center">
          <img
            src="/AlternativeWhite.png"
            className="h-10 mb-7 "
            alt="Imagine House Logo"
          />
          <p className="text-gray-200 max-w-lg mb-6 text-sm">
            Bukan sekadar gambar tapi emosi, makna, dan cerita di balik setiap
            frame.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <Link to="/">Beranda</Link>
            <Link to="/about">Tentang</Link>
            <Link to="/service">Layanan</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <p className="text-sm text-gray-300 mt-6">
          © 2025 <span className="font-semibold">Imagine House</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
