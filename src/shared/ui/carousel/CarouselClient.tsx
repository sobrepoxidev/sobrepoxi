'use client';
import {
  useState,
  useEffect,
  useRef,
  Children,
  type ReactNode,
  type TouchEvent,
} from 'react';
import { useLocale } from 'next-intl';
import CarouselIndicators from '@/components/Carousel/CarouselIndicators';

export interface CarouselClientProps {
  children: ReactNode;
}

export default function CarouselClient({ children }: CarouselClientProps) {
  /* ───────────── Hooks de estado ───────────── */
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = Children.count(children);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startX = useRef(0);
  const endX = useRef(0);
  const locale = useLocale();

  /* ───────────── Auto-play ───────────── */
  const run = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    intervalRef.current = setInterval(
      () => !paused && setCurrent((p) => (p + 1) % count),
      4500,
    );
  };

  useEffect(() => (run(), () => clearInterval(intervalRef.current!)), [
    paused,
    count,
  ]);

  /* ───────────── Swipe handlers ───────────── */
  const onStart = (e: TouchEvent) => (startX.current = e.touches[0].clientX);
  const onMove = (e: TouchEvent) => (endX.current = e.touches[0].clientX);
  const onEnd = () => {
    const d = startX.current - endX.current;
    if (Math.abs(d) > 50) setCurrent((p) => (d > 0 ? (p + 1) % count : (p || count) - 1));
  };

  /* ───────────── Render ───────────── */
  return (
    <div
      className="relative h-[130px] lg:h-[160px] xl:h-[215px] overflow-hidden"
      onTouchStart={onStart}
      onTouchMove={onMove}
      onTouchEnd={onEnd}
    >
      {/* Botón pausa / play */}
      <button
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? 'Play' : 'Pause'}
        className="absolute bottom-3 left-3 z-50 rounded-full  p-1 text-white/80 hover:bg-white/50"
      >
        {paused ? '▶' : '⏸'}
      </button>

      {/* Indicadores */}
      <CarouselIndicators
        total={count}
        current={current}
        onClick={(i) => {
          setCurrent(i);
          run();
        }}
      />

      {/* Slides */}
      {Children.map(children, (child, i) => (
        <div
          className={`absolute inset-0 transition-transform duration-500 ${
            i === current ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {child}
        </div>
      ))}

      {/* Hint móvil */}
      <span className="absolute bottom-1 right-2 rounded bg-black/10 px-0.5 text-[0.55rem] text-gray-400 md:hidden">
        {locale === 'es' ? 'Desliza para navegar' : 'Swipe to navigate'}
      </span>
    </div>
  );
}
