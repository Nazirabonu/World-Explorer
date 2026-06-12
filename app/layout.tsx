import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';
import { ThemeProvider } from '../components/ThemeProvider';
import ScrollToTop from '../components/ScrollToTop';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'WorldExplorer',
  description: 'REST Countries API • Next.js bilan qurilgan',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${space.variable}`}>
      <body className="bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm border-b border-gray-100 dark:border-white/5 sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl sm:text-2xl font-extrabold font-heading tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-2xl sm:text-3xl">🌍</span> 
              <span className="hidden sm:inline text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">WorldExplorer</span>
            </Link>
            <nav className="flex items-center gap-4 sm:gap-6">
              <Link href="/" className="font-semibold text-sm sm:text-base text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Bosh Sahifa</Link>
              <Link href="/favorites" className="font-semibold text-sm sm:text-base text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-colors">Sevimlilar</Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>

        <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
           <ScrollToTop />
          {children}
        </main>


        <footer className="bg-white dark:bg-slate-900 py-8 border-t border-gray-200 dark:border-white/5 text-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
          <div className="max-w-[1400px] mx-auto px-4 font-medium">
            REST Countries API bilan tuzilgan 🌍
          </div>
        </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
