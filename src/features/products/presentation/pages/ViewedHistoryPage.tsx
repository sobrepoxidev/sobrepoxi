'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/shared/i18n/navigation';
import Image from 'next/image';
import { ChevronRight, Trash2, Clock, AlertCircle } from 'lucide-react';
import { useSupabase } from '@/app/supabase-provider/provider';
import { getLocalViewedHistory, removeFromHistory, clearViewedHistory, type ViewedProduct, syncViewedHistoryWithServer } from '@/features/products';
import { Session } from '@supabase/supabase-js';
import { useLocale } from "next-intl";
import { formatUSD } from '@/shared/utils/formatCurrency';

export default function ViewedHistoryPage() {
  const [history, setHistory] = useState<ViewedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { supabase } = useSupabase();
  const [session, setSession] = useState<Session | null>(null);
  const locale = useLocale();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const viewedHistory = getLocalViewedHistory();
      setHistory(viewedHistory);
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setIsLoading(false);
    }
    loadData();
  }, [supabase]);

  useEffect(() => {
    if (session) { syncViewedHistoryWithServer(); }
  }, [session]);

  const handleRemove = (productId: number) => {
    removeFromHistory(productId);
    setHistory(prev => prev.filter(item => item.id !== productId));
  };

  const handleClearAll = () => {
    clearViewedHistory();
    setHistory([]);
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-[#121212]">
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center text-sm text-gray-400">
        <Link href="/" className="hover:text-amber-400 transition-colors">{locale == 'es' ? 'Inicio' : 'Home'}</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="font-medium text-white">{locale == 'es' ? 'Historial de productos vistos' : 'Viewed history'}</span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">{locale == 'es' ? 'Productos vistos recientemente' : 'Recently viewed products'}</h1>
        <p className="text-gray-400">{locale == 'es' ? 'Aquí puedes ver los últimos productos que has visitado.' : 'Here you can see the last products you have visited.'}</p>
      </div>

      {!session && (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 mb-6 flex items-center">
          <AlertCircle className="h-5 w-5 text-amber-400 mr-3 flex-shrink-0" />
          <div className="flex-grow">
            <p className="text-gray-300 text-sm">
              <strong className="text-white">{locale == 'es' ? '¿Quieres guardar tu historial?' : 'Do you want to save your history?'}</strong> {locale == 'es' ? 'Inicia sesión para mantener tu historial de productos vistos en todos tus dispositivos.' : 'Sign in to keep your viewed product history on all your devices.'}
            </p>
          </div>
          <Link href="/login?redirect_to=/viewed-history" className="ml-4 px-4 py-2 bg-gold-gradient text-black font-bold text-sm rounded-md hover:shadow-lg hover:shadow-amber-500/20 transition-all whitespace-nowrap flex-shrink-0">
            {locale == 'es' ? 'Iniciar sesión' : 'Sign in'}
          </Link>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
        </div>
      ) : history.length > 0 ? (
        <>
          <div className="flex justify-end mb-4">
            <button onClick={handleClearAll} className="flex items-center text-sm text-red-400 hover:text-red-300 transition">
              <Trash2 className="h-4 w-4 mr-1" />
              {locale == 'es' ? 'Limpiar historial' : 'Clear history'}
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {history.map((product) => (
              <div key={`${product.id}-${product.viewedAt.toString()}`} className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden hover:border-amber-500/30 transition relative group">
                <button onClick={() => handleRemove(product.id)} className="absolute top-2 right-2 bg-black/60 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-black/80" aria-label={locale == 'es' ? 'Eliminar del historial' : 'Remove from history'}>
                  <Trash2 className="h-4 w-4 text-gray-300" />
                </button>
                <Link href={`/products?id=${product.id}`} className="block">
                  <div className="relative h-48 overflow-hidden bg-[#121212] flex items-center justify-center p-4">
                    <Image src={product.imageUrl} alt={locale == 'es' ? product.name_es : product.name_en || ''} width={110} height={0} className="object-contain max-h-full w-auto group-hover:scale-105 transition-transform duration-300" />
                    <span className="absolute top-3 left-3 bg-amber-400/10 text-amber-300 text-xs px-2 py-1 rounded-full border border-amber-500/20">{product.category || 'Artesanía'}</span>
                  </div>
                </Link>
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-200 mb-1 line-clamp-2">{locale == 'es' ? product.name_es : product.name_en}</h3>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-amber-400">{product.dolar_price ? `${formatUSD(product.dolar_price)}` : 'Consultar'}</p>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        <span title={formatDate(product.viewedAt)}>{formatDate(product.viewedAt)}</span>
                      </div>
                    </div>
                  </div>
                  <Link href={`/products?id=${product.id}`} className="block w-full text-center py-2 border border-amber-500/40 text-amber-400 rounded-md hover:bg-amber-400/10 transition text-sm">
                    {locale == 'es' ? 'Ver producto' : 'View product'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-[#1a1a1a] rounded-xl border border-white/10">
          <div className="mb-4">
            <Image src="/empty-history.svg" alt={locale == 'es' ? 'Historial vacío' : 'Empty history'} width={180} height={180} className="mx-auto opacity-70" />
          </div>
          <h2 className="text-xl font-medium text-white mb-2">{locale == 'es' ? 'No hay productos en tu historial' : 'No products in your history'}</h2>
          <p className="text-gray-400 mb-6">{locale == 'es' ? 'Explora nuestra tienda y vuelve aquí para ver tu historial de navegación' : 'Explore our store and come back here to see your navigation history'}</p>
          <Link href="/products" className="inline-flex items-center justify-center px-5 py-2.5 bg-gold-gradient text-black font-bold rounded-lg hover:shadow-lg hover:shadow-amber-500/20 transition-all">
            {locale == 'es' ? 'Explorar productos' : 'Explore products'}
          </Link>
        </div>
      )}
    </div>
    </div>
  );
}
