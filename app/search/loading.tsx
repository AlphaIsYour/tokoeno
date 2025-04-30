// app/search/loading.tsx
import React from "react";
import { Search } from "lucide-react";

// Skeleton component for category pills
const SkeletonCategoryPill = () => {
  return (
    <div className="h-8 bg-gray-200 animate-shimmer rounded-full w-20 md:w-24"></div>
  );
};

// Skeleton component for filter items
const SkeletonFilter = () => {
  return (
    <div className="w-full">
      <div className="h-4 bg-gray-200 animate-shimmer rounded w-1/4 mb-3"></div>
      <div className="h-8 bg-gray-200 animate-shimmer rounded w-full"></div>
    </div>
  );
};

// Skeleton component for product cards
const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="w-full h-40 sm:h-48 bg-gray-200 animate-shimmer rounded-t-xl"></div>
      <div className="p-3">
        <div className="h-4 bg-gray-200 animate-shimmer rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 animate-shimmer rounded w-1/3 mb-2"></div>
        <div className="h-5 bg-gray-200 animate-shimmer rounded w-1/2 mt-3"></div>
      </div>
    </div>
  );
};

export default function SearchLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar Skeleton */}
      <div className="mb-6">
        <div className="flex items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-300" />
            </div>
            <div className="bg-gray-200 animate-shimmer w-full h-10 rounded-lg"></div>
          </div>
          <div className="ml-2 w-16 h-10 bg-gray-200 animate-shimmer rounded-lg"></div>
        </div>
      </div>

      {/* Category Pills Skeleton */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <SkeletonCategoryPill key={index} />
            ))}
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkeletonFilter />
        <SkeletonFilter />
      </div>

      {/* Results Count Skeleton */}
      <div className="mb-4 h-4 bg-gray-200 animate-shimmer rounded w-24"></div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <SkeletonCard key={index} />
          ))}
      </div>
    </div>
  );
}
