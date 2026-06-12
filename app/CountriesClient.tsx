'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Country } from '../types';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import RegionFilter from '../components/RegionFilter';
import SortDropdown from '../components/SortDropdown';
import { useDebounce } from '../hooks/useDebounce';

interface CountriesClientProps {
  initialCountries: Country[];
}

export default function CountriesClient({ initialCountries }: CountriesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [sortBy, setSortBy] = useState('name_asc');
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredAndSorted = useMemo(() => {
    let result = [...initialCountries];

    // Filter by Region
    if (selectedRegion !== 'All') {
      result = result.filter(c => c.region === selectedRegion);
    }

    // Filter by Search
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase().trim();
      result = result.filter(c => 
        c.name.common.toLowerCase().includes(q) || 
        c.name.official.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name_asc':
          return a.name.common.localeCompare(b.name.common);
        case 'pop_desc':
          return b.population - a.population;
        case 'pop_asc':
          return a.population - b.population;
        case 'area_desc':
          return (b.area || 0) - (a.area || 0);
        case 'area_asc':
          return (a.area || 0) - (b.area || 0);
        case 'density_desc':
          const densityA = a.population / (a.area || 1);
          const densityB = b.population / (b.area || 1);
          return densityB - densityA;
        default:
          return 0;
      }
    });

    return result;
  }, [initialCountries, debouncedSearch, selectedRegion, sortBy]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="mb-12 space-y-6">
        <div className="flex flex-col md:flex-row gap-5 items-center justify-between bg-white/60 dark:bg-slate-800/40 p-3 sm:p-4 rounded-[28px] border border-gray-100 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none backdrop-blur-xl">
          <div className="w-full md:flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="w-full md:w-auto shrink-0 border-t border-gray-100 dark:border-white/5 md:border-t-0 md:border-l md:pl-5 pt-5 md:pt-0">
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>
        
        <div className="w-full relative">
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 dark:from-[#0B1121] to-transparent z-10 pointer-events-none md:hidden" />
          <div className="overflow-x-auto hide-scrollbar pb-2">
            <RegionFilter selected={selectedRegion} onChange={setSelectedRegion} />
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between px-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          Natijalar
          <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-sm font-bold w-7 h-7 rounded-full">
            {filteredAndSorted.length}
          </span>
        </h2>
      </div>

      {filteredAndSorted.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredAndSorted.map((country, index) => (
              <motion.div
                key={country.cca3}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3, delay: index < 12 ? Math.min(index * 0.05, 0.2) : 0 }}
              >
                <CountryCard country={country} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24 bg-white dark:bg-slate-800/40 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm"
        >
          <p className="text-2xl font-medium text-gray-900 dark:text-white mb-3">Davlat topilmadi 🔍</p>
          <p className="text-gray-500 dark:text-gray-400">Boshqa so&apos;z bilan izlab ko&apos;ring</p>
          <button 
            className="mt-6 px-6 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-full font-medium transition-colors hover:scale-105 active:scale-95"
            onClick={() => { setSearchQuery(''); setSelectedRegion('All'); }}
          >
            Filtrlarni tozalash
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
