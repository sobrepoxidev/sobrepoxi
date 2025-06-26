// impact/page.tsx - Server Component
import Image from 'next/image';
import Link from 'next/link';
import { getCommonMetadata, buildTitle } from '@/lib/seo';
import type { Metadata } from "next";
type tParams = Promise<{ id: string, locale: string }>;
export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: buildTitle(locale === "es" ? "Impacto Social" : "Impact Social"),
    ...getCommonMetadata(locale),
  };
}

export default async function ImpactPage({ params }: { params: tParams }) {
  const { locale } = await params;
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-teal-800 text-white">
        <div className="absolute inset-0 z-0 lg:hidden">
          <Image
            src="/impact/banner.webp"
            alt="Impacto social"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        {/* 👉 Visible solo en pantallas lg en adelante */}
        <div className="absolute inset-0 z-0 hidden lg:block">
          <Image
            src="/impact/banner-lg.webp"
            alt="Impacto social"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
              {locale === 'es' ? 'Nuestro Impacto' : 'Our Impact'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{locale === 'es' ? 'Transformando vidas a través del arte' : 'Transforming lives through art'}</h1>
            <p className="text-xl text-teal-50 mb-8">
              {locale === 'es' ? 'Cada pieza artesanal representa una historia de esperanza, aprendizaje y segunda oportunidad para personas privadas de libertad en Costa Rica.' : 'Each handmade piece represents a story of hope, learning, and second chance for people in Costa Rica who have served time in prison.'}
            </p>
            <Link
              href="/impact#impact-stats"
              className="inline-flex items-center justify-center bg-white text-teal-800 hover:bg-teal-50 font-medium px-6 py-3 rounded-lg transition shadow-sm"
            >
              {locale === 'es' ? 'Descubre nuestro impacto' : 'Discover our impact'}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14l-7 7-7-7"></path>
                <path d="M19 10l-7 7-7-7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <ImpactStatistics locale={locale} />

      {/* Transformation Stories */}
      <TransformationStories locale={locale} />

      {/* Rehabilitation Process */}
      <RehabilitationProcess locale={locale} />

      {/* Collaborations */}
      <Collaborations locale={locale} />


      <WorkshopGallery locale={locale} />


      <ArtisanTestimonials locale={locale} />


      <ReintegrationProgram locale={locale} />

      {/* CTA Section */}
      <section className="bg-teal-700 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">{locale === 'es' ? 'Sé parte del cambio' : 'Be part of the change'}</h2>
            <p className="text-xl text-teal-50 mb-8">
              {locale === 'es' ? 'Al comprar nuestras artesanías, contribuyes directamente a este programa de impacto social y ayudas a transformar vidas.' : 'By purchasing our handmade crafts, you directly contribute to this social impact program and help transform lives.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-teal-700 hover:bg-teal-50 font-medium rounded-lg px-6 py-3 shadow-sm transition"
              >
                {locale === 'es' ? 'Explorar productos' : 'Explore products'}
              </Link>
              <Link
                href="/contact"
                className="border border-white/40 text-white hover:bg-white/10 font-medium rounded-lg px-6 py-3 transition"
              >
                {locale === 'es' ? 'Contactar para colaborar' : 'Contact us to collaborate'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// impact/components/ImpactStatistics.tsx - Server Component

function ImpactStatistics({ locale }: { locale: string }) {
  const stats = [
    { number: "25+", label: locale === 'es' ? 'Artesanos apoyados' : 'Artisans supported', description: locale === 'es' ? 'Personas privadas de libertad que han participado en nuestro programa' : 'People in prison who have participated in our program' },
    { number: "5", label: locale === 'es' ? 'Años de trayectoria' : 'Years of trajectory', description: locale === 'es' ? 'Transformando vidas a través del arte y la formación profesional' : 'Transforming lives through art and professional training' },
    { number: "70%", label: locale === 'es' ? 'Tasa de reinserción' : 'Reintegration rate', description: locale === 'es' ? 'De los participantes que han completado el programa' : 'Of the participants who have completed the program' },
    { number: "3,000+", label: locale === 'es' ? 'Artesanías vendidas' : 'Handmade crafts sold', description: locale === 'es' ? 'Creaciones que han llevado esperanza a hogares costarricenses' : 'Creations that have brought hope to Costa Rican homes' }
  ];

  return (
    <section id="impact-stats" className=" py-6 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            {locale === 'es' ? 'En números' : 'In numbers'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-6">{locale === 'es' ? 'Nuestro impacto en cifras' : 'Our impact in numbers'}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {locale === 'es' ? 'Desde 2020, trabajamos para transformar vidas a través de la artesanía, ofreciendo oportunidades de crecimiento y reinserción social a personas privadas de libertad.' : 'Since 2020, we have worked to transform lives through handicrafts, offering opportunities for growth and social reintegration to people in prison.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  <div className="text-5xl font-bold">{locale === 'es' ? '12' : '12'}</div>
                  <div className="text-sm mt-1">{locale === 'es' ? 'centros penales' : 'prison centers'}</div>
                </div>
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-2xl font-bold text-teal-800 mb-4">{locale === 'es' ? 'Presencia en centros penitenciarios' : 'Presence in prison centers'}</h3>
              <p className="text-gray-700 mb-4">
                {locale === 'es' ? 'Nuestro programa se ha expandido a 12 centros penitenciarios en Costa Rica, llevando oportunidades de formación y trabajo a diferentes regiones del país.' : 'Our program has expanded to 12 prison centers in Costa Rica, bringing opportunities for training and work to different regions of the country.'}
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
function TransformationStories({ locale }: { locale: string }) {
  const stories = [
    {
      name: "Marvin Alonso Brenes Oviedo",
      image: "/impact/artesano-Eduardo.webp",
      quote: locale === 'es' ? "Este proyecto me ha llenado de fortaleza y motivación. Ha impulsado mi crecimiento personal y profesional. Como publicista y diseñador gráfico de profesión, he podido aplicar mis conocimientos, compartiendo lo que he aprendido en la comunidad con mis compañeros privados de libertad. Les he enseñado la importancia de sentirse útiles, productivos, y de reconocer que todos podemos desarrollar nuestras habilidades, talentos y destrezas.\n\nAprender el valor del trabajo en equipo sirve como base para realizar labores dignas, sin tener que recurrir al crimen. Nos demuestra que, con esfuerzo y dedicación, podemos convertirnos en mejores personas cada día.\n\nTambién me ha ayudado a entender que esta prueba, este encierro, no es para siempre. La libertad llegará, y debemos estar preparados para valorar las oportunidades que se nos presenten.\n\nLa mayoría de personas privadas de libertad crecieron en barrios marginados, donde las oportunidades son escasas y donde las drogas y los homicidios son parte del día a día. Por eso, es fundamental que comprendan que sí es posible llevar una vida recta, sin importar de dónde vienen ni cómo crecieron. Pueden elegir el camino correcto, dejar atrás todo lo negativo y canalizar sus capacidades para sembrar en tierra fértil y construir un futuro mejor para ellos y sus familias." : "This project has filled me with strength and motivation. It has propelled my personal and professional growth. As a publicist and graphic designer by profession, I have been able to apply my knowledge, sharing what I have learned in the community with my fellow inmates. I have taught them the importance of feeling useful, productive, and recognizing that we can develop our skills, talents, and abilities.\n\nLearning the value of teamwork serves as a foundation for performing dignified work, without having to resort to crime. It demonstrates that with effort and dedication, we can become better people every day.\n\nIt has also helped me understand that this test, this imprisonment, is not forever. Freedom will come, and we must be prepared to value the opportunities that come our way.\n\nThe majority of inmates grew up in marginalized neighborhoods, where opportunities are scarce and where drugs and homicides are part of daily life. That is why it is fundamental that they understand that it is possible to lead a straight life, regardless of where they come from or how they grew up. They can choose the right path, leave behind all the negativity, and channel their capabilities to sow fertile ground and build a better future for them and their families.",
      story: locale === 'es' ? "Jorge pasó de no tener ninguna habilidad técnica a convertirse en uno de nuestros mejores talladores de madera. Sus diseños son de los más solicitados." : "Jorge passed from having no technical skills to becoming one of our best woodcarvers. His designs are the most requested.",
      beforeSkill: locale === 'es' ? "Ninguna experiencia en artesanía" : "No technical skills",
      afterSkill: locale === 'es' ? "Maestro tallador especializado en flora y fauna costarricense" : "Master woodcarver specializing in Costa Rican flora and fauna"
    },
    {
      name: "Eduardo Gutiérrez Salazar",

      image: "/impact/artesano-Jorge.webp",
      quote: locale === 'es' ? "A quién interese, el proyecto de Handmade Art ha sido una gran oportunidad para mí. A través de este proyecto, he podido cubrir mis necesidades básicas, como pasta de dientes, jabón, papel higiénico, etc. En mi situación, como persona privada de libertad, me ha ayudado a desarrollar habilidades que no sabía que tenía. He aprendido a hacer cosas que nunca pensé que podría lograr, lo cual me está preparando para un posible futuro, para crecer como persona y evitar volver a conductas delictivas. Muchísimas gracias." : "To those who are interested, the Handmade Art project has been a great opportunity for me. Through this project, I have been able to cover my basic needs, such as toothpaste, soap, toilet paper, etc. In my situation, as a prisoner, it has helped me develop skills that I did not know I had. I have learned to do things that I never thought I could achieve, which is preparing me for a possible future, to grow as a person and avoid criminal behavior. Thank you very much.",
      story: locale === 'es' ? "Durante sus tres años en el programa, Eduardo ha desarrollado técnicas innovadoras para trabajar con materiales reciclados, transformándolos en hermosas piezas decorativas." : "During his three years in the program, Eduardo has developed innovative techniques to work with recycled materials, transforming them into beautiful decorative pieces.",
      beforeSkill: locale === 'es' ? "Conocimientos básicos de costura" : "Basic sewing skills",
      afterSkill: locale === 'es' ? "Artesano especializado en upcycling y materiales sostenibles" : "Master upcycling and sustainable materials"
    },
    {
      name: "Jonathan A. Sandoval Martínez",
       image: "/impact/artesano-Jonathan.webp",
      quote: locale === 'es' ? "Recibe un cordial saludo de mi parte, Jonathan Sandoval Martínez. Te escribo para agradecerte por adquirir una de mis piezas de arte. Quiero que sepas que, a través de la artesanía, otras personas privadas de libertad y sus familias también se benefician, ya que este trabajo les ayuda a cubrir los gastos de las visitas. Para mí, es un honor formar parte de Handmade Art, ya que mejora mi vida y la de mi familia, al mismo tiempo que contribuyo a la sociedad mediante el arte. Saber que puedo retribuir a la sociedad me motiva, y ser visto como una persona productiva, dedicada y responsable con mis deberes me llena de orgullo. Este es mi mayor agradecimiento, ya que tengo una hija que padece leucemia, y a través del arte, con la ayuda de Handmade Art, estoy cubriendo los gastos médicos. Mi más sincero agradecimiento a Handmade Art." : "I cordial greeting from my part, Jonathan Sandoval Martínez. I write to thank you for acquiring one of my pieces of art. I want you to know that through craftsmanship, other inmates and their families also benefit, as this work helps cover the costs of visits. For me, it is an honor to be part of Handmade Art, as it improves my life and the lives of my family, at the same time contributing to society through art. Knowing that I can repay society motivates me, and being seen as a productive, dedicated, and responsible person with my duties fills me with pride. This is my greatest gratitude, as I have a daughter who suffers from leukemia, and through art, with the help of Handmade Art, I am covering medical expenses. My sincerest gratitude to Handmade Art.",
      story: locale === 'es' ? "Jonathan ha destacado en la creación de chorreadores de café tradicionales y marcos de espejo con toques modernos." : "Jonathan has excelled in creating traditional coffee drip-makers and modern mirror frames.",
      beforeSkill: locale === 'es' ? "Ninguna experiencia en artesanía" : "No technical skills",
      afterSkill: locale === 'es' ? "Artesano especializado en chorreadores de café y marcos de espejo" : "Master coffee drip-makers and mirror frames"
    }
  ];

  return (
    <section className="py-20 bg-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            {locale === 'es' ? 'Historias de éxito' : 'Success stories'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-6">{locale === 'es' ? 'Transformaciones personales' : 'Personal transformations'}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {locale === 'es' ? 'Conoce las historias de artesanos que han encontrado un nuevo camino a través de nuestro programa, desarrollando habilidades y reconstruyendo sus vidas.' : 'Get to know the stories of artisans who have found a new path through our program, developing skills and rebuilding their lives.'}
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
                  className="object-cover object-top"
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
                    <p className="text-sm text-gray-600">{locale === 'es' ? 'Antes' : 'Before'}: {story.beforeSkill}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    <p className="text-sm font-medium text-teal-700">{locale === 'es' ? 'Ahora' : 'Now'}: {story.afterSkill}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            {locale === 'es' ? 'Estas son solo algunas de las muchas historias de transformación que hemos presenciado a lo largo de estos 5 años.' : 'These are just a few of the many transformation stories we have witnessed over the past 5 years.'}
          </p>
          <Link
            href="/about"
            className="inline-flex items-center text-teal-700 hover:text-teal-800 font-medium"
          >
            {locale === 'es' ? 'Conoce más sobre nuestra misión' : 'Learn more about our mission'}
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
function RehabilitationProcess({ locale }: { locale: string }) {
  const steps = [
    {
      title: locale === 'es' ? 'Capacitación inicial' : 'Initial training',
      description: locale === 'es' ? "Los participantes reciben formación básica en técnicas artesanales, seguridad y manejo de herramientas durante un período de 3 meses." : "Participants receive basic training in artisanal techniques, safety, and tool handling for a period of 3 months.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      )
    },
    {
      title: locale === 'es' ? 'Especialización' : 'Specialization',
      description: locale === 'es' ? "Cada artesano se especializa en un área según sus habilidades e intereses: tallado en madera, elaboración de chorreadores, marcos decorativos u otras artesanías." : "Each artisan specializes in an area according to their skills and interests: wood carving, coffee drip-makers, decorative frames, or other crafts.",
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
      title: locale === 'es' ? 'Producción' : 'Production',
      description: locale === 'es' ? "Con el acompañamiento de maestros artesanos, comienzan a producir piezas para su venta, recibiendo un porcentaje de las ganancias que se destina a un fondo de ahorro." : "With the guidance of master artisans, they begin to produce pieces for sale, receiving a percentage of the profits that are destined for a savings fund.",
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
      title: locale === 'es' ? 'Desarrollo empresarial' : 'Business development',
      description: locale === 'es' ? "Se imparten talleres sobre emprendimiento, costos, marketing y servicio al cliente, preparándolos para establecer sus propios negocios al salir." : "Workshops on entrepreneurship, costs, marketing, and customer service are held, preparing them to establish their own businesses upon release.",
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
      title: locale === 'es' ? 'Acompañamiento post-liberación' : 'Post-release support',
      description: locale === 'es' ? "Se ofrece apoyo para la reinserción laboral, incluyendo conexión con cooperativas artesanales, ferias y oportunidades de venta." : "They receive support for reintegration into the labor market, including connecting with artisanal cooperatives, fairs, and sales opportunities.",
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
            {locale === 'es' ? 'Metodología' : 'Methodology'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-6">{locale === 'es' ? 'Proceso de rehabilitación y aprendizaje' : 'Rehabilitation and learning process'}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {locale === 'es' ? 'Nuestro programa está diseñado como un camino integral que combina el desarrollo de habilidades artesanales con herramientas para la reinserción social y laboral.' : 'Our program is designed as an integrated path that combines the development of artisanal skills with tools for social and labor reintegration.'}
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
            <h3 className="text-2xl font-bold mb-4">{locale === 'es' ? 'Resultados del programa' : 'Program results'}</h3>
            <p className="text-teal-50 mb-6">
              {locale === 'es' ? 'A través de este proceso integral, logramos no solo enseñar un oficio, sino transformar vidas ofreciendo herramientas para:' : 'Through this integrated process, we not only teach a trade, but transform lives by offering tools for:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2">{locale === 'es' ? 'Recuperar la autoestima' : 'Recover self-esteem'}</h4>
                <p className="text-sm text-teal-50">
                  {locale === 'es' ? 'El dominio de un oficio artesanal ayuda a restaurar el sentido de valor y capacidad personal.' : 'The mastery of an artisanal trade helps restore a sense of value and personal capacity.'}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2">{locale === 'es' ? 'Desarrollo profesional' : 'Professional development'}</h4>
                <p className="text-sm text-teal-50">
                  {locale === 'es' ? 'Adquisición de habilidades técnicas y empresariales para una futura independencia económica.' : 'Acquisition of technical and business skills for future economic independence.'}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2">{locale === 'es' ? 'Reinserción efectiva' : 'Effective reintegration'}</h4>
                <p className="text-sm text-teal-50">
                  {locale === 'es' ? 'Preparación completa para reintegrarse a la sociedad con herramientas concretas para subsistir.' : 'Complete preparation for reintegration into society with concrete tools for subsistence.'}
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
function Collaborations({ locale }: { locale: string }) {
  const partners = [
    {
      name: "Asamblea Legislativa de Costa Rica",
      logo: "/logoasamble.webp",
      description: locale === 'es' ? "Colabora en la implementación de políticas que apoyan los programas de reinserción social y ofrece espacios para la exposición y venta de artesanías en eventos oficiales." : "Collaborates in the implementation of policies that support social reintegration programs and offers spaces for the exhibition and sale of handicrafts at official events.",
    },
    {
      name: "Grupo Café Britt",
      logo: "/impact/logo-cafe-britt-.svg",
      description: locale === 'es' ? "Aliado estratégico que comercializa algunas de nuestras artesanías en sus tiendas, especialmente los chorreadores de café tradicionales, dándoles visibilidad nacional e internacional." : "Strategic partner that commercializes some of our handicrafts in their stores, especially traditional coffee presses, giving them national and international visibility.",
    },
    {
      name: "Ministerio de Justicia y Paz",
      logo: "/impact/Ministerio-de-Justicia y-Paz.webp",
      description: locale === 'es' ? "Facilita el acceso a los centros penitenciarios y proporciona espacios adecuados para los talleres de formación y producción artesanal." : "Facilitates access to prisons and provides appropriate spaces for training and handicraft production workshops.",
    },
    {
      name: "Instituto Nacional de Aprendizaje (INA)",
      logo: "/impact/ina-logo.webp",
      description: locale === 'es' ? "Proporciona capacitación técnica certificada en diversas disciplinas artesanales, elevando la calidad de los productos y la empleabilidad de los participantes." : "Provides certified technical training in various artisanal disciplines, improving the quality of products and employment prospects of participants.",
    }
  ];

  const diputados = [
    "Olga Morera Ortega (Firma principal)", "Rosalía Brown Young", "Fabricio Alvarado Muñoz", "José Pablo Sibaja Jiménez", "David Segura Gamboa", "Yonder Salas Durán",
    "Kattia Rivera Soto", "María Marta Padilla Bonilla", "Monserrat Ruiz Guevara", "Carlos Felipe García Molina", "Katherine Moreira Brown",
  ];

  return (
    <section className="py-20 bg-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            {locale === 'es' ? 'Alianzas' : 'Partnerships'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-6">{locale === 'es' ? 'Colaboraciones institucionales' : 'Institutional Collaborations'}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {locale === 'es' ? 'Trabajamos en alianza con instituciones públicas y privadas que apoyan nuestra misión de transformación social a través de la artesanía.' : 'We work in partnership with public and private institutions that support our mission of social transformation through handicrafts.'}
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
          <h3 className="text-2xl font-semibold text-teal-800 mb-6 text-center">{locale === 'es' ? 'Apoyo de diputados en la Asamblea Legislativa' : 'Legislative Support in the Legislative Assembly'}</h3>
          <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
            {locale === 'es' ? 'Contamos con el respaldo de diversos diputados que han impulsado iniciativas legislativas para fortalecer los programas de reinserción social a través del arte y la artesanía.' : 'We have the support of various legislators who have promoted legislative initiatives to strengthen social reintegration programs through art and handicrafts.'}
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

function WorkshopGallery({ locale }: { locale: string }) {
  const workshopImages = [
    {
      src: "/impact/Taller-de-tallado-animales.webp",
      alt: locale === 'es' ? "Taller de tallado en madera" : "Taller of wood carving",
      caption: locale === 'es' ? "Taller de tallado en madera donde se elaboran figuras de animales autóctonos" : "Taller of wood carving where animal figures are carved"
    },
    {
      src: "/impact/Taller-de-creacion-de-chorreadores-de-cafe.webp",
      alt: locale === 'es' ? "Elaboración de chorreadores de café" : "Coffee pot making",
      caption: locale === 'es' ? "Proceso de creación de chorreadores de café tradicionales costarricenses" : "Process of creating traditional Costa Rican coffee pots"
    },
    {
      src: "/impact/Taller-de-marcos-y-espejos.webp",
      alt: locale === 'es' ? "Taller de marcos y espejos" : "Taller of frames and mirrors",
      caption: locale === 'es' ? "Artesanos trabajando en marcos decorativos con motivos tropicales" : "Artisans working on decorative frames with tropical motifs"
    },
    {
      src: "/impact/Taller-de-detalle-de-madera.webp",
      alt: locale === 'es' ? "Trabajo en detalle de madera" : "Wood carving work",
      caption: locale === 'es' ? "Detalles finos en piezas decorativas inspiradas en la flora costarricense" : "Fine details in decorative pieces inspired by Costa Rican flora"
    },
    {
      src: "/impact/Taller-de-capacitacion-tecnica.webp",
      alt: locale === 'es' ? "Capacitación técnica" : "Technical training",
      caption: locale === 'es' ? "Sesión de capacitación en técnicas avanzadas de acabado en madera" : "Session of technical training in advanced wood finishing techniques"
    },
    {
      src: "/impact/Taller-de-exhibicion.webp",
      alt: locale === 'es' ? "Exhibición de artesanías" : "Artisan exhibition",
      caption: locale === 'es' ? "Muestra de productos finalizados listos para su comercialización" : "Show of finished products ready for commercialization"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            {locale === 'es' ? 'Nuestros talleres' : 'Our Workshops'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-6">{locale === 'es' ? 'Galería de los talleres' : 'Workshop Gallery'}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {locale === 'es' ? 'Conoce los espacios donde nuestros artesanos desarrollan sus habilidades y crean piezas únicas que combinan tradición costarricense con historias de superación personal.' : 'Discover the spaces where our artisans develop their skills and create unique pieces that combine Costa Rican tradition with stories of personal overcoming.'}
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
                <h3 className="text-xl font-bold mb-4">{locale === 'es' ? 'Nuestros espacios de trabajo' : 'Our Workspaces'}</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7"></path>
                    </svg>
                    <span>{locale === 'es' ? 'Áreas seguras y equipadas' : 'Safe and equipped areas'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7"></path>
                    </svg>
                    <span>{locale === 'es' ? 'Herramientas profesionales' : 'Professional tools'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7"></path>
                    </svg>
                    <span>{locale === 'es' ? 'Materias primas de calidad' : 'High-quality raw materials'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7"></path>
                    </svg>
                    <span>{locale === 'es' ? 'Ambiente de aprendizaje' : 'Learning environment'}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-4">{locale === 'es' ? 'Formación artesanal de alta calidad' : 'High-quality artisanal training'}</h3>
              <p className="text-teal-50 mb-6">
                {locale === 'es' ? 'Nuestros talleres están diseñados para proporcionar un entorno de aprendizaje profesional dentro de los centros penitenciarios. Contamos con maestros artesanos que guían el proceso creativo y transmiten técnicas tradicionales costarricenses.' : 'Our workshops are designed to provide a professional learning environment within prisons. We have master artisans who guide the creative process and transmit traditional Costa Rican techniques.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-2">{locale === 'es' ? 'Especialidades artesanales' : 'Artisanal specialties'}</h4>
                  <ul className="text-sm text-teal-50 space-y-1">
                    <li>• {locale === 'es' ? 'Tallado en madera con motivos de fauna' : 'Wood carving with animal motifs'}</li>
                    <li>• {locale === 'es' ? 'Elaboración de chorreadores tradicionales' : 'Traditional coffee pot making'}</li>
                    <li>• {locale === 'es' ? 'Marcos decorativos con diseños tropicales' : 'Decorative frames with tropical designs'}</li>
                    <li>• {locale === 'es' ? 'Adornos inspirados en la biodiversidad' : 'Decorations inspired by biodiversity'}</li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-2">{locale === 'es' ? 'Certificación profesional' : 'Professional certification'}</h4>
                  <p className="text-sm text-teal-50">
                    {locale === 'es' ? 'Al completar su formación, los artesanos reciben una certificación del INA que valida sus competencias técnicas, facilitando su futura inserción laboral.' : 'Upon completing their training, artisans receive a certification from the INA validating their technical skills, facilitating their future employment.'}
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


function ArtisanTestimonials({ locale }: { locale: string }) {
  const testimonials = [
    {
      quote: locale === 'es' ? "Este proyecto me ha enseñado muchas cosas. He aprendido nuevas habilidades, cómo sobrevivir, y me ha llenado de fuerza para seguir adelante. Me ayuda a aprender mucho más sobre este proyecto." : "This project has taught me many things. I have learned new skills, how to survive, and it has filled me with strength to keep going. It helps me learn much more about this project.",
      name: "Mario Gerson Ugalde Aguilar",
      role: locale === 'es' ? "Especialista en tallado de aves" : "Specialist in bird carving",
      image: "/home/face-m.webp",
      years: locale === 'es' ? "2 años en el programa" : "2 years in the program"
    },
    {
      quote: locale === 'es' ? "Handmade Art, le agradezco a Dios todos los días al despertar, porque cada día me levanto con un poco de trabajo, creando esas hermosas piezas que realizamos a diario. Nos esforzamos por crear cosas cada vez más bellas para superarnos como personas y como trabajadores. Nuestro objetivo es hacer lo mejor posible para que las personas se sientan satisfechas con nuestro trabajo cada día que pasa." : "Handmade Art, I thank God every day when I wake up, because every day I wake up with a little work, creating those beautiful pieces we make every day. We strive to create things every day more beautiful to improve ourselves as people and workers. Our goal is to do the best possible so that people feel satisfied with our work every day that passes.",
      name: "Ángel Muñoz Azofeifa",
      role: locale === 'es' ? "Artesano de marcos decorativos" : "Decorative frame artisan",
      image: "/home/face-m.webp",
      years: locale === 'es' ? "3 años en el programa" : "3 years in the program"
    },
    {
      quote: locale === 'es' ? "Me gusta este proyecto de artesanía porque con él he desarrollado habilidades que tenía ocultas, además me veo en un futuro teniendo mi propio taller de ebanistería en la calle, y con el crecer como persona y empresario poder mantenerme económicamente y ayudar a mi familia y a otras personas, como trabajadores de mi futura empresa." : "I like this artisanal project because with it I have developed skills that I had hidden, besides I see in the future having my own cabinet shop on the street, and with the growth as a person and entrepreneur I can maintain myself economically and help my family and other people, as workers of my future company.",
      name: "Jorge Vinicio Guzmán Guzmán",
      role: locale === 'es' ? "Creador de chorreadores de café" : "Cafepot maker",
      image: "/home/face-m.webp",
      years: locale === 'es' ? "18 meses en el programa" : "18 months in the program"
    },
    {
      quote: locale === 'es' ? "Este proyecto me ha ayudado a desarrollar mis habilidades y el don que Dios me ha dado, permitiéndome explotarlo al máximo. También me ha ayudado a ser una mejor persona y a vivir de los talentos con los que Dios me ha bendecido. Es una forma de cubrir mis necesidades personales." : "This project has helped me develop my skills and the gift that God has given me, allowing me to exploit it to the maximum. It has also helped me to be a better person and live off the talents with which God has blessed me. It is a way of covering my personal needs.",
      name: "Didier Hernández Obando",
      role: locale === 'es' ? "Artesano de adornos en madera" : "Woodcarving artisan",
      image: "/home/face-m.webp",
      years: locale === 'es' ? "2 años y medio en el programa" : "2 years and a half in the program"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            {locale === 'es' ? 'Testimonios' : 'Testimonials'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-6">{locale === 'es' ? 'La voz de nuestros artesanos' : 'The voice of our artisans'}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {locale === 'es' ? 'Escucha directamente de los participantes cómo el programa ha impactado sus vidas y transformado su visión de futuro.' : 'Listen directly from the participants how the program has impacted their lives and transformed their vision of the future.'}
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
            <h3 className="text-2xl font-bold text-teal-800">{locale === 'es' ? 'El impacto en sus propias palabras' : 'The impact in their own words'}</h3>
            <p className="text-gray-600 mt-2">
              {locale === 'es' ? 'Más allá de las estadísticas, estos testimonios reflejan el verdadero valor del programa en las vidas humanas.' : 'Beyond statistics, these testimonials reflect the true value of the program in human lives.'}
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-teal-700 mb-4">{locale === 'es' ? 'Beneficios personales expresados' : 'Expressed personal benefits'}</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="bg-teal-100 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                        <path d="M12 8v8"></path>
                        <path d="M8 12h8"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">{locale === 'es' ? 'Recuperación de la autoestima y dignidad' : 'Recovery of self-esteem and dignity'}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-teal-100 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                        <path d="M12 8v8"></path>
                        <path d="M8 12h8"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">{locale === 'es' ? 'Desarrollo de paciencia y disciplina' : 'Development of patience and discipline'}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-teal-100 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                        <path d="M12 8v8"></path>
                        <path d="M8 12h8"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">{locale === 'es' ? 'Conexión con la identidad cultural costarricense' : 'Connection with Costa Rican cultural identity'}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-teal-100 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                        <path d="M12 8v8"></path>
                        <path d="M8 12h8"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">{locale === 'es' ? 'Visión de futuro y esperanza' : 'Future vision and hope'}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-teal-700 text-white rounded-lg p-6 shadow-sm">
                <h4 className="text-lg font-semibold mb-4">{locale === 'es' ? 'Logros profesionales destacados' : 'Notable professional achievements'}</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      </svg>
                    </div>
                    <span className="text-teal-50">{locale === 'es' ? '5 ex-participantes han establecido talleres propios' : '5 former participants have established their own workshops'}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      </svg>
                    </div>
                    <span className="text-teal-50">{locale === 'es' ? '12 artesanos han participado en ferias nacionales' : '12 artisans have participated in national fairs'}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      </svg>
                    </div>
                    <span className="text-teal-50">{locale === 'es' ? '3 participantes han ganado premios de artesanía' : '3 participants have won artisan awards'}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      </svg>
                    </div>
                    <span className="text-teal-50">{locale === 'es' ? '7 se han integrado a cooperativas artesanales' : '7 have joined artisan cooperatives'}</span>
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
function ReintegrationProgram({ locale }: { locale: string }) {
  const reintegrationSteps = [
    {
      title: locale === 'es' ? 'Preparación pre-liberación' : 'Pre-release preparation',
      description: locale === 'es' ? 'Durante los últimos 6 meses de condena, se intensifica la formación en emprendimiento y habilidades comerciales.' : 'During the last 6 months of imprisonment, intensive training in entrepreneurship and commercial skills is intensified.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="3" x2="9" y2="21"></line>
        </svg>
      )
    },
    {
      title: locale === 'es' ? 'Programa de mentorías' : 'Mentorship program',
      description: locale === 'es' ? 'Asignación de un mentor artesano externo que brinda acompañamiento durante la transición hacia la libertad.' : 'Assignment of an external artisan mentor who provides support during the transition to freedom.',
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
      title: locale === 'es' ? 'Kit de herramientas' : 'Tool kit',
      description: locale === 'es' ? 'Al ser liberados, los participantes reciben un kit básico de herramientas para iniciar su labor artesanal.' : 'Upon release, participants receive a basic tool kit to start their artisanal work.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      )
    },
    {
      title: locale === 'es' ? 'Red de apoyo comercial' : 'Commercial support network',
      description: locale === 'es' ? 'Conexión con ferias, mercados y establecimientos aliados para la comercialización de sus productos.' : 'Connection with fairs, markets, and allied establishments for the commercialization of their products.',
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
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-6">{locale === 'es' ? 'Programa de reinserción integral' : 'Integral reintegration program'}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {locale === 'es' ? 'Nuestro compromiso va más allá de la capacitación dentro del centro penitenciario. Acompañamos a los artesanos en su proceso de reinserción social y laboral.' : 'Our commitment goes beyond training within the prison. We accompany artisans in their social and labor reintegration process.'}
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
                src="/impact/goals.webp"
                alt="Reinserción social a través del arte"
                fill
                className="object-fit"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h3 className="text-2xl font-bold text-teal-800 mb-4">{locale === 'es' ? 'Resultados del programa de reinserción' : 'Reintegration program results'}</h3>
              <p className="text-gray-600 mb-6">
                {locale === 'es' ? 'Nuestro programa de reinserción ha mostrado resultados prometedores en la reducción de la reincidencia y la integración efectiva de ex-privados de libertad a la sociedad.' : 'Our reintegration program has shown promising results in reducing recidivism and effectively integrating former prisoners into society.'}
              </p>

              <div className="space-y-4">
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-teal-800">{locale === 'es' ? 'Tasa de reincidencia' : 'Recidivism rate'}</span>
                    <span className="text-teal-700 font-bold">12%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{locale === 'es' ? 'Comparado con 35% del promedio nacional' : 'Compared to 35% of the national average'}</p>
                </div>

                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-teal-800">{locale === 'es' ? 'Inserción laboral exitosa' : 'Successful labor insertion'}</span>
                    <span className="text-teal-700 font-bold">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{locale === 'es' ? 'Participantes empleados o con emprendimientos propios' : 'Participants employed or with their own businesses'}</p>
                </div>

                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-teal-800">{locale === 'es' ? 'Mejora en calidad de vida' : 'Quality of life improvement'}</span>
                    <span className="text-teal-700 font-bold">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{locale === 'es' ? 'Basado en encuestas de seguimiento' : 'Based on follow-up surveys'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-teal-700 text-white rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4">{locale === 'es' ? 'Alianzas para la reinserción efectiva' : 'Effective reintegration alliances'}</h3>
                <p className="text-teal-50 mb-6">
                  {locale === 'es' ? 'Trabajamos con diversas organizaciones e instituciones para asegurar que nuestros artesanos tengan todas las oportunidades para reintegrarse exitosamente a la sociedad y al mercado laboral.' : 'We work with various organizations and institutions to ensure that our artisans have all the opportunities to successfully reintegrate into society and the labor market.'}
                </p>
                <Link href="/alianzas" className="inline-flex items-center bg-white text-teal-700 font-medium px-5 py-2 rounded-lg hover:bg-teal-50 transition">
                  {locale === 'es' ? 'Conoce nuestros aliados' : 'Learn about our allies'}
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
          <h3 className="text-2xl font-bold text-teal-800 mb-4">{locale === 'es' ? '¿Quieres formar parte de esta transformación?' : 'Are you part of this transformation?'}</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {locale === 'es' ? 'Buscamos constantemente empresas, instituciones y profesionales que deseen contribuir a nuestro programa de reinserción a través de diversas formas de colaboración.' : 'We constantly seek companies, institutions, and professionals who wish to contribute to our reintegration program through various forms of collaboration.'}
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contacto" className="bg-teal-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-teal-700 transition">
              {locale === 'es' ? 'Contactar' : 'Contact'}
            </Link>
            <Link href="/programa-detalle" className="bg-white text-teal-700 font-medium px-6 py-3 rounded-lg border border-teal-200 hover:bg-teal-50 transition">
              {locale === 'es' ? 'Más información' : 'More information'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}