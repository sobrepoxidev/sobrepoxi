'use client';

import { createBrowserSupabaseClient } from '@/shared/supabase/client';

export interface ViewedProduct {
  id: number;
  name_es: string;
  name_en: string;
  colon_price: number | null;
  dolar_price: number | null;
  category: string | null;
  imageUrl: string;
  viewedAt: Date;
}

const LOCAL_STORAGE_KEY = 'hands-made-art:viewed-history';

export function getLocalViewedHistory(): ViewedProduct[] {
  if (typeof window === 'undefined') return [];
  try {
    const historyString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!historyString) return [];
    return JSON.parse(historyString);
  } catch {
    return [];
  }
}

export async function addProductToHistory(product: {
  id: number;
  name_es: string;
  name_en: string;
  colon_price: number | null;
  dolar_price: number | null;
  category: string | null;
  media?: Array<{ url: string; type: string }> | null;
}): Promise<void> {
  if (typeof window === 'undefined' || !product) return;
  try {
    const history = getLocalViewedHistory();
    const existingIndex = history.findIndex(item => item.id === product.id);
    const currentTime = new Date();
    const newEntry: ViewedProduct = {
      id: product.id,
      name_es: product.name_es,
      name_en: product.name_en,
      colon_price: product.colon_price,
      dolar_price: product.dolar_price,
      category: product.category,
      imageUrl: product.media?.[0]?.url || '/product-placeholder.png',
      viewedAt: currentTime,
    };
    if (existingIndex !== -1) {
      history.splice(existingIndex, 1);
    }
    history.unshift(newEntry);
    const limitedHistory = history.slice(0, 20);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(limitedHistory));

    const supabase = createBrowserSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await supabase.from('view_history').upsert({
        user_id: session.user.id,
        product_id: product.id,
        viewed_at: currentTime.toISOString(),
      }, { onConflict: 'user_id,product_id', ignoreDuplicates: false });
    }
  } catch (error) {
    console.error('[addProductToHistory]', error);
  }
}

export async function syncViewedHistoryWithServer(): Promise<boolean> {
  try {
    const supabase = createBrowserSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return false;
    const userId = session.user.id;
    const localHistory = getLocalViewedHistory();
    if (localHistory.length === 0) return true;
    const historyToSync = localHistory.map(item => ({
      user_id: userId,
      product_id: item.id,
      viewed_at: new Date(item.viewedAt).toISOString(),
    }));
    const { error } = await supabase
      .from('view_history')
      .upsert(historyToSync, { onConflict: 'user_id,product_id', ignoreDuplicates: false });
    if (error) {
      console.error('[syncViewedHistory]', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[syncViewedHistory]', err);
    return false;
  }
}

export function removeFromHistory(productId: number): void {
  if (typeof window === 'undefined') return;
  try {
    const history = getLocalViewedHistory();
    const filteredHistory = history.filter(item => item.id !== productId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredHistory));
  } catch (err) {
    console.error('[removeFromHistory]', err);
  }
}

export function clearViewedHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
  } catch (err) {
    console.error('[clearViewedHistory]', err);
  }
}