export default function CountryLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-10 w-24 bg-gray-300 dark:bg-slate-700 rounded-lg mb-8" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-[4/3] w-full bg-gray-300 dark:bg-slate-700 rounded-xl" />
        
        <div>
          <div className="h-10 bg-gray-300 dark:bg-slate-700 w-3/4 rounded-lg mb-4" />
          <div className="h-6 bg-gray-300 dark:bg-slate-700 w-2/4 rounded flex mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
             {Array.from({length: 8}).map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700" />
             ))}
          </div>

          <div className="h-32 bg-gray-200 dark:bg-slate-800 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
