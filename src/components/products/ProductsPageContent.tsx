'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ChevronDown, ChevronRight, GridIcon, ListIcon } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import PaginationControls from './PaginationControls';
import { supabase } from '@/lib/supabaseClient';
import { Database } from '@/types-db';
import ViewedProductsHistory from './ViewedProductsHistory';

type Product = Database['products'];
type Category = Database['categories'];

const PRODUCTS_PER_PAGE = 12;

export default function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = useLocale();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categoryName, setCategoryName] = useState<string>('');

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const categoryFilter = searchParams.get('category');
  const brandFilter = searchParams.get('brand');
  const tagFilter = searchParams.get('tag');
  const minPrice = searchParams.get('min_price');
  const maxPrice = searchParams.get('max_price');
  const stockFilter = searchParams.get('in_stock');
  const sortBy = searchParams.get('sort') || 'name_asc';
  const featuredOnly = searchParams.get('featured') === 'true';

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order(locale === 'es' ? 'name_es' : 'name_en', { ascending: true });

        setCategoryName(locale === 'es' ? categoriesData?.find(c => c.name === categoryFilter)?.name_es : categoriesData?.find(c => c.name === categoryFilter)?.name_en ?? '');
        if (categoriesError) throw categoriesError;
        setCategories(categoriesData as Category[]);

        const { data: brandsData, error: brandsError } = await supabase
          .from('products')
          .select('brand')
          .not('brand', 'is', null);
        if (brandsError) throw brandsError;
        const uniqueBrands = Array.from(
          new Set(brandsData.map(item => item.brand).filter(Boolean) as string[])
        ).sort();
        setBrands(uniqueBrands);

        const { data: productsWithTags, error: tagsError } = await supabase
          .from('products')
          .select('tags')
          .not('tags', 'is', null);
        if (tagsError) throw tagsError;
        const allTags = productsWithTags.flatMap(product => product.tags || []).filter(Boolean);
        const uniqueTags = Array.from(new Set(allTags)).sort();
        setTags(uniqueTags);
      } catch (err) {
        console.error('Error loading filter data:', err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const from = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const to = from + PRODUCTS_PER_PAGE - 1;

        let query = supabase
          .from('products')
          .select('*, inventory(quantity)', { count: 'exact' });

        query = query.eq('is_active', true);

        if (categoryFilter) {
          const parentIds = categories
            .filter(c => c.name === categoryFilter || c.name_es === categoryFilter || c.name_en === categoryFilter)
            .map(c => c.id);
          let allIds: number[] = [...parentIds];
          if (parentIds.length > 0) {
            const childLocal = categories.filter(c => c.parent_id && parentIds.includes(c.parent_id)).map(c => c.id);
            allIds.push(...childLocal);
          }
          if (allIds.length === 0) {
            const { data: catRows } = await supabase
              .from('categories')
              .select('id, parent_id')
              .or(`name.eq.${categoryFilter},name_es.eq.${categoryFilter},name_en.eq.${categoryFilter}`);
            const dbParentIds = (catRows ?? []).map(r => r.id);
            if (dbParentIds.length > 0) {
              allIds.push(...dbParentIds);
              const { data: childRows } = await supabase
                .from('categories')
                .select('id')
                .in('parent_id', dbParentIds);
              allIds.push(...(childRows ?? []).map(r => r.id));
            }
          }
          if (allIds.length > 0) {
            allIds = Array.from(new Set(allIds));
            query = query.in('category_id', allIds);
          }
        }

        if (brandFilter) query = query.eq('brand', brandFilter);
        if (tagFilter) query = query.contains('tags', [tagFilter]);
        if (minPrice) query = query.gte('price', minPrice);
        if (maxPrice) query = query.lte('price', maxPrice);
        if (stockFilter === 'true') query = query.gte('inventory.quantity', 1);
        if (featuredOnly) query = query.eq('is_featured', true);

        if (sortBy === 'price_asc') query = query.order('price', { ascending: true });
        else if (sortBy === 'price_desc') query = query.order('price', { ascending: false });
        else if (sortBy === 'newest') query = query.order('created_at', { ascending: false });
        else query = query.order(locale === 'es' ? 'name_es' : 'name_en', { ascending: true });

        query = query.range(from, to);
        const { data, error, count } = await query;
        if (error) throw error;

        setProducts(data as Product[]);
        setTotalCount(count || 0);
      } catch (err) {
        console.error('Error loading products:', err);
        setError(locale === 'es' ? 'Error al cargar los productos.' : 'Error loading products.');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [currentPage, categoryFilter, brandFilter, tagFilter, minPrice, maxPrice, sortBy, stockFilter, featuredOnly]);

  const handleFilterChange = (params: URLSearchParams) => {
    router.push(`${pathname}?${params.toString()}`);
  };

  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);
  const hasProducts = !loading && products.length > 0;

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">{locale === 'es' ? 'Inicio' : 'Home'}</Link>
          <ChevronRight className="h-3 w-3 mx-2" />
          <span className="text-white font-medium">{locale === 'es' ? 'Productos' : 'Products'}</span>
          {categoryFilter && (
            <>
              <ChevronRight className="h-3 w-3 mx-2" />
              <span className="text-amber-400">{categoryName}</span>
            </>
          )}
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {categoryFilter ? categoryName : locale === 'es' ? 'Nuestros Productos' : 'Our Products'}
          </h1>
          <p className="text-gray-400">
            {locale === 'es' ? 'Colección artesanal de pisos, muebles y piezas en resina epóxica.' : 'Artisan collection of floors, furniture and epoxy resin pieces.'}
            {totalCount > 0 && (
              <span className="text-gray-500"> — {totalCount} {locale === 'es' ? 'productos' : 'products'}</span>
            )}
          </p>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-56 shrink-0">
            <ProductFilters
              categories={categories}
              brands={brands}
              tags={tags}
              isMobile={true}
              locale={locale}
            />
            <div className="hidden lg:block">
              <ProductFilters
                categories={categories}
                brands={brands}
                tags={tags}
                isMobile={false}
                locale={locale}
              />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {/* Controls bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-800">
              <div className="text-sm text-gray-500">
                {totalCount > 0 && (
                  <p>
                    {products.length} {locale === 'es' ? 'de' : 'of'} {totalCount}
                    {currentPage > 1 && ` — ${locale === 'es' ? 'pág' : 'p.'} ${currentPage}/${totalPages}`}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <div className="relative">
                  <select
                    className="appearance-none h-9 pl-3 pr-8 text-sm bg-[#1a1a1a] border border-gray-700 text-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50"
                    value={sortBy}
                    onChange={(e) => {
                      const params = new URLSearchParams(searchParams.toString());
                      params.set('sort', e.target.value);
                      params.set('page', '1');
                      handleFilterChange(params);
                    }}
                  >
                    <option value="name_asc">{locale === 'es' ? 'Nombre: A-Z' : 'Name: A-Z'}</option>
                    <option value="name_desc">{locale === 'es' ? 'Nombre: Z-A' : 'Name: Z-A'}</option>
                    <option value="price_asc">{locale === 'es' ? 'Precio: ↑' : 'Price: ↑'}</option>
                    <option value="price_desc">{locale === 'es' ? 'Precio: ↓' : 'Price: ↓'}</option>
                    <option value="newest">{locale === 'es' ? 'Recientes' : 'Newest'}</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none h-3.5 w-3.5 text-gray-500" />
                </div>

                {/* View toggle */}
                <div className="hidden md:flex rounded-lg border border-gray-700 overflow-hidden">
                  <button
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-amber-400/10 text-amber-400' : 'text-gray-500 hover:text-gray-300'}`}
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                  >
                    <GridIcon className="h-4 w-4" />
                  </button>
                  <button
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-amber-400/10 text-amber-400' : 'text-gray-500 hover:text-gray-300'}`}
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                  >
                    <ListIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden animate-pulse">
                    <div className="aspect-square bg-[#252525]" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-[#252525] rounded w-3/4" />
                      <div className="h-3 bg-[#252525] rounded w-1/2" />
                      <div className="h-5 bg-[#252525] rounded w-1/3" />
                      <div className="h-10 bg-[#252525] rounded" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-6">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* No results */}
            {!loading && !error && products.length === 0 && (
              <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-8 text-center">
                <h2 className="text-lg font-medium text-white mb-2">
                  {locale === 'es' ? 'No se encontraron productos' : 'No products found'}
                </h2>
                <p className="text-gray-400 mb-6">
                  {locale === 'es' ? 'Intenta con otros filtros o categorías.' : 'Try different filters or categories.'}
                </p>
                <button
                  onClick={() => {
                    const params = new URLSearchParams();
                    params.set('page', '1');
                    handleFilterChange(params);
                  }}
                  className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg bg-gold-gradient text-black hover:opacity-90 transition-opacity"
                >
                  {locale === 'es' ? 'Borrar filtros' : 'Clear filters'}
                </button>
              </div>
            )}

            {/* Grid view */}
            {hasProducts && viewMode === 'grid' && (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* List view */}
            {hasProducts && viewMode === 'list' && (
              <div className="space-y-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden hover:border-amber-600/40 transition-colors"
                  >
                    <Link
                      href={`/product/${product.id}`}
                      className="sm:w-48 h-40 sm:h-auto relative bg-[#121212] shrink-0"
                    >
                      <Image
                        src={product.media?.[0]?.url || '/product-placeholder.png'}
                        alt={product.name || ''}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 192px"
                        unoptimized
                      />
                    </Link>

                    <div className="flex-1 p-4 flex flex-col">
                      <div className="flex items-start gap-2 mb-2">
                        <Link
                          href={`/product/${product.id}`}
                          className="text-base font-medium text-white hover:text-amber-400 transition-colors"
                        >
                          {locale === 'es' ? product.name_es : product.name_en}
                        </Link>
                        {product.category_id && (
                          <span className="shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-500/20">
                            {locale === 'es'
                              ? categories.find(cat => cat.id === product.category_id)?.name_es
                              : categories.find(cat => cat.id === product.category_id)?.name_en || ''}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                        {product.description || (locale === 'es' ? 'Producto artesanal de resina epóxica.' : 'Handcrafted epoxy resin product.')}
                      </p>

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                        <div>
                          {product.dolar_price ? (
                            <div className="flex items-baseline gap-2">
                              <p className="text-lg font-bold text-white">
                                ${((Number(product.dolar_price) || 0) * (1 - (Number(product.discount_percentage) || 0) / 100)).toFixed(2)}
                              </p>
                              {Number(product.discount_percentage) > 0 && (
                                <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                                  {product.discount_percentage}% OFF
                                </span>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm font-medium text-amber-400">
                              {locale === 'es' ? 'Precio a consultar' : 'Price on request'}
                            </p>
                          )}
                        </div>

                        <Link
                          href={`/product/${product.id}`}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-gray-700 text-white hover:border-amber-500/50 hover:text-amber-400 transition-all"
                        >
                          {locale === 'es' ? 'Ver detalles' : 'View details'}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {hasProducts && totalPages > 1 && (
              <div className="mt-8">
                <PaginationControls currentPage={currentPage} totalPages={totalPages} />
              </div>
            )}

            {/* Recently viewed */}
            {!loading && !error && (
              <div className="mt-16">
                <ViewedProductsHistory />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
