'use client';

import { useState, useEffect, useCallback } from 'react';
import { createBrowserSupabaseClient } from '@/shared/supabase/client';
import type { Database } from '@/shared/types/database';

type Product = Database['products'];
type Category = Database['categories'];

export type { Product, Category };

export interface AdminProductsState {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export function useAdminProducts() {
  const [state, setState] = useState<AdminProductsState>({
    products: [],
    categories: [],
    loading: true,
    error: null,
  });

  const fetchProducts = useCallback(async () => {
    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return data || [];
  }, []);

  const fetchCategories = useCallback(async () => {
    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name_es', { ascending: true });

    if (error) throw error;
    return data || [];
  }, []);

  const updateProduct = useCallback(async (
    supabase: ReturnType<typeof createBrowserSupabaseClient>,
    productId: number, 
    updates: Partial<Product>
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', productId);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Unknown error' 
      };
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);

        if (isMounted) {
          setState({
            products: productsData,
            categories: categoriesData,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (isMounted) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: err instanceof Error ? err.message : 'Error loading admin data',
          }));
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [fetchProducts, fetchCategories]);

  return { ...state, updateProduct };
}
