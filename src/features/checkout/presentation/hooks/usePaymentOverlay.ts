'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';

interface UsePaymentOverlayOptions {
  redirecting: boolean;
}

export function usePaymentOverlay({ redirecting }: UsePaymentOverlayOptions): void {
  const locale = useLocale();

  useEffect(() => {
    if (!redirecting) return;

    const blockingDiv = document.createElement('div');
    blockingDiv.id = 'payment-processing-overlay';
    blockingDiv.style.position = 'fixed';
    blockingDiv.style.top = '0';
    blockingDiv.style.left = '0';
    blockingDiv.style.width = '100%';
    blockingDiv.style.height = '100%';
    blockingDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    blockingDiv.style.zIndex = '9999';
    blockingDiv.style.display = 'flex';
    blockingDiv.style.flexDirection = 'column';
    blockingDiv.style.alignItems = 'center';
    blockingDiv.style.justifyContent = 'center';
    blockingDiv.innerHTML = `
      <div style="text-align: center;">
        <div style="margin-bottom: 20px;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="animate-spin">
            <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"/>
            <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor"/>
          </svg>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: bold; color: #4B5563; margin-bottom: 0.5rem;">Procesando su pago</h3>
        <p style="color: #6B7280;">${locale === 'es' ? 'Por favor espere mientras completamos su compra...' : 'Please wait while we complete your purchase...'}</p>
      </div>
    `;
    document.body.appendChild(blockingDiv);

    return () => {
      if (document.body.contains(blockingDiv)) {
        document.body.removeChild(blockingDiv);
      }
    };
  }, [redirecting, locale]);
}