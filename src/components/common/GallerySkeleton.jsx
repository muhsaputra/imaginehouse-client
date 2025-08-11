// components/GallerySkeleton.jsx
export default function GallerySkeleton() {
  return (
    <section className="h-screen py-20 w-full text-center mb-8 bg-white animate-pulse">
      <div className="mb-2">
        <div className="h-4 w-24 mx-auto bg-gray-300 rounded-full mb-4" />
      </div>
      <div className="h-8 w-64 bg-gray-300 mx-auto rounded-md mb-4" />
      <div className="h-4 w-80 bg-gray-200 mx-auto mb-8 rounded" />
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full h-60 bg-gray-200 rounded-xl" />
        ))}
      </div>
    </section>
  );
}
