// Custom events go to Umami (stats.bryamlopez.com). The tracker script loads
// with `defer`, so an event fired before it finishes loading is dropped.
type EventData = Record<string, string | number | boolean>;

interface UmamiTracker {
  track: (event: string, data?: EventData) => void;
}

export const UMAMI_SCRIPT_SRC = 'https://stats.bryamlopez.com/script.js';
export const UMAMI_WEBSITE_ID = '85f70de2-cdb2-4b5c-aa1b-66589e75feb4';

export function track(event: string, data?: EventData): void {
  if (typeof window === 'undefined') return;
  const umami = (window as unknown as { umami?: UmamiTracker }).umami;
  umami?.track(event, data);
}
