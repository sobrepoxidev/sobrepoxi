'use client';
import type { FC } from 'react';

interface Props {
  total: number;
  current: number;
  onClick: (i: number) => void;
}

const CarouselIndicators: FC<Props> = ({ total, current, onClick }) => (
  <div className="absolute bottom-1 left-0 right-0 z-50 flex justify-center space-x-2">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onClick(i)}
        aria-label={`Go to slide ${i + 1}`}
        className={`h-2 rounded-full transition-all ${
          current === i ? 'w-6 bg-gold-gradient-30' : 'w-2 bg-gray-300'
        }`}
      />
    ))}
  </div>
);
export default CarouselIndicators;
