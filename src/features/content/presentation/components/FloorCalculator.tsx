'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Check, Minus, Plus } from 'lucide-react';
import { buildWhatsAppUrl } from '@/shared/contact/whatsapp';
import {
  CR_PROVINCES,
  FLOOR_FINISHES,
  FLOOR_SPACES,
  estimateRange,
  formatColones,
  type FinishKey,
  type SpaceKey,
} from '../../application/floorPricing';

const MIN_M2 = 5;
const MAX_M2 = 2000;

const COPY = {
  es: {
    step1: '¿Dónde va el piso?',
    step2: '¿Cuántos metros cuadrados?',
    step3: 'Acabado',
    step4: 'Provincia',
    hint: '¿No sabés los metros? Largo × ancho. Una cochera de 2 carros ronda 30–35 m².',
    presets: [['1 carro', 18], ['2 carros', 32], ['Sala', 25], ['Bodega', 150]] as const,
    perM2: 'por m²',
    estimate: 'Precio orientativo',
    space: 'Espacio',
    area: 'Área',
    finish: 'Acabado',
    province: 'Provincia',
    included: ['Materiales y preparación del concreto', 'Instalación por nuestro equipo', 'Garantía escrita'],
    send: 'Enviar por WhatsApp',
    preview: 'Así llega tu mensaje',
    fine: 'Grietas, desniveles o manchas de aceite se cotizan aparte en la visita técnica. Precios en colones, 2026.',
    less: 'Menos metros',
    more: 'Más metros',
    m2Label: 'Metros cuadrados',
    message: (space: string, m2: number, finish: string, prov: string, range: string) =>
      `Hola SobrePoxi, quiero cotizar un piso:\n• ${space}\n• ${m2} m²\n• ${finish}\n• ${prov}\nLa calculadora me dio ${range}.`,
  },
  en: {
    step1: 'Where is the floor going?',
    step2: 'How many square meters?',
    step3: 'Finish',
    step4: 'Province',
    hint: "Don't know the area? Length × width. A 2-car garage is about 30–35 m².",
    presets: [['1 car', 18], ['2 cars', 32], ['Living room', 25], ['Warehouse', 150]] as const,
    perM2: 'per m²',
    estimate: 'Estimated price',
    space: 'Space',
    area: 'Area',
    finish: 'Finish',
    province: 'Province',
    included: ['Materials and concrete preparation', 'Installation by our team', 'Written warranty'],
    send: 'Send on WhatsApp',
    preview: 'Your message will read',
    fine: 'Cracks, uneven slabs or oil stains are quoted separately at the site visit. Prices in colones, 2026.',
    less: 'Fewer meters',
    more: 'More meters',
    m2Label: 'Square meters',
    message: (space: string, m2: number, finish: string, prov: string, range: string) =>
      `Hello SobrePoxi, I would like a floor quote:\n• ${space}\n• ${m2} m²\n• ${finish}\n• ${prov}\nThe calculator gave me ${range}.`,
  },
};

const chipClass = (active: boolean) =>
  `rounded-full border px-3.5 py-2.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 ${
    active ? 'border-[#b68b44] bg-[#b68b44]/15 text-amber-300' : 'border-white/10 bg-[#1c1915] text-white hover:border-white/25'
  }`;

/**
 * Floor price calculator: space, area, finish and province give an estimated
 * range from the published price guide, and the WhatsApp button sends those
 * details (with a [ref] tag) so the conversation starts with the quote data.
 */
export default function FloorCalculator({ locale, refTag }: { locale: string; refTag: string }) {
  const lang = locale === 'es' ? 'es' : 'en';
  const t = COPY[lang];
  const [space, setSpace] = useState<SpaceKey>('cochera');
  const [finishKey, setFinishKey] = useState<FinishKey>('escamas');
  const [m2, setM2] = useState(32);
  const [province, setProvince] = useState<string>('San José');

  const finish = FLOOR_FINISHES.find((f) => f.key === finishKey) ?? FLOOR_FINISHES[0];
  const spaceName = FLOOR_SPACES.find((s) => s.key === space)?.name[lang] ?? '';
  const { min, max } = estimateRange(finish, m2);
  const rangeText = `${formatColones(min)} – ${formatColones(max)}`;
  const message = t.message(spaceName, m2, finish.name[lang], province, rangeText);
  const waHref = useMemo(() => buildWhatsAppUrl(message, `calculadora.${refTag}`), [message, refTag]);

  const setArea = (value: number) => setM2(Math.max(MIN_M2, Math.min(MAX_M2, Math.round(Number.isFinite(value) ? value : MIN_M2))));

  return (
    <div className="grid gap-4 lg:grid-cols-[1.25fr_0.9fr] lg:items-start">
      <div className="rounded-2xl border border-white/10 bg-[#151311] p-5 sm:p-6">
        <div role="group" className="grid gap-3 pb-5">
          <p className="font-semibold text-white">
            <span className="mr-2 text-xs tracking-widest text-white/40">1</span>
            {t.step1}
          </p>
          <div className="flex flex-wrap gap-2">
            {FLOOR_SPACES.map((s) => (
              <button
                key={s.key}
                type="button"
                aria-pressed={space === s.key}
                className={chipClass(space === s.key)}
                onClick={() => {
                  setSpace(s.key);
                  setFinishKey(s.suggestedFinish);
                }}
              >
                {s.name[lang]}
              </button>
            ))}
          </div>
        </div>

        <div role="group" className="grid gap-3 border-t border-white/10 py-5">
          <p className="font-semibold text-white">
            <span className="mr-2 text-xs tracking-widest text-white/40">2</span>
            {t.step2}
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center overflow-hidden rounded-xl border border-white/10 bg-[#1c1915]">
              <button type="button" aria-label={t.less} onClick={() => setArea(m2 - 1)} className="grid h-12 w-11 place-items-center text-white hover:bg-white/5">
                <Minus className="h-4 w-4" />
              </button>
              <input
                id="calc-m2"
                type="number"
                inputMode="numeric"
                min={MIN_M2}
                max={MAX_M2}
                value={m2}
                aria-label={t.m2Label}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-20 bg-transparent text-center text-xl font-bold tabular-nums text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="pr-2 text-sm text-white/40">m²</span>
              <button type="button" aria-label={t.more} onClick={() => setArea(m2 + 1)} className="grid h-12 w-11 place-items-center text-white hover:bg-white/5">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {t.presets.map(([label, value]) => (
              <button key={label} type="button" aria-pressed={m2 === value} className={chipClass(m2 === value)} onClick={() => setArea(value)}>
                {label} · {value} m²
              </button>
            ))}
          </div>
          <input
            type="range"
            min={MIN_M2}
            max={300}
            value={Math.min(300, m2)}
            aria-label={t.m2Label}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full accent-[#b68b44]"
          />
          <p className="text-xs text-white/45">{t.hint}</p>
        </div>

        <div role="group" className="grid gap-3 border-t border-white/10 py-5">
          <p className="font-semibold text-white">
            <span className="mr-2 text-xs tracking-widest text-white/40">3</span>
            {t.step3}
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {FLOOR_FINISHES.map((f) => {
              const active = f.key === finishKey;
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFinishKey(f.key)}
                  className={`relative overflow-hidden rounded-xl border bg-[#1c1915] text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 ${
                    active ? 'border-[#b68b44] ring-1 ring-[#b68b44]' : 'border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="relative aspect-[4/3]">
                    <Image src={f.image} alt={f.name[lang]} fill sizes="(max-width: 1024px) 45vw, 260px" className="object-cover" />
                  </div>
                  <div className="grid gap-0.5 px-3 py-2.5">
                    <span className="text-sm font-semibold text-white">{f.name[lang]}</span>
                    <span className="text-xs tabular-nums text-white/60">
                      {formatColones(f.minPerM2)} – {formatColones(f.maxPerM2)} / m²
                    </span>
                  </div>
                  {active && (
                    <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-[#b68b44] text-black">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-3 border-t border-white/10 pt-5">
          <label htmlFor="calc-province" className="font-semibold text-white">
            <span className="mr-2 text-xs tracking-widest text-white/40">4</span>
            {t.step4}
          </label>
          <select
            id="calc-province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#1c1915] p-3 text-white"
          >
            {CR_PROVINCES.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <aside
        aria-live="polite"
        className="grid gap-3.5 rounded-2xl border border-amber-300/25 bg-gradient-to-b from-[#1d1913] to-[#141210] p-5 sm:p-6 lg:sticky lg:top-24"
      >
        <span className="text-xs uppercase tracking-[0.14em] text-white/60">{t.estimate}</span>
        <p className="efx-serif font-serif text-3xl italic tabular-nums leading-tight text-white sm:text-4xl">{rangeText}</p>
        <p className="text-sm tabular-nums text-white/60">
          {formatColones(finish.minPerM2)} – {formatColones(finish.maxPerM2)} {t.perM2} · {finish.name[lang]}
        </p>
        <dl className="grid gap-1.5 border-y border-white/10 py-3 text-sm">
          {[
            [t.space, spaceName],
            [t.area, `${m2} m²`],
            [t.finish, finish.name[lang]],
            [t.province, province],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3">
              <dt className="text-white/45">{k}</dt>
              <dd className="text-right text-white">{v}</dd>
            </div>
          ))}
        </dl>
        <ul className="grid gap-1.5 text-sm text-white/65">
          {t.included.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-amber-300" />
              {item}
            </li>
          ))}
        </ul>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-[#08140c] transition-opacity hover:opacity-90"
        >
          {t.send}
        </a>
        <div className="grid gap-1.5">
          <span className="text-xs uppercase tracking-[0.14em] text-white/60">{t.preview}</span>
          <p className="whitespace-pre-wrap rounded-2xl rounded-br-sm border border-[#25D366]/25 bg-[#0f1a13] p-3 text-sm leading-relaxed text-[#d8f5e1]">
            {message}
          </p>
        </div>
        <p className="text-xs leading-relaxed text-white/45">{t.fine}</p>
      </aside>
    </div>
  );
}
