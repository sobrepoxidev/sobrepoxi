// CategoryCarousel.tsx
// Horizontal product category navigation. Keeps category routes stable.

import { use } from 'react';
import Link from 'next/link';
import { getProductCategories } from '../../../application/search';

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

export default function CategoryCarousel({ locale, categories, className = '' }: Props) {
  const cats: Category[] = categories ?? use(getProductCategories(locale));

  const displayName = (cat: Category) => {
    if (locale === 'es') return cat.name_es ?? cat.name ?? '';
    return cat.name_en ?? cat.name ?? '';
  };

  if (cats.length === 0) return null;

  return (
    <div className={`overflow-x-auto whitespace-nowrap scrollbar-hide max-w-[1500px] mx-auto w-full ${className}`}>
      <div className="flex gap-2 py-1 sm:items-center">
        {cats.map((cat, index) => {
          const name = displayName(cat);
          const href = `/search?category=${cat.id}`;
          return (
            <Link
              key={cat.id}
              href={href}
              className={`shrink-0 rounded-full border border-stone-50/10 bg-stone-50/6 px-3 py-1.5 text-xs font-bold text-stone-300 transition-[border-color,background-color,color] duration-300 hover:border-amber-200/35 hover:bg-amber-200/10 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 ${index === 0 ? 'max-sm:ml-1' : ''} ${index === cats.length - 1 ? 'max-sm:mr-1' : ''}`}
            >
              {name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
