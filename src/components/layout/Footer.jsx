export default function Footer() {
  return (
    <footer className="bg-[#841618] dark:bg-[#5c1011]">
      <div className="mx-auto w-full max-w-screen-xl p-6 lg:py-10 text-center text-white">
        <div className="flex flex-col items-center">
          <img
            src="/public/AlternativeWhite.png" // Ganti dengan path logo Imagine House
            className="h-10 mb-3"
            alt="Imagine House Logo"
          />
          <p className="text-gray-200 max-w-lg mb-6 text-sm">
             Bukan sekadar gambar tapi emosi, makna, dan cerita di balik setiap
            frame.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <a href="/about" className="hover:underline">
              Beranda
            </a>
            <a href="/about" className="hover:underline">
              Tentang
            </a>
            <a href="/service" className="hover:underline">
              Layanan
            </a>
            <a href="/portfolio" className="hover:underline">
              Portfolio
            </a>
            <a href="/blog" className="hover:underline">
              Blog
            </a>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
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
