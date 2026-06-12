'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-10 h-10"></div>;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2.5 rounded-full bg-gray-100/80 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all hover:scale-105 active:scale-95 shadow-sm outline-none"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400 drop-shadow-sm transition-transform duration-300 rotate-0" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700 transition-transform duration-300 rotate-0" />
      )}
    </button>
  );
}
