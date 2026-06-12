import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Davlat qidirish..." }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
      </div>
      <input
        type="text"
        className="block w-full pl-12 pr-12 py-3.5 border border-gray-200 dark:border-white/10 rounded-full leading-5 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 shadow-sm sm:text-base transition-all duration-300 hover:shadow-md"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-2 pr-2 flex items-center"
        >
          <div className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" />
          </div>
        </button>
      )}
    </div>
  );
}
