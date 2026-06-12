export default function Loading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden animate-pulse">
          <div className="h-40 bg-gray-300 dark:bg-slate-700 w-full" />
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gray-300 dark:bg-slate-700 rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-full" />
              <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-5/6" />
              <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-4/6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
