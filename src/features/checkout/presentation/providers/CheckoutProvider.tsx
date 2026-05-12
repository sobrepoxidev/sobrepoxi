'use client';

import React from 'react';
import { CheckoutProvider as CheckoutContextProvider } from '../state/CheckoutContext';

interface CheckoutProviderProps {
  children: React.ReactNode;
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  return <CheckoutContextProvider>{children}</CheckoutContextProvider>;
}
