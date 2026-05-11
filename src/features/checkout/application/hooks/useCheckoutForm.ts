'use client';

import { useState, useEffect } from 'react';
import { useSupabase } from '@/app/supabase-provider/provider';
import { Session } from '@supabase/supabase-js';
import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';
import type { Database } from '@/shared/types/database';
import type { ShippingAddress, DiscountInfo } from '@/features/checkout';

export interface UseCheckoutFormOptions {
  locale: string;
  initialData?: ShippingAddress | null;
}

export function useCheckoutForm({ locale, initialData }: UseCheckoutFormOptions) {
  const { supabase } = useSupabase();
  const t = useTranslations('Account');

  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<Database['user_profiles'] | null>(null);
  const [showAddressOptions, setShowAddressOptions] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const [discountInfo, setDiscountInfo] = useState<DiscountInfo | null>(null);

  const [formData, setFormData] = useState({
    nombre: initialData?.name?.split(' ')[0] || '',
    apellidos: initialData?.name?.split(' ').slice(1).join(' ') || '',
    email: '',
    telefono: initialData?.phone || '',
    direccion1: initialData?.address || '',
    direccion2: '',
    provincia: initialData?.state || '',
    canton: initialData?.city || '',
    distrito: '',
    codigoPostal: initialData?.postal_code || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const discountInfoStr = localStorage.getItem('discountInfo');
      if (discountInfoStr) {
        try {
          setDiscountInfo(JSON.parse(discountInfoStr));
        } catch (e) {
          console.error('Error parsing discount info:', e);
        }
      }

      const justLoggedInFlag = sessionStorage.getItem('justLoggedIn');
      if (justLoggedInFlag === 'true') {
        setJustLoggedIn(true);
        sessionStorage.removeItem('justLoggedIn');
      }
    }
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event: string, newSession: Session | null) => {
      setSession(newSession);
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        setJustLoggedIn(true);
        sessionStorage.setItem('justLoggedIn', 'true');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session?.user?.id) {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (!error && data) {
          setUserProfile(data);
          if (justLoggedIn && data.shipping_address) {
            setShowAddressOptions(true);
          }
        }
      }
    };

    fetchUserProfile();
  }, [session, supabase, justLoggedIn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = locale === 'es' ? 'El nombre es requerido' : 'The name is required';
    if (!formData.apellidos.trim()) newErrors.apellidos = locale === 'es' ? 'Los apellidos son requeridos' : 'The last name is required';
    if (!formData.email.trim()) newErrors.email = locale === 'es' ? 'El correo electrónico es requerido' : 'The email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = locale === 'es' ? 'Correo electrónico inválido' : 'Invalid email';
    if (!formData.telefono.trim()) newErrors.telefono = locale === 'es' ? 'El teléfono es requerido' : 'The phone is required';
    if (!formData.direccion1.trim()) newErrors.direccion1 = locale === 'es' ? 'La dirección es requerida' : 'The address is required';
    if (!formData.provincia.trim()) newErrors.provincia = locale === 'es' ? 'La provincia es requerida' : 'The province is required';
    if (!formData.canton.trim()) newErrors.canton = locale === 'es' ? 'El cantón es requerido' : 'The canton is required';
    if (!formData.distrito.trim()) newErrors.distrito = locale === 'es' ? 'El distrito es requerido' : 'The district is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveAddressToProfile = async (address: ShippingAddress) => {
    if (!session?.user?.id) return;
    const { error } = await supabase
      .from('user_profiles')
      .update({ shipping_address: address })
      .eq('id', session.user.id);
    if (error) {
      toast.error(t('updateError'));
    } else {
      toast.success(t('addressUpdated'));
    }
  };

  const handleAddressSelection = (useProfileAddress: boolean, updateProfile = false) => {
    if (useProfileAddress && userProfile?.shipping_address) {
      const address = userProfile.shipping_address as ShippingAddress;
      if (address && typeof address === 'object') {
        const nameParts = address.name?.split(' ') || [''];
        setFormData({
          nombre: nameParts[0] || '',
          apellidos: nameParts.slice(1).join(' ') || '',
          email: '',
          telefono: address.phone || '',
          direccion1: address.address || '',
          direccion2: '',
          provincia: address.state || '',
          canton: address.city || '',
          distrito: '',
          codigoPostal: address.postal_code || '',
        });
      }
    } else if (updateProfile) {
      const shippingAddress: ShippingAddress = {
        name: `${formData.nombre} ${formData.apellidos}`.trim(),
        address: formData.direccion1,
        city: formData.canton,
        state: formData.provincia,
        country: 'Costa Rica',
        postal_code: formData.codigoPostal,
        phone: formData.telefono,
      };
      saveAddressToProfile(shippingAddress);
    }
    setShowAddressOptions(false);
  };

  return {
    session,
    userProfile,
    showAddressOptions,
    justLoggedIn,
    formData,
    errors,
    discountInfo,
    handleChange,
    validateForm,
    handleAddressSelection,
    setShowAddressOptions,
    setFormData,
  };
}
