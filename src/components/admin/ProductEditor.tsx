'use client';

import { useState } from 'react';
import { Database } from '@/types-db';
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

export default function ProductEditor({ locale, product, categories, onSave, onCancel }: ProductEditorProps) {
  // Campos que ya se pueden editar directamente en las tarjetas
  // - price: se puede editar en la tarjeta con guardado inmediato
  // - is_active: se puede activar/desactivar en la tarjeta con guardado inmediato
  // - discount_percentage: se puede editar en la tarjeta con guardado inmediato
  
  // En el editor modal, nos enfocamos en campos que no se pueden editar fácilmente en las tarjetas
  // y opciones más avanzadas
  const [price, setPrice] = useState<number | null>(product.colon_price);
  const [name, setName] = useState<string | null>(product.name_es || product.name);
  const [isActive, setIsActive] = useState<boolean | null>(product.is_active);
  const [discountPercentage, setDiscountPercentage] = useState<number | null>(product.discount_percentage);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Manejar el guardado de cambios
  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      
      const updates: Partial<Product> = {};
      
      // Solo incluir campos que han cambiado
      if (price !== product.colon_price) updates.colon_price = price;
      if (name !== (product.name_es || product.name)) {
        updates.name = name;
        updates.name_es = name;
      }
      if (isActive !== product.is_active) updates.is_active = isActive;
      if (discountPercentage !== product.discount_percentage) updates.discount_percentage = discountPercentage;
      
      // Si no hay cambios, mostrar mensaje y salir
      if (Object.keys(updates).length === 0) {
        toast(locale === 'es' ? 'No se han realizado cambios' : 'No changes made', {
          icon: '🔔',
          style: {
            background: '#3498db',
            color: '#fff'
          }
        });
        return;
      }
      
      // Validar datos antes de guardar
      if (updates.colon_price !== undefined && updates.colon_price !== null) {
        const priceNum = Number(updates.colon_price);
        if (isNaN(priceNum) || priceNum < 0) {
          throw new Error(locale === 'es' ? 'El precio debe ser un número válido mayor o igual a 0' : 'The price must be a valid number greater than or equal to 0');
        }
        updates.colon_price = priceNum;
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
        // El toast se mostrará desde el componente AdminDashboard
        // Cerrar el modal después de un breve retraso
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{locale === 'es' ? 'Editar Producto' : 'Edit Product'}</h2>
        <button
          onClick={onCancel}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Cerrar"
        >
          <X className="h-6 w-6 text-gray-500" />
        </button>
      </div>
      
      {/* Mensajes de error o éxito */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <div className="space-y-6">
        {/* Imagen del producto */}
        <div className="flex justify-center mb-6">
          <div className="w-full max-w-xs h-64 bg-gray-200 rounded-lg overflow-hidden">
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
              <div className="flex items-center justify-center h-full bg-gray-200 text-gray-400">
                <span>{locale === 'es' ? 'Sin imagen' : 'No image'}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Información principal del producto */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-2 text-sm text-gray-500">
            ID: {product.id} {product.sku && `• SKU: ${product.sku}`}
          </div>
          
          {/* Nombre del producto - No editable en tarjetas */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {locale === 'es' ? 'Nombre del producto' : 'Product name'}
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={name || ''}
              onChange={(e) => setName(e.target.value || null)}
              placeholder="Nombre del producto"
            />
            <p className="mt-1 text-xs text-teal-600">
              {locale === 'es' ? 'El nombre es un campo importante que solo se puede editar aquí' : 'The name is an important field that can only be edited here'}
            </p>
          </div>
          
          {/* Sección de campos que también se pueden editar en las tarjetas */}
          <div className="mb-4 p-3 border border-gray-200 rounded-md bg-white">
            <h3 className="text-sm font-medium text-gray-500 mb-3">{locale === 'es' ? 'Campos de edición rápida' : 'Quick edit fields'}</h3>
            <p className="text-xs text-gray-500 mb-3">
              {locale === 'es' ? 'Estos campos también se pueden editar directamente desde las tarjetas de productos' : 'These fields can also be edited directly from the product cards'}
            </p>
            
            {/* Precio */}
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                {locale === 'es' ? 'Precio (₡)' : 'Price (₡)'}
              </label>
              <input
                type="number"
                id="price"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={price === null ? '' : price}
                onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : null)}
                min="0"
                step="100"
                placeholder="0"
              />
            </div>
            
            {/* Estado activo */}
            <div className="mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  checked={isActive === true}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                  {locale === 'es' ? 'Producto activo (visible en la tienda)' : 'Product active (visible in the store)'}
                </label>
              </div>
            </div>
            
            {/* Descuento */}
            <div className="mb-4">
              <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700 mb-1">
                {locale === 'es' ? 'Porcentaje de descuento (%)' : 'Discount percentage (%)'}
              </label>
              <input
                type="number"
                id="discountPercentage"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={discountPercentage === null ? '' : discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value ? parseFloat(e.target.value) : null)}
                min="0"
                max="100"
                step="0.1"
                placeholder="Sin descuento"
              />
            </div>
          </div>
        </div>
        
        {/* Opciones avanzadas (colapsables) */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <span className="font-medium">{locale === 'es' ? 'Opciones avanzadas' : 'Advanced options'}</span>
            {showAdvanced ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {showAdvanced && (
            <div className="p-4 bg-white">
              <p className="text-gray-500 text-sm mb-4">
                {locale === 'es' ? 'Estas opciones están disponibles pero no son necesarias para la edición rápida de precios.' : 'These options are available but are not necessary for quick price editing.'}
              </p>
              
              {/* Aquí se pueden agregar más campos como categoría, especificaciones, etc. */}
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  {locale === 'es' ? 'Categoría' : 'Category'}
                </label>
                <select
                  id="category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                <p className="mt-1 text-xs text-gray-500">
                  {locale === 'es' ? 'La categoría no se puede cambiar desde esta pantalla.' : 'The category cannot be changed from this screen.'}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Botones de acción */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            {locale === 'es' ? 'Cancelar' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 flex items-center"
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
