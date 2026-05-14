'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { ArrowRight, ChevronRight, MessageCircle, PackageSearch } from 'lucide-react';
import { Link } from '@/shared/i18n/navigation';
import { formatUSD } from '@/shared/utils/formatCurrency';
import { useProductsContext } from '../../state/ProductsContext';
import Card from './Card';
import CarrucelSectionA from './CarrucelSectionA';

interface GridSectionProps {
  mobileActive?: boolean;
  sectionId?: string;
}

const placeholderEs = 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/placeholder_es-knQ3ZPLukUBoZ1S4t6C9Ad4sJrI4tb.webp';
const placeholderEn = 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/image_en-ovvACAz2v6p2aXrceAdO2AH7a89puh.webp';

function productImage(product: { media?: unknown }, locale: string) {
  const media = Array.isArray(product.media) ? product.media : [];
  const first = media[0] as { url?: unknown } | undefined;
  return typeof first?.url === 'string' ? first.url : locale === 'es' ? placeholderEs : placeholderEn;
}

function categoryName(category: { name?: string | null; name_es?: string | null; name_en?: string | null }, locale: string) {
  return (locale === 'es' ? category.name_es : category.name_en) || category.name || '';
}

function categoryHref(category: { id: number; name?: string | null }) {
  return `/products?category=${category.name || category.id}`;
}

const OptimizedGridSection: React.FC<GridSectionProps> = ({ mobileActive = true }) => {
  const locale = useLocale();
  const { categories, sectionProducts, loading, error } = useProductsContext();
  const visibleCategories = useMemo(() => categories.slice(0, 6), [categories]);

  const desktopCards = useMemo(() => {
    return visibleCategories.map((category) => {
      const products = sectionProducts.gridByCategory[category.id] || [];
      const displayProducts = products.slice(0, 4);
      const name = categoryName(category, locale);
      const href = categoryHref(category);

      return {
        title: name,
        link: href,
        meta: products.length > 0
          ? locale === 'es' ? `${products.length} piezas visibles` : `${products.length} visible pieces`
          : locale === 'es' ? 'Cotización a medida' : 'Custom quote',
        content: (
          <div className="flex h-full flex-col">
            {displayProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {displayProducts.map((product, idx) => {
                  const displayName = (locale === 'es' ? product.name_es : product.name_en) || product.name || 'Producto';
                  return (
                    <Link key={`${product.id}-${idx}`} href={`/product/${product.name}`} className="group/product min-w-0 rounded-2xl bg-stone-950/45 p-2 transition-[transform,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-stone-950/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200">
                      <span className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-stone-900">
                        <Image src={productImage(product, locale)} alt={displayName} fill sizes="(max-width: 768px) 45vw, 15vw" className="object-contain p-2 transition-transform duration-500 ease-out group-hover/product:scale-[1.04]" unoptimized />
                      </span>
                      <span className="mt-2 block truncate text-xs font-semibold text-stone-100">{displayName}</span>
                      <span className="mt-1 block text-[11px] font-bold text-amber-200 tabular-nums">
                        {product.dolar_price && product.dolar_price > 0 ? formatUSD(product.dolar_price) : locale === 'es' ? 'Cotizar por WhatsApp' : 'Quote on WhatsApp'}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="flex min-h-56 flex-1 flex-col justify-between rounded-2xl border border-dashed border-amber-200/25 bg-stone-950/35 p-5 text-stone-200">
                <PackageSearch className="h-8 w-8 text-amber-200" aria-hidden="true" />
                <div>
                  <p className="text-lg font-semibold tracking-tight">{locale === 'es' ? 'Línea disponible por proyecto' : 'Line available by project'}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-400">
                    {locale === 'es'
                      ? 'No mostramos inventario fijo aquí todavía. Podemos cotizar medidas, acabado y uso real.'
                      : 'No fixed inventory is shown here yet. We can quote dimensions, finish, and real use.'}
                  </p>
                </div>
              </div>
            )}

            <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-amber-200 transition-colors duration-300 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200">
              {locale === 'es' ? `Ver ${name}` : `View ${name}`}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        ),
      };
    });
  }, [locale, sectionProducts, visibleCategories]);

  if (loading) {
    return (
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-80 animate-pulse rounded-[1.75rem] bg-stone-50/8" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 text-center text-stone-200 sm:px-6 lg:px-8">
        <div className="rounded-[1.75rem] border border-red-300/25 bg-red-950/25 p-6">
          <p className="font-semibold">{locale === 'es' ? 'No pudimos cargar las categorías.' : 'We could not load categories.'}</p>
          <p className="mt-2 text-sm text-stone-400">{error}</p>
        </div>
      </div>
    );
  }

  if (visibleCategories.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-amber-200/20 bg-stone-50/[0.055] p-8 text-stone-100 shadow-[0_24px_60px_oklch(4%_0.01_40_/_0.25)]">
          <PackageSearch className="h-9 w-9 text-amber-200" aria-hidden="true" />
          <h3 className="font-display mt-6 text-3xl font-semibold tracking-[-0.04em]">
            {locale === 'es' ? 'Estamos preparando el catálogo público.' : 'We are preparing the public catalog.'}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-400">
            {locale === 'es'
              ? 'Mientras tanto, podemos cotizar pisos, muebles y acabados directamente por WhatsApp.'
              : 'Meanwhile, we can quote floors, furniture, and finishes directly on WhatsApp.'}
          </p>
          <Link href="https://wa.me/+50685850000?text=Hola%20SobrePoxi%2C%20quiero%20cotizar%20un%20proyecto" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-200 px-5 py-3 text-sm font-bold text-stone-950 transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {locale === 'es' ? 'Cotizar por WhatsApp' : 'Quote on WhatsApp'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mx-auto hidden max-w-7xl grid-cols-2 gap-5 px-4 pb-4 sm:px-6 md:grid-cols-3 lg:grid lg:px-8">
        {desktopCards.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>

      {mobileActive && (
        <div className="lg:hidden">
          <CarrucelSectionA
            items={visibleCategories.slice(0, 3).map((category) => {
              const products = sectionProducts.gridByCategory[category.id] || [];
              const name = categoryName(category, locale);
              return {
                textColor: 'text-stone-950',
                title: name,
                content: (
                  <div className="grid h-full w-full grid-cols-2 gap-2 px-1 pt-4">
                    {products.slice(0, 4).map((product, idx) => (
                      <Link key={`${product.id}-${idx}`} href={`/product/${product.name}`} className="block rounded-xl bg-stone-950/70 p-2 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200">
                        <div className="relative h-32 overflow-hidden rounded-lg bg-stone-900">
                          <Image src={productImage(product, locale)} alt={product.name || ''} fill sizes="45vw" className="object-contain p-2" unoptimized />
                        </div>
                      </Link>
                    ))}
                    {products.length === 0 && (
                      <div className="col-span-2 flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-stone-950/20 bg-stone-50/55 p-4 text-center">
                        <PackageSearch className="h-7 w-7 text-stone-800" aria-hidden="true" />
                        <p className="mt-3 text-sm font-semibold text-stone-900">{locale === 'es' ? 'Cotización a medida' : 'Custom quote'}</p>
                      </div>
                    )}
                  </div>
                ),
                link: categoryHref(category),
                className: 'rounded-[1.5rem] bg-[oklch(78%_0.12_78)] px-3 pb-3 pt-2 shadow-[0_18px_44px_oklch(4%_0.01_40_/_0.28)]',
              };
            })}
          />

          <MobileRemainingCategories categories={visibleCategories} sectionProducts={sectionProducts} locale={locale} />
        </div>
      )}
    </div>
  );
};

function MobileRemainingCategories({
  categories,
  sectionProducts,
  locale,
}: {
  categories: ReturnType<typeof useProductsContext>['categories'];
  sectionProducts: ReturnType<typeof useProductsContext>['sectionProducts'];
  locale: string;
}) {
  const remaining = categories.slice(3);
  if (remaining.length === 0) return null;

  return (
    <div className="px-4 pt-5 pb-2">
      <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500">{locale === 'es' ? 'Más líneas SobrePoxi' : 'More SobrePoxi lines'}</h3>
      <div className="mt-3 grid grid-cols-1 gap-3">
        {remaining.map((category) => {
          const products = sectionProducts.gridByCategory[category.id] || [];
          const previews = products.slice(0, 3);
          const name = categoryName(category, locale);
          const hasProducts = products.length > 0;

          return (
            <Link key={category.id} href={categoryHref(category)} className="flex items-center gap-3 rounded-2xl border border-stone-50/10 bg-stone-50/[0.055] p-3 text-stone-100 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-amber-200/35 hover:bg-stone-50/[0.075] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200">
              <div className="flex shrink-0 -space-x-2">
                {previews.length > 0 ? previews.map((product, idx) => (
                  <span key={`${product.id}-${idx}`} className="relative h-12 w-12 overflow-hidden rounded-xl border-2 border-[oklch(12%_0.017_58)] bg-stone-900">
                    <Image src={productImage(product, locale)} alt={product.name || ''} fill sizes="48px" className="object-contain p-1" unoptimized />
                  </span>
                )) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-dashed border-amber-200/25 bg-stone-950/55 text-amber-200">
                    <PackageSearch className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{name}</p>
                <p className="text-xs text-stone-500">
                  {hasProducts
                    ? locale === 'es' ? `${products.length} piezas visibles` : `${products.length} visible pieces`
                    : locale === 'es' ? 'Proyecto a medida' : 'Custom project'}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-amber-200" aria-hidden="true" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default OptimizedGridSection;
