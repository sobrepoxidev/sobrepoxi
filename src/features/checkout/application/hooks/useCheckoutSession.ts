'use client';

import { useState, useEffect } from 'react';
import { createBrowserSupabaseClient } from '@/shared/supabase/client';
import type { Session, SupabaseClient } from '@supabase/supabase-js';

export function useCheckoutSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [supabase] = useState<SupabaseClient>(() => createBrowserSupabaseClient());

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  return { session, userId: session?.user?.id || 'guest-user' };
}
