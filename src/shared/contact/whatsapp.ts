// Single source of truth for the WhatsApp line that receives SobrePoxi leads.
// Every CTA builds its link here so the number can't drift and every message
// carries a short `ref` that tells the bot (and analytics) which page sent it.

export const WHATSAPP_NUMBER = '50685850000';

const REF_RE = /\[ref:\s*([a-z0-9._-]+)\]/i;

/** Builds a wa.me link with a prefilled message tagged with `[ref: <ref>]`. */
export function buildWhatsAppUrl(message: string, ref: string): string {
  const safeRef = ref.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9._-]+/g, '-');
  const text = `${message.trim()} [ref: ${safeRef}]`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Reads the `ref` tag back from a wa.me href (used by the click tracker). */
export function refFromWhatsAppHref(href: string): string | null {
  try {
    const text = new URL(href).searchParams.get('text') ?? '';
    return REF_RE.exec(text)?.[1] ?? null;
  } catch {
    return null;
  }
}
