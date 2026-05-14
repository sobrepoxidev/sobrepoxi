'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function getHomePageData() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // Ignore
          }
        },
      },
    },
  )

  try {
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (categoriesError) {
      throw new Error(`Error al cargar categorías: ${categoriesError.message}`)
    }

    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .limit(30)

    if (productsError) {
      throw new Error(`Error al cargar productos: ${productsError.message}`)
    }

    const productsByCategory: Record<number, unknown[]> = {}

    categories.forEach((category) => {
      productsByCategory[category.id] = []
    })

    products.forEach((product) => {
      if (
        product.category_id &&
        productsByCategory[product.category_id] &&
        product.media &&
        product.media.length > 0 &&
        product.media[0]['url']
      ) {
        if (productsByCategory[product.category_id].length < 4) {
          productsByCategory[product.category_id].push(product)
        }
      }
    })

    return {
      categories,
      products,
      productsByCategory,
      error: null,
    }
  } catch (error) {
    console.error('Error al obtener datos para la página de inicio:', error)
    return {
      categories: [],
      products: [],
      productsByCategory: {},
      error: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}
