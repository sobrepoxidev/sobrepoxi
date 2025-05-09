// components/layout/Navbar/index.tsx
// Componente principal SSR
import Link from 'next/link';
import Image from 'next/image';
import NavbarClient from './NavbarClient';
import { getTranslations } from 'next-intl/server';

export default async function Navbar({ locale }: { locale: string }) {
  const t = await getTranslations('navbar');

  // Definir los enlaces de navegación con traducciones
  const navigationLinks = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/about' },
    { name: t('impact'), path: '/impact' },
    { name: t('shipping'), path: '/shipping' },
  ];

  return (
    <header className="relative z-40 border-b border-gray-100 w-full bg-white">
      <div className="container mx-auto flex items-center px-2 md:px-2 py-2">
        {/* Logo - SSR (Left) */}
        <div className="flex-shrink-0 mr-2 md:mr-4 ">
          <Link href="/" className="flex items-center focus-visible:outline-teal-600" aria-label="HandMadeArt Home">
            <div className="relative overflow-hidden flex items-center gap-3">
              <div className="md:hidden">
              <Image
                src="/logo-handmade-art-black.webp"
                alt="Hand Made Art Logo"
                width={65}
                height={0}
                className="w-[40px] md:w-[65px] object-cover block dark:hidden"
                priority
              />
              <Image
                src="/logo-handmade-art.webp"
                alt="Hand Made Art Logo"
                width={65}
                height={0}
                className="w-[40px] md:w-[65px] object-cover hidden dark:block"
                priority
              />
              </div>
              <div className="hidden md:block">
              <Image
                src="/logo-handmade-art.webp"
                alt="Hand Made Art Logo"
                width={65}
                height={0}
                className="w-[40px] md:w-[65px] object-cover block dark:hidden"
                priority
              />
              <Image
                src="/logo-handmade-art-black.webp"
                alt="Hand Made Art Logo"
                width={65}
                height={0}
                className="w-[40px] md:w-[65px] object-cover hidden dark:block"
                priority
              />
              </div>
              
              <h1 className="text-lg sm:text-3xl tracking-wider text-gray-800">
                <span className="mr-1">HANDMADE</span>
                <span className="font-bold text-[#B55327]">ART</span>
              </h1>
            </div>
          </Link>
        </div>

        {/* Client-side interactivity (Center and Right) */}
        <div className="flex-grow flex items-center justify-between">
          <NavbarClient
            navigationLinks={navigationLinks}
            locale={locale}
          />
        </div>
      </div>
    </header>
  );
}