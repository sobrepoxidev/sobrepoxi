'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSupabase } from '@/app/supabase-provider/provider';
import { Database } from '@/types-db';
import ProductEditor from './ProductEditor';
import { Search, Filter, RefreshCw, MoreVertical, Check, X, Edit } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

type Product = Database['products'];

// Función para formatear la fecha de modificación en formato costarricense
const formatModifiedDate = (dateString: string): string => {
  // Ajustar la zona horaria a Costa Rica (UTC-6)
  const now = new Date();
  const modifiedDate = new Date(dateString);
  
  // Ajustar a la zona horaria de Costa Rica (UTC-6)
  const options: Intl.DateTimeFormatOptions = { 
    timeZone: 'America/Costa_Rica',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true 
  };
  
  const timeFormatter = new Intl.DateTimeFormat('es-CR', options);
  const timeString = timeFormatter.format(modifiedDate).toLowerCase();
  
  // Calcular diferencia en días
  const diffInMs = now.getTime() - modifiedDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  
  // Para fechas de hoy
  if (diffInDays === 0) {
    return `Hoy a las ${timeString}`;
  } 
  // Para ayer
  else if (diffInDays === 1) {
    return `Ayer a las ${timeString}`;
  } 
  // Últimos 7 días (mostrar día de la semana)
  else if (diffInDays < 7) {
    const dayFormatter = new Intl.DateTimeFormat('es-CR', { 
      weekday: 'long',
      timeZone: 'America/Costa_Rica'
    });
    const dayName = dayFormatter.format(modifiedDate);
    return `El ${dayName.charAt(0).toUpperCase() + dayName.slice(1)} a las ${timeString}`;
  } 
  // Hace 1 semana
  else if (diffInWeeks === 1) {
    return 'La semana pasada';
  } 
  // Hace 2-3 semanas
  else if (diffInWeeks < 4) {
    return `Hace ${diffInWeeks} semana${diffInWeeks > 1 ? 's' : ''}`;
  } 
  // Hace 1 mes o más
  else {
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths === 1) {
      return 'Hace 1 mes';
    } else if (diffInMonths < 12) {
      return `Hace ${diffInMonths} meses`;
    } else {
      // Para más de un año
      const diffInYears = Math.floor(diffInMonths / 12);
      return `Hace ${diffInYears} año${diffInYears > 1 ? 's' : ''}`;
    }
  }
};

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
  const [showProductMenu, setShowProductMenu] = useState<number | null>(null); // Para controlar el menú de opciones

  // Cargar productos y categorías
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  
  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Verificar si el clic fue fuera del menú
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

  // Función para cargar productos
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
  }, [supabase, setLoading, setProducts, setError]);

  // Función para cargar categorías
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
  }, [supabase, setCategories]);

  // Filtrar productos según búsqueda y categoría
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

  // Actualizar un producto
  const updateProduct = useCallback(async (productId: number, updates: Partial<Product>) => {
    try {
      setLoading(true);
      
      // Validar los datos antes de actualizar
      if (updates.price !== undefined) {
        const price = Number(updates.price);
        if (isNaN(price) || price < 0) {
          throw new Error('El precio debe ser un número válido mayor o igual a 0');
        }
        updates.price = price;
      }
      
      if (updates.discount_percentage !== undefined) {
        const discount = Number(updates.discount_percentage);
        if (isNaN(discount) || discount < 0 || discount > 100) {
          throw new Error('El descuento debe ser un número entre 0 y 100');
        }
        updates.discount_percentage = discount;
      }

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
      
      // Mostrar notificación de éxito según el tipo de actualización
      if (updates.price !== undefined) {
        toast.success(
          <div className="flex flex-col">
            <span className="font-medium">Precio actualizado</span>
            <span className="text-sm">Nuevo precio: ₡{updates.price}</span>
          </div>,
          { duration: 3000 }
        );
      } else if (updates.is_active !== undefined) {
        toast.success(
          <div className="flex flex-col">
            <span className="font-medium">Estado actualizado</span>
            <span className="text-sm">{updates.is_active ? 'Producto activado' : 'Producto desactivado'}</span>
          </div>,
          { duration: 3000 }
        );
      } else if (updates.discount_percentage !== undefined) {
        toast.success(
          <div className="flex flex-col">
            <span className="font-medium">Descuento actualizado</span>
            <span className="text-sm">
              {updates.discount_percentage > 0 
                ? `Descuento: ${updates.discount_percentage}%`
                : 'Descuento removido'}
            </span>
          </div>,
          { duration: 3000 }
        );
      } else {
        toast.success('Producto actualizado correctamente');
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
  }, [supabase, products, selectedProduct, setLoading, setProducts, setSelectedProduct]);

  return (
    <div className="container mx-auto px-4 py-2 text-gray-800">
      <h1 className="text-2xl font-bold mb-0.5">Panel de Administración</h1>
      
      {/* Barra de herramientas */}
      <div className="bg-white rounded-lg shadow-md p-3 mb-4">
        <div className="flex flex-col md:flex-row gap-2">
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
              aria-label="Buscar productos"
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
              aria-label="Filtrar por categoría"
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
            className="flex items-center justify-center px-3 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            disabled={loading}
          >
            <RefreshCw className={`h-5 w-5 mr-1 ${loading ? 'animate-spin' : ''}`} />
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
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No se encontraron productos</p>
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
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg ${
                viewMode === 'grid' ? 'transform hover:-translate-y-1' : 'flex flex-col md:flex-row'
              }`}
            >
              {viewMode === 'grid' ? (
                // Vista de cuadrícula
                <div className="cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  <div className="h-48 sm:h-56 relative">
                    <div className="h-full w-full flex items-center justify-center bg-teal-50 p-4"
            
                   > 
                    {product.media && product.media.length > 0 && product.media[0].url ? (
                      <Image 
                        src={product.media[0].url} 
                        alt={product.name || 'Producto'} 
                        className="object-contain max-h-full max-w-full transition-transform duration-300"
                        width={300}
                        height={300}
                        priority={false}
                        sizes="(max-width: 768px) 100vw, 300px"
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
                          <div className="flex flex-col space-y-2">
                            {/* Primera fila: Precio y estado */}
                            <div className="flex flex-wrap items-center gap-2">
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
                                    e.preventDefault();
                                    if (product.price !== null) {
                                      const loadingToast = toast.loading('Actualizando precio...');
                                      await updateProduct(product.id, { price: product.price });
                                      toast.dismiss(loadingToast);
                                    }
                                  }}
                                  title="Actualizar precio"
                                >
                                  
                                  <span>Aplicar precio</span>
                                </button>
                              </div>

                              {/* Menú de opciones */}
                              <div className="relative">
                                <button 
                                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowProductMenu(showProductMenu === product.id ? null : product.id);
                                  }}
                                  title="Más opciones"
                                >
                                  <MoreVertical className="h-5 w-5" />
                                </button>
                                
                                {showProductMenu === product.id && (
                                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                                    {/* Botón para activar/desactivar producto */}
                                    <button
                                      className={`w-full text-left px-4 py-2 text-sm flex items-center ${product.is_active ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
                                      onClick={async (e) => {
                                        e.stopPropagation();
                                        const loadingToast = toast.loading(`${product.is_active ? 'Desactivando' : 'Activando'} producto...`);
                                        await updateProduct(product.id, { is_active: !product.is_active });
                                        toast.dismiss(loadingToast);
                                        setShowProductMenu(null);
                                      }}
                                    >
                                      {product.is_active ? (
                                        <>
                                          <X className="h-4 w-4 mr-2" />
                                          Desactivar producto
                                        </>
                                      ) : (
                                        <>
                                          <Check className="h-4 w-4 mr-2" />
                                          Activar producto
                                        </>
                                      )}
                                    </button>
                                    
                                    {/* Botón para editar producto completo */}
                                    <button
                                      className="w-full text-left px-4 py-2 text-sm flex items-center text-blue-600 hover:bg-blue-50"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedProduct(product);
                                        setShowProductMenu(null);
                                      }}
                                    >
                                      <Edit className="h-4 w-4 mr-2" />
                                      Editar producto
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Segunda fila: Control de descuento */}
                            <div className="flex items-center">
                              <div className="flex items-center border border-gray-300 rounded-l overflow-hidden">
                                <input 
                                  type="number" 
                                  className="w-16 px-2 py-2 text-sm font-medium text-gray-700 border-none focus:outline-none focus:ring-0" 
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
                                <span className="px-2 py-2 bg-gray-50 text-gray-700 font-medium border-l border-gray-300">%</span>
                              </div>
                              <button 
                                className="px-3 py-2 ml-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-r transition-colors duration-200 flex items-center justify-center"
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  const loadingToast = toast.loading('Actualizando descuento...');
                                  await updateProduct(product.id, { discount_percentage: product.discount_percentage });
                                  toast.dismiss(loadingToast);
                                }}
                                title="Actualizar descuento"
                              >
                                <span>Aplicar descuento</span>
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
                    
                    <div className="mt-2 text-center text-xs text-gray-500">
                      Última modificación: {product.modified_at ? formatModifiedDate(product.modified_at) : 'No disponible'}
                    </div>
                    <div className="mt-1 text-center text-xs text-gray-400 italic">
                      Click para más opciones de edición
                    </div>
                  </div>
                </div>
              ) : (
                // Vista de lista mejorada
                <div className="flex flex-col md:flex-row p-3 gap-3 w-full">
                  {/* Columna de imagen - más pequeña en modo lista */}
                  <div 
                    className="relative w-full md:w-28 h-28 flex-shrink-0 cursor-pointer" 
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.media && product.media.length > 0 && product.media[0].url ? (
                      <Image 
                        src={product.media[0].url} 
                        alt={product.name || 'Producto'} 
                        className="w-full h-full object-contain bg-gray-50"
                        width={120}
                        height={120}
                        priority={false}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-200 text-gray-400">
                        <span>Sin imagen</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Columna de información - central */}
                  <div className="flex-grow cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <h3 className="text-lg font-medium text-gray-900 mr-2">
                        {product.name_es || product.name || `Producto #${product.id}`}
                      </h3>
                     
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500">
                      {product.sku && (
                        <div className="mr-3">
                          <span className="font-medium">SKU:</span> {product.sku}
                        </div>
                      )}
                      
                      {product.category_id && (
                        <span className="inline-block px-2 py-0.5 bg-teal-50 text-teal-700 text-xs rounded-full border border-teal-100">
                          {categories.find(cat => cat.id === product.category_id)?.name_es || 'Categoría'}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-2">
                      Última modificación: {product.modified_at ? formatModifiedDate(product.modified_at) : 'No disponible'}
                    </div>
                  </div>
                  
                  {/* Columna de controles - derecha */}
                  <div className="flex flex-wrap md:flex-row md:items-center gap-2 md:ml-auto">
                  {product.is_active ? (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Activo
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Inactivo
                        </span>
                      )}
                    {/* Control de precio */}
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
                        className="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-r transition-colors duration-200 flex items-center justify-center"
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (product.price !== null) {
                            const loadingToast = toast.loading('Actualizando precio...');
                            const result = await updateProduct(product.id, { price: product.price });
                            toast.dismiss(loadingToast);
                            if (!result.success) {
                              toast.error('No se pudo actualizar el precio');
                            }
                          } else {
                            toast.error('El precio no puede estar vacío');
                          }
                        }}
                        title="Actualizar precio"
                        aria-label="Guardar precio"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {/* Control de descuento */}
                    <div className="flex items-center">
                      <div className="flex items-center border border-gray-300 rounded-l overflow-hidden">
                        <input 
                          type="number" 
                          className="w-16 px-2 py-2 text-sm font-medium text-gray-700 border-none focus:outline-none focus:ring-0" 
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
                        <span className="px-2 py-2 bg-gray-50 text-gray-700 font-medium border-l border-gray-300">%</span>
                      </div>
                      <button 
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-r transition-colors duration-200 flex items-center justify-center"
                        onClick={async (e) => {
                          e.stopPropagation();
                          const loadingToast = toast.loading('Actualizando descuento...');
                          await updateProduct(product.id, { discount_percentage: product.discount_percentage });
                          toast.dismiss(loadingToast);
                        }}
                        title="Actualizar descuento"
                        aria-label="Aplicar descuento"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {/* Menú de opciones */}
                    <div className="relative">
                      <button 
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setShowProductMenu(showProductMenu === product.id ? null : product.id);
                        }}
                        title="Más opciones"
                        aria-label="Más opciones"
                        aria-expanded={showProductMenu === product.id}
                        aria-controls={`product-menu-${product.id}`}
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                      
                      {showProductMenu === product.id && (
                        <div 
                          id={`product-menu-${product.id}`}
                          className="absolute right-0 sm:right-auto sm:left-0 md:right-0 md:left-auto mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                          role="menu"
                          aria-orientation="vertical"
                          style={{ maxWidth: 'calc(100vw - 20px)' }}
                        >
                          {/* Botón para activar/desactivar producto */}
                          <button
                            className={`w-full text-left px-4 py-2 text-sm flex items-center ${product.is_active ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
                            onClick={async (e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              const loadingToast = toast.loading(`${product.is_active ? 'Desactivando' : 'Activando'} producto...`);
                              await updateProduct(product.id, { is_active: !product.is_active });
                              toast.dismiss(loadingToast);
                              setShowProductMenu(null);
                            }}
                            role="menuitem"
                          >
                            {product.is_active ? (
                              <>
                                <X className="h-4 w-4 mr-2" />
                                Desactivar producto
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Activar producto
                              </>
                            )}
                          </button>
                          
                          {/* Botón para editar producto completo */}
                          <button
                            className="w-full text-left px-4 py-2 text-sm flex items-center text-blue-600 hover:bg-blue-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setSelectedProduct(product);
                              setShowProductMenu(null);
                            }}
                            role="menuitem"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Editar producto
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
  );
}
