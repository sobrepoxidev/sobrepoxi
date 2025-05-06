'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, ChevronDown, ChevronUp, Sliders, Tag } from 'lucide-react';

import { Database } from '@/types-db';

type Category = Database['categories'];

interface FilterProps {
  categories: Category[];
  brands: string[];
  tags: string[];
  onFilterChange: (params: URLSearchParams) => void;
  isMobile?: boolean;
}

export default function ProductFilters({ 
  categories, 
  brands,
  tags,
  onFilterChange,
  isMobile = false
}: FilterProps) {

  const searchParams = useSearchParams();
  
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);
  const [stockOpen, setStockOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category') || null
  );

  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    searchParams.get('brand') || null
  );

  const [selectedTag, setSelectedTag] = useState<string | null>(
    searchParams.get('tag') || null
  );
  
  const [inStock, setInStock] = useState<boolean>(
    searchParams.get('in_stock') === 'true'
  );

  const [featuredOnly, setFeaturedOnly] = useState<boolean>(
    searchParams.get('featured') === 'true'
  );
  

  const [priceFilterMin, setPriceFilterMin] = useState('');
  const [priceFilterMax, setPriceFilterMax] = useState('');
  
  // Detectar cambios en los parámetros de búsqueda
  useEffect(() => {
    const category = searchParams.get('category');
    setSelectedCategory(category);
    
    const brand = searchParams.get('brand');
    setSelectedBrand(brand);
    
    const tag = searchParams.get('tag');
    setSelectedTag(tag);
    
    const stock = searchParams.get('in_stock');
    setInStock(stock === 'true');
    
    const featured = searchParams.get('featured');
    setFeaturedOnly(featured === 'true');
    
    const min = searchParams.get('min_price');
    const max = searchParams.get('max_price');
    
    if (min) setPriceFilterMin(min);
    if (max) setPriceFilterMax(max);
  }, [searchParams]);
  
  // Aplicar filtros
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Aplicar categoría
    if (selectedCategory) {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }
    
    // Aplicar marca
    if (selectedBrand) {
      params.set('brand', selectedBrand);
    } else {
      params.delete('brand');
    }
    
    // Aplicar etiqueta
    if (selectedTag) {
      params.set('tag', selectedTag);
    } else {
      params.delete('tag');
    }
    
    // Aplicar stock
    if (inStock) {
      params.set('in_stock', 'true');
    } else {
      params.delete('in_stock');
    }
    
    // Aplicar destacados
    if (featuredOnly) {
      params.set('featured', 'true');
    } else {
      params.delete('featured');
    }
    
    // Aplicar rango de precios
    if (priceFilterMin) {
      params.set('min_price', priceFilterMin);
    } else {
      params.delete('min_price');
    }
    
    if (priceFilterMax) {
      params.set('max_price', priceFilterMax);
    } else {
      params.delete('max_price');
    }
    
    // Siempre mantener la página 1 al aplicar filtros
    params.set('page', '1');
    
    onFilterChange(params);
    
    // Cerrar los filtros móviles automáticamente después de aplicar
    if (isMobile) {
      setMobileFiltersOpen(false);
    }
  };
  
  // Resetear todos los filtros
  const resetFilters = () => {
    const params = new URLSearchParams();
    params.set('page', '1');
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSelectedTag(null);
    setInStock(false);
    setFeaturedOnly(false);
    setPriceFilterMin('');
    setPriceFilterMax('');
    onFilterChange(params);
  };
  
  // Si es la versión móvil, envolver en un panel desplegable
  const filterContent = (
    <div className="space-y-6">
      {/* Filtro de categorías */}
      <div className="border-b border-gray-200 pb-4">
        <button 
          className="flex w-full items-center justify-between text-lg font-medium text-gray-900 mb-2"
          onClick={() => setCategoryOpen(!categoryOpen)}
        >
          Categorías
          {categoryOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        
        {categoryOpen && (
          <div className="mt-2 space-y-1">
            <button 
              onClick={() => {
                setSelectedCategory(null);
                applyFilters();
              }}
              className={`flex items-center w-full px-2 py-1.5 text-sm rounded-md ${
                selectedCategory === null ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="flex-1 text-left">Todas las categorías</span>
              {selectedCategory === null && <Check className="h-4 w-4" />}
            </button>
            
            {categories.map((category) => (
              <button 
                key={category.id}
                onClick={() => {
                  setSelectedCategory(String(category.id));
                  applyFilters();
                }}
                className={`flex items-center w-full px-2 py-1.5 text-sm rounded-md ${
                  selectedCategory === String(category.id) ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="flex-1 text-left">{category.name}</span>
                {selectedCategory === String(category.id) && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Filtro de precios */}
      <div className="border-b border-gray-200 pb-4">
        <button 
          className="flex w-full items-center justify-between text-lg font-medium text-gray-900 mb-2"
          onClick={() => setPriceOpen(!priceOpen)}
        >
          Precio
          {priceOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        
        {priceOpen && (
          <div className="mt-2 space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Mín"
                value={priceFilterMin}
                onChange={(e) => setPriceFilterMin(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Máx"
                value={priceFilterMax}
                onChange={(e) => setPriceFilterMax(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            <button
              onClick={applyFilters}
              className="w-full py-1.5 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition"
            >
              Aplicar
            </button>
          </div>
        )}
      </div>
      
      {/* Filtro de marcas */}
      <div className="border-b border-gray-200 pb-4">
        <button 
          className="flex w-full items-center justify-between text-lg font-medium text-gray-900 mb-2"
          onClick={() => setBrandOpen(!brandOpen)}
        >
          Marca
          {brandOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        
        {brandOpen && brands.length > 0 && (
          <div className="mt-2 space-y-1 max-h-60 overflow-y-auto">
            <button 
              onClick={() => {
                setSelectedBrand(null);
                applyFilters();
              }}
              className={`flex items-center w-full px-2 py-1.5 text-sm rounded-md ${
                selectedBrand === null ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="flex-1 text-left">Todas las marcas</span>
              {selectedBrand === null && <Check className="h-4 w-4" />}
            </button>
            
            {brands.map((brand) => (
              <button 
                key={brand}
                onClick={() => {
                  setSelectedBrand(brand);
                  applyFilters();
                }}
                className={`flex items-center w-full px-2 py-1.5 text-sm rounded-md ${
                  selectedBrand === brand ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="flex-1 text-left">{brand}</span>
                {selectedBrand === brand && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Filtro de etiquetas */}
      <div className="border-b border-gray-200 pb-4">
        <button 
          className="flex w-full items-center justify-between text-lg font-medium text-gray-900 mb-2"
          onClick={() => setTagOpen(!tagOpen)}
        >
          Etiquetas
          {tagOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        
        {tagOpen && tags.length > 0 && (
          <div className="mt-2 space-y-1 max-h-60 overflow-y-auto">
            <button 
              onClick={() => {
                setSelectedTag(null);
                applyFilters();
              }}
              className={`flex items-center w-full px-2 py-1.5 text-sm rounded-md ${
                selectedTag === null ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="flex-1 text-left">Todas las etiquetas</span>
              {selectedTag === null && <Check className="h-4 w-4" />}
            </button>
            
            {tags.map((tag) => (
              <button 
                key={tag}
                onClick={() => {
                  setSelectedTag(tag);
                  applyFilters();
                }}
                className={`flex items-center w-full px-2 py-1.5 text-sm rounded-md ${
                  selectedTag === tag ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="flex-1 text-left flex items-center">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
                {selectedTag === tag && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Filtros adicionales */}
      <div className="border-b border-gray-200 pb-4">
        <button 
          className="flex w-full items-center justify-between text-lg font-medium text-gray-900 mb-2"
          onClick={() => setStockOpen(!stockOpen)}
        >
          Más filtros
          {stockOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        
        {stockOpen && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={inStock}
                onChange={() => {
                  setInStock(!inStock);
                  setTimeout(applyFilters, 0);
                }}
                className="rounded text-teal-600 focus:ring-teal-500 h-4 w-4"
              />
              <span className="text-sm text-gray-700">Solo productos en stock</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={featuredOnly}
                onChange={() => {
                  setFeaturedOnly(!featuredOnly);
                  setTimeout(applyFilters, 0);
                }}
                className="rounded text-teal-600 focus:ring-teal-500 h-4 w-4"
              />
              <span className="text-sm text-gray-700">Solo productos destacados</span>
            </label>
          </div>
        )}
      </div>
      
      {/* Botón para restablecer filtros */}
      <button
        onClick={resetFilters}
        className="w-full py-2 text-sm text-gray-600 hover:text-teal-700 transition"
      >
        Limpiar todos los filtros
      </button>
    </div>
  );
  
  // Versión móvil
  if (isMobile) {
    return (
      <div className="md:hidden">
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex items-center justify-center w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-sm text-gray-700"
        >
          <Sliders className="h-4 w-4 mr-2" />
          Filtrar productos
        </button>
        
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-40 overflow-y-auto bg-black bg-opacity-25">
            <div className="relative bg-white p-4 w-full max-w-lg mx-auto mt-10 rounded-t-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Cerrar panel</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {filterContent}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Versión desktop
  return (
    <div className="hidden md:block">
      {filterContent}
    </div>
  );
}
