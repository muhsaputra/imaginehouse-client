// components/common/SkeletonAbout.jsx
export default function SkeletonAbout() {
  return (
    <section className="bg-white dark:bg-gray-900 animate-pulse">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        {/* Text Skeleton */}
        <div className="space-y-4 w-full">
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
          <div className="h-8 w-2/3 bg-gray-300 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
            <div className="h-4 w-4/6 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Image Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 w-full max-w-3xl">
          <div className="w-full h-64 sm:h-64 md:h-72 bg-gray-300 rounded-xl"></div>
          <div className="w-full h-64 sm:h-64 md:h-72 bg-gray-300 rounded-xl sm:mt-6"></div>
        </div>
      </div>
    </section>
  );
}
