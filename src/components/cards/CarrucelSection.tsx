"use client";
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

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
  start?: boolean;
  end?: boolean;
}> = ({ title, content, link, className = "", start = false, end = false }) => {
  return (
    <div className={`rounded-lg flex h-[25rem] shadow-md flex-col my-0.5 p-0.5 ${className} ${start ? 'ml-3' : ''} ${end ? 'mr-3' : ''}`}>
      <div className="flex flex-col h-full">
        <Link href={link} className="text-2xl font-extrabold  pl-1 text-gray-900">{title}</Link>
        <div className="flex-grow flex items-center justify-center mb-0">{content}</div>
      </div>
    </div>
  );
};




const CarrucelSection: React.FC<CarrucelSectionProps> = ({ items }) => {
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
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-black/30  bg-transparent rounded-full p-2"
          aria-label="Previous item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-x-1 max-lg:mt-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-none w-[77%] snap-star px-1"
          >
            <CarouselCard {...item} />
          </div>
        ))}
      </div>

      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-black/30 bg-transparent rounded-full p-2"
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

export default CarrucelSection;