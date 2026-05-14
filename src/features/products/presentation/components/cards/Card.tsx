import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/shared/i18n/navigation';

interface CardProps {
  title: string;
  link: string;
  content: React.ReactNode;
  meta?: string;
}

export default function Card({ title, link, content, meta }: CardProps) {
  return (
    <article className="group relative flex min-h-[430px] flex-col overflow-hidden rounded-[1.75rem] border border-stone-50/10 bg-[oklch(16%_0.018_60)] p-4 text-stone-50 shadow-[0_24px_60px_oklch(4%_0.01_40_/_0.25)] transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-amber-200/35 hover:shadow-[0_32px_80px_oklch(4%_0.01_40_/_0.34)]">
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
      <header className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          {meta && <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-200/80">{meta}</p>}
          <h3 className="font-display truncate text-3xl font-semibold leading-none tracking-[-0.045em]">{title}</h3>
        </div>
        <Link
          href={link}
          aria-label={`Ver ${title}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-50/12 bg-stone-50/6 text-amber-100 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-amber-200/40 hover:bg-amber-200/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </header>
      <div className="flex-1">{content}</div>
    </article>
  );
}
