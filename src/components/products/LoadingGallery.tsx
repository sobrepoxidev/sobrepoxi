import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-4 w-12 bg-[#252525] rounded animate-pulse" />
          <div className="h-4 w-4 bg-[#252525] rounded animate-pulse" />
          <div className="h-4 w-20 bg-[#252525] rounded animate-pulse" />
        </div>
        {/* Title skeleton */}
        <div className="mb-8">
          <div className="h-8 w-64 bg-[#252525] rounded animate-pulse mb-2" />
          <div className="h-4 w-96 bg-[#1a1a1a] rounded animate-pulse" />
        </div>
        {/* Grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden animate-pulse">
              <div className="aspect-square bg-[#252525]" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-[#252525] rounded w-3/4" />
                <div className="h-3 bg-[#252525] rounded w-1/2" />
                <div className="h-5 bg-[#252525] rounded w-1/3" />
                <div className="h-10 bg-[#252525] rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
