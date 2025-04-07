

// app/(web)/gallery/loading.tsx 
import React from "react";

export default function Loading() {
  // Suponiendo que quieres mostrar 4 skeleton-cards
  return (

    <div className="grid w-full max-w-7xl grid-cols-2 gap-0.5 pt-3 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>

  );
}

function SkeletonCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-300 bg-[#EFE9DB] shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 w-full overflow-hidden bg-gray-400" style={{ aspectRatio: '4/3' }}>
        <div className="bg-opacity-50 absolute inset-0 animate-pulse bg-white"></div>
      </div>
      <div className="flex flex-grow animate-pulse flex-col p-2">
        <div className="mx-auto mb-2 flex h-0.5 w-full flex-col rounded bg-gray-400"></div>
        <div className="mx-auto mb-2 h-3 w-2/6 rounded bg-gray-700"></div>
        <div className="mx-auto mb-2 h-3 w-2/3 rounded bg-gray-400"></div>
        <div className="mx-auto mb-2 flex h-10 w-3/6 items-center overflow-hidden rounded-lg border border-gray-400 shadow-sm"></div>
        <div className="mx-auto mt-auto h-10 w-3/6 rounded-lg bg-teal-600/50"></div>
      </div>
    </div>
  );
}

