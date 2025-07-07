// Server Component — reexporta todo
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const CarouselClient = dynamic(() => import('./CarouselClient'));

/* Opcional: fallback “SEO puro” — solo primer banner */
function HtmlOnly({ children }: { children: ReactNode }) {
  // Children[0] es el primer slide, visible sin JS.
  // Googlebot lo verá siempre.
  return <>{Array.isArray(children) ? children[0] : children}</>;
}

interface Props {
  children: ReactNode;
  htmlOnly?: boolean;
}

export default function Carousel({ children, htmlOnly = false }: Props) {
  return htmlOnly ? (
    <HtmlOnly>{children}</HtmlOnly>
  ) : (
    <CarouselClient>{children}</CarouselClient>
  );
}

/* Reexporta BannerTemplate para mantener tu API */
export { default as BannerTemplate } from './BannerTemplate';
