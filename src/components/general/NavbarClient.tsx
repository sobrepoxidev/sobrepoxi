// components/layout/Navbar/NavbarClient.tsx
"use client"

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  Globe,
  User,
  X
} from 'lucide-react';
import UserDropdown from '@/components/user/UserDropdown';
import { Session } from '@supabase/supabase-js';
import { useSupabase } from '@/app/supabase-provider/provider';
import { useCart } from '@/context/CartContext';
import SearchBar from '@/components/search/SearchBar';

type NavLink = {
  name: string;
  path: string;
};

interface NavbarClientProps {
  navigationLinks: NavLink[];
  locale: string;
}

export default function NavbarClient({ navigationLinks, locale }: NavbarClientProps) {
  const t = useTranslations('navbar');
  // Estado para los menús
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory] = useState('Todas');
  const { supabase } = useSupabase();
  const [session, setSession] = useState<Session | null>(null);

  // Refs para cerrar menús al hacer clic fuera
  const searchRef = useRef<HTMLDivElement>(null);
  const { cart } = useCart();
  const cardQuantity = cart.length;
  
  // We don't need to fetch categories anymore as we're not using them
  useEffect(() => {
    // Empty effect for future implementation if needed
  }, []);
  
  // Efecto para cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
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

    const { data: authListener } = supabase.auth.onAuthStateChange((event: string, newSession: Session | null) => {
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
                initialCategory={selectedCategory} 
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
      <div className="flex items-center justify-end space-x-0.5 sm:space-x-1 ml-auto ">
        {/* User Dropdown - Desktop */}
        <div className="hidden md:flex items-center">
          <UserDropdown session={session} onLogout={handleLogout} />
        </div>
        
        {/* Language selector */}
        <Link 
          href={locale === 'es' ? '/en' : '/es'}
          className="hidden md:flex h-10 items-center space-x-1 rounded-md px-2 text-sm text-gray-700 transition hover:bg-gray-100"
          aria-label={t('changeLanguage')}
        >
          <Globe className="h-4 w-4" />
          <span>{locale === 'es' ? 'ES' : 'EN'}</span>
        </Link>
        
        {/* Cart */}
        <Link 
          href="/cart" 
          className="relative flex h-10 items-center space-x-0.5 rounded-md px-0.5 text-sm text-gray-700 transition hover:bg-gray-100"
          aria-label={t('cart')}
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="hidden md:inline">{t('cart')}</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-xs font-medium text-white">
            {cardQuantity}
          </span>
        </Link>
        
        {/* Search - Now using the search icon to open a modal with the SearchBar */}
        <div ref={searchRef}>
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 transition  hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            aria-label={t('search')}
            aria-expanded={isSearchOpen}
          >
            <Search className="h-5 w-5" />
          </button>
          
          {/* Search overlay/dropdown with the new SearchBar component */}
          {isSearchOpen && (
            <div className="absolute left-0 right-0 top-full z-50 border-t border-gray-100 bg-white px-4 py-4 shadow-lg md:left-auto md:right-4 md:top-16 md:w-96 md:rounded-lg md:border md:border-gray-100">
              <div className="mb-2 flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-800">{t('searchProducts')}</h3>
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label={t('closeSearch')}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <SearchBar 
                variant="standalone" 
                initialCategory={selectedCategory}
                onClose={() => setIsSearchOpen(false)} 
              />
              
             
            </div>
          )}
        </div>
        
        {/* Mobile menu toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full  text-gray-700 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 lg:hidden -ml-2"
          aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-full z-40 max-h-[calc(100vh-4rem)] overflow-y-auto bg-white shadow-lg lg:hidden">
          <nav className="px-4 py-3">
            {/* Mobile Search - Amazon Style */}
            <div className="mb-4">
              <div className="flex w-full items-center rounded-md border border-gray-300 bg-white overflow-hidden shadow-sm">
                {/* Integrated SearchBar component for mobile */}
                <SearchBar 
                  variant="navbar" 
                  onClose={() => setIsMenuOpen(false)} 
                  initialCategory={selectedCategory}
                />
              </div>
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
                    href="/products" 
                    className="block text-sm text-gray-700 hover:text-teal-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('store')}
                  </Link>
                </li>
                
                <li>
                  <Link 
                    href="/contact" 
                    className="block text-sm text-gray-700 hover:text-teal-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('contact')}
                  </Link>
                </li>
                
                <li>
                  <Link 
                    href="/cart" 
                    className="flex items-center space-x-2 text-sm text-gray-700 hover:text-teal-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>{t('viewCart')} ({cardQuantity})</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}