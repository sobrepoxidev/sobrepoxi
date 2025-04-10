// components/layout/Navbar/index.tsx
// Componente principal SSR
import Link from 'next/link';
import Image from 'next/image';
import NavbarClient from './NavbarClient';

// Datos que podrían venir de una API o CMS (esto iría en el SSR)
const categories = [
  { name: 'Decoración', slug: 'decoracion' },
  { name: 'Chorreadores', slug: 'joyeria' },
  { name: 'Artesanía en madera', slug: 'madera' },
];

const navigationLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Acerca de', path: '/about' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 backdrop-blur-md transition-all duration-300 max-w-full w-full ">
      <div className="flex max-w-full items-center justify-between px-2  md:px-6 py-0.5 bg-white/95">
        {/* Logo - SSR */}
        <Link href="/" className="flex items-center space-x-2 focus-visible:outline-teal-600" aria-label="HandMadeArt Home">
          <div className="relative overflow-hidden rounded-md">
            <Image 
              src="/logo.webp" 
              alt="Hand Made Art Logo" 

              width={140} 
              height={0} 
              className="max-lg:w-[110px] object-contain"
              priority
            />
          </div>
          
        </Link>
        
        {/* Client-side interactivity */}
        <NavbarClient 
          navigationLinks={navigationLinks} 
          categories={categories} 
        />
      </div>
    </header>
  );
}