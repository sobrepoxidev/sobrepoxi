export interface ContactInfo {
  email: string;
  phones: string[];
  address: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    whatsapp: string;
  };
}

export interface NavigationLink {
  name: string;
  path: string;
}

export function getContactInfo(): ContactInfo {
  return {
    email: 'info@sobrepoxi.com',
    phones: ['+506 8585-0000', '+506 8875-7576'],
    address: 'Centro Comercial Velasuma, 2da. Planta local No. 9, San Isidro Downtown, Vásquez de Coronado, San José, Costa Rica',
    socialLinks: {
      facebook: 'https://www.facebook.com/share/14EpJLUsXwc/',
      instagram: 'https://www.instagram.com/sobrepoxi?igsh=MTZzd2ljaXNwbWVzaA==',
      tiktok: 'https://www.tiktok.com/@sobrepoxi3?_t=ZM-8xiKO9MHzEe&_r=1',
      youtube: 'https://www.youtube.com/@sobrepoxi',
      whatsapp: 'https://wa.me/50685850000',
    },
  };
}

export function getNavigationLinks(locale: string): NavigationLink[] {
  return [
    { name: locale === 'es' ? 'Inicio' : 'Home', path: '/' },
    { name: locale === 'es' ? 'Acerca de' : 'About', path: '/about' },
    { name: locale === 'es' ? 'Pisos Epóxicos' : 'Epoxy Floors', path: '/epoxy-floors' },
    { name: locale === 'es' ? 'Pisos Industriales' : 'Industrial Flooring', path: '/industrial-epoxy-flooring' },
    { name: locale === 'es' ? 'Muebles de Lujo' : 'Luxury Furniture', path: '/luxury-furniture' },
    { name: locale === 'es' ? 'Guías' : 'Guides', path: '/guias' },
  ];
}

export function getFooterLinks(locale: string) {
  return {
    products: { name: locale === 'es' ? 'Productos' : 'Products', path: '/products' },
    about: { name: locale === 'es' ? 'Nosotros' : 'About Us', path: '/about' },
    contact: { name: locale === 'es' ? 'Contacto' : 'Contact', path: '/contact' },
    privacy: { name: locale === 'es' ? 'Políticas de Privacidad' : 'Privacy Policies', path: '/privacy-policies' },
    terms: { name: locale === 'es' ? 'Términos de Servicio' : 'Terms of Service', path: '/conditions-service' },
  };
}