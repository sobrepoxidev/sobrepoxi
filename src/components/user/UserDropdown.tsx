'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Session } from '@supabase/supabase-js';
import { ChevronDown, User, History, LogIn, UserPlus, LogOut, Heart } from 'lucide-react';

interface UserDropdownProps {
  session: Session | null;
  onLogout: () => Promise<void>;
}

export default function UserDropdown({ session, onLogout }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        className="flex items-center space-x-1 text-sm rounded-md px-3 py-1.5 text-gray-700 hover:bg-gray-50 transition"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="hidden md:inline">
          {session ? `Hola, ${session.user.email?.split('@')[0]}` : 'Cuenta y Listas'}
        </span>
        <span className="md:hidden">
          <User className="h-5 w-5" />
        </span>
        <ChevronDown className="h-3 w-3" />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50"
          style={{ zIndex: 9999 }}
        >
          {!session ? (
            <>
              <div className="p-3 border-b border-gray-100">
                <div className="flex justify-center py-2">
                  <Link 
                    href="/login"
                    className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Iniciar sesión
                  </Link>
                </div>
                <div className="text-center text-sm mt-2">
                  <span className="text-gray-600">¿Eres nuevo?</span>{' '}
                  <Link 
                    href="/register" 
                    className="text-teal-600 hover:text-teal-800 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Crear una cuenta
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="p-3 border-b border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Mi cuenta</span>
                <button
                  onClick={async () => {
                    await onLogout();
                    setIsOpen(false);
                  }}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Cerrar sesión
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
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4 mr-3 text-gray-500" />
              Mi cuenta
            </Link>
            <Link 
              href="/viewed-history"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setIsOpen(false)}
            >
              <History className="h-4 w-4 mr-3 text-gray-500" />
              Artículos vistos recientemente
            </Link>
            <Link 
              href="/favorites"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setIsOpen(false)}
            >
              <Heart className="h-4 w-4 mr-3 text-gray-500" />
              Mis favoritos
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
