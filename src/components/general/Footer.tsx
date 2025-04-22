import Link from 'next/link';
import { Facebook, Instagram, Phone, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 border-t border-neutral-800">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo tipográfico */}
        <div className="text-2xl font-extrabold tracking-tight font-serif select-none">
          Hand Made Art
        </div>
        {/* Contacto y redes */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
          <div className="flex items-center gap-3">
            <a href="mailto:info@handmadeart.com" aria-label="Correo" className="hover:text-primary transition-colors flex items-center gap-1">
              <Mail className="w-5 h-5" />
              <span className="hidden sm:inline">info@handmadeart.com</span>
            </a>
            <a href="tel:+50685850000" aria-label="Teléfono" className="hover:text-primary transition-colors flex items-center gap-1">
              <Phone className="w-5 h-5" />
              <span className="hidden sm:inline">(+506) 8585-0000</span>
            </a>
            <a href="https://wa.me/50685850000" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors flex items-center gap-1">
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
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
        2025 Hand Made Art. Desarrollado por{' '}
        <Link href="https://sobrepoxi.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-primary font-semibold">
          Sobrepoxi IT
        </Link>
      </div>
    </footer>
  );
}
