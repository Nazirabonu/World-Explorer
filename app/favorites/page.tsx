'use client';

import { useEffect, useState } from 'react';
import { Country } from '../../types';
import { getCountryByCode } from '../../lib/api';
import CountryCard from '../../components/CountryCard';
import { useFavorites } from '../../hooks/useFavorites';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      if (favorites.length === 0) {
        setCountries([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const fetchPromises = favorites.map(code => getCountryByCode(code));
        const results = await Promise.all(fetchPromises);
        // filter out potentially null results if an API error occurred for one
        setCountries(results.filter(Boolean));
      } catch (error) {
        console.error("Error fetching favorite countries:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, [favorites]);

  const clearAll = () => {
    if (confirm("Barcha sevimli davlatlarni o'chirib tashlamoqchimisiz?")) {
      [...favorites].forEach(code => toggleFavorite(code));
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 bg-white dark:bg-slate-800/40 p-6 sm:p-8 rounded-[24px] border border-gray-100 dark:border-white/5 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
          <span className="text-red-500 bg-red-100 dark:bg-red-500/20 p-2.5 rounded-2xl">❤️</span> Sevimli Davlatlar
        </h1>
        {favorites.length > 0 && (
          <button 
            onClick={clearAll}
            className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
            <span>Hammasini tozalash</span>
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Yuklanmoqda...</div>
      ) : countries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {countries.map(country => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white dark:bg-slate-800/40 rounded-[24px] border border-gray-100 dark:border-white/5 shadow-sm">
          <p className="text-2xl font-medium text-gray-900 dark:text-white mb-3">Hali sevimli davlat qo&apos;shilmagan ❤️</p>
          <Link href="/" className="inline-block mt-4 text-blue-600 hover:text-blue-500 bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 dark:text-blue-400 font-medium px-8 py-3 rounded-full transition-colors">
            Bosh sahifaga o&apos;tib davlatlarni qidirish
          </Link>
        </div>
      )}
    </div>
  );
}
