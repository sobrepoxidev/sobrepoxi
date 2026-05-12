'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { createBrowserSupabaseClient } from '@/shared/supabase/client';
import type { ShippingAddress, DiscountInfo, PaymentMethod, Banco } from '../../application/distribute';

interface CheckoutState {
  currentStep: number;
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethod | null;
  bancoSeleccionado: Banco | null;
  ultimos4: string;
  discountInfo: DiscountInfo | null;
  createdOrderId: number | null;
}

interface CheckoutContextValue extends CheckoutState {
  session: Session | null;
  userId: string;
  setCurrentStep: (step: number) => void;
  setShippingAddress: (address: ShippingAddress | null) => void;
  setPaymentMethod: (method: PaymentMethod | null) => void;
  setBancoSeleccionado: (banco: Banco | null) => void;
  setUltimos4: (value: string) => void;
  setDiscountInfo: (info: DiscountInfo | null) => void;
  setCreatedOrderId: (id: number | null) => void;
  goNext: () => void;
  goBack: () => void;
}

const CheckoutContext = createContext<CheckoutContextValue | undefined>(undefined);

interface CheckoutProviderProps {
  children: React.ReactNode;
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [supabase] = useState<SupabaseClient>(() => createBrowserSupabaseClient());
  const [session, setSession] = useState<Session | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [bancoSeleccionado, setBancoSeleccionado] = useState<Banco | null>(null);
  const [ultimos4, setUltimos4] = useState('');
  const [discountInfo, setDiscountInfo] = useState<DiscountInfo | null>(null);
  const [createdOrderId, setCreatedOrderId] = useState<number | null>(null);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      setSession(session);
    });

    if (typeof window !== 'undefined') {
      const discountInfoStr = localStorage.getItem('discountInfo');
      if (discountInfoStr) {
        try {
          setDiscountInfo(JSON.parse(discountInfoStr));
        } catch (e) {
          console.error('Error parsing discount info:', e);
        }
      }
    }

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  const goNext = () => setCurrentStep((s) => s + 1);
  const goBack = () => setCurrentStep((s) => s - 1);

  return (
    <CheckoutContext.Provider
      value={{
        session,
        userId: session?.user?.id || 'guest-user',
        currentStep,
        shippingAddress,
        paymentMethod,
        bancoSeleccionado,
        ultimos4,
        discountInfo,
        createdOrderId,
        setCurrentStep,
        setShippingAddress,
        setPaymentMethod,
        setBancoSeleccionado,
        setUltimos4,
        setDiscountInfo,
        setCreatedOrderId,
        goNext,
        goBack,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckoutContext(): CheckoutContextValue {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckoutContext must be used within a CheckoutProvider');
  }
  return context;
}
