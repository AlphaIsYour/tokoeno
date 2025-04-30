// components/SearchFilters.tsx
"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SearchFiltersProps {
  categoryFilter: string;
  priceRangeFilter: string;
  ratingFilter: number | null;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  categoryFilter,
  priceRangeFilter,
  ratingFilter,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showCategoryFilter, setShowCategoryFilter] = useState(true);
  const [showPriceFilter, setShowPriceFilter] = useState(true);
  const [showRatingFilter, setShowRatingFilter] = useState(true);

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Simpan scroll position sebelum navigasi
    if (typeof window !== "undefined") {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4 h-fit">
      <h2 className="font-semibold text-lg mb-4 text-gray-800">Filter</h2>

      {/* Category Filter */}
      <div className="mb-4 border-b pb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-700">Kategori</h3>
          <button onClick={() => setShowCategoryFilter(!showCategoryFilter)}>
            {showCategoryFilter ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>

        {showCategoryFilter && (
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="cat-all"
                name="category"
                className="mr-2"
                checked={!categoryFilter || categoryFilter === "Semua Kategori"}
                onChange={() => updateFilters("category", null)}
              />
              <label htmlFor="cat-all" className="text-sm text-gray-700">
                Semua Kategori
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="cat-laptop"
                name="category"
                className="mr-2"
                checked={categoryFilter === "Laptop"}
                onChange={() => updateFilters("category", "Laptop")}
              />
              <label htmlFor="cat-laptop" className="text-sm text-gray-700">
                Laptop
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="cat-monitor"
                name="category"
                className="mr-2"
                checked={categoryFilter === "Monitor"}
                onChange={() => updateFilters("category", "Monitor")}
              />
              <label htmlFor="cat-monitor" className="text-sm text-gray-700">
                Monitor
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="cat-komponenpc"
                name="category"
                className="mr-2"
                checked={categoryFilter === "Komponen PC"}
                onChange={() => updateFilters("category", "Komponen PC")}
              />
              <label htmlFor="cat-komponenpc" className="text-sm text-gray-700">
                Komponen PC
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="cat-storage"
                name="category"
                className="mr-2"
                checked={categoryFilter === "Storage"}
                onChange={() => updateFilters("category", "Storage")}
              />
              <label htmlFor="cat-storage" className="text-sm text-gray-700">
                Storage
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="cat-smartphone"
                name="category"
                className="mr-2"
                checked={categoryFilter === "Smartphone"}
                onChange={() => updateFilters("category", "Smartphone")}
              />
              <label htmlFor="cat-smartphone" className="text-sm text-gray-700">
                Smartphone
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="cat-aksesoris"
                name="category"
                className="mr-2"
                checked={categoryFilter === "Aksesoris"}
                onChange={() => updateFilters("category", "Aksesoris")}
              />
              <label htmlFor="cat-aksesoris" className="text-sm text-gray-700">
                Aksesoris
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-4 border-b pb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-700">Harga</h3>
          <button onClick={() => setShowPriceFilter(!showPriceFilter)}>
            {showPriceFilter ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>

        {showPriceFilter && (
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="price-all"
                name="price"
                className="mr-2"
                checked={!priceRangeFilter}
                onChange={() => updateFilters("priceRange", null)}
              />
              <label htmlFor="price-all" className="text-sm text-gray-700">
                Semua Harga
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="price-under1m"
                name="price"
                className="mr-2"
                checked={priceRangeFilter === "under1m"}
                onChange={() => updateFilters("priceRange", "under1m")}
              />
              <label htmlFor="price-under1m" className="text-sm text-gray-700">
                Di bawah Rp1.000.000
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="price-1m-2m"
                name="price"
                className="mr-2"
                checked={priceRangeFilter === "1m-2m"}
                onChange={() => updateFilters("priceRange", "1m-2m")}
              />
              <label htmlFor="price-1m-2m" className="text-sm text-gray-700">
                Rp1.000.000 - Rp2.000.000
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="price-2m-5m"
                name="price"
                className="mr-2"
                checked={priceRangeFilter === "2m-5m"}
                onChange={() => updateFilters("priceRange", "2m-5m")}
              />
              <label htmlFor="price-2m-5m" className="text-sm text-gray-700">
                Rp2.000.000 - Rp5.000.000
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="price-above5m"
                name="price"
                className="mr-2"
                checked={priceRangeFilter === "above5m"}
                onChange={() => updateFilters("priceRange", "above5m")}
              />
              <label htmlFor="price-above5m" className="text-sm text-gray-700">
                Di atas Rp5.000.000
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-700">Rating</h3>
          <button onClick={() => setShowRatingFilter(!showRatingFilter)}>
            {showRatingFilter ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>

        {showRatingFilter && (
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="rating-all"
                name="rating"
                className="mr-2"
                checked={!ratingFilter}
                onChange={() => updateFilters("rating", null)}
              />
              <label htmlFor="rating-all" className="text-sm text-gray-700">
                Semua Rating
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="rating-4"
                name="rating"
                className="mr-2"
                checked={ratingFilter === 4}
                onChange={() => updateFilters("rating", "4")}
              />
              <label
                htmlFor="rating-4"
                className="text-sm text-gray-700 flex items-center"
              >
                <span>4★</span>
                <span className="text-gray-500 ml-1">ke atas</span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="rating-3"
                name="rating"
                className="mr-2"
                checked={ratingFilter === 3}
                onChange={() => updateFilters("rating", "3")}
              />
              <label
                htmlFor="rating-3"
                className="text-sm text-gray-700 flex items-center"
              >
                <span>3★</span>
                <span className="text-gray-500 ml-1">ke atas</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
