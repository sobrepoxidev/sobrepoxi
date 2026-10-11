/* --------------------------------------------------------------------------
 *  ResinFloorsPage · SobrePoxi — "resina epóxica para pisos"
 *  Targets the highest-impression query family in Search Console (position
 *  5–7: "resina epóxica para pisos costa rica", "pisos de resina",
 *  "porcelanato líquido", "granito líquido") and carries the floor calculator,
 *  whose WhatsApp message arrives with space, m², finish and province.
 * ----------------------------------------------------------------------- */

import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { buildMetadata, SEO_CONFIG } from '@/shared/seo/seoConfig';
import { JsonLd } from '@/shared/seo/JsonLd';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/shared/seo/structuredData';
import { buildWhatsAppUrl } from '@/shared/contact/whatsapp';
import FloorCalculator from '../../components/FloorCalculator';
import { FLOOR_FINISHES, formatColones } from '../../../application/floorPricing';

const serifDisplay = Playfair_Display({ subsets: ['latin'], style: ['italic'], display: 'swap', variable: '--font-epx-serif' });
const sansDisplay = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-epx-sans' });

type tParams = Promise<{ locale: string }>;
const PATH = 'resina-epoxica-para-pisos';

const COPY = {
  es: {
    title: 'Resina epóxica para pisos en Costa Rica: precios y calculadora',
    description:
      'Resina epóxica para pisos en Costa Rica desde ₡8.000 por m² con instalación. Calculá el precio de tu cochera, sala o bodega y cotizá por WhatsApp. Porcelanato y granito líquido.',
    crumbs: ['Inicio', 'Pisos epóxicos', 'Resina epóxica para pisos'],
    eyebrow: 'Costa Rica · Residencial, comercial e industrial',
    h1a: 'Resina epóxica',
    h1b: 'para pisos en Costa Rica',
    lede: 'Pisos continuos de resina, sin juntas, para casas, cocheras, comercios e industria. Calculá cuánto cuesta tu piso en un minuto y mandanos los datos por WhatsApp.',
    ctaCalc: 'Calcular mi piso',
    ctaWa: 'Cotizar por WhatsApp',
    waMsg: 'Hola SobrePoxi, quiero cotizar resina epóxica para piso',
    trust: [['Garantía', 'escrita'], ['Visita técnica', 'sin costo'], ['Desde ₡8.000', 'por m²']],
    calcEyebrow: 'Calculadora',
    calcH2a: '¿Cuánto cuesta',
    calcH2b: 'tu piso?',
    calcSub: 'Precio orientativo con materiales, preparación del concreto, instalación y garantía. El precio final sale de la visita técnica.',
    termsEyebrow: 'Nombres que vas a escuchar',
    termsH2a: 'Porcelanato líquido, granito líquido',
    termsH2b: 'y piso epóxico',
    termsSub: 'Son nombres comerciales de la misma familia: pisos continuos de resina aplicados sobre el concreto.',
    terms: [
      ['Piso epóxico', 'Resina epóxica en varias capas sobre concreto preparado. Liso, sin juntas, resistente a manchas y fácil de limpiar.'],
      ['Porcelanato líquido', 'Así se le llama al acabado autonivelante brillante: color sólido o metálico, con apariencia de porcelanato pero sin juntas.'],
      ['Granito líquido', 'Así se le llama al acabado con escamas o partículas sobre la resina. Da textura, disimula el polvo y es antideslizante.'],
    ],
    finishesEyebrow: 'Acabados',
    finishesH2a: 'Cuatro sistemas,',
    finishesH2b: 'un piso para cada espacio',
    perM2: 'por m²',
    usesEyebrow: 'Por espacio',
    usesH2: 'Dónde se usa',
    uses: [
      ['Cocheras', '/es/guias/pisos-epoxicos-para-cocheras', 'Guía'],
      ['Salas y cocinas', '/es/guias/pisos-epoxicos-modernos-para-interiores', 'Guía'],
      ['Bodegas e industria', '/es/industrial-epoxy-flooring', 'Ver'],
      ['Precios 2026', '/es/guias/precios-pisos-epoxicos-costa-rica', 'Guía'],
    ],
    stepsEyebrow: 'Cómo trabajamos',
    stepsH2: 'De la visita al piso terminado',
    steps: [
      ['Visita técnica', 'Medimos, revisamos humedad y grietas del concreto y te mostramos muestras.'],
      ['Preparación', 'Desbaste del concreto, reparación de grietas y limpieza profunda.'],
      ['Aplicación por capas', 'Imprimante, capa base y el acabado elegido: sólido, escamas, metálico o industrial.'],
      ['Curado y entrega', 'Te entregamos el piso con garantía escrita e instrucciones de cuidado.'],
    ],
    faqH2: 'Preguntas frecuentes',
    faqs: [
      { question: '¿Cuánto cuesta el metro cuadrado de resina epóxica para pisos en Costa Rica?', answer: 'Entre ₡8.000 y ₡38.000 por m² con materiales, preparación e instalación, según el sistema: desde el color sólido hasta el metálico decorativo. Una cochera de 2 carros con escamas ronda ₡400.000 a ₡650.000.' },
      { question: '¿Qué es el porcelanato líquido?', answer: 'Es el nombre comercial del piso de resina autonivelante con acabado brillante. Se ve como porcelanato pero no tiene juntas.' },
      { question: '¿Se puede poner resina epóxica sobre cerámica o porcelanato?', answer: 'Depende del estado del piso actual: adherencia, piezas sueltas y humedad. Lo revisamos en la visita técnica antes de cotizar.' },
      { question: '¿Cuánto dura un piso de resina epóxica?', answer: 'Un sistema profesional bien instalado dura entre 15 y 20 años con limpieza húmeda.' },
      { question: '¿Es resbaloso?', answer: 'El acabado con escamas o con aditivo antideslizante tiene agarre. Para baños, terrazas y exteriores es el que recomendamos.' },
      { question: '¿Instalan fuera de San José?', answer: 'Sí, instalamos en todo Costa Rica.' },
    ],
    finalH2a: '¿Listo para',
    finalH2b: 'tu piso nuevo?',
    finalSub: 'Mandanos los metros y el espacio por WhatsApp y coordinamos la visita técnica.',
    finalCalc: 'Usar la calculadora',
    heroAlt: 'Piso de resina epóxica tipo mármol negro con vetas doradas instalado por SobrePoxi en Costa Rica',
  },
  en: {
    title: 'Epoxy resin flooring in Costa Rica: prices and calculator',
    description:
      'Epoxy resin floors in Costa Rica from ₡8,000 per m² installed. Estimate the price of your garage, living room or warehouse and get a quote on WhatsApp.',
    crumbs: ['Home', 'Epoxy floors', 'Epoxy resin flooring'],
    eyebrow: 'Costa Rica · Residential, commercial and industrial',
    h1a: 'Epoxy resin',
    h1b: 'flooring in Costa Rica',
    lede: 'Seamless resin floors for homes, garages, shops and industry. Estimate your floor in a minute and send us the details on WhatsApp.',
    ctaCalc: 'Estimate my floor',
    ctaWa: 'Quote on WhatsApp',
    waMsg: 'Hello SobrePoxi, I would like a quote for an epoxy resin floor',
    trust: [['Written', 'warranty'], ['Free', 'site visit'], ['From ₡8,000', 'per m²']],
    calcEyebrow: 'Calculator',
    calcH2a: 'How much does',
    calcH2b: 'your floor cost?',
    calcSub: 'Estimated price including materials, concrete preparation, installation and warranty. The final price comes from the site visit.',
    termsEyebrow: 'Names you will hear',
    termsH2a: 'Liquid porcelain, liquid granite',
    termsH2b: 'and epoxy floors',
    termsSub: 'They are trade names for the same family: seamless resin floors applied over concrete.',
    terms: [
      ['Epoxy floor', 'Epoxy resin in several coats over prepared concrete. Smooth, seamless, stain resistant and easy to clean.'],
      ['Liquid porcelain', 'The name used for the glossy self-leveling finish: solid color or metallic, looks like porcelain tile without joints.'],
      ['Liquid granite', 'The name used for the flake or particle finish over resin. Adds texture, hides dust and is anti-slip.'],
    ],
    finishesEyebrow: 'Finishes',
    finishesH2a: 'Four systems,',
    finishesH2b: 'a floor for every space',
    perM2: 'per m²',
    usesEyebrow: 'By space',
    usesH2: 'Where it is used',
    uses: [
      ['Garages', '/en/guias', 'Guides'],
      ['Living rooms and kitchens', '/en/guias', 'Guides'],
      ['Warehouses and industry', '/en/industrial-epoxy-flooring', 'See'],
      ['All epoxy floors', '/en/epoxy-floors', 'See'],
    ],
    stepsEyebrow: 'How we work',
    stepsH2: 'From site visit to finished floor',
    steps: [
      ['Site visit', 'We measure, check concrete moisture and cracks, and show you samples.'],
      ['Preparation', 'Concrete grinding, crack repair and deep cleaning.'],
      ['Layered application', 'Primer, base coat and the chosen finish: solid, flakes, metallic or industrial.'],
      ['Curing and handover', 'We hand over the floor with a written warranty and care instructions.'],
    ],
    faqH2: 'Frequently asked questions',
    faqs: [
      { question: 'How much does epoxy resin flooring cost per m² in Costa Rica?', answer: 'Between ₡8,000 and ₡38,000 per m² including materials, preparation and installation, depending on the system: from solid color to decorative metallic.' },
      { question: 'What is liquid porcelain?', answer: 'It is the trade name for a glossy self-leveling resin floor. It looks like porcelain tile but has no joints.' },
      { question: 'Can epoxy go over ceramic or porcelain tile?', answer: 'It depends on the current floor: adhesion, loose tiles and moisture. We check it at the site visit before quoting.' },
      { question: 'How long does an epoxy resin floor last?', answer: 'A professionally installed system lasts 15 to 20 years with damp cleaning.' },
      { question: 'Is it slippery?', answer: 'The flake finish or an anti-slip additive gives grip. We recommend it for bathrooms, patios and outdoor areas.' },
      { question: 'Do you install outside San José?', answer: 'Yes, we install across Costa Rica.' },
    ],
    finalH2a: 'Ready for',
    finalH2b: 'your new floor?',
    finalSub: 'Send us the area and the space on WhatsApp and we will schedule the site visit.',
    finalCalc: 'Use the calculator',
    heroAlt: 'Black marble-effect epoxy resin floor with gold veins installed by SobrePoxi in Costa Rica',
  },
};

export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale === 'es' ? 'es' : 'en';
  const t = COPY[lang];
  return buildMetadata({
    locale: lang,
    pathname: `/${lang}/${PATH}`,
    title: t.title,
    description: t.description,
    keywords:
      lang === 'es'
        ? 'resina epóxica para pisos, resina epóxica para pisos Costa Rica, pisos de resina, porcelanato líquido, granito líquido, precio resina epóxica m2'
        : 'epoxy resin flooring Costa Rica, resin floors, liquid porcelain floor, epoxy floor price per m2',
    image: { url: `${SEO_CONFIG.siteUrl}/epoxy/hero.webp`, width: 1200, height: 630, alt: t.heroAlt },
  });
}

export default async function ResinFloorsPage({ params }: { params: tParams }) {
  const { locale } = await params;
  const lang = locale === 'es' ? 'es' : 'en';
  const t = COPY[lang];
  const waHref = buildWhatsAppUrl(t.waMsg, PATH);

  return (
    <main className={`${serifDisplay.variable} ${sansDisplay.variable} efx-sans min-h-screen bg-[#0b0a09] text-white`}>
      <style>{`
        .efx-serif { font-family: var(--font-epx-serif), Georgia, serif; }
        .efx-sans { font-family: var(--font-epx-sans), system-ui, Arial, sans-serif; }
      `}</style>
      <JsonLd
        id="resin-breadcrumb"
        data={generateBreadcrumbSchema([
          { name: t.crumbs[0], url: `/${lang}` },
          { name: t.crumbs[1], url: `/${lang}/epoxy-floors` },
          { name: t.crumbs[2], url: `/${lang}/${PATH}` },
        ])}
      />
      <JsonLd id="resin-faq" data={generateFAQSchema(t.faqs)} />
      <JsonLd
        id="resin-service"
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: lang === 'es' ? 'Instalación de pisos de resina epóxica' : 'Epoxy resin floor installation',
          areaServed: { '@type': 'Country', name: 'Costa Rica' },
          provider: { '@type': 'HomeAndConstructionBusiness', name: 'SobrePoxi', url: SEO_CONFIG.siteUrl, telephone: SEO_CONFIG.company.phone },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'CRC',
            lowPrice: Math.min(...FLOOR_FINISHES.map((f) => f.minPerM2)),
            highPrice: Math.max(...FLOOR_FINISHES.map((f) => f.maxPerM2)),
            unitText: 'm2',
          },
        }}
      />

      {/* ═══ HERO ═══ */}
      <header className="relative overflow-hidden">
        <picture>
          <source media="(max-width: 767px)" srcSet="/epoxy/hero-mobile.webp" />
          <img src="/epoxy/hero.webp" alt={t.heroAlt} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-55" />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a09]/40 via-[#0b0a09]/20 to-[#0b0a09]" />
        <div className="relative mx-auto grid max-w-6xl gap-5 px-5 pb-12 pt-14 md:pb-16 md:pt-24">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-white/45">
            <Link href={`/${lang}`} className="hover:text-white">{t.crumbs[0]}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={`/${lang}/epoxy-floors`} className="hover:text-white">{t.crumbs[1]}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/70">{t.crumbs[2]}</span>
          </nav>
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/60">{t.eyebrow}</p>
          <h1 className="leading-[1.05]">
            <span className="efx-serif block text-4xl italic font-normal text-white/90 sm:text-5xl md:text-6xl">{t.h1a}</span>
            <span className="gold-gradient-bright block text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl">{t.h1b}</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-white/70">{t.lede}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#calculadora" className="bg-gold-gradient inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-black transition-opacity hover:opacity-90">
              {t.ctaCalc}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-semibold text-white transition-colors hover:border-white/50">
              {t.ctaWa}
            </a>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/65">
            {t.trust.map(([a, b]) => (
              <li key={a}>
                <span className="font-semibold text-amber-300">{a}</span> {b}
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* ═══ CALCULATOR ═══ */}
      <section id="calculadora" className="scroll-mt-20 py-14">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/60">{t.calcEyebrow}</p>
          <h2 className="mb-2 mt-2 text-3xl leading-tight md:text-4xl">
            <span className="efx-serif italic font-normal">{t.calcH2a}</span> <span className="gold-gradient-bright font-extrabold">{t.calcH2b}</span>
          </h2>
          <p className="mb-7 max-w-2xl leading-relaxed text-white/60">{t.calcSub}</p>
          <FloorCalculator locale={lang} refTag={PATH} />
        </div>
      </section>

      {/* ═══ TERMS ═══ */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/60">{t.termsEyebrow}</p>
          <h2 className="mb-2 mt-2 text-3xl leading-tight md:text-4xl">
            <span className="efx-serif italic font-normal">{t.termsH2a}</span> <span className="font-extrabold">{t.termsH2b}</span>
          </h2>
          <p className="mb-7 max-w-2xl leading-relaxed text-white/60">{t.termsSub}</p>
          <div className="grid gap-3.5 md:grid-cols-3">
            {t.terms.map(([name, text]) => (
              <div key={name} className="grid gap-2 rounded-2xl border border-white/10 bg-[#151311] p-5">
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="leading-relaxed text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINISHES ═══ */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/60">{t.finishesEyebrow}</p>
          <h2 className="mb-7 mt-2 text-3xl leading-tight md:text-4xl">
            <span className="efx-serif italic font-normal">{t.finishesH2a}</span> <span className="font-extrabold">{t.finishesH2b}</span>
          </h2>
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {FLOOR_FINISHES.map((f) => (
              <div key={f.key} className="overflow-hidden rounded-2xl border border-white/10 bg-[#151311]">
                <div className="relative aspect-square">
                  <Image src={f.image} alt={`${lang === 'es' ? 'Piso de resina epóxica' : 'Epoxy resin floor'} ${f.name[lang].toLowerCase()}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px" className="object-cover" />
                </div>
                <div className="grid gap-1 p-4">
                  <h3 className="font-semibold">{f.name[lang]}</h3>
                  <p className="text-sm tabular-nums text-amber-300">
                    {formatColones(f.minPerM2)} – {formatColones(f.maxPerM2)} {t.perM2}
                  </p>
                  <p className="text-sm leading-relaxed text-white/60">{f.description[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ USES ═══ */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/60">{t.usesEyebrow}</p>
          <h2 className="mb-7 mt-2 text-3xl font-extrabold leading-tight md:text-4xl">{t.usesH2}</h2>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {t.uses.map(([label, href, action]) => (
              <Link key={label} href={href} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#151311] px-5 py-4 transition-colors hover:border-white/25">
                <span>{label}</span>
                <span className="text-sm text-white/45">{action} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/60">{t.stepsEyebrow}</p>
          <h2 className="mb-7 mt-2 text-3xl font-extrabold leading-tight md:text-4xl">{t.stepsH2}</h2>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map(([name, text], i) => (
              <li key={name} className="rounded-r-xl border-l-2 border-[#b68b44] bg-[#151311] p-5">
                <p className="mb-1 font-semibold">
                  <span className="text-amber-300">{i + 1}.</span> {name}
                </p>
                <p className="text-sm leading-relaxed text-white/60">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="mb-4 text-3xl font-extrabold leading-tight md:text-4xl">{t.faqH2}</h2>
          {t.faqs.map((f, i) => (
            <details key={f.question} open={i === 0} className="group border-b border-white/10 py-4">
              <summary className="flex cursor-pointer list-none justify-between gap-3 font-semibold">
                {f.question}
                <span className="text-xl leading-none text-amber-300 group-open:hidden">+</span>
                <span className="hidden text-xl leading-none text-amber-300 group-open:inline">−</span>
              </summary>
              <p className="mt-2.5 leading-relaxed text-white/60">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="pb-20 pt-6">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-4 rounded-3xl border border-white/10 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(182,139,68,0.22),transparent_60%)] bg-[#151311] px-6 py-9">
            <h2 className="text-3xl leading-tight md:text-4xl">
              <span className="efx-serif italic font-normal">{t.finalH2a}</span> <span className="gold-gradient-bright font-extrabold">{t.finalH2b}</span>
            </h2>
            <p className="max-w-xl leading-relaxed text-white/60">{t.finalSub}</p>
            <div className="flex flex-wrap gap-3">
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-[#08140c] transition-opacity hover:opacity-90">
                {t.ctaWa}
              </a>
              <a href="#calculadora" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-semibold text-white transition-colors hover:border-white/50">
                {t.finalCalc}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
