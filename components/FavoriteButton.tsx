'use client';

import { useFavorites } from '../hooks/useFavorites';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  cca3: string;
  countryName: string;
  className?: string;
}

export default function FavoriteButton({ cca3, countryName, className = "" }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(cca3);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(cca3);
      }}
      className={`p-2.5 rounded-full transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-90 ${
        favorite 
          ? 'bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-500/20 dark:hover:bg-red-500/30' 
          : 'bg-white/80 text-gray-400 hover:text-gray-600 hover:bg-white dark:bg-slate-800/80 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-gray-200'
      } ${className}`}
      title={favorite ? "Sevimli davlatlardan o'chirish" : "Sevimli davlatlarga qo'shish"}
      aria-label={`${favorite ? 'Remove' : 'Add'} ${countryName} from favorites`}
    >
      <Heart className={`w-5 h-5 transition-all duration-300 ${favorite ? 'fill-current scale-110' : 'scale-100'}`} />
    </button>
  );
}
