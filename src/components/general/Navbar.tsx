// components/layout/Navbar/index.tsx
// Componente principal SSR
import Link from 'next/link';
import Image from 'next/image';
import NavbarClient from './NavbarClient';




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