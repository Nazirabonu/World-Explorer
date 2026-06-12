import { getCountryByCode, getAllCountries } from '../../../lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Users, Map as MapIcon, Globe, Coins, Languages as LanguagesIcon, Clock, Link2, ExternalLink, Car, ShieldCheck, Flag, Calendar } from 'lucide-react';
import StatCard from '../../../components/StatCard';
import BorderCountry from '../../../components/BorderCountry';
import FavoriteButton from '../../../components/FavoriteButton';
import { formatNumberComma } from '../../../utils/formatters';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ cca3: string }> }): Promise<Metadata> {
  try {
    const p = await params;
    const country = await getCountryByCode(p.cca3);
    return {
      title: `${country.name.common} | WorldExplorer`,
      description: `${country.name.common} haqida ma'lumot — aholi (${formatNumberComma(country.population)}), poytaxt (${country.capital?.[0] || "yo'q"})`,
    };
  } catch {
    return {
      title: 'Davlat Topilmadi | WorldExplorer',
    };
  }
}

export default async function CountryDetail({ params }: { params: Promise<{ cca3: string }> }) {
  const p = await params;
  let country;
  try {
    country = await getCountryByCode(p.cca3);
  } catch (error) {
    notFound();
  }

  // Formatting helpers
  const languagesList = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  const currenciesList = country.currencies 
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') 
    : 'N/A';

  // Make parallel API calls to fetch border countries if needed to show names
  let borderCountriesNames: Record<string, string> = {};
  if (country.borders && country.borders.length > 0) {
     try {
       // A quick hack is to fetch all countries to get names for CCA3, or just make individual calls.
       // Fetching all is fast if cached.
       const all = await getAllCountries();
       country.borders.forEach(border => {
         const found = all.find(c => c.cca3 === border);
         if (found) borderCountriesNames[border] = found.name.common;
       });
     } catch (e) {}
  }


  return (
    <div className="max-w-6xl mx-auto px-4 py-4 sm:py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link href="/" className="group inline-flex items-center gap-3 mb-10 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold transition-all bg-white dark:bg-slate-800/50 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md border border-gray-100 dark:border-white/5 w-fit">
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        Orqaga qaytish
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
        {/* Left Col - Flag */}
        <div className="sticky top-28 space-y-6">
          <div className="relative aspect-[4/3] w-full bg-gray-100 dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 dark:border-white/10 group">
            <Image
               src={country.flags.png || country.flags.svg}
               alt={country.flags.alt || `${country.name.common} Flag`}
               fill
               sizes="(max-width: 1024px) 100vw, 50vw"
               className="object-cover transition-transform duration-1000 group-hover:scale-105"
               referrerPolicy="no-referrer"
               unoptimized
               priority
            />
          </div>
          
          {country.maps?.googleMaps && (
            <div className="flex justify-center">
              <a 
                href={country.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer" 
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-slate-800 rounded-[1.5rem] shadow-sm hover:shadow-md border border-gray-200 dark:border-white/10 text-blue-600 dark:text-blue-400 font-semibold transition-all hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                <MapIcon className="w-5 h-5" />
                Google Xaritada Ko&apos;rish
                <ExternalLink className="w-4 h-4 opacity-50 ml-1" />
              </a>
            </div>
          )}
        </div>

        {/* Right Col - Details */}
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-3">
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-gray-900 dark:text-white leading-tight">
               {country.name.common}
             </h1>
             <FavoriteButton cca3={country.cca3} countryName={country.name.common} className="p-4 bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-white/10 flex-shrink-0" />
          </div>
          
          <h2 className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium mb-12 flex items-center gap-2">
            {country.name.official}
          </h2>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(145px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 sm:gap-6 mb-16">
            <StatCard icon={<Globe className="text-blue-500" />} label="Region" value={country.region} />
            <StatCard icon={<Link2 className="text-indigo-500" />} label="Mintaqa" value={country.subregion || 'N/A'} />
            <StatCard icon={<MapIcon className="text-emerald-500" />} label="Poytaxt" value={country.capital?.[0] || 'N/A'} />
            <StatCard icon={<span className="font-bold text-amber-500">km²</span>} label="Maydon" value={formatNumberComma(country.area)} />
            <StatCard icon={<Users className="text-orange-500" />} label="Aholi" value={formatNumberComma(country.population)} />
            <StatCard icon={<LanguagesIcon className="text-pink-500" />} label="Tillar" value={languagesList} />
            <StatCard icon={<Coins className="text-yellow-500" />} label="Valyuta" value={currenciesList} />
            <StatCard icon={<Clock className="text-cyan-500" />} label="Vaqt" value={country.timezones?.[0] || 'N/A'} />
            <StatCard icon={<Globe className="text-blue-400" />} label="Internet Domeni" value={country.tld?.[0] || 'N/A'} />
            <StatCard icon={<ShieldCheck className="text-green-600" />} label="Mustaqillik" value={country.independent ? 'Ha' : 'Yo\'q'} />
            <StatCard icon={<Flag className="text-purple-500" />} label="BMT a'zosi" value={country.unMember ? 'Ha' : 'Yo\'q'} />
            <StatCard icon={<Car className="text-red-400" />} label="Avtomobil yo'li" value={country.car?.side === 'right' ? "O'ng tomon" : country.car?.side === 'left' ? "Chap tomon" : 'N/A'} />
            <StatCard icon={<Calendar className="text-teal-500" />} label="Hafta boshi" value={country.startOfWeek ? country.startOfWeek.charAt(0).toUpperCase() + country.startOfWeek.slice(1) : 'N/A'} />
          </div>

          {/* Borders */}
          <div className="bg-white dark:bg-slate-800/30 p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm">
            <h3 className="text-xl font-bold font-heading tracking-tight text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <MapIcon className="text-gray-400" /> Chegaradosh Davlatlar
            </h3>
            {country.borders && country.borders.length > 0 ? (
              <div className="flex flex-wrap gap-2.5">
                {country.borders.map(border => (
                  <BorderCountry 
                     key={border} 
                     cca3={border} 
                     name={borderCountriesNames[border]} 
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Bu davlatning quruqlikdagi chegaralari yo&apos;q.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
