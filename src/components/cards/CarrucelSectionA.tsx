"use client";
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CarrucelSectionProps {
  items: {
    title: string;
    content: React.ReactNode;
    link: string;
    className?: string;
    start?: boolean;
    end?: boolean;
  }[];
}

const CarouselCard: React.FC<{
  title: string;
  content: React.ReactNode;
  link: string;
  className?: string;
}> = ({ title, content, link, className = "" }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If the click originated inside an <a>, allow that navigation instead.
    const target = e.target as HTMLElement;
    if (target.closest('a')) return;
    router.push(link);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex h-[27rem] shadow-md flex-col cursor-pointer ${className}`}
    >
      <div className="flex flex-col h-full">
        <h2 className="text-2xl font-bold px-0.5 pt-1 truncate whitespace-nowrap text-white" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>{title}</h2>
        <div className="flex-grow flex items-center justify-center">{content}</div>
      </div>
    </div>
  );
};




const CarrucelSectionA: React.FC<CarrucelSectionProps> = ({ items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth * 0.85;
      const scrollValue = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollValue, behavior: 'smooth' });
    }
  };

  return (
    <div className="lg:hidden relative">
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-gray-700  bg-transparent rounded-full p-2"
          aria-label="Previous item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-x-0 max-lg:mt-2 "
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-none w-[80%] snap-start pl-3 first:pl-4 last:pr-4 py-1"
          >
            <CarouselCard {...item} />
          </div>
        ))}
      </div>

      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-gray-700 bg-transparent rounded-full p-2"
          aria-label="Next item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default CarrucelSectionA;