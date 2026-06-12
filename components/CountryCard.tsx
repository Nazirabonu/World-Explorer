import Image from 'next/image';
import Link from 'next/link';
import { Users, Globe, MapPin } from 'lucide-react';
import { Country } from '../types';
import { formatNumberComma } from '../utils/formatters';
import FavoriteButton from './FavoriteButton';

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/country/${country.cca3}`} className="block h-full group outline-none">
      <div className="bg-white dark:bg-slate-800/80 rounded-[24px] shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-blue-900/20 transition-all duration-500 overflow-hidden border border-gray-100 dark:border-white/5 h-full flex flex-col transform group-hover:-translate-y-2 group-focus-visible:ring-4 group-focus-visible:ring-blue-500/50">
        <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-slate-900 overflow-hidden">
          <Image 
            src={country.flags.png || country.flags.svg} 
            alt={country.flags.alt || `${country.name.common} flag`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            referrerPolicy="no-referrer"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-3 right-3 z-10">
            <FavoriteButton cca3={country.cca3} countryName={country.name.common} className="shadow-lg backdrop-blur-md" />
          </div>
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="font-extrabold text-2xl mb-5 text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {country.name.common}
          </h3>
          <div className="space-y-3 px-1 text-[15px] text-gray-600 dark:text-gray-400 mt-auto">
            <p className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
              <span className="font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2"><Users className="w-4 h-4 text-blue-500"/> Aholi</span> 
              <span className="text-gray-900 dark:text-gray-200 font-medium">{formatNumberComma(country.population)}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-2">
              <span className="font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2"><Globe className="w-4 h-4 text-emerald-500"/> Region</span> 
              <span className="text-gray-900 dark:text-gray-200 font-medium">{country.region}</span>
            </p>
            <p className="flex justify-between pb-1">
              <span className="font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2"><MapPin className="w-4 h-4 text-rose-500"/> Poytaxt</span> 
              <span className="line-clamp-1 text-right ml-2 text-gray-900 dark:text-gray-200 font-medium">{country.capital?.[0] || 'N/A'}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
