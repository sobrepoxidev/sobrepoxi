'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SearchResult, searchProducts } from '@/lib/search';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import AddToCartButton from '@/components/home/AddToCartButton';

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'Todas';
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  
  useEffect(() => {
    async function fetchResults() {
      if (query.length < 2) {
        setResults([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      const data = await searchProducts(query, category !== 'Todas' ? category : undefined, 50);
      
      // Apply sorting
      let sortedData = [...data];
      if (sortBy === 'price-asc') {
        sortedData.sort((a, b) => (a.price || 0) - (b.price || 0));
      } else if (sortBy === 'price-desc') {
        sortedData.sort((a, b) => (b.price || 0) - (a.price || 0));
      } else if (sortBy === 'newest') {
        // Handle optional created_at field safely
        sortedData.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        });
      }
      
      setResults(sortedData);
      setLoading(false);
    }
    
    fetchResults();
  }, [query, category, sortBy]);
  
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
          {results.length > 0 
            ? `Resultados para "${query}"`
            : query.length >= 2 
              ? `No se encontraron resultados para "${query}"`
              : 'Buscar productos'
          }
        </h1>
        {results.length > 0 && (
          <p className="text-gray-500">Se encontraron {results.length} productos</p>
        )}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
            <h2 className="font-medium text-lg mb-4">Filtros</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categoría</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="category" 
                    value="Todas" 
                    checked={category === 'Todas'} 
                    className="text-teal-600"
                    onChange={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      params.set('category', 'Todas');
                      window.history.pushState(null, '', `?${params.toString()}`);
                    }}
                  />
                  <span className="ml-2">Todas las categorías</span>
                </label>
                
                {/* Category options would be dynamically generated here */}
              </div>
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
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((product) => (
                <div key={product.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group">
                  <Link href={`/products?id=${product.id}`} className="block">
                    <div className="relative h-56 overflow-hidden bg-gray-50 flex items-center justify-center">
                      <Image
                        src={product.media?.[0]?.url || '/product-placeholder.png'}
                        alt={product.name || ''}
                        width={110}
                        height={0}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded-full border border-teal-100">
                        {product.category || 'Artesanía'}
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
