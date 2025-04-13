// components/layout/Navbar/NavbarClient.tsx
"use client"

import { useState, useRef, useEffect } from 'react';

import Link from 'next/link';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronDown,
  Globe 
} from 'lucide-react';
import { Session } from '@supabase/supabase-js';
import { useSupabase } from '@/app/supabase-provider/provider';
import { useCart } from '@/context/CartContext';

type Category = {
  name: string;
  slug: string;
};

type NavLink = {
  name: string;
  path: string;
};

interface NavbarClientProps {
  navigationLinks: NavLink[];
  categories: Category[];
}

export default function NavbarClient({ navigationLinks, categories }: NavbarClientProps) {
  // Estado para los menús
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const { supabase } = useSupabase()
  const [session, setSession] = useState<Session | null>(null);


  //const [isScrolled, setIsScrolled] = useState(false);
  
  // Refs para cerrar menús al hacer clic fuera
  const searchRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const { cart } = useCart();
  const cardQuantity = cart.length;
  
  // Efecto para manejar el scroll y cambiar la apariencia del navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
  // Efecto para cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      
      if (categoryMenuRef.current && 
          event.target instanceof Node && 
          !categoryMenuRef.current.contains(event.target) && 
          !(event.target instanceof Element && event.target.classList.contains('category-trigger'))) {
        setIsCategoryMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
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
  
  // Manejar tecla Escape para cerrar menús
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsCategoryMenuOpen(false);
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);

  // Cargar la sesión inicial y escuchar cambios
  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
    }
    fetchSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

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
      {/* Desktop Navigation */}
      <nav className="hidden items-center md:flex">
        <ul className="flex items-center gap-x-1 lg:gap-x-2">
          {navigationLinks.map((link) => (
            <li key={link.path}>
              <Link 
                href={link.path} 
                className="block rounded-md px-3 py-0 text-gray-700 transition hover:bg-gray-50 hover:text-teal-700 focus-visible:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <div ref={categoryMenuRef}>
              <button 
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="category-trigger flex items-center rounded-md px-3 py-0 text-gray-700 transition hover:bg-gray-50 hover:text-teal-700 focus-visible:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                aria-expanded={isCategoryMenuOpen}
                aria-haspopup="true"
              >
                Tienda <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" style={{transform: isCategoryMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)'}} />
              </button>
              
              {isCategoryMenuOpen && (
                <div 
                  className="absolute left-0 right-0 top-full z-50 border-t border-gray-100 bg-white shadow-lg md:left-auto md:right-auto md:w-56 md:rounded-lg md:border md:border-gray-100"
                  role="menu"
                >
                  <div className="p-1 md:p-2">
                    <Link
                      href="/products"
                      className="block rounded-md px-3 py-2 font-medium text-gray-800 transition hover:bg-teal-50 hover:text-teal-700"
                      onClick={() => setIsCategoryMenuOpen(false)}
                      role="menuitem"
                    >
                      Todos los productos
                    </Link>
                    
                    <div className="my-1 h-px bg-gray-100"></div>
                    
                    <ul className="space-y-1">
                      {categories.map((category) => (
                        <li key={category.slug}>
                          <Link 
                            href={`/products/${category.slug}`} 
                            className="block rounded-md px-3 py-2 text-gray-700 transition hover:bg-teal-50 hover:text-teal-700"
                            onClick={() => setIsCategoryMenuOpen(false)}
                            role="menuitem"
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </li>
          <li >
              <Link 
                href="/contact" 
                className="block rounded-md px-3 py-0 text-gray-700 transition hover:bg-gray-50 hover:text-teal-700 focus-visible:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Contacto
              </Link>
            </li>
        </ul>
      </nav>

      {/* Actions */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* Search */}
        <div ref={searchRef}>
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            aria-label="Buscar"
            aria-expanded={isSearchOpen}
          >
            <Search className="h-5 w-5" />
          </button>
          
          {/* Search overlay/dropdown */}
          {isSearchOpen && (
            <div className="absolute left-0 right-0 top-full z-50 border-t border-gray-100 bg-white px-4 py-4 shadow-lg md:left-auto md:right-4 md:top-16 md:w-96 md:rounded-lg md:border md:border-gray-100">
              <div className="flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-200">
                <Search className="h-5 w-5 shrink-0 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar productos o artesanos..."
                  className="ml-2 w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                  autoFocus
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2 shrink-0 text-gray-400 hover:text-gray-600"
                  aria-label="Cerrar búsqueda"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Quick links - mejora UX */}
              <div className="mt-3">
                <p className="mb-1 text-xs font-medium text-gray-500">Búsquedas populares:</p>
                <div className="flex flex-wrap gap-1">
                  {['Decoración', 'Joyería', 'Madera'].map((term) => (
                    <button 
                      key={term}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 transition hover:bg-gray-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Cart */}
        <Link 
          href="/cart" 
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          aria-label="Carrito de compras"
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-xs font-medium text-white">
            {cardQuantity}
          </span>
        </Link>

        {/* Language selector */}
        <button 
          className="flex h-10 items-center space-x-1 rounded-full px-3 text-sm text-gray-700 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          aria-label="Cambiar idioma"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">ES</span>
        </button>

        {/* Auth buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-2">
          {session ? (
            <>
              <Link
                href="/account"
                className="px-3 py-2 text-sm text-gray-700 hover:text-teal-700 transition rounded-md hover:bg-gray-50"
              >
                Mi cuenta
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-sm text-white bg-teal-600 hover:bg-teal-700 transition rounded-md"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-2 text-sm text-gray-700 hover:text-teal-700 transition rounded-md hover:bg-gray-50"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="px-3 py-2 text-sm text-white bg-teal-600 hover:bg-teal-700 transition rounded-md"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile menu toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 md:hidden"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-full z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-gray-100 bg-white shadow-lg md:hidden">
          <nav className="px-4 py-1">
            <div className="mb-2 rounded-lg bg-gray-50 p-1">
              <div className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-2">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar productos o artesanos..."
                  className="ml-2 w-full border-0 bg-transparent text-gray-700 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
            
            <ul className="space-y-0">
              {
              navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path} 
                    className="block rounded-md px-3 py-1 text-base font-medium text-gray-700 transition hover:bg-gray-50 hover:text-teal-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>

              ))}
              <li>
              <Link 
                    href="/contact" 
                    className="block rounded-md px-3 py-1 text-base font-medium text-gray-700 transition hover:bg-gray-50 hover:text-teal-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contacto
                  </Link>
              </li>
              
              <li className="pt-1">
                <p className="px-3 py-1 text-base font-medium text-gray-700">
                  Tienda
                </p>
                <ul className="ml-2 space-y-0 border-l border-gray-100 pl-2">
                  <li>
                    <Link 
                      href="/products" 
                      className="block rounded-md px-3 py-2 text-base text-gray-700 transition hover:bg-gray-50 hover:text-teal-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Todos los productos
                    </Link>
                  </li>
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <Link 
                        href={`/products/${category.slug}`} 
                        className="block rounded-md px-3 py-2 text-base text-gray-700 transition hover:bg-gray-50 hover:text-teal-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            
            <div className="my-4 h-px bg-gray-100"></div>
            
            <div className="flex items-center justify-between">
              <button className="flex items-center space-x-2 rounded-md px-3 py-1 text-sm text-gray-700 transition hover:bg-gray-50">
                <Globe className="h-5 w-5" />
                <span>Español</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              <Link
                href="/cart"
                className="flex items-center space-x-2 rounded-md px-3 py-1 text-sm font-medium text-teal-700 transition hover:bg-teal-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Ver carrito ({cardQuantity})</span>
              </Link>
            </div>

            {/* Mobile Auth Links */}
            <li className="pt-4 border-t border-gray-100 mt-4">
              <div className="space-y-1">
                {session ? (
                  <>
                    <Link 
                      href="/account"
                      className="block rounded-md px-3 py-2.5 text-base font-medium text-gray-700 transition hover:bg-gray-50 hover:text-teal-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mi cuenta
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block rounded-md px-3 py-2.5 text-base font-medium text-white bg-teal-600 hover:bg-teal-700 transition"
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/login"
                      className="block rounded-md px-3 py-2.5 text-base font-medium text-gray-700 transition hover:bg-gray-50 hover:text-teal-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Iniciar sesión
                    </Link>
                    <Link 
                      href="/register"
                      className="block rounded-md px-3 py-2.5 text-base font-medium text-white bg-teal-600 hover:bg-teal-700 transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            </li>
          </nav>
        </div>
      )}
    </>
  );
}