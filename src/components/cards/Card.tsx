"use client";

import React from "react";
import Link from "next/link";

interface CardProps {
  title: string;
  content: React.ReactNode;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, content, link }) => (
  <div className="relative bg-gold-gradient-90  rounded-xs overflow-hidden starting: h-full max-w-full w-full  hover:shadow-sm transition-shadow">
    <div className="flex flex-col h-full">
      <div className="px-3 ">
        <Link href={link} className="block" target="_self">
          <h3 className="text-xl font-mono font-bold tracking-wide text-black/90 hover:text-black truncate whitespace-nowrap transition-colors">{title}</h3>
        </Link>
      </div>
      <div className="flex-grow p-2">
        {content}
      </div>
    </div>
  </div>
);

export default Card;