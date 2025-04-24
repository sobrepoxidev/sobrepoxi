// components/layout/Navbar/index.tsx
// Componente principal SSR
import Link from 'next/link';
import Image from 'next/image';
import NavbarClient from './NavbarClient';

// Datos que podrían venir de una API o CMS (esto iría en el SSR)
const categories = [
  { name: 'Chorreadores', slug: '?category=drippers' },
  { name: 'Cajas decorativas', slug: '?category=decorative-boxes' },
  { name: 'Esculturas de animales', slug: '?category=animal-sculptures' },
  { name: 'Espejos tallados', slug: '?category=carved-mirrors' },
  { name: 'Cuadros pintados', slug: '?category=paintings' },
  { name: 'Rosas artesanales', slug: '?category=handmade-roses' },
  { name: 'Flores y árboles decorativos', slug: '?category=decorative-flowers-trees' },
  { name: 'Soportes para tazas', slug: '?category=mug-holders' },
  { name: 'Motivos religiosos', slug: '?category=religious-art' },
  { name: 'Parejas y corazones', slug: '?category=love-themed' },
  { name: 'Porta huevos decorativos', slug: '?category=egg-boxes' },
  { name: 'Guacamayas y aves', slug: '?category=macaws-and-birds' },
  { name: 'Caballos y figuras ecuestres', slug: '?category=horse-figures' },
  { name: 'Marcos decorativos', slug: '?category=decorative-frames' },
  { name: 'Utensilios y sets de cocina', slug: '?category=kitchen-sets' }
];


const navigationLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Acerca de', path: '/about' },
  { name: 'Impacto', path: '/impact' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 backdrop-blur-md transition-all duration-300 max-w-full w-full ">
      <div className="flex max-w-full items-center justify-between px-2  md:px-6 py-0.5 bg-white/95">
        {/* Logo - SSR */}
        <Link href="/new" className="flex items-center space-x-2 focus-visible:outline-teal-600" aria-label="HandMadeArt Home">
          <div className="relative overflow-hidden rounded-md">
            <Image 
              src="/nuevoLogo.webp" 
              alt="Hand Made Art Logo" 

              width={100 } 
              height={0} 
              className="w-[50px] md:w-[70px] object-fill"
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