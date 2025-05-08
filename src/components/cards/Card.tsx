"use client";

import React from "react";
import Link from "next/link";

interface CardProps {
  title: string;
  content: React.ReactNode;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, content, link }) => (
  <div className="relative bg-white shadow-sm rounded-lg overflow-hidden starting: h-full max-w-full w-full border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex flex-col h-full">
      <div className="px-3 bg-gradient-to-b from-white to-transparent">
        <Link href={link} className="block">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-teal-600 transition-colors">{title}</h3>
        </Link>
      </div>
      <div className="flex-grow p-2">
        {content}
      </div>
    </div>
  </div>
);

export default Card;