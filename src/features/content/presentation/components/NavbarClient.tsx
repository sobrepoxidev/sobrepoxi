'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { ChevronDown, LogOut, Menu, Phone, Search, ShoppingCart, User, X } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/shared/i18n/navigation';
import { useSupabase } from '@/app/supabase-provider/provider';
import { useCart } from '@/features/cart';
import { CategoryCarousel, SearchBar, getCategoriesFromDB } from '@/features/products';
import LocaleSwitcher from './LocaleSwitcher';

interface NavbarClientProps {
  locale: string;
}

type Category = { id: number; name_es: string; name_en: string };

const navItems = (locale: string) => [
  { name: locale === 'es' ? 'Inicio' : 'Home', path: '/' },
  { name: locale === 'es' ? 'Pisos Epóxicos' : 'Epoxy Floors', path: '/epoxy-floors' },
  { name: locale === 'es' ? 'Pisos Industriales' : 'Industrial Floors', path: '/industrial-epoxy-flooring' },
  { name: locale === 'es' ? 'Muebles de Lujo' : 'Luxury Furniture', path: '/luxury-furniture' },
  { name: locale === 'es' ? 'Guías' : 'Guides', path: '/guias' },
  { name: locale === 'es' ? 'Tienda' : 'Shop', path: '/products' },
  { name: locale === 'es' ? 'Contacto' : 'Contact', path: '/contact' },
];

export default function NavbarClient({ locale }: NavbarClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { supabase } = useSupabase();
  const { totalItems } = useCart();
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    getCategoriesFromDB()
      .then((categories) => {
        if (mounted) setCategoryList(categories as Category[]);
      })
      .catch(() => {
        if (mounted) setCategoryList([]);
      });

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setSessionEmail(data.session?.user.email ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionEmail(session?.user.email ?? null);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    setAccountOpen(false);
    router.refresh();
  }, [router, supabase]);

  const handleAccountClick = useCallback(() => {
    if (sessionEmail) {
      router.push('/account');
      return;
    }

    router.push(`/login?returnUrl=${encodeURIComponent(pathname || '/')}`);
  }, [pathname, router, sessionEmail]);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-50/10 bg-[oklch(12%_0.017_58_/_0.94)] text-stone-50 shadow-[0_18px_50px_oklch(4%_0.01_40_/_0.28)] backdrop-blur-xl">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-amber-200 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-stone-950">
        {locale === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[76px] items-center gap-4">
          <Link href="/" aria-label="SobrePoxi" className="flex shrink-0 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200">
            <Image
              src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/logo_sobrepoxi-PyTtAVxwqtJhTlGNrYoSmlxWg3d0ER.webp"
              alt="SobrePoxi"
              width={150}
              height={42}
              className="h-10 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          <nav aria-label={locale === 'es' ? 'Navegación principal' : 'Main navigation'} className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {navItems(locale).map((item) => (
              <Link key={item.path} href={item.path} className="rounded-full px-3 py-2 text-sm font-semibold text-stone-300 transition-colors duration-300 hover:bg-stone-50/8 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200">
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <Link href="https://wa.me/+50685850000?text=Hola%20SobrePoxi%2C%20quiero%20cotizar%20un%20proyecto" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1.5 whitespace-nowrap rounded-full bg-amber-200 px-5 py-2 text-sm font-bold text-stone-950 shadow-[inset_0_-2px_0_oklch(55%_0.12_76_/_0.22)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-amber-100 hover:shadow-[inset_0_-2px_0_oklch(55%_0.12_76_/_0.14),0_14px_34px_oklch(70%_0.12_76_/_0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 active:scale-[0.98]">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {locale === 'es' ? 'Cotizar' : 'Quote'}
            </Link>
            <LocaleSwitcher />

            <div className="relative">
              <button type="button" onClick={() => setAccountOpen((open) => !open)} aria-expanded={accountOpen} aria-label={locale === 'es' ? 'Abrir menú de cuenta' : 'Open account menu'} className="inline-flex h-10 items-center gap-2 rounded-full border border-stone-50/10 bg-stone-50/6 px-3 text-sm font-semibold text-stone-200 transition-colors duration-300 hover:bg-stone-50/10 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200">
                <User className="h-4 w-4" aria-hidden="true" />
                <span>{sessionEmail ? (locale === 'es' ? 'Cuenta' : 'Account') : (locale === 'es' ? 'Entrar' : 'Sign in')}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${accountOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {accountOpen && (
                <div className="absolute right-0 mt-3 w-60 rounded-2xl border border-stone-50/10 bg-[oklch(15%_0.018_60)] p-2 shadow-[0_24px_70px_oklch(4%_0.01_40_/_0.45)]">
                  {sessionEmail ? (
                    <>
                      <button type="button" onClick={handleAccountClick} className="w-full rounded-xl px-3 py-2 text-left text-sm text-stone-200 transition-colors duration-300 hover:bg-stone-50/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200">
                        {sessionEmail}
                      </button>
                      <button type="button" onClick={handleLogout} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold text-amber-100 transition-colors duration-300 hover:bg-stone-50/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200">
                        <LogOut className="h-4 w-4" aria-hidden="true" />
                        {locale === 'es' ? 'Cerrar sesión' : 'Sign out'}
                      </button>
                    </>
                  ) : (
                    <button type="button" onClick={handleAccountClick} className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-amber-100 transition-colors duration-300 hover:bg-stone-50/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200">
                      {locale === 'es' ? 'Iniciar sesión' : 'Sign in'}
                    </button>
                  )}
                </div>
              )}
            </div>

            <Link href="/cart" aria-label={locale === 'es' ? `Carrito con ${totalItems} productos` : `Cart with ${totalItems} items`} className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-50/10 bg-stone-50/6 text-stone-200 transition-colors duration-300 hover:bg-stone-50/10 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200">
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              {totalItems > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-200 px-1 text-[11px] font-bold text-stone-950 tabular-nums">{totalItems}</span>}
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <LocaleSwitcher />
            <Link href="/cart" aria-label={locale === 'es' ? `Carrito con ${totalItems} productos` : `Cart with ${totalItems} items`} className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-50/10 bg-stone-50/6 text-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200">
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              {totalItems > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-200 px-1 text-[11px] font-bold text-stone-950 tabular-nums">{totalItems}</span>}
            </Link>
            <button type="button" onClick={() => setMobileOpen((open) => !open)} aria-expanded={mobileOpen} aria-label={locale === 'es' ? 'Abrir menú' : 'Open menu'} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-50/10 bg-stone-50/6 text-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200">
              {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div className="hidden border-t border-stone-50/10 py-3 lg:block">
          <div className="grid grid-cols-[minmax(340px,520px)_1fr] items-center gap-5">
            <SearchBar variant="navbar" locale={locale} initialCategory={locale === 'es' ? 'Todo' : 'All'} />
            <CategoryCarousel locale={locale} categories={categoryList} className="max-w-full" />
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-stone-50/10 bg-[oklch(13%_0.017_58)] px-4 pb-5 pt-4 shadow-[0_24px_60px_oklch(4%_0.01_40_/_0.42)] lg:hidden">
          <div className="mb-4 rounded-2xl border border-stone-50/10 bg-stone-50/[0.045] p-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
              {locale === 'es' ? 'Buscar productos' : 'Search products'}
            </div>
            <SearchBar variant="mobile" locale={locale} initialCategory={locale === 'es' ? 'Todo' : 'All'} />
          </div>

          <nav aria-label={locale === 'es' ? 'Navegación móvil' : 'Mobile navigation'} className="grid gap-2">
            {navItems(locale).map((item) => (
              <Link key={item.path} href={item.path} onClick={() => setMobileOpen(false)} className="rounded-2xl border border-stone-50/10 bg-stone-50/[0.045] px-4 py-3 text-sm font-semibold text-stone-200 transition-colors duration-300 hover:bg-stone-50/8 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200">
                {item.name}
              </Link>
            ))}
          </nav>

          {categoryList.length > 0 && (
            <div className="mt-4 rounded-2xl border border-stone-50/10 bg-stone-50/[0.045] p-3">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
                {locale === 'es' ? 'Categorías' : 'Categories'}
              </p>
              <CategoryCarousel locale={locale} categories={categoryList} />
            </div>
          )}
        </div>
      )}
    </header>
  );
}
