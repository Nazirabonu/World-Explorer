import { getAllCountries } from '../lib/api';
import CountriesClient from './CountriesClient';
import { Globe } from 'lucide-react';

export default async function Home() {
  const initialCountries = await getAllCountries();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[32px] md:rounded-[40px] px-6 py-16 md:py-24 mb-12 sm:mb-16 mt-4 shadow-xl border border-white/10 mx-2">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 text-white/5 transform rotate-12 pointer-events-none hidden md:block">
          <Globe className="w-96 h-96" />
        </div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 text-white/5 transform -rotate-12 pointer-events-none">
          <Globe className="w-64 h-64" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 mb-6 font-medium text-sm sm:text-base">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span> {initialCountries.length} ta davlat ma&apos;lumotlari </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Dunyo davlatlarini <br className="hidden sm:block" /> kashf eting
          </h1>
          
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto font-medium leading-relaxed">
            Har bir davlatning joylashuvi, aholisi, valyutasi va boshqa qiziqarli ma&apos;lumotlarini izlab toping.
          </p>
        </div>
      </div>

      <div className="px-2">
        <CountriesClient initialCountries={initialCountries} />
      </div>
    </div>
  );
}
