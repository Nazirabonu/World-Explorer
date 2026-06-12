import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg max-w-lg mx-auto mt-10 text-center">
      <AlertTriangle className="h-10 w-10 text-red-500 dark:text-red-400 mb-4" />
      <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">Xatolik yuz berdi</h3>
      <p className="text-red-600 dark:text-red-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
        >
          Qayta urinish
        </button>
      )}
    </div>
  );
}
