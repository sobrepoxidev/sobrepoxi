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
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="text-center">
        <h1 className="text-6xl font-bold gold-gradient mb-4">404</h1>
        <p className="text-2xl gold-gradient-bright mb-8">Page Not Found</p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 bg-[#303030] text-[#b68b44] rounded hover:bg-[#81786c]"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}