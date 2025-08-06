'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Session } from '@supabase/supabase-js';
import { ChevronDown, User, History, Heart } from 'lucide-react';
import { useLocale } from "next-intl";
interface UserDropdownProps {
  session: Session | null;
  onLogout: (currentUrl: string) => Promise<void>;
}

export default function UserDropdown({ session, onLogout }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const router = useRouter();

  // Build the full current path *with* query string so we can return here after auth

  // Cierra el dropdown si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cerrar al presionar tecla Escape
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-sm  px-3 py-1.5 text-white hover:bg-gray-950 p-1 rounded focus:outline-none transition"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="hidden md:inline">
          {session ? `${locale === 'es' ? 'Hola' : 'Hello'}, ${session.user.email?.split('@')[0]}` : locale === 'es' ? 'Cuenta y Listas' : 'Account and Lists'}
        </span>
        <span className="md:hidden">
          <User className="h-5 w-5" />
        </span>
        <ChevronDown className="h-3 w-3" />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-1 w-64 bg-[#303030] border border-gray-950 rounded-md shadow-lg z-50"
          style={{ zIndex: 9999 }}
        >
          {!session ? (
            <>
              <div className="p-3 border-b border-gray-950">
                <div className="flex justify-center py-2">
                  <button
                    onClick={() => {
                      const fullPath = window.location.pathname + window.location.search;
                      router.push(`/login?returnUrl=${fullPath}`);
                      setIsOpen(false);
                    }}
                    className="block w-full text-center px-4 py-2 text-sm font-medium text-black bg-gold-gradient hover:bg-teal-700 rounded-md transition"
                  >
                    {locale === 'es' ? 'Iniciar sesión' : 'Sign in'}
                  </button>
                </div>
                <div className="text-center text-sm mt-2">
                  <span className="gold-gradient-bright">{locale === 'es' ? '¿Eres nuevo?' : 'Are you new?'}</span>{' '}
                  <button
                    onClick={() => {
                      const fullPath = window.location.pathname + window.location.search;
                      router.push(`/register?returnUrl=${fullPath}`);
                      setIsOpen(false);
                    }}
                    className="text-white hover:text-gray-200 transition"
                  >
                    {locale === 'es' ? 'Crear una cuenta' : 'Create an account'}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-3 border-b border-gray-950">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-white">{locale === 'es' ? 'Mi cuenta' : 'My account'}</span>
                <button
                  onClick={async () => {
                    await onLogout(window.location.href);
                    setIsOpen(false);
                  }}
                  className="text-xs text-red-600 hover:text-red-200"
                >
                  {locale === 'es' ? 'Cerrar sesión' : 'Sign out'}
                </button>
              </div>
              <div className="text-sm text-gray-600">
                {session.user.email}
              </div>
            </div>
          )}

          <div className="py-1">
            <Link 
              href="/account"
              className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-950 transition"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4 mr-3 text-gray-500" />
              {locale === 'es' ? 'Mi cuenta' : 'My account'}
            </Link>
            <Link 
              href="/viewed-history"
              className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-950 transition"
              onClick={() => setIsOpen(false)}
            >
              <History className="h-4 w-4 mr-3 text-gray-500" />
              {locale === 'es' ? 'Artículos vistos recientemente' : 'Recently viewed items'}
            </Link>
            <Link 
              href="/favorites"
              className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-950 transition"
              onClick={() => setIsOpen(false)}
            >
              <Heart className="h-4 w-4 mr-3 text-gray-500" />
              {locale === 'es' ? 'Mis favoritos' : 'My favorites'}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
