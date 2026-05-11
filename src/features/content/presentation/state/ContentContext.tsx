'use client';

import React, { createContext, useContext } from 'react';

interface ContentContextValue {
  locale: string;
}

const ContentContext = createContext<ContentContextValue | undefined>(undefined);

interface ContentProviderProps {
  children: React.ReactNode;
  locale: string;
}

export function ContentProvider({ children, locale }: ContentProviderProps) {
  return (
    <ContentContext.Provider value={{ locale }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContentContext(): ContentContextValue {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContentContext must be used within a ContentProvider');
  }
  return context;
}