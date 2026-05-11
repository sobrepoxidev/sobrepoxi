'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import type { UserProfile } from '../../application/distribute';

interface AccountContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function AccountProvider({ 
  children, 
  user, 
  profile, 
  loading, 
  error 
}: { 
  children: ReactNode;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}) {
  return (
    <AccountContext.Provider value={{ user, profile, loading, error }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountContext() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccountContext must be used within AccountProvider');
  }
  return context;
}