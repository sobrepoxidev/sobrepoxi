'use client';

// CategoryCarousel.tsx
// Horizontal product category navigation. Keeps category routes stable.

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Category {
  id: number;
  name?: string;
  name_es?: string;
  name_en?: string;
}

interface Props {
  locale: string;
  categories?: Category[];
  className?: string;
}

export default function CategoryCarousel({ locale, categories = [], className = '' }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const displayName = (cat: Category) => {
    if (locale === 'es') return cat.name_es ?? cat.name ?? '';
    return cat.name_en ?? cat.name ?? '';
  };

  const scrollBy = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -280 : 280,
      behavior: 'smooth',
    });
  };

  if (categories.length === 0) return null;

  return (
    <div className={`relative mx-auto w-full max-w-[1500px] overflow-hidden ${className}`}>
      <button
        type="button"
        aria-label={locale === 'es' ? 'Ver categorías anteriores' : 'View previous categories'}
        onClick={() => scrollBy('left')}
        className="absolute left-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-stone-50/10 bg-[oklch(12%_0.017_58_/_0.92)] text-stone-200 shadow-[0_10px_24px_oklch(4%_0.01_40_/_0.35)] backdrop-blur-md transition-[background-color,color,transform] duration-300 hover:-translate-x-0.5 hover:bg-amber-200 hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 lg:flex"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>

      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-2 overflow-x-auto scroll-smooth px-1 py-1 pr-12 lg:px-11"
      >
        {categories.map((cat) => {
          const name = displayName(cat);
          const href = `/search?category=${cat.id}`;
          return (
            <Link
              key={cat.id}
              href={href}
              className="shrink-0 rounded-full border border-stone-50/10 bg-stone-50/6 px-4 py-2 text-sm font-bold text-stone-300 transition-[border-color,background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-amber-200/35 hover:bg-amber-200/10 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
            >
              {name}
            </Link>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-[oklch(12%_0.017_58)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[oklch(12%_0.017_58)] to-transparent" />

      <button
        type="button"
        aria-label={locale === 'es' ? 'Ver más categorías' : 'View more categories'}
        onClick={() => scrollBy('right')}
        className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-stone-50/10 bg-[oklch(12%_0.017_58_/_0.92)] text-amber-100 shadow-[0_10px_24px_oklch(4%_0.01_40_/_0.35)] backdrop-blur-md transition-[background-color,color,transform] duration-300 hover:translate-x-0.5 hover:bg-amber-200 hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
