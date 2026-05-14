'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { createBrowserSupabaseClient } from '@/shared/supabase/client'
import ProductCard from './ProductCard'
import type { Database } from '@/shared/types/database'

type Product = Database['products']

interface RelatedProductsProps {
  currentProductId: number
  categoryId: number | null
  maxProducts?: number
}

export default function RelatedProducts({ currentProductId, categoryId, maxProducts = 4 }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const locale = useLocale()

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!categoryId) {
        setLoading(false)
        return
      }

      const supabase = createBrowserSupabaseClient()
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryId)
        .eq('is_active', true)
        .neq('id', currentProductId)
        .limit(maxProducts)

      if (error) {
        console.error('[RelatedProducts] fetch error:', error)
        setLoading(false)
        return
      }

      setProducts(data || [])
      setLoading(false)
    }

    fetchRelatedProducts()
  }, [categoryId, currentProductId, maxProducts])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {locale === 'es' ? 'Productos relacionados' : 'Related products'}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}