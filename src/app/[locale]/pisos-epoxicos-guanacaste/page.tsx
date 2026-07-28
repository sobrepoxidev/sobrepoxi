import type { Metadata } from 'next';
import { CityEpoxyPage, generateCityMetadata } from '@/features/content/presentation/pages/landing/CityEpoxyPage';

type Params = Promise<{ locale: 'es' | 'en' }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return generateCityMetadata('guanacaste', params);
}

export default async function Page({ params }: { params: Params }) {
  return <CityEpoxyPage slug="guanacaste" params={params} />;
}
