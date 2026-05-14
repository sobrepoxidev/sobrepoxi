'use client';

import React from 'react';
import Image from 'next/image';
import { ProductsProvider, OptimizedGridSection } from '@/features/products';
import type { Database } from '@/shared/types/database';
import { Link } from '@/shared/i18n/navigation';
import { useLocale } from 'next-intl';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Factory,
  Gem,
  Hammer,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  Star,
  TreePine,
} from 'lucide-react';

type Product = Database['products'];
type Category = Database['categories'];

interface OptimizedNewHomeProps {
  initialCategories?: Category[];
  initialProducts?: Product[];
  locale?: string;
}

const whatsappHref = 'https://wa.me/+50685850000?text=Hola%20SobrePoxi%2C%20quiero%20cotizar%20un%20proyecto';

const copy = {
  es: {
    eyebrow: 'Atelier técnico en Costa Rica',
    headline: 'Resina epóxica, madera y pisos de alto valor.',
    sub: 'Diseñamos e instalamos acabados epóxicos para hogares, comercios e industria, con piezas a medida que se sienten tan sólidas como se ven.',
    whatsapp: 'Cotizar por WhatsApp',
    products: 'Ver Productos',
    contact: 'Contacto',
    proof: ['500+ proyectos', '10+ años', 'Garantía total', '4.9 calificación'],
    divisionsKicker: 'Tres líneas, un estándar',
    divisionsTitle: 'Del taller artesanal a la planta industrial',
    shopKicker: 'Tienda y proyectos',
    shopTitle: 'Categorías con intención comercial',
    shopText: 'Explora piezas listas, materiales y líneas de trabajo. Si una categoría todavía no muestra inventario, la convertimos en cotización a medida.',
    whyKicker: 'Por qué SobrePoxi',
    whyTitle: 'Lujo que también resiste trabajo real',
    processKicker: 'Proceso claro',
    processTitle: 'De la primera idea a la entrega protegida',
    testimonialsKicker: 'Confianza local',
    testimonialsTitle: 'Clientes que buscaban acabado, resistencia y criterio',
    finalTitle: 'Hablemos de tu espacio.',
    finalText: 'Cuéntanos medidas, uso y acabado deseado. Te orientamos con materiales, tiempos y presupuesto sin compromiso.',
  },
  en: {
    eyebrow: 'Technical atelier in Costa Rica',
    headline: 'Epoxy resin, wood, and high-value floors.',
    sub: 'We design and install epoxy finishes for homes, businesses, and industrial spaces, with custom pieces that feel as solid as they look.',
    whatsapp: 'Quote on WhatsApp',
    products: 'View Products',
    contact: 'Contact',
    proof: ['500+ projects', '10+ years', 'Full warranty', '4.9 rating'],
    divisionsKicker: 'Three lines, one standard',
    divisionsTitle: 'From artisan workshop to industrial plant',
    shopKicker: 'Shop and projects',
    shopTitle: 'Categories with commercial intent',
    shopText: 'Browse ready pieces, materials, and work lines. If a category has no visible stock yet, we turn it into a custom quote.',
    whyKicker: 'Why SobrePoxi',
    whyTitle: 'Luxury that also withstands real work',
    processKicker: 'Clear process',
    processTitle: 'From first idea to protected delivery',
    testimonialsKicker: 'Local trust',
    testimonialsTitle: 'Clients who needed finish, resistance, and judgment',
    finalTitle: 'Tell us about your space.',
    finalText: 'Share measurements, use case, and desired finish. We guide you on materials, timing, and budget with no commitment.',
  },
};

function getCopy(locale: string) {
  return locale === 'en' ? copy.en : copy.es;
}

function HeroSection({ locale }: { locale: string }) {
  const c = getCopy(locale);

  return (
    <section className="relative isolate overflow-hidden bg-[oklch(16%_0.018_63)] text-stone-50">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,oklch(63%_0.12_72_/_0.22),transparent_34%),linear-gradient(135deg,oklch(18%_0.018_62),oklch(10%_0.012_48)_58%,oklch(20%_0.04_132))]" />
      <div className="absolute inset-0 -z-10 opacity-[0.09] [background-image:linear-gradient(90deg,oklch(86%_0.04_78_/_0.22)_1px,transparent_1px),linear-gradient(oklch(86%_0.04_78_/_0.18)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="mx-auto grid min-h-[calc(100svh-104px)] w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-stone-950/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200 shadow-[0_0_0_1px_oklch(70%_0.09_74_/_0.08)] backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {c.eyebrow}
          </div>

          <h1 className="font-display mt-7 max-w-[12ch] text-balance text-[clamp(3.15rem,9vw,7.4rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-stone-50">
            {c.headline}
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-base leading-8 text-stone-300 sm:text-lg">
            {c.sub}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={whatsappHref} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[oklch(80%_0.13_78)] px-6 py-3 text-sm font-bold text-stone-950 shadow-[0_18px_48px_oklch(70%_0.12_74_/_0.24)] transition-[transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-[oklch(86%_0.12_82)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 active:scale-[0.98]">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {c.whatsapp}
            </Link>
            <Link href="/products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-stone-200/18 bg-stone-50/7 px-6 py-3 text-sm font-semibold text-stone-50 backdrop-blur-sm transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-amber-200/45 hover:bg-stone-50/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 active:scale-[0.98]">
              {c.products}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-stone-200 underline decoration-amber-300/40 underline-offset-8 transition-colors duration-300 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950">
              {c.contact}
            </Link>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-stone-50/12 pt-6 sm:grid-cols-4">
            {c.proof.map((item) => {
              const [value, ...labelParts] = item.split(' ');
              return (
                <div key={item}>
                  <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">{labelParts.join(' ')}</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold tracking-tight text-stone-50 tabular-nums">{value}</dd>
                </div>
              );
            })}
          </dl>
        </div>

        <div className="relative min-h-[420px] lg:min-h-[640px]">
          <div className="absolute left-0 top-4 w-[68%] overflow-hidden rounded-[2rem] border border-amber-100/12 bg-stone-900 shadow-[0_30px_90px_oklch(5%_0.02_40_/_0.55)] sm:rounded-[2.5rem]">
            <Image src="/home/industrial-floor.webp" alt={locale === 'es' ? 'Piso epóxico industrial con acabado brillante' : 'Industrial epoxy floor with a polished finish'} width={760} height={980} priority className="h-[420px] w-full object-cover sm:h-[560px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 rounded-full bg-stone-950/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100 backdrop-blur-md">
              {locale === 'es' ? 'Pisos industriales' : 'Industrial floors'}
            </span>
          </div>
          <div className="absolute right-0 top-24 w-[45%] overflow-hidden rounded-[1.5rem] border border-stone-50/14 bg-stone-900 shadow-[0_24px_60px_oklch(5%_0.02_40_/_0.45)] sm:rounded-[2rem]">
            <Image src="/mesariomain.webp" alt={locale === 'es' ? 'Mesa de madera y resina epóxica hecha a medida' : 'Custom wood and epoxy resin table'} width={420} height={520} className="h-[250px] w-full object-cover sm:h-[340px]" />
            <span className="absolute bottom-4 left-4 rounded-full bg-stone-950/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100 backdrop-blur-md">
              {locale === 'es' ? 'Madera y resina' : 'Wood and resin'}
            </span>
          </div>
          <div className="absolute bottom-4 right-8 w-[54%] overflow-hidden rounded-[1.75rem] border border-stone-50/14 bg-stone-900 shadow-[0_24px_70px_oklch(5%_0.02_40_/_0.5)]">
            <Image src="/home/luxury-floor.webp" alt={locale === 'es' ? 'Piso epóxico residencial de lujo con acabado continuo' : 'Luxury residential epoxy floor with seamless finish'} width={540} height={420} className="h-[230px] w-full object-cover sm:h-[300px]" />
            <span className="absolute bottom-4 left-4 rounded-full bg-stone-950/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100 backdrop-blur-md">
              {locale === 'es' ? 'Acabados premium' : 'Premium finishes'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustMarquee({ locale }: { locale: string }) {
  const items = locale === 'es'
    ? ['Pisos epóxicos', 'Muebles de lujo', 'River tables', 'Pisos industriales', 'Diseño 3D', 'Resina epóxica', 'Hecho en Costa Rica', 'A tu medida']
    : ['Epoxy floors', 'Luxury furniture', 'River tables', 'Industrial floors', '3D design', 'Epoxy resin', 'Made in Costa Rica', 'Custom made'];

  const row = items.map((item) => (
    <span key={item} className="flex shrink-0 items-center gap-5">
      <span className="text-sm font-semibold uppercase tracking-[0.26em] text-stone-300/70">{item}</span>
      <span className="h-1.5 w-1.5 rounded-full bg-amber-300/70" aria-hidden="true" />
    </span>
  ));

  return (
    <div className="relative overflow-hidden border-y border-stone-50/10 bg-[oklch(13%_0.016_58)] py-5">
      <div className="flex gap-5 animate-marquee motion-reduce:animate-none">{row}{row}{row}</div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[oklch(13%_0.016_58)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[oklch(13%_0.016_58)] to-transparent" />
    </div>
  );
}

function ServicesSection({ locale }: { locale: string }) {
  const c = getCopy(locale);
  const services = locale === 'es'
    ? [
        { icon: Factory, title: 'Pisos Epóxicos Industriales', desc: 'Sistemas para bodegas, plantas, talleres y estacionamientos con resistencia química y mecánica.', href: '/industrial-epoxy-flooring', img: 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/industrial-floor.webp', tag: 'Industrial' },
        { icon: Gem, title: 'Pisos Epóxicos de Lujo', desc: 'Acabados tipo mármol, espejo, metálico y 3D para residencias, oficinas y comercios premium.', href: '/epoxy-floors', img: 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/luxury-floor.webp', tag: 'Residencial' },
        { icon: TreePine, title: 'Muebles de Lujo', desc: 'Mesas river table, barras, escritorios y piezas únicas en madera y resina epóxica.', href: '/luxury-furniture', img: 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/hero_banner2-UU5JSGUliJzY8K0pdtxeg0AeGpHaUq.webp', tag: 'Artesanal' },
      ]
    : [
        { icon: Factory, title: 'Industrial Epoxy Flooring', desc: 'Systems for warehouses, plants, workshops, and parking areas with chemical and mechanical resistance.', href: '/industrial-epoxy-flooring', img: 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/industrial-floor.webp', tag: 'Industrial' },
        { icon: Gem, title: 'Luxury Epoxy Floors', desc: 'Marble, mirror, metallic, and 3D finishes for residences, offices, and premium commercial spaces.', href: '/epoxy-floors', img: 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/luxury-floor.webp', tag: 'Residential' },
        { icon: TreePine, title: 'Luxury Furniture', desc: 'River tables, bars, desks, and unique pieces in wood and epoxy resin.', href: '/luxury-furniture', img: 'https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/pacific-xl/main2.webp', tag: 'Artisan' },
      ];

  return (
    <section className="bg-[oklch(92%_0.018_80)] px-4 py-16 text-stone-950 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[oklch(42%_0.09_73)]">{c.divisionsKicker}</p>
            <h2 className="font-display mt-4 max-w-xl text-balance text-[clamp(2.35rem,5.5vw,5.25rem)] font-semibold leading-[0.94] tracking-[-0.055em]">{c.divisionsTitle}</h2>
          </div>
          <p className="max-w-2xl text-pretty text-base leading-8 text-stone-700 sm:text-lg">
            {locale === 'es'
              ? 'Cada línea comparte el mismo criterio: diagnóstico del uso real, materiales correctos, muestra visual y ejecución cuidada hasta el último borde.'
              : 'Every line shares one standard: real-use diagnosis, correct materials, visual sampling, and careful execution down to the last edge.'}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {services.map((service) => (
            <Link key={service.title} href={service.href} className="group relative min-h-[430px] overflow-hidden rounded-[1.75rem] bg-stone-950 text-stone-50 shadow-[0_24px_60px_oklch(31%_0.05_70_/_0.18)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_32px_80px_oklch(31%_0.05_70_/_0.26)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(92%_0.018_80)]">
              <Image src={service.img} alt={service.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-[1.04]" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-stone-950/6" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-stone-950/55 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-100 backdrop-blur-sm">
                  <service.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {service.tag}
                </span>
                <h3 className="font-display mt-5 text-3xl font-semibold leading-none tracking-[-0.035em]">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-300">{service.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-amber-200">
                  {locale === 'es' ? 'Explorar línea' : 'Explore line'}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsIntro({ locale }: { locale: string }) {
  const c = getCopy(locale);
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-6 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[0.82fr_1fr] lg:px-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-300/85">{c.shopKicker}</p>
        <h2 className="font-display mt-4 text-balance text-[clamp(2.3rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-stone-50">{c.shopTitle}</h2>
      </div>
      <div className="self-end">
        <p className="max-w-2xl text-pretty text-base leading-8 text-stone-300 sm:text-lg">{c.shopText}</p>
        <Link href="/products" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-amber-200 transition-colors duration-300 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950">
          {locale === 'es' ? 'Ver catálogo completo' : 'View full catalog'}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

function WhyChooseUsSection({ locale }: { locale: string }) {
  const c = getCopy(locale);
  const features = locale === 'es'
    ? [
        { icon: Shield, title: 'Garantía Total', desc: 'Tu inversión queda respaldada por un equipo que responde por materiales, instalación y acabado.' },
        { icon: Award, title: 'Materiales Premium', desc: 'Trabajamos resinas, pigmentos y sellos seleccionados para cada uso, no una receta única.' },
        { icon: Hammer, title: 'A Medida', desc: 'Diseñamos según tránsito, humedad, estilo visual, mantenimiento y presupuesto.' },
        { icon: Sparkles, title: 'Acabado Exclusivo', desc: 'Mármol, metálico, espejo, vetas y combinaciones con madera real.' },
        { icon: Factory, title: 'Criterio Técnico', desc: 'Diagnóstico del sustrato, preparación correcta y sistemas de alto desempeño.' },
        { icon: CheckCircle2, title: 'Experiencia Real', desc: 'Más de 500 proyectos ejecutados en Costa Rica y la región.' },
      ]
    : [
        { icon: Shield, title: 'Full Warranty', desc: 'Your investment is backed by a team accountable for materials, installation, and finish.' },
        { icon: Award, title: 'Premium Materials', desc: 'We choose resins, pigments, and sealers for each use case, not a single recipe.' },
        { icon: Hammer, title: 'Custom Made', desc: 'We design around traffic, humidity, visual style, maintenance, and budget.' },
        { icon: Sparkles, title: 'Exclusive Finish', desc: 'Marble, metallic, mirror, veining, and combinations with real wood.' },
        { icon: Factory, title: 'Technical Judgment', desc: 'Substrate diagnosis, correct preparation, and high-performance systems.' },
        { icon: CheckCircle2, title: 'Real Experience', desc: 'More than 500 projects completed in Costa Rica and the region.' },
      ];

  return (
    <section className="bg-[oklch(12%_0.017_58)] px-4 py-16 text-stone-50 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-300/80">{c.whyKicker}</p>
          <h2 className="font-display mt-4 text-balance text-[clamp(2.3rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.055em]">{c.whyTitle}</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[1.75rem] border border-stone-50/10 bg-stone-50/10 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="group bg-[oklch(15%_0.018_60)] p-6 transition-colors duration-300 hover:bg-[oklch(18%_0.026_66)] sm:p-8">
              <feature.icon className="h-6 w-6 text-amber-200" aria-hidden="true" />
              <h3 className="mt-7 text-xl font-semibold tracking-tight">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">{feature.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ locale }: { locale: string }) {
  const c = getCopy(locale);
  const steps = locale === 'es'
    ? [
        ['01', 'Consulta', 'Entendemos uso, medidas, humedad, tránsito y expectativas visuales.'],
        ['02', 'Diseño', 'Definimos acabado, materiales, muestra o referencia y presupuesto detallado.'],
        ['03', 'Ejecución', 'Preparamos superficie, instalamos con precisión y controlamos tiempos de curado.'],
        ['04', 'Entrega', 'Revisamos bordes, brillo, resistencia y cuidados para que el resultado dure.'],
      ]
    : [
        ['01', 'Consultation', 'We understand use, dimensions, humidity, traffic, and visual expectations.'],
        ['02', 'Design', 'We define finish, materials, sample or reference, and detailed budget.'],
        ['03', 'Execution', 'We prepare the surface, install with precision, and control cure times.'],
        ['04', 'Delivery', 'We review edges, shine, resistance, and care so the result lasts.'],
      ];

  return (
    <section className="bg-[oklch(90%_0.017_78)] px-4 py-16 text-stone-950 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[oklch(42%_0.09_73)]">{c.processKicker}</p>
            <h2 className="font-display mt-4 text-balance text-[clamp(2.25rem,4.8vw,4.6rem)] font-semibold leading-[0.96] tracking-[-0.055em]">{c.processTitle}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map(([num, title, desc]) => (
              <article key={num} className="rounded-[1.5rem] border border-stone-950/10 bg-stone-50/65 p-6 shadow-[0_18px_40px_oklch(40%_0.04_70_/_0.08)]">
                <span className="font-display text-5xl font-semibold tracking-[-0.06em] text-[oklch(55%_0.11_76)] tabular-nums">{num}</span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-700">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ locale }: { locale: string }) {
  const c = getCopy(locale);
  const testimonials = locale === 'es'
    ? [
        ['Carlos Méndez', 'Gerente de Planta, Zona Franca', 'El piso epóxico industrial superó las expectativas. Resistente, fácil de limpiar y con acabado profesional impecable.'],
        ['María Fernanda Solís', 'Arquitecta de Interiores', 'El efecto mármol que logran es espectacular, y la atención al detalle se nota desde la primera reunión.'],
        ['Roberto Álvarez', 'Propietario de Restaurante', 'La mesa river table se volvió la pieza central del restaurante. Los clientes siempre preguntan por ella.'],
      ]
    : [
        ['Carlos Méndez', 'Plant Manager, Free Trade Zone', 'The industrial epoxy floor exceeded expectations. Resistant, easy to clean, and professionally finished.'],
        ['María Fernanda Solís', 'Interior Architect', 'Their marble effect is spectacular, and the attention to detail is clear from the first meeting.'],
        ['Roberto Álvarez', 'Restaurant Owner', 'The river table became the centerpiece of the restaurant. Customers always ask about it.'],
      ];

  return (
    <section className="bg-[oklch(14%_0.018_60)] px-4 py-16 text-stone-50 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-300/80">{c.testimonialsKicker}</p>
          <h2 className="font-display mt-4 text-balance text-[clamp(2.25rem,4.8vw,4.6rem)] font-semibold leading-[0.96] tracking-[-0.055em]">{c.testimonialsTitle}</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map(([name, role, text]) => (
            <figure key={name} className="rounded-[1.75rem] border border-stone-50/10 bg-stone-50/[0.045] p-6 shadow-[0_24px_60px_oklch(4%_0.01_40_/_0.25)] sm:p-8">
              <div className="flex gap-1 text-amber-200" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />)}
              </div>
              <blockquote className="mt-6 text-pretty text-base leading-8 text-stone-200">“{text}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-200 text-sm font-bold text-stone-950">{name[0]}</span>
                <span>
                  <span className="block font-semibold text-stone-50">{name}</span>
                  <span className="block text-sm text-stone-500">{role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection({ locale }: { locale: string }) {
  const c = getCopy(locale);
  return (
    <section className="relative isolate overflow-hidden bg-[oklch(88%_0.028_78)] px-4 py-16 text-stone-950 sm:px-6 sm:py-24 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_22%,oklch(76%_0.12_78_/_0.28),transparent_34%),linear-gradient(135deg,transparent,oklch(72%_0.07_120_/_0.16))]" />
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-stone-950/10 bg-stone-50/65 p-6 shadow-[0_30px_90px_oklch(35%_0.05_75_/_0.18)] backdrop-blur-sm sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="font-display text-balance text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.06em]">{c.finalTitle}</h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-stone-700 sm:text-lg">{c.finalText}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Link href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-3 text-sm font-bold text-amber-100 shadow-[0_18px_48px_oklch(12%_0.02_50_/_0.24)] transition-[transform,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(88%_0.028_78)] active:scale-[0.98]">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {c.whatsapp}
          </Link>
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-stone-950/15 px-6 py-3 text-sm font-bold text-stone-950 transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-stone-950/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(88%_0.028_78)] active:scale-[0.98]">
            {c.contact}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function OptimizedNewHomeContent({ locale }: { locale?: string }) {
  const hookLocale = useLocale();
  const resolvedLocale = locale || hookLocale;

  return (
    <main id="main-content" className="overflow-x-hidden bg-[oklch(12%_0.017_58)]">
      <HeroSection locale={resolvedLocale} />
      <TrustMarquee locale={resolvedLocale} />
      <ServicesSection locale={resolvedLocale} />
      <section className="bg-[oklch(12%_0.017_58)] pb-12 sm:pb-20">
        <ProductsIntro locale={resolvedLocale} />
        <OptimizedGridSection />
      </section>
      <WhyChooseUsSection locale={resolvedLocale} />
      <ProcessSection locale={resolvedLocale} />
      <TestimonialsSection locale={resolvedLocale} />
      <FinalCTASection locale={resolvedLocale} />
    </main>
  );
}

export default function OptimizedNewHome({
  initialCategories = [],
  initialProducts = [],
  locale,
}: OptimizedNewHomeProps) {
  return (
    <ProductsProvider initialCategories={initialCategories} initialProducts={initialProducts}>
      <OptimizedNewHomeContent locale={locale} />
    </ProductsProvider>
  );
}
