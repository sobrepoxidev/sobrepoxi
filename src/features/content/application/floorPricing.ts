// Price ranges per m² published in the 2026 price guide
// (guides/data.ts → "precios-pisos-epoxicos-costa-rica"): materials,
// concrete preparation, labour and written warranty included. Single source
// for the floor calculator and the resin-floors landing.

export type FinishKey = 'solido' | 'escamas' | 'metalico' | 'industrial';
export type SpaceKey = 'casa' | 'cochera' | 'bano' | 'comercio' | 'industria';
type Locale = 'es' | 'en';

export interface FloorFinish {
  key: FinishKey;
  image: string;
  minPerM2: number;
  maxPerM2: number;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
}

export interface FloorSpace {
  key: SpaceKey;
  suggestedFinish: FinishKey;
  name: Record<Locale, string>;
}

export const FLOOR_FINISHES: FloorFinish[] = [
  {
    key: 'solido',
    image: '/epoxy/type-autonivelante.webp',
    minPerM2: 8000,
    maxPerM2: 12000,
    name: { es: 'Color sólido', en: 'Solid color' },
    description: {
      es: 'Autonivelante liso, el llamado «porcelanato líquido». Oficinas, comercios y casas.',
      en: 'Smooth self-leveling finish, also sold as "liquid porcelain". Offices, shops and homes.',
    },
  },
  {
    key: 'escamas',
    image: '/epoxy/type-escamas.webp',
    minPerM2: 12000,
    maxPerM2: 18000,
    name: { es: 'Escamas', en: 'Flakes' },
    description: {
      es: 'Escamas de vinilo sobre la resina: textura antideslizante, ideal para cocheras y terrazas.',
      en: 'Vinyl flakes over resin: anti-slip texture, ideal for garages and patios.',
    },
  },
  {
    key: 'metalico',
    image: '/epoxy/type-metalico.webp',
    minPerM2: 22000,
    maxPerM2: 38000,
    name: { es: 'Metálico / mármol', en: 'Metallic / marble' },
    description: {
      es: 'Pigmentos metálicos con efecto 3D, mármol o galaxia. Cada piso es único.',
      en: 'Metallic pigments with 3D, marble or galaxy effects. Every floor is unique.',
    },
  },
  {
    key: 'industrial',
    image: '/epoxy/type-industrial.webp',
    minPerM2: 15000,
    maxPerM2: 30000,
    name: { es: 'Industrial', en: 'Industrial' },
    description: {
      es: 'Sistema de alto tráfico para bodegas y plantas: químicos, montacargas y uso continuo.',
      en: 'Heavy-duty system for warehouses and plants: chemicals, forklifts and continuous use.',
    },
  },
];

export const FLOOR_SPACES: FloorSpace[] = [
  { key: 'casa', suggestedFinish: 'metalico', name: { es: 'Casa (sala, cocina, cuartos)', en: 'Home (living room, kitchen)' } },
  { key: 'cochera', suggestedFinish: 'escamas', name: { es: 'Cochera', en: 'Garage' } },
  { key: 'bano', suggestedFinish: 'escamas', name: { es: 'Baño o terraza', en: 'Bathroom or patio' } },
  { key: 'comercio', suggestedFinish: 'solido', name: { es: 'Comercio u oficina', en: 'Shop or office' } },
  { key: 'industria', suggestedFinish: 'industrial', name: { es: 'Bodega o industria', en: 'Warehouse or industry' } },
];

export const CR_PROVINCES = ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste', 'Puntarenas', 'Limón'] as const;

/** ₡1.234.000 — colones rounded to the thousand, dots as thousands separator. */
export function formatColones(amount: number): string {
  const rounded = Math.round(amount / 1000) * 1000;
  return `₡${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

export function estimateRange(finish: FloorFinish, m2: number): { min: number; max: number } {
  return { min: finish.minPerM2 * m2, max: finish.maxPerM2 * m2 };
}
