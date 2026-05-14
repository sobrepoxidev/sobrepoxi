'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { Locale } from 'next-intl';
import { ChangeEvent, ReactNode, useTransition } from 'react';
import { usePathname, useRouter } from '@/shared/i18n/navigation';
import { Globe } from 'lucide-react';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({ children, defaultValue, label }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- pathname and params correspond to the active route.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <label className={clsx('relative inline-flex items-center text-stone-200', isPending && 'opacity-60')}>
      <span className="sr-only">{label}</span>
      <Globe className="pointer-events-none absolute left-3 h-4 w-4 text-amber-100" aria-hidden="true" />
      <select
        aria-label={label}
        className="h-10 min-w-20 appearance-none rounded-full border border-stone-50/10 bg-stone-50/6 py-0 pl-9 pr-4 text-sm font-bold text-stone-100 transition-[border-color,background-color] duration-300 hover:border-amber-200/35 hover:bg-stone-50/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 disabled:cursor-wait"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
    </label>
  );
}
