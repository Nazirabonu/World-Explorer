'use client';

import ErrorMessage from '../components/ErrorMessage';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <ErrorMessage 
        message={error.message || 'Xatolik yuz berdi. Iltimos qayta urinib koring.'} 
        onRetry={() => reset()} 
      />
    </div>
  );
}
