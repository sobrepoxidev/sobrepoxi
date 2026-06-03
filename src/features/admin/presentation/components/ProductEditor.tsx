'use client';

import { useState } from 'react';
import { Database } from '@/shared/types/database';
import { X, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

type Product = Database['products'];
type Category = Database['categories'];

interface ProductEditorProps {
  locale: string;
  product: Product;
  categories: Category[];
  onSave: (updates: Partial<Product>) => Promise<{ success: boolean; error?: string }>;
  onCancel: () => void;
}

export function ProductEditor({ locale, product, categories, onSave, onCancel }: ProductEditorProps) {
  const [price, setPrice] = useState<number | null>(product.colon_price);
  const [usdPrice, setUsdPrice] = useState<number | null>(product.dolar_price);
  const [name, setName] = useState<string | null>(product.name_es || product.name);
  const [isActive, setIsActive] = useState<boolean | null>(product.is_active);
  const [discountPercentage, setDiscountPercentage] = useState<number | null>(product.discount_percentage);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      
      const updates: Partial<Product> = {};
      
      if (price !== product.colon_price) updates.colon_price = price;
      if (usdPrice !== product.dolar_price) updates.dolar_price = usdPrice;
      if (name !== (product.name_es || product.name)) {
        updates.name = name;
        updates.name_es = name;
      }
      if (isActive !== product.is_active) updates.is_active = isActive;
      if (discountPercentage !== product.discount_percentage) updates.discount_percentage = discountPercentage;
      
      if (Object.keys(updates).length === 0) {
        toast(locale === 'es' ? 'No se han realizado cambios' : 'No changes made', {
          icon: '🔔',
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        });
        return;
      }
      
      if (updates.colon_price !== undefined && updates.colon_price !== null) {
        const priceNum = Number(updates.colon_price);
        if (isNaN(priceNum) || priceNum < 0) {
          throw new Error(locale === 'es' ? 'El precio debe ser un número válido mayor o igual a 0' : 'The price must be a valid number greater than or equal to 0');
        }
        updates.colon_price = priceNum;
      }
      
      if (updates.dolar_price !== undefined && updates.dolar_price !== null) {
        const usdNum = Number(updates.dolar_price);
        if (isNaN(usdNum) || usdNum < 0) {
          throw new Error(locale === 'es' ? 'El precio en USD debe ser un número válido mayor o igual a 0' : 'USD price must be a valid number greater than or equal to 0');
        }
        updates.dolar_price = usdNum;
      }
      
      if (updates.discount_percentage !== undefined && updates.discount_percentage !== null) {
        const discountNum = Number(updates.discount_percentage);
        if (isNaN(discountNum) || discountNum < 0 || discountNum > 100) {
          throw new Error(locale === 'es' ? 'El descuento debe ser un número entre 0 y 100' : 'The discount must be a number between 0 and 100');
        }
        updates.discount_percentage = discountNum;
      }
      
      const result = await onSave(updates);
      
      if (result.success) {
        setTimeout(() => {
          onCancel();
        }, 500);
      } else {
        toast.error(result.error || (locale === 'es' ? 'Error al guardar los cambios' : 'Error saving changes'));
        setError(result.error || (locale === 'es' ? 'Error al guardar los cambios' : 'Error saving changes'));
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : (locale === 'es' ? 'Error al guardar los cambios' : 'Error saving changes');
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 bg-[#1a1a1a] text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">{locale === 'es' ? 'Editar Producto' : 'Edit Product'}</h2>
        <button
          onClick={onCancel}
          className="p-2 rounded-full hover:bg-[#252525] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
          aria-label={locale === 'es' ? 'Cerrar' : 'Close'}
        >
          <X className="h-6 w-6 text-gray-400" />
        </button>
      </div>
      
      {error && (
        <div className="bg-red-500/10 border-l-4 border-red-500 text-red-400 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <div className="space-y-6">
        <div className="flex justify-center mb-6">
          <div className="w-full max-w-xs h-64 bg-[#303030] rounded-lg overflow-hidden">
            {product.media && product.media.length > 0 && product.media[0].url ? (
              <Image 
                src={product.media[0].url} 
                alt={product.name || 'Producto'} 
                className="w-full h-full object-contain"
                width={300}
                height={300}
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-[#303030] text-gray-400">
                <span>{locale === 'es' ? 'Sin imagen' : 'No image'}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-[#121212] p-4 rounded-lg">
          <div className="mb-2 text-sm text-gray-400">
            ID: {product.id} {product.sku && `• SKU: ${product.sku}`}
          </div>
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              {locale === 'es' ? 'Nombre del producto' : 'Product name'}
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={name || ''}
              onChange={(e) => setName(e.target.value || null)}
              placeholder={locale === 'es' ? 'Nombre del producto' : 'Product name'}
            />
            <p className="mt-1 text-xs text-amber-500">
              {locale === 'es' ? 'El nombre es un campo importante que solo se puede editar aquí' : 'The name is an important field that can only be edited here'}
            </p>
          </div>
          
          <div className="mb-4 p-3 border border-white/10 rounded-md bg-[#1a1a1a]">
            <h3 className="text-sm font-medium text-gray-400 mb-3">{locale === 'es' ? 'Campos de edición rápida' : 'Quick edit fields'}</h3>
            <p className="text-xs text-gray-400 mb-3">
              {locale === 'es' ? 'Estos campos también se pueden editar directamente desde las tarjetas de productos' : 'These fields can also be edited directly from the product cards'}
            </p>
            
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
                {locale === 'es' ? 'Precio (₡)' : 'Price (₡)'}
              </label>
              <input
                type="number"
                id="price"
                className="w-full px-3 py-2 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={price === null ? '' : price}
                onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : null)}
                min="0"
                step="100"
                placeholder="0"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="usdPrice" className="block text-sm font-medium text-gray-300 mb-1">
                {locale === 'es' ? 'Precio (US$)' : 'Price (US$)'}
              </label>
              <input
                type="number"
                id="usdPrice"
                className="w-full px-3 py-2 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={usdPrice === null ? '' : usdPrice}
                onChange={(e) => setUsdPrice(e.target.value ? parseFloat(e.target.value) : null)}
                min="0"
                step="0.01"
                placeholder="0"
              />
            </div>
            
            <div className="mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-white/10 rounded"
                  checked={isActive === true}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-300">
                  {locale === 'es' ? 'Producto activo (visible en la tienda)' : 'Product active (visible in the store)'}
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-300 mb-1">
                {locale === 'es' ? 'Porcentaje de descuento (%)' : 'Discount percentage (%)'}
              </label>
              <input
                type="number"
                id="discountPercentage"
                className="w-full px-3 py-2 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={discountPercentage === null ? '' : discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value ? parseFloat(e.target.value) : null)}
                min="0"
                max="100"
                step="0.1"
                placeholder={locale === 'es' ? 'Sin descuento' : 'No discount'}
              />
            </div>
          </div>
        </div>
        
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <button
            className="w-full flex justify-between items-center p-4 bg-[#121212] hover:bg-[#252525] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-500/40"
            onClick={() => setShowAdvanced(!showAdvanced)}
            aria-expanded={showAdvanced}
          >
            <span className="font-medium">{locale === 'es' ? 'Opciones avanzadas' : 'Advanced options'}</span>
            {showAdvanced ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>
          
          {showAdvanced && (
            <div className="p-4 bg-[#1a1a1a]">
              <p className="text-gray-400 text-sm mb-4">
                {locale === 'es' ? 'Estas opciones están disponibles pero no son necesarias para la edición rápida de precios.' : 'These options are available but are not necessary for quick price editing.'}
              </p>
              
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                  {locale === 'es' ? 'Categoría' : 'Category'}
                </label>
                <select
                  id="category"
                  className="w-full px-3 py-2 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  value={product.category_id || ''}
                  disabled
                >
                  <option value="">{locale === 'es' ? 'Sin categoría' : 'No category'}</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name_es}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-400">
                  {locale === 'es' ? 'La categoría no se puede cambiar desde esta pantalla.' : 'The category cannot be changed from this screen.'}
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-white/10 rounded-md text-gray-300 bg-[#1a1a1a] hover:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            {locale === 'es' ? 'Cancelar' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 flex items-center"
          >
            {saving ? (
              <>
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                {locale === 'es' ? 'Guardando...' : 'Saving...'}
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                {locale === 'es' ? 'Guardar cambios' : 'Save changes'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
