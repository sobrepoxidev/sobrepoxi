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
  
  // Estados
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categoryName, setCategoryName] = useState<string>('');
  
  // Valores de filtros y paginación
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const categoryFilter = searchParams.get('category');
  //categoryFilter is name in categories table
  const brandFilter = searchParams.get('brand');
  const tagFilter = searchParams.get('tag');
  const minPrice = searchParams.get('min_price');
  const maxPrice = searchParams.get('max_price');
  const stockFilter = searchParams.get('in_stock');
  const sortBy = searchParams.get('sort') || 'name_asc';
  const featuredOnly = searchParams.get('featured') === 'true';
  
  // Cargar categorías, marcas y etiquetas al inicio
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order(locale === 'es' ? 'name_es' : 'name_en', { ascending: true });
        
        setCategoryName(locale === 'es' ? categoriesData?.find(c => c.name === categoryFilter)?.name_es : categoriesData?.find(c => c.name === categoryFilter)?.name_en ?? ''); 
        if (categoriesError) throw categoriesError;
        setCategories(categoriesData as Category[]);
        
        
        // Fetch unique brands
        const { data: brandsData, error: brandsError } = await supabase
          .from('products')
          .select('brand')
          .not('brand', 'is', null);
        
        if (brandsError) throw brandsError;
        
        // Filter unique brands
        const uniqueBrands = Array.from(
          new Set(
            brandsData
              .map(item => item.brand)
              .filter(Boolean) as string[]
          )
        ).sort();
        
        setBrands(uniqueBrands);
        
        // Fetch all tags across products
        const { data: productsWithTags, error: tagsError } = await supabase
          .from('products')
          .select('tags')
          .not('tags', 'is', null);
          
        if (tagsError) throw tagsError;
        
        // Extract and flatten all tags
        const allTags = productsWithTags
          .flatMap(product => product.tags || [])
          .filter(Boolean);
          
        // Get unique tags
        const uniqueTags = Array.from(new Set(allTags)).sort();
        setTags(uniqueTags);
        
      } catch (err) {
        console.error('Error al cargar datos de filtros:', err);
      }
    }
    
    fetchData();
  }, []);
  
  // Cargar productos con filtros y paginación
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      
      try {
        // Cálculo para paginación
        const from = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const to = from + PRODUCTS_PER_PAGE - 1;

        
        // Construir la consulta base
        let query = supabase
          .from('products')
          .select('*, inventory(quantity)', { count: 'exact' });
        
        // Solo mostrar productos activos por defecto
        query = query.eq('is_active', true);
        
        // Aplicar filtros
        if (categoryFilter) {
          // Convert category name (any locale) to id(s) and añadir hijas
          const parentIds = categories
            .filter(c =>
              c.name === categoryFilter ||
              c.name_es === categoryFilter ||
              c.name_en === categoryFilter
            )
            .map(c => c.id);

          let allIds: number[] = [...parentIds];

          if (parentIds.length > 0) {
            // Añadir categorías hijas locales
            const childLocal = categories
              .filter(c => c.parent_id && parentIds.includes(c.parent_id))
              .map(c => c.id);
            allIds.push(...childLocal);
          }

          if (allIds.length === 0) {
            // Fallback: resolver vía DB si todavía no tenemos categorías cargadas
            const { data: catRows } = await supabase
              .from('categories')
              .select('id, parent_id')
              .or(`name.eq.${categoryFilter},name_es.eq.${categoryFilter},name_en.eq.${categoryFilter}`);
            const dbParentIds = (catRows ?? []).map(r => r.id);
            if (dbParentIds.length > 0) {
              allIds.push(...dbParentIds);
              // Conseguir hijas vía DB
              const { data: childRows } = await supabase
                .from('categories')
                .select('id')
                .in('parent_id', dbParentIds);
              allIds.push(...(childRows ?? []).map(r => r.id));
            }
          }

          if (allIds.length > 0) {
            // Eliminar duplicados
            allIds = Array.from(new Set(allIds));
            query = query.in('category_id', allIds);
          }
        }
        
        if (brandFilter) {
          query = query.eq('brand', brandFilter);
        }
        
        if (tagFilter) {
          query = query.contains('tags', [tagFilter]);
        }
        
        if (minPrice) {
          query = query.gte('price', minPrice);
        }
        
        if (maxPrice) {
          query = query.lte('price', maxPrice);
        }
        
        // Filtrar por disponibilidad en inventario
        if (stockFilter === 'true') {
          // Aquí necesitaríamos un join con la tabla de inventario
          // Esto es un enfoque simplificado
          query = query.gte('inventory.quantity', 1);
        }
        
        // Filtrar productos destacados
        if (featuredOnly) {
          query = query.eq('is_featured', true);
        }
        
        // Aplicar ordenamiento
        if (sortBy === 'price_asc') {
          query = query.order('price', { ascending: true });
        } else if (sortBy === 'price_desc') {
          query = query.order('price', { ascending: false });
        } else if (sortBy === 'newest') {
          query = query.order('created_at', { ascending: false });
        } else {
          // Por defecto, ordenar por nombre ascendente
          query = query.order(locale === 'es' ? 'name_es' : 'name_en', { ascending: true });
        }
        
        // Aplicar paginación
        query = query.range(from, to);
        
        // Ejecutar consulta
        const { data, error, count } = await query;
        
        if (error) throw error;
        
        setProducts(data as Product[]);
        setTotalCount(count || 0);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('Error al cargar los productos. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, [currentPage, categoryFilter, brandFilter, tagFilter, minPrice, maxPrice, sortBy, stockFilter, featuredOnly]);
  
  // Manejar cambios en filtros
  const handleFilterChange = (params: URLSearchParams) => {
    router.push(`${pathname}?${params.toString()}`);
  };
  
  // Calcular total de páginas
  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);
  
  // Determinar si hay productos
  const hasProducts = !loading && products.length > 0;
  
  
  return (
    <div className="container mx-auto px-4 py-8 bg-[#121212]">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center text-sm text-gray-300">
        <Link href="/" className="hover:text-teal-200">{locale === 'es' ? 'Inicio' : 'Home'}</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="font-medium text-gray-300">{locale === 'es' ? 'Productos' : 'Products'}</span>
        {categoryFilter && (
          <>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="font-medium text-gray-300">{categoryName}</span>
          </>
        )}
      </div>
      
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-200 mb-2">
          {categoryFilter ? `${categoryName}` : locale === 'es' ? 'Todos los Productos' : 'All Products'}
        </h1>
        <p className="text-gray-300">
          {locale === 'es' ? 'Descubre nuestra colección de productos hechos a mano.' : 'Discover our collection of handmade products.'}
          {totalCount > 0 && ` ${locale === 'es' ? 'Mostrando' : 'Showing'} ${products.length} ${locale === 'es' ? 'de' : 'of'} ${totalCount} ${locale === 'es' ? 'productos' : 'products'}.`}
        </p>
      </div>
      
      {/* Contenido principal */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Barra lateral de filtros */}
        <aside className="md:w-64">
          <ProductFilters
            categories={categories}
            brands={brands}
            tags={tags}
            isMobile={true}
            locale={locale}
          />
          
          <div className="hidden md:block">
            <ProductFilters
              categories={categories}
              brands={brands}
              tags={tags}
              isMobile={false}
              locale={locale}
            />
          </div>
        </aside>
        
        {/* Lista de productos */}
        <div className="flex-1">
          {/* Barra de control */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-3 border-b border-gray-200">
            {/* Información de resultados */}
            <div className="text-sm text-gray-300">
              {totalCount > 0 && (
                <p>
                  {locale === 'es' ? 'Mostrando' : 'Showing'} <span className="font-medium text-gray-200">{products.length}</span> {locale === 'es' ? 'de' : 'of'} <span className="font-medium text-gray-200">{totalCount}</span> {locale === 'es' ? 'productos' : 'products'}
                  {currentPage > 1 && ` (${locale === 'es' ? 'página' : 'page'} ${currentPage} de ${totalPages})`}
                </p>
              )}
            </div>
            
            {/* Controles */}
            <div className="flex items-center space-x-4">
              {/* Selector de ordenamiento */}
              <div className="relative">
                <select
                  className="appearance-none h-9 pl-3 pr-8 text-sm border border-gray-300 text-gray-200 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:border-transparent"
                  value={sortBy}
                  onChange={(e) => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('sort', e.target.value);
                    params.set('page', '1'); // Reset página al cambiar ordenamiento
                    handleFilterChange(params);
                  }}
                >
                  <option value="name_asc">{locale === 'es' ? 'Nombre: A-Z' : 'Name: A-Z'}</option>
                  <option value="name_desc">{locale === 'es' ? 'Nombre: Z-A' : 'Name: Z-A'}</option>
                  <option value="price_asc">{locale === 'es' ? 'Precio: Menor a mayor' : 'Price: Lowest to highest'}</option>
                  <option value="price_desc">{locale === 'es' ? 'Precio: Mayor a menor' : 'Price: Highest to lowest'}</option>
                  <option value="newest">{locale === 'es' ? 'Más recientes' : 'Newest'}</option>
                  <option value="discount">{locale === 'es' ? 'Mayor descuento' : 'Highest discount'}</option>
                  <option value="popular">{locale === 'es' ? 'Más populares' : 'Most popular'}</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none h-4 w-4 text-gray-500" />
              </div>
              
              {/* Cambio de vista (grid/list) */}
              <div className="hidden md:flex border border-gray-300 rounded-md">
                <button
                  className={`p-1.5 ${viewMode === 'grid' ? ' text-black' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Ver en cuadrícula"
                >
                  <GridIcon className="h-5 w-5 text-gray-500" />
                </button>
                <button
                  className={`p-1.5 ${viewMode === 'list' ? 'text-black' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setViewMode('list')}
                  aria-label="Ver en lista"
                >
                  <ListIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Estado de carga */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
          )}
          
          {/* Mensaje de error */}
          {error && (
            <div className="bg-[#303030] border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {/* Sin resultados */}
          {!loading && !error && products.length === 0 && (
            <div className="bg-[#303030] rounded-lg border border-[#303030] p-6 text-center">
              <h2 className="text-lg font-medium text-gray-200 mb-2">{locale === 'es' ? 'No se encontraron productos' : 'No products found'}</h2>
              <p className="text-gray-300 mb-4">
                {locale === 'es' ? 'No hay productos disponibles con los filtros seleccionados.' : 'No products are available with the selected filters.'}
              </p>
              <button
                onClick={() => {
                  const params = new URLSearchParams();
                  params.set('page', '1');
                  handleFilterChange(params);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                {locale === 'es' ? 'Borrar filtros' : 'Clear filters'}
              </button>
            </div>
          )}
          
          {/* Lista de productos en modo grid */}
          {hasProducts && viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          {/* Lista de productos en modo lista */}
          {hasProducts && viewMode === 'list' && (
            <div className="space-y-4">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition"
                >
                  {/* Imagen del producto */}
                  <Link 
                    href={`/product/${product.id}`}
                    className="sm:w-48 h-40 sm:h-auto relative bg-gray-50 flex-shrink-0"
                  >
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <Image 
                        src={product.media?.[0].url || '/product-placeholder.png'} 
                        alt={product.name || ''}
                        width={150}
                        height={150}
                        className="object-cover w-full h-full rounded"
                        priority
                        unoptimized
                      />
                    </div>
                  </Link>
                  
                  {/* Información del producto */}
                  <div className="flex-1 p-4 flex flex-col">
                    <div className="mb-2 flex flex-row">
                      <Link 
                        href={`/product/${product.id}`}
                        className="text-lg font-medium text-gray-200 hover:text-gray-200 transition"
                      >
                        {locale === 'es' ? product.name_es : product.name_en}
                      </Link>
                      {product.category_id && (
                        <div className="mt-1">
                          <span className="inline-block px-2 py-0.5 bg-teal-50 text-teal-700 text-xs rounded-full border border-teal-100">
                            {locale === 'es' ? categories.find(cat => cat.id === product.category_id)?.name : categories.find(cat => cat.id === product.category_id)?.name || 'Categoría'}
                          </span>
                        </div>
                      )}
                      {product.brand && (
                        <span className="ml-1 inline-block px-1 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100">
                          {product.brand}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                      {product.description || 'No hay descripción disponible para este producto.'}
                    </p>
                    
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
                      <div>
                        {product.dolar_price ? (
                          <div>
                            {product.discount_percentage && product.discount_percentage > 0 ? (
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <p className="text-lg font-bold text-teal-200">
                                    ${((Number(product.dolar_price) || 0) * (1 - (Number(product.discount_percentage) || 0) / 100)).toFixed(2)}
                                  </p>
                                  <span className="text-xs font-medium bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                                    {product.discount_percentage}% OFF
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 line-through">
                                  ${((Number(product.dolar_price) || 0) * (1 - (Number(product.discount_percentage) || 0) / 100)).toFixed(2)}
                                </p>
                              </div>
                            ) : (
                              <p className="text-lg font-bold text-teal-200">
                                ${((Number(product.dolar_price) || 0) * (1 - (Number(product.discount_percentage) || 0) / 100)).toFixed(2)}
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm font-medium text-gray-200">
                           {locale === 'es' ? 'Precio a consultar' : 'Price to consult'}
                          </p>
                        )}
                      </div>
                      
                      <Link 
                        href={`/product/${product.id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-200 text-sm font-medium rounded text-teal-200 bg-white hover:bg-teal-50 transition"
                      >
                        {locale === 'es' ? 'Ver detalles' : 'View details'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Paginación */}
          {hasProducts && totalPages > 1 && (
            <div className="mt-8">
              <PaginationControls 
                currentPage={currentPage} 
                totalPages={totalPages} 
              />
            </div>
          )}
          
          {/* Recently viewed products */}
          {!loading && !error && (
            <div className="mt-16">
              <ViewedProductsHistory />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
