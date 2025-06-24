import Link from 'next/link';
import { Facebook, Instagram, Phone, Mail, MessageCircle, Youtube, Heart, MessageSquare } from 'lucide-react';

export default function Footer({ locale }: { locale: string }) {
  return (
    <footer className="bg-[#303030] text-white py-12 px-4 border-t-4 border-teal-500">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-teal-500 mr-2" />
              <span className="text-2xl font-bold">Handmade</span>
              <span className="text-2xl font-bold text-teal-500">Art</span>
            </div>
            <p className="text-gray-300 text-sm">
              {locale === 'es' 
                ? 'Artesanía hecha a mano con amor y dedicación en Costa Rica'
                : 'Handcrafted with love and dedication in Costa Rica'}
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-400">
              {locale === 'es' ? 'Contacto' : 'Contact'}
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:info@handmadeart.store" 
                  className="flex items-center text-gray-300 hover:text-teal-400 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2 text-teal-500" />
                  info@handmadeart.store
                </a>
              </li>
              <li>
                <a 
                  href="tel:+50687757576" 
                  className="flex items-center text-gray-300 hover:text-teal-400 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2 text-teal-500" />
                  (+506) 8775-7576
                </a>
              </li>
              <li>
                <a 
                  href="tel:+50642051111" 
                  className="flex items-center text-gray-300 hover:text-teal-400 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2 text-teal-500" />
                  (+506) 4205-1111
                </a>
              </li>
            </ul>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-400">
              {locale === 'es' ? 'Enlaces' : 'Links'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-teal-400 transition-colors">
                  {locale === 'es' ? 'Productos' : 'Products'}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-teal-400 transition-colors">
                  {locale === 'es' ? 'Nosotros' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-teal-400 transition-colors">
                  {locale === 'es' ? 'Contacto' : 'Contact'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-400">
              {locale === 'es' ? 'Síguenos' : 'Follow Us'}
            </h3>
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://www.facebook.com/share/1Au8nNA2ho/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#3b5998] hover:bg-[#4c70ba] p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/handmadeart.store" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@handmadeart.store" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-800 p-2 rounded-full transition-colors"
                aria-label="TikTok"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
              <a 
                href="https://www.youtube.com/@handmadeartcr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#ff0000] hover:bg-[#cc0000] p-2 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/50687757576" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#128C7E] p-2 rounded-full transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Developer Credits */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center">
          <p className="text-gray-400 text-sm mb-2">
            © {new Date().getFullYear()} Handmade Art. {locale === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
          <p className="text-xs text-gray-500">
            {locale === 'es' ? 'Desarrollado por ' : 'Developed by '}
            <a 
              href="https://sobrepoxi.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-teal-400 hover:underline"
            >
              Sobrepoxi IT
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
