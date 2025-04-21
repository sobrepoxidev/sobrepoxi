// impact/page.tsx - Server Component
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Impacto Social | Artesanías con Propósito',
  description: 'Conoce el impacto social de nuestro programa de artesanías con personas privadas de libertad en Costa Rica. Transformando vidas a través del arte y la rehabilitación.',
};

export default function ImpactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-teal-800 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/impact-hero.jpg"
            alt="Impacto social"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
              Nuestro Impacto
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Transformando vidas a través del arte</h1>
            <p className="text-xl text-teal-50 mb-8">
              Cada pieza artesanal representa una historia de esperanza, aprendizaje y segunda oportunidad para personas privadas de libertad en Costa Rica.
            </p>
            <Link
              href="/impact#impact-stats"
              className="inline-flex items-center justify-center bg-white text-teal-800 hover:bg-teal-50 font-medium px-6 py-3 rounded-lg transition shadow-sm"
            >
              Descubre nuestro impacto
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14l-7 7-7-7"></path>
                <path d="M19 10l-7 7-7-7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <ImpactStatistics />

      {/* Transformation Stories */}
      <TransformationStories />

      {/* Rehabilitation Process */}
      <RehabilitationProcess />

      {/* Collaborations */}
      <Collaborations />

      
      <WorkshopGallery />

      
      <ArtisanTestimonials />

    
      <ReintegrationProgram />

      {/* CTA Section */}
      <section className="bg-teal-700 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Sé parte del cambio</h2>
            <p className="text-xl text-teal-50 mb-8">
              Al comprar nuestras artesanías, contribuyes directamente a este programa de impacto social y ayudas a transformar vidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-teal-700 hover:bg-teal-50 font-medium rounded-lg px-6 py-3 shadow-sm transition"
              >
                Explorar productos
              </Link>
              <Link
                href="/contact"
                className="border border-white/40 text-white hover:bg-white/10 font-medium rounded-lg px-6 py-3 transition"
              >
                Contactar para colaborar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// impact/components/ImpactStatistics.tsx - Server Component
function ImpactStatistics() {
  const stats = [
    { number: "25+", label: "Artesanos apoyados", description: "Personas privadas de libertad que han participado en nuestro programa" },
    { number: "5", label: "Años de trayectoria", description: "Transformando vidas a través del arte y la formación profesional" },
    { number: "70%", label: "Tasa de reinserción", description: "De los participantes que han completado el programa" },
    { number: "3,000+", label: "Artesanías vendidas", description: "Creaciones que han llevado esperanza a hogares costarricenses" }
  ];

  return (
    <section id="impact-stats"  className="py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span  className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            En números
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-6">Nuestro impacto en cifras</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Desde 2020, trabajamos para transformar vidas a través de la artesanía, ofreciendo oportunidades de crecimiento y reinserción social a personas privadas de libertad.
          </p>
        </div>

        <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-teal-50 rounded-xl p-6 text-center hover:shadow-md transition border border-teal-100">
              <div className="text-4xl md:text-5xl font-bold text-teal-700 mb-2">{stat.number}</div>
              <h3 className="text-xl font-semibold text-teal-800 mb-2">{stat.label}</h3>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-teal-700/10 rounded-xl p-6 border border-teal-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/4 flex justify-center">
              <div className="h-48 w-48 rounded-full bg-teal-600 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-5xl font-bold">12</div>
                  <div className="text-sm mt-1">centros penales</div>
                </div>
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-2xl font-bold text-teal-800 mb-4">Presencia en centros penitenciarios</h3>
              <p className="text-gray-700 mb-4">
                Nuestro programa se ha expandido a 12 centros penitenciarios en Costa Rica, llevando oportunidades de formación y trabajo a diferentes regiones del país.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {['San José', 'Alajuela', 'Heredia', 'Cartago', 'Puntarenas', 'Liberia'].map((location) => (
                  <div key={location} className="bg-white rounded-lg py-2 px-3 text-center text-sm font-medium text-teal-700 border border-teal-200">
                    {location}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// impact/components/TransformationStories.tsx - Server Component
function TransformationStories() {
  const stories = [
    {
      name: "Manuel Rojas",
      image: "/img.webp",
      quote: "Este programa me dio la oportunidad de descubrir un talento que no sabía que tenía. Ahora tengo una profesión y la esperanza de un nuevo comienzo cuando salga.",
      story: "Manuel pasó de no tener ninguna habilidad técnica a convertirse en uno de nuestros mejores talladores de madera. Sus diseños de flora y fauna costarricense son de los más solicitados.",
      beforeSkill: "Ninguna experiencia en artesanía",
      afterSkill: "Maestro tallador especializado en fauna costarricense"
    },
    {
      name: "Carolina Mendoza",
      image: "/img.webp",
      quote: "Aprender a crear con mis manos me ha dado paz y propósito. Cada pieza que hago es un paso más hacia mi reinserción en la sociedad.",
      story: "Durante sus tres años en el programa, Carolina ha desarrollado técnicas innovadoras para trabajar con materiales reciclados, transformándolos en hermosas piezas decorativas.",
      beforeSkill: "Conocimientos básicos de costura",
      afterSkill: "Artesana especializada en upcycling y materiales sostenibles"
    },
    {
      name: "Roberto Jiménez",
      image: "/img.webp",
      quote: "Esta oportunidad cambió mi perspectiva sobre mí mismo y mi futuro. Ahora tengo un oficio que me apasiona y me permitirá salir adelante.",
      story: "Roberto ha destacado en la creación de chorreadores de café tradicionales con toques modernos. Desde que salió en 2022, ha establecido su propio taller artesanal.",
      beforeSkill: "Trabajos informales sin especialización",
      afterSkill: "Emprendedor con taller propio de artesanías en madera"
    }
  ];

  return (
    <section className="py-20 bg-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            Historias de éxito
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-6">Transformaciones personales</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conoce las historias de artesanos que han encontrado un nuevo camino a través de nuestro programa, desarrollando habilidades y reconstruyendo sus vidas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-teal-100 hover:shadow-md transition">
              <div className="relative h-56">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  className="object-fit"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-semibold">{story.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4 italic text-gray-600">&quot;{story.quote}&quot;</div>
                <p className="mb-4 text-gray-700">{story.story}</p>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <p className="text-sm text-gray-600">Antes: {story.beforeSkill}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    <p className="text-sm font-medium text-teal-700">Ahora: {story.afterSkill}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Estas son solo algunas de las muchas historias de transformación que hemos presenciado a lo largo de estos 5 años.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center text-teal-700 hover:text-teal-800 font-medium"
          >
            Conoce más sobre nuestra misión
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// impact/components/RehabilitationProcess.tsx - Server Component
function RehabilitationProcess() {
  const steps = [
    {
      title: "Capacitación inicial",
      description: "Los participantes reciben formación básica en técnicas artesanales, seguridad y manejo de herramientas durante un período de 3 meses.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      )
    },
    {
      title: "Especialización",
      description: "Cada artesano se especializa en un área según sus habilidades e intereses: tallado en madera, elaboración de chorreadores, marcos decorativos u otras artesanías.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"></path>
          <path d="m18 9-6-6-6 6"></path>
          <path d="m6 12 6-6 6 6"></path>
          <path d="M12 6v12"></path>
        </svg>
      )
    },
    {
      title: "Producción",
      description: "Con el acompañamiento de maestros artesanos, comienzan a producir piezas para su venta, recibiendo un porcentaje de las ganancias que se destina a un fondo de ahorro.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2"></rect>
          <rect x="9" y="9" width="6" height="6"></rect>
          <line x1="9" y1="2" x2="9" y2="4"></line>
          <line x1="15" y1="2" x2="15" y2="4"></line>
          <line x1="9" y1="20" x2="9" y2="22"></line>
          <line x1="15" y1="20" x2="15" y2="22"></line>
          <line x1="20" y1="9" x2="22" y2="9"></line>
          <line x1="20" y1="14" x2="22" y2="14"></line>
          <line x1="2" y1="9" x2="4" y2="9"></line>
          <line x1="2" y1="14" x2="4" y2="14"></line>
        </svg>
      )
    },
    {
      title: "Desarrollo empresarial",
      description: "Se imparten talleres sobre emprendimiento, costos, marketing y servicio al cliente, preparándolos para establecer sus propios negocios al salir.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 7h-9"></path>
          <path d="M14 17H5"></path>
          <circle cx="17" cy="17" r="3"></circle>
          <circle cx="7" cy="7" r="3"></circle>
        </svg>
      )
    },
    {
      title: "Acompañamiento post-liberación",
      description: "Se ofrece apoyo para la reinserción laboral, incluyendo conexión con cooperativas artesanales, ferias y oportunidades de venta.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            Metodología
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-6">Proceso de rehabilitación y aprendizaje</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nuestro programa está diseñado como un camino integral que combina el desarrollo de habilidades artesanales con herramientas para la reinserción social y laboral.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-start gap-6 mb-12 relative">
              {/* Conector vertical */}
              {index < steps.length - 1 && (
                <div className="absolute top-16 left-6 md:left-10 w-0.5 h-24 bg-teal-200 hidden md:block"></div>
              )}
              
              {/* Icono */}
              <div className="bg-teal-100 rounded-full p-4 z-10">
                <div className="bg-teal-600 text-white rounded-full p-3">
                  {step.icon}
                </div>
              </div>
              
              {/* Contenido */}
              <div className="flex-1 bg-teal-50 rounded-lg p-6 border border-teal-100">
                <h3 className="text-xl font-semibold text-teal-800 mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-teal-700 text-white rounded-xl p-8 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-teal-600/30 rounded-full -mr-20 -mb-20"></div>
          <div className="absolute left-0 top-0 w-32 h-32 bg-teal-600/30 rounded-full -ml-10 -mt-10"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Resultados del programa</h3>
            <p className="text-teal-50 mb-6">
              A través de este proceso integral, logramos no solo enseñar un oficio, sino transformar vidas ofreciendo herramientas para:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2">Recuperar la autoestima</h4>
                <p className="text-sm text-teal-50">
                  El dominio de un oficio artesanal ayuda a restaurar el sentido de valor y capacidad personal.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2">Desarrollo profesional</h4>
                <p className="text-sm text-teal-50">
                  Adquisición de habilidades técnicas y empresariales para una futura independencia económica.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2">Reinserción efectiva</h4>
                <p className="text-sm text-teal-50">
                  Preparación completa para reintegrarse a la sociedad con herramientas concretas para subsistir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// impact/components/Collaborations.tsx - Server Component
function Collaborations() {
  const partners = [
    {
      name: "Asamblea Legislativa de Costa Rica",
      logo: "/logoasamble.webp",
      description: "Colabora en la implementación de políticas que apoyan los programas de reinserción social y ofrece espacios para la exposición y venta de artesanías en eventos oficiales.",
    },
    {
      name: "Grupo Café Britt",
      logo: "/img.webp",
      description: "Aliado estratégico que comercializa algunas de nuestras artesanías en sus tiendas, especialmente los chorreadores de café tradicionales, dándoles visibilidad nacional e internacional.",
    },
    {
      name: "Ministerio de Justicia y Paz",
      logo: "/img.webp",
      description: "Facilita el acceso a los centros penitenciarios y proporciona espacios adecuados para los talleres de formación y producción artesanal.",
    },
    {
      name: "Instituto Nacional de Aprendizaje (INA)",
      logo: "/img.webp",
      description: "Proporciona capacitación técnica certificada en diversas disciplinas artesanales, elevando la calidad de los productos y la empleabilidad de los participantes.",
    }
  ];

  const diputados = [
    "María Fernández Quirós", "Carlos Jiménez Mora", "Silvia Hernández Sánchez", 
    "Jonathan Acuña Soto", "Pilar Cisneros Gallo", "Rodrigo Arias Sánchez"
  ];

  return (
    <section className="py-20 bg-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            Alianzas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-6">Colaboraciones institucionales</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Trabajamos en alianza con instituciones públicas y privadas que apoyan nuestra misión de transformación social a través de la artesanía.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {partners.map((partner, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-teal-100 flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 flex items-center justify-center bg-white rounded-lg p-0">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={400}
                  height={0}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-800 mb-2">{partner.name}</h3>
                <p className="text-gray-600">{partner.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-teal-100">
          <h3 className="text-2xl font-semibold text-teal-800 mb-6 text-center">Apoyo de diputados en la Asamblea Legislativa</h3>
          <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
            Contamos con el respaldo de diversos diputados que han impulsado iniciativas legislativas para fortalecer los programas de reinserción social a través del arte y la artesanía.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {diputados.map((diputado, index) => (
              <div key={index} className="bg-teal-50 rounded-lg p-4 flex items-center gap-3">
                <div className="bg-teal-100 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <span className="font-medium text-gray-700">{diputado}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 italic">
              &quot;Este proyecto demuestra que la reinserción social es posible cuando se combina la voluntad política con el talento y la determinación de quienes buscan una segunda oportunidad.&quot;
            </p>
            <p className="mt-2 font-medium text-teal-700">— Rodrigo Arias Sánchez, Presidente de la Asamblea Legislativa 2022-2023</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkshopGallery() {
  const workshopImages = [
    {
      src: "/img.webp",
      alt: "Taller de tallado en madera",
      caption: "Taller de tallado en madera donde se elaboran figuras de animales autóctonos"
    },
    {
      src: "/img.webp",
      alt: "Elaboración de chorreadores de café",
      caption: "Proceso de creación de chorreadores de café tradicionales costarricenses"
    },
    {
      src: "/img.webp",
      alt: "Taller de marcos y espejos",
      caption: "Artesanos trabajando en marcos decorativos con motivos tropicales"
    },
    {
      src: "/img.webp",
      alt: "Trabajo en detalle de madera",
      caption: "Detalles finos en piezas decorativas inspiradas en la flora costarricense"
    },
    {
      src: "/img.webp",
      alt: "Capacitación técnica",
      caption: "Sesión de capacitación en técnicas avanzadas de acabado en madera"
    },
    {
      src: "/img.webp",
      alt: "Exhibición de artesanías",
      caption: "Muestra de productos finalizados listos para su comercialización"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            Nuestros talleres
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-6">Galería de los talleres</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conoce los espacios donde nuestros artesanos desarrollan sus habilidades y crean piezas únicas que combinan tradición costarricense con historias de superación personal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshopImages.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition group">
              <div className="relative h-64">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-fill transition-transform duration-300 group-hover:scale-105"
                  priority={index === 0}
                />
              </div>
              <div className="p-4">
                <p className="text-gray-700 text-sm">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-teal-700 rounded-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="md:w-1/3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Nuestros espacios de trabajo</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7"></path>
                    </svg>
                    <span>Áreas seguras y equipadas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7"></path>
                    </svg>
                    <span>Herramientas profesionales</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7"></path>
                    </svg>
                    <span>Materias primas de calidad</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7"></path>
                    </svg>
                    <span>Ambiente de aprendizaje</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-4">Formación artesanal de alta calidad</h3>
              <p className="text-teal-50 mb-6">
                Nuestros talleres están diseñados para proporcionar un entorno de aprendizaje profesional dentro de los centros penitenciarios. Contamos con maestros artesanos que guían el proceso creativo y transmiten técnicas tradicionales costarricenses.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-2">Especialidades artesanales</h4>
                  <ul className="text-sm text-teal-50 space-y-1">
                    <li>• Tallado en madera con motivos de fauna</li>
                    <li>• Elaboración de chorreadores tradicionales</li>
                    <li>• Marcos decorativos con diseños tropicales</li>
                    <li>• Adornos inspirados en la biodiversidad</li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-2">Certificación profesional</h4>
                  <p className="text-sm text-teal-50">
                    Al completar su formación, los artesanos reciben una certificación del INA que valida sus competencias técnicas, facilitando su futura inserción laboral.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function ArtisanTestimonials() {
  const testimonials = [
    {
      quote: "Nunca pensé que podría crear algo tan hermoso con mis propias manos. Este programa me ha devuelto la dignidad y me hace sentir orgulloso de lo que puedo lograr.",
      name: "José Antonio Campos",
      role: "Especialista en tallado de aves",
      image: "/home/face-m.webp",
      years: "2 años en el programa"
    },
    {
      quote: "Cada pieza que creo me conecta con mi tierra y me recuerda que tengo mucho que aportar. Estoy agradecido por la oportunidad de transformar mi vida a través del arte.",
      name: "Luisa Ramírez Mora",
      role: "Artesana de marcos decorativos",
      image: "/home/face-f.webp",
      years: "3 años en el programa"
    },
    {
      quote: "Aprender este oficio cambió mi perspectiva. Ahora sé que puedo ser productivo y crear belleza, incluso en las circunstancias más difíciles.",
      name: "Fernando Solís Gutiérrez",
      role: "Creador de chorreadores de café",
      image: "/home/face-m.webp",
      years: "18 meses en el programa"
    },
    {
      quote: "Este trabajo me ha enseñado paciencia y perseverancia. Me llena de esperanza saber que al salir tendré un oficio que me apasiona y me permitirá mantener a mi familia.",
      name: "María Elena Jiménez",
      role: "Artesana de adornos en madera",
      image: "/home/face-f.webp",
      years: "2 años y medio en el programa"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-6">La voz de nuestros artesanos</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Escucha directamente de los participantes cómo el programa ha impactado sus vidas y transformado su visión de futuro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-teal-50 rounded-xl p-6 border border-teal-100 relative">
              <div className="flex items-start gap-4">
                <div className="min-w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-teal-700 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 opacity-20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <blockquote className="italic text-gray-700 mb-4">{testimonial.quote}</blockquote>
                  <div className="mt-4">
                    <p className="font-semibold text-teal-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-teal-600 mt-1">{testimonial.years}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 border border-dashed border-teal-300 rounded-xl bg-teal-50/50">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-teal-800">El impacto en sus propias palabras</h3>
            <p className="text-gray-600 mt-2">
              Más allá de las estadísticas, estos testimonios reflejan el verdadero valor del programa en las vidas humanas.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-teal-700 mb-4">Beneficios personales expresados</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="bg-teal-100 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                        <path d="M12 8v8"></path>
                        <path d="M8 12h8"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Recuperación de la autoestima y dignidad</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-teal-100 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                        <path d="M12 8v8"></path>
                        <path d="M8 12h8"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Desarrollo de paciencia y disciplina</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-teal-100 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                        <path d="M12 8v8"></path>
                        <path d="M8 12h8"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Conexión con la identidad cultural costarricense</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-teal-100 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                        <path d="M12 8v8"></path>
                        <path d="M8 12h8"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Visión de futuro y esperanza</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-teal-700 text-white rounded-lg p-6 shadow-sm">
                <h4 className="text-lg font-semibold mb-4">Logros profesionales destacados</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      </svg>
                    </div>
                    <span className="text-teal-50">5 ex-participantes han establecido talleres propios</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      </svg>
                    </div>
                    <span className="text-teal-50">12 artesanos han participado en ferias nacionales</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      </svg>
                    </div>
                    <span className="text-teal-50">3 participantes han ganado premios de artesanía</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      </svg>
                    </div>
                    <span className="text-teal-50">7 se han integrado a cooperativas artesanales</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// impact/components/ReintegrationProgram.tsx - Server Component
 function ReintegrationProgram() {
  const reintegrationSteps = [
    {
      title: "Preparación pre-liberación",
      description: "Durante los últimos 6 meses de condena, se intensifica la formación en emprendimiento y habilidades comerciales.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="3" x2="9" y2="21"></line>
        </svg>
      )
    },
    {
      title: "Programa de mentorías",
      description: "Asignación de un mentor artesano externo que brinda acompañamiento durante la transición hacia la libertad.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      title: "Kit de herramientas",
      description: "Al ser liberados, los participantes reciben un kit básico de herramientas para iniciar su labor artesanal.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      )
    },
    {
      title: "Red de apoyo comercial",
      description: "Conexión con ferias, mercados y establecimientos aliados para la comercialización de sus productos.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            Reinserción Social
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-6">Programa de reinserción integral</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nuestro compromiso va más allá de la capacitación dentro del centro penitenciario. Acompañamos a los artesanos en su proceso de reinserción social y laboral.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {reintegrationSteps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-teal-100 shadow-sm hover:shadow-md transition text-center">
              <div className="inline-flex items-center justify-center bg-teal-100 rounded-full p-4 mb-4">
                <div className="text-teal-700">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image
                src="/img.webp"
                alt="Reinserción social a través del arte"
                fill
                className="object-fit"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h3 className="text-2xl font-bold text-teal-800 mb-4">Resultados del programa de reinserción</h3>
              <p className="text-gray-600 mb-6">
                Nuestro programa de reinserción ha mostrado resultados prometedores en la reducción de la reincidencia y la integración efectiva de ex-privados de libertad a la sociedad.
              </p>

              <div className="space-y-4">
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-teal-800">Tasa de reincidencia</span>
                    <span className="text-teal-700 font-bold">12%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Comparado con 35% del promedio nacional</p>
                </div>

                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-teal-800">Inserción laboral exitosa</span>
                    <span className="text-teal-700 font-bold">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Participantes empleados o con emprendimientos propios</p>
                </div>

                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-teal-800">Mejora en calidad de vida</span>
                    <span className="text-teal-700 font-bold">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Basado en encuestas de seguimiento</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-teal-700 text-white rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4">Alianzas para la reinserción efectiva</h3>
                <p className="text-teal-50 mb-6">
                  Trabajamos con diversas organizaciones e instituciones para asegurar que nuestros artesanos tengan todas las oportunidades para reintegrarse exitosamente a la sociedad y al mercado laboral.
                </p>
                <Link href="/alianzas" className="inline-flex items-center bg-white text-teal-700 font-medium px-5 py-2 rounded-lg hover:bg-teal-50 transition">
                  Conoce nuestros aliados
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-teal-600 p-4 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                  </div>
                  <div className="bg-teal-600 p-4 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <div className="bg-teal-600 p-4 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                  <div className="bg-teal-600 p-4 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-teal-800 mb-4">¿Quieres formar parte de esta transformación?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Buscamos constantemente empresas, instituciones y profesionales que deseen contribuir a nuestro programa de reinserción a través de diversas formas de colaboración.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contacto" className="bg-teal-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-teal-700 transition">
              Contactar
            </Link>
            <Link href="/programa-detalle" className="bg-white text-teal-700 font-medium px-6 py-3 rounded-lg border border-teal-200 hover:bg-teal-50 transition">
              Más información
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}