interface SortDropdownProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="relative inline-block w-full sm:w-56">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block appearance-none w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 py-3.5 px-5 pr-10 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-300 font-medium cursor-pointer"
      >
        <option value="name_asc">Alifbo bo&apos;yicha (A-Z)</option>
        <option value="pop_desc">Aholi (ko&apos;pdan kamga)</option>
        <option value="pop_asc">Aholi (kamdan ko&apos;pga)</option>
        <option value="area_desc">Maydon (kattadan kichigiga)</option>
        <option value="area_asc">Maydon (kichikdan kattagiga)</option>
        <option value="density_desc">Zichlik (yuqoridan pastga)</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center px-2 text-gray-500 dark:text-gray-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
