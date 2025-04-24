// CallToAction.tsx (Server Component)
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="max-w-[1500px] mx-auto  bg-[#d7eee8] py-8">
      <div className="container mx-auto px-4">
        <div className="backdrop-blur-sm rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          {/* Decorative patterns */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-teal-500/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Únete a nuestro movimiento de cambio social</h2>
            <p className="text-gray-800 text-lg mb-8">
              Al adquirir nuestras artesanías, no solo embelleces tu hogar con piezas únicas, sino que también contribuyes a 
              transformar vidas y crear oportunidades para personas privadas de libertad en Costa Rica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products" 
                className="bg-teal-500 text-black hover:bg-teal-600 font-medium rounded-lg px-6 py-3 shadow-sm transition"
              >
                Explorar productos
              </Link>
              <Link 
                href="/about" 
                className="border border-black text-black hover:bg-white/10 font-medium rounded-lg px-6 py-3 transition"
              >
                Conocer más
              </Link>
            </div>
          </div>
        </div>
        
        {/* Newsletter subscription */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-semibold  mb-3">Mantente informado</h3>
          <p className="text-gray-800 mb-6">
            Suscríbete para recibir noticias sobre nuevos productos, historias de nuestros artesanos y promociones especiales
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="flex-grow px-4 py-3 border border-black/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
              required
            />
            <button 
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-3 rounded-lg transition shadow-sm"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}