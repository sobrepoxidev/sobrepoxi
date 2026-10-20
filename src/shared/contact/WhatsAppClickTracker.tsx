'use client';

import { useEffect } from 'react';
import { track } from '@/shared/analytics/track';
import { refFromWhatsAppHref } from './whatsapp';

/**
 * One delegated listener for every WhatsApp CTA on the site: records a
 * `whatsapp_click` event with the page and the link's ref, so Umami
 * shows which pages produce conversations without wiring each button.
 */
export default function WhatsAppClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const link = target?.closest?.('a[href*="wa.me/"]') as HTMLAnchorElement | null;
      if (!link) return;
      track('whatsapp_click', {
        ref: refFromWhatsAppHref(link.href) ?? 'sin-ref',
        path: window.location.pathname,
      });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
