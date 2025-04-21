// ValueProposition.tsx (Server Component)
import Link from 'next/link';
import Image from 'next/image';
export default function ValueProposition() {
    const values = [
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        ),
        title: "Impacto Social",
        description: "Cada compra contribuye directamente a la rehabilitación y reinserción social de personas privadas de libertad."
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        ),
        title: "Calidad Garantizada",
        description: "Artesanías elaboradas con los más altos estándares de calidad, atención al detalle y materiales duraderos."
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        ),
        title: "Hecho en Costa Rica",
        description: "Productos 100% costarricenses que reflejan la riqueza cultural y natural de nuestro país."
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1v22"></path>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        ),
        title: "Precio Justo",
        description: "Valoramos el trabajo de nuestros artesanos ofreciéndoles una remuneración justa por sus creaciones."
      }
    ];
  
    return (
      <section className="bg-teal-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
              Nuestros valores
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">Por qué elegir nuestras artesanías</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Al comprar nuestros productos, no solo adquieres una pieza única, sino que también contribuyes a un cambio social positivo
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-teal-100 hover:shadow-md transition">
                <div className="bg-teal-100 p-3 rounded-full w-14 h-14 flex items-center justify-center text-teal-700 mb-5">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-teal-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-white rounded-xl overflow-hidden shadow-sm border border-teal-100">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative h-72 md:h-auto">
                <Image 
                  src="/home/artesano.webp" 
                  alt="Artesano trabajando"
                  fill
                  className="object-fit"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <span className="text-teal-700 font-medium mb-2">Nuestra historia</span>
                <h3 className="text-2xl font-bold text-teal-800 mb-4">Transformando vidas a través del arte</h3>
                <p className="text-gray-600 mb-6">
                  Este proyecto nació con la visión de dar una segunda oportunidad a personas privadas de libertad, 
                  permitiéndoles desarrollar habilidades artesanales y generar ingresos mientras cumplen su sentencia. 
                  Cada pieza cuenta una historia de transformación y esperanza.
                </p>
                <Link 
                  href="/about" 
                  className="inline-flex items-center font-medium text-teal-700 hover:text-teal-800"
                >
                  Conoce más sobre nuestra misión
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }