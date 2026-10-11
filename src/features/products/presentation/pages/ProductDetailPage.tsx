import type { Metadata } from 'next'
import { buildMetadata, SEO_CONFIG } from '@/shared/seo/seoConfig'
import { JsonLd } from '@/shared/seo/JsonLd'
import { ProductDetail } from '@/features/products'
import { getProductByName, getProductRating } from '../../application/product-by-name'

type tParams = Promise<{ id: string; locale: string }>

// The `id` route param is the product name used as slug. Depending on the
// i18n routing it can arrive still URL-encoded, so decode defensively before
// using it as the DB lookup key (names may contain spaces/accents).
function decodeProductName(raw: string): string {
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

function plainText(html: string | null | undefined, max = 158): string {
  const text = (html ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text
}

function isFloor(name: string | null | undefined): boolean {
  return /floor|piso/i.test(name ?? '')
}

export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { locale: rawLocale, id } = await params
  const locale = rawLocale === 'es' ? 'es' : 'en'
  const product = await getProductByName(decodeProductName(id))
  const pathname = `/${locale}/product/${id}`

  if (!product) {
    return buildMetadata({
      locale,
      pathname,
      title: locale === 'es' ? 'Producto no encontrado' : 'Product not found',
      robots: { index: false, follow: true },
    })
  }

  const displayName = (locale === 'es' ? product.name_es : product.name_en) ?? product.name ?? ''
  const floor = isFloor(product.name) || isFloor(displayName)
  const title =
    locale === 'es'
      ? `${displayName} · ${floor ? 'Piso epóxico en Costa Rica' : 'Resina epóxica Costa Rica'}`
      : `${displayName} · ${floor ? 'Epoxy floor in Costa Rica' : 'Epoxy resin Costa Rica'}`
  const fallbackDescription =
    locale === 'es'
      ? `${displayName}: ${floor ? 'piso epóxico' : 'pieza en resina epóxica'} instalado por SobrePoxi en Costa Rica. Muestras, visita técnica y cotización gratis por WhatsApp.`
      : `${displayName}: ${floor ? 'epoxy floor' : 'epoxy resin piece'} by SobrePoxi in Costa Rica. Samples, site visit and free quote on WhatsApp.`
  const description =
    plainText(locale === 'es' ? product.description_es ?? product.description : product.description_en ?? product.description) ||
    fallbackDescription
  const image = product.media?.find((m) => m.type === 'image')?.url

  return buildMetadata({
    locale,
    pathname,
    title,
    description,
    image: image ? { url: image, width: 1200, height: 1200, alt: displayName } : undefined,
  })
}

export default async function ProductPage({ params }: { params: tParams }) {
  const { id, locale } = await params
  const name = decodeProductName(id)
  const product = await getProductByName(name)
  const rating = product ? await getProductRating(product.id) : null

  const isEs = locale === 'es'
  const displayName = product ? ((isEs ? product.name_es : product.name_en) ?? product.name ?? '') : ''
  const url = `${SEO_CONFIG.siteUrl}/${locale}/product/${id}`
  const images = (product?.media ?? []).filter((m) => m.type === 'image').map((m) => m.url)
  const price = product?.dolar_price && product.dolar_price > 0 ? product.dolar_price : null

  return (
    <div className="bg-[#121212]">
      <ProductDetail name={name} locale={locale} initialProduct={product} />
      {product && (
        <>
          {/* Google rejects Product markup without offers or ratings, so it is
              only emitted when the product has a price or reviews. */}
          {(price || rating) && (
          <JsonLd
            id="ld-product"
            data={{
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: displayName,
              description: plainText(isEs ? product.description_es ?? product.description : product.description_en ?? product.description, 500) || undefined,
              image: images.length ? images : undefined,
              sku: product.sku ?? undefined,
              brand: { '@type': 'Brand', name: product.brand || 'SobrePoxi' },
              url,
              ...(price
                ? {
                    offers: {
                      '@type': 'Offer',
                      url,
                      priceCurrency: 'USD',
                      price: price.toFixed(2),
                      availability: 'https://schema.org/InStock',
                      seller: { '@type': 'Organization', name: 'SobrePoxi' },
                    },
                  }
                : {}),
              ...(rating
                ? {
                    aggregateRating: {
                      '@type': 'AggregateRating',
                      ratingValue: rating.average.toFixed(1),
                      reviewCount: rating.count,
                    },
                  }
                : {}),
            }}
          />
          )}
          <JsonLd
            id="ld-product-breadcrumb"
            data={{
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: isEs ? 'Inicio' : 'Home', item: `${SEO_CONFIG.siteUrl}/${locale}` },
                { '@type': 'ListItem', position: 2, name: isEs ? 'Productos' : 'Products', item: `${SEO_CONFIG.siteUrl}/${locale}/products` },
                { '@type': 'ListItem', position: 3, name: displayName, item: url },
              ],
            }}
          />
        </>
      )}
    </div>
  )
}
