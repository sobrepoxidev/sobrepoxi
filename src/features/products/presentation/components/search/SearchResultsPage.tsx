'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Link } from '@/shared/i18n/navigation';
import Image from 'next/image';
import { SearchResult, searchProducts } from '@/features/products';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import PaginationControls from '../PaginationControls';
import ProductCard from '../ProductCard';
import { createBrowserSupabaseClient } from '@/shared/supabase/client';
import { Database } from '@/shared/types/database';

// Número de productos por página
const PRODUCTS_PER_PAGE = 12;

export default function SearchResultsPage({ locale }: { locale: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = (searchParams.get('q') || '').trim();
  const categoryParam = searchParams.get('category') || 'Todo';
  // Category filter can be either id or name. "Todo"/"Todas" means browse everything.
  const isCategoryFilter = categoryParam !== 'Todo' && categoryParam !== 'Todas';
  const category = categoryParam;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const currentSortBy = searchParams.get('sort') || 'relevance';

  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState(currentSortBy);
  const [categories, setCategories] = useState<Database['categories'][]>([]);
  const [categoryName, setCategoryName] = useState('');

  const hasQuery = query.length >= 2;

  // Cargar categorías
  useEffect(() => {
    async function fetchCategories() {
      try {
        const supabase = createBrowserSupabaseClient();
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order(locale === 'es' ? 'name_es' : 'name_en', { ascending: true });

        if (error) throw error;
        setCategories(data || []);
        if (isCategoryFilter) {
          const categoryData = (data || []).find(
            (cat) =>
              String(cat.id) === categoryParam ||
              cat.name === categoryParam ||
              cat.name_es === categoryParam ||
              cat.name_en === categoryParam,
          );
          setCategoryName((locale === 'es' ? categoryData?.name_es : categoryData?.name_en) || '');
        } else {
          setCategoryName('');
        }
      } catch (err) {
        console.error('Error al cargar categorías:', err);
      }
    }

    fetchCategories();
  }, [categoryParam, isCategoryFilter, locale]);

  // Función para actualizar los parámetros de búsqueda y navegar
  const updateSearchParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      // Siempre resetear a página 1 cuando cambian los filtros
      if (Object.keys(updates).some((key) => key !== 'page')) {
        params.set('page', '1');
      }

      router.push(`/search?${params.toString()}`);
    },
    [searchParams, router],
  );

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      try {
        const supabase = createBrowserSupabaseClient();

        // Resolve category param (id or name) to a numeric id. null = all categories.
        let categoryId: number | null = null;
        if (isCategoryFilter) {
          if (/^\d+$/.test(category)) {
            categoryId = Number(category);
          } else {
            const { data: catRow } = await supabase
              .from('categories')
              .select('id')
              .or(`name.eq.${category},name_es.eq.${category},name_en.eq.${category}`)
              .limit(1)
              .maybeSingle();
            categoryId = catRow?.id ?? null;
          }
        }

        // Expand to child categories so a parent filter also matches its children
        // (mirrors the catalog page behaviour).
        let categoryIds: number[] | null = null;
        if (categoryId !== null) {
          const { data: childRows } = await supabase
            .from('categories')
            .select('id')
            .eq('parent_id', categoryId);
          categoryIds = [categoryId, ...((childRows || []).map((r) => r.id))];
        }

        // Text search path (full-text helper handles category by name).
        if (hasQuery) {
          const { results: data, totalCount } = await searchProducts(
            query,
            locale,
            isCategoryFilter ? category : undefined,
            currentPage,
            PRODUCTS_PER_PAGE,
            sortBy,
            true,
          );
          setResults(data);
          setTotalCount(totalCount);
          return;
        }

        // Browse path (no query): list active products, optionally filtered by category.
        const from = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const to = from + PRODUCTS_PER_PAGE - 1;

        let q = supabase
          .from('products')
          .select(
            'id, name, name_es, name_en, description, colon_price, dolar_price, media, category_id, discount_percentage, created_at',
            { count: 'exact' },
          )
          .eq('is_active', true);

        if (categoryIds !== null) q = q.in('category_id', categoryIds);

        if (sortBy === 'price-asc') q = q.order('dolar_price', { ascending: true });
        else if (sortBy === 'price-desc') q = q.order('dolar_price', { ascending: false });
        else if (sortBy === 'newest') q = q.order('created_at', { ascending: false });
        else q = q.order(locale === 'es' ? 'name_es' : 'name_en', { ascending: true });

        const { data, count, error } = await q.range(from, to);
        if (error) throw error;

        setResults((data || []) as SearchResult[]);
        setTotalCount(count || 0);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, categoryParam, isCategoryFilter, sortBy, currentPage, locale]);

  // Actualizar el estado local cuando cambian los parámetros de URL
  useEffect(() => {
    setSortBy(currentSortBy);
  }, [currentSortBy]);

  const heading = hasQuery
    ? totalCount > 0
      ? `${locale === 'es' ? 'Resultados para' : 'Results for'} "${query}"`
      : `${locale === 'es' ? 'No se encontraron resultados para' : 'No results found for'} "${query}"`
    : isCategoryFilter
      ? categoryName || (locale === 'es' ? 'Productos' : 'Products')
      : locale === 'es'
        ? 'Todos los productos'
        : 'All products';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center text-sm text-gray-400">
        <Link href="/" className="hover:text-amber-400 transition-colors">{locale === 'es' ? 'Inicio' : 'Home'}</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="font-medium text-white">{locale === 'es' ? 'Resultados de búsqueda' : 'Search results'}</span>
      </div>

      {/* Search header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{heading}</h1>
        {totalCount > 0 && (
          <p className="text-gray-400">
            {totalCount} {locale === 'es' ? 'productos' : 'products'}
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-60 flex-shrink-0">
          <div className="bg-[#1a1a1a] rounded-xl border border-white/10 p-4 sticky top-24">
            <h2 className="font-semibold text-lg mb-4 text-white">{locale === 'es' ? 'Filtros' : 'Filters'}</h2>

            <div className="mb-6">
              <h3 className="font-medium mb-3 text-gray-300 text-sm uppercase tracking-wider">{locale === 'es' ? 'Categoría' : 'Category'}</h3>
              <div className="space-y-1.5 text-gray-300">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="Todas"
                    checked={!isCategoryFilter}
                    className="h-4 w-4 accent-amber-500"
                    onChange={() => updateSearchParams({ category: null })}
                  />
                  <span className="ml-2 text-sm">{locale === 'es' ? 'Todas las categorías' : 'All categories'}</span>
                </label>

                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={String(cat.id)}
                      checked={category === String(cat.id) || category === cat.name}
                      className="h-4 w-4 accent-amber-500"
                      onChange={() => updateSearchParams({ category: String(cat.id) })}
                    />
                    <span className="ml-2 text-sm">{locale === 'es' ? cat.name_es : cat.name_en}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-gray-300 text-sm uppercase tracking-wider">{locale === 'es' ? 'Ordenar por' : 'Sort by'}</h3>
              <select
                className="w-full bg-[#121212] border border-white/10 rounded-lg p-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-amber-500/40 focus:border-amber-500/40"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  updateSearchParams({ sort: e.target.value });
                }}
              >
                <option value="relevance">{locale === 'es' ? 'Relevancia' : 'Relevance'}</option>
                <option value="price-asc">{locale === 'es' ? 'Precio: menor a mayor' : 'Price: lowest to highest'}</option>
                <option value="price-desc">{locale === 'es' ? 'Precio: mayor a menor' : 'Price: highest to lowest'}</option>
                <option value="newest">{locale === 'es' ? 'Más recientes' : 'Newest'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile filters button */}
        <div className="lg:hidden mb-2">
          <button
            className="flex items-center justify-center w-full py-2.5 border border-white/10 rounded-lg bg-[#1a1a1a] text-gray-200 hover:border-amber-500/40 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {locale === 'es' ? 'Filtros y ordenación' : 'Filters and sorting'}
          </button>

          {showFilters && (
            <div className="mt-2 p-4 border border-white/10 rounded-lg bg-[#1a1a1a] space-y-4">
              <div>
                <h3 className="font-medium mb-2 text-gray-300 text-sm">{locale === 'es' ? 'Categoría' : 'Category'}</h3>
                <select
                  className="w-full bg-[#121212] border border-white/10 rounded-lg p-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-amber-500/40"
                  value={isCategoryFilter ? category : 'Todas'}
                  onChange={(e) => updateSearchParams({ category: e.target.value === 'Todas' ? null : e.target.value })}
                >
                  <option value="Todas">{locale === 'es' ? 'Todas las categorías' : 'All categories'}</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={String(cat.id)}>
                      {locale === 'es' ? cat.name_es : cat.name_en}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="font-medium mb-2 text-gray-300 text-sm">{locale === 'es' ? 'Ordenar por' : 'Sort by'}</h3>
                <select
                  className="w-full bg-[#121212] border border-white/10 rounded-lg p-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-amber-500/40"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    updateSearchParams({ sort: e.target.value });
                  }}
                >
                  <option value="relevance">{locale === 'es' ? 'Relevancia' : 'Relevance'}</option>
                  <option value="price-asc">{locale === 'es' ? 'Precio: menor a mayor' : 'Price: lowest to highest'}</option>
                  <option value="price-desc">{locale === 'es' ? 'Precio: mayor a menor' : 'Price: highest to lowest'}</option>
                  <option value="newest">{locale === 'es' ? 'Más recientes' : 'Newest'}</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex-grow min-w-0">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
            </div>
          ) : totalCount > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product as Database['products']} />
                ))}
              </div>

              {/* Paginación */}
              {totalCount > PRODUCTS_PER_PAGE && (
                <div className="mt-8">
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={Math.ceil(totalCount / PRODUCTS_PER_PAGE)}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-[#1a1a1a] rounded-xl border border-white/10">
              <div className="mb-4">
                <Image
                  src={`/no-results.svg`}
                  alt={locale === 'es' ? 'No se encontraron resultados' : 'No results found'}
                  width={160}
                  height={160}
                  className="mx-auto opacity-70"
                />
              </div>
              <h2 className="text-xl font-medium text-white mb-2">
                {hasQuery
                  ? locale === 'es' ? 'No encontramos resultados para tu búsqueda' : 'No results found for your search'
                  : locale === 'es' ? 'No hay productos en esta categoría' : 'No products in this category'}
              </h2>
              <p className="text-gray-400 mb-6">
                {locale === 'es' ? 'Intenta con otros términos o navega por todas las categorías' : 'Try other terms or browse all categories'}
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold rounded-lg bg-gold-gradient text-black hover:opacity-90 transition-opacity"
              >
                {locale === 'es' ? 'Ver todos los productos' : 'See all products'}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
