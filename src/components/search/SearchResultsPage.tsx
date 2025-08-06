'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SearchResult, searchProducts } from '@/lib/search';
import { ChevronRight, SlidersHorizontal, } from 'lucide-react';
import PaginationControls from '@/components/products/PaginationControls';
import ProductCard from '@/components/products/ProductCard';
import { supabase } from '@/lib/supabaseClient';
import { Database } from '@/types-db';

// Número de productos por página
const PRODUCTS_PER_PAGE = 12;
export default function SearchResultsPage({ locale }: { locale: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = (searchParams.get('q') || '').trim();
  const categoryParam = searchParams.get('category') || 'Todo';
  // Category filter can be either id or name
  const isCategoryFilter = categoryParam && categoryParam !== 'Todo' && categoryParam !== 'Todas';
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

  // Cargar categorías
  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;
        setCategories(data || []);
        if (isCategoryFilter) {
          const categoryData = data.find(cat => cat.id === parseInt(categoryParam, 10));
          setCategoryName(locale === 'es' ? categoryData?.name_es : categoryData?.name_en || '');
        }
      } catch (err) {
        console.error('Error al cargar categorías:', err);
      }
    }

    fetchCategories();
  }, []);

  // Función para actualizar los parámetros de búsqueda y navegar
  const updateSearchParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    // Aplicar actualizaciones
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Siempre resetear a página 1 cuando cambian los filtros
    if (Object.keys(updates).some(key => key !== 'page')) {
      params.set('page', '1');
    }

    // Navegar a la nueva URL
    router.push(`/search?${params.toString()}`);
  }, [searchParams, router]);

  useEffect(() => {
    async function fetchResults() {
      // Determine if we should perform a text search, a category filter search, or both
      if (!isCategoryFilter && query.length < 2) {
        // Nothing to search
        setResults([]);
        setTotalCount(0);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // Helper to format raw product rows into SearchResult
        const toSearchResult = (product: SearchResult): SearchResult => ({
          id: product.id,
          name: product.name,
          name_es: product.name_es,
          name_en: product.name_en,
          description: product.description,
          colon_price: product.colon_price,
          dolar_price: product.dolar_price,
          media: product.media,
          category_id: product.category_id,
          discount_percentage: product.discount_percentage,
          created_at: product.created_at,
        });

        // If we have at least 2 chars in query, use full-text helper, otherwise fallback to category-only query.
        if (query.length >= 2) {
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
        } else if (isCategoryFilter) {
          // Only category filter – categoryParam may be ID or name
          let categoryId: string | null = null;

          if (/^\d+$/.test(category)) {
            categoryId = category;
          } else {
            const { data: catData } = await supabase
              .from('categories')
              .select('name')
              .eq('name', category)
              .single();
            categoryId = catData?.name ?? null;
          }

          if (categoryId === null) {
            setResults([]);
            setTotalCount(0);
            setLoading(false);
            return;
          }

          const from = (currentPage - 1) * PRODUCTS_PER_PAGE;
          const to = from + PRODUCTS_PER_PAGE - 1;

          const { data, count, error } = await supabase
            .from('products')
            .select('id, name, name_es, name_en, description, colon_price, dolar_price, media, category_id, discount_percentage, created_at', { count: 'exact' })
            .eq('category_id', categoryId)
            .range(from, to);

          if (error) throw error;

          setResults((data || []).map(toSearchResult));
          setTotalCount(count || 0);
        }
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query, category, sortBy, currentPage]);

  // Actualizar el estado local cuando cambian los parámetros de URL
  useEffect(() => {
    setSortBy(currentSortBy);
  }, [currentSortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center text-sm text-gray-300">
        <Link href="/" className="hover:text-teal-600">{locale === 'es' ? 'Inicio' : 'Home'}</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="font-medium text-gray-300">{locale === 'es' ? 'Resultados de búsqueda' : 'Search results'}</span>
      </div>

      {/* Search header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-200 mb-2">
          {totalCount > 0
            ? `${locale === 'es' ? 'Resultados para' : 'Results for'} "${query === '' ? categoryName : query}"`
            : query.length >= 2
              ? `${locale === 'es' ? 'No se encontraron resultados para' : 'No results found for'} "${query === '' ? categoryName : query}"`
              : `${locale === 'es' ? 'Buscar productos' : 'Search products'}`
          }
        </h1>
        {totalCount > 0 && (
          <p className="text-gray-300">Se encontraron {totalCount} productos</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-[#303030] rounded-lg border border-[#d4af37] p-4 sticky top-24">
            <h2 className="font-medium text-lg mb-4 text-gray-200">{locale === 'es' ? 'Filtros' : 'Filters'}</h2>

            <div className="mb-6">
              <h3 className="font-medium mb-2 text-gray-200">{locale === 'es' ? 'Categoría' : 'Category'}</h3>
              <div className="space-y-2 text-gray-200">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value="Todas"
                    checked={category === 'Todas'}
                    className="text-teal-600"
                    onChange={() => updateSearchParams({ category: 'Todas' })}
                  />
                  <span className="ml-2">{locale === 'es' ? 'Todas las categorías' : 'All categories'}</span>
                </label>

                {/* Categorías dinámicas */}
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={cat.name}
                      checked={category === cat.name}
                      className="text-teal-600"
                      onChange={() => updateSearchParams({ category: cat.name })}
                    />
                    <span className="ml-2">{locale === 'es' ? cat.name_es : cat.name_en}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-gray-200">{locale === 'es' ? 'Ordenar por' : 'Sort by'}</h3>
              <select
                className="w-full border border-[#d4af37] rounded-md p-2 text-sm text-gray-200"
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
        <div className="lg:hidden mb-4">
          <button
            className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md bg-[#303030] text-gray-200"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {locale === 'es' ? 'Filtros y ordenación' : 'Filters and sorting'}
          </button>

          {showFilters && (
            <div className="mt-2 p-4 border border-[#d4af37] rounded-md bg-[#303030]">
              <div className="mb-4">
                <h3 className="font-medium mb-2">{locale === 'es' ? 'Categoría' : 'Category'}</h3>
                <select
                  className="w-full border border-[#d4af37] rounded-md p-2 text-sm"
                  value={category}
                  onChange={(e) => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('category', e.target.value);
                    window.history.pushState(null, '', `?${params.toString()}`);
                  }}
                >
                  <option value="Todas">{locale === 'es' ? 'Todas las categorías' : 'All categories'}</option>
                  {/* Category options would be dynamically generated here */}
                </select>
              </div>

              <div>
                <h3 className="font-medium mb-2">{locale === 'es' ? 'Ordenar por' : 'Sort by'}</h3>
                <select
                  className="w-full border border-[#d4af37] rounded-md p-2 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
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
        <div className="flex-grow">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
          ) : totalCount > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          ) : query.length >= 2 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <Image
                  src={`/no-results.svg`}
                  alt={locale === 'es' ? 'No se encontraron resultados' : 'No results found'}
                  width={180}
                  height={180}

                  className={`mx-auto opacity-80`}
                />
              </div>
              <h2 className="text-xl font-medium text-gray-700 mb-2">{locale === 'es' ? 'No encontramos resultados para tu búsqueda' : 'No results found for your search'}</h2>
              <p className="text-gray-500 mb-6">{locale === 'es' ? 'Intenta con otros términos o navega por nuestras categorías' : 'Try with different terms or browse our categories'}</p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
              >
                {locale === 'es' ? 'Ver todos los productos' : 'See all products'}
              </Link>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">{locale === 'es' ? 'Ingresa al menos 2 caracteres para buscar' : 'Enter at least 2 characters to search'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}