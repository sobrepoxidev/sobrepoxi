'use client';

import { useState, useEffect } from 'react';
import { useSupabase } from '@/app/supabase-provider/provider';
import { Database } from '@/types-db';
import ProductEditor from './ProductEditor';
import { Search, Filter, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

type Product = Database['products'];

export default function AdminDashboard() {
  const { supabase } = useSupabase();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [categories, setCategories] = useState<Database['categories'][]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Cargar productos y categorías
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Función para cargar productos
  const fetchProducts = async () => {
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
  };

  // Función para cargar categorías
  const fetchCategories = async () => {
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
  };

  // Filtrar productos según búsqueda y categoría
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      !searchTerm || 
      (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.name_es && product.name_es.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !categoryFilter || product.category_id === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Actualizar un producto
  const updateProduct = async (productId: number, updates: Partial<Product>) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', productId);

      if (error) throw error;
      
      // Actualizar el producto en el estado local
      setProducts(products.map(p => 
        p.id === productId ? { ...p, ...updates } : p
      ));
      
      // Si estamos editando este producto, actualizar también el producto seleccionado
      if (selectedProduct && selectedProduct.id === productId) {
        setSelectedProduct({ ...selectedProduct, ...updates });
      }
      
      // Mostrar notificación de éxito
      if (updates.price !== undefined) {
        toast.success(
          <div className="flex flex-col">
            <span className="font-medium">Precio actualizado</span>
            <span className="text-sm">Nuevo precio: ₡{updates.price}</span>
          </div>,
          { duration: 3000 }
        );
      } else {
        toast.success('Producto actualizado correctamente');
      }
      
      return { success: true };
    } catch (err: unknown) {
      console.error('Error al actualizar producto:', err);
      toast.error(`Error: ${err instanceof Error ? err.message : 'No se pudo actualizar el producto'}`);
      return { success: false, error: err instanceof Error ? err.message : 'An unknown error occurred' };
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
      
      {/* Barra de herramientas */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Búsqueda */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre o SKU..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filtro de categoría */}
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={categoryFilter || ''}
              onChange={(e) => setCategoryFilter(e.target.value ? parseInt(e.target.value) : null)}
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name_es}
                </option>
              ))}
            </select>
          </div>
          
          {/* Botón de actualizar */}
          <button
            onClick={() => fetchProducts()}
            className="flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            disabled={loading}
          >
            <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
          
          {/* Selector de vista */}
          <div className="flex items-center space-x-2 ml-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-600'}`}
              aria-label="Ver en cuadrícula"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-600'}`}
              aria-label="Ver en lista"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Estado de carga o error */}
      {loading && !selectedProduct && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600 mb-2"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      )}
      
      {error && !selectedProduct && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      
      {/* Vista del editor de producto */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <ProductEditor 
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
      
      {/* Lista de productos */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No se encontraron productos</p>
        </div>
      )}
      
      {filteredProducts.length > 0 && (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
          : "flex flex-col space-y-4"
        }>
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:shadow-lg ${
                viewMode === 'grid' ? 'transform hover:-translate-y-1' : ''
              }`}
             
              onClick={() => setSelectedProduct(product)}
            >
              {viewMode === 'grid' ? (
                // Vista de cuadrícula
                <div >
                  <div className="h-48 sm:h-56 relative">
                  <div className="h-full w-full flex items-center justify-center bg-gray-50  p-4 "
            
                   > 
                    {product.media && product.media.length > 0 && product.media[0].url ? (
                      <Image 
                        src={product.media[0].url} 
                        alt={product.name || 'Producto'} 
                        className={`object-contain max-h-full max-w-full transition-transform duration-300 `}
                        width={150}
                        height={0}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-200 text-gray-400">
                        <span>Sin imagen</span>
                      </div>
                    )}
                  </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                        {product.name_es || product.name || `Producto #${product.id}`}
                      </h3>
                      {product.is_active ? (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Activo
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Inactivo
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-2 flex flex-col">
                      <div className="flex items-center">
                        <div className="flex-grow flex items-center">
                          <div className="flex items-center">
                            <div className="flex items-center">
                              <div className="flex items-center border border-gray-300 rounded-l overflow-hidden">
                                <span className="px-2 py-2 bg-gray-50 text-teal-700 font-bold border-r border-gray-300">₡</span>
                                <input 
                                  type="number" 
                                  className="w-24 px-2 py-2 text-xl font-bold text-teal-700 border-none focus:outline-none focus:ring-0" 
                                  value={product.price || ''}
                                  onChange={(e) => {
                                    const newPrice = e.target.value ? parseFloat(e.target.value) : null;
                                    setProducts(products.map(p => 
                                      p.id === product.id ? { ...p, price: newPrice } : p
                                    ));
                                  }}
                                  min="0"
                                  step="100"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>
                              <button 
                                className="px-3 py-2 ml-1 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-r transition-colors duration-200 flex items-center justify-center"
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  if (product.price !== null) {
                                    // Mostrar un toast de carga
                                    const loadingToast = toast.loading('Actualizando precio...');
                                    
                                    // Actualizar el precio
                                    
                                    // Cerrar el toast de carga
                                    toast.dismiss(loadingToast);
                                  }
                                }}
                                title="Actualizar precio"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Guardar</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {product.discount_percentage !== null && (
                        <div className="flex items-center mt-1">
                          <span className="text-xs font-medium bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                            {product.discount_percentage}% OFF
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {product.sku && (
                      <div className="mt-2 text-sm text-gray-500">
                        SKU: {product.sku}
                      </div>
                    )}
                    
                    {product.category_id && (
                      <div className="mt-2">
                        <span className="inline-block px-2 py-0.5 bg-teal-50 text-teal-700 text-xs rounded-full border border-teal-100">
                          {categories.find(cat => cat.id === product.category_id)?.name_es || 'Categoría'}
                        </span>
                      </div>
                    )}
                    
                    <div className="mt-3 text-center text-xs text-gray-500 italic">
                      Click para más opciones de edición
                    </div>
                  </div>
                </div>
              ) : (
                // Vista de lista
                <div className="flex p-4">
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-200 mr-4">
                    {product.media && product.media.length > 0 && product.media[0].url ? (
                      <Image 
                        src={product.media[0].url} 
                        alt={product.name || 'Producto'} 
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-200 text-gray-400">
                        <span>Sin imagen</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-900">
                        {product.name_es || product.name || `Producto #${product.id}`}
                      </h3>
                      {product.is_active ? (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Activo
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Inactivo
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center mt-1">
                      <div className="flex items-center mr-2">
                        <div className="flex items-center border border-gray-300 rounded-l overflow-hidden">
                          <span className="px-2 py-2 bg-gray-50 text-teal-700 font-bold border-r border-gray-300">₡</span>
                          <input 
                            type="number" 
                            className="w-24 px-2 py-2 text-xl font-bold text-teal-700 border-none focus:outline-none focus:ring-0" 
                            value={product.price || ''}
                            onChange={(e) => {
                              const newPrice = e.target.value ? parseFloat(e.target.value) : null;
                              setProducts(products.map(p => 
                                p.id === product.id ? { ...p, price: newPrice } : p
                              ));
                            }}
                            min="0"
                            step="100"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <button 
                          className="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-r transition-colors duration-200 flex items-center justify-center"
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (product.price !== null) {
                              // Mostrar un toast de carga
                              const loadingToast = toast.loading('Actualizando precio...');
                              
                              // Actualizar el precio
                              
                              // Cerrar el toast de carga
                              toast.dismiss(loadingToast);
                            }
                          }}
                          title="Actualizar precio"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Guardar</span>
                        </button>
                      </div>
                      {product.discount_percentage !== null && (
                        <span className="text-xs font-medium bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                          {product.discount_percentage}% OFF
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      {product.sku && (
                        <div className="mr-3">
                          SKU: {product.sku}
                        </div>
                      )}
                      
                      {product.category_id && (
                        <span className="inline-block px-2 py-0.5 bg-teal-50 text-teal-700 text-xs rounded-full border border-teal-100">
                          {categories.find(cat => cat.id === product.category_id)?.name_es || 'Categoría'}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-2 text-center text-xs text-gray-500 italic">
                      Click para más opciones de edición
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
