interface RegionFilterProps {
  selected: string;
  onChange: (region: string) => void;
}

export default function RegionFilter({ selected, onChange }: RegionFilterProps) {
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <div className="flex flex-nowrap whitespace-nowrap gap-3 pb-1 md:pb-0 hide-scrollbar pt-1 pl-1">
      {regions.map((region) => (
        <button
          key={region}
          onClick={() => onChange(region)}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 md:hover:-translate-y-0.5 ${
            selected === region
              ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md shadow-blue-500/20'
              : 'bg-white/50 dark:bg-slate-800/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white hover:shadow-sm'
          }`}
        >
          {region}
        </button>
      ))}
    </div>
  );
}
