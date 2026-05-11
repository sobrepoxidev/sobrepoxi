'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import type { UserProfile } from '../../application/distribute';

interface ShippingAddressForm {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
}

type AddressTabProps = {
  profile: UserProfile | null;
  updateShippingAddress: (address: ShippingAddressForm) => Promise<void>;
  loading: boolean;
};

export default function AddressTab({ 
  profile, 
  updateShippingAddress, 
  loading 
}: AddressTabProps) {
  const t = useTranslations('Account');
  
  const [formData, setFormData] = useState<ShippingAddressForm>({
    name: '',
    address: '',
    city: '',
    state: '',
    country: 'Costa Rica',
    postal_code: '',
    phone: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (profile?.shipping_address) {
      const addr = profile.shipping_address;
      setFormData({
        name: addr.name || '',
        address: addr.address || '',
        city: addr.city || '',
        state: addr.state || '',
        country: addr.country || 'Costa Rica',
        postal_code: addr.postal_code || '',
        phone: addr.phone || '',
      });
    }
  }, [profile]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
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