'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

// Interfaz para dirección de envío
interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
}

type UserProfile = {
  id: string;
  full_name?: string | null;
  shipping_address?: ShippingAddress | null;
  preferences?: Record<string, unknown> | null;
  created_at?: string;
  updated_at?: string;
};

type AddressTabProps = {
  profile: UserProfile | null;
  updateShippingAddress: (address: ShippingAddress) => Promise<void>;
  loading: boolean;
};

export default function AddressTab({ 
  profile, 
  updateShippingAddress, 
  loading 
}: AddressTabProps) {
  const t = useTranslations('Account');
  
  // Estado para el formulario
  const [formData, setFormData] = useState<ShippingAddress>({
    name: '',
    address: '',
    city: '',
    state: '',
    country: 'Costa Rica', // Valor predeterminado
    postal_code: '',
    phone: '',
  });
  
  // Estado para errores de validación
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Actualizar el formulario cuando se carga el perfil
  useEffect(() => {
    if (profile?.shipping_address) {
      setFormData(profile.shipping_address);
    }
  }, [profile]);
  
  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Validar el formulario
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Campos requeridos
    if (!formData.name.trim()) newErrors.name = t('requiredField');
    if (!formData.address.trim()) newErrors.address = t('requiredField');
    if (!formData.city.trim()) newErrors.city = t('requiredField');
    if (!formData.state.trim()) newErrors.state = t('requiredField');
    if (!formData.phone.trim()) newErrors.phone = t('requiredField');
    else if (!/^\d{8,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = t('invalidPhone');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    await updateShippingAddress(formData);
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {t('shippingAddress')}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
        {/* Nombre completo */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {t('fullName')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            disabled={loading}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        
        {/* Dirección */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            {t('address')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            disabled={loading}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>
        
        {/* Ciudad y Estado en la misma fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              {t('city')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
              disabled={loading}
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              {t('province')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
              disabled={loading}
            />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>
        </div>
        
        {/* País y Código Postal en la misma fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              {t('country')}
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700 mb-1">
              {t('postalCode')}
            </label>
            <input
              type="text"
              id="postal_code"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={loading}
            />
          </div>
        </div>
        
        {/* Teléfono */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            {t('phone')} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="8888-8888"
            disabled={loading}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        
        {/* Botón de guardar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? t('saving') : t('saveAddress')}
          </button>
        </div>
        
        <div className="text-xs text-gray-500 mt-2">
          <span className="text-red-500">*</span> {t('requiredFields')}
        </div>
      </form>
    </div>
  );
}
