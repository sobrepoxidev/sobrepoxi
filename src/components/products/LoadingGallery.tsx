

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
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-300 bg-gray-50 shadow-lg   transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="relative h-48 w-full overflow-hidden bg-gray-400" style={{ aspectRatio: '4/3' }}>

        <div className="bg-opacity-50 absolute inset-0 animate-pulse bg-white"></div>

      </div>

      <div className="flex flex-grow animate-pulse flex-col p-2">

        

        <div className="mx-auto mb-2  h-3 w-2/3 font-semibold bg-gray-400"></div>

       <div className="mx-auto mb-2  h-3 w-2/5 font-semibold bg-gray-200"></div>

        <div className="flex justify-center items-center">
          <div className="mx-auto mb-2 flex flex-row h-10 w-3/6 items-center border rounded-lg   border-gray-100 overflow-hidden shadow-sm">
            <div className="px-3 py-2 w-1/3 text-gray-200 transition-colors duration-200 h-10">
              −
            </div>
            <div className="px-3 h-10 w-1/3 ">
              
            </div>
            <div className="px-3 py-2 w-1/3  text-gray-200 transition-colors duration-200 h-10">
              +
            </div>
          </div>
        </div>

        <div className="mx-auto mt-auto h-10 w-3/6 rounded-lg bg-teal-600/75"></div>

      </div>

    </div>
  );
}

