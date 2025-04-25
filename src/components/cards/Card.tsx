"use client";

import React from "react";
import Link from "next/link";

interface CardProps {
  title: string;
  content: React.ReactNode;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, content, link }) => (
  <div className="relative  h-[27rem] bg-white shadow-sm overflow-hidden">
    <div className="absolute inset-0 flex flex-col ">
      <div className="pl-4 pt-4 bg-gradient-to-b from-white to-transparent">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="flex-grow pt-1">
        {content}
      </div>
      <div className="pl-4 pt-0.5 bg-gradient-to-t from-white to-transparent flex items-center justify-center">
        <Link href={link} className="inline-block p-0.5 text-xs bg-teal-600 text-white hover:bg-teal-700 transition-colors">
          Ver más
        </Link>
      </div>
    </div>
  </div>
);

export default Card;