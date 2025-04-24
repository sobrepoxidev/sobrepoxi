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
      title: "Chorreadores",
      content: (
        <div className="grid grid-cols-2 w-full gap-0.5 h-full">
              {/* Product 1 */}

              <div className=" bg-white rounded-sm flex flex-col items-center justify-start">
                <Link href="/products?id=1" className="block">
                  <Image
                    src="/products/chorreadores-1-2-bg.webp"
                    alt="Dinoco T-Shirt"
                    width={85}
                    height={0}
                    className="object-cover"
                  />
                </Link>
                <div className="mt-0 flex flex-col  items-start justify-start">
                  <span className="bg-indigo-200 text-black text-[8px] font-medium p-0.5 inline-block mt-0.5">Hecho a mano</span>
                </div>
              </div>

              {/* Product 2 */}
              <div className=" bg-white  rounded-sm flex flex-col items-center justify-start">
                <Link href="/products?id=2" className="block">
                  <Image
                    src="/products/chorreadores-13-bg.webp"
                    alt="Dinoco T-Shirt"
                    width={85}
                    height={0}
                    className="object-cover"
                  />
                </Link>
                <div className="mt-0 flex flex-col   items-start justify-between">
                  <span className="bg-indigo-200 text-black text-[8px] font-medium p-0.5 inline-block mt-0.5">Hecho a mano</span>
                </div>
              </div>
              {/* Product 3 */}
              <div className=" bg-white  rounded-sm flex flex-col items-center justify-start">
                <Link href="/products?id=3" className="block">
                  <Image
                    src="/products/chorreadores-19-bg.webp"
                    alt="Dinoco T-Shirt"
                    width={85}
                    height={0}
                    className="object-cover"
                  />
                </Link>
                <div className="mt-0 flex flex-col  items-start justify-between">
                  <span className="bg-indigo-200 text-black text-[8px] font-medium p-0.5 inline-block rounded mt-0.5">Hecho a mano</span>
                </div>
              </div>

              {/* Product 4 */}
              <div className=" bg-white  rounded-sm flex flex-col items-center justify-start">
                <Link href="/products?id=15" className="block">
                  <Image
                    src="/products/chorreadores-bgt-15.webp"
                    alt="Dinoco T-Shirt"
                    width={85}
                    height={0}
                    className="object-cover"
                  />
                </Link>
                <div className="mt-0 flex flex-col  items-start justify-between">
                  <span className="bg-indigo-200 text-black text-[8px] font-medium p-0.5 inline-block rounded mt-0.5">Hecho a mano</span>
                </div>
              </div>
            </div>
      ),
      link: "/card-1"
    },
    {
      title: "Card 2",
      content: (
        <div>
          <p className="text-gray-600">Contenido del card 2</p>
          {/* Add any other TSX content here */}
        </div>
      ),
      link: "/card-2"
    },
    {
      title: "Card 3",
      content: (
        <div>
          <p className="text-gray-600">Contenido del card 3</p>
          {/* Add any other TSX content here */}
        </div>
      ),
      link: "/card-3"
    },
    {
      title: "Card 4",
      content: (
        <div>
          <p className="text-gray-600">Contenido del card 4</p>
          {/* Add any other TSX content here */}
        </div>
      ),
      link: "/card-4"
    },
    {
      title: "Card 5",
      content: (
        <div>
          <p className="text-gray-600">Contenido del card 5</p>
          {/* Add any other TSX content here */}
        </div>
      ),
      link: "/card-5"
    },
    {
      title: "Card 6",
      content: (
        <div>
          <p className="text-gray-600">Contenido del card 6</p>
          {/* Add any other TSX content here */}
        </div>
      ),
      link: "/card-6"
    },
    {
      title: "Card 7",
      content: (
        <div>
          <p className="text-gray-600">Contenido del card 7</p>
          {/* Add any other TSX content here */}
        </div>
      ),
      link: "/card-7"
    },
    {
      title: "Card 8",
      content: (
        <div>
          <p className="text-gray-600">Contenido del card 8</p>
          {/* Add any other TSX content here */}
        </div>
      ),
      link: "/card-8"
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