// components/common/SkeletonWhoAreWe.jsx
export default function SkeletonWhoAreWe() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 md:px-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16">
        {/* Kiri - Text Skeleton */}
        <div className="w-full md:max-w-xl text-center md:text-left space-y-4">
          <div className="h-4 w-24 skeleton rounded"></div>
          <div className="h-8 w-2/3 skeleton rounded-md"></div>
          <div className="h-8 w-1/2 skeleton rounded-md"></div>
          <div className="space-y-2 mt-4">
            <div className="h-4 w-full skeleton rounded"></div>
            <div className="h-4 w-5/6 skeleton rounded"></div>
            <div className="h-4 w-4/6 skeleton rounded"></div>
          </div>
        </div>

        {/* Kanan - Image Skeleton */}
        <div className="w-full h-[220px] sm:h-[280px] md:w-[500px] md:h-[320px] skeleton rounded-2xl"></div>
      </div>
    </section>
  );
}
