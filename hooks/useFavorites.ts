'use client';
import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const stored = localStorage.getItem('world_explorer_favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing favorites', e);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('world_explorer_favorites', JSON.stringify(favorites));
    }
  }, [favorites, mounted]);

  const toggleFavorite = (cca3: string) => {
    setFavorites(prev => 
      prev.includes(cca3) 
        ? prev.filter(c => c !== cca3)
        : [...prev, cca3]
    );
  };

  const isFavorite = (cca3: string) => {
    return favorites.includes(cca3);
  };

  return { favorites, toggleFavorite, isFavorite };
}
