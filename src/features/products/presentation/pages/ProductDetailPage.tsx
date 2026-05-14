import type { Metadata } from 'next'
import { buildMetadata } from '@/shared/seo/seoConfig'
import { ProductDetail } from '@/features/products'

type tParams = Promise<{ id: string; locale: string }>

export async function generateMetadata({
  params,
}: {
  params: tParams
}): Promise<Metadata> {
  const { locale, id } = await params
  const genericTitle = locale === 'es' ? 'Producto' : 'Product'

  return buildMetadata({
    locale: locale === 'es' ? 'es' : 'en',
    pathname: `/${locale}/product/${id}`,
    title: genericTitle,
  })
}

export default async function ProductPage({ params }: { params: tParams }) {
  const { id, locale } = await params

  return (
    <div className="bg-[#121212]">
      <ProductDetail name={id} locale={locale} />
    </div>
  )
}
