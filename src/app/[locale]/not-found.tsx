'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}

function NotFoundContent() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}