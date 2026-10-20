export { default } from '@/features/content/presentation/pages/videos/VideoDetailPage';
export { generateMetadata } from '@/features/content/presentation/pages/videos/VideoDetailPage';
export { generateStaticParams } from '@/features/content/presentation/pages/videos/VideoDetailPage';

// CRÍTICO: dynamicParams DEBE declararse en el archivo de ruta (page.tsx)
// para que Next.js devuelva HTTP 404 real en slugs no listados en
// generateStaticParams (mismo patrón que /guias/[slug]).
export const dynamicParams = false;
