'use client';

import { useState, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Check, ChevronDown, ChevronUp, Sliders, X } from 'lucide-react';
import { Database } from '@/types-db';

type Category = Database['categories'];

interface FilterProps {
  categories: Category[];
  brands: string[];
  tags: string[];
  isMobile?: boolean;
  locale: string;
}

export default function ProductFilters({
  categories,
  isMobile = false,
  locale
}: FilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [categoryOpen, setCategoryOpen] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const selectedCategory = searchParams.get('category');

  const updateFilters = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const filterContent = useMemo(() => (
    <div className="space-y-4">
      {/* Categories */}
      <div className="pb-4 border-b border-gray-800">
        <button
          className="flex w-full items-center justify-between text-sm font-semibold text-white mb-3 uppercase tracking-wider"
          onClick={() => setCategoryOpen(!categoryOpen)}
        >
          {locale === 'es' ? 'Categorías' : 'Categories'}
          {categoryOpen ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
        </button>

        {categoryOpen && (
          <div className="space-y-0.5">
            <button
              onClick={() => updateFilters({ category: null })}
              className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                !selectedCategory
                  ? 'bg-amber-400/10 text-amber-400 font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex-1 text-left">{locale === 'es' ? 'Todas' : 'All'}</span>
              {!selectedCategory && <Check className="h-3.5 w-3.5" />}
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => updateFilters({ category: String(category.id) })}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                  selectedCategory === String(category.id)
                    ? 'bg-amber-400/10 text-amber-400 font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex-1 text-left">{locale === 'es' ? category.name_es : category.name_en}</span>
                {selectedCategory === String(category.id) && <Check className="h-3.5 w-3.5" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  ), [categories, categoryOpen, selectedCategory, updateFilters, locale]);

  // Mobile
  if (isMobile) {
    return (
      <div className="lg:hidden">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center justify-center w-full py-2.5 px-4 bg-[#1a1a1a] border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-amber-500/50 hover:text-amber-400 transition-all"
        >
          <Sliders className="h-4 w-4 mr-2" />
          {locale === 'es' ? 'Filtrar' : 'Filter'}
          {selectedCategory && (
            <span className="ml-2 text-xs bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded-full">1</span>
          )}
        </button>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex" onClick={() => setMobileFiltersOpen(false)}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
              className="relative ml-auto w-full max-w-xs bg-[#1a1a1a] h-full overflow-y-auto p-5 border-l border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">{locale === 'es' ? 'Filtros' : 'Filters'}</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {filterContent}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop
  return (
    <div className="hidden lg:block">
      {filterContent}
    </div>
  );
}
