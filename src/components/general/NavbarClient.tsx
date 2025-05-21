// components/layout/Navbar/NavbarClient.tsx
"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Menu, X, User, ShoppingBag, ChevronDown, Globe, Package } from 'lucide-react';
import { Session } from '@supabase/supabase-js';
import { useSupabase } from '@/app/supabase-provider/provider';
import { useCart } from '@/context/CartContext';
import UserDropdown from '@/components/user/UserDropdown';
import SearchBar from '@/components/search/SearchBar';
import { getCategories } from '@/lib/categories';

type NavLink = {
  name: string;
  path: string;
};


export default function NavbarClient({ locale, session: initialSession }: { locale: string; session: Session | null }) {
  const t = useTranslations('navbar');
  const pathname = usePathname();
  const router = useRouter();
  const { supabase } = useSupabase();
  const { totalItems } = useCart();

  // Estados para la UI
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categoryList, setCategoryList] = useState<{ id: number, name: string }[]>([]);
  const [showStoreCategories, setShowStoreCategories] = useState(false);
  // Estado local para la sesión que escuchará cambios
  const [session, setSession] = useState<Session | null>(initialSession);



  // Cargar categorías de la base de datos
  useEffect(() => {
    const loadCategories = async () => {
      const categories = await getCategories();
      setCategoryList(categories);
    };

    loadCategories();
  }, []);



  // Suscripción a cambios en la sesión
  useEffect(() => {
    // Configurar suscripción a cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Actualizar la sesión inicial
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getInitialSession();

    // Limpiar la suscripción cuando el componente se desmonte
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Cerrar menú móvil al cambiar el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);


  // Definir los enlaces de navegación
  const navigationLinks: NavLink[] = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/about' },
    { name: t('impact'), path: '/impact' },
    { name: t('shipping'), path: '/shipping' },
    // Store se trata de manera especial ahora, con categorías desplegables
  ]

  // Logout function
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // Redirect to home or login page
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      {/* Desktop Navigation - Amazon Style */}
      <div className="hidden w-full flex-col lg:flex" style={{ position: 'static' }}>
        {/* Top Row: Search bar with filter dropdown */}
        <div className="flex w-full items-center justify-center pt-3">
          <div className="flex w-full max-w-4xl items-center">
            <div
              className="relative w-full flex items-center rounded-md border border-gray-300 bg-white overflow-visible"
              style={{
                zIndex: 9000,
                position: 'relative',
              }}
            >
              {/* Integrated SearchBar component with higher z-index to ensure dropdowns appear */}
              <SearchBar
                variant="navbar"
                initialCategory={locale === 'es' ? 'Todo' : 'All'}
                locale={locale}
              />
            </div>
          </div>
        </div>

        {/* Bottom Row: Navigation links */}
        <div className="flex w-full items-center justify-center ">
          <ul className="flex items-center gap-x-6">
            {navigationLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className="block py-1 text-sm text-gray-700 transition hover:text-teal-700"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/products"
                className="block py-1 text-sm text-gray-700 transition hover:text-teal-700"
              >
                {t('store')}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block py-1 text-sm text-gray-700 transition hover:text-teal-700"
              >
                {t('contact')}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Actions - Right Side */}
      <div className="flex items-center justify-end space-x-0.5 sm:space-x-1 ml-auto" style={{ minWidth: '100px', flexShrink: 0 }}>
        {/* User Dropdown - Desktop */}
        <div className="hidden md:flex items-center">
          <UserDropdown session={session} onLogout={handleLogout} />
        </div>

        {/* Language selector - Implementado con next-intl */}
        <button
          onClick={() => {
            // Cambiar al idioma opuesto manteniendo la ruta actual
            const targetLocale = locale === 'es' ? 'en' : 'es';
            router.replace(pathname, { locale: targetLocale });
          }}
          className="flex h-10 items-center space-x-1 rounded-md px-2 text-sm text-gray-700 transition hover:bg-gray-100"
          aria-label={t('changeLanguage')}
        >
          <Globe className="h-4 w-4" />
          <span>{locale === 'es' ? 'ES' : 'EN'}</span>
        </button>

        {/* Cart */}
        <Link
          href="/cart"
          className="relative flex h-10 items-center space-x-0.5 rounded-md px-0.5 text-sm text-gray-700 transition hover:bg-gray-100"
          aria-label={t('cart')}
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="hidden md:inline">{t('cart')}</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-xs font-medium text-white">
            {totalItems}
          </span>
        </Link>
        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center text-gray-700 transition hover:bg-gray-100 focus-visible:outline-none lg:hidden"
          style={{ width: '40px', height: '40px', flexShrink: 0 }}
          aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
          aria-expanded={isMenuOpen}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20px', height: '20px' }}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </div>
        </button>

      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-full z-50 max-h-[calc(100vh-57px)] overflow-y-auto bg-white shadow-lg lg:hidden w-full">

          <nav className="px-4 py-3">
            {/* Mobile Search - Amazon Style */}


            {/* Cart Link - Movido arriba */}
            <div className="mb-3">
              <Link
                href="/cart"
                className="flex items-center space-x-2 text-sm font-medium bg-gray-50 p-3 rounded-md text-gray-900 w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>{t('viewCart')} ({totalItems})</span>
              </Link>
            </div>

            {/* Mobile Auth Links */}
            <div className="mb-3">
              <div className="flex items-center justify-between">
                {session ? (
                  <>
                    <Link
                      href="/account"
                      className="flex items-center space-x-1 text-sm font-medium text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>{t('myAccount')}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-sm text-gray-700"
                    >
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-sm text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('login')}
                    </Link>
                    <Link
                      href="/register"
                      className="text-sm text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('register')}
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="my-3 h-px bg-gray-100"></div>

            {/* Mobile Navigation Links - Amazon Style */}
            <div>
              <p className="mb-2 font-semibold text-sm text-gray-800">{t('browseBy')}</p>
              <ul className="space-y-2">
                {navigationLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="block text-sm text-gray-700 hover:text-teal-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/contact"
                    className="block text-sm text-gray-700 hover:text-teal-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('contact')}
                  </Link>
                </li>
                {/* Store con categorías desplegables */}
                <li className="mb-2">
                  <div className="mb-1">
                    <button
                      className="flex items-center justify-between w-full py-2 px-3 bg-teal-50 text-teal-700 rounded-md font-medium text-sm hover:bg-teal-100 transition-colors"
                      onClick={() => setShowStoreCategories(!showStoreCategories)}
                      aria-expanded={showStoreCategories}
                    >
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-2" />
                        <span>{t('store')}</span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${showStoreCategories ? 'transform rotate-180' : ''}`}
                      />
                    </button>
                  </div>


                  {/* Lista de categorías */}
                  {showStoreCategories && (
                    <ul className="ml-4 space-y-1 border-l-2 border-gray-100 pl-3">
                      <li>
                        <Link
                          href="/products"
                          className="block text-sm text-gray-700 hover:text-teal-700 py-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Todos los productos
                        </Link>
                      </li>
                      {categoryList.map((category) => (
                        <li key={category.id}>
                          <Link
                            href={`/products?category=${category.id}`}
                            className="block text-sm text-gray-700 hover:text-teal-700 py-1"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>



                {/* Enlace a carrito eliminado - ya movido arriba */}
              </ul>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}