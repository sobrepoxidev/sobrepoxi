export { default } from '@/features/content/presentation/pages/guias/GuideDetailPage';
export { generateMetadata } from '@/features/content/presentation/pages/guias/GuideDetailPage';
export { generateStaticParams } from '@/features/content/presentation/pages/guias/GuideDetailPage';

// CRÍTICO: dynamicParams DEBE declararse en el archivo de ruta (page.tsx)
// para que Next.js devuelva HTTP 404 real en slugs no listados en
// generateStaticParams. Si se declara solo en el módulo importado, Next.js
// no lo lee. Sin esto, /en/guias/<slug-inexistente> sirve 200 con contenido
// "404" visual → Google lo marca como Soft 404.
export const dynamicParams = false;
