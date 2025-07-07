// Server Component
import { Link } from '@/i18n/navigation';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  linkHref?: string;
  bgColor?: string;
}

export default function BannerTemplate({
  children,
  linkHref = '#',
  bgColor = '',
}: Props) {
  return (
    <div className={`relative h-full w-full ${bgColor}`.trim()}>
      {children}
      {/* Link es Client Component interno; se permite usarlo aquí */}
      <Link href={linkHref} className="absolute inset-0 z-30" />
    </div>
  );
}
