// components/layout/Navbar/NavbarClient.tsx
"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Menu, X, User, ShoppingCart, ChevronDown, Globe, Package } from 'lucide-react';
import { Session } from '@supabase/supabase-js';
import { useSupabase } from '@/app/supabase-provider/provider';
import { useCart } from '@/context/CartContext';
import UserDropdown from '@/components/user/UserDropdown';
import SearchBar from '@/components/search/SearchBar';
import { getCategories } from '@/lib/categories';
import CategoryCarousel from '@/components/search/CategoryCarousel';

type NavLink = {
  name: string;
  path: string;
};


export default function NavbarClient({ locale, session: initialSession }: { locale: string; session: Session | null }) {
  //const t = useTranslations('navbar');
  const pathname = usePathname();
  const router = useRouter();
  const { supabase } = useSupabase();
  const { totalItems } = useCart();

  // Estados para la UI
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categoryList, setCategoryList] = useState<{ id: number, name_es: string, name_en: string }[]>([]);
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
  }, [supabase, session]);

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
    { name: locale === 'es' ? 'Inicio' : 'Home', path: '/' },
    { name: locale === 'es' ? 'Acerca de' : 'About', path: '/about' },
    { name: locale === 'es' ? 'Pisos Epoxy' : 'Epoxy Floors', path: '/epoxy-floors' },
    { name: locale === 'es' ? 'Muebles de Lujo' : 'Luxury Furniture', path: '/luxury-furniture' },
    // Store se trata de manera especial ahora, con categorías desplegables
  ]

  // Logout function
  const handleLogout = async (currentUrl: string) => {
    try {
      await supabase.auth.signOut();
      // Redirect to home or login page
      window.location.href = currentUrl;
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      {/* Desktop Navigation - Amazon Style */}
      <div className="hidden w-full flex-col lg:flex" style={{ position: 'static' }}>
        {/* Primary Header Row */}
        <div className="flex w-full items-center justify-between px-4 py-0.5">
          {/* Left */}
          <div className="flex items-center gap-2">
            {/* Hamburger button visible on desktop too */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-8 w-8 items-center justify-center text-white hover:bg-gray-950 rounded focus-visible:outline-none"
              aria-label={isMenuOpen ? (locale === 'es' ? 'Cerrar menú' : 'Close menu') : (locale === 'es' ? 'Abrir menú' : 'Open menu')}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
            </button>
            <Link href="/" target='_self' className="flex items-center gap-2">
              <Image
                              src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/logo_sobrepoxi-bU2or8H7kNX2ViS8sklfTK4Nk7BENo.webp"
                              alt="Hand Made Art Logo"
                              width={130}
                              height={0}
                              className="w-[130px] h-[75px] object-fill ml-1.5"
                              priority
                              unoptimized
                            />
              <h1
                className="
                  flex items-center gap-0
                  text-md md:text-3xl font-extrabold tracking-wider
                  gold-gradient              
                  drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]
                  motion-safe:animate-shine 
                  sr-only"
              >
                SobrePoxi
              </h1>
            </Link>
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-4">
            <UserDropdown session={session} onLogout={handleLogout} />
            {/* Language selector */}
            <button
              onClick={() => {
                const targetLocale = locale === 'es' ? 'en' : 'es';
                router.replace(pathname, { locale: targetLocale });
              }}
              className="flex items-center space-x-1 text-sm text-white hover:bg-gray-950 p-1 rounded focus:outline-none"
            >
              <Globe className="h-4 w-4" />
              <span>{locale === 'es' ? 'ES' : 'EN'}</span>
            </button>
            {/* Cart */}
            <Link href="/cart" className="relative flex items-center text-white hover:bg-gray-950 p-1 rounded">
              <ShoppingCart className="h-5 w-5" />
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-gradient text-xs  text-black font-bold ml-0.5">
                {totalItems}
              </span>
            </Link>
          </div>
        </div>

        {/* Top Row: Search bar with filter dropdown */}
        <div className="flex w-full items-center justify-center pt-3 px-4">
          <div className="flex w-full max-w-6xl items-center">
            <div
              className="relative w-full flex items-center rounded-md border border-gray-300 bg-white overflow-visible"
              style={{
                zIndex: 40, // Lower z-index to stay below mobile menu
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

        {/* Category carousel - horizontally scrollable */}
        {/* reservar espacio mientras se carga */}
        <div className="w-full flex justify-center h-8"><CategoryCarousel locale={locale} categories={categoryList} className="mt-1 max-w-6xl" /></div>

        {/* Desktop action icons */}
        <div className="hidden">
          {/* Language selector */}
          <button
            onClick={() => {
              const targetLocale = locale === 'es' ? 'en' : 'es';
              router.replace(pathname, { locale: targetLocale });
            }}
            className="flex items-center space-x-1 text-sm text-white hover:bg-gray-950 p-1 rounded focus:outline-none"
          >
            <Globe className="h-4 w-4" />
            <span>{locale === 'es' ? 'ES' : 'EN'}</span>
          </button>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center space-x-0.5 text-sm text-white hover:bg-gray-950 p-1 rounded focus:outline-none"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">{locale === 'es' ? 'Carrito' : 'Cart'}</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-gradient-50 text-xs font-medium text-black">
              {totalItems}
            </span>
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-8 w-8 items-center justify-center text-white hover:bg-gray-950 rounded focus-visible:outline-none"
            aria-label={isMenuOpen ? (locale === 'es' ? 'Cerrar menú' : 'Close menu') : (locale === 'es' ? 'Abrir menú' : 'Open menu')}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
          </button>
        </div>

        {/* Bottom Row: Navigation links */}
        <div className="hidden">
          <ul className="flex items-center gap-x-6">
            {navigationLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className="block py-1 text-sm text-white transition hover:bg-gray-950 p-1 rounded"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/products"
                className="block py-1 text-sm text-white transition hover:bg-gray-950 p-1 rounded"
              >
                {locale === 'es' ? 'Tienda' : 'Store'}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block py-1 text-sm text-white transition hover:bg-gray-950 p-1 rounded"
              >
                {locale === 'es' ? 'Contacto' : 'Contact'}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Actions - Right Side */}
      <div className="flex items-center justify-end space-x-0.5 sm:space-x-1 ml-auto lg:hidden" style={{ minWidth: '100px', flexShrink: 0 }}>
        {/* User Dropdown - Desktop */}
        <div className="hidden md:flex items-center">
          <UserDropdown session={session} onLogout={handleLogout} />
        </div>

        {/* Language selector - Implementado con next-intl */}
        <button
          onClick={() => {
            // cargamos desde 0 toda la ruta cambiando el locale
            router.replace(pathname, { locale: locale === 'es' ? 'en' : 'es' });
            // forzamos un refresh de la pagina
            window.location.reload();
          }}
          className="flex h-10 items-center space-x-1 rounded-md px-2 text-sm text-white transition hover:bg-gray-950"
          aria-label={locale === 'es' ? 'Cambiar idioma' : 'Change language'}
        >
          <Globe className="h-4 w-4" />
          <span>{locale === 'es' ? 'ES' : 'EN'}</span>
        </button>

        {/* Cart */}
        <Link
          href="/cart"
          className="relative flex h-10 items-center space-x-0.5 rounded-md px-0.5 text-sm text-white transition hover:bg-gray-950"
          aria-label={locale === 'es' ? 'Carrito' : 'Cart'}
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="hidden md:inline">{locale === 'es' ? 'Carrito' : 'Cart'}</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-gradient text-xs font-medium text-black">
            {totalItems}
          </span>
        </Link>
        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center text-white transition hover:bg-gray-950 focus-visible:outline-none"
          style={{ width: '40px', height: '40px', flexShrink: 0 }}
          aria-label={isMenuOpen ? (locale === 'es' ? 'Cerrar menú' : 'Close menu') : (locale === 'es' ? 'Abrir menú' : 'Open menu')}
          aria-expanded={isMenuOpen}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20px', height: '20px' }}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </div>
        </button>

      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-full z-50 max-h-[calc(100vh-57px)] overflow-y-auto bg-[#303030] shadow-lg w-full lg:fixed lg:top-0 lg:left-0 lg:h-full lg:w-72 lg:max-h-none">

          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-0 right-0 p-1 text-white hover:bg-gray-950 rounded lg:block hidden z-50"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>

          <nav className="px-4 py-2 mt-5">
            {/* Mobile Search - Amazon Style */}


            {/* Cart Link - Movido arriba */}
            <div className="mb-2">
              <Link
                href="/cart"
                className="flex items-center space-x-2 text-sm font-medium bg-[#121212] p-3 rounded-md text-white w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>{locale === 'es' ? 'Ver carrito' : 'View cart'} ({totalItems})</span>
              </Link>
            </div>

            {/* Mobile Auth Links */}
            <div className="mb-3">
              <div className="flex items-center justify-between">
                {session ? (
                  <>
                    <Link
                      href="/account"
                      className="flex items-center space-x-1 text-sm font-medium text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>{locale === 'es' ? 'Mi cuenta' : 'My account'}</span>
                    </Link>
                    <button
                      onClick={async () => await handleLogout(window.location.href)}
                      className="text-sm text-white"
                    >
                      {locale === 'es' ? 'Cerrar sesión' : 'Logout'}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        const fullPath = window.location.pathname + window.location.search;
                        router.push(`/login?returnUrl=${fullPath}`);
                        setIsMenuOpen(false);
                      }}
                      className="text-sm text-white"
                    >
                      {locale === 'es' ? 'Iniciar sesión' : 'Login'}
                    </button>
                    <button
                      onClick={() => {
                        const fullPath = window.location.pathname + window.location.search;
                        router.push(`/register?returnUrl=${fullPath}`);
                        setIsMenuOpen(false);
                      }}
                      className="text-sm text-white"
                    >
                      {locale === 'es' ? 'Registrarse' : 'Register'}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="my-3 h-px bg-gray-100"></div>

            {/* Mobile Navigation Links - Amazon Style */}
            <div>
              <p className="mb-2 font-semibold text-sm text-white">{locale === 'es' ? 'Navegar por:' : 'Browse by:'}</p>
              <ul className="space-y-2">
                {navigationLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="block text-sm text-white hover:text-gray-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/contact"
                    className="block text-sm text-white hover:text-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {locale === 'es' ? 'Contacto' : 'Contact'}
                  </Link>
                </li>
                {/* Store con categorías desplegables */}
                <li className="mb-2">
                  <div className="mb-1">
                    <button
                      className="flex items-center justify-between w-full py-2 px-3 bg-gold-gradient rounded-md font-medium text-sm hover:bg-gold-gradient-90 transition-colors cursor-pointer"
                      onClick={() => setShowStoreCategories(!showStoreCategories)}
                      aria-expanded={showStoreCategories}
                    >
                      <div className="flex items-center text-black">
                        <Package className="h-4 w-4 mr-2" />
                        <span>{locale === 'es' ? 'Tienda' : 'Store'}</span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform text-black ${showStoreCategories ? 'transform rotate-180' : ''}`}
                      />
                    </button>
                  </div>


                  {/* Lista de categorías */}
                  {showStoreCategories && (
                    <ul className="ml-4 space-y-1 border-l-2 border-gray-100 pl-3">
                      <li>
                        <Link
                          href="/products"
                          className="block text-sm text-white hover:text-gray-200 py-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {locale === 'es' ? 'Todos los productos' : 'All products'}
                        </Link>
                      </li>
                      {categoryList.map((category) => (
                        <li key={category.id}>
                          <Link
                            href={`/products?category=${category.id}`}
                            className="block text-sm text-white hover:text-gray-200 py-1"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {locale === 'es' ? category.name_es : category.name_en}
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