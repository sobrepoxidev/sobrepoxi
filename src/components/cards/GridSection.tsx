"use client";

import React from "react";
import Card from "./Card";
import Link from "next/link";
import Image from "next/image";

interface CardData {
  title: string;
  content: React.ReactNode;
  link: string;
}

const GridSection = () => {
  const cards: CardData[] = [
    {
      title: 'Regalos con significado',
    
      content: (
        <div className="grid grid-cols-2 w-full p-1 gap-1 h-full">
          {/* Product 1 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=42" className="block">
              <Image
                src="/home/1.webp?v=2"
                alt="Chorreador artesanal 1"
                width={130}
                height={0}
                className="object-cover"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
              Piñas dragón 
              </span>
            </div>
          </div>
    
          {/* Product 2 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=2" className="block">
              <Image
                src="/home/2.webp?v=2"
                alt="Chorreador artesanal 2"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
              Set de jarra y vasos en madera
              </span>
            </div>
          </div>
    
          {/* Product 3 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=3" className="block">
              <Image
                src="/home/chorreadores-19-bg-1.webp?v=2"
                alt="Chorreador artesanal 3"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Chorreador de colibrí morado
              </span>
            </div>
          </div>
    
          {/* Product 4 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=15" className="block">
              <Image
                src="/home/3.webp?v=2"
                alt="Chorreador artesanal 4"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Molino dispensador
              </span>
            </div>
          </div>
        </div>
      ),
      link: '/link1',
      
    },
    {
      title: 'Regalos con significado',
    
      content: (
        <div className="grid grid-cols-2 w-full p-1 gap-1 h-full">
          {/* Product 1 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=1" className="block">
              <Image
                src="/home/chorreadores-1-2-bg-1.webp?v=2"
                alt="Chorreador artesanal 1"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Rana de árbol
              </span>
            </div>
          </div>
    
          {/* Product 2 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=2" className="block">
              <Image
                src="/home/chorreadores-13-bg-1.webp?v=2"
                alt="Chorreador artesanal 2"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Aqua tiburón
              </span>
            </div>
          </div>
    
          {/* Product 3 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=3" className="block">
              <Image
                src="/home/chorreadores-19-bg-1.webp?v=2"
                alt="Chorreador artesanal 3"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Colibrí morada
              </span>
            </div>
          </div>
    
          {/* Product 4 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=15" className="block">
              <Image
                src="/home/chorreadores-bgt-15-1.webp?v=2"
                alt="Chorreador artesanal 4"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Par de tucanes
              </span>
            </div>
          </div>
        </div>
      ),
      link: '/link1',
      
    },
    {
      title: 'Regalos con significado',
    
      content: (
        <div className="grid grid-cols-2 w-full p-1 gap-1 h-full">
          {/* Product 1 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=42" className="block">
              <Image
                src="/home/1.webp?v=2"
                alt="Chorreador artesanal 1"
                width={130}
                height={0}
                className="object-cover"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
              Piñas dragón 
              </span>
            </div>
          </div>
    
          {/* Product 2 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=2" className="block">
              <Image
                src="/home/2.webp?v=2"
                alt="Chorreador artesanal 2"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
              Set de jarra y vasos en madera
              </span>
            </div>
          </div>
    
          {/* Product 3 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=3" className="block">
              <Image
                src="/home/chorreadores-19-bg-1.webp?v=2"
                alt="Chorreador artesanal 3"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Chorreador de colibrí morado
              </span>
            </div>
          </div>
    
          {/* Product 4 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=15" className="block">
              <Image
                src="/home/3.webp?v=2"
                alt="Chorreador artesanal 4"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Molino dispensador
              </span>
            </div>
          </div>
        </div>
      ),
      link: '/link1',
      
    },
    {
      title: 'Regalos con significado',
    
      content: (
        <div className="grid grid-cols-2 w-full p-1 gap-1 h-full">
          {/* Product 1 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=1" className="block">
              <Image
                src="/home/chorreadores-1-2-bg-1.webp?v=2"
                alt="Chorreador artesanal 1"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Rana de árbol
              </span>
            </div>
          </div>
    
          {/* Product 2 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=2" className="block">
              <Image
                src="/home/chorreadores-13-bg-1.webp?v=2"
                alt="Chorreador artesanal 2"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Aqua tiburón
              </span>
            </div>
          </div>
    
          {/* Product 3 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=3" className="block">
              <Image
                src="/home/chorreadores-19-bg-1.webp?v=2"
                alt="Chorreador artesanal 3"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Colibrí morada
              </span>
            </div>
          </div>
    
          {/* Product 4 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=15" className="block">
              <Image
                src="/home/chorreadores-bgt-15-1.webp?v=2"
                alt="Chorreador artesanal 4"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Par de tucanes
              </span>
            </div>
          </div>
        </div>
      ),
      link: '/link1',
      
    },
    {
      title: 'Regalos con significado',
    
      content: (
        <div className="grid grid-cols-2 w-full p-1 gap-1 h-full">
          {/* Product 1 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=42" className="block">
              <Image
                src="/home/1.webp?v=2"
                alt="Chorreador artesanal 1"
                width={130}
                height={0}
                className="object-cover"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
              Piñas dragón 
              </span>
            </div>
          </div>
    
          {/* Product 2 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=2" className="block">
              <Image
                src="/home/2.webp?v=2"
                alt="Chorreador artesanal 2"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
              Set de jarra y vasos en madera
              </span>
            </div>
          </div>
    
          {/* Product 3 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=3" className="block">
              <Image
                src="/home/chorreadores-19-bg-1.webp?v=2"
                alt="Chorreador artesanal 3"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Chorreador de colibrí morado
              </span>
            </div>
          </div>
    
          {/* Product 4 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=15" className="block">
              <Image
                src="/home/3.webp?v=2"
                alt="Chorreador artesanal 4"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Molino dispensador
              </span>
            </div>
          </div>
        </div>
      ),
      link: '/link1',
      
    },
    {
      title: 'Regalos con significado',
    
      content: (
        <div className="grid grid-cols-2 w-full p-1 gap-1 h-full">
          {/* Product 1 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=1" className="block">
              <Image
                src="/home/chorreadores-1-2-bg-1.webp?v=2"
                alt="Chorreador artesanal 1"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Rana de árbol
              </span>
            </div>
          </div>
    
          {/* Product 2 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=2" className="block">
              <Image
                src="/home/chorreadores-13-bg-1.webp?v=2"
                alt="Chorreador artesanal 2"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Aqua tiburón
              </span>
            </div>
          </div>
    
          {/* Product 3 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=3" className="block">
              <Image
                src="/home/chorreadores-19-bg-1.webp?v=2"
                alt="Chorreador artesanal 3"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Colibrí morada
              </span>
            </div>
          </div>
    
          {/* Product 4 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=15" className="block">
              <Image
                src="/home/chorreadores-bgt-15-1.webp?v=2"
                alt="Chorreador artesanal 4"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Par de tucanes
              </span>
            </div>
          </div>
        </div>
      ),
      link: '/link1',
      
    },
    {
      title: 'Regalos con significado',
    
      content: (
        <div className="grid grid-cols-2 w-full p-1 gap-1 h-full">
          {/* Product 1 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=42" className="block">
              <Image
                src="/home/1.webp?v=2"
                alt="Chorreador artesanal 1"
                width={130}
                height={0}
                className="object-cover"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
              Piñas dragón 
              </span>
            </div>
          </div>
    
          {/* Product 2 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=2" className="block">
              <Image
                src="/home/2.webp?v=2"
                alt="Chorreador artesanal 2"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
              Set de jarra y vasos en madera
              </span>
            </div>
          </div>
    
          {/* Product 3 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=3" className="block">
              <Image
                src="/home/chorreadores-19-bg-1.webp?v=2"
                alt="Chorreador artesanal 3"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Chorreador de colibrí morado
              </span>
            </div>
          </div>
    
          {/* Product 4 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=15" className="block">
              <Image
                src="/home/3.webp?v=2"
                alt="Chorreador artesanal 4"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Molino dispensador
              </span>
            </div>
          </div>
        </div>
      ),
      link: '/link1',
      
    },
    {
      title: 'Regalos con significado',
    
      content: (
        <div className="grid grid-cols-2 w-full p-1 gap-1 h-full">
          {/* Product 1 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=1" className="block">
              <Image
                src="/home/chorreadores-1-2-bg-1.webp?v=2"
                alt="Chorreador artesanal 1"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Rana de árbol
              </span>
            </div>
          </div>
    
          {/* Product 2 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=2" className="block">
              <Image
                src="/home/chorreadores-13-bg-1.webp?v=2"
                alt="Chorreador artesanal 2"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Aqua tiburón
              </span>
            </div>
          </div>
    
          {/* Product 3 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=3" className="block">
              <Image
                src="/home/chorreadores-19-bg-1.webp?v=2"
                alt="Chorreador artesanal 3"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Colibrí morada
              </span>
            </div>
          </div>
    
          {/* Product 4 */}
          <div className=" rounded-sm flex flex-col items-center justify-between pt-4 h-full">
            <Link href="/new?id=15" className="block">
              <Image
                src="/home/chorreadores-bgt-15-1.webp?v=2"
                alt="Chorreador artesanal 4"
                width={85}
                height={0}
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col items-end justify-end">
              <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                Par de tucanes
              </span>
            </div>
          </div>
        </div>
      ),
      link: '/link1',
      
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-5 mt-4 mb-4 mx-4 pb-6 max-lg:hidden">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default GridSection;