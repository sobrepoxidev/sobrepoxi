'use client';

import React from 'react';
import { Link } from '@/shared/i18n/navigation';
import Image from 'next/image';
import { type SearchResult } from '@/features/products';
import { Search, X } from 'lucide-react';
import { formatUSD } from '@/shared/utils/formatCurrency';

interface SearchSuggestionsProps {
  query: string;
  category: string;
  results: SearchResult[];
  loading: boolean;
  onClose: () => void;
  variant: 'navbar' | 'standalone' | 'mobile';
  locale: string;
  selectedCategorySlug: string | null;
}

export default function SearchSuggestions({
  selectedCategorySlug,
  query,
  category,
  results,
  loading,
  onClose,
  variant,
  locale,
}: SearchSuggestionsProps) {
  // Apply different styles based on variant
  const isNavbar = variant === 'navbar';
  const isStandalone = variant === 'standalone';
  const isMobile = variant === 'mobile';

  // Define estilos diferentes según el variante
  const suggestionStyles: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '100%',
    zIndex: isNavbar || isMobile ? 200 : 100,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: '#1a1a1a',
    boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.6)',
    borderRadius: '0 0 0.75rem 0.75rem',
    overflow: 'hidden',
    width: '100%'
  };

  return (
    <div
      className={isStandalone ? 'standalone-suggestions' : 'navbar-suggestions'}
      style={suggestionStyles}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <p className="text-sm font-medium text-gray-300">
          {loading ? (
            locale === 'es' ? 'Buscando...' : 'Searching...'
          ) : results.length > 0 ? (
            locale === 'es' ? `${results.length} resultados para "${query}"` : `${results.length} results for "${query}"`
          ) : (
            locale === 'es' ? `No se encontraron resultados para "${query}"` : `No results found for "${query}"`
          )}
        </p>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-200"
          aria-label="Cerrar sugerencias"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="max-h-[60vh] overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-amber-400"></div>
          </div>
        ) : results.length > 0 ? (
          <>
            <ul>
              {results.slice(0, 5).map((product) => (
                <li key={product.id} className="border-b border-white/10 last:border-b-0">
                  <Link
                    href={`/product/${product.name}`}
                    className="flex items-center p-3 hover:bg-white/5 transition"
                    onClick={onClose}
                  >
                    <div className="w-12 h-12 bg-[#121212] rounded-md flex-shrink-0 overflow-hidden mr-3">
                      <Image
                        src={product.media?.[0]?.url || '/product-placeholder.png'}
                        alt={product.name || ''}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-medium text-white truncate">{locale === 'es' ? product.name_es : product.name_en}</h4>
                      <div className="flex items-center">
                        {product.category_name && (
                          <span className="text-xs bg-amber-400/10 text-amber-300 border border-amber-500/20 px-1.5 py-0.5 rounded-full mr-2">
                            {product.category_name}
                          </span>
                        )}
                        {product.highlight && (
                          <p className="text-sm text-gray-400 truncate">{product.highlight}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      {product.dolar_price ? (
                        product.discount_percentage && product.discount_percentage > 0 ? (
                          <div className="text-right">
                            <p className="font-medium text-amber-400">
                              {formatUSD(product.dolar_price)}
                            </p>
                            <p className="text-xs text-gray-500 line-through">
                              {formatUSD(product.dolar_price)}
                            </p>
                          </div>
                        ) : (
                          <p className="font-medium text-amber-400">
                            {formatUSD(product.dolar_price)}
                          </p>
                        )
                      ) : (
                        <p className="font-medium text-gray-400">
                          {locale === 'es' ? 'Consultar' : 'Consult'}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="bg-[#121212] p-3 text-center">
              <Link
                href={`/search?q=${encodeURIComponent(query)}${(category && !['Todo','All','Todas'].includes(category)) ? `&category=${selectedCategorySlug}` : ''}`}
                className="inline-flex items-center justify-center text-sm text-amber-400 hover:text-amber-300 font-medium"
                onClick={onClose}
              >
                <Search className="h-4 w-4 mr-1" />
                {locale === 'es' ? 'Ver todos los resultados' : 'View all results'}
              </Link>
            </div>
          </>
        ) : (
          <div className="py-6 px-4 text-center">
            <p className="text-gray-400 mb-3">{locale === 'es' ? 'No se encontraron productos que coincidan con tu búsqueda.' : 'No products found that match your search.'}</p>
            <Link
              href="/products"
              className="text-sm text-amber-400 hover:text-amber-300 font-medium"
              onClick={onClose}
            >
              {locale === 'es' ? 'Ver todos los productos' : 'View all products'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
