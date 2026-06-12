import Link from 'next/link';

interface BorderCountryProps {
  cca3: string;
  name?: string;
}

export default function BorderCountry({ cca3, name }: BorderCountryProps) {
  return (
    <Link 
      href={`/country/${cca3}`}
      className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm font-medium transition-all text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 inline-block"
    >
      {name || cca3}
    </Link>
  );
}
