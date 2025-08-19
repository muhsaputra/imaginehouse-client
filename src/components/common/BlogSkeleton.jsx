"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function BlogSkeleton() {
  return (
    <div className="w-full">
      {/* Breadcrumb Skeleton */}
      <div className="relative h-[200px] w-full mb-12">
        <Skeleton className="h-full w-full rounded-xl" />
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-4">
          <Skeleton className="h-6 w-40" /> {/* breadcrumb text */}
          <Skeleton className="h-10 w-64" /> {/* page title */}
        </div>
      </div>

      {/* Blog Section Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden shadow-md">
            {/* Image */}
            <Skeleton className="h-52 w-full" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-4 w-24" /> {/* category/tag */}
              <Skeleton className="h-6 w-48" /> {/* title */}
              <Skeleton className="h-4 w-full" /> {/* excerpt line 1 */}
              <Skeleton className="h-4 w-3/4" /> {/* excerpt line 2 */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
