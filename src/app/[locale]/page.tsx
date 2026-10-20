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
      ? 'Instalamos pisos epóxicos metálicos, efecto mármol, 3D e industriales en todo Costa Rica. Precio orientativo ₡75.000 – ₡96.100 por m² instalado (piso de 5 mm, según el acabado, IVA incluido). El total exacto lo confirma la visita técnica.'
      : 'Metallic, marble-effect, 3D and industrial epoxy floors installed across Costa Rica. Guide price ₡75,000 – ₡96,100 per m² installed (5 mm floor, depending on finish, VAT included). The exact total is confirmed at the site visit.',
  });
}
