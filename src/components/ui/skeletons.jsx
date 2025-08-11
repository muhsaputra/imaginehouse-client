export function TestimonialSkeleton({ count = 3 }) {
  return (
    <div className="flex flex-col items-center gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="w-full max-w-xl bg-white dark:bg-neutral-800 rounded-xl shadow p-6 border border-neutral-200 dark:border-neutral-700"
        >
          <div className="flex items-center mb-4 gap-4">
            <div className="w-12 h-12 rounded-full bg-neutral-300 dark:bg-neutral-600" />
            <div className="flex-1">
              <div className="h-4 w-32 bg-neutral-300 dark:bg-neutral-600 rounded mb-2" />
              <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-500 rounded" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-600 rounded" />
            <div className="h-3 w-5/6 bg-neutral-200 dark:bg-neutral-600 rounded" />
            <div className="h-3 w-2/3 bg-neutral-200 dark:bg-neutral-600 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
