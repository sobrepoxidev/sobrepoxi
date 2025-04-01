// components/layout/Navbar/index.tsx
// Componente principal SSR
import Link from 'next/link';
import Image from 'next/image';
import NavbarClient from './NavbarClient';

// Datos que podrían venir de una API o CMS (esto iría en el SSR)
const categories = [
  { name: 'Decoración', slug: 'decoracion' },
  { name: 'Joyería', slug: 'joyeria' },
  { name: 'Artesanía en madera', slug: 'madera' },
  { name: 'Textiles', slug: 'textiles' }
];

const navigationLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Nuestro Impacto', path: '/impacto' },
  { name: 'Artesanos', path: '/artesanos' },
  { name: 'Sobre Nosotros', path: '/nosotros' }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 backdrop-blur-md transition-all duration-300 max-w-full w-full ">
      <div className="flex max-w-full items-center justify-between px-4  md:px-6 md:py-1 bg-fuchsia-400 ">
        {/* Logo - SSR */}
        <Link href="/" className="flex items-center space-x-2 focus-visible:outline-teal-600" aria-label="HandMadeArt Home">
          <div className="relative overflow-hidden rounded-md">
            <Image 
              src="/logohma.png" 
              alt="Hand Made Art Logo" 
              width={150} 
              height={0} 
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