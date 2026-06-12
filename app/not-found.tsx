import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-9xl font-bold text-gray-200 dark:text-slate-700">404</h1>
      <h2 className="text-2xl mt-4 mb-2 font-semibold text-gray-800 dark:text-gray-200">Sahifa topilmadi</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Siz qidirayotgan sahifa mavjud emas yoki o&apos;chirilgan bo&apos;lishi mumkin.
      </p>
      <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
