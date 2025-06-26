// CallToAction.tsx (Client Component)
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useSupabase } from '@/app/supabase-provider/provider';
import { useLocale } from 'next-intl';

export default function CallToAction() {
  const locale = useLocale();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const { session } = useSupabase();
  
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail || newsletterStatus === 'loading') return;
    
    setNewsletterStatus('loading');
    setNewsletterError(null);
    
    try {
      // Check if email already exists
      const { data: existingSubscriber } = await supabase
        .from('newsletter_subscribers')
        .select('id')
        .eq('email', newsletterEmail)
        .single();
      
      if (existingSubscriber) {
        setNewsletterStatus('success');
        return; // Already subscribed, consider this a success
      }
      
      // Insert new subscriber
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: newsletterEmail,
          user_id: session?.user?.id || null,
          status: 'active'
        });
      
      if (error) throw error;
      
      setNewsletterStatus('success');
      setNewsletterEmail('');
    } catch (error) {
      console.error('Error al suscribirse al newsletter:', error);
      setNewsletterStatus('error');
      setNewsletterError('Hubo un error al procesar tu solicitud. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <section className="max-w-[1500px] mx-auto  py-4">
      <div className="container mx-auto px-4">
        <div className="backdrop-blur-sm rounded-xl p-2 md:p-12 shadow-xl relative overflow-hidden">
          {/* Decorative patterns */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-teal-500/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-2 text-gray-900">{locale === 'es' ? 'Únete a nuestro movimiento de cambio social' : 'Join our movement for social change'}</h2>
            <p className="text-gray-800 text-sm sm:text-lg mb-3">
              {locale === 'es' ? 'Al adquirir nuestras artesanías, no solo embelleces tu hogar con piezas únicas, sino que también contribuyes a transformar vidas y crear oportunidades para personas privadas de libertad en Costa Rica.' : 'By purchasing our handmade crafts, you not only beautify your home with unique pieces, but you also contribute to transforming lives and creating opportunities for people deprived of freedom in Costa Rica.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products" 
                className="bg-teal-500 text-black hover:bg-teal-600 font-medium rounded-lg px-6 py-3 shadow-sm transition"
              >
                {locale === 'es' ? 'Explorar productos' : 'Explore products'}
              </Link>
              <Link 
                href="/about" 
                className="border border-black text-black hover:bg-white/10 font-medium rounded-lg px-6 py-3 transition"
              >
                {locale === 'es' ? 'Conocer más' : 'Learn more'}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Newsletter subscription */}
        <div className="mt-6 max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">{locale === 'es' ? 'Mantente informado' : 'Stay informed'}</h3>
          <p className="text-gray-800 mb-2">
            {locale === 'es' ? 'Suscríbete para recibir noticias sobre nuevos productos, historias de nuestros artesanos y promociones especiales' : 'Subscribe to receive news about new products, stories of our artisans and special promotions'}
          </p>
          
          {newsletterStatus === 'success' ? (
            <div className="bg-green-50 text-green-800 px-4 py-3 rounded-lg border border-green-200">
              {locale === 'es' ? '¡Gracias por suscribirte! Pronto recibirás nuestras novedades.' : 'Thank you for subscribing! You will soon receive our news.'}
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="flex-grow px-4 py-3 border border-black/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button 
                type="submit"
                disabled={newsletterStatus === 'loading'}
                className={`px-6 py-3 rounded-lg transition shadow-sm font-medium ${newsletterStatus === 'loading' 
                  ? 'bg-amber-300 text-amber-800 cursor-not-allowed' 
                  : 'bg-amber-500 hover:bg-amber-600 text-white'}`}
              >
                {locale === 'es' ? (newsletterStatus === 'loading' ? 'Procesando...' : 'Suscribirse') : (newsletterStatus === 'loading' ? 'Processing...' : 'Subscribe')}
              </button>
            </form>
          )}
          
          {newsletterStatus === 'error' && newsletterError && (
            <div className="mt-3 text-red-600 text-sm">
              {newsletterError}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}