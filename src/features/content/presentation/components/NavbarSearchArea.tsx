'use client';

// The navbar's second row has to do different jobs depending on where the
// visitor is. Inside the catalogue it is the product search plus the category
// carousel. On service, guide and content pages the search only steals the most
// valuable strip of the fold, so it is replaced with the funnel: the one price
// reference the owner authorises (per m², 5 mm, VAT included) and the WhatsApp
// quote. Furniture pages never show the floor reference — those pieces are
// quoted per piece and publish no tariff.

import { ArrowRight } from 'lucide-react';
import { usePathname } from '@/shared/i18n/navigation';
import { buildWhatsAppUrl } from '@/shared/contact/whatsapp';
import { SearchBar, CategoryCarousel } from '@/features/products';

type Category = { id: number; name_es: string; name_en: string };

/** Browsing the catalogue: search and categories belong here. */
const CATALOG_ROUTES = ['/products', '/product/', '/search'];
/** Already inside a flow: neither search nor a quote banner should interrupt. */
const FLOW_ROUTES = [
  '/cart',
  '/checkout',
  '/login',
  '/register',
  '/account',
  '/order-confirmation',
  '/viewed-history',
  '/admin',
  '/privacy-policies',
  '/conditions-service',
];
/** Routes where the authorised floor price applies (never furniture). */
const FLOOR_ROUTES = ['/epoxy-floors', '/resina-epoxica-para-pisos', '/industrial-epoxy-flooring', '/pisos-epoxicos-'];

const matchesAny = (pathname: string, routes: string[]) =>
  routes.some((route) => pathname === route || pathname.startsWith(route));

export default function NavbarSearchArea({
  locale,
  variant,
  categories = [],
}: {
  locale: string;
  variant: 'mobile' | 'desktop';
  categories?: Category[];
}) {
  const pathname = usePathname();
  const isCatalog = pathname === '/' || matchesAny(pathname, CATALOG_ROUTES);

  if (isCatalog) {
    return variant === 'mobile' ? (
      <>
        <SearchBar
          variant="mobile"
          initialCategory={locale === 'es' ? 'Todo' : 'All'}
          locale={locale}
          className="w-full px-2"
        />
        <CategoryCarousel locale={locale} className="mt-1" categories={categories} />
      </>
    ) : (
      <>
        <div className="flex w-full items-center justify-center pt-3 px-4">
          <div className="flex w-full max-w-6xl items-center">
            <div
              className="relative w-full flex items-center rounded-md border border-gray-300 bg-white overflow-visible"
              style={{ zIndex: 40, position: 'relative' }}
            >
              <SearchBar
                variant="navbar"
                initialCategory={locale === 'es' ? 'Todo' : 'All'}
                locale={locale}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center h-8">
          <CategoryCarousel locale={locale} categories={categories} className="mt-1 max-w-6xl" />
        </div>
      </>
    );
  }

  if (matchesAny(pathname, FLOW_ROUTES)) return null;

  const showFloorPrice = matchesAny(pathname, FLOOR_ROUTES);
  const refTag = `barra.${pathname.replace(/^\//, '').replace(/\//g, '-') || 'inicio'}`;

  return (
    <div className="w-full px-3 pb-1.5 pt-1 sm:px-4">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
        <p className="min-w-0 flex-1 truncate text-[11px] leading-tight text-white/60 sm:text-sm">
          {showFloorPrice ? (
            <>
              <span className="font-semibold text-white">₡75.000 – ₡96.100</span>{' '}
              {locale === 'es' ? 'por m² instalado' : 'per m² installed'}
              <span className="hidden sm:inline">
                {locale === 'es' ? ' · sistema estándar de 5 mm · IVA incluido' : ' · 5 mm standard system · VAT included'}
              </span>
            </>
          ) : (
            <>
              {locale === 'es' ? 'Pisos epóxicos y piezas a la medida' : 'Epoxy floors and made-to-measure pieces'}
              <span className="hidden sm:inline">
                {locale === 'es' ? ' · Instalamos en todo Costa Rica' : ' · We install across Costa Rica'}
              </span>
            </>
          )}
        </p>
        <a
          href={buildWhatsAppUrl(
            locale === 'es'
              ? 'Hola SobrePoxi, quiero cotizar'
              : 'Hello SobrePoxi, I would like a quote',
            refTag
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold-gradient inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-black transition-opacity hover:opacity-90 sm:min-h-9"
        >
          {locale === 'es' ? 'Cotizar' : 'Get a quote'}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
