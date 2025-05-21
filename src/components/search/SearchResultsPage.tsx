'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SearchResult, searchProducts } from '@/lib/search';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import AddToCartButton from '@/components/home/AddToCartButton';
import PaginationControls from '@/components/products/PaginationControls';
import { supabase } from '@/lib/supabaseClient';
import { Database } from '@/types-db';

// Número de productos por página
const PRODUCTS_PER_PAGE = 12;
export default function SearchResultsPage({ locale }: { locale: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'Todo';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const currentSortBy = searchParams.get('sort') || 'relevance';
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState(currentSortBy);
  const [categories, setCategories] = useState<Database['categories'][]>([]);
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
      if (query.length < 2) {
        setResults([]);
        setTotalCount(0);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      const { results: data, totalCount } = await searchProducts(
        query, 
        category !== 'Todas' ? category : undefined, 
        currentPage,
        PRODUCTS_PER_PAGE,
        sortBy,
        true, // isPaginated=true para la página de búsqueda
        locale
      );
      
      // La ordenación ahora se realiza en el servidor
      setResults(data);
      setTotalCount(totalCount);
      setLoading(false);
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
      <div className="mb-6 flex items-center text-sm text-gray-500">
        <Link href="/" className="hover:text-teal-600">Inicio</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="font-medium text-gray-900">Resultados de búsqueda</span>
      </div>
      
      {/* Search header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {totalCount > 0 
            ? `Resultados para "${query}"`
            : query.length >= 2 
              ? `No se encontraron resultados para "${query}"`
              : 'Buscar productos'
          }
        </h1>
        {totalCount > 0 && (
          <p className="text-gray-500">Se encontraron {totalCount} productos</p>
        )}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
            <h2 className="font-medium text-lg mb-4 text-gray-800">Filtros</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2 text-gray-800">Categoría</h3>
              <div className="space-y-2 text-gray-800">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="category" 
                    value="Todas" 
                    checked={category === 'Todas'} 
                    className="text-teal-600"
                    onChange={() => updateSearchParams({ category: 'Todas' })}
                  />
                  <span className="ml-2">Todas las categorías</span>
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
                    <span className="ml-2">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 text-gray-800">Ordenar por</h3>
              <select 
                className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-800"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  updateSearchParams({ sort: e.target.value });
                }}
              >
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="newest">Más recientes</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Mobile filters button */}
        <div className="lg:hidden mb-4">
          <button 
            className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md bg-white text-gray-700"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filtros y ordenación
          </button>
          
          {showFilters && (
            <div className="mt-2 p-4 border border-gray-200 rounded-md bg-white">
              <div className="mb-4">
                <h3 className="font-medium mb-2">Categoría</h3>
                <select 
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  value={category}
                  onChange={(e) => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('category', e.target.value);
                    window.history.pushState(null, '', `?${params.toString()}`);
                  }}
                >
                  <option value="Todas">Todas las categorías</option>
                  {/* Category options would be dynamically generated here */}
                </select>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Ordenar por</h3>
                <select 
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevance">Relevancia</option>
                  <option value="price-asc">Precio: menor a mayor</option>
                  <option value="price-desc">Precio: mayor a menor</option>
                  <option value="newest">Más recientes</option>
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
                  <div key={product.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group">
                    <Link href={`/product/${product.id}`} className="block">
                      <div className="relative h-56 overflow-hidden bg-gray-50 flex items-center justify-center">
                        <Image
                          src={product.media?.[0]?.url || '/product-placeholder.png'}
                          alt={product.name || ''}
                          width={110}
                          height={0}
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded-full border border-teal-100">
                          {product.category_name || 'Artesanía'}
                        </span>
                      </div>
                    </Link>

                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                        {product.highlight && (
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.highlight}</p>
                        )}
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-teal-700">
                            {product.price ? `₡${product.price}` : 'Consultar'}
                          </p>
                          <span className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full border border-amber-200">
                            Hecho a mano
                          </span>
                        </div>
                      </div>

                      <AddToCartButton productId={product.id} />
                    </div>
                  </div>
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
                  src="/no-results.svg" 
                  alt="No se encontraron resultados" 
                  width={180} 
                  height={180} 
                  className="mx-auto opacity-80" 
                />
              </div>
              <h2 className="text-xl font-medium text-gray-700 mb-2">No encontramos resultados para tu búsqueda</h2>
              <p className="text-gray-500 mb-6">Intenta con otros términos o navega por nuestras categorías</p>
              <Link 
                href="/products" 
                className="inline-flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
              >
                Ver todos los productos
              </Link>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Ingresa al menos 2 caracteres para buscar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}