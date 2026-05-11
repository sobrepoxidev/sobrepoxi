'use client';

import React from 'react';
import { ContentProvider as ContentContextProvider } from '@/features/content';

interface ContentProviderProps {
  children: React.ReactNode;
  locale: string;
}

export function ContentProvider({ children, locale }: ContentProviderProps) {
  return (
    <ContentContextProvider locale={locale}>
      {children}
    </ContentContextProvider>
  );
}