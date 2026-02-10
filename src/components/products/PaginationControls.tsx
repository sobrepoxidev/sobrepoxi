'use client';

import { Link } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationControls({
  currentPage,
  totalPages,
}: PaginationControlsProps) {
  const searchParams = useSearchParams();
  const locale = useLocale();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    params.delete('id');
    return `?${params.toString()}`;
  };

  const showPrev = currentPage > 1;
  const showNext = currentPage < totalPages;

  return (
    <div className="flex justify-center items-center gap-3 mt-8 mb-4">
      <Link
        href={showPrev ? createPageURL(currentPage - 1) : '#'}
        className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
          !showPrev
            ? 'bg-[#1a1a1a] text-gray-600 cursor-not-allowed pointer-events-none border border-gray-800'
            : 'bg-[#1a1a1a] text-white border border-gray-700 hover:border-amber-500/50 hover:text-amber-400'
        }`}
        aria-disabled={!showPrev}
      >
        <ChevronLeft className="h-4 w-4" />
        {locale === 'es' ? 'Anterior' : 'Previous'}
      </Link>

      <span className="text-sm text-gray-400 px-3">
        {currentPage} / {totalPages}
      </span>

      <Link
        href={showNext ? createPageURL(currentPage + 1) : '#'}
        className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
          !showNext
            ? 'bg-[#1a1a1a] text-gray-600 cursor-not-allowed pointer-events-none border border-gray-800'
            : 'bg-[#1a1a1a] text-white border border-gray-700 hover:border-amber-500/50 hover:text-amber-400'
        }`}
        aria-disabled={!showNext}
      >
        {locale === 'es' ? 'Siguiente' : 'Next'}
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
