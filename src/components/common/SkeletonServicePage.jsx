SkeletonServicePage.jsx;
import React from "react";

export default function SkeletonServicePage() {
  return (
    <div className="animate-pulse">
      {/* Hero Section */}

      {/* Service Section */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <div className="h-4 w-24 bg-gray-300 mx-auto mb-2"></div>
          <div className="h-6 w-2/3 bg-gray-300 mx-auto mb-4"></div>
          <div className="h-4 w-3/4 bg-gray-200 mx-auto"></div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg shadow-sm"
            >
              {/* Icon */}
              <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
              {/* Title */}
              <div className="h-5 w-24 bg-gray-300"></div>
              {/* Text */}
              <div className="h-3 w-3/4 bg-gray-200"></div>
              <div className="h-3 w-2/3 bg-gray-200"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
