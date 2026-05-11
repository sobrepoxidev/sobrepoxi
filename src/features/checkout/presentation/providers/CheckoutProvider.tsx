'use client';

import React from 'react';
import { CheckoutProvider as CheckoutContextProvider } from '@/features/checkout';

interface CheckoutProviderProps {
  children: React.ReactNode;
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  return <CheckoutContextProvider>{children}</CheckoutContextProvider>;
}
