'use client';

import { useState, useEffect } from 'react';
import { createBrowserSupabaseClient } from '@/shared/supabase/client';
import { distributeProducts, type DistributeProductsResult } from '../distribute';
import type { Database } from '@/types-db';

type Product = Database['products'];
type Category = Database['categories'];

export type { Product, Category };

export interface ProductsData {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  productsByCategory: Record<number, Product[]>;
  sectionProducts: DistributeProductsResult;
}

export function useProducts(
  initialCategories: Category[] = [],
  initialProducts: Product[] = []
) {
  const initialProductsByCategory: Record<number, Product[]> = {};

  initialCategories.forEach(category => {
    initialProductsByCategory[category.id] = [];
  });

  initialProducts.forEach(product => {
    if (
      product.category_id &&
      initialProductsByCategory[product.category_id] &&
      product.media &&
      product.media.length > 0 &&
      product.media[0]["url"]
    ) {
      if (initialProductsByCategory[product.category_id].length < 4) {
        initialProductsByCategory[product.category_id].push(product);
      }
    }
  });

  const [data, setData] = useState<ProductsData>({
    products: initialProducts,
    categories: initialCategories,
    loading: initialCategories.length > 0 && initialProducts.length > 0 ? false : true,
    error: null,
    productsByCategory: initialProductsByCategory,
    sectionProducts: {
      gridByCategory: {},
      gifts: [],
      featured: [],
    },
  });

  useEffect(() => {
    const hasEnoughInitialData = () => {
      const firstCategoryIds = initialCategories.slice(0, 3).map(cat => cat.id);
      const secondCategoryIds = initialCategories.slice(6, 12).map(cat => cat.id);

      const productCountByCategory: Record<number, number> = {};

      [...firstCategoryIds, ...secondCategoryIds].forEach(id => {
        productCountByCategory[id] = 0;
      });

      initialProducts.forEach(product => {
        if (product.category_id && productCountByCategory[product.category_id] !== undefined) {
          productCountByCategory[product.category_id]++;
        }
      });

      const hasEnoughForFirstCategories = firstCategoryIds.every(id =>
        productCountByCategory[id] >= 3
      );

      const hasEnoughForSecondCategories = secondCategoryIds.length === 0 ||
        secondCategoryIds.some(id => productCountByCategory[id] >= 2);

      return hasEnoughForFirstCategories && hasEnoughForSecondCategories;
    };

    if (initialCategories.length > 0 && initialProducts.length > 0 && hasEnoughInitialData()) {
      console.log('Using initial data - no additional request needed');
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        const supabase = createBrowserSupabaseClient();

        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*');

        if (categoriesError) {
          throw new Error(`Error fetching categories: ${categoriesError.message}`);
        }

        const productsByCategory: Record<number, Product[]> = {};
        categoriesData.forEach(category => {
          productsByCategory[category.id] = [];
        });

        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .limit(49);

        if (productsError) {
          throw new Error(`Error fetching products: ${productsError.message}`);
        }

        const sectionProducts = distributeProducts(productsData, categoriesData);

        productsData.forEach(product => {
          if (
            product.category_id &&
            productsByCategory[product.category_id] &&
            product.media &&
            product.media.length > 0 &&
            product.media[0]["url"]
          ) {
            if (productsByCategory[product.category_id].length < 4) {
              productsByCategory[product.category_id].push(product);
            }
          }
        });

        if (isMounted) {
          setData({
            products: productsData,
            categories: categoriesData,
            loading: false,
            error: null,
            productsByCategory,
            sectionProducts,
          });
        }
      } catch (err) {
        if (isMounted) {
          setData(prev => ({
            ...prev,
            loading: false,
            error: err instanceof Error ? err.message : 'Error desconocido',
          }));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [initialCategories, initialProducts]);

  return data;
}