import type { Metadata } from 'next';
import { buildMetadata } from '@/shared/seo/seoConfig';

export { default } from '@/features/content/presentation/pages/HomePage';

type tParams = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  return buildMetadata({
    locale: isEs ? 'es' : 'en',
    pathname: `/${locale}`,
    title: isEs
      ? 'Pisos epóxicos en Costa Rica: casas, cocheras e industria | SobrePoxi'
      : 'Epoxy floors in Costa Rica: homes, garages and industry | SobrePoxi',
    description: isEs
      ? 'Instalamos pisos epóxicos metálicos, efecto mármol, 3D e industriales en todo Costa Rica. Desde ₡8.000 por m², visita técnica y cotización gratis por WhatsApp.'
      : 'Metallic, marble-effect, 3D and industrial epoxy floors installed across Costa Rica. From ₡8,000 per m², free site visit and quote on WhatsApp.',
  });
}
