'use client';

import React from 'react';
import Image from 'next/image';
import { ProductsProvider } from '@/components/providers/ProductsProvider';
import OptimizedGridSection from '@/components/cards/OptimizedGridSection';
import type { Database } from '@/types-db';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import {
  ArrowRight,
  Star,
  Shield,
  Award,
  Zap,
  Hammer,
  Sparkles,
  Factory,
  Gem,
  TreePine,
  Phone,
  ChevronRight,
  Quote,
  CheckCircle2,
  MapPin,
} from 'lucide-react';

type Product = Database['products'];
type Category = Database['categories'];

interface OptimizedNewHomeProps {
  initialCategories?: Category[];
  initialProducts?: Product[];
  locale?: string;
}

/* =========================================================================
 * HERO SECTION — Full viewport, visually striking
 * ========================================================================= */
function HeroSection({ locale }: { locale: string }) {
  const t = {
    es: {
      badge: 'Costa Rica',
      headline: 'Pisos Epóxicos &',
      headlineAccent: 'Muebles de Lujo',
      sub: 'Transformamos espacios con acabados de clase mundial. Desde pisos industriales de alto rendimiento hasta muebles artesanales con resina y madera.',
      cta1: 'Cotizar Proyecto',
      cta2: 'Ver Productos',
      stat1: '500+',
      stat1Label: 'Proyectos',
      stat2: '10+',
      stat2Label: 'Años',
      stat3: '100%',
      stat3Label: 'Garantía',
      stat4: '4.9',
      stat4Label: 'Calificación',
    },
    en: {
      badge: 'Costa Rica',
      headline: 'Epoxy Floors &',
      headlineAccent: 'Luxury Furniture',
      sub: 'We transform spaces with world-class finishes. From high-performance industrial floors to artisan resin and wood furniture.',
      cta1: 'Get a Quote',
      cta2: 'View Products',
      stat1: '500+',
      stat1Label: 'Projects',
      stat2: '10+',
      stat2Label: 'Years',
      stat3: '100%',
      stat3Label: 'Warranty',
      stat4: '4.9',
      stat4Label: 'Rating',
    },
  };
  const c = t[locale as 'es' | 'en'] || t.es;

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-[60%] h-full opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.4) 0%, transparent 50%)',
        }}
      />
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Text */}
          <div className="space-y-6 sm:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-500/20 rounded-full px-4 py-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-medium text-amber-400 tracking-wide uppercase">
                {c.badge}
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white">
                {c.headline}
                <br />
                <span className="gold-gradient-bright">{c.headlineAccent}</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-400 max-w-lg leading-relaxed">
              {c.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="https://wa.me/+50685850000?text=Hola%20SobrePoxi%2C%20quiero%20cotizar%20un%20proyecto"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 bg-gold-gradient text-black font-bold px-6 py-3.5 rounded-xl hover:shadow-lg hover:shadow-amber-500/20 transition-all text-sm sm:text-base"
              >
                <Phone className="w-4 h-4" />
                {c.cta1}
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-sm sm:text-base"
              >
                {c.cta2}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-4 gap-3 pt-4 border-t border-white/10">
              {[
                { value: c.stat1, label: c.stat1Label },
                { value: c.stat2, label: c.stat2Label },
                { value: c.stat3, label: c.stat3Label },
                { value: c.stat4, label: c.stat4Label, icon: true },
              ].map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1">
                    <span className="text-xl sm:text-2xl font-black text-white">{stat.value}</span>
                    {stat.icon && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual grid */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5">
                  <Image
                    src="/home/industrial-floor.webp"
                    alt="Industrial epoxy floor"
                    fill
                    className="object-cover"
                    sizes="25vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-semibold text-amber-400 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      {locale === 'es' ? 'Pisos Industriales' : 'Industrial Floors'}
                    </span>
                  </div>
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/5">
                  <Image
                    src="/home/artisan-working.webp"
                    alt="Artisan working"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-semibold text-amber-400 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      {locale === 'es' ? 'Artesanal' : 'Handcrafted'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-3 pt-8">
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/5">
                  <Image
                    src="/home/luxury-floor.webp"
                    alt="Luxury epoxy floor"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-semibold text-amber-400 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      {locale === 'es' ? 'Pisos de Lujo' : 'Luxury Floors'}
                    </span>
                  </div>
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5">
                  <Image
                    src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/hero_banner2-UU5JSGUliJzY8K0pdtxeg0AeGpHaUq.webp"
                    alt="Luxury furniture"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-semibold text-amber-400 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      {locale === 'es' ? 'Muebles de Lujo' : 'Luxury Furniture'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow effect behind grid */}
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent rounded-3xl -z-10 blur-2xl" />
          </div>

          {/* Mobile hero image */}
          <div className="relative lg:hidden -mx-4">
            <div className="grid grid-cols-3 gap-2 px-4">
              {[
                { src: '/home/industrial-floor.webp', label: locale === 'es' ? 'Industrial' : 'Industrial' },
                { src: '/home/luxury-floor.webp', label: locale === 'es' ? 'Lujo' : 'Luxury' },
                { src: 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/hero_banner2-UU5JSGUliJzY8K0pdtxeg0AeGpHaUq.webp', label: locale === 'es' ? 'Muebles' : 'Furniture' },
              ].map((img, i) => (
                <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/5">
                  <Image src={img.src} alt={img.label} fill className="object-cover" sizes="33vw" priority={i === 0} unoptimized={img.src.startsWith('http')} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold text-amber-400 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">{img.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
 * SERVICES SECTION — 3 main divisions
 * ========================================================================= */
function ServicesSection({ locale }: { locale: string }) {
  const services = locale === 'es'
    ? [
        {
          icon: Factory,
          title: 'Pisos Epóxicos Industriales',
          desc: 'Alto rendimiento para fábricas, bodegas, plantas de producción y estacionamientos. Resistencia química y mecánica certificada.',
          href: '/industrial-epoxy-flooring',
          img: 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/industrial-floor.webp',
          tag: 'Industrial',
        },
        {
          icon: Gem,
          title: 'Pisos Epóxicos de Lujo',
          desc: 'Diseños 3D, efectos mármol, espejo y metálicos para residencias, oficinas premium y espacios comerciales.',
          href: '/epoxy-floors',
          img: 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/luxury-floor.webp',
          tag: 'Residencial',
        },
        {
          icon: TreePine,
          title: 'Muebles de Lujo',
          desc: 'Mesas river table, barras, escritorios y piezas únicas en madera y resina epóxica hechas a medida.',
          href: '/luxury-furniture',
          img: 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/hero_banner2-UU5JSGUliJzY8K0pdtxeg0AeGpHaUq.webp',
          tag: 'Artesanal',
        },
      ]
    : [
        {
          icon: Factory,
          title: 'Industrial Epoxy Flooring',
          desc: 'High-performance solutions for factories, warehouses, production plants and parking facilities. Certified chemical and mechanical resistance.',
          href: '/industrial-epoxy-flooring',
          img: 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/industrial-floor.webp',
          tag: 'Industrial',
        },
        {
          icon: Gem,
          title: 'Luxury Epoxy Floors',
          desc: '3D designs, marble, mirror and metallic effects for residences, premium offices and commercial spaces.',
          href: '/epoxy-floors',
          img: 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/luxury-floor.webp',
          tag: 'Residential',
        },
        {
          icon: TreePine,
          title: 'Luxury Furniture',
          desc: 'River tables, bars, desks and unique pieces in wood and epoxy resin, made to measure.',
          href: '/luxury-furniture',
          img: 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/hero_banner2-UU5JSGUliJzY8K0pdtxeg0AeGpHaUq.webp',
          tag: 'Artisan',
        },
      ];

  return (
    <section className="py-16 sm:py-20 bg-[#0e0e0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.2em]">
            {locale === 'es' ? 'Nuestras Divisiones' : 'Our Divisions'}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white">
            {locale === 'es' ? 'Soluciones Especializadas' : 'Specialized Solutions'}
          </h2>
          <div className="mt-4 w-16 h-1 bg-gold-gradient mx-auto rounded-full" />
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {services.map((svc, i) => (
            <Link
              key={i}
              href={svc.href}
              className="group relative rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/5 hover:border-amber-500/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <Image
                  src={svc.img}
                  alt={svc.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold text-amber-400 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider border border-amber-500/20">
                    {svc.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center shrink-0">
                    <svc.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-tight">
                    {svc.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {svc.desc}
                </p>
                <div className="flex items-center gap-1 text-sm font-semibold text-amber-400 group-hover:gap-2 transition-all">
                  {locale === 'es' ? 'Explorar' : 'Explore'}
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
 * WHY CHOOSE US — Value propositions
 * ========================================================================= */
function WhyChooseUsSection({ locale }: { locale: string }) {
  const features = locale === 'es'
    ? [
        { icon: Shield, title: 'Garantía Total', desc: 'Respaldamos cada proyecto con garantía. Tu inversión está protegida.' },
        { icon: Award, title: 'Calidad Premium', desc: 'Materiales importados de primera calidad y acabados impecables.' },
        { icon: Zap, title: 'Instalación Rápida', desc: 'Equipos especializados que minimizan tiempos de ejecución.' },
        { icon: Hammer, title: 'A Tu Medida', desc: 'Cada proyecto es único. Diseñamos según tus necesidades exactas.' },
        { icon: Sparkles, title: 'Diseño Exclusivo', desc: 'Efectos únicos: 3D, metálico, mármol, espejo y más.' },
        { icon: CheckCircle2, title: 'Experiencia Real', desc: '+500 proyectos ejecutados en Costa Rica y la región.' },
      ]
    : [
        { icon: Shield, title: 'Full Warranty', desc: 'We back every project with a warranty. Your investment is protected.' },
        { icon: Award, title: 'Premium Quality', desc: 'First-class imported materials and flawless finishes.' },
        { icon: Zap, title: 'Fast Installation', desc: 'Specialized teams that minimize execution times.' },
        { icon: Hammer, title: 'Custom Made', desc: 'Every project is unique. We design to your exact needs.' },
        { icon: Sparkles, title: 'Exclusive Design', desc: 'Unique effects: 3D, metallic, marble, mirror and more.' },
        { icon: CheckCircle2, title: 'Proven Track Record', desc: '500+ completed projects in Costa Rica and the region.' },
      ];

  return (
    <section className="py-16 sm:py-20 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.2em]">
            {locale === 'es' ? 'Por qué elegirnos' : 'Why Choose Us'}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white">
            {locale === 'es' ? 'La Diferencia SobrePoxi' : 'The SobrePoxi Difference'}
          </h2>
          <div className="mt-4 w-16 h-1 bg-gold-gradient mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-4 sm:p-6 rounded-xl bg-[#1a1a1a] border border-white/5 hover:border-amber-500/20 transition-all duration-300"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-400/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-amber-400/20 transition-colors">
                <f.icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-1 sm:mb-2">{f.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
 * TESTIMONIALS SECTION
 * ========================================================================= */
function TestimonialsSection({ locale }: { locale: string }) {
  const testimonials = locale === 'es'
    ? [
        {
          name: 'Carlos Méndez',
          role: 'Gerente de Planta, Zona Franca',
          text: 'El piso epóxico industrial que nos instalaron superó todas las expectativas. Resistente, fácil de limpiar y con un acabado profesional impecable.',
          rating: 5,
        },
        {
          name: 'María Fernanda Solís',
          role: 'Arquitecta de Interiores',
          text: 'He recomendado SobrePoxi a varios de mis clientes. El efecto mármol que logran es espectacular, y la atención al detalle es algo que valoro muchísimo.',
          rating: 5,
        },
        {
          name: 'Roberto Álvarez',
          role: 'Propietario de Restaurante',
          text: 'La mesa river table que nos diseñaron se convirtió en la pieza central del restaurante. Los clientes siempre preguntan por ella. Arte funcional de primera.',
          rating: 5,
        },
      ]
    : [
        {
          name: 'Carlos Méndez',
          role: 'Plant Manager, Free Trade Zone',
          text: 'The industrial epoxy floor they installed exceeded all expectations. Resistant, easy to clean, and with a flawless professional finish.',
          rating: 5,
        },
        {
          name: 'María Fernanda Solís',
          role: 'Interior Architect',
          text: "I've recommended SobrePoxi to several clients. The marble effect they achieve is spectacular, and their attention to detail is something I truly value.",
          rating: 5,
        },
        {
          name: 'Roberto Álvarez',
          role: 'Restaurant Owner',
          text: 'The river table they designed became the centerpiece of the restaurant. Customers always ask about it. First-class functional art.',
          rating: 5,
        },
      ];

  return (
    <section className="py-16 sm:py-20 bg-[#0e0e0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.2em]">
            {locale === 'es' ? 'Testimonios' : 'Testimonials'}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white">
            {locale === 'es' ? 'Lo Que Dicen Nuestros Clientes' : 'What Our Clients Say'}
          </h2>
          <div className="mt-4 w-16 h-1 bg-gold-gradient mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative p-6 sm:p-8 rounded-2xl bg-[#1a1a1a] border border-white/5"
            >
              <Quote className="w-8 h-8 text-amber-400/20 mb-4" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-amber-400">{t.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
 * FINAL CTA SECTION
 * ========================================================================= */
function FinalCTASection({ locale }: { locale: string }) {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-amber-900/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
          {locale === 'es'
            ? 'Transformemos Tu Espacio'
            : "Let's Transform Your Space"}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-xl mx-auto">
          {locale === 'es'
            ? 'Cuéntanos sobre tu proyecto y recibe una cotización personalizada. Sin compromiso.'
            : 'Tell us about your project and receive a personalized quote. No commitment.'}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="https://wa.me/+50685850000?text=Hola%20SobrePoxi%2C%20quiero%20cotizar%20un%20proyecto"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 bg-gold-gradient text-black font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-amber-500/20 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
            </svg>
            WhatsApp
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
          >
            {locale === 'es' ? 'Formulario de Contacto' : 'Contact Form'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
 * PRODUCT CATEGORIES LABEL — section header for the grid
 * ========================================================================= */
function ProductsHeader({ locale }: { locale: string }) {
  return (
    <div className="pt-14 sm:pt-18 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.2em]">
            {locale === 'es' ? 'Tienda' : 'Shop'}
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white">
            {locale === 'es' ? 'Explora por Categoría' : 'Explore by Category'}
          </h2>
        </div>
        <Link
          href="/products"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
        >
          {locale === 'es' ? 'Ver todo' : 'View all'}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="mt-3 w-16 h-1 bg-gold-gradient rounded-full" />
    </div>
  );
}

/* =========================================================================
 * MAIN CONTENT ORCHESTRATOR
 * ========================================================================= */
function OptimizedNewHomeContent({ locale }: { locale?: string }) {
  const hookLocale = useLocale();
  const resolvedLocale = locale || hookLocale;

  return (
    <div className="bg-[#121212]">
      {/* 1. Hero — Full viewport, memorable */}
      <HeroSection locale={resolvedLocale} />

      {/* 2. Services — 3 main divisions */}
      <ServicesSection locale={resolvedLocale} />

      {/* 3. Products by category */}
      <section className="bg-[#121212] pb-8">
        <ProductsHeader locale={resolvedLocale} />
        <div className="max-w-7xl mx-auto">
          <OptimizedGridSection />
        </div>
      </section>

      {/* 4. Why choose us */}
      <WhyChooseUsSection locale={resolvedLocale} />

      {/* 5. Testimonials */}
      <TestimonialsSection locale={resolvedLocale} />

      {/* 6. Final CTA */}
      <FinalCTASection locale={resolvedLocale} />
    </div>
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
