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

export default async function Navbar({ locale }: { locale: string }) {
  console.log("locale: ", locale);
  return (
    <header className="relative z-40 border-b border-gray-100 w-full bg-white">
      <div className="container mx-auto flex items-center px-2 md:px-4 py-2">
        {/* Logo - SSR (Left) */}
        <div className="flex-shrink-0 mr-2 md:mr-4">
          <Link href="/" className="flex items-center focus-visible:outline-teal-600" aria-label="HandMadeArt Home">
            <div className="relative overflow-hidden">
              <Image 
                src={locale === 'es' ? '/new_logo_h_w.png' : '/new_logo_h_w.png'}
                alt="Hand Made Art Logo" 
                width={225} 
                height={0} 
                className="w-[120px] md:w-[225px] object-cover"
                priority
              />
            </div>
          </Link>
        </div>
        
        {/* Client-side interactivity (Center and Right) */}
        <div className="flex-grow flex items-center justify-between">
          <NavbarClient 
            navigationLinks={navigationLinks}
          />
        </div>
      </div>
    </header>
  );
}