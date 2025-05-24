import Link from 'next/link';
import { Facebook, Instagram, Phone, Mail, MessageCircle } from 'lucide-react';


type tParams = Promise<{ locale: string }>;
export default async function Footer({params}: {params: tParams}) {
  const {locale} = await params;
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 border-t border-neutral-800">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo tipográfico */}
        <div className="text-2xl font-extrabold tracking-tight font-serif select-none">
          Hand Made Art
        </div>
        {/* Contacto y redes */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
          <div className="flex flex-col items-start md:items-center gap-3">
            <a href="mailto:info@handmadeart.com" aria-label="Correo" className="hover:text-primary transition-colors flex items-center gap-1">
              <Mail className="w-5 h-5" />
              <span>info@handmadeart.com</span>
            </a>
            {/* Contact Number 1: (+506) 8775-7576 */}
            <div className="flex items-center gap-2">
              <a href="tel:+50687757576" aria-label="Llamar al (+506) 8775-7576" className="hover:text-primary transition-colors flex items-center gap-1">
                <Phone className="w-5 h-5" />
                <span>(+506) 8775-7576</span>
              </a>
              <a href="https://wa.me/50687757576" aria-label="WhatsApp a (+506) 8775-7576" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors flex items-center gap-1">
                <MessageCircle className="w-5 h-5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
            {/* Contact Number 2: (+506) 4205-1111 */}
            <div className="flex items-center gap-2">
              <a href="tel:+50642051111" aria-label="Llamar al (+506) 4205-1111" className="hover:text-primary transition-colors flex items-center gap-1">
                <Phone className="w-5 h-5" />
                <span>(+506) 4205-1111</span>
              </a>
              <a href="https://wa.me/50642051111" aria-label="WhatsApp a (+506) 4205-1111" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors flex items-center gap-1">
                <MessageCircle className="w-5 h-5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-0 md:ml-6">
            <Link href="https://www.facebook.com/justcostaricatravel" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Facebook className="w-6 h-6" />
            </Link>
            <Link href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
              <Instagram className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="text-xs text-neutral-400 text-center mt-4">
        {locale === 'es' ? '2025 Hand Made Art. Desarrollado por' : '2025 Hand Made Art. Developed by'}
        <Link href="https://sobrepoxi.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-primary font-semibold">
          Sobrepoxi IT
        </Link>
      </div>
    </footer>
  );
}
