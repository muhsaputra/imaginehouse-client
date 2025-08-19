// components/common/SkeletonBreadcrumb.jsx
export default function SkeletonBreadcrumb() {
  return (
    <div className="relative w-full h-64 bg-gray-300 animate-pulse">
      {/* Overlay biar mirip hero image */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
        {/* Title skeleton */}
        <div className="h-8 w-40 bg-gray-200 rounded"></div>
        {/* Path skeleton */}
        <div className="flex space-x-2">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
