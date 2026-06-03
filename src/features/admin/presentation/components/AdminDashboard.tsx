'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSupabase } from '@/app/supabase-provider/provider';
import { Database } from '@/shared/types/database';
import { Search, Filter, RefreshCw, MoreVertical, Check, X, Edit } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { ProductEditor } from './ProductEditor';
import { formatModifiedDate } from '../../application/distribute';

type Product = Database['products'];

export function AdminDashboard({ locale }: { locale: string }) {
  const { supabase } = useSupabase();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [categories, setCategories] = useState<Database['categories'][]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showProductMenu, setShowProductMenu] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuButton = document.querySelector(`button[aria-controls="product-menu-${showProductMenu}"]`);
      const menuElement = document.getElementById(`product-menu-${showProductMenu}`);
      
      if (showProductMenu !== null && 
          menuButton && 
          menuElement && 
          !menuButton.contains(event.target as Node) && 
          !menuElement.contains(event.target as Node)) {
        setShowProductMenu(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showProductMenu]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error al cargar productos:', err);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  const fetchCategories = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name_es', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (err: unknown) {
      console.error('Error al cargar categorías:', err);
    }
  }, [supabase]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = 
        !searchTerm || 
        (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.name_es && product.name_es.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = !categoryFilter || product.category_id === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  const updateProduct = useCallback(async (productId: number, updates: Partial<Product>) => {
    try {
      setLoading(true);
      
      if (updates.colon_price !== undefined) {
        const price = Number(updates.colon_price);
        if (isNaN(price) || price < 0) {
          throw new Error(locale === 'es' ? 'El precio debe ser un número válido mayor o igual a 0' : 'The price must be a valid number greater than or equal to 0');
        }
        updates.colon_price = price;
      }
      
      if (updates.dolar_price !== undefined) {
        const usd = Number(updates.dolar_price);
        if (isNaN(usd) || usd < 0) {
          throw new Error(locale === 'es' ? 'El precio USD debe ser un número válido mayor o igual a 0' : 'USD price must be a valid number greater than or equal to 0');
        }
        updates.dolar_price = usd;
      }
      
      if (updates.discount_percentage !== undefined) {
        const discount = Number(updates.discount_percentage);
        if (isNaN(discount) || discount < 0 || discount > 100) {
          throw new Error(locale === 'es' ? 'El descuento debe ser un número entre 0 y 100' : 'The discount must be a number between 0 and 100');
        }
        updates.discount_percentage = discount;
      }

      const { error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', productId);

      if (error) throw error;
      
      setProducts(products.map(p => 
        p.id === productId ? { ...p, ...updates } : p
      ));
      
      if (selectedProduct && selectedProduct.id === productId) {
        setSelectedProduct({ ...selectedProduct, ...updates });
      }
      
      if (updates.colon_price !== undefined) {
        toast.success(
          <div className="flex flex-col">
            <span className="font-medium">{locale === 'es' ? 'Precio actualizado' : 'Price updated'}</span>
            <span className="text-sm">{locale === 'es' ? 'Nuevo precio: ₡' : 'New price: ₡'}{updates.colon_price}</span>
          </div>,
          { duration: 3000 }
        );
      } else if (updates.dolar_price !== undefined) {
        toast.success(
          <div className="flex flex-col">
            <span className="font-medium">{locale === 'es' ? 'Precio USD actualizado' : 'USD price updated'}</span>
            <span className="text-sm">{locale === 'es' ? 'Nuevo precio: $' : 'New price: $'}{updates.dolar_price}</span>
          </div>,
          { duration: 3000 }
        );
      } else if (updates.is_active !== undefined) {
        toast.success(
          <div className="flex flex-col">
            <span className="font-medium">{locale === 'es' ? 'Estado actualizado' : 'Status updated'}</span>
            <span className="text-sm">{locale === 'es' ? (updates.is_active ? 'Producto activado' : 'Producto desactivado') : (updates.is_active ? 'Product activated' : 'Product deactivated')}</span>
          </div>,
          { duration: 3000 }
        );
      } else if (updates.discount_percentage !== undefined) {
        toast.success(
          <div className="flex flex-col">
            <span className="font-medium">{locale === 'es' ? 'Descuento actualizado' : 'Discount updated'}</span>
            <span className="text-sm">
              {updates.discount_percentage > 0 
                ? locale === 'es' ? `Descuento: ${updates.discount_percentage}%` : `Discount: ${updates.discount_percentage}%`
                : locale === 'es' ? 'Descuento removido' : 'Discount removed'}
            </span>
          </div>,
          { duration: 3000 }
        );
      } else {
        toast.success(locale === 'es' ? 'Producto actualizado correctamente' : 'Product updated successfully');
      }
      
      return { success: true };
    } catch (err: unknown) {
      console.error('Error al actualizar producto:', err);
      const errorMessage = err instanceof Error ? err.message : 'No se pudo actualizar el producto';
      toast.error(`Error: ${errorMessage}`);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [supabase, products, selectedProduct, locale]);

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100">
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-2xl font-bold mb-0.5 gold-gradient-bright">{locale === 'es' ? 'Panel de Administración' : 'Admin Dashboard'}</h1>
      
      <div className="bg-[#1a1a1a] rounded-lg shadow-md p-3 mb-4">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={locale === 'es' ? 'Buscar por nombre o SKU...' : 'Search by name or SKU...'}
              className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label={locale === 'es' ? 'Buscar productos' : 'Search products'}
            />
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={categoryFilter || ''}
              onChange={(e) => setCategoryFilter(e.target.value ? parseInt(e.target.value) : null)}
              aria-label={locale === 'es' ? 'Filtrar por categoría' : 'Filter by category'}
            >
              <option value="">{locale === 'es' ? 'Todas las categorías' : 'All categories'}</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {locale === 'es' ? category.name_es : category.name_en}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => fetchProducts()}
            className="flex items-center justify-center px-3 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            disabled={loading}
          >
            <RefreshCw className={`h-5 w-5 mr-1 ${loading ? 'animate-spin' : ''}`} />
            {locale === 'es' ? 'Actualizar' : 'Update'}
          </button>
          
          <div className="flex items-center space-x-2 ml-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-amber-400/20 text-amber-400' : 'bg-[#252525] text-gray-400'}`}
              aria-label={locale === 'es' ? 'Ver en cuadrícula' : 'Grid view'}
              aria-pressed={viewMode === 'grid'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-amber-400/20 text-amber-400' : 'bg-[#252525] text-gray-400'}`}
              aria-label={locale === 'es' ? 'Ver en lista' : 'List view'}
              aria-pressed={viewMode === 'list'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {loading && !selectedProduct && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500 mb-2"></div>
          <p className="text-gray-400">{locale === 'es' ? 'Cargando productos...' : 'Loading products...'}</p>
        </div>
      )}
      
      {error && !selectedProduct && (
        <div className="bg-red-500/10 border-l-4 border-red-500 text-red-400 p-4 mb-6" role="alert">
          <p className="font-bold">{locale === 'es' ? 'Error' : 'Error'}</p>
          <p>{error}</p>
        </div>
      )}
      
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <ProductEditor 
              locale={locale}
              product={selectedProduct} 
              categories={categories}
              onSave={async (updates) => {
                const result = await updateProduct(selectedProduct.id, updates);
                if (result.success) {
                  setSelectedProduct(null);
                }
                return result;
              }}
              onCancel={() => setSelectedProduct(null)}
            />
          </div>
        </div>
      )}
      
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-6 bg-[#121212] rounded-lg">
          <p className="text-gray-400">{locale === 'es' ? 'No se encontraron productos' : 'No products found'}</p>
        </div>
      )}
      
      {filteredProducts.length > 0 && (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" 
          : "flex flex-col space-y-3"
        }>
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className={`bg-[#1a1a1a] rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg ${
                viewMode === 'grid' ? 'transform hover:-translate-y-1' : 'flex flex-col md:flex-row'
              }`}
            >
              {viewMode === 'grid' ? (
                <div className="cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  <div className="h-48 sm:h-56 relative">
                    <div className="h-full w-full flex items-center justify-center bg-amber-400/10 p-4">
                     {product.media && product.media.length > 0 && product.media[0].url ? (
                      <Image 
                        src={product.media[0].url} 
                        alt={product.name || (locale === 'es' ? 'Producto' : 'Product')} 
                        className="object-contain max-h-full max-w-full transition-transform duration-300"
                        width={300}
                        height={300}
                        priority={false}
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-[#303030] text-gray-400">
                        <span>{locale === 'es' ? 'Sin imagen' : 'No image'}</span>
                      </div>
                    )}
                  </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-white line-clamp-2">
                        {product.name_es || product.name || locale === 'es' ? `Producto #${product.id}` : `Product #${product.id}`}
                      </h3>
                      {product.is_active ? (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-emerald-400/10 text-emerald-300">
                          {locale === 'es' ? 'Activo' : 'Active'}
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-red-500/15 text-red-300">
                          {locale === 'es' ? 'Inactivo' : 'Inactive'}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-2 flex flex-col">
                      <div className="flex items-center">
                        <div className="flex-grow flex items-center">
                          <div className="flex flex-col space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="flex items-center">
                                <div className="flex items-center border border-white/10 rounded-l overflow-hidden">
                                  <span className="px-2 py-2 bg-[#121212] text-amber-400 font-bold border-r border-white/10">₡</span>
                                  <input 
                                    type="number" 
                                    className="w-24 px-2 py-2 text-xl font-bold text-amber-400 border-none focus:outline-none focus:ring-0" 
                                    value={product.colon_price || ''}
                                    onChange={(e) => {
                                      const newPrice = e.target.value ? parseFloat(e.target.value) : null;
                                      setProducts(products.map(p => 
                                        p.id === product.id ? { ...p, colon_price: newPrice } : p
                                      ));
                                    }}
                                    min="0"
                                    step="100"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                                <button 
                                  className="px-3 py-2 ml-1 bg-amber-500 hover:bg-amber-400 text-white text-sm font-medium rounded-r transition-colors duration-200 flex items-center justify-center"
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    if (product.colon_price !== null) {
                                      const loadingToast = toast.loading(`${locale === 'es' ? 'Actualizando precio...' : 'Updating price...'}`);
                                      await updateProduct(product.id, { colon_price: product.colon_price });
                                      toast.dismiss(loadingToast);
                                    }
                                  }}
                                  title={locale === 'es' ? 'Actualizar precio' : 'Update price'}
                                >
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  <span>{locale === 'es' ? 'Aplicar precio' : 'Apply price'}</span>
                                </button>
                              </div>

                              <div className="relative">
                                <button 
                                  className="p-2 text-gray-400 hover:bg-[#252525] rounded-full"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowProductMenu(showProductMenu === product.id ? null : product.id);
                                  }}
                                  title={locale === 'es' ? 'Más opciones' : 'More options'}
                                >
                                  <MoreVertical className="h-5 w-5" />
                                </button>
                                
                                {showProductMenu === product.id && (
                                  <div className="absolute right-0 mt-1 w-48 bg-[#1a1a1a] rounded-md shadow-lg py-1 z-10 border border-white/10">
                                    <button
                                      className={`w-full text-left px-4 py-2 text-sm flex items-center ${product.is_active ? 'text-red-400 hover:bg-red-500/10' : 'text-emerald-400 hover:bg-emerald-400/10'}`}
                                      onClick={async (e) => {
                                        e.stopPropagation();
                                        const loadingToast = toast.loading(`${product.is_active ? (locale === 'es' ? 'Desactivando' : 'Deactivating') : (locale === 'es' ? 'Activando' : 'Activating')} producto...`);
                                        await updateProduct(product.id, { is_active: !product.is_active });
                                        toast.dismiss(loadingToast);
                                        setShowProductMenu(null);
                                      }}
                                    >
                                      {product.is_active ? (
                                        <>
                                          <X className="h-4 w-4 mr-2" />
                                          {locale === 'es' ? 'Desactivar producto' : 'Deactivate product'}
                                        </>
                                      ) : (
                                        <>
                                          <Check className="h-4 w-4 mr-2" />
                                          {locale === 'es' ? 'Activar producto' : 'Activate product'}
                                        </>
                                      )}
                                    </button>
                                    
                                    <button
                                      className="w-full text-left px-4 py-2 text-sm flex items-center text-amber-400 hover:bg-amber-400/10"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedProduct(product);
                                        setShowProductMenu(null);
                                      }}
                                    >
                                      <Edit className="h-4 w-4 mr-2" />
                                      {locale === 'es' ? 'Editar producto' : 'Edit product'}
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center">
                              <div className="flex items-center border border-white/10 rounded-l overflow-hidden">
                                <input 
                                  type="number" 
                                  className="w-16 px-2 py-2 text-sm font-medium text-gray-300 border-none focus:outline-none focus:ring-0" 
                                  value={product.discount_percentage || ''}
                                  onChange={(e) => {
                                    const newDiscount = e.target.value ? parseFloat(e.target.value) : null;
                                    setProducts(products.map(p => 
                                      p.id === product.id ? { ...p, discount_percentage: newDiscount } : p
                                    ));
                                  }}
                                  min="0"
                                  max="100"
                                  step="1"
                                  placeholder="0"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <span className="px-2 py-2 bg-[#121212] text-gray-300 font-medium border-l border-white/10">%</span>
                              </div>
                              <button 
                                className="px-3 py-2 ml-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-r transition-colors duration-200 flex items-center justify-center"
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  const loadingToast = toast.loading(locale === 'es' ? 'Actualizando descuento...' : 'Updating discount...');
                                  await updateProduct(product.id, { discount_percentage: product.discount_percentage });
                                  toast.dismiss(loadingToast);
                                }}
                                title={locale === 'es' ? 'Actualizar descuento' : 'Update discount'}
                              >
                                <span>{locale === 'es' ? 'Aplicar descuento' : 'Apply discount'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {product.discount_percentage !== null && (
                        <div className="flex items-center mt-1">
                          <span className="text-xs font-medium bg-red-500/15 text-red-300 px-1.5 py-0.5 rounded">
                            {product.discount_percentage}% OFF
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {product.sku && (
                      <div className="mt-2 text-sm text-gray-400">
                        SKU: {product.sku}
                      </div>
                    )}
                    
                    {product.category_id && (
                      <div className="mt-2">
                        <span className="inline-block px-2 py-0.5 bg-amber-400/10 text-amber-400 text-xs rounded-full border border-amber-400/20">
                          {categories.find(cat => cat.id === product.category_id)?.name_es || (locale === 'es' ? 'Categoría' : 'Category')}
                        </span>
                      </div>
                    )}
                    
                    <div className="mt-2 text-center text-xs text-gray-400">
                      {locale === 'es' ? 'Última modificación' : 'Last modification'}: {product.modified_at ? formatModifiedDate(product.modified_at) : (locale === 'es' ? 'No disponible' : 'Not available')}
                    </div>
                    <div className="mt-1 text-center text-xs text-gray-400 italic">
                      {locale === 'es' ? 'Click para más opciones de edición' : 'Click for more editing options'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row p-3 gap-3 w-full">
                  <div 
                    className="relative w-full md:w-28 h-28 flex-shrink-0 cursor-pointer" 
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.media && product.media.length > 0 && product.media[0].url ? (
                      <Image 
                        src={product.media[0].url} 
                        alt={product.name || (locale === 'es' ? 'Producto' : 'Product')} 
                        className="w-full h-full object-contain bg-[#121212]"
                        width={120}
                        height={120}
                        priority={false}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-[#303030] text-gray-400">
                        <span>{locale === 'es' ? 'Sin imagen' : 'No image'}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-grow cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <h3 className="text-lg font-medium text-white mr-2">
                        {product.name_es || product.name || `Producto #${product.id}`}
                      </h3>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-400">
                      {product.sku && (
                        <div className="mr-3">
                          <span className="font-medium">SKU:</span> {product.sku}
                        </div>
                      )}
                      
                      {product.category_id && (
                        <span className="inline-block px-2 py-0.5 bg-amber-400/10 text-amber-400 text-xs rounded-full border border-amber-400/20">
                          {categories.find(cat => cat.id === product.category_id)?.name_es || (locale === 'es' ? 'Categoría' : 'Category')}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-400 mt-2">
                      {locale === 'es' ? 'Última modificación' : 'Last modification'}: {product.modified_at ? formatModifiedDate(product.modified_at) : (locale === 'es' ? 'No disponible' : 'Not available')}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap md:flex-row md:items-center gap-2 md:ml-auto">
                    {product.is_active ? (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-emerald-400/10 text-emerald-300">
                          {locale === 'es' ? 'Activo' : 'Active'}
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-red-500/15 text-red-300">
                          {locale === 'es' ? 'Inactivo' : 'Inactive'}
                        </span>
                      )}
                    <div className="flex items-center">
                      <div className="flex items-center border border-white/10 rounded-l overflow-hidden">
                        <span className="px-2 py-2 bg-[#121212] text-amber-400 font-bold border-r border-white/10">₡</span>
                        <input 
                          type="number" 
                          className="w-24 px-2 py-2 text-xl font-bold text-amber-400 border-none focus:outline-none focus:ring-0" 
                          value={product.colon_price || ''}
                          onChange={(e) => {
                            const newPrice = e.target.value ? parseFloat(e.target.value) : null;
                            setProducts(products.map(p => 
                              p.id === product.id ? { ...p, colon_price: newPrice } : p
                            ));
                          }}
                          min="0"
                          step="100"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <button 
                        className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-white text-sm font-medium rounded-r transition-colors duration-200 flex items-center justify-center"
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (product.colon_price !== null) {
                            const loadingToast = toast.loading(locale === 'es' ? 'Actualizando precio...' : 'Updating price...');
                            const result = await updateProduct(product.id, { colon_price: product.colon_price });
                            toast.dismiss(loadingToast);
                            if (!result.success) {
                              toast.error(locale === 'es' ? 'No se pudo actualizar el precio' : 'Could not update the price');
                            }
                          } else {
                            toast.error(locale === 'es' ? 'El precio no puede estar vacío' : 'The price cannot be empty');
                          }
                        }}
                        title={locale === 'es' ? 'Actualizar precio' : 'Update price'}
                        aria-label={locale === 'es' ? 'Guardar precio' : 'Save price'}
                      >
                        <Check className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex items-center border border-white/10 rounded-l overflow-hidden">
                        <input 
                          type="number" 
                          className="w-16 px-2 py-2 text-sm font-medium text-gray-300 border-none focus:outline-none focus:ring-0" 
                          value={product.discount_percentage || ''}
                          onChange={(e) => {
                            const newDiscount = e.target.value ? parseFloat(e.target.value) : null;
                            setProducts(products.map(p => 
                              p.id === product.id ? { ...p, discount_percentage: newDiscount } : p
                            ));
                          }}
                          min="0"
                          max="100"
                          step="1"
                          placeholder="0"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span className="px-2 py-2 bg-[#121212] text-gray-300 font-medium border-l border-white/10">%</span>
                      </div>
                      <button 
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-r transition-colors duration-200 flex items-center justify-center"
                        onClick={async (e) => {
                          e.stopPropagation();
                          const loadingToast = toast.loading(locale === 'es' ? 'Actualizando descuento...' : 'Updating discount...');
                          await updateProduct(product.id, { discount_percentage: product.discount_percentage });
                          toast.dismiss(loadingToast);
                        }}
                        title={locale === 'es' ? 'Actualizar descuento' : 'Update discount'}
                        aria-label={locale === 'es' ? 'Aplicar descuento' : 'Apply discount'}
                      >
                        <Check className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="relative">
                      <button 
                        className="p-2 text-gray-400 hover:bg-[#252525] rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setShowProductMenu(showProductMenu === product.id ? null : product.id);
                        }}
                        title={locale === 'es' ? 'Más opciones' : 'More options'}
                        aria-label={locale === 'es' ? 'Más opciones' : 'More options'}
                        aria-expanded={showProductMenu === product.id}
                        aria-controls={`product-menu-${product.id}`}
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                      
                      {showProductMenu === product.id && (
                        <div 
                          id={`product-menu-${product.id}`}
                          className="absolute right-0 sm:right-auto sm:left-0 md:right-0 md:left-auto mt-1 w-48 bg-[#1a1a1a] rounded-md shadow-lg py-1 z-50 border border-white/10"
                          role="menu"
                          aria-orientation="vertical"
                          style={{ maxWidth: 'calc(100vw - 20px)' }}
                        >
                          <button
                            className={`w-full text-left px-4 py-2 text-sm flex items-center ${product.is_active ? 'text-red-400 hover:bg-red-500/10' : 'text-emerald-400 hover:bg-emerald-400/10'}`}
                            onClick={async (e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              const loadingToast = toast.loading(
                                locale === 'es'
                                  ? `${product.is_active ? 'Desactivando' : 'Activando'} producto...`
                                  : `${product.is_active ? 'Deactivating' : 'Activating'} product...`
                              );
                              await updateProduct(product.id, { is_active: !product.is_active });
                              toast.dismiss(loadingToast);
                              setShowProductMenu(null);
                            }}
                            role="menuitem"
                          >
                            {product.is_active ? (
                              <>
                                <X className="h-4 w-4 mr-2" />
                                {locale === 'es' ? 'Desactivar producto' : 'Deactivate product'}
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                {locale === 'es' ? 'Activar producto' : 'Activate product'}
                              </>
                            )}
                          </button>
                          
                          <button
                            className="w-full text-left px-4 py-2 text-sm flex items-center text-amber-400 hover:bg-amber-400/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setSelectedProduct(product);
                              setShowProductMenu(null);
                            }}
                            role="menuitem"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            {locale === 'es' ? 'Editar producto' : 'Edit product'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
