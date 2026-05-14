import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from '@/shared/i18n/navigation';

export default function Footer({ locale = 'es' }: { locale?: string }) {
  const isEs = locale === 'es';
  const links = [
    { href: '/products', label: isEs ? 'Productos' : 'Products' },
    { href: '/epoxy-floors', label: isEs ? 'Pisos Epóxicos' : 'Epoxy Floors' },
    { href: '/industrial-epoxy-flooring', label: isEs ? 'Pisos Industriales' : 'Industrial Floors' },
    { href: '/luxury-furniture', label: isEs ? 'Muebles de Lujo' : 'Luxury Furniture' },
    { href: '/contact', label: isEs ? 'Contacto' : 'Contact' },
  ];

  return (
    <footer className="border-t border-stone-50/10 bg-[oklch(10%_0.014_55)] text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr_0.85fr] lg:px-8 lg:py-16">
        <div>
          <Link href="/" aria-label="SobrePoxi" className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200">
            <Image
              src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/logo_sobrepoxi-PyTtAVxwqtJhTlGNrYoSmlxWg3d0ER.webp"
              alt="Logo SobrePoxi"
              width={190}
              height={54}
              className="h-12 w-auto object-contain"
              unoptimized
            />
          </Link>
          <p className="mt-6 max-w-md text-pretty text-sm leading-7 text-stone-400">
            {isEs
              ? 'Muebles de lujo, pisos epóxicos y acabados de alto valor, diseñados y ejecutados en Costa Rica.'
              : 'Luxury furniture, epoxy floors, and high-value finishes, designed and executed in Costa Rica.'}
          </p>
          <Link href="https://wa.me/+50685850000?text=Hola%20SobrePoxi%2C%20quiero%20cotizar%20un%20proyecto" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-200 px-5 py-3 text-sm font-bold text-stone-950 transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {isEs ? 'Cotizar por WhatsApp' : 'Quote on WhatsApp'}
          </Link>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-amber-200">{isEs ? 'Navegación' : 'Navigation'}</h2>
          <ul className="mt-5 grid gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-stone-400 transition-colors duration-300 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-amber-200">{isEs ? 'Contacto' : 'Contact'}</h2>
          <ul className="mt-5 grid gap-4 text-sm text-stone-400">
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-200" aria-hidden="true" />
              <a href="mailto:info@sobrepoxi.com" className="transition-colors duration-300 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200">info@sobrepoxi.com</a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-200" aria-hidden="true" />
              <span>(+506) 8585-0000 · (+506) 8875-7576</span>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-200" aria-hidden="true" />
              <span>Centro Comercial Velasuma, 2da. Planta local No. 9, San Isidro de Coronado, San José, Costa Rica</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-50/10 px-4 py-5 text-center text-xs text-stone-500 sm:px-6 lg:px-8">
        © 2026 SobrePoxi. {isEs ? 'Todos los derechos reservados.' : 'All rights reserved.'}
      </div>
    </footer>
  );
}
